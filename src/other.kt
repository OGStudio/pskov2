package org.opengamestudio
import kotlin.js.JsExport
import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString

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

// Convert list of files of JSON format to list of FSFiles
@JsExport
fun jsonToFiles(raw: String): Array<FSFile> {
    var items = arrayOf<FSFile>()
    val abc = Json{ignoreUnknownKeys = true}.decodeFromString<Array<APIListItem>>(raw)
    print("ИГР jsonTF abc: '$abc'")

    // TODO

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
