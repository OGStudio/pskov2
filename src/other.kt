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

// Convert list of files to JSON format
@JsExport
fun filesToJSON(files: Array<FSFile>): String {
    var lines = arrayOf<String>()
    for (file in files) {
        val type = if (file.isFile) "file" else "dir"
        val ln = "{\"path\":\"${file.path}\",\"type\":\"$type\"}"
        lines += ln
    }
    val out = "[" + lines.joinToString(",") + "]"
    return out
}

// Convert list of files in JSON format to list of FSFiles
@JsExport
fun jsonToFiles(raw: String): Array<FSFile> {
    var items = arrayOf<FSFile>()

    val lessBrackets = raw.substring(2, raw.length - 1)
    val lines = lessBrackets.split(",{")
    val prefix = "\"path\":\""
    val suffix = "\"}"
    val middle = "\",\"type\":\""
    for (ln in lines) {
        val lessLn = ln.substring(prefix.length, ln.length - suffix.length)
        val parts = lessLn.split(middle)
        val f = FSFile(parts[1] == "file", parts[0])
        items += f
    }

    return items
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
        return v.take(100) + "…";
    }
    return v
}
