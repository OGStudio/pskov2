//<!-- API -->

function appCtrl() {
    return window.appCmp.ctrl;
}

//<!-- Constants -->

let APP_HEADER_PATH_ID = "header-path";

let APP_INPUT_DIR_FILE_T = `
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <p>%DATE%</p>
            <h3 class="uk-card-title">%NAME%</h3>
        </div>
    </div>
`;
let APP_INPUT_DIR_SECTION_ID_T = "input-dir-%I%";
let APP_INPUT_DIR_SECTION_T = `
<div class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom">
    <span class="uk-article-title highlight-article-digit">%NUM%</span>
    <span class="uk-article-title">%NAME%</span>
</div>
<div id="%ID%" class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom uk-grid-small uk-grid-match uk-child-width-1-3@s" uk-grid>
</div>
`;
let APP_INPUT_DIRS_ID = "input-dirs";

let APP_SPLASH_ID = "splash";

//<!-- Component -->

function AppComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.AppContext());
        registerCtrlDbgOutput(this.ctrl, "App", KT);

        // Defaults
        this.ctrl.set("baseURL", window.location.origin);

        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
            "inputDirs", (c) => { appDisplayInputDirSections(c.inputDirs) },
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
            KT.appShouldListInputDir,
            KT.appShouldLoad,
            KT.appShouldParseCfg,
            KT.appShouldResetInputDirFiles,
            KT.appShouldResetInputDirs,
            KT.appShouldResetProjectPath,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    
    this._construct();
}

//<!-- Effects -->

function appDisplayInputDirSections(items) {
    var html = "";
    for (let i in items) {
        let item = items[i];
        let id = APP_INPUT_DIR_SECTION_ID_T.replaceAll("%I%", i);
        html += APP_INPUT_DIR_SECTION_T
            .replaceAll("%ID%", id)
            .replaceAll("%NAME%", item)
            .replaceAll("%NUM%", Number(i) + 1);
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
