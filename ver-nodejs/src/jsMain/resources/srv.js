let http = require("http");
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
    };

    this.setupShoulds = function() {
    };

    this._construct();
}

//<!-- Installation -->

let cmp = new SrvComponent();

let srv = http.createServer((req, res) => {
    let netRequest = new KT.NetRequest("", req.method, req.url);
    cmp.ctrl.set("request", netRequest);

    console.log("ИГР req.url/method:", req.url, req.method);
    //console.log("ИГР res:", res);
    res.write("Hello, world. KT is in the console");
    res.end();
});
srv.listen(8099)

