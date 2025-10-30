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

let SRV_ERR_HTTP_404 = "404";

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
            "listDir", (c) => { srvListDir(c.listDir) },
            "projectDir", (c) => { srvResolvePath(c.projectDir) },
            "readFile", (c) => { srvReadFile(c.readFile) },
            "url", (c) => { open(c.url) },
            "writeFile", (c) => { srvWriteFile(c.writeFile[0], c.writeFile[1]) },
        ];
        let halfCount = oneliners.length / 2;
        for (let i = 0; i < halfCount; ++i) {
            let field = oneliners[i * 2];
            let cb = oneliners[i * 2 + 1];
            this.ctrl.registerFieldCallback(field, cb);
        }
    };

    this.setupShoulds = function() {
        [
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
    try {
        contents = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });
    } catch (e) {
        contents = SRV_ERR_HTTP_404;
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
        if (response.contents == SRV_ERR_HTTP_404) {
            res.writeHead(404);
            res.end();
        }
        // File exists
        if (response.contents != SRV_ERR_HTTP_404) {
            let type = mime.lookup(response.req.url);
            res.setHeader("Content-Type", type);
            res.writeHead(200);
            res.end(response.contents);
        }
    });
});

srv.listen(srvCtrl().context.httpPort, (e) => {
  srvCtrl().set("didLaunch", true);
});
