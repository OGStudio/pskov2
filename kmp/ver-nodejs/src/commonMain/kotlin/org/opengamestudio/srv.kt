package org.opengamestudio

import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val SRV_ARGUMENT_BROWSER_DIR = "--browserDir"
@JsExport val SRV_DEFAULT_HTTP_PORT = 8000

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

/* Path to web browser client to serve when requesting index.html and such
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun srvShouldResetBrowserDir(c: SrvContext): SrvContext {
    if (c.recentField == "didLaunch") {
        c.browserDir = cliArgument(c.arguments, SRV_ARGUMENT_BROWSER_DIR)
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

/* Process request and generate response
 *
 * Conditions:
 * 1. Got request
 */
@JsExport
fun srvShouldResetResponse(c: SrvContext): SrvContext {
    if (c.recentField == "request") {
        c.response = NetResponse("This is a response, and you requested: " + c.request.url, c.request.url)
        c.recentField = "response"
        return c
    }

    c.recentField = "none"
    return c
}
