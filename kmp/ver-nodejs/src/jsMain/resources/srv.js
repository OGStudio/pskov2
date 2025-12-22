#!/usr/bin/env node

let fs = require("fs");
let http = require("http");
let mime = require("mime-types");
let open = require("open");
let path = require("path");

let other = require("./other");
let KT = require("./pskov-ver-nodejs").org.opengamestudio;

//!<-- API -->

function srvCtrl() {
    return cmp.ctrl;
}

//!<-- Constants -->

let SRV_CONTENTS_404 = "404";
let SRV_CONTENTS_BINARY = "BINARY";

//!<-- Component -->

function SrvComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.SrvContext());
        other.registerCtrlDbgOutput(this.ctrl, "Srv", KT);

        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
            "deleteFile", (c) => { srvDeleteFile(c.deleteFile) },
            "listDir", (c) => { srvListDir(c.listDir) },
            "projectDir", (c) => { srvResolvePath(c.projectDir) },
            "readFile", (c) => { srvReadFile(c.readFile) },
            "url", (c) => { open(c.url) },
            "writeFile", (c) => { srvWriteFile(c.writeFile[0], c.writeFile[1]) },
        ];
        KT.registerOneliners(this.ctrl, oneliners);
    };

    this.setupShoulds = function() {
        [
            KT.srvShouldDeleteFile,
            KT.srvShouldListDir,
            KT.srvShouldOpenURL,
            KT.srvShouldReadFile,
            KT.srvShouldResetBrowserDir,
            KT.srvShouldResetHTTPPort,
            KT.srvShouldResetProjectDir,
            KT.srvShouldResetResponse,
            KT.srvShouldWriteFile,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this._construct();
}

//<!-- Effects -->

function srvDeleteFile(fileName) {
    var isOk = true;
    try {
        fs.rmSync(fileName);
    } catch (e) {
        console.error("ERR srvDF e:", e);
        isOk = false;
    }
    srvCtrl().set("didDeleteFile", isOk);
}

function srvListDir(path) {
    var files = [];

    try {
        var names = fs.readdirSync(path);
        names.sort();
        for (let i in names) {
            let name = names[i];
            let filePath = path + "/" + name;
            let isFile = fs.statSync(filePath).isFile();
            let f = new KT.FSFile(isFile, name);
            files.push(f);
        }
    } catch (e) {
        console.log(e);
    }

    srvCtrl().set("dirFiles", files);
}

function srvReadFile(fileName) {
    var contents = "";
    let type = mime.lookup(fileName);
    let isText = srvIsTextFile(type, fileName);

    // Binary
    if (!isText) {
        contents = SRV_CONTENTS_BINARY;
    }

    // Text
    if (isText) {
        try {
            contents = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });
        } catch (e) {
            contents = SRV_CONTENTS_404;
        }
    }
    srvCtrl().set("readFileContents", contents);
}

function srvResolvePath(relative) {
    let p = path.resolve(relative);
    srvCtrl().set("projectAbsPath", p);
}

function srvWriteFile(fileName, contents) {
    var isOk = true;
    try {
        fs.writeFileSync(fileName, contents);
    } catch (e) {
        console.error("ERR srvWF e:", e);
        isOk = false;
    }
    srvCtrl().set("didWriteFile", isOk);
}

//<!-- Functions -->

// Detect if served file is text
//
// Conditions:
// 1. MIME type was not detected -> Text
// 2. Specified MIME type -> Text
// 3. Unspecified MIME type -> Binary
function srvIsTextFile(mimeType, fileName) {
    /* 1 */ if (!mimeType) {
        return true;
    }

    /* 2 */ if (
        mimeType.startsWith("text") ||
        mimeType.includes("svg")
    ) {
        return true;
    }

    /* 3 */ return false;
}

//<!-- Installation -->

let cmp = new SrvComponent();

//<!-- Defaults -->

srvCtrl().set("arguments", process.argv);
srvCtrl().set("defaultBrowserDir", __dirname + "/../ver-browser");
srvCtrl().set("defaultHTTPPort", KT.SRV_DEFAULT_HTTP_PORT);

//<!-- Server -->

let srv = http.createServer((req, res) => {
    // Collect request body
    var body = "";
    req.on("data", (chunk) => {
        body = chunk.toString();
    });

    // Process request when finished collecting the body
    req.on("end", () => {
        let netRequest = new KT.NetRequest(body, req.method, req.url);
        srvCtrl().set("request", netRequest);
        let response = srvCtrl().context.response;
 
        // Allow CORS
        res.setHeader("Access-Control-Allow-Origin", "*");

        // File does not exist
        if (response.contents == SRV_CONTENTS_404) {
            res.writeHead(404);
            res.end();
            return;
        }

        let type = mime.lookup(req.url);
        let isText = srvIsTextFile(type, req.url);

        // Binary file
        if (response.contents == SRV_CONTENTS_BINARY) {
            res.setHeader("Content-Type", type);
            try {
                let fileName = srvCtrl().context.readFile;
                let buf = fs.readFileSync(fileName, { flag: "r" });
                res.writeHead(200);
                res.end(buf, "binary");
            } catch (e) {
                res.writeHead(404);
                res.end();
            }
            return;
        }

        // Text file
        res.setHeader("Content-Type", type);
        res.writeHead(200);
        res.end(response.contents);
    });
});

srv.listen(srvCtrl().context.httpPort, (e) => {
  srvCtrl().set("didLaunch", true);
});
