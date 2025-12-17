//<!-- API -->

function appCtrl() {
    return window.appCmp.ctrl;
}

//<!-- Constants -->

let APP_FILE_OPTIONS = `
<table class="uk-table uk-table-divider uk-table-hover uk-table-middle">
    <tbody>
        <tr class="cursor-pointer" onclick='appCtrl().set("copyFileId", [%PAGE_ID%])'><td>
            <span uk-icon="copy"></span> Make a copy
        </td></tr>
        <tr class="cursor-pointer" onclick='appCtrl().set("renameFileId", [%PAGE_ID%])'><td>
            <span uk-icon="pencil"></span> Rename
        </td></tr>
        <tr class="cursor-pointer" onclick='appCtrl().set("deleteFileId", [%PAGE_ID%])'><td>
            <span uk-icon="trash"></span> Delete
        </td></tr>
    </tbody>
</table>
`;
let APP_FILES_ID = "files";
let APP_FILES_CONTENTS_ID = "filesContents";
let APP_HEADER_KEY_ID = "headerKey";
let APP_HEADER_VALUE_ID = "headerValue";

let APP_INPUT_DIR_FILE_T = `
<tr>
    <td>%YEAR%</td>
    <td>
        <a onclick='appCtrl().set("selectedFileId", [%PAGE_ID%])'>
            <span uk-icon="file-text"></span>
            %NAME%
        </a>
    </td>
    <td class="uk-inline">
        <button class="uk-button uk-button-default">
            <span uk-icon="more-vertical"></span>
        </button>
        <div id="dropdown-%PAGE_ID%" uk-dropdown="mode: click">
            %OPTIONS%
        </div>
    </td>
</tr>
`;
let APP_INPUT_DIR_SECTION_ID_T = "input-dir-%I%";
let APP_INPUT_DIR_SECTION_T = `
<li>
    <a class="uk-accordion-title" href>
        <span uk-icon="folder"></span>
        %NAME%
        <span uk-accordion-icon></span>
    </a>
    <table class="uk-accordion-content uk-table uk-table-divider uk-table-middle">
        <thead>
            <tr>
                <th>Year</th>
                <th>File</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody id="%ID%">
        </tbody>
    </table>
</li>
`;

let APP_EDITOR_ID = "editor";
let APP_EDITOR_CONTENTS_ID = "editorContents";
let APP_RENDER_ID = "render";
let APP_RENDER_CONTENTS_ID = "renderContents";
let APP_SPLASH_ID = "splash";
let APP_TAB_FILES_ID = "tabFiles";
let APP_TAB_EDITOR_ID = "tabEditor";
let APP_TAB_RENDER_ID = "tabRender";

//<!-- Component -->

function AppComponent() {
    this._construct = function() {
        this.ctrl = new KT.CLDController(new KT.AppContext());
        this.editor = null;
        this.mdConverter = null;
        registerCtrlDbgOutput(this.ctrl, "App", KT);

        // Defaults
        this.ctrl.set("baseURL", window.location.origin);

        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let oneliners = [
            "converterInput", (c) => { appResetConverterInput(this, c.converterInput) },
            "didSaveEditedFiles", (c) => { reportSuccess("💾 👌") },
            "editorContents", (c) => { appResetEditorContents(this, c.editorContents) },
            "header", (c) => { appResetHeader(c.header) },
            "inputDirs", (c) => { appDisplayInputDirSections(c.inputDirs) },
            "inputMDFiles", (c) => { appDisplayInputMDFiles(c.inputMDFiles) },
            "installEditor", (c) => { appInstallEditor(this) },
            "installMDConverter", (c) => { appInstallMDConverter(this) },
            "renderPage", (c) => { appRenderPage(c.renderPage) },
            "request", (c) => { appLoad(c.request) },
            "resizeEditor", (c) => { appResizeEditor() },
            "resizeRenderer", (c) => { appResizeRenderer() },
            "selectedTabId", (c) => { appSelectTab(c.selectedTabId) },
            "splashTimeout", (c) => { appHideSplash(c.splashTimeout) },
        ];
        KT.registerOneliners(this.ctrl, oneliners);
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
        window.addEventListener("resize", (e) => {
            this.ctrl.set("didResize", true);
        });
    };

    this.setupShoulds = function() {
        [
            KT.appShouldHideSplash,
            KT.appShouldInstallEditor,
            KT.appShouldInstallMDConverter,
            KT.appShouldListInputDir,
            KT.appShouldLoad,
            KT.appShouldParseCfg,
            KT.appShouldReadFile,
            KT.appShouldRenderPage,
            KT.appShouldResetConverterInput,
            KT.appShouldResetDidSaveEditedFiles,
            KT.appShouldResetDidSaveFile,
            KT.appShouldResetDidSaveRenderedFile,
            KT.appShouldResetEditedFileContents,
            KT.appShouldResetEditorContents,
            KT.appShouldResetHeader,
            KT.appShouldResetInputDirFiles,
            KT.appShouldResetInputDirs,
            KT.appShouldResetInputMDFiles,
            KT.appShouldResetItemTemplates,
            KT.appShouldResetPage,
            KT.appShouldResetProjectPath,
            KT.appShouldResetReadFileContents,
            KT.appShouldResizeEditor,
            KT.appShouldResizeRenderer,
            KT.appShouldSaveFileId,
            KT.appShouldSaveFiles,
            KT.appShouldSaveRenderedFile,
            KT.appShouldSelectFileName,
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
    setUIText(APP_FILES_CONTENTS_ID, html);
}

function appDisplayInputMDFiles(d) {
    // For each section
    KT.forKIntVArrayString(d, (id, files) => {
        var html = "";

        // Find out if this is a list of year sorted files
        let isYearSorted = (KT.appYear(files[0]) != 0);
        // Reverse year sorted files
        if (isYearSorted) {
            files.reverse()
        }
        var lastYear = "";
        // For each file
        for (let i in files) {
            let name = files[i];
            let pageId = [id, i];
            // Leave only differing years
            let year = KT.appYear(name);
            if (year != lastYear) {
                lastYear = year;
            } else {
                year = "";
            }

            html += APP_INPUT_DIR_FILE_T
                .replaceAll("%NAME%", name)
                .replaceAll("%OPTIONS%", APP_FILE_OPTIONS)
                .replaceAll("%PAGE_ID%", pageId)
                .replaceAll("%YEAR%", year);
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
    cmp.editor.session.setUseWrapMode(true);
    cmp.editor.session.on("change", (d) => {
        appCtrl().set("editedContents", cmp.editor.getValue());
    });
}

function appInstallMDConverter(cmp) {
    cmp.mdConverter = new showdown.Converter();
    cmp.mdConverter.setOption("tables", true);
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

function appRenderPage(url) {
    let iframe = deId(APP_RENDER_CONTENTS_ID);
    iframe.src = url;
}

function appResetConverterInput(cmp, contents) {
    let html = cmp.mdConverter.makeHtml(contents);
    appCtrl().set("converterOutput", html);
}

function appResetEditorContents(cmp, contents) {
    cmp.editor.setValue(contents);
    cmp.editor.getSelection().clearSelection();
}

function appResetHeader(texts) {
    setUIText(APP_HEADER_KEY_ID, texts[0]);
    setUIText(APP_HEADER_VALUE_ID, texts[1]);
}

function appResizeEditor() {
    let height = window.innerHeight;
    let ed = deId(APP_EDITOR_CONTENTS_ID);
    let rect = ed.getBoundingClientRect();
    let targetHeight = height - rect.y;
    ed.style.height = `${targetHeight}px`;
}

function appResizeRenderer() {
    let height = window.innerHeight;
    let rn = deId(APP_RENDER_CONTENTS_ID);
    let rect = rn.getBoundingClientRect();
    let targetHeight = height - rect.y;
    rn.style.height = `${targetHeight}px`;
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
