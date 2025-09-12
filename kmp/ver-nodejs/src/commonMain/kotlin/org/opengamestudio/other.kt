package org.opengamestudio
import kotlin.js.JsExport

// Extract command line argument value
fun cliArgumentValue(
    args: Array<String>,
    argument: String
): String {
    for (item in args) {
        if (item.startsWith(argument)) {
            val prefix = argument + "="
            val value = item.substring(prefix.length)
            return value
        }
    }
    return ""
}

// Shorten field values that are too lengthy for debug output
@JsExport
fun shortFieldValue(v: String): String {
    if (v.length > 200) {
        return v.take(50)
    }
    return v
}
