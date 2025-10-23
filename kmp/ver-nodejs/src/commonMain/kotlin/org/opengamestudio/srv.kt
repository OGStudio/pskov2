package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val SRV_API_ROOT = "/"

@JsExport val SRV_ARGUMENT_BROWSER_DIR = "--browserDir"
@JsExport val SRV_ARGUMENT_PROJECT_DIR = "--projectDir"

@JsExport val SRV_DEFAULT_HTTP_PORT = 8000
@JsExport val SRV_INDEX = "index.html"

//<!-- Shoulds -->
 
/* List directory files
 *
 * Conditions:
 * 1. POST /list
 */
@JsExport
fun srvShouldListDir(c: SrvContext): SrvContext {
    if (
        c.recentField == "request" &&
        c.request.method == CONST_POST && 
        c.request.url == CONST_API_LIST
    ) {
        c.listDir = "${c.projectAbsPath}/${c.request.body}"
        c.recentField = "listDir"
        return c
    }


    c.recentField = "none"
    return c
}

/* Open URL in browser
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun srvShouldOpenURL(c: SrvContext): SrvContext {
    if (c.recentField == "didLaunch") {
        c.url = "http://localhost:" + c.httpPort
        c.recentField = "url"
        return c
    }

    c.recentField = "none"
    return c
}

/* Read a file
 *
 * Conditions:
 * 1. GET /
 * 2. GET /<file> (excluding reserved API calls)
 * 3. POST /read
 */
@JsExport
fun srvShouldReadFile(c: SrvContext): SrvContext {
    if (
        c.recentField == "request" &&
        c.request.method == CONST_GET && 
        c.request.url == SRV_API_ROOT
    ) {
        c.readFile = "${c.browserDir}/${SRV_INDEX}"
        c.recentField = "readFile"
        return c
    }

    if (
        c.recentField == "request" &&
        c.request.method == CONST_GET && 
        c.request.url != CONST_API_PATH
    ) {
        c.readFile = "${c.browserDir}${c.request.url}"
        c.recentField = "readFile"
        return c
    }

    if (
        c.recentField == "request" &&
        c.request.method == CONST_POST && 
        c.request.url == CONST_API_READ
    ) {
        c.readFile = "${c.projectAbsPath}/${c.request.body}"
        c.recentField = "readFile"
        return c
    }


    c.recentField = "none"
    return c
}

/* Reset path to serve files requested by web browser
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun srvShouldResetBrowserDir(c: SrvContext): SrvContext {
    if (c.recentField == "didLaunch") {
        c.browserDir = cliArgumentValue(c.arguments, SRV_ARGUMENT_BROWSER_DIR)
        c.recentField = "browserDir"
        return c
    }

    c.recentField = "none"
    return c
}

/* HTTP port to use
 *
 * Conditions:
 * 1. Did set default HTTP port
 */
@JsExport
fun srvShouldResetHTTPPort(c: SrvContext): SrvContext {
    if (c.recentField == "defaultHTTPPort") {
        c.httpPort = c.defaultHTTPPort
        c.recentField = "httpPort"
        return c
    }

    c.recentField = "none"
    return c
}

/* Reset path to where PSKOV files are located
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun srvShouldResetProjectDir(c: SrvContext): SrvContext {
    if (c.recentField == "didLaunch") {
        c.projectDir = cliArgumentValue(c.arguments, SRV_ARGUMENT_PROJECT_DIR)
        c.recentField = "projectDir"
        return c
    }

    c.recentField = "none"
    return c
}

/* Generate HTTP response
 *
 * Conditions:
 * 1. Did receive contents of the requested file
 * 2. GET /path
 * 3. Did receive contents of the requested directory
 * 4. Did finish writing a file
 */
@JsExport
fun srvShouldResetResponse(c: SrvContext): SrvContext {
    if (c.recentField == "readFileContents") {
        c.response = NetResponse(c.readFileContents, c.request)
        c.recentField = "response"
        return c
    }

    if (
        c.recentField == "request" &&
        c.request.method == CONST_GET &&
        c.request.url == CONST_API_PATH
    ) {
        c.response = NetResponse(c.projectAbsPath, c.request)
        c.recentField = "response"
        return c
    }

    if (c.recentField == "dirFiles") {
        val json = filesToJSON(c.dirFiles)
        c.response = NetResponse(json, c.request)
        c.recentField = "response"
        return c
    }

    if (c.recentField == "didWriteFile") {
        var reply = ""
        if (!c.didWriteFile) {
            reply = "ERR write"
        }
        c.response = NetResponse(reply, c.request)
        c.recentField = "response"
        return c
    }

    c.recentField = "none"
    return c
}

/* Write a file
 *
 * Conditions:
 * 1. POST /write
 */
@JsExport
fun srvShouldWriteFile(c: SrvContext): SrvContext {
    if (
        c.recentField == "request" &&
        c.request.method == CONST_POST && 
        c.request.url == CONST_API_WRITE
    ) {
        val d = jsonToFileContents(c.request.body)
        val fullPath = "${c.projectAbsPath}/${d["path"]!!}"
        c.writeFile = arrayOf(fullPath, d["contents"]!!)
        c.recentField = "writeFile"
        return c
    }

    c.recentField = "none"
    return c
}

