package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

@JsExport val APP_CFG_FILE = "pskov.cfg"
@JsExport val APP_SPLASH_TIMEOUT = 800

//<!-- Shoulds -->

/* Make HTTP request
 *
 * Conditions:
 * 1. Did launch
 * 2. Project path has been resolved
 */
@JsExport
fun appShouldLoad(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.request =
            NetRequest(
                "",
                "GET",
                appURL(c.baseURL, CONST_API_PATH),
            )
        c.recentField = "request"
        return c
    }

    if (c.recentField == "projectPath") {
        c.request =
            NetRequest(
                APP_CFG_FILE,
                "POST",
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

/* Display project path
 *
 * Conditions:
 * 1. Received GET /path response
 */
@JsExport
fun appShouldResetProjectPath(c: AppContext): AppContext {
    if (
        c.recentField == "response" &&
        c.response.url == appURL(c.baseURL, CONST_API_PATH)
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
