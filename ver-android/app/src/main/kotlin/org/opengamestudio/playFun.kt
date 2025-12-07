package org.opengamestudio

import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString

//<!-- Constants -->

//val AUTH_API_LOGIN = "/api/rest/login"

//<!-- Shoulds -->

/* Perform network request
 *
 * Conditions:
 * 1. User clicked ...
 */

fun playShouldLoad(c: PlayContext): PlayContext {
  /*
    if (c.recentField == "didClickContinue") {
        c.request =
            NetRequest(
                "",
                "GET",
                authURL(c.inputHost, AUTH_API_SYSTEM_INFO),
            )
        c.recentField = "request"
        return c
    }
    */

    c.recentField = "none"
    return c
}

/* Set playground screen visibility
 *
 * Conditions:
 * 1. Did launch
 */

fun playShouldResetPlaygroundVisibility(c: PlayContext): PlayContext {
    if (c.recentField == "didLaunch") {
        c.isPlagroundVisible = true
        c.recentField = "isPlaygroundVisible"
        return c
    }

    if (c.recentField == "host") {
        c.isHostsVisible = false
        c.recentField = "isHostsVisible"
        return c
    }

    c.recentField = "none"
    return c
}

//<!-- Other functions -->

