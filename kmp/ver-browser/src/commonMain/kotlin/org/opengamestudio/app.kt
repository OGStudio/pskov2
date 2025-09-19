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
 * 2. Project path has been resolved: Get pskov.cfg contents
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

/* Construct an array of input directories based on config's input key values
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

//<!-- Other functions -->

@JsExport
fun appURL(
    baseURL: String,
    api: String
): String {
    return "$baseURL$api"
}
