//<!-- API -->

function appCtrl() {
    return window.appCmp.ctrl;
}

//<!-- Constants -->

let APP_HEADER_PATH_ID = "header-path";
let APP_SPLASH_ID = "splash";

//<!-- Component -->

function AppComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.AppContext());
        // Debug.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР AppC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        // Defaults
        this.ctrl.set("baseURL", window.location.origin);

        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
            "projectPath", (c) => { appDisplayPath(c.projectPath) },
            "request", (c) => { appLoad(c.request) },
            "splashTimeout", (c) => { appHideSplash(c.splashTimeout) },
        ];
        let halfCount = oneliners.length / 2;
        for (let i = 0; i < halfCount; ++i) {
            let field = oneliners[i * 2];
            let cb = oneliners[i * 2 + 1];
            this.ctrl.registerFieldCallback(field, cb);
        }
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
    };

    this.setupShoulds = function() {
        [
            KT.appShouldHideSplash,
            KT.appShouldLoad,
            KT.appShouldResetProjectPath,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    
    this._construct();
}

//<!-- Effects -->

function appDisplayPath(path) {
    setUIText(APP_HEADER_PATH_ID, path);
}

function appHideSplash(timeout) {
    setTimeout(
        () => { setUIVisibility(APP_SPLASH_ID, false) },
        timeout
    );
}

function appLoad(req) {
    loadURL(
        req,
        (res) => {
            var resp = new KT.NetResponse(res.responseText, res.responseURL);
            appCtrl().set("response", resp);
        },
        (res) => {
            var err = new KT.NetResponse(res.contents, res.url);
            appCtrl().set("responseError", err);
        }
    );
}

//<!-- Other functions -->

//<!-- Installation -->

window.appCmp = new AppComponent();
window.components.push(window.appCmp);
