!function(e) {
    "use strict";
    var n = function(n, t, o) {
        var l, r = e.document, i = r.createElement("link");
        if (t)
            l = t;
        else {
            var a = (r.body || r.getElementsByTagName("head")[0]).childNodes;
            l = a[a.length - 1]
        }
        var d = r.styleSheets;
        i.rel = "stylesheet",
        i.href = n,
        i.media = "only x",
        l.parentNode.insertBefore(i, t ? l : l.nextSibling);
        var f = function(e) {
            for (var n = i.href, t = d.length; t--; )
                if (d[t].href === n)
                    return e();
            setTimeout(function() {
                f(e)
            })
        };
        return i.onloadcssdefined = f,
        f(function() {
            i.media = o || "all"
        }),
        i
    };
    "undefined" != typeof module ? module.exports = n : e.loadCSS = n
}("undefined" != typeof global ? global : this);
