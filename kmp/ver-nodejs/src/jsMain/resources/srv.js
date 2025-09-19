let fs = require("fs");
let http = require("http");
let mime = require("mime-types");
let open = require("open");
let path = require("path");
let KT = require("pskov-ver-nodejs").org.opengamestudio;

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
        // Debugging.
        this.ctrl.registerCallback((c) => {
            let k = c.recentField;
            var v = `${c.field(c.recentField)}`;
            v = KT.shortFieldValue(v);
            console.log(`ИГР SrvC._construct ctrl key/value: '${k}'/'${v}'`);
        });

        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
            "projectDir", (c) => { srvResolvePath(c.projectDir) },
            "readFile", (c) => { srvReadFile(c.readFile) },
            "url", (c) => { open(c.url) },
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
            KT.srvShouldOpenURL,
            KT.srvShouldReadFile,
            KT.srvShouldResetBrowserDir,
            KT.srvShouldResetHTTPPort,
            KT.srvShouldResetProjectDir,
            KT.srvShouldResetResponse,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this._construct();
}

//<!-- Effects -->

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

//<!-- Installation -->

let cmp = new SrvComponent();

//<!-- Defaults -->

srvCtrl().set("arguments", process.argv);
srvCtrl().set("defaultHTTPPort", KT.SRV_DEFAULT_HTTP_PORT);

//<!-- Server -->

let srv = http.createServer((req, res) => {
    // Collect request body
    var body = "";
    req.on("data", (chunk) => {
        console.log("ИГР req.on data chunk:", chunk);
        body = chunk.toString();
    });

    // Process request when finished collecting the body
    req.on("end", () => {
        let netRequest = new KT.NetRequest(body, req.method, req.url);
        srvCtrl().set("request", netRequest);
        let response = srvCtrl().context.response;
 
        // File does not exist
        if (response.contents == SRV_ERR_HTTP_404) {
            res.writeHead(404);
            res.end();
        }
        // File exists
        if (response.contents != SRV_ERR_HTTP_404) {
            let type = mime.lookup(response.url);
            res.setHeader("Content-Type", type);
            res.writeHead(200);
            res.end(response.contents);
        }
    });
});

srv.listen(srvCtrl().context.httpPort, (e) => {
  srvCtrl().set("didLaunch", true);
});
