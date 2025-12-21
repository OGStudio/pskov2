package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val APP_CFG_FILE = "pskov.cfg"
@JsExport val APP_CFG_KEY_INPUT = "input"
@JsExport val APP_HEADER_KEY_FILE = "File"
@JsExport val APP_HEADER_KEY_PROJECT = "Project"
@JsExport val APP_ITEM_TEMPLATE_FILE = "item.template"
@JsExport val APP_PAGE_CONTENTS = "PSKOV_ITEM_CONTENTS"
@JsExport val APP_PAGE_DATE = "PSKOV_ITEM_DATE"
@JsExport val APP_PAGE_TITLE = "PSKOV_ITEM_TITLE"
@JsExport val APP_PAGE_URL = "PSKOV_ITEM_URL"
@JsExport val APP_TAB_EDITOR_INDEX = 1
@JsExport val APP_TAB_FILES_INDEX = 0
@JsExport val APP_TAB_RENDER_INDEX = 2
@JsExport val APP_SPLASH_TIMEOUT = 800
@JsExport val APP_YEAR_MAX = 2100

//<!-- Shoulds -->

/* Delete a file from disk
 *
 * Conditions:
 * 1. User selected `OK` to delete the file
 */
@JsExport
fun appShouldDeleteFile(c: AppContext): AppContext {
    /* 1 */ if (
        c.recentField == "deleteFileOrigin" &&
        c.deleteFileOrigin == "didClickFilesDeleteOK"
    ) {
        c.deleteFile = c.filesDeleteName
        c.recentField = "deleteFile"
        return c
    }

    c.recentField = "none"
    return c
}

/* Hide file options' menu
 *
 * Conditions:
 * 1. Did select `Copy` menu item
 * 3. Did select `Delete` menu item
 * 2. Did select `Rename` menu item
 */
@JsExport
fun appShouldHideFileOptions(c: AppContext): AppContext {
    if (c.recentField == "copyFileId") {
        c.hideFileOptions = c.copyFileId
        c.recentField = "hideFileOptions"
        return c
    }

    if (c.recentField == "deleteFileId") {
        c.hideFileOptions = c.deleteFileId
        c.recentField = "hideFileOptions"
        return c
    }

    if (c.recentField == "renameFileId") {
        c.hideFileOptions = c.renameFileId
        c.recentField = "hideFileOptions"
        return c
    }

    c.recentField = "none"
    return c
}

/* Hide splash after a delay
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun appShouldHideSplash(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.splashTimeout = APP_SPLASH_TIMEOUT
        c.recentField = "splashTimeout"
        return c
    }

    c.recentField = "none"
    return c
}

/* Setup editor
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun appShouldInstallEditor(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.installEditor = true
        c.recentField = "installEditor"
        return c
    }

    c.recentField = "none"
    return c
}

/* Setup Markdown converter
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun appShouldInstallMDConverter(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.installMDConverter = true
        c.recentField = "installMDConverter"
        return c
    }

    c.recentField = "none"
    return c
}

/* Make HTTP request
 *
 * Conditions:
 * 1. Did launch: Get project path
 * 2. Project path has been resolved: Read pskov.cfg contents
 * 3. List input directory files
 * 4. Read file
 * 5. Save edited file
 * 6. Save rendered file
 * 7. Save copied file
 * 8. Delete file
 */
@JsExport
fun appShouldLoad(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.request =
            NetRequest(
                "",
                CONST_HTTP_GET,
                appURL(c.baseURL, CONST_API_PATH),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "projectPath") {
        c.request =
            NetRequest(
                APP_CFG_FILE,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_READ),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "listInputDirId") {
        val dir = c.inputDirs[c.listInputDirId]
        c.request =
            NetRequest(
                dir,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_LIST),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "readFile") {
        c.request =
            NetRequest(
                c.readFile,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_READ),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "saveFileId") {
        val file = c.saveFiles[c.saveFileId]
        val contents = c.editedFileContents[file]!!
        val body = fileContentsToJSON(file, contents)
        c.request =
            NetRequest(
                body,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_WRITE),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "renderedFile") {
        val pageURL = "${c.page.slug}.$CONST_EXT_HTML"
        val o = c.itemTemplates[c.selectedFileId[0]]
            ?.replace(APP_PAGE_CONTENTS, c.converterOutput)
            ?.replace(APP_PAGE_DATE, c.page.date)
            ?.replace(APP_PAGE_TITLE, c.page.title)
            ?.replace(APP_PAGE_URL, pageURL)
        val contents = o ?: "Contents-N/A"
        val body = fileContentsToJSON(c.renderedFile, contents)
        c.request =
            NetRequest(
                body,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_WRITE),
            )
        c.recentField = "request"
        return c
    }

    if (
        c.recentField == "readFileContents" &&
        c.readFileOrigin == "didClickFilesCopyOK"
    ) {
        val body = fileContentsToJSON(c.inputFilesCopy, c.readFileContents)
        c.request =
            NetRequest(
                body,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_WRITE),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "deleteFile") {
        c.request =
            NetRequest(
                c.deleteFile,
                CONST_HTTP_POST,
                appURL(c.baseURL, CONST_API_DELETE),
            )
        c.recentField = "request"
        return c
    }

    c.recentField = "none"
    return c
}

/* Start, continue, or finish listing contents of one of the input dirs
 *
 * Conditions:
 * 1. Input dirs are available and not empty
 * 2. Input dir files received a new entry
 * 3. File has been copied
 */
@JsExport
fun appShouldListInputDir(c: AppContext): AppContext {
    /* 1 */ if (
        c.recentField == "inputDirs" &&
        c.inputDirs.size > 0
    ) {
        c.listInputDirId = 0
        c.recentField = "listInputDirId"
        return c
    }

    /* 2 */ if (
        c.recentField == "inputDirFiles" &&
        c.listInputDirId + 1 < c.inputDirs.size
    ) {
        c.listInputDirId += 1
        c.recentField = "listInputDirId"
        return c
    }

    /* 3 */ if (c.recentField == "didCopyFile") {
        c.listInputDirId = 0
        c.recentField = "listInputDirId"
        return c
    }

    c.recentField = "none"
    return c
}

/* Parse pskov.cfg
 *
 * Conditions:
 * 1. Got pskov.cfg contents as response
 */
@JsExport
fun appShouldParseCfg(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.req.method == CONST_HTTP_POST &&
        c.response.req.url == appURL(c.baseURL, CONST_API_READ) &&
        c.response.req.body == APP_CFG_FILE
    ) {
        c.cfg = parseCfg(c.response.contents)
        c.recentField = "cfg"
        return c
    }

    c.recentField = "none"
    return c
}

/* Read a file from disk
 *
 * Conditions:
 * 1. User selected a file
 * 2. Editor has contents of a selected file
 * 3. User selected `OK` to make a copy
 */
@JsExport
fun appShouldReadFile(c: AppContext): AppContext {
    if (
        c.recentField == "readFileOrigin" &&
        c.readFileOrigin == "selectedFileName"
    ) {
        c.readFile = c.selectedFileName
        c.recentField = "readFile"
        return c
    }

    if (
        c.recentField == "readFileOrigin" &&
        c.readFileOrigin == "editorContents"
    ) {
        c.readFile = c.inputDirs[c.selectedFileId[0]] + "/" + APP_ITEM_TEMPLATE_FILE
        c.recentField = "readFile"
        return c
    }

    if (
        c.recentField == "readFileOrigin" &&
        c.readFileOrigin == "didClickFilesCopyOK"
    ) {
        c.readFile = appFileIdToName(c.copyFileId, c.inputDirs, c.inputMDFiles)
        c.recentField = "readFile"
        return c
    }

    c.recentField = "none"
    return c
}

/* Return URL of the page to render
 *
 * Conditions:
 * 1. Did save rendered file
 */
@JsExport
fun appShouldRenderPage(c: AppContext): AppContext {
    if (c.recentField == "didSaveRenderedFile") {
        c.renderPage = CONST_API_RENDER + "/" + c.renderedFile
        c.recentField = "renderPage"
        return c
    }

    c.recentField = "none"
    return c
}

/* Convert MD to HTML
 *
 * Conditions:
 * 1. User did select `Render` tab
 */
@JsExport
fun appShouldResetConverterInput(c: AppContext): AppContext {
    if (c.recentField == "page") {
        c.converterInput = c.page.contents
        c.recentField = "converterInput"
        return c
    }

    c.recentField = "none"
    return c
}

/* Who wants to delete a file
 *
 * Conditions:
 * 1. User selected `OK` to delete the file
 */
@JsExport
fun appShouldResetDeleteFileOrigin(c: AppContext): AppContext {
    /* 1 */ if (c.recentField == "didClickFilesDeleteOK") {
        c.deleteFileOrigin = "didClickFilesDeleteOK"
        c.recentField = "deleteFileOrigin"
        return c
    }

    c.recentField = "none"
    return c
}

/* Mark the end of copying a file
 *
 * Conditions:
 * 1. File has been copied
 */
@JsExport
fun appShouldResetDidCopyFile(c: AppContext): AppContext {
    /* 1 */ if (
        c.recentField == "didSaveFile" &&
        c.readFileOrigin == "didClickFilesCopyOK"
    ) {
        c.didCopyFile = true
        c.recentField = "didCopyFile"
        return c
    }

    c.recentField = "none"
    return c
}

/* Mark the end of saving edited fiels
 *
 * Conditions:
 * 1. Saved the last file
 */
@JsExport
fun appShouldResetDidSaveEditedFiles(c: AppContext): AppContext {
    if (
        c.recentField == "didSaveFile" &&
        c.saveFileId + 1 == c.saveFiles.size
    ) {
        c.didSaveEditedFiles = true
        c.recentField = "didSaveEditedFiles"
        return c
    }

    c.recentField = "none"
    return c
}

/* Mark the end of file saving
 *
 * Conditions:
 * 1. Received response for POST /write of a Markdown file
 */
@JsExport
fun appShouldResetDidSaveFile(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.req.method == CONST_HTTP_POST &&
        c.response.req.url == appURL(c.baseURL, CONST_API_WRITE) &&
        c.response.req.body.contains(".$CONST_EXT_MD\"")
    ) {
        c.didSaveFile = true
        c.recentField = "didSaveFile"
        return c
    }

    c.recentField = "none"
    return c
}

/* Mark the end of saving a rendered file
 *
 * Conditions:
 * 1. Received response for POST /write of an HTML file
 */
@JsExport
fun appShouldResetDidSaveRenderedFile(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.req.method == CONST_HTTP_POST &&
        c.response.req.url == appURL(c.baseURL, CONST_API_WRITE) &&
        c.response.req.body.contains(".$CONST_EXT_HTML\"")
    ) {
        c.didSaveRenderedFile = true
        c.recentField = "didSaveRenderedFile"
        return c
    }

    c.recentField = "none"
    return c
}


/* Set temporary file contents
 *
 * Conditions:
 * 1. User edited a file
 * 2. User saved edited files
 */
@JsExport
fun appShouldResetEditedFileContents(c: AppContext): AppContext {
    if (c.recentField == "editedContents") {
        var fileContents = c.editedFileContents.toMutableMap()
        fileContents[c.selectedFileName] = c.editedContents
        c.editedFileContents = fileContents
        c.recentField = "editedFileContents"
        return c
    }

    if (c.recentField == "didSaveEditedFiles") {
        c.editedFileContents = mapOf()
        c.recentField = "editedFileContents"
        return c
    }

    c.recentField = "none"
    return c
}

/* Set editor contents
 *
 * Conditions:
 * 1. Markdown file has been read
 * 2. User selected a file that has already been edited/open
 */
@JsExport
fun appShouldResetEditorContents(c: AppContext): AppContext {
    if (
        c.recentField == "readFileContents" &&
        c.readFile.endsWith(CONST_EXT_MD) &&
        c.readFileOrigin == "selectedFileName"
    ) {
        c.editorContents = c.readFileContents
        c.recentField = "editorContents"
        return c
    }

    if (
        c.recentField == "selectedFileName" &&
        c.editedFileContents[c.selectedFileName] != null
    ) {
        c.editorContents = c.editedFileContents[c.selectedFileName]!!
        c.recentField = "editorContents"
        return c
    }

    c.recentField = "none"
    return c
}

/* Set default name of a copy
 *
 * Conditions:
 * 1. Did select `Copy` in files options menu
 */
@JsExport
fun appShouldResetFilesCopyDefaultName(c: AppContext): AppContext {
    if (c.recentField == "copyFileId") {
        val name = appFileIdToName(c.copyFileId, c.inputDirs, c.inputMDFiles)
        val delim = "." + CONST_EXT_MD
        val parts = name.split(delim)
        c.filesCopyDefaultName = parts[0]!! + "_COPY" + delim
        c.recentField = "filesCopyDefaultName"
        return c
    }

    c.recentField = "none"
    return c
}

/* Show / hide files' copy dialog
 *
 * Conditions:
 * 1. Did select `Copy` in files options menu
 * 2. Did save file after copying
 */
@JsExport
fun appShouldResetFilesCopyDialogVisibility(c: AppContext): AppContext {
    if (c.recentField == "copyFileId") {
        c.isFilesCopyDialogVisible = true
        c.recentField = "isFilesCopyDialogVisible"
        return c
    }

    if (c.recentField == "didCopyFile") {
        c.isFilesCopyDialogVisible = false
        c.recentField = "isFilesCopyDialogVisible"
        return c
    }

    c.recentField = "none"
    return c
}

/* Show / hide files' delete dialog
 *
 * Conditions:
 * 1. Did select `Delete` in files options menu
 * 2. Did delete file
 */
@JsExport
fun appShouldResetFilesDeleteDialogVisibility(c: AppContext): AppContext {
    if (c.recentField == "deleteFileId") {
        c.isFilesDeleteDialogVisible = true
        c.recentField = "isFilesDeleteDialogVisible"
        return c
    }

    if (c.recentField == "didDeleteFile") {
        c.isFilesDeleteDialogVisible = false
        c.recentField = "isFilesDeleteDialogVisible"
        return c
    }

    c.recentField = "none"
    return c
}

/* Set name of deleted file
 *
 * Conditions:
 * 1. Did select `Delete` in files options menu
 */
@JsExport
fun appShouldResetFilesDeleteName(c: AppContext): AppContext {
    if (c.recentField == "deleteFileId") {
        val name = appFileIdToName(c.deleteFileId, c.inputDirs, c.inputMDFiles)
        c.filesDeleteName = name
        c.recentField = "filesDeleteName"
        return c
    }

    c.recentField = "none"
    return c
}

/* Show / hide files' rename dialog
 *
 * Conditions:
 * 1. Did select `Rename` in files options menu
 * 2. Did save file after renaming
 */
@JsExport
fun appShouldResetFilesRenameDialogVisibility(c: AppContext): AppContext {
    if (c.recentField == "renameFileId") {
        c.isFilesRenameDialogVisible = true
        c.recentField = "isFilesRenameDialogVisible"
        return c
    }

    if (c.recentField == "didRenameFile") {
        c.isFilesRenameDialogVisible = false
        c.recentField = "isFilesRenameDialogVisible"
        return c
    }

    c.recentField = "none"
    return c
}

/* Set name of renaming
 *
 * Conditions:
 * 1. Did select `Rename` in files options menu
 */
@JsExport
fun appShouldResetFilesRenameName(c: AppContext): AppContext {
    if (c.recentField == "renameFileId") {
        val name = appFileIdToName(c.renameFileId, c.inputDirs, c.inputMDFiles)
        c.filesRenameName = name
        c.recentField = "filesRenameName"
        return c
    }

    c.recentField = "none"
    return c
}

/* Set header contents
 *
 * Conditions:
 * 1. Files tab was selected
 * 2. Project path was resolved
 * 3. Editor tab was selected
 */
@JsExport
fun appShouldResetHeader(c: AppContext): AppContext {
    if (
        c.recentField == "selectedTabId" &&
        c.selectedTabId == APP_TAB_FILES_INDEX
    ) {
        c.header = arrayOf(APP_HEADER_KEY_PROJECT, c.projectPath)
        c.recentField = "header"
        return c
    }

    if (
        c.recentField == "projectPath" &&
        c.selectedTabId == APP_TAB_FILES_INDEX
    ) {
        c.header = arrayOf(APP_HEADER_KEY_PROJECT, c.projectPath)
        c.recentField = "header"
        return c
    }

    if (
        c.recentField == "selectedTabId" &&
        c.selectedTabId == APP_TAB_EDITOR_INDEX &&
        !c.readFile.isEmpty()
    ) {
        c.header = arrayOf(APP_HEADER_KEY_FILE, c.selectedFileName)
        c.recentField = "header"
        return c
    }

    c.recentField = "none"
    return c
}

/* Collect list of files of each input dir
 *
 * Conditions:
 * 1. Received a list of files of an input dir
 */
@JsExport
fun appShouldResetInputDirFiles(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.listInputDirId < c.inputDirs.size &&
        c.inputDirs[c.listInputDirId] == c.request.body &&
        c.response.req.url == appURL(c.baseURL, CONST_API_LIST)
    ) {
        var d = c.inputDirFiles.toMutableMap()
        d[c.listInputDirId] = jsonToFiles(c.response.contents)
        c.inputDirFiles = d
        c.recentField = "inputDirFiles"
        return c
    }

    c.recentField = "none"
    return c
}

/* Construct an array of input directories based on config's `input`
 *
 * Conditions:
 * 1. Config has been parsed
 */
@JsExport
fun appShouldResetInputDirs(c: AppContext): AppContext {
    if (c.recentField == "cfg") {
        val dirs = c.cfg[APP_CFG_KEY_INPUT]?.split(";") ?: emptyList<String>()
        c.inputDirs = dirs.toTypedArray()
        c.recentField = "inputDirs"
        return c
    }

    c.recentField = "none"
    return c
}

/* Filter out non-Markdown files
 *
 * Conditions:
 * 1. Requestes to list files have completed
 */
@JsExport
fun appShouldResetInputMDFiles(c: AppContext): AppContext {
    if (
        c.recentField == "inputDirFiles" &&
        c.listInputDirId + 1 == c.inputDirs.size
    ) {
        c.inputMDFiles = mdFiles(c.inputDirFiles)
        c.recentField = "inputMDFiles"
        return c
    }

    c.recentField = "none"
    return c
}

/* Collect item templates
 *
 * Conditions:
 * 1. Received contents of an item template
 */
@JsExport
fun appShouldResetItemTemplates(c: AppContext): AppContext {
    if (
        c.recentField == "readFileContents" &&
        c.readFile.endsWith(APP_ITEM_TEMPLATE_FILE)
    ) {
        var d = c.itemTemplates.toMutableMap()
        d[c.selectedFileId[0]] = c.readFileContents
        c.itemTemplates = d
        c.recentField = "itemTemplates"
        return c
    }

    c.recentField = "none"
    return c
}

/* Extract metadata from page MD
 *
 * Conditions:
 * 1. User did click `Render` tab
 */
@JsExport
fun appShouldResetPage(c: AppContext): AppContext {
    if (c.recentField == "didClickRenderTab") {
        c.page = parsePage(c.editedContents)
        c.recentField = "page"
        return c
    }

    c.recentField = "none"
    return c
}

/* Resolve project path
 *
 * Conditions:
 * 1. Received GET /path response
 */
@JsExport
fun appShouldResetProjectPath(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.req.url == appURL(c.baseURL, CONST_API_PATH)
    ) {
        c.projectPath = c.response.contents
        c.recentField = "projectPath"
        return c
    }

    c.recentField = "none"
    return c
}

/* Report contents of a read file
 *
 * Conditions:
 * 1. Received POST /read response
 */
@JsExport
fun appShouldResetReadFileContents(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.req.method == CONST_HTTP_POST &&
        c.response.req.url == appURL(c.baseURL, CONST_API_READ) &&
        c.response.req.body == c.readFile
    ) {
        c.readFileContents = c.response.contents
        c.recentField = "readFileContents"
        return c
    }

    c.recentField = "none"
    return c
}

/* Who wants to read a file
 *
 * Conditions:
 * 1. User selected a file
 * 2. Editor has contents of a selected file
 * 3. User selected `OK` to make a copy
 */
@JsExport
fun appShouldResetReadFileOrigin(c: AppContext): AppContext {
    if (
        c.recentField == "selectedFileName" &&
        c.editedFileContents[c.selectedFileName] == null
    ) {
        c.readFileOrigin = "selectedFileName"
        c.recentField = "readFileOrigin"
        return c
    }

    if (
        c.recentField == "editorContents" &&
        c.itemTemplates[c.selectedFileId[0]] == null
    ) {
        c.readFileOrigin = "editorContents"
        c.recentField = "readFileOrigin"
        return c
    }

    if (c.recentField == "didClickFilesCopyOK") {
        c.readFileOrigin = "didClickFilesCopyOK"
        c.recentField = "readFileOrigin"
        return c
    }

    c.recentField = "none"
    return c
}

/* Detect when editor needs to be resized
 *
 * Conditions:
 * 1. User did resize window while on `Edit` tab
 * 2. User selected `Edit` tab
 */
@JsExport
fun appShouldResizeEditor(c: AppContext): AppContext {
    if (
        c.recentField == "didResize" &&
        c.selectedTabId == APP_TAB_EDITOR_INDEX
    ) {
        c.resizeEditor = true
        c.recentField = "resizeEditor"
        return c
    }

    if (
        c.recentField == "selectedTabId" &&
        c.selectedTabId == APP_TAB_EDITOR_INDEX
    ) {
        c.resizeEditor = true
        c.recentField = "resizeEditor"
        return c
    }

    c.recentField = "none"
    return c
}

/* Detect when renderer needs to be resized
 *
 * Conditions:
 * 1. User did resize window while on `Edit` tab
 * 2. User selected `Edit` tab
 */
@JsExport
fun appShouldResizeRenderer(c: AppContext): AppContext {
    if (
        c.recentField == "didResize" &&
        c.selectedTabId == APP_TAB_RENDER_INDEX
    ) {
        c.resizeEditor = true
        c.recentField = "resizeRenderer"
        return c
    }

    if (
        c.recentField == "selectedTabId" &&
        c.selectedTabId == APP_TAB_RENDER_INDEX
    ) {
        c.resizeEditor = true
        c.recentField = "resizeRenderer"
        return c
    }

    c.recentField = "none"
    return c
}

/* Save single file
 *
 * Conditions:
 * 1. Starting to save files
 * 2. Continuing to save files
 */
@JsExport
fun appShouldSaveFileId(c: AppContext): AppContext {
    if (
        c.recentField == "saveFiles" &&
        !c.editedFileContents.isEmpty()
    ) {
        c.saveFileId = 0
        c.recentField = "saveFileId"
        return c
    }

    if (
        c.recentField == "didSaveFile" &&
        c.saveFileId + 1 < c.saveFiles.size
    ) {
        c.saveFileId += 1
        c.recentField = "saveFileId"
        return c
    }

    c.recentField = "none"
    return c
}

/* Start saving files to disk
 *
 * Conditions:
 * 1. User clicked save button
 */
@JsExport
fun appShouldSaveFiles(c: AppContext): AppContext {
    if (c.recentField == "didClickSaveBtn") {
        c.saveFiles = c.editedFileContents.keys.toTypedArray()
        c.recentField = "saveFiles"
        return c
    }

    c.recentField = "none"
    return c
}

/* Save rendered page
 *
 * Conditions:
 * 1. Page contents have been converted to HTML
 */
@JsExport
fun appShouldSaveRenderedFile(c: AppContext): AppContext {
    if (c.recentField == "converterOutput") {
        val dir = c.inputDirs[c.selectedFileId[0]]
        c.renderedFile = "$dir/${c.page.slug}.$CONST_EXT_HTML"
        c.recentField = "renderedFile"
        return c
    }

    c.recentField = "none"
    return c
}

/* Select file name
 *
 * Conditions:
 * 1. File id has been selected
 */
@JsExport
fun appShouldSelectFileName(c: AppContext): AppContext {
    if (c.recentField == "selectedFileId") {
        c.selectedFileName = appFileIdToName(c.selectedFileId, c.inputDirs, c.inputMDFiles)
        c.recentField = "selectedFileName"
        return c
    }

    c.recentField = "none"
    return c
}

/* Select tab
 *
 * Conditions:
 * 1. Did launch
 * 2. User clicked `Files`
 * 3. User clicked `Editor`
 * 4. User clicked `Render`
 * 5. User selected a file
 */
@JsExport
fun appShouldSelectTab(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.selectedTabId = APP_TAB_FILES_INDEX
        c.recentField = "selectedTabId"
        return c
    }

    if (c.recentField == "didClickFilesTab") {
        c.selectedTabId = APP_TAB_FILES_INDEX
        c.recentField = "selectedTabId"
        return c
    }

    if (c.recentField == "didClickEditorTab") {
        c.selectedTabId = APP_TAB_EDITOR_INDEX
        c.recentField = "selectedTabId"
        return c
    }

    if (c.recentField == "didClickRenderTab") {
        c.selectedTabId = APP_TAB_RENDER_INDEX
        c.recentField = "selectedTabId"
        return c
    }

    if (c.recentField == "selectedFileName") {
        c.selectedTabId = APP_TAB_EDITOR_INDEX
        c.recentField = "selectedTabId"
        return c
    }

    c.recentField = "none"
    return c
}

//<!-- Other functions -->

@JsExport
fun appFileIdToName(
    fileId: Array<Int>,
    inputDirs: Array<String>,
    inputMDFiles: Map<Int, Array<String>>
): String {
    val inputDirId = fileId[0]
    val mdFileId = fileId[1]
    val dir = inputDirs[inputDirId]!!
    val file = inputMDFiles[inputDirId]!![mdFileId]!!
    return "$dir/$file"
}

@JsExport
fun appURL(
    baseURL: String,
    api: String
): String {
    return "$baseURL$api"
}

@JsExport
fun appYear(value: String): String {
    val parts = value.split("-")

    // 1. Make sure there was a split
    if (parts.size < 2) {
        return ""
    }

    // 2. Make sure the first part is a digit
    var year: Int = 0
    try {
        year = parts[0]?.toInt() ?: 0
    } catch (e: Exception) {
        return ""
    }

    // 3. Make sure digit makes sense as a year
    if (
        year < 1970 ||
        year > APP_YEAR_MAX
    ) {
        return ""
    }

    return "$year"
}

