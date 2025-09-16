package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

val APP_API_PATH = "/path"
val APP_SPLASH_TIMEOUT = 1000

//<!-- Shoulds -->

/* Make HTTP request
 *
 * Conditions:
 * 1. Did launch
 */
@JsExport
fun appShouldLoad(c: AppContext): AppContext {
    if (c.recentField == "didLaunch") {
        c.request =
            NetRequest(
                "",
                "GET",
                appURL(c.baseURL, APP_API_PATH),
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
        c.response.url == appURL(c.baseURL, APP_API_PATH)
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
