package org.opengamestudio

import kotlin.js.JsExport

//<!-- Constants -->

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
