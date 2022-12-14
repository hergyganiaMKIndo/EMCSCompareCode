﻿/*
 Highcharts JS v7.1.3 (2019-08-14)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
(function (u) { "object" === typeof module && module.exports ? (u["default"] = u, module.exports = u) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (B) { u(B); u.Highcharts = B; return u }) : u("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (u) {
    function B(b, t, z, q) { b.hasOwnProperty(t) || (b[t] = q.apply(null, z)) } u = u ? u._modules : {}; B(u, "parts-3d/Math.js", [u["parts/Globals.js"]], function (b) {
        var t = b.deg2rad, z = b.pick; b.perspective3D = function (b, g, v) {
            g = 0 < v && v < Number.POSITIVE_INFINITY ?
                v / (b.z + g.z + v) : 1; return { x: b.x * g, y: b.y * g }
        }; b.perspective = function (q, g, v) {
            var A = g.options.chart.options3d, r = v ? g.inverted : !1, w = { x: g.plotWidth / 2, y: g.plotHeight / 2, z: A.depth / 2, vd: z(A.depth, 1) * z(A.viewDistance, 0) }, x = g.scale3d || 1, y = t * A.beta * (r ? -1 : 1); A = t * A.alpha * (r ? -1 : 1); var l = Math.cos(A), a = Math.cos(-y), f = Math.sin(A), h = Math.sin(-y); v || (w.x += g.plotLeft, w.y += g.plotTop); return q.map(function (k) {
                var d = (r ? k.y : k.x) - w.x; var c = (r ? k.x : k.y) - w.y; k = (k.z || 0) - w.z; d = { x: a * d - h * k, y: -f * h * d + l * c - a * f * k, z: l * h * d + f * c + l * a * k }; c = b.perspective3D(d,
                    w, w.vd); c.x = c.x * x + w.x; c.y = c.y * x + w.y; c.z = d.z * x + w.z; return { x: r ? c.y : c.x, y: r ? c.x : c.y, z: c.z }
            })
        }; b.pointCameraDistance = function (b, g) { var v = g.options.chart.options3d, A = g.plotWidth / 2; g = g.plotHeight / 2; v = z(v.depth, 1) * z(v.viewDistance, 0) + v.depth; return Math.sqrt(Math.pow(A - b.plotX, 2) + Math.pow(g - b.plotY, 2) + Math.pow(v - b.plotZ, 2)) }; b.shapeArea = function (b) { var g = 0, v; for (v = 0; v < b.length; v++) { var A = (v + 1) % b.length; g += b[v].x * b[A].y - b[A].x * b[v].y } return g / 2 }; b.shapeArea3d = function (t, g, v) {
            return b.shapeArea(b.perspective(t,
                g, v))
        }
    }); B(u, "parts-3d/SVGRenderer.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (b, t) {
        function z(a, d, e, D, b, f, h, l) {
            var m = [], E = f - b; return f > b && f - b > Math.PI / 2 + .0001 ? (m = m.concat(z(a, d, e, D, b, b + Math.PI / 2, h, l)), m = m.concat(z(a, d, e, D, b + Math.PI / 2, f, h, l))) : f < b && b - f > Math.PI / 2 + .0001 ? (m = m.concat(z(a, d, e, D, b, b - Math.PI / 2, h, l)), m = m.concat(z(a, d, e, D, b - Math.PI / 2, f, h, l))) : ["C", a + e * Math.cos(b) - e * c * E * Math.sin(b) + h, d + D * Math.sin(b) + D * c * E * Math.cos(b) + l, a + e * Math.cos(f) + e * c * E * Math.sin(f) + h, d + D * Math.sin(f) - D * c *
                E * Math.cos(f) + l, a + e * Math.cos(f) + h, d + D * Math.sin(f) + l]
        } var q = t.defined, g = t.objectEach, v = Math.cos, A = Math.PI, r = Math.sin, w = b.animObject, x = b.charts, y = b.color, l = b.deg2rad, a = b.extend, f = b.merge, h = b.perspective, k = b.pick, d = b.SVGElement; t = b.SVGRenderer; var c = 4 * (Math.sqrt(2) - 1) / 3 / (A / 2); t.prototype.toLinePath = function (a, c) { var e = []; a.forEach(function (a) { e.push("L", a.x, a.y) }); a.length && (e[0] = "M", c && e.push("Z")); return e }; t.prototype.toLineSegments = function (a) {
            var c = [], e = !0; a.forEach(function (a) {
                c.push(e ? "M" : "L",
                    a.x, a.y); e = !e
            }); return c
        }; t.prototype.face3d = function (a) {
            var c = this, e = this.createElement("path"); e.vertexes = []; e.insidePlotArea = !1; e.enabled = !0; e.attr = function (a) {
                if ("object" === typeof a && (q(a.enabled) || q(a.vertexes) || q(a.insidePlotArea))) {
                this.enabled = k(a.enabled, this.enabled); this.vertexes = k(a.vertexes, this.vertexes); this.insidePlotArea = k(a.insidePlotArea, this.insidePlotArea); delete a.enabled; delete a.vertexes; delete a.insidePlotArea; var e = h(this.vertexes, x[c.chartIndex], this.insidePlotArea), m = c.toLinePath(e,
                    !0); e = b.shapeArea(e); e = this.enabled && 0 < e ? "visible" : "hidden"; a.d = m; a.visibility = e
                } return d.prototype.attr.apply(this, arguments)
            }; e.animate = function (a) {
                if ("object" === typeof a && (q(a.enabled) || q(a.vertexes) || q(a.insidePlotArea))) {
                this.enabled = k(a.enabled, this.enabled); this.vertexes = k(a.vertexes, this.vertexes); this.insidePlotArea = k(a.insidePlotArea, this.insidePlotArea); delete a.enabled; delete a.vertexes; delete a.insidePlotArea; var e = h(this.vertexes, x[c.chartIndex], this.insidePlotArea), m = c.toLinePath(e,
                    !0); e = b.shapeArea(e); e = this.enabled && 0 < e ? "visible" : "hidden"; a.d = m; this.attr("visibility", e)
                } return d.prototype.animate.apply(this, arguments)
            }; return e.attr(a)
        }; t.prototype.polyhedron = function (a) {
            var c = this, e = this.g(), m = e.destroy; this.styledMode || e.attr({ "stroke-linejoin": "round" }); e.faces = []; e.destroy = function () { for (var a = 0; a < e.faces.length; a++)e.faces[a].destroy(); return m.call(this) }; e.attr = function (a, m, b, f) {
                if ("object" === typeof a && q(a.faces)) {
                    for (; e.faces.length > a.faces.length;)e.faces.pop().destroy();
                    for (; e.faces.length < a.faces.length;)e.faces.push(c.face3d().add(e)); for (var h = 0; h < a.faces.length; h++)c.styledMode && delete a.faces[h].fill, e.faces[h].attr(a.faces[h], null, b, f); delete a.faces
                } return d.prototype.attr.apply(this, arguments)
            }; e.animate = function (a, m, b) {
                if (a && a.faces) { for (; e.faces.length > a.faces.length;)e.faces.pop().destroy(); for (; e.faces.length < a.faces.length;)e.faces.push(c.face3d().add(e)); for (var f = 0; f < a.faces.length; f++)e.faces[f].animate(a.faces[f], m, b); delete a.faces } return d.prototype.animate.apply(this,
                    arguments)
            }; return e.attr(a)
        }; var p = {
            initArgs: function (a) { var c = this, e = c.renderer, d = e[c.pathType + "Path"](a), m = d.zIndexes; c.parts.forEach(function (a) { c[a] = e.path(d[a]).attr({ "class": "highcharts-3d-" + a, zIndex: m[a] || 0 }).add(c) }); c.attr({ "stroke-linejoin": "round", zIndex: m.group }); c.originalDestroy = c.destroy; c.destroy = c.destroyParts }, singleSetterForParts: function (a, c, e, d, b, f) {
                var m = {}; d = [null, null, d || "attr", b, f]; var h = e && e.zIndexes; e ? (g(e, function (c, d) {
                m[d] = {}; m[d][a] = c; h && (m[d].zIndex = e.zIndexes[d] ||
                    0)
                }), d[1] = m) : (m[a] = c, d[0] = m); return this.processParts.apply(this, d)
            }, processParts: function (a, c, e, d, f) { var m = this; m.parts.forEach(function (h) { c && (a = b.pick(c[h], !1)); if (!1 !== a) m[h][e](a, d, f) }); return m }, destroyParts: function () { this.processParts(null, null, "destroy"); return this.originalDestroy() }
        }; var n = b.merge(p, {
            parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, c, e, b) {
                if ("string" === typeof a && "undefined" !== typeof c) { var m = a; a = {}; a[m] = c } return a.shapeArgs || q(a.x) ? this.singleSetterForParts("d",
                    null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : d.prototype.attr.call(this, a, void 0, e, b)
            }, animate: function (a, c, e) { q(a.x) && q(a.y) ? (a = this.renderer[this.pathType + "Path"](a), this.singleSetterForParts("d", null, a, "animate", c, e), this.attr({ zIndex: a.zIndexes.group })) : d.prototype.animate.call(this, a, c, e); return this }, fillSetter: function (a) { this.singleSetterForParts("fill", null, { front: a, top: y(a).brighten(.1).get(), side: y(a).brighten(-.1).get() }); this.color = this.fill = a; return this }
        }); t.prototype.elements3d =
            { base: p, cuboid: n }; t.prototype.element3d = function (a, c) { var e = this.g(); b.extend(e, this.elements3d[a]); e.initArgs(c); return e }; t.prototype.cuboid = function (a) { return this.element3d("cuboid", a) }; b.SVGRenderer.prototype.cuboidPath = function (a) {
                function c(a) { return g[a] } var e = a.x, d = a.y, m = a.z, f = a.height, l = a.width, k = a.depth, n = x[this.chartIndex], y = n.options.chart.options3d.alpha, p = 0, g = [{ x: e, y: d, z: m }, { x: e + l, y: d, z: m }, { x: e + l, y: d + f, z: m }, { x: e, y: d + f, z: m }, { x: e, y: d + f, z: m + k }, { x: e + l, y: d + f, z: m + k }, { x: e + l, y: d, z: m + k }, {
                    x: e,
                    y: d, z: m + k
                }]; g = h(g, n, a.insidePlotArea); var v = function (a, e) { var d = [[], -1]; a = a.map(c); e = e.map(c); 0 > b.shapeArea(a) ? d = [a, 0] : 0 > b.shapeArea(e) && (d = [e, 1]); return d }; var r = v([3, 2, 1, 0], [7, 6, 5, 4]); a = r[0]; l = r[1]; r = v([1, 6, 7, 0], [4, 5, 2, 3]); f = r[0]; k = r[1]; r = v([1, 2, 5, 6], [0, 7, 4, 3]); v = r[0]; r = r[1]; 1 === r ? p += 1E4 * (1E3 - e) : r || (p += 1E4 * e); p += 10 * (!k || 0 <= y && 180 >= y || 360 > y && 357.5 < y ? n.plotHeight - d : 10 + d); 1 === l ? p += 100 * m : l || (p += 100 * (1E3 - m)); return {
                    front: this.toLinePath(a, !0), top: this.toLinePath(f, !0), side: this.toLinePath(v, !0), zIndexes: { group: Math.round(p) },
                    isFront: l, isTop: k
                }
            }; b.SVGRenderer.prototype.arc3d = function (c) {
                function m(a) { var c = !1, e = {}, d; a = f(a); for (d in a) -1 !== n.indexOf(d) && (e[d] = a[d], delete a[d], c = !0); return c ? e : !1 } var e = this.g(), h = e.renderer, n = "x y r innerR start end".split(" "); c = f(c); c.alpha = (c.alpha || 0) * l; c.beta = (c.beta || 0) * l; e.top = h.path(); e.side1 = h.path(); e.side2 = h.path(); e.inn = h.path(); e.out = h.path(); e.onAdd = function () {
                    var a = e.parentGroup, c = e.attr("class"); e.top.add(e);["out", "inn", "side1", "side2"].forEach(function (d) {
                        e[d].attr({
                            "class": c +
                                " highcharts-3d-side"
                        }).add(a)
                    })
                };["addClass", "removeClass"].forEach(function (a) { e[a] = function () { var c = arguments;["top", "out", "inn", "side1", "side2"].forEach(function (d) { e[d][a].apply(e[d], c) }) } }); e.setPaths = function (a) {
                    var c = e.renderer.arc3dPath(a), d = 100 * c.zTop; e.attribs = a; e.top.attr({ d: c.top, zIndex: c.zTop }); e.inn.attr({ d: c.inn, zIndex: c.zInn }); e.out.attr({ d: c.out, zIndex: c.zOut }); e.side1.attr({ d: c.side1, zIndex: c.zSide1 }); e.side2.attr({ d: c.side2, zIndex: c.zSide2 }); e.zIndex = d; e.attr({ zIndex: d }); a.center &&
                        (e.top.setRadialReference(a.center), delete a.center)
                }; e.setPaths(c); e.fillSetter = function (a) { var c = y(a).brighten(-.1).get(); this.fill = a; this.side1.attr({ fill: c }); this.side2.attr({ fill: c }); this.inn.attr({ fill: c }); this.out.attr({ fill: c }); this.top.attr({ fill: a }); return this };["opacity", "translateX", "translateY", "visibility"].forEach(function (a) { e[a + "Setter"] = function (a, c) { e[c] = a;["out", "inn", "side1", "side2", "top"].forEach(function (d) { e[d].attr(c, a) }) } }); e.attr = function (c) {
                    var b; "object" === typeof c &&
                        (b = m(c)) && (a(e.attribs, b), e.setPaths(e.attribs)); return d.prototype.attr.apply(e, arguments)
                }; e.animate = function (a, c, h) {
                    var l = this.attribs, n = "data-" + Math.random().toString(26).substring(2, 9); delete a.center; delete a.z; delete a.depth; delete a.alpha; delete a.beta; var y = w(k(c, this.renderer.globalAnimation)); if (y.duration) {
                        var p = m(a); e[n] = 0; a[n] = 1; e[n + "Setter"] = b.noop; p && (y.step = function (a, c) {
                            function e(a) { return l[a] + (k(p[a], l[a]) - l[a]) * c.pos } c.prop === n && c.elem.setPaths(f(l, {
                                x: e("x"), y: e("y"), r: e("r"),
                                innerR: e("innerR"), start: e("start"), end: e("end")
                            }))
                        }); c = y
                    } return d.prototype.animate.call(this, a, c, h)
                }; e.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); return d.prototype.destroy.call(this) }; e.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; e.show = function (a) { this.top.show(a); this.out.show(a); this.inn.show(a); this.side1.show(a); this.side2.show(a) }; return e
            }; t.prototype.arc3dPath =
                function (a) {
                    function c(a) { a %= 2 * Math.PI; a > Math.PI && (a = 2 * Math.PI - a); return a } var e = a.x, d = a.y, b = a.start, f = a.end - .00001, h = a.r, l = a.innerR || 0, m = a.depth || 0, n = a.alpha, k = a.beta, y = Math.cos(b), p = Math.sin(b); a = Math.cos(f); var g = Math.sin(f), w = h * Math.cos(k); h *= Math.cos(n); var t = l * Math.cos(k), x = l * Math.cos(n); l = m * Math.sin(k); var q = m * Math.sin(n); m = ["M", e + w * y, d + h * p]; m = m.concat(z(e, d, w, h, b, f, 0, 0)); m = m.concat(["L", e + t * a, d + x * g]); m = m.concat(z(e, d, t, x, f, b, 0, 0)); m = m.concat(["Z"]); var u = 0 < k ? Math.PI / 2 : 0; k = 0 < n ? 0 : Math.PI / 2;
                    u = b > -u ? b : f > -u ? -u : b; var B = f < A - k ? f : b < A - k ? A - k : f, C = 2 * A - k; n = ["M", e + w * v(u), d + h * r(u)]; n = n.concat(z(e, d, w, h, u, B, 0, 0)); f > C && b < C ? (n = n.concat(["L", e + w * v(B) + l, d + h * r(B) + q]), n = n.concat(z(e, d, w, h, B, C, l, q)), n = n.concat(["L", e + w * v(C), d + h * r(C)]), n = n.concat(z(e, d, w, h, C, f, 0, 0)), n = n.concat(["L", e + w * v(f) + l, d + h * r(f) + q]), n = n.concat(z(e, d, w, h, f, C, l, q)), n = n.concat(["L", e + w * v(C), d + h * r(C)]), n = n.concat(z(e, d, w, h, C, B, 0, 0))) : f > A - k && b < A - k && (n = n.concat(["L", e + w * Math.cos(B) + l, d + h * Math.sin(B) + q]), n = n.concat(z(e, d, w, h, B, f, l, q)), n = n.concat(["L",
                        e + w * Math.cos(f), d + h * Math.sin(f)]), n = n.concat(z(e, d, w, h, f, B, 0, 0))); n = n.concat(["L", e + w * Math.cos(B) + l, d + h * Math.sin(B) + q]); n = n.concat(z(e, d, w, h, B, u, l, q)); n = n.concat(["Z"]); k = ["M", e + t * y, d + x * p]; k = k.concat(z(e, d, t, x, b, f, 0, 0)); k = k.concat(["L", e + t * Math.cos(f) + l, d + x * Math.sin(f) + q]); k = k.concat(z(e, d, t, x, f, b, l, q)); k = k.concat(["Z"]); y = ["M", e + w * y, d + h * p, "L", e + w * y + l, d + h * p + q, "L", e + t * y + l, d + x * p + q, "L", e + t * y, d + x * p, "Z"]; e = ["M", e + w * a, d + h * g, "L", e + w * a + l, d + h * g + q, "L", e + t * a + l, d + x * g + q, "L", e + t * a, d + x * g, "Z"]; g = Math.atan2(q, -l);
                    d = Math.abs(f + g); a = Math.abs(b + g); b = Math.abs((b + f) / 2 + g); d = c(d); a = c(a); b = c(b); b *= 1E5; f = 1E5 * a; d *= 1E5; return { top: m, zTop: 1E5 * Math.PI + 1, out: n, zOut: Math.max(b, f, d), inn: k, zInn: Math.max(b, f, d), side1: y, zSide1: .99 * d, side2: e, zSide2: .99 * f }
                }
    }); B(u, "parts-3d/Chart.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (b, t) {
        function u(b, l) {
            var a = b.plotLeft, f = b.plotWidth + a, h = b.plotTop, k = b.plotHeight + h, d = a + b.plotWidth / 2, c = h + b.plotHeight / 2, p = Number.MAX_VALUE, n = -Number.MAX_VALUE, m = Number.MAX_VALUE, y = -Number.MAX_VALUE,
            e = 1; var g = [{ x: a, y: h, z: 0 }, { x: a, y: h, z: l }];[0, 1].forEach(function (a) { g.push({ x: f, y: g[a].y, z: g[a].z }) });[0, 1, 2, 3].forEach(function (a) { g.push({ x: g[a].x, y: k, z: g[a].z }) }); g = A(g, b, !1); g.forEach(function (a) { p = Math.min(p, a.x); n = Math.max(n, a.x); m = Math.min(m, a.y); y = Math.max(y, a.y) }); a > p && (e = Math.min(e, 1 - Math.abs((a + d) / (p + d)) % 1)); f < n && (e = Math.min(e, (f - d) / (n - d))); h > m && (e = 0 > m ? Math.min(e, (h + c) / (-m + h + c)) : Math.min(e, 1 - (h + c) / (m + c) % 1)); k < y && (e = Math.min(e, Math.abs((k - c) / (y - c)))); return e
        } var q = t.isArray; t = b.addEvent;
        var g = b.Chart, v = b.merge, A = b.perspective, r = b.pick, w = b.wrap; g.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; g.prototype.propsRequireDirtyBox.push("chart.options3d"); g.prototype.propsRequireUpdateSeries.push("chart.options3d"); t(g, "afterInit", function () { var b = this.options; this.is3d() && (b.series || []).forEach(function (l) { "scatter" === (l.type || b.chart.type || b.chart.defaultSeriesType) && (l.type = "scatter3d") }) }); t(g, "addSeries", function (b) {
            this.is3d() &&
            "scatter" === b.options.type && (b.options.type = "scatter3d")
        }); b.wrap(b.Chart.prototype, "isInsidePlot", function (b) { return this.is3d() || b.apply(this, [].slice.call(arguments, 1)) }); var x = b.getOptions(); v(!0, x, { chart: { options3d: { enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, axisLabelPosition: null, frame: { visible: "default", size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {} } } } }); t(g, "afterGetContainer", function () {
        this.styledMode && (this.renderer.definition({ tagName: "style", textContent: ".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n" }),
            [{ name: "darker", slope: .6 }, { name: "brighter", slope: 1.4 }].forEach(function (b) { this.renderer.definition({ tagName: "filter", id: "highcharts-" + b.name, children: [{ tagName: "feComponentTransfer", children: [{ tagName: "feFuncR", type: "linear", slope: b.slope }, { tagName: "feFuncG", type: "linear", slope: b.slope }, { tagName: "feFuncB", type: "linear", slope: b.slope }] }] }) }, this))
        }); w(g.prototype, "setClassName", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.is3d() && (this.container.className += " highcharts-3d-chart") }); t(b.Chart,
            "afterSetChartSize", function () { var b = this.options.chart.options3d; if (this.is3d()) { var l = this.inverted, a = this.clipBox, f = this.margin; a[l ? "y" : "x"] = -(f[3] || 0); a[l ? "x" : "y"] = -(f[0] || 0); a[l ? "height" : "width"] = this.chartWidth + (f[3] || 0) + (f[1] || 0); a[l ? "width" : "height"] = this.chartHeight + (f[0] || 0) + (f[2] || 0); this.scale3d = 1; !0 === b.fitToPlot && (this.scale3d = u(this, b.depth)); this.frame3d = this.get3dFrame() } }); t(g, "beforeRedraw", function () { this.is3d() && (this.isDirtyBox = !0) }); t(g, "beforeRender", function () {
                this.is3d() &&
                (this.frame3d = this.get3dFrame())
            }); w(g.prototype, "renderSeries", function (b) { var l = this.series.length; if (this.is3d()) for (; l--;)b = this.series[l], b.translate(), b.render(); else b.call(this) }); t(g, "afterDrawChartBox", function () {
                if (this.is3d()) {
                    var y = this.renderer, l = this.options.chart.options3d, a = this.get3dFrame(), f = this.plotLeft, h = this.plotLeft + this.plotWidth, k = this.plotTop, d = this.plotTop + this.plotHeight; l = l.depth; var c = f - (a.left.visible ? a.left.size : 0), p = h + (a.right.visible ? a.right.size : 0), n = k - (a.top.visible ?
                        a.top.size : 0), m = d + (a.bottom.visible ? a.bottom.size : 0), g = 0 - (a.front.visible ? a.front.size : 0), e = l + (a.back.visible ? a.back.size : 0), r = this.hasRendered ? "animate" : "attr"; this.frame3d = a; this.frameShapes || (this.frameShapes = { bottom: y.polyhedron().add(), top: y.polyhedron().add(), left: y.polyhedron().add(), right: y.polyhedron().add(), back: y.polyhedron().add(), front: y.polyhedron().add() }); this.frameShapes.bottom[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: a.bottom.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.bottom.color).brighten(.1).get(),
                                vertexes: [{ x: c, y: m, z: g }, { x: p, y: m, z: g }, { x: p, y: m, z: e }, { x: c, y: m, z: e }], enabled: a.bottom.visible
                            }, { fill: b.color(a.bottom.color).brighten(.1).get(), vertexes: [{ x: f, y: d, z: l }, { x: h, y: d, z: l }, { x: h, y: d, z: 0 }, { x: f, y: d, z: 0 }], enabled: a.bottom.visible }, { fill: b.color(a.bottom.color).brighten(-.1).get(), vertexes: [{ x: c, y: m, z: g }, { x: c, y: m, z: e }, { x: f, y: d, z: l }, { x: f, y: d, z: 0 }], enabled: a.bottom.visible && !a.left.visible }, {
                                fill: b.color(a.bottom.color).brighten(-.1).get(), vertexes: [{ x: p, y: m, z: e }, { x: p, y: m, z: g }, { x: h, y: d, z: 0 }, {
                                    x: h,
                                    y: d, z: l
                                }], enabled: a.bottom.visible && !a.right.visible
                            }, { fill: b.color(a.bottom.color).get(), vertexes: [{ x: p, y: m, z: g }, { x: c, y: m, z: g }, { x: f, y: d, z: 0 }, { x: h, y: d, z: 0 }], enabled: a.bottom.visible && !a.front.visible }, { fill: b.color(a.bottom.color).get(), vertexes: [{ x: c, y: m, z: e }, { x: p, y: m, z: e }, { x: h, y: d, z: l }, { x: f, y: d, z: l }], enabled: a.bottom.visible && !a.back.visible }]
                        }); this.frameShapes.top[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-top", zIndex: a.top.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.top.color).brighten(.1).get(),
                                vertexes: [{ x: c, y: n, z: e }, { x: p, y: n, z: e }, { x: p, y: n, z: g }, { x: c, y: n, z: g }], enabled: a.top.visible
                            }, { fill: b.color(a.top.color).brighten(.1).get(), vertexes: [{ x: f, y: k, z: 0 }, { x: h, y: k, z: 0 }, { x: h, y: k, z: l }, { x: f, y: k, z: l }], enabled: a.top.visible }, { fill: b.color(a.top.color).brighten(-.1).get(), vertexes: [{ x: c, y: n, z: e }, { x: c, y: n, z: g }, { x: f, y: k, z: 0 }, { x: f, y: k, z: l }], enabled: a.top.visible && !a.left.visible }, {
                                fill: b.color(a.top.color).brighten(-.1).get(), vertexes: [{ x: p, y: n, z: g }, { x: p, y: n, z: e }, { x: h, y: k, z: l }, { x: h, y: k, z: 0 }], enabled: a.top.visible &&
                                    !a.right.visible
                            }, { fill: b.color(a.top.color).get(), vertexes: [{ x: c, y: n, z: g }, { x: p, y: n, z: g }, { x: h, y: k, z: 0 }, { x: f, y: k, z: 0 }], enabled: a.top.visible && !a.front.visible }, { fill: b.color(a.top.color).get(), vertexes: [{ x: p, y: n, z: e }, { x: c, y: n, z: e }, { x: f, y: k, z: l }, { x: h, y: k, z: l }], enabled: a.top.visible && !a.back.visible }]
                        }); this.frameShapes.left[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-left", zIndex: a.left.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.left.color).brighten(.1).get(), vertexes: [{ x: c, y: m, z: g }, {
                                    x: f,
                                    y: d, z: 0
                                }, { x: f, y: d, z: l }, { x: c, y: m, z: e }], enabled: a.left.visible && !a.bottom.visible
                            }, { fill: b.color(a.left.color).brighten(.1).get(), vertexes: [{ x: c, y: n, z: e }, { x: f, y: k, z: l }, { x: f, y: k, z: 0 }, { x: c, y: n, z: g }], enabled: a.left.visible && !a.top.visible }, { fill: b.color(a.left.color).brighten(-.1).get(), vertexes: [{ x: c, y: m, z: e }, { x: c, y: n, z: e }, { x: c, y: n, z: g }, { x: c, y: m, z: g }], enabled: a.left.visible }, { fill: b.color(a.left.color).brighten(-.1).get(), vertexes: [{ x: f, y: k, z: l }, { x: f, y: d, z: l }, { x: f, y: d, z: 0 }, { x: f, y: k, z: 0 }], enabled: a.left.visible },
                            { fill: b.color(a.left.color).get(), vertexes: [{ x: c, y: m, z: g }, { x: c, y: n, z: g }, { x: f, y: k, z: 0 }, { x: f, y: d, z: 0 }], enabled: a.left.visible && !a.front.visible }, { fill: b.color(a.left.color).get(), vertexes: [{ x: c, y: n, z: e }, { x: c, y: m, z: e }, { x: f, y: d, z: l }, { x: f, y: k, z: l }], enabled: a.left.visible && !a.back.visible }]
                        }); this.frameShapes.right[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-right", zIndex: a.right.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.right.color).brighten(.1).get(), vertexes: [{ x: p, y: m, z: e }, { x: h, y: d, z: l }, {
                                    x: h,
                                    y: d, z: 0
                                }, { x: p, y: m, z: g }], enabled: a.right.visible && !a.bottom.visible
                            }, { fill: b.color(a.right.color).brighten(.1).get(), vertexes: [{ x: p, y: n, z: g }, { x: h, y: k, z: 0 }, { x: h, y: k, z: l }, { x: p, y: n, z: e }], enabled: a.right.visible && !a.top.visible }, { fill: b.color(a.right.color).brighten(-.1).get(), vertexes: [{ x: h, y: k, z: 0 }, { x: h, y: d, z: 0 }, { x: h, y: d, z: l }, { x: h, y: k, z: l }], enabled: a.right.visible }, { fill: b.color(a.right.color).brighten(-.1).get(), vertexes: [{ x: p, y: m, z: g }, { x: p, y: n, z: g }, { x: p, y: n, z: e }, { x: p, y: m, z: e }], enabled: a.right.visible },
                            { fill: b.color(a.right.color).get(), vertexes: [{ x: p, y: n, z: g }, { x: p, y: m, z: g }, { x: h, y: d, z: 0 }, { x: h, y: k, z: 0 }], enabled: a.right.visible && !a.front.visible }, { fill: b.color(a.right.color).get(), vertexes: [{ x: p, y: m, z: e }, { x: p, y: n, z: e }, { x: h, y: k, z: l }, { x: h, y: d, z: l }], enabled: a.right.visible && !a.back.visible }]
                        }); this.frameShapes.back[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: a.back.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.back.color).brighten(.1).get(), vertexes: [{ x: p, y: m, z: e }, { x: c, y: m, z: e }, {
                                    x: f,
                                    y: d, z: l
                                }, { x: h, y: d, z: l }], enabled: a.back.visible && !a.bottom.visible
                            }, { fill: b.color(a.back.color).brighten(.1).get(), vertexes: [{ x: c, y: n, z: e }, { x: p, y: n, z: e }, { x: h, y: k, z: l }, { x: f, y: k, z: l }], enabled: a.back.visible && !a.top.visible }, { fill: b.color(a.back.color).brighten(-.1).get(), vertexes: [{ x: c, y: m, z: e }, { x: c, y: n, z: e }, { x: f, y: k, z: l }, { x: f, y: d, z: l }], enabled: a.back.visible && !a.left.visible }, {
                                fill: b.color(a.back.color).brighten(-.1).get(), vertexes: [{ x: p, y: n, z: e }, { x: p, y: m, z: e }, { x: h, y: d, z: l }, { x: h, y: k, z: l }], enabled: a.back.visible &&
                                    !a.right.visible
                            }, { fill: b.color(a.back.color).get(), vertexes: [{ x: f, y: k, z: l }, { x: h, y: k, z: l }, { x: h, y: d, z: l }, { x: f, y: d, z: l }], enabled: a.back.visible }, { fill: b.color(a.back.color).get(), vertexes: [{ x: c, y: m, z: e }, { x: p, y: m, z: e }, { x: p, y: n, z: e }, { x: c, y: n, z: e }], enabled: a.back.visible }]
                        }); this.frameShapes.front[r]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-front", zIndex: a.front.frontFacing ? -1E3 : 1E3, faces: [{
                                fill: b.color(a.front.color).brighten(.1).get(), vertexes: [{ x: c, y: m, z: g }, { x: p, y: m, z: g }, { x: h, y: d, z: 0 }, {
                                    x: f,
                                    y: d, z: 0
                                }], enabled: a.front.visible && !a.bottom.visible
                            }, { fill: b.color(a.front.color).brighten(.1).get(), vertexes: [{ x: p, y: n, z: g }, { x: c, y: n, z: g }, { x: f, y: k, z: 0 }, { x: h, y: k, z: 0 }], enabled: a.front.visible && !a.top.visible }, { fill: b.color(a.front.color).brighten(-.1).get(), vertexes: [{ x: c, y: n, z: g }, { x: c, y: m, z: g }, { x: f, y: d, z: 0 }, { x: f, y: k, z: 0 }], enabled: a.front.visible && !a.left.visible }, {
                                fill: b.color(a.front.color).brighten(-.1).get(), vertexes: [{ x: p, y: m, z: g }, { x: p, y: n, z: g }, { x: h, y: k, z: 0 }, { x: h, y: d, z: 0 }], enabled: a.front.visible &&
                                    !a.right.visible
                            }, { fill: b.color(a.front.color).get(), vertexes: [{ x: h, y: k, z: 0 }, { x: f, y: k, z: 0 }, { x: f, y: d, z: 0 }, { x: h, y: d, z: 0 }], enabled: a.front.visible }, { fill: b.color(a.front.color).get(), vertexes: [{ x: p, y: m, z: g }, { x: c, y: m, z: g }, { x: c, y: n, z: g }, { x: p, y: n, z: g }], enabled: a.front.visible }]
                        })
                }
            }); g.prototype.retrieveStacks = function (b) {
                var l = this.series, a = {}, f, h = 1; this.series.forEach(function (k) { f = r(k.options.stack, b ? 0 : l.length - 1 - k.index); a[f] ? a[f].series.push(k) : (a[f] = { series: [k], position: h }, h++) }); a.totalStacks = h + 1;
                return a
            }; g.prototype.get3dFrame = function () {
                var g = this, l = g.options.chart.options3d, a = l.frame, f = g.plotLeft, h = g.plotLeft + g.plotWidth, k = g.plotTop, d = g.plotTop + g.plotHeight, c = l.depth, p = function (a) { a = b.shapeArea3d(a, g); return .5 < a ? 1 : -.5 > a ? -1 : 0 }, n = p([{ x: f, y: d, z: c }, { x: h, y: d, z: c }, { x: h, y: d, z: 0 }, { x: f, y: d, z: 0 }]), m = p([{ x: f, y: k, z: 0 }, { x: h, y: k, z: 0 }, { x: h, y: k, z: c }, { x: f, y: k, z: c }]), v = p([{ x: f, y: k, z: 0 }, { x: f, y: k, z: c }, { x: f, y: d, z: c }, { x: f, y: d, z: 0 }]), e = p([{ x: h, y: k, z: c }, { x: h, y: k, z: 0 }, { x: h, y: d, z: 0 }, { x: h, y: d, z: c }]), w = p([{
                    x: f, y: d,
                    z: 0
                }, { x: h, y: d, z: 0 }, { x: h, y: k, z: 0 }, { x: f, y: k, z: 0 }]); p = p([{ x: f, y: k, z: c }, { x: h, y: k, z: c }, { x: h, y: d, z: c }, { x: f, y: d, z: c }]); var t = !1, q = !1, x = !1, u = !1;[].concat(g.xAxis, g.yAxis, g.zAxis).forEach(function (a) { a && (a.horiz ? a.opposite ? q = !0 : t = !0 : a.opposite ? u = !0 : x = !0) }); var z = function (a, c, d) {
                    for (var e = ["size", "color", "visible"], b = {}, f = 0; f < e.length; f++)for (var h = e[f], n = 0; n < a.length; n++)if ("object" === typeof a[n]) { var l = a[n][h]; if (void 0 !== l && null !== l) { b[h] = l; break } } a = d; !0 === b.visible || !1 === b.visible ? a = b.visible : "auto" ===
                        b.visible && (a = 0 < c); return { size: r(b.size, 1), color: r(b.color, "none"), frontFacing: 0 < c, visible: a }
                }; a = { axes: {}, bottom: z([a.bottom, a.top, a], n, t), top: z([a.top, a.bottom, a], m, q), left: z([a.left, a.right, a.side, a], v, x), right: z([a.right, a.left, a.side, a], e, u), back: z([a.back, a.front, a], p, !0), front: z([a.front, a.back, a], w, !1) }; "auto" === l.axisLabelPosition ? (e = function (a, c) { return a.visible !== c.visible || a.visible && c.visible && a.frontFacing !== c.frontFacing }, l = [], e(a.left, a.front) && l.push({
                    y: (k + d) / 2, x: f, z: 0, xDir: {
                        x: 1,
                        y: 0, z: 0
                    }
                }), e(a.left, a.back) && l.push({ y: (k + d) / 2, x: f, z: c, xDir: { x: 0, y: 0, z: -1 } }), e(a.right, a.front) && l.push({ y: (k + d) / 2, x: h, z: 0, xDir: { x: 0, y: 0, z: 1 } }), e(a.right, a.back) && l.push({ y: (k + d) / 2, x: h, z: c, xDir: { x: -1, y: 0, z: 0 } }), n = [], e(a.bottom, a.front) && n.push({ x: (f + h) / 2, y: d, z: 0, xDir: { x: 1, y: 0, z: 0 } }), e(a.bottom, a.back) && n.push({ x: (f + h) / 2, y: d, z: c, xDir: { x: -1, y: 0, z: 0 } }), m = [], e(a.top, a.front) && m.push({ x: (f + h) / 2, y: k, z: 0, xDir: { x: 1, y: 0, z: 0 } }), e(a.top, a.back) && m.push({ x: (f + h) / 2, y: k, z: c, xDir: { x: -1, y: 0, z: 0 } }), v = [], e(a.bottom,
                    a.left) && v.push({ z: (0 + c) / 2, y: d, x: f, xDir: { x: 0, y: 0, z: -1 } }), e(a.bottom, a.right) && v.push({ z: (0 + c) / 2, y: d, x: h, xDir: { x: 0, y: 0, z: 1 } }), d = [], e(a.top, a.left) && d.push({ z: (0 + c) / 2, y: k, x: f, xDir: { x: 0, y: 0, z: -1 } }), e(a.top, a.right) && d.push({ z: (0 + c) / 2, y: k, x: h, xDir: { x: 0, y: 0, z: 1 } }), f = function (a, c, d) { if (0 === a.length) return null; if (1 === a.length) return a[0]; for (var e = 0, b = A(a, g, !1), f = 1; f < b.length; f++)d * b[f][c] > d * b[e][c] ? e = f : d * b[f][c] === d * b[e][c] && b[f].z < b[e].z && (e = f); return a[e] }, a.axes = {
                        y: { left: f(l, "x", -1), right: f(l, "x", 1) },
                        x: { top: f(m, "y", -1), bottom: f(n, "y", 1) }, z: { top: f(d, "y", -1), bottom: f(v, "y", 1) }
                    }) : a.axes = { y: { left: { x: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }, right: { x: h, z: 0, xDir: { x: 0, y: 0, z: 1 } } }, x: { top: { y: k, z: 0, xDir: { x: 1, y: 0, z: 0 } }, bottom: { y: d, z: 0, xDir: { x: 1, y: 0, z: 0 } } }, z: { top: { x: x ? h : f, y: k, xDir: x ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } }, bottom: { x: x ? h : f, y: d, xDir: x ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } } } }; return a
            }; b.Fx.prototype.matrixSetter = function () {
                if (1 > this.pos && (q(this.start) || q(this.end))) {
                    var b = this.start || [1, 0, 0, 1, 0, 0], l = this.end || [1, 0, 0, 1, 0, 0]; var a =
                        []; for (var f = 0; 6 > f; f++)a.push(this.pos * l[f] + (1 - this.pos) * b[f])
                } else a = this.end; this.elem.attr(this.prop, a, null, !0)
            }; ""
    }); B(u, "parts-3d/Axis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (b, t) {
        function u(d, c, b) {
            if (!d.chart.is3d() || "colorAxis" === d.coll) return c; var f = d.chart, h = A * f.options.chart.options3d.alpha, k = A * f.options.chart.options3d.beta, e = l(b && d.options.title.position3d, d.options.labels.position3d); b = l(b && d.options.title.skew3d, d.options.labels.skew3d); var g = f.frame3d, p = f.plotLeft,
                r = f.plotWidth + p, y = f.plotTop, v = f.plotHeight + y; f = !1; var w = 0, t = 0, q = { x: 0, y: 1, z: 0 }; c = d.swapZ({ x: c.x, y: c.y, z: 0 }); if (d.isZAxis) if (d.opposite) { if (null === g.axes.z.top) return {}; t = c.y - y; c.x = g.axes.z.top.x; c.y = g.axes.z.top.y; p = g.axes.z.top.xDir; f = !g.top.frontFacing } else { if (null === g.axes.z.bottom) return {}; t = c.y - v; c.x = g.axes.z.bottom.x; c.y = g.axes.z.bottom.y; p = g.axes.z.bottom.xDir; f = !g.bottom.frontFacing } else if (d.horiz) if (d.opposite) {
                    if (null === g.axes.x.top) return {}; t = c.y - y; c.y = g.axes.x.top.y; c.z = g.axes.x.top.z;
                    p = g.axes.x.top.xDir; f = !g.top.frontFacing
                } else { if (null === g.axes.x.bottom) return {}; t = c.y - v; c.y = g.axes.x.bottom.y; c.z = g.axes.x.bottom.z; p = g.axes.x.bottom.xDir; f = !g.bottom.frontFacing } else if (d.opposite) { if (null === g.axes.y.right) return {}; w = c.x - r; c.x = g.axes.y.right.x; c.z = g.axes.y.right.z; p = g.axes.y.right.xDir; p = { x: p.z, y: p.y, z: -p.x } } else { if (null === g.axes.y.left) return {}; w = c.x - p; c.x = g.axes.y.left.x; c.z = g.axes.y.left.z; p = g.axes.y.left.xDir } "chart" !== e && ("flap" === e ? d.horiz ? (k = Math.sin(h), h = Math.cos(h), d.opposite &&
                    (k = -k), f && (k = -k), q = { x: p.z * k, y: h, z: -p.x * k }) : p = { x: Math.cos(k), y: 0, z: Math.sin(k) } : "ortho" === e ? d.horiz ? (q = Math.cos(h), e = Math.sin(k) * q, h = -Math.sin(h), k = -q * Math.cos(k), q = { x: p.y * k - p.z * h, y: p.z * e - p.x * k, z: p.x * h - p.y * e }, h = 1 / Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z), f && (h = -h), q = { x: h * q.x, y: h * q.y, z: h * q.z }) : p = { x: Math.cos(k), y: 0, z: Math.sin(k) } : d.horiz ? q = { x: Math.sin(k) * Math.sin(h), y: Math.cos(h), z: -Math.cos(k) * Math.sin(h) } : p = { x: Math.cos(k), y: 0, z: Math.sin(k) }); c.x += w * p.x + t * q.x; c.y += w * p.y + t * q.y; c.z += w * p.z + t * q.z; f = x([c], d.chart)[0];
            b && (0 > a(x([c, { x: c.x + p.x, y: c.y + p.y, z: c.z + p.z }, { x: c.x + q.x, y: c.y + q.y, z: c.z + q.z }], d.chart)) && (p = { x: -p.x, y: -p.y, z: -p.z }), d = x([{ x: c.x, y: c.y, z: c.z }, { x: c.x + p.x, y: c.y + p.y, z: c.z + p.z }, { x: c.x + q.x, y: c.y + q.y, z: c.z + q.z }], d.chart), f.matrix = [d[1].x - d[0].x, d[1].y - d[0].y, d[2].x - d[0].x, d[2].y - d[0].y, f.x, f.y], f.matrix[4] -= f.x * f.matrix[0] + f.y * f.matrix[2], f.matrix[5] -= f.x * f.matrix[1] + f.y * f.matrix[3]); return f
        } var q = t.splat; t = b.addEvent; var g = b.Axis, v = b.Chart, A = b.deg2rad, r = b.extend, w = b.merge, x = b.perspective, y = b.perspective3D,
            l = b.pick, a = b.shapeArea, f = b.Tick, h = b.wrap; w(!0, g.prototype.defaultOptions, { labels: { position3d: "offset", skew3d: !1 }, title: { position3d: null, skew3d: null } }); t(g, "afterSetOptions", function () { if (this.chart.is3d && this.chart.is3d() && "colorAxis" !== this.coll) { var a = this.options; a.tickWidth = l(a.tickWidth, 0); a.gridLineWidth = l(a.gridLineWidth, 1) } }); h(g.prototype, "getPlotLinePath", function (a) {
                var c = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d() || "colorAxis" === this.coll || null === c) return c; var d = this.chart,
                    b = d.options.chart.options3d; b = this.isZAxis ? d.plotWidth : b.depth; d = d.frame3d; c = [this.swapZ({ x: c[1], y: c[2], z: 0 }), this.swapZ({ x: c[1], y: c[2], z: b }), this.swapZ({ x: c[4], y: c[5], z: 0 }), this.swapZ({ x: c[4], y: c[5], z: b })]; b = []; this.horiz ? (this.isZAxis ? (d.left.visible && b.push(c[0], c[2]), d.right.visible && b.push(c[1], c[3])) : (d.front.visible && b.push(c[0], c[2]), d.back.visible && b.push(c[1], c[3])), d.top.visible && b.push(c[0], c[1]), d.bottom.visible && b.push(c[2], c[3])) : (d.front.visible && b.push(c[0], c[2]), d.back.visible &&
                        b.push(c[1], c[3]), d.left.visible && b.push(c[0], c[1]), d.right.visible && b.push(c[2], c[3])); b = x(b, this.chart, !1); return this.chart.renderer.toLineSegments(b)
            }); h(g.prototype, "getLinePath", function (a) { return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1)) }); h(g.prototype, "getPlotBandPath", function (a) {
                if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1)); var c = arguments, d = c[2], b = []; c = this.getPlotLinePath({ value: c[1] }); d = this.getPlotLinePath({ value: d });
                if (c && d) for (var f = 0; f < c.length; f += 6)b.push("M", c[f + 1], c[f + 2], "L", c[f + 4], c[f + 5], "L", d[f + 4], d[f + 5], "L", d[f + 1], d[f + 2], "Z"); return b
            }); h(f.prototype, "getMarkPath", function (a) { var c = a.apply(this, [].slice.call(arguments, 1)); c = [u(this.axis, { x: c[1], y: c[2], z: 0 }), u(this.axis, { x: c[4], y: c[5], z: 0 })]; return this.axis.chart.renderer.toLineSegments(c) }); t(f, "afterGetLabelPosition", function (a) { r(a.pos, u(this.axis, a.pos)) }); h(g.prototype, "getTitlePosition", function (a) {
                var c = a.apply(this, [].slice.call(arguments, 1));
                return u(this, c, !0)
            }); t(g, "drawCrosshair", function (a) { this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos) }); t(g, "destroy", function () { ["backFrame", "bottomFrame", "sideFrame"].forEach(function (a) { this[a] && (this[a] = this[a].destroy()) }, this) }); g.prototype.swapZ = function (a, c) { return this.isZAxis ? (c = c ? 0 : this.chart.plotLeft, { x: c + a.z, y: a.y, z: a.x - c }) : a }; var k = b.ZAxis = function () { this.init.apply(this, arguments) }; r(k.prototype, g.prototype);
        r(k.prototype, {
            isZAxis: !0, setOptions: function (a) { a = w({ offset: 0, lineWidth: 0 }, a); g.prototype.setOptions.call(this, a); this.coll = "zAxis" }, setAxisSize: function () { g.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left }, getSeriesExtremes: function () {
                var a = this, c = a.chart; a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null; a.buildStacks && a.buildStacks(); a.series.forEach(function (b) {
                    if (b.visible ||
                        !c.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, b = b.zData, b.length && (a.dataMin = Math.min(l(a.dataMin, b[0]), Math.min.apply(null, b)), a.dataMax = Math.max(l(a.dataMax, b[0]), Math.max.apply(null, b)))
                })
            }
        }); t(v, "afterGetAxes", function () { var a = this, c = this.options; c = c.zAxis = q(c.zAxis || {}); a.is3d() && (this.zAxis = [], c.forEach(function (c, b) { c.index = b; c.isX = !0; (new k(a, c)).setScale() })) }); h(g.prototype, "getSlotWidth", function (a, c) {
            if (this.chart.is3d() && c && c.label && this.categories && this.chart.frameShapes) {
                var b =
                    this.chart, d = this.ticks, f = this.gridGroup.element.childNodes[0].getBBox(), h = b.frameShapes.left.getBBox(), e = b.options.chart.options3d; b = { x: b.plotWidth / 2, y: b.plotHeight / 2, z: e.depth / 2, vd: l(e.depth, 1) * l(e.viewDistance, 0) }; var g, k; e = c.pos; var r = d[e - 1]; d = d[e + 1]; 0 !== e && r && r.label.xy && (g = y({ x: r.label.xy.x, y: r.label.xy.y, z: null }, b, b.vd)); d && d.label.xy && (k = y({ x: d.label.xy.x, y: d.label.xy.y, z: null }, b, b.vd)); d = { x: c.label.xy.x, y: c.label.xy.y, z: null }; d = y(d, b, b.vd); return Math.abs(g ? d.x - g.x : k ? k.x - d.x : f.x - h.x)
            } return a.apply(this,
                [].slice.call(arguments, 1))
        })
    }); B(u, "parts-3d/Series.js", [u["parts/Globals.js"]], function (b) {
        var t = b.addEvent, u = b.perspective, q = b.pick; t(b.Series, "afterTranslate", function () { this.chart.is3d() && this.translate3dPoints() }); b.Series.prototype.translate3dPoints = function () {
            var b = this.chart, v = q(this.zAxis, b.options.zAxis[0]), t = [], r; for (r = 0; r < this.data.length; r++) {
                var w = this.data[r]; if (v && v.translate) {
                    var x = v.isLog && v.val2lin ? v.val2lin(w.z) : w.z; w.plotZ = v.translate(x); w.isInside = w.isInside ? x >= v.min && x <= v.max :
                        !1
                } else w.plotZ = 0; w.axisXpos = w.plotX; w.axisYpos = w.plotY; w.axisZpos = w.plotZ; t.push({ x: w.plotX, y: w.plotY, z: w.plotZ })
            } b = u(t, b, !0); for (r = 0; r < this.data.length; r++)w = this.data[r], v = b[r], w.plotX = v.x, w.plotY = v.y, w.plotZ = v.z
        }
    }); B(u, "parts-3d/Column.js", [u["parts/Globals.js"]], function (b) {
        function t(b) { var g = b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d && this.chart.is3d() && (g.stroke = this.options.edgeColor || g.fill, g["stroke-width"] = v(this.options.edgeWidth, 1)); return g } function u(b, g, a) {
            var f = this.chart.is3d &&
                this.chart.is3d(); f && (this.options.inactiveOtherPoints = !0); b.call(this, g, a); f && (this.options.inactiveOtherPoints = !1)
        } var q = b.addEvent, g = b.perspective, v = b.pick, A = b.Series, r = b.seriesTypes, w = b.svg, x = b.wrap; x(r.column.prototype, "translate", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.translate3dShapes() }); x(b.Series.prototype, "alignDataLabel", function (b) { arguments[3].outside3dPlot = arguments[1].outside3dPlot; b.apply(this, [].slice.call(arguments, 1)) }); x(b.Series.prototype,
            "justifyDataLabel", function (b) { return arguments[2].outside3dPlot ? !1 : b.apply(this, [].slice.call(arguments, 1)) }); r.column.prototype.translate3dPoints = function () { }; r.column.prototype.translate3dShapes = function () {
                var b = this, l = b.chart, a = b.options, f = a.depth || 25, h = (a.stacking ? a.stack || 0 : b.index) * (f + (a.groupZPadding || 1)), k = b.borderWidth % 2 ? .5 : 0; l.inverted && !b.yAxis.reversed && (k *= -1); !1 !== a.grouping && (h = 0); h += a.groupZPadding || 1; b.data.forEach(function (a) {
                a.outside3dPlot = null; if (null !== a.y) {
                    var c = a.shapeArgs,
                    d = a.tooltipPos, n;[["x", "width"], ["y", "height"]].forEach(function (d) { n = c[d[0]] - k; 0 > n && (c[d[1]] += c[d[0]] + k, c[d[0]] = -k, n = 0); n + c[d[1]] > b[d[0] + "Axis"].len && 0 !== c[d[1]] && (c[d[1]] = b[d[0] + "Axis"].len - c[d[0]]); if (0 !== c[d[1]] && (c[d[0]] >= b[d[0] + "Axis"].len || c[d[0]] + c[d[1]] <= k)) { for (var f in c) c[f] = 0; a.outside3dPlot = !0 } }); "rect" === a.shapeType && (a.shapeType = "cuboid"); c.z = h; c.depth = f; c.insidePlotArea = !0; d = g([{ x: d[0], y: d[1], z: h }], l, !0)[0]; a.tooltipPos = [d.x, d.y]
                }
                }); b.z = h
            }; x(r.column.prototype, "animate", function (b) {
                if (this.chart.is3d()) {
                    var g =
                        arguments[1], a = this.yAxis, f = this, h = this.yAxis.reversed; w && (g ? f.data.forEach(function (b) { null !== b.y && (b.height = b.shapeArgs.height, b.shapey = b.shapeArgs.y, b.shapeArgs.height = 1, h || (b.shapeArgs.y = b.stackY ? b.plotY + a.translate(b.stackY) : b.plotY + (b.negative ? -b.height : b.height))) }) : (f.data.forEach(function (a) { null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, f.options.animation)) }), this.drawDataLabels(), f.animate = null))
                } else b.apply(this, [].slice.call(arguments,
                    1))
            }); x(r.column.prototype, "plotGroup", function (b, g, a, f, h, k) { this.chart.is3d() && (this[g] && delete this[g], k && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(k)), this[g] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[g].survive = !0, "group" === g || "markerGroup" === g)) && (arguments[3] = "visible"); return b.apply(this, Array.prototype.slice.call(arguments, 1)) }); x(r.column.prototype, "setVisible", function (b, g) {
                var a = this, f; a.chart.is3d() && a.data.forEach(function (b) {
                    f =
                    (b.visible = b.options.visible = g = void 0 === g ? !v(a.visible, b.visible) : g) ? "visible" : "hidden"; a.options.data[a.data.indexOf(b)] = b.options; b.graphic && b.graphic.attr({ visibility: f })
                }); b.apply(this, Array.prototype.slice.call(arguments, 1))
            }); r.column.prototype.handle3dGrouping = !0; q(A, "afterInit", function () {
                if (this.chart.is3d() && this.handle3dGrouping) {
                    var b = this.options, g = b.grouping, a = b.stacking, f = v(this.yAxis.options.reversedStacks, !0), h = 0; if (void 0 === g || g) {
                        g = this.chart.retrieveStacks(a); h = b.stack || 0; for (a =
                            0; a < g[h].series.length && g[h].series[a] !== this; a++); h = 10 * (g.totalStacks - g[h].position) + (f ? a : -a); this.xAxis.reversed || (h = 10 * g.totalStacks - h)
                    } b.zIndex = h
                }
            }); x(r.column.prototype, "pointAttribs", t); x(r.column.prototype, "setState", u); r.columnrange && (x(r.columnrange.prototype, "pointAttribs", t), x(r.columnrange.prototype, "setState", u), r.columnrange.prototype.plotGroup = r.column.prototype.plotGroup, r.columnrange.prototype.setVisible = r.column.prototype.setVisible); x(A.prototype, "alignDataLabel", function (b) {
                if (this.chart.is3d() &&
                    this instanceof r.column) { var l = arguments, a = l[4]; l = l[1]; var f = { x: a.x, y: a.y, z: this.z }; f = g([f], this.chart, !0)[0]; a.x = f.x; a.y = l.outside3dPlot ? -9E9 : f.y } b.apply(this, [].slice.call(arguments, 1))
            }); x(b.StackItem.prototype, "getStackBox", function (g, l) { var a = g.apply(this, [].slice.call(arguments, 1)); if (l.is3d()) { var f = { x: a.x, y: a.y, z: 0 }; f = b.perspective([f], l, !0)[0]; a.x = f.x; a.y = f.y } return a })
    }); B(u, "parts-3d/Pie.js", [u["parts/Globals.js"]], function (b) {
        var t = b.deg2rad, u = b.pick, q = b.seriesTypes, g = b.svg; b = b.wrap;
        b(q.pie.prototype, "translate", function (b) {
            b.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var g = this, r = g.options, q = r.depth || 0, v = g.chart.options.chart.options3d, u = v.alpha, l = v.beta, a = r.stacking ? (r.stack || 0) * q : g._i * q; a += q / 2; !1 !== r.grouping && (a = 0); g.data.forEach(function (b) {
                    var f = b.shapeArgs; b.shapeType = "arc3d"; f.z = a; f.depth = .75 * q; f.alpha = u; f.beta = l; f.center = g.center; f = (f.end + f.start) / 2; b.slicedTranslation = {
                        translateX: Math.round(Math.cos(f) * r.slicedOffset * Math.cos(u * t)), translateY: Math.round(Math.sin(f) *
                            r.slicedOffset * Math.cos(u * t))
                    }
                })
            }
        }); b(q.pie.prototype.pointClass.prototype, "haloPath", function (b) { var g = arguments; return this.series.chart.is3d() ? [] : b.call(this, g[1]) }); b(q.pie.prototype, "pointAttribs", function (b, g, r) { b = b.call(this, g, r); r = this.options; this.chart.is3d() && !this.chart.styledMode && (b.stroke = r.edgeColor || g.color || this.color, b["stroke-width"] = u(r.edgeWidth, 1)); return b }); b(q.pie.prototype, "drawDataLabels", function (b) {
            if (this.chart.is3d()) {
                var g = this.chart.options.chart.options3d; this.data.forEach(function (b) {
                    var q =
                        b.shapeArgs, r = q.r, v = (q.start + q.end) / 2; b = b.labelPosition; var l = b.connectorPosition, a = -r * (1 - Math.cos((q.alpha || g.alpha) * t)) * Math.sin(v), f = r * (Math.cos((q.beta || g.beta) * t) - 1) * Math.cos(v);[b.natural, l.breakAt, l.touchingSliceAt].forEach(function (b) { b.x += f; b.y += a })
                })
            } b.apply(this, [].slice.call(arguments, 1))
        }); b(q.pie.prototype, "addPoint", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); b(q.pie.prototype, "animate", function (b) {
            if (this.chart.is3d()) {
                var q =
                    arguments[1], r = this.options.animation, v = this.center, t = this.group, u = this.markerGroup; g && (!0 === r && (r = {}), q ? (t.oldtranslateX = t.translateX, t.oldtranslateY = t.translateY, q = { translateX: v[0], translateY: v[1], scaleX: .001, scaleY: .001 }, t.attr(q), u && (u.attrSetters = t.attrSetters, u.attr(q))) : (q = { translateX: t.oldtranslateX, translateY: t.oldtranslateY, scaleX: 1, scaleY: 1 }, t.animate(q, r), u && u.animate(q, r), this.animate = null))
            } else b.apply(this, [].slice.call(arguments, 1))
        })
    }); B(u, "parts-3d/Scatter.js", [u["parts/Globals.js"]],
        function (b) {
            var t = b.Point, u = b.seriesType, q = b.seriesTypes; u("scatter3d", "scatter", { tooltip: { pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" } }, { pointAttribs: function (g) { var t = q.scatter.prototype.pointAttribs.apply(this, arguments); this.chart.is3d() && g && (t.zIndex = b.pointCameraDistance(g, this.chart)); return t }, axisTypes: ["xAxis", "yAxis", "zAxis"], pointArrayMap: ["x", "y", "z"], parallelArrays: ["x", "y", "z"], directTouch: !0 }, {
                applyOptions: function () {
                    t.prototype.applyOptions.apply(this,
                        arguments); void 0 === this.z && (this.z = 0); return this
                }
            }); ""
        }); B(u, "parts-3d/VMLRenderer.js", [u["parts/Globals.js"]], function (b) {
            var t = b.addEvent, u = b.Axis, q = b.SVGRenderer, g = b.VMLRenderer; g && (b.setOptions({ animate: !1 }), g.prototype.face3d = q.prototype.face3d, g.prototype.polyhedron = q.prototype.polyhedron, g.prototype.elements3d = q.prototype.elements3d, g.prototype.element3d = q.prototype.element3d, g.prototype.cuboid = q.prototype.cuboid, g.prototype.cuboidPath = q.prototype.cuboidPath, g.prototype.toLinePath = q.prototype.toLinePath,
                g.prototype.toLineSegments = q.prototype.toLineSegments, g.prototype.arc3d = function (b) { b = q.prototype.arc3d.call(this, b); b.css({ zIndex: b.zIndex }); return b }, b.VMLRenderer.prototype.arc3dPath = b.SVGRenderer.prototype.arc3dPath, t(u, "render", function () {
                this.sideFrame && (this.sideFrame.css({ zIndex: 0 }), this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color })); this.backFrame && (this.backFrame.css({ zIndex: 0 }),
                    this.backFrame.front.attr({ fill: this.backFrame.color }))
                }))
        }); B(u, "masters/highcharts-3d.src.js", [], function () { })
});
//# sourceMappingURL=highcharts-3d.js.map