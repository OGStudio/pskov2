(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'pskov:ver-browser'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'pskov:ver-browser'.");
    }
    globalThis['pskov:ver-browser'] = factory(typeof globalThis['pskov:ver-browser'] === 'undefined' ? {} : globalThis['pskov:ver-browser'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.x;
  var initMetadataForInterface = kotlin_kotlin.$_$.u;
  var Unit_instance = kotlin_kotlin.$_$.e;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.b;
  var removeFirst = kotlin_kotlin.$_$.k;
  var initMetadataForClass = kotlin_kotlin.$_$.t;
  var ensureNotNull = kotlin_kotlin.$_$.i1;
  var toMutableMap = kotlin_kotlin.$_$.l;
  var emptyMap = kotlin_kotlin.$_$.i;
  var println = kotlin_kotlin.$_$.m;
  var charSequenceLength = kotlin_kotlin.$_$.n;
  var split = kotlin_kotlin.$_$.c1;
  var emptyList = kotlin_kotlin.$_$.h;
  var copyToArray = kotlin_kotlin.$_$.g;
  var defineProp = kotlin_kotlin.$_$.o;
  var VOID = kotlin_kotlin.$_$.a;
  var THROW_CCE = kotlin_kotlin.$_$.h1;
  var KtMap = kotlin_kotlin.$_$.f;
  var isInterface = kotlin_kotlin.$_$.w;
  var isArray = kotlin_kotlin.$_$.v;
  var toString = kotlin_kotlin.$_$.y;
  var getStringHashCode = kotlin_kotlin.$_$.r;
  var hashCode = kotlin_kotlin.$_$.s;
  var getBooleanHashCode = kotlin_kotlin.$_$.q;
  var equals = kotlin_kotlin.$_$.p;
  var substring = kotlin_kotlin.$_$.e1;
  var startsWith = kotlin_kotlin.$_$.d1;
  var take = kotlin_kotlin.$_$.g1;
  var joinToString = kotlin_kotlin.$_$.j;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.c;
  var Default_getInstance = kotlin_kotlin.$_$.d;
  var decodeToString = kotlin_kotlin.$_$.z;
  var substring_0 = kotlin_kotlin.$_$.f1;
  var endsWith = kotlin_kotlin.$_$.b1;
  var encodeToByteArray = kotlin_kotlin.$_$.a1;
  //endregion
  //region block: pre-declaration
  function fieldAny(name) {
    return this.field(name);
  }
  initMetadataForInterface(CLDContext, 'CLDContext');
  initMetadataForClass(CLDController, 'CLDController');
  initMetadataForClass(AppContext, 'AppContext', AppContext, VOID, [CLDContext]);
  initMetadataForClass(FSFile, 'FSFile', FSFile);
  initMetadataForClass(NetRequest, 'NetRequest', NetRequest);
  initMetadataForClass(NetResponse, 'NetResponse', NetResponse);
  initMetadataForClass(SrvContext, 'SrvContext', SrvContext, VOID, [CLDContext]);
  //endregion
  function CLDContext() {
  }
  function CLDController$registerFieldCallback$lambda($fieldName, $cb) {
    return function (c) {
      var tmp;
      if (c.recentField === $fieldName) {
        tmp = $cb(c);
      }
      return Unit_instance;
    };
  }
  function CLDController(context) {
    this.context = context;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.g9_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.h9_1 = ArrayList_init_$Create$();
    this.isProcessingQueue = false;
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_1.i9_1 = ArrayList_init_$Create$();
  }
  protoOf(CLDController).j9 = function (_set____db54di) {
    this.context = _set____db54di;
  };
  protoOf(CLDController).k9 = function () {
    return this.context;
  };
  protoOf(CLDController).l9 = function (_set____db54di) {
    this.g9_1 = _set____db54di;
  };
  protoOf(CLDController).m9 = function () {
    return this.g9_1;
  };
  protoOf(CLDController).n9 = function (_set____db54di) {
    this.h9_1 = _set____db54di;
  };
  protoOf(CLDController).o9 = function () {
    return this.h9_1;
  };
  protoOf(CLDController).p9 = function (_set____db54di) {
    this.isProcessingQueue = _set____db54di;
  };
  protoOf(CLDController).q9 = function () {
    return this.isProcessingQueue;
  };
  protoOf(CLDController).r9 = function (_set____db54di) {
    this.i9_1 = _set____db54di;
  };
  protoOf(CLDController).s9 = function () {
    return this.i9_1;
  };
  protoOf(CLDController).executeFunctions = function () {
    var c = removeFirst(this.i9_1);
    this.context.e9(c.recentField);
    this.context.setField(c.recentField, c.fieldAny(c.recentField));
    var _iterator__ex2g4s = this.h9_1.e();
    while (_iterator__ex2g4s.f()) {
      var f = _iterator__ex2g4s.g();
      var ctx = f(this.context.selfCopy());
      if (!(ctx.recentField === 'none')) {
        this.i9_1.a2(ctx);
      }
    }
    this.reportContext();
  };
  protoOf(CLDController).processQueue = function () {
    if (this.isProcessingQueue) {
      return Unit_instance;
    }
    this.isProcessingQueue = true;
    while (this.i9_1.h() > 0) {
      this.executeFunctions();
    }
    this.isProcessingQueue = false;
  };
  protoOf(CLDController).registerCallback = function (cb) {
    this.g9_1.a2(cb);
  };
  protoOf(CLDController).registerFieldCallback = function (fieldName, cb) {
    var tmp = this.g9_1;
    tmp.a2(CLDController$registerFieldCallback$lambda(fieldName, cb));
  };
  protoOf(CLDController).registerFunction = function (f) {
    this.h9_1.a2(f);
  };
  protoOf(CLDController).reportContext = function () {
    var _iterator__ex2g4s = this.g9_1.e();
    while (_iterator__ex2g4s.f()) {
      var cb = _iterator__ex2g4s.g();
      cb(this.context);
    }
  };
  protoOf(CLDController).set = function (fieldName, value) {
    var c = this.context.selfCopy();
    c.setField(fieldName, value);
    c.e9(fieldName);
    this.i9_1.a2(c);
    this.processQueue();
  };
  function get_APP_CFG_FILE() {
    return APP_CFG_FILE;
  }
  var APP_CFG_FILE;
  function get_APP_CFG_KEY_INPUT() {
    return APP_CFG_KEY_INPUT;
  }
  var APP_CFG_KEY_INPUT;
  function get_APP_HEADER_KEY_FILE() {
    return APP_HEADER_KEY_FILE;
  }
  var APP_HEADER_KEY_FILE;
  function get_APP_HEADER_KEY_PROJECT() {
    return APP_HEADER_KEY_PROJECT;
  }
  var APP_HEADER_KEY_PROJECT;
  function get_APP_TAB_EDITOR_INDEX() {
    return APP_TAB_EDITOR_INDEX;
  }
  var APP_TAB_EDITOR_INDEX;
  function get_APP_TAB_FILES_INDEX() {
    return APP_TAB_FILES_INDEX;
  }
  var APP_TAB_FILES_INDEX;
  function get_APP_TAB_RENDER_INDEX() {
    return APP_TAB_RENDER_INDEX;
  }
  var APP_TAB_RENDER_INDEX;
  function get_APP_SPLASH_TIMEOUT() {
    return APP_SPLASH_TIMEOUT;
  }
  var APP_SPLASH_TIMEOUT;
  function appShouldHideSplash(c) {
    if (c.t9_1 === 'didLaunch') {
      c.splashTimeout = APP_SPLASH_TIMEOUT;
      c.t9_1 = 'splashTimeout';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldInstallEditor(c) {
    if (c.t9_1 === 'didLaunch') {
      c.installEditor = true;
      c.t9_1 = 'installEditor';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldLoad(c) {
    if (c.t9_1 === 'didLaunch') {
      c.request = new NetRequest('', get_CONST_GET(), appURL(c.baseURL, get_CONST_API_PATH()));
      c.t9_1 = 'request';
      return c;
    }
    if (c.t9_1 === 'projectPath') {
      c.request = new NetRequest(APP_CFG_FILE, get_CONST_POST(), appURL(c.baseURL, get_CONST_API_READ()));
      c.t9_1 = 'request';
      return c;
    }
    if (c.t9_1 === 'listInputDirId') {
      var dir = c.inputDirs[c.listInputDirId];
      c.request = new NetRequest(dir, get_CONST_POST(), appURL(c.baseURL, get_CONST_API_LIST()));
      c.t9_1 = 'request';
      return c;
    }
    if (c.t9_1 === 'readFile') {
      c.request = new NetRequest(c.readFile, get_CONST_POST(), appURL(c.baseURL, get_CONST_API_READ()));
      c.t9_1 = 'request';
      return c;
    }
    if (c.t9_1 === 'saveFileId') {
      var file = c.saveFiles[c.saveFileId];
      var contents = ensureNotNull(c.editedFileContents.t(file));
      var body = fileContentsToJSON(file, contents);
      c.request = new NetRequest(body, get_CONST_POST(), appURL(c.baseURL, get_CONST_API_WRITE()));
      c.t9_1 = 'request';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldListInputDir(c) {
    if (c.t9_1 === 'inputDirs' && c.inputDirs.length > 0) {
      c.listInputDirId = 0;
      c.t9_1 = 'listInputDirId';
      return c;
    }
    if (c.t9_1 === 'inputDirFiles' && (c.listInputDirId + 1 | 0) < c.inputDirs.length) {
      c.listInputDirId = c.listInputDirId + 1 | 0;
      c.t9_1 = 'listInputDirId';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldParseCfg(c) {
    if (c.t9_1 === 'response' && c.response.req.method === get_CONST_POST() && c.response.req.url === appURL(c.baseURL, get_CONST_API_READ()) && c.response.req.body === APP_CFG_FILE) {
      c.cfg = parseCfg(c.response.contents);
      c.t9_1 = 'cfg';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldReadFile(c) {
    if (c.t9_1 === 'selectedFileName' && c.editedFileContents.t(c.selectedFileName) == null) {
      c.readFile = c.selectedFileName;
      c.t9_1 = 'readFile';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetDidSaveEditedFiles(c) {
    if (c.t9_1 === 'didSaveFile' && (c.saveFileId + 1 | 0) === c.saveFiles.length) {
      c.didSaveEditedFiles = true;
      c.t9_1 = 'didSaveEditedFiles';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetDidSaveFile(c) {
    if (c.t9_1 === 'response' && c.response.req.method === get_CONST_POST() && c.response.req.url === appURL(c.baseURL, get_CONST_API_WRITE())) {
      c.didSaveFile = true;
      c.t9_1 = 'didSaveFile';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetEditedFileContents(c) {
    if (c.t9_1 === 'editedContents') {
      var fileContents = toMutableMap(c.editedFileContents);
      var tmp2 = c.selectedFileName;
      // Inline function 'kotlin.collections.set' call
      var value = c.editedContents;
      fileContents.x1(tmp2, value);
      c.editedFileContents = fileContents;
      c.t9_1 = 'editedFileContents';
      return c;
    }
    if (c.t9_1 === 'didSaveEditedFiles') {
      var tmp = c;
      // Inline function 'kotlin.collections.mapOf' call
      tmp.editedFileContents = emptyMap();
      c.t9_1 = 'editedFileContents';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetEditorContents(c) {
    if (c.t9_1 === 'readFileContents') {
      println('\u0418\u0413\u0420 appF.appSREC-1');
      c.editorContents = c.readFileContents;
      c.t9_1 = 'editorContents';
      return c;
    }
    if (c.t9_1 === 'selectedFileName' && !(c.editedFileContents.t(c.selectedFileName) == null)) {
      println('\u0418\u0413\u0420 appF.appSREC-2');
      c.editorContents = ensureNotNull(c.editedFileContents.t(c.selectedFileName));
      c.t9_1 = 'editorContents';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetHeader(c) {
    if (c.t9_1 === 'selectedTabId' && c.selectedTabId === APP_TAB_FILES_INDEX) {
      var tmp = c;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp.header = [APP_HEADER_KEY_PROJECT, c.projectPath];
      c.t9_1 = 'header';
      return c;
    }
    if (c.t9_1 === 'projectPath' && c.selectedTabId === APP_TAB_FILES_INDEX) {
      var tmp_0 = c;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_0.header = [APP_HEADER_KEY_PROJECT, c.projectPath];
      c.t9_1 = 'header';
      return c;
    }
    var tmp_1;
    if (c.t9_1 === 'selectedTabId' && c.selectedTabId === APP_TAB_EDITOR_INDEX) {
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = c.readFile;
      tmp_1 = !(charSequenceLength(this_0) === 0);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      var tmp_2 = c;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_2.header = [APP_HEADER_KEY_FILE, c.selectedFileName];
      c.t9_1 = 'header';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetInputDirFiles(c) {
    if (c.t9_1 === 'response' && c.listInputDirId < c.inputDirs.length && c.inputDirs[c.listInputDirId] === c.request.body && c.response.req.url === appURL(c.baseURL, get_CONST_API_LIST())) {
      var d = toMutableMap(c.inputDirFiles);
      var tmp2 = c.listInputDirId;
      // Inline function 'kotlin.collections.set' call
      var value = jsonToFiles(c.response.contents);
      d.x1(tmp2, value);
      c.inputDirFiles = d;
      c.t9_1 = 'inputDirFiles';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetInputDirs(c) {
    if (c.t9_1 === 'cfg') {
      var tmp0_safe_receiver = c.cfg.t(APP_CFG_KEY_INPUT);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : split(tmp0_safe_receiver, [';']);
      var dirs = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
      var tmp = c;
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp.inputDirs = copyToArray(dirs);
      c.t9_1 = 'inputDirs';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetInputMDFiles(c) {
    if (c.t9_1 === 'inputDirFiles' && (c.listInputDirId + 1 | 0) === c.inputDirs.length) {
      c.inputMDFiles = mdFiles(c.inputDirFiles);
      c.t9_1 = 'inputMDFiles';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetProjectPath(c) {
    if (c.t9_1 === 'response' && c.response.req.url === appURL(c.baseURL, get_CONST_API_PATH())) {
      c.projectPath = c.response.contents;
      c.t9_1 = 'projectPath';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResetReadFileContents(c) {
    if (c.t9_1 === 'response' && c.response.req.method === get_CONST_POST() && c.response.req.url === appURL(c.baseURL, get_CONST_API_READ()) && c.response.req.body === c.readFile) {
      c.readFileContents = c.response.contents;
      c.t9_1 = 'readFileContents';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldResizeEditor(c) {
    if (c.t9_1 === 'didResize' && c.selectedTabId === APP_TAB_EDITOR_INDEX) {
      c.resizeEditor = true;
      c.t9_1 = 'resizeEditor';
      return c;
    }
    if (c.t9_1 === 'selectedTabId' && c.selectedTabId === APP_TAB_EDITOR_INDEX) {
      c.resizeEditor = true;
      c.t9_1 = 'resizeEditor';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldSaveFileId(c) {
    if (c.t9_1 === 'saveFiles' && !c.editedFileContents.m()) {
      c.saveFileId = 0;
      c.t9_1 = 'saveFileId';
      return c;
    }
    if (c.t9_1 === 'didSaveFile' && (c.saveFileId + 1 | 0) < c.saveFiles.length) {
      c.saveFileId = c.saveFileId + 1 | 0;
      c.t9_1 = 'saveFileId';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldSaveFiles(c) {
    if (c.t9_1 === 'didClickSaveBtn') {
      var tmp = c;
      // Inline function 'kotlin.collections.toTypedArray' call
      var this_0 = c.editedFileContents.u();
      tmp.saveFiles = copyToArray(this_0);
      c.t9_1 = 'saveFiles';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldSelectFileName(c) {
    if (c.t9_1 === 'selectedFileId') {
      var inputDirId = c.selectedFileId[0];
      var mdFileId = c.selectedFileId[1];
      var dir = ensureNotNull(c.inputDirs[inputDirId]);
      var file = ensureNotNull(ensureNotNull(c.inputMDFiles.t(inputDirId))[mdFileId]);
      c.selectedFileName = dir + '/' + file;
      c.t9_1 = 'selectedFileName';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appShouldSelectTab(c) {
    if (c.t9_1 === 'didLaunch') {
      c.selectedTabId = APP_TAB_FILES_INDEX;
      c.t9_1 = 'selectedTabId';
      return c;
    }
    if (c.t9_1 === 'didClickFilesTab') {
      c.selectedTabId = APP_TAB_FILES_INDEX;
      c.t9_1 = 'selectedTabId';
      return c;
    }
    if (c.t9_1 === 'didClickEditorTab') {
      c.selectedTabId = APP_TAB_EDITOR_INDEX;
      c.t9_1 = 'selectedTabId';
      return c;
    }
    if (c.t9_1 === 'didClickRenderTab') {
      c.selectedTabId = APP_TAB_RENDER_INDEX;
      c.t9_1 = 'selectedTabId';
      return c;
    }
    if (c.t9_1 === 'selectedFileName') {
      c.selectedTabId = APP_TAB_EDITOR_INDEX;
      c.t9_1 = 'selectedTabId';
      return c;
    }
    c.t9_1 = 'none';
    return c;
  }
  function appURL(baseURL, api) {
    return baseURL + api;
  }
  function get_CONST_API_LIST() {
    return CONST_API_LIST;
  }
  var CONST_API_LIST;
  function get_CONST_API_PATH() {
    return CONST_API_PATH;
  }
  var CONST_API_PATH;
  function get_CONST_API_READ() {
    return CONST_API_READ;
  }
  var CONST_API_READ;
  function get_CONST_API_WRITE() {
    return CONST_API_WRITE;
  }
  var CONST_API_WRITE;
  function get_CONST_EXT_MD() {
    return CONST_EXT_MD;
  }
  var CONST_EXT_MD;
  function get_CONST_GET() {
    return CONST_GET;
  }
  var CONST_GET;
  function get_CONST_POST() {
    return CONST_POST;
  }
  var CONST_POST;
  function AppContext(baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField) {
    baseURL = baseURL === VOID ? '' : baseURL;
    var tmp;
    if (cfg === VOID) {
      // Inline function 'kotlin.collections.mapOf' call
      tmp = emptyMap();
    } else {
      tmp = cfg;
    }
    cfg = tmp;
    didClickEditorTab = didClickEditorTab === VOID ? false : didClickEditorTab;
    didClickFilesTab = didClickFilesTab === VOID ? false : didClickFilesTab;
    didClickRenderTab = didClickRenderTab === VOID ? false : didClickRenderTab;
    didClickSaveBtn = didClickSaveBtn === VOID ? false : didClickSaveBtn;
    didLaunch = didLaunch === VOID ? false : didLaunch;
    didResize = didResize === VOID ? false : didResize;
    didSaveEditedFiles = didSaveEditedFiles === VOID ? false : didSaveEditedFiles;
    didSaveFile = didSaveFile === VOID ? false : didSaveFile;
    editedContents = editedContents === VOID ? '' : editedContents;
    var tmp_0;
    if (editedFileContents === VOID) {
      // Inline function 'kotlin.collections.mapOf' call
      tmp_0 = emptyMap();
    } else {
      tmp_0 = editedFileContents;
    }
    editedFileContents = tmp_0;
    editorContents = editorContents === VOID ? '' : editorContents;
    var tmp_1;
    if (header === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_1 = [];
    } else {
      tmp_1 = header;
    }
    header = tmp_1;
    var tmp_2;
    if (inputDirFiles === VOID) {
      // Inline function 'kotlin.collections.mapOf' call
      tmp_2 = emptyMap();
    } else {
      tmp_2 = inputDirFiles;
    }
    inputDirFiles = tmp_2;
    var tmp_3;
    if (inputDirs === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_3 = [];
    } else {
      tmp_3 = inputDirs;
    }
    inputDirs = tmp_3;
    var tmp_4;
    if (inputMDFiles === VOID) {
      // Inline function 'kotlin.collections.mapOf' call
      tmp_4 = emptyMap();
    } else {
      tmp_4 = inputMDFiles;
    }
    inputMDFiles = tmp_4;
    installEditor = installEditor === VOID ? false : installEditor;
    listInputDirId = listInputDirId === VOID ? 0 : listInputDirId;
    projectPath = projectPath === VOID ? '' : projectPath;
    readFile = readFile === VOID ? '' : readFile;
    readFileContents = readFileContents === VOID ? '' : readFileContents;
    request = request === VOID ? new NetRequest() : request;
    resizeEditor = resizeEditor === VOID ? false : resizeEditor;
    response = response === VOID ? new NetResponse() : response;
    responseError = responseError === VOID ? new NetResponse() : responseError;
    saveFileId = saveFileId === VOID ? 0 : saveFileId;
    var tmp_5;
    if (saveFiles === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_5 = [];
    } else {
      tmp_5 = saveFiles;
    }
    saveFiles = tmp_5;
    var tmp_6;
    if (selectedFileId === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_6 = [];
    } else {
      tmp_6 = selectedFileId;
    }
    selectedFileId = tmp_6;
    selectedFileName = selectedFileName === VOID ? '' : selectedFileName;
    selectedTabId = selectedTabId === VOID ? 0 : selectedTabId;
    splashTimeout = splashTimeout === VOID ? 0 : splashTimeout;
    recentField = recentField === VOID ? '' : recentField;
    this.baseURL = baseURL;
    this.cfg = cfg;
    this.didClickEditorTab = didClickEditorTab;
    this.didClickFilesTab = didClickFilesTab;
    this.didClickRenderTab = didClickRenderTab;
    this.didClickSaveBtn = didClickSaveBtn;
    this.didLaunch = didLaunch;
    this.didResize = didResize;
    this.didSaveEditedFiles = didSaveEditedFiles;
    this.didSaveFile = didSaveFile;
    this.editedContents = editedContents;
    this.editedFileContents = editedFileContents;
    this.editorContents = editorContents;
    this.header = header;
    this.inputDirFiles = inputDirFiles;
    this.inputDirs = inputDirs;
    this.inputMDFiles = inputMDFiles;
    this.installEditor = installEditor;
    this.listInputDirId = listInputDirId;
    this.projectPath = projectPath;
    this.readFile = readFile;
    this.readFileContents = readFileContents;
    this.request = request;
    this.resizeEditor = resizeEditor;
    this.response = response;
    this.responseError = responseError;
    this.saveFileId = saveFileId;
    this.saveFiles = saveFiles;
    this.selectedFileId = selectedFileId;
    this.selectedFileName = selectedFileName;
    this.selectedTabId = selectedTabId;
    this.splashTimeout = splashTimeout;
    this.t9_1 = recentField;
  }
  protoOf(AppContext).u9 = function (_set____db54di) {
    this.baseURL = _set____db54di;
  };
  protoOf(AppContext).v9 = function () {
    return this.baseURL;
  };
  protoOf(AppContext).w9 = function (_set____db54di) {
    this.cfg = _set____db54di;
  };
  protoOf(AppContext).x9 = function () {
    return this.cfg;
  };
  protoOf(AppContext).y9 = function (_set____db54di) {
    this.didClickEditorTab = _set____db54di;
  };
  protoOf(AppContext).z9 = function () {
    return this.didClickEditorTab;
  };
  protoOf(AppContext).aa = function (_set____db54di) {
    this.didClickFilesTab = _set____db54di;
  };
  protoOf(AppContext).ba = function () {
    return this.didClickFilesTab;
  };
  protoOf(AppContext).ca = function (_set____db54di) {
    this.didClickRenderTab = _set____db54di;
  };
  protoOf(AppContext).da = function () {
    return this.didClickRenderTab;
  };
  protoOf(AppContext).ea = function (_set____db54di) {
    this.didClickSaveBtn = _set____db54di;
  };
  protoOf(AppContext).fa = function () {
    return this.didClickSaveBtn;
  };
  protoOf(AppContext).ga = function (_set____db54di) {
    this.didLaunch = _set____db54di;
  };
  protoOf(AppContext).ha = function () {
    return this.didLaunch;
  };
  protoOf(AppContext).ia = function (_set____db54di) {
    this.didResize = _set____db54di;
  };
  protoOf(AppContext).ja = function () {
    return this.didResize;
  };
  protoOf(AppContext).ka = function (_set____db54di) {
    this.didSaveEditedFiles = _set____db54di;
  };
  protoOf(AppContext).la = function () {
    return this.didSaveEditedFiles;
  };
  protoOf(AppContext).ma = function (_set____db54di) {
    this.didSaveFile = _set____db54di;
  };
  protoOf(AppContext).na = function () {
    return this.didSaveFile;
  };
  protoOf(AppContext).oa = function (_set____db54di) {
    this.editedContents = _set____db54di;
  };
  protoOf(AppContext).pa = function () {
    return this.editedContents;
  };
  protoOf(AppContext).qa = function (_set____db54di) {
    this.editedFileContents = _set____db54di;
  };
  protoOf(AppContext).ra = function () {
    return this.editedFileContents;
  };
  protoOf(AppContext).sa = function (_set____db54di) {
    this.editorContents = _set____db54di;
  };
  protoOf(AppContext).ta = function () {
    return this.editorContents;
  };
  protoOf(AppContext).ua = function (_set____db54di) {
    this.header = _set____db54di;
  };
  protoOf(AppContext).va = function () {
    return this.header;
  };
  protoOf(AppContext).wa = function (_set____db54di) {
    this.inputDirFiles = _set____db54di;
  };
  protoOf(AppContext).xa = function () {
    return this.inputDirFiles;
  };
  protoOf(AppContext).ya = function (_set____db54di) {
    this.inputDirs = _set____db54di;
  };
  protoOf(AppContext).za = function () {
    return this.inputDirs;
  };
  protoOf(AppContext).ab = function (_set____db54di) {
    this.inputMDFiles = _set____db54di;
  };
  protoOf(AppContext).bb = function () {
    return this.inputMDFiles;
  };
  protoOf(AppContext).cb = function (_set____db54di) {
    this.installEditor = _set____db54di;
  };
  protoOf(AppContext).db = function () {
    return this.installEditor;
  };
  protoOf(AppContext).eb = function (_set____db54di) {
    this.listInputDirId = _set____db54di;
  };
  protoOf(AppContext).fb = function () {
    return this.listInputDirId;
  };
  protoOf(AppContext).gb = function (_set____db54di) {
    this.projectPath = _set____db54di;
  };
  protoOf(AppContext).hb = function () {
    return this.projectPath;
  };
  protoOf(AppContext).ib = function (_set____db54di) {
    this.readFile = _set____db54di;
  };
  protoOf(AppContext).jb = function () {
    return this.readFile;
  };
  protoOf(AppContext).kb = function (_set____db54di) {
    this.readFileContents = _set____db54di;
  };
  protoOf(AppContext).lb = function () {
    return this.readFileContents;
  };
  protoOf(AppContext).mb = function (_set____db54di) {
    this.request = _set____db54di;
  };
  protoOf(AppContext).nb = function () {
    return this.request;
  };
  protoOf(AppContext).ob = function (_set____db54di) {
    this.resizeEditor = _set____db54di;
  };
  protoOf(AppContext).pb = function () {
    return this.resizeEditor;
  };
  protoOf(AppContext).qb = function (_set____db54di) {
    this.response = _set____db54di;
  };
  protoOf(AppContext).rb = function () {
    return this.response;
  };
  protoOf(AppContext).sb = function (_set____db54di) {
    this.responseError = _set____db54di;
  };
  protoOf(AppContext).tb = function () {
    return this.responseError;
  };
  protoOf(AppContext).ub = function (_set____db54di) {
    this.saveFileId = _set____db54di;
  };
  protoOf(AppContext).vb = function () {
    return this.saveFileId;
  };
  protoOf(AppContext).wb = function (_set____db54di) {
    this.saveFiles = _set____db54di;
  };
  protoOf(AppContext).xb = function () {
    return this.saveFiles;
  };
  protoOf(AppContext).yb = function (_set____db54di) {
    this.selectedFileId = _set____db54di;
  };
  protoOf(AppContext).zb = function () {
    return this.selectedFileId;
  };
  protoOf(AppContext).ac = function (_set____db54di) {
    this.selectedFileName = _set____db54di;
  };
  protoOf(AppContext).bc = function () {
    return this.selectedFileName;
  };
  protoOf(AppContext).cc = function (_set____db54di) {
    this.selectedTabId = _set____db54di;
  };
  protoOf(AppContext).dc = function () {
    return this.selectedTabId;
  };
  protoOf(AppContext).ec = function (_set____db54di) {
    this.splashTimeout = _set____db54di;
  };
  protoOf(AppContext).fc = function () {
    return this.splashTimeout;
  };
  protoOf(AppContext).e9 = function (_set____db54di) {
    this.t9_1 = _set____db54di;
  };
  protoOf(AppContext).f9 = function () {
    return this.t9_1;
  };
  protoOf(AppContext).field = function (name) {
    switch (name) {
      case 'baseURL':
        var tmp = this.baseURL;
        return !(tmp == null) ? tmp : THROW_CCE();
      case 'cfg':
        var tmp_0 = this.cfg;
        return !(tmp_0 == null) ? tmp_0 : THROW_CCE();
      case 'didClickEditorTab':
        var tmp_1 = this.didClickEditorTab;
        return !(tmp_1 == null) ? tmp_1 : THROW_CCE();
      case 'didClickFilesTab':
        var tmp_2 = this.didClickFilesTab;
        return !(tmp_2 == null) ? tmp_2 : THROW_CCE();
      case 'didClickRenderTab':
        var tmp_3 = this.didClickRenderTab;
        return !(tmp_3 == null) ? tmp_3 : THROW_CCE();
      case 'didClickSaveBtn':
        var tmp_4 = this.didClickSaveBtn;
        return !(tmp_4 == null) ? tmp_4 : THROW_CCE();
      case 'didLaunch':
        var tmp_5 = this.didLaunch;
        return !(tmp_5 == null) ? tmp_5 : THROW_CCE();
      case 'didResize':
        var tmp_6 = this.didResize;
        return !(tmp_6 == null) ? tmp_6 : THROW_CCE();
      case 'didSaveEditedFiles':
        var tmp_7 = this.didSaveEditedFiles;
        return !(tmp_7 == null) ? tmp_7 : THROW_CCE();
      case 'didSaveFile':
        var tmp_8 = this.didSaveFile;
        return !(tmp_8 == null) ? tmp_8 : THROW_CCE();
      case 'editedContents':
        var tmp_9 = this.editedContents;
        return !(tmp_9 == null) ? tmp_9 : THROW_CCE();
      case 'editedFileContents':
        var tmp_10 = this.editedFileContents;
        return !(tmp_10 == null) ? tmp_10 : THROW_CCE();
      case 'editorContents':
        var tmp_11 = this.editorContents;
        return !(tmp_11 == null) ? tmp_11 : THROW_CCE();
      case 'header':
        var tmp_12 = this.header;
        return !(tmp_12 == null) ? tmp_12 : THROW_CCE();
      case 'inputDirFiles':
        var tmp_13 = this.inputDirFiles;
        return !(tmp_13 == null) ? tmp_13 : THROW_CCE();
      case 'inputDirs':
        var tmp_14 = this.inputDirs;
        return !(tmp_14 == null) ? tmp_14 : THROW_CCE();
      case 'inputMDFiles':
        var tmp_15 = this.inputMDFiles;
        return !(tmp_15 == null) ? tmp_15 : THROW_CCE();
      case 'installEditor':
        var tmp_16 = this.installEditor;
        return !(tmp_16 == null) ? tmp_16 : THROW_CCE();
      case 'listInputDirId':
        var tmp_17 = this.listInputDirId;
        return !(tmp_17 == null) ? tmp_17 : THROW_CCE();
      case 'projectPath':
        var tmp_18 = this.projectPath;
        return !(tmp_18 == null) ? tmp_18 : THROW_CCE();
      case 'readFile':
        var tmp_19 = this.readFile;
        return !(tmp_19 == null) ? tmp_19 : THROW_CCE();
      case 'readFileContents':
        var tmp_20 = this.readFileContents;
        return !(tmp_20 == null) ? tmp_20 : THROW_CCE();
      case 'request':
        var tmp_21 = this.request;
        return !(tmp_21 == null) ? tmp_21 : THROW_CCE();
      case 'resizeEditor':
        var tmp_22 = this.resizeEditor;
        return !(tmp_22 == null) ? tmp_22 : THROW_CCE();
      case 'response':
        var tmp_23 = this.response;
        return !(tmp_23 == null) ? tmp_23 : THROW_CCE();
      case 'responseError':
        var tmp_24 = this.responseError;
        return !(tmp_24 == null) ? tmp_24 : THROW_CCE();
      case 'saveFileId':
        var tmp_25 = this.saveFileId;
        return !(tmp_25 == null) ? tmp_25 : THROW_CCE();
      case 'saveFiles':
        var tmp_26 = this.saveFiles;
        return !(tmp_26 == null) ? tmp_26 : THROW_CCE();
      case 'selectedFileId':
        var tmp_27 = this.selectedFileId;
        return !(tmp_27 == null) ? tmp_27 : THROW_CCE();
      case 'selectedFileName':
        var tmp_28 = this.selectedFileName;
        return !(tmp_28 == null) ? tmp_28 : THROW_CCE();
      case 'selectedTabId':
        var tmp_29 = this.selectedTabId;
        return !(tmp_29 == null) ? tmp_29 : THROW_CCE();
      case 'splashTimeout':
        var tmp_30 = this.splashTimeout;
        return !(tmp_30 == null) ? tmp_30 : THROW_CCE();
    }
    return !('unknown-field-name' == null) ? 'unknown-field-name' : THROW_CCE();
  };
  protoOf(AppContext).selfCopy = function () {
    return this.copy();
  };
  protoOf(AppContext).setField = function (name, value) {
    switch (name) {
      case 'baseURL':
        var tmp = this;
        tmp.baseURL = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'cfg':
        var tmp_0 = this;
        tmp_0.cfg = (!(value == null) ? isInterface(value, KtMap) : false) ? value : THROW_CCE();
        break;
      case 'didClickEditorTab':
        var tmp_1 = this;
        tmp_1.didClickEditorTab = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didClickFilesTab':
        var tmp_2 = this;
        tmp_2.didClickFilesTab = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didClickRenderTab':
        var tmp_3 = this;
        tmp_3.didClickRenderTab = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didClickSaveBtn':
        var tmp_4 = this;
        tmp_4.didClickSaveBtn = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didLaunch':
        var tmp_5 = this;
        tmp_5.didLaunch = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didResize':
        var tmp_6 = this;
        tmp_6.didResize = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didSaveEditedFiles':
        var tmp_7 = this;
        tmp_7.didSaveEditedFiles = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didSaveFile':
        var tmp_8 = this;
        tmp_8.didSaveFile = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'editedContents':
        var tmp_9 = this;
        tmp_9.editedContents = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'editedFileContents':
        var tmp_10 = this;
        tmp_10.editedFileContents = (!(value == null) ? isInterface(value, KtMap) : false) ? value : THROW_CCE();
        break;
      case 'editorContents':
        var tmp_11 = this;
        tmp_11.editorContents = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'header':
        var tmp_12 = this;
        tmp_12.header = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'inputDirFiles':
        var tmp_13 = this;
        tmp_13.inputDirFiles = (!(value == null) ? isInterface(value, KtMap) : false) ? value : THROW_CCE();
        break;
      case 'inputDirs':
        var tmp_14 = this;
        tmp_14.inputDirs = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'inputMDFiles':
        var tmp_15 = this;
        tmp_15.inputMDFiles = (!(value == null) ? isInterface(value, KtMap) : false) ? value : THROW_CCE();
        break;
      case 'installEditor':
        var tmp_16 = this;
        tmp_16.installEditor = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'listInputDirId':
        var tmp_17 = this;
        tmp_17.listInputDirId = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'projectPath':
        var tmp_18 = this;
        tmp_18.projectPath = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'readFile':
        var tmp_19 = this;
        tmp_19.readFile = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'readFileContents':
        var tmp_20 = this;
        tmp_20.readFileContents = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'request':
        var tmp_21 = this;
        tmp_21.request = value instanceof NetRequest ? value : THROW_CCE();
        break;
      case 'resizeEditor':
        var tmp_22 = this;
        tmp_22.resizeEditor = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'response':
        var tmp_23 = this;
        tmp_23.response = value instanceof NetResponse ? value : THROW_CCE();
        break;
      case 'responseError':
        var tmp_24 = this;
        tmp_24.responseError = value instanceof NetResponse ? value : THROW_CCE();
        break;
      case 'saveFileId':
        var tmp_25 = this;
        tmp_25.saveFileId = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'saveFiles':
        var tmp_26 = this;
        tmp_26.saveFiles = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'selectedFileId':
        var tmp_27 = this;
        tmp_27.selectedFileId = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'selectedFileName':
        var tmp_28 = this;
        tmp_28.selectedFileName = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'selectedTabId':
        var tmp_29 = this;
        tmp_29.selectedTabId = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'splashTimeout':
        var tmp_30 = this;
        tmp_30.splashTimeout = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
    }
  };
  protoOf(AppContext).c9 = function () {
    return this.baseURL;
  };
  protoOf(AppContext).d9 = function () {
    return this.cfg;
  };
  protoOf(AppContext).gc = function () {
    return this.didClickEditorTab;
  };
  protoOf(AppContext).hc = function () {
    return this.didClickFilesTab;
  };
  protoOf(AppContext).ic = function () {
    return this.didClickRenderTab;
  };
  protoOf(AppContext).jc = function () {
    return this.didClickSaveBtn;
  };
  protoOf(AppContext).kc = function () {
    return this.didLaunch;
  };
  protoOf(AppContext).lc = function () {
    return this.didResize;
  };
  protoOf(AppContext).mc = function () {
    return this.didSaveEditedFiles;
  };
  protoOf(AppContext).nc = function () {
    return this.didSaveFile;
  };
  protoOf(AppContext).oc = function () {
    return this.editedContents;
  };
  protoOf(AppContext).pc = function () {
    return this.editedFileContents;
  };
  protoOf(AppContext).qc = function () {
    return this.editorContents;
  };
  protoOf(AppContext).rc = function () {
    return this.header;
  };
  protoOf(AppContext).sc = function () {
    return this.inputDirFiles;
  };
  protoOf(AppContext).tc = function () {
    return this.inputDirs;
  };
  protoOf(AppContext).uc = function () {
    return this.inputMDFiles;
  };
  protoOf(AppContext).vc = function () {
    return this.installEditor;
  };
  protoOf(AppContext).wc = function () {
    return this.listInputDirId;
  };
  protoOf(AppContext).xc = function () {
    return this.projectPath;
  };
  protoOf(AppContext).yc = function () {
    return this.readFile;
  };
  protoOf(AppContext).zc = function () {
    return this.readFileContents;
  };
  protoOf(AppContext).ad = function () {
    return this.request;
  };
  protoOf(AppContext).bd = function () {
    return this.resizeEditor;
  };
  protoOf(AppContext).cd = function () {
    return this.response;
  };
  protoOf(AppContext).dd = function () {
    return this.responseError;
  };
  protoOf(AppContext).ed = function () {
    return this.saveFileId;
  };
  protoOf(AppContext).fd = function () {
    return this.saveFiles;
  };
  protoOf(AppContext).gd = function () {
    return this.selectedFileId;
  };
  protoOf(AppContext).hd = function () {
    return this.selectedFileName;
  };
  protoOf(AppContext).id = function () {
    return this.selectedTabId;
  };
  protoOf(AppContext).jd = function () {
    return this.splashTimeout;
  };
  protoOf(AppContext).kd = function () {
    return this.t9_1;
  };
  protoOf(AppContext).ld = function (baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField) {
    return new AppContext(baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField);
  };
  protoOf(AppContext).copy = function (baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField, $super) {
    baseURL = baseURL === VOID ? this.baseURL : baseURL;
    cfg = cfg === VOID ? this.cfg : cfg;
    didClickEditorTab = didClickEditorTab === VOID ? this.didClickEditorTab : didClickEditorTab;
    didClickFilesTab = didClickFilesTab === VOID ? this.didClickFilesTab : didClickFilesTab;
    didClickRenderTab = didClickRenderTab === VOID ? this.didClickRenderTab : didClickRenderTab;
    didClickSaveBtn = didClickSaveBtn === VOID ? this.didClickSaveBtn : didClickSaveBtn;
    didLaunch = didLaunch === VOID ? this.didLaunch : didLaunch;
    didResize = didResize === VOID ? this.didResize : didResize;
    didSaveEditedFiles = didSaveEditedFiles === VOID ? this.didSaveEditedFiles : didSaveEditedFiles;
    didSaveFile = didSaveFile === VOID ? this.didSaveFile : didSaveFile;
    editedContents = editedContents === VOID ? this.editedContents : editedContents;
    editedFileContents = editedFileContents === VOID ? this.editedFileContents : editedFileContents;
    editorContents = editorContents === VOID ? this.editorContents : editorContents;
    header = header === VOID ? this.header : header;
    inputDirFiles = inputDirFiles === VOID ? this.inputDirFiles : inputDirFiles;
    inputDirs = inputDirs === VOID ? this.inputDirs : inputDirs;
    inputMDFiles = inputMDFiles === VOID ? this.inputMDFiles : inputMDFiles;
    installEditor = installEditor === VOID ? this.installEditor : installEditor;
    listInputDirId = listInputDirId === VOID ? this.listInputDirId : listInputDirId;
    projectPath = projectPath === VOID ? this.projectPath : projectPath;
    readFile = readFile === VOID ? this.readFile : readFile;
    readFileContents = readFileContents === VOID ? this.readFileContents : readFileContents;
    request = request === VOID ? this.request : request;
    resizeEditor = resizeEditor === VOID ? this.resizeEditor : resizeEditor;
    response = response === VOID ? this.response : response;
    responseError = responseError === VOID ? this.responseError : responseError;
    saveFileId = saveFileId === VOID ? this.saveFileId : saveFileId;
    saveFiles = saveFiles === VOID ? this.saveFiles : saveFiles;
    selectedFileId = selectedFileId === VOID ? this.selectedFileId : selectedFileId;
    selectedFileName = selectedFileName === VOID ? this.selectedFileName : selectedFileName;
    selectedTabId = selectedTabId === VOID ? this.selectedTabId : selectedTabId;
    splashTimeout = splashTimeout === VOID ? this.splashTimeout : splashTimeout;
    recentField = recentField === VOID ? this.t9_1 : recentField;
    return $super === VOID ? this.ld(baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField) : $super.ld.call(this, baseURL, cfg, didClickEditorTab, didClickFilesTab, didClickRenderTab, didClickSaveBtn, didLaunch, didResize, didSaveEditedFiles, didSaveFile, editedContents, editedFileContents, editorContents, header, inputDirFiles, inputDirs, inputMDFiles, installEditor, listInputDirId, projectPath, readFile, readFileContents, request, resizeEditor, response, responseError, saveFileId, saveFiles, selectedFileId, selectedFileName, selectedTabId, splashTimeout, recentField);
  };
  protoOf(AppContext).toString = function () {
    return 'AppContext(baseURL=' + this.baseURL + ', cfg=' + toString(this.cfg) + ', didClickEditorTab=' + this.didClickEditorTab + ', didClickFilesTab=' + this.didClickFilesTab + ', didClickRenderTab=' + this.didClickRenderTab + ', didClickSaveBtn=' + this.didClickSaveBtn + ', didLaunch=' + this.didLaunch + ', didResize=' + this.didResize + ', didSaveEditedFiles=' + this.didSaveEditedFiles + ', didSaveFile=' + this.didSaveFile + ', editedContents=' + this.editedContents + ', editedFileContents=' + toString(this.editedFileContents) + ', editorContents=' + this.editorContents + ', header=' + toString(this.header) + ', inputDirFiles=' + toString(this.inputDirFiles) + ', inputDirs=' + toString(this.inputDirs) + ', inputMDFiles=' + toString(this.inputMDFiles) + ', installEditor=' + this.installEditor + ', listInputDirId=' + this.listInputDirId + ', projectPath=' + this.projectPath + ', readFile=' + this.readFile + ', readFileContents=' + this.readFileContents + ', request=' + this.request.toString() + ', resizeEditor=' + this.resizeEditor + ', response=' + this.response.toString() + ', responseError=' + this.responseError.toString() + ', saveFileId=' + this.saveFileId + ', saveFiles=' + toString(this.saveFiles) + ', selectedFileId=' + toString(this.selectedFileId) + ', selectedFileName=' + this.selectedFileName + ', selectedTabId=' + this.selectedTabId + ', splashTimeout=' + this.splashTimeout + ', recentField=' + this.t9_1 + ')';
  };
  protoOf(AppContext).hashCode = function () {
    var result = getStringHashCode(this.baseURL);
    result = imul(result, 31) + hashCode(this.cfg) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didClickEditorTab) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didClickFilesTab) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didClickRenderTab) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didClickSaveBtn) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didLaunch) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didResize) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didSaveEditedFiles) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didSaveFile) | 0;
    result = imul(result, 31) + getStringHashCode(this.editedContents) | 0;
    result = imul(result, 31) + hashCode(this.editedFileContents) | 0;
    result = imul(result, 31) + getStringHashCode(this.editorContents) | 0;
    result = imul(result, 31) + hashCode(this.header) | 0;
    result = imul(result, 31) + hashCode(this.inputDirFiles) | 0;
    result = imul(result, 31) + hashCode(this.inputDirs) | 0;
    result = imul(result, 31) + hashCode(this.inputMDFiles) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.installEditor) | 0;
    result = imul(result, 31) + this.listInputDirId | 0;
    result = imul(result, 31) + getStringHashCode(this.projectPath) | 0;
    result = imul(result, 31) + getStringHashCode(this.readFile) | 0;
    result = imul(result, 31) + getStringHashCode(this.readFileContents) | 0;
    result = imul(result, 31) + this.request.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.resizeEditor) | 0;
    result = imul(result, 31) + this.response.hashCode() | 0;
    result = imul(result, 31) + this.responseError.hashCode() | 0;
    result = imul(result, 31) + this.saveFileId | 0;
    result = imul(result, 31) + hashCode(this.saveFiles) | 0;
    result = imul(result, 31) + hashCode(this.selectedFileId) | 0;
    result = imul(result, 31) + getStringHashCode(this.selectedFileName) | 0;
    result = imul(result, 31) + this.selectedTabId | 0;
    result = imul(result, 31) + this.splashTimeout | 0;
    result = imul(result, 31) + getStringHashCode(this.t9_1) | 0;
    return result;
  };
  protoOf(AppContext).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AppContext))
      return false;
    var tmp0_other_with_cast = other instanceof AppContext ? other : THROW_CCE();
    if (!(this.baseURL === tmp0_other_with_cast.baseURL))
      return false;
    if (!equals(this.cfg, tmp0_other_with_cast.cfg))
      return false;
    if (!(this.didClickEditorTab === tmp0_other_with_cast.didClickEditorTab))
      return false;
    if (!(this.didClickFilesTab === tmp0_other_with_cast.didClickFilesTab))
      return false;
    if (!(this.didClickRenderTab === tmp0_other_with_cast.didClickRenderTab))
      return false;
    if (!(this.didClickSaveBtn === tmp0_other_with_cast.didClickSaveBtn))
      return false;
    if (!(this.didLaunch === tmp0_other_with_cast.didLaunch))
      return false;
    if (!(this.didResize === tmp0_other_with_cast.didResize))
      return false;
    if (!(this.didSaveEditedFiles === tmp0_other_with_cast.didSaveEditedFiles))
      return false;
    if (!(this.didSaveFile === tmp0_other_with_cast.didSaveFile))
      return false;
    if (!(this.editedContents === tmp0_other_with_cast.editedContents))
      return false;
    if (!equals(this.editedFileContents, tmp0_other_with_cast.editedFileContents))
      return false;
    if (!(this.editorContents === tmp0_other_with_cast.editorContents))
      return false;
    if (!equals(this.header, tmp0_other_with_cast.header))
      return false;
    if (!equals(this.inputDirFiles, tmp0_other_with_cast.inputDirFiles))
      return false;
    if (!equals(this.inputDirs, tmp0_other_with_cast.inputDirs))
      return false;
    if (!equals(this.inputMDFiles, tmp0_other_with_cast.inputMDFiles))
      return false;
    if (!(this.installEditor === tmp0_other_with_cast.installEditor))
      return false;
    if (!(this.listInputDirId === tmp0_other_with_cast.listInputDirId))
      return false;
    if (!(this.projectPath === tmp0_other_with_cast.projectPath))
      return false;
    if (!(this.readFile === tmp0_other_with_cast.readFile))
      return false;
    if (!(this.readFileContents === tmp0_other_with_cast.readFileContents))
      return false;
    if (!this.request.equals(tmp0_other_with_cast.request))
      return false;
    if (!(this.resizeEditor === tmp0_other_with_cast.resizeEditor))
      return false;
    if (!this.response.equals(tmp0_other_with_cast.response))
      return false;
    if (!this.responseError.equals(tmp0_other_with_cast.responseError))
      return false;
    if (!(this.saveFileId === tmp0_other_with_cast.saveFileId))
      return false;
    if (!equals(this.saveFiles, tmp0_other_with_cast.saveFiles))
      return false;
    if (!equals(this.selectedFileId, tmp0_other_with_cast.selectedFileId))
      return false;
    if (!(this.selectedFileName === tmp0_other_with_cast.selectedFileName))
      return false;
    if (!(this.selectedTabId === tmp0_other_with_cast.selectedTabId))
      return false;
    if (!(this.splashTimeout === tmp0_other_with_cast.splashTimeout))
      return false;
    if (!(this.t9_1 === tmp0_other_with_cast.t9_1))
      return false;
    return true;
  };
  function FSFile(isFile, path) {
    isFile = isFile === VOID ? false : isFile;
    path = path === VOID ? '' : path;
    this.isFile = isFile;
    this.path = path;
  }
  protoOf(FSFile).md = function (_set____db54di) {
    this.isFile = _set____db54di;
  };
  protoOf(FSFile).nd = function () {
    return this.isFile;
  };
  protoOf(FSFile).od = function (_set____db54di) {
    this.path = _set____db54di;
  };
  protoOf(FSFile).pd = function () {
    return this.path;
  };
  protoOf(FSFile).c9 = function () {
    return this.isFile;
  };
  protoOf(FSFile).d9 = function () {
    return this.path;
  };
  protoOf(FSFile).qd = function (isFile, path) {
    return new FSFile(isFile, path);
  };
  protoOf(FSFile).copy = function (isFile, path, $super) {
    isFile = isFile === VOID ? this.isFile : isFile;
    path = path === VOID ? this.path : path;
    return $super === VOID ? this.qd(isFile, path) : $super.qd.call(this, isFile, path);
  };
  protoOf(FSFile).toString = function () {
    return 'FSFile(isFile=' + this.isFile + ', path=' + this.path + ')';
  };
  protoOf(FSFile).hashCode = function () {
    var result = getBooleanHashCode(this.isFile);
    result = imul(result, 31) + getStringHashCode(this.path) | 0;
    return result;
  };
  protoOf(FSFile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FSFile))
      return false;
    var tmp0_other_with_cast = other instanceof FSFile ? other : THROW_CCE();
    if (!(this.isFile === tmp0_other_with_cast.isFile))
      return false;
    if (!(this.path === tmp0_other_with_cast.path))
      return false;
    return true;
  };
  function NetRequest(body, method, url) {
    body = body === VOID ? '' : body;
    method = method === VOID ? '' : method;
    url = url === VOID ? '' : url;
    this.body = body;
    this.method = method;
    this.url = url;
  }
  protoOf(NetRequest).rd = function (_set____db54di) {
    this.body = _set____db54di;
  };
  protoOf(NetRequest).sd = function () {
    return this.body;
  };
  protoOf(NetRequest).td = function (_set____db54di) {
    this.method = _set____db54di;
  };
  protoOf(NetRequest).ud = function () {
    return this.method;
  };
  protoOf(NetRequest).vd = function (_set____db54di) {
    this.url = _set____db54di;
  };
  protoOf(NetRequest).wd = function () {
    return this.url;
  };
  protoOf(NetRequest).c9 = function () {
    return this.body;
  };
  protoOf(NetRequest).d9 = function () {
    return this.method;
  };
  protoOf(NetRequest).gc = function () {
    return this.url;
  };
  protoOf(NetRequest).xd = function (body, method, url) {
    return new NetRequest(body, method, url);
  };
  protoOf(NetRequest).copy = function (body, method, url, $super) {
    body = body === VOID ? this.body : body;
    method = method === VOID ? this.method : method;
    url = url === VOID ? this.url : url;
    return $super === VOID ? this.xd(body, method, url) : $super.xd.call(this, body, method, url);
  };
  protoOf(NetRequest).toString = function () {
    return 'NetRequest(body=' + this.body + ', method=' + this.method + ', url=' + this.url + ')';
  };
  protoOf(NetRequest).hashCode = function () {
    var result = getStringHashCode(this.body);
    result = imul(result, 31) + getStringHashCode(this.method) | 0;
    result = imul(result, 31) + getStringHashCode(this.url) | 0;
    return result;
  };
  protoOf(NetRequest).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NetRequest))
      return false;
    var tmp0_other_with_cast = other instanceof NetRequest ? other : THROW_CCE();
    if (!(this.body === tmp0_other_with_cast.body))
      return false;
    if (!(this.method === tmp0_other_with_cast.method))
      return false;
    if (!(this.url === tmp0_other_with_cast.url))
      return false;
    return true;
  };
  function NetResponse(contents, req) {
    contents = contents === VOID ? '' : contents;
    req = req === VOID ? new NetRequest() : req;
    this.contents = contents;
    this.req = req;
  }
  protoOf(NetResponse).yd = function (_set____db54di) {
    this.contents = _set____db54di;
  };
  protoOf(NetResponse).zd = function () {
    return this.contents;
  };
  protoOf(NetResponse).ae = function (_set____db54di) {
    this.req = _set____db54di;
  };
  protoOf(NetResponse).be = function () {
    return this.req;
  };
  protoOf(NetResponse).c9 = function () {
    return this.contents;
  };
  protoOf(NetResponse).d9 = function () {
    return this.req;
  };
  protoOf(NetResponse).ce = function (contents, req) {
    return new NetResponse(contents, req);
  };
  protoOf(NetResponse).copy = function (contents, req, $super) {
    contents = contents === VOID ? this.contents : contents;
    req = req === VOID ? this.req : req;
    return $super === VOID ? this.ce(contents, req) : $super.ce.call(this, contents, req);
  };
  protoOf(NetResponse).toString = function () {
    return 'NetResponse(contents=' + this.contents + ', req=' + this.req.toString() + ')';
  };
  protoOf(NetResponse).hashCode = function () {
    var result = getStringHashCode(this.contents);
    result = imul(result, 31) + this.req.hashCode() | 0;
    return result;
  };
  protoOf(NetResponse).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NetResponse))
      return false;
    var tmp0_other_with_cast = other instanceof NetResponse ? other : THROW_CCE();
    if (!(this.contents === tmp0_other_with_cast.contents))
      return false;
    if (!this.req.equals(tmp0_other_with_cast.req))
      return false;
    return true;
  };
  function SrvContext(arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField) {
    var tmp;
    if (arguments_0 === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = [];
    } else {
      tmp = arguments_0;
    }
    arguments_0 = tmp;
    browserDir = browserDir === VOID ? '' : browserDir;
    defaultHTTPPort = defaultHTTPPort === VOID ? 0 : defaultHTTPPort;
    didLaunch = didLaunch === VOID ? false : didLaunch;
    didWriteFile = didWriteFile === VOID ? false : didWriteFile;
    var tmp_0;
    if (dirFiles === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_0 = [];
    } else {
      tmp_0 = dirFiles;
    }
    dirFiles = tmp_0;
    httpPort = httpPort === VOID ? 0 : httpPort;
    inputDir = inputDir === VOID ? '' : inputDir;
    inputHTTPPort = inputHTTPPort === VOID ? 0 : inputHTTPPort;
    listDir = listDir === VOID ? '' : listDir;
    projectAbsPath = projectAbsPath === VOID ? '' : projectAbsPath;
    projectDir = projectDir === VOID ? '' : projectDir;
    readFile = readFile === VOID ? '' : readFile;
    readFileContents = readFileContents === VOID ? '' : readFileContents;
    request = request === VOID ? new NetRequest() : request;
    response = response === VOID ? new NetResponse() : response;
    url = url === VOID ? '' : url;
    var tmp_1;
    if (writeFile === VOID) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp_1 = [];
    } else {
      tmp_1 = writeFile;
    }
    writeFile = tmp_1;
    recentField = recentField === VOID ? '' : recentField;
    this.arguments = arguments_0;
    this.browserDir = browserDir;
    this.defaultHTTPPort = defaultHTTPPort;
    this.didLaunch = didLaunch;
    this.didWriteFile = didWriteFile;
    this.dirFiles = dirFiles;
    this.httpPort = httpPort;
    this.inputDir = inputDir;
    this.inputHTTPPort = inputHTTPPort;
    this.listDir = listDir;
    this.projectAbsPath = projectAbsPath;
    this.projectDir = projectDir;
    this.readFile = readFile;
    this.readFileContents = readFileContents;
    this.request = request;
    this.response = response;
    this.url = url;
    this.writeFile = writeFile;
    this.de_1 = recentField;
  }
  protoOf(SrvContext).ee = function (_set____db54di) {
    this.arguments = _set____db54di;
  };
  protoOf(SrvContext).fe = function () {
    return this.arguments;
  };
  protoOf(SrvContext).ge = function (_set____db54di) {
    this.browserDir = _set____db54di;
  };
  protoOf(SrvContext).he = function () {
    return this.browserDir;
  };
  protoOf(SrvContext).ie = function (_set____db54di) {
    this.defaultHTTPPort = _set____db54di;
  };
  protoOf(SrvContext).je = function () {
    return this.defaultHTTPPort;
  };
  protoOf(SrvContext).ga = function (_set____db54di) {
    this.didLaunch = _set____db54di;
  };
  protoOf(SrvContext).ha = function () {
    return this.didLaunch;
  };
  protoOf(SrvContext).ke = function (_set____db54di) {
    this.didWriteFile = _set____db54di;
  };
  protoOf(SrvContext).le = function () {
    return this.didWriteFile;
  };
  protoOf(SrvContext).me = function (_set____db54di) {
    this.dirFiles = _set____db54di;
  };
  protoOf(SrvContext).ne = function () {
    return this.dirFiles;
  };
  protoOf(SrvContext).oe = function (_set____db54di) {
    this.httpPort = _set____db54di;
  };
  protoOf(SrvContext).pe = function () {
    return this.httpPort;
  };
  protoOf(SrvContext).qe = function (_set____db54di) {
    this.inputDir = _set____db54di;
  };
  protoOf(SrvContext).re = function () {
    return this.inputDir;
  };
  protoOf(SrvContext).se = function (_set____db54di) {
    this.inputHTTPPort = _set____db54di;
  };
  protoOf(SrvContext).te = function () {
    return this.inputHTTPPort;
  };
  protoOf(SrvContext).ue = function (_set____db54di) {
    this.listDir = _set____db54di;
  };
  protoOf(SrvContext).ve = function () {
    return this.listDir;
  };
  protoOf(SrvContext).we = function (_set____db54di) {
    this.projectAbsPath = _set____db54di;
  };
  protoOf(SrvContext).xe = function () {
    return this.projectAbsPath;
  };
  protoOf(SrvContext).ye = function (_set____db54di) {
    this.projectDir = _set____db54di;
  };
  protoOf(SrvContext).ze = function () {
    return this.projectDir;
  };
  protoOf(SrvContext).ib = function (_set____db54di) {
    this.readFile = _set____db54di;
  };
  protoOf(SrvContext).jb = function () {
    return this.readFile;
  };
  protoOf(SrvContext).kb = function (_set____db54di) {
    this.readFileContents = _set____db54di;
  };
  protoOf(SrvContext).lb = function () {
    return this.readFileContents;
  };
  protoOf(SrvContext).mb = function (_set____db54di) {
    this.request = _set____db54di;
  };
  protoOf(SrvContext).nb = function () {
    return this.request;
  };
  protoOf(SrvContext).qb = function (_set____db54di) {
    this.response = _set____db54di;
  };
  protoOf(SrvContext).rb = function () {
    return this.response;
  };
  protoOf(SrvContext).vd = function (_set____db54di) {
    this.url = _set____db54di;
  };
  protoOf(SrvContext).wd = function () {
    return this.url;
  };
  protoOf(SrvContext).af = function (_set____db54di) {
    this.writeFile = _set____db54di;
  };
  protoOf(SrvContext).bf = function () {
    return this.writeFile;
  };
  protoOf(SrvContext).e9 = function (_set____db54di) {
    this.de_1 = _set____db54di;
  };
  protoOf(SrvContext).f9 = function () {
    return this.de_1;
  };
  protoOf(SrvContext).field = function (name) {
    switch (name) {
      case 'arguments':
        var tmp = this.arguments;
        return !(tmp == null) ? tmp : THROW_CCE();
      case 'browserDir':
        var tmp_0 = this.browserDir;
        return !(tmp_0 == null) ? tmp_0 : THROW_CCE();
      case 'defaultHTTPPort':
        var tmp_1 = this.defaultHTTPPort;
        return !(tmp_1 == null) ? tmp_1 : THROW_CCE();
      case 'didLaunch':
        var tmp_2 = this.didLaunch;
        return !(tmp_2 == null) ? tmp_2 : THROW_CCE();
      case 'didWriteFile':
        var tmp_3 = this.didWriteFile;
        return !(tmp_3 == null) ? tmp_3 : THROW_CCE();
      case 'dirFiles':
        var tmp_4 = this.dirFiles;
        return !(tmp_4 == null) ? tmp_4 : THROW_CCE();
      case 'httpPort':
        var tmp_5 = this.httpPort;
        return !(tmp_5 == null) ? tmp_5 : THROW_CCE();
      case 'inputDir':
        var tmp_6 = this.inputDir;
        return !(tmp_6 == null) ? tmp_6 : THROW_CCE();
      case 'inputHTTPPort':
        var tmp_7 = this.inputHTTPPort;
        return !(tmp_7 == null) ? tmp_7 : THROW_CCE();
      case 'listDir':
        var tmp_8 = this.listDir;
        return !(tmp_8 == null) ? tmp_8 : THROW_CCE();
      case 'projectAbsPath':
        var tmp_9 = this.projectAbsPath;
        return !(tmp_9 == null) ? tmp_9 : THROW_CCE();
      case 'projectDir':
        var tmp_10 = this.projectDir;
        return !(tmp_10 == null) ? tmp_10 : THROW_CCE();
      case 'readFile':
        var tmp_11 = this.readFile;
        return !(tmp_11 == null) ? tmp_11 : THROW_CCE();
      case 'readFileContents':
        var tmp_12 = this.readFileContents;
        return !(tmp_12 == null) ? tmp_12 : THROW_CCE();
      case 'request':
        var tmp_13 = this.request;
        return !(tmp_13 == null) ? tmp_13 : THROW_CCE();
      case 'response':
        var tmp_14 = this.response;
        return !(tmp_14 == null) ? tmp_14 : THROW_CCE();
      case 'url':
        var tmp_15 = this.url;
        return !(tmp_15 == null) ? tmp_15 : THROW_CCE();
      case 'writeFile':
        var tmp_16 = this.writeFile;
        return !(tmp_16 == null) ? tmp_16 : THROW_CCE();
    }
    return !('unknown-field-name' == null) ? 'unknown-field-name' : THROW_CCE();
  };
  protoOf(SrvContext).selfCopy = function () {
    return this.copy();
  };
  protoOf(SrvContext).setField = function (name, value) {
    switch (name) {
      case 'arguments':
        var tmp = this;
        tmp.arguments = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'browserDir':
        var tmp_0 = this;
        tmp_0.browserDir = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'defaultHTTPPort':
        var tmp_1 = this;
        tmp_1.defaultHTTPPort = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'didLaunch':
        var tmp_2 = this;
        tmp_2.didLaunch = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'didWriteFile':
        var tmp_3 = this;
        tmp_3.didWriteFile = (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE();
        break;
      case 'dirFiles':
        var tmp_4 = this;
        tmp_4.dirFiles = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
      case 'httpPort':
        var tmp_5 = this;
        tmp_5.httpPort = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'inputDir':
        var tmp_6 = this;
        tmp_6.inputDir = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'inputHTTPPort':
        var tmp_7 = this;
        tmp_7.inputHTTPPort = (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE();
        break;
      case 'listDir':
        var tmp_8 = this;
        tmp_8.listDir = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'projectAbsPath':
        var tmp_9 = this;
        tmp_9.projectAbsPath = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'projectDir':
        var tmp_10 = this;
        tmp_10.projectDir = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'readFile':
        var tmp_11 = this;
        tmp_11.readFile = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'readFileContents':
        var tmp_12 = this;
        tmp_12.readFileContents = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'request':
        var tmp_13 = this;
        tmp_13.request = value instanceof NetRequest ? value : THROW_CCE();
        break;
      case 'response':
        var tmp_14 = this;
        tmp_14.response = value instanceof NetResponse ? value : THROW_CCE();
        break;
      case 'url':
        var tmp_15 = this;
        tmp_15.url = (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE();
        break;
      case 'writeFile':
        var tmp_16 = this;
        tmp_16.writeFile = (!(value == null) ? isArray(value) : false) ? value : THROW_CCE();
        break;
    }
  };
  protoOf(SrvContext).c9 = function () {
    return this.arguments;
  };
  protoOf(SrvContext).d9 = function () {
    return this.browserDir;
  };
  protoOf(SrvContext).gc = function () {
    return this.defaultHTTPPort;
  };
  protoOf(SrvContext).hc = function () {
    return this.didLaunch;
  };
  protoOf(SrvContext).ic = function () {
    return this.didWriteFile;
  };
  protoOf(SrvContext).jc = function () {
    return this.dirFiles;
  };
  protoOf(SrvContext).kc = function () {
    return this.httpPort;
  };
  protoOf(SrvContext).lc = function () {
    return this.inputDir;
  };
  protoOf(SrvContext).mc = function () {
    return this.inputHTTPPort;
  };
  protoOf(SrvContext).nc = function () {
    return this.listDir;
  };
  protoOf(SrvContext).oc = function () {
    return this.projectAbsPath;
  };
  protoOf(SrvContext).pc = function () {
    return this.projectDir;
  };
  protoOf(SrvContext).qc = function () {
    return this.readFile;
  };
  protoOf(SrvContext).rc = function () {
    return this.readFileContents;
  };
  protoOf(SrvContext).sc = function () {
    return this.request;
  };
  protoOf(SrvContext).tc = function () {
    return this.response;
  };
  protoOf(SrvContext).uc = function () {
    return this.url;
  };
  protoOf(SrvContext).vc = function () {
    return this.writeFile;
  };
  protoOf(SrvContext).wc = function () {
    return this.de_1;
  };
  protoOf(SrvContext).cf = function (arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField) {
    return new SrvContext(arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField);
  };
  protoOf(SrvContext).copy = function (arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField, $super) {
    arguments_0 = arguments_0 === VOID ? this.arguments : arguments_0;
    browserDir = browserDir === VOID ? this.browserDir : browserDir;
    defaultHTTPPort = defaultHTTPPort === VOID ? this.defaultHTTPPort : defaultHTTPPort;
    didLaunch = didLaunch === VOID ? this.didLaunch : didLaunch;
    didWriteFile = didWriteFile === VOID ? this.didWriteFile : didWriteFile;
    dirFiles = dirFiles === VOID ? this.dirFiles : dirFiles;
    httpPort = httpPort === VOID ? this.httpPort : httpPort;
    inputDir = inputDir === VOID ? this.inputDir : inputDir;
    inputHTTPPort = inputHTTPPort === VOID ? this.inputHTTPPort : inputHTTPPort;
    listDir = listDir === VOID ? this.listDir : listDir;
    projectAbsPath = projectAbsPath === VOID ? this.projectAbsPath : projectAbsPath;
    projectDir = projectDir === VOID ? this.projectDir : projectDir;
    readFile = readFile === VOID ? this.readFile : readFile;
    readFileContents = readFileContents === VOID ? this.readFileContents : readFileContents;
    request = request === VOID ? this.request : request;
    response = response === VOID ? this.response : response;
    url = url === VOID ? this.url : url;
    writeFile = writeFile === VOID ? this.writeFile : writeFile;
    recentField = recentField === VOID ? this.de_1 : recentField;
    return $super === VOID ? this.cf(arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField) : $super.cf.call(this, arguments_0, browserDir, defaultHTTPPort, didLaunch, didWriteFile, dirFiles, httpPort, inputDir, inputHTTPPort, listDir, projectAbsPath, projectDir, readFile, readFileContents, request, response, url, writeFile, recentField);
  };
  protoOf(SrvContext).toString = function () {
    return 'SrvContext(arguments=' + toString(this.arguments) + ', browserDir=' + this.browserDir + ', defaultHTTPPort=' + this.defaultHTTPPort + ', didLaunch=' + this.didLaunch + ', didWriteFile=' + this.didWriteFile + ', dirFiles=' + toString(this.dirFiles) + ', httpPort=' + this.httpPort + ', inputDir=' + this.inputDir + ', inputHTTPPort=' + this.inputHTTPPort + ', listDir=' + this.listDir + ', projectAbsPath=' + this.projectAbsPath + ', projectDir=' + this.projectDir + ', readFile=' + this.readFile + ', readFileContents=' + this.readFileContents + ', request=' + this.request.toString() + ', response=' + this.response.toString() + ', url=' + this.url + ', writeFile=' + toString(this.writeFile) + ', recentField=' + this.de_1 + ')';
  };
  protoOf(SrvContext).hashCode = function () {
    var result = hashCode(this.arguments);
    result = imul(result, 31) + getStringHashCode(this.browserDir) | 0;
    result = imul(result, 31) + this.defaultHTTPPort | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didLaunch) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.didWriteFile) | 0;
    result = imul(result, 31) + hashCode(this.dirFiles) | 0;
    result = imul(result, 31) + this.httpPort | 0;
    result = imul(result, 31) + getStringHashCode(this.inputDir) | 0;
    result = imul(result, 31) + this.inputHTTPPort | 0;
    result = imul(result, 31) + getStringHashCode(this.listDir) | 0;
    result = imul(result, 31) + getStringHashCode(this.projectAbsPath) | 0;
    result = imul(result, 31) + getStringHashCode(this.projectDir) | 0;
    result = imul(result, 31) + getStringHashCode(this.readFile) | 0;
    result = imul(result, 31) + getStringHashCode(this.readFileContents) | 0;
    result = imul(result, 31) + this.request.hashCode() | 0;
    result = imul(result, 31) + this.response.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.url) | 0;
    result = imul(result, 31) + hashCode(this.writeFile) | 0;
    result = imul(result, 31) + getStringHashCode(this.de_1) | 0;
    return result;
  };
  protoOf(SrvContext).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SrvContext))
      return false;
    var tmp0_other_with_cast = other instanceof SrvContext ? other : THROW_CCE();
    if (!equals(this.arguments, tmp0_other_with_cast.arguments))
      return false;
    if (!(this.browserDir === tmp0_other_with_cast.browserDir))
      return false;
    if (!(this.defaultHTTPPort === tmp0_other_with_cast.defaultHTTPPort))
      return false;
    if (!(this.didLaunch === tmp0_other_with_cast.didLaunch))
      return false;
    if (!(this.didWriteFile === tmp0_other_with_cast.didWriteFile))
      return false;
    if (!equals(this.dirFiles, tmp0_other_with_cast.dirFiles))
      return false;
    if (!(this.httpPort === tmp0_other_with_cast.httpPort))
      return false;
    if (!(this.inputDir === tmp0_other_with_cast.inputDir))
      return false;
    if (!(this.inputHTTPPort === tmp0_other_with_cast.inputHTTPPort))
      return false;
    if (!(this.listDir === tmp0_other_with_cast.listDir))
      return false;
    if (!(this.projectAbsPath === tmp0_other_with_cast.projectAbsPath))
      return false;
    if (!(this.projectDir === tmp0_other_with_cast.projectDir))
      return false;
    if (!(this.readFile === tmp0_other_with_cast.readFile))
      return false;
    if (!(this.readFileContents === tmp0_other_with_cast.readFileContents))
      return false;
    if (!this.request.equals(tmp0_other_with_cast.request))
      return false;
    if (!this.response.equals(tmp0_other_with_cast.response))
      return false;
    if (!(this.url === tmp0_other_with_cast.url))
      return false;
    if (!equals(this.writeFile, tmp0_other_with_cast.writeFile))
      return false;
    if (!(this.de_1 === tmp0_other_with_cast.de_1))
      return false;
    return true;
  };
  function cliArgumentValue(args, argument) {
    var inductionVariable = 0;
    var last = args.length;
    while (inductionVariable < last) {
      var item = args[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (startsWith(item, argument)) {
        var prefix = argument + '=';
        var value = substring(item, prefix.length);
        return value;
      }
    }
    return '';
  }
  function debugShort(str) {
    if (str.length > 200) {
      return take(str, 100) + '\u2026';
    }
    return str;
  }
  function debugString(v) {
    if (typeof v === 'string') {
      return 'S(' + v.length + ')' + v;
    }
    if (isArray(v)) {
      var out = '';
      var inductionVariable = 0;
      var last = v.length;
      while (inductionVariable < last) {
        var item = v[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.text.isEmpty' call
        var this_0 = out;
        if (!(charSequenceLength(this_0) === 0)) {
          out = out + ',';
        }
        out = out + debugString(ensureNotNull(item));
      }
      return 'A(' + v.length + ')' + out;
    }
    if (isInterface(v, KtMap)) {
      var out_0 = '';
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = v.w().e();
      while (_iterator__ex2g4s.f()) {
        var _destruct__k2r9zo = _iterator__ex2g4s.g();
        // Inline function 'kotlin.collections.component1' call
        var key = _destruct__k2r9zo.p();
        // Inline function 'kotlin.collections.component2' call
        var value = _destruct__k2r9zo.q();
        // Inline function 'kotlin.text.isEmpty' call
        var this_1 = out_0;
        if (!(charSequenceLength(this_1) === 0)) {
          out_0 = out_0 + ',';
        }
        out_0 = out_0 + (debugString(ensureNotNull(key)) + ':' + debugString(ensureNotNull(value)));
      }
      return 'D(' + v.h() + ')' + out_0;
    }
    return toString(v);
  }
  function fileContentsToJSON(file, contents) {
    var contentsB64 = stringToBase64(contents);
    return '{"path":"' + file + '","contents":"' + contentsB64 + '"}';
  }
  function filesToJSON(files) {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var lines = [];
    var inductionVariable = 0;
    var last = files.length;
    while (inductionVariable < last) {
      var file = files[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      var type = file.isFile ? 'file' : 'dir';
      var ln = '{"path":"' + file.path + '","type":"' + type + '"}';
      // Inline function 'kotlin.collections.plus' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$3 = lines;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$6 = [ln];
      lines = tmp$ret$3.concat(tmp$ret$6);
    }
    var out = '[' + joinToString(lines, ',') + ']';
    return out;
  }
  function forKIntVArrayString(dict, cb) {
    var _iterator__ex2g4s = dict.u().e();
    while (_iterator__ex2g4s.f()) {
      var key = _iterator__ex2g4s.g();
      var items = ensureNotNull(dict.t(key));
      cb(key, items);
    }
  }
  function jsonToFileContents(json) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var d = LinkedHashMap_init_$Create$();
    var parts = split(json, ['"']);
    if (parts.h() === 9) {
      // Inline function 'kotlin.collections.set' call
      var value = parts.i(3);
      d.x1('path', value);
      var contentsB64 = parts.i(7);
      var tmp2 = 'contents';
      // Inline function 'kotlin.collections.set' call
      var value_0 = decodeToString(Default_getInstance().v7(contentsB64));
      d.x1(tmp2, value_0);
    }
    return d;
  }
  function jsonToFiles(raw) {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var items = [];
    var lessBrackets = substring_0(raw, 2, raw.length - 1 | 0);
    var lines = split(lessBrackets, [',{']);
    var prefix = '"path":"';
    var suffix = '"}';
    var middle = '","type":"';
    var _iterator__ex2g4s = lines.e();
    while (_iterator__ex2g4s.f()) {
      var ln = _iterator__ex2g4s.g();
      var lessLn = substring_0(ln, prefix.length, ln.length - suffix.length | 0);
      var parts = split(lessLn, [middle]);
      var f = new FSFile(parts.i(1) === 'file', parts.i(0));
      // Inline function 'kotlin.collections.plus' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$3 = items;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$6 = [f];
      items = tmp$ret$3.concat(tmp$ret$6);
    }
    return items;
  }
  function mdFiles(d) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var mds = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = d.u().e();
    while (_iterator__ex2g4s.f()) {
      var id = _iterator__ex2g4s.g();
      var files = ensureNotNull(d.t(id));
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var mdFiles = [];
      var inductionVariable = 0;
      var last = files.length;
      while (inductionVariable < last) {
        var f = files[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (endsWith(f.path, '.' + get_CONST_EXT_MD())) {
          var tmp0 = mdFiles;
          // Inline function 'kotlin.collections.plus' call
          // Inline function 'kotlin.js.asDynamic' call
          // Inline function 'kotlin.arrayOf' call
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp$ret$7 = [f.path];
          mdFiles = tmp0.concat(tmp$ret$7);
        }
      }
      // Inline function 'kotlin.collections.set' call
      var value = mdFiles;
      mds.x1(id, value);
    }
    return mds;
  }
  function parseCfg(raw) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var d = LinkedHashMap_init_$Create$();
    var lines = split(raw, ['\n']);
    var _iterator__ex2g4s = lines.e();
    while (_iterator__ex2g4s.f()) {
      var ln = _iterator__ex2g4s.g();
      var parts = split(ln, [' = ']);
      if (parts.h() === 2) {
        var k = parts.i(0);
        var v = parts.i(1);
        // Inline function 'kotlin.collections.set' call
        d.x1(k, v);
      }
    }
    return d;
  }
  function stringToBase64(txt) {
    var arr = encodeToByteArray(txt);
    return Default_getInstance().r7(arr);
  }
  //region block: post-declaration
  protoOf(AppContext).fieldAny = fieldAny;
  defineProp(protoOf(AppContext), 'recentField', function () {
    return this.f9();
  }, function (value) {
    this.e9(value);
  });
  protoOf(SrvContext).fieldAny = fieldAny;
  defineProp(protoOf(SrvContext), 'recentField', function () {
    return this.f9();
  }, function (value) {
    this.e9(value);
  });
  //endregion
  //region block: init
  APP_CFG_FILE = 'pskov.cfg';
  APP_CFG_KEY_INPUT = 'input';
  APP_HEADER_KEY_FILE = 'File';
  APP_HEADER_KEY_PROJECT = 'Project';
  APP_TAB_EDITOR_INDEX = 1;
  APP_TAB_FILES_INDEX = 0;
  APP_TAB_RENDER_INDEX = 2;
  APP_SPLASH_TIMEOUT = 800;
  CONST_API_LIST = '/list';
  CONST_API_PATH = '/path';
  CONST_API_READ = '/read';
  CONST_API_WRITE = '/write';
  CONST_EXT_MD = 'md';
  CONST_GET = 'GET';
  CONST_POST = 'POST';
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    $org$opengamestudio.CLDController = CLDController;
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    defineProp($org$opengamestudio, 'APP_CFG_FILE', get_APP_CFG_FILE);
    defineProp($org$opengamestudio, 'APP_CFG_KEY_INPUT', get_APP_CFG_KEY_INPUT);
    defineProp($org$opengamestudio, 'APP_HEADER_KEY_FILE', get_APP_HEADER_KEY_FILE);
    defineProp($org$opengamestudio, 'APP_HEADER_KEY_PROJECT', get_APP_HEADER_KEY_PROJECT);
    defineProp($org$opengamestudio, 'APP_TAB_EDITOR_INDEX', get_APP_TAB_EDITOR_INDEX);
    defineProp($org$opengamestudio, 'APP_TAB_FILES_INDEX', get_APP_TAB_FILES_INDEX);
    defineProp($org$opengamestudio, 'APP_TAB_RENDER_INDEX', get_APP_TAB_RENDER_INDEX);
    defineProp($org$opengamestudio, 'APP_SPLASH_TIMEOUT', get_APP_SPLASH_TIMEOUT);
    $org$opengamestudio.appShouldHideSplash = appShouldHideSplash;
    $org$opengamestudio.appShouldInstallEditor = appShouldInstallEditor;
    $org$opengamestudio.appShouldLoad = appShouldLoad;
    $org$opengamestudio.appShouldListInputDir = appShouldListInputDir;
    $org$opengamestudio.appShouldParseCfg = appShouldParseCfg;
    $org$opengamestudio.appShouldReadFile = appShouldReadFile;
    $org$opengamestudio.appShouldResetDidSaveEditedFiles = appShouldResetDidSaveEditedFiles;
    $org$opengamestudio.appShouldResetDidSaveFile = appShouldResetDidSaveFile;
    $org$opengamestudio.appShouldResetEditedFileContents = appShouldResetEditedFileContents;
    $org$opengamestudio.appShouldResetEditorContents = appShouldResetEditorContents;
    $org$opengamestudio.appShouldResetHeader = appShouldResetHeader;
    $org$opengamestudio.appShouldResetInputDirFiles = appShouldResetInputDirFiles;
    $org$opengamestudio.appShouldResetInputDirs = appShouldResetInputDirs;
    $org$opengamestudio.appShouldResetInputMDFiles = appShouldResetInputMDFiles;
    $org$opengamestudio.appShouldResetProjectPath = appShouldResetProjectPath;
    $org$opengamestudio.appShouldResetReadFileContents = appShouldResetReadFileContents;
    $org$opengamestudio.appShouldResizeEditor = appShouldResizeEditor;
    $org$opengamestudio.appShouldSaveFileId = appShouldSaveFileId;
    $org$opengamestudio.appShouldSaveFiles = appShouldSaveFiles;
    $org$opengamestudio.appShouldSelectFileName = appShouldSelectFileName;
    $org$opengamestudio.appShouldSelectTab = appShouldSelectTab;
    $org$opengamestudio.appURL = appURL;
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    defineProp($org$opengamestudio, 'CONST_API_LIST', get_CONST_API_LIST);
    defineProp($org$opengamestudio, 'CONST_API_PATH', get_CONST_API_PATH);
    defineProp($org$opengamestudio, 'CONST_API_READ', get_CONST_API_READ);
    defineProp($org$opengamestudio, 'CONST_API_WRITE', get_CONST_API_WRITE);
    defineProp($org$opengamestudio, 'CONST_EXT_MD', get_CONST_EXT_MD);
    defineProp($org$opengamestudio, 'CONST_GET', get_CONST_GET);
    defineProp($org$opengamestudio, 'CONST_POST', get_CONST_POST);
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    $org$opengamestudio.AppContext = AppContext;
    $org$opengamestudio.FSFile = FSFile;
    $org$opengamestudio.NetRequest = NetRequest;
    $org$opengamestudio.NetResponse = NetResponse;
    $org$opengamestudio.SrvContext = SrvContext;
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    $org$opengamestudio.cliArgumentValue = cliArgumentValue;
    $org$opengamestudio.debugShort = debugShort;
    $org$opengamestudio.debugString = debugString;
    $org$opengamestudio.fileContentsToJSON = fileContentsToJSON;
    $org$opengamestudio.filesToJSON = filesToJSON;
    $org$opengamestudio.forKIntVArrayString = forKIntVArrayString;
    $org$opengamestudio.jsonToFileContents = jsonToFileContents;
    $org$opengamestudio.jsonToFiles = jsonToFiles;
    $org$opengamestudio.mdFiles = mdFiles;
    $org$opengamestudio.parseCfg = parseCfg;
    $org$opengamestudio.stringToBase64 = stringToBase64;
  }
  $jsExportAll$(_);
  kotlin_kotlin.$jsExportAll$(_);
  //endregion
  return _;
}));

//# sourceMappingURL=pskov-ver-browser.js.map
