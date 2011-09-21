var swfobject = function () {
        var D = "undefined",
            r = "object",
            S = "Shockwave Flash",
            W = "ShockwaveFlash.ShockwaveFlash",
            q = "application/x-shockwave-flash",
            R = "SWFObjectExprInst",
            x = "onreadystatechange",
            O = window,
            j = document,
            t = navigator,
            T = false,
            U = [h],
            o = [],
            N = [],
            I = [],
            l, Q, E, B, J = false,
            a = false,
            n, G, m = true,
            M = function () {
                var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                    ah = t.userAgent.toLowerCase(),
                    Y = t.platform.toLowerCase(),
                    ae = Y ? /win/.test(Y) : /win/.test(ah),
                    ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                    af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    X = !+"\v1",
                    ag = [0, 0, 0],
                    ab = null;
                if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                    ab = t.plugins[S].description;
                    if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                        T = true;
                        X = false;
                        ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                        ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    }
                } else {
                    if (typeof O.ActiveXObject != D) {
                        try {
                            var ad = new ActiveXObject(W);
                            if (ad) {
                                ab = ad.GetVariable("$version");
                                if (ab) {
                                    X = true;
                                    ab = ab.split(" ")[1].split(",");
                                    ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                                }
                            }
                        } catch (Z) {}
                    }
                }
                return {
                    w3: aa,
                    pv: ag,
                    wk: af,
                    ie: X,
                    win: ae,
                    mac: ac
                }
            }(),
            k = function () {
                if (!M.w3) {
                    return
                }
                if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                    f()
                }
                if (!J) {
                    if (typeof j.addEventListener != D) {
                        j.addEventListener("DOMContentLoaded", f, false)
                    }
                    if (M.ie && M.win) {
                        j.attachEvent(x, function () {
                            if (j.readyState == "complete") {
                                j.detachEvent(x, arguments.callee);
                                f()
                            }
                        });
                        if (O == top) {
                            (function () {
                                if (J) {
                                    return
                                }
                                try {
                                    j.documentElement.doScroll("left")
                                } catch (X) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                f()
                            })()
                        }
                    }
                    if (M.wk) {
                        (function () {
                            if (J) {
                                return
                            }
                            if (!/loaded|complete/.test(j.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                    s(f)
                }
            }();

        function f() {
            if (J) {
                return
            }
            try {
                var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
                Z.parentNode.removeChild(Z)
            } catch (aa) {
                return
            }
            J = true;
            var X = U.length;
            for (var Y = 0; Y < X; Y++) {
                U[Y]()
            }
        }
        function K(X) {
            if (J) {
                X()
            } else {
                U[U.length] = X
            }
        }
        function s(Y) {
            if (typeof O.addEventListener != D) {
                O.addEventListener("load", Y, false)
            } else {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("load", Y, false)
                } else {
                    if (typeof O.attachEvent != D) {
                        i(O, "onload", Y)
                    } else {
                        if (typeof O.onload == "function") {
                            var X = O.onload;
                            O.onload = function () {
                                X();
                                Y()
                            }
                        } else {
                            O.onload = Y
                        }
                    }
                }
            }
        }
        function h() {
            if (T) {
                V()
            } else {
                H()
            }
        }
        function V() {
            var X = j.getElementsByTagName("body")[0];
            var aa = C(r);
            aa.setAttribute("type", q);
            var Z = X.appendChild(aa);
            if (Z) {
                var Y = 0;
                (function () {
                    if (typeof Z.GetVariable != D) {
                        var ab = Z.GetVariable("$version");
                        if (ab) {
                            ab = ab.split(" ")[1].split(",");
                            M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    } else {
                        if (Y < 10) {
                            Y++;
                            setTimeout(arguments.callee, 10);
                            return
                        }
                    }
                    X.removeChild(aa);
                    Z = null;
                    H()
                })()
            } else {
                H()
            }
        }
        function H() {
            var ag = o.length;
            if (ag > 0) {
                for (var af = 0; af < ag; af++) {
                    var Y = o[af].id;
                    var ab = o[af].callbackFn;
                    var aa = {
                        success: false,
                        id: Y
                    };
                    if (M.pv[0] > 0) {
                        var ae = c(Y);
                        if (ae) {
                            if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                                w(Y, true);
                                if (ab) {
                                    aa.success = true;
                                    aa.ref = z(Y);
                                    ab(aa)
                                }
                            } else {
                                if (o[af].expressInstall && A()) {
                                    var ai = {};
                                    ai.data = o[af].expressInstall;
                                    ai.width = ae.getAttribute("width") || "0";
                                    ai.height = ae.getAttribute("height") || "0";
                                    if (ae.getAttribute("class")) {
                                        ai.styleclass = ae.getAttribute("class")
                                    }
                                    if (ae.getAttribute("align")) {
                                        ai.align = ae.getAttribute("align")
                                    }
                                    var ah = {};
                                    var X = ae.getElementsByTagName("param");
                                    var ac = X.length;
                                    for (var ad = 0; ad < ac; ad++) {
                                        if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                            ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                        }
                                    }
                                    P(ai, ah, Y, ab)
                                } else {
                                    p(ae);
                                    if (ab) {
                                        ab(aa)
                                    }
                                }
                            }
                        }
                    } else {
                        w(Y, true);
                        if (ab) {
                            var Z = z(Y);
                            if (Z && typeof Z.SetVariable != D) {
                                aa.success = true;
                                aa.ref = Z
                            }
                            ab(aa)
                        }
                    }
                }
            }
        }
        function z(aa) {
            var X = null;
            var Y = c(aa);
            if (Y && Y.nodeName == "OBJECT") {
                if (typeof Y.SetVariable != D) {
                    X = Y
                } else {
                    var Z = Y.getElementsByTagName(r)[0];
                    if (Z) {
                        X = Z
                    }
                }
            }
            return X
        }
        function A() {
            return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
        }
        function P(aa, ab, X, Z) {
            a = true;
            E = Z || null;
            B = {
                success: false,
                id: X
            };
            var ae = c(X);
            if (ae) {
                if (ae.nodeName == "OBJECT") {
                    l = g(ae);
                    Q = null
                } else {
                    l = ae;
                    Q = X
                }
                aa.id = R;
                if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                    aa.width = "310"
                }
                if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                    aa.height = "137"
                }
                j.title = j.title.slice(0, 47) + " - Flash Player Installation";
                var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                    ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
                if (typeof ab.flashvars != D) {
                    ab.flashvars += "&" + ac
                } else {
                    ab.flashvars = ac
                }
                if (M.ie && M.win && ae.readyState != 4) {
                    var Y = C("div");
                    X += "SWFObjectNew";
                    Y.setAttribute("id", X);
                    ae.parentNode.insertBefore(Y, ae);
                    ae.style.display = "none";
                    (function () {
                        if (ae.readyState == 4) {
                            ae.parentNode.removeChild(ae)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                }
                u(aa, ab, X)
            }
        }
        function p(Y) {
            if (M.ie && M.win && Y.readyState != 4) {
                var X = C("div");
                Y.parentNode.insertBefore(X, Y);
                X.parentNode.replaceChild(g(Y), X);
                Y.style.display = "none";
                (function () {
                    if (Y.readyState == 4) {
                        Y.parentNode.removeChild(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                Y.parentNode.replaceChild(g(Y), Y)
            }
        }
        function g(ab) {
            var aa = C("div");
            if (M.win && M.ie) {
                aa.innerHTML = ab.innerHTML
            } else {
                var Y = ab.getElementsByTagName(r)[0];
                if (Y) {
                    var ad = Y.childNodes;
                    if (ad) {
                        var X = ad.length;
                        for (var Z = 0; Z < X; Z++) {
                            if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                                aa.appendChild(ad[Z].cloneNode(true))
                            }
                        }
                    }
                }
            }
            return aa
        }
        function u(ai, ag, Y) {
            var X, aa = c(Y);
            if (M.wk && M.wk < 312) {
                return X
            }
            if (aa) {
                if (typeof ai.id == D) {
                    ai.id = Y
                }
                if (M.ie && M.win) {
                    var ah = "";
                    for (var ae in ai) {
                        if (ai[ae] != Object.prototype[ae]) {
                            if (ae.toLowerCase() == "data") {
                                ag.movie = ai[ae]
                            } else {
                                if (ae.toLowerCase() == "styleclass") {
                                    ah += ' class="' + ai[ae] + '"'
                                } else {
                                    if (ae.toLowerCase() != "classid") {
                                        ah += " " + ae + '="' + ai[ae] + '"'
                                    }
                                }
                            }
                        }
                    }
                    var af = "";
                    for (var ad in ag) {
                        if (ag[ad] != Object.prototype[ad]) {
                            af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                        }
                    }
                    aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                    N[N.length] = ai.id;
                    X = c(ai.id)
                } else {
                    var Z = C(r);
                    Z.setAttribute("type", q);
                    for (var ac in ai) {
                        if (ai[ac] != Object.prototype[ac]) {
                            if (ac.toLowerCase() == "styleclass") {
                                Z.setAttribute("class", ai[ac])
                            } else {
                                if (ac.toLowerCase() != "classid") {
                                    Z.setAttribute(ac, ai[ac])
                                }
                            }
                        }
                    }
                    for (var ab in ag) {
                        if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                            e(Z, ab, ag[ab])
                        }
                    }
                    aa.parentNode.replaceChild(Z, aa);
                    X = Z
                }
            }
            return X
        }
        function e(Z, X, Y) {
            var aa = C("param");
            aa.setAttribute("name", X);
            aa.setAttribute("value", Y);
            Z.appendChild(aa)
        }
        function y(Y) {
            var X = c(Y);
            if (X && X.nodeName == "OBJECT") {
                if (M.ie && M.win) {
                    X.style.display = "none";
                    (function () {
                        if (X.readyState == 4) {
                            b(Y)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    X.parentNode.removeChild(X)
                }
            }
        }
        function b(Z) {
            var Y = c(Z);
            if (Y) {
                for (var X in Y) {
                    if (typeof Y[X] == "function") {
                        Y[X] = null
                    }
                }
                Y.parentNode.removeChild(Y)
            }
        }
        function c(Z) {
            var X = null;
            try {
                X = j.getElementById(Z)
            } catch (Y) {}
            return X
        }
        function C(X) {
            return j.createElement(X)
        }
        function i(Z, X, Y) {
            Z.attachEvent(X, Y);
            I[I.length] = [Z, X, Y]
        }
        function F(Z) {
            var Y = M.pv,
                X = Z.split(".");
            X[0] = parseInt(X[0], 10);
            X[1] = parseInt(X[1], 10) || 0;
            X[2] = parseInt(X[2], 10) || 0;
            return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
        }
        function v(ac, Y, ad, ab) {
            if (M.ie && M.mac) {
                return
            }
            var aa = j.getElementsByTagName("head")[0];
            if (!aa) {
                return
            }
            var X = (ad && typeof ad == "string") ? ad : "screen";
            if (ab) {
                n = null;
                G = null
            }
            if (!n || G != X) {
                var Z = C("style");
                Z.setAttribute("type", "text/css");
                Z.setAttribute("media", X);
                n = aa.appendChild(Z);
                if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                    n = j.styleSheets[j.styleSheets.length - 1]
                }
                G = X
            }
            if (M.ie && M.win) {
                if (n && typeof n.addRule == r) {
                    n.addRule(ac, Y)
                }
            } else {
                if (n && typeof j.createTextNode != D) {
                    n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
                }
            }
        }
        function w(Z, X) {
            if (!m) {
                return
            }
            var Y = X ? "visible" : "hidden";
            if (J && c(Z)) {
                c(Z).style.visibility = Y
            } else {
                v("#" + Z, "visibility:" + Y)
            }
        }
        function L(Y) {
            var Z = /[\\\"<>\.;]/;
            var X = Z.exec(Y) != null;
            return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
        }
        var d = function () {
                if (M.ie && M.win) {
                    window.attachEvent("onunload", function () {
                        var ac = I.length;
                        for (var ab = 0; ab < ac; ab++) {
                            I[ab][0].detachEvent(I[ab][1], I[ab][2])
                        }
                        var Z = N.length;
                        for (var aa = 0; aa < Z; aa++) {
                            y(N[aa])
                        }
                        for (var Y in M) {
                            M[Y] = null
                        }
                        M = null;
                        for (var X in swfobject) {
                            swfobject[X] = null
                        }
                        swfobject = null
                    })
                }
            }();
        return {
            registerObject: function (ab, X, aa, Z) {
                if (M.w3 && ab && X) {
                    var Y = {};
                    Y.id = ab;
                    Y.swfVersion = X;
                    Y.expressInstall = aa;
                    Y.callbackFn = Z;
                    o[o.length] = Y;
                    w(ab, false)
                } else {
                    if (Z) {
                        Z({
                            success: false,
                            id: ab
                        })
                    }
                }
            },
            getObjectById: function (X) {
                if (M.w3) {
                    return z(X)
                }
            },
            embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
                var X = {
                    success: false,
                    id: ah
                };
                if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                    w(ah, false);
                    K(function () {
                        ae += "";
                        ag += "";
                        var aj = {};
                        if (af && typeof af === r) {
                            for (var al in af) {
                                aj[al] = af[al]
                            }
                        }
                        aj.data = ab;
                        aj.width = ae;
                        aj.height = ag;
                        var am = {};
                        if (ad && typeof ad === r) {
                            for (var ak in ad) {
                                am[ak] = ad[ak]
                            }
                        }
                        if (Z && typeof Z === r) {
                            for (var ai in Z) {
                                if (typeof am.flashvars != D) {
                                    am.flashvars += "&" + ai + "=" + Z[ai]
                                } else {
                                    am.flashvars = ai + "=" + Z[ai]
                                }
                            }
                        }
                        if (F(Y)) {
                            var an = u(aj, am, ah);
                            if (aj.id == ah) {
                                w(ah, true)
                            }
                            X.success = true;
                            X.ref = an
                        } else {
                            if (aa && A()) {
                                aj.data = aa;
                                P(aj, am, ah, ac);
                                return
                            } else {
                                w(ah, true)
                            }
                        }
                        if (ac) {
                            ac(X)
                        }
                    })
                } else {
                    if (ac) {
                        ac(X)
                    }
                }
            },
            switchOffAutoHideShow: function () {
                m = false
            },
            ua: M,
            getFlashPlayerVersion: function () {
                return {
                    major: M.pv[0],
                    minor: M.pv[1],
                    release: M.pv[2]
                }
            },
            hasFlashPlayerVersion: F,
            createSWF: function (Z, Y, X) {
                if (M.w3) {
                    return u(Z, Y, X)
                } else {
                    return undefined
                }
            },
            showExpressInstall: function (Z, aa, X, Y) {
                if (M.w3 && A()) {
                    P(Z, aa, X, Y)
                }
            },
            removeSWF: function (X) {
                if (M.w3) {
                    y(X)
                }
            },
            createCSS: function (aa, Z, Y, X) {
                if (M.w3) {
                    v(aa, Z, Y, X)
                }
            },
            addDomLoadEvent: K,
            addLoadEvent: s,
            getQueryParamValue: function (aa) {
                var Z = j.location.search || j.location.hash;
                if (Z) {
                    if (/\?/.test(Z)) {
                        Z = Z.split("?")[1]
                    }
                    if (aa == null) {
                        return L(Z)
                    }
                    var Y = Z.split("&");
                    for (var X = 0; X < Y.length; X++) {
                        if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                            return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                        }
                    }
                }
                return ""
            },
            expressInstallCallback: function () {
                if (a) {
                    var X = c(R);
                    if (X && l) {
                        X.parentNode.replaceChild(l, X);
                        if (Q) {
                            w(Q, true);
                            if (M.ie && M.win) {
                                l.style.display = "block"
                            }
                        }
                        if (E) {
                            E(B)
                        }
                    }
                    a = false
                }
            }
        }
    }();
if (!this.JSON) {
    this.JSON = {};
}(function () {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {
                '': value
            });
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
(function (jQuery) {
    jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function (i, attr) {
        jQuery.fx.step[attr] = function (fx) {
            if (!fx.colorInit) {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
                fx.colorInit = true;
            }
            fx.elem.style[attr] = "rgb(" + [Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)].join(",") + ")";
        }
    });

    function getRGB(color) {
        var result;
        if (color && color.constructor == Array && color.length == 3) return color;
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
        if (result = /rgba\(0, 0, 0, 0\)/.exec(color)) return colors['transparent'];
        return colors[jQuery.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;
        do {
            color = jQuery.curCSS(elem, attr);
            if (color != '' && color != 'transparent' || jQuery.nodeName(elem, "body")) break;
            attr = "backgroundColor";
        } while (elem = elem.parentNode);
        return getRGB(color);
    };
    var colors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
})(jQuery);
(function (jQuery) {
    jQuery.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };

    function keyHandler(handleObj) {
        if (typeof handleObj.data !== "string") {
            return;
        }
        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");
        handleObj.handler = function (event) {
            if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || event.target.type === "text")) {
                return;
            }
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                key, modif = "",
                possible = {};
            if (event.altKey && special !== "alt") {
                modif += "alt+";
            }
            if (event.ctrlKey && special !== "ctrl") {
                modif += "ctrl+";
            }
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }
            if (event.shiftKey && special !== "shift") {
                modif += "shift+";
            }
            if (special) {
                possible[modif + special] = true;
            } else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
                if (modif === "shift+") {
                    possible[jQuery.hotkeys.shiftNums[character]] = true;
                }
            }
            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }
    jQuery.each(["keydown", "keyup", "keypress"], function () {
        jQuery.event.special[this] = {
            add: keyHandler
        };
    });
})(jQuery);
(function ($) {
    $.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ?
    function (s) {
        s = $.extend({
            top: 'auto',
            left: 'auto',
            width: 'auto',
            height: 'auto',
            opacity: true,
            src: 'javascript:false;'
        }, s);
        var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') + 'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' + 'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' + 'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' + 'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' + '"/>';
        return this.each(function () {
            if ($(this).children('iframe.bgiframe').length === 0) this.insertBefore(document.createElement(html), this.firstChild);
        });
    } : function () {
        return this;
    });
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }
})(jQuery);
(function ($) {
    function fixTitle($ele) {
        if ($ele.attr('title') || typeof ($ele.attr('original-title')) != 'string') {
            $ele.attr('original-title', $ele.attr('title') || '').removeAttr('title');
        }
    }

    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        fixTitle(this.$element);
    }
    Tipsy.prototype = {
        show: function () {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $('.tipsy').remove();
                $tip[0].className = 'tipsy';
                $tip.addClass(this.options.cls).css(this.options.css);
                $tip.remove().css({
                    top: 0,
                    left: 0,
                    visibility: 'hidden',
                    display: 'block'
                }).appendTo(document.body);
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight;
                var gravity = (typeof this.options.gravity == 'function') ? this.options.gravity.call(this.$element[0]) : this.options.gravity;
                var tp;
                switch (gravity.charAt(0)) {
                case 'n':
                    tp = {
                        top: pos.top + pos.height + this.options.offset,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    };
                    break;
                case 's':
                    tp = {
                        top: pos.top - actualHeight - this.options.offset,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    };
                    break;
                case 'e':
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth - this.options.offset
                    };
                    break;
                case 'w':
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width + this.options.offset
                    };
                    break;
                }
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else if (gravity.charAt(1) == 'q') {
                        tp.left = pos.left - 10;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                $tip.css(tp).addClass('tipsy-' + gravity);
                if (this.options.fade) {
                    $tip.stop().css({
                        opacity: 0,
                        display: 'block',
                        visibility: 'visible'
                    }).animate({
                        opacity: this.options.opacity
                    });
                } else {
                    $tip.css({
                        visibility: 'visible',
                        opacity: this.options.opacity
                    });
                }
            }
        },
        hide: function () {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function () {
                    $(this).remove();
                });
            } else {
                this.tip().remove();
            }
        },
        getTitle: function () {
            var title, $e = this.$element,
                o = this.options;
            fixTitle($e);
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        tip: function () {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },
        validate: function () {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        enable: function () {
            this.enabled = true;
        },
        disable: function () {
            this.enabled = false;
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled;
        }
    };
    $.fn.tipsy = function (options) {
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        options = $.extend({}, $.fn.tipsy.defaults, options);

        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                setTimeout(function () {
                    if (tipsy.hoverState == 'in') tipsy.show();
                }, options.delayIn);
            }
        };

        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function () {
                    if (tipsy.hoverState == 'out') tipsy.hide();
                }, options.delayOut);
            }
        };
        if (!options.live) this.each(function () {
            get(this);
        });
        if (options.trigger != 'manual') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        return this;
    };
    $.fn.tipsy.defaults = {
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 1,
        title: 'title',
        cls: '',
        css: {},
        trigger: 'hover'
    };
    $.fn.tipsy.elementOptions = function (ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    $.fn.tipsy.autoNS = function () {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    $.fn.tipsy.autoWE = function () {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
})(jQuery);
(function (c) {
    function k(a, b) {
        var d = function (e) {
                e = c[a][e] || [];
                return typeof e == "string" ? e.split(/,?\s+/) : e
            }("getter");
        return c.inArray(b, d) != -1
    }
    c.fn.jPlayer = function (a) {
        var b = typeof a == "string",
            d = Array.prototype.slice.call(arguments, 1);
        if (b && a.substring(0, 1) == "_") return this;
        if (b && k("jPlayer", a, d)) {
            var e = c.data(this[0], "jPlayer");
            return e ? e[a].apply(e, d) : undefined
        }
        return this.each(function () {
            var h = c.data(this, "jPlayer");
            !h && !b && c.data(this, "jPlayer", new c.jPlayer(this, a))._init();
            h && b && c.isFunction(h[a]) && h[a].apply(h, d)
        })
    };
    c.jPlayer = function (a, b) {
        this.options = c.extend({}, b);
        this.element = c(a)
    };
    c.jPlayer.getter = "jPlayerOnProgressChange jPlayerOnSoundComplete jPlayerVolume jPlayerReady getData jPlayerController";
    c.jPlayer.defaults = {
        cssPrefix: "jqjp",
        swfPath: "js",
        volume: 80,
        oggSupport: false,
        nativeSupport: true,
        preload: "none",
        customCssIds: false,
        graphicsFix: true,
        errorAlerts: false,
        warningAlerts: false,
        position: "absolute",
        width: "0",
        height: "0",
        top: "0",
        left: "0",
        quality: "high",
        bgcolor: "#ffffff"
    };
    c.jPlayer._config = {
        version: "1.2.0",
        swfVersionRequired: "1.2.0",
        swfVersion: "unknown",
        jPlayerControllerId: undefined,
        delayedCommandId: undefined,
        isWaitingForPlay: false,
        isFileSet: false
    };
    c.jPlayer._diag = {
        isPlaying: false,
        src: "",
        loadPercent: 0,
        playedPercentRelative: 0,
        playedPercentAbsolute: 0,
        playedTime: 0,
        totalTime: 0
    };
    c.jPlayer._cssId = {
        play: "jplayer_play",
        pause: "jplayer_pause",
        stop: "jplayer_stop",
        loadBar: "jplayer_load_bar",
        playBar: "jplayer_play_bar",
        volumeMin: "jplayer_volume_min",
        volumeMax: "jplayer_volume_max",
        volumeBar: "jplayer_volume_bar",
        volumeBarValue: "jplayer_volume_bar_value"
    };
    c.jPlayer.count = 0;
    c.jPlayer.timeFormat = {
        showHour: false,
        showMin: true,
        showSec: true,
        padHour: false,
        padMin: true,
        padSec: true,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    c.jPlayer.convertTime = function (a) {
        var b = new Date(a),
            d = b.getUTCHours();
        a = b.getUTCMinutes();
        b = b.getUTCSeconds();
        d = c.jPlayer.timeFormat.padHour && d < 10 ? "0" + d : d;
        a = c.jPlayer.timeFormat.padMin && a < 10 ? "0" + a : a;
        b = c.jPlayer.timeFormat.padSec && b < 10 ? "0" + b : b;
        return (c.jPlayer.timeFormat.showHour ? d + c.jPlayer.timeFormat.sepHour : "") + (c.jPlayer.timeFormat.showMin ? a + c.jPlayer.timeFormat.sepMin : "") + (c.jPlayer.timeFormat.showSec ? b + c.jPlayer.timeFormat.sepSec : "")
    };
    c.jPlayer.prototype = {
        _init: function () {
            var a = this,
                b = this.element;
            this.config = c.extend({}, c.jPlayer.defaults, this.options, c.jPlayer._config);
            this.config.diag = c.extend({}, c.jPlayer._diag);
            this.config.cssId = {};
            this.config.cssSelector = {};
            this.config.cssDisplay = {};
            this.config.clickHandler = {};
            this.element.data("jPlayer.config", this.config);
            c.extend(this.config, {
                id: this.element.attr("id"),
                swf: this.config.swfPath + (this.config.swfPath != "" && this.config.swfPath.slice(-1) != "/" ? "/" : "") + "Jplayer.swf",
                fid: this.config.cssPrefix + "_flash_" + c.jPlayer.count,
                aid: this.config.cssPrefix + "_audio_" + c.jPlayer.count,
                hid: this.config.cssPrefix + "_force_" + c.jPlayer.count,
                i: c.jPlayer.count,
                volume: this._limitValue(this.config.volume, 0, 100),
                autobuffer: this.config.preload != "none"
            });
            c.jPlayer.count++;
            if (this.config.ready != undefined) if (c.isFunction(this.config.ready)) this.jPlayerReadyCustom = this.config.ready;
            else this._warning("Constructor's ready option is not a function.");
            this.config.audio = document.createElement("audio");
            this.config.audio.id = this.config.aid;
            c.extend(this.config, {
                canPlayMP3: !! (this.config.audio.canPlayType ? "" != this.config.audio.canPlayType("audio/mpeg") && "no" != this.config.audio.canPlayType("audio/mpeg") : false),
                canPlayOGG: !! (this.config.audio.canPlayType ? "" != this.config.audio.canPlayType("audio/ogg") && "no" != this.config.audio.canPlayType("audio/ogg") : false),
                aSel: c("#" + this.config.aid)
            });
            c.extend(this.config, {
                html5: !! (this.config.oggSupport ? this.config.canPlayOGG ? true : this.config.canPlayMP3 : this.config.canPlayMP3)
            });
            c.extend(this.config, {
                usingFlash: !(this.config.html5 && this.config.nativeSupport),
                usingMP3: !(this.config.oggSupport && this.config.canPlayOGG && this.config.nativeSupport)
            });
            var d = {
                setButtons: function (g, f) {
                    a.config.diag.isPlaying = f;
                    if (a.config.cssId.play != undefined && a.config.cssId.pause != undefined) if (f) {
                        a.config.cssSelector.play.css("display", "none");
                        a.config.cssSelector.pause.css("display", a.config.cssDisplay.pause)
                    } else {
                        a.config.cssSelector.play.css("display", a.config.cssDisplay.play);
                        a.config.cssSelector.pause.css("display", "none")
                    }
                    if (f) a.config.isWaitingForPlay = false
                }
            },
                e = {
                    setFile: function (g, f) {
                        try {
                            a._getMovie().fl_setFile_mp3(f);
                            a.config.autobuffer && b.trigger("jPlayer.load");
                            a.config.diag.src = f;
                            a.config.isFileSet = true;
                            b.trigger("jPlayer.setButtons", false)
                        } catch (j) {
                            a._flashError(j)
                        }
                    },
                    clearFile: function () {
                        try {
                            b.trigger("jPlayer.setButtons", false);
                            a._getMovie().fl_clearFile_mp3();
                            a.config.diag.src = "";
                            a.config.isFileSet = false
                        } catch (g) {
                            a._flashError(g)
                        }
                    },
                    load: function () {
                        try {
                            a._getMovie().fl_load_mp3()
                        } catch (g) {
                            a._flashError(g)
                        }
                    },
                    play: function () {
                        try {
                            a._getMovie().fl_play_mp3() && b.trigger("jPlayer.setButtons", true)
                        } catch (g) {
                            a._flashError(g)
                        }
                    },
                    pause: function () {
                        try {
                            a._getMovie().fl_pause_mp3() && b.trigger("jPlayer.setButtons", false)
                        } catch (g) {
                            a._flashError(g)
                        }
                    },
                    stop: function () {
                        try {
                            a._getMovie().fl_stop_mp3() && b.trigger("jPlayer.setButtons", false)
                        } catch (g) {
                            a._flashError(g)
                        }
                    },
                    playHead: function (g, f) {
                        try {
                            a._getMovie().fl_play_head_mp3(f) && b.trigger("jPlayer.setButtons", true)
                        } catch (j) {
                            a._flashError(j)
                        }
                    },
                    playHeadTime: function (g, f) {
                        try {
                            a._getMovie().fl_play_head_time_mp3(f) && b.trigger("jPlayer.setButtons", true)
                        } catch (j) {
                            a._flashError(j)
                        }
                    },
                    volume: function (g, f) {
                        a.config.volume = f;
                        try {
                            a._getMovie().fl_volume_mp3(f)
                        } catch (j) {
                            a._flashError(j)
                        }
                    }
                },
                h = {
                    setFile: function (g, f, j) {
                        a.config.diag.src = a.config.usingMP3 ? f : j;
                        a.config.isFileSet && !a.config.isWaitingForPlay && b.trigger("jPlayer.pause");
                        a.config.audio.autobuffer = a.config.autobuffer;
                        a.config.audio.preload = a.config.preload;
                        if (a.config.autobuffer) {
                            a.config.audio.src = a.config.diag.src;
                            a.config.audio.load()
                        } else a.config.isWaitingForPlay = true;
                        a.config.isFileSet = true;
                        a.jPlayerOnProgressChange(0, 0, 0, 0, 0);
                        clearInterval(a.config.jPlayerControllerId);
                        if (a.config.autobuffer) a.config.jPlayerControllerId = window.setInterval(function () {
                            a.jPlayerController(false)
                        }, 100);
                        clearInterval(a.config.delayedCommandId)
                    },
                    clearFile: function () {
                        a.setFile("", "");
                        a.config.isWaitingForPlay = false;
                        a.config.isFileSet = false
                    },
                    load: function () {
                        if (a.config.isFileSet) if (a.config.isWaitingForPlay) {
                            a.config.audio.autobuffer = true;
                            a.config.audio.preload = "auto";
                            a.config.audio.src = a.config.diag.src;
                            a.config.audio.load();
                            a.config.isWaitingForPlay = false;
                            clearInterval(a.config.jPlayerControllerId);
                            a.config.jPlayerControllerId = window.setInterval(function () {
                                a.jPlayerController(false)
                            }, 100)
                        }
                    },
                    play: function () {
                        if (a.config.isFileSet) {
                            if (a.config.isWaitingForPlay) {
                                a.config.audio.src = a.config.diag.src;
                                a.config.audio.load()
                            }
                            a.config.audio.play();
                            b.trigger("jPlayer.setButtons", true);
                            clearInterval(a.config.jPlayerControllerId);
                            a.config.jPlayerControllerId = window.setInterval(function () {
                                a.jPlayerController(false)
                            }, 100);
                            clearInterval(a.config.delayedCommandId)
                        }
                    },
                    pause: function () {
                        if (a.config.isFileSet) {
                            a.config.audio.pause();
                            b.trigger("jPlayer.setButtons", false);
                            clearInterval(a.config.delayedCommandId)
                        }
                    },
                    stop: function () {
                        if (a.config.isFileSet) try {
                            b.trigger("jPlayer.pause");
                            a.config.audio.currentTime = 0;
                            clearInterval(a.config.jPlayerControllerId);
                            a.config.jPlayerControllerId = window.setInterval(function () {
                                a.jPlayerController(true)
                            }, 100)
                        } catch (g) {
                            clearInterval(a.config.delayedCommandId);
                            a.config.delayedCommandId = window.setTimeout(function () {
                                a.stop()
                            }, 100)
                        }
                    },
                    playHead: function (g, f) {
                        if (a.config.isFileSet) try {
                            b.trigger("jPlayer.load");
                            if (typeof a.config.audio.buffered == "object" && a.config.audio.buffered.length > 0) a.config.audio.currentTime = f * a.config.audio.buffered.end(a.config.audio.buffered.length - 1) / 100;
                            else if (a.config.audio.duration > 0 && !isNaN(a.config.audio.duration)) a.config.audio.currentTime = f * a.config.audio.duration / 100;
                            else throw "e";
                            b.trigger("jPlayer.play")
                        } catch (j) {
                            b.trigger("jPlayer.play");
                            b.trigger("jPlayer.pause");
                            a.config.delayedCommandId = window.setTimeout(function () {
                                a.playHead(f)
                            }, 100)
                        }
                    },
                    playHeadTime: function (g, f) {
                        if (a.config.isFileSet) try {
                            b.trigger("jPlayer.load");
                            a.config.audio.currentTime = f / 1E3;
                            b.trigger("jPlayer.play")
                        } catch (j) {
                            b.trigger("jPlayer.play");
                            b.trigger("jPlayer.pause");
                            a.config.delayedCommandId = window.setTimeout(function () {
                                a.playHeadTime(f)
                            }, 100)
                        }
                    },
                    volume: function (g, f) {
                        a.config.volume = f;
                        a.config.audio.volume = f / 100;
                        a.jPlayerVolume(f)
                    }
                };
            this.config.usingFlash ? c.extend(d, e) : c.extend(d, h);
            for (var i in d) {
                e = "jPlayer." + i;
                this.element.unbind(e);
                this.element.bind(e, d[i])
            }
            if (this.config.usingFlash) if (this._checkForFlash(8)) if (c.browser.msie) {
                i = '<object id="' + this.config.fid + '"';
                i += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
                i += ' codebase="' + document.URL.substring(0, document.URL.indexOf(":")) + '://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"';
                i += ' type="application/x-shockwave-flash"';
                i += ' width="' + this.config.width + '" height="' + this.config.height + '">';
                i += "</object>";
                d = [];
                d[0] = '<param name="movie" value="' + this.config.swf + '" />';
                d[1] = '<param name="quality" value="high" />';
                d[2] = '<param name="FlashVars" value="id=' + escape(this.config.id) + "&fid=" + escape(this.config.fid) + "&vol=" + this.config.volume + '" />';
                d[3] = '<param name="allowScriptAccess" value="always" />';
                d[4] = '<param name="bgcolor" value="' + this.config.bgcolor + '" />';
                i = document.createElement(i);
                for (e = 0; e < d.length; e++) i.appendChild(document.createElement(d[e]));
                this.element.html(i)
            } else {
                d = '<embed name="' + this.config.fid + '" id="' + this.config.fid + '" src="' + this.config.swf + '"';
                d += ' width="' + this.config.width + '" height="' + this.config.height + '" bgcolor="' + this.config.bgcolor + '"';
                d += ' quality="high" FlashVars="id=' + escape(this.config.id) + "&fid=" + escape(this.config.fid) + "&vol=" + this.config.volume + '"';
                d += ' allowScriptAccess="always"';
                d += ' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
                this.element.html(d)
            } else this.element.html("<p>Flash 8 or above is not installed. <a href='http://get.adobe.com/flashplayer'>Get Flash!</a></p>");
            else {
                this.config.audio.autobuffer = this.config.autobuffer;
                this.config.audio.preload = this.config.preload;
                this.config.audio.addEventListener("canplay", function () {
                    var g = 0.1 * Math.random();
                    a.config.audio.volume = (a.config.volume + (a.config.volume < 50 ? g : -g)) / 100
                }, false);
                this.config.audio.addEventListener("ended", function () {
                    clearInterval(a.config.jPlayerControllerId);
                    a.jPlayerOnSoundComplete()
                }, false);
                this.element.append(this.config.audio)
            }
            this.element.css({
                position: this.config.position,
                top: this.config.top,
                left: this.config.left
            });
            if (this.config.graphicsFix) {
                this.element.append('<div id="' + this.config.hid + '"></div>');
                c.extend(this.config, {
                    hSel: c("#" + this.config.hid)
                });
                this.config.hSel.css({
                    "text-indent": "-9999px"
                })
            }
            this.config.customCssIds || c.each(c.jPlayer._cssId, function (g, f) {
                a.cssId(g, f)
            });
            if (!this.config.usingFlash) {
                this.element.css({
                    left: "-9999px"
                });
                window.setTimeout(function () {
                    a.volume(a.config.volume);
                    a.jPlayerReady()
                }, 100)
            }
        },
        jPlayerReady: function (a) {
            if (this.config.usingFlash) {
                this.config.swfVersion = a;
                this.config.swfVersionRequired != this.config.swfVersion && this._error("jPlayer's JavaScript / SWF version mismatch!\n\nJavaScript requires SWF : " + this.config.swfVersionRequired + "\nThe Jplayer.swf used is : " + this.config.swfVersion)
            } else this.config.swfVersion = "n/a";
            this.jPlayerReadyCustom()
        },
        jPlayerReadyCustom: function () {},
        setFile: function (a, b) {
            this.element.trigger("jPlayer.setFile", [a, b])
        },
        clearFile: function () {
            this.element.trigger("jPlayer.clearFile")
        },
        load: function () {
            this.element.trigger("jPlayer.load")
        },
        play: function () {
            this.element.trigger("jPlayer.play")
        },
        pause: function () {
            this.element.trigger("jPlayer.pause")
        },
        stop: function () {
            this.element.trigger("jPlayer.stop")
        },
        playHead: function (a) {
            this.element.trigger("jPlayer.playHead", [a])
        },
        playHeadTime: function (a) {
            this.element.trigger("jPlayer.playHeadTime", [a])
        },
        volume: function (a) {
            a = this._limitValue(a, 0, 100);
            this.element.trigger("jPlayer.volume", [a])
        },
        cssId: function (a, b) {
            var d = this;
            if (typeof b == "string") if (c.jPlayer._cssId[a]) {
                this.config.cssId[a] != undefined && this.config.cssSelector[a].unbind("click", this.config.clickHandler[a]);
                this.config.cssId[a] = b;
                this.config.cssSelector[a] = c("#" + b);
                this.config.clickHandler[a] = function (h) {
                    d[a](h);
                    c(this).blur();
                    return false
                };
                this.config.cssSelector[a].click(this.config.clickHandler[a]);
                var e = this.config.cssSelector[a].css("display");
                if (a == "play") this.config.cssDisplay.pause = e;
                if (!(a == "pause" && e == "none")) {
                    this.config.cssDisplay[a] = e;
                    a == "pause" && this.config.cssSelector[a].css("display", "none")
                }
            } else this._warning("Unknown/Illegal function in cssId\n\njPlayer('cssId', '" + a + "', '" + b + "')");
            else this._warning("cssId CSS Id must be a string\n\njPlayer('cssId', '" + a + "', " + b + ")")
        },
        loadBar: function (a) {
            if (this.config.cssId.loadBar != undefined) {
                var b = this.config.cssSelector.loadBar.offset();
                a = a.pageX - b.left;
                b = this.config.cssSelector.loadBar.width();
                this.playHead(100 * a / b)
            }
        },
        playBar: function (a) {
            this.loadBar(a)
        },
        onProgressChange: function (a) {
            if (c.isFunction(a)) this.onProgressChangeCustom = a;
            else this._warning("onProgressChange parameter is not a function.")
        },
        onProgressChangeCustom: function () {},
        jPlayerOnProgressChange: function (a, b, d, e, h) {
            this.config.diag.loadPercent = a;
            this.config.diag.playedPercentRelative = b;
            this.config.diag.playedPercentAbsolute = d;
            this.config.diag.playedTime = e;
            this.config.diag.totalTime = h;
            this.config.cssId.loadBar != undefined && this.config.cssSelector.loadBar.width(a + "%");
            this.config.cssId.playBar != undefined && this.config.cssSelector.playBar.width(b + "%");
            this.onProgressChangeCustom(a, b, d, e, h);
            this._forceUpdate()
        },
        jPlayerController: function (a) {
            var b = 0,
                d = 0,
                e = 0,
                h = 0,
                i = 0;
            if (this.config.audio.readyState >= 1) {
                b = this.config.audio.currentTime * 1E3;
                d = this.config.audio.duration * 1E3;
                d = isNaN(d) ? 0 : d;
                e = d > 0 ? 100 * b / d : 0;
                if (typeof this.config.audio.buffered == "object" && this.config.audio.buffered.length > 0) {
                    h = 100 * this.config.audio.buffered.end(this.config.audio.buffered.length - 1) / this.config.audio.duration;
                    i = 100 * this.config.audio.currentTime / this.config.audio.buffered.end(this.config.audio.buffered.length - 1)
                } else {
                    h = 100;
                    i = e
                }
            }!this.config.diag.isPlaying && h >= 100 && clearInterval(this.config.jPlayerControllerId);
            a ? this.jPlayerOnProgressChange(h, 0, 0, 0, d) : this.jPlayerOnProgressChange(h, i, e, b, d)
        },
        volumeMin: function () {
            this.volume(0)
        },
        volumeMax: function () {
            this.volume(100)
        },
        volumeBar: function (a) {
            if (this.config.cssId.volumeBar != undefined) {
                var b = this.config.cssSelector.volumeBar.offset();
                a = a.pageX - b.left;
                b = this.config.cssSelector.volumeBar.width();
                this.volume(100 * a / b)
            }
        },
        volumeBarValue: function (a) {
            this.volumeBar(a)
        },
        jPlayerVolume: function (a) {
            if (this.config.cssId.volumeBarValue != null) {
                this.config.cssSelector.volumeBarValue.width(a + "%");
                this._forceUpdate()
            }
        },
        onSoundComplete: function (a) {
            if (c.isFunction(a)) this.onSoundCompleteCustom = a;
            else this._warning("onSoundComplete parameter is not a function.")
        },
        onSoundCompleteCustom: function () {},
        jPlayerOnSoundComplete: function () {
            this.element.trigger("jPlayer.setButtons", false);
            this.onSoundCompleteCustom()
        },
        getData: function (a) {
            for (var b = a.split("."), d = this.config, e = 0; e < b.length; e++) if (d[b[e]] != undefined) d = d[b[e]];
            else {
                this._warning("Undefined data requested.\n\njPlayer('getData', '" + a + "')");
                return
            }
            return d
        },
        _getMovie: function () {
            return document[this.config.fid]
        },
        _checkForFlash: function (a) {
            var b = false,
                d;
            if (window.ActiveXObject) try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + a);
                b = true
            } catch (e) {} else if (navigator.plugins && navigator.mimeTypes.length > 0) if (d = navigator.plugins["Shockwave Flash"]) if (navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1") >= a) b = true;
            return b
        },
        _forceUpdate: function () {
            this.config.graphicsFix && this.config.hSel.text("" + Math.random())
        },
        _limitValue: function (a, b, d) {
            return a < b ? b : a > d ? d : a
        },
        _flashError: function (a) {
            this._error("Problem with Flash component.\n\nCheck the swfPath points at the Jplayer.swf path.\n\nswfPath = " + this.config.swfPath + "\nurl: " + this.config.swf + "\n\nError: " + a.message)
        },
        _error: function (a) {
            this.config.errorAlerts && this._alert("Error!\n\n" + a)
        },
        _warning: function (a) {
            this.config.warningAlerts && this._alert("Warning!\n\n" + a)
        },
        _alert: function (a) {
            alert("jPlayer " + this.config.version + " : id='" + this.config.id + "' : " + a)
        }
    }
})(jQuery);