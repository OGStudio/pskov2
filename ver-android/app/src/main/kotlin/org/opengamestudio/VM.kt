package org.opengamestudio
import android.content.Context
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import android.webkit.*

object VM {
    var androidContext: Context? = null
    val playgroundIsVisible = mutableStateOf(false)
    val playgroundTitle = mutableStateOf("TODO-Title")
    var webView: WebView? = null

    init {
        playCtrl().set("didLaunch", true)
        // Launch main component differently since it has no ctrl.
        MainComponent.setupEffects()
    }

    fun reportFailure(
        title: String,
        message: String
    ) {
        reportFailure(androidContext!!, title, message)
    }

    fun setupWebView() {
        println("ИГР VM.setupWV-1")
        if (webView != null) {
            return
        }

        println("ИГР VM.setupWV-2")
        webView = WebView(androidContext!!)
        webView?.webViewClient = WebViewClient()
        webView?.settings?.javaScriptEnabled = true
    }
}
