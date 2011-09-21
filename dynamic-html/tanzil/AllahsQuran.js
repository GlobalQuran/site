/* Learn Quran */
var REVISION = 62;
var LANGUAGE_NON = 0;
var LANGUAGE_ENGLISH = 1;
var LANGUAGE_PERSIAN = 2;
var LANGUAGE_FRENCH = 3;
var LANGUAGE_CHINESE = 4;
var LANGUAGE_URDU = 5;
var languages = [];
languages[LANGUAGE_ENGLISH] = {
    name: 'English',
    short: 'en',
    arabic_numbers: false,
    audio: 'http://audio.allahsquran.com/vbv/english/walk/'
};
languages[LANGUAGE_PERSIAN] = {
    name: 'Persian',
    short: 'fa',
    arabic_numbers: true,
    audio: 'http://audio.allahsquran.com/vbv/persian/hidayatfar/'
};
languages[LANGUAGE_FRENCH] = {
    name: 'French',
    short: 'fr',
    arabic_numbers: false,
    audio: 'http://audio.allahsquran.com/vbv/french/leclerc/'
};
languages[LANGUAGE_CHINESE] = {
    name: 'Chinese',
    short: 'cz',
    arabic_numbers: false,
    audio: 'http://audio.allahsquran.com/vbv/chinese/'
};
languages[LANGUAGE_URDU] = {
    name: 'Urdu',
    short: 'ur',
    arabic_numbers: true,
    audio: 'http://audio.allahsquran.com/vbv/urdu/khan/'
};
(function (a, b) {
    function b$(a) {
        return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    function bX(a) {
        if (!bR[a]) {
            var b = d("<" + a + ">").appendTo("body"),
                c = b.css("display");
            b.remove();
            if (c === "none" || c === "") c = "block";
            bR[a] = c
        }
        return bR[a]
    }
    function bW(a, b) {
        var c = {};
        d.each(bV.concat.apply([], bV.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }
    function bJ(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var e = a.dataTypes,
            f = a.converters,
            g, h = e.length,
            i, j = e[0],
            k, l, m, n, o;
        for (g = 1; g < h; g++) {
            k = j, j = e[g];
            if (j === "*") j = k;
            else if (k !== "*" && k !== j) {
                l = k + " " + j, m = f[l] || f["* " + j];
                if (!m) {
                    o = b;
                    for (n in f) {
                        i = n.split(" ");
                        if (i[0] === k || i[0] === "*") {
                            o = f[i[1] + " " + j];
                            if (o) {
                                n = f[n], n === !0 ? m = o : o === !0 && (m = n);
                                break
                            }
                        }
                    }
                }!m && !o && d.error("No conversion from " + l.replace(" ", " to ")), m !== !0 && (c = m ? m(c) : o(n(c)))
            }
        }
        return c
    }
    function bI(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }
    function bH(a, b, c, e) {
        d.isArray(b) && b.length ? d.each(b, function (b, f) {
            c || bp.test(a) ? e(a, f) : bH(a + "[" + (typeof f === "object" || d.isArray(f) ? b : "") + "]", f, c, e)
        }) : c || b == null || typeof b !== "object" ? e(a, b) : d.isArray(b) || d.isEmptyObject(b) ? e(a, "") : d.each(b, function (b, d) {
            bH(a + "[" + b + "]", d, c, e)
        })
    }
    function bG(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bD,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l === "string" && (g[l] ? l = b : (c.dataTypes.unshift(l), l = bG(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bG(a, c, d, e, "*", g));
        return l
    }
    function bF(a) {
        return function (b, c) {
            typeof b !== "string" && (c = b, b = "*");
            if (d.isFunction(c)) {
                var e = b.toLowerCase().split(bz),
                    f = 0,
                    g = e.length,
                    h, i, j;
                for (; f < g; f++) h = e[f], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }
    function bn(a, b, c) {
        var e = b === "width" ? bh : bi,
            f = b === "width" ? a.offsetWidth : a.offsetHeight;
        if (c === "border") return f;
        d.each(e, function () {
            c || (f -= parseFloat(d.css(a, "padding" + this)) || 0), c === "margin" ? f += parseFloat(d.css(a, "margin" + this)) || 0 : f -= parseFloat(d.css(a, "border" + this + "Width")) || 0
        });
        return f
    }
    function _(a, b) {
        b.src ? d.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : d.globalEval(b.text || b.textContent || b.innerHTML || ""), b.parentNode && b.parentNode.removeChild(b)
    }
    function $(a, b) {
        if (b.nodeType === 1) {
            var c = b.nodeName.toLowerCase();
            b.clearAttributes(), b.mergeAttributes(a);
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(d.expando)
        }
    }
    function Z(a, b) {
        if (b.nodeType === 1 && d.hasData(a)) {
            var c = d.expando,
                e = d.data(a),
                f = d.data(b, e);
            if (e = e[c]) {
                var g = e.events;
                f = f[c] = d.extend({}, e);
                if (g) {
                    delete f.handle, f.events = {};
                    for (var h in g) for (var i = 0, j = g[h].length; i < j; i++) d.event.add(b, h, g[h][i], g[h][i].data)
                }
            }
        }
    }
    function Y(a, b) {
        return d.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function O(a, b, c) {
        if (d.isFunction(b)) return d.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return d.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b === "string") {
            var e = d.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (J.test(b)) return d.filter(b, e, !c);
            b = d.filter(b, e)
        }
        return d.grep(a, function (a, e) {
            return d.inArray(a, b) >= 0 === c
        })
    }
    function N(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function F(a, b) {
        return (a && a !== "*" ? a + "." : "") + b.replace(q, "`").replace(r, "&")
    }
    function E(a) {
        var b, c, e, f, g, h, i, j, k, l, m, n, p, q = [],
            r = [],
            s = d._data(this, u);
        typeof s === "function" && (s = s.events);
        if (a.liveFired !== this && s && s.live && !a.target.disabled && (!a.button || a.type !== "click")) {
            a.namespace && (n = new RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired = this;
            var t = s.live.slice(0);
            for (i = 0; i < t.length; i++) g = t[i], g.origType.replace(o, "") === a.type ? r.push(g.selector) : t.splice(i--, 1);
            f = d(a.target).closest(r, a.currentTarget);
            for (j = 0, k = f.length; j < k; j++) {
                m = f[j];
                for (i = 0; i < t.length; i++) {
                    g = t[i];
                    if (m.selector === g.selector && (!n || n.test(g.namespace))) {
                        h = m.elem, e = null;
                        if (g.preType === "mouseenter" || g.preType === "mouseleave") a.type = g.preType, e = d(a.relatedTarget).closest(g.selector)[0];
                        (!e || e !== h) && q.push({
                            elem: h,
                            handleObj: g,
                            level: m.level
                        })
                    }
                }
            }
            for (j = 0, k = q.length; j < k; j++) {
                f = q[j];
                if (c && f.level > c) break;
                a.currentTarget = f.elem, a.data = f.handleObj.data, a.handleObj = f.handleObj, p = f.handleObj.origHandler.apply(f.elem, arguments);
                if (p === !1 || a.isPropagationStopped()) {
                    c = f.level, p === !1 && (b = !1);
                    if (a.isImmediatePropagationStopped()) break
                }
            }
            return b
        }
    }
    function C(a, b, c) {
        c[0].type = a;
        return d.event.handle.apply(b, c)
    }
    function w() {
        return !0
    }
    function v() {
        return !1
    }
    function f(a, c, f) {
        if (f === b && a.nodeType === 1) {
            f = a.getAttribute("data-" + c);
            if (typeof f === "string") {
                try {
                    f = f === "true" ? !0 : f === "false" ? !1 : f === "null" ? null : d.isNaN(f) ? e.test(f) ? d.parseJSON(f) : f : parseFloat(f)
                } catch (g) {}
                d.data(a, c, f)
            } else f = b
        }
        return f
    }
    var c = a.document,
        d = function () {
            function I() {
                if (!d.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(I, 1);
                        return
                    }
                    d.ready()
                }
            }
            var d = function (a, b) {
                    return new d.fn.init(a, b, g)
                },
                e = a.jQuery,
                f = a.$,
                g, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
                i = /\S/,
                j = /^\s+/,
                k = /\s+$/,
                l = /\d/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = navigator.userAgent,
                w, x = !1,
                y, z = "then done fail isResolved isRejected promise".split(" "),
                A, B = Object.prototype.toString,
                C = Object.prototype.hasOwnProperty,
                D = Array.prototype.push,
                E = Array.prototype.slice,
                F = String.prototype.trim,
                G = Array.prototype.indexOf,
                H = {};
            d.fn = d.prototype = {
                constructor: d,
                init: function (a, e, f) {
                    var g, i, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !e && c.body) {
                        this.context = c, this[0] = c.body, this.selector = "body", this.length = 1;
                        return this
                    }
                    if (typeof a === "string") {
                        g = h.exec(a);
                        if (!g || !g[1] && e) return !e || e.jquery ? (e || f).find(a) : this.constructor(e).find(a);
                        if (g[1]) {
                            e = e instanceof d ? e[0] : e, k = e ? e.ownerDocument || e : c, j = m.exec(a), j ? d.isPlainObject(e) ? (a = [c.createElement(j[1])], d.fn.attr.call(a, e, !0)) : a = [k.createElement(j[1])] : (j = d.buildFragment([g[1]], [k]), a = (j.cacheable ? d.clone(j.fragment) : j.fragment).childNodes);
                            return d.merge(this, a)
                        }
                        i = c.getElementById(g[2]);
                        if (i && i.parentNode) {
                            if (i.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = i
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    if (d.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return d.makeArray(a, this)
                },
                selector: "",
                jquery: "1.5",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return E.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var e = this.constructor();
                    d.isArray(a) ? D.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")");
                    return e
                },
                each: function (a, b) {
                    return d.each(this, a, b)
                },
                ready: function (a) {
                    d.bindReady(), y.done(a);
                    return this
                },
                eq: function (a) {
                    return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(d.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: D,
                sort: [].sort,
                splice: [].splice
            }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () {
                var a, c, e, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i === "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i !== "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                    e = i[c], f = a[c];
                    if (i === f) continue;
                    l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f)
                }
                return i
            }, d.extend({
                noConflict: function (b) {
                    a.$ = f, b && (a.jQuery = e);
                    return d
                },
                isReady: !1,
                readyWait: 1,
                ready: function (a) {
                    a === !0 && d.readyWait--;
                    if (!d.readyWait || a !== !0 && !d.isReady) {
                        if (!c.body) return setTimeout(d.ready, 1);
                        d.isReady = !0;
                        if (a !== !0 && --d.readyWait > 0) return;
                        y.resolveWith(c, [d]), d.fn.trigger && d(c).trigger("ready").unbind("ready")
                    }
                },
                bindReady: function () {
                    if (!x) {
                        x = !0;
                        if (c.readyState === "complete") return setTimeout(d.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", A, !1), a.addEventListener("load", d.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", A), a.attachEvent("onload", d.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (e) {}
                            c.documentElement.doScroll && b && I()
                        }
                    }
                },
                isFunction: function (a) {
                    return d.type(a) === "function"
                },
                isArray: Array.isArray ||
                function (a) {
                    return d.type(a) === "array"
                },
                isWindow: function (a) {
                    return a && typeof a === "object" && "setInterval" in a
                },
                isNaN: function (a) {
                    return a == null || !l.test(a) || isNaN(a)
                },
                type: function (a) {
                    return a == null ? String(a) : H[B.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1;
                    if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                    var c;
                    for (c in a) {}
                    return c === b || C.call(a, c)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw a
                },
                parseJSON: function (b) {
                    if (typeof b !== "string" || !b) return null;
                    b = d.trim(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return a.JSON && a.JSON.parse ? a.JSON.parse(b) : (new Function("return " + b))();
                    d.error("Invalid JSON: " + b)
                },
                parseXML: function (b, c, e) {
                    a.DOMParser ? (e = new DOMParser, c = e.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b)), e = c.documentElement, (!e || !e.nodeName || e.nodeName === "parsererror") && d.error("Invalid XML: " + b);
                    return c
                },
                noop: function () {},
                globalEval: function (a) {
                    if (a && i.test(a)) {
                        var b = c.getElementsByTagName("head")[0] || c.documentElement,
                            e = c.createElement("script");
                        e.type = "text/javascript", d.support.scriptEval() ? e.appendChild(c.createTextNode(a)) : e.text = a, b.insertBefore(e, b.firstChild), b.removeChild(e)
                    }
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, e) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || d.isFunction(a);
                    if (e) {
                        if (i) {
                            for (f in a) if (c.apply(a[f], e) === !1) break
                        } else for (; g < h;) if (c.apply(a[g++], e) === !1) break
                    } else if (i) {
                        for (f in a) if (c.call(a[f], f, a[f]) === !1) break
                    } else for (var j = a[0]; g < h && c.call(j, g, j) !== !1; j = a[++g]) {}
                    return a
                },
                trim: F ?
                function (a) {
                    return a == null ? "" : F.call(a)
                } : function (a) {
                    return a == null ? "" : (a + "").replace(j, "").replace(k, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var e = d.type(a);
                        a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? D.call(c, a) : d.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b) {
                    if (b.indexOf) return b.indexOf(a);
                    for (var c = 0, d = b.length; c < d; c++) if (b[c] === a) return c;
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length === "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, b, c) {
                    var d = [],
                        e;
                    for (var f = 0, g = a.length; f < g; f++) e = b(a[f], f, c), e != null && (d[d.length] = e);
                    return d.concat.apply([], d)
                },
                guid: 1,
                proxy: function (a, c, e) {
                    arguments.length === 2 && (typeof c === "string" ? (e = a, a = e[c], c = b) : c && !d.isFunction(c) && (e = c, c = b)), !c && a && (c = function () {
                        return a.apply(e || this, arguments)
                    }), a && (c.guid = a.guid = a.guid || c.guid || d.guid++);
                    return c
                },
                access: function (a, c, e, f, g, h) {
                    var i = a.length;
                    if (typeof c === "object") {
                        for (var j in c) d.access(a, j, c[j], f, g, e);
                        return a
                    }
                    if (e !== b) {
                        f = !h && f && d.isFunction(e);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function () {
                    return (new Date).getTime()
                },
                _Deferred: function () {
                    var a = [],
                        b, c, e, f = {
                            done: function () {
                                if (!e) {
                                    var c = arguments,
                                        g, h, i, j, k;
                                    b && (k = b, b = 0);
                                    for (g = 0, h = c.length; g < h; g++) i = c[g], j = d.type(i), j === "array" ? f.done.apply(f, i) : j === "function" && a.push(i);
                                    k && f.resolveWith(k[0], k[1])
                                }
                                return this
                            },
                            resolveWith: function (d, f) {
                                if (!e && !b && !c) {
                                    c = 1;
                                    try {
                                        while (a[0]) a.shift().apply(d, f)
                                    } finally {
                                        b = [d, f], c = 0
                                    }
                                }
                                return this
                            },
                            resolve: function () {
                                f.resolveWith(d.isFunction(this.promise) ? this.promise() : this, arguments);
                                return this
                            },
                            isResolved: function () {
                                return c || b
                            },
                            cancel: function () {
                                e = 1, a = [];
                                return this
                            }
                        };
                    return f
                },
                Deferred: function (a) {
                    var b = d._Deferred(),
                        c = d._Deferred(),
                        e;
                    d.extend(b, {
                        then: function (a, c) {
                            b.done(a).fail(c);
                            return this
                        },
                        fail: c.done,
                        rejectWith: c.resolveWith,
                        reject: c.resolve,
                        isRejected: c.isResolved,
                        promise: function (a, c) {
                            if (a == null) {
                                if (e) return e;
                                e = a = {}
                            }
                            c = z.length;
                            while (c--) a[z[c]] = b[z[c]];
                            return a
                        }
                    }), b.then(c.cancel, b.cancel), delete b.cancel, a && a.call(b, b);
                    return b
                },
                when: function (a) {
                    var b = arguments,
                        c = b.length,
                        e = c <= 1 && a && d.isFunction(a.promise) ? a : d.Deferred(),
                        f = e.promise(),
                        g;
                    c > 1 ? (g = Array(c), d.each(b, function (a, b) {
                        d.when(b).then(function (b) {
                            g[a] = arguments.length > 1 ? E.call(arguments, 0) : b, --c || e.resolveWith(f, g)
                        }, e.reject)
                    })) : e !== a && e.resolve(a);
                    return f
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.subclass = this.subclass, a.fn.init = function b(b, c) {
                        c && c instanceof d && !(c instanceof a) && (c = a(c));
                        return d.fn.init.call(this, b, c, e)
                    }, a.fn.init.prototype = a.fn;
                    var e = a(c);
                    return a
                },
                browser: {}
            }), y = d._Deferred(), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                H["[object " + b + "]"] = b.toLowerCase()
            }), w = d.uaMatch(v), w.browser && (d.browser[w.browser] = !0, d.browser.version = w.version), d.browser.webkit && (d.browser.safari = !0), G && (d.inArray = function (a, b) {
                return G.call(b, a)
            }), i.test("Â ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(c), c.addEventListener ? A = function () {
                c.removeEventListener("DOMContentLoaded", A, !1), d.ready()
            } : c.attachEvent && (A = function () {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", A), d.ready())
            });
            return a.jQuery = a.$ = d
        }();
    (function () {
        d.support = {};
        var b = c.createElement("div");
        b.style.display = "none", b.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var e = b.getElementsByTagName("*"),
            f = b.getElementsByTagName("a")[0],
            g = c.createElement("select"),
            h = g.appendChild(c.createElement("option"));
        if (e && e.length && f) {
            d.support = {
                leadingWhitespace: b.firstChild.nodeType === 3,
                tbody: !b.getElementsByTagName("tbody").length,
                htmlSerialize: !! b.getElementsByTagName("link").length,
                style: /red/.test(f.getAttribute("style")),
                hrefNormalized: f.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(f.style.opacity),
                cssFloat: !! f.style.cssFloat,
                checkOn: b.getElementsByTagName("input")[0].value === "on",
                optSelected: h.selected,
                deleteExpando: !0,
                optDisabled: !1,
                checkClone: !1,
                _scriptEval: null,
                noCloneEvent: !0,
                boxModel: null,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableHiddenOffsets: !0
            }, g.disabled = !0, d.support.optDisabled = !h.disabled, d.support.scriptEval = function () {
                if (d.support._scriptEval === null) {
                    var b = c.documentElement,
                        e = c.createElement("script"),
                        f = "script" + d.now();
                    e.type = "text/javascript";
                    try {
                        e.appendChild(c.createTextNode("window." + f + "=1;"))
                    } catch (g) {}
                    b.insertBefore(e, b.firstChild), a[f] ? (d.support._scriptEval = !0, delete a[f]) : d.support._scriptEval = !1, b.removeChild(e), b = e = f = null
                }
                return d.support._scriptEval
            };
            try {
                delete b.test
            } catch (i) {
                d.support.deleteExpando = !1
            }
            b.attachEvent && b.fireEvent && (b.attachEvent("onclick", function j() {
                d.support.noCloneEvent = !1, b.detachEvent("onclick", j)
            }), b.cloneNode(!0).fireEvent("onclick")), b = c.createElement("div"), b.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            var k = c.createDocumentFragment();
            k.appendChild(b.firstChild), d.support.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, d(function () {
                var a = c.createElement("div"),
                    b = c.getElementsByTagName("body")[0];
                if (b) {
                    a.style.width = a.style.paddingLeft = "1px", b.appendChild(a), d.boxModel = d.support.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, d.support.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", d.support.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                    var e = a.getElementsByTagName("td");
                    d.support.reliableHiddenOffsets = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", d.support.reliableHiddenOffsets = d.support.reliableHiddenOffsets && e[0].offsetHeight === 0, a.innerHTML = "", b.removeChild(a).style.display = "none", a = e = null
                }
            });
            var l = function (a) {
                    var b = c.createElement("div");
                    a = "on" + a;
                    if (!b.attachEvent) return !0;
                    var d = a in b;
                    d || (b.setAttribute(a, "return;"), d = typeof b[a] === "function"), b = null;
                    return d
                };
            d.support.submitBubbles = l("submit"), d.support.changeBubbles = l("change"), b = e = f = null
        }
    })();
    var e = /^(?:\{.*\}|\[.*\])$/;
    d.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
            return !!a && !d.isEmptyObject(a)
        },
        data: function (a, c, e, f) {
            if (d.acceptData(a)) {
                var g = d.expando,
                    h = typeof c === "string",
                    i, j = a.nodeType,
                    k = j ? d.cache : a,
                    l = j ? a[d.expando] : a[d.expando] && d.expando;
                if ((!l || f && l && !k[l][g]) && h && e === b) return;
                l || (j ? a[d.expando] = l = ++d.uuid : l = d.expando), k[l] || (k[l] = {}), typeof c === "object" && (f ? k[l][g] = d.extend(k[l][g], c) : k[l] = d.extend(k[l], c)), i = k[l], f && (i[g] || (i[g] = {}), i = i[g]), e !== b && (i[c] = e);
                if (c === "events" && !i[c]) return i[g] && i[g].events;
                return h ? i[c] : i
            }
        },
        removeData: function (b, c, e) {
            if (d.acceptData(b)) {
                var f = d.expando,
                    g = b.nodeType,
                    h = g ? d.cache : b,
                    i = g ? b[d.expando] : d.expando;
                if (!h[i]) return;
                if (c) {
                    var j = e ? h[i][f] : h[i];
                    if (j) {
                        delete j[c];
                        if (!d.isEmptyObject(j)) return
                    }
                }
                if (e) {
                    delete h[i][f];
                    if (!d.isEmptyObject(h[i])) return
                }
                var k = h[i][f];
                d.support.deleteExpando || h != a ? delete h[i] : h[i] = null, k ? (h[i] = {}, h[i][f] = k) : g && (d.support.deleteExpando ? delete b[d.expando] : b.removeAttribute ? b.removeAttribute(d.expando) : b[d.expando] = null)
            }
        },
        _data: function (a, b, c) {
            return d.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = d.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), d.fn.extend({
        data: function (a, c) {
            var e = null;
            if (typeof a === "undefined") {
                if (this.length) {
                    e = d.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var g = this[0].attributes,
                            h;
                        for (var i = 0, j = g.length; i < j; i++) h = g[i].name, h.indexOf("data-") === 0 && (h = h.substr(5), f(this[0], h, e[h]))
                    }
                }
                return e
            }
            if (typeof a === "object") return this.each(function () {
                d.data(this, a)
            });
            var k = a.split(".");
            k[1] = k[1] ? "." + k[1] : "";
            if (c === b) {
                e = this.triggerHandler("getData" + k[1] + "!", [k[0]]), e === b && this.length && (e = d.data(this[0], a), e = f(this[0], a, e));
                return e === b && k[1] ? this.data(k[0]) : e
            }
            return this.each(function () {
                var b = d(this),
                    e = [k[0], c];
                b.triggerHandler("setData" + k[1] + "!", e), d.data(this, a, c), b.triggerHandler("changeData" + k[1] + "!", e)
            })
        },
        removeData: function (a) {
            return this.each(function () {
                d.removeData(this, a)
            })
        }
    }), d.extend({
        queue: function (a, b, c) {
            if (a) {
                b = (b || "fx") + "queue";
                var e = d._data(a, b);
                if (!c) return e || [];
                !e || d.isArray(c) ? e = d._data(a, b, d.makeArray(c)) : e.push(c);
                return e
            }
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = d.queue(a, b),
                e = c.shift();
            e === "inprogress" && (e = c.shift()), e && (b === "fx" && c.unshift("inprogress"), e.call(a, function () {
                d.dequeue(a, b)
            })), c.length || d.removeData(a, b + "queue", !0)
        }
    }), d.fn.extend({
        queue: function (a, c) {
            typeof a !== "string" && (c = a, a = "fx");
            if (c === b) return d.queue(this[0], a);
            return this.each(function (b) {
                var e = d.queue(this, a, c);
                a === "fx" && e[0] !== "inprogress" && d.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                d.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function () {
                var c = this;
                setTimeout(function () {
                    d.dequeue(c, b)
                }, a)
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }
    });
    var g = /[\n\t\r]/g,
        h = /\s+/,
        i = /\r/g,
        j = /^(?:href|src|style)$/,
        k = /^(?:button|input)$/i,
        l = /^(?:button|input|object|select|textarea)$/i,
        m = /^a(?:rea)?$/i,
        n = /^(?:radio|checkbox)$/i;
    d.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    }, d.fn.extend({
        attr: function (a, b) {
            return d.access(this, a, b, !0, d.attr)
        },
        removeAttr: function (a, b) {
            return this.each(function () {
                d.attr(this, a, ""), this.nodeType === 1 && this.removeAttribute(a)
            })
        },
        addClass: function (a) {
            if (d.isFunction(a)) return this.each(function (b) {
                var c = d(this);
                c.addClass(a.call(this, b, c.attr("class")))
            });
            if (a && typeof a === "string") {
                var b = (a || "").split(h);
                for (var c = 0, e = this.length; c < e; c++) {
                    var f = this[c];
                    if (f.nodeType === 1) if (f.className) {
                        var g = " " + f.className + " ",
                            i = f.className;
                        for (var j = 0, k = b.length; j < k; j++) g.indexOf(" " + b[j] + " ") < 0 && (i += " " + b[j]);
                        f.className = d.trim(i)
                    } else f.className = a
                }
            }
            return this
        },
        removeClass: function (a) {
            if (d.isFunction(a)) return this.each(function (b) {
                var c = d(this);
                c.removeClass(a.call(this, b, c.attr("class")))
            });
            if (a && typeof a === "string" || a === b) {
                var c = (a || "").split(h);
                for (var e = 0, f = this.length; e < f; e++) {
                    var i = this[e];
                    if (i.nodeType === 1 && i.className) if (a) {
                        var j = (" " + i.className + " ").replace(g, " ");
                        for (var k = 0, l = c.length; k < l; k++) j = j.replace(" " + c[k] + " ", " ");
                        i.className = d.trim(j)
                    } else i.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                e = typeof b === "boolean";
            if (d.isFunction(a)) return this.each(function (c) {
                var e = d(this);
                e.toggleClass(a.call(this, c, e.attr("class"), b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var f, g = 0,
                        i = d(this),
                        j = b,
                        k = a.split(h);
                    while (f = k[g++]) j = e ? j : !i.hasClass(f), i[j ? "addClass" : "removeClass"](f)
                } else if (c === "undefined" || c === "boolean") this.className && d._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : d._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ";
            for (var c = 0, d = this.length; c < d; c++) if ((" " + this[c].className + " ").replace(g, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            if (!arguments.length) {
                var c = this[0];
                if (c) {
                    if (d.nodeName(c, "option")) {
                        var e = c.attributes.value;
                        return !e || e.specified ? c.value : c.text
                    }
                    if (d.nodeName(c, "select")) {
                        var f = c.selectedIndex,
                            g = [],
                            h = c.options,
                            j = c.type === "select-one";
                        if (f < 0) return null;
                        for (var k = j ? f : 0, l = j ? f + 1 : h.length; k < l; k++) {
                            var m = h[k];
                            if (m.selected && (d.support.optDisabled ? !m.disabled : m.getAttribute("disabled") === null) && (!m.parentNode.disabled || !d.nodeName(m.parentNode, "optgroup"))) {
                                a = d(m).val();
                                if (j) return a;
                                g.push(a)
                            }
                        }
                        return g
                    }
                    if (n.test(c.type) && !d.support.checkOn) return c.getAttribute("value") === null ? "on" : c.value;
                    return (c.value || "").replace(i, "")
                }
                return b
            }
            var o = d.isFunction(a);
            return this.each(function (b) {
                var c = d(this),
                    e = a;
                if (this.nodeType === 1) {
                    o && (e = a.call(this, b, c.val())), e == null ? e = "" : typeof e === "number" ? e += "" : d.isArray(e) && (e = d.map(e, function (a) {
                        return a == null ? "" : a + ""
                    }));
                    if (d.isArray(e) && n.test(this.type)) this.checked = d.inArray(c.val(), e) >= 0;
                    else if (d.nodeName(this, "select")) {
                        var f = d.makeArray(e);
                        d("option", this).each(function () {
                            this.selected = d.inArray(d(this).val(), f) >= 0
                        }), f.length || (this.selectedIndex = -1)
                    } else this.value = e
                }
            })
        }
    }), d.extend({
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, e, f) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || a.nodeType === 2) return b;
            if (f && c in d.attrFn) return d(a)[c](e);
            var g = a.nodeType !== 1 || !d.isXMLDoc(a),
                h = e !== b;
            c = g && d.props[c] || c;
            if (a.nodeType === 1) {
                var i = j.test(c);
                if (c === "selected" && !d.support.optSelected) {
                    var n = a.parentNode;
                    n && (n.selectedIndex, n.parentNode && n.parentNode.selectedIndex)
                }
                if ((c in a || a[c] !== b) && g && !i) {
                    h && (c === "type" && k.test(a.nodeName) && a.parentNode && d.error("type property can't be changed"), e === null ? a.nodeType === 1 && a.removeAttribute(c) : a[c] = e);
                    if (d.nodeName(a, "form") && a.getAttributeNode(c)) return a.getAttributeNode(c).nodeValue;
                    if (c === "tabIndex") {
                        var o = a.getAttributeNode("tabIndex");
                        return o && o.specified ? o.value : l.test(a.nodeName) || m.test(a.nodeName) && a.href ? 0 : b
                    }
                    return a[c]
                }
                if (!d.support.style && g && c === "style") {
                    h && (a.style.cssText = "" + e);
                    return a.style.cssText
                }
                h && a.setAttribute(c, "" + e);
                if (!a.attributes[c] && (a.hasAttribute && !a.hasAttribute(c))) return b;
                var p = !d.support.hrefNormalized && g && i ? a.getAttribute(c, 2) : a.getAttribute(c);
                return p === null ? b : p
            }
            h && (a[c] = e);
            return a[c]
        }
    });
    var o = /\.(.*)$/,
        p = /^(?:textarea|input|select)$/i,
        q = /\./g,
        r = / /g,
        s = /[^\w\s.|`]/g,
        t = function (a) {
            return a.replace(s, "\\$&")
        },
        u = "events";
    d.event = {
        add: function (c, e, f, g) {
            if (c.nodeType !== 3 && c.nodeType !== 8) {
                d.isWindow(c) && (c !== a && !c.frameElement) && (c = a);
                if (f === !1) f = v;
                else if (!f) return;
                var h, i;
                f.handler && (h = f, f = h.handler), f.guid || (f.guid = d.guid++);
                var j = d._data(c);
                if (!j) return;
                var k = j[u],
                    l = j.handle;
                typeof k === "function" ? (l = k.handle, k = k.events) : k || (c.nodeType || (j[u] = j = function () {}), j.events = k = {}), l || (j.handle = l = function () {
                    return typeof d !== "undefined" && !d.event.triggered ? d.event.handle.apply(l.elem, arguments) : b
                }), l.elem = c, e = e.split(" ");
                var m, n = 0,
                    o;
                while (m = e[n++]) {
                    i = h ? d.extend({}, h) : {
                        handler: f,
                        data: g
                    }, m.indexOf(".") > -1 ? (o = m.split("."), m = o.shift(), i.namespace = o.slice(0).sort().join(".")) : (o = [], i.namespace = ""), i.type = m, i.guid || (i.guid = f.guid);
                    var p = k[m],
                        q = d.event.special[m] || {};
                    if (!p) {
                        p = k[m] = [];
                        if (!q.setup || q.setup.call(c, g, o, l) === !1) c.addEventListener ? c.addEventListener(m, l, !1) : c.attachEvent && c.attachEvent("on" + m, l)
                    }
                    q.add && (q.add.call(c, i), i.handler.guid || (i.handler.guid = f.guid)), p.push(i), d.event.global[m] = !0
                }
                c = null
            }
        },
        global: {},
        remove: function (a, c, e, f) {
            if (a.nodeType !== 3 && a.nodeType !== 8) {
                e === !1 && (e = v);
                var g, h, i, j, k = 0,
                    l, m, n, o, p, q, r, s = d.hasData(a) && d._data(a),
                    w = s && s[u];
                if (!s || !w) return;
                typeof w === "function" && (s = w, w = w.events), c && c.type && (e = c.handler, c = c.type);
                if (!c || typeof c === "string" && c.charAt(0) === ".") {
                    c = c || "";
                    for (h in w) d.event.remove(a, h + c);
                    return
                }
                c = c.split(" ");
                while (h = c[k++]) {
                    r = h, q = null, l = h.indexOf(".") < 0, m = [], l || (m = h.split("."), h = m.shift(), n = new RegExp("(^|\\.)" + d.map(m.slice(0).sort(), t).join("\\.(?:.*\\.)?") + "(\\.|$)")), p = w[h];
                    if (!p) continue;
                    if (!e) {
                        for (j = 0; j < p.length; j++) {
                            q = p[j];
                            if (l || n.test(q.namespace)) d.event.remove(a, r, q.handler, j), p.splice(j--, 1)
                        }
                        continue
                    }
                    o = d.event.special[h] || {};
                    for (j = f || 0; j < p.length; j++) {
                        q = p[j];
                        if (e.guid === q.guid) {
                            if (l || n.test(q.namespace)) f == null && p.splice(j--, 1), o.remove && o.remove.call(a, q);
                            if (f != null) break
                        }
                    }
                    if (p.length === 0 || f != null && p.length === 1)(!o.teardown || o.teardown.call(a, m) === !1) && d.removeEvent(a, h, s.handle), g = null, delete w[h]
                }
                if (d.isEmptyObject(w)) {
                    var x = s.handle;
                    x && (x.elem = null), delete s.events, delete s.handle, typeof s === "function" ? d.removeData(a, u, !0) : d.isEmptyObject(s) && d.removeData(a, b, !0)
                }
            }
        },
        trigger: function (a, c, e) {
            var f = a.type || a,
                g = arguments[3];
            if (!g) {
                a = typeof a === "object" ? a[d.expando] ? a : d.extend(d.Event(f), a) : d.Event(f), f.indexOf("!") >= 0 && (a.type = f = f.slice(0, -1), a.exclusive = !0), e || (a.stopPropagation(), d.event.global[f] && d.each(d.cache, function () {
                    var b = d.expando,
                        e = this[b];
                    e && e.events && e.events[f] && d.event.trigger(a, c, e.handle.elem)
                }));
                if (!e || e.nodeType === 3 || e.nodeType === 8) return b;
                a.result = b, a.target = e, c = d.makeArray(c), c.unshift(a)
            }
            a.currentTarget = e;
            var h = e.nodeType ? d._data(e, "handle") : (d._data(e, u) || {}).handle;
            h && h.apply(e, c);
            var i = e.parentNode || e.ownerDocument;
            try {
                e && e.nodeName && d.noData[e.nodeName.toLowerCase()] || e["on" + f] && e["on" + f].apply(e, c) === !1 && (a.result = !1, a.preventDefault())
            } catch (j) {}
            if (!a.isPropagationStopped() && i) d.event.trigger(a, c, i, !0);
            else if (!a.isDefaultPrevented()) {
                var k, l = a.target,
                    m = f.replace(o, ""),
                    n = d.nodeName(l, "a") && m === "click",
                    p = d.event.special[m] || {};
                if ((!p._default || p._default.call(e, a) === !1) && !n && !(l && l.nodeName && d.noData[l.nodeName.toLowerCase()])) {
                    try {
                        l[m] && (k = l["on" + m], k && (l["on" + m] = null), d.event.triggered = !0, l[m]())
                    } catch (q) {}
                    k && (l["on" + m] = k), d.event.triggered = !1
                }
            }
        },
        handle: function (c) {
            var e, f, g, h, i, j = [],
                k = d.makeArray(arguments);
            c = k[0] = d.event.fix(c || a.event), c.currentTarget = this, e = c.type.indexOf(".") < 0 && !c.exclusive, e || (g = c.type.split("."), c.type = g.shift(), j = g.slice(0).sort(), h = new RegExp("(^|\\.)" + j.join("\\.(?:.*\\.)?") + "(\\.|$)")), c.namespace = c.namespace || j.join("."), i = d._data(this, u), typeof i === "function" && (i = i.events), f = (i || {})[c.type];
            if (i && f) {
                f = f.slice(0);
                for (var l = 0, m = f.length; l < m; l++) {
                    var n = f[l];
                    if (e || h.test(n.namespace)) {
                        c.handler = n.handler, c.data = n.data, c.handleObj = n;
                        var o = n.handler.apply(this, k);
                        o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()));
                        if (c.isImmediatePropagationStopped()) break
                    }
                }
            }
            return c.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (a) {
            if (a[d.expando]) return a;
            var e = a;
            a = d.Event(e);
            for (var f = this.props.length, g; f;) g = this.props[--f], a[g] = e[g];
            a.target || (a.target = a.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
            if (a.pageX == null && a.clientX != null) {
                var h = c.documentElement,
                    i = c.body;
                a.pageX = a.clientX + (h && h.scrollLeft || i && i.scrollLeft || 0) - (h && h.clientLeft || i && i.clientLeft || 0), a.pageY = a.clientY + (h && h.scrollTop || i && i.scrollTop || 0) - (h && h.clientTop || i && i.clientTop || 0)
            }
            a.which == null && (a.charCode != null || a.keyCode != null) && (a.which = a.charCode != null ? a.charCode : a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey), !a.which && a.button !== b && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
            return a
        },
        guid: 1e8,
        proxy: d.proxy,
        special: {
            ready: {
                setup: d.bindReady,
                teardown: d.noop
            },
            live: {
                add: function (a) {
                    d.event.add(this, F(a.origType, a.selector), d.extend({}, a, {
                        handler: E,
                        guid: a.handler.guid
                    }))
                },
                remove: function (a) {
                    d.event.remove(this, F(a.origType, a.selector), a)
                }
            },
            beforeunload: {
                setup: function (a, b, c) {
                    d.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        }
    }, d.removeEvent = c.removeEventListener ?
    function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, d.Event = function (a) {
        if (!this.preventDefault) return new d.Event(a);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? w : v) : this.type = a, this.timeStamp = d.now(), this[d.expando] = !0
    }, d.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = w;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = w;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = w, this.stopPropagation()
        },
        isDefaultPrevented: v,
        isPropagationStopped: v,
        isImmediatePropagationStopped: v
    };
    var x = function (a) {
            var b = a.relatedTarget;
            try {
                while (b && b !== this) b = b.parentNode;
                b !== this && (a.type = a.data, d.event.handle.apply(this, arguments))
            } catch (c) {}
        },
        y = function (a) {
            a.type = a.data, d.event.handle.apply(this, arguments)
        };
    d.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        d.event.special[a] = {
            setup: function (c) {
                d.event.add(this, b, c && c.selector ? y : x, a)
            },
            teardown: function (a) {
                d.event.remove(this, b, a && a.selector ? y : x)
            }
        }
    }), d.support.submitBubbles || (d.event.special.submit = {
        setup: function (a, c) {
            if (this.nodeName && this.nodeName.toLowerCase() !== "form") d.event.add(this, "click.specialSubmit", function (a) {
                var c = a.target,
                    e = c.type;
                if ((e === "submit" || e === "image") && d(c).closest("form").length) {
                    a.liveFired = b;
                    return C("submit", this, arguments)
                }
            }), d.event.add(this, "keypress.specialSubmit", function (a) {
                var c = a.target,
                    e = c.type;
                if ((e === "text" || e === "password") && d(c).closest("form").length && a.keyCode === 13) {
                    a.liveFired = b;
                    return C("submit", this, arguments)
                }
            });
            else return !1
        },
        teardown: function (a) {
            d.event.remove(this, ".specialSubmit")
        }
    });
    if (!d.support.changeBubbles) {
        var z, A = function (a) {
                var b = a.type,
                    c = a.value;
                b === "radio" || b === "checkbox" ? c = a.checked : b === "select-multiple" ? c = a.selectedIndex > -1 ? d.map(a.options, function (a) {
                    return a.selected
                }).join("-") : "" : a.nodeName.toLowerCase() === "select" && (c = a.selectedIndex);
                return c
            },
            B = function B(a) {
                var c = a.target,
                    e, f;
                if (p.test(c.nodeName) && !c.readOnly) {
                    e = d._data(c, "_change_data"), f = A(c), (a.type !== "focusout" || c.type !== "radio") && d._data(c, "_change_data", f);
                    if (e === b || f === e) return;
                    if (e != null || f) {
                        a.type = "change", a.liveFired = b;
                        return d.event.trigger(a, arguments[1], c)
                    }
                }
            };
        d.event.special.change = {
            filters: {
                focusout: B,
                beforedeactivate: B,
                click: function (a) {
                    var b = a.target,
                        c = b.type;
                    if (c === "radio" || c === "checkbox" || b.nodeName.toLowerCase() === "select") return B.call(this, a)
                },
                keydown: function (a) {
                    var b = a.target,
                        c = b.type;
                    if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") return B.call(this, a)
                },
                beforeactivate: function (a) {
                    var b = a.target;
                    d._data(b, "_change_data", A(b))
                }
            },
            setup: function (a, b) {
                if (this.type === "file") return !1;
                for (var c in z) d.event.add(this, c + ".specialChange", z[c]);
                return p.test(this.nodeName)
            },
            teardown: function (a) {
                d.event.remove(this, ".specialChange");
                return p.test(this.nodeName)
            }
        }, z = d.event.special.change.filters, z.focus = z.beforeactivate
    }
    c.addEventListener && d.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        function c(a) {
            a = d.event.fix(a), a.type = b;
            return d.event.handle.call(this, a)
        }
        d.event.special[b] = {
            setup: function () {
                this.addEventListener(a, c, !0)
            },
            teardown: function () {
                this.removeEventListener(a, c, !0)
            }
        }
    }), d.each(["bind", "one"], function (a, c) {
        d.fn[c] = function (a, e, f) {
            if (typeof a === "object") {
                for (var g in a) this[c](g, e, a[g], f);
                return this
            }
            if (d.isFunction(e) || e === !1) f = e, e = b;
            var h = c === "one" ? d.proxy(f, function (a) {
                d(this).unbind(a, h);
                return f.apply(this, arguments)
            }) : f;
            if (a === "unload" && c !== "one") this.one(a, e, f);
            else for (var i = 0, j = this.length; i < j; i++) d.event.add(this[i], a, h, e);
            return this
        }
    }), d.fn.extend({
        unbind: function (a, b) {
            if (typeof a !== "object" || a.preventDefault) for (var e = 0, f = this.length; e < f; e++) d.event.remove(this[e], a, b);
            else for (var c in a) this.unbind(c, a[c]);
            return this
        },
        delegate: function (a, b, c, d) {
            return this.live(b, c, d, a)
        },
        undelegate: function (a, b, c) {
            return arguments.length === 0 ? this.unbind("live") : this.die(b, null, c, a)
        },
        trigger: function (a, b) {
            return this.each(function () {
                d.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) {
                var c = d.Event(a);
                c.preventDefault(), c.stopPropagation(), d.event.trigger(c, b, this[0]);
                return c.result
            }
        },
        toggle: function (a) {
            var b = arguments,
                c = 1;
            while (c < b.length) d.proxy(a, b[c++]);
            return this.click(d.proxy(a, function (e) {
                var f = (d._data(this, "lastToggle" + a.guid) || 0) % c;
                d._data(this, "lastToggle" + a.guid, f + 1), e.preventDefault();
                return b[f].apply(this, arguments) || !1
            }))
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var D = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    d.each(["live", "die"], function (a, c) {
        d.fn[c] = function (a, e, f, g) {
            var h, i = 0,
                j, k, l, m = g || this.selector,
                n = g ? this : d(this.context);
            if (typeof a === "object" && !a.preventDefault) {
                for (var p in a) n[c](p, e, a[p], m);
                return this
            }
            d.isFunction(e) && (f = e, e = b), a = (a || "").split(" ");
            while ((h = a[i++]) != null) {
                j = o.exec(h), k = "", j && (k = j[0], h = h.replace(o, ""));
                if (h === "hover") {
                    a.push("mouseenter" + k, "mouseleave" + k);
                    continue
                }
                l = h, h === "focus" || h === "blur" ? (a.push(D[h] + k), h = h + k) : h = (D[h] || h) + k;
                if (c === "live") for (var q = 0, r = n.length; q < r; q++) d.event.add(n[q], "live." + F(h, m), {
                    data: e,
                    selector: m,
                    handler: f,
                    origType: h,
                    origHandler: f,
                    preType: l
                });
                else n.unbind("live." + F(h, m), f)
            }
            return this
        }
    }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) {
        d.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
        }, d.attrFn && (d.attrFn[b] = !0)
    }), function () {
        function s(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; g < h; g++) {
                var j = d[g];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j.sizcache === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            f || (j.sizcache = c, j.sizset = g);
                            if (typeof b !== "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (i.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    d[g] = k
                }
            }
        }
        function r(a, b, c, d, e, f) {
            for (var g = 0, h = d.length; g < h; g++) {
                var i = d[g];
                if (i) {
                    var j = !1;
                    i = i[a];
                    while (i) {
                        if (i.sizcache === c) {
                            j = d[i.sizset];
                            break
                        }
                        i.nodeType === 1 && !f && (i.sizcache = c, i.sizset = g);
                        if (i.nodeName.toLowerCase() === b) {
                            j = i;
                            break
                        }
                        i = i[a]
                    }
                    d[g] = j
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = 0,
            f = Object.prototype.toString,
            g = !1,
            h = !0;
        [0, 0].sort(function () {
            h = !1;
            return 0
        });
        var i = function (b, d, e, g) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b !== "string") return e;
                var l, m, o, p, q, r, s, u, v = !0,
                    w = i.isXML(d),
                    x = [],
                    y = b;
                do {
                    a.exec(""), l = a.exec(y);
                    if (l) {
                        y = l[3], x.push(l[1]);
                        if (l[2]) {
                            p = l[3];
                            break
                        }
                    }
                } while (l);
                if (x.length > 1 && k.exec(b)) if (x.length === 2 && j.relative[x[0]]) m = t(x[0] + x[1], d);
                else {
                    m = j.relative[x[0]] ? [d] : i(x.shift(), d);
                    while (x.length) b = x.shift(), j.relative[b] && (b += x.shift()), m = t(b, m)
                } else {
                    !g && x.length > 1 && d.nodeType === 9 && !w && j.match.ID.test(x[0]) && !j.match.ID.test(x[x.length - 1]) && (q = i.find(x.shift(), d, w), d = q.expr ? i.filter(q.expr, q.set)[0] : q.set[0]);
                    if (d) {
                        q = g ? {
                            expr: x.pop(),
                            set: n(g)
                        } : i.find(x.pop(), x.length === 1 && (x[0] === "~" || x[0] === "+") && d.parentNode ? d.parentNode : d, w), m = q.expr ? i.filter(q.expr, q.set) : q.set, x.length > 0 ? o = n(m) : v = !1;
                        while (x.length) r = x.pop(), s = r, j.relative[r] ? s = x.pop() : r = "", s == null && (s = d), j.relative[r](o, s, w)
                    } else o = x = []
                }
                o || (o = m), o || i.error(r || b);
                if (f.call(o) === "[object Array]") if (v) if (d && d.nodeType === 1) for (u = 0; o[u] != null; u++) o[u] && (o[u] === !0 || o[u].nodeType === 1 && i.contains(d, o[u])) && e.push(m[u]);
                else for (u = 0; o[u] != null; u++) o[u] && o[u].nodeType === 1 && e.push(m[u]);
                else e.push.apply(e, o);
                else n(o, e);
                p && (i(p, h, e, g), i.uniqueSort(e));
                return e
            };
        i.uniqueSort = function (a) {
            if (p) {
                g = h, a.sort(p);
                if (g) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, i.matches = function (a, b) {
            return i(a, null, null, b)
        }, i.matchesSelector = function (a, b) {
            return i(b, null, null, [a]).length > 0
        }, i.find = function (a, b, c) {
            var d;
            if (!a) return [];
            for (var e = 0, f = j.order.length; e < f; e++) {
                var g, h = j.order[e];
                if (g = j.leftMatch[h].exec(a)) {
                    var i = g[1];
                    g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(/\\/g, ""), d = j.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(j.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName !== "undefined" ? b.getElementsByTagName("*") : []);
            return {
                set: d,
                expr: a
            }
        }, i.filter = function (a, c, d, e) {
            var f, g, h = a,
                k = [],
                l = c,
                m = c && c[0] && i.isXML(c[0]);
            while (a && c.length) {
                for (var n in j.filter) if ((f = j.leftMatch[n].exec(a)) != null && f[2]) {
                    var o, p, q = j.filter[n],
                        r = f[1];
                    g = !1, f.splice(1, 1);
                    if (r.substr(r.length - 1) === "\\") continue;
                    l === k && (k = []);
                    if (j.preFilter[n]) {
                        f = j.preFilter[n](f, l, d, k, e, m);
                        if (f) {
                            if (f === !0) continue
                        } else g = o = !0
                    }
                    if (f) for (var s = 0;
                    (p = l[s]) != null; s++) if (p) {
                        o = q(p, f, s, l);
                        var t = e ^ !! o;
                        d && o != null ? t ? g = !0 : l[s] = !1 : t && (k.push(p), g = !0)
                    }
                    if (o !== b) {
                        d || (l = k), a = a.replace(j.match[n], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === h) if (g == null) i.error(a);
                else break;
                h = a
            }
            return l
        }, i.error = function (a) {
            throw "Syntax error, unrecognized expression: " + a
        };
        var j = i.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b === "string",
                        d = c && !/\W/.test(b),
                        e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) {}
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                    }
                    e && i.filter(b, a, !0)
                },
                ">": function (a, b) {
                    var c, d = typeof b === "string",
                        e = 0,
                        f = a.length;
                    if (d && !/\W/.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && i.filter(b, a, !0)
                    }
                },
                "": function (a, b, c) {
                    var d, f = e++,
                        g = s;
                    typeof b === "string" && !/\W/.test(b) && (b = b.toLowerCase(), d = b, g = r), g("parentNode", b, f, a, d, c)
                },
                "~": function (a, b, c) {
                    var d, f = e++,
                        g = s;
                    typeof b === "string" && !/\W/.test(b) && (b = b.toLowerCase(), d = b, g = r), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById !== "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                },
                NAME: function (a, b) {
                    if (typeof b.getElementsByName !== "undefined") {
                        var c = [],
                            d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                },
                TAG: function (a, b) {
                    if (typeof b.getElementsByTagName !== "undefined") return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(/\\/g, "") + " ";
                    if (f) return a;
                    for (var g = 0, h;
                    (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                },
                ID: function (a) {
                    return a[1].replace(/\\/g, "")
                },
                TAG: function (a, b) {
                    return a[1].toLowerCase()
                },
                CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || i.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else a[2] && i.error(a[0]);
                    a[0] = e++;
                    return a
                },
                ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(/\\/g, "");
                    !f && j.attrMap[g] && (a[1] = j.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(/\\/g, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                },
                PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = i(b[3], null, null, c);
                    else {
                        var g = i.filter(b[3], c, d, !0 ^ f);
                        d || e.push.apply(e, g);
                        return !1
                    } else if (j.match.POS.test(b[0]) || j.match.CHILD.test(b[0])) return !0;
                    return b
                },
                POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                },
                disabled: function (a) {
                    return a.disabled === !0
                },
                checked: function (a) {
                    return a.checked === !0
                },
                selected: function (a) {
                    a.parentNode.selectedIndex;
                    return a.selected === !0
                },
                parent: function (a) {
                    return !!a.firstChild
                },
                empty: function (a) {
                    return !a.firstChild
                },
                has: function (a, b, c) {
                    return !!i(c[3], a).length
                },
                header: function (a) {
                    return /h\d/i.test(a.nodeName)
                },
                text: function (a) {
                    return "text" === a.type
                },
                radio: function (a) {
                    return "radio" === a.type
                },
                checkbox: function (a) {
                    return "checkbox" === a.type
                },
                file: function (a) {
                    return "file" === a.type
                },
                password: function (a) {
                    return "password" === a.type
                },
                submit: function (a) {
                    return "submit" === a.type
                },
                image: function (a) {
                    return "image" === a.type
                },
                reset: function (a) {
                    return "reset" === a.type
                },
                button: function (a) {
                    return "button" === a.type || a.nodeName.toLowerCase() === "button"
                },
                input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                },
                last: function (a, b, c, d) {
                    return b === d.length - 1
                },
                even: function (a, b) {
                    return b % 2 === 0
                },
                odd: function (a, b) {
                    return b % 2 === 1
                },
                lt: function (a, b, c) {
                    return b < c[3] - 0
                },
                gt: function (a, b, c) {
                    return b > c[3] - 0
                },
                nth: function (a, b, c) {
                    return c[3] - 0 === b
                },
                eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1],
                        f = j.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || i.getText([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, k = g.length; h < k; h++) if (g[h] === a) return !1;
                        return !0
                    }
                    i.error(e)
                },
                CHILD: function (a, b) {
                    var c = b[1],
                        d = a;
                    switch (c) {
                    case "only":
                    case "first":
                        while (d = d.previousSibling) if (d.nodeType === 1) return !1;
                        if (c === "first") return !0;
                        d = a;
                    case "last":
                        while (d = d.nextSibling) if (d.nodeType === 1) return !1;
                        return !0;
                    case "nth":
                        var e = b[2],
                            f = b[3];
                        if (e === 1 && f === 0) return !0;
                        var g = b[0],
                            h = a.parentNode;
                        if (h && (h.sizcache !== g || !a.nodeIndex)) {
                            var i = 0;
                            for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d.nodeIndex = ++i);
                            h.sizcache = g
                        }
                        var j = a.nodeIndex - f;
                        return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                    }
                },
                ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                },
                TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
                },
                CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                },
                ATTR: function (a, b) {
                    var c = b[1],
                        d = j.attrHandle[c] ? j.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                        e = d + "",
                        f = b[2],
                        g = b[4];
                    return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                },
                POS: function (a, b, c, d) {
                    var e = b[2],
                        f = j.setFilters[e];
                    if (f) return f(a, c, b, d)
                }
            }
        },
            k = j.match.POS,
            l = function (a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var m in j.match) j.match[m] = new RegExp(j.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source), j.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + j.match[m].source.replace(/\\(\d+)/g, l));
        var n = function (a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (o) {
            n = function (a, b) {
                var c = 0,
                    d = b || [];
                if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                else if (typeof a.length === "number") for (var e = a.length; c < e; c++) d.push(a[c]);
                else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var p, q;
        c.documentElement.compareDocumentPosition ? p = function (a, b) {
            if (a === b) {
                g = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (p = function (a, b) {
            var c, d, e = [],
                f = [],
                h = a.parentNode,
                i = b.parentNode,
                j = h;
            if (a === b) {
                g = !0;
                return 0
            }
            if (h === i) return q(a, b);
            if (!h) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return q(e[k], f[k]);
            return k === c ? q(a, f[k], -1) : q(e[k], b, 1)
        }, q = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), i.getText = function (a) {
            var b = "",
                c;
            for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += i.getText(c.childNodes));
            return b
        }, function () {
            var a = c.createElement("div"),
                d = "script" + (new Date).getTime(),
                e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (j.find.ID = function (a, c, d) {
                if (typeof c.getElementById !== "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode !== "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, j.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode !== "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (j.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== "undefined" && a.firstChild.getAttribute("href") !== "#" && (j.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll &&
        function () {
            var a = i,
                b = c.createElement("div"),
                d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                i = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !i.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return n(e.getElementsByTagName(b), f);
                            if (h[2] && j.find.CLASS && e.getElementsByClassName) return n(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return n([e.body], f);
                            if (h && h[3]) {
                                var k = e.getElementById(h[3]);
                                if (!k || !k.parentNode) return n([], f);
                                if (k.id === h[3]) return n([k], f)
                            }
                            try {
                                return n(e.querySelectorAll(b), f)
                            } catch (l) {}
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var m = e.getAttribute("id"),
                                o = m || d,
                                p = e.parentNode,
                                q = /^\s*[+~]/.test(b);
                            m ? o = o.replace(/'/g, "\\$&") : e.setAttribute("id", o), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return n(e.querySelectorAll("[id='" + o + "'] " + b), f)
                            } catch (r) {} finally {
                                m || e.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) i[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector,
                d = !1;
            try {
                b.call(c.documentElement, "[test!='']:sizzle")
            } catch (e) {
                d = !0
            }
            b && (i.matchesSelector = function (a, c) {
                c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!i.isXML(a)) try {
                    if (d || !j.match.PSEUDO.test(c) && !/!=/.test(c)) return b.call(a, c)
                } catch (e) {}
                return i(c, null, null, [a]).length > 0
            })
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                j.order.splice(1, 0, "CLASS"), j.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName !== "undefined" && !c) return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? i.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? i.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : i.contains = function () {
            return !1
        }, i.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var t = function (a, b) {
                var c, d = [],
                    e = "",
                    f = b.nodeType ? [b] : b;
                while (c = j.match.PSEUDO.exec(a)) e += c[0], a = a.replace(j.match.PSEUDO, "");
                a = j.relative[a] ? a + "*" : a;
                for (var g = 0, h = f.length; g < h; g++) i(a, f[g], d);
                return i.filter(e, d)
            };
        d.find = i, d.expr = i.selectors, d.expr[":"] = d.expr.filters, d.unique = i.uniqueSort, d.text = i.getText, d.isXMLDoc = i.isXML, d.contains = i.contains
    }();
    var G = /Until$/,
        H = /^(?:parents|prevUntil|prevAll)/,
        I = /,/,
        J = /^.[^:#\[\.,]*$/,
        K = Array.prototype.slice,
        L = d.expr.match.POS,
        M = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    d.fn.extend({
        find: function (a) {
            var b = this.pushStack("", "find", a),
                c = 0;
            for (var e = 0, f = this.length; e < f; e++) {
                c = b.length, d.find(a, this[e], b);
                if (e > 0) for (var g = c; g < b.length; g++) for (var h = 0; h < c; h++) if (b[h] === b[g]) {
                    b.splice(g--, 1);
                    break
                }
            }
            return b
        },
        has: function (a) {
            var b = d(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (d.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(O(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(O(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && d.filter(a, this).length > 0
        },
        closest: function (a, b) {
            var c = [],
                e, f, g = this[0];
            if (d.isArray(a)) {
                var h, i, j = {},
                    k = 1;
                if (g && a.length) {
                    for (e = 0, f = a.length; e < f; e++) i = a[e], j[i] || (j[i] = d.expr.match.POS.test(i) ? d(i, b || this.context) : i);
                    while (g && g.ownerDocument && g !== b) {
                        for (i in j) h = j[i], (h.jquery ? h.index(g) > -1 : d(g).is(h)) && c.push({
                            selector: i,
                            elem: g,
                            level: k
                        });
                        g = g.parentNode, k++
                    }
                }
                return c
            }
            var l = L.test(a) ? d(a, b || this.context) : null;
            for (e = 0, f = this.length; e < f; e++) {
                g = this[e];
                while (g) {
                    if (l ? l.index(g) > -1 : d.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b) break
                }
            }
            c = c.length > 1 ? d.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function (a) {
            if (!a || typeof a === "string") return d.inArray(this[0], a ? d(a) : this.parent().children());
            return d.inArray(a.jquery ? a[0] : a, this)
        },
        add: function (a, b) {
            var c = typeof a === "string" ? d(a, b) : d.makeArray(a),
                e = d.merge(this.get(), c);
            return this.pushStack(N(c[0]) || N(e[0]) ? e : d.unique(e))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), d.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return d.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return d.dir(a, "parentNode", c)
        },
        next: function (a) {
            return d.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return d.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return d.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return d.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return d.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return d.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return d.sibling(a.parentNode.firstChild, a)
        },
        children: function (a) {
            return d.sibling(a.firstChild)
        },
        contents: function (a) {
            return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.makeArray(a.childNodes)
        }
    }, function (a, b) {
        d.fn[a] = function (c, e) {
            var f = d.map(this, b, c),
                g = K.call(arguments);
            G.test(a) || (e = c), e && typeof e === "string" && (f = d.filter(e, f)), f = this.length > 1 && !M[a] ? d.unique(f) : f, (this.length > 1 || I.test(e)) && H.test(a) && (f = f.reverse());
            return this.pushStack(f, a, g.join(","))
        }
    }), d.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b)
        },
        dir: function (a, c, e) {
            var f = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (e === b || g.nodeType !== 1 || !d(g).is(e))) g.nodeType === 1 && f.push(g), g = g[c];
            return f
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var P = / jQuery\d+="(?:\d+|null)"/g,
        Q = /^\s+/,
        R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        S = /<([\w:]+)/,
        T = /<tbody/i,
        U = /<|&#?\w+;/,
        V = /<(?:script|object|embed|option|style)/i,
        W = /checked\s*(?:[^=]|=\s*.checked.)/i,
        X = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    X.optgroup = X.option, X.tbody = X.tfoot = X.colgroup = X.caption = X.thead, X.th = X.td, d.support.htmlSerialize || (X._default = [1, "div<div>", "</div>"]), d.fn.extend({
        text: function (a) {
            if (d.isFunction(a)) return this.each(function (b) {
                var c = d(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a !== "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return d.text(this)
        },
        wrapAll: function (a) {
            if (d.isFunction(a)) return this.each(function (b) {
                d(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = d(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (d.isFunction(a)) return this.each(function (b) {
                d(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = d(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            return this.each(function () {
                d(this).wrapAll(a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = d(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, d(arguments[0]).toArray());
                return a
            }
        },
        remove: function (a, b) {
            for (var c = 0, e;
            (e = this[c]) != null; c++) if (!a || d.filter(a, [e]).length)!b && e.nodeType === 1 && (d.cleanData(e.getElementsByTagName("*")), d.cleanData([e])), e.parentNode && e.parentNode.removeChild(e);
            return this
        },
        empty: function () {
            for (var a = 0, b;
            (b = this[a]) != null; a++) {
                b.nodeType === 1 && d.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            a = a == null ? !0 : a, b = b == null ? a : b;
            return this.map(function () {
                return d.clone(this, a, b)
            })
        },
        html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(P, "") : null;
            if (typeof a !== "string" || V.test(a) || !d.support.leadingWhitespace && Q.test(a) || X[(S.exec(a) || ["", ""])[1].toLowerCase()]) d.isFunction(a) ? this.each(function (b) {
                var c = d(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            else {
                a = a.replace(R, "<$1></$2>");
                try {
                    for (var c = 0, e = this.length; c < e; c++) this[c].nodeType === 1 && (d.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (f) {
                    this.empty().append(a)
                }
            }
            return this
        },
        replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (d.isFunction(a)) return this.each(function (b) {
                    var c = d(this),
                        e = c.html();
                    c.replaceWith(a.call(this, b, e))
                });
                typeof a !== "string" && (a = d(a).detach());
                return this.each(function () {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    d(this).remove(), b ? d(b).before(a) : d(c).append(a)
                })
            }
            return this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith", a)
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, e) {
            var f, g, h, i, j = a[0],
                k = [];
            if (!d.support.checkClone && arguments.length === 3 && typeof j === "string" && W.test(j)) return this.each(function () {
                d(this).domManip(a, c, e, !0)
            });
            if (d.isFunction(j)) return this.each(function (f) {
                var g = d(this);
                a[0] = j.call(this, f, c ? g.html() : b), g.domManip(a, c, e)
            });
            if (this[0]) {
                i = j && j.parentNode, d.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? f = {
                    fragment: i
                } : f = d.buildFragment(a, this, k), h = f.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && d.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) e.call(c ? Y(this[l], g) : this[l], f.cacheable || m > 1 && l < n ? d.clone(h, !0, !0) : h)
                }
                k.length && d.each(k, _)
            }
            return this
        }
    }), d.buildFragment = function (a, b, e) {
        var f, g, h, i = b && b[0] ? b[0].ownerDocument || b[0] : c;
        a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && i === c && a[0].charAt(0) === "<" && !V.test(a[0]) && (d.support.checkClone || !W.test(a[0])) && (g = !0, h = d.fragments[a[0]], h && (h !== 1 && (f = h))), f || (f = i.createDocumentFragment(), d.clean(a, i, f, e)), g && (d.fragments[a[0]] = h ? f : 1);
        return {
            fragment: f,
            cacheable: g
        }
    }, d.fragments = {}, d.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        d.fn[a] = function (c) {
            var e = [],
                f = d(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && f.length === 1) {
                f[b](this[0]);
                return this
            }
            for (var h = 0, i = f.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                d(f[h])[b](j), e = e.concat(j)
            }
            return this.pushStack(e, a, f.selector)
        }
    }), d.extend({
        clone: function (a, b, c) {
            var e = a.cloneNode(!0),
                f, g, h;
            if (!d.support.noCloneEvent && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) {
                f = a.getElementsByTagName("*"), g = e.getElementsByTagName("*");
                for (h = 0; f[h]; ++h) $(f[h], g[h]);
                $(a, e)
            }
            if (b) {
                Z(a, e);
                if (c && "getElementsByTagName" in a) {
                    f = a.getElementsByTagName("*"), g = e.getElementsByTagName("*");
                    if (f.length) for (h = 0; f[h]; ++h) Z(f[h], g[h])
                }
            }
            return e
        },
        clean: function (a, b, e, f) {
            b = b || c, typeof b.createElement === "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var g = [];
            for (var h = 0, i;
            (i = a[h]) != null; h++) {
                typeof i === "number" && (i += "");
                if (!i) continue;
                if (typeof i !== "string" || U.test(i)) {
                    if (typeof i === "string") {
                        i = i.replace(R, "<$1></$2>");
                        var j = (S.exec(i) || ["", ""])[1].toLowerCase(),
                            k = X[j] || X._default,
                            l = k[0],
                            m = b.createElement("div");
                        m.innerHTML = k[1] + i + k[2];
                        while (l--) m = m.lastChild;
                        if (!d.support.tbody) {
                            var n = T.test(i),
                                o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : [];
                            for (var p = o.length - 1; p >= 0; --p) d.nodeName(o[p], "tbody") && !o[p].childNodes.length && o[p].parentNode.removeChild(o[p])
                        }!d.support.leadingWhitespace && Q.test(i) && m.insertBefore(b.createTextNode(Q.exec(i)[0]), m.firstChild), i = m.childNodes
                    }
                } else i = b.createTextNode(i);
                i.nodeType ? g.push(i) : g = d.merge(g, i)
            }
            if (e) for (h = 0; g[h]; h++)!f || !d.nodeName(g[h], "script") || g[h].type && g[h].type.toLowerCase() !== "text/javascript" ? (g[h].nodeType === 1 && g.splice.apply(g, [h + 1, 0].concat(d.makeArray(g[h].getElementsByTagName("script")))), e.appendChild(g[h])) : f.push(g[h].parentNode ? g[h].parentNode.removeChild(g[h]) : g[h]);
            return g
        },
        cleanData: function (a) {
            var b, c, e = d.cache,
                f = d.expando,
                g = d.event.special,
                h = d.support.deleteExpando;
            for (var i = 0, j;
            (j = a[i]) != null; i++) {
                if (j.nodeName && d.noData[j.nodeName.toLowerCase()]) continue;
                c = j[d.expando];
                if (c) {
                    b = e[c] && e[c][f];
                    if (b && b.events) {
                        for (var k in b.events) g[k] ? d.event.remove(j, k) : d.removeEvent(j, k, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    h ? delete j[d.expando] : j.removeAttribute && j.removeAttribute(d.expando), delete e[c]
                }
            }
        }
    });
    var ba = /alpha\([^)]*\)/i,
        bb = /opacity=([^)]*)/,
        bc = /-([a-z])/ig,
        bd = /([A-Z])/g,
        be = /^-?\d+(?:px)?$/i,
        bf = /^-?\d/,
        bg = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bh = ["Left", "Right"],
        bi = ["Top", "Bottom"],
        bj, bk, bl, bm = function (a, b) {
            return b.toUpperCase()
        };
    d.fn.css = function (a, c) {
        if (arguments.length === 2 && c === b) return this;
        return d.access(this, a, c, !0, function (a, c, e) {
            return e !== b ? d.style(a, c, e) : d.css(a, c)
        })
    }, d.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bj(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            zIndex: !0,
            fontWeight: !0,
            opacity: !0,
            zoom: !0,
            lineHeight: !0
        },
        cssProps: {
            "float": d.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, e, f) {
            if (a && a.nodeType !== 3 && a.nodeType !== 8 && a.style) {
                var g, h = d.camelCase(c),
                    i = a.style,
                    j = d.cssHooks[h];
                c = d.cssProps[h] || h;
                if (e === b) {
                    if (j && "get" in j && (g = j.get(a, !1, f)) !== b) return g;
                    return i[c]
                }
                if (typeof e === "number" && isNaN(e) || e == null) return;
                typeof e === "number" && !d.cssNumber[h] && (e += "px");
                if (!j || !("set" in j) || (e = j.set(a, e)) !== b) try {
                    i[c] = e
                } catch (k) {}
            }
        },
        css: function (a, c, e) {
            var f, g = d.camelCase(c),
                h = d.cssHooks[g];
            c = d.cssProps[g] || g;
            if (h && "get" in h && (f = h.get(a, !0, e)) !== b) return f;
            if (bj) return bj(a, c, g)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        },
        camelCase: function (a) {
            return a.replace(bc, bm)
        }
    }), d.curCSS = d.css, d.each(["height", "width"], function (a, b) {
        d.cssHooks[b] = {
            get: function (a, c, e) {
                var f;
                if (c) {
                    a.offsetWidth !== 0 ? f = bn(a, b, e) : d.swap(a, bg, function () {
                        f = bn(a, b, e)
                    });
                    if (f <= 0) {
                        f = bj(a, b, b), f === "0px" && bl && (f = bl(a, b, b));
                        if (f != null) return f === "" || f === "auto" ? "0px" : f
                    }
                    if (f < 0 || f == null) {
                        f = a.style[b];
                        return f === "" || f === "auto" ? "0px" : f
                    }
                    return typeof f === "string" ? f : f + "px"
                }
            },
            set: function (a, b) {
                if (!be.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), d.support.opacity || (d.cssHooks.opacity = {
        get: function (a, b) {
            return bb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style;
            c.zoom = 1;
            var e = d.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
                f = c.filter || "";
            c.filter = ba.test(f) ? f.replace(ba, e) : c.filter + " " + e
        }
    }), c.defaultView && c.defaultView.getComputedStyle && (bk = function (a, c, e) {
        var f, g, h;
        e = e.replace(bd, "-$1").toLowerCase();
        if (!(g = a.ownerDocument.defaultView)) return b;
        if (h = g.getComputedStyle(a, null)) f = h.getPropertyValue(e), f === "" && !d.contains(a.ownerDocument.documentElement, a) && (f = d.style(a, e));
        return f
    }), c.documentElement.currentStyle && (bl = function (a, b) {
        var c, d = a.currentStyle && a.currentStyle[b],
            e = a.runtimeStyle && a.runtimeStyle[b],
            f = a.style;
        !be.test(d) && bf.test(d) && (c = f.left, e && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px", f.left = c, e && (a.runtimeStyle.left = e));
        return d === "" ? "auto" : d
    }), bj = bk || bl, d.expr && d.expr.filters && (d.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !d.support.reliableHiddenOffsets && (a.style.display || d.css(a, "display")) === "none"
    }, d.expr.filters.visible = function (a) {
        return !d.expr.filters.hidden(a)
    });
    var bo = /%20/g,
        bp = /\[\]$/,
        bq = /\r?\n/g,
        br = /#.*$/,
        bs = /^(.*?):\s*(.*?)\r?$/mg,
        bt = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bu = /^(?:GET|HEAD)$/,
        bv = /^\/\//,
        bw = /\?/,
        bx = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        by = /^(?:select|textarea)/i,
        bz = /\s+/,
        bA = /([?&])_=[^&]*/,
        bB = /^(\w+:)\/\/([^\/?#:]+)(?::(\d+))?/,
        bC = d.fn.load,
        bD = {},
        bE = {};
    d.fn.extend({
        load: function (a, b, c) {
            if (typeof a !== "string" && bC) return bC.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var f = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var g = "GET";
            b && (d.isFunction(b) ? (c = b, b = null) : typeof b === "object" && (b = d.param(b, d.ajaxSettings.traditional), g = "POST"));
            var h = this;
            d.ajax({
                url: a,
                type: g,
                dataType: "html",
                data: b,
                complete: function (a, b, e) {
                    e = a.responseText, a.isResolved() && (a.done(function (a) {
                        e = a
                    }), h.html(f ? d("<div>").append(e.replace(bx, "")).find(f) : e)), c && h.each(c, [e, b, a])
                }
            });
            return this
        },
        serialize: function () {
            return d.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? d.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || by.test(this.nodeName) || bt.test(this.type))
            }).map(function (a, b) {
                var c = d(this).val();
                return c == null ? null : d.isArray(c) ? d.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bq, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bq, "\r\n")
                }
            }).get()
        }
    }), d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        d.fn[b] = function (a) {
            return this.bind(b, a)
        }
    }), d.each(["get", "post"], function (a, b) {
        d[b] = function (a, c, e, f) {
            d.isFunction(c) && (f = f || e, e = c, c = null);
            return d.ajax({
                type: b,
                url: a,
                data: c,
                success: e,
                dataType: f
            })
        }
    }), d.extend({
        getScript: function (a, b) {
            return d.get(a, null, b, "script")
        },
        getJSON: function (a, b, c) {
            return d.get(a, b, c, "json")
        },
        ajaxSetup: function (a) {
            d.extend(!0, d.ajaxSettings, a), a.context && (d.ajaxSettings.context = a.context)
        },
        ajaxSettings: {
            url: location.href,
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": "*/*"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": d.parseJSON,
                "text xml": d.parseXML
            }
        },
        ajaxPrefilter: bF(bD),
        ajaxTransport: bF(bE),
        ajax: function (a, e) {
            function w(a, c, e, l) {
                if (t !== 2) {
                    t = 2, p && clearTimeout(p), o = b, m = l || "", v.readyState = a ? 4 : 0;
                    var n, q, r, s = e ? bI(f, v, e) : b,
                        u, w;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (f.ifModified) {
                            if (u = v.getResponseHeader("Last-Modified")) d.lastModified[f.url] = u;
                            if (w = v.getResponseHeader("Etag")) d.etag[f.url] = w
                        }
                        if (a === 304) c = "notmodified", n = !0;
                        else try {
                            q = bJ(f, s), c = "success", n = !0
                        } catch (x) {
                            c = "parsererror", r = x
                        }
                    } else r = c, a && (c = "error", a < 0 && (a = 0));
                    v.status = a, v.statusText = c, n ? i.resolveWith(g, [q, c, v]) : i.rejectWith(g, [v, c, r]), v.statusCode(k), k = b, f.global && h.trigger("ajax" + (n ? "Success" : "Error"), [v, f, n ? q : r]), j.resolveWith(g, [v, c]), f.global && (h.trigger("ajaxComplete", [v, f]), --d.active || d.event.trigger("ajaxStop"))
                }
            }
            typeof e !== "object" && (e = a, a = b), e = e || {};
            var f = d.extend(!0, {}, d.ajaxSettings, e),
                g = (f.context = ("context" in e ? e : d.ajaxSettings).context) || f,
                h = g === f ? d.event : d(g),
                i = d.Deferred(),
                j = d._Deferred(),
                k = f.statusCode || {},
                l = {},
                m, n, o, p, q = c.location,
                r = q.protocol || "http:",
                s, t = 0,
                u, v = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        t === 0 && (l[a.toLowerCase()] = b);
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return t === 2 ? m : null
                    },
                    getResponseHeader: function (a) {
                        var b;
                        if (t === 2) {
                            if (!n) {
                                n = {};
                                while (b = bs.exec(m)) n[b[1].toLowerCase()] = b[2]
                            }
                            b = n[a.toLowerCase()]
                        }
                        return b || null
                    },
                    abort: function (a) {
                        a = a || "abort", o && o.abort(a), w(0, a);
                        return this
                    }
                };
            i.promise(v), v.success = v.done, v.error = v.fail, v.complete = j.done, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (t < 2) for (b in a) k[b] = [k[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, f.url = ("" + (a || f.url)).replace(br, "").replace(bv, r + "//"), f.dataTypes = d.trim(f.dataType || "*").toLowerCase().split(bz), f.crossDomain || (s = bB.exec(f.url.toLowerCase()), f.crossDomain = s && (s[1] != r || s[2] != q.hostname || (s[3] || (s[1] === "http:" ? 80 : 443)) != (q.port || (r === "http:" ? 80 : 443)))), f.data && f.processData && typeof f.data !== "string" && (f.data = d.param(f.data, f.traditional)), bG(bD, f, e, v), f.type = f.type.toUpperCase(), f.hasContent = !bu.test(f.type), f.global && d.active++ === 0 && d.event.trigger("ajaxStart");
            if (!f.hasContent) {
                f.data && (f.url += (bw.test(f.url) ? "&" : "?") + f.data);
                if (f.cache === !1) {
                    var x = d.now(),
                        y = f.url.replace(bA, "$1_=" + x);
                    f.url = y + (y === f.url ? (bw.test(f.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            if (f.data && f.hasContent && f.contentType !== !1 || e.contentType) l["content-type"] = f.contentType;
            f.ifModified && (d.lastModified[f.url] && (l["if-modified-since"] = d.lastModified[f.url]), d.etag[f.url] && (l["if-none-match"] = d.etag[f.url])), l.accept = f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + (f.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : f.accepts["*"];
            for (u in f.headers) l[u.toLowerCase()] = f.headers[u];
            if (!f.beforeSend || f.beforeSend.call(g, v, f) !== !1 && t !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](f[u]);
                o = bG(bE, f, e, v);
                if (o) {
                    t = v.readyState = 1, f.global && h.trigger("ajaxSend", [v, f]), f.async && f.timeout > 0 && (p = setTimeout(function () {
                        v.abort("timeout")
                    }, f.timeout));
                    try {
                        o.send(l, w)
                    } catch (z) {
                        status < 2 ? w(-1, z) : d.error(z)
                    }
                } else w(-1, "No Transport")
            } else w(0, "abort"), v = !1;
            return v
        },
        param: function (a, c) {
            var e = [],
                f = function (a, b) {
                    b = d.isFunction(b) ? b() : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = d.ajaxSettings.traditional);
            if (d.isArray(a) || a.jquery) d.each(a, function () {
                f(this.name, this.value)
            });
            else for (var g in a) bH(g, a[g], c, f);
            return e.join("&").replace(bo, "+")
        }
    }), d.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var bK = d.now(),
        bL = /(\=)\?(&|$)|()\?\?()/i;
    d.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return d.expando + "_" + bK++
        }
    }), d.ajaxPrefilter("json jsonp", function (b, c, e) {
        e = typeof b.data === "string";
        if (b.dataTypes[0] === "jsonp" || c.jsonpCallback || c.jsonp != null || b.jsonp !== !1 && (bL.test(b.url) || e && bL.test(b.data))) {
            var f, g = b.jsonpCallback = d.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                h = a[g],
                i = b.url,
                j = b.data,
                k = "$1" + g + "$2";
            b.jsonp !== !1 && (i = i.replace(bL, k), b.url === i && (e && (j = j.replace(bL, k)), b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))), b.url = i, b.data = j, a[g] = function (a) {
                f = [a]
            }, b.complete = [function () {
                a[g] = h;
                if (h) f && d.isFunction(h) && a[g](f[0]);
                else try {
                    delete a[g]
                } catch (b) {}
            },
            b.complete], b.converters["script json"] = function () {
                f || d.error(g + " was not called");
                return f[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), d.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript"
        },
        contents: {
            script: /javascript/
        },
        converters: {
            "text script": function (a) {
                d.globalEval(a);
                return a
            }
        }
    }), d.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), d.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (!d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var bM = d.now(),
        bN = {},
        bO, bP;
    d.ajaxSettings.xhr = a.ActiveXObject ?
    function () {
        if (a.location.protocol !== "file:") try {
            return new a.XMLHttpRequest
        } catch (b) {}
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (c) {}
    } : function () {
        return new a.XMLHttpRequest
    };
    try {
        bP = d.ajaxSettings.xhr()
    } catch (bQ) {}
    d.support.ajax = !! bP, d.support.cors = bP && "withCredentials" in bP, bP = b, d.support.ajax && d.ajaxTransport(function (b) {
        if (!b.crossDomain || d.support.cors) {
            var c;
            return {
                send: function (e, f) {
                    bO || (bO = 1, d(a).bind("unload", function () {
                        d.each(bN, function (a, b) {
                            b.onreadystatechange && b.onreadystatechange(1)
                        })
                    }));
                    var g = b.xhr(),
                        h;
                    b.username ? g.open(b.type, b.url, b.async, b.username, b.password) : g.open(b.type, b.url, b.async), (!b.crossDomain || b.hasContent) && !e["x-requested-with"] && (e["x-requested-with"] = "XMLHttpRequest");
                    try {
                        d.each(e, function (a, b) {
                            g.setRequestHeader(a, b)
                        })
                    } catch (i) {}
                    g.send(b.hasContent && b.data || null), c = function (a, e) {
                        if (c && (e || g.readyState === 4)) {
                            c = 0, h && (g.onreadystatechange = d.noop, delete bN[h]);
                            if (e) g.readyState !== 4 && g.abort();
                            else {
                                var i = g.status,
                                    j, k = g.getAllResponseHeaders(),
                                    l = {},
                                    m = g.responseXML;
                                m && m.documentElement && (l.xml = m), l.text = g.responseText;
                                try {
                                    j = g.statusText
                                } catch (n) {
                                    j = ""
                                }
                                i = i === 0 ? !b.crossDomain || j ? k ? 304 : 0 : 302 : i == 1223 ? 204 : i, f(i, j, l, k)
                            }
                        }
                    }, b.async && g.readyState !== 4 ? (h = bM++, bN[h] = g, g.onreadystatechange = c) : c()
                },
                abort: function () {
                    c && c(0, 1)
                }
            }
        }
    });
    var bR = {},
        bS = /^(?:toggle|show|hide)$/,
        bT = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        bU, bV = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    d.fn.extend({
        show: function (a, b, c) {
            var e, f;
            if (a || a === 0) return this.animate(bW("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) e = this[g], f = e.style.display, !d._data(e, "olddisplay") && f === "none" && (f = e.style.display = ""), f === "" && d.css(e, "display") === "none" && d._data(e, "olddisplay", bX(e.nodeName));
            for (g = 0; g < h; g++) {
                e = this[g], f = e.style.display;
                if (f === "" || f === "none") e.style.display = d._data(e, "olddisplay") || ""
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(bW("hide", 3), a, b, c);
            for (var e = 0, f = this.length; e < f; e++) {
                var g = d.css(this[e], "display");
                g !== "none" && !d._data(this[e], "olddisplay") && d._data(this[e], "olddisplay", g)
            }
            for (e = 0; e < f; e++) this[e].style.display = "none";
            return this
        },
        _toggle: d.fn.toggle,
        toggle: function (a, b, c) {
            var e = typeof a === "boolean";
            d.isFunction(a) && d.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || e ? this.each(function () {
                var b = e ? a : d(this).is(":hidden");
                d(this)[b ? "show" : "hide"]()
            }) : this.animate(bW("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, e) {
            var f = d.speed(b, c, e);
            if (d.isEmptyObject(a)) return this.each(f.complete);
            return this[f.queue === !1 ? "each" : "queue"](function () {
                var b = d.extend({}, f),
                    c, e = this.nodeType === 1,
                    g = e && d(this).is(":hidden"),
                    h = this;
                for (c in a) {
                    var i = d.camelCase(c);
                    c !== i && (a[i] = a[c], delete a[c], c = i);
                    if (a[c] === "hide" && g || a[c] === "show" && !g) return b.complete.call(this);
                    if (e && (c === "height" || c === "width")) {
                        b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (d.css(this, "display") === "inline" && d.css(this, "float") === "none") if (d.support.inlineBlockNeedsLayout) {
                            var j = bX(this.nodeName);
                            j === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)
                        } else this.style.display = "inline-block"
                    }
                    d.isArray(a[c]) && ((b.specialEasing = b.specialEasing || {})[c] = a[c][1], a[c] = a[c][0])
                }
                b.overflow != null && (this.style.overflow = "hidden"), b.curAnim = d.extend({}, a), d.each(a, function (c, e) {
                    var f = new d.fx(h, b, c);
                    if (bS.test(e)) f[e === "toggle" ? g ? "show" : "hide" : e](a);
                    else {
                        var i = bT.exec(e),
                            j = f.cur() || 0;
                        if (i) {
                            var k = parseFloat(i[2]),
                                l = i[3] || "px";
                            l !== "px" && (d.style(h, c, (k || 1) + l), j = (k || 1) / f.cur() * j, d.style(h, c, j + l)), i[1] && (k = (i[1] === "-=" ? -1 : 1) * k + j), f.custom(j, k, l)
                        } else f.custom(j, e, "")
                    }
                });
                return !0
            })
        },
        stop: function (a, b) {
            var c = d.timers;
            a && this.queue([]), this.each(function () {
                for (var a = c.length - 1; a >= 0; a--) c[a].elem === this && (b && c[a](!0), c.splice(a, 1))
            }), b || this.dequeue();
            return this
        }
    }), d.each({
        slideDown: bW("show", 1),
        slideUp: bW("hide", 1),
        slideToggle: bW("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        d.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), d.extend({
        speed: function (a, b, c) {
            var e = a && typeof a === "object" ? d.extend({}, a) : {
                complete: c || !c && b || d.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !d.isFunction(b) && b
            };
            e.duration = d.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default, e.old = e.complete, e.complete = function () {
                e.queue !== !1 && d(this).dequeue(), d.isFunction(e.old) && e.old.call(this)
            };
            return e
        },
        easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            },
            swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig || (b.orig = {})
        }
    }), d.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (d.fx.step[this.prop] || d.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a = parseFloat(d.css(this.elem, this.prop));
            return a || 0
        },
        custom: function (a, b, c) {
            function g(a) {
                return e.step(a)
            }
            var e = this,
                f = d.fx;
            this.startTime = d.now(), this.start = a, this.end = b, this.unit = c || this.unit || "px", this.now = this.start, this.pos = this.state = 0, g.elem = this.elem, g() && d.timers.push(g) && !bU && (bU = setInterval(f.tick, f.interval))
        },
        show: function () {
            this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), d(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = d.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b = d.now(),
                c = !0;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (var e in this.options.curAnim) this.options.curAnim[e] !== !0 && (c = !1);
                if (c) {
                    if (this.options.overflow != null && !d.support.shrinkWrapBlocks) {
                        var f = this.elem,
                            g = this.options;
                        d.each(["", "X", "Y"], function (a, b) {
                            f.style["overflow" + b] = g.overflow[a]
                        })
                    }
                    this.options.hide && d(this.elem).hide();
                    if (this.options.hide || this.options.show) for (var h in this.options.curAnim) d.style(this.elem, h, this.options.orig[h]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            var i = b - this.startTime;
            this.state = i / this.options.duration;
            var j = this.options.specialEasing && this.options.specialEasing[this.prop],
                k = this.options.easing || (d.easing.swing ? "swing" : "linear");
            this.pos = d.easing[j || k](this.state, i, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update();
            return !0
        }
    }, d.extend(d.fx, {
        tick: function () {
            var a = d.timers;
            for (var b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
            a.length || d.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(bU), bU = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                d.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), d.expr && d.expr.filters && (d.expr.filters.animated = function (a) {
        return d.grep(d.timers, function (b) {
            return a === b.elem
        }).length
    });
    var bY = /^t(?:able|d|h)$/i,
        bZ = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? d.fn.offset = function (a) {
        var b = this[0],
            c;
        if (a) return this.each(function (b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (e) {}
        var f = b.ownerDocument,
            g = f.documentElement;
        if (!c || !d.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = f.body,
            i = b$(f),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || d.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || d.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : d.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        d.offset.initialize();
        var c, e = b.offsetParent,
            f = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (d.offset.supportsFixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === e && (l += b.offsetTop, m += b.offsetLeft, d.offset.doesNotAddBorder && (!d.offset.doesAddBorderForTableAndCells || !bY.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), f = e, e = b.offsetParent), d.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        d.offset.supportsFixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {
            top: l,
            left: m
        }
    }, d.offset = {
        initialize: function () {
            var a = c.body,
                b = c.createElement("div"),
                e, f, g, h, i = parseFloat(d.css(a, "marginTop")) || 0,
                j = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            d.extend(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), b.innerHTML = j, a.insertBefore(b, a.firstChild), e = b.firstChild, f = e.firstChild, h = e.nextSibling.firstChild.firstChild, this.doesNotAddBorder = f.offsetTop !== 5, this.doesAddBorderForTableAndCells = h.offsetTop === 5, f.style.position = "fixed", f.style.top = "20px", this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15, f.style.position = f.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== i, a.removeChild(b), a = b = e = f = g = h = null, d.offset.initialize = d.noop
        },
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            d.offset.initialize(), d.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(d.css(a, "marginTop")) || 0, c += parseFloat(d.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var e = d.css(a, "position");
            e === "static" && (a.style.position = "relative");
            var f = d(a),
                g = f.offset(),
                h = d.css(a, "top"),
                i = d.css(a, "left"),
                j = e === "absolute" && d.inArray("auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j && (l = f.position()), m = j ? l.top : parseInt(h, 10) || 0, n = j ? l.left : parseInt(i, 10) || 0, d.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : f.css(k)
        }
    }, d.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                e = bZ.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(d.css(a, "marginTop")) || 0, c.left -= parseFloat(d.css(a, "marginLeft")) || 0, e.top += parseFloat(d.css(b[0], "borderTopWidth")) || 0, e.left += parseFloat(d.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - e.top,
                left: c.left - e.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && (!bZ.test(a.nodeName) && d.css(a, "position") === "static")) a = a.offsetParent;
                return a
            })
        }
    }), d.each(["Left", "Top"], function (a, c) {
        var e = "scroll" + c;
        d.fn[e] = function (c) {
            var f = this[0],
                g;
            if (!f) return null;
            if (c !== b) return this.each(function () {
                g = b$(this), g ? g.scrollTo(a ? d(g).scrollLeft() : c, a ? c : d(g).scrollTop()) : this[e] = c
            });
            g = b$(f);
            return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : d.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]
        }
    }), d.each(["Height", "Width"], function (a, c) {
        var e = c.toLowerCase();
        d.fn["inner" + c] = function () {
            return this[0] ? parseFloat(d.css(this[0], e, "padding")) : null
        }, d.fn["outer" + c] = function (a) {
            return this[0] ? parseFloat(d.css(this[0], e, a ? "margin" : "border")) : null
        }, d.fn[e] = function (a) {
            var f = this[0];
            if (!f) return a == null ? null : this;
            if (d.isFunction(a)) return this.each(function (b) {
                var c = d(this);
                c[e](a.call(this, b, c[e]()))
            });
            if (d.isWindow(f)) {
                var g = f.document.documentElement["client" + c];
                return f.document.compatMode === "CSS1Compat" && g || f.document.body["client" + c] || g
            }
            if (f.nodeType === 9) return Math.max(f.documentElement["client" + c], f.body["scroll" + c], f.documentElement["scroll" + c], f.body["offset" + c], f.documentElement["offset" + c]);
            if (a === b) {
                var h = d.css(f, e),
                    i = parseFloat(h);
                return d.isNaN(i) ? h : i
            }
            return this.css(e, typeof a === "string" ? a : a + "px")
        }
    })
})(window);
(function (c, j) {
    function k(a) {
        return !c(a).parents().andSelf().filter(function () {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }
    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.9",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            _focus: c.fn.focus,
            focus: function (a, b) {
                return typeof a === "number" ? this.each(function () {
                    var d = this;
                    setTimeout(function () {
                        c(d).focus();
                        b && b.call(d)
                    }, a)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            },
            zIndex: function (a) {
                if (a !== j) return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"), 10);
                            if (!isNaN(b) && b !== 0) return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                    a.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        c.each(["Width", "Height"], function (a, b) {
            function d(f, g, l, m) {
                c.each(e, function () {
                    g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (l) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
                    if (m) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }
            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = b.toLowerCase(),
                i = {
                    innerWidth: c.fn.innerWidth,
                    innerHeight: c.fn.innerHeight,
                    outerWidth: c.fn.outerWidth,
                    outerHeight: c.fn.outerHeight
                };
            c.fn["inner" + b] = function (f) {
                if (f === j) return i["inner" + b].call(this);
                return this.each(function () {
                    c(this).css(h, d(this, f) + "px")
                })
            };
            c.fn["outer" + b] = function (f, g) {
                if (typeof f !== "number") return i["outer" + b].call(this, f);
                return this.each(function () {
                    c(this).css(h, d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function (a, b, d) {
                return !!c.data(a, d[3])
            },
            focusable: function (a) {
                var b = a.nodeName.toLowerCase(),
                    d = c.attr(a, "tabindex");
                if ("area" === b) {
                    b = a.parentNode;
                    d = b.name;
                    if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
                    a = c("img[usemap=#" + d + "]")[0];
                    return !!a && k(a)
                }
                return (/input|select|textarea|button|object/.test(b) ? !a.disabled : "a" == b ? a.href || !isNaN(d) : !isNaN(d)) && k(a)
            },
            tabbable: function (a) {
                var b = c.attr(a, "tabindex");
                return (isNaN(b) || b >= 0) && c(a).is(":focusable")
            }
        });
        c(function () {
            var a = document.body,
                b = a.appendChild(b = document.createElement("div"));
            c.extend(b.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            c.support.minHeight = b.offsetHeight === 100;
            c.support.selectstart = "onselectstart" in b;
            a.removeChild(b).style.display = "none"
        });
        c.extend(c.ui, {
            plugin: {
                add: function (a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                },
                call: function (a, b, d) {
                    if ((b = a.plugins[b]) && a.element[0].parentNode) for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
                }
            },
            contains: function (a, b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
            },
            hasScroll: function (a, b) {
                if (c(a).css("overflow") === "hidden") return false;
                b = b && b === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (a[b] > 0) return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            },
            isOverAxis: function (a, b, d) {
                return a > b && a < b + d
            },
            isOver: function (a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
            }
        })
    }
})(jQuery);;
(function (b, j) {
    if (b.cleanData) {
        var k = b.cleanData;
        b.cleanData = function (a) {
            for (var c = 0, d;
            (d = a[c]) != null; c++) b(d).triggerHandler("remove");
            k(a)
        }
    } else {
        var l = b.fn.remove;
        b.fn.remove = function (a, c) {
            return this.each(function () {
                if (!c) if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function () {
                    b(this).triggerHandler("remove")
                });
                return l.call(b(this), a, c)
            })
        }
    }
    b.widget = function (a, c, d) {
        var e = a.split(".")[0],
            f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function (h) {
            return !!b.data(h, a)
        };
        b[e] = b[e] || {};
        b[e][a] = function (h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend(true, {}, c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        }, d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function (a, c) {
        b.fn[a] = function (d) {
            var e = typeof d === "string",
                f = Array.prototype.slice.call(arguments, 1),
                h = this;
            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.charAt(0) === "_") return h;
            e ? this.each(function () {
                var g = b.data(this, a),
                    i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                if (i !== g && i !== j) {
                    h = i;
                    return false
                }
            }) : this.each(function () {
                var g = b.data(this, a);
                g ? g.option(d || {})._init() : b.data(this, a, new c(d, this))
            });
            return h
        }
    };
    b.Widget = function (a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (a, c) {
            b.data(c, this.widgetName, this);
            this.element = b(c);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), a);
            var d = this;
            this.element.bind("remove." + this.widgetName, function () {
                d.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (a, c) {
            var d = a;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof a === "string") {
                if (c === j) return this.options[a];
                d = {};
                d[a] = c
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function (a) {
            var c = this;
            b.each(a, function (d, e) {
                c._setOption(d, e)
            });
            return this
        },
        _setOption: function (a, c) {
            this.options[a] = c;
            if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a = b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);;
(function (c) {
    c.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function (b) {
                return a._mouseDown(b)
            }).bind("click." + this.widgetName, function (b) {
                if (true === c.data(b.target, a.widgetName + ".preventClickEvent")) {
                    c.removeData(b.target, a.widgetName + ".preventClickEvent");
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (a) {
            a.originalEvent = a.originalEvent || {};
            if (!a.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var b = this,
                    e = a.which == 1,
                    f = typeof this.options.cancel == "string" ? c(a.target).parents().add(a.target).filter(this.options.cancel).length : false;
                if (!e || f || !this._mouseCapture(a)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                    b.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted = this._mouseStart(a) !== false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate = function (d) {
                    return b._mouseMove(d)
                };
                this._mouseUpDelegate = function (d) {
                    return b._mouseUp(d)
                };
                c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.preventDefault();
                return a.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function (a) {
            if (c.browser.msie && !(document.documentMode >= 9) && !a.button) return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return !this._mouseStarted
        },
        _mouseUp: function (a) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                a.target == this._mouseDownEvent.target && c.data(a.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);;
(function (d) {
    d.widget("ui.slider", d.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var b = this,
                a = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            a.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = d([]);
            if (a.range) {
                if (a.range === true) {
                    this.range = d("<div></div>");
                    if (!a.values) a.values = [this._valueMin(), this._valueMin()];
                    if (a.values.length && a.values.length !== 2) a.values = [a.values[0], a.values[0]]
                } else this.range = d("<div></div>");
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (a.range === "min" || a.range === "max") this.range.addClass("ui-slider-range-" + a.range);
                this.range.addClass("ui-widget-header")
            }
            d(".ui-slider-handle", this.element).length === 0 && d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (a.values && a.values.length) for (; d(".ui-slider-handle", this.element).length < a.values.length;) d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = d(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (c) {
                c.preventDefault()
            }).hover(function () {
                a.disabled || d(this).addClass("ui-state-hover")
            }, function () {
                d(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (a.disabled) d(this).blur();
                else {
                    d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    d(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                d(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (c) {
                d(this).data("index.ui-slider-handle", c)
            });
            this.handles.keydown(function (c) {
                var e = true,
                    f = d(this).data("index.ui-slider-handle"),
                    h, g, i;
                if (!b.options.disabled) {
                    switch (c.keyCode) {
                    case d.ui.keyCode.HOME:
                    case d.ui.keyCode.END:
                    case d.ui.keyCode.PAGE_UP:
                    case d.ui.keyCode.PAGE_DOWN:
                    case d.ui.keyCode.UP:
                    case d.ui.keyCode.RIGHT:
                    case d.ui.keyCode.DOWN:
                    case d.ui.keyCode.LEFT:
                        e = false;
                        if (!b._keySliding) {
                            b._keySliding = true;
                            d(this).addClass("ui-state-active");
                            h = b._start(c, f);
                            if (h === false) return
                        }
                        break
                    }
                    i = b.options.step;
                    h = b.options.values && b.options.values.length ? (g = b.values(f)) : (g = b.value());
                    switch (c.keyCode) {
                    case d.ui.keyCode.HOME:
                        g = b._valueMin();
                        break;
                    case d.ui.keyCode.END:
                        g = b._valueMax();
                        break;
                    case d.ui.keyCode.PAGE_UP:
                        g = b._trimAlignValue(h + (b._valueMax() - b._valueMin()) / 5);
                        break;
                    case d.ui.keyCode.PAGE_DOWN:
                        g = b._trimAlignValue(h - (b._valueMax() - b._valueMin()) / 5);
                        break;
                    case d.ui.keyCode.UP:
                    case d.ui.keyCode.RIGHT:
                        if (h === b._valueMax()) return;
                        g = b._trimAlignValue(h + i);
                        break;
                    case d.ui.keyCode.DOWN:
                    case d.ui.keyCode.LEFT:
                        if (h === b._valueMin()) return;
                        g = b._trimAlignValue(h - i);
                        break
                    }
                    b._slide(c, f, g);
                    return e
                }
            }).keyup(function (c) {
                var e = d(this).data("index.ui-slider-handle");
                if (b._keySliding) {
                    b._keySliding = false;
                    b._stop(c, e);
                    b._change(c, e);
                    d(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (b) {
            var a = this.options,
                c, e, f, h, g;
            if (a.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            c = this._normValueFromMouse({
                x: b.pageX,
                y: b.pageY
            });
            e = this._valueMax() - this._valueMin() + 1;
            h = this;
            this.handles.each(function (i) {
                var j = Math.abs(c - h.values(i));
                if (e > j) {
                    e = j;
                    f = d(this);
                    g = i
                }
            });
            if (a.range === true && this.values(1) === a.min) {
                g += 1;
                f = d(this.handles[g])
            }
            if (this._start(b, g) === false) return false;
            this._mouseSliding = true;
            h._handleIndex = g;
            f.addClass("ui-state-active").focus();
            a = f.offset();
            this._clickOffset = !d(b.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - a.left - f.width() / 2,
                top: b.pageY - a.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(b, g, c);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (b) {
            var a = this._normValueFromMouse({
                x: b.pageX,
                y: b.pageY
            });
            this._slide(b, this._handleIndex, a);
            return false
        },
        _mouseStop: function (b) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(b, this._handleIndex);
            this._change(b, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (b) {
            var a;
            if (this.orientation === "horizontal") {
                a = this.elementSize.width;
                b = b.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                a = this.elementSize.height;
                b = b.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            a = b / a;
            if (a > 1) a = 1;
            if (a < 0) a = 0;
            if (this.orientation === "vertical") a = 1 - a;
            b = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + a * b)
        },
        _start: function (b, a) {
            var c = {
                handle: this.handles[a],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                c.value = this.values(a);
                c.values = this.values()
            }
            return this._trigger("start", b, c)
        },
        _slide: function (b, a, c) {
            var e;
            if (this.options.values && this.options.values.length) {
                e = this.values(a ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (a === 0 && c > e || a === 1 && c < e)) c = e;
                if (c !== this.values(a)) {
                    e = this.values();
                    e[a] = c;
                    b = this._trigger("slide", b, {
                        handle: this.handles[a],
                        value: c,
                        values: e
                    });
                    this.values(a ? 0 : 1);
                    b !== false && this.values(a, c, true)
                }
            } else if (c !== this.value()) {
                b = this._trigger("slide", b, {
                    handle: this.handles[a],
                    value: c
                });
                b !== false && this.value(c)
            }
        },
        _stop: function (b, a) {
            var c = {
                handle: this.handles[a],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                c.value = this.values(a);
                c.values = this.values()
            }
            this._trigger("stop", b, c)
        },
        _change: function (b, a) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[a],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    c.value = this.values(a);
                    c.values = this.values()
                }
                this._trigger("change", b, c)
            }
        },
        value: function (b) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(b);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (b, a) {
            var c, e, f;
            if (arguments.length > 1) {
                this.options.values[b] = this._trimAlignValue(a);
                this._refreshValue();
                this._change(null, b)
            }
            if (arguments.length) if (d.isArray(arguments[0])) {
                c = this.options.values;
                e = arguments[0];
                for (f = 0; f < c.length; f += 1) {
                    c[f] = this._trimAlignValue(e[f]);
                    this._change(null, f)
                }
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(b) : this.value();
            else return this._values()
        },
        _setOption: function (b, a) {
            var c, e = 0;
            if (d.isArray(this.options.values)) e = this.options.values.length;
            d.Widget.prototype._setOption.apply(this, arguments);
            switch (b) {
            case "disabled":
                if (a) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (c = 0; c < e; c += 1) this._change(null, c);
                this._animateOff = false;
                break
            }
        },
        _value: function () {
            var b = this.options.value;
            return b = this._trimAlignValue(b)
        },
        _values: function (b) {
            var a, c;
            if (arguments.length) {
                a = this.options.values[b];
                return a = this._trimAlignValue(a)
            } else {
                a = this.options.values.slice();
                for (c = 0; c < a.length; c += 1) a[c] = this._trimAlignValue(a[c]);
                return a
            }
        },
        _trimAlignValue: function (b) {
            if (b <= this._valueMin()) return this._valueMin();
            if (b >= this._valueMax()) return this._valueMax();
            var a = this.options.step > 0 ? this.options.step : 1,
                c = (b - this._valueMin()) % a;
            alignValue = b - c;
            if (Math.abs(c) * 2 >= a) alignValue += c > 0 ? a : -a;
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var b = this.options.range,
                a = this.options,
                c = this,
                e = !this._animateOff ? a.animate : false,
                f, h = {},
                g, i, j, l;
            if (this.options.values && this.options.values.length) this.handles.each(function (k) {
                f = (c.values(k) - c._valueMin()) / (c._valueMax() - c._valueMin()) * 100;
                h[c.orientation === "horizontal" ? "left" : "bottom"] = f + "%";
                d(this).stop(1, 1)[e ? "animate" : "css"](h, a.animate);
                if (c.options.range === true) if (c.orientation === "horizontal") {
                    if (k === 0) c.range.stop(1, 1)[e ? "animate" : "css"]({
                        left: f + "%"
                    }, a.animate);
                    if (k === 1) c.range[e ? "animate" : "css"]({
                        width: f - g + "%"
                    }, {
                        queue: false,
                        duration: a.animate
                    })
                } else {
                    if (k === 0) c.range.stop(1, 1)[e ? "animate" : "css"]({
                        bottom: f + "%"
                    }, a.animate);
                    if (k === 1) c.range[e ? "animate" : "css"]({
                        height: f - g + "%"
                    }, {
                        queue: false,
                        duration: a.animate
                    })
                }
                g = f
            });
            else {
                i = this.value();
                j = this._valueMin();
                l = this._valueMax();
                f = l !== j ? (i - j) / (l - j) * 100 : 0;
                h[c.orientation === "horizontal" ? "left" : "bottom"] = f + "%";
                this.handle.stop(1, 1)[e ? "animate" : "css"](h, a.animate);
                if (b === "min" && this.orientation === "horizontal") this.range.stop(1, 1)[e ? "animate" : "css"]({
                    width: f + "%"
                }, a.animate);
                if (b === "max" && this.orientation === "horizontal") this.range[e ? "animate" : "css"]({
                    width: 100 - f + "%"
                }, {
                    queue: false,
                    duration: a.animate
                });
                if (b === "min" && this.orientation === "vertical") this.range.stop(1, 1)[e ? "animate" : "css"]({
                    height: f + "%"
                }, a.animate);
                if (b === "max" && this.orientation === "vertical") this.range[e ? "animate" : "css"]({
                    height: 100 - f + "%"
                }, {
                    queue: false,
                    duration: a.animate
                })
            }
        }
    });
    d.extend(d.ui.slider, {
        version: "1.8.9"
    })
})(jQuery);;
(function ($) {
    $.userMode = (function () {
        var userBg, timer, testDiv, boundEvents = 0;

        function testBg() {
            testDiv = testDiv || $('<div></div>').css({
                position: 'absolute',
                left: '-999em',
                top: '-999px',
                width: '0px',
                height: '0px'
            }).appendTo('body');
            var black = $.curCSS(testDiv.css({
                backgroundColor: '#000000'
            })[0], 'backgroundColor', true),
                white = $.curCSS(testDiv.css({
                    backgroundColor: '#ffffff'
                })[0], 'backgroundColor', true),
                newBgStatus = (black === white || white === 'transparent');
            if (newBgStatus != userBg) {
                userBg = newBgStatus;
                $.event.trigger('_internalusermode');
            }
            return userBg;
        }

        function init() {
            testBg();
            timer = setInterval(testBg, 3000);
        }

        function stop() {
            clearInterval(timer);
            testDiv.remove();
            testDiv = null;
        }
        $.event.special.usermode = {
            setup: function () {
                (!boundEvents && init());
                boundEvents++;
                var jElem = $(this).bind('_internalusermode', $.event.special.usermode.handler);
                setTimeout(function () {
                    jElem.triggerHandler('_internalusermode');
                }, 1);
                return true;
            },
            teardown: function () {
                boundEvents--;
                (!boundEvents && stop());
                $(this).unbind('_internalusermode', $.event.special.usermode.handler);
                return true;
            },
            handler: function (e) {
                e.type = 'usermode';
                e.disabled = !userBg;
                e.enabled = userBg;
                return jQuery.event.handle.apply(this, arguments);
            }
        };
        return {
            get: testBg
        };
    })();
    $.fn.userMode = function (fn) {
        return this[(fn) ? 'bind' : 'trigger']('usermode', fn);
    };
    $(function () {
        $('html').userMode(function (e) {
            $('html')[e.enabled ? 'addClass' : 'removeClass']('hcm');
        });
    });
})(jQuery);
(function ($) {
    $.bind = function (object, method) {
        var args = Array.prototype.slice.call(arguments, 2);
        if (args.length) {
            return function () {
                var args2 = [this].concat(args, $.makeArray(arguments));
                return method.apply(object, args2);
            };
        } else {
            return function () {
                var args2 = [this].concat($.makeArray(arguments));
                return method.apply(object, args2);
            };
        }
    };
})(jQuery);
(function ($) {
    var baseClasses = /ui-checkbox|ui-radio/;
    $.widget('ui.checkBox', {
        options: {
            hideInput: true,
            addVisualElement: true,
            addLabel: true,
            _delegated: false
        },
        _create: function () {
            var that = this,
                opts = this.options;
            if (!this.element.is(':radio,:checkbox')) {
                if ($.nodeName(this.element[0], 'input')) {
                    return false;
                }
                this._addDelegate();
                this.updateContainer();
                return false;
            }
            this.labels = $([]);
            this.checkedStatus = false;
            this.disabledStatus = false;
            this.hoverStatus = false;
            this.radio = (this.element.is(':radio'));
            this.visualElement = $([]);
            if (opts.hideInput) {
                this.element.addClass('ui-helper-hidden-accessible');
                if (opts.addVisualElement) {
                    this.visualElement = $('<span />').addClass(this.radio ? 'ui-radio' : 'ui-checkbox');
                    this.element.after(this.visualElement[0]);
                }
            }
            if (opts.addLabel) {
                this.labels = $('label[for=' + this.element.attr('id') + ']').addClass(this.radio ? 'ui-radio' : 'ui-checkbox');
            }
            if (!opts._delegated) {
                this._addEvents();
            }
            this.initialized = true;
            this.reflectUI({
                type: 'initialReflect'
            });
            return undefined;
        },
        updateContainer: function () {
            if (!this.element.is(':radio,:checkbox') && !$.nodeName(this.element[0], 'input')) {
                $('input', this.element[0]).filter(function () {
                    return !($.data(this, 'checkBox'));
                }).checkBox($.extend({}, this.options, {
                    _delegated: true
                }));
            }
        },
        _addDelegate: function () {
            var opts = this.options,
                toggleHover = function (e, that) {
                    if (!that) {
                        return;
                    }
                    that.hover = !! (e.type == 'focus' || e.type == 'mouseenter' || e.type == 'focusin' || e.type == 'mouseover');
                    that._changeStateClassChain.call(that);
                    return undefined;
                };
            this.element.bind('click', function (e) {
                if (!$.nodeName(e.target, 'input')) {
                    return;
                }
                var inst = ($.data(e.target) || {}).checkBox;
                if (!inst) {
                    return;
                }
                inst.reflectUI.call(inst, e.target, e);
            }).bind('focusin.checkBox focusout.checkBox', function (e) {
                if (!$.nodeName(e.target, 'input')) {
                    return;
                }
                var inst = ($.data(e.target) || {}).checkBox;
                toggleHover(e, inst);
            });
            if (opts.hideInput) {
                this.element.bind('usermode', function (e) {
                    if (!e.enabled) {
                        return;
                    }
                    $('input', this).each(function () {
                        var inst = ($.data(this) || {}).checkBox;
                        (inst && inst.destroy.call(inst, true));
                    });
                });
            }
            if (opts.addVisualElement) {
                this.element.bind('mouseover.checkBox mouseout.checkBox', function (e) {
                    if (!$.nodeName(e.target, 'span')) {
                        return;
                    }
                    var inst = ($.data($(e.target).prev()[0]) || {}).checkBox;
                    toggleHover(e, inst);
                }).bind('click.checkBox', function (e) {
                    if (!$.nodeName(e.target, 'span') || !baseClasses.test(e.target.className || '')) {
                        return;
                    }
                    $(e.target).prev()[0].click();
                    return false;
                });
            }
            if (opts.addLabel) {
                this.element.delegate('label.ui-radio, label.ui-checkbox', 'mouseenter.checkBox mouseleave.checkBox', function (e) {
                    var inst = ($.data(document.getElementById($(this).attr('for'))) || {}).checkBox;
                    toggleHover(e, inst);
                });
            }
        },
        _addEvents: function () {
            var that = this,
                opts = this.options,
                toggleHover = function (e) {
                    if (that.disabledStatus) {
                        return false;
                    }
                    that.hover = (e.type == 'focus' || e.type == 'mouseenter');
                    that._changeStateClassChain();
                    return undefined;
                };
            this.element.bind('click.checkBox', $.proxy(this, 'reflectUI')).bind('focus.checkBox blur.checkBox', toggleHover);
            if (opts.hideInput) {
                this.element.bind('usermode', function (e) {
                    (e.enabled && that.destroy.call(that, true));
                });
            }
            if (opts.addVisualElement) {
                this.visualElement.bind('mouseenter.checkBox mouseleave.checkBox', toggleHover).bind('click.checkBox', function (e) {
                    that.element[0].click();
                    return false;
                });
            }
            if (opts.addLabel) {
                this.labels.bind('mouseenter.checkBox mouseleave.checkBox', toggleHover);
            }
        },
        _changeStateClassChain: function () {
            var allElements = this.labels.add(this.visualElement),
                stateClass = '',
                baseClass = 'ui-' + ((this.radio) ? 'radio' : 'checkbox');
            if (this.checkedStatus) {
                stateClass += '-checked';
                allElements.addClass(baseClass + '-checked');
            } else {
                allElements.removeClass(baseClass + '-checked');
            }
            if (this.disabledStatus) {
                stateClass += '-disabled';
                allElements.addClass(baseClass + '-disabled');
            } else {
                allElements.removeClass(baseClass + '-disabled');
            }
            if (this.hover) {
                stateClass += '-hover';
                allElements.addClass(baseClass + '-hover');
            } else {
                allElements.removeClass(baseClass + '-hover');
            }
            baseClass += '-state';
            if (stateClass) {
                stateClass = baseClass + stateClass;
            }

            function switchStateClass() {
                var classes = this.className.split(' '),
                    found = false;
                $.each(classes, function (i, classN) {
                    if (classN.indexOf(baseClass) === 0) {
                        found = true;
                        classes[i] = stateClass;
                        return false;
                    }
                    return undefined;
                });
                if (!found) {
                    classes.push(stateClass);
                }
                this.className = classes.join(' ');
            }
            this.labels.each(switchStateClass);
            this.visualElement.each(switchStateClass);
        },
        destroy: function (onlyCss) {
            this.element.removeClass('ui-helper-hidden-accessible');
            this.visualElement.addClass('ui-helper-hidden');
            if (!onlyCss) {
                var o = this.options;
                this.element.unbind('.checkBox');
                this.visualElement.remove();
                this.labels.unbind('.checkBox').removeClass('ui-state-hover ui-state-checked ui-state-disabled');
            }
        },
        disable: function () {
            this.element[0].disabled = true;
            this.reflectUI({
                type: 'manuallyDisabled'
            });
        },
        enable: function () {
            this.element[0].disabled = false;
            this.reflectUI({
                type: 'manuallyenabled'
            });
        },
        toggle: function (e) {
            this.changeCheckStatus((this.element.is(':checked')) ? false : true, e);
        },
        changeCheckStatus: function (status, e) {
            if (e && e.type == 'click' && this.element[0].disabled) {
                return false;
            }
            this.element.attr({
                'checked': status
            });
            this.reflectUI(e || {
                type: 'changeCheckStatus'
            });
            return undefined;
        },
        propagate: function (n, e, _noGroupReflect) {
            if (!e || e.type != 'initialReflect') {
                if (this.radio && !_noGroupReflect) {
                    $(document.getElementsByName(this.element.attr('name'))).checkBox('reflectUI', e, true);
                }
                return this._trigger(n, e, {
                    options: this.options,
                    checked: this.checkedStatus,
                    labels: this.labels,
                    disabled: this.disabledStatus
                });
            }
            return undefined;
        },
        reflectUI: function (e) {
            var oldChecked = this.checkedStatus,
                oldDisabledStatus = this.disabledStatus;
            this.disabledStatus = this.element.is(':disabled');
            this.checkedStatus = this.element.is(':checked');
            if (this.disabledStatus != oldDisabledStatus || this.checkedStatus !== oldChecked) {
                this._changeStateClassChain();
                (this.disabledStatus != oldDisabledStatus && this.propagate('disabledChange', e));
                (this.checkedStatus !== oldChecked && this.propagate('change', e));
            }
        }
    });
})(jQuery);
jQuery.fn.mousehold = function (timeout, f) {
    if (timeout && typeof timeout == 'function') {
        f = timeout;
        timeout = 100;
    }
    if (f && typeof f == 'function') {
        var timer = 0;
        var fireStep = 0;
        return this.each(function () {
            jQuery(this).unbind('mousedown').bind('mousedown', function () {
                fireStep = 1;
                var ctr = 0;
                var t = this;
                timer = setInterval(function () {
                    ctr++;
                    f.call(t, ctr);
                    fireStep = 2;
                }, timeout);
            })
            clearMousehold = function () {
                clearInterval(timer);
                if (fireStep == 1) f.call(this, 1);
                fireStep = 0;
            }
            jQuery(this).unbind('mouseout').bind('mouseout', clearMousehold);
            jQuery(this).unbind('mouseup').bind('mouseup', clearMousehold);
        })
    }
}
jwplayer = function (a) {
    return jwplayer.constructor(a)
};
jwplayer.constructor = function (a) {};
$jw = jwplayer;
jwplayer.utils = function () {};
jwplayer.utils.typeOf = function (b) {
    var a = typeof b;
    if (a === "object") {
        if (b) {
            if (b instanceof Array) {
                a = "array"
            }
        } else {
            a = "null"
        }
    }
    return a
};
jwplayer.utils.extend = function () {
    var a = jwplayer.utils.extend["arguments"];
    if (a.length > 1) {
        for (var b = 1; b < a.length; b++) {
            for (element in a[b]) {
                a[0][element] = a[b][element]
            }
        }
        return a[0]
    }
    return null
};
jwplayer.utils.extension = function (a) {
    return a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase()
};
jwplayer.utils.html = function (a, b) {
    a.innerHTML = b
};
jwplayer.utils.append = function (a, b) {
    a.appendChild(b)
};
jwplayer.utils.wrap = function (a, b) {
    a.parentNode.replaceChild(b, a);
    b.appendChild(a)
};
jwplayer.utils.ajax = function (d, c, a) {
    var b;
    if (window.XMLHttpRequest) {
        b = new XMLHttpRequest()
    } else {
        b = new ActiveXObject("Microsoft.XMLHTTP")
    }
    b.onreadystatechange = function () {
        if (b.readyState === 4) {
            if (b.status === 200) {
                if (c) {
                    c(b)
                }
            } else {
                if (a) {
                    a(d)
                }
            }
        }
    };
    b.open("GET", d, true);
    b.send(null);
    return b
};
jwplayer.utils.load = function (b, c, a) {
    b.onreadystatechange = function () {
        if (b.readyState === 4) {
            if (b.status === 200) {
                if (c) {
                    c()
                }
            } else {
                if (a) {
                    a()
                }
            }
        }
    }
};
jwplayer.utils.find = function (b, a) {
    return b.getElementsByTagName(a)
};
jwplayer.utils.append = function (a, b) {
    a.appendChild(b)
};
jwplayer.utils.isIE = function () {
    return (!+"\v1")
};
jwplayer.utils.isIOS = function () {
    var a = navigator.userAgent.toLowerCase();
    return (a.match(/iP(hone|ad)/i) !== null)
};
jwplayer.utils.hasHTML5 = function (b) {
    var a = document.createElement("video");
    if ( !! a.canPlayType) {
        if (b) {
            var d = {};
            if (b.playlist && b.playlist.length) {
                d.file = b.playlist[0].file;
                d.levels = b.playlist[0].levels
            } else {
                d.file = b.file;
                d.levels = b.levels
            }
            if (d.file) {
                return jwplayer.utils.vidCanPlay(a, d.file)
            } else {
                if (d.levels && d.levels.length) {
                    for (var c = 0; c < d.levels.length; c++) {
                        if (d.levels[c].file && jwplayer.utils.vidCanPlay(a, d.levels[c].file)) {
                            return true
                        }
                    }
                }
            }
        } else {
            return true
        }
    }
    return false
};
jwplayer.utils.vidCanPlay = function (b, a) {
    var c = jwplayer.utils.strings.extension(a);
    if (jwplayer.utils.extensionmap[c] !== undefined) {
        sourceType = jwplayer.utils.extensionmap[c]
    } else {
        sourceType = "video/" + c + ";"
    }
    return (b.canPlayType(sourceType) || a.toLowerCase().indexOf("youtube.com") > -1)
};
jwplayer.utils.hasFlash = function () {
    return (typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] != "undefined") || (typeof window.ActiveXObject != "undefined")
};
(function (e) {
    e.utils.mediaparser = function () {};
    var g = {
        element: {
            width: "width",
            height: "height",
            id: "id",
            "class": "className",
            name: "name"
        },
        media: {
            src: "file",
            preload: "preload",
            autoplay: "autostart",
            loop: "repeat",
            controls: "controls"
        },
        source: {
            src: "file",
            type: "type",
            media: "media",
            "data-jw-width": "width",
            "data-jw-bitrate": "bitrate"
        },
        video: {
            poster: "image"
        }
    };
    var f = {};
    e.utils.mediaparser.parseMedia = function (i) {
        return d(i)
    };

    function c(j, i) {
        if (i === undefined) {
            i = g[j]
        } else {
            e.utils.extend(i, g[j])
        }
        return i
    }
    function d(m, i) {
        if (f[m.tagName.toLowerCase()] && (i === undefined)) {
            return f[m.tagName.toLowerCase()](m)
        } else {
            i = c("element", i);
            var n = {};
            for (var j in i) {
                if (j != "length") {
                    var l = m.getAttribute(j);
                    if (!(l === "" || l === undefined || l === null)) {
                        n[i[j]] = m.getAttribute(j)
                    }
                }
            }
            var k = m.style["#background-color"];
            if (k && !(k == "transparent" || k == "rgba(0, 0, 0, 0)")) {
                n.screencolor = k
            }
            return n
        }
    }
    function h(o, k) {
        k = c("media", k);
        var m = [];
        if (e.utils.isIE()) {
            var l = o.nextSibling;
            if (l !== undefined) {
                while (l.tagName.toLowerCase() == "source") {
                    m.push(a(l));
                    l = l.nextSibling
                }
            }
        } else {
            var j = e.utils.selectors("source", o);
            for (var n in j) {
                if (!isNaN(n)) {
                    m.push(a(j[n]))
                }
            }
        }
        var p = d(o, k);
        if (p.file !== undefined) {
            m[0] = {
                file: p.file
            }
        }
        p.levels = m;
        return p
    }
    function a(k, j) {
        j = c("source", j);
        var i = d(k, j);
        i.width = i.width ? i.width : 0;
        i.bitrate = i.bitrate ? i.bitrate : 0;
        return i
    }
    function b(k, j) {
        j = c("video", j);
        var i = h(k, j);
        return i
    }
    e.utils.mediaparser.replaceMediaElement = function (i, k) {
        if (e.utils.isIE()) {
            var l = false;
            var n = [];
            var m = i.nextSibling;
            while (m && !l) {
                n.push(m);
                if (m.nodeType == 1 && m.tagName.toLowerCase() == ("/") + i.tagName.toLowerCase()) {
                    l = true
                }
                m = m.nextSibling
            }
            if (l) {
                while (n.length > 0) {
                    var j = n.pop();
                    j.parentNode.removeChild(j)
                }
            }
            i.outerHTML = k
        }
    };
    f.media = h;
    f.audio = h;
    f.source = a;
    f.video = b
})(jwplayer);
jwplayer.utils.selectors = function (a, c) {
    if (c === undefined) {
        c = document
    }
    a = jwplayer.utils.strings.trim(a);
    var b = a.charAt(0);
    if (b == "#") {
        return c.getElementById(a.substr(1))
    } else {
        if (b == ".") {
            if (c.getElementsByClassName) {
                return c.getElementsByClassName(a.substr(1))
            } else {
                return jwplayer.utils.selectors.getElementsByTagAndClass("*", a.substr(1))
            }
        } else {
            if (a.indexOf(".") > 0) {
                selectors = a.split(".");
                return jwplayer.utils.selectors.getElementsByTagAndClass(selectors[0], selectors[1])
            } else {
                return c.getElementsByTagName(a)
            }
        }
    }
    return null
};
jwplayer.utils.selectors.getElementsByTagAndClass = function (d, g, f) {
    elements = [];
    if (f === undefined) {
        f = document
    }
    var e = f.getElementsByTagName(d);
    for (var c = 0; c < e.length; c++) {
        if (e[c].className !== undefined) {
            var b = e[c].className.split(" ");
            for (var a = 0; a < b.length; a++) {
                if (b[a] == g) {
                    elements.push(e[c])
                }
            }
        }
    }
    return elements
};
jwplayer.utils.strings = function () {};
jwplayer.utils.strings.trim = function (a) {
    return a.replace(/^\s*/, "").replace(/\s*$/, "")
};
jwplayer.utils.strings.extension = function (a) {
    return a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase()
};
(function (a) {
    a.utils.extensionmap = {
        "3gp": "video/3gpp",
        "3gpp": "video/3gpp",
        "3g2": "video/3gpp2",
        "3gpp2": "video/3gpp2",
        flv: "video/x-flv",
        f4a: "audio/mp4",
        f4b: "audio/mp4",
        f4p: "video/mp4",
        f4v: "video/mp4",
        mov: "video/quicktime",
        m4a: "audio/mp4",
        m4b: "audio/mp4",
        m4p: "audio/mp4",
        m4v: "video/mp4",
        mkv: "video/x-matroska",
        mp4: "video/mp4",
        sdp: "application/sdp",
        vp6: "video/x-vp6",
        aac: "audio/aac",
        mp3: "audio/mp3",
        ogg: "audio/ogg",
        ogv: "video/ogg",
        webm: "video/webm"
    }
})(jwplayer);
(function (b) {
    var a = [];
    b.constructor = function (c) {
        return b.api.selectPlayer(c)
    };
    b.api = function () {};
    b.api.events = {
        API_READY: "jwplayerAPIReady",
        JWPLAYER_READY: "jwplayerReady",
        JWPLAYER_FULLSCREEN: "jwplayerFullscreen",
        JWPLAYER_RESIZE: "jwplayerResize",
        JWPLAYER_ERROR: "jwplayerError",
        JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer",
        JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull",
        JWPLAYER_MEDIA_ERROR: "jwplayerMediaError",
        JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded",
        JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete",
        JWPLAYER_MEDIA_TIME: "jwplayerMediaTime",
        JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
        JWPLAYER_MEDIA_META: "jwplayerMediaMeta",
        JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute",
        JWPLAYER_PLAYER_STATE: "jwplayerPlayerState",
        JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded",
        JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem"
    };
    b.api.events.state = {
        BUFFERING: "BUFFERING",
        IDLE: "IDLE",
        PAUSED: "PAUSED",
        PLAYING: "PLAYING"
    };
    b.api.PlayerAPI = function (d) {
        this.container = d;
        this.id = d.id;
        var j = {};
        var o = {};
        var c = [];
        var g = undefined;
        var i = false;
        var h = [];
        var m = d.outerHTML;
        var n = {};
        var k = 0;
        this.setPlayer = function (p) {
            g = p
        };
        this.stateListener = function (p, q) {
            if (!o[p]) {
                o[p] = [];
                this.eventListener(b.api.events.JWPLAYER_PLAYER_STATE, f(p))
            }
            o[p].push(q);
            return this
        };

        function f(p) {
            return function (r) {
                var q = r.newstate,
                    t = r.oldstate;
                if (q == p) {
                    var s = o[q];
                    if (s) {
                        for (var u in s) {
                            if (typeof s[u] == "function") {
                                s[u].call(this, {
                                    oldstate: t,
                                    newstate: q
                                })
                            }
                        }
                    }
                }
            }
        }
        this.addInternalListener = function (p, q) {
            p.jwAddEventListener(q, 'function(dat) { jwplayer("' + this.id + '").dispatchEvent("' + q + '", dat); }')
        };
        this.eventListener = function (p, q) {
            if (!j[p]) {
                j[p] = [];
                if (g && i) {
                    this.addInternalListener(g, p)
                }
            }
            j[p].push(q);
            return this
        };
        this.dispatchEvent = function (r) {
            if (j[r]) {
                var q = e(r, arguments[1]);
                for (var p in j[r]) {
                    if (typeof j[r][p] == "function") {
                        j[r][p].call(this, q)
                    }
                }
            }
        };

        function e(q, p) {
            var r = b.utils.extend({}, p);
            if (q == b.api.events.JWPLAYER_FULLSCREEN) {
                r.fullscreen = r.message;
                delete r.message
            } else {
                if (q == b.api.events.JWPLAYER_PLAYLIST_ITEM) {
                    if (r.item && r.index === undefined) {
                        r.index = r.item;
                        delete r.item
                    }
                } else {
                    if (typeof r.data == "object") {
                        r = b.utils.extend(r, r.data);
                        delete r.data
                    }
                }
            }
            return r
        }
        this.callInternal = function (q, p) {
            if (i) {
                if (typeof g != "undefined" && typeof g[q] == "function") {
                    if (p !== undefined) {
                        return (g[q])(p)
                    } else {
                        return (g[q])()
                    }
                }
                return null
            } else {
                h.push({
                    method: q,
                    parameters: p
                })
            }
        };
        this.playerReady = function (r) {
            i = true;
            if (!g) {
                this.setPlayer(document.getElementById(r.id))
            }
            this.container = document.getElementById(this.id);
            for (var p in j) {
                this.addInternalListener(g, p)
            }
            this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM, function (s) {
                if (s.index !== undefined) {
                    k = s.index
                } else {
                    if (s.item !== undefined) {
                        k = s.item
                    }
                }
                n = {}
            });
            this.eventListener(b.api.events.JWPLAYER_MEDIA_META, function (s) {
                b.utils.extend(n, s.metadata)
            });
            this.dispatchEvent(b.api.events.API_READY);
            while (h.length > 0) {
                var q = h.shift();
                this.callInternal(q.method, q.parameters)
            }
        };
        this.getItemMeta = function () {
            return n
        };
        this.getCurrentItem = function () {
            return k
        };
        this.destroy = function () {
            j = {};
            h = [];
            if (this.container.outerHTML != m) {
                b.api.destroyPlayer(this.id, m)
            }
        };

        function l(r, t, s) {
            var p = [];
            if (!t) {
                t = 0
            }
            if (!s) {
                s = r.length - 1
            }
            for (var q = t; q <= s; q++) {
                p.push(r[q])
            }
            return p
        }
    };
    b.api.PlayerAPI.prototype = {
        container: undefined,
        options: undefined,
        id: undefined,
        getBuffer: function () {
            return this.callInternal("jwGetBuffer")
        },
        getDuration: function () {
            return this.callInternal("jwGetDuration")
        },
        getFullscreen: function () {
            return this.callInternal("jwGetFullscreen")
        },
        getHeight: function () {
            return this.callInternal("jwGetHeight")
        },
        getLockState: function () {
            return this.callInternal("jwGetLockState")
        },
        getMeta: function () {
            return this.getItemMeta()
        },
        getMute: function () {
            return this.callInternal("jwGetMute")
        },
        getPlaylist: function () {
            var d = this.callInternal("jwGetPlaylist");
            for (var c = 0; c < d.length; c++) {
                if (d[c].index === undefined) {
                    d[c].index = c
                }
            }
            return d
        },
        getPlaylistItem: function (c) {
            if (c == undefined) {
                c = this.getCurrentItem()
            }
            return this.getPlaylist()[c]
        },
        getPosition: function () {
            return this.callInternal("jwGetPosition")
        },
        getState: function () {
            return this.callInternal("jwGetState")
        },
        getVolume: function () {
            return this.callInternal("jwGetVolume")
        },
        getWidth: function () {
            return this.callInternal("jwGetWidth")
        },
        setFullscreen: function (c) {
            if (c === undefined) {
                this.callInternal("jwSetFullscreen", true)
            } else {
                this.callInternal("jwSetFullscreen", c)
            }
            return this
        },
        setMute: function (c) {
            if (c === undefined) {
                this.callInternal("jwSetMute", true)
            } else {
                this.callInternal("jwSetMute", c)
            }
            return this
        },
        lock: function () {
            return this
        },
        unlock: function () {
            return this
        },
        load: function (c) {
            this.callInternal("jwLoad", c);
            return this
        },
        playlistItem: function (c) {
            this.callInternal("jwPlaylistItem", c);
            return this
        },
        playlistPrev: function () {
            this.callInternal("jwPlaylistPrev");
            return this
        },
        playlistNext: function () {
            this.callInternal("jwPlaylistNext");
            return this
        },
        resize: function (d, c) {
            this.container.width = d;
            this.container.height = c;
            return this
        },
        play: function (c) {
            if (typeof c === "undefined") {
                var c = this.getState();
                if (c == b.api.events.state.PLAYING || c == b.api.events.state.BUFFERING) {
                    this.callInternal("jwPause")
                } else {
                    this.callInternal("jwPlay")
                }
            } else {
                this.callInternal("jwPlay", c)
            }
            return this
        },
        pause: function () {
            var c = this.getState();
            switch (c) {
            case b.api.events.state.PLAYING:
            case b.api.events.state.BUFFERING:
                this.callInternal("jwPause");
                break;
            case b.api.events.state.PAUSED:
                this.callInternal("jwPlay");
                break
            }
            return this
        },
        stop: function () {
            this.callInternal("jwStop");
            return this
        },
        seek: function (c) {
            this.callInternal("jwSeek", c);
            return this
        },
        setVolume: function (c) {
            this.callInternal("jwSetVolume", c);
            return this
        },
        onBufferChange: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER, c)
        },
        onBufferFull: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL, c)
        },
        onError: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_ERROR, c)
        },
        onFullscreen: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_FULLSCREEN, c)
        },
        onMeta: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_META, c)
        },
        onMute: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_MUTE, c)
        },
        onPlaylist: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED, c)
        },
        onPlaylistItem: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM, c)
        },
        onReady: function (c) {
            return this.eventListener(b.api.events.API_READY, c)
        },
        onResize: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_RESIZE, c)
        },
        onComplete: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE, c)
        },
        onTime: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_TIME, c)
        },
        onVolume: function (c) {
            return this.eventListener(b.api.events.JWPLAYER_MEDIA_VOLUME, c)
        },
        onBuffer: function (c) {
            return this.stateListener(b.api.events.state.BUFFERING, c)
        },
        onPause: function (c) {
            return this.stateListener(b.api.events.state.PAUSED, c)
        },
        onPlay: function (c) {
            return this.stateListener(b.api.events.state.PLAYING, c)
        },
        onIdle: function (c) {
            return this.stateListener(b.api.events.state.IDLE, c)
        },
        setup: function (c) {
            return this
        },
        remove: function () {
            this.destroy()
        },
        initializePlugin: function (c, d) {
            return this
        }
    };
    b.api.selectPlayer = function (d) {
        var c;
        if (d == undefined) {
            d = 0
        }
        if (d.nodeType) {
            c = d
        } else {
            if (typeof d == "string") {
                c = document.getElementById(d)
            }
        }
        if (c) {
            var e = b.api.playerById(c.id);
            if (e) {
                return e
            } else {
                return b.api.addPlayer(new b.api.PlayerAPI(c))
            }
        } else {
            if (typeof d == "number") {
                return b.getPlayers()[d]
            }
        }
        return null
    };
    b.api.playerById = function (d) {
        for (var c in a) {
            if (a[c].id == d) {
                return a[c]
            }
        }
        return null
    };
    b.api.addPlayer = function (d) {
        for (var c in a) {
            if (a[c] == d) {
                return d
            }
        }
        a.push(d);
        return d
    };
    b.api.destroyPlayer = function (f, d) {
        var e = -1;
        for (var h in a) {
            if (a[h].id == f) {
                e = h;
                continue
            }
        }
        if (e >= 0) {
            var c = document.getElementById(a[e].id);
            if (c) {
                if (d) {
                    c.outerHTML = d
                } else {
                    var g = document.createElement("div");
                    g.setAttribute("id", c.id);
                    c.parentNode.replaceChild(g, c)
                }
            }
            a.splice(e, 1)
        }
        return null
    };
    b.getPlayers = function () {
        return a.slice(0)
    }
})(jwplayer);
var _userPlayerReady = (typeof playerReady == "function") ? playerReady : undefined;
playerReady = function (b) {
    var a = jwplayer.api.playerById(b.id);
    if (a) {
        a.playerReady(b)
    }
    if (_userPlayerReady) {
        _userPlayerReady.call(this, b)
    }
};
(function (a) {
    a.embed = function () {};
    a.embed.Embedder = function (c) {
        this.constructor(c)
    };
    a.embed.defaults = {
        width: 400,
        height: 300,
        players: [{
            type: "flash",
            src: "player.swf"
        }, {
            type: "html5"
        }],
        components: {
            controlbar: {
                position: "over"
            }
        }
    };
    a.embed.Embedder.prototype = {
        config: undefined,
        api: undefined,
        events: {},
        players: undefined,
        constructor: function (d) {
            this.api = d;
            var c = a.utils.mediaparser.parseMedia(this.api.container);
            this.config = this.parseConfig(a.utils.extend({}, a.embed.defaults, c, this.api.config))
        },
        embedPlayer: function () {
            var c = this.players[0];
            if (c && c.type) {
                switch (c.type) {
                case "flash":
                    if (a.utils.hasFlash()) {
                        if (this.config.file && !this.config.provider) {
                            switch (a.utils.extension(this.config.file).toLowerCase()) {
                            case "webm":
                            case "ogv":
                            case "ogg":
                                this.config.provider = "video";
                                break
                            }
                        }
                        if (this.config.levels || this.config.playlist) {
                            this.api.onReady(this.loadAfterReady(this.config))
                        }
                        this.config.id = this.api.id;
                        var e = a.embed.embedFlash(document.getElementById(this.api.id), c, this.config);
                        this.api.container = e;
                        this.api.setPlayer(e)
                    } else {
                        this.players.splice(0, 1);
                        return this.embedPlayer()
                    }
                    break;
                case "html5":
                    if (a.utils.hasHTML5(this.config)) {
                        var d = a.embed.embedHTML5(document.getElementById(this.api.id), c, this.config);
                        this.api.container = document.getElementById(this.api.id);
                        this.api.setPlayer(d)
                    } else {
                        this.players.splice(0, 1);
                        return this.embedPlayer()
                    }
                    break
                }
            } else {
                this.api.container.innerHTML = "<p>No suitable players found</p>"
            }
            this.setupEvents();
            return this.api
        },
        setupEvents: function () {
            for (evt in this.events) {
                if (typeof this.api[evt] == "function") {
                    (this.api[evt]).call(this.api, this.events[evt])
                }
            }
        },
        loadAfterReady: function (c) {
            return function (e) {
                if (c.playlist) {
                    this.load(c.playlist)
                } else {
                    if (c.levels) {
                        var d = this.getPlaylistItem(0);
                        if (!d) {
                            d = {
                                file: c.levels[0].file,
                                provider: (c.provider ? c.provider : "video")
                            }
                        }
                        if (!d.image) {
                            d.image = c.image
                        }
                        d.levels = c.levels;
                        this.load(d)
                    }
                }
            }
        },
        parseConfig: function (c) {
            var d = a.utils.extend({}, c);
            if (d.events) {
                this.events = d.events;
                delete d.events
            }
            if (d.players) {
                this.players = d.players;
                delete d.players
            }
            if (d.plugins) {
                if (typeof d.plugins == "object") {
                    d = a.utils.extend(d, a.embed.parsePlugins(d.plugins))
                }
            }
            if (d.playlist && typeof d.playlist === "string" && !d["playlist.position"]) {
                d["playlist.position"] = d.playlist;
                delete d.playlist
            }
            if (d.controlbar && typeof d.controlbar === "string" && !d["controlbar.position"]) {
                d["controlbar.position"] = d.controlbar;
                delete d.controlbar
            }
            return d
        }
    };
    a.embed.embedFlash = function (e, i, d) {
        var j = a.utils.extend({}, d);
        var g = j.width;
        delete j.width;
        var c = j.height;
        delete j.height;
        delete j.levels;
        delete j.playlist;
        a.embed.parseConfigBlock(j, "components");
        a.embed.parseConfigBlock(j, "providers");
        if (a.utils.isIE()) {
            var f = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + g + '" height="' + c + '" id="' + e.id + '" name="' + e.id + '">';
            f += '<param name="movie" value="' + i.src + '">';
            f += '<param name="allowfullscreen" value="true">';
            f += '<param name="allowscriptaccess" value="always">';
            f += '<param name="wmode" value="opaque">';
            f += '<param name="flashvars" value="' + a.embed.jsonToFlashvars(j) + '">';
            f += "</object>";
            if (e.tagName.toLowerCase() == "video") {
                a.utils.mediaparser.replaceMediaElement(e, f)
            } else {
                e.outerHTML = f
            }
            return document.getElementById(e.id)
        } else {
            var h = document.createElement("object");
            h.setAttribute("type", "application/x-shockwave-flash");
            h.setAttribute("data", i.src);
            h.setAttribute("width", g);
            h.setAttribute("height", c);
            h.setAttribute("id", e.id);
            h.setAttribute("name", e.id);
            a.embed.appendAttribute(h, "allowfullscreen", "true");
            a.embed.appendAttribute(h, "allowscriptaccess", "always");
            a.embed.appendAttribute(h, "wmode", "opaque");
            a.embed.appendAttribute(h, "flashvars", a.embed.jsonToFlashvars(j));
            e.parentNode.replaceChild(h, e);
            return h
        }
    };
    a.embed.embedHTML5 = function (d, f, e) {
        if (a.html5) {
            d.innerHTML = "";
            var c = a.utils.extend({
                screencolor: "0x000000"
            }, e);
            a.embed.parseConfigBlock(c, "components");
            if (c.levels && !c.sources) {
                c.sources = e.levels
            }
            if (c.skin && c.skin.toLowerCase().indexOf(".zip") > 0) {
                c.skin = c.skin.replace(/\.zip/i, ".xml")
            }
            return new(a.html5(d)).setup(c)
        } else {
            return null
        }
    };
    a.embed.appendAttribute = function (d, c, e) {
        var f = document.createElement("param");
        f.setAttribute("name", c);
        f.setAttribute("value", e);
        d.appendChild(f)
    };
    a.embed.jsonToFlashvars = function (d) {
        var c = "";
        for (key in d) {
            c += key + "=" + escape(d[key]) + "&"
        }
        return c.substring(0, c.length - 1)
    };
    a.embed.parsePlugins = function (e) {
        if (!e) {
            return {}
        }
        var g = {},
            f = [];
        for (plugin in e) {
            var d = plugin.indexOf("-") > 0 ? plugin.substring(0, plugin.indexOf("-")) : plugin;
            var c = e[plugin];
            f.push(plugin);
            for (param in c) {
                g[d + "." + param] = c[param]
            }
        }
        g.plugins = f.join(",");
        return g
    };
    a.embed.parseConfigBlock = function (f, e) {
        if (f[e]) {
            var h = f[e];
            for (var d in h) {
                var c = h[d];
                if (typeof c == "string") {
                    if (!f[d]) {
                        f[d] = c
                    }
                } else {
                    for (var g in c) {
                        if (!f[d + "." + g]) {
                            f[d + "." + g] = c[g]
                        }
                    }
                }
            }
            delete f[e]
        }
    };
    a.api.PlayerAPI.prototype.setup = function (d, e) {
        if (d && d.flashplayer && !d.players) {
            d.players = [{
                type: "flash",
                src: d.flashplayer
            }, {
                type: "html5"
            }];
            delete d.flashplayer
        }
        if (e && !d.players) {
            if (typeof e == "string") {
                d.players = [{
                    type: "flash",
                    src: e
                }]
            } else {
                if (e instanceof Array) {
                    d.players = e
                } else {
                    if (typeof e == "object" && e.type) {
                        d.players = [e]
                    }
                }
            }
        }
        var c = this.id;
        this.remove();
        var f = a(c);
        f.config = d;
        return (new a.embed.Embedder(f)).embedPlayer()
    };

    function b() {
        if (!document.body) {
            return setTimeout(b, 15)
        }
        var c = a.utils.selectors.getElementsByTagAndClass("video", "jwplayer");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            a(e.id).setup({
                players: [{
                    type: "flash",
                    src: "/jwplayer/player.swf"
                }, {
                    type: "html5"
                }]
            })
        }
    }
    b()
})(jwplayer);
(function (a) {
    a.html5 = function (b) {
        var c = b;
        this.setup = function (d) {
            a.utils.extend(this, new a.html5.api(c, d));
            return this
        };
        return this
    };
    a.html5.version = "5.3"
})(jwplayer);
(function (b) {
    b.html5.utils = function () {};
    b.html5.utils.extension = function (d) {
        return d.substr(d.lastIndexOf(".") + 1, d.length).toLowerCase()
    };
    b.html5.utils.getAbsolutePath = function (j) {
        if (j === undefined) {
            return undefined
        }
        if (a(j)) {
            return j
        }
        var k = document.location.href.substring(0, document.location.href.indexOf("://") + 3);
        var h = document.location.href.substring(k.length, document.location.href.indexOf("/", k.length + 1));
        var e;
        if (j.indexOf("/") === 0) {
            e = j.split("/")
        } else {
            var f = document.location.href.split("?")[0];
            f = f.substring(k.length + h.length + 1, f.lastIndexOf("/"));
            e = f.split("/").concat(j.split("/"))
        }
        var d = [];
        for (var g = 0; g < e.length; g++) {
            if (!e[g] || e[g] === undefined || e[g] == ".") {
                continue
            } else {
                if (e[g] == "..") {
                    d.pop()
                } else {
                    d.push(e[g])
                }
            }
        }
        return k + h + "/" + d.join("/")
    };

    function a(e) {
        if (e === null) {
            return
        }
        var f = e.indexOf("://");
        var d = e.indexOf("?");
        return (f > 0 && (d < 0 || (d > f)))
    }
    b.html5.utils.mapEmpty = function (d) {
        for (var e in d) {
            return false
        }
        return true
    };
    b.html5.utils.mapLength = function (e) {
        var d = 0;
        for (var f in e) {
            d++
        }
        return d
    };
    b.html5.utils.log = function (e, d) {
        if (typeof console != "undefined" && typeof console.log != "undefined") {
            if (d) {
                console.log(e, d)
            } else {
                console.log(e)
            }
        }
    };
    b.html5.utils.css = function (e, h, d) {
        if (e !== undefined) {
            for (var f in h) {
                try {
                    if (typeof h[f] === "undefined") {
                        continue
                    } else {
                        if (typeof h[f] == "number" && !(f == "zIndex" || f == "opacity")) {
                            if (isNaN(h[f])) {
                                continue
                            }
                            if (f.match(/color/i)) {
                                h[f] = "#" + c(h[f].toString(16), 6)
                            } else {
                                h[f] = h[f] + "px"
                            }
                        }
                    }
                    e.style[f] = h[f]
                } catch (g) {}
            }
        }
    };

    function c(d, e) {
        while (d.length < e) {
            d = "0" + d
        }
        return d
    }
    b.html5.utils.isYouTube = function (d) {
        return d.indexOf("youtube.com") > -1
    };
    b.html5.utils.getYouTubeId = function (d) {
        d.indexOf("youtube.com" > 0)
    }
})(jwplayer);
(function (b) {
    var c = b.html5.utils.css;
    b.html5.view = function (p, n, e) {
        var s = p;
        var k = n;
        var v = e;
        var u;
        var f;
        var z;
        var q;
        var A;
        var m;

        function x() {
            u = document.createElement("div");
            u.id = k.id;
            u.className = k.className;
            k.id = u.id + "_video";
            c(u, {
                position: "relative",
                height: v.height,
                width: v.width,
                padding: 0,
                backgroundColor: C(),
                zIndex: 0
            });

            function C() {
                if (s.skin.getComponentSettings("display") && s.skin.getComponentSettings("display").backgroundcolor) {
                    return s.skin.getComponentSettings("display").backgroundcolor
                }
                return parseInt("000000", 16)
            }
            c(k, {
                position: "absolute",
                width: v.width,
                height: v.height,
                top: 0,
                left: 0,
                zIndex: 1,
                margin: "auto",
                display: "block"
            });
            b.utils.wrap(k, u);
            q = document.createElement("div");
            q.id = u.id + "_displayarea";
            u.appendChild(q)
        }
        function i() {
            for (var C in v.plugins.order) {
                var D = v.plugins.order[C];
                if (v.plugins.object[D].getDisplayElement !== undefined) {
                    v.plugins.object[D].height = B(v.plugins.object[D].getDisplayElement().style.height);
                    v.plugins.object[D].width = B(v.plugins.object[D].getDisplayElement().style.width);
                    v.plugins.config[D].currentPosition = v.plugins.config[D].position
                }
            }
            t()
        }
        function t(D) {
            if (v.getMedia() !== undefined) {
                for (var C in v.plugins.order) {
                    var E = v.plugins.order[C];
                    if (v.plugins.object[E].getDisplayElement !== undefined) {
                        if (v.config.chromeless || v.getMedia().hasChrome()) {
                            v.plugins.config[E].currentPosition = b.html5.view.positions.NONE
                        } else {
                            v.plugins.config[E].currentPosition = v.plugins.config[E].position
                        }
                    }
                }
            }
            h(v.width, v.height)
        }
        function B(C) {
            if (typeof C == "number") {
                return C
            }
            if (C === "") {
                return 0
            }
            return parseInt(C.replace("px", ""), 10)
        }
        function o() {
            m = setInterval(function () {
                if (u.width && u.height && (v.width !== B(u.width) || v.height !== B(u.height))) {
                    h(B(u.width), B(u.height))
                } else {
                    var C = u.getBoundingClientRect();
                    if (v.width !== C.width || v.height !== C.height) {
                        h(C.width, C.height)
                    }
                    delete C
                }
            }, 100)
        }
        this.setup = function (C) {
            k = C;
            x();
            i();
            s.jwAddEventListener(b.api.events.JWPLAYER_MEDIA_LOADED, t);
            o();
            var D;
            if (window.onresize !== null) {
                D = window.onresize
            }
            window.onresize = function (E) {
                if (D !== undefined) {
                    try {
                        D(E)
                    } catch (F) {}
                }
                if (s.jwGetFullscreen()) {
                    v.width = window.innerWidth;
                    v.height = window.innerHeight
                }
                h(v.width, v.height)
            }
        };

        function g(C) {
            switch (C.keyCode) {
            case 27:
                if (s.jwGetFullscreen()) {
                    s.jwSetFullscreen(false)
                }
                break;
            case 32:
                if (s.jwGetState() != b.api.events.state.IDLE && s.jwGetState() != b.api.events.state.PAUSED) {
                    s.jwPause()
                } else {
                    s.jwPlay()
                }
                break
            }
        }
        function h(F, C) {
            if (u.style.display == "none") {
                return
            }
            var E = [].concat(v.plugins.order);
            E.reverse();
            A = E.length + 2;
            if (!v.fullscreen) {
                v.width = F;
                v.height = C;
                f = F;
                z = C;
                c(q, {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: F,
                    height: C
                });
                c(u, {
                    height: z,
                    width: f
                });
                var D = l(r, E);
                if (D.length > 0) {
                    A += D.length;
                    l(j, D, true)
                }
                w()
            } else {
                l(y, E, true)
            }
        }
        function l(H, E, F) {
            var D = [];
            for (var C in E) {
                var I = E[C];
                if (v.plugins.object[I].getDisplayElement !== undefined) {
                    if (v.plugins.config[I].currentPosition.toUpperCase() !== b.html5.view.positions.NONE) {
                        var G = H(I, A--);
                        if (!G) {
                            D.push(I)
                        } else {
                            v.plugins.object[I].resize(G.width, G.height);
                            if (F) {
                                delete G.width;
                                delete G.height
                            }
                            c(v.plugins.object[I].getDisplayElement(), G)
                        }
                    } else {
                        c(v.plugins.object[I].getDisplayElement(), {
                            display: "none"
                        })
                    }
                }
            }
            return D
        }
        function r(D, E) {
            if (v.plugins.object[D].getDisplayElement !== undefined) {
                if (a(v.plugins.config[D].position)) {
                    if (v.plugins.object[D].getDisplayElement().parentNode === null) {
                        u.appendChild(v.plugins.object[D].getDisplayElement())
                    }
                    var C = d(D);
                    C.zIndex = E;
                    return C
                }
            }
            return false
        }
        function j(C, D) {
            if (v.plugins.object[C].getDisplayElement().parentNode === null) {
                q.appendChild(v.plugins.object[C].getDisplayElement())
            }
            return {
                position: "absolute",
                width: (v.width - B(q.style.left) - B(q.style.right)),
                height: (v.height - B(q.style.top) - B(q.style.bottom)),
                zIndex: D
            }
        }
        function y(C, D) {
            return {
                position: "fixed",
                width: v.width,
                height: v.height,
                zIndex: D
            }
        }
        function w() {
            q.style.position = "absolute";
            var C = {
                position: "absolute",
                width: B(q.style.width),
                height: B(q.style.height),
                top: B(q.style.top),
                left: B(q.style.left)
            };
            c(v.getMedia().getDisplayElement(), C)
        }
        function d(D) {
            var E = {
                position: "absolute",
                margin: 0,
                padding: 0,
                top: null
            };
            var C = v.plugins.config[D].currentPosition.toLowerCase();
            switch (C.toUpperCase()) {
            case b.html5.view.positions.TOP:
                E.top = B(q.style.top);
                E.left = B(q.style.left);
                E.width = f - B(q.style.left) - B(q.style.right);
                E.height = v.plugins.object[D].height;
                q.style[C] = B(q.style[C]) + v.plugins.object[D].height + "px";
                q.style.height = B(q.style.height) - E.height + "px";
                break;
            case b.html5.view.positions.RIGHT:
                E.top = B(q.style.top);
                E.right = B(q.style.right);
                E.width = E.width = v.plugins.object[D].width;
                E.height = z - B(q.style.top) - B(q.style.bottom);
                q.style[C] = B(q.style[C]) + v.plugins.object[D].width + "px";
                q.style.width = B(q.style.width) - E.width + "px";
                break;
            case b.html5.view.positions.BOTTOM:
                E.bottom = B(q.style.bottom);
                E.left = B(q.style.left);
                E.width = f - B(q.style.left) - B(q.style.right);
                E.height = v.plugins.object[D].height;
                q.style[C] = B(q.style[C]) + v.plugins.object[D].height + "px";
                q.style.height = B(q.style.height) - E.height + "px";
                break;
            case b.html5.view.positions.LEFT:
                E.top = B(q.style.top);
                E.left = B(q.style.left);
                E.width = v.plugins.object[D].width;
                E.height = z - B(q.style.top) - B(q.style.bottom);
                q.style[C] = B(q.style[C]) + v.plugins.object[D].width + "px";
                q.style.width = B(q.style.width) - E.width + "px";
                break;
            default:
                break
            }
            return E
        }
        this.resize = h;
        this.fullscreen = function (D) {
            if (navigator.vendor.indexOf("Apple") === 0) {
                if (v.getMedia().getDisplayElement().webkitSupportsFullscreen) {
                    if (D) {
                        v.fullscreen = false;
                        v.getMedia().getDisplayElement().webkitEnterFullscreen()
                    } else {
                        v.getMedia().getDisplayElement().webkitExitFullscreen()
                    }
                } else {
                    v.fullscreen = false
                }
            } else {
                if (D) {
                    document.onkeydown = g;
                    clearInterval(m);
                    v.width = window.innerWidth;
                    v.height = window.innerHeight;
                    var C = {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        zIndex: 2147483000
                    };
                    c(u, C);
                    C.zIndex = 1;
                    c(v.getMedia().getDisplayElement(), C);
                    C.zIndex = 2;
                    c(q, C)
                } else {
                    document.onkeydown = "";
                    o();
                    v.width = f;
                    v.height = z;
                    c(u, {
                        position: "relative",
                        height: v.height,
                        width: v.width,
                        zIndex: 0
                    })
                }
                h(v.width, v.height)
            }
        }
    };

    function a(d) {
        return ([b.html5.view.positions.TOP, b.html5.view.positions.RIGHT, b.html5.view.positions.BOTTOM, b.html5.view.positions.LEFT].indexOf(d.toUpperCase()) > -1)
    }
    b.html5.view.positions = {
        TOP: "TOP",
        RIGHT: "RIGHT",
        BOTTOM: "BOTTOM",
        LEFT: "LEFT",
        OVER: "OVER",
        NONE: "NONE"
    }
})(jwplayer);
(function (a) {
    var b = {
        backgroundcolor: "",
        margin: 10,
        font: "Arial,sans-serif",
        fontsize: 10,
        fontcolor: parseInt("000000", 16),
        fontstyle: "normal",
        fontweight: "bold",
        buttoncolor: parseInt("ffffff", 16),
        position: a.html5.view.positions.BOTTOM,
        idlehide: false,
        layout: {
            left: {
                position: "left",
                elements: [{
                    name: "play",
                    type: "button"
                }, {
                    name: "divider",
                    type: "divider"
                }, {
                    name: "prev",
                    type: "button"
                }, {
                    name: "divider",
                    type: "divider"
                }, {
                    name: "next",
                    type: "button"
                }, {
                    name: "divider",
                    type: "divider"
                }, {
                    name: "elapsed",
                    type: "text"
                }]
            },
            center: {
                position: "center",
                elements: [{
                    name: "time",
                    type: "slider"
                }]
            },
            right: {
                position: "right",
                elements: [{
                    name: "duration",
                    type: "text"
                }, {
                    name: "blank",
                    type: "button"
                }, {
                    name: "divider",
                    type: "divider"
                }, {
                    name: "mute",
                    type: "button"
                }, {
                    name: "volume",
                    type: "slider"
                }, {
                    name: "divider",
                    type: "divider"
                }, {
                    name: "fullscreen",
                    type: "button"
                }]
            }
        }
    };
    _css = a.html5.utils.css;
    _hide = function (c) {
        _css(c, {
            display: "none"
        })
    };
    _show = function (c) {
        _css(c, {
            display: "block"
        })
    };
    a.html5.controlbar = function (j, L) {
        var i = j;
        var A = a.utils.extend({}, b, i.skin.getComponentSettings("controlbar"), L);
        if (a.html5.utils.mapLength(i.skin.getComponentLayout("controlbar")) > 0) {
            A.layout = i.skin.getComponentLayout("controlbar")
        }
        var P;
        var I;
        var O;
        var B;
        var t = "none";
        var f;
        var h;
        var Q;
        var e;
        var d;
        var w;
        var s;
        var J = {};
        var n = false;
        var c = {};

        function H() {
            O = 0;
            B = 0;
            I = 0;
            if (!n) {
                var V = {
                    height: i.skin.getSkinElement("controlbar", "background").height,
                    backgroundColor: A.backgroundcolor
                };
                P = document.createElement("div");
                P.id = i.id + "_jwplayer_controlbar";
                _css(P, V)
            }
            v("capLeft", "left", false, P);
            var W = {
                position: "absolute",
                height: i.skin.getSkinElement("controlbar", "background").height,
                background: " url(" + i.skin.getSkinElement("controlbar", "background").src + ") repeat-x center left",
                left: i.skin.getSkinElement("controlbar", "capLeft").width
            };
            N("elements", P, W);
            v("capRight", "right", false, P)
        }
        this.getDisplayElement = function () {
            return P
        };
        this.resize = function (X, V) {
            a.html5.utils.cancelAnimation(P);
            document.getElementById(i.id).onmousemove = x;
            d = X;
            w = V;
            x();
            var W = u();
            D({
                id: i.id,
                duration: Q,
                position: h
            });
            r({
                id: i.id,
                bufferPercent: e
            });
            return W
        };

        function o() {
            var W = ["timeSlider", "volumeSlider", "timeSliderRail", "volumeSliderRail"];
            for (var X in W) {
                var V = W[X];
                if (typeof J[V] != "undefined") {
                    c[V] = J[V].getBoundingClientRect()
                }
            }
        }
        function x() {
            a.html5.utils.cancelAnimation(P);
            if (g()) {
                a.html5.utils.fadeTo(P, 1, 0, 1, 0)
            } else {
                a.html5.utils.fadeTo(P, 0, 0.1, 1, 2)
            }
        }
        function g() {
            if (i.jwGetState() == a.api.events.state.IDLE || i.jwGetState() == a.api.events.state.PAUSED) {
                if (A.idlehide) {
                    return false
                }
                return true
            }
            if (i.jwGetFullscreen()) {
                return false
            }
            if (A.position.toUpperCase() == a.html5.view.positions.OVER) {
                return false
            }
            return true
        }
        function N(Y, X, W) {
            var V;
            if (!n) {
                V = document.createElement("div");
                J[Y] = V;
                V.id = P.id + "_" + Y;
                X.appendChild(V)
            } else {
                V = document.getElementById(P.id + "_" + Y)
            }
            if (W !== undefined) {
                _css(V, W)
            }
            return V
        }
        function G() {
            U(A.layout.left);
            U(A.layout.right, -1);
            U(A.layout.center)
        }
        function U(Y, V) {
            var Z = Y.position == "right" ? "right" : "left";
            var X = a.utils.extend([], Y.elements);
            if (V !== undefined) {
                X.reverse()
            }
            for (var W = 0; W < X.length; W++) {
                z(X[W], Z)
            }
        }
        function E() {
            return I++
        }
        function z(Z, ab) {
            var Y, W, X, V, ad;
            switch (Z.name) {
            case "play":
                v("playButton", ab, false);
                v("pauseButton", ab, true);
                K("playButton", "jwPlay");
                K("pauseButton", "jwPause");
                break;
            case "divider":
                v("divider" + E(), ab, true);
                break;
            case "prev":
                v("prevButton", ab, true);
                K("prevButton", "jwPlaylistPrev");
                break;
            case "next":
                v("nextButton", ab, true);
                K("nextButton", "jwPlaylistNext");
                break;
            case "elapsed":
                v("elapsedText", ab, true);
                break;
            case "time":
                W = i.skin.getSkinElement("controlbar", "timeSliderCapLeft") === undefined ? 0 : i.skin.getSkinElement("controlbar", "timeSliderCapLeft").width;
                X = i.skin.getSkinElement("controlbar", "timeSliderCapRight") === undefined ? 0 : i.skin.getSkinElement("controlbar", "timeSliderCapRight").width;
                Y = ab == "left" ? W : X;
                V = i.skin.getSkinElement("controlbar", "timeSliderRail").width + W + X;
                ad = {
                    height: i.skin.getSkinElement("controlbar", "background").height,
                    position: "absolute",
                    top: 0,
                    width: V
                };
                ad[ab] = ab == "left" ? O : B;
                var aa = N("timeSlider", J.elements, ad);
                v("timeSliderCapLeft", ab, true, aa, ab == "left" ? 0 : Y);
                v("timeSliderRail", ab, false, aa, Y);
                v("timeSliderBuffer", ab, false, aa, Y);
                v("timeSliderProgress", ab, false, aa, Y);
                v("timeSliderThumb", ab, false, aa, Y);
                v("timeSliderCapRight", ab, true, aa, ab == "right" ? 0 : Y);
                M("time");
                break;
            case "fullscreen":
                v("fullscreenButton", ab, false);
                v("normalscreenButton", ab, true);
                K("fullscreenButton", "jwSetFullscreen", true);
                K("normalscreenButton", "jwSetFullscreen", false);
                break;
            case "volume":
                W = i.skin.getSkinElement("controlbar", "volumeSliderCapLeft") === undefined ? 0 : i.skin.getSkinElement("controlbar", "volumeSliderCapLeft").width;
                X = i.skin.getSkinElement("controlbar", "volumeSliderCapRight") === undefined ? 0 : i.skin.getSkinElement("controlbar", "volumeSliderCapRight").width;
                Y = ab == "left" ? W : X;
                V = i.skin.getSkinElement("controlbar", "volumeSliderRail").width + W + X;
                ad = {
                    height: i.skin.getSkinElement("controlbar", "background").height,
                    position: "absolute",
                    top: 0,
                    width: V
                };
                ad[ab] = ab == "left" ? O : B;
                var ac = N("volumeSlider", J.elements, ad);
                v("volumeSliderCapLeft", ab, true, ac, ab == "left" ? 0 : Y);
                v("volumeSliderRail", ab, true, ac, Y);
                v("volumeSliderProgress", ab, false, ac, Y);
                v("volumeSliderCapRight", ab, true, ac, ab == "right" ? 0 : Y);
                M("volume");
                break;
            case "mute":
                v("muteButton", ab, false);
                v("unmuteButton", ab, true);
                K("muteButton", "jwSetMute", true);
                K("unmuteButton", "jwSetMute", false);
                break;
            case "duration":
                v("durationText", ab, true);
                break
            }
        }
        function v(Y, ac, ab, Z, V) {
            if ((i.skin.getSkinElement("controlbar", Y) !== undefined || Y.indexOf("Text") > 0 || Y.indexOf("divider") === 0) && !(Y.indexOf("divider") === 0 && s.indexOf("divider") === 0)) {
                s = Y;
                var X = {
                    height: i.skin.getSkinElement("controlbar", "background").height,
                    position: "absolute",
                    display: "block",
                    top: 0
                };
                if ((Y.indexOf("next") === 0 || Y.indexOf("prev") === 0) && i.jwGetPlaylist().length < 2) {
                    ab = false;
                    X.display = "none"
                }
                var aa;
                if (Y.indexOf("Text") > 0) {
                    Y.innerhtml = "00:00";
                    X.font = A.fontsize + "px/" + (i.skin.getSkinElement("controlbar", "background").height + 1) + "px " + A.font;
                    X.color = A.fontcolor;
                    X.textAlign = "center";
                    X.fontWeight = A.fontweight;
                    X.fontStyle = A.fontstyle;
                    X.cursor = "default";
                    aa = 14 + 3 * A.fontsize
                } else {
                    if (Y.indexOf("divider") === 0) {
                        X.background = "url(" + i.skin.getSkinElement("controlbar", "divider").src + ") repeat-x center left";
                        aa = i.skin.getSkinElement("controlbar", "divider").width
                    } else {
                        X.background = "url(" + i.skin.getSkinElement("controlbar", Y).src + ") repeat-x center left";
                        aa = i.skin.getSkinElement("controlbar", Y).width
                    }
                }
                if (ac == "left") {
                    X.left = V === undefined ? O : V;
                    if (ab) {
                        O += aa
                    }
                } else {
                    if (ac == "right") {
                        X.right = V === undefined ? B : V;
                        if (ab) {
                            B += aa
                        }
                    }
                }
                if (Z === undefined) {
                    Z = J.elements
                }
                X.width = aa;
                if (n) {
                    _css(J[Y], X)
                } else {
                    var W = N(Y, Z, X);
                    if (i.skin.getSkinElement("controlbar", Y + "Over") !== undefined) {
                        W.onmouseover = function (ad) {
                            W.style.backgroundImage = ["url(", i.skin.getSkinElement("controlbar", Y + "Over").src, ")"].join("")
                        };
                        W.onmouseout = function (ad) {
                            W.style.backgroundImage = ["url(", i.skin.getSkinElement("controlbar", Y).src, ")"].join("")
                        }
                    }
                }
            }
        }
        function C() {
            i.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_LOADED, y);
            i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_BUFFER, r);
            i.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE, p);
            i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_TIME, D);
            i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE, T);
            i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_VOLUME, k);
            i.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_COMPLETE, F)
        }
        function y() {
            H();
            G();
            u();
            R()
        }
        function R() {
            D({
                id: i.id,
                duration: i.jwGetDuration(),
                position: 0
            });
            r({
                id: i.id,
                bufferProgress: 0
            });
            T({
                id: i.id,
                mute: i.jwGetMute()
            });
            p({
                id: i.id,
                newstate: a.api.events.state.IDLE
            });
            k({
                id: i.id,
                volume: i.jwGetVolume()
            })
        }
        function K(X, Y, W) {
            if (n) {
                return
            }
            if (i.skin.getSkinElement("controlbar", X) !== undefined) {
                var V = J[X];
                if (V !== null) {
                    _css(V, {
                        cursor: "pointer"
                    });
                    if (Y == "fullscreen") {
                        V.onmouseup = function (Z) {
                            Z.stopPropagation();
                            i.jwSetFullscreen(!i.jwGetFullscreen())
                        }
                    } else {
                        V.onmouseup = function (Z) {
                            Z.stopPropagation();
                            if (W !== null) {
                                i[Y](W)
                            } else {
                                i[Y]()
                            }
                        }
                    }
                }
            }
        }
        function M(V) {
            if (n) {
                return
            }
            var W = J[V + "Slider"];
            _css(J.elements, {
                cursor: "pointer"
            });
            _css(W, {
                cursor: "pointer"
            });
            W.onmousedown = function (X) {
                t = V
            };
            W.onmouseup = function (X) {
                X.stopPropagation();
                S(X.pageX)
            };
            W.onmousemove = function (X) {
                if (t == "time") {
                    f = true;
                    var Y = X.pageX - c[V + "Slider"].left - window.pageXOffset;
                    _css(J.timeSliderThumb, {
                        left: Y
                    })
                }
            }
        }
        function S(W) {
            f = false;
            var V;
            if (t == "time") {
                V = W - c.timeSliderRail.left + window.pageXOffset;
                var Y = V / c.timeSliderRail.width * Q;
                if (Y < 0) {
                    Y = 0
                } else {
                    if (Y > Q) {
                        Y = Q - 3
                    }
                }
                i.jwSeek(Y);
                if (i.jwGetState() != a.api.events.state.PLAYING) {
                    i.jwPlay()
                }
            } else {
                if (t == "volume") {
                    V = W - c.volumeSliderRail.left - window.pageXOffset;
                    var X = Math.round(V / c.volumeSliderRail.width * 100);
                    if (X < 0) {
                        X = 0
                    } else {
                        if (X > 100) {
                            X = 100
                        }
                    }
                    if (i.jwGetMute()) {
                        i.jwSetMute(false)
                    }
                    i.jwSetVolume(X)
                }
            }
            t = "none"
        }
        function r(W) {
            if (W.bufferPercent !== null) {
                e = W.bufferPercent
            }
            var X = c.timeSliderRail.width;
            var V = isNaN(Math.round(X * e / 100)) ? 0 : Math.round(X * e / 100);
            _css(J.timeSliderBuffer, {
                width: V
            })
        }
        function T(V) {
            if (V.mute) {
                _hide(J.muteButton);
                _show(J.unmuteButton);
                _hide(J.volumeSliderProgress)
            } else {
                _show(J.muteButton);
                _hide(J.unmuteButton);
                _show(J.volumeSliderProgress)
            }
        }
        function p(V) {
            if (V.newstate == a.api.events.state.BUFFERING || V.newstate == a.api.events.state.PLAYING) {
                _show(J.pauseButton);
                _hide(J.playButton)
            } else {
                _hide(J.pauseButton);
                _show(J.playButton)
            }
            x();
            if (V.newstate == a.api.events.state.IDLE) {
                _hide(J.timeSliderBuffer);
                _hide(J.timeSliderProgress);
                _hide(J.timeSliderThumb);
                D({
                    id: i.id,
                    duration: i.jwGetDuration(),
                    position: 0
                })
            } else {
                _show(J.timeSliderBuffer);
                if (V.newstate != a.api.events.state.BUFFERING) {
                    _show(J.timeSliderProgress);
                    _show(J.timeSliderThumb)
                }
            }
        }
        function F(V) {
            D(a.utils.extend(V, {
                position: 0,
                duration: Q
            }))
        }
        function D(Y) {
            if (Y.position !== null) {
                h = Y.position
            }
            if (Y.duration !== null) {
                Q = Y.duration
            }
            var W = (h === Q === 0) ? 0 : h / Q;
            var V = isNaN(Math.round(c.timeSliderRail.width * W)) ? 0 : Math.round(c.timeSliderRail.width * W);
            var X = V;
            J.timeSliderProgress.style.width = V + "px";
            if (!f) {
                if (J.timeSliderThumb) {
                    J.timeSliderThumb.style.left = X + "px"
                }
            }
            if (J.durationText) {
                J.durationText.innerHTML = m(Q)
            }
            if (J.elapsedText) {
                J.elapsedText.innerHTML = m(h)
            }
        }
        function m(V) {
            str = "00:00";
            if (V > 0) {
                str = Math.floor(V / 60) < 10 ? "0" + Math.floor(V / 60) + ":" : Math.floor(V / 60) + ":";
                str += Math.floor(V % 60) < 10 ? "0" + Math.floor(V % 60) : Math.floor(V % 60)
            }
            return str
        }
        function l() {
            var Y, W;
            var X = document.getElementById(P.id + "_elements").childNodes;
            for (var V in document.getElementById(P.id + "_elements").childNodes) {
                if (isNaN(parseInt(V, 10))) {
                    continue
                }
                if (X[V].id.indexOf(P.id + "_divider") === 0 && W.id.indexOf(P.id + "_divider") === 0) {
                    X[V].style.display = "none"
                } else {
                    if (X[V].id.indexOf(P.id + "_divider") === 0 && Y.style.display != "none") {
                        X[V].style.display = "block"
                    }
                }
                if (X[V].style.display != "none") {
                    W = X[V]
                }
                Y = X[V]
            }
        }
        function u() {
            l();
            if (i.jwGetFullscreen()) {
                _show(J.normalscreenButton);
                _hide(J.fullscreenButton)
            } else {
                _hide(J.normalscreenButton);
                _show(J.fullscreenButton)
            }
            var W = {
                width: d
            };
            var V = {};
            if (A.position.toUpperCase() == a.html5.view.positions.OVER || i.jwGetFullscreen()) {
                W.left = A.margin;
                W.width -= 2 * A.margin;
                W.top = w - i.skin.getSkinElement("controlbar", "background").height - A.margin;
                W.height = i.skin.getSkinElement("controlbar", "background").height
            } else {
                W.left = 0
            }
            V.left = i.skin.getSkinElement("controlbar", "capLeft").width;
            V.width = W.width - i.skin.getSkinElement("controlbar", "capLeft").width - i.skin.getSkinElement("controlbar", "capRight").width;
            var X = i.skin.getSkinElement("controlbar", "timeSliderCapLeft") === undefined ? 0 : i.skin.getSkinElement("controlbar", "timeSliderCapLeft").width;
            _css(J.timeSliderRail, {
                width: (V.width - O - B),
                left: X
            });
            if (J.timeSliderCapRight !== undefined) {
                _css(J.timeSliderCapRight, {
                    left: X + (V.width - O - B)
                })
            }
            _css(P, W);
            _css(J.elements, V);
            o();
            return W
        }
        function k(Z) {
            if (J.volumeSliderRail !== undefined) {
                var X = isNaN(Z.volume / 100) ? 1 : Z.volume / 100;
                var Y = parseInt(J.volumeSliderRail.style.width.replace("px", ""), 10);
                var V = isNaN(Math.round(Y * X)) ? 0 : Math.round(Y * X);
                var aa = parseInt(J.volumeSliderRail.style.right.replace("px", ""), 10);
                var W = i.skin.getSkinElement("controlbar", "volumeSliderCapLeft") === undefined ? 0 : i.skin.getSkinElement("controlbar", "volumeSliderCapLeft").width;
                _css(J.volumeSliderProgress, {
                    width: V,
                    left: W
                });
                if (J.volumeSliderCapLeft !== undefined) {
                    _css(J.volumeSliderCapLeft, {
                        left: 0
                    })
                }
            }
        }
        function q() {
            H();
            G();
            o();
            n = true;
            C();
            R();
            P.style.opacity = A.idlehide ? 0 : 1
        }
        q();
        return this
    }
})(jwplayer);
(function (b) {
    var a = ["width", "height", "state", "playlist", "item", "position", "buffer", "duration", "volume", "mute", "fullscreen"];
    b.html5.controller = function (s, q, d, p) {
        var v = s;
        var x = d;
        var c = p;
        var j = q;
        var z = true;
        var t = (x.config.debug !== undefined) && (x.config.debug.toString().toLowerCase() == "console");
        var h = new b.html5.eventdispatcher(j.id, t);
        b.utils.extend(this, h);

        function l(C) {
            h.sendEvent(C.type, C)
        }
        x.addGlobalListener(l);

        function o() {
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    if (z || x.state == b.api.events.state.IDLE) {
                        x.setActiveMediaProvider(x.playlist[x.item]);
                        x.addEventListener(b.api.events.JWPLAYER_MEDIA_BUFFER_FULL, function () {
                            x.getMedia().play()
                        });
                        if (x.config.repeat) {
                            x.addEventListener(b.api.events.JWPLAYER_MEDIA_COMPLETE, function (D) {
                                setTimeout(m, 25)
                            })
                        }
                        x.getMedia().load(x.playlist[x.item]);
                        z = false
                    } else {
                        if (x.state == b.api.events.state.PAUSED) {
                            x.getMedia().play()
                        }
                    }
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function A() {
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    switch (x.state) {
                    case b.api.events.state.PLAYING:
                    case b.api.events.state.BUFFERING:
                        x.getMedia().pause();
                        break
                    }
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function w(C) {
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    switch (x.state) {
                    case b.api.events.state.PLAYING:
                    case b.api.events.state.PAUSED:
                    case b.api.events.state.BUFFERING:
                        x.getMedia().seek(C);
                        break
                    }
                }
                return true
            } catch (D) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, D)
            }
            return false
        }
        function i() {
            try {
                if (x.playlist[0].levels[0].file.length > 0 && x.state != b.api.events.state.IDLE) {
                    x.getMedia().stop()
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function f() {
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    if (x.config.shuffle) {
                        n(r())
                    } else {
                        if (x.item + 1 == x.playlist.length) {
                            n(0)
                        } else {
                            n(x.item + 1)
                        }
                    }
                }
                if (x.state != b.api.events.state.PLAYING && x.state != b.api.events.state.BUFFERING) {
                    o()
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function e() {
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    if (x.config.shuffle) {
                        n(r())
                    } else {
                        if (x.item === 0) {
                            n(x.playlist.length - 1)
                        } else {
                            n(x.item - 1)
                        }
                    }
                }
                if (x.state != b.api.events.state.PLAYING && x.state != b.api.events.state.BUFFERING) {
                    o()
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function r() {
            var C = null;
            if (x.playlist.length > 1) {
                while (C === null) {
                    C = Math.floor(Math.random() * x.playlist.length);
                    if (C == x.item) {
                        C = null
                    }
                }
            } else {
                C = 0
            }
            return C
        }
        function n(D) {
            x.resetEventListeners();
            x.addGlobalListener(l);
            try {
                if (x.playlist[0].levels[0].file.length > 0) {
                    var E = x.state;
                    if (E !== b.api.events.state.IDLE) {
                        i()
                    }
                    x.item = D;
                    z = true;
                    h.sendEvent(b.api.events.JWPLAYER_PLAYLIST_ITEM, {
                        item: D
                    });
                    if (E == b.api.events.state.PLAYING || E == b.api.events.state.BUFFERING) {
                        o()
                    }
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function y(D) {
            try {
                switch (typeof (D)) {
                case "number":
                    x.getMedia().volume(D);
                    break;
                case "string":
                    x.getMedia().volume(parseInt(D, 10));
                    break
                }
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function k(D) {
            try {
                x.getMedia().mute(D);
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function g(D, C) {
            try {
                x.width = D;
                x.height = C;
                c.resize(D, C);
                return true
            } catch (E) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, E)
            }
            return false
        }
        function u(D) {
            try {
                x.fullscreen = D;
                c.fullscreen(D);
                return true
            } catch (C) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, C)
            }
            return false
        }
        function B(C) {
            try {
                i();
                x.loadPlaylist(C);
                z = true;
                return true
            } catch (D) {
                h.sendEvent(b.api.events.JWPLAYER_ERROR, D)
            }
            return false
        }
        b.html5.controller.repeatoptions = {
            LIST: "LIST",
            ALWAYS: "ALWAYS",
            SINGLE: "SINGLE",
            NONE: "NONE"
        };

        function m() {
            x.resetEventListeners();
            x.addGlobalListener(l);
            switch (x.config.repeat.toUpperCase()) {
            case b.html5.controller.repeatoptions.SINGLE:
                o();
                break;
            case b.html5.controller.repeatoptions.ALWAYS:
                if (x.item == x.playlist.length - 1 && !x.config.shuffle) {
                    n(0);
                    o()
                } else {
                    f()
                }
                break;
            case b.html5.controller.repeatoptions.LIST:
                if (x.item == x.playlist.length - 1 && !x.config.shuffle) {
                    n(0)
                } else {
                    f()
                }
                break
            }
        }
        this.play = o;
        this.pause = A;
        this.seek = w;
        this.stop = i;
        this.next = f;
        this.prev = e;
        this.item = n;
        this.setVolume = y;
        this.setMute = k;
        this.resize = g;
        this.setFullscreen = u;
        this.load = B
    }
})(jwplayer);
(function (a) {
    a.html5.defaultSkin = function () {
        this.text = '<?xml version="1.0" ?><skin author="LongTail Video" name="Five" version="1.0"><settings><setting name="backcolor" value="0xFFFFFF"/><setting name="frontcolor" value="0x000000"/><setting name="lightcolor" value="0x000000"/><setting name="screencolor" value="0x000000"/></settings><components><component name="controlbar"><settings><setting name="margin" value="20"/><setting name="fontsize" value="11"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFJJREFUeNrslLENwAAIwxLU/09j5AiOgD5hVQzNAVY8JK4qEfHMIKBnd2+BQlBINaiRtL/aV2rdzYBsM6CIONbI1NZENTr3RwdB2PlnJgJ6BRgA4hwu5Qg5iswAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNosi8ENACAMAgnuv14H0Z8asI19XEjhOiKCMmibVgJTUt7V6fe9KXOtSQCfctJHu2q3/ot79hNgANc2OTz9uTCCAAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhJREFUeNpiYqABYBo1dNRQ+hr6H4jvA3E8NS39j4SpZvh/LJig4YxEGEqy3kET+w+AOGFQRhTJhrEQkGcczfujhg4CQwECDADpTRWU/B3wHQAAAABJRU5ErkJggg=="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpiYBgFo2DwA0YC8v/R1P4nRu+ooaOGUtnQUTAKhgIACDAAFCwQCfAJ4gwAAAAASUVORK5CYII="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEtJREFUeNpiYBgFo2Dog/9QDAPyQHweTYwiQ/2B+D0Wi8g2tB+JTdBQRiIMJVkvEy0iglhDF9Aq9uOpHVEwoE+NJDUKRsFgAAABBgDe2hqZcNNL0AAAAABJRU5ErkJggg=="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAElJREFUeNpiYBgFo2Dog/9AfB6I5dHE/lNqKAi/B2J/ahsKw/3EGMpIhKEk66WJoaR6fz61IyqemhEFSlL61ExSo2AUDAYAEGAAiG4hj+5t7M8AAAAASUVORK5CYII="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADxJREFUeNpiYBgFo2AU0Bwwzluw+D8tLWARFhKiqQ9YuLg4aWsBGxs7bS1gZ6e5BWyjSX0UjIKhDgACDABlYQOGh5pYywAAAABJRU5ErkJggg=="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFo2AU0Bww1jc0/aelBSz8/Pw09QELOzs7bS1gY2OjrQWsrKy09gHraFIfBaNgqAOAAAMAvy0DChXHsZMAAAAASUVORK5CYII="/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAClJREFUeNpiYBgFo2AU0BwwAvF/WlrARGsfjFow8BaMglEwCugAAAIMAOHfAQunR+XzAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpiZICA/yCCiQEJUJcDEGAAY0gBD1/m7Q0AAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiYBgFIw3MB+L/5Gj8j6yRiRTFyICJXHfTXyMLAXlGati4YDRFDj8AEGAABk8GSqqS4CoAAAAASUVORK5CYII="/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYBgFgxz8p7bm+cQa+h8LHy7GhEcjIz4bmAjYykiun/8j0fakGPIfTfPgiSr6aB4FVAcAAQYAWdwR1G1Wd2gAAAAASUVORK5CYII="/><element name="volumeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGpJREFUeNpi/P//PwM9ABMDncCoRYPfIqqDZcuW1UPp/6AUDcNM1DQYKtRAlaAj1mCSLSLXYIIWUctgDItoZfDA5aOoqKhGEANIM9LVR7SymGDQUctikuOIXkFNdhHEOFrDjlpEd4sAAgwAriRMub95fu8AAAAASUVORK5CYII="/><element name="volumeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFtJREFUeNpi/P//PwM9ABMDncCoRYPfIlqAeij9H5SiYZiqBqPTlFqE02BKLSLaYFItIttgQhZRzWB8FjENiuRJ7aAbsMQwYMl7wDIsWUUQ42gNO2oR3S0CCDAAKhKq6MLLn8oAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5JREFUeNpiYBgFo2DQA0YC8v/xqP1PjDlMRDrEgUgxkgHIlfZoriVGjmzLsLFHAW2D6D8eA/9Tw7L/BAwgJE90PvhPpNgoGAVDEQAEGAAMdhTyXcPKcAAAAABJRU5ErkJggg=="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpiYBgFo2DIg/9UUkOUAf8JiFFsyX88fJyAkcQgYMQjNkzBoAgiezyRbE+tFGSPxQJ7auYBmma0UTAKBhgABBgAJAEY6zON61sAAAAASUVORK5CYII="/></elements></component><component name="display"><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNrszwENADAIA7DhX8ENoBMZ5KR10EryckCJiIiIiIiIiIiIiIiIiIiIiIh8GmkRERERERERERERERERERERERGRHSPAAPlXH1phYpYaAAAAAElFTkSuQmCC"/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrs18ENgjAYhmFouDOCcQJGcARHgE10BDcgTOIosAGwQOuPwaQeuFRi2p/3Sb6EC5L3QCxZBgAAAOCorLW1zMn65TrlkH4NcV7QNcUQt7Gn7KIhxA+qNIR81spOGkL8oFJDyLJRdosqKDDkK+iX5+d7huzwM40xptMQMkjIOeRGo+VkEVvIPfTGIpKASfYIfT9iCHkHrBEzf4gcUQ56aEzuGK/mw0rHpy4AAACAf3kJMACBxjAQNRckhwAAAABJRU5ErkJggg=="/><element name="muteIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNrs1jEOgCAMBVAg7t5/8qaoIy4uoobyXsLCxA+0NCUAAADGUWvdQoQ41x4ixNBB2hBvBskdD3w5ZCkl3+33VqI0kjBBlh9rp+uTcyOP33TnolfsU85XX3yIRpQph8ZQY3wTZtU5AACASA4BBgDHoVuY1/fvOQAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWlJREFUeNrsl+1twjAQhsHq/7BBYQLYIBmBDcoGMAIjtBPQTcII2SDtBDBBwrU6pGsUO7YbO470PtKJkz9iH++d4ywWAAAAAABgljRNsyWr2bZzDuJG1rLdZhcMbTjrBCGDyUKsqQLFciJb9bSvuG/WagRVRUVUI6gqy5HVeKWfSgRyJruKIU//TrZTSn2nmlaXThrloi/v9F2STC1W4+Aw5cBzkquRc09bofFNc6YLxEON0VUZS5FPTftO49vMjRsIF3RhOGr7/D/pJw+FKU+q0vDyq8W42jCunDqI3LC5XxNj2wHLU1XjaRnb0Lhykhqhhd8MtSF5J9tbjCv4mXGvKJz/65FF/qJryyaaIvzP2QRxZTX2nTuXjvV/VPFSwyLnW7mpH99yTh1FEVro6JBSd40/pMrRdV8vPtcKl28T2pT8TnFZ4yNosct3Q0io6JfBiz1FlGdqVQH3VHnepAEAAAAAADDzEGAAcTwB10jWgxcAAAAASUVORK5CYII="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuhJREFUeNrsWr9rU1EUznuNGqvFQh1ULOhiBx0KDtIuioO4pJuik3FxFfUPaAV1FTdx0Q5d2g4FFxehTnEpZHFoBy20tCIWtGq0TZP4HfkeHB5N8m6Sl/sa74XDybvv3vvOd8/Pe4lXrVZT3dD8VJc0B8QBcUAcEAfESktHGeR5XtMfqFQq/f92zPe/NbtGlKTdCY30kuxrpMGO94BlQCXs+rbh3ONgA6BlzP1p20d80gEI5hmA2A92Qua1Q2PtAFISM+bvjMG8U+Q7oA3rQGASwrYCU6WpNdLGYbA+Pq5jjXIiwi8EEa2UDbQSaKOIuV+SlkcCrfjY8XTI9EpKGwP0C2kru2hLtHqa4zoXtZRWyvi4CLwv9Opr6Hkn6A9HKgEANsQ1iqC3Ub/vRUk2JgmRkatK36kVrnt0qObunwUdUUMXMWYpakJsO5Am8tAw2GBIgwWA+G2S2dMpiw0gDioQRQJoKhRb1QiDwlHZUABYbaXWsm5ae6loTE4ZDxN4CZar8foVzOJ2iyZ2kWF3t7YIevffaMT5yJ70kQb2fQ1sE5SHr2wazs2wgMxgbsEKEAgxAvZUJbQLBGTSBMgNrncJbA6AljtS/eKDJ0Ez+DmrQEzXS2h1Ck25kAg0IZcUOaydCy4sYnN2fOA+2AP16gNoHALlQ+fwH7XO4CxLenUpgj4xr6ugY2roPMbMx+Xs18m/E8CVEIhxsNeg83XWOAN6grG3lGbk8uE5fr4B/WH3cJw+co/l9nTYsSGYCJ/lY5/qv0thn6nrIWmjeJcPSnWOeY++AkF8tpJHIMAUs/MaBBpj3znZfQo5psY+ZrG4gv5HickjEOymKjEeRpgyST6IuZcTcWbnjcgdPi5ghxciRKsl1lDSsgwA1i8fssonJgzmTSqfGUkCENndNdAL7PS6QQ7ZYISTo+1qq0LEWjTWcvY4isa4z+yfQB+7ooyHVg5RI7/i1Ijn/vnggDggDogD4oC00P4KMACd/juEHOrS4AAAAABJRU5ErkJggg=="/></elements></component><component name="dock"><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFBJREFUeNrs0cEJACAQA8Eofu0fu/W6EM5ZSAFDRpKTBs00CQQEBAQEBAQEBAQEBAQEBATkK8iqbY+AgICAgICAgICAgICAgICAgIC86QowAG5PAQzEJ0lKAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNrs2NEJwCAMBcBYuv/CFuIE9VN47WWCR7iocXR3pdWdGPqqwIoMjYfQeAiNh9B4JHc6MHQVHnjggQceeOCBBx77TifyeOY0iHi8DqIdEY8dD5cL094eePzINB5CO/LwcOTptNB4CP25L4TIbZzpU7UEGAA5wz1uF5rF9AAAAABJRU5ErkJggg=="/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADhJREFUeNrsy6ENACAMAMHClp2wYxZLAg5Fcu9e3OjuOKqqfTMzbs14CIZhGIZhGIZhGP4VLwEGAK/BBnVFpB0oAAAAAElFTkSuQmCC"/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAIAAADpFA0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNrsy7ENACAMBLE8++8caFFKKiRffU53112SGs3ttOohGIZhGIZhGIZh+Fe8BRgAiaUGde6NOSEAAAAASUVORK5CYII="/></elements></component></components></skin>';
        this.xml = null;
        if (window.DOMParser) {
            parser = new DOMParser();
            this.xml = parser.parseFromString(this.text, "text/xml")
        } else {
            this.xml = new ActiveXObject("Microsoft.XMLDOM");
            this.xml.async = "false";
            this.xml.loadXML(this.text)
        }
        return this
    }
})(jwplayer);
(function (a) {
    _css = a.html5.utils.css;
    _hide = function (b) {
        _css(b, {
            display: "none"
        })
    };
    _show = function (b) {
        _css(b, {
            display: "block"
        })
    };
    a.html5.display = function (k, s) {
        var q = k;
        var d = {};
        var f;
        var t;
        var r;
        var l;
        var g;
        var j = q.skin.getComponentSettings("display").bufferrotation === undefined ? 15 : parseInt(q.skin.getComponentSettings("display").bufferrotation, 10);
        var e = q.skin.getComponentSettings("display").bufferinterval === undefined ? 100 : parseInt(q.skin.getComponentSettings("display").bufferinterval, 10);
        var c = {
            display: {
                style: {
                    cursor: "pointer",
                    top: 0,
                    left: 0
                },
                click: p
            },
            display_icon: {
                style: {
                    cursor: "pointer",
                    position: "absolute",
                    top: ((q.skin.getSkinElement("display", "background").height - q.skin.getSkinElement("display", "playIcon").height) / 2),
                    left: ((q.skin.getSkinElement("display", "background").width - q.skin.getSkinElement("display", "playIcon").width) / 2),
                    border: 0,
                    margin: 0,
                    padding: 0,
                    zIndex: 3
                }
            },
            display_iconBackground: {
                style: {
                    cursor: "pointer",
                    position: "absolute",
                    top: ((t - q.skin.getSkinElement("display", "background").height) / 2),
                    left: ((f - q.skin.getSkinElement("display", "background").width) / 2),
                    border: 0,
                    backgroundImage: (["url(", q.skin.getSkinElement("display", "background").src, ")"]).join(""),
                    width: q.skin.getSkinElement("display", "background").width,
                    height: q.skin.getSkinElement("display", "background").height,
                    margin: 0,
                    padding: 0,
                    zIndex: 2
                }
            },
            display_image: {
                style: {
                    display: "none",
                    width: f,
                    height: t,
                    position: "absolute",
                    cursor: "pointer",
                    left: 0,
                    top: 0,
                    margin: 0,
                    padding: 0,
                    textDecoration: "none",
                    zIndex: 1
                }
            },
            display_text: {
                style: {
                    zIndex: 4,
                    position: "relative",
                    opacity: 0.8,
                    backgroundColor: parseInt("000000", 16),
                    color: parseInt("ffffff", 16),
                    textAlign: "center",
                    fontFamily: "Arial,sans-serif",
                    padding: "0 5px",
                    fontSize: 14
                }
            }
        };
        q.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE, i);
        q.jwAddEventListener(a.api.events.JWPLAYER_MEDIA_MUTE, i);
        q.jwAddEventListener(a.api.events.JWPLAYER_PLAYLIST_ITEM, i);
        q.jwAddEventListener(a.api.events.JWPLAYER_ERROR, o);
        u();

        function u() {
            d.display = n("div", "display");
            d.display_text = n("div", "display_text");
            d.display.appendChild(d.display_text);
            d.display_image = n("img", "display_image");
            d.display_image.onerror = function (v) {
                _hide(d.display_image)
            };
            d.display_icon = n("div", "display_icon");
            d.display_iconBackground = n("div", "display_iconBackground");
            d.display.appendChild(d.display_image);
            d.display_iconBackground.appendChild(d.display_icon);
            d.display.appendChild(d.display_iconBackground);
            b()
        }
        this.getDisplayElement = function () {
            return d.display
        };
        this.resize = function (w, v) {
            f = w;
            t = v;
            _css(d.display, {
                width: w,
                height: v
            });
            _css(d.display_text, {
                width: (w - 10),
                top: ((t - d.display_text.getBoundingClientRect().height) / 2)
            });
            _css(d.display_image, {
                width: w,
                height: v
            });
            _css(d.display_iconBackground, {
                top: ((t - q.skin.getSkinElement("display", "background").height) / 2),
                left: ((f - q.skin.getSkinElement("display", "background").width) / 2)
            });
            i({})
        };

        function n(v, x) {
            var w = document.createElement(v);
            w.id = q.id + "_jwplayer_" + x;
            _css(w, c[x].style);
            return w
        }
        function b() {
            for (var v in d) {
                if (c[v].click !== undefined) {
                    d[v].onclick = c[v].click
                }
            }
        }
        function p(v) {
            if (typeof v.preventDefault != "undefined") {
                v.preventDefault()
            } else {
                v.returnValue = false
            }
            if (q.jwGetState() != a.api.events.state.PLAYING) {
                q.jwPlay()
            } else {
                q.jwPause()
            }
        }
        function h(v) {
            if (g) {
                return
            }
            _show(d.display_iconBackground);
            d.display_icon.style.backgroundImage = (["url(", q.skin.getSkinElement("display", v).src, ")"]).join("");
            _css(d.display_icon, {
                display: "block",
                width: q.skin.getSkinElement("display", v).width,
                height: q.skin.getSkinElement("display", v).height,
                top: (q.skin.getSkinElement("display", "background").height - q.skin.getSkinElement("display", v).height) / 2,
                left: (q.skin.getSkinElement("display", "background").width - q.skin.getSkinElement("display", v).width) / 2
            });
            if (q.skin.getSkinElement("display", v + "Over") !== undefined) {
                d.display_icon.onmouseover = function (w) {
                    d.display_icon.style.backgroundImage = ["url(", q.skin.getSkinElement("display", v + "Over").src, ")"].join("")
                };
                d.display_icon.onmouseout = function (w) {
                    d.display_icon.style.backgroundImage = ["url(", q.skin.getSkinElement("display", v).src, ")"].join("")
                }
            } else {
                d.display_icon.onmouseover = null;
                d.display_icon.onmouseout = null
            }
        }
        function m() {
            _hide(d.display_icon);
            _hide(d.display_iconBackground)
        }
        function o(v) {
            g = true;
            m();
            d.display_text.innerHTML = v.error;
            _show(d.display_text);
            d.display_text.style.top = ((t - d.display_text.getBoundingClientRect().height) / 2) + "px"
        }
        function i(v) {
            if ((v.type == a.api.events.JWPLAYER_PLAYER_STATE || v.type == a.api.events.JWPLAYER_PLAYLIST_ITEM) && g) {
                g = false;
                _hide(d.display_text)
            }
            if (l !== undefined) {
                clearInterval(l);
                l = null;
                a.html5.utils.animations.rotate(d.display_icon, 0)
            }
            switch (q.jwGetState()) {
            case a.api.events.state.BUFFERING:
                h("bufferIcon");
                r = 0;
                l = setInterval(function () {
                    r += j;
                    a.html5.utils.animations.rotate(d.display_icon, r % 360)
                }, e);
                h("bufferIcon");
                break;
            case a.api.events.state.PAUSED:
                _css(d.display_image, {
                    background: "transparent no-repeat center center"
                });
                h("playIcon");
                break;
            case a.api.events.state.IDLE:
                if (q.jwGetPlaylist()[q.jwGetItem()].image) {
                    _css(d.display_image, {
                        display: "block"
                    });
                    d.display_image.src = a.html5.utils.getAbsolutePath(q.jwGetPlaylist()[q.jwGetItem()].image)
                } else {
                    _css(d.display_image, {
                        display: "none"
                    });
                    delete d.display_image.src
                }
                h("playIcon");
                break;
            default:
                if (q.jwGetMute()) {
                    _css(d.display_image, {
                        display: "none"
                    });
                    delete d.display_image.src;
                    h("muteIcon")
                } else {
                    _css(d.display_image, {
                        display: "none"
                    });
                    delete d.display_image.src;
                    _hide(d.display_iconBackground);
                    _hide(d.display_icon)
                }
                break
            }
        }
        return this
    }
})(jwplayer);
(function (jwplayer) {
    jwplayer.html5.eventdispatcher = function (id, debug) {
        var _id = id;
        var _debug = debug;
        var _listeners;
        var _globallisteners;
        this.resetEventListeners = function () {
            _listeners = {};
            _globallisteners = []
        };
        this.resetEventListeners();
        this.addEventListener = function (type, listener, count) {
            try {
                if (_listeners[type] === undefined) {
                    _listeners[type] = []
                }
                if (typeof (listener) == "string") {
                    eval("listener = " + listener)
                }
                _listeners[type].push({
                    listener: listener,
                    count: count
                })
            } catch (err) {
                jwplayer.html5.utils.log("error", err)
            }
            return false
        };
        this.removeEventListener = function (type, listener) {
            try {
                for (var lisenterIndex in _listeners[type]) {
                    if (_listeners[type][lisenterIndex].toString() == listener.toString()) {
                        _listeners[type].slice(lisenterIndex, lisenterIndex + 1);
                        break
                    }
                }
            } catch (err) {
                jwplayer.html5.utils.log("error", err)
            }
            return false
        };
        this.addGlobalListener = function (listener, count) {
            try {
                if (typeof (listener) == "string") {
                    eval("listener = " + listener)
                }
                _globallisteners.push({
                    listener: listener,
                    count: count
                })
            } catch (err) {
                jwplayer.html5.utils.log("error", err)
            }
            return false
        };
        this.removeGlobalListener = function (listener) {
            try {
                for (var lisenterIndex in _globallisteners) {
                    if (_globallisteners[lisenterIndex].toString() == listener.toString()) {
                        _globallisteners.slice(lisenterIndex, lisenterIndex + 1);
                        break
                    }
                }
            } catch (err) {
                jwplayer.html5.utils.log("error", err)
            }
            return false
        };
        this.sendEvent = function (type, data) {
            if (data === undefined) {
                data = {}
            }
            jwplayer.utils.extend(data, {
                id: _id,
                version: jwplayer.html5.version,
                type: type
            });
            if (_debug) {
                jwplayer.html5.utils.log(type, data)
            }
            for (var listenerIndex in _listeners[type]) {
                try {
                    _listeners[type][listenerIndex].listener(data)
                } catch (err) {
                    jwplayer.html5.utils.log("There was an error while handling a listener", _listeners[type][listenerIndex].listener, err)
                }
                if (_listeners[type][listenerIndex].count === 1) {
                    delete _listeners[type][listenerIndex]
                } else {
                    if (_listeners[type][listenerIndex].count > 0) {
                        _listeners[type][listenerIndex].count = _listeners[type][listenerIndex].count - 1
                    }
                }
            }
            for (var globalListenerIndex in _globallisteners) {
                try {
                    _globallisteners[globalListenerIndex].listener(data)
                } catch (err) {
                    jwplayer.html5.utils.log("There was an error while handling a listener", _globallisteners[globalListenerIndex].listener, err)
                }
                if (_globallisteners[globalListenerIndex].count === 1) {
                    delete _globallisteners[globalListenerIndex]
                } else {
                    if (_globallisteners[globalListenerIndex].count > 0) {
                        _globallisteners[globalListenerIndex].count = _globallisteners[globalListenerIndex].count - 1
                    }
                }
            }
        }
    }
})(jwplayer);
(function (a) {
    a.html5.extensionmap = {
        "3gp": "video/3gpp",
        "3gpp": "video/3gpp",
        "3g2": "video/3gpp2",
        "3gpp2": "video/3gpp2",
        flv: "video/x-flv",
        f4a: "audio/mp4",
        f4b: "audio/mp4",
        f4p: "video/mp4",
        f4v: "video/mp4",
        mov: "video/quicktime",
        m4a: "audio/mp4",
        m4b: "audio/mp4",
        m4p: "audio/mp4",
        m4v: "video/mp4",
        mkv: "video/x-matroska",
        mp4: "video/mp4",
        sdp: "application/sdp",
        vp6: "video/x-vp6",
        aac: "audio/aac",
        mp3: "audio/mp3",
        ogg: "audio/ogg",
        ogv: "video/ogg",
        webm: "video/webm"
    }
})(jwplayer);
(function (a) {
    var b = {
        prefix: "http://l.longtailvideo.com/html5/",
        file: "logo.png",
        link: "http://www.longtailvideo.com/players/jw-flv-player/",
        margin: 8,
        out: 0.5,
        over: 1,
        timeout: 3,
        hide: true,
        position: "bottom-left"
    };
    _css = a.html5.utils.css;
    a.html5.logo = function (g, h) {
        var l = g;
        var j;
        if (b.prefix) {
            var i = g.version.split(/\W/).splice(0, 2).join("/");
            if (b.prefix.indexOf(i) < 0) {
                b.prefix += i + "/"
            }
        }
        if (h.position == a.html5.view.positions.OVER) {
            h.position = b.position
        }
        var f = a.utils.extend({}, b);
        if (!f.file) {
            return
        }
        var c = document.createElement("img");
        c.id = l.id + "_jwplayer_logo";
        c.style.display = "none";
        c.onload = function (n) {
            _css(c, k());
            l.jwAddEventListener(a.api.events.JWPLAYER_PLAYER_STATE, m)
        };
        if (f.file.indexOf("http://") === 0) {
            c.src = f.file
        } else {
            c.src = f.prefix + f.file
        }
        c.onmouseover = function (n) {
            c.style.opacity = f.over;
            d()
        };
        c.onmouseout = function (n) {
            c.style.opacity = f.out;
            d()
        };
        c.onclick = e;

        function k() {
            var p = {
                textDecoration: "none",
                position: "absolute"
            };
            p.display = f.hide ? "none" : "block";
            var o = f.position.toLowerCase().split("-");
            for (var n in o) {
                p[o[n]] = f.margin
            }
            return p
        }
        this.resize = function (o, n) {};
        this.getDisplayElement = function () {
            return c
        };

        function e(n) {
            n.stopPropagation();
            window.open(f.link, "_blank");
            return
        }
        function d() {
            if (j) {
                clearTimeout(j)
            }
            j = setTimeout(function () {
                a.html5.utils.fadeTo(c, 0, 0.1, parseFloat(c.style.opacity))
            }, f.timeout * 1000)
        }
        function m(n) {
            switch (l.jwGetState()) {
            case a.api.events.state.BUFFERING:
                c.style.display = "block";
                c.style.opacity = f.out;
                if (f.hide) {
                    d()
                }
                break;
            case a.api.events.state.PAUSED:
                break;
            case a.api.events.state.IDLE:
                break;
            case a.api.events.state.PLAYING:
                break;
            default:
                if (f.hide) {
                    d()
                }
                break
            }
        }
        return this
    }
})(jwplayer);
(function (a) {
    var c = {
        ended: a.api.events.state.IDLE,
        playing: a.api.events.state.PLAYING,
        pause: a.api.events.state.PAUSED,
        buffering: a.api.events.state.BUFFERING
    };
    var b = a.html5.utils.css;
    a.html5.mediavideo = function (f, C) {
        var G = {
            abort: t,
            canplay: m,
            canplaythrough: m,
            durationchange: q,
            emptied: t,
            ended: m,
            error: l,
            loadeddata: q,
            loadedmetadata: q,
            loadstart: m,
            pause: m,
            play: J,
            playing: m,
            progress: z,
            ratechange: t,
            seeked: m,
            seeking: m,
            stalled: m,
            suspend: m,
            timeupdate: J,
            volumechange: t,
            waiting: m,
            canshowcurrentframe: t,
            dataunavailable: t,
            empty: t,
            load: e,
            loadedfirstframe: t
        };
        var H = new a.html5.eventdispatcher();
        a.utils.extend(this, H);
        var h = f;
        var x = C;
        var D;
        var F;
        var d = a.api.events.state.IDLE;
        var A = null;
        var n;
        var g = 0;
        var y = false;
        var r = false;
        var L;
        var K;
        var i = [];
        var M;
        var B = false;

        function v() {
            return d
        }
        function e(N) {}
        function t(N) {}
        function m(N) {
            if (c[N.type]) {
                s(c[N.type])
            }
        }
        function s(N) {
            if (B) {
                return
            }
            if (n) {
                N = a.api.events.state.IDLE
            }
            if (N == a.api.events.state.PAUSED && d == a.api.events.state.IDLE) {
                return
            }
            if (d != N) {
                var O = d;
                h.state = N;
                d = N;
                var P = false;
                if (N == a.api.events.state.IDLE) {
                    p();
                    if (h.position >= h.duration && (h.position || h.duration)) {
                        P = true
                    }
                    if (x.style.display != "none" && !h.config.chromeless) {
                        x.style.display = "none"
                    }
                }
                H.sendEvent(a.api.events.JWPLAYER_PLAYER_STATE, {
                    oldstate: O,
                    newstate: N
                });
                if (P) {
                    H.sendEvent(a.api.events.JWPLAYER_MEDIA_COMPLETE)
                }
            }
            n = false
        }
        function q(N) {
            var O = {
                height: N.target.videoHeight,
                width: N.target.videoWidth,
                duration: Math.round(N.target.duration * 10) / 10
            };
            if (h.duration === 0 || isNaN(h.duration)) {
                h.duration = Math.round(N.target.duration * 10) / 10
            }
            h.playlist[h.item] = a.utils.extend(h.playlist[h.item], O);
            H.sendEvent(a.api.events.JWPLAYER_MEDIA_META, {
                metadata: O
            })
        }
        function J(O) {
            if (n) {
                return
            }
            if (O !== undefined && O.target !== undefined) {
                if (h.duration === 0 || isNaN(h.duration)) {
                    h.duration = Math.round(O.target.duration * 10) / 10
                }
                if (!y && x.readyState > 0) {
                    s(a.api.events.state.PLAYING)
                }
                if (d == a.api.events.state.PLAYING) {
                    if (!y && x.readyState > 0) {
                        y = true;
                        try {
                            x.currentTime = h.playlist[h.item].start
                        } catch (N) {}
                        x.volume = h.volume / 100;
                        x.muted = h.mute
                    }
                    h.position = Math.round(O.target.currentTime * 10) / 10;
                    H.sendEvent(a.api.events.JWPLAYER_MEDIA_TIME, {
                        position: Math.round(O.target.currentTime * 10) / 10,
                        duration: Math.round(O.target.duration * 10) / 10
                    })
                }
            }
            z(O)
        }
        function E() {
            var N = (i[i.length - 1] - i[0]) / i.length;
            M = setTimeout(function () {
                if (!F) {
                    z({
                        lengthComputable: true,
                        loaded: 1,
                        total: 1
                    })
                }
            }, N * 10)
        }
        function z(P) {
            var O, N;
            if (P !== undefined && P.lengthComputable && P.total) {
                o();
                O = P.loaded / P.total * 100;
                N = O / 100 * (h.duration - x.currentTime);
                if (50 < O && !F) {
                    clearTimeout(M);
                    E()
                }
            } else {
                if ((x.buffered !== undefined) && (x.buffered.length > 0)) {
                    maxBufferIndex = 0;
                    if (maxBufferIndex >= 0) {
                        O = x.buffered.end(maxBufferIndex) / x.duration * 100;
                        N = x.buffered.end(maxBufferIndex) - x.currentTime
                    }
                }
            }
            if (D === false && d == a.api.events.state.BUFFERING) {
                D = true;
                H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER_FULL)
            }
            if (!F) {
                if (O == 100 && F === false) {
                    F = true
                }
                if (O !== null && (O > h.buffer)) {
                    h.buffer = Math.round(O);
                    H.sendEvent(a.api.events.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: Math.round(O)
                    })
                }
            }
        }
        function w() {
            if (A === null) {
                A = setInterval(function () {
                    J()
                }, 100)
            }
        }
        function p() {
            clearInterval(A);
            A = null
        }
        function l(P) {
            var O = "There was an error: ";
            if ((P.target.error && P.target.tagName.toLowerCase() == "video") || P.target.parentNode.error && P.target.parentNode.tagName.toLowerCase() == "video") {
                var N = P.target.error === undefined ? P.target.parentNode.error : P.target.error;
                switch (N.code) {
                case N.MEDIA_ERR_ABORTED:
                    O = "You aborted the video playback: ";
                    break;
                case N.MEDIA_ERR_NETWORK:
                    O = "A network error caused the video download to fail part-way: ";
                    break;
                case N.MEDIA_ERR_DECODE:
                    O = "The video playback was aborted due to a corruption problem or because the video used features your browser did not support: ";
                    break;
                case N.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    O = "The video could not be loaded, either because the server or network failed or because the format is not supported: ";
                    break;
                default:
                    O = "An unknown error occurred: ";
                    break
                }
            } else {
                if (P.target.tagName.toLowerCase() == "source") {
                    K--;
                    if (K > 0) {
                        return
                    }
                    O = "The video could not be loaded, either because the server or network failed or because the format is not supported: "
                } else {
                    a.html5.utils.log("Erroneous error received. Continuing...");
                    return
                }
            }
            u();
            O += j();
            B = true;
            H.sendEvent(a.api.events.JWPLAYER_ERROR, {
                error: O
            });
            return
        }
        function j() {
            var P = "";
            for (var O in L.levels) {
                var N = L.levels[O];
                var Q = x.ownerDocument.createElement("source");
                P += a.html5.utils.getAbsolutePath(N.file);
                if (O < (L.levels.length - 1)) {
                    P += ", "
                }
            }
            return P
        }
        this.getDisplayElement = function () {
            return x
        };
        this.play = function () {
            if (d != a.api.events.state.PLAYING) {
                if (x.style.display != "block") {
                    x.style.display = "block"
                }
                x.play();
                w()
            }
        };
        this.pause = function () {
            x.pause();
            s(a.api.events.state.PAUSED)
        };
        this.seek = function (N) {
            if (!(h.duration === 0 || isNaN(h.duration)) && !(h.position === 0 || isNaN(h.position))) {
                x.currentTime = N;
                x.play()
            }
        };

        function u() {
            x.pause();
            p();
            h.position = 0;
            n = true;
            s(a.api.events.state.IDLE)
        }
        this.stop = u;
        this.volume = function (N) {
            x.volume = N / 100;
            h.volume = N;
            H.sendEvent(a.api.events.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(N)
            })
        };
        this.mute = function (N) {
            x.muted = N;
            h.mute = N;
            H.sendEvent(a.api.events.JWPLAYER_MEDIA_MUTE, {
                mute: N
            })
        };
        this.resize = function (O, N) {
            if (false) {
                b(x, {
                    width: O,
                    height: N
                })
            }
            H.sendEvent(a.api.events.JWPLAYER_MEDIA_RESIZE, {
                fullscreen: h.fullscreen,
                width: O,
                hieght: N
            })
        };
        this.fullscreen = function (N) {
            if (N === true) {
                this.resize("100%", "100%")
            } else {
                this.resize(h.config.width, h.config.height)
            }
        };
        this.load = function (N) {
            I(N);
            H.sendEvent(a.api.events.JWPLAYER_MEDIA_LOADED);
            D = false;
            F = false;
            y = false;
            if (!h.config.chromeless) {
                i = [];
                o();
                s(a.api.events.state.BUFFERING);
                setTimeout(function () {
                    J()
                }, 25)
            }
        };

        function o() {
            var N = new Date().getTime();
            i.push(N)
        }
        this.hasChrome = function () {
            return r
        };

        function I(U) {
            h.duration = U.duration;
            r = false;
            L = U;
            var P = document.createElement("video");
            P.preload = "none";
            B = false;
            K = 0;
            for (var O in U.levels) {
                var N = U.levels[O];
                if (a.html5.utils.isYouTube(N.file)) {
                    delete P;
                    k(N.file);
                    return
                }
                var Q;
                if (N.type === undefined) {
                    var T = a.html5.utils.extension(N.file);
                    if (a.html5.extensionmap[T] !== undefined) {
                        Q = a.html5.extensionmap[T]
                    } else {
                        Q = "video/" + T + ";"
                    }
                } else {
                    Q = N.type
                }
                if (P.canPlayType(Q) === "") {
                    continue
                }
                var S = x.ownerDocument.createElement("source");
                S.src = a.html5.utils.getAbsolutePath(N.file);
                S.type = Q;
                K++;
                P.appendChild(S)
            }
            if (K === 0) {
                B = true;
                H.sendEvent(a.api.events.JWPLAYER_ERROR, {
                    error: "The video could not be loaded because the format is not supported by your browser: " + j()
                })
            }
            if (h.config.chromeless) {
                P.poster = a.html5.utils.getAbsolutePath(U.image);
                P.controls = "controls"
            }
            P.style.position = x.style.position;
            P.style.top = x.style.top;
            P.style.left = x.style.left;
            P.style.width = x.style.width;
            P.style.height = x.style.height;
            P.style.zIndex = x.style.zIndex;
            P.onload = e;
            P.volume = 0;
            x.parentNode.replaceChild(P, x);
            P.id = x.id;
            x = P;
            for (var R in G) {
                x.addEventListener(R, function (V) {
                    if (V.target.parentNode !== null) {
                        G[V.type](V)
                    }
                }, true)
            }
        }
        function k(R) {
            var O = document.createElement("object");
            R = ["http://www.youtube.com/v/", R.replace(/^[^v]+v.(.{11}).*/, "$1"), "&amp;hl=en_US&amp;fs=1&autoplay=1"].join("");
            var U = {
                movie: R,
                allowFullScreen: "true",
                allowscriptaccess: "always"
            };
            for (var N in U) {
                var S = document.createElement("param");
                S.name = N;
                S.value = U[N];
                O.appendChild(S)
            }
            var T = document.createElement("embed");
            var P = {
                src: R,
                type: "application/x-shockwave-flash",
                allowscriptaccess: "always",
                allowfullscreen: "true",
                width: document.getElementById(f.id).style.width,
                height: document.getElementById(f.id).style.height
            };
            for (var Q in P) {
                T[Q] = P[Q]
            }
            O.appendChild(T);
            O.style.position = x.style.position;
            O.style.top = x.style.top;
            O.style.left = x.style.left;
            O.style.width = document.getElementById(f.id).style.width;
            O.style.height = document.getElementById(f.id).style.height;
            O.style.zIndex = 2147483000;
            x.parentNode.replaceChild(O, x);
            O.id = x.id;
            x = O;
            r = true
        }
        this.embed = I;
        return this
    }
})(jwplayer);
(function (jwplayer) {
    var _configurableStateVariables = ["width", "height", "start", "duration", "volume", "mute", "fullscreen", "item", "plugins"];
    jwplayer.html5.model = function (api, container, options) {
        var _api = api;
        var _container = container;
        var _model = {
            id: _container.id,
            playlist: [],
            state: jwplayer.api.events.state.IDLE,
            position: 0,
            buffer: 0,
            config: {
                width: 480,
                height: 320,
                item: 0,
                skin: undefined,
                file: undefined,
                image: undefined,
                start: 0,
                duration: 0,
                bufferlength: 5,
                volume: 90,
                mute: false,
                fullscreen: false,
                repeat: "none",
                autostart: false,
                debug: undefined,
                screencolor: undefined
            }
        };
        var _media;
        var _eventDispatcher = new jwplayer.html5.eventdispatcher();
        var _components = ["display", "logo", "controlbar"];
        jwplayer.utils.extend(_model, _eventDispatcher);
        for (var option in options) {
            if (typeof options[option] == "string") {
                var type = /color$/.test(option) ? "color" : null;
                options[option] = jwplayer.html5.utils.typechecker(options[option], type)
            }
            var config = _model.config;
            var path = option.split(".");
            for (var edge in path) {
                if (edge == path.length - 1) {
                    config[path[edge]] = options[option]
                } else {
                    if (config[path[edge]] === undefined) {
                        config[path[edge]] = {}
                    }
                    config = config[path[edge]]
                }
            }
        }
        for (var index in _configurableStateVariables) {
            var configurableStateVariable = _configurableStateVariables[index];
            _model[configurableStateVariable] = _model.config[configurableStateVariable]
        }
        var pluginorder = _components.concat([]);
        if (_model.plugins !== undefined) {
            if (typeof _model.plugins == "string") {
                var userplugins = _model.plugins.split(",");
                for (var userplugin in userplugins) {
                    pluginorder.push(userplugin.replace(/^\s+|\s+$/g, ""))
                }
            } else {
                for (var plugin in _model.plugins) {
                    pluginorder.push(plugin.replace(/^\s+|\s+$/g, ""))
                }
            }
        }
        if (jwplayer.utils.isIOS()) {
            _model.config.chromeless = true
        }
        if (_model.config.chromeless) {
            pluginorder = []
        }
        _model.plugins = {
            order: pluginorder,
            config: {
                controlbar: {
                    position: jwplayer.html5.view.positions.BOTTOM
                }
            },
            object: {}
        };
        if (typeof _model.config.components != "undefined") {
            for (var component in _model.config.components) {
                _model.plugins.config[component] = _model.config.components[component]
            }
        }
        for (var pluginIndex in _model.plugins.order) {
            var pluginName = _model.plugins.order[pluginIndex];
            var pluginConfig = _model.config[pluginName] === undefined ? {} : _model.config[pluginName];
            _model.plugins.config[pluginName] = _model.plugins.config[pluginName] === undefined ? pluginConfig : jwplayer.utils.extend(_model.plugins.config[pluginName], pluginConfig);
            if (_model.plugins.config[pluginName].position === undefined) {
                _model.plugins.config[pluginName].position = jwplayer.html5.view.positions.OVER
            }
        }
        _model.loadPlaylist = function (arg, ready) {
            var input;
            if (typeof arg == "string") {
                try {
                    input = eval(arg)
                } catch (err) {
                    input = arg
                }
            } else {
                input = arg
            }
            var config;
            switch (jwplayer.utils.typeOf(input)) {
            case "object":
                config = input;
                break;
            case "array":
                config = {
                    playlist: input
                };
                break;
            default:
                config = {
                    file: input
                };
                break
            }
            _model.playlist = new jwplayer.html5.playlist(config);
            if (_model.config.shuffle) {
                _model.item = _getShuffleItem()
            } else {
                if (_model.config.item >= _model.playlist.length) {
                    _model.config.item = _model.playlist.length - 1
                }
                _model.item = _model.config.item
            }
            if (!ready) {
                _eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED);
                _eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_ITEM, {
                    item: _model.item
                })
            }
            _model.setActiveMediaProvider(_model.playlist[_model.item])
        };

        function _getShuffleItem() {
            var result = null;
            if (_model.playlist.length > 1) {
                while (result === null) {
                    result = Math.floor(Math.random() * _model.playlist.length);
                    if (result == _model.item) {
                        result = null
                    }
                }
            } else {
                result = 0
            }
            return result
        }
        function forward(evt) {
            if (evt.type == jwplayer.api.events.JWPLAYER_MEDIA_LOADED) {
                _container = _media.getDisplayElement()
            }
            _eventDispatcher.sendEvent(evt.type, evt)
        }
        _model.setActiveMediaProvider = function (playlistItem) {
            if (_media !== undefined) {
                _media.resetEventListeners()
            }
            _media = new jwplayer.html5.mediavideo(_model, _container);
            _media.addGlobalListener(forward);
            if (_model.config.chromeless) {
                _media.load(playlistItem)
            }
            return true
        };
        _model.getMedia = function () {
            return _media
        };
        _model.setupPlugins = function () {
            for (var plugin in _model.plugins.order) {
                try {
                    if (jwplayer.html5[_model.plugins.order[plugin]] !== undefined) {
                        _model.plugins.object[_model.plugins.order[plugin]] = new jwplayer.html5[_model.plugins.order[plugin]](_api, _model.plugins.config[_model.plugins.order[plugin]])
                    } else {
                        if (window[_model.plugins.order[plugin]] !== undefined) {
                            _model.plugins.object[_model.plugins.order[plugin]] = new window[_model.plugins.order[plugin]](_api, _model.plugins.config[_model.plugins.order[plugin]])
                        } else {
                            _model.plugins.order.splice(plugin, plugin + 1)
                        }
                    }
                } catch (err) {
                    jwplayer.html5.utils.log("Could not setup " + _model.plugins.order[plugin])
                }
            }
        };
        return _model
    }
})(jwplayer);
(function (a) {
    a.html5.playlist = function (b) {
        var d = [];
        if (b.playlist && b.playlist.length > 0) {
            for (var c in b.playlist) {
                d.push(new a.html5.playlistitem(b.playlist[c]))
            }
        } else {
            d.push(new a.html5.playlistitem(b))
        }
        return d
    }
})(jwplayer);
(function (a) {
    a.html5.playlistitem = function (c) {
        var b = {
            author: "",
            date: "",
            description: "",
            image: "",
            link: "",
            mediaid: "",
            tags: "",
            title: "",
            provider: "",
            file: "",
            streamer: "",
            duration: -1,
            start: 0,
            currentLevel: -1,
            levels: []
        };
        for (var d in b) {
            if (c[d] !== undefined) {
                b[d] = c[d]
            }
        }
        if (b.levels.length === 0) {
            b.levels[0] = new a.html5.playlistitemlevel(b)
        }
        return b
    }
})(jwplayer);
(function (a) {
    a.html5.playlistitemlevel = function (b) {
        var d = {
            file: "",
            streamer: "",
            bitrate: 0,
            width: 0
        };
        for (var c in d) {
            if (b[c] !== undefined) {
                d[c] = b[c]
            }
        }
        return d
    }
})(jwplayer);
(function (a) {
    a.html5.skin = function () {
        var b = {};
        var c = false;
        this.load = function (d, e) {
            new a.html5.skinloader(d, function (f) {
                c = true;
                b = f;
                e()
            }, function () {
                new a.html5.skinloader("", function (f) {
                    c = true;
                    b = f;
                    e()
                })
            })
        };
        this.getSkinElement = function (d, e) {
            if (c) {
                try {
                    return b[d].elements[e]
                } catch (f) {
                    a.html5.utils.log("No such skin component / element: ", [d, e])
                }
            }
            return null
        };
        this.getComponentSettings = function (d) {
            if (c) {
                return b[d].settings
            }
            return null
        };
        this.getComponentLayout = function (d) {
            if (c) {
                return b[d].layout
            }
            return null
        }
    }
})(jwplayer);
(function (a) {
    a.html5.skinloader = function (f, n, i) {
        var m = {};
        var c = n;
        var j = i;
        var e = true;
        var h;
        var l = f;
        var q = false;

        function k() {
            if (l === undefined || l === "") {
                d(a.html5.defaultSkin().xml)
            } else {
                a.utils.ajax(a.html5.utils.getAbsolutePath(l), function (r) {
                    d(r.responseXML)
                }, function (r) {
                    d(a.html5.defaultSkin().xml)
                })
            }
        }
        function d(w) {
            var C = w.getElementsByTagName("component");
            if (C.length === 0) {
                return
            }
            for (var F = 0; F < C.length; F++) {
                var A = C[F].getAttribute("name");
                var z = {
                    settings: {},
                    elements: {},
                    layout: {}
                };
                m[A] = z;
                var E = C[F].getElementsByTagName("elements")[0].getElementsByTagName("element");
                for (var D = 0; D < E.length; D++) {
                    b(E[D], A)
                }
                var x = C[F].getElementsByTagName("settings")[0];
                if (x !== undefined && x.childNodes.length > 0) {
                    var I = x.getElementsByTagName("setting");
                    for (var N = 0; N < I.length; N++) {
                        var O = I[N].getAttribute("name");
                        var G = I[N].getAttribute("value");
                        var v = /color$/.test(O) ? "color" : null;
                        m[A].settings[O] = a.html5.utils.typechecker(G, v)
                    }
                }
                var J = C[F].getElementsByTagName("layout")[0];
                if (J !== undefined && J.childNodes.length > 0) {
                    var K = J.getElementsByTagName("group");
                    for (var u = 0; u < K.length; u++) {
                        var y = K[u];
                        m[A].layout[y.getAttribute("position")] = {
                            elements: []
                        };
                        for (var M = 0; M < y.attributes.length; M++) {
                            var B = y.attributes[M];
                            m[A].layout[y.getAttribute("position")][B.name] = B.value
                        }
                        var L = y.getElementsByTagName("*");
                        for (var t = 0; t < L.length; t++) {
                            var r = L[t];
                            m[A].layout[y.getAttribute("position")].elements.push({
                                type: r.tagName
                            });
                            for (var s = 0; s < r.attributes.length; s++) {
                                var H = r.attributes[s];
                                m[A].layout[y.getAttribute("position")].elements[t][H.name] = H.value
                            }
                            if (m[A].layout[y.getAttribute("position")].elements[t].name === undefined) {
                                m[A].layout[y.getAttribute("position")].elements[t].name = r.tagName
                            }
                        }
                    }
                }
                e = false;
                p()
            }
        }
        function p() {
            clearInterval(h);
            if (!q) {
                h = setInterval(function () {
                    o()
                }, 100)
            }
        }
        function b(w, v) {
            var u = new Image();
            var r = w.getAttribute("name");
            var t = w.getAttribute("src");
            var y;
            if (t.indexOf("data:image/png;base64,") === 0) {
                y = t
            } else {
                var s = a.html5.utils.getAbsolutePath(l);
                var x = s.substr(0, s.lastIndexOf("/"));
                y = [x, v, t].join("/")
            }
            m[v].elements[r] = {
                height: 0,
                width: 0,
                src: "",
                ready: false
            };
            u.onload = function (z) {
                g(u, r, v)
            };
            u.onerror = function (z) {
                q = true;
                p();
                j()
            };
            u.src = y
        }
        function o() {
            for (var r in m) {
                if (r != "properties") {
                    for (var s in m[r].elements) {
                        if (!m[r].elements[s].ready) {
                            return
                        }
                    }
                }
            }
            if (e === false) {
                clearInterval(h);
                c(m)
            }
        }
        function g(r, t, s) {
            m[s].elements[t].height = r.height;
            m[s].elements[t].width = r.width;
            m[s].elements[t].src = r.src;
            m[s].elements[t].ready = true;
            p()
        }
        k()
    }
})(jwplayer);
(function (a) {
    var b = {};
    a.html5.utils.animations = function () {};
    a.html5.utils.animations.transform = function (c, d) {
        c.style.webkitTransform = d;
        c.style.MozTransform = d;
        c.style.OTransform = d
    };
    a.html5.utils.animations.transformOrigin = function (c, d) {
        c.style.webkitTransformOrigin = d;
        c.style.MozTransformOrigin = d;
        c.style.OTransformOrigin = d
    };
    a.html5.utils.animations.rotate = function (c, d) {
        a.html5.utils.animations.transform(c, ["rotate(", d, "deg)"].join(""))
    };
    a.html5.utils.cancelAnimation = function (c) {
        delete b[c.id]
    };
    a.html5.utils.fadeTo = function (l, f, e, i, h, d) {
        if (b[l.id] != d && d !== undefined) {
            return
        }
        var c = new Date().getTime();
        if (d > c) {
            setTimeout(function () {
                a.html5.utils.fadeTo(l, f, e, i, 0, d)
            }, d - c)
        }
        l.style.display = "block";
        if (i === undefined) {
            i = l.style.opacity === "" ? 1 : l.style.opacity
        }
        if (l.style.opacity == f && l.style.opacity !== "" && d !== undefined) {
            if (f === 0) {
                l.style.display = "none"
            }
            return
        }
        if (d === undefined) {
            d = c;
            b[l.id] = d
        }
        if (h === undefined) {
            h = 0
        }
        var j = (c - d) / (e * 1000);
        j = j > 1 ? 1 : j;
        var k = f - i;
        var g = i + (j * k);
        if (g > 1) {
            g = 1
        } else {
            if (g < 0) {
                g = 0
            }
        }
        l.style.opacity = g;
        if (h > 0) {
            b[l.id] = d + h * 1000;
            a.html5.utils.fadeTo(l, f, e, i, 0, b[l.id]);
            return
        }
        setTimeout(function () {
            a.html5.utils.fadeTo(l, f, e, i, 0, d)
        }, 10)
    }
})(jwplayer);
(function (c) {
    var d = new RegExp(/^(#|0x)[0-9a-fA-F]{3,6}/);
    c.html5.utils.typechecker = function (g, f) {
        f = f === null ? b(g) : f;
        return e(g, f)
    };

    function b(f) {
        var g = ["true", "false", "t", "f"];
        if (g.indexOf(f.toLowerCase().replace(" ", "")) >= 0) {
            return "boolean"
        } else {
            if (d.test(f)) {
                return "color"
            } else {
                if (!isNaN(parseInt(f, 10)) && parseInt(f, 10).toString().length == f.length) {
                    return "integer"
                } else {
                    if (!isNaN(parseFloat(f)) && parseFloat(f).toString().length == f.length) {
                        return "float"
                    }
                }
            }
        }
        return "string"
    }
    function e(g, f) {
        if (f === null) {
            return g
        }
        switch (f) {
        case "color":
            if (g.length > 0) {
                return a(g)
            }
            return null;
        case "integer":
            return parseInt(g, 10);
        case "float":
            return parseFloat(g);
        case "boolean":
            if (g.toLowerCase() == "true") {
                return true
            } else {
                if (g == "1") {
                    return true
                }
            }
            return false
        }
        return g
    }
    function a(f) {
        switch (f.toLowerCase()) {
        case "blue":
            return parseInt("0000FF", 16);
        case "green":
            return parseInt("00FF00", 16);
        case "red":
            return parseInt("FF0000", 16);
        case "cyan":
            return parseInt("00FFFF", 16);
        case "magenta":
            return parseInt("FF00FF", 16);
        case "yellow":
            return parseInt("FFFF00", 16);
        case "black":
            return parseInt("000000", 16);
        case "white":
            return parseInt("FFFFFF", 16);
        default:
            f = f.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
            if (f.length == 3) {
                f = f.charAt(0) + f.charAt(0) + f.charAt(1) + f.charAt(1) + f.charAt(2) + f.charAt(2)
            }
            return parseInt(f, 16)
        }
        return parseInt("000000", 16)
    }
})(jwplayer);
(function (a) {
    a.html5.api = function (b, j) {
        var i = {};
        if (!a.utils.hasHTML5()) {
            return i
        }
        var d = document.createElement("div");
        b.parentNode.replaceChild(d, b);
        d.id = b.id;
        i.version = a.html5.version;
        i.id = d.id;
        var h = new a.html5.model(i, d, j);
        var e = new a.html5.view(i, d, h);
        var g = new a.html5.controller(i, d, h, e);
        i.skin = new a.html5.skin();
        i.jwPlay = g.play;
        i.jwPause = g.pause;
        i.jwStop = g.stop;
        i.jwSeek = g.seek;
        i.jwPlaylistItem = g.item;
        i.jwPlaylistNext = g.next;
        i.jwPlaylistPrev = g.prev;
        i.jwResize = g.resize;
        i.jwLoad = g.load;

        function f(k) {
            return function () {
                return h[k]
            }
        }
        i.jwGetItem = f("item");
        i.jwGetPosition = f("position");
        i.jwGetDuration = f("duration");
        i.jwGetBuffer = f("buffer");
        i.jwGetWidth = f("width");
        i.jwGetHeight = f("height");
        i.jwGetFullscreen = f("fullscreen");
        i.jwSetFullscreen = g.setFullscreen;
        i.jwGetVolume = f("volume");
        i.jwSetVolume = g.setVolume;
        i.jwGetMute = f("mute");
        i.jwSetMute = g.setMute;
        i.jwGetState = f("state");
        i.jwGetVersion = function () {
            return i.version
        };
        i.jwGetPlaylist = function () {
            return h.playlist
        };
        i.jwAddEventListener = g.addEventListener;
        i.jwRemoveEventListener = g.removeEventListener;
        i.jwSendEvent = g.sendEvent;
        i.jwGetLevel = function () {};
        i.jwGetBandwidth = function () {};
        i.jwGetLockState = function () {};
        i.jwLock = function () {};
        i.jwUnlock = function () {};

        function c(m, l, k) {
            return function () {
                m.loadPlaylist(m.config, true);
                m.setupPlugins();
                l.setup(m.getMedia().getDisplayElement());
                var n = {
                    id: i.id,
                    version: i.version
                };
                k.sendEvent(a.api.events.JWPLAYER_READY, n);
                if (playerReady !== undefined) {
                    playerReady(n)
                }
                if (window[m.config.playerReady] !== undefined) {
                    window[m.config.playerReady](n)
                }
                m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_LOADED);
                m.sendEvent(a.api.events.JWPLAYER_PLAYLIST_ITEM, {
                    item: m.config.item
                });
                if (m.config.autostart === true && !m.config.chromeless) {
                    k.play()
                }
            }
        }
        if (h.config.chromeless) {
            setTimeout(c(h, e, g), 25)
        } else {
            i.skin.load(h.config.skin, c(h, e, g))
        }
        return i
    }
})(jwplayer);;
jQuery.preloadCssImages = function (settings) {
    settings = jQuery.extend({
        statusTextEl: null,
        statusBarEl: null,
        errorDelay: 999,
        simultaneousCacheLoading: 2
    }, settings);
    var allImgs = [],
        loaded = 0,
        imgUrls = [],
        thisSheetRules, errorTimer;

    function onImgComplete() {
        clearTimeout(errorTimer);
        if (imgUrls && imgUrls.length && imgUrls[loaded]) {
            loaded++;
            if (settings.statusTextEl) {
                var nowloading = (imgUrls[loaded]) ? 'Now Loading: <span>' + imgUrls[loaded].split('/')[imgUrls[loaded].split('/').length - 1] : 'Loading complete';
                jQuery(settings.statusTextEl).html('<span class="numLoaded">' + loaded + '</span> of <span class="numTotal">' + imgUrls.length + '</span> loaded (<span class="percentLoaded">' + (loaded / imgUrls.length * 100).toFixed(0) + '%</span>) <span class="currentImg">' + nowloading + '</span></span>');
            }
            if (settings.statusBarEl) {
                var barWidth = jQuery(settings.statusBarEl).width();
                jQuery(settings.statusBarEl).css('background-position', -(barWidth - (barWidth * loaded / imgUrls.length).toFixed(0)) + 'px 50%');
            }
            loadImgs();
        }
    }

    function loadImgs() {
        if (imgUrls && imgUrls.length && imgUrls[loaded]) {
            var img = new Image();
            img.src = imgUrls[loaded];
            if (!img.complete) {
                jQuery(img).bind('error load onreadystatechange', onImgComplete);
            } else {
                onImgComplete();
            }
            errorTimer = setTimeout(onImgComplete, settings.errorDelay);
        }
    }

    function parseCSS(sheets, urls) {
        var w3cImport = false,
            imported = [],
            importedSrc = [],
            baseURL;
        var sheetIndex = sheets.length;
        while (sheetIndex--) {
            var cssPile = '';
            if (urls && urls[sheetIndex]) {
                baseURL = urls[sheetIndex];
            } else {
                var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
                var baseURLarr = csshref.split('/');
                baseURLarr.pop();
                baseURL = baseURLarr.join('/');
                if (baseURL) {
                    baseURL += '/';
                }
            }
            if (sheets[sheetIndex].cssRules || sheets[sheetIndex].rules) {
                thisSheetRules = (sheets[sheetIndex].cssRules) ? sheets[sheetIndex].cssRules : sheets[sheetIndex].rules;
                var ruleIndex = thisSheetRules.length;
                while (ruleIndex--) {
                    if (thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText) {
                        var text = thisSheetRules[ruleIndex].style.cssText;
                        if (text.toLowerCase().indexOf('url') != -1) {
                            cssPile += text;
                        }
                    } else if (thisSheetRules[ruleIndex].styleSheet) {
                        imported.push(thisSheetRules[ruleIndex].styleSheet);
                        w3cImport = true;
                    }
                }
            }
            var tmpImage = cssPile.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);
            if (tmpImage) {
                var i = tmpImage.length;
                while (i--) {
                    var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? tmpImage[i] : baseURL + tmpImage[i];
                    if (jQuery.inArray(imgSrc, imgUrls) == -1) {
                        imgUrls.push(imgSrc);
                    }
                }
            }
            if (!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
                for (var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++) {
                    var iHref = sheets[sheetIndex].imports[iImport].href;
                    iHref = iHref.split('/');
                    iHref.pop();
                    iHref = iHref.join('/');
                    if (iHref) {
                        iHref += '/';
                    }
                    var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? iHref : baseURL + iHref;
                    importedSrc.push(iSrc);
                    imported.push(sheets[sheetIndex].imports[iImport]);
                }
            }
        }
        if (imported.length) {
            parseCSS(imported, importedSrc);
            return false;
        }
        var downloads = settings.simultaneousCacheLoading;
        while (downloads--) {
            setTimeout(loadImgs, downloads);
        }
    }
    parseCSS(document.styleSheets);
    return imgUrls;
};
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
(function ($) {
    var types = ['DOMMouseScroll', 'mousewheel'];
    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
        }
        if (event.detail) {
            delta = -event.detail / 3;
        }
        deltaY = delta;
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }
        args.unshift(event, delta, deltaX, deltaY);
        return $.event.handle.apply(this, args);
    }
})(jQuery);
(function ($) {
    var locationWrapper = {
        put: function (hash, win) {
            (win || window).location.hash = this.encoder(hash);
        },
        get: function (win) {
            var hash = ((win || window).location.hash).replace(/^#/, '');
            try {
                return $.browser.mozilla ? hash : decodeURIComponent(hash);
            } catch (error) {
                return hash;
            }
        },
        encoder: encodeURIComponent
    };
    var iframeWrapper = {
        id: "__jQuery_history",
        init: function () {
            var html = '<iframe id="' + this.id + '" style="display:none" src="javascript:false;" />';
            $("body").prepend(html);
            return this;
        },
        _document: function () {
            return $("#" + this.id)[0].contentWindow.document;
        },
        put: function (hash) {
            var doc = this._document();
            doc.open();
            doc.close();
            locationWrapper.put(hash, doc);
        },
        get: function () {
            return locationWrapper.get(this._document());
        }
    };

    function initObjects(options) {
        options = $.extend({
            unescape: false
        }, options || {});
        locationWrapper.encoder = encoder(options.unescape);

        function encoder(unescape_) {
            if (unescape_ === true) {
                return function (hash) {
                    return hash;
                };
            }
            if (typeof unescape_ == "string" && (unescape_ = partialDecoder(unescape_.split(""))) || typeof unescape_ == "function") {
                return function (hash) {
                    return unescape_(encodeURIComponent(hash));
                };
            }
            return encodeURIComponent;
        }

        function partialDecoder(chars) {
            var re = new RegExp($.map(chars, encodeURIComponent).join("|"), "ig");
            return function (enc) {
                return enc.replace(re, decodeURIComponent);
            };
        }
    }
    var _ = {
        appState: undefined,
        callback: undefined,
        init: function (callback, options) {},
        check: function () {},
        load: function (hash) {}
    };
    $.history = _;
    var SimpleImpl = {
        init: function (callback, options) {
            initObjects(options);
            _.callback = callback;
            var current_hash = locationWrapper.get();
            _.appState = current_hash;
            _.callback(current_hash);
            setInterval(_.check, 100);
        },
        check: function () {
            var current_hash = locationWrapper.get();
            if (current_hash != _.appState) {
                _.appState = current_hash;
                _.callback(current_hash);
            }
        },
        load: function (hash) {
            if (hash != _.appState) {
                locationWrapper.put(hash);
                _.appState = hash;
                _.callback(hash);
            }
        }
    };
    var IframeImpl = {
        init: function (callback, options) {
            initObjects(options);
            _.callback = callback;
            var current_hash = locationWrapper.get();
            _.appState = current_hash;
            iframeWrapper.init().put(current_hash);
            _.callback(current_hash);
            setInterval(_.check, 100);
        },
        check: function () {
            var iframe_hash = iframeWrapper.get(),
                location_hash = locationWrapper.get();
            if (location_hash != iframe_hash) {
                if (location_hash == _.appState) {
                    _.appState = iframe_hash;
                    locationWrapper.put(iframe_hash);
                    _.callback(iframe_hash);
                } else {
                    _.appState = location_hash;
                    iframeWrapper.put(location_hash);
                    _.callback(location_hash);
                }
            }
        },
        load: function (hash) {
            if (hash != _.appState) {
                locationWrapper.put(hash);
                iframeWrapper.put(hash);
                _.appState = hash;
                _.callback(hash);
            }
        }
    };
    if ($.browser.msie && ($.browser.version < 8 || document.documentMode < 8)) {
        $.extend(_, IframeImpl);
    } else {
        $.extend(_, SimpleImpl);
    }
})(jQuery);
(function ($, doc, outside) {
    '$:nomunge';
    $.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '), function (event_name) {
        jq_addOutsideEvent(event_name);
    });
    jq_addOutsideEvent('focusin', 'focus' + outside);
    jq_addOutsideEvent('focusout', 'blur' + outside);
    $.addOutsideEvent = jq_addOutsideEvent;

    function jq_addOutsideEvent(event_name, outside_event_name) {
        outside_event_name = outside_event_name || event_name + outside;
        var elems = $(),
            event_namespaced = event_name + '.' + outside_event_name + '-special-event';
        $.event.special[outside_event_name] = {
            setup: function () {
                elems = elems.add(this);
                if (elems.length === 1) {
                    $(doc).bind(event_namespaced, handle_event);
                }
            },
            teardown: function () {
                elems = elems.not(this);
                if (elems.length === 0) {
                    $(doc).unbind(event_namespaced);
                }
            },
            add: function (handleObj) {
                var old_handler = handleObj.handler;
                handleObj.handler = function (event, elem) {
                    event.target = elem;
                    old_handler.apply(this, arguments);
                };
            }
        };

        function handle_event(event) {
            $(elems).each(function () {
                var elem = $(this);
                if (this !== event.target && !elem.has(event.target).length) {
                    elem.triggerHandler(outside_event_name, [event.target]);
                }
            });
        };
    };
})(jQuery, document, "outside");
jQuery.font = {
    test: function (user_family, base_family, user_weight, base_weight) {
        var base = {
            family: 'monospace',
            weight: '400'
        };
        var user = {
            family: 'monospace',
            weight: '400'
        };
        base.family = (typeof (base_family) != 'undefined') ? base_family : base.family;
        base.weight = (typeof (base_weight) != 'undefined') ? base_weight : base.weight;
        user.family = (typeof (user_family) != 'undefined') ? user_family : user.family;
        user.weight = (typeof (user_weight) != 'undefined') ? user_weight : user.weight;
        $('body').prepend('<p id="jQuery-Font-Test" style="font-family:' + base.family + ';font-size:72px;font-weight:' + base.weight + ';height:auto;left:-9999px;position:absolute;top:-9999px;visibility:hidden;width:auto;">The quick brown fox jumps over a lazy dog.</p>');
        var baseX = $('p#jQuery-Font-Test').width();
        var baseY = $('p#jQuery-Font-Test').height();
        $('p#jQuery-Font-Test').css({
            'font-family': (user.family + ',' + base.family),
            'font-weight': user.weight
        });
        var userX = $('p#jQuery-Font-Test').width();
        var userY = $('p#jQuery-Font-Test').height();
        $('p#jQuery-Font-Test').remove();
        return (((userY != baseY) || (userX != baseX)) ? true : false);
    }
};
(function ($) {
    if ($.browser.mozilla) {
        $.fn.disableTextSelect = function () {
            return this.each(function () {
                $(this).css({
                    'MozUserSelect': 'none'
                });
            });
        };
        $.fn.enableTextSelect = function () {
            return this.each(function () {
                $(this).css({
                    'MozUserSelect': ''
                });
            });
        };
    } else if ($.browser.msie) {
        $.fn.disableTextSelect = function () {
            return this.each(function () {
                $(this).bind('selectstart.disableTextSelect', function () {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function () {
            return this.each(function () {
                $(this).unbind('selectstart.disableTextSelect');
            });
        };
    } else {
        $.fn.disableTextSelect = function () {
            return this.each(function () {
                $(this).bind('mousedown.disableTextSelect', function () {
                    return false;
                });
            });
        };
        $.fn.enableTextSelect = function () {
            return this.each(function () {
                $(this).unbind('mousedown.disableTextSelect');
            });
        };
    }
})(jQuery);

function serialize(obj) {
    var returnVal;
    if (obj != undefined) {
        switch (obj.constructor) {
        case Array:
            var vArr = "[";
            for (var i = 0; i < obj.length; i++) {
                if (i > 0) vArr += ",";
                vArr += serialize(obj[i]);
            }
            vArr += "]";
            return vArr;
        case String:
            returnVal = '"' + escape(obj) + '"';
            return returnVal;
        case Number:
            returnVal = isFinite(obj) ? obj.toString() : null;
            return returnVal;
        case Date:
            returnVal = "#" + obj + "#";
            return returnVal;
        default:
            if (typeof obj == "object") {
                var vobj = [];
                for (attr in obj) {
                    if (typeof obj[attr] != "function") {
                        vobj.push('"' + attr + '":' + serialize(obj[attr]));
                    }
                }
                if (vobj.length > 0) return "{" + vobj.join(",") + "}";
                else return "{}";
            } else {
                return obj.toString();
            }
        }
    }
    return null;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function setData(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            localStorage.clear();
            try {
                localStorage.setItem(key, value);
            } catch (e) {}
        }
    }
}

function getData(key, url, func) {
    var value = localStorage.getItem(key);
    if (value != null) {
        func(value);
    } else {
        $.ajax({
            type: "get",
            url: url,
            cache: true,
            success: function (response) {
                setData(key, response);
                func(response);
            }
        });
    }
}

function put_options_to_screen() {
    $('#display_arabic').checkBox('changeCheckStatus', stat.display.mode.a);
    $('#display_english').checkBox('changeCheckStatus', stat.display.mode.e);
    $('#display_word').checkBox('changeCheckStatus', stat.display.mode.w);
    $('#display_tajweed').checkBox('changeCheckStatus', stat.display.mode.t);
    $('#Language-0 ul a[href="#' + stat.display.languages[0] + '"]').trigger('click');
    $('#Language-1 ul a[href="#' + stat.display.languages[1] + '"]').trigger('click');
    $('#Language-2 ul a[href="#' + stat.display.languages[2] + '"]').trigger('click');
    $('#Language-1').toggle(stat.display.languages[1] > 0);
    $('#Language-2').toggle(stat.display.languages[2] > 0);
    $('#add-language-0').toggle(stat.display.languages[1] == 0);
    $('#add-language-1').toggle((stat.display.languages[1] != 0) && (stat.display.languages[2] == 0));
    $('#remove-language-0').toggle(stat.display.languages[1] != 0);
    $('#arabic_mode_continuous').checkBox('changeCheckStatus', stat.display.arabic_mode.continuous);
    $('#arabic_mode_verse').checkBox('changeCheckStatus', stat.display.arabic_mode.verses_per_line);
    $('#english_mode_continuous').checkBox('changeCheckStatus', stat.display.english_mode.continuous);
    $('#english_mode_verse').checkBox('changeCheckStatus', stat.display.english_mode.verses_per_line);
    $('#Container_ArabicFont ul a[href="#' + stat.display.font + '"]').trigger('click');
    $('#download_font').attr('rel', stat.display.font);
    $('#Container_Reciter ul a[href="#' + stat.playback.reciter + '"]').trigger('click');
    $('#play_english').checkBox('changeCheckStatus', stat.playback.english);
    $('#repeat_count').val(stat.playback.repeat.verse);
    $('#repeat_chapters_count').val(stat.playback.repeat.chapter);
    $('#autoplay_verse').checkBox('changeCheckStatus', stat.playback.autoplay.verse);
    $('#autoplay_chapter').checkBox('changeCheckStatus', stat.playback.autoplay.chapter);
    $('#waitmode_continuous').checkBox('changeCheckStatus', stat.playback.wait.continuous);
    $('#waitmode_verse').checkBox('changeCheckStatus', stat.playback.wait.duration_of_verses);
    $('#waitmode_period').checkBox('changeCheckStatus', stat.playback.wait.wait);
    $('#wait_period').val(stat.playback.wait.wait_period);
}

function set_status_from_screen() {
    stat.display.mode.a = $('#display_arabic').attr('checked');
    stat.display.mode.e = $('#display_english').attr('checked');
    stat.display.mode.w = $('#display_word').attr('checked');
    stat.display.mode.t = $('#display_tajweed').attr('checked');
    stat.display.languages[0] = parseInt($('#L0').val());
    stat.display.languages[1] = parseInt($('#L1').val());
    stat.display.languages[2] = parseInt($('#L2').val());
    stat.display.arabic_mode.continuous = $('#arabic_mode_continuous').attr('checked');
    stat.display.arabic_mode.verses_per_line = $('#arabic_mode_verse').attr('checked');
    stat.display.english_mode.continuous = $('#english_mode_continuous').attr('checked');
    stat.display.english_mode.verses_per_line = $('#english_mode_verse').attr('checked');
    stat.display.font = $('#ArabicFont').val();
    if ((stat.display.font != "arial") && (!fontface(stat.display.font))) stat.display.font = "arial";
    stat.playback.reciter = $('#Reciter').val();
    stat.playback.english = $('#play_english').attr('checked');
    stat.playback.repeat.verse = parseInt($('#repeat_count').val());
    if (!stat.playback.repeat.verse) stat.playback.repeat.verse = 1;
    stat.playback.repeat.chapter = parseInt($('#repeat_chapters_count').val());
    if (!stat.playback.repeat.chapter) stat.playback.repeat.chapter = 1;
    stat.playback.autoplay.verse = $('#autoplay_verse').attr('checked');
    stat.playback.autoplay.chapter = $('#autoplay_chapter').attr('checked');
    stat.playback.wait.continuous = $('#waitmode_continuous').attr('checked');
    stat.playback.wait.duration_of_verses = $('#waitmode_verse').attr('checked');
    stat.playback.wait.wait = $('#waitmode_period').attr('checked');
    stat.playback.wait.wait_period = parseInt($('#wait_period').val());
}

function fix_popup_position(animate) {
    animate = typeof (animate) != 'undefined' ? animate : false;
    $('div.popup').each(function () {
        if ($(this).is(':visible')) {
            if (animate) {
                $(this).animate({
                    marginTop: -parseInt($(this).height() / 2)
                }, 'slow');
            } else {
                $(this).css({
                    marginTop: -parseInt($(this).height() / 2)
                });
            }
        }
    });
}
$(function () {
    $('div.popup').each(function () {
        $(this).css('margin-left', -parseInt($(this).width() / 2));
        $(this).css('margin-top', -parseInt($(this).height() / 2));
    });
    $('a.popup_btn').click(function () {
        $('div.popup').each(function () {
            if ($(this).is(':visible')) $(this).fadeOut();
        });
        put_options_to_screen();
        $('.overlay').fadeTo(400, 0.5);
        $($(this).attr('href')).fadeIn(function () {
            $(this).find('.PopupSelectBox').each(function (event) {
                var p = $(this).position();
                var s = $(this).parents('.PopupConents').eq(0).get(0).offsetHeight - p.top - 28;
                if (s < 200) {
                    var c = $(this).find('.optionsList').css('height', s - 10);
                }
            });
        });
        fix_popup_position();
        return false;
    });
    $('.overlay, .shadowbox_nav_close').click(function () {
        $('.overlay').fadeOut();
        $('.popup').fadeOut();
        return false;
    });
    $('.PopupSelectBox').each(function (event) {
        $('<input type="hidden" value="" />').attr('id', $(this).attr('id')).attr('name', $(this).attr('id')).appendTo(this);
        $(this).attr('id', 'Container_' + $(this).attr('id'));
        if ($(this).find('.Value').text() == '-') {
            $(this).find('.Value').text($(this).find('.optionsList a:first').text());
            $(this).find('input').val($(this).find('.optionsList a:first').attr('id'));
        }
    });
    $('.PopupSelectBox').click(function (event) {
        $(this).find('.optionsList').toggle();
        event.stopPropagation();
    });
    $('.PopupSelectBox').bind("clickoutside", function (event) {
        if ($(this).find('.optionsList:visible').size() > 0) $(this).trigger('click');
    });
    $('.PopupSelectBox .optionsList a').click(function (event) {
        $(this).parents('.PopupSelectBox').find('.Value').text($(this).text());
        $(this).parents('.PopupSelectBox').find('.optionsList').hide();
        $(this).parents('.PopupSelectBox').find('input').val($(this).attr('href').replace(/^.*#/, ''));
        return false;
    });
    $('input.submit').click(function () {
        $('.overlay').fadeOut();
        $('.popup').fadeOut();
        if ($(this).hasClass('refresh')) {
            var old_hash = status_to_hash();
            set_status_from_screen();
            save_status_to_cookie();
            lastclick = 'fp';
            if (old_hash != status_to_hash()) {
                refresh_screen();
            } else {
                player_new_sura($('#ayas span.value').text());
                if ($(this).attr('id') == 'display_submit') {
                    load_screen();
                } else if ($(this).attr('id') == 'playback_submit') {
                    set_english_active_mode();
                }
            }
        }
        return false;
    });
    $('#display_popup #display_list input').click(function () {
        if (($(this).attr('id') == 'display_arabic') && $('input#display_tajweed').attr('checked')) $('#display_tajweed').checkBox('changeCheckStatus', false);
        if (($(this).attr('id') == 'display_tajweed') && $('input#display_arabic').attr('checked')) $('#display_arabic').checkBox('changeCheckStatus', false);
        if (!($('input#display_arabic').attr('checked') || $('input#display_english').attr('checked') || $('input#display_word').attr('checked') || $('input#display_tajweed').attr('checked'))) $('#display_popup #display_list input#' + $(this).attr('id')).checkBox('changeCheckStatus', true);
    });
    $('#display_popup .add-language').click(function () {
        if (!$('#Language-1').is(':visible')) {
            $('#display_popup #Language-1').show();
            $('#display_popup #add-language-0').hide();
            $('#display_popup #add-language-1').show();
        } else if (!$('#Language-2').is(':visible')) {
            $('#display_popup #Language-2').show();
            $('#display_popup #add-language-1').hide();
        }
        $('#remove-language-0').show();
        fix_popup_position(true);
        return false;
    });
    $('#display_popup #remove-language-0').click(function () {
        if (!$('#Language-2').is(':visible')) {
            $('#Language-0 .optionsList a[href="#' + $('#L1').val() + '"]').trigger('click');
            $('#Language-1 .optionsList a[href="#0"]').trigger('click');
            $('#Language-1').hide();
            $('#display_popup #add-language-0').show();
            $('#display_popup #add-language-1').hide();
            $('#display_popup #remove-language-0').hide();
        } else {
            $('#Language-0 .optionsList a[href="#' + $('#L1').val() + '"]').trigger('click');
            $('#Language-1 .optionsList a[href="#' + $('#L2').val() + '"]').trigger('click');
            $('#Language-2 .optionsList a[href="#0"]').trigger('click');
            $('#Language-2').hide();
            $('#display_popup #add-language-1').show();
        }
        fix_popup_position(true);
        return false;
    });
    $('#display_popup #remove-language-1').click(function () {
        if (!$('#Language-2').is(':visible')) {
            $('#Language-1 .optionsList a[href="#0"]').trigger('click');
            $('#Language-1').hide();
            $('#display_popup #add-language-1').hide();
            $('#display_popup #add-language-0').show();
            $('#display_popup #remove-language-0').hide();
        } else {
            $('#Language-1 .optionsList a[href="#' + $('#L2').val() + '"]').trigger('click');
            $('#display_popup #remove-language-2').trigger('click');
            $('#display_popup #add-language-0').hide();
            $('#display_popup #add-language-1').show();
        }
        fix_popup_position(true);
        return false;
    });
    $('#display_popup #remove-language-2').click(function () {
        $('#Language-2').hide();
        $('#Language-2 .optionsList a[href="#0"]').trigger('click');
        $('#display_popup #add-language-0').hide();
        $('#display_popup #add-language-1').show();
        fix_popup_position(true);
        return false;
    });
    $('a.font').click(function () {
        $('#font-alert').toggle(($('#ArabicFont').val() != 'arial') && (!fontface($('#ArabicFont').val())));
        $('#download_font').attr('rel', $('#ArabicFont').val());
    });
    $('.popup input').focus(function () {
        if ($(this).attr('type') == 'text') this.select();
    });
    $('textarea[maxlength]').keyup(function () {
        var max = parseInt($(this).attr('maxlength'));
        if ($(this).val().length > max) $(this).val($(this).val().substr(0, $(this).attr('maxlength')));
        $(this).parent().find('.charsRemaining').html((max - $(this).val().length) + ' characters remaining');
    });
    $('#about_popup a.tab').click(function () {
        var id = $(this).attr('rel');
        $('#about_popup a.tab').removeClass('Active');
        $(this).addClass('Active');
        $('#about_popup div.tab[id!="' + id + '"]').hide();
        $('#about_popup #' + id).show();
        fix_popup_position(true);
        return false;
    });
    $('#about_btn').click(function () {
        $('#about_popup a[rel=about]').trigger('click');
    });
});

function activate_tooltips(selector) {
    var tooltip_timer = false;
    $(selector).each(function () {
        $(this).attr('tip', $(this).attr('title')).removeAttr('title');
    }).hover(function (e) {
        var $el = $(this);
        tooltip_timer = setTimeout(function () {
            $('#tooltip #tiptext').html($el.attr('tip') ? $el.attr('tip') : $el.attr('title'));
            var offset = $el.offset();
            var top = offset.top - 40;
            var left = offset.left + parseInt($el.width() / 2) - 20;
            $('#tooltip').css({
                top: top,
                left: left
            });
            var w = 13;
            var x = left + $('#tooltip').width() - $(window).width() + 17;
            if (x > 0) {
                $('#tooltip').css('left', left - x);
                w += x;
            }
            $('#tooltip .b .s').css('width', w);
            $('#tooltip .b .c').css('width', 1).css('width', $('#tooltip').width() - w - 24);
            $('#tooltip').fadeIn(500);
        }, 500);
    }, function () {
        clearTimeout(tooltip_timer);
        $('#tooltip').hide();
    });
}
$(function () {
    $('#contact_btn').click(function () {
        $('#contact_popup #name, #contact_popup #email, #contact_popup #subject, #contact_popup #message, #contact_popup #contact_subscribe').val('');
        $('#Container_InquiryIssue a[href="#0"]').trigger('click');
        if (!$('#contact_popup #contact_subscribe').attr('checked')) $('#contact_popup #contact_subscribe').trigger('click');
        $('#contact_popup #message').trigger('keyup');
        $('#contact_popup .error').html('').hide();
        $('#contact_popup label').css('color', 'black');
        fix_popup_position(false);
    });
    $('#contact_popup input.submit').unbind('click').bind('click', function () {
        var ok = true;
        var msg = [];
        if ($('#name').val().replace(/^\s+|\s+$/g, "").length == 0) {
            $('#name').parent().find('.required').show();
            $('#name').parent().find('label').css('color', 'red');
            msg.push('You must enter your name.');
            ok = false;
        } else {
            $('#name').parent().find('.required').hide();
            $('#name').parent().find('label').css('color', 'black');
        }
        if ($('#contact_popup input#email').val().search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1) {
            $('#email').parent().find('.required').show();
            $('#email').parent().find('label').css('color', 'red');
            msg.push('You must enter your email.');
            ok = false;
        } else {
            $('#email').parent().find('.required').hide();
            $('#email').parent().find('label').css('color', 'black');
        }
        if (!(parseInt($('input#InquiryIssue').val()) > 0)) {
            $('#Container_InquiryIssue').parent().find('.required').show();
            $('#Container_InquiryIssue').parent().find('label').css('color', 'red');
            msg.push('You must select an issue.');
            ok = false;
        } else {
            $('#Container_InquiryIssue').parent().find('.required').hide();
            $('#Container_InquiryIssue').parent().find('label').css('color', 'black');
        }
        if ($('#subject').val().replace(/^\s+|\s+$/g, "").length == 0) {
            $('#subject').parent().find('.required').show();
            $('#subject').parent().find('label').css('color', 'red');
            msg.push('You must enter a subject.');
            ok = false;
        } else {
            $('#subject').parent().find('.required').hide();
            $('#subject').parent().find('label').css('color', 'black');
        }
        if ($('textarea#message').eq(0).val().replace(/^\s+|\s+$/g, "").length == 0) {
            $('#message').parent().find('.required').show();
            $('#message').parent().find('label').css('color', 'red');
            msg.push('You must enter a message.');
            ok = false;
        } else {
            $('#message').parent().find('.required').hide();
            $('#message').parent().find('label').css('color', 'black');
        }
        if (ok) {
            $('#contact_popup .error').html('').hide();
            $.ajax({
                type: "post",
                url: 'contact',
                data: {
                    'name': $('#contact_popup #name').val(),
                    'email': $('#contact_popup #email').val(),
                    'issue': $('#contact_popup span#inquiry-issue').text(),
                    'subject': $('#contact_popup #subject').val(),
                    'message': $('#contact_popup #message').val(),
                    'subscribe': $('#contact_popup #contact_subscribe').attr('checked')
                },
                success: function (response) {
                    $('#message-text').text('Message successfully sent');
                    $('#contact_popup').fadeOut(400, function () {
                        $('#message_popup').fadeIn(400, function () {
                            setTimeout(function () {
                                $('#message_popup').fadeOut();
                                $('.overlay').fadeOut();
                            }, 3000);
                        });
                    });
                }
            });
        } else {
            $('#contact_popup .error').html(msg.join('<br>')).show();
            fix_popup_position(true);
        }
        return false;
    });
});
var stat_defaults = {
    sura: 1,
    tafsir: {
        visible: false,
        page: 1
    },
    display: {
        mode: {
            a: true,
            e: true,
            w: true,
            t: false
        },
        font: "pdms",
        arabic_mode: {
            continuous: true,
            verses_per_line: false
        },
        english_mode: {
            continuous: true,
            verses_per_line: false
        },
        languages: [LANGUAGE_ENGLISH, LANGUAGE_NON, LANGUAGE_NON]
    },
    playback: {
        reciter: "abdullah_basfar",
        english: false,
        repeat: {
            verse: 1,
            chapter: 1
        },
        autoplay: {
            verse: true,
            chapter: false
        },
        wait: {
            continuous: true,
            duration_of_verses: false,
            wait: false,
            wait_period: 0
        }
    }
};
var stat = stat_defaults;
var lastclick = '';

function set_default_status() {
    stat.sura = 1;
    stat.tafsir.visible = false;
    stat.tafsir.page = 1;
}

function fix_status() {
    if (typeof (stat.display) == 'undefined') stat.display = stat_defaults.display;
    if (typeof (stat.display.mode) == 'undefined') stat.display.mode = stat_defaults.display.mode;
    if (typeof (stat.display.font) == 'undefined') stat.display.font = stat_defaults.display.font;
    if (typeof (stat.display.arabic_mode) == 'undefined') stat.display.arabic_mode = stat_defaults.display.arabic_mode;
    if (typeof (stat.display.arabic_mode.continuous) == 'undefined') stat.display.arabic_mode.continuous = stat_defaults.display.arabic_mode.continuous;
    if (typeof (stat.display.arabic_mode.verses_per_line) == 'undefined') stat.display.arabic_mode.verses_per_line = stat_defaults.display.arabic_mode.verses_per_line;
    if (typeof (stat.display.english_mode) == 'undefined') stat.display.english_mode = stat_defaults.display.english_mode;
    if (typeof (stat.display.english_mode.continuous) == 'undefined') stat.display.english_mode.continuous = stat_defaults.display.english_mode.continuous;
    if (typeof (stat.display.english_mode.verses_per_line) == 'undefined') stat.display.english_mode.verses_per_line = stat_defaults.display.english_mode.verses_per_line;
    if (typeof (stat.display.languages) == 'undefined') stat.display.languages = stat_defaults.display.languages;
    if (typeof (stat.playback) == 'undefined') stat.playback = stat_defaults.playback;
    if (typeof (stat.playback.reciter) == 'undefined') stat.playback.reciter = stat_defaults.playback.reciter;
    if (typeof (stat.playback.english) == 'undefined') stat.playback.english = stat_defaults.playback.english;
    if (typeof (stat.playback.repeat) == 'undefined') stat.playback.repeat = stat_defaults.playback.repeat;
    if (typeof (stat.playback.repeat.verse) == 'undefined') stat.playback.repeat.verse = stat_defaults.playback.repeat.verse;
    if (typeof (stat.playback.repeat.chapter) == 'undefined') stat.playback.repeat.chapter = stat_defaults.playback.repeat.chapter;
    if (typeof (stat.playback.autoplay) == 'undefined') stat.playback.autoplay = stat_defaults.playback.autoplay;
    if (typeof (stat.playback.autoplay.verse) == 'undefined') stat.playback.autoplay.verse = stat_defaults.playback.autoplay.verse;
    if (typeof (stat.playback.autoplay.chapter) == 'undefined') stat.playback.autoplay.chapter = stat_defaults.playback.autoplay.chapter;
    if (typeof (stat.playback.wait) == 'undefined') stat.playback.wait = stat_defaults.playback.wait;
    if (typeof (stat.playback.wait.continuous) == 'undefined') stat.playback.wait.continuous = stat_defaults.playback.wait.continuous;
    if (typeof (stat.playback.wait.duration_of_verses) == 'undefined') stat.playback.wait.duration_of_verses = stat_defaults.playback.wait.duration_of_verses;
    if (typeof (stat.playback.wait.wait) == 'undefined') stat.playback.wait.wait = stat_defaults.playback.wait.wait;
    if (typeof (stat.playback.wait.wait_period) == 'undefined') stat.playback.wait.wait_period = stat_defaults.playback.wait.wait_period;
}

function status_to_hash(params) {
    params = typeof (params) != 'undefined' ? params : 'sdqwetp';
    var hash = '';
    if (params.indexOf('s') != -1) {
        hash += 's' + stat.sura;
    }
    if (params.indexOf('d') != -1) {
        var display_mode = 0;
        if (stat.display.mode.a) display_mode += 1;
        if (stat.display.mode.e) display_mode += 2;
        if (stat.display.mode.w) display_mode += 4;
        if (stat.display.mode.t) display_mode += 8;
        hash += 'd' + display_mode;
    }
    if (params.indexOf('q') != -1) hash += 'q' + stat.display.languages[0];
    if ((params.indexOf('w') != -1) && (parseInt(stat.display.languages[1]) > 0)) hash += 'w' + stat.display.languages[1];
    if ((params.indexOf('e') != -1) && (parseInt(stat.display.languages[2]) > 0)) hash += 'e' + stat.display.languages[2];
    if (params.indexOf('t') != -1) {
        hash += 't' + (stat.tafsir.visible ? 1 : 0);
    }
    if (params.indexOf('p') != -1) {
        hash += 'p' + stat.tafsir.page;
    }
    return hash;
}

function set_status_from_hash(hash) {
    hash = hash.replace(/^.*#/, '');
    var args = new Array();
    var regexp = /([a-z])(\d+)/g;
    var match = regexp.exec(hash);
    while (match != null) {
        args[match[1]] = match[2];
        match = regexp.exec(hash);
    }
    stat.sura = args['s'];
    var display_mode = args['d'];
    stat.display.mode.a = ((display_mode > 0) && ((display_mode % 2) == 1));
    display_mode = parseInt(display_mode / 2);
    stat.display.mode.e = ((display_mode > 0) && ((display_mode % 2) == 1));
    display_mode = parseInt(display_mode / 2);
    stat.display.mode.w = ((display_mode > 0) && ((display_mode % 2) == 1));
    display_mode = parseInt(display_mode / 2);
    stat.display.mode.t = ((display_mode > 0) && ((display_mode % 2) == 1));
    stat.display.languages[0] = args['q'];
    stat.display.languages[1] = (args['w'] !== undefined) ? args['w'] : LANGUAGE_NON;
    stat.display.languages[2] = (args['e'] !== undefined) ? args['e'] : LANGUAGE_NON;
    stat.tafsir.visible = (parseInt(args['t']) > 0);
    stat.tafsir.page = parseInt(args['p']);
}

function load_status_from_cookie() {
    var cookie_value = readCookie('status');
    if (cookie_value) stat = $.parseJSON(cookie_value);
}

function save_status_to_cookie() {
    createCookie('status', serialize(stat), 365);
}

function fix_sura_selector() {
    if (typeof (stat.sura) == 'undefined') return;
    var $slider = $('div[rel=menu]').find('.space').eq(0);
    var t1 = $('#suras a[href="#' + stat.sura + '"]').position().top;
    var t2 = t1 + $('#suras a[href="#' + stat.sura + '"]').height();
    var c1 = $('#nav').scrollTop();
    var c2 = c1 + $('#nav').height();
    if (t1 == t2) setTimeout(fix_sura_selector, 100);
    if (t2 < c1 || t1 > c2) $slider.slider('value', u2p(t1, $('#menu').attr('max')));
}
var refresh_timeout = null;

function refresh_screen(delay) {
    function _refresh() {
        $.history.load(status_to_hash());
    }
    if (!delay) {
        _refresh();
    } else {
        clearTimeout(refresh_timeout);
        refresh_timeout = setTimeout(_refresh, delay);
    }
}

function load_screen() {
    if (!stat.tafsir.visible) {
        $('#tafsir_btn').removeClass('active');
        $('#tafsir_close_btn').hide();
        load_sura_ieff((lastclick == 'fp') ? $('#ayas span.value').text() : 0);
    } else {
        $('#tafsir_btn').addClass('active');
        $('#tafsir_close_btn').show();
        load_tafsir((lastclick == 'fp') ? $('#ayas span.value').text() : 0);
    }
}
$(function () {
    load_status_from_cookie();
    fix_status();
    if (stat.display.font != 'arial') {
        if (!fontface('pdms')) {
            stat.display.font = 'arial';
            if (!readCookie('nofont')) $('#alert').show();
        }
    }
    $.history.init(function (hash) {
        if (hash) set_status_from_hash(hash);
        else set_default_status();
        $('#suras a.active').removeClass('active');
        $('#suras a[href="#' + stat.sura + '"]').addClass('active');
        fix_sura_selector();
        for (var mode in stat.display.mode) {
            $('#displaymode a#' + mode).toggleClass('active', stat.display.mode[mode]);
        }
        load_screen();
    });
    $('*').click(function () {
        lastclick = $(this).attr('rel') ? $(this).attr('rel') : '';
    });
    $('#suras a').click(function () {
        if (!$(this).hasClass('active')) {
            stat.sura = $(this).attr('href').replace(/^.*#/, '');
            stat.tafsir.page = 1;
            playlist = null;
            refresh_screen();
        }
        return false;
    });
    $('#displaymode a').each(function () {
        $(this).attr('title', $(this).text());
    }).click(function () {
        var button = $(this).attr('id');
        var displaymode = new Object;
        for (var mode in stat.display.mode) displaymode[mode] = stat.display.mode[mode];
        displaymode[button] = !displaymode[button];
        if ((button == 'a') && (displaymode['a']) && (displaymode['t'])) displaymode['t'] = false;
        if ((button == 't') && (displaymode['t']) && (displaymode['a'])) displaymode['a'] = false;
        if (displaymode['a'] || displaymode['e'] || displaymode['w'] || displaymode['t']) {
            stat.display.mode = displaymode;
            refresh_screen(500);
        }
        save_status_to_cookie();
        return false;
    });
    activate_tooltips('#displaymode a');
    $('#tafsir_btn, #tafsir_close_btn').click(function () {
        stat.tafsir.visible = !stat.tafsir.visible;
        refresh_screen(500);
        return false;
    });
});
$(function () {
    $('noscript').hide();
    $('#page, #footer').show();
    $.preloadCssImages();
    $('input.styled').checkBox();
    $('#page').disableTextSelect();
    $('a.button').each(function () {
        $(this).html('<span class="l"></span><span class="t">' + $(this).text() + '</span><span class="r"></span>');
    });
    var addthis_config = {
        "data_track_clickback": true
    };
    $.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4d66d36163ebabec');
    var keyword = $('#keyword').val();
    $('#keyword').focus(function () {
        if ($('#keyword').val() == keyword) $('#keyword').val('');
    }).blur(function () {
        if ($('#keyword').val() == '') $('#keyword').val(keyword);
    });
    $('a.list').click(function () {
        $(this).toggleClass('closed');
        if ($(this).hasClass('closed')) {
            $(this).parent().find('> ol').slideUp(500, function () {
                reset_slider('menu', false);
            });
        } else {
            $(this).parent().find('> ol').slideDown(500, function () {
                reset_slider('menu', false);
            });
        }
        return false;
    });
    $('.select-box, .number-selector').click(function () {
        $(this).find('ul').toggleClass('visible');
        if ($(this).find('ul').hasClass('visible')) {
            $(this).attr('find', '');
            $(this).find('ul').eq(0).find('li').removeClass('selected');
            $(this).find('ul').eq(0).find('li.active').eq(0).addClass('selected');
            $(this).find('ul').eq(0).find('a').each(function () {
                $(this).text($(this).text());
            });
            var $box_ul = $(this).find('ul').eq(0);
            if ($box_ul.find('li.active').size() > 0) {
                var sc = $box_ul.scrollTop();
                var at = $box_ul.find('li.active').eq(0).position().top;
                var hg = $box_ul.height() - $box_ul.find('li').eq(0).height() + 1;
                if ((sc || at) && ((at < 0) || (at > hg))) $box_ul.scrollTop(sc + at);
            }
        }
    });
    $('.select-box, .number-selector').bind("clickoutside", function (event) {
        if ($(this).find('ul').eq(0).hasClass('visible')) $(this).trigger('click');
    });
    $('.select-box a').click(function () {
        var $box = $(this).parent().parent();
        $box.parent().find('.value').text($(this).text());
        $box.find('li').removeClass('active');
        $(this).parent().addClass('active');
        return false;
    });
    $(window).keyup(function (e) {
        var return_value = true;
        $('.select-box, .number-selector').each(function () {
            var $box = $(this);
            var index = 0;
            var flag = false;
            var find_text = '';
            $(this).find('li').each(function () {
                if (flag) return;
                if ($(this).hasClass('selected')) flag = true;
                else index++;
            });
            if ($(this).find('ul').eq(0).hasClass('visible')) {
                var $box = $(this);
                var charCode = (e.which == null) ? e.keyCode : e.which;
                if (charCode >= 96 && charCode <= 105) charCode -= 48;
                var c = String.fromCharCode(charCode);
                switch (e.keyCode) {
                case 38:
                    if (index > 0) {
                        $(this).attr('find', '');
                        $box.find('li').eq(index).find('a').text($box.find('li').eq(index).text());
                        $box.find('li.selected').removeClass('selected');
                        $box.find('li').eq(index - 1).addClass('selected');
                    }
                    break;
                case 40:
                    if (index < ($box.find('li').size() - 1)) {
                        $(this).attr('find', '');
                        $box.find('li').eq(index).find('a').text($box.find('li').eq(index).text());
                        $box.find('li.selected').removeClass('selected');
                        $box.find('li').eq(index + 1).addClass('selected');
                    }
                    break;
                case 13:
                    $box.find('li.selected').find('a').eq(0).trigger('click');
                    return false;
                case 27:
                case 9:
                    $box.trigger('click');
                    return false;
                case 8:
                    var t = $(this).attr('find');
                    t = t.substr(0, t.length - 1);
                    $(this).attr('find', t);
                    c = '';
                default:
                    var nv = $(this).attr('find') + c;
                    var flag = true;
                    var index = 0;
                    $box.find('ul').eq(0).find('a').each(function () {
                        if (flag && ($(this).text().indexOf(nv) == 0)) flag = false;
                        if (flag) index++
                    });
                    if (flag) {
                        nv = $(this).attr('find');
                        nv = nv.substr(0, nv.length - 1) + c;
                        index = 0;
                        $box.find('ul').eq(0).find('a').each(function () {
                            if (flag && ($(this).text().indexOf(nv) == 0)) flag = false;
                            if (flag) index++
                        });
                    }
                    if (!flag) {
                        var $link = $box.find('ul').eq(0).find('a').eq(index);
                        $box.find('ul').eq(0).find('a').each(function () {
                            $(this).text($(this).text());
                        });
                        $box.find('li.selected').removeClass('selected');
                        $link.html('<span style="color:#555555">' + nv + '</span>' + $link.text().substr(nv.length)).parent().addClass('selected');
                        $box.attr('find', nv);
                    }
                }
                var $box_ul = $(this).find('ul').eq(0);
                var sc = $box_ul.scrollTop();
                var at = $box_ul.find('li.selected').eq(0).position().top;
                var hg = $box_ul.height() - $box_ul.find('li').eq(0).height() + 1;
                if ((sc || at) && ((at < 0) || (at > hg))) $box_ul.scrollTop(sc + at);
                return_value = false;
            }
        });
        return return_value;
    });
    $(document).keypress(function (e) {
        var return_value = true;
        $('.select-box, .number-selector').each(function () {
            if ($(this).find('ul').eq(0).hasClass('visible')) {
                return_value = false;
            }
        });
        return return_value;
    });
    $('.notready').click(function () {
        $('#message-text').text('We will add this feature very soon.');
        $('.overlay').fadeTo(400, 0.5);
        $('#message_popup').fadeIn(400);
    });
});
var fonts = ['arial', 'pdms', 'scheherazade', 'me_quran'];
var fdata = [];
fdata['pdms'] = ['_PDMS_Saleem_QuranFont', 'PDMS_Saleem_QuranFont'];
fdata['scheherazade'] = ['Scheherazade', 'ScheherazadeRegOT'];
fdata['me_quran'] = ['me_quran', 'me_quran_volt_newmet'];
var checked_fonts = new Array();

function fontface(f) {
    if (isFontFaceSupported() && (navigator.userAgent.toLowerCase().indexOf('chrome') == -1)) return true;
    if (typeof (checked_fonts[f]) != 'undefined') return checked_fonts[f];
    var ret = $.font.test(fdata[f][0]);
    checked_fonts[f] = ret;
    return ret;
}
$(function () {
    $('#alert #install-link, #font-alert #install').click(function () {
        $('.overlay').fadeTo(400, 0.5);
        $('#font_popup').show();
        return false;
    });
    $('#alert #hide').click(function () {
        createCookie('nofont', 1, 365);
        $('#alert').hide();
        return false;
    });
    $("#download_font").click(function () {
        location.href = './inc/fonts/' + fdata[$(this).attr('rel')][1] + '.ttf';
        return false;
    });
});
var SLIDER_MAX = 100000;
var SLIDER_STEP = 15;
var slider_wheel = false;
var slider_animation = false;
var SLIDER_ANIMATION_MIN_DURATION = 1200;
var SLIDER_ANIMATION_MAX_DURATION = 2500;

function u2p(u, m) {
    return SLIDER_MAX - (SLIDER_MAX * (u / m));
}

function p2u(p, m) {
    return ((SLIDER_MAX - p) * m) / SLIDER_MAX;
}

function setup_slider(rel) {
    var $div = $('#' + rel);
    var $container = $('div[rel=' + rel + ']');
    var $slider = $container.find('.space').eq(0);
    var h = $div.height() - $div.parent().height();
    $div.attr('max', (h > 0) ? h : 0);
    $div.attr('step', (SLIDER_MAX * SLIDER_STEP) / h);
    $slider.attr('rel', rel);
    var slider_change = function ($s, event, ui) {
            var $d = $('#' + $s.attr('rel'));
            var $dp = $d.parent();
            if (ui.value < 0) return false;
            var target = p2u(ui.value, $d.attr('max'));
            if (!slider_wheel) {
                if (slider_animation) {
                    var s = (target - $dp.stop().scrollTop()) / 15;
                    if (s < 0) s = -s;
                    s = (s > SLIDER_ANIMATION_MAX_DURATION) ? SLIDER_ANIMATION_MAX_DURATION : ((s < SLIDER_ANIMATION_MIN_DURATION) ? SLIDER_ANIMATION_MIN_DURATION : s);
                    $dp.stop().animate({
                        scrollTop: target
                    }, s, 'easeOutCirc');
                } else {
                    $dp.stop().scrollTop(target);
                }
            }
            slider_animation = false;
            slider_wheel = false;
        }
    $slider.slider('destroy').slider({
        orientation: 'vertical',
        range: 'min',
        min: 0,
        max: SLIDER_MAX,
        value: SLIDER_MAX,
        slide: function (event, ui) {
            slider_change($slider, event, ui);
        },
        change: function (event, ui) {
            slider_change($slider, event, ui);
        }
    });
    $div.parent().scroll(function () {
        slider_wheel = true;
        $slider.slider('value', u2p($div.parent().scrollTop(), $div.attr('max')));
    });
    $container.find('.top').unbind('click').bind('click', function (event) {
        slider_animation = true;
        $slider.slider('value', SLIDER_MAX);
    });
    $container.find('.up').mousehold(20, function (i) {
        var x = $slider.slider('value');
        if (x < SLIDER_MAX) $slider.slider('value', x + parseFloat($div.attr('step')));
    });
    $container.find('.down').mousehold(20, function (i) {
        var x = $slider.slider('value');
        if (x > 0) $slider.slider('value', x - $div.attr('step'));
    });
    $container.find('.bottom').unbind('click').bind('click', function (event) {
        slider_animation = true;
        $slider.slider('value', 0);
    });
    $div.keydown(function (e) {
        return (e.keyCode != 9);
    });
    $container.attr('id', 'slc');
    $container.click(function (event) {
        return true;
    });
    if (h == 0) $slider.find('.ui-slider-handle').eq(0).css({
        'bottom': '100%'
    });
};

function fix_slider_max(rel) {
    var $div = $('#' + rel);
    $div.attr('max', $div.height() - $div.parent().height());
}

function reset_slider(rel, repos) {
    var $div = $('#' + rel);
    var $slider = $('div[rel=' + rel + ']').find('.space').eq(0);
    var h = $div.height() - $div.parent().height();
    $div.attr('max', (h > 0) ? h : 0);
    $div.attr('step', (SLIDER_MAX * SLIDER_STEP) / h);
    $slider.attr('rel', rel);
    if (repos) {
        $slider.slider('value', SLIDER_MAX);
    } else {
        $slider.slider('value', $slider.slider('value'));
    }
};
var setup_sliders = function (repos) {
        $('.slider').each(function () {
            setup_slider($(this).attr('rel'));
        });
    };
var reset_sliders = function (repos) {
        $('.slider').each(function () {
            reset_slider($(this).attr('rel'), repos);
        });
    };
$(function () {
    var first_time = true;
    var onresize = function (event) {
            $('#main').height($('#page').height() - $('#header').height() - $('#footer').height()) - 1;
            $('#browse #nav').height($('#main').height() - 51);
            $('#sura').height($('#main').height() - $('#heading').height());
            $('.slider').each(function () {
                $(this).height($('#main').height());
                $(this).find('.space').height($(this).height() - 74);
            });
            if (first_time) {
                setup_sliders();
                first_time = false;
            } else {
                reset_sliders(false);
            }
        }
    $(window).resize(onresize);
    onresize();
    setTimeout(onresize, 1000);
});
var sura_json = null;
var sura_data = null;
var ayas_json = null;
var ayas_data = null;
var pfstart;

function start_process() {
    pfstart = new Date().getTime();
}

function end_process(aya_no) {
    player_new_sura(aya_no);
    var pfend = new Date().getTime();
    var time = pfend - pfstart;
}
String.prototype.toArabic = function (a) {
    return this.replace(/\d+/g, function (digit) {
        var digitArr = [],
            pDigitArr = [];
        for (var i = 0, len = digit.length; i < len; i++) {
            digitArr.push(digit.charCodeAt(i));
        }
        for (var j = 0, leng = digitArr.length; j < leng; j++) {
            pDigitArr.push(String.fromCharCode(digitArr[j] + (( !! a && a == true) ? 1584 : 1728)));
        }
        return pDigitArr.join('');
    });
};

function display_sura_data() {
    sura_data = $.parseJSON(sura_json);
    $('#heading h1').text(sura_data.name);
    $('#heading h2').text(sura_data.e_name);
}

function replaceHtml(el, html) {
    var oldEl = typeof el === "string" ? document.getElementById(el) : el;
    var newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html;
    oldEl.parentNode.replaceChild(newEl, oldEl);
    return newEl;
};

function goto_aya(aya_no, language, startup) {
    if ((!stat.display.mode.a) && (!stat.display.mode.t) && (language == 'ar')) language = languages[stat.display.languages[0]].short;
    $link = $("span.link[rel='aya-" + aya_no + "'][lang=" + language + "]").eq(0);
    $el = $link.parent();
    if ($el.size() == 0) return false;
    var p = $el.position().top;
    if ((aya_no == 1) && (p < 20)) p = 0;
    if (!startup) slider_animation = true;
    var $slider = $("div[rel='text']").find('.space').eq(0);
    $slider.slider('value', u2p(p, $('#text').attr('max')));
    $("span.link.active").removeClass('active');
    $link.addClass('active');
    $('#ayas li.active').removeClass('active');
    $('#ayas a[href="#' + aya_no + '"]').parent().addClass('active');
    $("#ayas span.value").text(aya_no);
}

function sa(aya_no, language, startup) {
    startup = typeof (startup) != 'undefined' ? startup : false;
    language = typeof (language) != 'undefined' ? language : 'ar';
    if (language == '') language = $("span.link[rel='aya-" + aya_no + "']").attr('lang');
    if (!stat.tafsir.visible) {
        goto_aya(aya_no, language, startup);
    } else {
        tafsir_goto_aya(aya_no);
    }
    player_goto_aya(aya_no, language);
    return false;
}

function pa(element) {
    if (element.className.indexOf('link') != -1) player_start();
    return false;
}

function prepare_aya_selector(count, selected) {
    var out = '';
    for (var i = 1; i <= count; i++) out += '<li><a href="#' + i + '" onclick="return sa(' + i + ');" rel="fp">' + i + '</a></li>';
    replaceHtml($('#ayas ul').get(0), out);
    if (selected) {
        sa(selected, '', true);
    } else {
        $('#ayas li.active').removeClass('active');
        $('#ayas a[href="#1"]').parent().addClass('active');
        $("#ayas span.value").text(1);
        $("#ayas ul").scrollTop(0);
    }
}

function set_english_active_mode() {
    if (stat.playback.english) {
        $('.aya-E span').addClass('link');
    } else {
        $('.aya-E span').removeClass('link');
    }
}

function parse_tajweed(text) {
    return text.replace(/\[h/g, '<span class="ham_wasl" title="Hamzat Wasl" alt="').replace(/\[s/g, '<span class="slnt" title="Silent" alt="').replace(/\[l/g, '<span class="slnt" title="Lam Shamsiyyah" alt="').replace(/\[n/g, '<span class="madda_normal" title="Normal Prolongation: 2 Vowels" alt="').replace(/\[p/g, '<span class="madda_permissible" title="Permissible Prolongation: 2, 4, 6 Vowels" alt="').replace(/\[m/g, '<span class="madda_necessary" title="Necessary Prolongation: 6 Vowels" alt="').replace(/\[q/g, '<span class="qlq" title="Qalqalah" alt="').replace(/\[o/g, '<span class="madda_obligatory" title="Obligatory Prolongation: 4-5 Vowels" alt="').replace(/\[c/g, '<span class="ikhf_shfw" title="Ikhfa\' Shafawi - With Meem" alt="').replace(/\[f/g, '<span class="ikhf" title="Ikhfa\'" alt="').replace(/\[w/g, '<span class="idghm_shfw" title="Idgham Shafawi - With Meem" alt="').replace(/\[i/g, '<span class="iqlb" title="Iqlab" alt="').replace(/\[a/g, '<span class="idgh_ghn" title="Idgham - With Ghunnah" alt="').replace(/\[u/g, '<span class="idgh_w_ghn" title="Idgham - Without Ghunnah" alt="').replace(/\[d/g, '<span class="idgh_mus" title="Idgham - Mutajanisayn" alt="').replace(/\[b/g, '<span class="idgh_mus" title="Idgham - Mutaqaribayn" alt="').replace(/\[g/g, '<span class="ghn" title="Ghunnah: 2 Vowels" alt="').replace(/\[/g, '" >').replace(/\]/g, '</span>');
}

function display_ayas_data(aya_no) {
    var displaymode = '';
    for (var mode in stat.display.mode) if (stat.display.mode[mode]) displaymode += mode;
    var multitrans = parseInt(stat.display.languages[1]) > 0;
    var sep_a = (displaymode == 'ae') || (displaymode == 'aw') || (displaymode == 'aew');
    var sep_t = (displaymode == 'et') || (displaymode == 'wt') || (displaymode == 'ewt');
    var sep_w = (displaymode == 'aew') || (displaymode == 'ewt');
    var sep_e = (displaymode == 'ew') || ((displaymode == 'e') && multitrans);
    var sep = ((displaymode != 'a') || stat.display.arabic_mode.verses_per_line) && ((displaymode != 'e') || stat.display.english_mode.verses_per_line) && ((displaymode != 't') || stat.display.arabic_mode.verses_per_line);
    var english_numbers = (displaymode == 'e') || (displaymode == 'ew');
    var ne = 0;
    var out = '';
    var eng = '';
    var active = '';
    var style = '';
    var w = null;
    var last_word_in_line = false;
    var last_line_in_aya = false;
    var last_row_of_words = '';
    var rows_num = 0;
    var words_num = null;
    ayas_data = $.parseJSON(ayas_json);
    $('#sura').removeClass('loading');
    $("#sura #text").html('<div id="sura-body" class="' + displaymode.toUpperCase() + '"></div>');
    for (var i in fonts) if (stat.display.font == fonts[i]) $('#sura-body').addClass(fonts[i]);
    else $('#sura-body').removeClass(fonts[i]);
    if (stat.display.arabic_mode.continuous) $('#sura-body').removeClass('avpl');
    else $('#sura-body').addClass('avpl');
    if (stat.display.english_mode.continuous) $('#sura-body').removeClass('evpl');
    else $('#sura-body').addClass('evpl');
    if ((displaymode == 'e') && (multitrans)) $('#sura-body').removeClass('evpl').addClass('multiple');
    $.map(ayas_data, function (aya, i) {
        ne++;
        na = String(ne).toArabic(true);
        active = (i == 0) ? ' active' : '';
        if (sep) out += '<div id="aya-' + ne + '-top"></div>';
        if (stat.display.mode.a) {
            out += '<div class="aya-A"><span class="link' + active + '" rel="aya-' + ne + '" lang="ar" onclick="sa(' + ne + ');" ondblclick="pa(this);">' + aya.a + '</span> <span class="aya_num">ï´¿<strong>' + na + '</strong>ï´¾</span></div>';
            if (sep_a) out += '<div class="sep-thin"></div>';
            active = '';
        }
        if (stat.display.mode.t) {
            out += '<div class="aya-T"><span class="link' + active + '" rel="aya-' + ne + '" lang="ar" onclick="sa(' + ne + ');" ondblclick="pa(this);">' + parse_tajweed(aya.t) + '</span> <span class="aya_num">ï´¿<strong>' + na + '</strong>ï´¾</span></div>';
            if (sep_t) out += '<div class="sep-thin"></div>';
        }
        if (stat.display.mode.e) {
            eng = '';
            for (j = 0; j < 3; j++) {
                if (parseInt(stat.display.languages[j]) > 0) {
                    eng += '<div class="aya-E ' + languages[stat.display.languages[j]].short + '"' + style + '><span class="link' + active + '" rel="aya-' + ne + '" lang="' + languages[stat.display.languages[j]].short + '" onclick="sa(' + ne + ', \'' + languages[stat.display.languages[j]].short + '\');" ondblclick="pa(this);">' + aya.e[j] + '</span>';
                    if (english_numbers) eng += ' (' + (languages[stat.display.languages[j]].number = 'e' ? ne : na) + ')';
                    eng += '</div>';
                    if (j < 2) if (parseInt(stat.display.languages[j + 1]) > 0) eng += '<div class="sep-thin"></div>';
                }
            }
        }
        if (sep_e) out += eng + '<div class="sep-thin"></div>';
        if (stat.display.mode.w) {
            lines_num = aya.w.length;
            words_num = new Array();
            for (j = 0; j < lines_num; j++) {
                words_num[j] = aya.w[j].length;
                for (k = 0; k < words_num[j]; k++) {
                    aya.w[j][k][2] = parseInt(aya.w[j][k][2]);
                    aya.w[j][k][3] = parseInt(aya.w[j][k][3]);
                }
            }
            aya.w[lines_num - 1][words_num[lines_num - 1] - 1][3] += 40;
            for (j = 0; j < lines_num; j++) {
                last_line_in_aya = ((j + 1) == lines_num);
                for (k = 0; k < words_num[j]; k++) {
                    last_word_in_line = ((k + 1) == words_num[j]);
                    aya.w[j][k][5] = (k == 0) ? 'right' : ((last_word_in_line && (!last_line_in_aya)) ? 'left' : 'center');
                    if ((k == 0) && last_line_in_aya && ((k + 2) == words_num[j])) {
                        aya.w[j][k][3] = (0.75 * aya.w[j][k][2]) + (0.25 * aya.w[j][k][3]);
                    }
                    if ((k == 1) && last_line_in_aya && last_word_in_line) {
                        aya.w[j][k][3] = aya.w[j][k][2];
                    } else if (last_line_in_aya && last_word_in_line) {
                        aya.w[j][k][3] = aya.w[j][k][3] - 55;
                    }
                }
            }
            for (j = 0; j < lines_num; j++) {
                last_row_of_words = ((j + 1) == lines_num);
                out += '<table class="aya-W' + (last_row_of_words ? ' last' : '') + '" width="100%" border="0" cellpadding="0" cellspacing="0"><tr>';
                for (k = 0; k < words_num[j]; k++) {
                    out += '<td class="ww" width ="' + aya.w[j][k][3] + '" align="' + aya.w[j][k][5] + '"><div style="width:' + aya.w[j][k][2] + 'px" onclick="pl(' + aya.w[j][k][4] + ')"><span class="a">' + aya.w[j][k][0] + '</span><span class="e">' + aya.w[j][k][1] + '</span></div></td>';
                }
                if (last_row_of_words) out += '<td valign="middle" class="n"><span class="aya_num">ï´¿<strong>' + na + '</strong>ï´¾</span></td>';
                out += '</tr></table>';
            }
            if (sep_w) out += '<div class="sep-thin"></div>';
        }
        if ((stat.display.mode.e) && (!sep_e)) out += eng;
        if ((sep) && (ne < sura_data.ayas_count)) out += '<div class="sep-aya"></div>';
    });
    replaceHtml(document.getElementById('sura-body'), out);
    if ((displaymode == 'e') && (!multitrans) && stat.display.english_mode.continuous) $('#sura-body').css('direction', $('#sura-body .aya-E').eq(0).css('direction'));
    activate_tooltips('.aya-T span[title]');
    $('<div class="clear"></div>').appendTo("#sura #text");
    var f1 = function () {
            reset_slider('text', true);
        };
    setTimeout(f1, 100);
    var f2 = function () {
            fix_slider_max('text')
        }
    setTimeout(f2, 1000);
    setTimeout(f2, 3000);
    setTimeout(f2, 5000);
    var f3 = function () {
            set_english_active_mode();
            prepare_aya_selector(sura_data.ayas_count, aya_no);
        };
    setTimeout(f3, 500);
}

function load_ayas_ieff(aya_no) {
    var id = status_to_hash('sdqwe') + 'f0o' + sura_data.ayas_count;
    var key = 'ayas-' + REVISION + '-' + id;
    getData(key, 'ayas-' + id + '.js', function (value) {
        ayas_json = value;
        display_ayas_data(aya_no);
        end_process(aya_no);
    });
}

function load_sura_ieff(aya_no) {
    start_process();
    $('#sura-body').hide();
    $('#sura').addClass('loading');
    $('#sura #text').scrollTop(0);
    getData('sura-' + REVISION + '-' + stat.sura, 'sura' + stat.sura + '.js', function (value) {
        sura_json = value;
        display_sura_data();
        load_ayas_ieff(aya_no);
    });
}

function selectTajweedWord(s, a, x) {}

function set_tafsir_pages_links() {
    $('.Paging a').click(function () {
        lastclick = '';
        stat.tafsir.page = $(this).attr('href').replace(/^.*#/, '');
        refresh_screen();
        return false;
    });
}

function scroll_to_section(section) {
    $el = $('#sec_' + section).eq(0);
    if ($el.size() > 0) {
        var p = $el.position().top;
        var $slider = $("div[rel='text']").find('.space').eq(0);
        $slider.slider('value', u2p(p, $('#text').attr('max')));
    }
}

function show_tafsir(html, section) {
    $('#sura').removeClass('loading');
    $("#sura #text").html(html);
    $('<div class="clear"></div>').appendTo("#sura #text");
    set_tafsir_pages_links();
    reset_slider('text', true);
    scroll_to_section(section);
    var f1 = function () {
            reset_slider('text', false);
        };
    setTimeout(f1, 1000);
    var f2 = function () {
            fix_slider_max('text')
        }
    setTimeout(f2, 1000);
    setTimeout(f2, 3000);
    setTimeout(f2, 5000);
    if (playlist == null) player_new_sura();
}

function tafsir_aya_location(aya_no) {
    var key = 'tafsir-pages-' + REVISION + '-' + stat.sura;
    var pages_code = localStorage.getItem(key);
    if (pages_code == null) {
        $.ajax({
            async: false,
            type: "get",
            url: 'tafsir-pages-' + stat.sura + '.js',
            success: function (response) {
                try {
                    localStorage.setItem(key, response);
                } catch (e) {}
                pages_code = response;
            }
        });
    }
    var z = new Array();
    eval(pages_code);
    stat.tafsir.page = (aya_no != 1) ? z[aya_no][0] : 1;
    var section = (aya_no != 1) ? z[aya_no][1] : 0;
    return section;
}

function load_tafsir(aya_no) {
    $('#sura-body').hide();
    $('#sura #text').html('').scrollTop(0);
    $('#sura').addClass('loading');
    var section = 0;
    if (aya_no) section = tafsir_aya_location(aya_no);
    var id = status_to_hash('sp');
    var key1 = 'tafsir-' + REVISION + '-' + id;
    var tafsir = localStorage.getItem(key1);
    if (tafsir != null) {
        show_tafsir(tafsir, section);
    } else {
        $.ajax({
            type: "get",
            url: 'tafsir-' + id + '.html',
            success: function (response) {
                try {
                    localStorage.setItem(key1, response);
                } catch (e) {}
                show_tafsir(response, section);
            }
        });
    }
    var key2 = 'sura-' + REVISION + '-' + stat.sura;
    sura_json = localStorage.getItem(key2);
    if (sura_json != null) {
        display_sura_data();
    } else {
        $.ajax({
            type: "get",
            url: 'sura' + stat.sura + '.js',
            success: function (response) {
                sura_json = response;
                try {
                    localStorage.setItem(key2, sura_json);
                } catch (e) {}
                display_sura_data();
            }
        });
    }
    if (sura_data != null) if (sura_data.ayas_count != $('#ayas > ul > li').size()) prepare_aya_selector(sura_data.ayas_count, aya_no);
}

function tafsir_goto_aya(aya_no) {
    var key1 = status_to_hash('sp');
    var section = 0;
    if (aya_no) section = tafsir_aya_location(aya_no);
    var key2 = status_to_hash('sp');
    if (key1 != key2) {
        load_tafsir(aya_no);
    } else {
        scroll_to_section(section)
    }
    $('#ayas li.active').removeClass('active');
    $('#ayas a[href="#' + aya_no + '"]').parent().addClass('active');
    $("#ayas span.value").text(aya_no);
}
var playlist = null;
var playlist_index = 0;
var play_start_time = null;
var play_end_time = null;
var player_wait_time = 0;
var player_sura_autostart = false;
var player_stopped = false;
var preload_status = false;
var preload_index = 0;
var preload_timer = null;

function preload_start() {
    if (!preload_status) {
        preload_status = true;
        preload_index = playlist_index + 1;
        preload_timer = setTimeout(preload_mp3, 100);
    }
}

function preload_mp3() {
    if (preload_index < playlist.length) {
        if ((playlist_index + 3) >= preload_index) {
            if ($.inArray(preloaded_mp3s, playlist[preload_index].file) == -1) {
                jwplayer("preloader").load(playlist[preload_index].file).play();
                preloaded_mp3s.push(playlist[preload_index].file);
            }
            preload_index++;
        } else {
            preload_timer = setTimeout(preload_mp3, 1000);
        }
    }
}

function preload_next() {
    jwplayer("preloader").stop();
    if (preload_status) {
        clearInterval(preload_timer);
        preload_timer = setTimeout(preload_mp3, 100);
    }
}

function preload_stop() {
    if (preload_status) {
        preload_status = false;
        clearInterval(preload_timer);
    }
}

function player_new_sura(aya_number) {
    repeat = (playlist != null) ? ((playlist_index < playlist.length) ? playlist[playlist_index].sura_repeat : 0) : 0;
    if ((sura_data == null) || ($('#aya_player').size() == 0)) {
        setTimeout(function () {
            player_new_sura(aya_number);
        }, 1000);
        return;
    }
    preload_stop();
    preloaded_mp3s = new Array();
    var sura_no = (stat.sura >= 100) ? stat.sura : ((stat.sura >= 10) ? '0' + stat.sura : '00' + stat.sura);
    var aya_no = null;
    playlist = new Array();
    for (i = 0; i < (parseInt(stat.playback.repeat.chapter)); i++) {
        for (j = 1; j <= sura_data.ayas_count; j++) {
            aya_no = (j >= 100) ? j : ((j >= 10) ? '0' + j : '00' + j);
            for (k = 0; k < (parseInt(stat.playback.repeat.verse)); k++) {
                if (stat.display.mode.a || stat.display.mode.t) playlist.push({
                    file: 'http://audio.allahsquran.com/vbv/arabic/' + stat.playback.reciter + '/' + sura_no + aya_no + '.mp3',
                    sura_repeat: i,
                    aya_no: j,
                    aya_repeat: k,
                    language: 'ar'
                });
                if (stat.playback.english && stat.display.mode.e) {
                    for (x = 0; x < 3; x++) {
                        if (parseInt(stat.display.languages[x]) > 0) {
                            if (languages[stat.display.languages[x]].audio != undefined) {
                                playlist.push({
                                    file: languages[stat.display.languages[x]].audio + sura_no + aya_no + '.mp3',
                                    sura_repeat: i,
                                    aya_no: j,
                                    aya_repeat: k,
                                    language: languages[stat.display.languages[x]].short
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    jwplayer("aya_player").load(playlist).stop();
    if (player_sura_autostart) {
        player_sura_autostart = false;
        jwplayer("aya_player").playlistItem(0);
    } else {
        jwplayer("aya_player").playlistItem(0);
        player_stop();
    }
    if (typeof (aya_number) != 'undefined') {
        if (typeof (playlist[0].language) != 'undefined') {
            player_goto_aya(aya_number, playlist[0].language, repeat);
        }
    }
}

function player_goto_aya(aya_no, language, repeat, play_mode) {
    if (playlist == null) return;
    language = typeof (language) != 'undefined' ? language : '';
    repeat = typeof (repeat) != 'undefined' ? repeat : ((playlist_index < playlist.length) ? playlist[playlist_index].sura_repeat : 0);
    play_mode = typeof (play_mode) != 'undefined' ? play_mode : false;
    for (i = 0; i < playlist.length; i++) {
        if ((playlist[i].aya_no == aya_no) && (playlist[i].sura_repeat == repeat) && (playlist[i].aya_repeat == 0) && (playlist[i].language == language)) {
            jwplayer("aya_player").playlistItem(i);
            break;
        }
    }
    if (!play_mode) {
        player_stop();
    }
}

function play_next() {
    if (player_stopped) return;
    if ((playlist_index + 1) < playlist.length) {
        if ((playlist[playlist_index].aya_no == playlist[playlist_index + 1].aya_no) || stat.playback.autoplay.verse) {
            jwplayer("aya_player").playlistNext();
        }
    } else {
        if (stat.playback.autoplay.chapter && (stat.sura < 114)) {
            jwplayer("aya_player").stop();
            player_sura_autostart = true;
            $('#suras a[href="#' + (parseInt(stat.sura) + 1) + '"]').trigger('click');
        }
    }
}

function player_start() {
    jwplayer("aya_player").play();
}

function player_stop() {
    jwplayer("aya_player").stop();
    player_stopped = true;
}
$(function () {
    var p = $('#heading').offset();
    $('<div id="apx" style="position:absolute; top:' + p.top + 'px; left:' + p.left + 'px"><div id="aya_player"></div></div>').appendTo('body');
    jwplayer("aya_player").setup({
        flashplayer: "inc/flash/player/player.swf",
        movie: "inc/flash/player/player.swf",
        bufferlength: 60,
        width: 1,
        height: 1,
        autostart: false,
        screencolor: 'FFFFFF',
        events: {
            onReady: function () {
                if (document.title.indexOf('#') != -1) document.title = document.title.substring(0, document.title.indexOf('#'));
            },
            onPlaylistItem: function (item) {
                playlist_index = item.index;
                if (!stat.tafsir.visible) {
                    goto_aya(playlist[playlist_index].aya_no, playlist[playlist_index].language, false);
                } else {
                    tafsir_goto_aya(playlist[playlist_index].aya_no);
                }
            },
            onPlay: function () {
                player_stopped = false;
                play_start_time = new Date().getTime();
                $('#quranplayer').addClass('playing');
            },
            onBufferChange: function (b) {
                if (b.bufferPercent == 100) preload_start();
            },
            onPause: function () {
                $('#quranplayer').removeClass('playing');
            },
            onIdle: function () {
                $('#quranplayer').removeClass('playing');
            },
            onError: function () {
                $('#quranplayer').removeClass('playing');
            },
            onBuffer: function () {},
            onComplete: function () {
                play_end_time = new Date().getTime();
                player_wait_time = stat.playback.wait.duration_of_verses ? (play_end_time - play_start_time) : (stat.playback.wait.wait_period * 1000);
                if (stat.playback.wait.continuous || (player_wait_time == 0) || (playlist[playlist_index].language != 'ar')) play_next();
                else setTimeout(play_next, player_wait_time);
            }
        }
    });
    $('<div id="lpx" style="position:absolute; top:' + p.top + 'px; left:' + p.left + 'px"><div id="preloader"></div></div>').appendTo('body');
    jwplayer("preloader").setup({
        flashplayer: "inc/flash/player/player.swf",
        movie: "inc/flash/player/player.swf",
        bufferlength: 600,
        width: 1,
        height: 1,
        screencolor: 'FFFFFF',
        autostart: false,
        events: {
            onTime: preload_next
        }
    });
    $('#quranplayer').click(function () {
        preload_stop();
        jwplayer("aya_player").play(!$(this).hasClass('playing'));
        return false;
    });
});

function pl(n) {
    n = '' + n;
    while (n.length < 5) n = '0' + n;
    jwplayer("wbw_player").load([{
        file: 'http://audio.allahsquran.com/wbw/' + n + '.mp3'
    }]).play(true);
    return false;
}
$(function () {
    var p = $('#heading').offset();
    $('<div id="wp" style="position:absolute; top:' + p.top + 'px; left:' + p.left + 'px"><div id="wbw_player"></div></div>').appendTo('body');
    jwplayer("wbw_player").setup({
        flashplayer: "inc/flash/player/player.swf",
        autostart: false,
        width: 1,
        height: 1,
        screencolor: 'FFFFFF',
        events: {
            onPlay: function () {
                player_stop();
            }
        }
    });
});
/*
 * ! isFontFaceSupported - v0.9 - 12/19/2009
 * http://paulirish.com/2009/font-face-feature-detection/
 * 
 * Copyright (c) 2009 Paul Irish MIT license
 */

var isFontFaceSupported = (function () {


    var fontret, fontfaceCheckDelay = 100;

    // IE supports EOT and has had EOT support since IE 5.
    // This is a proprietary standard (ATOW) and thus this off-spec,
    // proprietary test for it is acceptable.
    if (!(! /* @cc_on@if(@_jscript_version>=5)!@end@ */ 0)) fontret = true;

    else {

        // Create variables for dedicated @font-face test
        var doc = document,
            docElement = doc.documentElement,
            st = doc.createElement('style'),
            spn = doc.createElement('span'),
            wid, nwid, body = doc.body,
            callback, isCallbackCalled;

        // The following is a font, only containing the - character. Thanks
        // Ethan Dunham.
        st.textContent = "@font-face{font-family:testfont;src:url(data:font/opentype;base64,T1RUTwALAIAAAwAwQ0ZGIMA92IQAAAVAAAAAyUZGVE1VeVesAAAGLAAAABxHREVGADAABAAABgwAAAAgT1MvMlBHT5sAAAEgAAAAYGNtYXAATQPNAAAD1AAAAUpoZWFk8QMKmwAAALwAAAA2aGhlYQS/BDgAAAD0AAAAJGhtdHgHKQAAAAAGSAAAAAxtYXhwAANQAAAAARgAAAAGbmFtZR8kCUMAAAGAAAACUnBvc3T/uAAyAAAFIAAAACAAAQAAAAEAQVTDUm9fDzz1AAsD6AAAAADHUuOGAAAAAMdS44YAAADzAz8BdgAAAAgAAgAAAAAAAAABAAABdgDzAAkDQQAAAAADPwABAAAAAAAAAAAAAAAAAAAAAwAAUAAAAwAAAAICmgGQAAUAAAK8AooAAACMArwCigAAAd0AMgD6AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAEZIRAAAQAAgAC0C7v8GAAABdv8NAAAAAQAAAAAAAAAAACAAIAABAAAAFAD2AAEAAAAAAAAAPAB6AAEAAAAAAAEAAgC9AAEAAAAAAAIABwDQAAEAAAAAAAMAEQD8AAEAAAAAAAQAAwEWAAEAAAAAAAUABQEmAAEAAAAAAAYAAgEyAAEAAAAAAA0AAQE5AAEAAAAAABAAAgFBAAEAAAAAABEABwFUAAMAAQQJAAAAeAAAAAMAAQQJAAEABAC3AAMAAQQJAAIADgDAAAMAAQQJAAMAIgDYAAMAAQQJAAQABgEOAAMAAQQJAAUACgEaAAMAAQQJAAYABAEsAAMAAQQJAA0AAgE1AAMAAQQJABAABAE7AAMAAQQJABEADgFEAEcAZQBuAGUAcgBhAHQAZQBkACAAaQBuACAAMgAwADAAOQAgAGIAeQAgAEYAbwBuAHQATABhAGIAIABTAHQAdQBkAGkAbwAuACAAQwBvAHAAeQByAGkAZwBoAHQAIABpAG4AZgBvACAAcABlAG4AZABpAG4AZwAuAABHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy4AAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAEYATwBOAFQATABBAEIAOgBPAFQARgBFAFgAUABPAFIAVAAARk9OVExBQjpPVEZFWFBPUlQAAFAASQAgAABQSSAAADEALgAwADAAMAAAMS4wMDAAAFAASQAAUEkAACAAACAAAFAASQAAUEkAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAAAAAAADAAAAAwAAABwAAQAAAAAARAADAAEAAAAcAAQAKAAAAAYABAABAAIAIAAt//8AAAAgAC3////h/9UAAQAAAAAAAAAAAQYAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAA/7UAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAQAEBAABAQEDUEkAAQIAAQAu+BAA+BsB+BwC+B0D+BgEWQwDi/eH+dP4CgUcAIwPHAAAEBwAkREcAB4cAKsSAAMCAAEAPQA/AEFHZW5lcmF0ZWQgaW4gMjAwOSBieSBGb250TGFiIFN0dWRpby4gQ29weXJpZ2h0IGluZm8gcGVuZGluZy5QSVBJAAAAAAEADgADAQECAxQODvb3h/cXAfeHBPnT9xf90wYO+IgU+WoVHgoDliX/DAmLDAr3Fwr3FwwMHgoG/wwSAAAAAAEAAAAOAAAAGAAAAAAAAgABAAEAAgABAAQAAAACAAAAAAABAAAAAMbULpkAAAAAx1KUiQAAAADHUpSJAfQAAAH0AAADQQAA)}";
        doc.getElementsByTagName('head')[0].appendChild(st);

        spn.setAttribute('style', 'font:99px _,serif;position:absolute;visibility:hidden');

        if (!body) {
            body = docElement.appendChild(doc.createElement('fontface'));
        }

        // the data-uri'd font only has the - character
        spn.innerHTML = '-------';
        spn.id = 'fonttest';

        body.appendChild(spn);
        wid = spn.offsetWidth;

        spn.style.font = '99px testfont,_,serif';

        // needed for the CSSFontFaceRule false positives (ff3, chrome, op9)
        fontret = wid !== spn.offsetWidth;

        var delayedCheck = function () {
                if (isCallbackCalled) return;
                fontret = wid !== spn.offsetWidth;
                callback && (isCallbackCalled = true) && callback(fontret);
            }

        addEventListener('load', delayedCheck, false);
        setTimeout(delayedCheck, fontfaceCheckDelay);
    }

    function ret() {
        return fontret || wid !== spn.offsetWidth;
    };

    // allow for a callback
    ret.ready = function (fn) {
        (isCallbackCalled || fontret) ? fn(fontret) : (callback = fn);
    }

    return ret;
})();