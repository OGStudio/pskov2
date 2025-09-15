package org.opengamestudio
import kotlin.js.JsExport

//<!-- Constants -->

val APP_API_PATH = "/path"

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

//<!-- Other functions -->

@JsExport
fun appURL(
    baseURL: String,
    api: String
): String {
    return "$baseURL$api"
}
