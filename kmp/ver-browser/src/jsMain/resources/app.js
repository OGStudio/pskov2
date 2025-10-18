//<!-- API -->

function appCtrl() {
    return window.appCmp.ctrl;
}

//<!-- Constants -->

let APP_FILES_ID = "files";
let APP_HEADER_KEY_ID = "headerKey";
let APP_HEADER_VALUE_ID = "headerValue";

let APP_INPUT_DIR_FILE_T = `
    <div>
        <div class='uk-card uk-card-default uk-card-hover uk-card-body cursor-pointer' onclick='appCtrl().set("selectedFileId", [%PAGE_ID%])'>
            <p><span uk-icon="file-text"></span>%NAME%</p>
            <p>TODO-Date</p>
            <h3 class="uk-card-title">TODO-Title</h3>
        </div>
    </div>
`;
let APP_INPUT_DIR_SECTION_ID_T = "input-dir-%I%";
let APP_INPUT_DIR_SECTION_T = `
<div class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom">
    <span class="uk-article-title highlight-article-digit">%NUM%</span>
    <span class="uk-article-title">%NAME%</span>
</div>
<div id="%ID%" class="uk-padding uk-padding-remove-left uk-padding-remove-right uk-padding-remove-bottom uk-grid-small uk-grid-match uk-child-width-1-3@m" uk-grid>
</div>
`;

let APP_EDITOR_ID = "editor";
let APP_EDITOR_CONTENTS_ID = "editorContents";
let APP_RENDER_ID = "render";
let APP_SPLASH_ID = "splash";
let APP_TAB_FILES_ID = "tabFiles";
let APP_TAB_EDITOR_ID = "tabEditor";
let APP_TAB_RENDER_ID = "tabRender";

//<!-- Component -->

function AppComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.AppContext());
        this.editor = null;
        registerCtrlDbgOutput(this.ctrl, "App", KT);

        // Defaults
        this.ctrl.set("baseURL", window.location.origin);

        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [ 
            "editorContents", (c) => { appResetEditorContents(this, c.editorContents) },
            "header", (c) => { appResetHeader(c.header) },
            "inputDirs", (c) => { appDisplayInputDirSections(c.inputDirs) },
            "inputMDFiles", (c) => { appDisplayInputMDFiles(c.inputMDFiles) },
            "installEditor", (c) => { appInstallEditor(this) },
            "request", (c) => { appLoad(c.request) },
            "selectedTabId", (c) => { appSelectTab(c.selectedTabId) },
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
            KT.appShouldInstallEditor,
            KT.appShouldListInputDir,
            KT.appShouldLoad,
            KT.appShouldParseCfg,
            KT.appShouldReadFile,
            KT.appShouldResetEditorContents,
            KT.appShouldResetHeader,
            KT.appShouldResetInputDirFiles,
            KT.appShouldResetInputDirs,
            KT.appShouldResetInputMDFiles,
            KT.appShouldResetProjectPath,
            KT.appShouldResetReadFileContents,
            KT.appShouldSelectTab,
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
    setUIText(APP_FILES_ID, html);
}

function appDisplayInputMDFiles(d) {
    // For each section
    KT.forKIntVArrayString(d, (id, files) => {
        var html = "";
        // For each file
        for (let i in files) {
            let name = files[i];
            let pageId = [id, i];
            html += APP_INPUT_DIR_FILE_T
                .replaceAll("%NAME%", name)
                .replaceAll("%PAGE_ID%", pageId);
        }
        let sectionId = APP_INPUT_DIR_SECTION_ID_T.replaceAll("%I%", id);
        setUIText(sectionId, html);
    });
}

function appHideSplash(timeout) {
    setTimeout(
        () => { setUIVisibility(APP_SPLASH_ID, false) },
        timeout
    );
}

function appInstallEditor(cmp) {
    cmp.editor = ace.edit(APP_EDITOR_CONTENTS_ID);
    /*
    var contents = editedContents[file];
    if (contents == null) {
        contents = originalContents;
    }
    editor.session.on("change", (d) => {
        this.ctrl.set("editedContents", editor.getValue());
    });
    */
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

function appResetEditorContents(cmp, contents) {
    cmp.editor.setValue(contents);
    cmp.editor.getSelection().clearSelection();
}

function appResetHeader(texts) {
    setUIText(APP_HEADER_KEY_ID, texts[0]);
    setUIText(APP_HEADER_VALUE_ID, texts[1]);
}

function appSelectTab(id) {
    setUIVisibility(APP_FILES_ID, id == KT.APP_TAB_FILES_INDEX);
    setUIVisibility(APP_EDITOR_ID, id == KT.APP_TAB_EDITOR_INDEX);
    setUIVisibility(APP_RENDER_ID, id == KT.APP_TAB_RENDER_INDEX);

    setUIClassActive(APP_TAB_FILES_ID, "uk-active", id == KT.APP_TAB_FILES_INDEX);
    setUIClassActive(APP_TAB_EDITOR_ID, "uk-active", id == KT.APP_TAB_EDITOR_INDEX);
    setUIClassActive(APP_TAB_RENDER_ID, "uk-active", id == KT.APP_TAB_RENDER_INDEX);
}

//<!-- Other functions -->

//<!-- Installation -->

window.appCmp = new AppComponent();
window.components.push(window.appCmp);
