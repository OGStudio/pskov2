let http = require("http");
let open = require("open");
let KT = require("pskov-ver-nodejs").org.opengamestudio;

//!<-- Component -->

function SrvComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.SrvContext());
        // Debugging.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР SrvC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
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
            KT.srvShouldResetHTTPPort,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this._construct();
}

//<!-- Installation -->

let cmp = new SrvComponent();
let ctrl = cmp.ctrl;

// Defaults.
ctrl.set("defaultHTTPPort", KT.SRV_DEFAULT_HTTP_PORT);

let srv = http.createServer((req, res) => {
    let netRequest = new KT.NetRequest("", req.method, req.url);
    ctrl.set("request", netRequest);

    console.log("ИГР req.url/method:", req.url, req.method);
    //console.log("ИГР res:", res);
    res.write("Hello, world. KT is in the console");
    res.end();
});

srv.listen(ctrl.context.httpPort, (e) => {
  ctrl.set("didLaunch", true);
});
