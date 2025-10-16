package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val APP_CFG_FILE = "pskov.cfg"
@JsExport val APP_CFG_KEY_INPUT = "input"
@JsExport val APP_SPLASH_TIMEOUT = 800

//<!-- Shoulds -->

/* Make HTTP request
 *
 * Conditions:
 * 1. Did launch: Get project path
 * 2. Project path has been resolved: Read pskov.cfg contents
 * 3. List input directory files
 * 4. Read file
 */
@JsExport
fun appShouldLoad(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.request =
            NetRequest(
                "",
                CONST_GET,
                appURL(c.baseURL, CONST_API_PATH),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "projectPath") {
        c.request =
            NetRequest(
                APP_CFG_FILE,
                CONST_POST,
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
                CONST_POST,
                appURL(c.baseURL, CONST_API_LIST),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "readFile") {
        c.request =
            NetRequest(
                c.readFile,
                CONST_POST,
                appURL(c.baseURL, CONST_API_READ),
            )
        c.recentField = "request"
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

/* Start, continue, or finish listing contents of one of the input dirs
 *
 * Conditions:
 * 1. Input dirs are available and not empty
 * 2. Input dir files received a new entry
 */
@JsExport
fun appShouldListInputDir(c: AppContext): AppContext {
    if (
        c.recentField == "inputDirs" &&
        c.inputDirs.size > 0
    ) {
        c.listInputDirId = 0
        c.recentField = "listInputDirId"
        return c
    }

    if (
        c.recentField == "inputDirFiles" &&
        c.listInputDirId + 1 < c.inputDirs.size
    ) {
        c.listInputDirId += 1
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
        c.response.req.method == CONST_POST &&
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

/* Read markdown file
 *
 * Conditions:
 * 1. User selected a page item
 */
@JsExport
fun appShouldReadFile(c: AppContext): AppContext {
    if (c.recentField == "selectedPageId") {
        val inputDirId = c.selectedPageId[0]
        val mdFileId = c.selectedPageId[1]
        val dir = c.inputDirs[inputDirId]!!
        val file = c.inputMDFiles[inputDirId]!![mdFileId]!!
        c.readFile = "$dir/$file"
        c.recentField = "readFile"
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
        c.request.url == appURL(c.baseURL, CONST_API_LIST)
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

/* Display project path
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
        c.response.req.method == CONST_POST &&
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

/* Select tab
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun appShouldSelectTab(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.selectedTabId = 0
        c.recentField = "selectedTabId"
        return c
    }

    c.recentField = "none"
    return c
}

//<!-- Other functions -->

@JsExport
fun appURL(
    baseURL: String,
    api: String
): String {
    return "$baseURL$api"
}
