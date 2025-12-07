package org.opengamestudio

//import kotlinx.coroutines.*

//<!-- API -->

fun playCtrl(): CLDController {
    return PlayComponent.ctrl
}

//<!-- Constants -->

//<!-- Component -->

private typealias PC = PlayContext

object PlayComponent {
    val ctrl: CLDController

    init {
        ctrl = CLDController(PlayContext())
        // Debug
        ctrl.registerCallback { c ->
            val value = debugString(c.field(c.recentField))
            println("ИГР PlayC.init ctrl key/value: '${c.recentField}'/'$value'")
        }

        // Default values
        //ctrl.set("busId", uuidString())

        setupEffects()
        setupShoulds()
    }

    fun setupEffects() {
        val vm = VM
        val oneliners = arrayOf(
            "isPlaygroundVisible", { c: AC -> vm.playgroundIsVisible.value = c.isPlaygroundVisible },
        )
        registerOneliners(ctrl, oneliners)
    }

    fun setupShoulds() {
        arrayOf(
          ::authShouldResetPlaygroundVisibility,
        ).forEach { f ->
          ctrl.registerFunction { c -> f(c as PlayContext) }
        }
    }
}

//<!-- Effects -->
 
