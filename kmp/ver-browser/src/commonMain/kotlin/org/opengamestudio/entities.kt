package org.opengamestudio
import kotlin.js.JsExport


@JsExport
data class AppContext(
    var baseURL: String = "",
    var didLaunch: Boolean = false,
    var projectPath: String = "",
    var request: NetRequest = NetRequest(),
    var response: NetResponse = NetResponse(),
    var responseError: NetResponse = NetResponse(),
    var splashTimeout: Int = 0,
    override var recentField: String = "",
): CLDContext {
    override fun <T> field(name: String): T {
        if (name == "baseURL") {
            return baseURL as T
        } else if (name == "didLaunch") {
            return didLaunch as T
        } else if (name == "projectPath") {
            return projectPath as T
        } else if (name == "request") {
            return request as T
        } else if (name == "response") {
            return response as T
        } else if (name == "responseError") {
            return responseError as T
        } else if (name == "splashTimeout") {
            return splashTimeout as T
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
        if (name == "baseURL") {
            baseURL = value as String
        } else if (name == "didLaunch") {
            didLaunch = value as Boolean
        } else if (name == "projectPath") {
            projectPath = value as String
        } else if (name == "request") {
            request = value as NetRequest
        } else if (name == "response") {
            response = value as NetResponse
        } else if (name == "responseError") {
            responseError = value as NetResponse
        } else if (name == "splashTimeout") {
            splashTimeout = value as Int
        }
    }
}


@JsExport
data class SrvContext(
    var arguments: Array<String> = arrayOf(),
    var browserDir: String = "",
    var defaultHTTPPort: Int = 0,
    var didLaunch: Boolean = false,
    var httpPort: Int = 0,
    var inputDir: String = "",
    var inputHTTPPort: Int = 0,
    var projectAbsPath: String = "",
    var projectDir: String = "",
    var readFile: String = "",
    var readFileContents: String = "",
    var request: NetRequest = NetRequest(),
    var response: NetResponse = NetResponse(),
    var url: String = "",
    override var recentField: String = "",
): CLDContext {
    override fun <T> field(name: String): T {
        if (name == "arguments") {
            return arguments as T
        } else if (name == "browserDir") {
            return browserDir as T
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
        } else if (name == "projectAbsPath") {
            return projectAbsPath as T
        } else if (name == "projectDir") {
            return projectDir as T
        } else if (name == "readFile") {
            return readFile as T
        } else if (name == "readFileContents") {
            return readFileContents as T
        } else if (name == "request") {
            return request as T
        } else if (name == "response") {
            return response as T
        } else if (name == "url") {
            return url as T
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
        } else if (name == "browserDir") {
            browserDir = value as String
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
        } else if (name == "projectAbsPath") {
            projectAbsPath = value as String
        } else if (name == "projectDir") {
            projectDir = value as String
        } else if (name == "readFile") {
            readFile = value as String
        } else if (name == "readFileContents") {
            readFileContents = value as String
        } else if (name == "request") {
            request = value as NetRequest
        } else if (name == "response") {
            response = value as NetResponse
        } else if (name == "url") {
            url = value as String
        }
    }
}


@JsExport
data class NetRequest(
    var body: String = "",
    var method: String = "",
    var url: String = "",
) {}


@JsExport
data class NetResponse(
    var contents: String = "",
    var url: String = "",
) {}
