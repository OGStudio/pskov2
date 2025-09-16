package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val SRV_API_PATH = "/path"
@JsExport val SRV_API_ROOT = "/"

@JsExport val SRV_ARGUMENT_BROWSER_DIR = "--browserDir"
@JsExport val SRV_ARGUMENT_PROJECT_DIR = "--projectDir"

@JsExport val SRV_DEFAULT_HTTP_PORT = 8000
@JsExport val SRV_INDEX = "index.html"

//<!-- Shoulds -->
 
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

/* Read files
 *
 * Conditions:
 * 1. GET /
 * 2. GET /<file> (excluding GET /path)
 */
@JsExport
fun srvShouldReadFile(c: SrvContext): SrvContext {
    if (
        c.recentField == "request" &&
        c.request.url == SRV_API_ROOT
    ) {
        c.readFile = "${c.browserDir}/${SRV_INDEX}"
        c.recentField = "readFile"
        return c
    }

    if (
        c.recentField == "request" &&
        c.request.url != SRV_API_PATH
    ) {
        c.readFile = "${c.browserDir}${c.request.url}"
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
 * 1. Did receive contents of a requested file
 * 2. GET /path
 */
@JsExport
fun srvShouldResetResponse(c: SrvContext): SrvContext {
    if (c.recentField == "readFileContents") {
        c.response = NetResponse(c.readFileContents, c.request.url)
        c.recentField = "response"
        return c
    }

    if (
        c.recentField == "request" &&
        c.request.url == SRV_API_PATH
    ) {
        c.response = NetResponse(c.projectAbsPath, c.request.url)
        c.recentField = "response"
        return c
    }

    c.recentField = "none"
    return c
}
