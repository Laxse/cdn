/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.3.2
 * @url https://github.com/feimosi/baguetteBox.js
 */

var baguetteBox = function() {
    function t(t, n) {
        H.transforms = f(),
        H.svg = g(),
        e(),
        j = document.querySelectorAll(t),
        [].forEach.call(j, function(t) {
            n && n.filter && (A = n.filter);
            var e = t.getElementsByTagName("a");
            e = [].filter.call(e, function(t) {
                return A.test(t.href)
            });
            var o = D.length;
            D.push(e),
            D[o].options = n,
            [].forEach.call(D[o], function(t, e) {
                m(t, "click", function(t) {
                    t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                    i(o),
                    a(e)
                })
            })
        })
    }
    function e() {
        return (b = v("baguetteBox-overlay")) ? (k = v("baguetteBox-slider"),
        w = v("previous-button"),
        C = v("next-button"),
        T = v("close-button"),
        void 0) : (b = y("div"),
        b.id = "baguetteBox-overlay",
        document.getElementsByTagName("body")[0].appendChild(b),
        k = y("div"),
        k.id = "baguetteBox-slider",
        b.appendChild(k),
        w = y("button"),
        w.id = "previous-button",
        w.innerHTML = H.svg ? E : "&lt;",
        b.appendChild(w),
        C = y("button"),
        C.id = "next-button",
        C.innerHTML = H.svg ? x : "&gt;",
        b.appendChild(C),
        T = y("button"),
        T.id = "close-button",
        T.innerHTML = H.svg ? B : "X",
        b.appendChild(T),
        w.className = C.className = T.className = "baguetteBox-button",
        n(),
        void 0)
    }
    function n() {
        m(b, "click", function(t) {
            t.target && "IMG" !== t.target.nodeName && "FIGCAPTION" !== t.target.nodeName && r()
        }),
        m(w, "click", function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            c()
        }),
        m(C, "click", function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            u()
        }),
        m(T, "click", function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            r()
        }),
        m(b, "touchstart", function(t) {
            N = t.changedTouches[0].pageX
        }),
        m(b, "touchmove", function(t) {
            S || (t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            touch = t.touches[0] || t.changedTouches[0],
            touch.pageX - N > 40 ? (S = !0,
            c()) : touch.pageX - N < -40 && (S = !0,
            u()))
        }),
        m(b, "touchend", function() {
            S = !1
        }),
        m(document, "keydown", function(t) {
            switch (t.keyCode) {
            case 37:
                c();
                break;
            case 39:
                u();
                break;
            case 27:
                r()
            }
        })
    }
    function i(t) {
        if (M !== t) {
            for (M = t,
            o(D[t].options); k.firstChild; )
                k.removeChild(k.firstChild);
            X.length = 0;
            for (var e, n = 0; n < D[t].length; n++)
                e = y("div"),
                e.className = "full-image",
                e.id = "baguette-img-" + n,
                X.push(e),
                k.appendChild(X[n])
        }
    }
    function o(t) {
        t || (t = {});
        for (var e in P)
            I[e] = P[e],
            "undefined" != typeof t[e] && (I[e] = t[e]);
        k.style.transition = k.style.webkitTransition = "fadeIn" === I.animation ? "opacity .4s ease" : "slideIn" === I.animation ? "" : "none",
        "auto" === I.buttons && ("ontouchstart"in window || 1 === D[M].length) && (I.buttons = !1),
        w.style.display = C.style.display = I.buttons ? "" : "none"
    }
    function a(t) {
        "block" !== b.style.display && (L = t,
        s(L, function() {
            p(L),
            h(L)
        }),
        d(),
        b.style.display = "block",
        setTimeout(function() {
            b.className = "visible",
            I.afterShow && I.afterShow()
        }, 50),
        I.onChange && I.onChange(L, X.length))
    }
    function r() {
        "none" !== b.style.display && (b.className = "",
        setTimeout(function() {
            b.style.display = "none",
            I.afterHide && I.afterHide()
        }, 500))
    }
    function s(t, e) {
        var n = X[t];
        if ("undefined" != typeof n) {
            if (n.getElementsByTagName("img")[0])
                return e && e(),
                void 0;
            imageElement = D[M][t],
            imageCaption = "function" == typeof I.captions ? I.captions.call(D[M], imageElement) : imageElement.getAttribute("data-caption") || imageElement.title,
            imageSrc = l(imageElement);
            var i = y("figure")
              , o = y("img")
              , a = y("figcaption");
            n.appendChild(i),
            i.innerHTML = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
            o.onload = function() {
                var n = document.querySelector("#baguette-img-" + t + " .spinner");
                i.removeChild(n),
                !I.async && e && e()
            }
            ,
            o.setAttribute("src", imageSrc),
            i.appendChild(o),
            I.captions && imageCaption && (a.innerHTML = imageCaption,
            i.appendChild(a)),
            I.async && e && e()
        }
    }
    function l(t) {
        var e = imageElement.href;
        if (t.dataset) {
            var n = [];
            for (var i in t.dataset)
                "at-" !== i.substring(0, 3) || isNaN(i.substring(3)) || (n[i.replace("at-", "")] = t.dataset[i]);
            keys = Object.keys(n).sort(function(t, e) {
                return parseInt(t) < parseInt(e) ? -1 : 1
            });
            for (var o = window.innerWidth * window.devicePixelRatio, a = 0; a < keys.length - 1 && keys[a] < o; )
                a++;
            e = n[keys[a]] || e
        }
        return e
    }
    function u() {
        var t;
        return L <= X.length - 2 ? (L++,
        d(),
        p(L),
        t = !0) : I.animation && (k.className = "bounce-from-right",
        setTimeout(function() {
            k.className = ""
        }, 400),
        t = !1),
        I.onChange && I.onChange(L, X.length),
        t
    }
    function c() {
        var t;
        return L >= 1 ? (L--,
        d(),
        h(L),
        t = !0) : I.animation && (k.className = "bounce-from-left",
        setTimeout(function() {
            k.className = ""
        }, 400),
        t = !1),
        I.onChange && I.onChange(L, X.length),
        t
    }
    function d() {
        var t = 100 * -L + "%";
        "fadeIn" === I.animation ? (k.style.opacity = 0,
        setTimeout(function() {
            H.transforms ? k.style.transform = k.style.webkitTransform = "translate3d(" + t + ",0,0)" : k.style.left = t,
            k.style.opacity = 1
        }, 400)) : H.transforms ? k.style.transform = k.style.webkitTransform = "translate3d(" + t + ",0,0)" : k.style.left = t
    }
    function f() {
        var t = y("div");
        return "undefined" != typeof t.style.perspective || "undefined" != typeof t.style.webkitPerspective
    }
    function g() {
        var t = y("div");
        return t.innerHTML = "<svg/>",
        "http://www.w3.org/2000/svg" == (t.firstChild && t.firstChild.namespaceURI)
    }
    function p(t) {
        t - L >= I.preload || s(t + 1, function() {
            p(t + 1)
        })
    }
    function h(t) {
        L - t >= I.preload || s(t - 1, function() {
            h(t - 1)
        })
    }
    function m(t, e, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
    }
    function v(t) {
        return document.getElementById(t)
    }
    function y(t) {
        return document.createElement(t)
    }
    var b, k, w, C, T, N, E = '<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>', x = '<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>', B = '<svg width="30" height="30"><g stroke="rgb(160, 160, 160)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"/><line x1="5" y1="25" x2="25" y2="5"/></g></svg>', I = {}, P = {
        captions: !0,
        buttons: "auto",
        async: !1,
        preload: 2,
        animation: "slideIn",
        afterShow: null,
        afterHide: null,
        onChange: null
    }, H = {}, L = 0, M = -1, S = !1, A = /.+\.(gif|jpe?g|png|webp)/i, j = [], D = [], X = [];
    return [].forEach || (Array.prototype.forEach = function(t, e) {
        for (var n = 0; n < this.length; n++)
            t.call(e, this[n], n, this)
    }
    ),
    [].filter || (Array.prototype.filter = function(t, e, n, i, o) {
        for (n = this,
        i = [],
        o = 0; o < n.length; o++)
            t.call(e, n[o], o, n) && i.push(n[o]);
        return i
    }
    ),
    {
        run: t,
        showNext: u,
        showPrevious: c
    }
}();

var MD5 = function(s) {
    function L(k, d) {
        return (k << d) | (k >>> (32 - d))
    }
    function K(G, k) {
        var I, d, F, H, x;
        F = (G & 2147483648);
        H = (k & 2147483648);
        I = (G & 1073741824);
        d = (k & 1073741824);
        x = (G & 1073741823) + (k & 1073741823);
        if (I & d) {
            return (x ^ 2147483648 ^ F ^ H)
        }
        if (I | d) {
            if (x & 1073741824) {
                return (x ^ 3221225472 ^ F ^ H)
            } else {
                return (x ^ 1073741824 ^ F ^ H)
            }
        } else {
            return (x ^ F ^ H)
        }
    }
    function r(d, F, k) {
        return (d & F) | ((~d) & k)
    }
    function q(d, F, k) {
        return (d & k) | (F & (~k))
    }
    function p(d, F, k) {
        return (d ^ F ^ k)
    }
    function n(d, F, k) {
        return (F ^ (d | (~k)))
    }
    function u(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(r(F, aa, Z), k), I));
        return K(L(G, H), F)
    }
    function f(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(q(F, aa, Z), k), I));
        return K(L(G, H), F)
    }
    function D(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(p(F, aa, Z), k), I));
        return K(L(G, H), F)
    }
    function t(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(n(F, aa, Z), k), I));
        return K(L(G, H), F)
    }
    function e(G) {
        var Z;
        var F = G.length;
        var x = F + 8;
        var k = (x - (x % 64)) / 64;
        var I = (k + 1) * 16;
        var aa = Array(I - 1);
        var d = 0;
        var H = 0;
        while (H < F) {
            Z = (H - (H % 4)) / 4;
            d = (H % 4) * 8;
            aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
            H++
        }
        Z = (H - (H % 4)) / 4;
        d = (H % 4) * 8;
        aa[Z] = aa[Z] | (128 << d);
        aa[I - 2] = F << 3;
        aa[I - 1] = F >>> 29;
        return aa
    }
    function B(x) {
        var k = "", F = "", G, d;
        for (d = 0; d <= 3; d++) {
            G = (x >>> (d * 8)) & 255;
            F = "0" + G.toString(16);
            k = k + F.substr(F.length - 2, 2)
        }
        return k
    }
    function J(k) {
        k = k.replace(/rn/g, "n");
        var d = "";
        for (var F = 0; F < k.length; F++) {
            var x = k.charCodeAt(F);
            if (x < 128) {
                d += String.fromCharCode(x)
            } else {
                if ((x > 127) && (x < 2048)) {
                    d += String.fromCharCode((x >> 6) | 192);
                    d += String.fromCharCode((x & 63) | 128)
                } else {
                    d += String.fromCharCode((x >> 12) | 224);
                    d += String.fromCharCode(((x >> 6) & 63) | 128);
                    d += String.fromCharCode((x & 63) | 128)
                }
            }
        }
        return d
    }
    var C = Array();
    var P, h, E, v, g, Y, X, W, V;
    var S = 7
      , Q = 12
      , N = 17
      , M = 22;
    var A = 5
      , z = 9
      , y = 14
      , w = 20;
    var o = 4
      , m = 11
      , l = 16
      , j = 23;
    var U = 6
      , T = 10
      , R = 15
      , O = 21;
    s = J(s);
    C = e(s);
    Y = 1732584193;
    X = 4023233417;
    W = 2562383102;
    V = 271733878;
    for (P = 0; P < C.length; P += 16) {
        h = Y;
        E = X;
        v = W;
        g = V;
        Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
        V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
        W = u(W, V, Y, X, C[P + 2], N, 606105819);
        X = u(X, W, V, Y, C[P + 3], M, 3250441966);
        Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
        V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
        W = u(W, V, Y, X, C[P + 6], N, 2821735955);
        X = u(X, W, V, Y, C[P + 7], M, 4249261313);
        Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
        V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
        W = u(W, V, Y, X, C[P + 10], N, 4294925233);
        X = u(X, W, V, Y, C[P + 11], M, 2304563134);
        Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
        V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
        W = u(W, V, Y, X, C[P + 14], N, 2792965006);
        X = u(X, W, V, Y, C[P + 15], M, 1236535329);
        Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
        V = f(V, Y, X, W, C[P + 6], z, 3225465664);
        W = f(W, V, Y, X, C[P + 11], y, 643717713);
        X = f(X, W, V, Y, C[P + 0], w, 3921069994);
        Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
        V = f(V, Y, X, W, C[P + 10], z, 38016083);
        W = f(W, V, Y, X, C[P + 15], y, 3634488961);
        X = f(X, W, V, Y, C[P + 4], w, 3889429448);
        Y = f(Y, X, W, V, C[P + 9], A, 568446438);
        V = f(V, Y, X, W, C[P + 14], z, 3275163606);
        W = f(W, V, Y, X, C[P + 3], y, 4107603335);
        X = f(X, W, V, Y, C[P + 8], w, 1163531501);
        Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
        V = f(V, Y, X, W, C[P + 2], z, 4243563512);
        W = f(W, V, Y, X, C[P + 7], y, 1735328473);
        X = f(X, W, V, Y, C[P + 12], w, 2368359562);
        Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
        V = D(V, Y, X, W, C[P + 8], m, 2272392833);
        W = D(W, V, Y, X, C[P + 11], l, 1839030562);
        X = D(X, W, V, Y, C[P + 14], j, 4259657740);
        Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
        V = D(V, Y, X, W, C[P + 4], m, 1272893353);
        W = D(W, V, Y, X, C[P + 7], l, 4139469664);
        X = D(X, W, V, Y, C[P + 10], j, 3200236656);
        Y = D(Y, X, W, V, C[P + 13], o, 681279174);
        V = D(V, Y, X, W, C[P + 0], m, 3936430074);
        W = D(W, V, Y, X, C[P + 3], l, 3572445317);
        X = D(X, W, V, Y, C[P + 6], j, 76029189);
        Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
        V = D(V, Y, X, W, C[P + 12], m, 3873151461);
        W = D(W, V, Y, X, C[P + 15], l, 530742520);
        X = D(X, W, V, Y, C[P + 2], j, 3299628645);
        Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
        V = t(V, Y, X, W, C[P + 7], T, 1126891415);
        W = t(W, V, Y, X, C[P + 14], R, 2878612391);
        X = t(X, W, V, Y, C[P + 5], O, 4237533241);
        Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
        V = t(V, Y, X, W, C[P + 3], T, 2399980690);
        W = t(W, V, Y, X, C[P + 10], R, 4293915773);
        X = t(X, W, V, Y, C[P + 1], O, 2240044497);
        Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
        V = t(V, Y, X, W, C[P + 15], T, 4264355552);
        W = t(W, V, Y, X, C[P + 6], R, 2734768916);
        X = t(X, W, V, Y, C[P + 13], O, 1309151649);
        Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
        V = t(V, Y, X, W, C[P + 11], T, 3174756917);
        W = t(W, V, Y, X, C[P + 2], R, 718787259);
        X = t(X, W, V, Y, C[P + 9], O, 3951481745);
        Y = K(Y, h);
        X = K(X, E);
        W = K(W, v);
        V = K(V, g)
    }
    var i = B(Y) + B(X) + B(W) + B(V);
    return i.toLowerCase()
};
