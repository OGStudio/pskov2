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

// Iterate over all keys and associated values of Map<Int, Array<String>>
@JsExport
fun forKIntVArrayString(
    dict: Map<Int, Array<String>>,
    cb: (key: Int, values: Array<String>) -> Unit
) {
    for (key in dict.keys) {
        val items = dict[key]!!
        cb(key, items)
    }
}

// Convert a list of files in JSON format to a list of FSFiles
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

// Filter out non-Markdown files
@JsExport
fun mdFiles(d: Map<Int, Array<FSFile>>): Map<Int, Array<String>> {
    var mds = mutableMapOf<Int, Array<String>>()

    for (id in d.keys) {
        val files = d[id]!!
        var mdFiles = arrayOf<String>()
        for (f in files) {
            if (f.path.endsWith("." + CONST_EXT_MD)) {
                mdFiles += f.path
            }
        }
        mds[id] = mdFiles
    }

    return mds
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
