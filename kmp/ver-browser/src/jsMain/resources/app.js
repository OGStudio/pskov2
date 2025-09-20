//<!-- API -->

function appCtrl() {
    return window.appCmp.ctrl;
}

//<!-- Constants -->

let APP_HEADER_PATH_ID = "header-path";

let APP_INPUT_DIR_TITLE_T = `
<div class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom">
    <span class="uk-article-title highlight-article-digit">%ID%</span>
    <span class="uk-article-title">%NAME%</span>
</div>
`;
let APP_INPUT_DIRS_ID = "input-dirs";

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
            "inputDirs", (c) => { appDisplayInputDirs(c.inputDirs) },
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
            KT.appShouldParseCfg,
            KT.appShouldResetInputDirs,
            KT.appShouldResetProjectPath,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    
    this._construct();
}

//<!-- Effects -->

function appDisplayInputDirs(items) {
    var html = "";
    for (let i in items) {
        let item = items[i];
        html += APP_INPUT_DIR_TITLE_T
            .replaceAll("%ID%", Number(i) + 1)
            .replaceAll("%NAME%", item);
    }

    setUIText(APP_INPUT_DIRS_ID, html);
}

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
        (resOk) => {
            var r = new KT.NetResponse(resOk.response.responseText, req);
            appCtrl().set("response", r);
        },
        (resErr) => {
            var r = new KT.NetResponse(resErr.contents, req);
            appCtrl().set("responseError", r);
        }
    );
}

//<!-- Other functions -->

//<!-- Installation -->

window.appCmp = new AppComponent();
window.components.push(window.appCmp);
