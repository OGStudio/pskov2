package org.opengamestudio
import kotlin.js.JsExport


@JsExport
data class SrvContext(
    var arguments: Array<String> = arrayOf(),
    var defaultHTTPPort: Int = 0,
    var didLaunch: Boolean = false,
    var httpPort: Int = 0,
    var inputDir: String = "",
    var inputHTTPPort: Int = 0,
    var request: NetRequest = NetRequest(),
    override var recentField: String = "",
): CLDContext {
    override fun <T> field(name: String): T {
        if (name == "arguments") {
            return arguments as T
        } else if (name == "defaultHTTPPort") {
            return defaultHTTPPort as T
        } else if (name == "didLaunch") {
            return didLaunch as T
        } else if (name == "httpPort") {
            return httpPort as T
        } else if (name == "inputDir") {
            return inputDir as T
        } else if (name == "inputHTTPPort") {
            return inputHTTPPort as T
        } else if (name == "request") {
            return request as T
        }
        return "unknown-field-name" as T
    }

    override fun selfCopy(): CLDContext {
        return this.copy()
    }

    override fun setField(
        name: String,
        value: Any?
    ) {
        if (name == "arguments") {
            arguments = value as Array<String>
        } else if (name == "defaultHTTPPort") {
            defaultHTTPPort = value as Int
        } else if (name == "didLaunch") {
            didLaunch = value as Boolean
        } else if (name == "httpPort") {
            httpPort = value as Int
        } else if (name == "inputDir") {
            inputDir = value as String
        } else if (name == "inputHTTPPort") {
            inputHTTPPort = value as Int
        } else if (name == "request") {
            request = value as NetRequest
        }
    }
}


@JsExport
data class NetRequest(
    var body: String = "",
    var method: String = "",
    var url: String = "",
) {}
