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

let srv = http.createServer((req, res) => {
    console.log("ИГР req:", req);
    console.log("ИГР res:", res);
    res.write("Hello, world. Kotlin is in the console");
    res.end();
});
srv.listen(8099)

