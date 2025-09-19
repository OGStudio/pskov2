package org.opengamestudio
import kotlin.js.JsExport

// Extract command line argument value
@JsExport
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

// Parse INI format file
@JsExport
fun parseCfg(raw: String): Map<String, String> {
    var d = mutableMapOf<String, String>()
    val lines = raw.split("\n")
    for (ln in lines) {
        val parts = ln.split(" = ")
        if (parts.size == 2) {
            val k = parts[0]
            val v = parts[1]
            d[k] = v
        }
    }
    return d
}

// Shorten field values that are too lengthy for debug output
@JsExport
fun shortFieldValue(v: String): String {
    if (v.length > 200) {
        return v.take(50)
    }
    return v
}
