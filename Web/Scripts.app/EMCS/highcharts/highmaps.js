﻿/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2011-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (P, K) { "object" === typeof module && module.exports ? (K["default"] = K, module.exports = P.document ? K(P) : K) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () { return K(P) }) : (P.Highcharts && P.Highcharts.error(16, !0), P.Highcharts = K(P)) })("undefined" !== typeof window ? window : this, function (P) {
    function K(a, B, E, D) { a.hasOwnProperty(B) || (a[B] = D.apply(null, E)) } var I = {}; K(I, "parts/Globals.js", [], function () {
        var a = "undefined" === typeof P ? "undefined" !== typeof window ? window : {} : P, B = a.document,
        E = a.navigator && a.navigator.userAgent || "", D = B && B.createElementNS && !!B.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, h = /(edge|msie|trident)/i.test(E) && !a.opera, d = -1 !== E.indexOf("Firefox"), u = -1 !== E.indexOf("Chrome"), v = d && 4 > parseInt(E.split("Firefox/")[1], 10); return {
            product: "Highcharts", version: "7.1.2", deg2rad: 2 * Math.PI / 360, doc: B, hasBidiBug: v, hasTouch: B && "undefined" !== typeof B.documentElement.ontouchstart, isMS: h, isWebKit: -1 !== E.indexOf("AppleWebKit"), isFirefox: d, isChrome: u, isSafari: !u &&
                -1 !== E.indexOf("Safari"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: D, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { }, charts: [], dateFormats: {}
        }
    }); K(I, "parts/Utilities.js", [I["parts/Globals.js"]], function (a) {
    a.timers = []; var B = a.charts, E = a.doc, D = a.win; a.error = function (h, d, u) {
        var v = a.isNumber(h) ? "Highcharts error #" + h + ": www.highcharts.com/errors/" + h : h, t = function () {
            if (d) throw Error(v);
            D.console && console.log(v)
        }; u ? a.fireEvent(u, "displayError", { code: h, message: v }, t) : t()
    }; a.Fx = function (a, d, u) { this.options = d; this.elem = a; this.prop = u }; a.Fx.prototype = {
        dSetter: function () { var a = this.paths[0], d = this.paths[1], u = [], v = this.now, t = a.length, r; if (1 === v) u = this.toD; else if (t === d.length && 1 > v) for (; t--;)r = parseFloat(a[t]), u[t] = isNaN(r) ? d[t] : v * parseFloat(d[t] - r) + r; else u = d; this.elem.attr("d", u, null, !0) }, update: function () {
            var a = this.elem, d = this.prop, u = this.now, v = this.options.step; if (this[d + "Setter"]) this[d +
                "Setter"](); else a.attr ? a.element && a.attr(d, u, null, !0) : a.style[d] = u + this.unit; v && v.call(a, u, this)
        }, run: function (h, d, u) {
            var v = this, t = v.options, r = function (a) { return r.stopped ? !1 : v.step(a) }, n = D.requestAnimationFrame || function (a) { setTimeout(a, 13) }, k = function () { for (var l = 0; l < a.timers.length; l++)a.timers[l]() || a.timers.splice(l--, 1); a.timers.length && n(k) }; h !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = h, this.end = d, this.unit = u, this.now = this.start, this.pos = 0, r.elem = this.elem,
                r.prop = this.prop, r() && 1 === a.timers.push(r) && n(k)) : (delete t.curAnim[this.prop], t.complete && 0 === Object.keys(t.curAnim).length && t.complete.call(this.elem))
        }, step: function (h) {
            var d = +new Date, u, v = this.options, t = this.elem, r = v.complete, n = v.duration, k = v.curAnim; t.attr && !t.element ? h = !1 : h || d >= n + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), u = k[this.prop] = !0, a.objectEach(k, function (a) { !0 !== a && (u = !1) }), u && r && r.call(t), h = !1) : (this.pos = v.easing((d - this.startTime) / n), this.now = this.start + (this.end -
                this.start) * this.pos, this.update(), h = !0); return h
        }, initPath: function (h, d, u) {
            function v(a) { var e, c; for (b = a.length; b--;)e = "M" === a[b] || "L" === a[b], c = /[a-zA-Z]/.test(a[b + 3]), e && c && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2]) } function t(a, g) { for (; a.length < c;) { a[0] = g[c - a.length]; var q = a.slice(0, e);[].splice.apply(a, [0, 0].concat(q)); p && (q = a.slice(a.length - e), [].splice.apply(a, [a.length, 0].concat(q)), b--) } a[0] = "M" } function r(a, b) {
                for (var q = (c - a.length) / e; 0 < q && q--;)g = a.slice().splice(a.length / H - e, e * H), g[0] =
                    b[c - e - q * e], f && (g[e - 6] = g[e - 2], g[e - 5] = g[e - 1]), [].splice.apply(a, [a.length / H, 0].concat(g)), p && q--
            } d = d || ""; var n, k = h.startX, l = h.endX, f = -1 < d.indexOf("C"), e = f ? 7 : 3, c, g, b; d = d.split(" "); u = u.slice(); var p = h.isArea, H = p ? 2 : 1, w; f && (v(d), v(u)); if (k && l) { for (b = 0; b < k.length; b++)if (k[b] === l[0]) { n = b; break } else if (k[0] === l[l.length - k.length + b]) { n = b; w = !0; break } else if (k[k.length - 1] === l[l.length - k.length + b]) { n = k.length - b; break } "undefined" === typeof n && (d = []) } d.length && a.isNumber(n) && (c = u.length + n * H * e, w ? (t(d, u), r(u, d)) :
                (t(u, d), r(d, u))); return [d, u]
        }, fillSetter: function () { a.Fx.prototype.strokeSetter.apply(this, arguments) }, strokeSetter: function () { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0) }
    }; a.merge = function () {
        var h, d = arguments, u, v = {}, t = function (h, n) { "object" !== typeof h && (h = {}); a.objectEach(n, function (k, l) { !a.isObject(k, !0) || a.isClass(k) || a.isDOMElement(k) ? h[l] = n[l] : h[l] = t(h[l] || {}, k) }); return h }; !0 === d[0] && (v = d[1], d = Array.prototype.slice.call(d, 2)); u = d.length; for (h = 0; h <
            u; h++)v = t(v, d[h]); return v
    }; a.pInt = function (a, d) { return parseInt(a, d || 10) }; a.isString = function (a) { return "string" === typeof a }; a.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a }; a.isObject = function (h, d) { return !!h && "object" === typeof h && (!d || !a.isArray(h)) }; a.isDOMElement = function (h) { return a.isObject(h) && "number" === typeof h.nodeType }; a.isClass = function (h) {
        var d = h && h.constructor; return !(!a.isObject(h, !0) || a.isDOMElement(h) || !d || !d.name ||
            "Object" === d.name)
    }; a.isNumber = function (a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a }; a.erase = function (a, d) { for (var h = a.length; h--;)if (a[h] === d) { a.splice(h, 1); break } }; a.defined = function (a) { return "undefined" !== typeof a && null !== a }; a.attr = function (h, d, u) { var v; a.isString(d) ? a.defined(u) ? h.setAttribute(d, u) : h && h.getAttribute && ((v = h.getAttribute(d)) || "class" !== d || (v = h.getAttribute(d + "Name"))) : a.defined(d) && a.isObject(d) && a.objectEach(d, function (a, d) { h.setAttribute(d, a) }); return v };
        a.splat = function (h) { return a.isArray(h) ? h : [h] }; a.syncTimeout = function (a, d, u) { if (d) return setTimeout(a, d, u); a.call(0, u) }; a.clearTimeout = function (h) { a.defined(h) && clearTimeout(h) }; a.extend = function (a, d) { var h; a || (a = {}); for (h in d) a[h] = d[h]; return a }; a.pick = function () { var a = arguments, d, u, v = a.length; for (d = 0; d < v; d++)if (u = a[d], "undefined" !== typeof u && null !== u) return u }; a.css = function (h, d) {
        a.isMS && !a.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity\x3d" + 100 * d.opacity + ")"); a.extend(h.style,
            d)
        }; a.createElement = function (h, d, u, v, t) { h = E.createElement(h); var r = a.css; d && a.extend(h, d); t && r(h, { padding: "0", border: "none", margin: "0" }); u && r(h, u); v && v.appendChild(h); return h }; a.extendClass = function (h, d) { var u = function () { }; u.prototype = new h; a.extend(u.prototype, d); return u }; a.pad = function (a, d, u) { return Array((d || 2) + 1 - String(a).replace("-", "").length).join(u || "0") + a }; a.relativeLength = function (a, d, u) { return /%$/.test(a) ? d * parseFloat(a) / 100 + (u || 0) : parseFloat(a) }; a.wrap = function (a, d, u) {
            var h = a[d]; a[d] =
                function () { var a = Array.prototype.slice.call(arguments), d = arguments, n = this; n.proceed = function () { h.apply(n, arguments.length ? arguments : d) }; a.unshift(h); a = u.apply(this, a); n.proceed = null; return a }
        }; a.datePropsToTimestamps = function (h) { a.objectEach(h, function (d, u) { a.isObject(d) && "function" === typeof d.getTime ? h[u] = d.getTime() : (a.isObject(d) || a.isArray(d)) && a.datePropsToTimestamps(d) }) }; a.formatSingle = function (h, d, u) {
            var v = /\.([0-9])/, t = a.defaultOptions.lang; /f$/.test(h) ? (u = (u = h.match(v)) ? u[1] : -1, null !== d &&
                (d = a.numberFormat(d, u, t.decimalPoint, -1 < h.indexOf(",") ? t.thousandsSep : ""))) : d = (u || a.time).dateFormat(h, d); return d
        }; a.format = function (h, d, u) { for (var v = "{", t = !1, r, n, k, l, f = [], e; h;) { v = h.indexOf(v); if (-1 === v) break; r = h.slice(0, v); if (t) { r = r.split(":"); n = r.shift().split("."); l = n.length; e = d; for (k = 0; k < l; k++)e && (e = e[n[k]]); r.length && (e = a.formatSingle(r.join(":"), e, u)); f.push(e) } else f.push(r); h = h.slice(v + 1); v = (t = !t) ? "}" : "{" } f.push(h); return f.join("") }; a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) /
                Math.LN10))
        }; a.normalizeTickInterval = function (h, d, u, v, t) { var r, n = h; u = a.pick(u, 1); r = h / u; d || (d = t ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === v && (1 === u ? d = d.filter(function (a) { return 0 === a % 1 }) : .1 >= u && (d = [1 / u]))); for (v = 0; v < d.length && !(n = d[v], t && n * u >= h || !t && r <= (d[v] + (d[v + 1] || d[v])) / 2); v++); return n = a.correctFloat(n * u, -Math.round(Math.log(.001) / Math.LN10)) }; a.stableSort = function (a, d) {
            var h = a.length, v, t; for (t = 0; t < h; t++)a[t].safeI = t; a.sort(function (a, n) { v = d(a, n); return 0 === v ? a.safeI - n.safeI : v }); for (t =
                0; t < h; t++)delete a[t].safeI
        }; a.arrayMin = function (a) { for (var d = a.length, h = a[0]; d--;)a[d] < h && (h = a[d]); return h }; a.arrayMax = function (a) { for (var d = a.length, h = a[0]; d--;)a[d] > h && (h = a[d]); return h }; a.destroyObjectProperties = function (h, d) { a.objectEach(h, function (a, v) { a && a !== d && a.destroy && a.destroy(); delete h[v] }) }; a.discardElement = function (h) { var d = a.garbageBin; d || (d = a.createElement("div")); h && d.appendChild(h); d.innerHTML = "" }; a.correctFloat = function (a, d) { return parseFloat(a.toPrecision(d || 14)) }; a.setAnimation =
            function (h, d) { d.renderer.globalAnimation = a.pick(h, d.options.chart.animation, !0) }; a.animObject = function (h) { return a.isObject(h) ? a.merge(h) : { duration: h ? 500 : 0 } }; a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }; a.numberFormat = function (h, d, u, v) {
                h = +h || 0; d = +d; var t = a.defaultOptions.lang, r = (h.toString().split(".")[1] || "").split("e")[0].length, n, k, l = h.toString().split("e"); -1 === d ? d = Math.min(r, 20) : a.isNumber(d) ? d && l[1] && 0 > l[1] && (n = d + +l[1], 0 <= n ? (l[0] =
                    (+l[0]).toExponential(n).split("e")[0], d = n) : (l[0] = l[0].split(".")[0] || 0, h = 20 > d ? (l[0] * Math.pow(10, l[1])).toFixed(d) : 0, l[1] = 0)) : d = 2; k = (Math.abs(l[1] ? l[0] : h) + Math.pow(10, -Math.max(d, r) - 1)).toFixed(d); r = String(a.pInt(k)); n = 3 < r.length ? r.length % 3 : 0; u = a.pick(u, t.decimalPoint); v = a.pick(v, t.thousandsSep); h = (0 > h ? "-" : "") + (n ? r.substr(0, n) + v : ""); h += r.substr(n).replace(/(\d{3})(?=\d)/g, "$1" + v); d && (h += u + k.slice(-d)); l[1] && 0 !== +h && (h += "e" + l[1]); return h
            }; Math.easeInOutSine = function (a) {
                return -.5 * (Math.cos(Math.PI *
                    a) - 1)
            }; a.getStyle = function (h, d, u) {
                if ("width" === d) return Math.max(0, Math.min(h.offsetWidth, h.scrollWidth, h.getBoundingClientRect && "none" === a.getStyle(h, "transform", !1) ? Math.floor(h.getBoundingClientRect().width) : Infinity) - a.getStyle(h, "padding-left") - a.getStyle(h, "padding-right")); if ("height" === d) return Math.max(0, Math.min(h.offsetHeight, h.scrollHeight) - a.getStyle(h, "padding-top") - a.getStyle(h, "padding-bottom")); D.getComputedStyle || a.error(27, !0); if (h = D.getComputedStyle(h, void 0)) h = h.getPropertyValue(d),
                    a.pick(u, "opacity" !== d) && (h = a.pInt(h)); return h
            }; a.inArray = function (a, d, u) { return d.indexOf(a, u) }; a.find = Array.prototype.find ? function (a, d) { return a.find(d) } : function (a, d) { var h, v = a.length; for (h = 0; h < v; h++)if (d(a[h], h)) return a[h] }; a.keys = Object.keys; a.offset = function (a) { var d = E.documentElement; a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 }; return { top: a.top + (D.pageYOffset || d.scrollTop) - (d.clientTop || 0), left: a.left + (D.pageXOffset || d.scrollLeft) - (d.clientLeft || 0) } }; a.stop = function (h,
                d) { for (var u = a.timers.length; u--;)a.timers[u].elem !== h || d && d !== a.timers[u].prop || (a.timers[u].stopped = !0) }; a.objectEach = function (a, d, u) { for (var h in a) a.hasOwnProperty(h) && d.call(u || a[h], a[h], h, a) }; a.objectEach({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (h, d) { a[d] = function (a) { return Array.prototype[h].apply(a, [].slice.call(arguments, 1)) } }); a.addEvent = function (h, d, u, v) {
                void 0 === v && (v = {}); var t, r = h.addEventListener || a.addEventListenerPolyfill; t = "function" === typeof h &&
                    h.prototype ? h.prototype.protoEvents = h.prototype.protoEvents || {} : h.hcEvents = h.hcEvents || {}; a.Point && h instanceof a.Point && h.series && h.series.chart && (h.series.chart.runTrackerClick = !0); r && r.call(h, d, u, !1); t[d] || (t[d] = []); t[d].push({ fn: u, order: "number" === typeof v.order ? v.order : Infinity }); t[d].sort(function (a, k) { return a.order - k.order }); return function () { a.removeEvent(h, d, u) }
                }; a.removeEvent = function (h, d, u) {
                    function v(n, k) { var l = h.removeEventListener || a.removeEventListenerPolyfill; l && l.call(h, n, k, !1) }
                    function t(n) { var k, l; h.nodeName && (d ? (k = {}, k[d] = !0) : k = n, a.objectEach(k, function (a, e) { if (n[e]) for (l = n[e].length; l--;)v(e, n[e][l].fn) })) } var r;["protoEvents", "hcEvents"].forEach(function (a) { var k = h[a]; k && (d ? (r = k[d] || [], u ? (k[d] = r.filter(function (a) { return u !== a.fn }), v(d, u)) : (t(k), k[d] = [])) : (t(k), h[a] = {})) })
                }; a.fireEvent = function (h, d, u, v) {
                    var t, r; u = u || {}; E.createEvent && (h.dispatchEvent || h.fireEvent) ? (t = E.createEvent("Events"), t.initEvent(d, !0, !0), a.extend(t, u), h.dispatchEvent ? h.dispatchEvent(t) : h.fireEvent(d,
                        t)) : (u.target || a.extend(u, { preventDefault: function () { u.defaultPrevented = !0 }, target: h, type: d }), function (a, k) { void 0 === a && (a = []); void 0 === k && (k = []); var l = 0, f = 0, e = a.length + k.length; for (r = 0; r < e; r++)!1 === (a[l] ? k[f] ? a[l].order <= k[f].order ? a[l++] : k[f++] : a[l++] : k[f++]).fn.call(h, u) && u.preventDefault() }(h.protoEvents && h.protoEvents[d], h.hcEvents && h.hcEvents[d])); v && !u.defaultPrevented && v.call(h, u)
                }; a.animate = function (h, d, u) {
                    var v, t = "", r, n, k; a.isObject(u) || (k = arguments, u = { duration: k[2], easing: k[3], complete: k[4] });
                    a.isNumber(u.duration) || (u.duration = 400); u.easing = "function" === typeof u.easing ? u.easing : Math[u.easing] || Math.easeInOutSine; u.curAnim = a.merge(d); a.objectEach(d, function (k, f) { a.stop(h, f); n = new a.Fx(h, u, f); r = null; "d" === f ? (n.paths = n.initPath(h, h.d, d.d), n.toD = d.d, v = 0, r = 1) : h.attr ? v = h.attr(f) : (v = parseFloat(a.getStyle(h, f)) || 0, "opacity" !== f && (t = "px")); r || (r = k); r && r.match && r.match("px") && (r = r.replace(/px/g, "")); n.run(v, r, t) })
                }; a.seriesType = function (h, d, u, v, t) {
                    var r = a.getOptions(), n = a.seriesTypes; r.plotOptions[h] =
                        a.merge(r.plotOptions[d], u); n[h] = a.extendClass(n[d] || function () { }, v); n[h].prototype.type = h; t && (n[h].prototype.pointClass = a.extendClass(a.Point, t)); return n[h]
                }; a.uniqueKey = function () { var a = Math.random().toString(36).substring(2, 9), d = 0; return function () { return "highcharts-" + a + "-" + d++ } }(); a.isFunction = function (a) { return "function" === typeof a }; D.jQuery && (D.jQuery.fn.highcharts = function () {
                    var h = [].slice.call(arguments); if (this[0]) return h[0] ? (new (a[a.isString(h[0]) ? h.shift() : "Chart"])(this[0], h[0], h[1]),
                        this) : B[a.attr(this[0], "data-highcharts-chart")]
                })
    }); K(I, "parts/Color.js", [I["parts/Globals.js"]], function (a) {
        var B = a.isNumber, E = a.merge, D = a.pInt; a.Color = function (h) { if (!(this instanceof a.Color)) return new a.Color(h); this.init(h) }; a.Color.prototype = {
            parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (a) { return [D(a[1]), D(a[2]), D(a[3]), parseFloat(a[4], 10)] } }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) { return [D(a[1]), D(a[2]), D(a[3]), 1] }
            }], names: { white: "#ffffff", black: "#000000" }, init: function (h) {
                var d, u, v, t; if ((this.input = h = this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) && h.stops) this.stops = h.stops.map(function (d) { return new a.Color(d[1]) }); else if (h && h.charAt && "#" === h.charAt() && (d = h.length, h = parseInt(h.substr(1), 16), 7 === d ? u = [(h & 16711680) >> 16, (h & 65280) >> 8, h & 255, 1] : 4 === d && (u = [(h & 3840) >> 4 | (h & 3840) >> 8, (h & 240) >> 4 | h & 240, (h & 15) << 4 | h & 15, 1])), !u) for (v = this.parsers.length; v-- && !u;)t =
                    this.parsers[v], (d = t.regex.exec(h)) && (u = t.parse(d)); this.rgba = u || []
            }, get: function (a) { var d = this.input, h = this.rgba, v; this.stops ? (v = E(d), v.stops = [].concat(v.stops), this.stops.forEach(function (d, r) { v.stops[r] = [v.stops[r][0], d.get(a)] })) : v = h && B(h[0]) ? "rgb" === a || !a && 1 === h[3] ? "rgb(" + h[0] + "," + h[1] + "," + h[2] + ")" : "a" === a ? h[3] : "rgba(" + h.join(",") + ")" : d; return v }, brighten: function (a) {
                var d, h = this.rgba; if (this.stops) this.stops.forEach(function (d) { d.brighten(a) }); else if (B(a) && 0 !== a) for (d = 0; 3 > d; d++)h[d] += D(255 *
                    a), 0 > h[d] && (h[d] = 0), 255 < h[d] && (h[d] = 255); return this
            }, setOpacity: function (a) { this.rgba[3] = a; return this }, tweenTo: function (a, d) { var h = this.rgba, v = a.rgba; v.length && h && h.length ? (a = 1 !== v[3] || 1 !== h[3], d = (a ? "rgba(" : "rgb(") + Math.round(v[0] + (h[0] - v[0]) * (1 - d)) + "," + Math.round(v[1] + (h[1] - v[1]) * (1 - d)) + "," + Math.round(v[2] + (h[2] - v[2]) * (1 - d)) + (a ? "," + (v[3] + (h[3] - v[3]) * (1 - d)) : "") + ")") : d = a.input || "none"; return d }
        }; a.color = function (h) { return new a.Color(h) }
    }); K(I, "parts/Time.js", [I["parts/Globals.js"]], function (a) {
        var B =
            a.defined, E = a.extend, D = a.merge, h = a.pick, d = a.timeUnits, u = a.win; a.Time = function (a) { this.update(a, !1) }; a.Time.prototype = {
                defaultOptions: {}, update: function (a) {
                    var d = h(a && a.useUTC, !0), r = this; this.options = a = D(!0, this.options || {}, a); this.Date = a.Date || u.Date || Date; this.timezoneOffset = (this.useUTC = d) && a.timezoneOffset; this.getTimezoneOffset = this.timezoneOffsetFunction(); (this.variableTimezone = !(d && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, k) {
                        var l = k.getTime(), f = l - r.getTimezoneOffset(k);
                        k.setTime(f); a = k["getUTC" + a](); k.setTime(l); return a
                    }, this.set = function (a, k, l) { var f; if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === k.getTimezoneOffset() % 60) k["set" + a](l); else f = r.getTimezoneOffset(k), f = k.getTime() - f, k.setTime(f), k["setUTC" + a](l), a = r.getTimezoneOffset(k), f = k.getTime() + a, k.setTime(f) }) : d ? (this.get = function (a, k) { return k["getUTC" + a]() }, this.set = function (a, k, l) { return k["setUTC" + a](l) }) : (this.get = function (a, k) { return k["get" + a]() }, this.set = function (a, k, l) { return k["set" + a](l) })
                },
                makeTime: function (d, t, r, n, k, l) { var f, e, c; this.useUTC ? (f = this.Date.UTC.apply(0, arguments), e = this.getTimezoneOffset(f), f += e, c = this.getTimezoneOffset(f), e !== c ? f += c - e : e - 36E5 !== this.getTimezoneOffset(f - 36E5) || a.isSafari || (f -= 36E5)) : f = (new this.Date(d, t, h(r, 1), h(n, 0), h(k, 0), h(l, 0))).getTime(); return f }, timezoneOffsetFunction: function () {
                    var d = this, h = this.options, r = u.moment; if (!this.useUTC) return function (a) { return 6E4 * (new Date(a)).getTimezoneOffset() }; if (h.timezone) {
                        if (r) return function (a) {
                            return 6E4 * -r.tz(a,
                                h.timezone).utcOffset()
                        }; a.error(25)
                    } return this.useUTC && h.getTimezoneOffset ? function (a) { return 6E4 * h.getTimezoneOffset(a) } : function () { return 6E4 * (d.timezoneOffset || 0) }
                }, dateFormat: function (d, h, r) {
                    if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate || ""; d = a.pick(d, "%Y-%m-%d %H:%M:%S"); var n = this, k = new this.Date(h), l = this.get("Hours", k), f = this.get("Day", k), e = this.get("Date", k), c = this.get("Month", k), g = this.get("FullYear", k), b = a.defaultOptions.lang, p = b.weekdays, H = b.shortWeekdays, w = a.pad,
                        k = a.extend({ a: H ? H[f] : p[f].substr(0, 3), A: p[f], d: w(e), e: w(e, 2, " "), w: f, b: b.shortMonths[c], B: b.months[c], m: w(c + 1), o: c + 1, y: g.toString().substr(2, 2), Y: g, H: w(l), k: l, I: w(l % 12 || 12), l: l % 12 || 12, M: w(n.get("Minutes", k)), p: 12 > l ? "AM" : "PM", P: 12 > l ? "am" : "pm", S: w(k.getSeconds()), L: w(Math.floor(h % 1E3), 3) }, a.dateFormats); a.objectEach(k, function (a, b) { for (; -1 !== d.indexOf("%" + b);)d = d.replace("%" + b, "function" === typeof a ? a.call(n, h) : a) }); return r ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
                }, resolveDTLFormat: function (d) {
                    return a.isObject(d,
                        !0) ? d : (d = a.splat(d), { main: d[0], from: d[1], to: d[2] })
                }, getTimeTicks: function (a, t, r, n) {
                    var k = this, l = [], f, e = {}, c; f = new k.Date(t); var g = a.unitRange, b = a.count || 1, p; n = h(n, 1); if (B(t)) {
                        k.set("Milliseconds", f, g >= d.second ? 0 : b * Math.floor(k.get("Milliseconds", f) / b)); g >= d.second && k.set("Seconds", f, g >= d.minute ? 0 : b * Math.floor(k.get("Seconds", f) / b)); g >= d.minute && k.set("Minutes", f, g >= d.hour ? 0 : b * Math.floor(k.get("Minutes", f) / b)); g >= d.hour && k.set("Hours", f, g >= d.day ? 0 : b * Math.floor(k.get("Hours", f) / b)); g >= d.day && k.set("Date",
                            f, g >= d.month ? 1 : Math.max(1, b * Math.floor(k.get("Date", f) / b))); g >= d.month && (k.set("Month", f, g >= d.year ? 0 : b * Math.floor(k.get("Month", f) / b)), c = k.get("FullYear", f)); g >= d.year && k.set("FullYear", f, c - c % b); g === d.week && (c = k.get("Day", f), k.set("Date", f, k.get("Date", f) - c + n + (c < n ? -7 : 0))); c = k.get("FullYear", f); n = k.get("Month", f); var H = k.get("Date", f), w = k.get("Hours", f); t = f.getTime(); k.variableTimezone && (p = r - t > 4 * d.month || k.getTimezoneOffset(t) !== k.getTimezoneOffset(r)); t = f.getTime(); for (f = 1; t < r;)l.push(t), t = g === d.year ?
                                k.makeTime(c + f * b, 0) : g === d.month ? k.makeTime(c, n + f * b) : !p || g !== d.day && g !== d.week ? p && g === d.hour && 1 < b ? k.makeTime(c, n, H, w + f * b) : t + g * b : k.makeTime(c, n, H + f * b * (g === d.day ? 1 : 7)), f++; l.push(t); g <= d.hour && 1E4 > l.length && l.forEach(function (a) { 0 === a % 18E5 && "000000000" === k.dateFormat("%H%M%S%L", a) && (e[a] = "day") })
                    } l.info = E(a, { higherRanks: e, totalRange: g * b }); return l
                }
            }
    }); K(I, "parts/Options.js", [I["parts/Globals.js"]], function (a) {
        var B = a.color, E = a.merge; a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: {}, time: a.Time.prototype.defaultOptions,
            chart: { styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: {
                enabled: !0, align: "center",
                alignColumns: !0, layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } }
            },
            loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: {
                enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e', backgroundColor: B("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" }
            }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
        };
        a.setOptions = function (B) { a.defaultOptions = E(!0, a.defaultOptions, B); a.time.update(E(a.defaultOptions.global, a.defaultOptions.time), !1); return a.defaultOptions }; a.getOptions = function () { return a.defaultOptions }; a.defaultPlotOptions = a.defaultOptions.plotOptions; a.time = new a.Time(E(a.defaultOptions.global, a.defaultOptions.time)); a.dateFormat = function (B, h, d) { return a.time.dateFormat(B, h, d) }; ""
    }); K(I, "parts/SvgRenderer.js", [I["parts/Globals.js"]], function (a) {
        var B, E, D = a.addEvent, h = a.animate, d = a.attr, u = a.charts,
        v = a.color, t = a.css, r = a.createElement, n = a.defined, k = a.deg2rad, l = a.destroyObjectProperties, f = a.doc, e = a.extend, c = a.erase, g = a.hasTouch, b = a.isArray, p = a.isFirefox, H = a.isMS, w = a.isObject, F = a.isString, y = a.isWebKit, q = a.merge, C = a.noop, A = a.objectEach, G = a.pick, L = a.pInt, m = a.removeEvent, z = a.splat, M = a.stop, N = a.svg, J = a.SVG_NS, R = a.symbolSizes, O = a.win; B = a.SVGElement = function () { return this }; e(B.prototype, {
            opacity: 1, SVG_NS: J, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (x, b) { this.element = "span" === b ? r(b) : f.createElementNS(this.SVG_NS, b); this.renderer = x; a.fireEvent(this, "afterInit") }, animate: function (x, b, e) { var m = a.animObject(G(b, this.renderer.globalAnimation, !0)); G(f.hidden, f.msHidden, f.webkitHidden, !1) && (m.duration = 0); 0 !== m.duration ? (e && (m.complete = e), h(this, x, m)) : (this.attr(x, void 0, e), a.objectEach(x, function (a, x) { m.step && m.step.call(this, a, { prop: x, pos: 1 }) }, this)); return this }, complexColor: function (x, e, m) {
                var c = this.renderer, g, z, f, p, w, k, T, J, d, l, C,
                y = [], N; a.fireEvent(this.renderer, "complexColor", { args: arguments }, function () {
                    x.radialGradient ? z = "radialGradient" : x.linearGradient && (z = "linearGradient"); z && (f = x[z], w = c.gradients, T = x.stops, l = m.radialReference, b(f) && (x[z] = f = { x1: f[0], y1: f[1], x2: f[2], y2: f[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === z && l && !n(f.gradientUnits) && (p = f, f = q(f, c.getRadialAttr(l, p), { gradientUnits: "userSpaceOnUse" })), A(f, function (a, x) { "id" !== x && y.push(x, a) }), A(T, function (a) { y.push(a) }), y = y.join(","), w[y] ? C = w[y].attr("id") :
                        (f.id = C = a.uniqueKey(), w[y] = k = c.createElement(z).attr(f).add(c.defs), k.radAttr = p, k.stops = [], T.forEach(function (x) { 0 === x[1].indexOf("rgba") ? (g = a.color(x[1]), J = g.get("rgb"), d = g.get("a")) : (J = x[1], d = 1); x = c.createElement("stop").attr({ offset: x[0], "stop-color": J, "stop-opacity": d }).add(k); k.stops.push(x) })), N = "url(" + c.url + "#" + C + ")", m.setAttribute(e, N), m.gradient = y, x.toString = function () { return N })
                })
            }, applyTextOutline: function (x) {
                var b = this.element, e, m, c; -1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g,
                    this.renderer.getContrast(b.style.fill))); x = x.split(" "); e = x[x.length - 1]; (m = x[0]) && "none" !== m && a.svg && (this.fakeTS = !0, x = [].slice.call(b.getElementsByTagName("tspan")), this.ySetter = this.xSetter, m = m.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, b) { return 2 * x + b }), this.removeTextOutline(x), c = b.firstChild, x.forEach(function (a, x) {
                    0 === x && (a.setAttribute("x", b.getAttribute("x")), x = b.getAttribute("y"), a.setAttribute("y", x || 0), null === x && b.setAttribute("y", 0)); a = a.cloneNode(1); d(a, {
                        "class": "highcharts-text-outline",
                        fill: e, stroke: e, "stroke-width": m, "stroke-linejoin": "round"
                    }); b.insertBefore(a, c)
                    }))
            }, removeTextOutline: function (a) { for (var x = a.length, b; x--;)b = a[x], "highcharts-text-outline" === b.getAttribute("class") && c(a, this.element.removeChild(b)) }, symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "), attr: function (x, b, m, e) {
                var c, g = this.element, z, q = this, f, p, w = this.symbolCustomAttribs; "string" === typeof x && void 0 !== b && (c = x, x = {}, x[c] = b); "string" === typeof x ? q = (this[x + "Getter"] ||
                    this._defaultGetter).call(this, x, g) : (A(x, function (b, m) { f = !1; e || M(this, m); this.symbolName && -1 !== a.inArray(m, w) && (z || (this.symbolAttr(x), z = !0), f = !0); !this.rotation || "x" !== m && "y" !== m || (this.doTransform = !0); f || (p = this[m + "Setter"] || this._defaultSetter, p.call(this, b, m, g), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(m) && this.updateShadows(m, b, p)) }, this), this.afterSetters()); m && m.call(this); return q
            }, afterSetters: function () {
            this.doTransform && (this.updateTransform(),
                this.doTransform = !1)
            }, updateShadows: function (a, b, m) { for (var x = this.shadows, e = x.length; e--;)m.call(x[e], "height" === a ? Math.max(b - (x[e].cutHeight || 0), 0) : "d" === a ? this.d : b, a, x[e]) }, addClass: function (a, b) { var x = this.attr("class") || ""; b || (a = (a || "").split(/ /g).reduce(function (a, b) { -1 === x.indexOf(b) && a.push(b); return a }, x ? [x] : []).join(" ")); a !== x && this.attr("class", a); return this }, hasClass: function (a) { return -1 !== (this.attr("class") || "").split(" ").indexOf(a) }, removeClass: function (a) {
                return this.attr("class",
                    (this.attr("class") || "").replace(a, ""))
            }, symbolAttr: function (a) { var x = this; "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (b) { x[b] = G(a[b], x[b]) }); x.attr({ d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x) }) }, clip: function (a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") }, crisp: function (a, b) {
                var x; b = b || a.strokeWidth || 0; x = Math.round(b) % 2 / 2; a.x = Math.floor(a.x || this.x || 0) + x; a.y = Math.floor(a.y || this.y || 0) + x; a.width =
                    Math.floor((a.width || this.width || 0) - 2 * x); a.height = Math.floor((a.height || this.height || 0) - 2 * x); n(a.strokeWidth) && (a.strokeWidth = b); return a
            }, css: function (a) {
                var b = this.styles, x = {}, m = this.element, c, g = "", z, q = !b, f = ["textOutline", "textOverflow", "width"]; a && a.color && (a.fill = a.color); b && A(a, function (a, m) { a !== b[m] && (x[m] = a, q = !0) }); q && (b && (a = e(b, x)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === m.nodeName.toLowerCase() && a.width && (c = this.textWidth = L(a.width))), this.styles = a, c && !N && this.renderer.forExport &&
                    delete a.width, m.namespaceURI === this.SVG_NS ? (z = function (a, b) { return "-" + b.toLowerCase() }, A(a, function (a, b) { -1 === f.indexOf(b) && (g += b.replace(/([A-Z])/g, z) + ":" + a + ";") }), g && d(m, "style", g)) : t(m, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))); return this
            }, getStyle: function (a) { return O.getComputedStyle(this.element || this, "").getPropertyValue(a) }, strokeWidth: function () {
                if (!this.renderer.styledMode) return this["stroke-width"] ||
                    0; var a = this.getStyle("stroke-width"), b; a.indexOf("px") === a.length - 2 ? a = L(a) : (b = f.createElementNS(J, "rect"), d(b, { width: a, "stroke-width": 0 }), this.element.parentNode.appendChild(b), a = b.getBBox().width, b.parentNode.removeChild(b)); return a
            }, on: function (a, b) {
                var m = this, x = m.element; g && "click" === a ? (x.ontouchstart = function (a) { m.touchEventFired = Date.now(); a.preventDefault(); b.call(x, a) }, x.onclick = function (a) {
                (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (m.touchEventFired || 0)) && b.call(x,
                    a)
                }) : x["on" + a] = b; return this
            }, setRadialReference: function (a) { var b = this.renderer.gradients[this.element.gradient]; this.element.radialReference = a; b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)); return this }, translate: function (a, b) { return this.attr({ translateX: a, translateY: b }) }, invert: function (a) { this.inverted = a; this.updateTransform(); return this }, updateTransform: function () {
                var a = this.translateX || 0, b = this.translateY || 0, m = this.scaleX, e = this.scaleY, c = this.inverted, g = this.rotation, z =
                    this.matrix, q = this.element; c && (a += this.width, b += this.height); a = ["translate(" + a + "," + b + ")"]; n(z) && a.push("matrix(" + z.join(",") + ")"); c ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + G(this.rotationOriginX, q.getAttribute("x"), 0) + " " + G(this.rotationOriginY, q.getAttribute("y") || 0) + ")"); (n(m) || n(e)) && a.push("scale(" + G(m, 1) + " " + G(e, 1) + ")"); a.length && q.setAttribute("transform", a.join(" "))
            }, toFront: function () { var a = this.element; a.parentNode.appendChild(a); return this }, align: function (a, b, m) {
                var e,
                x, g, z, q = {}; x = this.renderer; g = x.alignedObjects; var f, p; if (a) { if (this.alignOptions = a, this.alignByTranslate = b, !m || F(m)) this.alignTo = e = m || "renderer", c(g, this), g.push(this), m = null } else a = this.alignOptions, b = this.alignByTranslate, e = this.alignTo; m = G(m, x[e], x); e = a.align; x = a.verticalAlign; g = (m.x || 0) + (a.x || 0); z = (m.y || 0) + (a.y || 0); "right" === e ? f = 1 : "center" === e && (f = 2); f && (g += (m.width - (a.width || 0)) / f); q[b ? "translateX" : "x"] = Math.round(g); "bottom" === x ? p = 1 : "middle" === x && (p = 2); p && (z += (m.height - (a.height || 0)) / p); q[b ?
                    "translateY" : "y"] = Math.round(z); this[this.placed ? "animate" : "attr"](q); this.placed = !0; this.alignAttr = q; return this
            }, getBBox: function (a, b) {
                var m, x = this.renderer, c, g = this.element, z = this.styles, q, f = this.textStr, p, A = x.cache, w = x.cacheKeys, J = g.namespaceURI === this.SVG_NS, d; b = G(b, this.rotation); c = b * k; q = x.styledMode ? g && B.prototype.getStyle.call(g, "font-size") : z && z.fontSize; n(f) && (d = f.toString(), -1 === d.indexOf("\x3c") && (d = d.replace(/[0-9]/g, "0")), d += ["", b || 0, q, this.textWidth, z && z.textOverflow].join()); d && !a &&
                    (m = A[d]); if (!m) {
                        if (J || x.forExport) { try { (p = this.fakeTS && function (a) { [].forEach.call(g.querySelectorAll(".highcharts-text-outline"), function (b) { b.style.display = a }) }) && p("none"), m = g.getBBox ? e({}, g.getBBox()) : { width: g.offsetWidth, height: g.offsetHeight }, p && p("") } catch (Z) { "" } if (!m || 0 > m.width) m = { width: 0, height: 0 } } else m = this.htmlGetBBox(); x.isSVG && (a = m.width, x = m.height, J && (m.height = x = { "11px,17": 14, "13px,20": 16 }[z && z.fontSize + "," + Math.round(x)] || x), b && (m.width = Math.abs(x * Math.sin(c)) + Math.abs(a * Math.cos(c)),
                            m.height = Math.abs(x * Math.cos(c)) + Math.abs(a * Math.sin(c)))); if (d && 0 < m.height) { for (; 250 < w.length;)delete A[w.shift()]; A[d] || w.push(d); A[d] = m }
                    } return m
            }, show: function (a) { return this.attr({ visibility: a ? "inherit" : "visible" }) }, hide: function () { return this.attr({ visibility: "hidden" }) }, fadeOut: function (a) { var b = this; b.animate({ opacity: 0 }, { duration: a || 150, complete: function () { b.attr({ y: -9999 }) } }) }, add: function (a) {
                var b = this.renderer, m = this.element, e; a && (this.parentGroup = a); this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this); this.added = !0; if (!a || a.handleZ || this.zIndex) e = this.zIndexSetter(); e || (a ? a.element : b.box).appendChild(m); if (this.onAdd) this.onAdd(); return this
            }, safeRemoveChild: function (a) { var b = a.parentNode; b && b.removeChild(a) }, destroy: function () {
                var a = this, b = a.element || {}, m = a.renderer, e = m.isSVG && "SPAN" === b.nodeName && a.parentGroup, g = b.ownerSVGElement, z = a.clipPath; b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null; M(a); z && g && ([].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"),
                    function (a) { -1 < a.getAttribute("clip-path").indexOf(z.element.id) && a.removeAttribute("clip-path") }), a.clipPath = z.destroy()); if (a.stops) { for (g = 0; g < a.stops.length; g++)a.stops[g] = a.stops[g].destroy(); a.stops = null } a.safeRemoveChild(b); for (m.styledMode || a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;)b = e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = b; a.alignTo && c(m.alignedObjects, a); A(a, function (b, m) { delete a[m] })
            }, shadow: function (a, b, m) {
                var e = [], x, c, g = this.element, z, q, f, p; if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    q = G(a.width, 3); f = (a.opacity || .15) / q; p = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")"; for (x = 1; x <= q; x++)c = g.cloneNode(0), z = 2 * q + 1 - 2 * x, d(c, { stroke: a.color || "#000000", "stroke-opacity": f * x, "stroke-width": z, transform: "translate" + p, fill: "none" }), c.setAttribute("class", (c.getAttribute("class") || "") + " highcharts-shadow"), m && (d(c, "height", Math.max(d(c, "height") - z, 0)), c.cutHeight = z), b ? b.element.appendChild(c) : g.parentNode && g.parentNode.insertBefore(c, g), e.push(c);
                    this.shadows = e
                } return this
            }, destroyShadows: function () { (this.shadows || []).forEach(function (a) { this.safeRemoveChild(a) }, this); this.shadows = void 0 }, xGetter: function (a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a) }, _defaultGetter: function (a) { a = G(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a }, dSetter: function (a, b, m) {
            a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a =
                "M 0 0"); this[b] !== a && (m.setAttribute(b, a), this[b] = a)
            }, dashstyleSetter: function (a) {
                var b, m = this["stroke-width"]; "inherit" === m && (m = 1); if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (b = a.length; b--;)a[b] = L(a[b]) * m; a = a.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray",
                        a)
                }
            }, alignSetter: function (a) { var b = { left: "start", center: "middle", right: "end" }; b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a])) }, opacitySetter: function (a, b, m) { this[b] = a; m.setAttribute(b, a) }, titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0]; b || (b = f.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b)); b.firstChild && b.removeChild(b.firstChild); b.appendChild(f.createTextNode(String(G(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g,
                    "\x3e")))
            }, textSetter: function (a) { a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this)) }, setTextPath: function (b, m) {
                var e = this.element, c = { textAnchor: "text-anchor" }, g, x = !1, z, f = this.textPathWrapper, p = !f; m = q(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, m); g = m.attributes; if (b && m && m.enabled) {
                this.options && this.options.padding && (g.dx = -this.options.padding); f || (this.textPathWrapper = f = this.renderer.createElement("textPath"),
                    x = !0); z = f.element; (m = b.element.getAttribute("id")) || b.element.setAttribute("id", m = a.uniqueKey()); if (p) for (b = e.getElementsByTagName("tspan"); b.length;)b[0].setAttribute("y", 0), z.appendChild(b[0]); x && f.add({ element: this.text ? this.text.element : e }); z.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + m); n(g.dy) && (z.parentNode.setAttribute("dy", g.dy), delete g.dy); n(g.dx) && (z.parentNode.setAttribute("dx", g.dx), delete g.dx); a.objectEach(g, function (a, b) { z.setAttribute(c[b] || b, a) });
                    e.removeAttribute("transform"); this.removeTextOutline.call(f, [].slice.call(e.getElementsByTagName("tspan"))); this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 }); this.applyTextOutline = this.updateTransform = C
                } else f && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(e, b)); return this
            }, destroyTextPath: function (a, b) {
                var m; b.element.setAttribute("id", ""); for (m = this.textPathWrapper.element.childNodes; m.length;)a.firstChild.appendChild(m[0]); a.firstChild.removeChild(this.textPathWrapper.element);
                delete b.textPathWrapper
            }, fillSetter: function (a, b, m) { "string" === typeof a ? m.setAttribute(b, a) : a && this.complexColor(a, b, m) }, visibilitySetter: function (a, b, m) { "inherit" === a ? m.removeAttribute(b) : this[b] !== a && m.setAttribute(b, a); this[b] = a }, zIndexSetter: function (a, b) {
                var m = this.renderer, e = this.parentGroup, c = (e || m).element || m.box, g, z = this.element, x = !1, q, m = c === m.box; g = this.added; var f; n(a) ? (z.setAttribute("data-z-index", a), a = +a, this[b] === a && (g = !1)) : n(this[b]) && z.removeAttribute("data-z-index"); this[b] = a; if (g) {
                (a =
                    this.zIndex) && e && (e.handleZ = !0); b = c.childNodes; for (f = b.length - 1; 0 <= f && !x; f--)if (e = b[f], g = e.getAttribute("data-z-index"), q = !n(g), e !== z) if (0 > a && q && !m && !f) c.insertBefore(z, b[f]), x = !0; else if (L(g) <= a || q && (!n(a) || 0 <= a)) c.insertBefore(z, b[f + 1] || null), x = !0; x || (c.insertBefore(z, b[m ? 3 : 0] || null), x = !0)
                } return x
            }, _defaultSetter: function (a, b, m) { m.setAttribute(b, a) }
        }); B.prototype.yGetter = B.prototype.xGetter; B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter =
            B.prototype.rotationOriginXSetter = B.prototype.rotationOriginYSetter = B.prototype.scaleXSetter = B.prototype.scaleYSetter = B.prototype.matrixSetter = function (a, b) { this[b] = a; this.doTransform = !0 }; B.prototype["stroke-widthSetter"] = B.prototype.strokeSetter = function (a, b, m) {
            this[b] = a; this.stroke && this["stroke-width"] ? (B.prototype.fillSetter.call(this, this.stroke, "stroke", m), m.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (m.removeAttribute("stroke"),
                this.hasStroke = !1)
            }; E = a.SVGRenderer = function () { this.init.apply(this, arguments) }; e(E.prototype, {
                Element: B, SVG_NS: J, init: function (a, b, m, e, c, g, z) {
                    var q; q = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }); z || q.css(this.getStyle(e)); e = q.element; a.appendChild(e); d(a, "dir", "ltr"); -1 === a.innerHTML.indexOf("xmlns") && d(e, "xmlns", this.SVG_NS); this.isSVG = !0; this.box = e; this.boxWrapper = q; this.alignedObjects = []; this.url = (p || y) && f.getElementsByTagName("base").length ? O.location.href.split("#")[0].replace(/<[^>]*>/g,
                        "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(f.createTextNode("Created with Highcharts 7.1.2")); this.defs = this.createElement("defs").add(); this.allowHTML = g; this.forExport = c; this.styledMode = z; this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.setSize(b, m, !1); var x; p && a.getBoundingClientRect && (b = function () {
                            t(a, { left: 0, top: 0 }); x = a.getBoundingClientRect(); t(a, {
                                left: Math.ceil(x.left) - x.left + "px", top: Math.ceil(x.top) - x.top +
                                    "px"
                            })
                        }, b(), this.unSubPixelFix = D(O, "resize", b))
                }, definition: function (a) { function b(a, e) { var c; z(a).forEach(function (a) { var g = m.createElement(a.tagName), z = {}; A(a, function (a, b) { "tagName" !== b && "children" !== b && "textContent" !== b && (z[b] = a) }); g.attr(z); g.add(e || m.defs); a.textContent && g.element.appendChild(f.createTextNode(a.textContent)); b(a.children || [], g); c = g }); return c } var m = this; return b(a) }, getStyle: function (a) {
                    return this.style = e({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    }, a)
                }, setStyle: function (a) { this.boxWrapper.css(this.getStyle(a)) }, isHidden: function () { return !this.boxWrapper.getBBox().width }, destroy: function () { var a = this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy(); l(this.gradients || {}); this.gradients = null; a && (this.defs = a.destroy()); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null }, createElement: function (a) { var b = new this.Element; b.init(this, a); return b }, draw: C, getRadialAttr: function (a, b) {
                    return {
                        cx: a[0] - a[2] /
                            2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2]
                    }
                }, truncate: function (a, b, m, e, c, g, z) {
                    var q = this, x = a.rotation, p, A = e ? 1 : 0, w = (m || e).length, k = w, d = [], J = function (a) { b.firstChild && b.removeChild(b.firstChild); a && b.appendChild(f.createTextNode(a)) }, l = function (g, f) { f = f || g; if (void 0 === d[f]) if (b.getSubStringLength) try { d[f] = c + b.getSubStringLength(0, e ? f + 1 : f) } catch (aa) { "" } else q.getSpanWidth && (J(z(m || e, g)), d[f] = c + q.getSpanWidth(a, b)); return d[f] }, C, n; a.rotation = 0; C = l(b.textContent.length); if (n = c + C > g) {
                        for (; A <= w;)k =
                            Math.ceil((A + w) / 2), e && (p = z(e, k)), C = l(k, p && p.length - 1), A === w ? A = w + 1 : C > g ? w = k - 1 : A = k; 0 === w ? J("") : m && w === m.length - 1 || J(p || z(m || e, k))
                    } e && e.splice(0, k); a.actualWidth = C; a.rotation = x; return n
                }, escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;" }, buildText: function (a) {
                    var b = a.element, m = this, e = m.forExport, c = G(a.textStr, "").toString(), g = -1 !== c.indexOf("\x3c"), z = b.childNodes, q, p = d(b, "x"), x = a.styles, w = a.textWidth, k = x && x.lineHeight, l = x && x.textOutline, C = x && "ellipsis" === x.textOverflow,
                    n = x && "nowrap" === x.whiteSpace, y = x && x.fontSize, r, M, h = z.length, x = w && !a.added && this.box, H = function (a) { var e; m.styledMode || (e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : y || m.style.fontSize || 12); return k ? L(k) : m.fontMetrics(e, a.getAttribute("style") ? a : b).h }, F = function (a, b) { A(m.escapes, function (m, e) { b && -1 !== b.indexOf(m) || (a = a.toString().replace(new RegExp(m, "g"), e)) }); return a }, R = function (a, b) {
                        var m; m = a.indexOf("\x3c"); a = a.substring(m, a.indexOf("\x3e") - m); m = a.indexOf(b + "\x3d"); if (-1 !== m && (m = m +
                            b.length + 1, b = a.charAt(m), '"' === b || "'" === b)) return a = a.substring(m + 1), a.substring(0, a.indexOf(b))
                    }; r = [c, C, n, k, l, y, w].join(); if (r !== a.textCache) {
                        for (a.textCache = r; h--;)b.removeChild(z[h]); g || l || C || w || -1 !== c.indexOf(" ") ? (x && x.appendChild(b), g ? (c = m.styledMode ? c.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : c.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'),
                            c = c.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g)) : c = [c], c = c.filter(function (a) { return "" !== a }), c.forEach(function (c, g) {
                                var z, x = 0, A = 0; c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||"); z = c.split("|||"); z.forEach(function (c) {
                                    if ("" !== c || 1 === z.length) {
                                        var k = {}, l = f.createElementNS(m.SVG_NS, "tspan"), r, h; (r = R(c, "class")) && d(l, "class", r); if (r = R(c, "style")) r = r.replace(/(;| |^)color([ :])/, "$1fill$2"), d(l, "style",
                                            r); (h = R(c, "href")) && !e && (d(l, "onclick", 'location.href\x3d"' + h + '"'), d(l, "class", "highcharts-anchor"), m.styledMode || t(l, { cursor: "pointer" })); c = F(c.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "); if (" " !== c) {
                                                l.appendChild(f.createTextNode(c)); x ? k.dx = 0 : g && null !== p && (k.x = p); d(l, k); b.appendChild(l); !x && M && (!N && e && t(l, { display: "block" }), d(l, "dy", H(l))); if (w) {
                                                    var G = c.replace(/([^\^])-/g, "$1- ").split(" "), k = !n && (1 < z.length || g || 1 < G.length); h = 0; var L = H(l); if (C) q = m.truncate(a, l, c, void 0, 0, Math.max(0, w - parseInt(y ||
                                                        12, 10)), function (a, b) { return a.substring(0, b) + "\u2026" }); else if (k) for (; G.length;)G.length && !n && 0 < h && (l = f.createElementNS(J, "tspan"), d(l, { dy: L, x: p }), r && d(l, "style", r), l.appendChild(f.createTextNode(G.join(" ").replace(/- /g, "-"))), b.appendChild(l)), m.truncate(a, l, null, G, 0 === h ? A : 0, w, function (a, b) { return G.slice(0, b).join(" ").replace(/- /g, "-") }), A = a.actualWidth, h++
                                                } x++
                                            }
                                    }
                                }); M = M || b.childNodes.length
                            }), C && q && a.attr("title", F(a.textStr, ["\x26lt;", "\x26gt;"])), x && x.removeChild(b), l && a.applyTextOutline &&
                            a.applyTextOutline(l)) : b.appendChild(f.createTextNode(F(c)))
                    }
                }, getContrast: function (a) { a = v(a).rgba; a[0] *= 1; a[1] *= 1.2; a[2] *= .5; return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF" }, button: function (a, b, m, c, g, z, f, p, w, A) {
                    var x = this.label(a, b, m, w, null, null, A, null, "button"), k = 0, l = this.styledMode; x.attr(q({ padding: 8, r: 2 }, g)); if (!l) {
                        var d, J, C, n; g = q({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, g); d = g.style; delete g.style; z = q(g, { fill: "#e6e6e6" }, z);
                        J = z.style; delete z.style; f = q(g, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, f); C = f.style; delete f.style; p = q(g, { style: { color: "#cccccc" } }, p); n = p.style; delete p.style
                    } D(x.element, H ? "mouseover" : "mouseenter", function () { 3 !== k && x.setState(1) }); D(x.element, H ? "mouseout" : "mouseleave", function () { 3 !== k && x.setState(k) }); x.setState = function (a) {
                    1 !== a && (x.state = k = a); x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a ||
                        0]); l || x.attr([g, z, f, p][a || 0]).css([d, J, C, n][a || 0])
                    }; l || x.attr(g).css(e({ cursor: "default" }, d)); return x.on("click", function (a) { 3 !== k && c.call(x, a) })
                }, crispLine: function (a, b) { a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2); a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2); return a }, path: function (a) { var m = this.styledMode ? {} : { fill: "none" }; b(a) ? m.d = a : w(a) && e(m, a); return this.createElement("path").attr(m) }, circle: function (a, b, m) {
                    a = w(a) ? a : void 0 === a ? {} : { x: a, y: b, r: m }; b = this.createElement("circle"); b.xSetter =
                        b.ySetter = function (a, b, m) { m.setAttribute("c" + b, a) }; return b.attr(a)
                }, arc: function (a, b, m, e, c, g) { w(a) ? (e = a, b = e.y, m = e.r, a = e.x) : e = { innerR: e, start: c, end: g }; a = this.symbol("arc", a, b, m, m, e); a.r = m; return a }, rect: function (a, b, m, e, c, g) {
                    c = w(a) ? a.r : c; var z = this.createElement("rect"); a = w(a) ? a : void 0 === a ? {} : { x: a, y: b, width: Math.max(m, 0), height: Math.max(e, 0) }; this.styledMode || (void 0 !== g && (a.strokeWidth = g, a = z.crisp(a)), a.fill = "none"); c && (a.r = c); z.rSetter = function (a, b, m) { z.r = a; d(m, { rx: a, ry: a }) }; z.rGetter = function () { return z.r };
                    return z.attr(a)
                }, setSize: function (a, b, m) { var e = this.alignedObjects, c = e.length; this.width = a; this.height = b; for (this.boxWrapper.animate({ width: a, height: b }, { step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: G(m, !0) ? void 0 : 0 }); c--;)e[c].align() }, g: function (a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b }, image: function (a, b, m, c, g, z) {
                    var f = { preserveAspectRatio: "none" }, q, p = function (a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", b) : a.setAttribute("hc-svg-href", b)
                    }, x = function (b) { p(q.element, a); z.call(q, b) }; 1 < arguments.length && e(f, { x: b, y: m, width: c, height: g }); q = this.createElement("image").attr(f); z ? (p(q.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), f = new O.Image, D(f, "load", x), f.src = a, f.complete && x({})) : p(q.element, a); return q
                }, symbol: function (a, b, m, c, g, z) {
                    var q = this, p, x = /^url\((.*?)\)$/, w = x.test(a), A = !w && (this.symbols[a] ? a : "circle"), k = A && this.symbols[A], l = n(b) && k && k.call(this.symbols,
                        Math.round(b), Math.round(m), c, g, z), d, J; k ? (p = this.path(l), q.styledMode || p.attr("fill", "none"), e(p, { symbolName: A, x: b, y: m, width: c, height: g }), z && e(p, z)) : w && (d = a.match(x)[1], p = this.image(d), p.imgwidth = G(R[d] && R[d].width, z && z.width), p.imgheight = G(R[d] && R[d].height, z && z.height), J = function () { p.attr({ width: p.width, height: p.height }) }, ["width", "height"].forEach(function (a) {
                        p[a + "Setter"] = function (a, b) {
                            var m = {}, e = this["img" + b], c = "width" === b ? "translateX" : "translateY"; this[b] = a; n(e) && (z && "within" === z.backgroundSize &&
                                this.width && this.height && (e = Math.round(e * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, e), this.alignByTranslate || (m[c] = ((this[b] || 0) - e) / 2, this.attr(m)))
                        }
                        }), n(b) && p.attr({ x: b, y: m }), p.isImg = !0, n(p.imgwidth) && n(p.imgheight) ? J() : (p.attr({ width: 0, height: 0 }), r("img", {
                            onload: function () {
                                var a = u[q.chartIndex]; 0 === this.width && (t(this, { position: "absolute", top: "-999em" }), f.body.appendChild(this)); R[d] = { width: this.width, height: this.height }; p.imgwidth =
                                    this.width; p.imgheight = this.height; p.element && J(); this.parentNode && this.parentNode.removeChild(this); q.imgCount--; if (!q.imgCount && a && a.onload) a.onload()
                            }, src: d
                        }), this.imgCount++)); return p
                }, symbols: {
                    circle: function (a, b, m, e) { return this.arc(a + m / 2, b + e / 2, m / 2, e / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }) }, square: function (a, b, m, e) { return ["M", a, b, "L", a + m, b, a + m, b + e, a, b + e, "Z"] }, triangle: function (a, b, m, e) { return ["M", a + m / 2, b, "L", a + m, b + e, a, b + e, "Z"] }, "triangle-down": function (a, b, m, e) {
                        return ["M", a, b, "L", a + m,
                            b, a + m / 2, b + e, "Z"]
                    }, diamond: function (a, b, m, e) { return ["M", a + m / 2, b, "L", a + m, b + e / 2, a + m / 2, b + e, a, b + e / 2, "Z"] }, arc: function (a, b, m, e, c) { var g = c.start, z = c.r || m, q = c.r || e || m, f = c.end - .001; m = c.innerR; e = G(c.open, .001 > Math.abs(c.end - c.start - 2 * Math.PI)); var p = Math.cos(g), x = Math.sin(g), A = Math.cos(f), f = Math.sin(f), g = .001 > c.end - g - Math.PI ? 0 : 1; c = ["M", a + z * p, b + q * x, "A", z, q, 0, g, G(c.clockwise, 1), a + z * A, b + q * f]; n(m) && c.push(e ? "M" : "L", a + m * A, b + m * f, "A", m, m, 0, g, 0, a + m * p, b + m * x); c.push(e ? "" : "Z"); return c }, callout: function (a, b, m, e, c) {
                        var g =
                            Math.min(c && c.r || 0, m, e), z = g + 6, f = c && c.anchorX; c = c && c.anchorY; var q; q = ["M", a + g, b, "L", a + m - g, b, "C", a + m, b, a + m, b, a + m, b + g, "L", a + m, b + e - g, "C", a + m, b + e, a + m, b + e, a + m - g, b + e, "L", a + g, b + e, "C", a, b + e, a, b + e, a, b + e - g, "L", a, b + g, "C", a, b, a, b, a + g, b]; f && f > m ? c > b + z && c < b + e - z ? q.splice(13, 3, "L", a + m, c - 6, a + m + 6, c, a + m, c + 6, a + m, b + e - g) : q.splice(13, 3, "L", a + m, e / 2, f, c, a + m, e / 2, a + m, b + e - g) : f && 0 > f ? c > b + z && c < b + e - z ? q.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, b + g) : q.splice(33, 3, "L", a, e / 2, f, c, a, e / 2, a, b + g) : c && c > e && f > a + z && f < a + m - z ? q.splice(23, 3, "L", f + 6, b +
                                e, f, b + e + 6, f - 6, b + e, a + g, b + e) : c && 0 > c && f > a + z && f < a + m - z && q.splice(3, 3, "L", f - 6, b, f, b - 6, f + 6, b, m - g, b); return q
                    }
                }, clipRect: function (b, m, e, c) { var g = a.uniqueKey() + "-", z = this.createElement("clipPath").attr({ id: g }).add(this.defs); b = this.rect(b, m, e, c, 0).add(z); b.id = g; b.clipPath = z; b.count = 0; return b }, text: function (a, b, m, e) {
                    var c = {}; if (e && (this.allowHTML || !this.forExport)) return this.html(a, b, m); c.x = Math.round(b || 0); m && (c.y = Math.round(m)); n(a) && (c.text = a); a = this.createElement("text").attr(c); e || (a.xSetter = function (a,
                        b, m) { var e = m.getElementsByTagName("tspan"), c, g = m.getAttribute(b), z; for (z = 0; z < e.length; z++)c = e[z], c.getAttribute(b) === g && c.setAttribute(b, a); m.setAttribute(b, a) }); return a
                }, fontMetrics: function (a, b) { a = !this.styledMode && /px/.test(a) || !O.getComputedStyle ? a || b && b.style && b.style.fontSize || this.style && this.style.fontSize : b && B.prototype.getStyle.call(b, "font-size"); a = /px/.test(a) ? L(a) : 12; b = 24 > a ? a + 3 : Math.round(1.2 * a); return { h: b, b: Math.round(.8 * b), f: a } }, rotCorr: function (a, b, m) {
                    var e = a; b && m && (e = Math.max(e *
                        Math.cos(b * k), 4)); return { x: -a / 3 * Math.sin(b * k), y: e }
                }, label: function (b, c, g, z, f, p, A, w, k) {
                    var l = this, d = l.styledMode, J = l.g("button" !== k && "label"), C = J.text = l.text("", 0, 0, A).attr({ zIndex: 1 }), x, y, r = 0, N = 3, h = 0, M, G, H, F, R, L = {}, O, t, u = /^url\((.*?)\)$/.test(z), v = d || u, T = function () { return d ? x.strokeWidth() % 2 / 2 : (O ? parseInt(O, 10) : 0) % 2 / 2 }, U, Q, S; k && J.addClass("highcharts-" + k); U = function () {
                        var a = C.element.style, b = {}; y = (void 0 === M || void 0 === G || R) && n(C.textStr) && C.getBBox(); J.width = (M || y.width || 0) + 2 * N + h; J.height = (G || y.height ||
                            0) + 2 * N; t = N + Math.min(l.fontMetrics(a && a.fontSize, C).b, y ? y.height : Infinity); v && (x || (J.box = x = l.symbols[z] || u ? l.symbol(z) : l.rect(), x.addClass(("button" === k ? "" : "highcharts-label-box") + (k ? " highcharts-" + k + "-box" : "")), x.add(J), a = T(), b.x = a, b.y = (w ? -t : 0) + a), b.width = Math.round(J.width), b.height = Math.round(J.height), x.attr(e(b, L)), L = {})
                    }; Q = function () {
                        var a = h + N, b; b = w ? 0 : t; n(M) && y && ("center" === R || "right" === R) && (a += { center: .5, right: 1 }[R] * (M - y.width)); if (a !== C.x || b !== C.y) C.attr("x", a), C.hasBoxWidthChanged && (y = C.getBBox(!0),
                            U()), void 0 !== b && C.attr("y", b); C.x = a; C.y = b
                    }; S = function (a, b) { x ? x.attr(a, b) : L[a] = b }; J.onAdd = function () { C.add(J); J.attr({ text: b || 0 === b ? b : "", x: c, y: g }); x && n(f) && J.attr({ anchorX: f, anchorY: p }) }; J.widthSetter = function (b) { M = a.isNumber(b) ? b : null }; J.heightSetter = function (a) { G = a }; J["text-alignSetter"] = function (a) { R = a }; J.paddingSetter = function (a) { n(a) && a !== N && (N = J.padding = a, Q()) }; J.paddingLeftSetter = function (a) { n(a) && a !== h && (h = a, Q()) }; J.alignSetter = function (a) { a = { left: 0, center: .5, right: 1 }[a]; a !== r && (r = a, y && J.attr({ x: H })) };
                    J.textSetter = function (a) { void 0 !== a && C.attr({ text: a }); U(); Q() }; J["stroke-widthSetter"] = function (a, b) { a && (v = !0); O = this["stroke-width"] = a; S(b, a) }; d ? J.rSetter = function (a, b) { S(b, a) } : J.strokeSetter = J.fillSetter = J.rSetter = function (a, b) { "r" !== b && ("fill" === b && a && (v = !0), J[b] = a); S(b, a) }; J.anchorXSetter = function (a, b) { f = J.anchorX = a; S(b, Math.round(a) - T() - H) }; J.anchorYSetter = function (a, b) { p = J.anchorY = a; S(b, a - F) }; J.xSetter = function (a) {
                    J.x = a; r && (a -= r * ((M || y.width) + 2 * N), J["forceAnimate:x"] = !0); H = Math.round(a); J.attr("translateX",
                        H)
                    }; J.ySetter = function (a) { F = J.y = Math.round(a); J.attr("translateY", F) }; var D = J.css; A = { css: function (a) { if (a) { var b = {}; a = q(a); J.textProps.forEach(function (m) { void 0 !== a[m] && (b[m] = a[m], delete a[m]) }); C.css(b); "width" in b && U(); "fontSize" in b && (U(), Q()) } return D.call(J, a) }, getBBox: function () { return { width: y.width + 2 * N, height: y.height + 2 * N, x: y.x - N, y: y.y - N } }, destroy: function () { m(J.element, "mouseenter"); m(J.element, "mouseleave"); C && (C = C.destroy()); x && (x = x.destroy()); B.prototype.destroy.call(J); J = l = U = Q = S = null } };
                    d || (A.shadow = function (a) { a && (U(), x && x.shadow(a)); return J }); return e(J, A)
                }
            }); a.Renderer = E
    }); K(I, "parts/Html.js", [I["parts/Globals.js"]], function (a) {
        var B = a.attr, E = a.createElement, D = a.css, h = a.defined, d = a.extend, u = a.isFirefox, v = a.isMS, t = a.isWebKit, r = a.pick, n = a.pInt, k = a.SVGElement, l = a.SVGRenderer, f = a.win; d(k.prototype, {
            htmlCss: function (a) {
                var e = "SPAN" === this.element.tagName && a && "width" in a, g = r(e && a.width, void 0), b; e && (delete a.width, this.textWidth = g, b = !0); a && "ellipsis" === a.textOverflow && (a.whiteSpace =
                    "nowrap", a.overflow = "hidden"); this.styles = d(this.styles, a); D(this.element, a); b && this.htmlUpdateTransform(); return this
            }, htmlGetBBox: function () { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, c = this.element, g = this.translateX || 0, b = this.translateY || 0, f = this.x || 0, k = this.y || 0, w = this.textAlign || "left", l = { left: 0, center: .5, right: 1 }[w], d = this.styles, q = d && d.whiteSpace; D(c, { marginLeft: g, marginTop: b });
                    !a.styledMode && this.shadows && this.shadows.forEach(function (a) { D(a, { marginLeft: g + 1, marginTop: b + 1 }) }); this.inverted && [].forEach.call(c.childNodes, function (b) { a.invertChild(b, c) }); if ("SPAN" === c.tagName) {
                        var d = this.rotation, C = this.textWidth && n(this.textWidth), A = [d, w, c.innerHTML, this.textWidth, this.textAlign].join(), r; (r = C !== this.oldTextWidth) && !(r = C > this.oldTextWidth) && ((r = this.textPxLength) || (D(c, { width: "", whiteSpace: q || "nowrap" }), r = c.offsetWidth), r = r > C); r && (/[ \-]/.test(c.textContent || c.innerText) ||
                            "ellipsis" === c.style.textOverflow) ? (D(c, { width: C + "px", display: "block", whiteSpace: q || "normal" }), this.oldTextWidth = C, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1; A !== this.cTT && (q = a.fontMetrics(c.style.fontSize, c).b, !h(d) || d === (this.oldRotation || 0) && w === this.oldAlign || this.setSpanRotation(d, l, q), this.getSpanCorrection(!h(d) && this.textPxLength || c.offsetWidth, q, l, d, w)); D(c, { left: f + (this.xCorr || 0) + "px", top: k + (this.yCorr || 0) + "px" }); this.cTT = A; this.oldRotation = d; this.oldAlign = w
                    }
                } else this.alignOnAdd =
                    !0
            }, setSpanRotation: function (a, c, g) { var b = {}, e = this.renderer.getTransformKey(); b[e] = b.transform = "rotate(" + a + "deg)"; b[e + (u ? "Origin" : "-origin")] = b.transformOrigin = 100 * c + "% " + g + "px"; D(this.element, b) }, getSpanCorrection: function (a, c, g) { this.xCorr = -a * g; this.yCorr = -c }
        }); d(l.prototype, {
            getTransformKey: function () { return v && !/Edge/.test(f.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" : u ? "MozTransform" : f.opera ? "-o-transform" : "" }, html: function (e, c, g) {
                var b = this.createElement("span"), f = b.element,
                l = b.renderer, w = l.isSVG, n = function (a, b) { ["opacity", "visibility"].forEach(function (e) { a[e + "Setter"] = function (c, g, m) { var z = a.div ? a.div.style : b; k.prototype[e + "Setter"].call(this, c, g, m); z && (z[g] = c) } }); a.addedSetters = !0 }, y = a.charts[l.chartIndex], y = y && y.styledMode; b.textSetter = function (a) { a !== f.innerHTML && (delete this.bBox, delete this.oldTextWidth); this.textStr = a; f.innerHTML = r(a, ""); b.doTransform = !0 }; w && n(b, b.element.style); b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, e) {
                "align" === e && (e =
                    "textAlign"); b[e] = a; b.doTransform = !0
                }; b.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; b.attr({ text: e, x: Math.round(c), y: Math.round(g) }).css({ position: "absolute" }); y || b.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); f.style.whiteSpace = "nowrap"; b.css = b.htmlCss; w && (b.add = function (a) {
                    var e, c = l.box.parentNode, g = []; if (this.parentGroup = a) {
                        if (e = a.div, !e) {
                            for (; a;)g.push(a), a = a.parentGroup; g.reverse().forEach(function (a) {
                                function m(b, m) {
                                a[m] =
                                    b; "translateX" === m ? z.left = b + "px" : z.top = b + "px"; a.doTransform = !0
                                } var z, f = B(a.element, "class"); f && (f = { className: f }); e = a.div = a.div || E("div", f, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, e || c); z = e.style; d(a, {
                                    classSetter: function (a) { return function (b) { this.element.setAttribute("class", b); a.className = b } }(e), on: function () { g[0].div && b.on.apply({ element: g[0].div }, arguments); return a }, translateXSetter: m,
                                    translateYSetter: m
                                }); a.addedSetters || n(a)
                            })
                        }
                    } else e = c; e.appendChild(f); b.added = !0; b.alignOnAdd && b.htmlUpdateTransform(); return b
                }); return b
            }
        })
    }); K(I, "parts/Tick.js", [I["parts/Globals.js"]], function (a) {
        var B = a.correctFloat, E = a.defined, D = a.destroyObjectProperties, h = a.fireEvent, d = a.isNumber, u = a.merge, v = a.pick, t = a.deg2rad; a.Tick = function (a, d, k, l, f) {
        this.axis = a; this.pos = d; this.type = k || ""; this.isNewLabel = this.isNew = !0; this.parameters = f || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options =
            this.parameters.options; k || l || this.addLabel()
        }; a.Tick.prototype = {
            addLabel: function () {
                var d = this, n = d.axis, k = n.options, l = n.chart, f = n.categories, e = n.names, c = d.pos, g = v(d.options && d.options.labels, k.labels), b = n.tickPositions, p = c === b[0], h = c === b[b.length - 1], f = this.parameters.category || (f ? v(f[c], e[c], c) : c), w = d.label, b = b.info, F, y, q, C; n.isDatetimeAxis && b && (y = l.time.resolveDTLFormat(k.dateTimeLabelFormats[!k.grid && b.higherRanks[c] || b.unitName]), F = y.main); d.isFirst = p; d.isLast = h; d.formatCtx = {
                    axis: n, chart: l, isFirst: p,
                    isLast: h, dateTimeLabelFormat: F, tickPositionInfo: b, value: n.isLog ? B(n.lin2log(f)) : f, pos: c
                }; k = n.labelFormatter.call(d.formatCtx, this.formatCtx); if (C = y && y.list) d.shortenLabel = function () { for (q = 0; q < C.length; q++)if (w.attr({ text: n.labelFormatter.call(a.extend(d.formatCtx, { dateTimeLabelFormat: C[q] })) }), w.getBBox().width < n.getSlotWidth(d) - 2 * v(g.padding, 5)) return; w.attr({ text: "" }) }; if (E(w)) w && w.textStr !== k && (!w.textWidth || g.style && g.style.width || w.styles.width || w.css({ width: null }), w.attr({ text: k }), w.textPxLength =
                    w.getBBox().width); else { if (d.label = w = E(k) && g.enabled ? l.renderer.text(k, 0, 0, g.useHTML).add(n.labelGroup) : null) l.styledMode || w.css(u(g.style)), w.textPxLength = w.getBBox().width; d.rotation = 0 }
            }, getLabelSize: function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 }, handleOverflow: function (a) {
                var d = this.axis, k = d.options.labels, l = a.x, f = d.chart.chartWidth, e = d.chart.spacing, c = v(d.labelLeft, Math.min(d.pos, e[3])), e = v(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, f - e[1])), g = this.label,
                b = this.rotation, p = { left: 0, center: .5, right: 1 }[d.labelAlign || g.attr("align")], h = g.getBBox().width, w = d.getSlotWidth(this), r = w, y = 1, q, C = {}; if (b || "justify" !== v(k.overflow, "justify")) 0 > b && l - p * h < c ? q = Math.round(l / Math.cos(b * t) - c) : 0 < b && l + p * h > e && (q = Math.round((f - l) / Math.cos(b * t))); else if (f = l + (1 - p) * h, l - p * h < c ? r = a.x + r * (1 - p) - c : f > e && (r = e - a.x + r * p, y = -1), r = Math.min(w, r), r < w && "center" === d.labelAlign && (a.x += y * (w - r - p * (w - Math.min(h, r)))), h > r || d.autoRotation && (g.styles || {}).width) q = r; q && (this.shortenLabel ? this.shortenLabel() :
                    (C.width = Math.floor(q), (k.style || {}).textOverflow || (C.textOverflow = "ellipsis"), g.css(C)))
            }, getPosition: function (d, n, k, l) {
                var f = this.axis, e = f.chart, c = l && e.oldChartHeight || e.chartHeight; d = { x: d ? a.correctFloat(f.translate(n + k, null, null, l) + f.transB) : f.left + f.offset + (f.opposite ? (l && e.oldChartWidth || e.chartWidth) - f.right - f.left : 0), y: d ? c - f.bottom + f.offset - (f.opposite ? f.height : 0) : a.correctFloat(c - f.translate(n + k, null, null, l) - f.transB) }; d.y = Math.max(Math.min(d.y, 1E5), -1E5); h(this, "afterGetPosition", { pos: d });
                return d
            }, getLabelPosition: function (a, d, k, l, f, e, c, g) {
                var b = this.axis, p = b.transA, n = b.reversed, w = b.staggerLines, r = b.tickRotCorr || { x: 0, y: 0 }, y = f.y, q = l || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1), C = {}; E(y) || (y = 0 === b.side ? k.rotation ? -8 : -k.getBBox().height : 2 === b.side ? r.y + 8 : Math.cos(k.rotation * t) * (r.y - k.getBBox(!1, 0).height / 2)); a = a + f.x + q + r.x - (e && l ? e * p * (n ? -1 : 1) : 0); d = d + y - (e && !l ? e * p * (n ? 1 : -1) : 0); w && (k = c / (g || 1) % w, b.opposite && (k = w - k - 1), d += b.labelOffset / w * k); C.x = a; C.y = Math.round(d); h(this,
                    "afterGetLabelPosition", { pos: C, tickmarkOffset: e, index: c }); return C
            }, getMarkPath: function (a, d, k, l, f, e) { return e.crispLine(["M", a, d, "L", a + (f ? 0 : -k), d + (f ? k : 0)], l) }, renderGridLine: function (a, d, k) {
                var l = this.axis, f = l.options, e = this.gridLine, c = {}, g = this.pos, b = this.type, p = v(this.tickmarkOffset, l.tickmarkOffset), h = l.chart.renderer, w = b ? b + "Grid" : "grid", n = f[w + "LineWidth"], y = f[w + "LineColor"], f = f[w + "LineDashStyle"]; e || (l.chart.styledMode || (c.stroke = y, c["stroke-width"] = n, f && (c.dashstyle = f)), b || (c.zIndex = 1), a && (d =
                    0), this.gridLine = e = h.path().attr(c).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(l.gridGroup)); if (e && (k = l.getPlotLinePath({ value: g + p, lineWidth: e.strokeWidth() * k, force: "pass", old: a }))) e[a || this.isNew ? "attr" : "animate"]({ d: k, opacity: d })
            }, renderMark: function (a, d, k) {
                var l = this.axis, f = l.options, e = l.chart.renderer, c = this.type, g = c ? c + "Tick" : "tick", b = l.tickSize(g), p = this.mark, h = !p, w = a.x; a = a.y; var n = v(f[g + "Width"], !c && l.isXAxis ? 1 : 0), f = f[g + "Color"]; b && (l.opposite && (b[0] = -b[0]), h && (this.mark = p = e.path().addClass("highcharts-" +
                    (c ? c + "-" : "") + "tick").add(l.axisGroup), l.chart.styledMode || p.attr({ stroke: f, "stroke-width": n })), p[h ? "attr" : "animate"]({ d: this.getMarkPath(w, a, b[0], p.strokeWidth() * k, l.horiz, e), opacity: d }))
            }, renderLabel: function (a, h, k, l) {
                var f = this.axis, e = f.horiz, c = f.options, g = this.label, b = c.labels, p = b.step, f = v(this.tickmarkOffset, f.tickmarkOffset), n = !0, w = a.x; a = a.y; g && d(w) && (g.xy = a = this.getLabelPosition(w, a, g, e, b, f, l, p), this.isFirst && !this.isLast && !v(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(c.showLastLabel,
                    1) ? n = !1 : !e || b.step || b.rotation || h || 0 === k || this.handleOverflow(a), p && l % p && (n = !1), n && d(a.y) ? (a.opacity = k, g[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel = !0))
            }, render: function (d, h, k) {
                var l = this.axis, f = l.horiz, e = this.pos, c = v(this.tickmarkOffset, l.tickmarkOffset), e = this.getPosition(f, e, c, h), c = e.x, g = e.y, l = f && c === l.pos + l.len || !f && g === l.pos ? -1 : 1; k = v(k, 1); this.isActive = !0; this.renderGridLine(h, k, l); this.renderMark(e, k, l); this.renderLabel(e, h, k, d); this.isNew = !1;
                a.fireEvent(this, "afterRender")
            }, destroy: function () { D(this, this.axis) }
        }
    }); K(I, "parts/Axis.js", [I["parts/Globals.js"]], function (a) {
        var B = a.addEvent, E = a.animObject, D = a.arrayMax, h = a.arrayMin, d = a.color, u = a.correctFloat, v = a.defaultOptions, t = a.defined, r = a.deg2rad, n = a.destroyObjectProperties, k = a.extend, l = a.fireEvent, f = a.format, e = a.getMagnitude, c = a.isArray, g = a.isNumber, b = a.isString, p = a.merge, H = a.normalizeTickInterval, w = a.objectEach, F = a.pick, y = a.removeEvent, q = a.seriesTypes, C = a.splat, A = a.syncTimeout, G = a.Tick,
        L = function () { this.init.apply(this, arguments) }; a.extend(L.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: { millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" }, week: { main: "%e. %b" }, month: { main: "%b '%y" }, year: { main: "%Y" } }, endOnTick: !1, labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01,
                showEmpty: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"
            }, defaultYAxisOptions: {
                endOnTick: !0, maxPadding: .05, minPadding: .05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, startOnTick: !0, title: { rotation: 270, text: "Values" },
                stackLabels: { allowOverlap: !1, enabled: !1, formatter: function () { return a.numberFormat(this.total, -1) }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0
            }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
            init: function (b, e) {
                var m = e.isX, c = this; c.chart = b; c.horiz = b.inverted && !c.isZAxis ? !m : m; c.isXAxis = m; c.coll = c.coll || (m ? "xAxis" : "yAxis"); l(this, "init", { userOptions: e }); c.opposite = e.opposite; c.side = e.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3); c.setOptions(e); var g = this.options, z = g.type; c.labelFormatter = g.labels.formatter || c.defaultLabelFormatter; c.userOptions = e; c.minPixelPadding = 0; c.reversed = g.reversed; c.visible = !1 !== g.visible; c.zoomEnabled = !1 !== g.zoomEnabled; c.hasNames = "category" === z || !0 === g.categories;
                c.categories = g.categories || c.hasNames; c.names || (c.names = [], c.names.keys = {}); c.plotLinesAndBandsGroups = {}; c.isLog = "logarithmic" === z; c.isDatetimeAxis = "datetime" === z; c.positiveValuesOnly = c.isLog && !c.allowNegativeLog; c.isLinked = t(g.linkedTo); c.ticks = {}; c.labelEdge = []; c.minorTicks = {}; c.plotLinesAndBands = []; c.alternateBands = {}; c.len = 0; c.minRange = c.userMinRange = g.minRange || g.maxZoom; c.range = g.range; c.offset = g.offset || 0; c.stacks = {}; c.oldStacks = {}; c.stacksTouched = 0; c.max = null; c.min = null; c.crosshair = F(g.crosshair,
                    C(b.options.tooltip.crosshairs)[m ? 0 : 1], !1); e = c.options.events; -1 === b.axes.indexOf(c) && (m ? b.axes.splice(b.xAxis.length, 0, c) : b.axes.push(c), b[c.coll].push(c)); c.series = c.series || []; b.inverted && !c.isZAxis && m && void 0 === c.reversed && (c.reversed = !0); w(e, function (b, m) { a.isFunction(b) && B(c, m, b) }); c.lin2log = g.linearToLogConverter || c.lin2log; c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log); l(this, "afterInit")
            }, setOptions: function (a) {
            this.options = p(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions,
                [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], p(v[this.coll], a)); l(this, "afterSetOptions", { userOptions: a })
            }, defaultLabelFormatter: function () {
                var b = this.axis, e = this.value, c = b.chart.time, g = b.categories, q = this.dateTimeLabelFormat, p = v.lang, d = p.numericSymbols, p = p.numericSymbolMagnitude || 1E3, w = d && d.length, A, k = b.options.labels.format, b = b.isLog ? Math.abs(e) : b.tickInterval; if (k) A = f(k, this, c); else if (g) A = e; else if (q) A = c.dateFormat(q,
                    e); else if (w && 1E3 <= b) for (; w-- && void 0 === A;)c = Math.pow(p, w + 1), b >= c && 0 === 10 * e % c && null !== d[w] && 0 !== e && (A = a.numberFormat(e / c, -1) + d[w]); void 0 === A && (A = 1E4 <= Math.abs(e) ? a.numberFormat(e, -1) : a.numberFormat(e, -1, void 0, "")); return A
            }, getSeriesExtremes: function () {
                var a = this, b = a.chart, e; l(this, "getSeriesExtremes", null, function () {
                a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.threshold = null; a.softThreshold = !a.isXAxis; a.buildStacks && a.buildStacks(); a.series.forEach(function (m) {
                    if (m.visible || !b.options.chart.ignoreHiddenSeries) {
                        var c =
                            m.options, z = c.threshold, f, q; a.hasVisibleSeries = !0; a.positiveValuesOnly && 0 >= z && (z = null); if (a.isXAxis) c = m.xData, c.length && (e = m.getXExtremes(c), f = e.min, q = e.max, g(f) || f instanceof Date || (c = c.filter(g), e = m.getXExtremes(c), f = e.min, q = e.max), c.length && (a.dataMin = Math.min(F(a.dataMin, f), f), a.dataMax = Math.max(F(a.dataMax, q), q))); else if (m.getExtremes(), q = m.dataMax, f = m.dataMin, t(f) && t(q) && (a.dataMin = Math.min(F(a.dataMin, f), f), a.dataMax = Math.max(F(a.dataMax, q), q)), t(z) && (a.threshold = z), !c.softThreshold || a.positiveValuesOnly) a.softThreshold =
                                !1
                    }
                })
                }); l(this, "afterGetSeriesExtremes")
            }, translate: function (a, b, e, c, f, q) { var m = this.linkedParent || this, z = 1, p = 0, d = c ? m.oldTransA : m.transA; c = c ? m.oldMin : m.min; var A = m.minPixelPadding; f = (m.isOrdinal || m.isBroken || m.isLog && f) && m.lin2val; d || (d = m.transA); e && (z *= -1, p = m.len); m.reversed && (z *= -1, p -= z * (m.sector || m.len)); b ? (a = (a * z + p - A) / d + c, f && (a = m.lin2val(a))) : (f && (a = m.val2lin(a)), a = g(c) ? z * (a - c) * d + p + z * A + (g(q) ? d * q : 0) : void 0); return a }, toPixels: function (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) },
            toValue: function (a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) }, getPlotLinePath: function (a) {
                var b = this, m = b.chart, e = b.left, c = b.top, f = a.old, q = a.value, p = a.translatedValue, d = a.lineWidth, A = a.force, w, k, C, h, y = f && m.oldChartHeight || m.chartHeight, n = f && m.oldChartWidth || m.chartWidth, G, r = b.transB, H = function (a, b, m) { if ("pass" !== A && a < b || a > m) A ? a = Math.min(Math.max(b, a), m) : G = !0; return a }; a = { value: q, lineWidth: d, old: f, force: A, acrossPanes: a.acrossPanes, translatedValue: p }; l(this, "getPlotLinePath",
                    a, function (a) { p = F(p, b.translate(q, null, null, f)); p = Math.min(Math.max(-1E5, p), 1E5); w = C = Math.round(p + r); k = h = Math.round(y - p - r); g(p) ? b.horiz ? (k = c, h = y - b.bottom, w = C = H(w, e, e + b.width)) : (w = e, C = n - b.right, k = h = H(k, c, c + b.height)) : (G = !0, A = !1); a.path = G && !A ? null : m.renderer.crispLine(["M", w, k, "L", C, h], d || 1) }); return a.path
            }, getLinearTickPositions: function (a, b, e) {
                var m, c = u(Math.floor(b / a) * a); e = u(Math.ceil(e / a) * a); var g = [], f; u(c + a) === c && (f = 20); if (this.single) return [b]; for (b = c; b <= e;) {
                    g.push(b); b = u(b + a, f); if (b === m) break;
                    m = b
                } return g
            }, getMinorTickInterval: function () { var a = this.options; return !0 === a.minorTicks ? F(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval }, getMinorTickPositions: function () {
                var a = this, b = a.options, e = a.tickPositions, c = a.minorTickInterval, g = [], f = a.pointRangePadding || 0, q = a.min - f, f = a.max + f, p = f - q; if (p && p / c < a.len / 3) if (a.isLog) this.paddedTicks.forEach(function (b, m, e) { m && g.push.apply(g, a.getLogTickPositions(c, e[m - 1], e[m], !0)) }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) g =
                    g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c), q, f, b.startOfWeek)); else for (b = q + (e[0] - q) % c; b <= f && b !== g[0]; b += c)g.push(b); 0 !== g.length && a.trimTicks(g); return g
            }, adjustForMinRange: function () {
                var a = this.options, b = this.min, e = this.max, c, g, f, q, p, d, A, w; this.isXAxis && void 0 === this.minRange && !this.isLog && (t(a.min) || t(a.max) ? this.minRange = null : (this.series.forEach(function (a) { d = a.xData; for (q = A = a.xIncrement ? 1 : d.length - 1; 0 < q; q--)if (p = d[q] - d[q - 1], void 0 === f || p < f) f = p }), this.minRange = Math.min(5 * f, this.dataMax -
                    this.dataMin))); e - b < this.minRange && (g = this.dataMax - this.dataMin >= this.minRange, w = this.minRange, c = (w - e + b) / 2, c = [b - c, F(a.min, b - c)], g && (c[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(c), e = [b + w, F(a.max, b + w)], g && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), e = h(e), e - b < w && (c[0] = e - w, c[1] = F(a.min, e - w), b = D(c))); this.min = b; this.max = e
            }, getClosest: function () {
                var a; this.categories ? a = 1 : this.series.forEach(function (b) {
                    var e = b.closestPointRange, m = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && t(e) && m && (a = t(a) ? Math.min(a, e) : e)
                }); return a
            }, nameToX: function (a) { var b = c(this.categories), e = b ? this.categories : this.names, m = a.options.x, g; a.series.requireSorting = !1; t(m) || (m = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? e.indexOf(a.name) : F(e.keys[a.name], -1)); -1 === m ? b || (g = e.length) : g = m; void 0 !== g && (this.names[g] = a.name, this.names.keys[a.name] = g); return g }, updateNames: function () {
                var a = this, b = this.names; 0 < b.length && (Object.keys(b.keys).forEach(function (a) { delete b.keys[a] }),
                    b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (b) { b.xIncrement = null; if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints(); b.data.forEach(function (e, m) { var c; e && e.options && void 0 !== e.name && (c = a.nameToX(e), void 0 !== c && c !== e.x && (e.x = c, b.xData[m] = c)) }) }))
            }, setAxisTranslation: function (a) {
                var e = this, c = e.max - e.min, m = e.axisPointRange || 0, g, f = 0, p = 0, d = e.linkedParent, w = !!e.categories, A = e.transA, k = e.isXAxis; if (k || w || m) g = e.getClosest(),
                    d ? (f = d.minPointOffset, p = d.pointRangePadding) : e.series.forEach(function (a) { var c = w ? 1 : k ? F(a.options.pointRange, g, 0) : e.axisPointRange || 0, z = a.options.pointPlacement; m = Math.max(m, c); if (!e.single || w) a = q.xrange && a instanceof q.xrange ? !k : k, f = Math.max(f, a && b(z) ? 0 : c / 2), p = Math.max(p, a && "on" === z ? 0 : c) }), d = e.ordinalSlope && g ? e.ordinalSlope / g : 1, e.minPointOffset = f *= d, e.pointRangePadding = p *= d, e.pointRange = Math.min(m, c), k && (e.closestPointRange = g); a && (e.oldTransA = A); e.translationSlope = e.transA = A = e.staticScale || e.len /
                        (c + p || 1); e.transB = e.horiz ? e.left : e.bottom; e.minPixelPadding = A * f; l(this, "afterSetAxisTranslation")
            }, minFromRange: function () { return this.max - this.range }, setTickInterval: function (b) {
                var c = this, m = c.chart, f = c.options, q = c.isLog, p = c.isDatetimeAxis, d = c.isXAxis, w = c.isLinked, A = f.maxPadding, k = f.minPadding, C, h = f.tickInterval, y = f.tickPixelInterval, n = c.categories, G = g(c.threshold) ? c.threshold : null, r = c.softThreshold, L, v, B; p || n || w || this.getTickAmount(); v = F(c.userMin, f.min); B = F(c.userMax, f.max); w ? (c.linkedParent = m[c.coll][f.linkedTo],
                    C = c.linkedParent.getExtremes(), c.min = F(C.min, C.dataMin), c.max = F(C.max, C.dataMax), f.type !== c.linkedParent.options.type && a.error(11, 1, m)) : (!r && t(G) && (c.dataMin >= G ? (C = G, k = 0) : c.dataMax <= G && (L = G, A = 0)), c.min = F(v, C, c.dataMin), c.max = F(B, L, c.dataMax)); q && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, F(c.dataMin, c.min)) && a.error(10, 1, m), c.min = u(c.log2lin(c.min), 15), c.max = u(c.log2lin(c.max), 15)); c.range && t(c.max) && (c.userMin = c.min = v = Math.max(c.dataMin, c.minFromRange()), c.userMax = B = c.max, c.range = null); l(c, "foundExtremes");
                c.beforePadding && c.beforePadding(); c.adjustForMinRange(); !(n || c.axisPointRange || c.usePercentage || w) && t(c.min) && t(c.max) && (m = c.max - c.min) && (!t(v) && k && (c.min -= m * k), !t(B) && A && (c.max += m * A)); g(f.softMin) && !g(c.userMin) && f.softMin < c.min && (c.min = v = f.softMin); g(f.softMax) && !g(c.userMax) && f.softMax > c.max && (c.max = B = f.softMax); g(f.floor) && (c.min = Math.min(Math.max(c.min, f.floor), Number.MAX_VALUE)); g(f.ceiling) && (c.max = Math.max(Math.min(c.max, f.ceiling), F(c.userMax, -Number.MAX_VALUE))); r && t(c.dataMin) && (G = G ||
                    0, !t(v) && c.min < G && c.dataMin >= G ? c.min = c.options.minRange ? Math.min(G, c.max - c.minRange) : G : !t(B) && c.max > G && c.dataMax <= G && (c.max = c.options.minRange ? Math.max(G, c.min + c.minRange) : G)); c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : w && !h && y === c.linkedParent.options.tickPixelInterval ? h = c.linkedParent.tickInterval : F(h, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, n ? 1 : (c.max - c.min) * y / Math.max(c.len, y)); d && !b && c.series.forEach(function (a) {
                        a.processData(c.min !== c.oldMin || c.max !==
                            c.oldMax)
                    }); c.setAxisTranslation(!0); c.beforeSetTickPositions && c.beforeSetTickPositions(); c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval)); c.pointRange && !h && (c.tickInterval = Math.max(c.pointRange, c.tickInterval)); b = F(f.minTickInterval, c.isDatetimeAxis && c.closestPointRange); !h && c.tickInterval < b && (c.tickInterval = b); p || q || h || (c.tickInterval = H(c.tickInterval, null, e(c.tickInterval), F(f.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish()); this.setTickPositions()
            }, setTickPositions: function () {
                var b = this.options, c, e = b.tickPositions; c = this.getMinorTickInterval(); var g = b.tickPositioner, f = b.startOnTick, q = b.endOnTick; this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c; this.single = this.min === this.max && t(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = c = e && e.slice(); !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19, !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length >
                    this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, g && (g = g.apply(this, [this.min, this.max]))) && (this.tickPositions = c = g); this.paddedTicks = c.slice(0); this.trimTicks(c, f, q); this.isLinked || (this.single && 2 > c.length && !this.categories && (this.min -= .5, this.max += .5), e || g || this.adjustTickAmount()); l(this, "afterSetTickPositions")
            }, trimTicks: function (a, b, c) {
                var e = a[0], m = a[a.length - 1], g = this.minPointOffset || 0; l(this, "trimTicks"); if (!this.isLinked) {
                    if (b && -Infinity !== e) this.min = e; else for (; this.min -
                        g > a[0];)a.shift(); if (c) this.max = m; else for (; this.max + g < a[a.length - 1];)a.pop(); 0 === a.length && t(e) && !this.options.tickPositions && a.push((m + e) / 2)
                }
            }, alignToOthers: function () { var a = {}, b, c = this.options; !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function (c) { var e = c.options, e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join(); c.series.length && (a[e] ? b = !0 : a[e] = 1) }); return b }, getTickAmount: function () {
                var a = this.options,
                b = a.tickAmount, c = a.tickPixelInterval; !t(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2); !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1); 4 > b && (this.finalTickAmt = b, b = 5); this.tickAmount = b
            }, adjustTickAmount: function () {
                var a = this.options, b = this.tickInterval, c = this.tickPositions, e = this.tickAmount, g = this.finalTickAmt, f = c && c.length, q = F(this.threshold, this.softThreshold ? 0 : null), p; if (this.hasData()) {
                    if (f < e) {
                        for (p = this.min; c.length < e;)c.length % 2 || p === q ? c.push(u(c[c.length -
                            1] + b)) : c.unshift(u(c[0] - b)); this.transA *= (f - 1) / (e - 1); this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]); this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
                    } else f > e && (this.tickInterval *= 2, this.setTickPositions()); if (t(g)) { for (b = a = c.length; b--;)(3 === g && 1 === b % 2 || 2 >= g && 0 < b && b < a - 1) && c.splice(b, 1); this.finalTickAmt = void 0 }
                }
            }, setScale: function () {
                var a = this.series.some(function (a) { return a.isDirtyData || a.isDirty || a.xAxis.isDirty }), b; this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength =
                    this.len; this.setAxisSize(); (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(); l(this, "afterSetScale")
            }, setExtremes: function (a,
                b, c, e, g) { var m = this, f = m.chart; c = F(c, !0); m.series.forEach(function (a) { delete a.kdTree }); g = k(g, { min: a, max: b }); l(m, "setExtremes", g, function () { m.userMin = a; m.userMax = b; m.eventArgs = g; c && f.redraw(e) }) }, zoom: function (a, b) {
                    var c = this.dataMin, e = this.dataMax, m = this.options, g = Math.min(c, F(m.min, c)), f = Math.max(e, F(m.max, e)); a = { newMin: a, newMax: b }; l(this, "zoom", a, function (a) {
                        var b = a.newMin, m = a.newMax; if (b !== this.min || m !== this.max) this.allowZoomOutside || (t(c) && (b < g && (b = g), b > f && (b = f)), t(e) && (m < g && (m = g), m > f && (m = f))),
                            this.displayBtn = void 0 !== b || void 0 !== m, this.setExtremes(b, m, !1, void 0, { trigger: "zoom" }); a.zoomed = !0
                    }); return a.zoomed
                }, setAxisSize: function () {
                    var b = this.chart, c = this.options, e = c.offsets || [0, 0, 0, 0], g = this.horiz, f = this.width = Math.round(a.relativeLength(F(c.width, b.plotWidth - e[3] + e[1]), b.plotWidth)), q = this.height = Math.round(a.relativeLength(F(c.height, b.plotHeight - e[0] + e[2]), b.plotHeight)), p = this.top = Math.round(a.relativeLength(F(c.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)), c = this.left = Math.round(a.relativeLength(F(c.left,
                        b.plotLeft + e[3]), b.plotWidth, b.plotLeft)); this.bottom = b.chartHeight - q - p; this.right = b.chartWidth - f - c; this.len = Math.max(g ? f : q, 0); this.pos = g ? c : p
                }, getExtremes: function () { var a = this.isLog; return { min: a ? u(this.lin2log(this.min)) : this.min, max: a ? u(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } }, getThreshold: function (a) {
                    var b = this.isLog, c = b ? this.lin2log(this.min) : this.min, b = b ? this.lin2log(this.max) : this.max; null === a || -Infinity === a ? a = c : Infinity ===
                        a ? a = b : c > a ? a = c : b < a && (a = b); return this.translate(a, 0, 1, 0, 1)
                }, autoLabelAlign: function (a) { var b = (F(a, 0) - 90 * this.side + 720) % 360; a = { align: "center" }; l(this, "autoLabelAlign", a, function (a) { 15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left") }); return a.align }, tickSize: function (a) { var b = this.options, c = b[a + "Length"], e = F(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0), m; e && c && ("inside" === b[a + "Position"] && (c = -c), m = [c, e]); a = { tickSize: m }; l(this, "afterTickSize", a); return a.tickSize }, labelMetrics: function () {
                    var a =
                        this.tickPositions && this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                }, unsquish: function () {
                    var a = this.options.labels, b = this.horiz, c = this.tickInterval, e = c, g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), f, q = a.rotation, p = this.labelMetrics(), d, w = Number.MAX_VALUE, A, k = this.max - this.min, l = function (a) {
                        var b = a / (g || 1), b = 1 < b ? Math.ceil(b) : 1; b * c > k && Infinity !== a && Infinity !== g && (b = Math.ceil(k /
                            c)); return u(b * c)
                    }; b ? (A = !a.staggerLines && !a.step && (t(q) ? [q] : g < F(a.autoRotationLimit, 80) && a.autoRotation)) && A.forEach(function (a) { var b; if (a === q || a && -90 <= a && 90 >= a) d = l(Math.abs(p.h / Math.sin(r * a))), b = d + Math.abs(a / 360), b < w && (w = b, f = a, e = d) }) : a.step || (e = l(p.h)); this.autoRotation = A; this.labelRotation = F(f, q); return e
                }, getSlotWidth: function (a) {
                    var b = this.chart, c = this.horiz, e = this.options.labels, m = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), g = b.margin[3]; return a && a.slotWidth || c && 2 > (e.step ||
                        0) && !e.rotation && (this.staggerLines || 1) * this.len / m || !c && (e.style && parseInt(e.style.width, 10) || g && g - b.spacing[3] || .33 * b.chartWidth)
                }, renderUnsquish: function () {
                    var a = this.chart, c = a.renderer, e = this.tickPositions, g = this.ticks, f = this.options.labels, q = f && f.style || {}, p = this.horiz, d = this.getSlotWidth(), w = Math.max(1, Math.round(d - 2 * (f.padding || 5))), A = {}, k = this.labelMetrics(), l = f.style && f.style.textOverflow, C, h, y = 0, n; b(f.rotation) || (A.rotation = f.rotation || 0); e.forEach(function (a) {
                    (a = g[a]) && a.label && a.label.textPxLength >
                        y && (y = a.label.textPxLength)
                    }); this.maxLabelLength = y; if (this.autoRotation) y > w && y > k.h ? A.rotation = this.labelRotation : this.labelRotation = 0; else if (d && (C = w, !l)) for (h = "clip", w = e.length; !p && w--;)if (n = e[w], n = g[n].label) n.styles && "ellipsis" === n.styles.textOverflow ? n.css({ textOverflow: "clip" }) : n.textPxLength > d && n.css({ width: d + "px" }), n.getBBox().height > this.len / e.length - (k.h - k.f) && (n.specificTextOverflow = "ellipsis"); A.rotation && (C = y > .5 * a.chartHeight ? .33 * a.chartHeight : y, l || (h = "ellipsis")); if (this.labelAlign =
                        f.align || this.autoLabelAlign(this.labelRotation)) A.align = this.labelAlign; e.forEach(function (a) { var b = (a = g[a]) && a.label, c = q.width, e = {}; b && (b.attr(A), a.shortenLabel ? a.shortenLabel() : C && !c && "nowrap" !== q.whiteSpace && (C < b.textPxLength || "SPAN" === b.element.tagName) ? (e.width = C, l || (e.textOverflow = b.specificTextOverflow || h), b.css(e)) : b.styles && b.styles.width && !e.width && !c && b.css({ width: null }), delete b.specificTextOverflow, a.rotation = A.rotation) }, this); this.tickRotCorr = c.rotCorr(k.b, this.labelRotation || 0, 0 !==
                            this.side)
                }, hasData: function () { return this.series.some(function (a) { return a.hasData() }) || this.options.showEmpty && t(this.min) && t(this.max) }, addTitle: function (a) {
                    var b = this.chart.renderer, c = this.horiz, e = this.opposite, m = this.options.title, g, f = this.chart.styledMode; this.axisTitle || ((g = m.textAlign) || (g = (c ? { low: "left", middle: "center", high: "right" } : { low: e ? "right" : "left", middle: "center", high: e ? "left" : "right" })[m.align]), this.axisTitle = b.text(m.text, 0, 0, m.useHTML).attr({ zIndex: 7, rotation: m.rotation || 0, align: g }).addClass("highcharts-axis-title"),
                        f || this.axisTitle.css(p(m.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0); f || m.style.width || this.isRadial || this.axisTitle.css({ width: this.len }); this.axisTitle[a ? "show" : "hide"](!0)
                }, generateTick: function (a) { var b = this.ticks; b[a] ? b[a].addLabel() : b[a] = new G(this, a) }, getOffset: function () {
                    var a = this, b = a.chart, c = b.renderer, e = a.options, g = a.tickPositions, f = a.ticks, q = a.horiz, p = a.side, d = b.inverted && !a.isZAxis ? [1, 0, 3, 2][p] : p, A, k, C = 0, h, y = 0, n = e.title, G = e.labels, r = 0, H = b.axisOffset, b = b.clipOffset,
                    L = [-1, 1, 1, -1][p], u = e.className, v = a.axisParent; A = a.hasData(); a.showAxis = k = A || F(e.showEmpty, !0); a.staggerLines = a.horiz && G.staggerLines; a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: e.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(v), a.axisGroup = c.g("axis").attr({ zIndex: e.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(v), a.labelGroup = c.g("axis-labels").attr({ zIndex: G.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " +
                        (u || "")).add(v)); A || a.isLinked ? (g.forEach(function (b, c) { a.generateTick(b, c) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === p || 2 === p || { 1: "left", 3: "right" }[p] === a.labelAlign, F(G.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g.forEach(function (a) { r = Math.max(f[a].getLabelSize(), r) }), a.staggerLines && (r *= a.staggerLines), a.labelOffset = r * (a.opposite ? -1 : 1)) : w(f, function (a, b) { a.destroy(); delete f[b] }); n && n.text && !1 !== n.enabled && (a.addTitle(k), k && !1 !== n.reserveSpace && (a.titleOffset = C =
                            a.axisTitle.getBBox()[q ? "height" : "width"], h = n.offset, y = t(h) ? 0 : F(n.margin, q ? 5 : 10))); a.renderLine(); a.offset = L * F(e.offset, H[p] ? H[p] + (e.margin || 0) : 0); a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 }; c = 0 === p ? -a.labelMetrics().h : 2 === p ? a.tickRotCorr.y : 0; y = Math.abs(r) + y; r && (y = y - c + L * (q ? F(G.y, a.tickRotCorr.y + 8 * L) : G.x)); a.axisTitleMargin = F(h, y); a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(f, g)); q = this.tickSize("tick"); H[p] = Math.max(H[p], a.axisTitleMargin + C + L * a.offset, y, g && g.length && q ? q[0] + L *
                                a.offset : 0); e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2); b[d] = Math.max(b[d], e); l(this, "afterGetOffset")
                }, getLinePath: function (a) { var b = this.chart, c = this.opposite, e = this.offset, g = this.horiz, m = this.left + (c ? this.width : 0) + e, e = b.chartHeight - this.bottom - (c ? this.height : 0) + e; c && (a *= -1); return b.renderer.crispLine(["M", g ? this.left : m, g ? e : this.top, "L", g ? b.chartWidth - this.right : m, g ? e : b.chartHeight - this.bottom], a) }, renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
                }, getTitlePosition: function () {
                    var a = this.horiz, b = this.left, c = this.top, e = this.len, g = this.options.title, f = a ? b : c, q = this.opposite, p = this.offset, d = g.x || 0, A = g.y || 0, w = this.axisTitle, k = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, w), w = Math.max(w.getBBox(null, 0).height - k.h - 1, 0), e = { low: f + (a ? 0 : e), middle: f + e / 2, high: f + (a ? e : 0) }[g.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (q ? -1 : 1) * this.axisTitleMargin +
                        [-w, w, k.f, -w][this.side], a = { x: a ? e + d : b + (q ? this.width : 0) + p + d, y: a ? b + A - (q ? this.height : 0) + p : e + A }; l(this, "afterGetTitlePosition", { titlePosition: a }); return a
                }, renderMinorTick: function (a) { var b = this.chart.hasRendered && g(this.oldMin), c = this.minorTicks; c[a] || (c[a] = new G(this, a, "minor")); b && c[a].isNew && c[a].render(null, !0); c[a].render(null, !1, 1) }, renderTick: function (a, b) {
                    var c = this.isLinked, e = this.ticks, f = this.chart.hasRendered && g(this.oldMin); if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new G(this, a)), f && e[a].isNew &&
                        e[a].render(b, !0, -1), e[a].render(b)
                }, render: function () {
                    var b = this, c = b.chart, e = b.options, f = b.isLog, q = b.isLinked, p = b.tickPositions, d = b.axisTitle, k = b.ticks, C = b.minorTicks, h = b.alternateBands, y = e.stackLabels, n = e.alternateGridColor, r = b.tickmarkOffset, H = b.axisLine, F = b.showAxis, L = E(c.renderer.globalAnimation), t, u; b.labelEdge.length = 0; b.overlap = !1;[k, C, h].forEach(function (a) { w(a, function (a) { a.isActive = !1 }) }); if (b.hasData() || q) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (a) { b.renderMinorTick(a) }),
                        p.length && (p.forEach(function (a, c) { b.renderTick(a, c) }), r && (0 === b.min || b.single) && (k[-1] || (k[-1] = new G(b, -1, null, !0)), k[-1].render(-1))), n && p.forEach(function (e, g) { u = void 0 !== p[g + 1] ? p[g + 1] + r : b.max - r; 0 === g % 2 && e < b.max && u <= b.max + (c.polar ? -r : r) && (h[e] || (h[e] = new a.PlotLineOrBand(b)), t = e + r, h[e].options = { from: f ? b.lin2log(t) : t, to: f ? b.lin2log(u) : u, color: n }, h[e].render(), h[e].isActive = !0) }), b._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function (a) { b.addPlotBandOrLine(a) }), b._addedPlotLB =
                            !0);[k, C, h].forEach(function (a) { var b, e = [], g = L.duration; w(a, function (a, b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b)) }); A(function () { for (b = e.length; b--;)a[e[b]] && !a[e[b]].isActive && (a[e[b]].destroy(), delete a[e[b]]) }, a !== h && c.hasRendered && g ? g : 0) }); H && (H[H.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(H.strokeWidth()) }), H.isPlaced = !0, H[F ? "show" : "hide"](!0)); d && F && (e = b.getTitlePosition(), g(e.y) ? (d[d.isNew ? "attr" : "animate"](e), d.isNew = !1) : (d.attr("y", -9999), d.isNew = !0)); y && y.enabled && b.renderStackTotals();
                    b.isDirty = !1; l(this, "afterRender")
                }, redraw: function () { this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) { a.render() })); this.series.forEach(function (a) { a.isDirty = !0 }) }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function (a) {
                    var b = this, c = b.stacks, e = b.plotLinesAndBands, g; l(this, "destroy", { keepEvents: a }); a || y(b); w(c, function (a, b) { n(a); c[b] = null });[b.ticks, b.minorTicks, b.alternateBands].forEach(function (a) { n(a) }); if (e) for (a = e.length; a--;)e[a].destroy();
                    "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) { b[a] && (b[a] = b[a].destroy()) }); for (g in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[g] = b.plotLinesAndBandsGroups[g].destroy(); w(b, function (a, c) { -1 === b.keepProps.indexOf(c) && delete b[c] })
                }, drawCrosshair: function (a, b) {
                    var c, e = this.crosshair, g = F(e.snap, !0), f, m = this.cross; l(this, "drawCrosshair", { e: a, point: b }); a || (a = this.cross && this.cross.e); if (this.crosshair && !1 !== (t(b) || !g)) {
                        g ? t(b) &&
                            (f = F(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : f = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos); t(f) && (c = this.getPlotLinePath({ value: b && (this.isXAxis ? b.x : F(b.stackY, b.y)), translatedValue: f }) || null); if (!t(c)) { this.hideCrosshair(); return } g = this.categories && !this.isRadial; m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + e.className).attr({ zIndex: F(e.zIndex, 2) }).add(), this.chart.styledMode || (m.attr({
                                stroke: e.color ||
                                    (g ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": F(e.width, 1)
                            }).css({ "pointer-events": "none" }), e.dashStyle && m.attr({ dashstyle: e.dashStyle }))); m.show().attr({ d: c }); g && !e.width && m.attr({ "stroke-width": this.transA }); this.cross.e = a
                    } else this.hideCrosshair(); l(this, "afterDrawCrosshair", { e: a, point: b })
                }, hideCrosshair: function () { this.cross && this.cross.hide(); l(this, "afterHideCrosshair") }
        }); return a.Axis = L
    }); K(I, "parts/LogarithmicAxis.js", [I["parts/Globals.js"]], function (a) {
        var B = a.Axis, E = a.getMagnitude,
        D = a.normalizeTickInterval, h = a.pick; B.prototype.getLogTickPositions = function (a, u, v, t) {
            var d = this.options, n = this.len, k = []; t || (this._minorAutoInterval = null); if (.5 <= a) a = Math.round(a), k = this.getLinearTickPositions(a, u, v); else if (.08 <= a) for (var n = Math.floor(u), l, f, e, c, g, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; n < v + 1 && !g; n++)for (f = d.length, l = 0; l < f && !g; l++)e = this.log2lin(this.lin2log(n) * d[l]), e > u && (!t || c <= v) && void 0 !== c && k.push(c), c > v && (g = !0), c = e; else u = this.lin2log(u), v = this.lin2log(v), a = t ? this.getMinorTickInterval() :
                d.tickInterval, a = h("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (t ? 5 : 1) * (v - u) / ((t ? n / this.tickPositions.length : n) || 1)), a = D(a, null, E(a)), k = this.getLinearTickPositions(a, u, v).map(this.log2lin), t || (this._minorAutoInterval = a / 5); t || (this.tickInterval = a); return k
        }; B.prototype.log2lin = function (a) { return Math.log(a) / Math.LN10 }; B.prototype.lin2log = function (a) { return Math.pow(10, a) }
    }); K(I, "parts/PlotLineOrBand.js", [I["parts/Globals.js"], I["parts/Axis.js"]], function (a, B) {
        var E = a.arrayMax, D = a.arrayMin,
        h = a.defined, d = a.destroyObjectProperties, u = a.erase, v = a.merge, t = a.pick; a.PlotLineOrBand = function (a, d) { this.axis = a; d && (this.options = d, this.id = d.id) }; a.PlotLineOrBand.prototype = {
            render: function () {
                a.fireEvent(this, "render"); var d = this, n = d.axis, k = n.horiz, l = d.options, f = l.label, e = d.label, c = l.to, g = l.from, b = l.value, p = h(g) && h(c), H = h(b), w = d.svgElem, F = !w, y = [], q = l.color, C = t(l.zIndex, 0), A = l.events, y = { "class": "highcharts-plot-" + (p ? "band " : "line ") + (l.className || "") }, G = {}, L = n.chart.renderer, m = p ? "bands" : "lines"; n.isLog &&
                    (g = n.log2lin(g), c = n.log2lin(c), b = n.log2lin(b)); n.chart.styledMode || (H ? (y.stroke = q, y["stroke-width"] = l.width, l.dashStyle && (y.dashstyle = l.dashStyle)) : p && (q && (y.fill = q), l.borderWidth && (y.stroke = l.borderColor, y["stroke-width"] = l.borderWidth))); G.zIndex = C; m += "-" + C; (q = n.plotLinesAndBandsGroups[m]) || (n.plotLinesAndBandsGroups[m] = q = L.g("plot-" + m).attr(G).add()); F && (d.svgElem = w = L.path().attr(y).add(q)); if (H) y = n.getPlotLinePath({ value: b, lineWidth: w.strokeWidth(), acrossPanes: l.acrossPanes }); else if (p) y = n.getPlotBandPath(g,
                        c, l); else return; (F || !w.d) && y && y.length ? (w.attr({ d: y }), A && a.objectEach(A, function (a, b) { w.on(b, function (a) { A[b].apply(d, [a]) }) })) : w && (y ? (w.show(!0), w.animate({ d: y })) : w.d && (w.hide(), e && (d.label = e = e.destroy()))); f && h(f.text) && y && y.length && 0 < n.width && 0 < n.height && !y.isFlat ? (f = v({ align: k && p && "center", x: k ? !p && 4 : 10, verticalAlign: !k && p && "middle", y: k ? p ? 16 : 10 : p ? 6 : -4, rotation: k && !p && 90 }, f), this.renderLabel(f, y, p, C)) : e && e.hide(); return d
            }, renderLabel: function (a, d, k, l) {
                var f = this.label, e = this.axis.chart.renderer;
                f || (f = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (k ? "band" : "line") + "-label " + (a.className || "") }, f.zIndex = l, this.label = f = e.text(a.text, 0, 0, a.useHTML).attr(f).add(), this.axis.chart.styledMode || f.css(a.style)); l = d.xBounds || [d[1], d[4], k ? d[6] : d[1]]; d = d.yBounds || [d[2], d[5], k ? d[7] : d[2]]; k = D(l); e = D(d); f.align(a, !1, { x: k, y: e, width: E(l) - k, height: E(d) - e }); f.show(!0)
            }, destroy: function () { u(this.axis.plotLinesAndBands, this); delete this.axis; d(this) }
        }; a.extend(B.prototype, {
            getPlotBandPath: function (a,
                d) { var k = this.getPlotLinePath({ value: d, force: !0, acrossPanes: this.options.acrossPanes }), l = this.getPlotLinePath({ value: a, force: !0, acrossPanes: this.options.acrossPanes }), f = [], e = this.horiz, c = 1, g; a = a < this.min && d < this.min || a > this.max && d > this.max; if (l && k) for (a && (g = l.toString() === k.toString(), c = 0), a = 0; a < l.length; a += 6)e && k[a + 1] === l[a + 1] ? (k[a + 1] += c, k[a + 4] += c) : e || k[a + 2] !== l[a + 2] || (k[a + 2] += c, k[a + 5] += c), f.push("M", l[a + 1], l[a + 2], "L", l[a + 4], l[a + 5], k[a + 4], k[a + 5], k[a + 1], k[a + 2], "z"), f.isFlat = g; return f }, addPlotBand: function (a) {
                    return this.addPlotBandOrLine(a,
                        "plotBands")
                }, addPlotLine: function (a) { return this.addPlotBandOrLine(a, "plotLines") }, addPlotBandOrLine: function (d, h) { var k = (new a.PlotLineOrBand(this, d)).render(), l = this.userOptions; k && (h && (l[h] = l[h] || [], l[h].push(d)), this.plotLinesAndBands.push(k)); return k }, removePlotBandOrLine: function (a) {
                    for (var d = this.plotLinesAndBands, k = this.options, l = this.userOptions, f = d.length; f--;)d[f].id === a && d[f].destroy();[k.plotLines || [], l.plotLines || [], k.plotBands || [], l.plotBands || []].forEach(function (e) {
                        for (f = e.length; f--;)e[f].id ===
                            a && u(e, e[f])
                    })
                }, removePlotBand: function (a) { this.removePlotBandOrLine(a) }, removePlotLine: function (a) { this.removePlotBandOrLine(a) }
        })
    }); K(I, "parts/Tooltip.js", [I["parts/Globals.js"]], function (a) {
        var B = a.doc, E = a.extend, D = a.format, h = a.isNumber, d = a.merge, u = a.pick, v = a.splat, t = a.syncTimeout, r = a.timeUnits; a.Tooltip = function () { this.init.apply(this, arguments) }; a.Tooltip.prototype = {
            init: function (a, d) {
            this.chart = a; this.options = d; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split; this.outside = u(d.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY)) && !this.split
            }, cleanSplit: function (a) { this.chart.series.forEach(function (d) { var k = d && d.tt; k && (!k.isActive || a ? d.tt = k.destroy() : k.isActive = !1) }) }, applyFilter: function () {
                var a = this.chart; a.renderer.definition({
                    tagName: "filter", id: "drop-shadow-" + a.index, opacity: .5, children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, { tagName: "feOffset", dx: 1, dy: 1 }, {
                        tagName: "feComponentTransfer", children: [{
                            tagName: "feFuncA",
                            type: "linear", slope: .3
                        }]
                    }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }]
                }); a.renderer.definition({ tagName: "style", textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}" })
            }, getLabel: function () {
                var d = this, k = this.chart.renderer, l = this.chart.styledMode, f = this.options, e, c; this.label || (this.outside && (this.container = e = a.doc.createElement("div"), e.className = "highcharts-tooltip-container", a.css(e, {
                    position: "absolute", top: "1px",
                    pointerEvents: f.style && f.style.pointerEvents, zIndex: 3
                }), a.doc.body.appendChild(e), this.renderer = k = new a.Renderer(e, 0, 0)), this.split ? this.label = k.g("tooltip") : (this.label = k.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({ padding: f.padding, r: f.borderRadius }), l || this.label.attr({ fill: f.backgroundColor, "stroke-width": f.borderWidth }).css(f.style).shadow(f.shadow)), l && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (c = {
                    x: this.label.xSetter,
                    y: this.label.ySetter
                }, this.label.xSetter = function (a, b) { c[b].call(this.label, d.distance); e.style.left = a + "px" }, this.label.ySetter = function (a, b) { c[b].call(this.label, d.distance); e.style.top = a + "px" }), this.label.attr({ zIndex: 8 }).add()); return this.label
            }, update: function (a) { this.destroy(); d(!0, this.chart.options.tooltip.userOptions, a); this.init(this.chart, d(!0, this.options, a)) }, destroy: function () {
            this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt =
                this.tt.destroy()); this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container)); a.clearTimeout(this.hideTimer); a.clearTimeout(this.tooltipTimeout)
            }, move: function (d, k, l, f) {
                var e = this, c = e.now, g = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(d - c.x) || 1 < Math.abs(k - c.y)), b = e.followPointer || 1 < e.len; E(c, { x: g ? (2 * c.x + d) / 3 : d, y: g ? (c.y + k) / 2 : k, anchorX: b ? void 0 : g ? (2 * c.anchorX + l) / 3 : l, anchorY: b ? void 0 : g ? (c.anchorY + f) / 2 : f }); e.getLabel().attr(c); g && (a.clearTimeout(this.tooltipTimeout),
                    this.tooltipTimeout = setTimeout(function () { e && e.move(d, k, l, f) }, 32))
            }, hide: function (d) { var k = this; a.clearTimeout(this.hideTimer); d = u(d, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = t(function () { k.getLabel()[d ? "fadeOut" : "hide"](); k.isHidden = !0 }, d)) }, getAnchor: function (a, d) {
                var k = this.chart, f = k.pointer, e = k.inverted, c = k.plotTop, g = k.plotLeft, b = 0, p = 0, h, w; a = v(a); this.followPointer && d ? (void 0 === d.chartX && (d = f.normalize(d)), a = [d.chartX - k.plotLeft, d.chartY - c]) : a[0].tooltipPos ? a = a[0].tooltipPos :
                    (a.forEach(function (a) { h = a.series.yAxis; w = a.series.xAxis; b += a.plotX + (!e && w ? w.left - g : 0); p += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && h ? h.top - c : 0) }), b /= a.length, p /= a.length, a = [e ? k.plotWidth - p : b, this.shared && !e && 1 < a.length && d ? d.chartY - c : e ? k.plotHeight - b : p]); return a.map(Math.round)
            }, getPosition: function (a, d, l) {
                var f = this.chart, e = this.distance, c = {}, g = f.inverted && l.h || 0, b, p = this.outside, k = p ? B.documentElement.clientWidth - 2 * e : f.chartWidth, w = p ? Math.max(B.body.scrollHeight, B.documentElement.scrollHeight,
                    B.body.offsetHeight, B.documentElement.offsetHeight, B.documentElement.clientHeight) : f.chartHeight, h = f.pointer.chartPosition, y = ["y", w, d, (p ? h.top - e : 0) + l.plotY + f.plotTop, p ? 0 : f.plotTop, p ? w : f.plotTop + f.plotHeight], q = ["x", k, a, (p ? h.left - e : 0) + l.plotX + f.plotLeft, p ? 0 : f.plotLeft, p ? k : f.plotLeft + f.plotWidth], C = !this.followPointer && u(l.ttBelow, !f.inverted === !!l.negative), A = function (a, b, f, m, q, p) {
                        var d = f < m - e, A = m + e + f < b, w = m - e - f; m += e; if (C && A) c[a] = m; else if (!C && d) c[a] = w; else if (d) c[a] = Math.min(p - f, 0 > w - g ? w : w - g); else if (A) c[a] =
                            Math.max(q, m + g + f > b ? m : m + g); else return !1
                    }, G = function (a, b, g, f) { var m; f < e || f > b - e ? m = !1 : c[a] = f < g / 2 ? 1 : f > b - g / 2 ? b - g - 2 : f - g / 2; return m }, n = function (a) { var c = y; y = q; q = c; b = a }, m = function () { !1 !== A.apply(0, y) ? !1 !== G.apply(0, q) || b || (n(!0), m()) : b ? c.x = c.y = 0 : (n(!0), m()) }; (f.inverted || 1 < this.len) && n(); m(); return c
            }, defaultFormatter: function (a) { var d = this.points || v(this), l; l = [a.tooltipFooterHeaderFormatter(d[0])]; l = l.concat(a.bodyFormatter(d)); l.push(a.tooltipFooterHeaderFormatter(d[0], !0)); return l }, refresh: function (d,
                k) {
                    var l = this.chart, f = this.options, e, c = d, g, b = {}, p, h = []; p = f.formatter || this.defaultFormatter; var b = this.shared, w = l.styledMode, n = []; f.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = v(c)[0].series.tooltipOptions.followPointer, g = this.getAnchor(c, k), k = g[0], e = g[1], !b || c.series && c.series.noSharedTooltip ? b = c.getLabelConfig() : (n = l.pointer.getActiveSeries(c), l.series.forEach(function (a) { (a.options.inactiveOtherPoints || -1 === n.indexOf(a)) && a.setState("inactive", !0) }), c.forEach(function (a) {
                        a.setState("hover");
                        h.push(a.getLabelConfig())
                    }), b = { x: c[0].category, y: c[0].y }, b.points = h, c = c[0]), this.len = h.length, p = p.call(b, this), b = c.series, this.distance = u(b.tooltipOptions.distance, 16), !1 === p ? this.hide() : (l = this.getLabel(), this.isHidden && l.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(p, v(d)) : (f.style.width && !w || l.css({ width: this.chart.spacingBox.width }), l.attr({ text: p && p.join ? p.join("") : p }), l.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + u(c.colorIndex, b.colorIndex)), w || l.attr({
                        stroke: f.borderColor ||
                            c.color || b.color || "#666666"
                    }), this.updatePosition({ plotX: k, plotY: e, negative: c.negative, ttBelow: c.ttBelow, h: g[2] || 0 })), this.isHidden = !1), a.fireEvent(this, "refresh"))
            }, renderSplit: function (d, k) {
                var l = this, f = [], e = this.chart, c = e.renderer, g = !0, b = this.options, p = 0, h, w = this.getLabel(), n = e.plotTop; a.isString(d) && (d = [!1, d]); d.slice(0, k.length + 1).forEach(function (a, q) {
                    if (!1 !== a && "" !== a) {
                        q = k[q - 1] || { isHeader: !0, plotX: k[0].plotX, plotY: e.plotHeight }; var d = q.series || l, A = d.tt, y = q.series || {}, H = "highcharts-color-" +
                            u(q.colorIndex, y.colorIndex, "none"); A || (A = { padding: b.padding, r: b.borderRadius }, e.styledMode || (A.fill = b.backgroundColor, A["stroke-width"] = b.borderWidth), d.tt = A = c.label(null, null, null, (q.isHeader ? b.headerShape : b.shape) || "callout", null, null, b.useHTML).addClass("highcharts-tooltip-box " + H).attr(A).add(w)); A.isActive = !0; A.attr({ text: a }); e.styledMode || A.css(b.style).shadow(b.shadow).attr({ stroke: b.borderColor || q.color || y.color || "#333333" }); a = A.getBBox(); y = a.width + A.strokeWidth(); q.isHeader ? (p = a.height,
                                e.xAxis[0].opposite && (h = !0, n -= p), y = Math.max(0, Math.min(q.plotX + e.plotLeft - y / 2, e.chartWidth + (e.scrollablePixelsX ? e.scrollablePixelsX - e.marginRight : 0) - y))) : y = q.plotX + e.plotLeft - u(b.distance, 16) - y; 0 > y && (g = !1); a = (q.series && q.series.yAxis && q.series.yAxis.pos) + (q.plotY || 0); a -= n; q.isHeader && (a = h ? -p : e.plotHeight + p); f.push({ target: a, rank: q.isHeader ? 1 : 0, size: d.tt.getBBox().height + 1, point: q, x: y, tt: A })
                    }
                }); this.cleanSplit(); b.positioner && f.forEach(function (a) {
                    var c = b.positioner.call(l, a.tt.getBBox().width, a.size,
                        a.point); a.x = c.x; a.align = 0; a.target = c.y; a.rank = u(c.rank, a.rank)
                }); a.distribute(f, e.plotHeight + p); f.forEach(function (a) { var c = a.point, f = c.series; a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: g || c.isHeader || b.positioner ? a.x : c.plotX + e.plotLeft + l.distance, y: a.pos + n, anchorX: c.isHeader ? c.plotX + e.plotLeft : c.plotX + f.xAxis.pos, anchorY: c.isHeader ? e.plotTop + e.plotHeight / 2 : c.plotY + f.yAxis.pos }) })
            }, updatePosition: function (a) {
                var d = this.chart, l = this.getLabel(), f = (this.options.positioner || this.getPosition).call(this,
                    l.width, l.height, a), e = a.plotX + d.plotLeft; a = a.plotY + d.plotTop; var c; this.outside && (c = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(l.width + c, l.height + c, !1), e += d.pointer.chartPosition.left - f.x, a += d.pointer.chartPosition.top - f.y); this.move(Math.round(f.x), Math.round(f.y || 0), e, a)
            }, getDateFormat: function (a, d, l, f) {
                var e = this.chart.time, c = e.dateFormat("%m-%d %H:%M:%S.%L", d), g, b, p = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, k = "millisecond"; for (b in r) {
                    if (a === r.week && +e.dateFormat("%w",
                        d) === l && "00:00:00.000" === c.substr(6)) { b = "week"; break } if (r[b] > a) { b = k; break } if (p[b] && c.substr(p[b]) !== "01-01 00:00:00.000".substr(p[b])) break; "week" !== b && (k = b)
                } b && (g = e.resolveDTLFormat(f[b]).main); return g
            }, getXDateFormat: function (a, d, l) { d = d.dateTimeLabelFormats; var f = l && l.closestPointRange; return (f ? this.getDateFormat(f, a.x, l.options.startOfWeek, d) : d.day) || d.year }, tooltipFooterHeaderFormatter: function (d, k) {
                var l = k ? "footer" : "header", f = d.series, e = f.tooltipOptions, c = e.xDateFormat, g = f.xAxis, b = g && "datetime" ===
                    g.options.type && h(d.key), p = e[l + "Format"]; k = { isFooter: k, labelConfig: d }; a.fireEvent(this, "headerFormatter", k, function (a) { b && !c && (c = this.getXDateFormat(d, e, g)); b && c && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function (a) { p = p.replace("{point." + a + "}", "{point." + a + ":" + c + "}") }); f.chart.styledMode && (p = this.styledModeFormat(p)); a.text = D(p, { point: d, series: f }, this.chart.time) }); return k.text
            }, bodyFormatter: function (a) {
                return a.map(function (a) {
                    var d = a.series.tooltipOptions; return (d[(a.point.formatPrefix ||
                        "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            }, styledModeFormat: function (a) { return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"') }
        }
    }); K(I, "parts/Pointer.js", [I["parts/Globals.js"]], function (a) {
        var B = a.addEvent, E = a.attr, D = a.charts, h = a.color, d = a.css, u = a.defined, v = a.extend, t = a.find, r = a.fireEvent, n = a.isNumber, k = a.isObject,
        l = a.offset, f = a.pick, e = a.splat, c = a.Tooltip; a.Pointer = function (a, b) { this.init(a, b) }; a.Pointer.prototype = {
            init: function (a, b) { this.options = b; this.chart = a; this.runChartClick = b.chart.events && !!b.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; c && (a.tooltip = new c(a, b.tooltip), this.followTouchMove = f(b.tooltip.followTouchMove, !0)); this.setDOMEvents() }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, e = c.zoomType || "", b = b.inverted; /touch/.test(a.type) && (e = f(c.pinchType, e)); this.zoomX = a =
                    /x/.test(e); this.zoomY = e = /y/.test(e); this.zoomHor = a && !b || e && b; this.zoomVert = e && !b || a && b; this.hasZoom = a || e
            }, normalize: function (a, b) { var c; c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a; b || (this.chartPosition = b = l(this.chart.container)); return v(a, { chartX: Math.round(c.pageX - b.left), chartY: Math.round(c.pageY - b.top) }) }, getCoordinates: function (a) {
                var b = { xAxis: [], yAxis: [] }; this.chart.axes.forEach(function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c, value: c.toValue(a[c.horiz ? "chartX" :
                            "chartY"])
                    })
                }); return b
            }, findNearestKDPoint: function (a, b, c) { var e; a.forEach(function (a) { var g = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y"); a = a.searchPoint(c, g); if ((g = k(a, !0)) && !(g = !k(e, !0))) var g = e.distX - a.distX, f = e.dist - a.dist, d = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex), g = 0 < (0 !== g && b ? g : 0 !== f ? f : 0 !== d ? d : e.series.index > a.series.index ? -1 : 1); g && (e = a) }); return e }, getPointFromEvent: function (a) {
                a = a.target; for (var b; a && !b;)b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, b) { var c = a.series, e = c.xAxis, c = c.yAxis, g = f(a.clientX, a.plotX), d = a.shapeArgs; if (e && c) return b ? { chartX: e.len + e.pos - g, chartY: c.len + c.pos - a.plotY } : { chartX: g + e.pos, chartY: a.plotY + c.pos }; if (d && d.x && d.y) return { chartX: d.x, chartY: d.y } }, getHoverData: function (a, b, c, e, d, l) {
                var g, q = []; e = !(!e || !a); var p = b && !b.stickyTracking ? [b] : c.filter(function (a) { return a.visible && !(!d && a.directTouch) && f(a.options.enableMouseTracking, !0) && a.stickyTracking }); b = (g = e ? a : this.findNearestKDPoint(p,
                    d, l)) && g.series; g && (d && !b.noSharedTooltip ? (p = c.filter(function (a) { return a.visible && !(!d && a.directTouch) && f(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), p.forEach(function (a) { var b = t(a.points, function (a) { return a.x === g.x && !a.isNull }); k(b) && (a.chart.isBoosting && (b = a.getPoint(b)), q.push(b)) })) : q.push(g)); return { hoverPoint: g, hoverSeries: b, hoverPoints: q }
            }, runPointActions: function (c, b) {
                var e = this.chart, g = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0, d = g ? g.shared : !1, k = b || e.hoverPoint,
                l = k && k.series || e.hoverSeries, l = this.getHoverData(k, l, e.series, "touchmove" !== c.type && (!!b || l && l.directTouch && this.isDirectTouch), d, c), q = [], C, k = l.hoverPoint; C = l.hoverPoints; b = (l = l.hoverSeries) && l.tooltipOptions.followPointer; d = d && l && !l.noSharedTooltip; if (k && (k !== e.hoverPoint || g && g.isHidden)) {
                    (e.hoverPoints || []).forEach(function (a) { -1 === C.indexOf(a) && a.setState() }); if (e.hoverSeries !== l) l.onMouseOver(); q = this.getActiveSeries(C); e.series.forEach(function (a) {
                    (a.options.inactiveOtherPoints || -1 === q.indexOf(a)) &&
                        a.setState("inactive", !0)
                    }); (C || []).forEach(function (a) { a.setState("hover") }); e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut"); if (!k.series) return; k.firePointEvent("mouseOver"); e.hoverPoints = C; e.hoverPoint = k; g && g.refresh(d ? C : k, c)
                } else b && g && !g.isHidden && (k = g.getAnchor([{}], c), g.updatePosition({ plotX: k[0], plotY: k[1] })); this.unDocMouseMove || (this.unDocMouseMove = B(e.container.ownerDocument, "mousemove", function (b) { var c = D[a.hoverChartIndex]; if (c) c.pointer.onDocumentMouseMove(b) })); e.axes.forEach(function (b) {
                    var e =
                        f(b.crosshair.snap, !0), g = e ? a.find(C, function (a) { return a.series[b.coll] === b }) : void 0; g || !e ? b.drawCrosshair(c, g) : b.hideCrosshair()
                })
            }, getActiveSeries: function (a) { var b = [], c; (a || []).forEach(function (a) { c = a.series; b.push(c); c.linkedParent && b.push(c.linkedParent); c.linkedSeries && (b = b.concat(c.linkedSeries)); c.navigatorSeries && b.push(c.navigatorSeries) }); return b }, reset: function (a, b) {
                var c = this.chart, g = c.hoverSeries, f = c.hoverPoint, d = c.hoverPoints, k = c.tooltip, q = k && k.shared ? d : f; a && q && e(q).forEach(function (b) {
                    b.series.isCartesian &&
                    void 0 === b.plotX && (a = !1)
                }); if (a) k && q && e(q).length && (k.refresh(q), k.shared && d ? d.forEach(function (a) { a.setState(a.state, !0); a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)) }) : f && (f.setState(f.state, !0), c.axes.forEach(function (a) { a.crosshair && a.drawCrosshair(null, f) }))); else {
                    if (f) f.onMouseOut(); d && d.forEach(function (a) { a.setState() }); if (g) g.onMouseOut(); k && k.hide(b); this.unDocMouseMove && (this.unDocMouseMove =
                        this.unDocMouseMove()); c.axes.forEach(function (a) { a.hideCrosshair() }); this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            }, scaleGroups: function (a, b) { var c = this.chart, e; c.series.forEach(function (g) { e = a || g.getPlotBox(); g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(e), g.markerGroup && (g.markerGroup.attr(e), g.markerGroup.clip(b ? c.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(e)) }); c.clipRect.attr(b || c.clipBox) }, dragStart: function (a) {
                var b = this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX =
                    this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, e = a.chartX, g = a.chartY, f = this.zoomHor, d = this.zoomVert, q = b.plotLeft, k = b.plotTop, A = b.plotWidth, l = b.plotHeight, n, m = this.selectionMarker, z = this.mouseDownX, r = this.mouseDownY, t = c.panKey && a[c.panKey + "Key"]; m && m.touch || (e < q ? e = q : e > q + A && (e = q + A), g < k ? g = k : g > k + l && (g = k + l), this.hasDragged = Math.sqrt(Math.pow(z - e, 2) + Math.pow(r - g, 2)), 10 < this.hasDragged && (n = b.isInsidePlot(z - q, r - k), b.hasCartesianSeries &&
                    (this.zoomX || this.zoomY) && n && !t && !m && (this.selectionMarker = m = b.renderer.rect(q, k, f ? 1 : A, d ? 1 : l, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), b.styledMode || m.attr({ fill: c.selectionMarkerFill || h("#335cad").setOpacity(.25).get() })), m && f && (e -= z, m.attr({ width: Math.abs(e), x: (0 < e ? 0 : e) + z })), m && d && (e = g - r, m.attr({ height: Math.abs(e), y: (0 < e ? 0 : e) + r })), n && !m && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, e = this.hasPinched; if (this.selectionMarker) {
                    var g = {
                        originalEvent: a,
                        xAxis: [], yAxis: []
                    }, f = this.selectionMarker, k = f.attr ? f.attr("x") : f.x, q = f.attr ? f.attr("y") : f.y, l = f.attr ? f.attr("width") : f.width, A = f.attr ? f.attr("height") : f.height, h; if (this.hasDragged || e) c.axes.forEach(function (c) { if (c.zoomEnabled && u(c.min) && (e || b[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]])) { var f = c.horiz, d = "touchend" === a.type ? c.minPixelPadding : 0, p = c.toValue((f ? k : q) + d), f = c.toValue((f ? k + l : q + A) - d); g[c.coll].push({ axis: c, min: Math.min(p, f), max: Math.max(p, f) }); h = !0 } }), h && r(c, "selection", g, function (a) {
                        c.zoom(v(a,
                            e ? { animation: !1 } : null))
                    }); n(c.index) && (this.selectionMarker = this.selectionMarker.destroy()); e && this.scaleGroups()
                } c && n(c.index) && (d(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) { a = this.normalize(a); 2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a)) }, onDocumentMouseUp: function (c) { D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(c) }, onDocumentMouseMove: function (a) {
                var b =
                    this.chart, c = this.chartPosition; a = this.normalize(a, c); !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (c) { var b = D[a.hoverChartIndex]; b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null) }, onContainerMouseMove: function (c) {
                var b = this.chart; u(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index); c = this.normalize(c); c.preventDefault ||
                    (c.returnValue = !1); "mousedown" === b.mouseIsDown && this.drag(c); !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            }, inClass: function (a, b) { for (var c; a;) { if (c = E(a, "class")) { if (-1 !== c.indexOf(b)) return !0; if (-1 !== c.indexOf("highcharts-container")) return !1 } a = a.parentNode } }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries; a = a.relatedTarget || a.toElement; this.isDirectTouch = !1; if (!(!b || !a || b.stickyTracking || this.inClass(a,
                    "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) { var b = this.chart, c = b.hoverPoint, e = b.plotLeft, f = b.plotTop; a = this.normalize(a); b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (r(c.series, "click", v(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && r(b, "click", a))) }, setDOMEvents: function () {
                var c = this, b = c.chart.container,
                e = b.ownerDocument; b.onmousedown = function (a) { c.onContainerMouseDown(a) }; b.onmousemove = function (a) { c.onContainerMouseMove(a) }; b.onclick = function (a) { c.onContainerClick(a) }; this.unbindContainerMouseLeave = B(b, "mouseleave", c.onContainerMouseLeave); a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = B(e, "mouseup", c.onDocumentMouseUp)); a.hasTouch && (b.ontouchstart = function (a) { c.onContainerTouchStart(a) }, b.ontouchmove = function (a) { c.onContainerTouchMove(a) }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd =
                    B(e, "touchend", c.onDocumentTouchEnd)))
            }, destroy: function () { var c = this; c.unDocMouseMove && c.unDocMouseMove(); this.unbindContainerMouseLeave(); a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd())); clearInterval(c.tooltipTimeout); a.objectEach(c, function (a, e) { c[e] = null }) }
        }
    }); K(I, "parts/TouchPointer.js", [I["parts/Globals.js"]], function (a) {
        var B = a.charts, E = a.extend, D = a.noop, h = a.pick; E(a.Pointer.prototype,
            {
                pinchTranslate: function (a, h, v, t, r, n) { this.zoomHor && this.pinchTranslateDirection(!0, a, h, v, t, r, n); this.zoomVert && this.pinchTranslateDirection(!1, a, h, v, t, r, n) }, pinchTranslateDirection: function (a, h, v, t, r, n, k, l) {
                    var f = this.chart, e = a ? "x" : "y", c = a ? "X" : "Y", g = "chart" + c, b = a ? "width" : "height", d = f["plot" + (a ? "Left" : "Top")], H, w, F = l || 1, y = f.inverted, q = f.bounds[a ? "h" : "v"], C = 1 === h.length, A = h[0][g], G = v[0][g], L = !C && h[1][g], m = !C && v[1][g], z; v = function () {
                    !C && 20 < Math.abs(A - L) && (F = l || Math.abs(G - m) / Math.abs(A - L)); w = (d - G) / F +
                        A; H = f["plot" + (a ? "Width" : "Height")] / F
                    }; v(); h = w; h < q.min ? (h = q.min, z = !0) : h + H > q.max && (h = q.max - H, z = !0); z ? (G -= .8 * (G - k[e][0]), C || (m -= .8 * (m - k[e][1])), v()) : k[e] = [G, m]; y || (n[e] = w - d, n[b] = H); n = y ? 1 / F : F; r[b] = H; r[e] = h; t[y ? a ? "scaleY" : "scaleX" : "scale" + c] = F; t["translate" + c] = n * d + (G - n * A)
                }, pinch: function (a) {
                    var d = this, v = d.chart, t = d.pinchDown, r = a.touches, n = r.length, k = d.lastValidTouch, l = d.hasZoom, f = d.selectionMarker, e = {}, c = 1 === n && (d.inClass(a.target, "highcharts-tracker") && v.runTrackerClick || d.runChartClick), g = {}; 1 < n && (d.initiated =
                        !0); l && d.initiated && !c && a.preventDefault();[].map.call(r, function (a) { return d.normalize(a) }); "touchstart" === a.type ? ([].forEach.call(r, function (a, c) { t[c] = { chartX: a.chartX, chartY: a.chartY } }), k.x = [t[0].chartX, t[1] && t[1].chartX], k.y = [t[0].chartY, t[1] && t[1].chartY], v.axes.forEach(function (a) {
                            if (a.zoomEnabled) {
                                var b = v.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, e = a.toPixels(Math.min(h(a.options.min, a.dataMin), a.dataMin)), f = a.toPixels(Math.max(h(a.options.max, a.dataMax), a.dataMax)), g = Math.max(e, f); b.min =
                                    Math.min(a.pos, Math.min(e, f) - c); b.max = Math.max(a.pos + a.len, g + c)
                            }
                        }), d.res = !0) : d.followTouchMove && 1 === n ? this.runPointActions(d.normalize(a)) : t.length && (f || (d.selectionMarker = f = E({ destroy: D, touch: !0 }, v.plotBox)), d.pinchTranslate(t, r, e, f, g, k), d.hasPinched = l, d.scaleGroups(e, g), d.res && (d.res = !1, this.reset(!1, 0)))
                }, touch: function (d, u) {
                    var v = this.chart, t, r; if (v.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 }); a.hoverChartIndex = v.index; 1 === d.touches.length ? (d = this.normalize(d), (r = v.isInsidePlot(d.chartX -
                        v.plotLeft, d.chartY - v.plotTop)) && !v.openMenu ? (u && this.runPointActions(d), "touchmove" === d.type && (u = this.pinchDown, t = u[0] ? 4 <= Math.sqrt(Math.pow(u[0].chartX - d.chartX, 2) + Math.pow(u[0].chartY - d.chartY, 2)) : !1), h(t, !0) && this.pinch(d)) : u && this.reset()) : 2 === d.touches.length && this.pinch(d)
                }, onContainerTouchStart: function (a) { this.zoomOption(a); this.touch(a, !0) }, onContainerTouchMove: function (a) { this.touch(a) }, onDocumentTouchEnd: function (d) { B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(d) }
            })
    }); K(I, "parts/MSPointer.js",
        [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.charts, D = a.css, h = a.doc, d = a.extend, u = a.noop, v = a.Pointer, t = a.removeEvent, r = a.win, n = a.wrap; if (!a.hasTouch && (r.PointerEvent || r.MSPointerEvent)) {
                var k = {}, l = !!r.PointerEvent, f = function () { var c = []; c.item = function (a) { return this[a] }; a.objectEach(k, function (a) { c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }) }); return c }, e = function (c, e, b, d) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !E[a.hoverChartIndex] || (d(c), d = E[a.hoverChartIndex].pointer,
                    d[e]({ type: b, target: c.currentTarget, preventDefault: u, touches: f() }))
                }; d(v.prototype, {
                    onContainerPointerDown: function (a) { e(a, "onContainerTouchStart", "touchstart", function (a) { k[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } }) }, onContainerPointerMove: function (a) { e(a, "onContainerTouchMove", "touchmove", function (a) { k[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget) }) }, onDocumentPointerUp: function (a) {
                        e(a, "onDocumentTouchEnd", "touchend",
                            function (a) { delete k[a.pointerId] })
                    }, batchMSEvents: function (a) { a(this.chart.container, l ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, l ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(h, l ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp) }
                }); n(v.prototype, "init", function (a, e, b) { a.call(this, e, b); this.hasZoom && D(e.container, { "-ms-touch-action": "none", "touch-action": "none" }) }); n(v.prototype, "setDOMEvents", function (a) {
                    a.apply(this); (this.hasZoom || this.followTouchMove) &&
                        this.batchMSEvents(B)
                }); n(v.prototype, "destroy", function (a) { this.batchMSEvents(t); a.call(this) })
            }
        }); K(I, "parts/Legend.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.css, D = a.discardElement, h = a.defined, d = a.fireEvent, u = a.isFirefox, v = a.marginNames, t = a.merge, r = a.pick, n = a.setAnimation, k = a.stableSort, l = a.win, f = a.wrap; a.Legend = function (a, c) { this.init(a, c) }; a.Legend.prototype = {
                init: function (a, c) {
                this.chart = a; this.setOptions(c); c.enabled && (this.render(), B(this.chart, "endResize", function () { this.legend.positionCheckboxes() }),
                    this.proximate ? this.unchartrender = B(this.chart, "render", function () { this.legend.proximatePositions(); this.legend.positionItems() }) : this.unchartrender && this.unchartrender())
                }, setOptions: function (a) {
                    var c = r(a.padding, 8); this.options = a; this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = t(this.itemStyle, a.itemHiddenStyle)); this.itemMarginTop = a.itemMarginTop || 0; this.padding = c; this.initialItemY = c - 5; this.symbolWidth = r(a.symbolWidth, 16); this.pages = []; this.proximate = "proximate" === a.layout &&
                        !this.chart.inverted
                }, update: function (a, c) { var e = this.chart; this.setOptions(t(!0, this.options, a)); this.destroy(); e.isDirtyLegend = e.isDirtyBox = !0; r(c, !0) && e.redraw(); d(this, "afterUpdate") }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"); if (!this.chart.styledMode) {
                    var e = this.options, b = a.legendItem, f = a.legendLine, k = a.legendSymbol, l = this.itemHiddenStyle.color, e = c ? e.itemStyle.color : l, h = c ? a.color || l : l, y = a.options && a.options.marker, q = { fill: h }; b && b.css({
                        fill: e,
                        color: e
                    }); f && f.attr({ stroke: h }); k && (y && k.isMarker && (q = a.pointAttribs(), c || (q.stroke = q.fill = l)), k.attr(q))
                } d(this, "afterColorizeItem", { item: a, visible: c })
                }, positionItems: function () { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes() }, positionItem: function (a) {
                    var c = this.options, e = c.symbolPadding, c = !c.rtl, b = a._legendItemPos, f = b[0], b = b[1], d = a.checkbox; if ((a = a.legendGroup) && a.element) a[h(a.translateY) ? "animate" : "attr"]({
                        translateX: c ? f : this.legendWidth - f - 2 * e - 4,
                        translateY: b
                    }); d && (d.x = f, d.y = b)
                }, destroyItem: function (a) { var c = a.checkbox;["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (c) { a[c] && (a[c] = a[c].destroy()) }); c && D(a.checkbox) }, destroy: function () { function a(a) { this[a] && (this[a] = this[a].destroy()) } this.getAllItems().forEach(function (c) { ["legendItem", "legendGroup"].forEach(a, c) }); "clipRect up down pager nav box title group".split(" ").forEach(a, this); this.display = null }, positionCheckboxes: function () {
                    var a = this.group && this.group.alignAttr,
                    c, f = this.clipHeight || this.legendHeight, b = this.titleHeight; a && (c = a.translateY, this.allItems.forEach(function (e) { var g = e.checkbox, d; g && (d = c + b + g.y + (this.scrollOffset || 0) + 3, E(g, { left: a.translateX + e.checkboxOffset + g.x - 20 + "px", top: d + "px", display: this.proximate || d > c - 6 && d < c + f - 6 ? "" : "none" })) }, this))
                }, renderTitle: function () {
                    var a = this.options, c = this.padding, f = a.title, b = 0; f.text && (this.title || (this.title = this.chart.renderer.label(f.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }),
                        this.chart.styledMode || this.title.css(f.style), this.title.add(this.group)), f.width || this.title.css({ width: this.maxLegendWidth + "px" }), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: b })); this.titleHeight = b
                }, setText: function (e) { var c = this.options; e.legendItem.attr({ text: c.labelFormat ? a.format(c.labelFormat, e, this.chart.time) : c.labelFormatter.call(e) }) }, renderItem: function (a) {
                    var c = this.chart, e = c.renderer, b = this.options, f = this.symbolWidth, d = b.symbolPadding,
                    k = this.itemStyle, l = this.itemHiddenStyle, h = "horizontal" === b.layout ? r(b.itemDistance, 20) : 0, q = !b.rtl, C = a.legendItem, A = !a.series, G = !A && a.series.drawLegendSymbol ? a.series : a, n = G.options, n = this.createCheckboxForItem && n && n.showCheckbox, h = f + d + h + (n ? 20 : 0), m = b.useHTML, z = a.options.className; C || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + G.type + "-series highcharts-color-" + a.colorIndex + (z ? " " + z : "") + (A ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = C = e.text("",
                        q ? f + d : -d, this.baseline || 0, m), c.styledMode || C.css(t(a.visible ? k : l)), C.attr({ align: q ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(c.styledMode ? 12 : k.fontSize, C), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, C.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, G.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, C, m)); n && !a.checkbox && this.createCheckboxForItem(a); this.colorizeItem(a, a.visible); !c.styledMode &&
                            k.width || C.css({ width: (b.itemWidth || this.widthOption || c.spacingBox.width) - h }); this.setText(a); c = C.getBBox(); a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || c.width + h; this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth); this.totalItemWidth += a.itemWidth; this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height || this.symbolHeight)
                }, layoutItem: function (a) {
                    var c = this.options, e = this.padding, b = "horizontal" === c.layout, f = a.itemHeight, d = c.itemMarginBottom || 0, k = this.itemMarginTop,
                    l = b ? r(c.itemDistance, 20) : 0, h = this.maxLegendWidth, c = c.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : a.itemWidth; b && this.itemX - e + c > h && (this.itemX = e, this.lastLineHeight && (this.itemY += k + this.lastLineHeight + d), this.lastLineHeight = 0); this.lastItemY = k + this.itemY + d; this.lastLineHeight = Math.max(f, this.lastLineHeight); a._legendItemPos = [this.itemX, this.itemY]; b ? this.itemX += c : (this.itemY += k + f + d, this.lastLineHeight = f); this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - e - (a.checkbox ? 0 : l) : c) + e, this.offsetWidth)
                },
                getAllItems: function () { var a = []; this.chart.series.forEach(function (c) { var e = c && c.options; c && r(e.showInLegend, h(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === e.legendType ? c.data : c))) }); d(this, "afterGetAllItems", { allItems: a }); return a }, getAlignment: function () { var a = this.options; return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0) }, adjustMargins: function (a, c) {
                    var e = this.chart, b = this.options, f = this.getAlignment(),
                    d = void 0 !== e.options.title.margin ? e.titleOffset + e.options.title.margin : 0; f && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (g, k) { g.test(f) && !h(a[k]) && (e[v[k]] = Math.max(e[v[k]], e.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * b[k % 2 ? "x" : "y"] + r(b.margin, 12) + c[k] + (0 === k && (0 === e.titleOffset ? 0 : d)))) })
                }, proximatePositions: function () {
                    var e = this.chart, c = [], f = "left" === this.options.align; this.allItems.forEach(function (b) {
                        var d, g; g = f; var k; b.yAxis && b.points && (b.xAxis.options.reversed &&
                            (g = !g), d = a.find(g ? b.points : b.points.slice(0).reverse(), function (b) { return a.isNumber(b.plotY) }), g = b.legendGroup.getBBox().height, k = b.yAxis.top - e.plotTop, b.visible ? (d = d ? d.plotY : b.yAxis.height, d += k - .3 * g) : d = k + b.yAxis.height, c.push({ target: d, size: g, item: b }))
                    }, this); a.distribute(c, e.plotHeight); c.forEach(function (a) { a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos })
                }, render: function () {
                    var e = this.chart, c = e.renderer, f = this.group, b, p, l, h = this.box, n = this.options, y = this.padding; this.itemX = y; this.itemY =
                        this.initialItemY; this.lastItemY = this.offsetWidth = 0; this.widthOption = a.relativeLength(n.width, e.spacingBox.width - y); b = e.spacingBox.width - 2 * y - n.x; -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (b /= 2); this.maxLegendWidth = this.widthOption || b; f || (this.group = f = c.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = c.g().attr({ zIndex: 1 }).add(f), this.scrollGroup = c.g().add(this.contentGroup)); this.renderTitle(); b = this.getAllItems(); k(b, function (a, b) {
                            return (a.options && a.options.legendIndex || 0) -
                                (b.options && b.options.legendIndex || 0)
                        }); n.reversed && b.reverse(); this.allItems = b; this.display = p = !!b.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; b.forEach(this.renderItem, this); b.forEach(this.layoutItem, this); b = (this.widthOption || this.offsetWidth) + y; l = this.lastItemY + this.lastLineHeight + this.titleHeight; l = this.handleOverflow(l); l += y; h || (this.box = h = c.rect().addClass("highcharts-legend-box").attr({ r: n.borderRadius }).add(f), h.isNew = !0); e.styledMode || h.attr({
                            stroke: n.borderColor,
                            "stroke-width": n.borderWidth || 0, fill: n.backgroundColor || "none"
                        }).shadow(n.shadow); 0 < b && 0 < l && (h[h.isNew ? "attr" : "animate"](h.crisp.call({}, { x: 0, y: 0, width: b, height: l }, h.strokeWidth())), h.isNew = !1); h[p ? "show" : "hide"](); e.styledMode && "none" === f.getStyle("display") && (b = l = 0); this.legendWidth = b; this.legendHeight = l; p && (c = e.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (h = c.y + e.titleOffset, c = t(c, { y: 0 < e.titleOffset ? h += e.options.title.margin : h })), f.align(t(n, {
                            width: b, height: l, verticalAlign: this.proximate ?
                                "top" : n.verticalAlign
                        }), !0, c)); this.proximate || this.positionItems(); d(this, "afterRender")
                }, handleOverflow: function (a) {
                    var c = this, e = this.chart, b = e.renderer, f = this.options, d = f.y, k = this.padding, d = e.spacingBox.height + ("top" === f.verticalAlign ? -d : d) - k, l = f.maxHeight, h, q = this.clipRect, C = f.navigation, A = r(C.animation, !0), G = C.arrowSize || 12, n = this.nav, m = this.pages, z, t = this.allItems, v = function (a) {
                        "number" === typeof a ? q.attr({ height: a }) : q && (c.clipRect = q.destroy(), c.contentGroup.clip()); c.contentGroup.div && (c.contentGroup.div.style.clip =
                            a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)" : "auto")
                    }, J = function (a) { c[a] = b.circle(0, 0, 1.3 * G).translate(G / 2, G / 2).add(n); e.styledMode || c[a].attr("fill", "rgba(0,0,0,0.0001)"); return c[a] }; "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (d /= 2); l && (d = Math.min(d, l)); m.length = 0; a > d && !1 !== C.enabled ? (this.clipHeight = h = Math.max(d - 20 - this.titleHeight - k, 0), this.currentPage = r(this.currentPage, 1), this.fullHeight = a, t.forEach(function (a, b) {
                        var c = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height),
                        f = m.length; if (!f || c - m[f - 1] > h && (z || c) !== m[f - 1]) m.push(z || c), f++; a.pageIx = f - 1; z && (t[b - 1].pageIx = f - 1); b === t.length - 1 && c + e - m[f - 1] > h && c !== z && (m.push(c), a.pageIx = f); c !== z && (z = c)
                    }), q || (q = c.clipRect = b.clipRect(0, k, 9999, 0), c.contentGroup.clip(q)), v(h), n || (this.nav = n = b.g().attr({ zIndex: 1 }).add(this.group), this.up = b.symbol("triangle", 0, 0, G, G).add(n), J("upTracker").on("click", function () { c.scroll(-1, A) }), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(C.style),
                        this.pager.add(n), this.down = b.symbol("triangle-down", 0, 0, G, G).add(n), J("downTracker").on("click", function () { c.scroll(1, A) })), c.scroll(0), a = d) : n && (v(), this.nav = n.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return a
                }, scroll: function (a, c) {
                    var e = this.pages, b = e.length, f = this.currentPage + a; a = this.clipHeight; var d = this.options.navigation, k = this.pager, l = this.padding; f > b && (f = b); 0 < f && (void 0 !== c && n(c, this.chart), this.nav.attr({
                        translateX: l, translateY: a + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), [this.up, this.upTracker].forEach(function (a) { a.attr({ "class": 1 === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), k.attr({ text: f + "/" + b }), [this.down, this.downTracker].forEach(function (a) { a.attr({ x: 18 + this.pager.getBBox().width, "class": f === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }, this), this.chart.styledMode || (this.up.attr({ fill: 1 === f ? d.inactiveColor : d.activeColor }), this.upTracker.css({ cursor: 1 === f ? "default" : "pointer" }), this.down.attr({
                        fill: f ===
                            b ? d.inactiveColor : d.activeColor
                    }), this.downTracker.css({ cursor: f === b ? "default" : "pointer" })), this.scrollOffset = -e[f - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = f, this.positionCheckboxes())
                }
            }; a.LegendSymbolMixin = {
                drawRectangle: function (a, c) { var e = a.symbolHeight, b = a.options.squareSymbol; c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, r(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(c.legendGroup) },
                drawLineMarker: function (a) {
                    var c = this.options, e = c.marker, b = a.symbolWidth, f = a.symbolHeight, d = f / 2, k = this.chart.renderer, l = this.legendGroup; a = a.baseline - Math.round(.3 * a.fontMetrics.b); var h = {}; this.chart.styledMode || (h = { "stroke-width": c.lineWidth || 0 }, c.dashStyle && (h.dashstyle = c.dashStyle)); this.legendLine = k.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(h).add(l); e && !1 !== e.enabled && b && (c = Math.min(r(e.radius, d), d), 0 === this.symbol.indexOf("url") && (e = t(e, { width: f, height: f }), c = 0), this.legendSymbol =
                        e = k.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c, e).addClass("highcharts-point").add(l), e.isMarker = !0)
                }
            }; (/Trident\/7\.0/.test(l.navigator && l.navigator.userAgent) || u) && f(a.Legend.prototype, "positionItem", function (a, c) { var e = this, b = function () { c._legendItemPos && a.call(e, c) }; b(); e.bubbleLegend || setTimeout(b) })
        }); K(I, "parts/Chart.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.animate, D = a.animObject, h = a.attr, d = a.doc, u = a.Axis, v = a.createElement, t = a.defaultOptions, r = a.discardElement, n = a.charts, k = a.css,
            l = a.defined, f = a.extend, e = a.find, c = a.fireEvent, g = a.isNumber, b = a.isObject, p = a.isString, H = a.Legend, w = a.marginNames, F = a.merge, y = a.objectEach, q = a.Pointer, C = a.pick, A = a.pInt, G = a.removeEvent, L = a.seriesTypes, m = a.splat, z = a.syncTimeout, M = a.win, N = a.Chart = function () { this.getArgs.apply(this, arguments) }; a.chart = function (a, b, c) { return new N(a, b, c) }; f(N.prototype, {
                callbacks: [], getArgs: function () { var a = [].slice.call(arguments); if (p(a[0]) || a[0].nodeName) this.renderTo = a.shift(); this.init(a[0], a[1]) }, init: function (e,
                    f) {
                        var d, m = e.series, g = e.plotOptions || {}; c(this, "init", { args: arguments }, function () {
                        e.series = null; d = F(t, e); y(d.plotOptions, function (a, c) { b(a) && (a.tooltip = g[c] && F(g[c].tooltip) || void 0) }); d.tooltip.userOptions = e.chart && e.chart.forExport && e.tooltip.userOptions || e.tooltip; d.series = e.series = m; this.userOptions = e; var q = d.chart, k = q.events; this.margin = []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback = f; this.isResizing = 0; this.options = d; this.axes = []; this.series = []; this.time = e.time &&
                            Object.keys(e.time).length ? new a.Time(e.time) : a.time; this.styledMode = q.styledMode; this.hasCartesianSeries = q.showAxes; var l = this; l.index = n.length; n.push(l); a.chartCount++; k && y(k, function (b, c) { a.isFunction(b) && B(l, c, b) }); l.xAxis = []; l.yAxis = []; l.pointCount = l.colorCounter = l.symbolCounter = 0; c(l, "afterInit"); l.firstRender()
                        })
                }, initSeries: function (b) { var c = this.options.chart; (c = L[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0, this); c = new c; c.init(this, b); return c }, orderSeries: function (a) {
                    var b = this.series;
                    for (a = a || 0; a < b.length; a++)b[a] && (b[a].index = a, b[a].name = b[a].getName())
                }, isInsidePlot: function (a, b, c) { var e = c ? b : a; a = c ? a : b; return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight }, redraw: function (b) {
                    c(this, "beforeRedraw"); var e = this.axes, d = this.series, m = this.pointer, g = this.legend, q = this.userOptions.legend, k = this.isDirtyLegend, l, A, p = this.hasCartesianSeries, h = this.isDirtyBox, w, C = this.renderer, G = C.isHidden(), n = []; this.setResponsive && this.setResponsive(!1); a.setAnimation(b, this); G && this.temporaryDisplay();
                    this.layOutTitles(); for (b = d.length; b--;)if (w = d[b], w.options.stacking && (l = !0, w.isDirty)) { A = !0; break } if (A) for (b = d.length; b--;)w = d[b], w.options.stacking && (w.isDirty = !0); d.forEach(function (a) { a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), k = !0) : q && (q.labelFormatter || q.labelFormat) && (k = !0)); a.isDirtyData && c(a, "updatedData") }); k && g && g.options.enabled && (g.render(), this.isDirtyLegend = !1); l && this.getStacks(); p && e.forEach(function (a) { a.updateNames(); a.setScale() }); this.getMargins();
                    p && (e.forEach(function (a) { a.isDirty && (h = !0) }), e.forEach(function (a) { var b = a.min + "," + a.max; a.extKey !== b && (a.extKey = b, n.push(function () { c(a, "afterSetExtremes", f(a.eventArgs, a.getExtremes())); delete a.eventArgs })); (h || l) && a.redraw() })); h && this.drawChartBox(); c(this, "predraw"); d.forEach(function (a) { (h || a.isDirty) && a.visible && a.redraw(); a.isDirtyData = !1 }); m && m.reset(!0); C.draw(); c(this, "redraw"); c(this, "render"); G && this.temporaryDisplay(!0); n.forEach(function (a) { a.call() })
                }, get: function (a) {
                    function b(b) {
                        return b.id ===
                            a || b.options && b.options.id === a
                    } var c, f = this.series, d; c = e(this.axes, b) || e(this.series, b); for (d = 0; !c && d < f.length; d++)c = e(f[d].points || [], b); return c
                }, getAxes: function () { var a = this, b = this.options, e = b.xAxis = m(b.xAxis || {}), b = b.yAxis = m(b.yAxis || {}); c(this, "getAxes"); e.forEach(function (a, b) { a.index = b; a.isX = !0 }); b.forEach(function (a, b) { a.index = b }); e.concat(b).forEach(function (b) { new u(a, b) }); c(this, "afterGetAxes") }, getSelectedPoints: function () {
                    var a = []; this.series.forEach(function (b) {
                        a = a.concat((b[b.hasGroupedData ?
                            "points" : "data"] || []).filter(function (a) { return a.selected }))
                    }); return a
                }, getSelectedSeries: function () { return this.series.filter(function (a) { return a.selected }) }, setTitle: function (a, b, c) {
                    var e = this, f = e.options, d = e.styledMode, m; m = f.title = F(!d && { style: { color: "#333333", fontSize: f.isStock ? "16px" : "18px" } }, f.title, a); f = f.subtitle = F(!d && { style: { color: "#666666" } }, f.subtitle, b);[["title", a, m], ["subtitle", b, f]].forEach(function (a, b) {
                        var c = a[0], f = e[c], m = a[1]; a = a[2]; f && m && (e[c] = f = f.destroy()); a && !f && (e[c] = e.renderer.text(a.text,
                            0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), e[c].update = function (a) { e.setTitle(!b && a, b && a) }, d || e[c].css(a.style))
                    }); e.layOutTitles(c)
                }, layOutTitles: function (a) {
                    var b = 0, c, e = this.renderer, d = this.spacingBox;["title", "subtitle"].forEach(function (a) {
                        var c = this[a], m = this.options[a]; a = "title" === a ? -3 : m.verticalAlign ? 0 : b + 2; var g; c && (this.styledMode || (g = m.style.fontSize), g = e.fontMetrics(g, c).b, c.css({ width: (m.width || d.width + m.widthAdjust) + "px" }).align(f({ y: a + g }, m),
                            !1, "spacingBox"), m.floating || m.verticalAlign || (b = Math.ceil(b + c.getBBox(m.useHTML).height)))
                    }, this); c = this.titleOffset !== b; this.titleOffset = b; !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && C(a, !0) && this.isDirtyBox && this.redraw())
                }, getChartSize: function () {
                    var b = this.options.chart, c = b.width, b = b.height, e = this.renderTo; l(c) || (this.containerWidth = a.getStyle(e, "width")); l(b) || (this.containerHeight = a.getStyle(e, "height")); this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                    this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                }, temporaryDisplay: function (b) {
                    var c = this.renderTo; if (b) for (; c && c.style;)c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode; else for (; c && c.style;) {
                        d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c)); if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height, overflow: c.style.overflow
                        }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important"); c = c.parentNode; if (c === d.body) break
                    }
                }, setClassName: function (a) { this.container.className = "highcharts-container " + (a || "") }, getContainer: function () {
                    var b, e = this.options, m = e.chart, q, l; b = this.renderTo; var w = a.uniqueKey(), C, G; b || (this.renderTo = b = m.renderTo); p(b) && (this.renderTo = b = d.getElementById(b)); b || a.error(13,
                        !0, this); q = A(h(b, "data-highcharts-chart")); g(q) && n[q] && n[q].hasRendered && n[q].destroy(); h(b, "data-highcharts-chart", this.index); b.innerHTML = ""; m.skipClone || b.offsetWidth || this.temporaryDisplay(); this.getChartSize(); q = this.chartWidth; l = this.chartHeight; k(b, { overflow: "hidden" }); this.styledMode || (C = f({ position: "relative", overflow: "hidden", width: q + "px", height: l + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, m.style)); this.container = b = v("div", { id: w }, C,
                            b); this._cursor = b.style.cursor; this.renderer = new (a[m.renderer] || a.Renderer)(b, q, l, null, m.forExport, e.exporting && e.exporting.allowHTML, this.styledMode); this.setClassName(m.className); if (this.styledMode) for (G in e.defs) this.renderer.definition(e.defs[G]); else this.renderer.setStyle(m.style); this.renderer.chartIndex = this.index; c(this, "afterGetContainer")
                }, getMargins: function (a) {
                    var b = this.spacing, e = this.margin, f = this.titleOffset; this.resetMargins(); f && !l(e[0]) && (this.plotTop = Math.max(this.plotTop, f +
                        this.options.title.margin + b[0])); this.legend && this.legend.display && this.legend.adjustMargins(e, b); c(this, "getMargins"); a || this.getAxisMargins()
                }, getAxisMargins: function () { var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin; a.hasCartesianSeries && a.axes.forEach(function (a) { a.visible && a.getOffset() }); w.forEach(function (e, f) { l(c[f]) || (a[e] += b[f]) }); a.setChartSize() }, reflow: function (b) {
                    var c = this, e = c.options.chart, f = c.renderTo, m = l(e.width) && l(e.height), g = e.width || a.getStyle(f, "width"), e = e.height || a.getStyle(f,
                        "height"), f = b ? b.target : M; if (!m && !c.isPrinting && g && e && (f === M || f === d)) { if (g !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = z(function () { c.container && c.setSize(void 0, void 0, !1) }, b ? 100 : 0); c.containerWidth = g; c.containerHeight = e }
                }, setReflow: function (a) { var b = this; !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = B(M, "resize", function (a) { b.reflow(a) }), B(this, "destroy", this.unbindReflow)) }, setSize: function (b,
                    e, f) {
                        var d = this, m = d.renderer, g; d.isResizing += 1; a.setAnimation(f, d); d.oldChartHeight = d.chartHeight; d.oldChartWidth = d.chartWidth; void 0 !== b && (d.options.chart.width = b); void 0 !== e && (d.options.chart.height = e); d.getChartSize(); d.styledMode || (g = m.globalAnimation, (g ? E : k)(d.container, { width: d.chartWidth + "px", height: d.chartHeight + "px" }, g)); d.setChartSize(!0); m.setSize(d.chartWidth, d.chartHeight, f); d.axes.forEach(function (a) { a.isDirty = !0; a.setScale() }); d.isDirtyLegend = !0; d.isDirtyBox = !0; d.layOutTitles(); d.getMargins();
                    d.redraw(f); d.oldChartHeight = null; c(d, "resize"); z(function () { d && c(d, "endResize", null, function () { --d.isResizing }) }, D(g).duration)
                }, setChartSize: function (a) {
                    var b = this.inverted, e = this.renderer, f = this.chartWidth, d = this.chartHeight, m = this.options.chart, g = this.spacing, q = this.clipOffset, k, l, A, p; this.plotLeft = k = Math.round(this.plotLeft); this.plotTop = l = Math.round(this.plotTop); this.plotWidth = A = Math.max(0, Math.round(f - k - this.marginRight)); this.plotHeight = p = Math.max(0, Math.round(d - l - this.marginBottom)); this.plotSizeX =
                        b ? p : A; this.plotSizeY = b ? A : p; this.plotBorderWidth = m.plotBorderWidth || 0; this.spacingBox = e.spacingBox = { x: g[3], y: g[0], width: f - g[3] - g[1], height: d - g[0] - g[2] }; this.plotBox = e.plotBox = { x: k, y: l, width: A, height: p }; f = 2 * Math.floor(this.plotBorderWidth / 2); b = Math.ceil(Math.max(f, q[3]) / 2); e = Math.ceil(Math.max(f, q[0]) / 2); this.clipBox = { x: b, y: e, width: Math.floor(this.plotSizeX - Math.max(f, q[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, q[2]) / 2 - e)) }; a || this.axes.forEach(function (a) { a.setAxisSize(); a.setAxisTranslation() });
                    c(this, "afterSetChartSize", { skipAxes: a })
                }, resetMargins: function () { c(this, "resetMargins"); var a = this, e = a.options.chart;["margin", "spacing"].forEach(function (c) { var f = e[c], d = b(f) ? f : [f, f, f, f];["Top", "Right", "Bottom", "Left"].forEach(function (b, f) { a[c][f] = C(e[c + b], d[f]) }) }); w.forEach(function (b, c) { a[b] = C(a.margin[c], a.spacing[c]) }); a.axisOffset = [0, 0, 0, 0]; a.clipOffset = [0, 0, 0, 0] }, drawChartBox: function () {
                    var a = this.options.chart, b = this.renderer, e = this.chartWidth, f = this.chartHeight, d = this.chartBackground,
                    m = this.plotBackground, g = this.plotBorder, q, k = this.styledMode, l = this.plotBGImage, A = a.backgroundColor, p = a.plotBackgroundColor, h = a.plotBackgroundImage, w, C = this.plotLeft, G = this.plotTop, n = this.plotWidth, y = this.plotHeight, z = this.plotBox, r = this.clipRect, t = this.clipBox, L = "animate"; d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), L = "attr"); if (k) q = w = d.strokeWidth(); else {
                        q = a.borderWidth || 0; w = q + (a.shadow ? 8 : 0); A = { fill: A || "none" }; if (q || d["stroke-width"]) A.stroke = a.borderColor, A["stroke-width"] =
                            q; d.attr(A).shadow(a.shadow)
                    } d[L]({ x: w / 2, y: w / 2, width: e - w - q % 2, height: f - w - q % 2, r: a.borderRadius }); L = "animate"; m || (L = "attr", this.plotBackground = m = b.rect().addClass("highcharts-plot-background").add()); m[L](z); k || (m.attr({ fill: p || "none" }).shadow(a.plotShadow), h && (l ? l.animate(z) : this.plotBGImage = b.image(h, C, G, n, y).add())); r ? r.animate({ width: t.width, height: t.height }) : this.clipRect = b.clipRect(t); L = "animate"; g || (L = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
                    k || g.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" }); g[L](g.crisp({ x: C, y: G, width: n, height: y }, -g.strokeWidth())); this.isDirtyBox = !1; c(this, "afterDrawChartBox")
                }, propFromSeries: function () { var a = this, b = a.options.chart, c, e = a.options.series, f, d;["inverted", "angular", "polar"].forEach(function (m) { c = L[b.type || b.defaultSeriesType]; d = b[m] || c && c.prototype[m]; for (f = e && e.length; !d && f--;)(c = L[e[f].type]) && c.prototype[m] && (d = !0); a[m] = d }) }, linkSeries: function () {
                    var a = this, b = a.series;
                    b.forEach(function (a) { a.linkedSeries.length = 0 }); b.forEach(function (b) { var c = b.options.linkedTo; p(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = C(b.options.visible, c.options.visible, b.visible)) }); c(this, "afterLinkSeries")
                }, renderSeries: function () { this.series.forEach(function (a) { a.translate(); a.render() }) }, renderLabels: function () {
                    var a = this, b = a.options.labels; b.items && b.items.forEach(function (c) {
                        var e = f(b.style, c.style),
                        d = A(e.left) + a.plotLeft, m = A(e.top) + a.plotTop + 12; delete e.left; delete e.top; a.renderer.text(c.html, d, m).attr({ zIndex: 2 }).css(e).add()
                    })
                }, render: function () {
                    var a = this.axes, b = this.renderer, c = this.options, e = 0, f, d, m; this.setTitle(); this.legend = new H(this, c.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); c = this.plotWidth; a.some(function (a) { if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return e = 21, !0 }); f = this.plotHeight = Math.max(this.plotHeight - e, 0); a.forEach(function (a) { a.setScale() });
                    this.getAxisMargins(); d = 1.1 < c / this.plotWidth; m = 1.05 < f / this.plotHeight; if (d || m) a.forEach(function (a) { (a.horiz && d || !a.horiz && m) && a.setTickInterval(!0) }), this.getMargins(); this.drawChartBox(); this.hasCartesianSeries && a.forEach(function (a) { a.visible && a.render() }); this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries(); this.renderLabels(); this.addCredits(); this.setResponsive && this.setResponsive(); this.hasRendered = !0
                }, addCredits: function (a) {
                    var b = this; a = F(!0,
                        this.options.credits, a); a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { a.href && (M.location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (a) { b.credits = b.credits.destroy(); b.addCredits(a) })
                }, destroy: function () {
                    var b = this, e = b.axes, f = b.series, d = b.container, m, g = d && d.parentNode; c(b, "destroy");
                    b.renderer.forExport ? a.erase(n, b) : n[b.index] = void 0; a.chartCount--; b.renderTo.removeAttribute("data-highcharts-chart"); G(b); for (m = e.length; m--;)e[m] = e[m].destroy(); this.scroller && this.scroller.destroy && this.scroller.destroy(); for (m = f.length; m--;)f[m] = f[m].destroy(); "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) { var c = b[a]; c && c.destroy && (b[a] = c.destroy()) });
                    d && (d.innerHTML = "", G(d), g && r(d)); y(b, function (a, c) { delete b[c] })
                }, firstRender: function () { var b = this, e = b.options; if (!b.isReadyToRender || b.isReadyToRender()) { b.getContainer(); b.resetMargins(); b.setChartSize(); b.propFromSeries(); b.getAxes(); (a.isArray(e.series) ? e.series : []).forEach(function (a) { b.initSeries(a) }); b.linkSeries(); c(b, "beforeRender"); q && (b.pointer = new q(b, e)); b.render(); if (!b.renderer.imgCount && b.onload) b.onload(); b.temporaryDisplay(!0) } }, onload: function () {
                    this.callbacks.concat([this.callback]).forEach(function (a) {
                    a &&
                        void 0 !== this.index && a.apply(this, [this])
                    }, this); c(this, "load"); c(this, "render"); l(this.index) && this.setReflow(this.options.chart.reflow); this.onload = null
                }
            })
        }); K(I, "parts/Point.js", [I["parts/Globals.js"]], function (a) {
            var B, E = a.extend, D = a.erase, h = a.fireEvent, d = a.format, u = a.isArray, v = a.isNumber, t = a.pick, r = a.uniqueKey, n = a.defined, k = a.removeEvent; a.Point = B = function () { }; a.Point.prototype = {
                init: function (a, f, e) {
                this.series = a; this.applyOptions(f, e); this.id = n(this.id) ? this.id : r(); this.resolveColor(); a.chart.pointCount++;
                    h(this, "afterInit"); return this
                }, resolveColor: function () { var a = this.series, f; f = a.chart.options.chart.colorCount; var e = a.chart.styledMode; e || this.options.color || (this.color = a.color); a.options.colorByPoint ? (e || (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length), e = a.colorCounter, a.colorCounter++ , a.colorCounter === f && (a.colorCounter = 0)) : e = a.colorIndex; this.colorIndex = t(this.colorIndex, e) }, applyOptions: function (a, f) {
                    var e = this.series, c = e.options.pointValKey ||
                        e.pointValKey; a = B.prototype.optionsToObject.call(this, a); E(this, a); this.options = this.options ? E(this.options, a) : a; a.group && delete this.group; a.dataLabels && delete this.dataLabels; c && (this.y = this[c]); if (this.isNull = t(this.isValid && !this.isValid(), null === this.x || !v(this.y, !0))) this.formatPrefix = "null"; this.selected && (this.state = "select"); "name" in this && void 0 === f && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this)); void 0 === this.x && e && (this.x = void 0 === f ? e.autoIncrement(this) : f); return this
                }, setNestedProperty: function (d,
                    f, e) { e.split(".").reduce(function (c, e, b, d) { c[e] = d.length - 1 === b ? f : a.isObject(c[e], !0) ? c[e] : {}; return c[e] }, d); return d }, optionsToObject: function (d) {
                        var f = {}, e = this.series, c = e.options.keys, g = c || e.pointArrayMap || ["y"], b = g.length, k = 0, h = 0; if (v(d) || null === d) f[g[0]] = d; else if (u(d)) for (!c && d.length > b && (e = typeof d[0], "string" === e ? f.name = d[0] : "number" === e && (f.x = d[0]), k++); h < b;)c && void 0 === d[k] || (0 < g[h].indexOf(".") ? a.Point.prototype.setNestedProperty(f, d[k], g[h]) : f[g[h]] = d[k]), k++ , h++; else "object" === typeof d &&
                            (f = d, d.dataLabels && (e._hasPointLabels = !0), d.marker && (e._hasPointMarkers = !0)); return f
                    }, getClassName: function () { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "") }, getZone: function () {
                        var a =
                            this.series, f = a.zones, a = a.zoneAxis || "y", e = 0, c; for (c = f[e]; this[a] >= c.value;)c = f[++e]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor; return c
                    }, destroy: function () {
                        var a = this.series.chart, f = a.hoverPoints, e; a.pointCount--; f && (this.setState(), D(f, this), f.length || (a.hoverPoints = null)); if (this === a.hoverPoint) this.onMouseOut(); if (this.graphic || this.dataLabel || this.dataLabels) k(this), this.destroyElements(); this.legendItem && a.legend.destroyItem(this);
                        for (e in this) this[e] = null
                    }, destroyElements: function (a) { var f = this, e = [], c, d; a = a || { graphic: 1, dataLabel: 1 }; a.graphic && e.push("graphic", "shadowGroup"); a.dataLabel && e.push("dataLabel", "dataLabelUpper", "connector"); for (d = e.length; d--;)c = e[d], f[c] && (f[c] = f[c].destroy());["dataLabel", "connector"].forEach(function (b) { var c = b + "s"; a[b] && f[c] && (f[c].forEach(function (a) { a.element && a.destroy() }), delete f[c]) }) }, getLabelConfig: function () {
                        return {
                            x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex,
                            key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal
                        }
                    }, tooltipFormatter: function (a) {
                        var f = this.series, e = f.tooltipOptions, c = t(e.valueDecimals, ""), g = e.valuePrefix || "", b = e.valueSuffix || ""; f.chart.styledMode && (a = f.chart.tooltip.styledModeFormat(a)); (f.pointArrayMap || ["y"]).forEach(function (e) { e = "{point." + e; if (g || b) a = a.replace(RegExp(e + "}", "g"), g + e + "}" + b); a = a.replace(RegExp(e + "}", "g"), e + ":,." + c + "f}") }); return d(a, { point: this, series: this.series },
                            f.chart.time)
                    }, firePointEvent: function (a, f, e) { var c = this, d = this.series.options; (d.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents(); "click" === a && d.allowPointSelect && (e = function (a) { c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey) }); h(this, a, f, e) }, visible: !0
            }
        }); K(I, "parts/Series.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.animObject, D = a.arrayMax, h = a.arrayMin, d = a.correctFloat, u = a.defaultOptions, v = a.defaultPlotOptions, t = a.defined, r = a.erase,
            n = a.extend, k = a.fireEvent, l = a.isArray, f = a.isNumber, e = a.isString, c = a.merge, g = a.objectEach, b = a.pick, p = a.removeEvent, H = a.splat, w = a.SVGElement, F = a.syncTimeout, y = a.win; a.Series = a.seriesType("line", null, {
                lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", enabledThreshold: 2, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } },
                point: { events: {} }, dataLabels: { align: "center", formatter: function () { return null === this.y ? "" : a.numberFormat(this.y, -1) }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 50 }, opacity: .2 } }, stickyTracking: !0,
                turboThreshold: 1E3, findNearestPointBy: "x"
            }, {
                isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", cropShoulder: 1, init: function (c, e) {
                    k(this, "init", { options: e }); var f = this, d, q = c.series, m; f.chart = c; f.options = e = f.setOptions(e); f.linkedSeries = []; f.bindAxes(); n(f, { name: e.name, state: "", visible: !1 !== e.visible, selected: !0 === e.selected }); d = e.events; g(d, function (b, c) {
                    !a.isFunction(b) || f.hcEvents && f.hcEvents[c] &&
                        f.hcEvents[c].some(function (a) { return a.fn === b }) || B(f, c, b)
                    }); if (d && d.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) c.runTrackerClick = !0; f.getColor(); f.getSymbol(); f.parallelArrays.forEach(function (a) { f[a + "Data"] || (f[a + "Data"] = []) }); f.points || f.setData(e.data, !1); f.isCartesian && (c.hasCartesianSeries = !0); q.length && (m = q[q.length - 1]); f._i = b(m && m._i, -1) + 1; c.orderSeries(this.insert(q)); k(this, "afterInit")
                }, insert: function (a) {
                    var c = this.options.index, e; if (f(c)) {
                        for (e = a.length; e--;)if (c >=
                            b(a[e].options.index, a[e]._i)) { a.splice(e + 1, 0, this); break } -1 === e && a.unshift(this); e += 1
                    } else a.push(this); return b(e, a.length - 1)
                }, bindAxes: function () { var b = this, c = b.options, e = b.chart, f; k(this, "bindAxes", null, function () { (b.axisTypes || []).forEach(function (d) { e[d].forEach(function (a) { f = a.options; if (c[d] === f.index || void 0 !== c[d] && c[d] === f.id || void 0 === c[d] && 0 === f.index) b.insert(a.series), b[d] = a, a.isDirty = !0 }); b[d] || b.optionalAxis === d || a.error(18, !0, e) }) }) }, updateParallelArrays: function (a, b) {
                    var c = a.series,
                    e = arguments, d = f(b) ? function (e) { var f = "y" === e && c.toYData ? c.toYData(a) : a[e]; c[e + "Data"][b] = f } : function (a) { Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2)) }; c.parallelArrays.forEach(d)
                }, hasData: function () { return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length }, autoIncrement: function () {
                    var a = this.options, c = this.xIncrement, e, f = a.pointIntervalUnit, d = this.chart.time, c = b(c, a.pointStart, 0); this.pointInterval = e = b(this.pointInterval,
                        a.pointInterval, 1); f && (a = new d.Date(c), "day" === f ? d.set("Date", a, d.get("Date", a) + e) : "month" === f ? d.set("Month", a, d.get("Month", a) + e) : "year" === f && d.set("FullYear", a, d.get("FullYear", a) + e), e = a.getTime() - c); this.xIncrement = c + e; return c
                }, setOptions: function (a) {
                    var e = this.chart, f = e.options, d = f.plotOptions, g = e.userOptions || {}; a = c(a); var e = e.styledMode, m = { plotOptions: d, userOptions: a }; k(this, "setOptions", m); var q = g.plotOptions || {}, h = m.plotOptions[this.type]; this.userOptions = m.userOptions; g = c(h, d.series, g.plotOptions &&
                        g.plotOptions[this.type], a); this.tooltipOptions = c(u.tooltip, u.plotOptions.series && u.plotOptions.series.tooltip, u.plotOptions[this.type].tooltip, f.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip); this.stickyTracking = b(a.stickyTracking, q[this.type] && q[this.type].stickyTracking, q.series && q.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : g.stickyTracking); null === h.marker && delete g.marker; this.zoneAxis = g.zoneAxis; f = this.zones = (g.zones || []).slice();
                    !g.negativeColor && !g.negativeFillColor || g.zones || (d = { value: g[this.zoneAxis + "Threshold"] || g.threshold || 0, className: "highcharts-negative" }, e || (d.color = g.negativeColor, d.fillColor = g.negativeFillColor), f.push(d)); f.length && t(f[f.length - 1].value) && f.push(e ? {} : { color: this.color, fillColor: this.fillColor }); k(this, "afterSetOptions", { options: g }); return g
                }, getName: function () { return b(this.options.name, "Series " + (this.index + 1)) }, getCyclic: function (a, c, e) {
                    var f, d = this.chart, m = this.userOptions, g = a + "Index", q = a +
                        "Counter", k = e ? e.length : b(d.options.chart[a + "Count"], d[a + "Count"]); c || (f = b(m[g], m["_" + g]), t(f) || (d.series.length || (d[q] = 0), m["_" + g] = f = d[q] % k, d[q] += 1), e && (c = e[f])); void 0 !== f && (this[g] = f); this[a] = c
                }, getColor: function () { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || v[this.type].color, this.chart.options.colors) }, getSymbol: function () { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols) },
                    findPointIndex: function (a, b) { var c = a.id; a = a.x; var e = this.points, d, m; c && (m = (c = this.chart.get(c)) && c.index, void 0 !== m && (d = !0)); void 0 === m && f(a) && (m = this.xData.indexOf(a, b)); -1 !== m && void 0 !== m && this.cropped && (m = m >= this.cropStart ? m - this.cropStart : m); !d && e[m] && e[m].touched && (m = void 0); return m }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, updateData: function (b) {
                        var c = this.options, e = this.points, d = [], g, m, q, k = this.requireSorting, h = b.length === e.length, p = !0; this.xIncrement = null; b.forEach(function (b,
                            m) { var p, l = a.defined(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {}; p = l.x; if (l.id || f(p)) if (p = this.findPointIndex(l, q), -1 === p || void 0 === p ? d.push(b) : e[p] && b !== c.data[p] ? (e[p].update(b, !1, null, !1), e[p].touched = !0, k && (q = p + 1)) : e[p] && (e[p].touched = !0), !h || m !== p || this.hasDerivedData) g = !0 }, this); if (g) for (b = e.length; b--;)(m = e[b]) && !m.touched && m.remove(!1); else h ? b.forEach(function (a, b) { e[b].update && a !== e[b].y && e[b].update(a, !1, null, !1) }) : p = !1; e.forEach(function (a) { a && (a.touched = !1) });
                        if (!p) return !1; d.forEach(function (a) { this.addPoint(a, !1, null, null, !1) }, this); return !0
                    }, setData: function (c, d, g, k) {
                        var q = this, m = q.points, h = m && m.length || 0, p, w = q.options, A = q.chart, C = null, n = q.xAxis, y = w.turboThreshold, G = this.xData, r = this.yData, t = (p = q.pointArrayMap) && p.length, F = w.keys, v = 0, u = 1, H; c = c || []; p = c.length; d = b(d, !0); !1 !== k && p && h && !q.cropped && !q.hasGroupedData && q.visible && !q.isSeriesBoosting && (H = this.updateData(c)); if (!H) {
                        q.xIncrement = null; q.colorCounter = 0; this.parallelArrays.forEach(function (a) {
                            q[a +
                            "Data"].length = 0
                        }); if (y && p > y) { for (g = 0; null === C && g < p;)C = c[g], g++; if (f(C)) for (g = 0; g < p; g++)G[g] = this.autoIncrement(), r[g] = c[g]; else if (l(C)) if (t) for (g = 0; g < p; g++)C = c[g], G[g] = C[0], r[g] = C.slice(1, t + 1); else for (F && (v = F.indexOf("x"), u = F.indexOf("y"), v = 0 <= v ? v : 0, u = 0 <= u ? u : 1), g = 0; g < p; g++)C = c[g], G[g] = C[v], r[g] = C[u]; else a.error(12, !1, A) } else for (g = 0; g < p; g++)void 0 !== c[g] && (C = { series: q }, q.pointClass.prototype.applyOptions.apply(C, [c[g]]), q.updateParallelArrays(C, g)); r && e(r[0]) && a.error(14, !0, A); q.data = []; q.options.data =
                            q.userOptions.data = c; for (g = h; g--;)m[g] && m[g].destroy && m[g].destroy(); n && (n.minRange = n.userMinRange); q.isDirty = A.isDirtyBox = !0; q.isDirtyData = !!m; g = !1
                        } "point" === w.legendType && (this.processData(), this.generatePoints()); d && A.redraw(g)
                    }, processData: function (b) {
                        var c = this.xData, e = this.yData, f = c.length, d; d = 0; var g, q, k = this.xAxis, h, p = this.options; h = p.cropThreshold; var l = this.getExtremesFromAll || p.getExtremesFromAll, w = this.isCartesian, p = k && k.val2lin, n = k && k.isLog, y = this.requireSorting, r, t; if (w && !this.isDirty &&
                            !k.isDirty && !this.yAxis.isDirty && !b) return !1; k && (b = k.getExtremes(), r = b.min, t = b.max); w && this.sorted && !l && (!h || f > h || this.forceCrop) && (c[f - 1] < r || c[0] > t ? (c = [], e = []) : this.yData && (c[0] < r || c[f - 1] > t) && (d = this.cropData(this.xData, this.yData, r, t), c = d.xData, e = d.yData, d = d.start, g = !0)); for (h = c.length || 1; --h;)f = n ? p(c[h]) - p(c[h - 1]) : c[h] - c[h - 1], 0 < f && (void 0 === q || f < q) ? q = f : 0 > f && y && (a.error(15, !1, this.chart), y = !1); this.cropped = g; this.cropStart = d; this.processedXData = c; this.processedYData = e; this.closestPointRange = q
                    },
                    cropData: function (a, c, e, f, d) { var g = a.length, q = 0, k = g, h; d = b(d, this.cropShoulder); for (h = 0; h < g; h++)if (a[h] >= e) { q = Math.max(0, h - d); break } for (e = h; e < g; e++)if (a[e] > f) { k = e + d; break } return { xData: a.slice(q, k), yData: c.slice(q, k), start: q, end: k } }, generatePoints: function () {
                        var a = this.options, b = a.data, c = this.data, e, f = this.processedXData, d = this.processedYData, g = this.pointClass, h = f.length, p = this.cropStart || 0, l, w = this.hasGroupedData, a = a.keys, y, r = [], t; c || w || (c = [], c.length = b.length, c = this.data = c); a && w && (this.options.keys =
                            !1); for (t = 0; t < h; t++)l = p + t, w ? (y = (new g).init(this, [f[t]].concat(H(d[t]))), y.dataGroup = this.groupMap[t], y.dataGroup.options && (y.options = y.dataGroup.options, n(y, y.dataGroup.options), delete y.dataLabels)) : (y = c[l]) || void 0 === b[l] || (c[l] = y = (new g).init(this, b[l], f[t])), y && (y.index = l, r[t] = y); this.options.keys = a; if (c && (h !== (e = c.length) || w)) for (t = 0; t < e; t++)t !== p || w || (t += h), c[t] && (c[t].destroyElements(), c[t].plotX = void 0); this.data = c; this.points = r; k(this, "afterGeneratePoints")
                    }, getXExtremes: function (a) {
                        return {
                            min: h(a),
                            max: D(a)
                        }
                    }, getExtremes: function (a) {
                        var b = this.yAxis, c = this.processedXData, e, d = [], g = 0; e = this.xAxis.getExtremes(); var q = e.min, p = e.max, w, y, n = this.requireSorting ? this.cropShoulder : 0, r, t; a = a || this.stackedYData || this.processedYData || []; e = a.length; for (t = 0; t < e; t++)if (y = c[t], r = a[t], w = (f(r, !0) || l(r)) && (!b.positiveValuesOnly || r.length || 0 < r), y = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[t + n] || y) >= q && (c[t - n] || y) <= p, w && y) if (w = r.length) for (; w--;)"number" === typeof r[w] && (d[g++] = r[w]);
                        else d[g++] = r; this.dataMin = h(d); this.dataMax = D(d); k(this, "afterGetExtremes")
                    }, translate: function () {
                    this.processedXData || this.processData(); this.generatePoints(); var a = this.options, c = a.stacking, e = this.xAxis, g = e.categories, h = this.yAxis, m = this.points, p = m.length, w = !!this.modifyValue, y, n = this.pointPlacementToXValue(), r = f(n), F = a.threshold, v = a.startFromThreshold ? F : 0, u, H, B, D, E = this.zoneAxis || "y", I = Number.MAX_VALUE; for (y = 0; y < p; y++) {
                        var K = m[y], W = K.x; H = K.y; var V = K.low, P = c && h.stacks[(this.negStacks && H < (v ? 0 : F) ?
                            "-" : "") + this.stackKey], X, Y; h.positiveValuesOnly && null !== H && 0 >= H && (K.isNull = !0); K.plotX = u = d(Math.min(Math.max(-1E5, e.translate(W, 0, 0, 0, 1, n, "flags" === this.type)), 1E5)); c && this.visible && !K.isNull && P && P[W] && (D = this.getStackIndicator(D, W, this.index), X = P[W], Y = X.points[D.key]); l(Y) && (V = Y[0], H = Y[1], V === v && D.key === P[W].base && (V = b(f(F) && F, h.min)), h.positiveValuesOnly && 0 >= V && (V = null), K.total = K.stackTotal = X.total, K.percentage = X.total && K.y / X.total * 100, K.stackY = H, X.setOffset(this.pointXOffset || 0, this.barW || 0));
                        K.yBottom = t(V) ? Math.min(Math.max(-1E5, h.translate(V, 0, 1, 0, 1)), 1E5) : null; w && (H = this.modifyValue(H, K)); K.plotY = H = "number" === typeof H && Infinity !== H ? Math.min(Math.max(-1E5, h.translate(H, 0, 1, 0, 1)), 1E5) : void 0; K.isInside = void 0 !== H && 0 <= H && H <= h.len && 0 <= u && u <= e.len; K.clientX = r ? d(e.translate(W, 0, 0, 0, 1, n)) : u; K.negative = K[E] < (a[E + "Threshold"] || F || 0); K.category = g && void 0 !== g[K.x] ? g[K.x] : K.x; K.isNull || (void 0 !== B && (I = Math.min(I, Math.abs(u - B))), B = u); K.zone = this.zones.length && K.getZone()
                    } this.closestPointRangePx =
                        I; k(this, "afterTranslate")
                    }, getValidPoints: function (a, b, c) { var e = this.chart; return (a || this.points || []).filter(function (a) { return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : c || !a.isNull }) }, getClipBox: function (a, b) {
                        var c = this.options, e = this.chart, f = e.inverted, d = this.xAxis, g = d && this.yAxis; a && !1 === c.clip && g ? a = f ? { y: -e.chartWidth + g.len + g.pos, height: e.chartWidth, width: e.chartHeight, x: -e.chartHeight + d.len + d.pos } : { y: -g.pos, height: e.chartHeight, width: e.chartWidth, x: -d.pos } : (a = this.clipBox || e.clipBox,
                            b && (a.width = e.plotSizeX, a.x = 0)); return b ? { width: a.width, x: a.x } : a
                    }, setClip: function (a) {
                        var b = this.chart, c = this.options, e = b.renderer, f = b.inverted, d = this.clipBox, g = this.getClipBox(a), q = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(), k = b[q], h = b[q + "m"]; k || (a && (g.width = 0, f && (g.x = b.plotSizeX + (!1 !== c.clip ? 0 : b.plotTop)), b[q + "m"] = h = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[q] = k = e.clipRect(g), k.count = { length: 0 });
                        a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1); if (!1 !== c.clip || a) this.group.clip(a || d ? k : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey = q; a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && q && b[q] && (d || (b[q] = b[q].destroy()), b[q + "m"] && (b[q + "m"] = b[q + "m"].destroy())))
                    }, animate: function (a) {
                        var b = this.chart, c = E(this.options.animation), e, f; a ? this.setClip(c) : (e = this.sharedClipKey, a = b[e], f = this.getClipBox(c, !0), a && a.animate(f, c), b[e + "m"] &&
                            b[e + "m"].animate({ width: f.width + 99, x: f.x - (b.inverted ? 0 : 99) }, c), this.animate = null)
                    }, afterAnimate: function () { this.setClip(); k(this, "afterAnimate"); this.finishedAnimating = !0 }, drawPoints: function () {
                        var a = this.points, c = this.chart, e, f, d, g, k, h = this.options.marker, p, l, w, y = this[this.specialGroup] || this.markerGroup; e = this.xAxis; var n, r = b(h.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= h.enabledThreshold * h.radius); if (!1 !== h.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++)if (f = a[e], k = (g = f.graphic) ?
                            "animate" : "attr", p = f.marker || {}, l = !!f.marker, d = r && void 0 === p.enabled || p.enabled, w = !1 !== f.isInside, d && !f.isNull) { d = b(p.symbol, this.symbol); n = this.markerAttribs(f, f.selected && "select"); g ? g[w ? "show" : "hide"](!0).animate(n) : w && (0 < n.width || f.hasImage) && (f.graphic = g = c.renderer.symbol(d, n.x, n.y, n.width, n.height, l ? p : h).add(y)); if (g && !c.styledMode) g[k](this.pointAttribs(f, f.selected && "select")); g && g.addClass(f.getClassName(), !0) } else g && (f.graphic = g.destroy())
                    }, markerAttribs: function (a, c) {
                        var e = this.options.marker,
                        f = a.marker || {}, d = f.symbol || e.symbol, g = b(f.radius, e.radius); c && (e = e.states[c], c = f.states && f.states[c], g = b(c && c.radius, e && e.radius, g + (e && e.radiusPlus || 0))); a.hasImage = d && 0 === d.indexOf("url"); a.hasImage && (g = 0); a = { x: Math.floor(a.plotX) - g, y: a.plotY - g }; g && (a.width = a.height = 2 * g); return a
                    }, pointAttribs: function (a, c) {
                        var e = this.options.marker, f = a && a.options, d = f && f.marker || {}, g = this.color, k = f && f.color, q = a && a.color, f = b(d.lineWidth, e.lineWidth), h = a && a.zone && a.zone.color; a = 1; g = k || h || q || g; k = d.fillColor || e.fillColor ||
                            g; g = d.lineColor || e.lineColor || g; c = c || "normal"; e = e.states[c]; c = d.states && d.states[c] || {}; f = b(c.lineWidth, e.lineWidth, f + b(c.lineWidthPlus, e.lineWidthPlus, 0)); k = c.fillColor || e.fillColor || k; g = c.lineColor || e.lineColor || g; a = b(c.opacity, e.opacity, a); return { stroke: g, "stroke-width": f, fill: k, opacity: a }
                    }, destroy: function (b) {
                        var c = this, e = c.chart, f = /AppleWebKit\/533/.test(y.navigator.userAgent), d, m, q = c.data || [], h, l; k(c, "destroy"); b || p(c); (c.axisTypes || []).forEach(function (a) {
                        (l = c[a]) && l.series && (r(l.series, c),
                            l.isDirty = l.forceRedraw = !0)
                        }); c.legendItem && c.chart.legend.destroyItem(c); for (m = q.length; m--;)(h = q[m]) && h.destroy && h.destroy(); c.points = null; a.clearTimeout(c.animationTimeout); g(c, function (a, b) { a instanceof w && !a.survive && (d = f && "group" === b ? "hide" : "destroy", a[d]()) }); e.hoverSeries === c && (e.hoverSeries = null); r(e.series, c); e.orderSeries(); g(c, function (a, e) { b && "hcEvents" === e || delete c[e] })
                    }, getGraphPath: function (a, b, c) {
                        var e = this, f = e.options, d = f.step, g, k = [], q = [], h; a = a || e.points; (g = a.reversed) && a.reverse();
                        (d = { right: 1, center: 2 }[d] || d && 3) && g && (d = 4 - d); !f.connectNulls || b || c || (a = this.getValidPoints(a)); a.forEach(function (g, m) {
                            var p = g.plotX, l = g.plotY, w = a[m - 1]; (g.leftCliff || w && w.rightCliff) && !c && (h = !0); g.isNull && !t(b) && 0 < m ? h = !f.connectNulls : g.isNull && !b ? h = !0 : (0 === m || h ? m = ["M", g.plotX, g.plotY] : e.getPointSpline ? m = e.getPointSpline(a, g, m) : d ? (m = 1 === d ? ["L", w.plotX, l] : 2 === d ? ["L", (w.plotX + p) / 2, w.plotY, "L", (w.plotX + p) / 2, l] : ["L", p, w.plotY], m.push("L", p, l)) : m = ["L", p, l], q.push(g.x), d && (q.push(g.x), 2 === d && q.push(g.x)),
                                k.push.apply(k, m), h = !1)
                        }); k.xMap = q; return e.graphPath = k
                    }, drawGraph: function () {
                        var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this), e = this.chart.styledMode, f = [["graph", "highcharts-graph"]]; e || f[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle); f = a.getZonesGraphs(f); f.forEach(function (f, d) {
                            var g = f[0], m = a[g], k = m ? "animate" : "attr"; m ? (m.endX = a.preventGraphAnimation ? null : c.xMap, m.animate({ d: c })) : c.length && (a[g] = m = a.chart.renderer.path(c).addClass(f[1]).attr({ zIndex: 1 }).add(a.group));
                            m && !e && (g = { stroke: f[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, f[3] ? g.dashstyle = f[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), m[k](g).shadow(2 > d && b.shadow)); m && (m.startX = c.xMap, m.isArea = c.isArea)
                        })
                    }, getZonesGraphs: function (a) {
                        this.zones.forEach(function (b, c) { c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")]; this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle); a.push(c) }, this);
                        return a
                    }, applyZones: function () {
                        var a = this, c = this.chart, e = c.renderer, f = this.zones, d, g, k = this.clips || [], h, p = this.graph, l = this.area, w = Math.max(c.chartWidth, c.chartHeight), y = this[(this.zoneAxis || "y") + "Axis"], n, r, t = c.inverted, F, v, H, u, B = !1; f.length && (p || l) && y && void 0 !== y.min ? (r = y.reversed, F = y.horiz, p && !this.showLine && p.hide(), l && l.hide(), n = y.getExtremes(), f.forEach(function (f, m) {
                            d = r ? F ? c.plotWidth : 0 : F ? 0 : y.toPixels(n.min) || 0; d = Math.min(Math.max(b(g, d), 0), w); g = Math.min(Math.max(Math.round(y.toPixels(b(f.value,
                                n.max), !0) || 0), 0), w); B && (d = g = y.toPixels(n.max)); v = Math.abs(d - g); H = Math.min(d, g); u = Math.max(d, g); y.isXAxis ? (h = { x: t ? u : H, y: 0, width: v, height: w }, F || (h.x = c.plotHeight - h.x)) : (h = { x: 0, y: t ? u : H, width: w, height: v }, F && (h.y = c.plotWidth - h.y)); t && e.isVML && (h = y.isXAxis ? { x: 0, y: r ? H : u, height: h.width, width: c.chartWidth } : { x: h.y - c.plotLeft - c.spacingBox.x, y: 0, width: h.height, height: c.chartHeight }); k[m] ? k[m].animate(h) : k[m] = e.clipRect(h); p && a["zone-graph-" + m].clip(k[m]); l && a["zone-area-" + m].clip(k[m]); B = f.value > n.max; a.resetZones &&
                                    0 === g && (g = void 0)
                        }), this.clips = k) : a.visible && (p && p.show(!0), l && l.show(!0))
                    }, invertGroups: function (a) { function b() { ["group", "markerGroup"].forEach(function (b) { c[b] && (e.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)) }) } var c = this, e = c.chart, f; c.xAxis && (f = B(e, "resize", b), B(c, "destroy", f), b(a), c.invertGroups = b) }, plotGroup: function (a, b, c, e, f) {
                        var d = this[a], g = !d; g && (this[a] = d = this.chart.renderer.g().attr({ zIndex: e || .1 }).add(f));
                        d.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (t(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); d.attr({ visibility: c })[g ? "attr" : "animate"](this.getPlotBox()); return d
                    }, getPlotBox: function () { var a = this.chart, b = this.xAxis, c = this.yAxis; a.inverted && (b = c, c = this.xAxis); return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 } },
                    render: function () {
                        var a = this, b = a.chart, c, e = a.options, f = !!a.animate && b.renderer.isSVG && E(e.animation).duration, d = a.visible ? "inherit" : "hidden", g = e.zIndex, h = a.hasRendered, p = b.seriesGroup, l = b.inverted; k(this, "render"); c = a.plotGroup("group", "series", d, g, p); a.markerGroup = a.plotGroup("markerGroup", "markers", d, g, p); f && a.animate(!0); c.inverted = a.isCartesian || a.invertable ? l : !1; a.drawGraph && (a.drawGraph(), a.applyZones()); a.visible && a.drawPoints(); a.drawDataLabels && a.drawDataLabels(); a.redrawPoints && a.redrawPoints();
                        a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker(); a.invertGroups(l); !1 === e.clip || a.sharedClipKey || h || c.clip(b.clipRect); f && a.animate(); h || (a.animationTimeout = F(function () { a.afterAnimate() }, f)); a.isDirty = !1; a.hasRendered = !0; k(a, "afterRender")
                    }, redraw: function () {
                        var a = this.chart, c = this.isDirty || this.isDirtyData, e = this.group, f = this.xAxis, d = this.yAxis; e && (a.inverted && e.attr({ width: a.plotWidth, height: a.plotHeight }), e.animate({ translateX: b(f && f.left, a.plotLeft), translateY: b(d && d.top, a.plotTop) }));
                        this.translate(); this.render(); c && delete this.kdTree
                    }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (a, b) { var c = this.xAxis, e = this.yAxis, f = this.chart.inverted; return this.searchKDTree({ clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos }, b, a) }, buildKDTree: function (a) {
                        function b(a, e, f) {
                            var d, g; if (g = a && a.length) return d = c.kdAxisArray[e % f], a.sort(function (a, b) { return a[d] - b[d] }), g = Math.floor(g / 2), {
                                point: a[g], left: b(a.slice(0, g), e + 1, f), right: b(a.slice(g + 1), e +
                                    1, f)
                            }
                        } this.buildingKdTree = !0; var c = this, e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1; delete c.kdTree; F(function () { c.kdTree = b(c.getValidPoints(null, !c.directTouch), e, e); c.buildingKdTree = !1 }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                    }, searchKDTree: function (a, b, c) {
                        function e(a, b, c, m) {
                            var h = b.point, p = f.kdAxisArray[c % m], q, l, w = h; l = t(a[d]) && t(h[d]) ? Math.pow(a[d] - h[d], 2) : null; q = t(a[g]) && t(h[g]) ? Math.pow(a[g] - h[g], 2) : null; q = (l || 0) + (q || 0); h.dist = t(q) ? Math.sqrt(q) : Number.MAX_VALUE; h.distX = t(l) ? Math.sqrt(l) :
                                Number.MAX_VALUE; p = a[p] - h[p]; q = 0 > p ? "left" : "right"; l = 0 > p ? "right" : "left"; b[q] && (q = e(a, b[q], c + 1, m), w = q[k] < w[k] ? q : h); b[l] && Math.sqrt(p * p) < w[k] && (a = e(a, b[l], c + 1, m), w = a[k] < w[k] ? a : w); return w
                        } var f = this, d = this.kdAxisArray[0], g = this.kdAxisArray[1], k = b ? "distX" : "dist"; b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(c); if (this.kdTree) return e(a, this.kdTree, b, b)
                    }, pointPlacementToXValue: function () {
                        var a = this.options.pointPlacement; "between" === a && (a = .5); f(a) &&
                            (a *= b(this.options.pointRange || this.xAxis.pointRange)); return a
                    }
                })
        }); K(I, "parts/Dynamics.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.animate, D = a.Axis, h = a.Chart, d = a.createElement, u = a.css, v = a.defined, t = a.erase, r = a.extend, n = a.fireEvent, k = a.isNumber, l = a.isObject, f = a.isArray, e = a.merge, c = a.objectEach, g = a.pick, b = a.Point, p = a.Series, H = a.seriesTypes, w = a.setAnimation, F = a.splat; a.cleanRecursively = function (b, e) {
                var f = {}; c(b, function (c, d) {
                    if (l(b[d], !0) && !b.nodeType && e[d]) c = a.cleanRecursively(b[d],
                        e[d]), Object.keys(c).length && (f[d] = c); else if (l(b[d]) || b[d] !== e[d]) f[d] = b[d]
                }); return f
            }; r(h.prototype, {
                addSeries: function (a, b, c) { var e, f = this; a && (b = g(b, !0), n(f, "addSeries", { options: a }, function () { e = f.initSeries(a); f.isDirtyLegend = !0; f.linkSeries(); n(f, "afterAddSeries", { series: e }); b && f.redraw(c) })); return e }, addAxis: function (a, b, c, f) { var d = b ? "xAxis" : "yAxis", k = this.options; a = e(a, { index: this[d].length, isX: b }); b = new D(this, a); k[d] = F(k[d] || {}); k[d].push(a); g(c, !0) && this.redraw(f); return b }, showLoading: function (a) {
                    var b =
                        this, c = b.options, e = b.loadingDiv, f = c.loading, g = function () { e && u(e, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" }) }; e || (b.loadingDiv = e = d("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = d("span", { className: "highcharts-loading-inner" }, null, e), B(b, "redraw", g)); e.className = "highcharts-loading"; b.loadingSpan.innerHTML = a || c.lang.loading; b.styledMode || (u(e, r(f.style, { zIndex: 10 })), u(b.loadingSpan, f.labelStyle), b.loadingShown ||
                            (u(e, { opacity: 0, display: "" }), E(e, { opacity: f.style.opacity || .5 }, { duration: f.showDuration || 0 }))); b.loadingShown = !0; g()
                }, hideLoading: function () { var a = this.options, b = this.loadingDiv; b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || E(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { u(b, { display: "none" }) } })); this.loadingShown = !1 }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "), propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "), collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "), update: function (b, f, d, h) {
                    var p = this, l = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" }, m, w, q, r, y = []; n(p, "update", { options: b }); b.isResponsiveOptions ||
                        p.setResponsive(!1, !0); b = a.cleanRecursively(b, p.options); e(!0, p.userOptions, b); if (m = b.chart) {
                            e(!0, p.options.chart, m); "className" in m && p.setClassName(m.className); "reflow" in m && p.setReflow(m.reflow); if ("inverted" in m || "polar" in m || "type" in m) p.propFromSeries(), w = !0; "alignTicks" in m && (w = !0); c(m, function (a, b) { -1 !== p.propsRequireUpdateSeries.indexOf("chart." + b) && (q = !0); -1 !== p.propsRequireDirtyBox.indexOf(b) && (p.isDirtyBox = !0); -1 !== p.propsRequireReflow.indexOf(b) && (r = !0) }); !p.styledMode && "style" in m &&
                                p.renderer.setStyle(m.style)
                        } !p.styledMode && b.colors && (this.options.colors = b.colors); b.plotOptions && e(!0, this.options.plotOptions, b.plotOptions); b.time && this.time === a.time && (this.time = new a.Time(b.time)); c(b, function (a, b) { if (p[b] && "function" === typeof p[b].update) p[b].update(a, !1); else if ("function" === typeof p[l[b]]) p[l[b]](a); "chart" !== b && -1 !== p.propsRequireUpdateSeries.indexOf(b) && (q = !0) }); this.collectionsWithUpdate.forEach(function (a) {
                            var c; b[a] && ("series" === a && (c = [], p[a].forEach(function (a, b) {
                                a.options.isInternal ||
                                c.push(g(a.options.index, b))
                            })), F(b[a]).forEach(function (b, e) { (e = v(b.id) && p.get(b.id) || p[a][c ? c[e] : e]) && e.coll === a && (e.update(b, !1), d && (e.touched = !0)); !e && d && p.collectionsWithInit[a] && (p.collectionsWithInit[a][0].apply(p, [b].concat(p.collectionsWithInit[a][1] || []).concat([!1])).touched = !0) }), d && p[a].forEach(function (a) { a.touched || a.options.isInternal ? delete a.touched : y.push(a) }))
                        }); y.forEach(function (a) { a.remove && a.remove(!1) }); w && p.axes.forEach(function (a) { a.update({}, !1) }); q && p.series.forEach(function (a) {
                            a.update({},
                                !1)
                        }); b.loading && e(!0, p.options.loading, b.loading); w = m && m.width; m = m && m.height; a.isString(m) && (m = a.relativeLength(m, w || p.chartWidth)); r || k(w) && w !== p.chartWidth || k(m) && m !== p.chartHeight ? p.setSize(w, m, h) : g(f, !0) && p.redraw(h); n(p, "afterUpdate", { options: b, redraw: f, animation: h })
                }, setSubtitle: function (a) { this.setTitle(void 0, a) }
            }); h.prototype.collectionsWithInit = { xAxis: [h.prototype.addAxis, [!0]], yAxis: [h.prototype.addAxis, [!1]], series: [h.prototype.addSeries] }; r(b.prototype, {
                update: function (a, b, c, e) {
                    function f() {
                        d.applyOptions(a);
                        null === d.y && k && (d.graphic = k.destroy()); l(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (d.graphic = k.destroy()), a && a.dataLabels && d.dataLabel && (d.dataLabel = d.dataLabel.destroy()), d.connector && (d.connector = d.connector.destroy())); p = d.index; m.updateParallelArrays(d, p); w.data[p] = l(w.data[p], !0) || l(a, !0) ? d.options : g(a, w.data[p]); m.isDirty = m.isDirtyData = !0; !m.fixedBox && m.hasCartesianSeries && (h.isDirtyBox = !0); "point" === w.legendType && (h.isDirtyLegend = !0); b && h.redraw(c)
                    } var d = this, m = d.series,
                        k = d.graphic, p, h = m.chart, w = m.options; b = g(b, !0); !1 === e ? f() : d.firePointEvent("update", { options: a }, f)
                }, remove: function (a, b) { this.series.removePoint(this.series.data.indexOf(this), a, b) }
            }); r(p.prototype, {
                addPoint: function (a, b, c, e, f) {
                    var d = this.options, m = this.data, k = this.chart, p = this.xAxis, p = p && p.hasNames && p.names, h = d.data, l, w = this.xData, q, r, y; b = g(b, !0); l = { series: this }; this.pointClass.prototype.applyOptions.apply(l, [a]); y = l.x; r = w.length; if (this.requireSorting && y < w[r - 1]) for (q = !0; r && w[r - 1] > y;)r--; this.updateParallelArrays(l,
                        "splice", r, 0, 0); this.updateParallelArrays(l, r); p && l.name && (p[y] = l.name); h.splice(r, 0, a); q && (this.data.splice(r, 0, null), this.processData()); "point" === d.legendType && this.generatePoints(); c && (m[0] && m[0].remove ? m[0].remove(!1) : (m.shift(), this.updateParallelArrays(l, "shift"), h.shift())); !1 !== f && n(this, "addPoint", { point: l }); this.isDirtyData = this.isDirty = !0; b && k.redraw(e)
                }, removePoint: function (a, b, c) {
                    var e = this, f = e.data, d = f[a], m = e.points, k = e.chart, p = function () {
                    m && m.length === f.length && m.splice(a, 1); f.splice(a,
                        1); e.options.data.splice(a, 1); e.updateParallelArrays(d || { series: e }, "splice", a, 1); d && d.destroy(); e.isDirty = !0; e.isDirtyData = !0; b && k.redraw()
                    }; w(c, k); b = g(b, !0); d ? d.firePointEvent("remove", null, p) : p()
                }, remove: function (a, b, c, e) { function f() { d.destroy(e); d.remove = null; m.isDirtyLegend = m.isDirtyBox = !0; m.linkSeries(); g(a, !0) && m.redraw(b) } var d = this, m = d.chart; !1 !== c ? n(d, "remove", null, f) : f() }, update: function (b, c) {
                    b = a.cleanRecursively(b, this.userOptions); n(this, "update", { options: b }); var f = this, d = f.chart, k = f.userOptions,
                        p, m = f.initialType || f.type, h = b.type || k.type || d.options.chart.type, l = !(this.hasDerivedData || b.dataGrouping || h && h !== this.type || void 0 !== b.pointStart || b.pointInterval || b.pointIntervalUnit || b.keys), w = H[m].prototype, q, t = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"], y = ["navigatorSeries", "baseSeries"], F = f.finishedAnimating && { animation: !1 }, v = {}; l && (y.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY",
                            "maxY", "minX", "maxX"), !1 !== b.visible && y.push("area", "graph"), f.parallelArrays.forEach(function (a) { y.push(a + "Data") }), b.data && this.setData(b.data, !1)); b = e(k, F, { index: void 0 === k.index ? f.index : k.index, pointStart: g(k.pointStart, f.xData[0]) }, !l && { data: f.options.data }, b); y = t.concat(y); y.forEach(function (a) { y[a] = f[a]; delete f[a] }); f.remove(!1, null, !1, !0); for (q in w) f[q] = void 0; H[h || m] ? r(f, H[h || m].prototype) : a.error(17, !0, d); y.forEach(function (a) { f[a] = y[a] }); f.init(d, b); l && this.points && (p = f.options, !1 ===
                                p.visible ? (v.graphic = 1, v.dataLabel = 1) : (p.marker && !1 === p.marker.enabled && !f._hasPointMarkers && (v.graphic = 1), p.dataLabels && !1 === p.dataLabels.enabled && !f._hasPointLabels && (v.dataLabel = 1)), this.points.forEach(function (a) { a && a.series && (a.resolveColor(), Object.keys(v).length && a.destroyElements(v), !1 === p.showInLegend && a.legendItem && d.legend.destroyItem(a)) }, this)); b.zIndex !== k.zIndex && t.forEach(function (a) { f[a] && f[a].attr({ zIndex: b.zIndex }) }); f.initialType = m; d.linkSeries(); n(this, "afterUpdate"); g(c, !0) &&
                                    d.redraw(l ? void 0 : !1)
                }, setName: function (a) { this.name = this.options.name = this.userOptions.name = a; this.chart.isDirtyLegend = !0 }
            }); r(D.prototype, {
                update: function (a, b) { var f = this.chart, d = a && a.events || {}; a = e(this.userOptions, a); f.options[this.coll].indexOf && (f.options[this.coll][f.options[this.coll].indexOf(this.userOptions)] = a); c(f.options[this.coll].events, function (a, b) { "undefined" === typeof d[b] && (d[b] = void 0) }); this.destroy(!0); this.init(f, r(a, { events: d })); f.isDirtyBox = !0; g(b, !0) && f.redraw() }, remove: function (a) {
                    for (var b =
                        this.chart, c = this.coll, e = this.series, d = e.length; d--;)e[d] && e[d].remove(!1); t(b.axes, this); t(b[c], this); f(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c]; b[c].forEach(function (a, b) { a.options.index = a.userOptions.index = b }); this.destroy(); b.isDirtyBox = !0; g(a, !0) && b.redraw()
                }, setTitle: function (a, b) { this.update({ title: a }, b) }, setCategories: function (a, b) { this.update({ categories: a }, b) }
            })
        }); K(I, "parts/ColumnSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.animObject, E = a.color,
            D = a.extend, h = a.defined, d = a.isNumber, u = a.merge, v = a.pick, t = a.Series, r = a.seriesType, n = a.svg; r("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, {
                cropShoulder: 0, directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { t.prototype.init.apply(this, arguments); var a = this, d = a.chart; d.hasRendered && d.series.forEach(function (f) { f.type === a.type && (f.isDirty = !0) }) }, getColumnMetrics: function () {
                    var a = this, d = a.options, f = a.xAxis, e = a.yAxis, c = f.options.reversedStacks, c = f.reversed && !c || !f.reversed && c, g, b = {}, p = 0; !1 === d.grouping ? p = 1 : a.chart.series.forEach(function (c) {
                        var f = c.options, d = c.yAxis, k; c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries ||
                            e.len !== d.len || e.pos !== d.pos || (f.stacking ? (g = c.stackKey, void 0 === b[g] && (b[g] = p++), k = b[g]) : !1 !== f.grouping && (k = p++), c.columnIndex = k)
                    }); var h = Math.min(Math.abs(f.transA) * (f.ordinalSlope || d.pointRange || f.closestPointRange || f.tickInterval || 1), f.len), w = h * d.groupPadding, n = (h - 2 * w) / (p || 1), d = Math.min(d.maxPointWidth || f.len, v(d.pointWidth, n * (1 - 2 * d.pointPadding))); a.columnMetrics = { width: d, offset: (n - d) / 2 + (w + ((a.columnIndex || 0) + (c ? 1 : 0)) * n - h / 2) * (c ? -1 : 1) }; return a.columnMetrics
                }, crispCol: function (a, d, f, e) {
                    var c =
                        this.chart, g = this.borderWidth, b = -(g % 2 ? .5 : 0), g = g % 2 ? .5 : 1; c.inverted && c.renderer.isVML && (g += 1); this.options.crisp && (f = Math.round(a + f) + b, a = Math.round(a) + b, f -= a); e = Math.round(d + e) + g; b = .5 >= Math.abs(d) && .5 < e; d = Math.round(d) + g; e -= d; b && e && (--d, e += 1); return { x: a, y: d, width: f, height: e }
                }, translate: function () {
                    var a = this, d = a.chart, f = a.options, e = a.dense = 2 > a.closestPointRange * a.xAxis.transA, e = a.borderWidth = v(f.borderWidth, e ? 0 : 1), c = a.yAxis, g = f.threshold, b = a.translatedThreshold = c.getThreshold(g), p = v(f.minPointLength,
                        5), n = a.getColumnMetrics(), w = n.width, r = a.barW = Math.max(w, 1 + 2 * e), y = a.pointXOffset = n.offset, q = a.dataMin, u = a.dataMax; d.inverted && (b -= .5); f.pointPadding && (r = Math.ceil(r)); t.prototype.translate.apply(a); a.points.forEach(function (e) {
                            var f = v(e.yBottom, b), k = 999 + Math.abs(f), m = w, k = Math.min(Math.max(-k, e.plotY), c.len + k), l = e.plotX + y, n = r, t = Math.min(k, f), F, H = Math.max(k, f) - t; p && Math.abs(H) < p && (H = p, F = !c.reversed && !e.negative || c.reversed && e.negative, e.y === g && a.dataMax <= g && c.min < g && q !== u && (F = !F), t = Math.abs(t - b) > p ? f -
                                p : b - (F ? p : 0)); h(e.options.pointWidth) && (m = n = Math.ceil(e.options.pointWidth), l -= Math.round((m - w) / 2)); e.barX = l; e.pointWidth = m; e.tooltipPos = d.inverted ? [c.len + c.pos - d.plotLeft - k, a.xAxis.len - l - n / 2, H] : [l + n / 2, k + c.pos - d.plotTop, H]; e.shapeType = a.pointClass.prototype.shapeType || "rect"; e.shapeArgs = a.crispCol.apply(a, e.isNull ? [l, b, n, 0] : [l, t, n, H])
                        })
                }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") },
                pointAttribs: function (a, d) {
                    var f = this.options, e, c = this.pointAttrToOptions || {}; e = c.stroke || "borderColor"; var g = c["stroke-width"] || "borderWidth", b = a && a.color || this.color, p = a && a[e] || f[e] || this.color || b, k = a && a[g] || f[g] || this[g] || 0, c = a && a.dashStyle || f.dashStyle, h = v(f.opacity, 1), l; a && this.zones.length && (l = a.getZone(), b = a.options.color || l && l.color || this.color, l && (p = l.borderColor || p, c = l.dashStyle || c, k = l.borderWidth || k)); d && (a = u(f.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, b = a.color ||
                        void 0 !== d && E(b).brighten(a.brightness).get() || b, p = a[e] || p, k = a[g] || k, c = a.dashStyle || c, h = v(a.opacity, h)); e = { fill: b, stroke: p, "stroke-width": k, opacity: h }; c && (e.dashstyle = c); return e
                }, drawPoints: function () {
                    var a = this, h = this.chart, f = a.options, e = h.renderer, c = f.animationLimit || 250, g; a.points.forEach(function (b) {
                        var p = b.graphic, k = p && h.pointCount < c ? "animate" : "attr"; if (d(b.plotY) && null !== b.y) {
                            g = b.shapeArgs; p && p.element.nodeName !== b.shapeType && (p = p.destroy()); if (p) p[k](u(g)); else b.graphic = p = e[b.shapeType](g).add(b.group ||
                                a.group); if (f.borderRadius) p[k]({ r: f.borderRadius }); h.styledMode || p[k](a.pointAttribs(b, b.selected && "select")).shadow(!1 !== b.allowShadow && f.shadow, null, f.stacking && !f.borderRadius); p.addClass(b.getClassName(), !0)
                        } else p && (b.graphic = p.destroy())
                    })
                }, animate: function (a) {
                    var d = this, f = this.yAxis, e = d.options, c = this.chart.inverted, g = {}, b = c ? "translateX" : "translateY", p; n && (a ? (g.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(e.threshold))), c ? g.translateX = a - f.len : g.translateY = a, d.clipBox && d.setClip(),
                        d.group.attr(g)) : (p = d.group.attr(b), d.group.animate({ scaleY: 1 }, D(B(d.options.animation), { step: function (a, c) { g[b] = p + c.pos * (f.pos - p); d.group.attr(g) } })), d.animate = null))
                }, remove: function () { var a = this, d = a.chart; d.hasRendered && d.series.forEach(function (f) { f.type === a.type && (f.isDirty = !0) }); t.prototype.remove.apply(a, arguments) }
            })
        }); K(I, "parts/ScatterSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.Series, E = a.seriesType; E("scatter", "line", {
                lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 },
                tooltip: { headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e" }
            }, {
                sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && B.prototype.drawGraph.call(this) }, applyJitter: function () {
                    var a =
                        this, h = this.options.jitter, d = this.points.length; h && this.points.forEach(function (u, v) { ["x", "y"].forEach(function (t, r) { var n, k = "plot" + t.toUpperCase(), l, f; h[t] && !u.isNull && (n = a[t + "Axis"], f = h[t] * n.transA, n && !n.isLog && (l = Math.max(0, u[k] - f), n = Math.min(n.len, u[k] + f), r = 1E4 * Math.sin(v + r * d), u[k] = l + (n - l) * (r - Math.floor(r)), "x" === t && (u.clientX = u.plotX))) }) })
                }
                }); a.addEvent(B, "afterTranslate", function () { this.applyJitter && this.applyJitter() })
        }); K(I, "parts/DataLabels.js", [I["parts/Globals.js"]], function (a) {
            var B =
                a.arrayMax, E = a.defined, D = a.extend, h = a.format, d = a.merge, u = a.noop, v = a.pick, t = a.relativeLength, r = a.Series, n = a.seriesTypes, k = a.stableSort, l = a.isArray, f = a.splat; a.distribute = function (e, c, f) {
                    function b(a, b) { return a.target - b.target } var d, g = !0, h = e, l = [], n; n = 0; var q = h.reducedLen || c; for (d = e.length; d--;)n += e[d].size; if (n > q) { k(e, function (a, b) { return (b.rank || 0) - (a.rank || 0) }); for (n = d = 0; n <= q;)n += e[d].size, d++; l = e.splice(d - 1, e.length) } k(e, b); for (e = e.map(function (a) {
                        return {
                            size: a.size, targets: [a.target], align: v(a.align,
                                .5)
                        }
                    }); g;) { for (d = e.length; d--;)g = e[d], n = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, n - g.size * g.align), c - g.size); d = e.length; for (g = !1; d--;)0 < d && e[d - 1].pos + e[d - 1].size > e[d].pos && (e[d - 1].size += e[d].size, e[d - 1].targets = e[d - 1].targets.concat(e[d].targets), e[d - 1].align = .5, e[d - 1].pos + e[d - 1].size > c && (e[d - 1].pos = c - e[d - 1].size), e.splice(d, 1), g = !0) } h.push.apply(h, l); d = 0; e.some(function (b) {
                        var e = 0; if (b.targets.some(function () {
                            h[d].pos = b.pos + e; if (Math.abs(h[d].pos - h[d].target) >
                                f) return h.slice(0, d + 1).forEach(function (a) { delete a.pos }), h.reducedLen = (h.reducedLen || c) - .1 * c, h.reducedLen > .1 * c && a.distribute(h, c, f), !0; e += h[d].size; d++
                        })) return !0
                    }); k(h, b)
                }; r.prototype.drawDataLabels = function () {
                    function e(a, b) { var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0 } function c(a, b) {
                        var c = [], e; if (l(a) && !l(b)) c = a.map(function (a) {
                            return d(a,
                                b)
                        }); else if (l(b) && !l(a)) c = b.map(function (b) { return d(a, b) }); else if (l(a) || l(b)) for (e = Math.max(a.length, b.length); e--;)c[e] = d(a[e], b[e]); else c = d(a, b); return c
                    } var g = this, b = g.chart, k = g.options, n = k.dataLabels, w = g.points, r, t = g.hasRendered || 0, q, u = a.animObject(k.animation).duration, A = Math.min(u, 200), G = !b.renderer.forExport && v(n.defer, 0 < A), B = b.renderer, n = c(c(b.options.plotOptions && b.options.plotOptions.series && b.options.plotOptions.series.dataLabels, b.options.plotOptions && b.options.plotOptions[g.type] &&
                        b.options.plotOptions[g.type].dataLabels), n); a.fireEvent(this, "drawDataLabels"); if (l(n) || n.enabled || g._hasPointLabels) q = g.plotGroup("dataLabelsGroup", "data-labels", G && !t ? "hidden" : "inherit", n.zIndex || 6), G && (q.attr({ opacity: +t }), t || setTimeout(function () { var a = g.dataLabelsGroup; a && (g.visible && q.show(!0), a[k.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: A })) }, u - A)), w.forEach(function (d) {
                            r = f(c(n, d.dlOptions || d.options && d.options.dataLabels)); r.forEach(function (c, f) {
                                var m = c.enabled && (!d.isNull || d.dataLabelOnNull) &&
                                    e(d, c), p, l, w, n, r = d.dataLabels ? d.dataLabels[f] : d.dataLabel, t = d.connectors ? d.connectors[f] : d.connector, y = !r; m && (p = d.getLabelConfig(), l = v(c[d.formatPrefix + "Format"], c.format), p = E(l) ? h(l, p, b.time) : (c[d.formatPrefix + "Formatter"] || c.formatter).call(p, c), l = c.style, w = c.rotation, b.styledMode || (l.color = v(c.color, l.color, g.color, "#000000"), "contrast" === l.color && (d.contrastColor = B.getContrast(d.color || g.color), l.color = c.inside || 0 > v(c.distance, d.labelDistance) || k.stacking ? d.contrastColor : "#000000"), k.cursor &&
                                        (l.cursor = k.cursor)), n = { r: c.borderRadius || 0, rotation: w, padding: c.padding, zIndex: 1 }, b.styledMode || (n.fill = c.backgroundColor, n.stroke = c.borderColor, n["stroke-width"] = c.borderWidth), a.objectEach(n, function (a, b) { void 0 === a && delete n[b] })); !r || m && E(p) ? m && E(p) && (r ? n.text = p : (d.dataLabels = d.dataLabels || [], r = d.dataLabels[f] = w ? B.text(p, 0, -9999).addClass("highcharts-data-label") : B.label(p, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), f || (d.dataLabel = r), r.addClass(" highcharts-data-label-color-" + d.colorIndex +
                                            " " + (c.className || "") + (c.useHTML ? " highcharts-tracker" : ""))), r.options = c, r.attr(n), b.styledMode || r.css(l).shadow(c.shadow), r.added || r.add(q), c.textPath && !c.useHTML && r.setTextPath(d.getDataLabelPath && d.getDataLabelPath(r) || d.graphic, c.textPath), g.alignDataLabel(d, r, c, null, y)) : (d.dataLabel = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 === d.dataLabels.length ? delete d.dataLabels : delete d.dataLabels[f]), f || delete d.dataLabel, t && (d.connector = d.connector.destroy(), d.connectors && (1 === d.connectors.length ?
                                                delete d.connectors : delete d.connectors[f])))
                            })
                        }); a.fireEvent(this, "afterDrawDataLabels")
                }; r.prototype.alignDataLabel = function (a, c, d, b, f) {
                    var e = this.chart, g = this.isCartesian && e.inverted, h = v(a.dlBox && a.dlBox.centerX, a.plotX, -9999), k = v(a.plotY, -9999), p = c.getBBox(), l, n = d.rotation, r = d.align, t = this.visible && (a.series.forceDL || e.isInsidePlot(h, Math.round(k), g) || b && e.isInsidePlot(h, g ? b.x + 1 : b.y + b.height - 1, g)), m = "justify" === v(d.overflow, "justify"); if (t && (l = e.renderer.fontMetrics(e.styledMode ? void 0 : d.style.fontSize,
                        c).b, b = D({ x: g ? this.yAxis.len - k : h, y: Math.round(g ? this.xAxis.len - h : k), width: 0, height: 0 }, b), D(d, { width: p.width, height: p.height }), n ? (m = !1, h = e.renderer.rotCorr(l, n), h = { x: b.x + d.x + b.width / 2 + h.x, y: b.y + d.y + { top: 0, middle: .5, bottom: 1 }[d.verticalAlign] * b.height }, c[f ? "attr" : "animate"](h).attr({ align: r }), k = (n + 720) % 360, k = 180 < k && 360 > k, "left" === r ? h.y -= k ? p.height : 0 : "center" === r ? (h.x -= p.width / 2, h.y -= p.height / 2) : "right" === r && (h.x -= p.width, h.y -= k ? 0 : p.height), c.placed = !0, c.alignAttr = h) : (c.align(d, null, b), h = c.alignAttr),
                        m && 0 <= b.height ? a.isLabelJustified = this.justifyDataLabel(c, d, h, p, b, f) : v(d.crop, !0) && (t = e.isInsidePlot(h.x, h.y) && e.isInsidePlot(h.x + p.width, h.y + p.height)), d.shape && !n)) c[f ? "attr" : "animate"]({ anchorX: g ? e.plotWidth - a.plotY : a.plotX, anchorY: g ? e.plotHeight - a.plotX : a.plotY }); t || (c.attr({ y: -9999 }), c.placed = !1)
                }; r.prototype.justifyDataLabel = function (a, c, d, b, f, h) {
                    var e = this.chart, g = c.align, k = c.verticalAlign, p, l, n = a.box ? 0 : a.padding || 0; p = d.x + n; 0 > p && ("right" === g ? c.align = "left" : c.x = -p, l = !0); p = d.x + b.width - n; p > e.plotWidth &&
                        ("left" === g ? c.align = "right" : c.x = e.plotWidth - p, l = !0); p = d.y + n; 0 > p && ("bottom" === k ? c.verticalAlign = "top" : c.y = -p, l = !0); p = d.y + b.height - n; p > e.plotHeight && ("top" === k ? c.verticalAlign = "bottom" : c.y = e.plotHeight - p, l = !0); l && (a.placed = !h, a.align(c, null, f)); return l
                }; n.pie && (n.pie.prototype.dataLabelPositioners = {
                    radialDistributionY: function (a) { return a.top + a.distributeBox.pos }, radialDistributionX: function (a, c, d, b) { return a.getX(d < c.top + 2 || d > c.bottom - 2 ? b : d, c.half, c) }, justify: function (a, c, d) {
                        return d[0] + (a.half ? -1 :
                            1) * (c + a.labelDistance)
                    }, alignToPlotEdges: function (a, c, d, b) { a = a.getBBox().width; return c ? a + b : d - a - b }, alignToConnectors: function (a, c, d, b) { var e = 0, f; a.forEach(function (a) { f = a.dataLabel.getBBox().width; f > e && (e = f) }); return c ? e + b : d - e - b }
                }, n.pie.prototype.drawDataLabels = function () {
                    var e = this, c = e.data, f, b = e.chart, h = e.options.dataLabels, k = h.connectorPadding, l, n = b.plotWidth, t = b.plotHeight, q = b.plotLeft, u = Math.round(b.chartWidth / 3), A, G = e.center, D = G[2] / 2, m = G[1], z, M, I, J, K = [[], []], O, x, T, U, Q = [0, 0, 0, 0], S = e.dataLabelPositioners,
                    P; e.visible && (h.enabled || e._hasPointLabels) && (c.forEach(function (a) { a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1) }), r.prototype.drawDataLabels.apply(e), c.forEach(function (a) {
                    a.dataLabel && (a.visible ? (K[a.half].push(a), a.dataLabel._pos = null, !E(h.style.width) && !E(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > u && (a.dataLabel.css({
                        width: .7 *
                            u
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                    }), K.forEach(function (c, d) {
                        var g, p, l = c.length, w = [], r; if (l) for (e.sortByAngle(c, d - .5), 0 < e.maxLabelDistance && (g = Math.max(0, m - D - e.maxLabelDistance), p = Math.min(m + D + e.maxLabelDistance, b.plotHeight), c.forEach(function (a) {
                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, m - D - a.labelDistance), a.bottom = Math.min(m + D + a.labelDistance, b.plotHeight), r = a.dataLabel.getBBox().height || 21, a.distributeBox =
                            { target: a.labelPosition.natural.y - a.top + r / 2, size: r, rank: a.y }, w.push(a.distributeBox))
                        }), g = p + r - g, a.distribute(w, g, g / 5)), U = 0; U < l; U++) {
                            f = c[U]; I = f.labelPosition; z = f.dataLabel; T = !1 === f.visible ? "hidden" : "inherit"; x = g = I.natural.y; w && E(f.distributeBox) && (void 0 === f.distributeBox.pos ? T = "hidden" : (J = f.distributeBox.size, x = S.radialDistributionY(f))); delete f.positionIndex; if (h.justify) O = S.justify(f, D, G); else switch (h.alignTo) {
                                case "connectors": O = S.alignToConnectors(c, d, n, q); break; case "plotEdges": O = S.alignToPlotEdges(z,
                                    d, n, q); break; default: O = S.radialDistributionX(e, f, x, g)
                            }z._attr = { visibility: T, align: I.alignment }; z._pos = { x: O + h.x + ({ left: k, right: -k }[I.alignment] || 0), y: x + h.y - 10 }; I.final.x = O; I.final.y = x; v(h.crop, !0) && (M = z.getBBox().width, g = null, O - M < k && 1 === d ? (g = Math.round(M - O + k), Q[3] = Math.max(g, Q[3])) : O + M > n - k && 0 === d && (g = Math.round(O + M - n + k), Q[1] = Math.max(g, Q[1])), 0 > x - J / 2 ? Q[0] = Math.max(Math.round(-x + J / 2), Q[0]) : x + J / 2 > t && (Q[2] = Math.max(Math.round(x + J / 2 - t), Q[2])), z.sideOverflow = g)
                        }
                    }), 0 === B(Q) || this.verifyDataLabelOverflow(Q)) &&
                        (this.placeDataLabels(), this.points.forEach(function (a) {
                            P = d(h, a.options.dataLabels); if (l = v(P.connectorWidth, 1)) {
                                var c; A = a.connector; if ((z = a.dataLabel) && z._pos && a.visible && 0 < a.labelDistance) {
                                    T = z._attr.visibility; if (c = !A) a.connector = A = b.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(e.dataLabelsGroup), b.styledMode || A.attr({ "stroke-width": l, stroke: P.connectorColor || a.color || "#666666" }); A[c ? "attr" : "animate"]({ d: a.getConnectorPath() });
                                    A.attr("visibility", T)
                                } else A && (a.connector = A.destroy())
                            }
                        }))
                }, n.pie.prototype.placeDataLabels = function () { this.points.forEach(function (a) { var c = a.dataLabel, e; c && a.visible && ((e = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({ width: c._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](e), c.moved = !0) : c && c.attr({ y: -9999 })); delete a.distributeBox }, this) }, n.pie.prototype.alignDataLabel =
                    u, n.pie.prototype.verifyDataLabelOverflow = function (a) { var c = this.center, e = this.options, b = e.center, d = e.minSize || 80, f, h = null !== e.size; h || (null !== b[0] ? f = Math.max(c[2] - Math.max(a[1], a[3]), d) : (f = Math.max(c[2] - a[1] - a[3], d), c[0] += (a[3] - a[1]) / 2), null !== b[1] ? f = Math.max(Math.min(f, c[2] - Math.max(a[0], a[2])), d) : (f = Math.max(Math.min(f, c[2] - a[0] - a[2]), d), c[1] += (a[0] - a[2]) / 2), f < c[2] ? (c[2] = f, c[3] = Math.min(t(e.innerSize || 0, f), f), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : h = !0); return h }); n.column &&
                        (n.column.prototype.alignDataLabel = function (a, c, f, b, h) {
                            var e = this.chart.inverted, g = a.series, k = a.dlBox || a.shapeArgs, p = v(a.below, a.plotY > v(this.translatedThreshold, g.yAxis.len)), l = v(f.inside, !!this.options.stacking); k && (b = d(k), 0 > b.y && (b.height += b.y, b.y = 0), k = b.y + b.height - g.yAxis.len, 0 < k && (b.height -= k), e && (b = { x: g.yAxis.len - b.y - b.height, y: g.xAxis.len - b.x - b.width, width: b.height, height: b.width }), l || (e ? (b.x += p ? 0 : b.width, b.width = 0) : (b.y += p ? b.height : 0, b.height = 0))); f.align = v(f.align, !e || l ? "center" : p ? "right" :
                                "left"); f.verticalAlign = v(f.verticalAlign, e || l ? "middle" : p ? "top" : "bottom"); r.prototype.alignDataLabel.call(this, a, c, f, b, h); a.isLabelJustified && a.contrastColor && c.css({ color: a.contrastColor })
                        })
        }); K(I, "modules/overlapping-datalabels.src.js", [I["parts/Globals.js"]], function (a) {
            var B = a.Chart, E = a.isArray, D = a.objectEach, h = a.pick, d = a.addEvent, u = a.fireEvent; d(B, "render", function () {
                var a = []; (this.labelCollectors || []).forEach(function (d) { a = a.concat(d()) }); (this.yAxis || []).forEach(function (d) {
                    d.options.stackLabels &&
                    !d.options.stackLabels.allowOverlap && D(d.stacks, function (d) { D(d, function (d) { a.push(d.label) }) })
                }); (this.series || []).forEach(function (d) { var r = d.options.dataLabels; d.visible && (!1 !== r.enabled || d._hasPointLabels) && d.points.forEach(function (d) { d.visible && (E(d.dataLabels) ? d.dataLabels : d.dataLabel ? [d.dataLabel] : []).forEach(function (k) { var l = k.options; k.labelrank = h(l.labelrank, d.labelrank, d.shapeArgs && d.shapeArgs.height); l.allowOverlap || a.push(k) }) }) }); this.hideOverlappingLabels(a)
            }); B.prototype.hideOverlappingLabels =
                function (a) {
                    var d = this, h = a.length, n = d.renderer, k, l, f, e, c, g, b = function (a, b, c, e, d, f, g, h) { return !(d > a + c || d + g < a || f > b + e || f + h < b) }; f = function (a) { var b, c, e, d = a.box ? 0 : a.padding || 0; e = 0; if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }, c = a.parentGroup, a.width || (e = a.getBBox(), a.width = e.width, a.height = e.height, e = n.fontMetrics(null, a.element).h), { x: b.x + (c.translateX || 0) + d, y: b.y + (c.translateY || 0) + d - e, width: a.width - 2 * d, height: a.height - 2 * d } }; for (l = 0; l < h; l++)if (k = a[l]) k.oldOpacity =
                        k.opacity, k.newOpacity = 1, k.absoluteBox = f(k); a.sort(function (a, b) { return (b.labelrank || 0) - (a.labelrank || 0) }); for (l = 0; l < h; l++)for (g = (f = a[l]) && f.absoluteBox, k = l + 1; k < h; ++k)if (c = (e = a[k]) && e.absoluteBox, g && c && f !== e && 0 !== f.newOpacity && 0 !== e.newOpacity && (c = b(g.x, g.y, g.width, g.height, c.x, c.y, c.width, c.height))) (f.labelrank < e.labelrank ? f : e).newOpacity = 0; a.forEach(function (a) {
                            var b, c; a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function () { a.hide() }, a.alignAttr.opacity = c, a[a.isOld ?
                                "animate" : "attr"](a.alignAttr, null, b), u(d, "afterHideOverlappingLabels")) : a.attr({ opacity: c })), a.isOld = !0)
                        })
                }
        }); K(I, "parts/Interaction.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.Chart, D = a.createElement, h = a.css, d = a.defaultOptions, u = a.defaultPlotOptions, v = a.extend, t = a.fireEvent, r = a.hasTouch, n = a.isObject, k = a.isArray, l = a.Legend, f = a.merge, e = a.pick, c = a.Point, g = a.Series, b = a.seriesTypes, p = a.svg, H; H = a.TrackerMixin = {
                drawTrackerPoint: function () {
                    var a = this, b = a.chart, c = b.pointer, e = function (a) {
                        var b =
                            c.getPointFromEvent(a); void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    }, d; a.points.forEach(function (a) { d = k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []; a.graphic && (a.graphic.element.point = a); d.forEach(function (b) { b.div ? b.div.point = a : b.element.point = a }) }); a._hasTracking || (a.trackerGroups.forEach(function (d) { if (a[d]) { a[d].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) { c.onTrackerMouseOut(a) }); if (r) a[d].on("touchstart", e); !b.styledMode && a.options.cursor && a[d].css(h).css({ cursor: a.options.cursor }) } }),
                        a._hasTracking = !0); t(this, "afterDrawTracker")
                }, drawTrackerGraph: function () {
                    var a = this, b = a.options, c = b.trackByArea, e = [].concat(c ? a.areaPath : a.graphPath), d = e.length, f = a.chart, g = f.pointer, h = f.renderer, k = f.options.tooltip.snap, l = a.tracker, n, u = function () { if (f.hoverSeries !== a) a.onMouseOver() }, v = "rgba(192,192,192," + (p ? .0001 : .002) + ")"; if (d && !c) for (n = d + 1; n--;)"M" === e[n] && e.splice(n + 1, 0, e[n + 1] - k, e[n + 2], "L"), (n && "M" === e[n] || n === d) && e.splice(n, 0, "L", e[n - 2] + k, e[n - 1]); l ? l.attr({ d: e }) : a.graph && (a.tracker = h.path(e).attr({
                        visibility: a.visible ?
                            "visible" : "hidden", zIndex: 2
                    }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), f.styledMode || a.tracker.attr({ "stroke-linejoin": "round", stroke: v, fill: c ? v : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k) }), [a.tracker, a.markerGroup].forEach(function (a) { a.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function (a) { g.onTrackerMouseOut(a) }); b.cursor && !f.styledMode && a.css({ cursor: b.cursor }); if (r) a.on("touchstart", u) })); t(this, "afterDrawTracker")
                }
            }; b.column &&
                (b.column.prototype.drawTracker = H.drawTrackerPoint); b.pie && (b.pie.prototype.drawTracker = H.drawTrackerPoint); b.scatter && (b.scatter.prototype.drawTracker = H.drawTrackerPoint); v(l.prototype, {
                    setItemEvents: function (a, b, e) {
                        var d = this, g = d.chart.renderer.boxWrapper, h = a instanceof c, k = "highcharts-legend-" + (h ? "point" : "series") + "-active", p = d.chart.styledMode; (e ? b : a.legendGroup).on("mouseover", function () {
                            d.allItems.forEach(function (b) { a !== b && b.setState("inactive", !h) }); a.setState("hover"); a.visible && g.addClass(k);
                            p || b.css(d.options.itemHoverStyle)
                        }).on("mouseout", function () { d.styledMode || b.css(f(a.visible ? d.itemStyle : d.itemHiddenStyle)); d.allItems.forEach(function (b) { a !== b && b.setState("", !h) }); g.removeClass(k); a.setState() }).on("click", function (b) { var c = function () { a.setVisible && a.setVisible() }; g.removeClass(k); b = { browserEvent: b }; a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : t(a, "legendItemClick", b, c) })
                    }, createCheckboxForItem: function (a) {
                    a.checkbox = D("input", {
                        type: "checkbox", className: "highcharts-legend-checkbox",
                        checked: a.selected, defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle, this.chart.container); B(a.checkbox, "click", function (b) { t(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () { a.select() }) })
                    }
                }); v(E.prototype, {
                    showResetZoom: function () {
                        function a() { b.zoomOut() } var b = this, c = d.lang, e = b.options.chart.resetZoomButton, f = e.theme, g = f.states, h = "chart" === e.relativeTo || "spaceBox" === e.relativeTo ? null : "plotBox"; t(this, "beforeShowResetZoom", null, function () {
                        b.resetZoomButton = b.renderer.button(c.resetZoom,
                            null, null, a, f, g && g.hover).attr({ align: e.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(e.position, !1, h)
                        }); t(this, "afterShowResetZoom")
                    }, zoomOut: function () { t(this, "selection", { resetSelection: !0 }, this.zoom) }, zoom: function (b) {
                        var c = this, d, f = c.pointer, g = !1, h = c.inverted ? f.mouseDownX : f.mouseDownY, k; !b || b.resetSelection ? (c.axes.forEach(function (a) { d = a.zoom() }), f.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (b) {
                            var e = b.axis, k = c.inverted ? e.left : e.top, p = c.inverted ?
                                k + e.width : k + e.height, l = e.isXAxis, n = !1; if (!l && h >= k && h <= p || l || !a.defined(h)) n = !0; f[l ? "zoomX" : "zoomY"] && n && (d = e.zoom(b.min, b.max), e.displayBtn && (g = !0))
                        }); k = c.resetZoomButton; g && !k ? c.showResetZoom() : !g && n(k) && (c.resetZoomButton = k.destroy()); d && c.redraw(e(c.options.chart.animation, b && b.animation, 100 > c.pointCount))
                    }, pan: function (a, b) {
                        var c = this, e = c.hoverPoints, d; t(this, "pan", { originalEvent: a }, function () {
                            e && e.forEach(function (a) { a.setState() }); ("xy" === b ? [1, 0] : [1]).forEach(function (b) {
                                b = c[b ? "xAxis" : "yAxis"][0];
                                var e = b.horiz, f = a[e ? "chartX" : "chartY"], e = e ? "mouseDownX" : "mouseDownY", g = c[e], h = (b.pointRange || 0) / 2, k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1, p = b.getExtremes(), l = b.toValue(g - f, !0) + h * k, k = b.toValue(g + b.len - f, !0) - h * k, n = k < l, g = n ? k : l, l = n ? l : k, k = Math.min(p.dataMin, h ? p.min : b.toValue(b.toPixels(p.min) - b.minPixelPadding)), h = Math.max(p.dataMax, h ? p.max : b.toValue(b.toPixels(p.max) + b.minPixelPadding)), n = k - g; 0 < n && (l += n, g = k); n = l - h; 0 < n && (l = h, g -= n); b.series.length && g !== p.min && l !== p.max && (b.setExtremes(g,
                                    l, !1, !1, { trigger: "pan" }), d = !0); c[e] = f
                            }); d && c.redraw(!1); h(c.container, { cursor: "move" })
                        })
                    }
                }); v(c.prototype, {
                    select: function (a, b) {
                        var c = this, d = c.series, f = d.chart; a = e(a, !c.selected); c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () {
                        c.selected = c.options.selected = a; d.options.data[d.data.indexOf(c)] = c.options; c.setState(a && "select"); b || f.getSelectedPoints().forEach(function (a) {
                            var b = a.series; a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options,
                                a.setState(f.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                        })
                        })
                    }, onMouseOver: function (a) { var b = this.series.chart, c = b.pointer; a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted); c.runPointActions(a, this) }, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) { a.setState() }); a.hoverPoints = a.hoverPoint = null }, importEvents: function () {
                        if (!this.hasImportedEvents) {
                            var b =
                                this, c = f(b.series.options.point, b.options).events; b.events = c; a.objectEach(c, function (c, e) { a.isFunction(c) && B(b, e, c) }); this.hasImportedEvents = !0
                        }
                    }, setState: function (a, b) {
                        var c = Math.floor(this.plotX), d = this.plotY, f = this.series, g = this.state, h = f.options.states[a || "normal"] || {}, k = u[f.type].marker && f.options.marker, m = k && !1 === k.enabled, p = k && k.states && k.states[a || "normal"] || {}, l = !1 === p.enabled, n = f.stateMarkerGraphic, r = this.marker || {}, w = f.chart, H = f.halo, F, B, D, E = k && f.markerAttribs; a = a || ""; if (!(a === this.state &&
                            !b || this.selected && "select" !== a || !1 === h.enabled || a && (l || m && !1 === p.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                            this.state = a; E && (F = f.markerAttribs(this, a)); if (this.graphic) g && this.graphic.removeClass("highcharts-point-" + g), a && this.graphic.addClass("highcharts-point-" + a), w.styledMode || (B = f.pointAttribs(this, a), D = e(w.options.chart.animation, h.animation), f.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) { a && a.animate({ opacity: B.opacity }, D) }), this.connector && this.connector.animate({ opacity: B.opacity },
                                D)), this.graphic.animate(B, D)), F && this.graphic.animate(F, e(w.options.chart.animation, p.animation, k.animation)), n && n.hide(); else { if (a && p) { g = r.symbol || f.symbol; n && n.currentSymbol !== g && (n = n.destroy()); if (n) n[b ? "animate" : "attr"]({ x: F.x, y: F.y }); else g && (f.stateMarkerGraphic = n = w.renderer.symbol(g, F.x, F.y, F.width, F.height).add(f.markerGroup), n.currentSymbol = g); !w.styledMode && n && n.attr(f.pointAttribs(this, a)) } n && (n[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), n.element.point = this) } (a = h.halo) && a.size ?
                                    (H || (f.halo = H = w.renderer.path().add((this.graphic || n).parentGroup)), H.show()[b ? "animate" : "attr"]({ d: this.haloPath(a.size) }), H.attr({ "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""), zIndex: -1 }), H.point = this, w.styledMode || H.attr(v({ fill: this.color || f.color, "fill-opacity": a.opacity }, a.attributes))) : H && H.point && H.point.haloPath && H.animate({ d: H.point.haloPath(0) }, null, H.hide); t(this, "afterSetState")
                        }
                    }, haloPath: function (a) {
                        return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                            a, this.plotY - a, 2 * a, 2 * a)
                    }
                }); v(g.prototype, {
                    onMouseOver: function () { var a = this.chart, b = a.hoverSeries; if (b && b !== this) b.onMouseOut(); this.options.events.mouseOver && t(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this }, onMouseOut: function () { var a = this.options, b = this.chart, c = b.tooltip, e = b.hoverPoint; b.hoverSeries = null; if (e) e.onMouseOut(); this && a.events.mouseOut && t(this, "mouseOut"); !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide(); b.series.forEach(function (a) { a.setState("", !0) }) },
                    setState: function (a, b) {
                        var c = this, d = c.options, f = c.graph, g = d.inactiveOtherPoints, h = d.states, k = d.lineWidth, m = d.opacity, p = e(h[a || "normal"] && h[a || "normal"].animation, c.chart.options.chart.animation), d = 0; a = a || ""; if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) { b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a)) }), c.state = a, !c.chart.styledMode)) {
                            if (h[a] && !1 === h[a].enabled) return; a && (k = h[a].lineWidth || k + (h[a].lineWidthPlus || 0), m = e(h[a].opacity,
                                m)); if (f && !f.dashstyle) for (h = { "stroke-width": k }, f.animate(h, p); c["zone-graph-" + d];)c["zone-graph-" + d].attr(h), d += 1; g || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function (a) { a && a.animate({ opacity: m }, p) })
                        } b && g && c.points && c.points.forEach(function (b) { b.setState && b.setState(a) })
                    }, setVisible: function (a, b) {
                        var c = this, e = c.chart, d = c.legendItem, f, g = e.options.chart.ignoreHiddenSeries, h = c.visible; f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";["group",
                            "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) { if (c[a]) c[a][f]() }); if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut(); d && e.legend.colorizeItem(c, a); c.isDirty = !0; c.options.stacking && e.series.forEach(function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); c.linkedSeries.forEach(function (b) { b.setVisible(a, !1) }); g && (e.isDirtyBox = !0); t(c, f); !1 !== b && e.redraw()
                    }, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) {
                    this.selected =
                        a = this.options.selected = void 0 === a ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); t(this, a ? "select" : "unselect")
                    }, drawTracker: H.drawTrackerGraph
                })
        }); K(I, "parts/Responsive.js", [I["parts/Globals.js"]], function (a) {
            var B = a.Chart, E = a.isArray, D = a.isObject, h = a.pick, d = a.splat; B.prototype.setResponsive = function (d, h) {
                var t = this.options.responsive, r = [], n = this.currentResponsive; !h && t && t.rules && t.rules.forEach(function (h) { void 0 === h._id && (h._id = a.uniqueKey()); this.matchResponsiveRule(h, r, d) }, this); h =
                    a.merge.apply(0, r.map(function (d) { return a.find(t.rules, function (a) { return a._id === d }).chartOptions })); h.isResponsiveOptions = !0; r = r.toString() || void 0; r !== (n && n.ruleIds) && (n && this.update(n.undoOptions, d, !0), r ? (n = this.currentOptions(h), n.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: r, mergedOptions: h, undoOptions: n }, this.update(h, d, !0)) : this.currentResponsive = void 0)
            }; B.prototype.matchResponsiveRule = function (a, d) {
                var t = a.condition; (t.callback || function () {
                    return this.chartWidth <= h(t.maxWidth,
                        Number.MAX_VALUE) && this.chartHeight <= h(t.maxHeight, Number.MAX_VALUE) && this.chartWidth >= h(t.minWidth, 0) && this.chartHeight >= h(t.minHeight, 0)
                }).call(this) && d.push(a._id)
            }; B.prototype.currentOptions = function (u) {
                function v(n, k, l, f) { var e; a.objectEach(n, function (a, g) { if (!f && -1 < t.collectionsWithUpdate.indexOf(g)) for (a = d(a), l[g] = [], e = 0; e < a.length; e++)k[g][e] && (l[g][e] = {}, v(a[e], k[g][e], l[g][e], f + 1)); else D(a) ? (l[g] = E(a) ? [] : {}, v(a, k[g] || {}, l[g], f + 1)) : l[g] = h(k[g], null) }) } var t = this, r = {}; v(u, this.options, r,
                    0); return r
            }
        }); K(I, "parts-map/MapAxis.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.Axis, D = a.pick; B(E, "getSeriesExtremes", function () { var a = []; this.isXAxis && (this.series.forEach(function (d, h) { d.useMapGeometry && (a[h] = d.xData, d.xData = []) }), this.seriesXData = a) }); B(E, "afterGetSeriesExtremes", function () {
                var a = this.seriesXData, d, u, v; this.isXAxis && (d = D(this.dataMin, Number.MAX_VALUE), u = D(this.dataMax, -Number.MAX_VALUE), this.series.forEach(function (h, r) {
                h.useMapGeometry && (d = Math.min(d, D(h.minX,
                    d)), u = Math.max(u, D(h.maxX, u)), h.xData = a[r], v = !0)
                }), v && (this.dataMin = d, this.dataMax = u), delete this.seriesXData)
            }); B(E, "afterSetAxisTranslation", function () {
                var a = this.chart, d; d = a.plotWidth / a.plotHeight; var a = a.xAxis[0], u; "yAxis" === this.coll && void 0 !== a.transA && this.series.forEach(function (a) { a.preserveAspectRatio && (u = !0) }); if (u && (this.transA = a.transA = Math.min(this.transA, a.transA), d /= (a.max - a.min) / (this.max - this.min), d = 1 > d ? this : a, a = (d.max - d.min) * d.transA, d.pixelPadding = d.len - a, d.minPixelPadding = d.pixelPadding /
                    2, a = d.fixTo)) { a = a[1] - d.toValue(a[0], !0); a *= d.transA; if (Math.abs(a) > d.minPixelPadding || d.min === d.dataMin && d.max === d.dataMax) a = 0; d.minPixelPadding -= a }
            }); B(E, "render", function () { this.fixTo = null })
        }); K(I, "parts-map/ColorAxis.js", [I["parts/Globals.js"]], function (a) {
            var B = a.addEvent, E = a.Axis, D = a.Chart, h = a.color, d, u = a.extend, v = a.isNumber, t = a.Legend, r = a.LegendSymbolMixin, n = a.noop, k = a.merge, l = a.pick; d = a.ColorAxis = function () { this.init.apply(this, arguments) }; u(d.prototype, E.prototype); u(d.prototype, {
                defaultColorAxisOptions: {
                    lineWidth: 0,
                    minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0
                }, keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(E.prototype.keepProps), init: function (a, e) {
                    var c = "vertical" !== a.options.legend.layout, d; this.coll = "colorAxis"; d = this.buildOptions.call(a, this.defaultColorAxisOptions,
                        e); E.prototype.init.call(this, a, d); e.dataClasses && this.initDataClasses(e); this.initStops(); this.horiz = c; this.zoomEnabled = !1; this.defaultLegendLength = 200
                }, initDataClasses: function (a) {
                    var e = this.chart, c, d = 0, b = e.options.chart.colorCount, f = this.options, l = a.dataClasses.length; this.dataClasses = c = []; this.legendItems = []; a.dataClasses.forEach(function (a, g) {
                        a = k(a); c.push(a); if (e.styledMode || !a.color) "category" === f.dataClassColor ? (e.styledMode || (g = e.options.colors, b = g.length, a.color = g[d]), a.colorIndex = d, d++ ,
                            d === b && (d = 0)) : a.color = h(f.minColor).tweenTo(h(f.maxColor), 2 > l ? .5 : g / (l - 1))
                    })
                }, hasData: function () { return !(!this.tickPositions || !this.tickPositions.length) }, setTickPositions: function () { if (!this.dataClasses) return E.prototype.setTickPositions.call(this) }, initStops: function () { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; this.stops.forEach(function (a) { a.color = h(a[1]) }) }, buildOptions: function (a, e) {
                    var c = this.options.legend, d = "vertical" !== c.layout; return k(a, {
                        side: d ?
                            2 : 1, reversed: !d
                    }, e, { opposite: !d, showEmpty: !1, title: null, visible: c.enabled })
                }, setOptions: function (a) { E.prototype.setOptions.call(this, a); this.options.crosshair = this.options.marker }, setAxisSize: function () {
                    var a = this.legendSymbol, e = this.chart, c = e.options.legend || {}, d, b; a ? (this.left = c = a.attr("x"), this.top = d = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = e.chartWidth - c - b, this.bottom = e.chartHeight - d - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? c : d) : this.len = (this.horiz ?
                        c.symbolWidth : c.symbolHeight) || this.defaultLegendLength
                }, normalizedValue: function (a) { this.isLog && (a = this.val2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) }, toColor: function (a, e) {
                    var c = this.stops, d, b, f = this.dataClasses, h, k; if (f) for (k = f.length; k--;) { if (h = f[k], d = h.from, c = h.to, (void 0 === d || a >= d) && (void 0 === c || a <= c)) { b = h.color; e && (e.dataClass = k, e.colorIndex = h.colorIndex); break } } else {
                        a = this.normalizedValue(a); for (k = c.length; k-- && !(a > c[k][0]);); d = c[k] || c[k + 1]; c = c[k + 1] || d; a = 1 - (c[0] - a) / (c[0] - d[0] ||
                            1); b = d.color.tweenTo(c.color, a)
                    } return b
                }, getOffset: function () { var a = this.legendGroup, e = this.chart.axisOffset[this.side]; a && (this.axisParent = a, E.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = e) }, setLegendColor: function () { var a, e = this.reversed; a = e ? 1 : 0; e = e ? 0 : 1; a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops } }, drawLegendSymbol: function (a, e) {
                    var c =
                        a.padding, d = a.options, b = this.horiz, f = l(d.symbolWidth, b ? this.defaultLegendLength : 12), h = l(d.symbolHeight, b ? 12 : this.defaultLegendLength), k = l(d.labelPadding, b ? 16 : 30), d = l(d.itemDistance, 10); this.setLegendColor(); e.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, h).attr({ zIndex: 1 }).add(e.legendGroup); this.legendItemWidth = f + c + (b ? d : k); this.legendItemHeight = h + c + (b ? k : 0)
                }, setState: function (a) { this.series.forEach(function (e) { e.setState(a) }) }, visible: !0, setVisible: n, getSeriesExtremes: function () {
                    var a =
                        this.series, e = a.length; this.dataMin = Infinity; for (this.dataMax = -Infinity; e--;)a[e].getExtremes(), void 0 !== a[e].valueMin && (this.dataMin = Math.min(this.dataMin, a[e].valueMin), this.dataMax = Math.max(this.dataMax, a[e].valueMax))
                }, drawCrosshair: function (a, e) {
                    var c = e && e.plotX, d = e && e.plotY, b, f = this.pos, h = this.len; e && (b = this.toPixels(e[e.series.colorKey]), b < f ? b = f - 2 : b > f + h && (b = f + h + 2), e.plotX = b, e.plotY = this.len - b, E.prototype.drawCrosshair.call(this, a, e), e.plotX = c, e.plotY = d, this.cross && !this.cross.addedToColorAxis &&
                        this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({ fill: this.crosshair.color })))
                }, getPlotLinePath: function (a) { var e = a.translatedValue; return v(e) ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : E.prototype.getPlotLinePath.apply(this, arguments) }, update: function (a, e) {
                    var c = this.chart, d = c.legend, b = this.buildOptions.call(c,
                        {}, a); this.series.forEach(function (a) { a.isDirtyData = !0 }); a.dataClasses && d.allItems && (d.allItems.forEach(function (a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), c.isDirtyLegend = !0); c.options[this.coll] = k(this.userOptions, b); E.prototype.update.call(this, b, e); this.legendItem && (this.setLegendColor(), d.colorizeItem(this, !0))
                }, remove: function () { this.legendItem && this.chart.legend.destroyItem(this); E.prototype.remove.call(this) }, getDataClassLegendSymbols: function () {
                    var d = this, e = this.chart, c = this.legendItems,
                    g = e.options.legend, b = g.valueDecimals, h = g.valueSuffix || "", k; c.length || this.dataClasses.forEach(function (f, g) {
                        var l = !0, p = f.from, t = f.to; k = ""; void 0 === p ? k = "\x3c " : void 0 === t && (k = "\x3e "); void 0 !== p && (k += a.numberFormat(p, b) + h); void 0 !== p && void 0 !== t && (k += " - "); void 0 !== t && (k += a.numberFormat(t, b) + h); c.push(u({
                            chart: e, name: k, options: {}, drawLegendSymbol: r.drawRectangle, visible: !0, setState: n, isDataClass: !0, setVisible: function () {
                                l = this.visible = !l; d.series.forEach(function (a) {
                                    a.points.forEach(function (a) {
                                    a.dataClass ===
                                        g && a.setVisible(l)
                                    })
                                }); e.legend.colorizeItem(this, l)
                            }
                        }, f))
                    }); return c
                }, name: ""
            });["fill", "stroke"].forEach(function (d) { a.Fx.prototype[d + "Setter"] = function () { this.elem.attr(d, h(this.start).tweenTo(h(this.end), this.pos), null, !0) } }); B(D, "afterGetAxes", function () { var a = this.options.colorAxis; this.colorAxis = []; a && new d(this, a) }); B(t, "afterGetAllItems", function (d) {
                var e = [], c = this.chart.colorAxis[0]; c && c.options && c.options.showInLegend && (c.options.dataClasses ? e = c.getDataClassLegendSymbols() : e.push(c), c.series.forEach(function (c) {
                    a.erase(d.allItems,
                        c)
                })); for (c = e.length; c--;)d.allItems.unshift(e[c])
            }); B(t, "afterColorizeItem", function (a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) }); B(t, "afterUpdate", function (a, e, c) { this.chart.colorAxis[0] && this.chart.colorAxis[0].update({}, c) })
        }); K(I, "parts-map/ColorSeriesMixin.js", [I["parts/Globals.js"]], function (a) {
            var B = a.defined, E = a.noop, D = a.seriesTypes; a.colorPointMixin = {
                dataLabelOnNull: !0, isValid: function () {
                    return null !== this.value && Infinity !== this.value && -Infinity !==
                        this.value
                }, setVisible: function (a) { var d = this, h = a ? "show" : "hide"; d.visible = !!a;["graphic", "dataLabel"].forEach(function (a) { if (d[a]) d[a][h]() }) }, setState: function (h) { a.Point.prototype.setState.call(this, h); this.graphic && this.graphic.attr({ zIndex: "hover" === h ? 1 : 0 }) }
            }; a.colorSeriesMixin = {
                pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: E, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: D.column.prototype.pointAttribs,
                translateColors: function () { var a = this, d = this.options.nullColor, u = this.colorAxis, v = this.colorKey; this.data.forEach(function (h) { var r = h[v]; if (r = h.options.color || (h.isNull ? d : u && void 0 !== r ? u.toColor(r, h) : h.color || a.color)) h.color = r }) }, colorAttribs: function (a) { var d = {}; B(a.color) && (d[this.colorProp || "fill"] = a.color); return d }
            }
        }); K(I, "parts-map/MapNavigation.js", [I["parts/Globals.js"]], function (a) {
            function B(a) {
                a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble =
                    !0)
            } function E(a) { this.init(a) } var D = a.addEvent, h = a.Chart, d = a.doc, u = a.extend, v = a.merge, t = a.pick; E.prototype.init = function (a) { this.chart = a; a.mapNavButtons = [] }; E.prototype.update = function (d) {
                var h = this.chart, k = h.options.mapNavigation, l, f, e, c, g, b = function (a) { this.handler.call(h, a); B(a) }, p = h.mapNavButtons; d && (k = h.options.mapNavigation = v(h.options.mapNavigation, d)); for (; p.length;)p.pop().destroy(); t(k.enableButtons, k.enabled) && !h.renderer.forExport && a.objectEach(k.buttons, function (a, d) {
                    l = v(k.buttonOptions,
                        a); h.styledMode || (f = l.theme, f.style = v(l.theme.style, l.style), c = (e = f.states) && e.hover, g = e && e.select); a = h.renderer.button(l.text, 0, 0, b, f, c, g, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + { zoomIn: "zoom-in", zoomOut: "zoom-out" }[d]).attr({ width: l.width, height: l.height, title: h.options.lang[d], padding: l.padding, zIndex: 5 }).add(); a.handler = l.onclick; a.align(u(l, { width: a.width, height: 2 * a.height }), null, l.alignTo); D(a.element, "dblclick", B); p.push(a)
                }); this.updateEvents(k)
            };
            E.prototype.updateEvents = function (a) {
                var h = this.chart; t(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || D(h.container, "dblclick", function (a) { h.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()); t(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || D(h.container, void 0 === d.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) { h.pointer.onContainerMouseWheel(a); B(a); return !1 }) :
                    this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
            }; u(h.prototype, {
                fitToBox: function (a, d) { [["x", "width"], ["y", "height"]].forEach(function (h) { var k = h[0]; h = h[1]; a[k] + a[h] > d[k] + d[h] && (a[h] > d[h] ? (a[h] = d[h], a[k] = d[k]) : a[k] = d[k] + d[h] - a[h]); a[h] > d[h] && (a[h] = d[h]); a[k] < d[k] && (a[k] = d[k]) }); return a }, mapZoom: function (a, d, h, l, f) {
                    var e = this.xAxis[0], c = e.max - e.min, g = t(d, e.min + c / 2), b = c * a, c = this.yAxis[0], k = c.max - c.min, n = t(h, c.min + k / 2), k = k * a, g = this.fitToBox({
                        x: g - b * (l ? (l - e.pos) / e.len : .5), y: n - k *
                            (f ? (f - c.pos) / c.len : .5), width: b, height: k
                    }, { x: e.dataMin, y: c.dataMin, width: e.dataMax - e.dataMin, height: c.dataMax - c.dataMin }), b = g.x <= e.dataMin && g.width >= e.dataMax - e.dataMin && g.y <= c.dataMin && g.height >= c.dataMax - c.dataMin; l && (e.fixTo = [l - e.pos, d]); f && (c.fixTo = [f - c.pos, h]); void 0 === a || b ? (e.setExtremes(void 0, void 0, !1), c.setExtremes(void 0, void 0, !1)) : (e.setExtremes(g.x, g.x + g.width, !1), c.setExtremes(g.y, g.y + g.height, !1)); this.redraw()
                }
            }); D(h, "beforeRender", function () { this.mapNavigation = new E(this); this.mapNavigation.update() });
            a.MapNavigation = E
        }); K(I, "parts-map/MapPointer.js", [I["parts/Globals.js"]], function (a) {
            var B = a.extend, E = a.pick, D = a.Pointer; a = a.wrap; B(D.prototype, {
                onContainerDblClick: function (a) { var d = this.chart; a = this.normalize(a); d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY) }, onContainerMouseWheel: function (a) {
                    var d =
                        this.chart, h; a = this.normalize(a); h = a.detail || -(a.wheelDelta / 120); d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, h), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
                }
            }); a(D.prototype, "zoomOption", function (a) { var d = this.chart.options.mapNavigation; E(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy"); a.apply(this, [].slice.call(arguments, 1)) }); a(D.prototype, "pinchTranslate", function (a,
                d, u, v, t, r, n) { a.call(this, d, u, v, t, r, n); "map" === this.chart.options.chart.type && this.hasZoom && (a = v.scaleX > v.scaleY, this.pinchTranslateDirection(!a, d, u, v, t, r, n, a ? v.scaleX : v.scaleY)) })
        }); K(I, "parts-map/MapSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.colorPointMixin, E = a.extend, D = a.isNumber, h = a.merge, d = a.noop, u = a.pick, v = a.isArray, t = a.Point, r = a.Series, n = a.seriesType, k = a.seriesTypes, l = a.splat; n("map", "scatter", {
                animation: !1, dataLabels: {
                    crop: !1, formatter: function () { return this.point.value }, inside: !0,
                    overflow: !1, padding: 0, verticalAlign: "middle"
                }, marker: null, nullColor: "#f7f7f7", stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e" }, turboThreshold: 0, allAreas: !0, borderColor: "#cccccc", borderWidth: 1, joinBy: "hc-key", states: { hover: { halo: null, brightness: .2 }, normal: { animation: !0 }, select: { color: "#cccccc" }, inactive: { opacity: 1 } }
            }, h(a.colorSeriesMixin, {
                type: "map", getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: d, directTouch: !0, preserveAspectRatio: !0,
                pointArrayMap: ["value"], setOptions: function (a) { a = r.prototype.setOptions.call(this, a); var e = a.joinBy; null === e && (e = "_i"); e = this.joinBy = l(e); e[1] || (e[1] = e[0]); return a }, getBox: function (d) {
                    var e = Number.MAX_VALUE, c = -e, f = e, b = -e, h = e, k = e, l = this.xAxis, n = this.yAxis, r; (d || []).forEach(function (d) {
                        if (d.path) {
                        "string" === typeof d.path && (d.path = a.splitPath(d.path)); var g = d.path || [], l = g.length, p = !1, n = -e, m = e, q = -e, t = e, w = d.properties; if (!d._foundBox) {
                            for (; l--;)D(g[l]) && (p ? (n = Math.max(n, g[l]), m = Math.min(m, g[l])) : (q = Math.max(q,
                                g[l]), t = Math.min(t, g[l])), p = !p); d._midX = m + (n - m) * u(d.middleX, w && w["hc-middle-x"], .5); d._midY = t + (q - t) * u(d.middleY, w && w["hc-middle-y"], .5); d._maxX = n; d._minX = m; d._maxY = q; d._minY = t; d.labelrank = u(d.labelrank, (n - m) * (q - t)); d._foundBox = !0
                        } c = Math.max(c, d._maxX); f = Math.min(f, d._minX); b = Math.max(b, d._maxY); h = Math.min(h, d._minY); k = Math.min(d._maxX - d._minX, d._maxY - d._minY, k); r = !0
                        }
                    }); r && (this.minY = Math.min(h, u(this.minY, e)), this.maxY = Math.max(b, u(this.maxY, -e)), this.minX = Math.min(f, u(this.minX, e)), this.maxX = Math.max(c,
                        u(this.maxX, -e)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * k, (this.maxX - this.minX) / 5, l.minRange || e)), n && void 0 === n.options.minRange && (n.minRange = Math.min(5 * k, (this.maxY - this.minY) / 5, n.minRange || e)))
                }, hasData: function () { return !!this.processedXData.length }, getExtremes: function () {
                    r.prototype.getExtremes.call(this, this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax =
                        this.maxY
                }, translatePath: function (a) { var e = !1, c = this.xAxis, d = this.yAxis, b = c.min, f = c.transA, c = c.minPixelPadding, h = d.min, k = d.transA, d = d.minPixelPadding, l, n = []; if (a) for (l = a.length; l--;)D(a[l]) ? (n[l] = e ? (a[l] - b) * f + c : (a[l] - h) * k + d, e = !e) : n[l] = a[l]; return n }, setData: function (d, e, c, g) {
                    var b = this.options, f = this.chart.options.chart, k = f && f.map, l = b.mapData, n = this.joinBy, t = b.keys || this.pointArrayMap, q = [], u = {}, A = this.chart.mapTransforms; !l && k && (l = "string" === typeof k ? a.maps[k] : k); d && d.forEach(function (c, e) {
                        var f =
                            0; if (D(c)) d[e] = { value: c }; else if (v(c)) { d[e] = {}; !b.keys && c.length > t.length && "string" === typeof c[0] && (d[e]["hc-key"] = c[0], ++f); for (var g = 0; g < t.length; ++g, ++f)t[g] && void 0 !== c[f] && (0 < t[g].indexOf(".") ? a.Point.prototype.setNestedProperty(d[e], c[f], t[g]) : d[e][t[g]] = c[f]) } n && "_i" === n[0] && (d[e]._i = e)
                    }); this.getBox(d); (this.chart.mapTransforms = A = f && f.mapTransforms || l && l["hc-transform"] || A) && a.objectEach(A, function (a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) }); if (l) {
                    "FeatureCollection" ===
                        l.type && (this.mapTitle = l.title, l = a.geojson(l, this.type, this)); this.mapData = l; this.mapMap = {}; for (A = 0; A < l.length; A++)f = l[A], k = f.properties, f._i = A, n[0] && k && k[n[0]] && (f[n[0]] = k[n[0]]), u[f[n[0]]] = f; this.mapMap = u; d && n[1] && d.forEach(function (a) { u[a[n[1]]] && q.push(u[a[n[1]]]) }); b.allAreas ? (this.getBox(l), d = d || [], n[1] && d.forEach(function (a) { q.push(a[n[1]]) }), q = "|" + q.map(function (a) { return a && a[n[0]] }).join("|") + "|", l.forEach(function (a) { n[0] && -1 !== q.indexOf("|" + a[n[0]] + "|") || (d.push(h(a, { value: null })), g = !1) })) :
                            this.getBox(q)
                    } r.prototype.setData.call(this, d, e, c, g)
                }, drawGraph: d, drawDataLabels: d, doFullTranslate: function () { return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans }, translate: function () { var a = this, e = a.xAxis, c = a.yAxis, d = a.doFullTranslate(); a.generatePoints(); a.data.forEach(function (b) { b.plotX = e.toPixels(b._midX, !0); b.plotY = c.toPixels(b._midY, !0); d && (b.shapeType = "path", b.shapeArgs = { d: a.translatePath(b.path) }) }); a.translateColors() }, pointAttribs: function (a, e) {
                    e =
                    a.series.chart.styledMode ? this.colorAttribs(a) : k.column.prototype.pointAttribs.call(this, a, e); e["stroke-width"] = u(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit"); return e
                }, drawPoints: function () {
                    var a = this, e = a.xAxis, c = a.yAxis, d = a.group, b = a.chart, h = b.renderer, l, n, r, t, q = this.baseTrans, v, A, B, D, m; a.transformGroup || (a.transformGroup = h.g().attr({ scaleX: 1, scaleY: 1 }).add(d), a.transformGroup.survive = !0); a.doFullTranslate() ? (b.hasRendered && !b.styledMode &&
                        a.points.forEach(function (b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, k.column.prototype.drawPoints.apply(a), a.group = d, a.points.forEach(function (c) { if (c.graphic) { var e = ""; c.name && (e += "highcharts-name-" + c.name.replace(/ /g, "-").toLowerCase()); c.properties && c.properties["hc-key"] && (e += " highcharts-key-" + c.properties["hc-key"].toLowerCase()); e && c.graphic.addClass(e); b.styledMode && c.graphic.css(a.pointAttribs(c, c.selected && "select")) } }), this.baseTrans =
                        { originX: e.min - e.minPixelPadding / e.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA), transAX: e.transA, transAY: c.transA }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (l = e.transA / q.transAX, n = c.transA / q.transAY, r = e.toPixels(q.originX, !0), t = c.toPixels(q.originY, !0), .99 < l && 1.01 > l && .99 < n && 1.01 > n && (n = l = 1, r = Math.round(r), t = Math.round(t)), v = this.transformGroup, b.renderer.globalAnimation ? (A = v.attr("translateX"), B = v.attr("translateY"), D = v.attr("scaleX"),
                            m = v.attr("scaleY"), v.attr({ animator: 0 }).animate({ animator: 1 }, { step: function (a, b) { v.attr({ translateX: A + (r - A) * b.pos, translateY: B + (t - B) * b.pos, scaleX: D + (l - D) * b.pos, scaleY: m + (n - m) * b.pos }) } })) : v.attr({ translateX: r, translateY: t, scaleX: l, scaleY: n })); b.styledMode || d.element.setAttribute("stroke-width", u(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (l || 1)); this.drawMapDataLabels()
                }, drawMapDataLabels: function () {
                    r.prototype.drawDataLabels.call(this); this.dataLabelsGroup &&
                        this.dataLabelsGroup.clip(this.chart.clipRect)
                }, render: function () { var a = this, e = r.prototype.render; a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () { e.call(a) }) : e.call(a) }, animate: function (a) { var e = this.options.animation, c = this.group, d = this.xAxis, b = this.yAxis, f = d.pos, h = b.pos; this.chart.renderer.isSVG && (!0 === e && (e = { duration: 1E3 }), a ? c.attr({ translateX: f + d.len / 2, translateY: h + b.len / 2, scaleX: .001, scaleY: .001 }) : (c.animate({ translateX: f, translateY: h, scaleX: 1, scaleY: 1 }, e), this.animate = null)) },
                animateDrilldown: function (a) { var e = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], d = c.bBox, b = this.chart.options.drilldown.animation; a || (a = Math.min(d.width / e.width, d.height / e.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: d.x, translateY: d.y }, this.points.forEach(function (a) { a.graphic && a.graphic.attr(c.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, b) }), this.animate = null) }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, animateDrillupFrom: function (a) {
                    k.column.prototype.animateDrillupFrom.call(this,
                        a)
                }, animateDrillupTo: function (a) { k.column.prototype.animateDrillupTo.call(this, a) }
            }), E({
                applyOptions: function (a, e) { a = t.prototype.applyOptions.call(this, a, e); e = this.series; var c = e.joinBy; e.mapData && ((c = void 0 !== a[c[1]] && e.mapMap[a[c[1]]]) ? (e.xyFromShape && (a.x = c._midX, a.y = c._midY), E(a, c)) : a.value = a.value || null); return a }, onMouseOver: function (d) { a.clearTimeout(this.colorInterval); if (null !== this.value || this.series.options.nullInteraction) t.prototype.onMouseOver.call(this, d); else this.series.onMouseOut(d) },
                zoomTo: function () { var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY, this._maxY, !1); a.chart.redraw() }
            }, B))
        }); K(I, "parts-map/MapLineSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.seriesType, E = a.seriesTypes; B("mapline", "map", { lineWidth: 1, fillColor: "none" }, {
                type: "mapline", colorProp: "stroke", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointAttribs: function (a, h) {
                    a = E.map.prototype.pointAttribs.call(this, a, h); a.fill = this.options.fillColor;
                    return a
                }, drawLegendSymbol: E.line.prototype.drawLegendSymbol
            })
        }); K(I, "parts-map/MapPointSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.merge, E = a.Point; a = a.seriesType; a("mappoint", "scatter", { dataLabels: { crop: !1, defer: !1, enabled: !0, formatter: function () { return this.point.name }, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0 }, {
                applyOptions: function (a, h) {
                    a = void 0 !== a.lat && void 0 !== a.lon ? B(a, this.series.chart.fromLatLonToPoint(a)) : a; return E.prototype.applyOptions.call(this, a,
                        h)
                }
            })
        }); K(I, "parts-more/BubbleLegend.js", [I["parts/Globals.js"]], function (a) {
            var B = a.Series, E = a.Legend, D = a.Chart, h = a.addEvent, d = a.wrap, u = a.color, v = a.isNumber, t = a.numberFormat, r = a.objectEach, n = a.merge, k = a.noop, l = a.pick, f = a.stableSort, e = a.setOptions, c = a.arrayMin, g = a.arrayMax; e({
                legend: {
                    bubbleLegend: {
                        borderColor: void 0, borderWidth: 2, className: void 0, color: void 0, connectorClassName: void 0, connectorColor: void 0, connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: {
                            className: void 0, allowOverlap: !1, format: "",
                            formatter: void 0, align: "right", style: { fontSize: 10, color: void 0 }, x: 0, y: 0
                        }, maxSize: 60, minSize: 10, legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
                    }
                }
            }); a.BubbleLegend = function (a, c) { this.init(a, c) }; a.BubbleLegend.prototype = {
                init: function (a, c) { this.options = a; this.visible = !0; this.chart = c.chart; this.legend = c }, setState: k, addToLegend: function (a) { a.splice(this.options.legendIndex, 0, this) }, drawLegendSymbol: function (a) {
                    var b =
                        this.chart, c = this.options, e = l(a.options.itemDistance, 20), d, g = c.ranges; d = c.connectorDistance; this.fontMetrics = b.renderer.fontMetrics(c.labels.style.fontSize.toString() + "px"); g && g.length && v(g[0].value) ? (f(g, function (a, b) { return b.value - a.value }), this.ranges = g, this.setOptions(), this.render(), b = this.getMaxLabelSize(), g = this.ranges[0].radius, a = 2 * g, d = d - g + b.width, d = 0 < d ? d : 0, this.maxLabel = b, this.movementX = "left" === c.labels.align ? d : 0, this.legendItemWidth = a + d + e, this.legendItemHeight = a + this.fontMetrics.h / 2) :
                            a.options.bubbleLegend.autoRanges = !0
                }, setOptions: function () {
                    var a = this.ranges, c = this.options, e = this.chart.series[c.seriesIndex], d = this.legend.baseline, f = { "z-index": c.zIndex, "stroke-width": c.borderWidth }, g = { "z-index": c.zIndex, "stroke-width": c.connectorWidth }, h = this.getLabelStyles(), k = e.options.marker.fillOpacity, r = this.chart.styledMode; a.forEach(function (b, p) {
                        r || (f.stroke = l(b.borderColor, c.borderColor, e.color), f.fill = l(b.color, c.color, 1 !== k ? u(e.color).setOpacity(k).get("rgba") : e.color), g.stroke = l(b.connectorColor,
                            c.connectorColor, e.color)); a[p].radius = this.getRangeRadius(b.value); a[p] = n(a[p], { center: a[0].radius - a[p].radius + d }); r || n(!0, a[p], { bubbleStyle: n(!1, f), connectorStyle: n(!1, g), labelStyle: h })
                    }, this)
                }, getLabelStyles: function () {
                    var a = this.options, c = {}, e = "left" === a.labels.align, d = this.legend.options.rtl; r(a.labels.style, function (a, b) { "color" !== b && "fontSize" !== b && "z-index" !== b && (c[b] = a) }); return n(!1, c, {
                        "font-size": a.labels.style.fontSize, fill: l(a.labels.style.color, "#000000"), "z-index": a.zIndex, align: d ||
                            e ? "right" : "left"
                    })
                }, getRangeRadius: function (a) { var b = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this, b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, a) }, render: function () {
                    var a = this.chart.renderer, c = this.options.zThreshold; this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] }); this.legendSymbol = a.g("bubble-legend"); this.legendItem = a.g("bubble-legend-item"); this.legendSymbol.translateX = 0; this.legendSymbol.translateY = 0; this.ranges.forEach(function (a) {
                    a.value >=
                        c && this.renderRange(a)
                    }, this); this.legendSymbol.add(this.legendItem); this.legendItem.add(this.legendGroup); this.hideOverlappingLabels()
                }, renderRange: function (a) {
                    var b = this.options, c = b.labels, e = this.chart.renderer, d = this.symbols, f = d.labels, g = a.center, h = Math.abs(a.radius), k = b.connectorDistance, l = c.align, n = c.style.fontSize, k = this.legend.options.rtl || "left" === l ? -k : k, c = b.connectorWidth, m = this.ranges[0].radius, r = g - h - b.borderWidth / 2 + c / 2, t, n = n / 2 - (this.fontMetrics.h - n) / 2, u = e.styledMode; "center" === l && (k = 0,
                        b.connectorDistance = 0, a.labelStyle.align = "center"); l = r + b.labels.y; t = m + k + b.labels.x; d.bubbleItems.push(e.circle(m, g + ((r % 1 ? 1 : .5) - (c % 2 ? 0 : .5)), h).attr(u ? {} : a.bubbleStyle).addClass((u ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (b.className || "")).add(this.legendSymbol)); d.connectors.push(e.path(e.crispLine(["M", m, r, "L", m + k, r], b.connectorWidth)).attr(u ? {} : a.connectorStyle).addClass((u ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " +
                            (b.connectorClassName || "")).add(this.legendSymbol)); a = e.text(this.formatLabel(a), t, l + n).attr(u ? {} : a.labelStyle).addClass("highcharts-bubble-legend-labels " + (b.labels.className || "")).add(this.legendSymbol); f.push(a); a.placed = !0; a.alignAttr = { x: t, y: l + n }
                }, getMaxLabelSize: function () { var a, c; this.symbols.labels.forEach(function (b) { c = b.getBBox(!0); a = a ? c.width > a.width ? c : a : c }); return a || {} }, formatLabel: function (b) {
                    var c = this.options, e = c.labels.formatter; return (c = c.labels.format) ? a.format(c, b) : e ? e.call(b) :
                        t(b.value, 1)
                }, hideOverlappingLabels: function () { var a = this.chart, c = this.symbols; !this.options.labels.allowOverlap && c && (a.hideOverlappingLabels(c.labels), c.labels.forEach(function (a, b) { a.newOpacity ? a.newOpacity !== a.oldOpacity && c.connectors[b].show() : c.connectors[b].hide() })) }, getRanges: function () {
                    var a = this.legend.bubbleLegend, e, d = a.options.ranges, f, h = Number.MAX_VALUE, k = -Number.MAX_VALUE; a.chart.series.forEach(function (a) {
                    a.isBubble && !a.ignoreSeries && (f = a.zData.filter(v), f.length && (h = l(a.options.zMin,
                        Math.min(h, Math.max(c(f), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), k = l(a.options.zMax, Math.max(k, g(f)))))
                    }); e = h === k ? [{ value: k }] : [{ value: h }, { value: (h + k) / 2 }, { value: k, autoRanges: !0 }]; d.length && d[0].radius && e.reverse(); e.forEach(function (a, b) { d && d[b] && (e[b] = n(!1, d[b], a)) }); return e
                }, predictBubbleSizes: function () {
                    var a = this.chart, c = this.fontMetrics, e = a.legend.options, d = "horizontal" === e.layout, f = d ? a.legend.lastLineHeight : 0, g = a.plotSizeX, h = a.plotSizeY, k = a.series[this.options.seriesIndex],
                    a = Math.ceil(k.minPxSize), l = Math.ceil(k.maxPxSize), k = k.options.maxSize, n = Math.min(h, g); if (e.floating || !/%$/.test(k)) c = l; else if (k = parseFloat(k), c = (n + f - c.h / 2) * k / 100 / (k / 100 + 1), d && h - c >= g || !d && g - c >= h) c = l; return [a, Math.ceil(c)]
                }, updateRanges: function (a, c) { var b = this.legend.options.bubbleLegend; b.minSize = a; b.maxSize = c; b.ranges = this.getRanges() }, correctSizes: function () {
                    var a = this.legend, c = this.chart.series[this.options.seriesIndex]; 1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize,
                        c.maxPxSize), a.render())
                }
            }; h(a.Legend, "afterGetAllItems", function (b) { var c = this.bubbleLegend, e = this.options, d = e.bubbleLegend, f = this.chart.getVisibleBubbleSeriesIndex(); c && c.ranges && c.ranges.length && (d.ranges.length && (d.autoRanges = !!d.ranges[0].autoRanges), this.destroyItem(c)); 0 <= f && e.enabled && d.enabled && (d.seriesIndex = f, this.bubbleLegend = new a.BubbleLegend(d, this), this.bubbleLegend.addToLegend(b.allItems)) }); D.prototype.getVisibleBubbleSeriesIndex = function () {
                for (var a = this.series, c = 0; c < a.length;) {
                    if (a[c] &&
                        a[c].isBubble && a[c].visible && a[c].zData.length) return c; c++
                } return -1
            }; E.prototype.getLinesHeights = function () { var a = this.allItems, c = [], e, d = a.length, f, g = 0; for (f = 0; f < d; f++)if (a[f].legendItemHeight && (a[f].itemHeight = a[f].legendItemHeight), a[f] === a[d - 1] || a[f + 1] && a[f]._legendItemPos[1] !== a[f + 1]._legendItemPos[1]) { c.push({ height: 0 }); e = c[c.length - 1]; for (g; g <= f; g++)a[g].itemHeight > e.height && (e.height = a[g].itemHeight); e.step = f } return c }; E.prototype.retranslateItems = function (a) {
                var b, c, e, d = this.options.rtl,
                f = 0; this.allItems.forEach(function (g, h) { b = g.legendGroup.translateX; c = g._legendItemPos[1]; if ((e = g.movementX) || d && g.ranges) e = d ? b - g.options.maxSize / 2 : b + e, g.legendGroup.attr({ translateX: e }); h > a[f].step && f++; g.legendGroup.attr({ translateY: Math.round(c + a[f].height / 2) }); g._legendItemPos[1] = c + a[f].height / 2 })
            }; h(B, "legendItemClick", function () {
                var a = this.chart, c = this.visible, e = this.chart.legend; e && e.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, a = 0 <= a.getVisibleBubbleSeriesIndex(), e.bubbleLegend.visible !==
                    a && (e.update({ bubbleLegend: { enabled: a } }), e.bubbleLegend.visible = a), this.visible = c)
            }); d(D.prototype, "drawChartBox", function (a, c, e) {
                var b = this.legend, d = 0 <= this.getVisibleBubbleSeriesIndex(), f; b && b.options.enabled && b.bubbleLegend && b.options.bubbleLegend.autoRanges && d ? (f = b.bubbleLegend.options, d = b.bubbleLegend.predictBubbleSizes(), b.bubbleLegend.updateRanges(d[0], d[1]), f.placed || (b.group.placed = !1, b.allItems.forEach(function (a) { a.legendGroup.translateY = null })), b.render(), this.getMargins(), this.axes.forEach(function (a) {
                    a.render();
                    f.placed || (a.setScale(), a.updateNames(), r(a.ticks, function (a) { a.isNew = !0; a.isNewLabel = !0 }))
                }), f.placed = !0, this.getMargins(), a.call(this, c, e), b.bubbleLegend.correctSizes(), b.retranslateItems(b.getLinesHeights())) : (a.call(this, c, e), b && b.options.enabled && b.bubbleLegend && (b.render(), b.retranslateItems(b.getLinesHeights())))
            })
        }); K(I, "parts-more/BubbleSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.arrayMax, E = a.arrayMin, D = a.Axis, h = a.color, d = a.isNumber, u = a.noop, v = a.pick, t = a.pInt, r = a.Point, n = a.Series,
            k = a.seriesType, l = a.seriesTypes; k("bubble", "scatter", { dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z" }, {
                pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"],
                trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, isBubble: !0, pointAttribs: function (a, e) { var c = this.options.marker.fillOpacity; a = n.prototype.pointAttribs.call(this, a, e); 1 !== c && (a.fill = h(a.fill).setOpacity(c).get("rgba")); return a }, getRadii: function (a, e, c) { var d, b = this.zData, f = c.minPxSize, h = c.maxPxSize, k = [], l; d = 0; for (c = b.length; d < c; d++)l = b[d], k.push(this.getRadius(a, e, f, h, l)); this.radii = k }, getRadius: function (a, e, c, g, b) {
                    var f = this.options, h =
                        "width" !== f.sizeBy, k = f.zThreshold, l = e - a; f.sizeByAbsoluteValue && null !== b && (b = Math.abs(b - k), l = Math.max(e - k, Math.abs(a - k)), a = 0); d(b) ? b < a ? c = c / 2 - 1 : (a = 0 < l ? (b - a) / l : .5, h && 0 <= a && (a = Math.sqrt(a)), c = Math.ceil(c + a * (g - c)) / 2) : c = null; return c
                }, animate: function (a) {
                !a && this.points.length < this.options.animationLimit && (this.points.forEach(function (a) { var c = a.graphic, e; c && c.width && (e = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), c.animate(e, this.options.animation)) }, this),
                    this.animate = null)
                }, hasData: function () { return !!this.processedXData.length }, translate: function () { var f, e = this.data, c, g, b = this.radii; l.scatter.prototype.translate.call(this); for (f = e.length; f--;)c = e[f], g = b ? b[f] : 0, d(g) && g >= this.minPxSize / 2 ? (c.marker = a.extend(c.marker, { radius: g, width: 2 * g, height: 2 * g }), c.dlBox = { x: c.plotX - g, y: c.plotY - g, width: 2 * g, height: 2 * g }) : c.shapeArgs = c.plotY = c.dlBox = void 0 }, alignDataLabel: l.column.prototype.alignDataLabel, buildKDTree: u, applyZones: u
            }, {
                haloPath: function (a) {
                    return r.prototype.haloPath.call(this,
                        0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
                }, ttBelow: !1
                }); D.prototype.beforePadding = function () {
                    var f = this, e = this.len, c = this.chart, g = 0, b = e, h = this.isXAxis, k = h ? "xData" : "yData", l = this.min, n = {}, r = Math.min(c.plotWidth, c.plotHeight), q = Number.MAX_VALUE, u = -Number.MAX_VALUE, A = this.max - l, D = e / A, I = []; this.series.forEach(function (b) {
                        var e = b.options; !b.bubblePadding || !b.visible && c.options.chart.ignoreHiddenSeries || (f.allowZoomOutside = !0, I.push(b), h && (["minSize", "maxSize"].forEach(function (a) {
                            var b = e[a], c = /%$/.test(b),
                            b = t(b); n[a] = c ? r * b / 100 : b
                        }), b.minPxSize = n.minSize, b.maxPxSize = Math.max(n.maxSize, n.minSize), b = b.zData.filter(a.isNumber), b.length && (q = v(e.zMin, Math.min(q, Math.max(E(b), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), u = v(e.zMax, Math.max(u, B(b))))))
                    }); I.forEach(function (a) { var c = a[k], e = c.length, m; h && a.getRadii(q, u, a); if (0 < A) for (; e--;)d(c[e]) && f.dataMin <= c[e] && c[e] <= f.dataMax && (m = a.radii[e], g = Math.min((c[e] - l) * D - m, g), b = Math.max((c[e] - l) * D + m, b)) }); I.length && 0 < A && !this.isLog && (b -= e, D *= (e + Math.max(0,
                        g) - Math.min(b, e)) / e, [["min", "userMin", g], ["max", "userMax", b]].forEach(function (a) { void 0 === v(f.options[a[0]], f[a[1]]) && (f[a[0]] += a[2] / D) }))
                }
        }); K(I, "parts-map/MapBubbleSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.merge, E = a.Point, D = a.seriesType, h = a.seriesTypes; h.bubble && D("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, {
                xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: h.map.prototype.getMapData, getBox: h.map.prototype.getBox, setData: h.map.prototype.setData,
                setOptions: h.map.prototype.setOptions
            }, { applyOptions: function (a, u) { return a && void 0 !== a.lat && void 0 !== a.lon ? E.prototype.applyOptions.call(this, B(a, this.series.chart.fromLatLonToPoint(a)), u) : h.map.prototype.pointClass.prototype.applyOptions.call(this, a, u) }, isValid: function () { return "number" === typeof this.z }, ttBelow: !1 })
        }); K(I, "parts-map/HeatmapSeries.js", [I["parts/Globals.js"]], function (a) {
            var B = a.colorPointMixin, E = a.merge, D = a.noop, h = a.pick, d = a.Series, u = a.seriesType, v = a.seriesTypes; u("heatmap", "scatter",
                { animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" }, states: { hover: { halo: !1, brightness: .2 } } }, E(a.colorSeriesMixin, {
                    pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, getExtremesFromAll: !0, directTouch: !0, init: function () {
                        var a; v.scatter.prototype.init.apply(this, arguments); a = this.options;
                        a.pointRange = h(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1
                    }, translate: function () {
                        var a = this.options, d = this.xAxis, n = this.yAxis, k = a.pointPadding || 0, l = function (a, c, d) { return Math.min(Math.max(c, a), d) }, f = this.pointPlacementToXValue(); this.generatePoints(); this.points.forEach(function (e) {
                            var c = (a.colsize || 1) / 2, g = (a.rowsize || 1) / 2, b = l(Math.round(d.len - d.translate(e.x - c, 0, 1, 0, 1, -f)), -d.len, 2 * d.len), c = l(Math.round(d.len - d.translate(e.x + c, 0, 1, 0, 1, -f)), -d.len, 2 * d.len), p = l(Math.round(n.translate(e.y -
                                g, 0, 1, 0, 1)), -n.len, 2 * n.len), g = l(Math.round(n.translate(e.y + g, 0, 1, 0, 1)), -n.len, 2 * n.len), r = h(e.pointPadding, k); e.plotX = e.clientX = (b + c) / 2; e.plotY = (p + g) / 2; e.shapeType = "rect"; e.shapeArgs = { x: Math.min(b, c) + r, y: Math.min(p, g) + r, width: Math.abs(c - b) - 2 * r, height: Math.abs(g - p) - 2 * r }
                        }); this.translateColors()
                    }, drawPoints: function () { var a = this.chart.styledMode ? "css" : "attr"; v.column.prototype.drawPoints.call(this); this.points.forEach(function (d) { d.graphic[a](this.colorAttribs(d)) }, this) }, hasData: function () { return !!this.processedXData.length },
                    getValidPoints: function (a, h) { return d.prototype.getValidPoints.call(this, a, h, !0) }, animate: D, getBox: D, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, alignDataLabel: v.column.prototype.alignDataLabel, getExtremes: function () { d.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; d.prototype.getExtremes.call(this) }
                }), a.extend({
                    haloPath: function (a) {
                        if (!a) return []; var d = this.shapeArgs; return ["M", d.x - a, d.y - a, "L", d.x - a, d.y + d.height + a, d.x + d.width + a, d.y + d.height +
                            a, d.x + d.width + a, d.y - a, "Z"]
                    }
                }, B))
        }); K(I, "parts-map/GeoJSON.js", [I["parts/Globals.js"]], function (a) {
            function B(a, d) { var h, k, l, f = !1, e = a.x, c = a.y; a = 0; for (h = d.length - 1; a < d.length; h = a++)k = d[a][1] > c, l = d[h][1] > c, k !== l && e < (d[h][0] - d[a][0]) * (c - d[a][1]) / (d[h][1] - d[a][1]) + d[a][0] && (f = !f); return f } var E = a.Chart, D = a.extend, h = a.format, d = a.merge, u = a.win, v = a.wrap; E.prototype.transformFromLatLon = function (d, h) {
                if (void 0 === u.proj4) return a.error(21, !1, this), { x: 0, y: null }; d = u.proj4(h.crs, [d.lon, d.lat]); var n = h.cosAngle ||
                    h.rotation && Math.cos(h.rotation), k = h.sinAngle || h.rotation && Math.sin(h.rotation); d = h.rotation ? [d[0] * n + d[1] * k, -d[0] * k + d[1] * n] : d; return { x: ((d[0] - (h.xoffset || 0)) * (h.scale || 1) + (h.xpan || 0)) * (h.jsonres || 1) + (h.jsonmarginX || 0), y: (((h.yoffset || 0) - d[1]) * (h.scale || 1) + (h.ypan || 0)) * (h.jsonres || 1) - (h.jsonmarginY || 0) }
            }; E.prototype.transformToLatLon = function (d, h) {
                if (void 0 === u.proj4) a.error(21, !1, this); else {
                    d = {
                        x: ((d.x - (h.jsonmarginX || 0)) / (h.jsonres || 1) - (h.xpan || 0)) / (h.scale || 1) + (h.xoffset || 0), y: ((-d.y - (h.jsonmarginY ||
                            0)) / (h.jsonres || 1) + (h.ypan || 0)) / (h.scale || 1) + (h.yoffset || 0)
                    }; var n = h.cosAngle || h.rotation && Math.cos(h.rotation), k = h.sinAngle || h.rotation && Math.sin(h.rotation); h = u.proj4(h.crs, "WGS84", h.rotation ? { x: d.x * n + d.y * -k, y: d.x * k + d.y * n } : d); return { lat: h.y, lon: h.x }
                }
            }; E.prototype.fromPointToLatLon = function (d) {
                var h = this.mapTransforms, n; if (h) { for (n in h) if (h.hasOwnProperty(n) && h[n].hitZone && B({ x: d.x, y: -d.y }, h[n].hitZone.coordinates[0])) return this.transformToLatLon(d, h[n]); return this.transformToLatLon(d, h["default"]) } a.error(22,
                    !1, this)
            }; E.prototype.fromLatLonToPoint = function (d) { var h = this.mapTransforms, n, k; if (!h) return a.error(22, !1, this), { x: 0, y: null }; for (n in h) if (h.hasOwnProperty(n) && h[n].hitZone && (k = this.transformFromLatLon(d, h[n]), B({ x: k.x, y: -k.y }, h[n].hitZone.coordinates[0]))) return k; return this.transformFromLatLon(d, h["default"]) }; a.geojson = function (a, d, n) {
                var k = [], l = [], f = function (a) { var c, d = a.length; l.push("M"); for (c = 0; c < d; c++)1 === c && l.push("L"), l.push(a[c][0], -a[c][1]) }; d = d || "map"; a.features.forEach(function (a) {
                    var c =
                        a.geometry, e = c.type, c = c.coordinates; a = a.properties; var b; l = []; "map" === d || "mapbubble" === d ? ("Polygon" === e ? (c.forEach(f), l.push("Z")) : "MultiPolygon" === e && (c.forEach(function (a) { a.forEach(f) }), l.push("Z")), l.length && (b = { path: l })) : "mapline" === d ? ("LineString" === e ? f(c) : "MultiLineString" === e && c.forEach(f), l.length && (b = { path: l })) : "mappoint" === d && "Point" === e && (b = { x: c[0], y: -c[1] }); b && k.push(D(b, { name: a.name || a.NAME, properties: a }))
                }); n && a.copyrightShort && (n.chart.mapCredits = h(n.chart.options.credits.mapText,
                    { geojson: a }), n.chart.mapCreditsFull = h(n.chart.options.credits.mapTextFull, { geojson: a })); return k
            }; v(E.prototype, "addCredits", function (a, h) { h = d(!0, this.options.credits, h); this.mapCredits && (h.href = null); a.call(this, h); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) })
        }); K(I, "parts-map/Map.js", [I["parts/Globals.js"]], function (a) {
            function B(a, d, h, f, e, c, g, b) {
                return ["M", a + e, d, "L", a + h - c, d, "C", a + h - c / 2, d, a + h, d + c / 2, a + h, d + c, "L", a + h, d + f - g, "C", a + h, d + f - g / 2, a + h - g / 2, d + f, a + h - g, d + f,
                    "L", a + b, d + f, "C", a + b / 2, d + f, a, d + f - b / 2, a, d + f - b, "L", a, d + e, "C", a, d + e / 2, a + e / 2, d, a + e, d, "Z"]
            } var E = a.Chart, D = a.defaultOptions, h = a.extend, d = a.merge, u = a.pick, v = a.Renderer, t = a.SVGRenderer, r = a.VMLRenderer; h(D.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); D.mapNavigation = {
                buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bold" }, theme: { "stroke-width": 1, "text-align": "center" } }, buttons: {
                    zoomIn: {
                        onclick: function () { this.mapZoom(.5) },
                        text: "+", y: 0
                    }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28 }
                }, mouseWheelSensitivity: 1.1
            }; a.splitPath = function (a) { var d; a = a.replace(/([A-Za-z])/g, " $1 "); a = a.replace(/^\s*/, "").replace(/\s*$/, ""); a = a.split(/[ ,]+/); for (d = 0; d < a.length; d++)/[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d])); return a }; a.maps = {}; t.prototype.symbols.topbutton = function (a, d, h, f, e) { return B(a - 1, d - 1, h, f, e.r, e.r, 0, 0) }; t.prototype.symbols.bottombutton = function (a, d, h, f, e) { return B(a - 1, d - 1, h, f, 0, 0, e.r, e.r) }; v === r && ["topbutton",
                "bottombutton"].forEach(function (a) { r.prototype.symbols[a] = t.prototype.symbols[a] }); a.Map = a.mapChart = function (h, k, l) {
                    var f = "string" === typeof h || h.nodeName, e = arguments[f ? 1 : 0], c = e, g = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 }, b, n = a.getOptions().credits; b = e.series; e.series = null; e = d({
                        chart: { panning: "xy", type: "map" }, credits: { mapText: u(n.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'), mapTextFull: u(n.mapTextFull, "{geojson.copyright}") },
                        tooltip: { followTouchMove: !1 }, xAxis: g, yAxis: d(g, { reversed: !0 })
                    }, e, { chart: { inverted: !1, alignTicks: !1 } }); e.series = c.series = b; return f ? new E(h, e, l) : new E(e, k)
                }
        }); K(I, "masters/modules/map.src.js", [], function () { }); K(I, "masters/highmaps.src.js", [I["parts/Globals.js"]], function (a) { return a }); I["masters/highmaps.src.js"]._modules = I; return I["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map