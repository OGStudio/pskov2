// Shortcut to get an element by id
function deId(id) {
    return document.getElementById(id);
}

// Load date over HTTP
function loadURL(p, onload, onerror) {
    console.log(`ИГР loadURL p.url: '${p.url}'`);
    let req = new XMLHttpRequest();
    req.open(p.method, p.url);

    req.onerror = function(event) {
        onerror({
            contents: "",
            orig: p,
        });
        console.log("ИГР loadURL onerror event/req:", event, req);
    };

    req.onload = function() {
        if (
            req.readyState == 4 &&
            req.status == 200
        ) {
            onload({
                response: req,
                orig: p,
            });
        } else {
            onerror({
                contents: req.responseText,
                orig: p,
            });
            console.log("ИГР loadURL onload error req:", req);
        }
    };
    req.send(p.body);
}

// Convenient function to print short debug output for aech Context change
function registerCtrlDbgOutput(ctrl, cmpName, KT) {
    ctrl.registerCallback((c) => {
        let k = c.recentField;
        var v = c.field(c.recentField);
        v = KT.debugString(v);
        v = KT.debugShort(v);
        console.log(`ИГР ${cmpName} ctrl k/v: '${k}'/'${v}'`);
    });
}

// Report success as UIkit notification
//
// A tiny delay is used to overcome the conflict of UIkit and CLDController
function reportSuccess(text, timeout = 500) {
    setTimeout(
        () => {
            UIkit.notification({
                message: text,
                status: "success",
                timeout: timeout,
            });
        },
        0
    );
}

// Toggle element class
function setUIClassActive(id, className, isActive) {
    let el = deId(id);
    if (isActive) {
        el.classList.add(className);
    }
    if (!isActive) {
        el.classList.remove(className);
    }
}

// Change element text
function setUIText(id, text) {
    let el = deId(id);
    if (el != null) {
        el.innerHTML = text;
    }
}

// Change element visibility
function setUIVisibility(id, isVisible) {
    let el = deId(id);
    // Hide
    if (!isVisible) {
        el.setAttribute("hidden", true);
    }
    // Show
    if (
        isVisible &&
        el.hasAttribute("hidden")
    ) {
        el.removeAttribute("hidden");
    }
}

module.exports = { registerCtrlDbgOutput };
