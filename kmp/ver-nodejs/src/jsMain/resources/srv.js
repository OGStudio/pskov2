let fs = require("fs");
let http = require("http");
let open = require("open");
let KT = require("pskov-ver-nodejs").org.opengamestudio;

//!<-- API -->

function srvCtrl() {
    return cmp.ctrl;
}

//!<-- Component -->

function SrvComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.SrvContext());
        // Debugging.
        this.ctrl.registerCallback((c) => {
            let key = c.recentField;
            var val = `${c.field(c.recentField)}`;
            if (val.length > 200) {
                val = val.substring(0, 50);
            }
            console.log(`ИГР SrvC._construct ctrl key/value: '${key}'/'${val}'`);
        });

        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
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

    this.setupEvents = function() {
        this.ctrl.set("arguments", process.argv);
    };

    this.setupShoulds = function() {
        [
            KT.srvShouldOpenURL,
            KT.srvShouldReadFile,
            KT.srvShouldResetBrowserDir,
            KT.srvShouldResetHTTPPort,
            KT.srvShouldResetResponse,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this._construct();
}

//<!-- Effects -->

function srvReadFile(fileName) {
    let contents = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });
    srvCtrl().set("readFileContents", contents);
}

//<!-- Installation -->

let cmp = new SrvComponent();

//<!-- Defaults -->
srvCtrl().set("defaultHTTPPort", KT.SRV_DEFAULT_HTTP_PORT);

let srv = http.createServer((req, res) => {
    let netRequest = new KT.NetRequest(req.method, req.url);
    srvCtrl().set("request", netRequest);
    res.write(srvCtrl().context.response.contents);
    res.end();
});

srv.listen(srvCtrl().context.httpPort, (e) => {
  srvCtrl().set("didLaunch", true);
});
