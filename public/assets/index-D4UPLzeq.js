var wg = Object.defineProperty;
var Sg = (t, e, n) =>
  e in t
    ? wg(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[e] = n);
var F = (t, e, n) => Sg(t, typeof e != "symbol" ? e + "" : e, n);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
var kg =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function df(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var ff = { exports: {} },
  uo = {},
  hf = { exports: {} },
  W = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Os = Symbol.for("react.element"),
  bg = Symbol.for("react.portal"),
  Cg = Symbol.for("react.fragment"),
  Mg = Symbol.for("react.strict_mode"),
  Pg = Symbol.for("react.profiler"),
  Eg = Symbol.for("react.provider"),
  Dg = Symbol.for("react.context"),
  Tg = Symbol.for("react.forward_ref"),
  Og = Symbol.for("react.suspense"),
  Lg = Symbol.for("react.memo"),
  Rg = Symbol.for("react.lazy"),
  jc = Symbol.iterator;
function Ag(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (jc && t[jc]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var pf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  gf = Object.assign,
  mf = {};
function Ci(t, e, n) {
  (this.props = t),
    (this.context = e),
    (this.refs = mf),
    (this.updater = n || pf);
}
Ci.prototype.isReactComponent = {};
Ci.prototype.setState = function (t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
Ci.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function yf() {}
yf.prototype = Ci.prototype;
function ba(t, e, n) {
  (this.props = t),
    (this.context = e),
    (this.refs = mf),
    (this.updater = n || pf);
}
var Ca = (ba.prototype = new yf());
Ca.constructor = ba;
gf(Ca, Ci.prototype);
Ca.isPureReactComponent = !0;
var zc = Array.isArray,
  vf = Object.prototype.hasOwnProperty,
  Ma = { current: null },
  xf = { key: !0, ref: !0, __self: !0, __source: !0 };
function _f(t, e, n) {
  var i,
    s = {},
    r = null,
    o = null;
  if (e != null)
    for (i in (e.ref !== void 0 && (o = e.ref),
    e.key !== void 0 && (r = "" + e.key),
    e))
      vf.call(e, i) && !xf.hasOwnProperty(i) && (s[i] = e[i]);
  var l = arguments.length - 2;
  if (l === 1) s.children = n;
  else if (1 < l) {
    for (var a = Array(l), c = 0; c < l; c++) a[c] = arguments[c + 2];
    s.children = a;
  }
  if (t && t.defaultProps)
    for (i in ((l = t.defaultProps), l)) s[i] === void 0 && (s[i] = l[i]);
  return {
    $$typeof: Os,
    type: t,
    key: r,
    ref: o,
    props: s,
    _owner: Ma.current,
  };
}
function Ig(t, e) {
  return {
    $$typeof: Os,
    type: t.type,
    key: e,
    ref: t.ref,
    props: t.props,
    _owner: t._owner,
  };
}
function Pa(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Os;
}
function jg(t) {
  var e = { "=": "=0", ":": "=2" };
  return (
    "$" +
    t.replace(/[=:]/g, function (n) {
      return e[n];
    })
  );
}
var Nc = /\/+/g;
function Ro(t, e) {
  return typeof t == "object" && t !== null && t.key != null
    ? jg("" + t.key)
    : e.toString(36);
}
function pr(t, e, n, i, s) {
  var r = typeof t;
  (r === "undefined" || r === "boolean") && (t = null);
  var o = !1;
  if (t === null) o = !0;
  else
    switch (r) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Os:
          case bg:
            o = !0;
        }
    }
  if (o)
    return (
      (o = t),
      (s = s(o)),
      (t = i === "" ? "." + Ro(o, 0) : i),
      zc(s)
        ? ((n = ""),
          t != null && (n = t.replace(Nc, "$&/") + "/"),
          pr(s, e, n, "", function (c) {
            return c;
          }))
        : s != null &&
          (Pa(s) &&
            (s = Ig(
              s,
              n +
                (!s.key || (o && o.key === s.key)
                  ? ""
                  : ("" + s.key).replace(Nc, "$&/") + "/") +
                t
            )),
          e.push(s)),
      1
    );
  if (((o = 0), (i = i === "" ? "." : i + ":"), zc(t)))
    for (var l = 0; l < t.length; l++) {
      r = t[l];
      var a = i + Ro(r, l);
      o += pr(r, e, n, a, s);
    }
  else if (((a = Ag(t)), typeof a == "function"))
    for (t = a.call(t), l = 0; !(r = t.next()).done; )
      (r = r.value), (a = i + Ro(r, l++)), (o += pr(r, e, n, a, s));
  else if (r === "object")
    throw (
      ((e = String(t)),
      Error(
        "Objects are not valid as a React child (found: " +
          (e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function Ns(t, e, n) {
  if (t == null) return t;
  var i = [],
    s = 0;
  return (
    pr(t, i, "", "", function (r) {
      return e.call(n, r, s++);
    }),
    i
  );
}
function zg(t) {
  if (t._status === -1) {
    var e = t._result;
    (e = e()),
      e.then(
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 1), (t._result = n));
        },
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 2), (t._result = n));
        }
      ),
      t._status === -1 && ((t._status = 0), (t._result = e));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var Ae = { current: null },
  gr = { transition: null },
  Ng = {
    ReactCurrentDispatcher: Ae,
    ReactCurrentBatchConfig: gr,
    ReactCurrentOwner: Ma,
  };
function wf() {
  throw Error("act(...) is not supported in production builds of React.");
}
W.Children = {
  map: Ns,
  forEach: function (t, e, n) {
    Ns(
      t,
      function () {
        e.apply(this, arguments);
      },
      n
    );
  },
  count: function (t) {
    var e = 0;
    return (
      Ns(t, function () {
        e++;
      }),
      e
    );
  },
  toArray: function (t) {
    return (
      Ns(t, function (e) {
        return e;
      }) || []
    );
  },
  only: function (t) {
    if (!Pa(t))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return t;
  },
};
W.Component = Ci;
W.Fragment = Cg;
W.Profiler = Pg;
W.PureComponent = ba;
W.StrictMode = Mg;
W.Suspense = Og;
W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ng;
W.act = wf;
W.cloneElement = function (t, e, n) {
  if (t == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        t +
        "."
    );
  var i = gf({}, t.props),
    s = t.key,
    r = t.ref,
    o = t._owner;
  if (e != null) {
    if (
      (e.ref !== void 0 && ((r = e.ref), (o = Ma.current)),
      e.key !== void 0 && (s = "" + e.key),
      t.type && t.type.defaultProps)
    )
      var l = t.type.defaultProps;
    for (a in e)
      vf.call(e, a) &&
        !xf.hasOwnProperty(a) &&
        (i[a] = e[a] === void 0 && l !== void 0 ? l[a] : e[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var c = 0; c < a; c++) l[c] = arguments[c + 2];
    i.children = l;
  }
  return { $$typeof: Os, type: t.type, key: s, ref: r, props: i, _owner: o };
};
W.createContext = function (t) {
  return (
    (t = {
      $$typeof: Dg,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (t.Provider = { $$typeof: Eg, _context: t }),
    (t.Consumer = t)
  );
};
W.createElement = _f;
W.createFactory = function (t) {
  var e = _f.bind(null, t);
  return (e.type = t), e;
};
W.createRef = function () {
  return { current: null };
};
W.forwardRef = function (t) {
  return { $$typeof: Tg, render: t };
};
W.isValidElement = Pa;
W.lazy = function (t) {
  return { $$typeof: Rg, _payload: { _status: -1, _result: t }, _init: zg };
};
W.memo = function (t, e) {
  return { $$typeof: Lg, type: t, compare: e === void 0 ? null : e };
};
W.startTransition = function (t) {
  var e = gr.transition;
  gr.transition = {};
  try {
    t();
  } finally {
    gr.transition = e;
  }
};
W.unstable_act = wf;
W.useCallback = function (t, e) {
  return Ae.current.useCallback(t, e);
};
W.useContext = function (t) {
  return Ae.current.useContext(t);
};
W.useDebugValue = function () {};
W.useDeferredValue = function (t) {
  return Ae.current.useDeferredValue(t);
};
W.useEffect = function (t, e) {
  return Ae.current.useEffect(t, e);
};
W.useId = function () {
  return Ae.current.useId();
};
W.useImperativeHandle = function (t, e, n) {
  return Ae.current.useImperativeHandle(t, e, n);
};
W.useInsertionEffect = function (t, e) {
  return Ae.current.useInsertionEffect(t, e);
};
W.useLayoutEffect = function (t, e) {
  return Ae.current.useLayoutEffect(t, e);
};
W.useMemo = function (t, e) {
  return Ae.current.useMemo(t, e);
};
W.useReducer = function (t, e, n) {
  return Ae.current.useReducer(t, e, n);
};
W.useRef = function (t) {
  return Ae.current.useRef(t);
};
W.useState = function (t) {
  return Ae.current.useState(t);
};
W.useSyncExternalStore = function (t, e, n) {
  return Ae.current.useSyncExternalStore(t, e, n);
};
W.useTransition = function () {
  return Ae.current.useTransition();
};
W.version = "18.3.1";
hf.exports = W;
var z = hf.exports;
const Sf = df(z);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fg = z,
  Bg = Symbol.for("react.element"),
  $g = Symbol.for("react.fragment"),
  Wg = Object.prototype.hasOwnProperty,
  Hg = Fg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Vg = { key: !0, ref: !0, __self: !0, __source: !0 };
function kf(t, e, n) {
  var i,
    s = {},
    r = null,
    o = null;
  n !== void 0 && (r = "" + n),
    e.key !== void 0 && (r = "" + e.key),
    e.ref !== void 0 && (o = e.ref);
  for (i in e) Wg.call(e, i) && !Vg.hasOwnProperty(i) && (s[i] = e[i]);
  if (t && t.defaultProps)
    for (i in ((e = t.defaultProps), e)) s[i] === void 0 && (s[i] = e[i]);
  return {
    $$typeof: Bg,
    type: t,
    key: r,
    ref: o,
    props: s,
    _owner: Hg.current,
  };
}
uo.Fragment = $g;
uo.jsx = kf;
uo.jsxs = kf;
ff.exports = uo;
var S = ff.exports,
  bf = { exports: {} },
  Xe = {},
  Cf = { exports: {} },
  Mf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (t) {
  function e(D, L) {
    var j = D.length;
    D.push(L);
    e: for (; 0 < j; ) {
      var U = (j - 1) >>> 1,
        Y = D[U];
      if (0 < s(Y, L)) (D[U] = L), (D[j] = Y), (j = U);
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function i(D) {
    if (D.length === 0) return null;
    var L = D[0],
      j = D.pop();
    if (j !== L) {
      D[0] = j;
      e: for (var U = 0, Y = D.length, lt = Y >>> 1; U < lt; ) {
        var we = 2 * (U + 1) - 1,
          at = D[we],
          ve = we + 1,
          Wn = D[ve];
        if (0 > s(at, j))
          ve < Y && 0 > s(Wn, at)
            ? ((D[U] = Wn), (D[ve] = j), (U = ve))
            : ((D[U] = at), (D[we] = j), (U = we));
        else if (ve < Y && 0 > s(Wn, j)) (D[U] = Wn), (D[ve] = j), (U = ve);
        else break e;
      }
    }
    return L;
  }
  function s(D, L) {
    var j = D.sortIndex - L.sortIndex;
    return j !== 0 ? j : D.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var r = performance;
    t.unstable_now = function () {
      return r.now();
    };
  } else {
    var o = Date,
      l = o.now();
    t.unstable_now = function () {
      return o.now() - l;
    };
  }
  var a = [],
    c = [],
    u = 1,
    d = null,
    f = 3,
    m = !1,
    v = !1,
    g = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(D) {
    for (var L = n(c); L !== null; ) {
      if (L.callback === null) i(c);
      else if (L.startTime <= D)
        i(c), (L.sortIndex = L.expirationTime), e(a, L);
      else break;
      L = n(c);
    }
  }
  function _(D) {
    if (((g = !1), y(D), !v))
      if (n(a) !== null) (v = !0), I(w);
      else {
        var L = n(c);
        L !== null && N(_, L.startTime - D);
      }
  }
  function w(D, L) {
    (v = !1), g && ((g = !1), p(C), (C = -1)), (m = !0);
    var j = f;
    try {
      for (
        y(L), d = n(a);
        d !== null && (!(d.expirationTime > L) || (D && !T()));

      ) {
        var U = d.callback;
        if (typeof U == "function") {
          (d.callback = null), (f = d.priorityLevel);
          var Y = U(d.expirationTime <= L);
          (L = t.unstable_now()),
            typeof Y == "function" ? (d.callback = Y) : d === n(a) && i(a),
            y(L);
        } else i(a);
        d = n(a);
      }
      if (d !== null) var lt = !0;
      else {
        var we = n(c);
        we !== null && N(_, we.startTime - L), (lt = !1);
      }
      return lt;
    } finally {
      (d = null), (f = j), (m = !1);
    }
  }
  var k = !1,
    b = null,
    C = -1,
    E = 5,
    M = -1;
  function T() {
    return !(t.unstable_now() - M < E);
  }
  function A() {
    if (b !== null) {
      var D = t.unstable_now();
      M = D;
      var L = !0;
      try {
        L = b(!0, D);
      } finally {
        L ? $() : ((k = !1), (b = null));
      }
    } else k = !1;
  }
  var $;
  if (typeof h == "function")
    $ = function () {
      h(A);
    };
  else if (typeof MessageChannel < "u") {
    var Q = new MessageChannel(),
      O = Q.port2;
    (Q.port1.onmessage = A),
      ($ = function () {
        O.postMessage(null);
      });
  } else
    $ = function () {
      x(A, 0);
    };
  function I(D) {
    (b = D), k || ((k = !0), $());
  }
  function N(D, L) {
    C = x(function () {
      D(t.unstable_now());
    }, L);
  }
  (t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (D) {
      D.callback = null;
    }),
    (t.unstable_continueExecution = function () {
      v || m || ((v = !0), I(w));
    }),
    (t.unstable_forceFrameRate = function (D) {
      0 > D || 125 < D
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (E = 0 < D ? Math.floor(1e3 / D) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (t.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (t.unstable_next = function (D) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = f;
      }
      var j = f;
      f = L;
      try {
        return D();
      } finally {
        f = j;
      }
    }),
    (t.unstable_pauseExecution = function () {}),
    (t.unstable_requestPaint = function () {}),
    (t.unstable_runWithPriority = function (D, L) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var j = f;
      f = D;
      try {
        return L();
      } finally {
        f = j;
      }
    }),
    (t.unstable_scheduleCallback = function (D, L, j) {
      var U = t.unstable_now();
      switch (
        (typeof j == "object" && j !== null
          ? ((j = j.delay), (j = typeof j == "number" && 0 < j ? U + j : U))
          : (j = U),
        D)
      ) {
        case 1:
          var Y = -1;
          break;
        case 2:
          Y = 250;
          break;
        case 5:
          Y = 1073741823;
          break;
        case 4:
          Y = 1e4;
          break;
        default:
          Y = 5e3;
      }
      return (
        (Y = j + Y),
        (D = {
          id: u++,
          callback: L,
          priorityLevel: D,
          startTime: j,
          expirationTime: Y,
          sortIndex: -1,
        }),
        j > U
          ? ((D.sortIndex = j),
            e(c, D),
            n(a) === null &&
              D === n(c) &&
              (g ? (p(C), (C = -1)) : (g = !0), N(_, j - U)))
          : ((D.sortIndex = Y), e(a, D), v || m || ((v = !0), I(w))),
        D
      );
    }),
    (t.unstable_shouldYield = T),
    (t.unstable_wrapCallback = function (D) {
      var L = f;
      return function () {
        var j = f;
        f = L;
        try {
          return D.apply(this, arguments);
        } finally {
          f = j;
        }
      };
    });
})(Mf);
Cf.exports = Mf;
var Ug = Cf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yg = z,
  Ke = Ug;
function P(t) {
  for (
    var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1;
    n < arguments.length;
    n++
  )
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Pf = new Set(),
  cs = {};
function Nn(t, e) {
  gi(t, e), gi(t + "Capture", e);
}
function gi(t, e) {
  for (cs[t] = e, t = 0; t < e.length; t++) Pf.add(e[t]);
}
var jt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  vl = Object.prototype.hasOwnProperty,
  Kg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Fc = {},
  Bc = {};
function Xg(t) {
  return vl.call(Bc, t)
    ? !0
    : vl.call(Fc, t)
    ? !1
    : Kg.test(t)
    ? (Bc[t] = !0)
    : ((Fc[t] = !0), !1);
}
function Gg(t, e, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((t = t.toLowerCase().slice(0, 5)), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function Qg(t, e, n, i) {
  if (e === null || typeof e > "u" || Gg(t, e, n, i)) return !0;
  if (i) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !e;
      case 4:
        return e === !1;
      case 5:
        return isNaN(e);
      case 6:
        return isNaN(e) || 1 > e;
    }
  return !1;
}
function Ie(t, e, n, i, s, r, o) {
  (this.acceptsBooleans = e === 2 || e === 3 || e === 4),
    (this.attributeName = i),
    (this.attributeNamespace = s),
    (this.mustUseProperty = n),
    (this.propertyName = t),
    (this.type = e),
    (this.sanitizeURL = r),
    (this.removeEmptyString = o);
}
var be = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (t) {
    be[t] = new Ie(t, 0, !1, t, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (t) {
  var e = t[0];
  be[e] = new Ie(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (t) {
  be[t] = new Ie(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (t) {
  be[t] = new Ie(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (t) {
    be[t] = new Ie(t, 3, !1, t.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (t) {
  be[t] = new Ie(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function (t) {
  be[t] = new Ie(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (t) {
  be[t] = new Ie(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function (t) {
  be[t] = new Ie(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var Ea = /[\-:]([a-z])/g;
function Da(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (t) {
    var e = t.replace(Ea, Da);
    be[e] = new Ie(e, 1, !1, t, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (t) {
    var e = t.replace(Ea, Da);
    be[e] = new Ie(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
  var e = t.replace(Ea, Da);
  be[e] = new Ie(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (t) {
  be[t] = new Ie(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
be.xlinkHref = new Ie(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (t) {
  be[t] = new Ie(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function Ta(t, e, n, i) {
  var s = be.hasOwnProperty(e) ? be[e] : null;
  (s !== null
    ? s.type !== 0
    : i ||
      !(2 < e.length) ||
      (e[0] !== "o" && e[0] !== "O") ||
      (e[1] !== "n" && e[1] !== "N")) &&
    (Qg(e, n, s, i) && (n = null),
    i || s === null
      ? Xg(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n))
      : s.mustUseProperty
      ? (t[s.propertyName] = n === null ? (s.type === 3 ? !1 : "") : n)
      : ((e = s.attributeName),
        (i = s.attributeNamespace),
        n === null
          ? t.removeAttribute(e)
          : ((s = s.type),
            (n = s === 3 || (s === 4 && n === !0) ? "" : "" + n),
            i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n))));
}
var $t = Yg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Fs = Symbol.for("react.element"),
  Yn = Symbol.for("react.portal"),
  Kn = Symbol.for("react.fragment"),
  Oa = Symbol.for("react.strict_mode"),
  xl = Symbol.for("react.profiler"),
  Ef = Symbol.for("react.provider"),
  Df = Symbol.for("react.context"),
  La = Symbol.for("react.forward_ref"),
  _l = Symbol.for("react.suspense"),
  wl = Symbol.for("react.suspense_list"),
  Ra = Symbol.for("react.memo"),
  Vt = Symbol.for("react.lazy"),
  Tf = Symbol.for("react.offscreen"),
  $c = Symbol.iterator;
function Ti(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = ($c && t[$c]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var oe = Object.assign,
  Ao;
function Hi(t) {
  if (Ao === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      Ao = (e && e[1]) || "";
    }
  return (
    `
` +
    Ao +
    t
  );
}
var Io = !1;
function jo(t, e) {
  if (!t || Io) return "";
  Io = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e)
      if (
        ((e = function () {
          throw Error();
        }),
        Object.defineProperty(e.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(e, []);
        } catch (c) {
          var i = c;
        }
        Reflect.construct(t, [], e);
      } else {
        try {
          e.call();
        } catch (c) {
          i = c;
        }
        t.call(e.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        i = c;
      }
      t();
    }
  } catch (c) {
    if (c && i && typeof c.stack == "string") {
      for (
        var s = c.stack.split(`
`),
          r = i.stack.split(`
`),
          o = s.length - 1,
          l = r.length - 1;
        1 <= o && 0 <= l && s[o] !== r[l];

      )
        l--;
      for (; 1 <= o && 0 <= l; o--, l--)
        if (s[o] !== r[l]) {
          if (o !== 1 || l !== 1)
            do
              if ((o--, l--, 0 > l || s[o] !== r[l])) {
                var a =
                  `
` + s[o].replace(" at new ", " at ");
                return (
                  t.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", t.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= l);
          break;
        }
    }
  } finally {
    (Io = !1), (Error.prepareStackTrace = n);
  }
  return (t = t ? t.displayName || t.name : "") ? Hi(t) : "";
}
function Zg(t) {
  switch (t.tag) {
    case 5:
      return Hi(t.type);
    case 16:
      return Hi("Lazy");
    case 13:
      return Hi("Suspense");
    case 19:
      return Hi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (t = jo(t.type, !1)), t;
    case 11:
      return (t = jo(t.type.render, !1)), t;
    case 1:
      return (t = jo(t.type, !0)), t;
    default:
      return "";
  }
}
function Sl(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Kn:
      return "Fragment";
    case Yn:
      return "Portal";
    case xl:
      return "Profiler";
    case Oa:
      return "StrictMode";
    case _l:
      return "Suspense";
    case wl:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case Df:
        return (t.displayName || "Context") + ".Consumer";
      case Ef:
        return (t._context.displayName || "Context") + ".Provider";
      case La:
        var e = t.render;
        return (
          (t = t.displayName),
          t ||
            ((t = e.displayName || e.name || ""),
            (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
          t
        );
      case Ra:
        return (
          (e = t.displayName || null), e !== null ? e : Sl(t.type) || "Memo"
        );
      case Vt:
        (e = t._payload), (t = t._init);
        try {
          return Sl(t(e));
        } catch {}
    }
  return null;
}
function qg(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (t = e.render),
        (t = t.displayName || t.name || ""),
        e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Sl(e);
    case 8:
      return e === Oa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
  }
  return null;
}
function cn(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function Of(t) {
  var e = t.type;
  return (
    (t = t.nodeName) &&
    t.toLowerCase() === "input" &&
    (e === "checkbox" || e === "radio")
  );
}
function Jg(t) {
  var e = Of(t) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
    i = "" + t[e];
  if (
    !t.hasOwnProperty(e) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var s = n.get,
      r = n.set;
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (o) {
          (i = "" + o), r.call(this, o);
        },
      }),
      Object.defineProperty(t, e, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return i;
        },
        setValue: function (o) {
          i = "" + o;
        },
        stopTracking: function () {
          (t._valueTracker = null), delete t[e];
        },
      }
    );
  }
}
function Bs(t) {
  t._valueTracker || (t._valueTracker = Jg(t));
}
function Lf(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(),
    i = "";
  return (
    t && (i = Of(t) ? (t.checked ? "true" : "false") : t.value),
    (t = i),
    t !== n ? (e.setValue(t), !0) : !1
  );
}
function Tr(t) {
  if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u"))
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function kl(t, e) {
  var n = e.checked;
  return oe({}, e, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? t._wrapperState.initialChecked,
  });
}
function Wc(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue,
    i = e.checked != null ? e.checked : e.defaultChecked;
  (n = cn(e.value != null ? e.value : n)),
    (t._wrapperState = {
      initialChecked: i,
      initialValue: n,
      controlled:
        e.type === "checkbox" || e.type === "radio"
          ? e.checked != null
          : e.value != null,
    });
}
function Rf(t, e) {
  (e = e.checked), e != null && Ta(t, "checked", e, !1);
}
function bl(t, e) {
  Rf(t, e);
  var n = cn(e.value),
    i = e.type;
  if (n != null)
    i === "number"
      ? ((n === 0 && t.value === "") || t.value != n) && (t.value = "" + n)
      : t.value !== "" + n && (t.value = "" + n);
  else if (i === "submit" || i === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value")
    ? Cl(t, e.type, n)
    : e.hasOwnProperty("defaultValue") && Cl(t, e.type, cn(e.defaultValue)),
    e.checked == null &&
      e.defaultChecked != null &&
      (t.defaultChecked = !!e.defaultChecked);
}
function Hc(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var i = e.type;
    if (
      !(
        (i !== "submit" && i !== "reset") ||
        (e.value !== void 0 && e.value !== null)
      )
    )
      return;
    (e = "" + t._wrapperState.initialValue),
      n || e === t.value || (t.value = e),
      (t.defaultValue = e);
  }
  (n = t.name),
    n !== "" && (t.name = ""),
    (t.defaultChecked = !!t._wrapperState.initialChecked),
    n !== "" && (t.name = n);
}
function Cl(t, e, n) {
  (e !== "number" || Tr(t.ownerDocument) !== t) &&
    (n == null
      ? (t.defaultValue = "" + t._wrapperState.initialValue)
      : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var Vi = Array.isArray;
function oi(t, e, n, i) {
  if (((t = t.options), e)) {
    e = {};
    for (var s = 0; s < n.length; s++) e["$" + n[s]] = !0;
    for (n = 0; n < t.length; n++)
      (s = e.hasOwnProperty("$" + t[n].value)),
        t[n].selected !== s && (t[n].selected = s),
        s && i && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + cn(n), e = null, s = 0; s < t.length; s++) {
      if (t[s].value === n) {
        (t[s].selected = !0), i && (t[s].defaultSelected = !0);
        return;
      }
      e !== null || t[s].disabled || (e = t[s]);
    }
    e !== null && (e.selected = !0);
  }
}
function Ml(t, e) {
  if (e.dangerouslySetInnerHTML != null) throw Error(P(91));
  return oe({}, e, {
    value: void 0,
    defaultValue: void 0,
    children: "" + t._wrapperState.initialValue,
  });
}
function Vc(t, e) {
  var n = e.value;
  if (n == null) {
    if (((n = e.children), (e = e.defaultValue), n != null)) {
      if (e != null) throw Error(P(92));
      if (Vi(n)) {
        if (1 < n.length) throw Error(P(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), (n = e);
  }
  t._wrapperState = { initialValue: cn(n) };
}
function Af(t, e) {
  var n = cn(e.value),
    i = cn(e.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== t.value && (t.value = n),
    e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)),
    i != null && (t.defaultValue = "" + i);
}
function Uc(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function If(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Pl(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml"
    ? If(e)
    : t === "http://www.w3.org/2000/svg" && e === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : t;
}
var $s,
  jf = (function (t) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (e, n, i, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return t(e, n, i, s);
          });
        }
      : t;
  })(function (t, e) {
    if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
      t.innerHTML = e;
    else {
      for (
        $s = $s || document.createElement("div"),
          $s.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>",
          e = $s.firstChild;
        t.firstChild;

      )
        t.removeChild(t.firstChild);
      for (; e.firstChild; ) t.appendChild(e.firstChild);
    }
  });
function us(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var Qi = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  em = ["Webkit", "ms", "Moz", "O"];
Object.keys(Qi).forEach(function (t) {
  em.forEach(function (e) {
    (e = e + t.charAt(0).toUpperCase() + t.substring(1)), (Qi[e] = Qi[t]);
  });
});
function zf(t, e, n) {
  return e == null || typeof e == "boolean" || e === ""
    ? ""
    : n || typeof e != "number" || e === 0 || (Qi.hasOwnProperty(t) && Qi[t])
    ? ("" + e).trim()
    : e + "px";
}
function Nf(t, e) {
  t = t.style;
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      var i = n.indexOf("--") === 0,
        s = zf(n, e[n], i);
      n === "float" && (n = "cssFloat"), i ? t.setProperty(n, s) : (t[n] = s);
    }
}
var tm = oe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function El(t, e) {
  if (e) {
    if (tm[t] && (e.children != null || e.dangerouslySetInnerHTML != null))
      throw Error(P(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null) throw Error(P(60));
      if (
        typeof e.dangerouslySetInnerHTML != "object" ||
        !("__html" in e.dangerouslySetInnerHTML)
      )
        throw Error(P(61));
    }
    if (e.style != null && typeof e.style != "object") throw Error(P(62));
  }
}
function Dl(t, e) {
  if (t.indexOf("-") === -1) return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Tl = null;
function Aa(t) {
  return (
    (t = t.target || t.srcElement || window),
    t.correspondingUseElement && (t = t.correspondingUseElement),
    t.nodeType === 3 ? t.parentNode : t
  );
}
var Ol = null,
  li = null,
  ai = null;
function Yc(t) {
  if ((t = As(t))) {
    if (typeof Ol != "function") throw Error(P(280));
    var e = t.stateNode;
    e && ((e = mo(e)), Ol(t.stateNode, t.type, e));
  }
}
function Ff(t) {
  li ? (ai ? ai.push(t) : (ai = [t])) : (li = t);
}
function Bf() {
  if (li) {
    var t = li,
      e = ai;
    if (((ai = li = null), Yc(t), e)) for (t = 0; t < e.length; t++) Yc(e[t]);
  }
}
function $f(t, e) {
  return t(e);
}
function Wf() {}
var zo = !1;
function Hf(t, e, n) {
  if (zo) return t(e, n);
  zo = !0;
  try {
    return $f(t, e, n);
  } finally {
    (zo = !1), (li !== null || ai !== null) && (Wf(), Bf());
  }
}
function ds(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var i = mo(n);
  if (i === null) return null;
  n = i[e];
  e: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (i = !i.disabled) ||
        ((t = t.type),
        (i = !(
          t === "button" ||
          t === "input" ||
          t === "select" ||
          t === "textarea"
        ))),
        (t = !i);
      break e;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(P(231, e, typeof n));
  return n;
}
var Ll = !1;
if (jt)
  try {
    var Oi = {};
    Object.defineProperty(Oi, "passive", {
      get: function () {
        Ll = !0;
      },
    }),
      window.addEventListener("test", Oi, Oi),
      window.removeEventListener("test", Oi, Oi);
  } catch {
    Ll = !1;
  }
function nm(t, e, n, i, s, r, o, l, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, c);
  } catch (u) {
    this.onError(u);
  }
}
var Zi = !1,
  Or = null,
  Lr = !1,
  Rl = null,
  im = {
    onError: function (t) {
      (Zi = !0), (Or = t);
    },
  };
function sm(t, e, n, i, s, r, o, l, a) {
  (Zi = !1), (Or = null), nm.apply(im, arguments);
}
function rm(t, e, n, i, s, r, o, l, a) {
  if ((sm.apply(this, arguments), Zi)) {
    if (Zi) {
      var c = Or;
      (Zi = !1), (Or = null);
    } else throw Error(P(198));
    Lr || ((Lr = !0), (Rl = c));
  }
}
function Fn(t) {
  var e = t,
    n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do (e = t), e.flags & 4098 && (n = e.return), (t = e.return);
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function Vf(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (
      (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
      e !== null)
    )
      return e.dehydrated;
  }
  return null;
}
function Kc(t) {
  if (Fn(t) !== t) throw Error(P(188));
}
function om(t) {
  var e = t.alternate;
  if (!e) {
    if (((e = Fn(t)), e === null)) throw Error(P(188));
    return e !== t ? null : t;
  }
  for (var n = t, i = e; ; ) {
    var s = n.return;
    if (s === null) break;
    var r = s.alternate;
    if (r === null) {
      if (((i = s.return), i !== null)) {
        n = i;
        continue;
      }
      break;
    }
    if (s.child === r.child) {
      for (r = s.child; r; ) {
        if (r === n) return Kc(s), t;
        if (r === i) return Kc(s), e;
        r = r.sibling;
      }
      throw Error(P(188));
    }
    if (n.return !== i.return) (n = s), (i = r);
    else {
      for (var o = !1, l = s.child; l; ) {
        if (l === n) {
          (o = !0), (n = s), (i = r);
          break;
        }
        if (l === i) {
          (o = !0), (i = s), (n = r);
          break;
        }
        l = l.sibling;
      }
      if (!o) {
        for (l = r.child; l; ) {
          if (l === n) {
            (o = !0), (n = r), (i = s);
            break;
          }
          if (l === i) {
            (o = !0), (i = r), (n = s);
            break;
          }
          l = l.sibling;
        }
        if (!o) throw Error(P(189));
      }
    }
    if (n.alternate !== i) throw Error(P(190));
  }
  if (n.tag !== 3) throw Error(P(188));
  return n.stateNode.current === n ? t : e;
}
function Uf(t) {
  return (t = om(t)), t !== null ? Yf(t) : null;
}
function Yf(t) {
  if (t.tag === 5 || t.tag === 6) return t;
  for (t = t.child; t !== null; ) {
    var e = Yf(t);
    if (e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var Kf = Ke.unstable_scheduleCallback,
  Xc = Ke.unstable_cancelCallback,
  lm = Ke.unstable_shouldYield,
  am = Ke.unstable_requestPaint,
  ce = Ke.unstable_now,
  cm = Ke.unstable_getCurrentPriorityLevel,
  Ia = Ke.unstable_ImmediatePriority,
  Xf = Ke.unstable_UserBlockingPriority,
  Rr = Ke.unstable_NormalPriority,
  um = Ke.unstable_LowPriority,
  Gf = Ke.unstable_IdlePriority,
  fo = null,
  kt = null;
function dm(t) {
  if (kt && typeof kt.onCommitFiberRoot == "function")
    try {
      kt.onCommitFiberRoot(fo, t, void 0, (t.current.flags & 128) === 128);
    } catch {}
}
var ht = Math.clz32 ? Math.clz32 : pm,
  fm = Math.log,
  hm = Math.LN2;
function pm(t) {
  return (t >>>= 0), t === 0 ? 32 : (31 - ((fm(t) / hm) | 0)) | 0;
}
var Ws = 64,
  Hs = 4194304;
function Ui(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function Ar(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var i = 0,
    s = t.suspendedLanes,
    r = t.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var l = o & ~s;
    l !== 0 ? (i = Ui(l)) : ((r &= o), r !== 0 && (i = Ui(r)));
  } else (o = n & ~s), o !== 0 ? (i = Ui(o)) : r !== 0 && (i = Ui(r));
  if (i === 0) return 0;
  if (
    e !== 0 &&
    e !== i &&
    !(e & s) &&
    ((s = i & -i), (r = e & -e), s >= r || (s === 16 && (r & 4194240) !== 0))
  )
    return e;
  if ((i & 4 && (i |= n & 16), (e = t.entangledLanes), e !== 0))
    for (t = t.entanglements, e &= i; 0 < e; )
      (n = 31 - ht(e)), (s = 1 << n), (i |= t[n]), (e &= ~s);
  return i;
}
function gm(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function mm(t, e) {
  for (
    var n = t.suspendedLanes,
      i = t.pingedLanes,
      s = t.expirationTimes,
      r = t.pendingLanes;
    0 < r;

  ) {
    var o = 31 - ht(r),
      l = 1 << o,
      a = s[o];
    a === -1
      ? (!(l & n) || l & i) && (s[o] = gm(l, e))
      : a <= e && (t.expiredLanes |= l),
      (r &= ~l);
  }
}
function Al(t) {
  return (
    (t = t.pendingLanes & -1073741825),
    t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
  );
}
function Qf() {
  var t = Ws;
  return (Ws <<= 1), !(Ws & 4194240) && (Ws = 64), t;
}
function No(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function Ls(t, e, n) {
  (t.pendingLanes |= e),
    e !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
    (t = t.eventTimes),
    (e = 31 - ht(e)),
    (t[e] = n);
}
function ym(t, e) {
  var n = t.pendingLanes & ~e;
  (t.pendingLanes = e),
    (t.suspendedLanes = 0),
    (t.pingedLanes = 0),
    (t.expiredLanes &= e),
    (t.mutableReadLanes &= e),
    (t.entangledLanes &= e),
    (e = t.entanglements);
  var i = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var s = 31 - ht(n),
      r = 1 << s;
    (e[s] = 0), (i[s] = -1), (t[s] = -1), (n &= ~r);
  }
}
function ja(t, e) {
  var n = (t.entangledLanes |= e);
  for (t = t.entanglements; n; ) {
    var i = 31 - ht(n),
      s = 1 << i;
    (s & e) | (t[i] & e) && (t[i] |= e), (n &= ~s);
  }
}
var G = 0;
function Zf(t) {
  return (t &= -t), 1 < t ? (4 < t ? (t & 268435455 ? 16 : 536870912) : 4) : 1;
}
var qf,
  za,
  Jf,
  eh,
  th,
  Il = !1,
  Vs = [],
  qt = null,
  Jt = null,
  en = null,
  fs = new Map(),
  hs = new Map(),
  Yt = [],
  vm =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Gc(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      qt = null;
      break;
    case "dragenter":
    case "dragleave":
      Jt = null;
      break;
    case "mouseover":
    case "mouseout":
      en = null;
      break;
    case "pointerover":
    case "pointerout":
      fs.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      hs.delete(e.pointerId);
  }
}
function Li(t, e, n, i, s, r) {
  return t === null || t.nativeEvent !== r
    ? ((t = {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: i,
        nativeEvent: r,
        targetContainers: [s],
      }),
      e !== null && ((e = As(e)), e !== null && za(e)),
      t)
    : ((t.eventSystemFlags |= i),
      (e = t.targetContainers),
      s !== null && e.indexOf(s) === -1 && e.push(s),
      t);
}
function xm(t, e, n, i, s) {
  switch (e) {
    case "focusin":
      return (qt = Li(qt, t, e, n, i, s)), !0;
    case "dragenter":
      return (Jt = Li(Jt, t, e, n, i, s)), !0;
    case "mouseover":
      return (en = Li(en, t, e, n, i, s)), !0;
    case "pointerover":
      var r = s.pointerId;
      return fs.set(r, Li(fs.get(r) || null, t, e, n, i, s)), !0;
    case "gotpointercapture":
      return (
        (r = s.pointerId), hs.set(r, Li(hs.get(r) || null, t, e, n, i, s)), !0
      );
  }
  return !1;
}
function nh(t) {
  var e = Sn(t.target);
  if (e !== null) {
    var n = Fn(e);
    if (n !== null) {
      if (((e = n.tag), e === 13)) {
        if (((e = Vf(n)), e !== null)) {
          (t.blockedOn = e),
            th(t.priority, function () {
              Jf(n);
            });
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function mr(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = jl(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var i = new n.constructor(n.type, n);
      (Tl = i), n.target.dispatchEvent(i), (Tl = null);
    } else return (e = As(n)), e !== null && za(e), (t.blockedOn = n), !1;
    e.shift();
  }
  return !0;
}
function Qc(t, e, n) {
  mr(t) && n.delete(e);
}
function _m() {
  (Il = !1),
    qt !== null && mr(qt) && (qt = null),
    Jt !== null && mr(Jt) && (Jt = null),
    en !== null && mr(en) && (en = null),
    fs.forEach(Qc),
    hs.forEach(Qc);
}
function Ri(t, e) {
  t.blockedOn === e &&
    ((t.blockedOn = null),
    Il ||
      ((Il = !0),
      Ke.unstable_scheduleCallback(Ke.unstable_NormalPriority, _m)));
}
function ps(t) {
  function e(s) {
    return Ri(s, t);
  }
  if (0 < Vs.length) {
    Ri(Vs[0], t);
    for (var n = 1; n < Vs.length; n++) {
      var i = Vs[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
  }
  for (
    qt !== null && Ri(qt, t),
      Jt !== null && Ri(Jt, t),
      en !== null && Ri(en, t),
      fs.forEach(e),
      hs.forEach(e),
      n = 0;
    n < Yt.length;
    n++
  )
    (i = Yt[n]), i.blockedOn === t && (i.blockedOn = null);
  for (; 0 < Yt.length && ((n = Yt[0]), n.blockedOn === null); )
    nh(n), n.blockedOn === null && Yt.shift();
}
var ci = $t.ReactCurrentBatchConfig,
  Ir = !0;
function wm(t, e, n, i) {
  var s = G,
    r = ci.transition;
  ci.transition = null;
  try {
    (G = 1), Na(t, e, n, i);
  } finally {
    (G = s), (ci.transition = r);
  }
}
function Sm(t, e, n, i) {
  var s = G,
    r = ci.transition;
  ci.transition = null;
  try {
    (G = 4), Na(t, e, n, i);
  } finally {
    (G = s), (ci.transition = r);
  }
}
function Na(t, e, n, i) {
  if (Ir) {
    var s = jl(t, e, n, i);
    if (s === null) Xo(t, e, i, jr, n), Gc(t, i);
    else if (xm(s, t, e, n, i)) i.stopPropagation();
    else if ((Gc(t, i), e & 4 && -1 < vm.indexOf(t))) {
      for (; s !== null; ) {
        var r = As(s);
        if (
          (r !== null && qf(r),
          (r = jl(t, e, n, i)),
          r === null && Xo(t, e, i, jr, n),
          r === s)
        )
          break;
        s = r;
      }
      s !== null && i.stopPropagation();
    } else Xo(t, e, i, null, n);
  }
}
var jr = null;
function jl(t, e, n, i) {
  if (((jr = null), (t = Aa(i)), (t = Sn(t)), t !== null))
    if (((e = Fn(t)), e === null)) t = null;
    else if (((n = e.tag), n === 13)) {
      if (((t = Vf(e)), t !== null)) return t;
      t = null;
    } else if (n === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated)
        return e.tag === 3 ? e.stateNode.containerInfo : null;
      t = null;
    } else e !== t && (t = null);
  return (jr = t), null;
}
function ih(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (cm()) {
        case Ia:
          return 1;
        case Xf:
          return 4;
        case Rr:
        case um:
          return 16;
        case Gf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Xt = null,
  Fa = null,
  yr = null;
function sh() {
  if (yr) return yr;
  var t,
    e = Fa,
    n = e.length,
    i,
    s = "value" in Xt ? Xt.value : Xt.textContent,
    r = s.length;
  for (t = 0; t < n && e[t] === s[t]; t++);
  var o = n - t;
  for (i = 1; i <= o && e[n - i] === s[r - i]; i++);
  return (yr = s.slice(t, 1 < i ? 1 - i : void 0));
}
function vr(t) {
  var e = t.keyCode;
  return (
    "charCode" in t
      ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
      : (t = e),
    t === 10 && (t = 13),
    32 <= t || t === 13 ? t : 0
  );
}
function Us() {
  return !0;
}
function Zc() {
  return !1;
}
function Ge(t) {
  function e(n, i, s, r, o) {
    (this._reactName = n),
      (this._targetInst = s),
      (this.type = i),
      (this.nativeEvent = r),
      (this.target = o),
      (this.currentTarget = null);
    for (var l in t)
      t.hasOwnProperty(l) && ((n = t[l]), (this[l] = n ? n(r) : r[l]));
    return (
      (this.isDefaultPrevented = (
        r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
      )
        ? Us
        : Zc),
      (this.isPropagationStopped = Zc),
      this
    );
  }
  return (
    oe(e.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Us));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Us));
      },
      persist: function () {},
      isPersistent: Us,
    }),
    e
  );
}
var Mi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ba = Ge(Mi),
  Rs = oe({}, Mi, { view: 0, detail: 0 }),
  km = Ge(Rs),
  Fo,
  Bo,
  Ai,
  ho = oe({}, Rs, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: $a,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      return t.relatedTarget === void 0
        ? t.fromElement === t.srcElement
          ? t.toElement
          : t.fromElement
        : t.relatedTarget;
    },
    movementX: function (t) {
      return "movementX" in t
        ? t.movementX
        : (t !== Ai &&
            (Ai && t.type === "mousemove"
              ? ((Fo = t.screenX - Ai.screenX), (Bo = t.screenY - Ai.screenY))
              : (Bo = Fo = 0),
            (Ai = t)),
          Fo);
    },
    movementY: function (t) {
      return "movementY" in t ? t.movementY : Bo;
    },
  }),
  qc = Ge(ho),
  bm = oe({}, ho, { dataTransfer: 0 }),
  Cm = Ge(bm),
  Mm = oe({}, Rs, { relatedTarget: 0 }),
  $o = Ge(Mm),
  Pm = oe({}, Mi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Em = Ge(Pm),
  Dm = oe({}, Mi, {
    clipboardData: function (t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    },
  }),
  Tm = Ge(Dm),
  Om = oe({}, Mi, { data: 0 }),
  Jc = Ge(Om),
  Lm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Rm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Am = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Im(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Am[t]) ? !!e[t] : !1;
}
function $a() {
  return Im;
}
var jm = oe({}, Rs, {
    key: function (t) {
      if (t.key) {
        var e = Lm[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress"
        ? ((t = vr(t)), t === 13 ? "Enter" : String.fromCharCode(t))
        : t.type === "keydown" || t.type === "keyup"
        ? Rm[t.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $a,
    charCode: function (t) {
      return t.type === "keypress" ? vr(t) : 0;
    },
    keyCode: function (t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function (t) {
      return t.type === "keypress"
        ? vr(t)
        : t.type === "keydown" || t.type === "keyup"
        ? t.keyCode
        : 0;
    },
  }),
  zm = Ge(jm),
  Nm = oe({}, ho, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  eu = Ge(Nm),
  Fm = oe({}, Rs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $a,
  }),
  Bm = Ge(Fm),
  $m = oe({}, Mi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Wm = Ge($m),
  Hm = oe({}, ho, {
    deltaX: function (t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function (t) {
      return "deltaY" in t
        ? t.deltaY
        : "wheelDeltaY" in t
        ? -t.wheelDeltaY
        : "wheelDelta" in t
        ? -t.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vm = Ge(Hm),
  Um = [9, 13, 27, 32],
  Wa = jt && "CompositionEvent" in window,
  qi = null;
jt && "documentMode" in document && (qi = document.documentMode);
var Ym = jt && "TextEvent" in window && !qi,
  rh = jt && (!Wa || (qi && 8 < qi && 11 >= qi)),
  tu = " ",
  nu = !1;
function oh(t, e) {
  switch (t) {
    case "keyup":
      return Um.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function lh(t) {
  return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
}
var Xn = !1;
function Km(t, e) {
  switch (t) {
    case "compositionend":
      return lh(e);
    case "keypress":
      return e.which !== 32 ? null : ((nu = !0), tu);
    case "textInput":
      return (t = e.data), t === tu && nu ? null : t;
    default:
      return null;
  }
}
function Xm(t, e) {
  if (Xn)
    return t === "compositionend" || (!Wa && oh(t, e))
      ? ((t = sh()), (yr = Fa = Xt = null), (Xn = !1), t)
      : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return rh && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Gm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function iu(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Gm[t.type] : e === "textarea";
}
function ah(t, e, n, i) {
  Ff(i),
    (e = zr(e, "onChange")),
    0 < e.length &&
      ((n = new Ba("onChange", "change", null, n, i)),
      t.push({ event: n, listeners: e }));
}
var Ji = null,
  gs = null;
function Qm(t) {
  xh(t, 0);
}
function po(t) {
  var e = Zn(t);
  if (Lf(e)) return t;
}
function Zm(t, e) {
  if (t === "change") return e;
}
var ch = !1;
if (jt) {
  var Wo;
  if (jt) {
    var Ho = "oninput" in document;
    if (!Ho) {
      var su = document.createElement("div");
      su.setAttribute("oninput", "return;"),
        (Ho = typeof su.oninput == "function");
    }
    Wo = Ho;
  } else Wo = !1;
  ch = Wo && (!document.documentMode || 9 < document.documentMode);
}
function ru() {
  Ji && (Ji.detachEvent("onpropertychange", uh), (gs = Ji = null));
}
function uh(t) {
  if (t.propertyName === "value" && po(gs)) {
    var e = [];
    ah(e, gs, t, Aa(t)), Hf(Qm, e);
  }
}
function qm(t, e, n) {
  t === "focusin"
    ? (ru(), (Ji = e), (gs = n), Ji.attachEvent("onpropertychange", uh))
    : t === "focusout" && ru();
}
function Jm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return po(gs);
}
function ey(t, e) {
  if (t === "click") return po(e);
}
function ty(t, e) {
  if (t === "input" || t === "change") return po(e);
}
function ny(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var gt = typeof Object.is == "function" ? Object.is : ny;
function ms(t, e) {
  if (gt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var n = Object.keys(t),
    i = Object.keys(e);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var s = n[i];
    if (!vl.call(e, s) || !gt(t[s], e[s])) return !1;
  }
  return !0;
}
function ou(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function lu(t, e) {
  var n = ou(t);
  t = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (((i = t + n.textContent.length), t <= e && i >= e))
        return { node: n, offset: e - t };
      t = i;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ou(n);
  }
}
function dh(t, e) {
  return t && e
    ? t === e
      ? !0
      : t && t.nodeType === 3
      ? !1
      : e && e.nodeType === 3
      ? dh(t, e.parentNode)
      : "contains" in t
      ? t.contains(e)
      : t.compareDocumentPosition
      ? !!(t.compareDocumentPosition(e) & 16)
      : !1
    : !1;
}
function fh() {
  for (var t = window, e = Tr(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = Tr(t.document);
  }
  return e;
}
function Ha(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return (
    e &&
    ((e === "input" &&
      (t.type === "text" ||
        t.type === "search" ||
        t.type === "tel" ||
        t.type === "url" ||
        t.type === "password")) ||
      e === "textarea" ||
      t.contentEditable === "true")
  );
}
function iy(t) {
  var e = fh(),
    n = t.focusedElem,
    i = t.selectionRange;
  if (
    e !== n &&
    n &&
    n.ownerDocument &&
    dh(n.ownerDocument.documentElement, n)
  ) {
    if (i !== null && Ha(n)) {
      if (
        ((e = i.start),
        (t = i.end),
        t === void 0 && (t = e),
        "selectionStart" in n)
      )
        (n.selectionStart = e), (n.selectionEnd = Math.min(t, n.value.length));
      else if (
        ((t = ((e = n.ownerDocument || document) && e.defaultView) || window),
        t.getSelection)
      ) {
        t = t.getSelection();
        var s = n.textContent.length,
          r = Math.min(i.start, s);
        (i = i.end === void 0 ? r : Math.min(i.end, s)),
          !t.extend && r > i && ((s = i), (i = r), (r = s)),
          (s = lu(n, r));
        var o = lu(n, i);
        s &&
          o &&
          (t.rangeCount !== 1 ||
            t.anchorNode !== s.node ||
            t.anchorOffset !== s.offset ||
            t.focusNode !== o.node ||
            t.focusOffset !== o.offset) &&
          ((e = e.createRange()),
          e.setStart(s.node, s.offset),
          t.removeAllRanges(),
          r > i
            ? (t.addRange(e), t.extend(o.node, o.offset))
            : (e.setEnd(o.node, o.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; (t = t.parentNode); )
      t.nodeType === 1 &&
        e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++)
      (t = e[n]),
        (t.element.scrollLeft = t.left),
        (t.element.scrollTop = t.top);
  }
}
var sy = jt && "documentMode" in document && 11 >= document.documentMode,
  Gn = null,
  zl = null,
  es = null,
  Nl = !1;
function au(t, e, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Nl ||
    Gn == null ||
    Gn !== Tr(i) ||
    ((i = Gn),
    "selectionStart" in i && Ha(i)
      ? (i = { start: i.selectionStart, end: i.selectionEnd })
      : ((i = (
          (i.ownerDocument && i.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (i = {
          anchorNode: i.anchorNode,
          anchorOffset: i.anchorOffset,
          focusNode: i.focusNode,
          focusOffset: i.focusOffset,
        })),
    (es && ms(es, i)) ||
      ((es = i),
      (i = zr(zl, "onSelect")),
      0 < i.length &&
        ((e = new Ba("onSelect", "select", null, e, n)),
        t.push({ event: e, listeners: i }),
        (e.target = Gn))));
}
function Ys(t, e) {
  var n = {};
  return (
    (n[t.toLowerCase()] = e.toLowerCase()),
    (n["Webkit" + t] = "webkit" + e),
    (n["Moz" + t] = "moz" + e),
    n
  );
}
var Qn = {
    animationend: Ys("Animation", "AnimationEnd"),
    animationiteration: Ys("Animation", "AnimationIteration"),
    animationstart: Ys("Animation", "AnimationStart"),
    transitionend: Ys("Transition", "TransitionEnd"),
  },
  Vo = {},
  hh = {};
jt &&
  ((hh = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Qn.animationend.animation,
    delete Qn.animationiteration.animation,
    delete Qn.animationstart.animation),
  "TransitionEvent" in window || delete Qn.transitionend.transition);
function go(t) {
  if (Vo[t]) return Vo[t];
  if (!Qn[t]) return t;
  var e = Qn[t],
    n;
  for (n in e) if (e.hasOwnProperty(n) && n in hh) return (Vo[t] = e[n]);
  return t;
}
var ph = go("animationend"),
  gh = go("animationiteration"),
  mh = go("animationstart"),
  yh = go("transitionend"),
  vh = new Map(),
  cu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function fn(t, e) {
  vh.set(t, e), Nn(e, [t]);
}
for (var Uo = 0; Uo < cu.length; Uo++) {
  var Yo = cu[Uo],
    ry = Yo.toLowerCase(),
    oy = Yo[0].toUpperCase() + Yo.slice(1);
  fn(ry, "on" + oy);
}
fn(ph, "onAnimationEnd");
fn(gh, "onAnimationIteration");
fn(mh, "onAnimationStart");
fn("dblclick", "onDoubleClick");
fn("focusin", "onFocus");
fn("focusout", "onBlur");
fn(yh, "onTransitionEnd");
gi("onMouseEnter", ["mouseout", "mouseover"]);
gi("onMouseLeave", ["mouseout", "mouseover"]);
gi("onPointerEnter", ["pointerout", "pointerover"]);
gi("onPointerLeave", ["pointerout", "pointerover"]);
Nn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Nn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Nn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Nn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Nn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Nn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Yi =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  ly = new Set("cancel close invalid load scroll toggle".split(" ").concat(Yi));
function uu(t, e, n) {
  var i = t.type || "unknown-event";
  (t.currentTarget = n), rm(i, e, void 0, t), (t.currentTarget = null);
}
function xh(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var i = t[n],
      s = i.event;
    i = i.listeners;
    e: {
      var r = void 0;
      if (e)
        for (var o = i.length - 1; 0 <= o; o--) {
          var l = i[o],
            a = l.instance,
            c = l.currentTarget;
          if (((l = l.listener), a !== r && s.isPropagationStopped())) break e;
          uu(s, l, c), (r = a);
        }
      else
        for (o = 0; o < i.length; o++) {
          if (
            ((l = i[o]),
            (a = l.instance),
            (c = l.currentTarget),
            (l = l.listener),
            a !== r && s.isPropagationStopped())
          )
            break e;
          uu(s, l, c), (r = a);
        }
    }
  }
  if (Lr) throw ((t = Rl), (Lr = !1), (Rl = null), t);
}
function q(t, e) {
  var n = e[Hl];
  n === void 0 && (n = e[Hl] = new Set());
  var i = t + "__bubble";
  n.has(i) || (_h(e, t, 2, !1), n.add(i));
}
function Ko(t, e, n) {
  var i = 0;
  e && (i |= 4), _h(n, t, i, e);
}
var Ks = "_reactListening" + Math.random().toString(36).slice(2);
function ys(t) {
  if (!t[Ks]) {
    (t[Ks] = !0),
      Pf.forEach(function (n) {
        n !== "selectionchange" && (ly.has(n) || Ko(n, !1, t), Ko(n, !0, t));
      });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Ks] || ((e[Ks] = !0), Ko("selectionchange", !1, e));
  }
}
function _h(t, e, n, i) {
  switch (ih(e)) {
    case 1:
      var s = wm;
      break;
    case 4:
      s = Sm;
      break;
    default:
      s = Na;
  }
  (n = s.bind(null, e, n, t)),
    (s = void 0),
    !Ll ||
      (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
      (s = !0),
    i
      ? s !== void 0
        ? t.addEventListener(e, n, { capture: !0, passive: s })
        : t.addEventListener(e, n, !0)
      : s !== void 0
      ? t.addEventListener(e, n, { passive: s })
      : t.addEventListener(e, n, !1);
}
function Xo(t, e, n, i, s) {
  var r = i;
  if (!(e & 1) && !(e & 2) && i !== null)
    e: for (;;) {
      if (i === null) return;
      var o = i.tag;
      if (o === 3 || o === 4) {
        var l = i.stateNode.containerInfo;
        if (l === s || (l.nodeType === 8 && l.parentNode === s)) break;
        if (o === 4)
          for (o = i.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === s || (a.nodeType === 8 && a.parentNode === s))
            )
              return;
            o = o.return;
          }
        for (; l !== null; ) {
          if (((o = Sn(l)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            i = r = o;
            continue e;
          }
          l = l.parentNode;
        }
      }
      i = i.return;
    }
  Hf(function () {
    var c = r,
      u = Aa(n),
      d = [];
    e: {
      var f = vh.get(t);
      if (f !== void 0) {
        var m = Ba,
          v = t;
        switch (t) {
          case "keypress":
            if (vr(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = zm;
            break;
          case "focusin":
            (v = "focus"), (m = $o);
            break;
          case "focusout":
            (v = "blur"), (m = $o);
            break;
          case "beforeblur":
          case "afterblur":
            m = $o;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = qc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = Cm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Bm;
            break;
          case ph:
          case gh:
          case mh:
            m = Em;
            break;
          case yh:
            m = Wm;
            break;
          case "scroll":
            m = km;
            break;
          case "wheel":
            m = Vm;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Tm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = eu;
        }
        var g = (e & 4) !== 0,
          x = !g && t === "scroll",
          p = g ? (f !== null ? f + "Capture" : null) : f;
        g = [];
        for (var h = c, y; h !== null; ) {
          y = h;
          var _ = y.stateNode;
          if (
            (y.tag === 5 &&
              _ !== null &&
              ((y = _),
              p !== null && ((_ = ds(h, p)), _ != null && g.push(vs(h, _, y)))),
            x)
          )
            break;
          h = h.return;
        }
        0 < g.length &&
          ((f = new m(f, v, null, n, u)), d.push({ event: f, listeners: g }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (
          ((f = t === "mouseover" || t === "pointerover"),
          (m = t === "mouseout" || t === "pointerout"),
          f &&
            n !== Tl &&
            (v = n.relatedTarget || n.fromElement) &&
            (Sn(v) || v[zt]))
        )
          break e;
        if (
          (m || f) &&
          ((f =
            u.window === u
              ? u
              : (f = u.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          m
            ? ((v = n.relatedTarget || n.toElement),
              (m = c),
              (v = v ? Sn(v) : null),
              v !== null &&
                ((x = Fn(v)), v !== x || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((m = null), (v = c)),
          m !== v)
        ) {
          if (
            ((g = qc),
            (_ = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (t === "pointerout" || t === "pointerover") &&
              ((g = eu),
              (_ = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (x = m == null ? f : Zn(m)),
            (y = v == null ? f : Zn(v)),
            (f = new g(_, h + "leave", m, n, u)),
            (f.target = x),
            (f.relatedTarget = y),
            (_ = null),
            Sn(u) === c &&
              ((g = new g(p, h + "enter", v, n, u)),
              (g.target = y),
              (g.relatedTarget = x),
              (_ = g)),
            (x = _),
            m && v)
          )
            t: {
              for (g = m, p = v, h = 0, y = g; y; y = Hn(y)) h++;
              for (y = 0, _ = p; _; _ = Hn(_)) y++;
              for (; 0 < h - y; ) (g = Hn(g)), h--;
              for (; 0 < y - h; ) (p = Hn(p)), y--;
              for (; h--; ) {
                if (g === p || (p !== null && g === p.alternate)) break t;
                (g = Hn(g)), (p = Hn(p));
              }
              g = null;
            }
          else g = null;
          m !== null && du(d, f, m, g, !1),
            v !== null && x !== null && du(d, x, v, g, !0);
        }
      }
      e: {
        if (
          ((f = c ? Zn(c) : window),
          (m = f.nodeName && f.nodeName.toLowerCase()),
          m === "select" || (m === "input" && f.type === "file"))
        )
          var w = Zm;
        else if (iu(f))
          if (ch) w = ty;
          else {
            w = Jm;
            var k = qm;
          }
        else
          (m = f.nodeName) &&
            m.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (w = ey);
        if (w && (w = w(t, c))) {
          ah(d, w, n, u);
          break e;
        }
        k && k(t, f, c),
          t === "focusout" &&
            (k = f._wrapperState) &&
            k.controlled &&
            f.type === "number" &&
            Cl(f, "number", f.value);
      }
      switch (((k = c ? Zn(c) : window), t)) {
        case "focusin":
          (iu(k) || k.contentEditable === "true") &&
            ((Gn = k), (zl = c), (es = null));
          break;
        case "focusout":
          es = zl = Gn = null;
          break;
        case "mousedown":
          Nl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Nl = !1), au(d, n, u);
          break;
        case "selectionchange":
          if (sy) break;
        case "keydown":
        case "keyup":
          au(d, n, u);
      }
      var b;
      if (Wa)
        e: {
          switch (t) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        Xn
          ? oh(t, n) && (C = "onCompositionEnd")
          : t === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C &&
        (rh &&
          n.locale !== "ko" &&
          (Xn || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && Xn && (b = sh())
            : ((Xt = u),
              (Fa = "value" in Xt ? Xt.value : Xt.textContent),
              (Xn = !0))),
        (k = zr(c, C)),
        0 < k.length &&
          ((C = new Jc(C, t, null, n, u)),
          d.push({ event: C, listeners: k }),
          b ? (C.data = b) : ((b = lh(n)), b !== null && (C.data = b)))),
        (b = Ym ? Km(t, n) : Xm(t, n)) &&
          ((c = zr(c, "onBeforeInput")),
          0 < c.length &&
            ((u = new Jc("onBeforeInput", "beforeinput", null, n, u)),
            d.push({ event: u, listeners: c }),
            (u.data = b)));
    }
    xh(d, e);
  });
}
function vs(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function zr(t, e) {
  for (var n = e + "Capture", i = []; t !== null; ) {
    var s = t,
      r = s.stateNode;
    s.tag === 5 &&
      r !== null &&
      ((s = r),
      (r = ds(t, n)),
      r != null && i.unshift(vs(t, r, s)),
      (r = ds(t, e)),
      r != null && i.push(vs(t, r, s))),
      (t = t.return);
  }
  return i;
}
function Hn(t) {
  if (t === null) return null;
  do t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function du(t, e, n, i, s) {
  for (var r = e._reactName, o = []; n !== null && n !== i; ) {
    var l = n,
      a = l.alternate,
      c = l.stateNode;
    if (a !== null && a === i) break;
    l.tag === 5 &&
      c !== null &&
      ((l = c),
      s
        ? ((a = ds(n, r)), a != null && o.unshift(vs(n, a, l)))
        : s || ((a = ds(n, r)), a != null && o.push(vs(n, a, l)))),
      (n = n.return);
  }
  o.length !== 0 && t.push({ event: e, listeners: o });
}
var ay = /\r\n?/g,
  cy = /\u0000|\uFFFD/g;
function fu(t) {
  return (typeof t == "string" ? t : "" + t)
    .replace(
      ay,
      `
`
    )
    .replace(cy, "");
}
function Xs(t, e, n) {
  if (((e = fu(e)), fu(t) !== e && n)) throw Error(P(425));
}
function Nr() {}
var Fl = null,
  Bl = null;
function $l(t, e) {
  return (
    t === "textarea" ||
    t === "noscript" ||
    typeof e.children == "string" ||
    typeof e.children == "number" ||
    (typeof e.dangerouslySetInnerHTML == "object" &&
      e.dangerouslySetInnerHTML !== null &&
      e.dangerouslySetInnerHTML.__html != null)
  );
}
var Wl = typeof setTimeout == "function" ? setTimeout : void 0,
  uy = typeof clearTimeout == "function" ? clearTimeout : void 0,
  hu = typeof Promise == "function" ? Promise : void 0,
  dy =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof hu < "u"
      ? function (t) {
          return hu.resolve(null).then(t).catch(fy);
        }
      : Wl;
function fy(t) {
  setTimeout(function () {
    throw t;
  });
}
function Go(t, e) {
  var n = e,
    i = 0;
  do {
    var s = n.nextSibling;
    if ((t.removeChild(n), s && s.nodeType === 8))
      if (((n = s.data), n === "/$")) {
        if (i === 0) {
          t.removeChild(s), ps(e);
          return;
        }
        i--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || i++;
    n = s;
  } while (n);
  ps(e);
}
function tn(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (((e = t.data), e === "$" || e === "$!" || e === "$?")) break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function pu(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Pi = Math.random().toString(36).slice(2),
  St = "__reactFiber$" + Pi,
  xs = "__reactProps$" + Pi,
  zt = "__reactContainer$" + Pi,
  Hl = "__reactEvents$" + Pi,
  hy = "__reactListeners$" + Pi,
  py = "__reactHandles$" + Pi;
function Sn(t) {
  var e = t[St];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if ((e = n[zt] || n[St])) {
      if (
        ((n = e.alternate),
        e.child !== null || (n !== null && n.child !== null))
      )
        for (t = pu(t); t !== null; ) {
          if ((n = t[St])) return n;
          t = pu(t);
        }
      return e;
    }
    (t = n), (n = t.parentNode);
  }
  return null;
}
function As(t) {
  return (
    (t = t[St] || t[zt]),
    !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3) ? null : t
  );
}
function Zn(t) {
  if (t.tag === 5 || t.tag === 6) return t.stateNode;
  throw Error(P(33));
}
function mo(t) {
  return t[xs] || null;
}
var Vl = [],
  qn = -1;
function hn(t) {
  return { current: t };
}
function te(t) {
  0 > qn || ((t.current = Vl[qn]), (Vl[qn] = null), qn--);
}
function Z(t, e) {
  qn++, (Vl[qn] = t.current), (t.current = e);
}
var un = {},
  Te = hn(un),
  $e = hn(!1),
  Tn = un;
function mi(t, e) {
  var n = t.type.contextTypes;
  if (!n) return un;
  var i = t.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === e)
    return i.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    r;
  for (r in n) s[r] = e[r];
  return (
    i &&
      ((t = t.stateNode),
      (t.__reactInternalMemoizedUnmaskedChildContext = e),
      (t.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function We(t) {
  return (t = t.childContextTypes), t != null;
}
function Fr() {
  te($e), te(Te);
}
function gu(t, e, n) {
  if (Te.current !== un) throw Error(P(168));
  Z(Te, e), Z($e, n);
}
function wh(t, e, n) {
  var i = t.stateNode;
  if (((e = e.childContextTypes), typeof i.getChildContext != "function"))
    return n;
  i = i.getChildContext();
  for (var s in i) if (!(s in e)) throw Error(P(108, qg(t) || "Unknown", s));
  return oe({}, n, i);
}
function Br(t) {
  return (
    (t =
      ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) || un),
    (Tn = Te.current),
    Z(Te, t),
    Z($e, $e.current),
    !0
  );
}
function mu(t, e, n) {
  var i = t.stateNode;
  if (!i) throw Error(P(169));
  n
    ? ((t = wh(t, e, Tn)),
      (i.__reactInternalMemoizedMergedChildContext = t),
      te($e),
      te(Te),
      Z(Te, t))
    : te($e),
    Z($e, n);
}
var Tt = null,
  yo = !1,
  Qo = !1;
function Sh(t) {
  Tt === null ? (Tt = [t]) : Tt.push(t);
}
function gy(t) {
  (yo = !0), Sh(t);
}
function pn() {
  if (!Qo && Tt !== null) {
    Qo = !0;
    var t = 0,
      e = G;
    try {
      var n = Tt;
      for (G = 1; t < n.length; t++) {
        var i = n[t];
        do i = i(!0);
        while (i !== null);
      }
      (Tt = null), (yo = !1);
    } catch (s) {
      throw (Tt !== null && (Tt = Tt.slice(t + 1)), Kf(Ia, pn), s);
    } finally {
      (G = e), (Qo = !1);
    }
  }
  return null;
}
var Jn = [],
  ei = 0,
  $r = null,
  Wr = 0,
  Ze = [],
  qe = 0,
  On = null,
  Lt = 1,
  Rt = "";
function xn(t, e) {
  (Jn[ei++] = Wr), (Jn[ei++] = $r), ($r = t), (Wr = e);
}
function kh(t, e, n) {
  (Ze[qe++] = Lt), (Ze[qe++] = Rt), (Ze[qe++] = On), (On = t);
  var i = Lt;
  t = Rt;
  var s = 32 - ht(i) - 1;
  (i &= ~(1 << s)), (n += 1);
  var r = 32 - ht(e) + s;
  if (30 < r) {
    var o = s - (s % 5);
    (r = (i & ((1 << o) - 1)).toString(32)),
      (i >>= o),
      (s -= o),
      (Lt = (1 << (32 - ht(e) + s)) | (n << s) | i),
      (Rt = r + t);
  } else (Lt = (1 << r) | (n << s) | i), (Rt = t);
}
function Va(t) {
  t.return !== null && (xn(t, 1), kh(t, 1, 0));
}
function Ua(t) {
  for (; t === $r; )
    ($r = Jn[--ei]), (Jn[ei] = null), (Wr = Jn[--ei]), (Jn[ei] = null);
  for (; t === On; )
    (On = Ze[--qe]),
      (Ze[qe] = null),
      (Rt = Ze[--qe]),
      (Ze[qe] = null),
      (Lt = Ze[--qe]),
      (Ze[qe] = null);
}
var Ye = null,
  Ue = null,
  ne = !1,
  ft = null;
function bh(t, e) {
  var n = et(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = e),
    (n.return = t),
    (e = t.deletions),
    e === null ? ((t.deletions = [n]), (t.flags |= 16)) : e.push(n);
}
function yu(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return (
        (e =
          e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase()
            ? null
            : e),
        e !== null
          ? ((t.stateNode = e), (Ye = t), (Ue = tn(e.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (e = t.pendingProps === "" || e.nodeType !== 3 ? null : e),
        e !== null ? ((t.stateNode = e), (Ye = t), (Ue = null), !0) : !1
      );
    case 13:
      return (
        (e = e.nodeType !== 8 ? null : e),
        e !== null
          ? ((n = On !== null ? { id: Lt, overflow: Rt } : null),
            (t.memoizedState = {
              dehydrated: e,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = et(18, null, null, 0)),
            (n.stateNode = e),
            (n.return = t),
            (t.child = n),
            (Ye = t),
            (Ue = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ul(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function Yl(t) {
  if (ne) {
    var e = Ue;
    if (e) {
      var n = e;
      if (!yu(t, e)) {
        if (Ul(t)) throw Error(P(418));
        e = tn(n.nextSibling);
        var i = Ye;
        e && yu(t, e)
          ? bh(i, n)
          : ((t.flags = (t.flags & -4097) | 2), (ne = !1), (Ye = t));
      }
    } else {
      if (Ul(t)) throw Error(P(418));
      (t.flags = (t.flags & -4097) | 2), (ne = !1), (Ye = t);
    }
  }
}
function vu(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; )
    t = t.return;
  Ye = t;
}
function Gs(t) {
  if (t !== Ye) return !1;
  if (!ne) return vu(t), (ne = !0), !1;
  var e;
  if (
    ((e = t.tag !== 3) &&
      !(e = t.tag !== 5) &&
      ((e = t.type),
      (e = e !== "head" && e !== "body" && !$l(t.type, t.memoizedProps))),
    e && (e = Ue))
  ) {
    if (Ul(t)) throw (Ch(), Error(P(418)));
    for (; e; ) bh(t, e), (e = tn(e.nextSibling));
  }
  if ((vu(t), t.tag === 13)) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
      throw Error(P(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              Ue = tn(t.nextSibling);
              break e;
            }
            e--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
        }
        t = t.nextSibling;
      }
      Ue = null;
    }
  } else Ue = Ye ? tn(t.stateNode.nextSibling) : null;
  return !0;
}
function Ch() {
  for (var t = Ue; t; ) t = tn(t.nextSibling);
}
function yi() {
  (Ue = Ye = null), (ne = !1);
}
function Ya(t) {
  ft === null ? (ft = [t]) : ft.push(t);
}
var my = $t.ReactCurrentBatchConfig;
function Ii(t, e, n) {
  if (
    ((t = n.ref), t !== null && typeof t != "function" && typeof t != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(P(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(P(147, t));
      var s = i,
        r = "" + t;
      return e !== null &&
        e.ref !== null &&
        typeof e.ref == "function" &&
        e.ref._stringRef === r
        ? e.ref
        : ((e = function (o) {
            var l = s.refs;
            o === null ? delete l[r] : (l[r] = o);
          }),
          (e._stringRef = r),
          e);
    }
    if (typeof t != "string") throw Error(P(284));
    if (!n._owner) throw Error(P(290, t));
  }
  return t;
}
function Qs(t, e) {
  throw (
    ((t = Object.prototype.toString.call(e)),
    Error(
      P(
        31,
        t === "[object Object]"
          ? "object with keys {" + Object.keys(e).join(", ") + "}"
          : t
      )
    ))
  );
}
function xu(t) {
  var e = t._init;
  return e(t._payload);
}
function Mh(t) {
  function e(p, h) {
    if (t) {
      var y = p.deletions;
      y === null ? ((p.deletions = [h]), (p.flags |= 16)) : y.push(h);
    }
  }
  function n(p, h) {
    if (!t) return null;
    for (; h !== null; ) e(p, h), (h = h.sibling);
    return null;
  }
  function i(p, h) {
    for (p = new Map(); h !== null; )
      h.key !== null ? p.set(h.key, h) : p.set(h.index, h), (h = h.sibling);
    return p;
  }
  function s(p, h) {
    return (p = on(p, h)), (p.index = 0), (p.sibling = null), p;
  }
  function r(p, h, y) {
    return (
      (p.index = y),
      t
        ? ((y = p.alternate),
          y !== null
            ? ((y = y.index), y < h ? ((p.flags |= 2), h) : y)
            : ((p.flags |= 2), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function o(p) {
    return t && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, h, y, _) {
    return h === null || h.tag !== 6
      ? ((h = il(y, p.mode, _)), (h.return = p), h)
      : ((h = s(h, y)), (h.return = p), h);
  }
  function a(p, h, y, _) {
    var w = y.type;
    return w === Kn
      ? u(p, h, y.props.children, _, y.key)
      : h !== null &&
        (h.elementType === w ||
          (typeof w == "object" &&
            w !== null &&
            w.$$typeof === Vt &&
            xu(w) === h.type))
      ? ((_ = s(h, y.props)), (_.ref = Ii(p, h, y)), (_.return = p), _)
      : ((_ = Cr(y.type, y.key, y.props, null, p.mode, _)),
        (_.ref = Ii(p, h, y)),
        (_.return = p),
        _);
  }
  function c(p, h, y, _) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== y.containerInfo ||
      h.stateNode.implementation !== y.implementation
      ? ((h = sl(y, p.mode, _)), (h.return = p), h)
      : ((h = s(h, y.children || [])), (h.return = p), h);
  }
  function u(p, h, y, _, w) {
    return h === null || h.tag !== 7
      ? ((h = Pn(y, p.mode, _, w)), (h.return = p), h)
      : ((h = s(h, y)), (h.return = p), h);
  }
  function d(p, h, y) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = il("" + h, p.mode, y)), (h.return = p), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Fs:
          return (
            (y = Cr(h.type, h.key, h.props, null, p.mode, y)),
            (y.ref = Ii(p, null, h)),
            (y.return = p),
            y
          );
        case Yn:
          return (h = sl(h, p.mode, y)), (h.return = p), h;
        case Vt:
          var _ = h._init;
          return d(p, _(h._payload), y);
      }
      if (Vi(h) || Ti(h))
        return (h = Pn(h, p.mode, y, null)), (h.return = p), h;
      Qs(p, h);
    }
    return null;
  }
  function f(p, h, y, _) {
    var w = h !== null ? h.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return w !== null ? null : l(p, h, "" + y, _);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Fs:
          return y.key === w ? a(p, h, y, _) : null;
        case Yn:
          return y.key === w ? c(p, h, y, _) : null;
        case Vt:
          return (w = y._init), f(p, h, w(y._payload), _);
      }
      if (Vi(y) || Ti(y)) return w !== null ? null : u(p, h, y, _, null);
      Qs(p, y);
    }
    return null;
  }
  function m(p, h, y, _, w) {
    if ((typeof _ == "string" && _ !== "") || typeof _ == "number")
      return (p = p.get(y) || null), l(h, p, "" + _, w);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Fs:
          return (p = p.get(_.key === null ? y : _.key) || null), a(h, p, _, w);
        case Yn:
          return (p = p.get(_.key === null ? y : _.key) || null), c(h, p, _, w);
        case Vt:
          var k = _._init;
          return m(p, h, y, k(_._payload), w);
      }
      if (Vi(_) || Ti(_)) return (p = p.get(y) || null), u(h, p, _, w, null);
      Qs(h, _);
    }
    return null;
  }
  function v(p, h, y, _) {
    for (
      var w = null, k = null, b = h, C = (h = 0), E = null;
      b !== null && C < y.length;
      C++
    ) {
      b.index > C ? ((E = b), (b = null)) : (E = b.sibling);
      var M = f(p, b, y[C], _);
      if (M === null) {
        b === null && (b = E);
        break;
      }
      t && b && M.alternate === null && e(p, b),
        (h = r(M, h, C)),
        k === null ? (w = M) : (k.sibling = M),
        (k = M),
        (b = E);
    }
    if (C === y.length) return n(p, b), ne && xn(p, C), w;
    if (b === null) {
      for (; C < y.length; C++)
        (b = d(p, y[C], _)),
          b !== null &&
            ((h = r(b, h, C)), k === null ? (w = b) : (k.sibling = b), (k = b));
      return ne && xn(p, C), w;
    }
    for (b = i(p, b); C < y.length; C++)
      (E = m(b, p, C, y[C], _)),
        E !== null &&
          (t && E.alternate !== null && b.delete(E.key === null ? C : E.key),
          (h = r(E, h, C)),
          k === null ? (w = E) : (k.sibling = E),
          (k = E));
    return (
      t &&
        b.forEach(function (T) {
          return e(p, T);
        }),
      ne && xn(p, C),
      w
    );
  }
  function g(p, h, y, _) {
    var w = Ti(y);
    if (typeof w != "function") throw Error(P(150));
    if (((y = w.call(y)), y == null)) throw Error(P(151));
    for (
      var k = (w = null), b = h, C = (h = 0), E = null, M = y.next();
      b !== null && !M.done;
      C++, M = y.next()
    ) {
      b.index > C ? ((E = b), (b = null)) : (E = b.sibling);
      var T = f(p, b, M.value, _);
      if (T === null) {
        b === null && (b = E);
        break;
      }
      t && b && T.alternate === null && e(p, b),
        (h = r(T, h, C)),
        k === null ? (w = T) : (k.sibling = T),
        (k = T),
        (b = E);
    }
    if (M.done) return n(p, b), ne && xn(p, C), w;
    if (b === null) {
      for (; !M.done; C++, M = y.next())
        (M = d(p, M.value, _)),
          M !== null &&
            ((h = r(M, h, C)), k === null ? (w = M) : (k.sibling = M), (k = M));
      return ne && xn(p, C), w;
    }
    for (b = i(p, b); !M.done; C++, M = y.next())
      (M = m(b, p, C, M.value, _)),
        M !== null &&
          (t && M.alternate !== null && b.delete(M.key === null ? C : M.key),
          (h = r(M, h, C)),
          k === null ? (w = M) : (k.sibling = M),
          (k = M));
    return (
      t &&
        b.forEach(function (A) {
          return e(p, A);
        }),
      ne && xn(p, C),
      w
    );
  }
  function x(p, h, y, _) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === Kn &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case Fs:
          e: {
            for (var w = y.key, k = h; k !== null; ) {
              if (k.key === w) {
                if (((w = y.type), w === Kn)) {
                  if (k.tag === 7) {
                    n(p, k.sibling),
                      (h = s(k, y.props.children)),
                      (h.return = p),
                      (p = h);
                    break e;
                  }
                } else if (
                  k.elementType === w ||
                  (typeof w == "object" &&
                    w !== null &&
                    w.$$typeof === Vt &&
                    xu(w) === k.type)
                ) {
                  n(p, k.sibling),
                    (h = s(k, y.props)),
                    (h.ref = Ii(p, k, y)),
                    (h.return = p),
                    (p = h);
                  break e;
                }
                n(p, k);
                break;
              } else e(p, k);
              k = k.sibling;
            }
            y.type === Kn
              ? ((h = Pn(y.props.children, p.mode, _, y.key)),
                (h.return = p),
                (p = h))
              : ((_ = Cr(y.type, y.key, y.props, null, p.mode, _)),
                (_.ref = Ii(p, h, y)),
                (_.return = p),
                (p = _));
          }
          return o(p);
        case Yn:
          e: {
            for (k = y.key; h !== null; ) {
              if (h.key === k)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === y.containerInfo &&
                  h.stateNode.implementation === y.implementation
                ) {
                  n(p, h.sibling),
                    (h = s(h, y.children || [])),
                    (h.return = p),
                    (p = h);
                  break e;
                } else {
                  n(p, h);
                  break;
                }
              else e(p, h);
              h = h.sibling;
            }
            (h = sl(y, p.mode, _)), (h.return = p), (p = h);
          }
          return o(p);
        case Vt:
          return (k = y._init), x(p, h, k(y._payload), _);
      }
      if (Vi(y)) return v(p, h, y, _);
      if (Ti(y)) return g(p, h, y, _);
      Qs(p, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (h = s(h, y)), (h.return = p), (p = h))
          : (n(p, h), (h = il(y, p.mode, _)), (h.return = p), (p = h)),
        o(p))
      : n(p, h);
  }
  return x;
}
var vi = Mh(!0),
  Ph = Mh(!1),
  Hr = hn(null),
  Vr = null,
  ti = null,
  Ka = null;
function Xa() {
  Ka = ti = Vr = null;
}
function Ga(t) {
  var e = Hr.current;
  te(Hr), (t._currentValue = e);
}
function Kl(t, e, n) {
  for (; t !== null; ) {
    var i = t.alternate;
    if (
      ((t.childLanes & e) !== e
        ? ((t.childLanes |= e), i !== null && (i.childLanes |= e))
        : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e),
      t === n)
    )
      break;
    t = t.return;
  }
}
function ui(t, e) {
  (Vr = t),
    (Ka = ti = null),
    (t = t.dependencies),
    t !== null &&
      t.firstContext !== null &&
      (t.lanes & e && (Fe = !0), (t.firstContext = null));
}
function it(t) {
  var e = t._currentValue;
  if (Ka !== t)
    if (((t = { context: t, memoizedValue: e, next: null }), ti === null)) {
      if (Vr === null) throw Error(P(308));
      (ti = t), (Vr.dependencies = { lanes: 0, firstContext: t });
    } else ti = ti.next = t;
  return e;
}
var kn = null;
function Qa(t) {
  kn === null ? (kn = [t]) : kn.push(t);
}
function Eh(t, e, n, i) {
  var s = e.interleaved;
  return (
    s === null ? ((n.next = n), Qa(e)) : ((n.next = s.next), (s.next = n)),
    (e.interleaved = n),
    Nt(t, i)
  );
}
function Nt(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; )
    (t.childLanes |= e),
      (n = t.alternate),
      n !== null && (n.childLanes |= e),
      (n = t),
      (t = t.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Ut = !1;
function Za(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Dh(t, e) {
  (t = t.updateQueue),
    e.updateQueue === t &&
      (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        effects: t.effects,
      });
}
function It(t, e) {
  return {
    eventTime: t,
    lane: e,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function nn(t, e, n) {
  var i = t.updateQueue;
  if (i === null) return null;
  if (((i = i.shared), H & 2)) {
    var s = i.pending;
    return (
      s === null ? (e.next = e) : ((e.next = s.next), (s.next = e)),
      (i.pending = e),
      Nt(t, n)
    );
  }
  return (
    (s = i.interleaved),
    s === null ? ((e.next = e), Qa(i)) : ((e.next = s.next), (s.next = e)),
    (i.interleaved = e),
    Nt(t, n)
  );
}
function xr(t, e, n) {
  if (
    ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194240) !== 0))
  ) {
    var i = e.lanes;
    (i &= t.pendingLanes), (n |= i), (e.lanes = n), ja(t, n);
  }
}
function _u(t, e) {
  var n = t.updateQueue,
    i = t.alternate;
  if (i !== null && ((i = i.updateQueue), n === i)) {
    var s = null,
      r = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        r === null ? (s = r = o) : (r = r.next = o), (n = n.next);
      } while (n !== null);
      r === null ? (s = r = e) : (r = r.next = e);
    } else s = r = e;
    (n = {
      baseState: i.baseState,
      firstBaseUpdate: s,
      lastBaseUpdate: r,
      shared: i.shared,
      effects: i.effects,
    }),
      (t.updateQueue = n);
    return;
  }
  (t = n.lastBaseUpdate),
    t === null ? (n.firstBaseUpdate = e) : (t.next = e),
    (n.lastBaseUpdate = e);
}
function Ur(t, e, n, i) {
  var s = t.updateQueue;
  Ut = !1;
  var r = s.firstBaseUpdate,
    o = s.lastBaseUpdate,
    l = s.shared.pending;
  if (l !== null) {
    s.shared.pending = null;
    var a = l,
      c = a.next;
    (a.next = null), o === null ? (r = c) : (o.next = c), (o = a);
    var u = t.alternate;
    u !== null &&
      ((u = u.updateQueue),
      (l = u.lastBaseUpdate),
      l !== o &&
        (l === null ? (u.firstBaseUpdate = c) : (l.next = c),
        (u.lastBaseUpdate = a)));
  }
  if (r !== null) {
    var d = s.baseState;
    (o = 0), (u = c = a = null), (l = r);
    do {
      var f = l.lane,
        m = l.eventTime;
      if ((i & f) === f) {
        u !== null &&
          (u = u.next =
            {
              eventTime: m,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var v = t,
            g = l;
          switch (((f = e), (m = n), g.tag)) {
            case 1:
              if (((v = g.payload), typeof v == "function")) {
                d = v.call(m, d, f);
                break e;
              }
              d = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = g.payload),
                (f = typeof v == "function" ? v.call(m, d, f) : v),
                f == null)
              )
                break e;
              d = oe({}, d, f);
              break e;
            case 2:
              Ut = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((t.flags |= 64),
          (f = s.effects),
          f === null ? (s.effects = [l]) : f.push(l));
      } else
        (m = {
          eventTime: m,
          lane: f,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          u === null ? ((c = u = m), (a = d)) : (u = u.next = m),
          (o |= f);
      if (((l = l.next), l === null)) {
        if (((l = s.shared.pending), l === null)) break;
        (f = l),
          (l = f.next),
          (f.next = null),
          (s.lastBaseUpdate = f),
          (s.shared.pending = null);
      }
    } while (!0);
    if (
      (u === null && (a = d),
      (s.baseState = a),
      (s.firstBaseUpdate = c),
      (s.lastBaseUpdate = u),
      (e = s.shared.interleaved),
      e !== null)
    ) {
      s = e;
      do (o |= s.lane), (s = s.next);
      while (s !== e);
    } else r === null && (s.shared.lanes = 0);
    (Rn |= o), (t.lanes = o), (t.memoizedState = d);
  }
}
function wu(t, e, n) {
  if (((t = e.effects), (e.effects = null), t !== null))
    for (e = 0; e < t.length; e++) {
      var i = t[e],
        s = i.callback;
      if (s !== null) {
        if (((i.callback = null), (i = n), typeof s != "function"))
          throw Error(P(191, s));
        s.call(i);
      }
    }
}
var Is = {},
  bt = hn(Is),
  _s = hn(Is),
  ws = hn(Is);
function bn(t) {
  if (t === Is) throw Error(P(174));
  return t;
}
function qa(t, e) {
  switch ((Z(ws, e), Z(_s, t), Z(bt, Is), (t = e.nodeType), t)) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : Pl(null, "");
      break;
    default:
      (t = t === 8 ? e.parentNode : e),
        (e = t.namespaceURI || null),
        (t = t.tagName),
        (e = Pl(e, t));
  }
  te(bt), Z(bt, e);
}
function xi() {
  te(bt), te(_s), te(ws);
}
function Th(t) {
  bn(ws.current);
  var e = bn(bt.current),
    n = Pl(e, t.type);
  e !== n && (Z(_s, t), Z(bt, n));
}
function Ja(t) {
  _s.current === t && (te(bt), te(_s));
}
var se = hn(0);
function Yr(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      (e.child.return = e), (e = e.child);
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    (e.sibling.return = e.return), (e = e.sibling);
  }
  return null;
}
var Zo = [];
function ec() {
  for (var t = 0; t < Zo.length; t++)
    Zo[t]._workInProgressVersionPrimary = null;
  Zo.length = 0;
}
var _r = $t.ReactCurrentDispatcher,
  qo = $t.ReactCurrentBatchConfig,
  Ln = 0,
  re = null,
  pe = null,
  xe = null,
  Kr = !1,
  ts = !1,
  Ss = 0,
  yy = 0;
function Ce() {
  throw Error(P(321));
}
function tc(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++)
    if (!gt(t[n], e[n])) return !1;
  return !0;
}
function nc(t, e, n, i, s, r) {
  if (
    ((Ln = r),
    (re = e),
    (e.memoizedState = null),
    (e.updateQueue = null),
    (e.lanes = 0),
    (_r.current = t === null || t.memoizedState === null ? wy : Sy),
    (t = n(i, s)),
    ts)
  ) {
    r = 0;
    do {
      if (((ts = !1), (Ss = 0), 25 <= r)) throw Error(P(301));
      (r += 1),
        (xe = pe = null),
        (e.updateQueue = null),
        (_r.current = ky),
        (t = n(i, s));
    } while (ts);
  }
  if (
    ((_r.current = Xr),
    (e = pe !== null && pe.next !== null),
    (Ln = 0),
    (xe = pe = re = null),
    (Kr = !1),
    e)
  )
    throw Error(P(300));
  return t;
}
function ic() {
  var t = Ss !== 0;
  return (Ss = 0), t;
}
function _t() {
  var t = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return xe === null ? (re.memoizedState = xe = t) : (xe = xe.next = t), xe;
}
function st() {
  if (pe === null) {
    var t = re.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = pe.next;
  var e = xe === null ? re.memoizedState : xe.next;
  if (e !== null) (xe = e), (pe = t);
  else {
    if (t === null) throw Error(P(310));
    (pe = t),
      (t = {
        memoizedState: pe.memoizedState,
        baseState: pe.baseState,
        baseQueue: pe.baseQueue,
        queue: pe.queue,
        next: null,
      }),
      xe === null ? (re.memoizedState = xe = t) : (xe = xe.next = t);
  }
  return xe;
}
function ks(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Jo(t) {
  var e = st(),
    n = e.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = t;
  var i = pe,
    s = i.baseQueue,
    r = n.pending;
  if (r !== null) {
    if (s !== null) {
      var o = s.next;
      (s.next = r.next), (r.next = o);
    }
    (i.baseQueue = s = r), (n.pending = null);
  }
  if (s !== null) {
    (r = s.next), (i = i.baseState);
    var l = (o = null),
      a = null,
      c = r;
    do {
      var u = c.lane;
      if ((Ln & u) === u)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (i = c.hasEagerState ? c.eagerState : t(i, c.action));
      else {
        var d = {
          lane: u,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        a === null ? ((l = a = d), (o = i)) : (a = a.next = d),
          (re.lanes |= u),
          (Rn |= u);
      }
      c = c.next;
    } while (c !== null && c !== r);
    a === null ? (o = i) : (a.next = l),
      gt(i, e.memoizedState) || (Fe = !0),
      (e.memoizedState = i),
      (e.baseState = o),
      (e.baseQueue = a),
      (n.lastRenderedState = i);
  }
  if (((t = n.interleaved), t !== null)) {
    s = t;
    do (r = s.lane), (re.lanes |= r), (Rn |= r), (s = s.next);
    while (s !== t);
  } else s === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function el(t) {
  var e = st(),
    n = e.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = t;
  var i = n.dispatch,
    s = n.pending,
    r = e.memoizedState;
  if (s !== null) {
    n.pending = null;
    var o = (s = s.next);
    do (r = t(r, o.action)), (o = o.next);
    while (o !== s);
    gt(r, e.memoizedState) || (Fe = !0),
      (e.memoizedState = r),
      e.baseQueue === null && (e.baseState = r),
      (n.lastRenderedState = r);
  }
  return [r, i];
}
function Oh() {}
function Lh(t, e) {
  var n = re,
    i = st(),
    s = e(),
    r = !gt(i.memoizedState, s);
  if (
    (r && ((i.memoizedState = s), (Fe = !0)),
    (i = i.queue),
    sc(Ih.bind(null, n, i, t), [t]),
    i.getSnapshot !== e || r || (xe !== null && xe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      bs(9, Ah.bind(null, n, i, s, e), void 0, null),
      _e === null)
    )
      throw Error(P(349));
    Ln & 30 || Rh(n, e, s);
  }
  return s;
}
function Rh(t, e, n) {
  (t.flags |= 16384),
    (t = { getSnapshot: e, value: n }),
    (e = re.updateQueue),
    e === null
      ? ((e = { lastEffect: null, stores: null }),
        (re.updateQueue = e),
        (e.stores = [t]))
      : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t));
}
function Ah(t, e, n, i) {
  (e.value = n), (e.getSnapshot = i), jh(e) && zh(t);
}
function Ih(t, e, n) {
  return n(function () {
    jh(e) && zh(t);
  });
}
function jh(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !gt(t, n);
  } catch {
    return !0;
  }
}
function zh(t) {
  var e = Nt(t, 1);
  e !== null && pt(e, t, 1, -1);
}
function Su(t) {
  var e = _t();
  return (
    typeof t == "function" && (t = t()),
    (e.memoizedState = e.baseState = t),
    (t = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ks,
      lastRenderedState: t,
    }),
    (e.queue = t),
    (t = t.dispatch = _y.bind(null, re, t)),
    [e.memoizedState, t]
  );
}
function bs(t, e, n, i) {
  return (
    (t = { tag: t, create: e, destroy: n, deps: i, next: null }),
    (e = re.updateQueue),
    e === null
      ? ((e = { lastEffect: null, stores: null }),
        (re.updateQueue = e),
        (e.lastEffect = t.next = t))
      : ((n = e.lastEffect),
        n === null
          ? (e.lastEffect = t.next = t)
          : ((i = n.next), (n.next = t), (t.next = i), (e.lastEffect = t))),
    t
  );
}
function Nh() {
  return st().memoizedState;
}
function wr(t, e, n, i) {
  var s = _t();
  (re.flags |= t),
    (s.memoizedState = bs(1 | e, n, void 0, i === void 0 ? null : i));
}
function vo(t, e, n, i) {
  var s = st();
  i = i === void 0 ? null : i;
  var r = void 0;
  if (pe !== null) {
    var o = pe.memoizedState;
    if (((r = o.destroy), i !== null && tc(i, o.deps))) {
      s.memoizedState = bs(e, n, r, i);
      return;
    }
  }
  (re.flags |= t), (s.memoizedState = bs(1 | e, n, r, i));
}
function ku(t, e) {
  return wr(8390656, 8, t, e);
}
function sc(t, e) {
  return vo(2048, 8, t, e);
}
function Fh(t, e) {
  return vo(4, 2, t, e);
}
function Bh(t, e) {
  return vo(4, 4, t, e);
}
function $h(t, e) {
  if (typeof e == "function")
    return (
      (t = t()),
      e(t),
      function () {
        e(null);
      }
    );
  if (e != null)
    return (
      (t = t()),
      (e.current = t),
      function () {
        e.current = null;
      }
    );
}
function Wh(t, e, n) {
  return (
    (n = n != null ? n.concat([t]) : null), vo(4, 4, $h.bind(null, e, t), n)
  );
}
function rc() {}
function Hh(t, e) {
  var n = st();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && tc(e, i[1])
    ? i[0]
    : ((n.memoizedState = [t, e]), t);
}
function Vh(t, e) {
  var n = st();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && tc(e, i[1])
    ? i[0]
    : ((t = t()), (n.memoizedState = [t, e]), t);
}
function Uh(t, e, n) {
  return Ln & 21
    ? (gt(n, e) || ((n = Qf()), (re.lanes |= n), (Rn |= n), (t.baseState = !0)),
      e)
    : (t.baseState && ((t.baseState = !1), (Fe = !0)), (t.memoizedState = n));
}
function vy(t, e) {
  var n = G;
  (G = n !== 0 && 4 > n ? n : 4), t(!0);
  var i = qo.transition;
  qo.transition = {};
  try {
    t(!1), e();
  } finally {
    (G = n), (qo.transition = i);
  }
}
function Yh() {
  return st().memoizedState;
}
function xy(t, e, n) {
  var i = rn(t);
  if (
    ((n = {
      lane: i,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Kh(t))
  )
    Xh(e, n);
  else if (((n = Eh(t, e, n, i)), n !== null)) {
    var s = Re();
    pt(n, t, i, s), Gh(n, e, i);
  }
}
function _y(t, e, n) {
  var i = rn(t),
    s = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Kh(t)) Xh(e, s);
  else {
    var r = t.alternate;
    if (
      t.lanes === 0 &&
      (r === null || r.lanes === 0) &&
      ((r = e.lastRenderedReducer), r !== null)
    )
      try {
        var o = e.lastRenderedState,
          l = r(o, n);
        if (((s.hasEagerState = !0), (s.eagerState = l), gt(l, o))) {
          var a = e.interleaved;
          a === null
            ? ((s.next = s), Qa(e))
            : ((s.next = a.next), (a.next = s)),
            (e.interleaved = s);
          return;
        }
      } catch {
      } finally {
      }
    (n = Eh(t, e, s, i)),
      n !== null && ((s = Re()), pt(n, t, i, s), Gh(n, e, i));
  }
}
function Kh(t) {
  var e = t.alternate;
  return t === re || (e !== null && e === re);
}
function Xh(t, e) {
  ts = Kr = !0;
  var n = t.pending;
  n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
    (t.pending = e);
}
function Gh(t, e, n) {
  if (n & 4194240) {
    var i = e.lanes;
    (i &= t.pendingLanes), (n |= i), (e.lanes = n), ja(t, n);
  }
}
var Xr = {
    readContext: it,
    useCallback: Ce,
    useContext: Ce,
    useEffect: Ce,
    useImperativeHandle: Ce,
    useInsertionEffect: Ce,
    useLayoutEffect: Ce,
    useMemo: Ce,
    useReducer: Ce,
    useRef: Ce,
    useState: Ce,
    useDebugValue: Ce,
    useDeferredValue: Ce,
    useTransition: Ce,
    useMutableSource: Ce,
    useSyncExternalStore: Ce,
    useId: Ce,
    unstable_isNewReconciler: !1,
  },
  wy = {
    readContext: it,
    useCallback: function (t, e) {
      return (_t().memoizedState = [t, e === void 0 ? null : e]), t;
    },
    useContext: it,
    useEffect: ku,
    useImperativeHandle: function (t, e, n) {
      return (
        (n = n != null ? n.concat([t]) : null),
        wr(4194308, 4, $h.bind(null, e, t), n)
      );
    },
    useLayoutEffect: function (t, e) {
      return wr(4194308, 4, t, e);
    },
    useInsertionEffect: function (t, e) {
      return wr(4, 2, t, e);
    },
    useMemo: function (t, e) {
      var n = _t();
      return (
        (e = e === void 0 ? null : e), (t = t()), (n.memoizedState = [t, e]), t
      );
    },
    useReducer: function (t, e, n) {
      var i = _t();
      return (
        (e = n !== void 0 ? n(e) : e),
        (i.memoizedState = i.baseState = e),
        (t = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: e,
        }),
        (i.queue = t),
        (t = t.dispatch = xy.bind(null, re, t)),
        [i.memoizedState, t]
      );
    },
    useRef: function (t) {
      var e = _t();
      return (t = { current: t }), (e.memoizedState = t);
    },
    useState: Su,
    useDebugValue: rc,
    useDeferredValue: function (t) {
      return (_t().memoizedState = t);
    },
    useTransition: function () {
      var t = Su(!1),
        e = t[0];
      return (t = vy.bind(null, t[1])), (_t().memoizedState = t), [e, t];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (t, e, n) {
      var i = re,
        s = _t();
      if (ne) {
        if (n === void 0) throw Error(P(407));
        n = n();
      } else {
        if (((n = e()), _e === null)) throw Error(P(349));
        Ln & 30 || Rh(i, e, n);
      }
      s.memoizedState = n;
      var r = { value: n, getSnapshot: e };
      return (
        (s.queue = r),
        ku(Ih.bind(null, i, r, t), [t]),
        (i.flags |= 2048),
        bs(9, Ah.bind(null, i, r, n, e), void 0, null),
        n
      );
    },
    useId: function () {
      var t = _t(),
        e = _e.identifierPrefix;
      if (ne) {
        var n = Rt,
          i = Lt;
        (n = (i & ~(1 << (32 - ht(i) - 1))).toString(32) + n),
          (e = ":" + e + "R" + n),
          (n = Ss++),
          0 < n && (e += "H" + n.toString(32)),
          (e += ":");
      } else (n = yy++), (e = ":" + e + "r" + n.toString(32) + ":");
      return (t.memoizedState = e);
    },
    unstable_isNewReconciler: !1,
  },
  Sy = {
    readContext: it,
    useCallback: Hh,
    useContext: it,
    useEffect: sc,
    useImperativeHandle: Wh,
    useInsertionEffect: Fh,
    useLayoutEffect: Bh,
    useMemo: Vh,
    useReducer: Jo,
    useRef: Nh,
    useState: function () {
      return Jo(ks);
    },
    useDebugValue: rc,
    useDeferredValue: function (t) {
      var e = st();
      return Uh(e, pe.memoizedState, t);
    },
    useTransition: function () {
      var t = Jo(ks)[0],
        e = st().memoizedState;
      return [t, e];
    },
    useMutableSource: Oh,
    useSyncExternalStore: Lh,
    useId: Yh,
    unstable_isNewReconciler: !1,
  },
  ky = {
    readContext: it,
    useCallback: Hh,
    useContext: it,
    useEffect: sc,
    useImperativeHandle: Wh,
    useInsertionEffect: Fh,
    useLayoutEffect: Bh,
    useMemo: Vh,
    useReducer: el,
    useRef: Nh,
    useState: function () {
      return el(ks);
    },
    useDebugValue: rc,
    useDeferredValue: function (t) {
      var e = st();
      return pe === null ? (e.memoizedState = t) : Uh(e, pe.memoizedState, t);
    },
    useTransition: function () {
      var t = el(ks)[0],
        e = st().memoizedState;
      return [t, e];
    },
    useMutableSource: Oh,
    useSyncExternalStore: Lh,
    useId: Yh,
    unstable_isNewReconciler: !1,
  };
function ut(t, e) {
  if (t && t.defaultProps) {
    (e = oe({}, e)), (t = t.defaultProps);
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function Xl(t, e, n, i) {
  (e = t.memoizedState),
    (n = n(i, e)),
    (n = n == null ? e : oe({}, e, n)),
    (t.memoizedState = n),
    t.lanes === 0 && (t.updateQueue.baseState = n);
}
var xo = {
  isMounted: function (t) {
    return (t = t._reactInternals) ? Fn(t) === t : !1;
  },
  enqueueSetState: function (t, e, n) {
    t = t._reactInternals;
    var i = Re(),
      s = rn(t),
      r = It(i, s);
    (r.payload = e),
      n != null && (r.callback = n),
      (e = nn(t, r, s)),
      e !== null && (pt(e, t, s, i), xr(e, t, s));
  },
  enqueueReplaceState: function (t, e, n) {
    t = t._reactInternals;
    var i = Re(),
      s = rn(t),
      r = It(i, s);
    (r.tag = 1),
      (r.payload = e),
      n != null && (r.callback = n),
      (e = nn(t, r, s)),
      e !== null && (pt(e, t, s, i), xr(e, t, s));
  },
  enqueueForceUpdate: function (t, e) {
    t = t._reactInternals;
    var n = Re(),
      i = rn(t),
      s = It(n, i);
    (s.tag = 2),
      e != null && (s.callback = e),
      (e = nn(t, s, i)),
      e !== null && (pt(e, t, i, n), xr(e, t, i));
  },
};
function bu(t, e, n, i, s, r, o) {
  return (
    (t = t.stateNode),
    typeof t.shouldComponentUpdate == "function"
      ? t.shouldComponentUpdate(i, r, o)
      : e.prototype && e.prototype.isPureReactComponent
      ? !ms(n, i) || !ms(s, r)
      : !0
  );
}
function Qh(t, e, n) {
  var i = !1,
    s = un,
    r = e.contextType;
  return (
    typeof r == "object" && r !== null
      ? (r = it(r))
      : ((s = We(e) ? Tn : Te.current),
        (i = e.contextTypes),
        (r = (i = i != null) ? mi(t, s) : un)),
    (e = new e(n, r)),
    (t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null),
    (e.updater = xo),
    (t.stateNode = e),
    (e._reactInternals = t),
    i &&
      ((t = t.stateNode),
      (t.__reactInternalMemoizedUnmaskedChildContext = s),
      (t.__reactInternalMemoizedMaskedChildContext = r)),
    e
  );
}
function Cu(t, e, n, i) {
  (t = e.state),
    typeof e.componentWillReceiveProps == "function" &&
      e.componentWillReceiveProps(n, i),
    typeof e.UNSAFE_componentWillReceiveProps == "function" &&
      e.UNSAFE_componentWillReceiveProps(n, i),
    e.state !== t && xo.enqueueReplaceState(e, e.state, null);
}
function Gl(t, e, n, i) {
  var s = t.stateNode;
  (s.props = n), (s.state = t.memoizedState), (s.refs = {}), Za(t);
  var r = e.contextType;
  typeof r == "object" && r !== null
    ? (s.context = it(r))
    : ((r = We(e) ? Tn : Te.current), (s.context = mi(t, r))),
    (s.state = t.memoizedState),
    (r = e.getDerivedStateFromProps),
    typeof r == "function" && (Xl(t, e, r, n), (s.state = t.memoizedState)),
    typeof e.getDerivedStateFromProps == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function" ||
      (typeof s.UNSAFE_componentWillMount != "function" &&
        typeof s.componentWillMount != "function") ||
      ((e = s.state),
      typeof s.componentWillMount == "function" && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == "function" &&
        s.UNSAFE_componentWillMount(),
      e !== s.state && xo.enqueueReplaceState(s, s.state, null),
      Ur(t, n, s, i),
      (s.state = t.memoizedState)),
    typeof s.componentDidMount == "function" && (t.flags |= 4194308);
}
function _i(t, e) {
  try {
    var n = "",
      i = e;
    do (n += Zg(i)), (i = i.return);
    while (i);
    var s = n;
  } catch (r) {
    s =
      `
Error generating stack: ` +
      r.message +
      `
` +
      r.stack;
  }
  return { value: t, source: e, stack: s, digest: null };
}
function tl(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function Ql(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var by = typeof WeakMap == "function" ? WeakMap : Map;
function Zh(t, e, n) {
  (n = It(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var i = e.value;
  return (
    (n.callback = function () {
      Qr || ((Qr = !0), (oa = i)), Ql(t, e);
    }),
    n
  );
}
function qh(t, e, n) {
  (n = It(-1, n)), (n.tag = 3);
  var i = t.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var s = e.value;
    (n.payload = function () {
      return i(s);
    }),
      (n.callback = function () {
        Ql(t, e);
      });
  }
  var r = t.stateNode;
  return (
    r !== null &&
      typeof r.componentDidCatch == "function" &&
      (n.callback = function () {
        Ql(t, e),
          typeof i != "function" &&
            (sn === null ? (sn = new Set([this])) : sn.add(this));
        var o = e.stack;
        this.componentDidCatch(e.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function Mu(t, e, n) {
  var i = t.pingCache;
  if (i === null) {
    i = t.pingCache = new by();
    var s = new Set();
    i.set(e, s);
  } else (s = i.get(e)), s === void 0 && ((s = new Set()), i.set(e, s));
  s.has(n) || (s.add(n), (t = Ny.bind(null, t, e, n)), e.then(t, t));
}
function Pu(t) {
  do {
    var e;
    if (
      ((e = t.tag === 13) &&
        ((e = t.memoizedState), (e = e !== null ? e.dehydrated !== null : !0)),
      e)
    )
      return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function Eu(t, e, n, i, s) {
  return t.mode & 1
    ? ((t.flags |= 65536), (t.lanes = s), t)
    : (t === e
        ? (t.flags |= 65536)
        : ((t.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((e = It(-1, 1)), (e.tag = 2), nn(n, e, 1))),
          (n.lanes |= 1)),
      t);
}
var Cy = $t.ReactCurrentOwner,
  Fe = !1;
function Le(t, e, n, i) {
  e.child = t === null ? Ph(e, null, n, i) : vi(e, t.child, n, i);
}
function Du(t, e, n, i, s) {
  n = n.render;
  var r = e.ref;
  return (
    ui(e, s),
    (i = nc(t, e, n, i, r, s)),
    (n = ic()),
    t !== null && !Fe
      ? ((e.updateQueue = t.updateQueue),
        (e.flags &= -2053),
        (t.lanes &= ~s),
        Ft(t, e, s))
      : (ne && n && Va(e), (e.flags |= 1), Le(t, e, i, s), e.child)
  );
}
function Tu(t, e, n, i, s) {
  if (t === null) {
    var r = n.type;
    return typeof r == "function" &&
      !hc(r) &&
      r.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((e.tag = 15), (e.type = r), Jh(t, e, r, i, s))
      : ((t = Cr(n.type, null, i, e, e.mode, s)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t));
  }
  if (((r = t.child), !(t.lanes & s))) {
    var o = r.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ms), n(o, i) && t.ref === e.ref)
    )
      return Ft(t, e, s);
  }
  return (
    (e.flags |= 1),
    (t = on(r, i)),
    (t.ref = e.ref),
    (t.return = e),
    (e.child = t)
  );
}
function Jh(t, e, n, i, s) {
  if (t !== null) {
    var r = t.memoizedProps;
    if (ms(r, i) && t.ref === e.ref)
      if (((Fe = !1), (e.pendingProps = i = r), (t.lanes & s) !== 0))
        t.flags & 131072 && (Fe = !0);
      else return (e.lanes = t.lanes), Ft(t, e, s);
  }
  return Zl(t, e, n, i, s);
}
function ep(t, e, n) {
  var i = e.pendingProps,
    s = i.children,
    r = t !== null ? t.memoizedState : null;
  if (i.mode === "hidden")
    if (!(e.mode & 1))
      (e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Z(ii, Ve),
        (Ve |= n);
    else {
      if (!(n & 1073741824))
        return (
          (t = r !== null ? r.baseLanes | n : n),
          (e.lanes = e.childLanes = 1073741824),
          (e.memoizedState = {
            baseLanes: t,
            cachePool: null,
            transitions: null,
          }),
          (e.updateQueue = null),
          Z(ii, Ve),
          (Ve |= t),
          null
        );
      (e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (i = r !== null ? r.baseLanes : n),
        Z(ii, Ve),
        (Ve |= i);
    }
  else
    r !== null ? ((i = r.baseLanes | n), (e.memoizedState = null)) : (i = n),
      Z(ii, Ve),
      (Ve |= i);
  return Le(t, e, s, n), e.child;
}
function tp(t, e) {
  var n = e.ref;
  ((t === null && n !== null) || (t !== null && t.ref !== n)) &&
    ((e.flags |= 512), (e.flags |= 2097152));
}
function Zl(t, e, n, i, s) {
  var r = We(n) ? Tn : Te.current;
  return (
    (r = mi(e, r)),
    ui(e, s),
    (n = nc(t, e, n, i, r, s)),
    (i = ic()),
    t !== null && !Fe
      ? ((e.updateQueue = t.updateQueue),
        (e.flags &= -2053),
        (t.lanes &= ~s),
        Ft(t, e, s))
      : (ne && i && Va(e), (e.flags |= 1), Le(t, e, n, s), e.child)
  );
}
function Ou(t, e, n, i, s) {
  if (We(n)) {
    var r = !0;
    Br(e);
  } else r = !1;
  if ((ui(e, s), e.stateNode === null))
    Sr(t, e), Qh(e, n, i), Gl(e, n, i, s), (i = !0);
  else if (t === null) {
    var o = e.stateNode,
      l = e.memoizedProps;
    o.props = l;
    var a = o.context,
      c = n.contextType;
    typeof c == "object" && c !== null
      ? (c = it(c))
      : ((c = We(n) ? Tn : Te.current), (c = mi(e, c)));
    var u = n.getDerivedStateFromProps,
      d =
        typeof u == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    d ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((l !== i || a !== c) && Cu(e, o, i, c)),
      (Ut = !1);
    var f = e.memoizedState;
    (o.state = f),
      Ur(e, i, o, s),
      (a = e.memoizedState),
      l !== i || f !== a || $e.current || Ut
        ? (typeof u == "function" && (Xl(e, n, u, i), (a = e.memoizedState)),
          (l = Ut || bu(e, n, l, i, f, a, c))
            ? (d ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (e.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (e.flags |= 4194308),
              (e.memoizedProps = i),
              (e.memoizedState = a)),
          (o.props = i),
          (o.state = a),
          (o.context = c),
          (i = l))
        : (typeof o.componentDidMount == "function" && (e.flags |= 4194308),
          (i = !1));
  } else {
    (o = e.stateNode),
      Dh(t, e),
      (l = e.memoizedProps),
      (c = e.type === e.elementType ? l : ut(e.type, l)),
      (o.props = c),
      (d = e.pendingProps),
      (f = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = it(a))
        : ((a = We(n) ? Tn : Te.current), (a = mi(e, a)));
    var m = n.getDerivedStateFromProps;
    (u =
      typeof m == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((l !== d || f !== a) && Cu(e, o, i, a)),
      (Ut = !1),
      (f = e.memoizedState),
      (o.state = f),
      Ur(e, i, o, s);
    var v = e.memoizedState;
    l !== d || f !== v || $e.current || Ut
      ? (typeof m == "function" && (Xl(e, n, m, i), (v = e.memoizedState)),
        (c = Ut || bu(e, n, c, i, f, v, a) || !1)
          ? (u ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(i, v, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(i, v, a)),
            typeof o.componentDidUpdate == "function" && (e.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (l === t.memoizedProps && f === t.memoizedState) ||
              (e.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (l === t.memoizedProps && f === t.memoizedState) ||
              (e.flags |= 1024),
            (e.memoizedProps = i),
            (e.memoizedState = v)),
        (o.props = i),
        (o.state = v),
        (o.context = a),
        (i = c))
      : (typeof o.componentDidUpdate != "function" ||
          (l === t.memoizedProps && f === t.memoizedState) ||
          (e.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (l === t.memoizedProps && f === t.memoizedState) ||
          (e.flags |= 1024),
        (i = !1));
  }
  return ql(t, e, n, i, r, s);
}
function ql(t, e, n, i, s, r) {
  tp(t, e);
  var o = (e.flags & 128) !== 0;
  if (!i && !o) return s && mu(e, n, !1), Ft(t, e, r);
  (i = e.stateNode), (Cy.current = e);
  var l =
    o && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return (
    (e.flags |= 1),
    t !== null && o
      ? ((e.child = vi(e, t.child, null, r)), (e.child = vi(e, null, l, r)))
      : Le(t, e, l, r),
    (e.memoizedState = i.state),
    s && mu(e, n, !0),
    e.child
  );
}
function np(t) {
  var e = t.stateNode;
  e.pendingContext
    ? gu(t, e.pendingContext, e.pendingContext !== e.context)
    : e.context && gu(t, e.context, !1),
    qa(t, e.containerInfo);
}
function Lu(t, e, n, i, s) {
  return yi(), Ya(s), (e.flags |= 256), Le(t, e, n, i), e.child;
}
var Jl = { dehydrated: null, treeContext: null, retryLane: 0 };
function ea(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function ip(t, e, n) {
  var i = e.pendingProps,
    s = se.current,
    r = !1,
    o = (e.flags & 128) !== 0,
    l;
  if (
    ((l = o) ||
      (l = t !== null && t.memoizedState === null ? !1 : (s & 2) !== 0),
    l
      ? ((r = !0), (e.flags &= -129))
      : (t === null || t.memoizedState !== null) && (s |= 1),
    Z(se, s & 1),
    t === null)
  )
    return (
      Yl(e),
      (t = e.memoizedState),
      t !== null && ((t = t.dehydrated), t !== null)
        ? (e.mode & 1
            ? t.data === "$!"
              ? (e.lanes = 8)
              : (e.lanes = 1073741824)
            : (e.lanes = 1),
          null)
        : ((o = i.children),
          (t = i.fallback),
          r
            ? ((i = e.mode),
              (r = e.child),
              (o = { mode: "hidden", children: o }),
              !(i & 1) && r !== null
                ? ((r.childLanes = 0), (r.pendingProps = o))
                : (r = So(o, i, 0, null)),
              (t = Pn(t, i, n, null)),
              (r.return = e),
              (t.return = e),
              (r.sibling = t),
              (e.child = r),
              (e.child.memoizedState = ea(n)),
              (e.memoizedState = Jl),
              t)
            : oc(e, o))
    );
  if (((s = t.memoizedState), s !== null && ((l = s.dehydrated), l !== null)))
    return My(t, e, o, i, l, s, n);
  if (r) {
    (r = i.fallback), (o = e.mode), (s = t.child), (l = s.sibling);
    var a = { mode: "hidden", children: i.children };
    return (
      !(o & 1) && e.child !== s
        ? ((i = e.child),
          (i.childLanes = 0),
          (i.pendingProps = a),
          (e.deletions = null))
        : ((i = on(s, a)), (i.subtreeFlags = s.subtreeFlags & 14680064)),
      l !== null ? (r = on(l, r)) : ((r = Pn(r, o, n, null)), (r.flags |= 2)),
      (r.return = e),
      (i.return = e),
      (i.sibling = r),
      (e.child = i),
      (i = r),
      (r = e.child),
      (o = t.child.memoizedState),
      (o =
        o === null
          ? ea(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (r.memoizedState = o),
      (r.childLanes = t.childLanes & ~n),
      (e.memoizedState = Jl),
      i
    );
  }
  return (
    (r = t.child),
    (t = r.sibling),
    (i = on(r, { mode: "visible", children: i.children })),
    !(e.mode & 1) && (i.lanes = n),
    (i.return = e),
    (i.sibling = null),
    t !== null &&
      ((n = e.deletions),
      n === null ? ((e.deletions = [t]), (e.flags |= 16)) : n.push(t)),
    (e.child = i),
    (e.memoizedState = null),
    i
  );
}
function oc(t, e) {
  return (
    (e = So({ mode: "visible", children: e }, t.mode, 0, null)),
    (e.return = t),
    (t.child = e)
  );
}
function Zs(t, e, n, i) {
  return (
    i !== null && Ya(i),
    vi(e, t.child, null, n),
    (t = oc(e, e.pendingProps.children)),
    (t.flags |= 2),
    (e.memoizedState = null),
    t
  );
}
function My(t, e, n, i, s, r, o) {
  if (n)
    return e.flags & 256
      ? ((e.flags &= -257), (i = tl(Error(P(422)))), Zs(t, e, o, i))
      : e.memoizedState !== null
      ? ((e.child = t.child), (e.flags |= 128), null)
      : ((r = i.fallback),
        (s = e.mode),
        (i = So({ mode: "visible", children: i.children }, s, 0, null)),
        (r = Pn(r, s, o, null)),
        (r.flags |= 2),
        (i.return = e),
        (r.return = e),
        (i.sibling = r),
        (e.child = i),
        e.mode & 1 && vi(e, t.child, null, o),
        (e.child.memoizedState = ea(o)),
        (e.memoizedState = Jl),
        r);
  if (!(e.mode & 1)) return Zs(t, e, o, null);
  if (s.data === "$!") {
    if (((i = s.nextSibling && s.nextSibling.dataset), i)) var l = i.dgst;
    return (i = l), (r = Error(P(419))), (i = tl(r, i, void 0)), Zs(t, e, o, i);
  }
  if (((l = (o & t.childLanes) !== 0), Fe || l)) {
    if (((i = _e), i !== null)) {
      switch (o & -o) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      (s = s & (i.suspendedLanes | o) ? 0 : s),
        s !== 0 &&
          s !== r.retryLane &&
          ((r.retryLane = s), Nt(t, s), pt(i, t, s, -1));
    }
    return fc(), (i = tl(Error(P(421)))), Zs(t, e, o, i);
  }
  return s.data === "$?"
    ? ((e.flags |= 128),
      (e.child = t.child),
      (e = Fy.bind(null, t)),
      (s._reactRetry = e),
      null)
    : ((t = r.treeContext),
      (Ue = tn(s.nextSibling)),
      (Ye = e),
      (ne = !0),
      (ft = null),
      t !== null &&
        ((Ze[qe++] = Lt),
        (Ze[qe++] = Rt),
        (Ze[qe++] = On),
        (Lt = t.id),
        (Rt = t.overflow),
        (On = e)),
      (e = oc(e, i.children)),
      (e.flags |= 4096),
      e);
}
function Ru(t, e, n) {
  t.lanes |= e;
  var i = t.alternate;
  i !== null && (i.lanes |= e), Kl(t.return, e, n);
}
function nl(t, e, n, i, s) {
  var r = t.memoizedState;
  r === null
    ? (t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: n,
        tailMode: s,
      })
    : ((r.isBackwards = e),
      (r.rendering = null),
      (r.renderingStartTime = 0),
      (r.last = i),
      (r.tail = n),
      (r.tailMode = s));
}
function sp(t, e, n) {
  var i = e.pendingProps,
    s = i.revealOrder,
    r = i.tail;
  if ((Le(t, e, i.children, n), (i = se.current), i & 2))
    (i = (i & 1) | 2), (e.flags |= 128);
  else {
    if (t !== null && t.flags & 128)
      e: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Ru(t, n, e);
        else if (t.tag === 19) Ru(t, n, e);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break e;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    i &= 1;
  }
  if ((Z(se, i), !(e.mode & 1))) e.memoizedState = null;
  else
    switch (s) {
      case "forwards":
        for (n = e.child, s = null; n !== null; )
          (t = n.alternate),
            t !== null && Yr(t) === null && (s = n),
            (n = n.sibling);
        (n = s),
          n === null
            ? ((s = e.child), (e.child = null))
            : ((s = n.sibling), (n.sibling = null)),
          nl(e, !1, s, n, r);
        break;
      case "backwards":
        for (n = null, s = e.child, e.child = null; s !== null; ) {
          if (((t = s.alternate), t !== null && Yr(t) === null)) {
            e.child = s;
            break;
          }
          (t = s.sibling), (s.sibling = n), (n = s), (s = t);
        }
        nl(e, !0, n, null, r);
        break;
      case "together":
        nl(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
  return e.child;
}
function Sr(t, e) {
  !(e.mode & 1) &&
    t !== null &&
    ((t.alternate = null), (e.alternate = null), (e.flags |= 2));
}
function Ft(t, e, n) {
  if (
    (t !== null && (e.dependencies = t.dependencies),
    (Rn |= e.lanes),
    !(n & e.childLanes))
  )
    return null;
  if (t !== null && e.child !== t.child) throw Error(P(153));
  if (e.child !== null) {
    for (
      t = e.child, n = on(t, t.pendingProps), e.child = n, n.return = e;
      t.sibling !== null;

    )
      (t = t.sibling), (n = n.sibling = on(t, t.pendingProps)), (n.return = e);
    n.sibling = null;
  }
  return e.child;
}
function Py(t, e, n) {
  switch (e.tag) {
    case 3:
      np(e), yi();
      break;
    case 5:
      Th(e);
      break;
    case 1:
      We(e.type) && Br(e);
      break;
    case 4:
      qa(e, e.stateNode.containerInfo);
      break;
    case 10:
      var i = e.type._context,
        s = e.memoizedProps.value;
      Z(Hr, i._currentValue), (i._currentValue = s);
      break;
    case 13:
      if (((i = e.memoizedState), i !== null))
        return i.dehydrated !== null
          ? (Z(se, se.current & 1), (e.flags |= 128), null)
          : n & e.child.childLanes
          ? ip(t, e, n)
          : (Z(se, se.current & 1),
            (t = Ft(t, e, n)),
            t !== null ? t.sibling : null);
      Z(se, se.current & 1);
      break;
    case 19:
      if (((i = (n & e.childLanes) !== 0), t.flags & 128)) {
        if (i) return sp(t, e, n);
        e.flags |= 128;
      }
      if (
        ((s = e.memoizedState),
        s !== null &&
          ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
        Z(se, se.current),
        i)
      )
        break;
      return null;
    case 22:
    case 23:
      return (e.lanes = 0), ep(t, e, n);
  }
  return Ft(t, e, n);
}
var rp, ta, op, lp;
rp = function (t, e) {
  for (var n = e.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
ta = function () {};
op = function (t, e, n, i) {
  var s = t.memoizedProps;
  if (s !== i) {
    (t = e.stateNode), bn(bt.current);
    var r = null;
    switch (n) {
      case "input":
        (s = kl(t, s)), (i = kl(t, i)), (r = []);
        break;
      case "select":
        (s = oe({}, s, { value: void 0 })),
          (i = oe({}, i, { value: void 0 })),
          (r = []);
        break;
      case "textarea":
        (s = Ml(t, s)), (i = Ml(t, i)), (r = []);
        break;
      default:
        typeof s.onClick != "function" &&
          typeof i.onClick == "function" &&
          (t.onclick = Nr);
    }
    El(n, i);
    var o;
    n = null;
    for (c in s)
      if (!i.hasOwnProperty(c) && s.hasOwnProperty(c) && s[c] != null)
        if (c === "style") {
          var l = s[c];
          for (o in l) l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          c !== "dangerouslySetInnerHTML" &&
            c !== "children" &&
            c !== "suppressContentEditableWarning" &&
            c !== "suppressHydrationWarning" &&
            c !== "autoFocus" &&
            (cs.hasOwnProperty(c)
              ? r || (r = [])
              : (r = r || []).push(c, null));
    for (c in i) {
      var a = i[c];
      if (
        ((l = s != null ? s[c] : void 0),
        i.hasOwnProperty(c) && a !== l && (a != null || l != null))
      )
        if (c === "style")
          if (l) {
            for (o in l)
              !l.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                l[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else n || (r || (r = []), r.push(c, n)), (n = a);
        else
          c === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (r = r || []).push(c, a))
            : c === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (r = r || []).push(c, "" + a)
            : c !== "suppressContentEditableWarning" &&
              c !== "suppressHydrationWarning" &&
              (cs.hasOwnProperty(c)
                ? (a != null && c === "onScroll" && q("scroll", t),
                  r || l === a || (r = []))
                : (r = r || []).push(c, a));
    }
    n && (r = r || []).push("style", n);
    var c = r;
    (e.updateQueue = c) && (e.flags |= 4);
  }
};
lp = function (t, e, n, i) {
  n !== i && (e.flags |= 4);
};
function ji(t, e) {
  if (!ne)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var n = null; e !== null; )
          e.alternate !== null && (n = e), (e = e.sibling);
        n === null ? (t.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = t.tail;
        for (var i = null; n !== null; )
          n.alternate !== null && (i = n), (n = n.sibling);
        i === null
          ? e || t.tail === null
            ? (t.tail = null)
            : (t.tail.sibling = null)
          : (i.sibling = null);
    }
}
function Me(t) {
  var e = t.alternate !== null && t.alternate.child === t.child,
    n = 0,
    i = 0;
  if (e)
    for (var s = t.child; s !== null; )
      (n |= s.lanes | s.childLanes),
        (i |= s.subtreeFlags & 14680064),
        (i |= s.flags & 14680064),
        (s.return = t),
        (s = s.sibling);
  else
    for (s = t.child; s !== null; )
      (n |= s.lanes | s.childLanes),
        (i |= s.subtreeFlags),
        (i |= s.flags),
        (s.return = t),
        (s = s.sibling);
  return (t.subtreeFlags |= i), (t.childLanes = n), e;
}
function Ey(t, e, n) {
  var i = e.pendingProps;
  switch ((Ua(e), e.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(e), null;
    case 1:
      return We(e.type) && Fr(), Me(e), null;
    case 3:
      return (
        (i = e.stateNode),
        xi(),
        te($e),
        te(Te),
        ec(),
        i.pendingContext &&
          ((i.context = i.pendingContext), (i.pendingContext = null)),
        (t === null || t.child === null) &&
          (Gs(e)
            ? (e.flags |= 4)
            : t === null ||
              (t.memoizedState.isDehydrated && !(e.flags & 256)) ||
              ((e.flags |= 1024), ft !== null && (ca(ft), (ft = null)))),
        ta(t, e),
        Me(e),
        null
      );
    case 5:
      Ja(e);
      var s = bn(ws.current);
      if (((n = e.type), t !== null && e.stateNode != null))
        op(t, e, n, i, s),
          t.ref !== e.ref && ((e.flags |= 512), (e.flags |= 2097152));
      else {
        if (!i) {
          if (e.stateNode === null) throw Error(P(166));
          return Me(e), null;
        }
        if (((t = bn(bt.current)), Gs(e))) {
          (i = e.stateNode), (n = e.type);
          var r = e.memoizedProps;
          switch (((i[St] = e), (i[xs] = r), (t = (e.mode & 1) !== 0), n)) {
            case "dialog":
              q("cancel", i), q("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              q("load", i);
              break;
            case "video":
            case "audio":
              for (s = 0; s < Yi.length; s++) q(Yi[s], i);
              break;
            case "source":
              q("error", i);
              break;
            case "img":
            case "image":
            case "link":
              q("error", i), q("load", i);
              break;
            case "details":
              q("toggle", i);
              break;
            case "input":
              Wc(i, r), q("invalid", i);
              break;
            case "select":
              (i._wrapperState = { wasMultiple: !!r.multiple }),
                q("invalid", i);
              break;
            case "textarea":
              Vc(i, r), q("invalid", i);
          }
          El(n, r), (s = null);
          for (var o in r)
            if (r.hasOwnProperty(o)) {
              var l = r[o];
              o === "children"
                ? typeof l == "string"
                  ? i.textContent !== l &&
                    (r.suppressHydrationWarning !== !0 &&
                      Xs(i.textContent, l, t),
                    (s = ["children", l]))
                  : typeof l == "number" &&
                    i.textContent !== "" + l &&
                    (r.suppressHydrationWarning !== !0 &&
                      Xs(i.textContent, l, t),
                    (s = ["children", "" + l]))
                : cs.hasOwnProperty(o) &&
                  l != null &&
                  o === "onScroll" &&
                  q("scroll", i);
            }
          switch (n) {
            case "input":
              Bs(i), Hc(i, r, !0);
              break;
            case "textarea":
              Bs(i), Uc(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof r.onClick == "function" && (i.onclick = Nr);
          }
          (i = s), (e.updateQueue = i), i !== null && (e.flags |= 4);
        } else {
          (o = s.nodeType === 9 ? s : s.ownerDocument),
            t === "http://www.w3.org/1999/xhtml" && (t = If(n)),
            t === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((t = o.createElement("div")),
                  (t.innerHTML = "<script></script>"),
                  (t = t.removeChild(t.firstChild)))
                : typeof i.is == "string"
                ? (t = o.createElement(n, { is: i.is }))
                : ((t = o.createElement(n)),
                  n === "select" &&
                    ((o = t),
                    i.multiple
                      ? (o.multiple = !0)
                      : i.size && (o.size = i.size)))
              : (t = o.createElementNS(t, n)),
            (t[St] = e),
            (t[xs] = i),
            rp(t, e, !1, !1),
            (e.stateNode = t);
          e: {
            switch (((o = Dl(n, i)), n)) {
              case "dialog":
                q("cancel", t), q("close", t), (s = i);
                break;
              case "iframe":
              case "object":
              case "embed":
                q("load", t), (s = i);
                break;
              case "video":
              case "audio":
                for (s = 0; s < Yi.length; s++) q(Yi[s], t);
                s = i;
                break;
              case "source":
                q("error", t), (s = i);
                break;
              case "img":
              case "image":
              case "link":
                q("error", t), q("load", t), (s = i);
                break;
              case "details":
                q("toggle", t), (s = i);
                break;
              case "input":
                Wc(t, i), (s = kl(t, i)), q("invalid", t);
                break;
              case "option":
                s = i;
                break;
              case "select":
                (t._wrapperState = { wasMultiple: !!i.multiple }),
                  (s = oe({}, i, { value: void 0 })),
                  q("invalid", t);
                break;
              case "textarea":
                Vc(t, i), (s = Ml(t, i)), q("invalid", t);
                break;
              default:
                s = i;
            }
            El(n, s), (l = s);
            for (r in l)
              if (l.hasOwnProperty(r)) {
                var a = l[r];
                r === "style"
                  ? Nf(t, a)
                  : r === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && jf(t, a))
                  : r === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && us(t, a)
                    : typeof a == "number" && us(t, "" + a)
                  : r !== "suppressContentEditableWarning" &&
                    r !== "suppressHydrationWarning" &&
                    r !== "autoFocus" &&
                    (cs.hasOwnProperty(r)
                      ? a != null && r === "onScroll" && q("scroll", t)
                      : a != null && Ta(t, r, a, o));
              }
            switch (n) {
              case "input":
                Bs(t), Hc(t, i, !1);
                break;
              case "textarea":
                Bs(t), Uc(t);
                break;
              case "option":
                i.value != null && t.setAttribute("value", "" + cn(i.value));
                break;
              case "select":
                (t.multiple = !!i.multiple),
                  (r = i.value),
                  r != null
                    ? oi(t, !!i.multiple, r, !1)
                    : i.defaultValue != null &&
                      oi(t, !!i.multiple, i.defaultValue, !0);
                break;
              default:
                typeof s.onClick == "function" && (t.onclick = Nr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
          }
          i && (e.flags |= 4);
        }
        e.ref !== null && ((e.flags |= 512), (e.flags |= 2097152));
      }
      return Me(e), null;
    case 6:
      if (t && e.stateNode != null) lp(t, e, t.memoizedProps, i);
      else {
        if (typeof i != "string" && e.stateNode === null) throw Error(P(166));
        if (((n = bn(ws.current)), bn(bt.current), Gs(e))) {
          if (
            ((i = e.stateNode),
            (n = e.memoizedProps),
            (i[St] = e),
            (r = i.nodeValue !== n) && ((t = Ye), t !== null))
          )
            switch (t.tag) {
              case 3:
                Xs(i.nodeValue, n, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 &&
                  Xs(i.nodeValue, n, (t.mode & 1) !== 0);
            }
          r && (e.flags |= 4);
        } else
          (i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i)),
            (i[St] = e),
            (e.stateNode = i);
      }
      return Me(e), null;
    case 13:
      if (
        (te(se),
        (i = e.memoizedState),
        t === null ||
          (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
      ) {
        if (ne && Ue !== null && e.mode & 1 && !(e.flags & 128))
          Ch(), yi(), (e.flags |= 98560), (r = !1);
        else if (((r = Gs(e)), i !== null && i.dehydrated !== null)) {
          if (t === null) {
            if (!r) throw Error(P(318));
            if (
              ((r = e.memoizedState),
              (r = r !== null ? r.dehydrated : null),
              !r)
            )
              throw Error(P(317));
            r[St] = e;
          } else
            yi(), !(e.flags & 128) && (e.memoizedState = null), (e.flags |= 4);
          Me(e), (r = !1);
        } else ft !== null && (ca(ft), (ft = null)), (r = !0);
        if (!r) return e.flags & 65536 ? e : null;
      }
      return e.flags & 128
        ? ((e.lanes = n), e)
        : ((i = i !== null),
          i !== (t !== null && t.memoizedState !== null) &&
            i &&
            ((e.child.flags |= 8192),
            e.mode & 1 &&
              (t === null || se.current & 1 ? me === 0 && (me = 3) : fc())),
          e.updateQueue !== null && (e.flags |= 4),
          Me(e),
          null);
    case 4:
      return (
        xi(), ta(t, e), t === null && ys(e.stateNode.containerInfo), Me(e), null
      );
    case 10:
      return Ga(e.type._context), Me(e), null;
    case 17:
      return We(e.type) && Fr(), Me(e), null;
    case 19:
      if ((te(se), (r = e.memoizedState), r === null)) return Me(e), null;
      if (((i = (e.flags & 128) !== 0), (o = r.rendering), o === null))
        if (i) ji(r, !1);
        else {
          if (me !== 0 || (t !== null && t.flags & 128))
            for (t = e.child; t !== null; ) {
              if (((o = Yr(t)), o !== null)) {
                for (
                  e.flags |= 128,
                    ji(r, !1),
                    i = o.updateQueue,
                    i !== null && ((e.updateQueue = i), (e.flags |= 4)),
                    e.subtreeFlags = 0,
                    i = n,
                    n = e.child;
                  n !== null;

                )
                  (r = n),
                    (t = i),
                    (r.flags &= 14680066),
                    (o = r.alternate),
                    o === null
                      ? ((r.childLanes = 0),
                        (r.lanes = t),
                        (r.child = null),
                        (r.subtreeFlags = 0),
                        (r.memoizedProps = null),
                        (r.memoizedState = null),
                        (r.updateQueue = null),
                        (r.dependencies = null),
                        (r.stateNode = null))
                      : ((r.childLanes = o.childLanes),
                        (r.lanes = o.lanes),
                        (r.child = o.child),
                        (r.subtreeFlags = 0),
                        (r.deletions = null),
                        (r.memoizedProps = o.memoizedProps),
                        (r.memoizedState = o.memoizedState),
                        (r.updateQueue = o.updateQueue),
                        (r.type = o.type),
                        (t = o.dependencies),
                        (r.dependencies =
                          t === null
                            ? null
                            : {
                                lanes: t.lanes,
                                firstContext: t.firstContext,
                              })),
                    (n = n.sibling);
                return Z(se, (se.current & 1) | 2), e.child;
              }
              t = t.sibling;
            }
          r.tail !== null &&
            ce() > wi &&
            ((e.flags |= 128), (i = !0), ji(r, !1), (e.lanes = 4194304));
        }
      else {
        if (!i)
          if (((t = Yr(o)), t !== null)) {
            if (
              ((e.flags |= 128),
              (i = !0),
              (n = t.updateQueue),
              n !== null && ((e.updateQueue = n), (e.flags |= 4)),
              ji(r, !0),
              r.tail === null && r.tailMode === "hidden" && !o.alternate && !ne)
            )
              return Me(e), null;
          } else
            2 * ce() - r.renderingStartTime > wi &&
              n !== 1073741824 &&
              ((e.flags |= 128), (i = !0), ji(r, !1), (e.lanes = 4194304));
        r.isBackwards
          ? ((o.sibling = e.child), (e.child = o))
          : ((n = r.last),
            n !== null ? (n.sibling = o) : (e.child = o),
            (r.last = o));
      }
      return r.tail !== null
        ? ((e = r.tail),
          (r.rendering = e),
          (r.tail = e.sibling),
          (r.renderingStartTime = ce()),
          (e.sibling = null),
          (n = se.current),
          Z(se, i ? (n & 1) | 2 : n & 1),
          e)
        : (Me(e), null);
    case 22:
    case 23:
      return (
        dc(),
        (i = e.memoizedState !== null),
        t !== null && (t.memoizedState !== null) !== i && (e.flags |= 8192),
        i && e.mode & 1
          ? Ve & 1073741824 && (Me(e), e.subtreeFlags & 6 && (e.flags |= 8192))
          : Me(e),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(P(156, e.tag));
}
function Dy(t, e) {
  switch ((Ua(e), e.tag)) {
    case 1:
      return (
        We(e.type) && Fr(),
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 3:
      return (
        xi(),
        te($e),
        te(Te),
        ec(),
        (t = e.flags),
        t & 65536 && !(t & 128) ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 5:
      return Ja(e), null;
    case 13:
      if (
        (te(se), (t = e.memoizedState), t !== null && t.dehydrated !== null)
      ) {
        if (e.alternate === null) throw Error(P(340));
        yi();
      }
      return (
        (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 19:
      return te(se), null;
    case 4:
      return xi(), null;
    case 10:
      return Ga(e.type._context), null;
    case 22:
    case 23:
      return dc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var qs = !1,
  Ee = !1,
  Ty = typeof WeakSet == "function" ? WeakSet : Set,
  R = null;
function ni(t, e) {
  var n = t.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (i) {
        ae(t, e, i);
      }
    else n.current = null;
}
function na(t, e, n) {
  try {
    n();
  } catch (i) {
    ae(t, e, i);
  }
}
var Au = !1;
function Oy(t, e) {
  if (((Fl = Ir), (t = fh()), Ha(t))) {
    if ("selectionStart" in t)
      var n = { start: t.selectionStart, end: t.selectionEnd };
    else
      e: {
        n = ((n = t.ownerDocument) && n.defaultView) || window;
        var i = n.getSelection && n.getSelection();
        if (i && i.rangeCount !== 0) {
          n = i.anchorNode;
          var s = i.anchorOffset,
            r = i.focusNode;
          i = i.focusOffset;
          try {
            n.nodeType, r.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            l = -1,
            a = -1,
            c = 0,
            u = 0,
            d = t,
            f = null;
          t: for (;;) {
            for (
              var m;
              d !== n || (s !== 0 && d.nodeType !== 3) || (l = o + s),
                d !== r || (i !== 0 && d.nodeType !== 3) || (a = o + i),
                d.nodeType === 3 && (o += d.nodeValue.length),
                (m = d.firstChild) !== null;

            )
              (f = d), (d = m);
            for (;;) {
              if (d === t) break t;
              if (
                (f === n && ++c === s && (l = o),
                f === r && ++u === i && (a = o),
                (m = d.nextSibling) !== null)
              )
                break;
              (d = f), (f = d.parentNode);
            }
            d = m;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Bl = { focusedElem: t, selectionRange: n }, Ir = !1, R = e; R !== null; )
    if (((e = R), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
      (t.return = e), (R = t);
    else
      for (; R !== null; ) {
        e = R;
        try {
          var v = e.alternate;
          if (e.flags & 1024)
            switch (e.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var g = v.memoizedProps,
                    x = v.memoizedState,
                    p = e.stateNode,
                    h = p.getSnapshotBeforeUpdate(
                      e.elementType === e.type ? g : ut(e.type, g),
                      x
                    );
                  p.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var y = e.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(P(163));
            }
        } catch (_) {
          ae(e, e.return, _);
        }
        if (((t = e.sibling), t !== null)) {
          (t.return = e.return), (R = t);
          break;
        }
        R = e.return;
      }
  return (v = Au), (Au = !1), v;
}
function ns(t, e, n) {
  var i = e.updateQueue;
  if (((i = i !== null ? i.lastEffect : null), i !== null)) {
    var s = (i = i.next);
    do {
      if ((s.tag & t) === t) {
        var r = s.destroy;
        (s.destroy = void 0), r !== void 0 && na(e, n, r);
      }
      s = s.next;
    } while (s !== i);
  }
}
function _o(t, e) {
  if (
    ((e = e.updateQueue), (e = e !== null ? e.lastEffect : null), e !== null)
  ) {
    var n = (e = e.next);
    do {
      if ((n.tag & t) === t) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== e);
  }
}
function ia(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : (e.current = t);
  }
}
function ap(t) {
  var e = t.alternate;
  e !== null && ((t.alternate = null), ap(e)),
    (t.child = null),
    (t.deletions = null),
    (t.sibling = null),
    t.tag === 5 &&
      ((e = t.stateNode),
      e !== null &&
        (delete e[St], delete e[xs], delete e[Hl], delete e[hy], delete e[py])),
    (t.stateNode = null),
    (t.return = null),
    (t.dependencies = null),
    (t.memoizedProps = null),
    (t.memoizedState = null),
    (t.pendingProps = null),
    (t.stateNode = null),
    (t.updateQueue = null);
}
function cp(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function Iu(t) {
  e: for (;;) {
    for (; t.sibling === null; ) {
      if (t.return === null || cp(t.return)) return null;
      t = t.return;
    }
    for (
      t.sibling.return = t.return, t = t.sibling;
      t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

    ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
      (t.child.return = t), (t = t.child);
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function sa(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6)
    (t = t.stateNode),
      e
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(t, e)
          : n.insertBefore(t, e)
        : (n.nodeType === 8
            ? ((e = n.parentNode), e.insertBefore(t, n))
            : ((e = n), e.appendChild(t)),
          (n = n._reactRootContainer),
          n != null || e.onclick !== null || (e.onclick = Nr));
  else if (i !== 4 && ((t = t.child), t !== null))
    for (sa(t, e, n), t = t.sibling; t !== null; ) sa(t, e, n), (t = t.sibling);
}
function ra(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6)
    (t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (i !== 4 && ((t = t.child), t !== null))
    for (ra(t, e, n), t = t.sibling; t !== null; ) ra(t, e, n), (t = t.sibling);
}
var Se = null,
  dt = !1;
function Wt(t, e, n) {
  for (n = n.child; n !== null; ) up(t, e, n), (n = n.sibling);
}
function up(t, e, n) {
  if (kt && typeof kt.onCommitFiberUnmount == "function")
    try {
      kt.onCommitFiberUnmount(fo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ee || ni(n, e);
    case 6:
      var i = Se,
        s = dt;
      (Se = null),
        Wt(t, e, n),
        (Se = i),
        (dt = s),
        Se !== null &&
          (dt
            ? ((t = Se),
              (n = n.stateNode),
              t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n))
            : Se.removeChild(n.stateNode));
      break;
    case 18:
      Se !== null &&
        (dt
          ? ((t = Se),
            (n = n.stateNode),
            t.nodeType === 8
              ? Go(t.parentNode, n)
              : t.nodeType === 1 && Go(t, n),
            ps(t))
          : Go(Se, n.stateNode));
      break;
    case 4:
      (i = Se),
        (s = dt),
        (Se = n.stateNode.containerInfo),
        (dt = !0),
        Wt(t, e, n),
        (Se = i),
        (dt = s);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ee &&
        ((i = n.updateQueue), i !== null && ((i = i.lastEffect), i !== null))
      ) {
        s = i = i.next;
        do {
          var r = s,
            o = r.destroy;
          (r = r.tag),
            o !== void 0 && (r & 2 || r & 4) && na(n, e, o),
            (s = s.next);
        } while (s !== i);
      }
      Wt(t, e, n);
      break;
    case 1:
      if (
        !Ee &&
        (ni(n, e),
        (i = n.stateNode),
        typeof i.componentWillUnmount == "function")
      )
        try {
          (i.props = n.memoizedProps),
            (i.state = n.memoizedState),
            i.componentWillUnmount();
        } catch (l) {
          ae(n, e, l);
        }
      Wt(t, e, n);
      break;
    case 21:
      Wt(t, e, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ee = (i = Ee) || n.memoizedState !== null), Wt(t, e, n), (Ee = i))
        : Wt(t, e, n);
      break;
    default:
      Wt(t, e, n);
  }
}
function ju(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new Ty()),
      e.forEach(function (i) {
        var s = By.bind(null, t, i);
        n.has(i) || (n.add(i), i.then(s, s));
      });
  }
}
function ct(t, e) {
  var n = e.deletions;
  if (n !== null)
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      try {
        var r = t,
          o = e,
          l = o;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (Se = l.stateNode), (dt = !1);
              break e;
            case 3:
              (Se = l.stateNode.containerInfo), (dt = !0);
              break e;
            case 4:
              (Se = l.stateNode.containerInfo), (dt = !0);
              break e;
          }
          l = l.return;
        }
        if (Se === null) throw Error(P(160));
        up(r, o, s), (Se = null), (dt = !1);
        var a = s.alternate;
        a !== null && (a.return = null), (s.return = null);
      } catch (c) {
        ae(s, e, c);
      }
    }
  if (e.subtreeFlags & 12854)
    for (e = e.child; e !== null; ) dp(e, t), (e = e.sibling);
}
function dp(t, e) {
  var n = t.alternate,
    i = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ct(e, t), yt(t), i & 4)) {
        try {
          ns(3, t, t.return), _o(3, t);
        } catch (g) {
          ae(t, t.return, g);
        }
        try {
          ns(5, t, t.return);
        } catch (g) {
          ae(t, t.return, g);
        }
      }
      break;
    case 1:
      ct(e, t), yt(t), i & 512 && n !== null && ni(n, n.return);
      break;
    case 5:
      if (
        (ct(e, t),
        yt(t),
        i & 512 && n !== null && ni(n, n.return),
        t.flags & 32)
      ) {
        var s = t.stateNode;
        try {
          us(s, "");
        } catch (g) {
          ae(t, t.return, g);
        }
      }
      if (i & 4 && ((s = t.stateNode), s != null)) {
        var r = t.memoizedProps,
          o = n !== null ? n.memoizedProps : r,
          l = t.type,
          a = t.updateQueue;
        if (((t.updateQueue = null), a !== null))
          try {
            l === "input" && r.type === "radio" && r.name != null && Rf(s, r),
              Dl(l, o);
            var c = Dl(l, r);
            for (o = 0; o < a.length; o += 2) {
              var u = a[o],
                d = a[o + 1];
              u === "style"
                ? Nf(s, d)
                : u === "dangerouslySetInnerHTML"
                ? jf(s, d)
                : u === "children"
                ? us(s, d)
                : Ta(s, u, d, c);
            }
            switch (l) {
              case "input":
                bl(s, r);
                break;
              case "textarea":
                Af(s, r);
                break;
              case "select":
                var f = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!r.multiple;
                var m = r.value;
                m != null
                  ? oi(s, !!r.multiple, m, !1)
                  : f !== !!r.multiple &&
                    (r.defaultValue != null
                      ? oi(s, !!r.multiple, r.defaultValue, !0)
                      : oi(s, !!r.multiple, r.multiple ? [] : "", !1));
            }
            s[xs] = r;
          } catch (g) {
            ae(t, t.return, g);
          }
      }
      break;
    case 6:
      if ((ct(e, t), yt(t), i & 4)) {
        if (t.stateNode === null) throw Error(P(162));
        (s = t.stateNode), (r = t.memoizedProps);
        try {
          s.nodeValue = r;
        } catch (g) {
          ae(t, t.return, g);
        }
      }
      break;
    case 3:
      if (
        (ct(e, t), yt(t), i & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ps(e.containerInfo);
        } catch (g) {
          ae(t, t.return, g);
        }
      break;
    case 4:
      ct(e, t), yt(t);
      break;
    case 13:
      ct(e, t),
        yt(t),
        (s = t.child),
        s.flags & 8192 &&
          ((r = s.memoizedState !== null),
          (s.stateNode.isHidden = r),
          !r ||
            (s.alternate !== null && s.alternate.memoizedState !== null) ||
            (cc = ce())),
        i & 4 && ju(t);
      break;
    case 22:
      if (
        ((u = n !== null && n.memoizedState !== null),
        t.mode & 1 ? ((Ee = (c = Ee) || u), ct(e, t), (Ee = c)) : ct(e, t),
        yt(t),
        i & 8192)
      ) {
        if (
          ((c = t.memoizedState !== null),
          (t.stateNode.isHidden = c) && !u && t.mode & 1)
        )
          for (R = t, u = t.child; u !== null; ) {
            for (d = R = u; R !== null; ) {
              switch (((f = R), (m = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ns(4, f, f.return);
                  break;
                case 1:
                  ni(f, f.return);
                  var v = f.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (i = f), (n = f.return);
                    try {
                      (e = i),
                        (v.props = e.memoizedProps),
                        (v.state = e.memoizedState),
                        v.componentWillUnmount();
                    } catch (g) {
                      ae(i, n, g);
                    }
                  }
                  break;
                case 5:
                  ni(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Nu(d);
                    continue;
                  }
              }
              m !== null ? ((m.return = f), (R = m)) : Nu(d);
            }
            u = u.sibling;
          }
        e: for (u = null, d = t; ; ) {
          if (d.tag === 5) {
            if (u === null) {
              u = d;
              try {
                (s = d.stateNode),
                  c
                    ? ((r = s.style),
                      typeof r.setProperty == "function"
                        ? r.setProperty("display", "none", "important")
                        : (r.display = "none"))
                    : ((l = d.stateNode),
                      (a = d.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = zf("display", o)));
              } catch (g) {
                ae(t, t.return, g);
              }
            }
          } else if (d.tag === 6) {
            if (u === null)
              try {
                d.stateNode.nodeValue = c ? "" : d.memoizedProps;
              } catch (g) {
                ae(t, t.return, g);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === t) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === t) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === t) break e;
            u === d && (u = null), (d = d.return);
          }
          u === d && (u = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      ct(e, t), yt(t), i & 4 && ju(t);
      break;
    case 21:
      break;
    default:
      ct(e, t), yt(t);
  }
}
function yt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null; ) {
          if (cp(n)) {
            var i = n;
            break e;
          }
          n = n.return;
        }
        throw Error(P(160));
      }
      switch (i.tag) {
        case 5:
          var s = i.stateNode;
          i.flags & 32 && (us(s, ""), (i.flags &= -33));
          var r = Iu(t);
          ra(t, r, s);
          break;
        case 3:
        case 4:
          var o = i.stateNode.containerInfo,
            l = Iu(t);
          sa(t, l, o);
          break;
        default:
          throw Error(P(161));
      }
    } catch (a) {
      ae(t, t.return, a);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function Ly(t, e, n) {
  (R = t), fp(t);
}
function fp(t, e, n) {
  for (var i = (t.mode & 1) !== 0; R !== null; ) {
    var s = R,
      r = s.child;
    if (s.tag === 22 && i) {
      var o = s.memoizedState !== null || qs;
      if (!o) {
        var l = s.alternate,
          a = (l !== null && l.memoizedState !== null) || Ee;
        l = qs;
        var c = Ee;
        if (((qs = o), (Ee = a) && !c))
          for (R = s; R !== null; )
            (o = R),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Fu(s)
                : a !== null
                ? ((a.return = o), (R = a))
                : Fu(s);
        for (; r !== null; ) (R = r), fp(r), (r = r.sibling);
        (R = s), (qs = l), (Ee = c);
      }
      zu(t);
    } else
      s.subtreeFlags & 8772 && r !== null ? ((r.return = s), (R = r)) : zu(t);
  }
}
function zu(t) {
  for (; R !== null; ) {
    var e = R;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              Ee || _o(5, e);
              break;
            case 1:
              var i = e.stateNode;
              if (e.flags & 4 && !Ee)
                if (n === null) i.componentDidMount();
                else {
                  var s =
                    e.elementType === e.type
                      ? n.memoizedProps
                      : ut(e.type, n.memoizedProps);
                  i.componentDidUpdate(
                    s,
                    n.memoizedState,
                    i.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var r = e.updateQueue;
              r !== null && wu(e, r, i);
              break;
            case 3:
              var o = e.updateQueue;
              if (o !== null) {
                if (((n = null), e.child !== null))
                  switch (e.child.tag) {
                    case 5:
                      n = e.child.stateNode;
                      break;
                    case 1:
                      n = e.child.stateNode;
                  }
                wu(e, o, n);
              }
              break;
            case 5:
              var l = e.stateNode;
              if (n === null && e.flags & 4) {
                n = l;
                var a = e.memoizedProps;
                switch (e.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (e.memoizedState === null) {
                var c = e.alternate;
                if (c !== null) {
                  var u = c.memoizedState;
                  if (u !== null) {
                    var d = u.dehydrated;
                    d !== null && ps(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(P(163));
          }
        Ee || (e.flags & 512 && ia(e));
      } catch (f) {
        ae(e, e.return, f);
      }
    }
    if (e === t) {
      R = null;
      break;
    }
    if (((n = e.sibling), n !== null)) {
      (n.return = e.return), (R = n);
      break;
    }
    R = e.return;
  }
}
function Nu(t) {
  for (; R !== null; ) {
    var e = R;
    if (e === t) {
      R = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      (n.return = e.return), (R = n);
      break;
    }
    R = e.return;
  }
}
function Fu(t) {
  for (; R !== null; ) {
    var e = R;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            _o(4, e);
          } catch (a) {
            ae(e, n, a);
          }
          break;
        case 1:
          var i = e.stateNode;
          if (typeof i.componentDidMount == "function") {
            var s = e.return;
            try {
              i.componentDidMount();
            } catch (a) {
              ae(e, s, a);
            }
          }
          var r = e.return;
          try {
            ia(e);
          } catch (a) {
            ae(e, r, a);
          }
          break;
        case 5:
          var o = e.return;
          try {
            ia(e);
          } catch (a) {
            ae(e, o, a);
          }
      }
    } catch (a) {
      ae(e, e.return, a);
    }
    if (e === t) {
      R = null;
      break;
    }
    var l = e.sibling;
    if (l !== null) {
      (l.return = e.return), (R = l);
      break;
    }
    R = e.return;
  }
}
var Ry = Math.ceil,
  Gr = $t.ReactCurrentDispatcher,
  lc = $t.ReactCurrentOwner,
  nt = $t.ReactCurrentBatchConfig,
  H = 0,
  _e = null,
  de = null,
  ke = 0,
  Ve = 0,
  ii = hn(0),
  me = 0,
  Cs = null,
  Rn = 0,
  wo = 0,
  ac = 0,
  is = null,
  ze = null,
  cc = 0,
  wi = 1 / 0,
  Dt = null,
  Qr = !1,
  oa = null,
  sn = null,
  Js = !1,
  Gt = null,
  Zr = 0,
  ss = 0,
  la = null,
  kr = -1,
  br = 0;
function Re() {
  return H & 6 ? ce() : kr !== -1 ? kr : (kr = ce());
}
function rn(t) {
  return t.mode & 1
    ? H & 2 && ke !== 0
      ? ke & -ke
      : my.transition !== null
      ? (br === 0 && (br = Qf()), br)
      : ((t = G),
        t !== 0 || ((t = window.event), (t = t === void 0 ? 16 : ih(t.type))),
        t)
    : 1;
}
function pt(t, e, n, i) {
  if (50 < ss) throw ((ss = 0), (la = null), Error(P(185)));
  Ls(t, n, i),
    (!(H & 2) || t !== _e) &&
      (t === _e && (!(H & 2) && (wo |= n), me === 4 && Kt(t, ke)),
      He(t, i),
      n === 1 && H === 0 && !(e.mode & 1) && ((wi = ce() + 500), yo && pn()));
}
function He(t, e) {
  var n = t.callbackNode;
  mm(t, e);
  var i = Ar(t, t === _e ? ke : 0);
  if (i === 0)
    n !== null && Xc(n), (t.callbackNode = null), (t.callbackPriority = 0);
  else if (((e = i & -i), t.callbackPriority !== e)) {
    if ((n != null && Xc(n), e === 1))
      t.tag === 0 ? gy(Bu.bind(null, t)) : Sh(Bu.bind(null, t)),
        dy(function () {
          !(H & 6) && pn();
        }),
        (n = null);
    else {
      switch (Zf(i)) {
        case 1:
          n = Ia;
          break;
        case 4:
          n = Xf;
          break;
        case 16:
          n = Rr;
          break;
        case 536870912:
          n = Gf;
          break;
        default:
          n = Rr;
      }
      n = _p(n, hp.bind(null, t));
    }
    (t.callbackPriority = e), (t.callbackNode = n);
  }
}
function hp(t, e) {
  if (((kr = -1), (br = 0), H & 6)) throw Error(P(327));
  var n = t.callbackNode;
  if (di() && t.callbackNode !== n) return null;
  var i = Ar(t, t === _e ? ke : 0);
  if (i === 0) return null;
  if (i & 30 || i & t.expiredLanes || e) e = qr(t, i);
  else {
    e = i;
    var s = H;
    H |= 2;
    var r = gp();
    (_e !== t || ke !== e) && ((Dt = null), (wi = ce() + 500), Mn(t, e));
    do
      try {
        jy();
        break;
      } catch (l) {
        pp(t, l);
      }
    while (!0);
    Xa(),
      (Gr.current = r),
      (H = s),
      de !== null ? (e = 0) : ((_e = null), (ke = 0), (e = me));
  }
  if (e !== 0) {
    if (
      (e === 2 && ((s = Al(t)), s !== 0 && ((i = s), (e = aa(t, s)))), e === 1)
    )
      throw ((n = Cs), Mn(t, 0), Kt(t, i), He(t, ce()), n);
    if (e === 6) Kt(t, i);
    else {
      if (
        ((s = t.current.alternate),
        !(i & 30) &&
          !Ay(s) &&
          ((e = qr(t, i)),
          e === 2 && ((r = Al(t)), r !== 0 && ((i = r), (e = aa(t, r)))),
          e === 1))
      )
        throw ((n = Cs), Mn(t, 0), Kt(t, i), He(t, ce()), n);
      switch (((t.finishedWork = s), (t.finishedLanes = i), e)) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          _n(t, ze, Dt);
          break;
        case 3:
          if (
            (Kt(t, i), (i & 130023424) === i && ((e = cc + 500 - ce()), 10 < e))
          ) {
            if (Ar(t, 0) !== 0) break;
            if (((s = t.suspendedLanes), (s & i) !== i)) {
              Re(), (t.pingedLanes |= t.suspendedLanes & s);
              break;
            }
            t.timeoutHandle = Wl(_n.bind(null, t, ze, Dt), e);
            break;
          }
          _n(t, ze, Dt);
          break;
        case 4:
          if ((Kt(t, i), (i & 4194240) === i)) break;
          for (e = t.eventTimes, s = -1; 0 < i; ) {
            var o = 31 - ht(i);
            (r = 1 << o), (o = e[o]), o > s && (s = o), (i &= ~r);
          }
          if (
            ((i = s),
            (i = ce() - i),
            (i =
              (120 > i
                ? 120
                : 480 > i
                ? 480
                : 1080 > i
                ? 1080
                : 1920 > i
                ? 1920
                : 3e3 > i
                ? 3e3
                : 4320 > i
                ? 4320
                : 1960 * Ry(i / 1960)) - i),
            10 < i)
          ) {
            t.timeoutHandle = Wl(_n.bind(null, t, ze, Dt), i);
            break;
          }
          _n(t, ze, Dt);
          break;
        case 5:
          _n(t, ze, Dt);
          break;
        default:
          throw Error(P(329));
      }
    }
  }
  return He(t, ce()), t.callbackNode === n ? hp.bind(null, t) : null;
}
function aa(t, e) {
  var n = is;
  return (
    t.current.memoizedState.isDehydrated && (Mn(t, e).flags |= 256),
    (t = qr(t, e)),
    t !== 2 && ((e = ze), (ze = n), e !== null && ca(e)),
    t
  );
}
function ca(t) {
  ze === null ? (ze = t) : ze.push.apply(ze, t);
}
function Ay(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var i = 0; i < n.length; i++) {
          var s = n[i],
            r = s.getSnapshot;
          s = s.value;
          try {
            if (!gt(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
      (n.return = e), (e = n);
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
  }
  return !0;
}
function Kt(t, e) {
  for (
    e &= ~ac,
      e &= ~wo,
      t.suspendedLanes |= e,
      t.pingedLanes &= ~e,
      t = t.expirationTimes;
    0 < e;

  ) {
    var n = 31 - ht(e),
      i = 1 << n;
    (t[n] = -1), (e &= ~i);
  }
}
function Bu(t) {
  if (H & 6) throw Error(P(327));
  di();
  var e = Ar(t, 0);
  if (!(e & 1)) return He(t, ce()), null;
  var n = qr(t, e);
  if (t.tag !== 0 && n === 2) {
    var i = Al(t);
    i !== 0 && ((e = i), (n = aa(t, i)));
  }
  if (n === 1) throw ((n = Cs), Mn(t, 0), Kt(t, e), He(t, ce()), n);
  if (n === 6) throw Error(P(345));
  return (
    (t.finishedWork = t.current.alternate),
    (t.finishedLanes = e),
    _n(t, ze, Dt),
    He(t, ce()),
    null
  );
}
function uc(t, e) {
  var n = H;
  H |= 1;
  try {
    return t(e);
  } finally {
    (H = n), H === 0 && ((wi = ce() + 500), yo && pn());
  }
}
function An(t) {
  Gt !== null && Gt.tag === 0 && !(H & 6) && di();
  var e = H;
  H |= 1;
  var n = nt.transition,
    i = G;
  try {
    if (((nt.transition = null), (G = 1), t)) return t();
  } finally {
    (G = i), (nt.transition = n), (H = e), !(H & 6) && pn();
  }
}
function dc() {
  (Ve = ii.current), te(ii);
}
function Mn(t, e) {
  (t.finishedWork = null), (t.finishedLanes = 0);
  var n = t.timeoutHandle;
  if ((n !== -1 && ((t.timeoutHandle = -1), uy(n)), de !== null))
    for (n = de.return; n !== null; ) {
      var i = n;
      switch ((Ua(i), i.tag)) {
        case 1:
          (i = i.type.childContextTypes), i != null && Fr();
          break;
        case 3:
          xi(), te($e), te(Te), ec();
          break;
        case 5:
          Ja(i);
          break;
        case 4:
          xi();
          break;
        case 13:
          te(se);
          break;
        case 19:
          te(se);
          break;
        case 10:
          Ga(i.type._context);
          break;
        case 22:
        case 23:
          dc();
      }
      n = n.return;
    }
  if (
    ((_e = t),
    (de = t = on(t.current, null)),
    (ke = Ve = e),
    (me = 0),
    (Cs = null),
    (ac = wo = Rn = 0),
    (ze = is = null),
    kn !== null)
  ) {
    for (e = 0; e < kn.length; e++)
      if (((n = kn[e]), (i = n.interleaved), i !== null)) {
        n.interleaved = null;
        var s = i.next,
          r = n.pending;
        if (r !== null) {
          var o = r.next;
          (r.next = s), (i.next = o);
        }
        n.pending = i;
      }
    kn = null;
  }
  return t;
}
function pp(t, e) {
  do {
    var n = de;
    try {
      if ((Xa(), (_r.current = Xr), Kr)) {
        for (var i = re.memoizedState; i !== null; ) {
          var s = i.queue;
          s !== null && (s.pending = null), (i = i.next);
        }
        Kr = !1;
      }
      if (
        ((Ln = 0),
        (xe = pe = re = null),
        (ts = !1),
        (Ss = 0),
        (lc.current = null),
        n === null || n.return === null)
      ) {
        (me = 1), (Cs = e), (de = null);
        break;
      }
      e: {
        var r = t,
          o = n.return,
          l = n,
          a = e;
        if (
          ((e = ke),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var c = a,
            u = l,
            d = u.tag;
          if (!(u.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var f = u.alternate;
            f
              ? ((u.updateQueue = f.updateQueue),
                (u.memoizedState = f.memoizedState),
                (u.lanes = f.lanes))
              : ((u.updateQueue = null), (u.memoizedState = null));
          }
          var m = Pu(o);
          if (m !== null) {
            (m.flags &= -257),
              Eu(m, o, l, r, e),
              m.mode & 1 && Mu(r, c, e),
              (e = m),
              (a = c);
            var v = e.updateQueue;
            if (v === null) {
              var g = new Set();
              g.add(a), (e.updateQueue = g);
            } else v.add(a);
            break e;
          } else {
            if (!(e & 1)) {
              Mu(r, c, e), fc();
              break e;
            }
            a = Error(P(426));
          }
        } else if (ne && l.mode & 1) {
          var x = Pu(o);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Eu(x, o, l, r, e),
              Ya(_i(a, l));
            break e;
          }
        }
        (r = a = _i(a, l)),
          me !== 4 && (me = 2),
          is === null ? (is = [r]) : is.push(r),
          (r = o);
        do {
          switch (r.tag) {
            case 3:
              (r.flags |= 65536), (e &= -e), (r.lanes |= e);
              var p = Zh(r, a, e);
              _u(r, p);
              break e;
            case 1:
              l = a;
              var h = r.type,
                y = r.stateNode;
              if (
                !(r.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (sn === null || !sn.has(y))))
              ) {
                (r.flags |= 65536), (e &= -e), (r.lanes |= e);
                var _ = qh(r, l, e);
                _u(r, _);
                break e;
              }
          }
          r = r.return;
        } while (r !== null);
      }
      yp(n);
    } catch (w) {
      (e = w), de === n && n !== null && (de = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function gp() {
  var t = Gr.current;
  return (Gr.current = Xr), t === null ? Xr : t;
}
function fc() {
  (me === 0 || me === 3 || me === 2) && (me = 4),
    _e === null || (!(Rn & 268435455) && !(wo & 268435455)) || Kt(_e, ke);
}
function qr(t, e) {
  var n = H;
  H |= 2;
  var i = gp();
  (_e !== t || ke !== e) && ((Dt = null), Mn(t, e));
  do
    try {
      Iy();
      break;
    } catch (s) {
      pp(t, s);
    }
  while (!0);
  if ((Xa(), (H = n), (Gr.current = i), de !== null)) throw Error(P(261));
  return (_e = null), (ke = 0), me;
}
function Iy() {
  for (; de !== null; ) mp(de);
}
function jy() {
  for (; de !== null && !lm(); ) mp(de);
}
function mp(t) {
  var e = xp(t.alternate, t, Ve);
  (t.memoizedProps = t.pendingProps),
    e === null ? yp(t) : (de = e),
    (lc.current = null);
}
function yp(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (((t = e.return), e.flags & 32768)) {
      if (((n = Dy(n, e)), n !== null)) {
        (n.flags &= 32767), (de = n);
        return;
      }
      if (t !== null)
        (t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null);
      else {
        (me = 6), (de = null);
        return;
      }
    } else if (((n = Ey(n, e, Ve)), n !== null)) {
      de = n;
      return;
    }
    if (((e = e.sibling), e !== null)) {
      de = e;
      return;
    }
    de = e = t;
  } while (e !== null);
  me === 0 && (me = 5);
}
function _n(t, e, n) {
  var i = G,
    s = nt.transition;
  try {
    (nt.transition = null), (G = 1), zy(t, e, n, i);
  } finally {
    (nt.transition = s), (G = i);
  }
  return null;
}
function zy(t, e, n, i) {
  do di();
  while (Gt !== null);
  if (H & 6) throw Error(P(327));
  n = t.finishedWork;
  var s = t.finishedLanes;
  if (n === null) return null;
  if (((t.finishedWork = null), (t.finishedLanes = 0), n === t.current))
    throw Error(P(177));
  (t.callbackNode = null), (t.callbackPriority = 0);
  var r = n.lanes | n.childLanes;
  if (
    (ym(t, r),
    t === _e && ((de = _e = null), (ke = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Js ||
      ((Js = !0),
      _p(Rr, function () {
        return di(), null;
      })),
    (r = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || r)
  ) {
    (r = nt.transition), (nt.transition = null);
    var o = G;
    G = 1;
    var l = H;
    (H |= 4),
      (lc.current = null),
      Oy(t, n),
      dp(n, t),
      iy(Bl),
      (Ir = !!Fl),
      (Bl = Fl = null),
      (t.current = n),
      Ly(n),
      am(),
      (H = l),
      (G = o),
      (nt.transition = r);
  } else t.current = n;
  if (
    (Js && ((Js = !1), (Gt = t), (Zr = s)),
    (r = t.pendingLanes),
    r === 0 && (sn = null),
    dm(n.stateNode),
    He(t, ce()),
    e !== null)
  )
    for (i = t.onRecoverableError, n = 0; n < e.length; n++)
      (s = e[n]), i(s.value, { componentStack: s.stack, digest: s.digest });
  if (Qr) throw ((Qr = !1), (t = oa), (oa = null), t);
  return (
    Zr & 1 && t.tag !== 0 && di(),
    (r = t.pendingLanes),
    r & 1 ? (t === la ? ss++ : ((ss = 0), (la = t))) : (ss = 0),
    pn(),
    null
  );
}
function di() {
  if (Gt !== null) {
    var t = Zf(Zr),
      e = nt.transition,
      n = G;
    try {
      if (((nt.transition = null), (G = 16 > t ? 16 : t), Gt === null))
        var i = !1;
      else {
        if (((t = Gt), (Gt = null), (Zr = 0), H & 6)) throw Error(P(331));
        var s = H;
        for (H |= 4, R = t.current; R !== null; ) {
          var r = R,
            o = r.child;
          if (R.flags & 16) {
            var l = r.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var c = l[a];
                for (R = c; R !== null; ) {
                  var u = R;
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ns(8, u, r);
                  }
                  var d = u.child;
                  if (d !== null) (d.return = u), (R = d);
                  else
                    for (; R !== null; ) {
                      u = R;
                      var f = u.sibling,
                        m = u.return;
                      if ((ap(u), u === c)) {
                        R = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = m), (R = f);
                        break;
                      }
                      R = m;
                    }
                }
              }
              var v = r.alternate;
              if (v !== null) {
                var g = v.child;
                if (g !== null) {
                  v.child = null;
                  do {
                    var x = g.sibling;
                    (g.sibling = null), (g = x);
                  } while (g !== null);
                }
              }
              R = r;
            }
          }
          if (r.subtreeFlags & 2064 && o !== null) (o.return = r), (R = o);
          else
            e: for (; R !== null; ) {
              if (((r = R), r.flags & 2048))
                switch (r.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ns(9, r, r.return);
                }
              var p = r.sibling;
              if (p !== null) {
                (p.return = r.return), (R = p);
                break e;
              }
              R = r.return;
            }
        }
        var h = t.current;
        for (R = h; R !== null; ) {
          o = R;
          var y = o.child;
          if (o.subtreeFlags & 2064 && y !== null) (y.return = o), (R = y);
          else
            e: for (o = h; R !== null; ) {
              if (((l = R), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _o(9, l);
                  }
                } catch (w) {
                  ae(l, l.return, w);
                }
              if (l === o) {
                R = null;
                break e;
              }
              var _ = l.sibling;
              if (_ !== null) {
                (_.return = l.return), (R = _);
                break e;
              }
              R = l.return;
            }
        }
        if (
          ((H = s), pn(), kt && typeof kt.onPostCommitFiberRoot == "function")
        )
          try {
            kt.onPostCommitFiberRoot(fo, t);
          } catch {}
        i = !0;
      }
      return i;
    } finally {
      (G = n), (nt.transition = e);
    }
  }
  return !1;
}
function $u(t, e, n) {
  (e = _i(n, e)),
    (e = Zh(t, e, 1)),
    (t = nn(t, e, 1)),
    (e = Re()),
    t !== null && (Ls(t, 1, e), He(t, e));
}
function ae(t, e, n) {
  if (t.tag === 3) $u(t, t, n);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        $u(e, t, n);
        break;
      } else if (e.tag === 1) {
        var i = e.stateNode;
        if (
          typeof e.type.getDerivedStateFromError == "function" ||
          (typeof i.componentDidCatch == "function" &&
            (sn === null || !sn.has(i)))
        ) {
          (t = _i(n, t)),
            (t = qh(e, t, 1)),
            (e = nn(e, t, 1)),
            (t = Re()),
            e !== null && (Ls(e, 1, t), He(e, t));
          break;
        }
      }
      e = e.return;
    }
}
function Ny(t, e, n) {
  var i = t.pingCache;
  i !== null && i.delete(e),
    (e = Re()),
    (t.pingedLanes |= t.suspendedLanes & n),
    _e === t &&
      (ke & n) === n &&
      (me === 4 || (me === 3 && (ke & 130023424) === ke && 500 > ce() - cc)
        ? Mn(t, 0)
        : (ac |= n)),
    He(t, e);
}
function vp(t, e) {
  e === 0 &&
    (t.mode & 1
      ? ((e = Hs), (Hs <<= 1), !(Hs & 130023424) && (Hs = 4194304))
      : (e = 1));
  var n = Re();
  (t = Nt(t, e)), t !== null && (Ls(t, e, n), He(t, n));
}
function Fy(t) {
  var e = t.memoizedState,
    n = 0;
  e !== null && (n = e.retryLane), vp(t, n);
}
function By(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var i = t.stateNode,
        s = t.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      i = t.stateNode;
      break;
    default:
      throw Error(P(314));
  }
  i !== null && i.delete(e), vp(t, n);
}
var xp;
xp = function (t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps || $e.current) Fe = !0;
    else {
      if (!(t.lanes & n) && !(e.flags & 128)) return (Fe = !1), Py(t, e, n);
      Fe = !!(t.flags & 131072);
    }
  else (Fe = !1), ne && e.flags & 1048576 && kh(e, Wr, e.index);
  switch (((e.lanes = 0), e.tag)) {
    case 2:
      var i = e.type;
      Sr(t, e), (t = e.pendingProps);
      var s = mi(e, Te.current);
      ui(e, n), (s = nc(null, e, i, t, s, n));
      var r = ic();
      return (
        (e.flags |= 1),
        typeof s == "object" &&
        s !== null &&
        typeof s.render == "function" &&
        s.$$typeof === void 0
          ? ((e.tag = 1),
            (e.memoizedState = null),
            (e.updateQueue = null),
            We(i) ? ((r = !0), Br(e)) : (r = !1),
            (e.memoizedState =
              s.state !== null && s.state !== void 0 ? s.state : null),
            Za(e),
            (s.updater = xo),
            (e.stateNode = s),
            (s._reactInternals = e),
            Gl(e, i, t, n),
            (e = ql(null, e, i, !0, r, n)))
          : ((e.tag = 0), ne && r && Va(e), Le(null, e, s, n), (e = e.child)),
        e
      );
    case 16:
      i = e.elementType;
      e: {
        switch (
          (Sr(t, e),
          (t = e.pendingProps),
          (s = i._init),
          (i = s(i._payload)),
          (e.type = i),
          (s = e.tag = Wy(i)),
          (t = ut(i, t)),
          s)
        ) {
          case 0:
            e = Zl(null, e, i, t, n);
            break e;
          case 1:
            e = Ou(null, e, i, t, n);
            break e;
          case 11:
            e = Du(null, e, i, t, n);
            break e;
          case 14:
            e = Tu(null, e, i, ut(i.type, t), n);
            break e;
        }
        throw Error(P(306, i, ""));
      }
      return e;
    case 0:
      return (
        (i = e.type),
        (s = e.pendingProps),
        (s = e.elementType === i ? s : ut(i, s)),
        Zl(t, e, i, s, n)
      );
    case 1:
      return (
        (i = e.type),
        (s = e.pendingProps),
        (s = e.elementType === i ? s : ut(i, s)),
        Ou(t, e, i, s, n)
      );
    case 3:
      e: {
        if ((np(e), t === null)) throw Error(P(387));
        (i = e.pendingProps),
          (r = e.memoizedState),
          (s = r.element),
          Dh(t, e),
          Ur(e, i, null, n);
        var o = e.memoizedState;
        if (((i = o.element), r.isDehydrated))
          if (
            ((r = {
              element: i,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (e.updateQueue.baseState = r),
            (e.memoizedState = r),
            e.flags & 256)
          ) {
            (s = _i(Error(P(423)), e)), (e = Lu(t, e, i, n, s));
            break e;
          } else if (i !== s) {
            (s = _i(Error(P(424)), e)), (e = Lu(t, e, i, n, s));
            break e;
          } else
            for (
              Ue = tn(e.stateNode.containerInfo.firstChild),
                Ye = e,
                ne = !0,
                ft = null,
                n = Ph(e, null, i, n),
                e.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((yi(), i === s)) {
            e = Ft(t, e, n);
            break e;
          }
          Le(t, e, i, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return (
        Th(e),
        t === null && Yl(e),
        (i = e.type),
        (s = e.pendingProps),
        (r = t !== null ? t.memoizedProps : null),
        (o = s.children),
        $l(i, s) ? (o = null) : r !== null && $l(i, r) && (e.flags |= 32),
        tp(t, e),
        Le(t, e, o, n),
        e.child
      );
    case 6:
      return t === null && Yl(e), null;
    case 13:
      return ip(t, e, n);
    case 4:
      return (
        qa(e, e.stateNode.containerInfo),
        (i = e.pendingProps),
        t === null ? (e.child = vi(e, null, i, n)) : Le(t, e, i, n),
        e.child
      );
    case 11:
      return (
        (i = e.type),
        (s = e.pendingProps),
        (s = e.elementType === i ? s : ut(i, s)),
        Du(t, e, i, s, n)
      );
    case 7:
      return Le(t, e, e.pendingProps, n), e.child;
    case 8:
      return Le(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return Le(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (
          ((i = e.type._context),
          (s = e.pendingProps),
          (r = e.memoizedProps),
          (o = s.value),
          Z(Hr, i._currentValue),
          (i._currentValue = o),
          r !== null)
        )
          if (gt(r.value, o)) {
            if (r.children === s.children && !$e.current) {
              e = Ft(t, e, n);
              break e;
            }
          } else
            for (r = e.child, r !== null && (r.return = e); r !== null; ) {
              var l = r.dependencies;
              if (l !== null) {
                o = r.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === i) {
                    if (r.tag === 1) {
                      (a = It(-1, n & -n)), (a.tag = 2);
                      var c = r.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var u = c.pending;
                        u === null
                          ? (a.next = a)
                          : ((a.next = u.next), (u.next = a)),
                          (c.pending = a);
                      }
                    }
                    (r.lanes |= n),
                      (a = r.alternate),
                      a !== null && (a.lanes |= n),
                      Kl(r.return, n, e),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (r.tag === 10) o = r.type === e.type ? null : r.child;
              else if (r.tag === 18) {
                if (((o = r.return), o === null)) throw Error(P(341));
                (o.lanes |= n),
                  (l = o.alternate),
                  l !== null && (l.lanes |= n),
                  Kl(o, n, e),
                  (o = r.sibling);
              } else o = r.child;
              if (o !== null) o.return = r;
              else
                for (o = r; o !== null; ) {
                  if (o === e) {
                    o = null;
                    break;
                  }
                  if (((r = o.sibling), r !== null)) {
                    (r.return = o.return), (o = r);
                    break;
                  }
                  o = o.return;
                }
              r = o;
            }
        Le(t, e, s.children, n), (e = e.child);
      }
      return e;
    case 9:
      return (
        (s = e.type),
        (i = e.pendingProps.children),
        ui(e, n),
        (s = it(s)),
        (i = i(s)),
        (e.flags |= 1),
        Le(t, e, i, n),
        e.child
      );
    case 14:
      return (
        (i = e.type),
        (s = ut(i, e.pendingProps)),
        (s = ut(i.type, s)),
        Tu(t, e, i, s, n)
      );
    case 15:
      return Jh(t, e, e.type, e.pendingProps, n);
    case 17:
      return (
        (i = e.type),
        (s = e.pendingProps),
        (s = e.elementType === i ? s : ut(i, s)),
        Sr(t, e),
        (e.tag = 1),
        We(i) ? ((t = !0), Br(e)) : (t = !1),
        ui(e, n),
        Qh(e, i, s),
        Gl(e, i, s, n),
        ql(null, e, i, !0, t, n)
      );
    case 19:
      return sp(t, e, n);
    case 22:
      return ep(t, e, n);
  }
  throw Error(P(156, e.tag));
};
function _p(t, e) {
  return Kf(t, e);
}
function $y(t, e, n, i) {
  (this.tag = t),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = e),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = i),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function et(t, e, n, i) {
  return new $y(t, e, n, i);
}
function hc(t) {
  return (t = t.prototype), !(!t || !t.isReactComponent);
}
function Wy(t) {
  if (typeof t == "function") return hc(t) ? 1 : 0;
  if (t != null) {
    if (((t = t.$$typeof), t === La)) return 11;
    if (t === Ra) return 14;
  }
  return 2;
}
function on(t, e) {
  var n = t.alternate;
  return (
    n === null
      ? ((n = et(t.tag, e, t.key, t.mode)),
        (n.elementType = t.elementType),
        (n.type = t.type),
        (n.stateNode = t.stateNode),
        (n.alternate = t),
        (t.alternate = n))
      : ((n.pendingProps = e),
        (n.type = t.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = t.flags & 14680064),
    (n.childLanes = t.childLanes),
    (n.lanes = t.lanes),
    (n.child = t.child),
    (n.memoizedProps = t.memoizedProps),
    (n.memoizedState = t.memoizedState),
    (n.updateQueue = t.updateQueue),
    (e = t.dependencies),
    (n.dependencies =
      e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
    (n.sibling = t.sibling),
    (n.index = t.index),
    (n.ref = t.ref),
    n
  );
}
function Cr(t, e, n, i, s, r) {
  var o = 2;
  if (((i = t), typeof t == "function")) hc(t) && (o = 1);
  else if (typeof t == "string") o = 5;
  else
    e: switch (t) {
      case Kn:
        return Pn(n.children, s, r, e);
      case Oa:
        (o = 8), (s |= 8);
        break;
      case xl:
        return (
          (t = et(12, n, e, s | 2)), (t.elementType = xl), (t.lanes = r), t
        );
      case _l:
        return (t = et(13, n, e, s)), (t.elementType = _l), (t.lanes = r), t;
      case wl:
        return (t = et(19, n, e, s)), (t.elementType = wl), (t.lanes = r), t;
      case Tf:
        return So(n, s, r, e);
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case Ef:
              o = 10;
              break e;
            case Df:
              o = 9;
              break e;
            case La:
              o = 11;
              break e;
            case Ra:
              o = 14;
              break e;
            case Vt:
              (o = 16), (i = null);
              break e;
          }
        throw Error(P(130, t == null ? t : typeof t, ""));
    }
  return (
    (e = et(o, n, e, s)), (e.elementType = t), (e.type = i), (e.lanes = r), e
  );
}
function Pn(t, e, n, i) {
  return (t = et(7, t, i, e)), (t.lanes = n), t;
}
function So(t, e, n, i) {
  return (
    (t = et(22, t, i, e)),
    (t.elementType = Tf),
    (t.lanes = n),
    (t.stateNode = { isHidden: !1 }),
    t
  );
}
function il(t, e, n) {
  return (t = et(6, t, null, e)), (t.lanes = n), t;
}
function sl(t, e, n) {
  return (
    (e = et(4, t.children !== null ? t.children : [], t.key, e)),
    (e.lanes = n),
    (e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation,
    }),
    e
  );
}
function Hy(t, e, n, i, s) {
  (this.tag = e),
    (this.containerInfo = t),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = No(0)),
    (this.expirationTimes = No(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = No(0)),
    (this.identifierPrefix = i),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null);
}
function pc(t, e, n, i, s, r, o, l, a) {
  return (
    (t = new Hy(t, e, n, l, a)),
    e === 1 ? ((e = 1), r === !0 && (e |= 8)) : (e = 0),
    (r = et(3, null, null, e)),
    (t.current = r),
    (r.stateNode = t),
    (r.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Za(r),
    t
  );
}
function Vy(t, e, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Yn,
    key: i == null ? null : "" + i,
    children: t,
    containerInfo: e,
    implementation: n,
  };
}
function wp(t) {
  if (!t) return un;
  t = t._reactInternals;
  e: {
    if (Fn(t) !== t || t.tag !== 1) throw Error(P(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (We(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(P(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (We(n)) return wh(t, n, e);
  }
  return e;
}
function Sp(t, e, n, i, s, r, o, l, a) {
  return (
    (t = pc(n, i, !0, t, s, r, o, l, a)),
    (t.context = wp(null)),
    (n = t.current),
    (i = Re()),
    (s = rn(n)),
    (r = It(i, s)),
    (r.callback = e ?? null),
    nn(n, r, s),
    (t.current.lanes = s),
    Ls(t, s, i),
    He(t, i),
    t
  );
}
function ko(t, e, n, i) {
  var s = e.current,
    r = Re(),
    o = rn(s);
  return (
    (n = wp(n)),
    e.context === null ? (e.context = n) : (e.pendingContext = n),
    (e = It(r, o)),
    (e.payload = { element: t }),
    (i = i === void 0 ? null : i),
    i !== null && (e.callback = i),
    (t = nn(s, e, o)),
    t !== null && (pt(t, s, o, r), xr(t, s, o)),
    o
  );
}
function Jr(t) {
  if (((t = t.current), !t.child)) return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function Wu(t, e) {
  if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function gc(t, e) {
  Wu(t, e), (t = t.alternate) && Wu(t, e);
}
function Uy() {
  return null;
}
var kp =
  typeof reportError == "function"
    ? reportError
    : function (t) {
        console.error(t);
      };
function mc(t) {
  this._internalRoot = t;
}
bo.prototype.render = mc.prototype.render = function (t) {
  var e = this._internalRoot;
  if (e === null) throw Error(P(409));
  ko(t, e, null, null);
};
bo.prototype.unmount = mc.prototype.unmount = function () {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    An(function () {
      ko(null, t, null, null);
    }),
      (e[zt] = null);
  }
};
function bo(t) {
  this._internalRoot = t;
}
bo.prototype.unstable_scheduleHydration = function (t) {
  if (t) {
    var e = eh();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < Yt.length && e !== 0 && e < Yt[n].priority; n++);
    Yt.splice(n, 0, t), n === 0 && nh(t);
  }
};
function yc(t) {
  return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
}
function Co(t) {
  return !(
    !t ||
    (t.nodeType !== 1 &&
      t.nodeType !== 9 &&
      t.nodeType !== 11 &&
      (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
  );
}
function Hu() {}
function Yy(t, e, n, i, s) {
  if (s) {
    if (typeof i == "function") {
      var r = i;
      i = function () {
        var c = Jr(o);
        r.call(c);
      };
    }
    var o = Sp(e, i, t, 0, null, !1, !1, "", Hu);
    return (
      (t._reactRootContainer = o),
      (t[zt] = o.current),
      ys(t.nodeType === 8 ? t.parentNode : t),
      An(),
      o
    );
  }
  for (; (s = t.lastChild); ) t.removeChild(s);
  if (typeof i == "function") {
    var l = i;
    i = function () {
      var c = Jr(a);
      l.call(c);
    };
  }
  var a = pc(t, 0, !1, null, null, !1, !1, "", Hu);
  return (
    (t._reactRootContainer = a),
    (t[zt] = a.current),
    ys(t.nodeType === 8 ? t.parentNode : t),
    An(function () {
      ko(e, a, n, i);
    }),
    a
  );
}
function Mo(t, e, n, i, s) {
  var r = n._reactRootContainer;
  if (r) {
    var o = r;
    if (typeof s == "function") {
      var l = s;
      s = function () {
        var a = Jr(o);
        l.call(a);
      };
    }
    ko(e, o, t, s);
  } else o = Yy(n, e, t, s, i);
  return Jr(o);
}
qf = function (t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = Ui(e.pendingLanes);
        n !== 0 &&
          (ja(e, n | 1), He(e, ce()), !(H & 6) && ((wi = ce() + 500), pn()));
      }
      break;
    case 13:
      An(function () {
        var i = Nt(t, 1);
        if (i !== null) {
          var s = Re();
          pt(i, t, 1, s);
        }
      }),
        gc(t, 1);
  }
};
za = function (t) {
  if (t.tag === 13) {
    var e = Nt(t, 134217728);
    if (e !== null) {
      var n = Re();
      pt(e, t, 134217728, n);
    }
    gc(t, 134217728);
  }
};
Jf = function (t) {
  if (t.tag === 13) {
    var e = rn(t),
      n = Nt(t, e);
    if (n !== null) {
      var i = Re();
      pt(n, t, e, i);
    }
    gc(t, e);
  }
};
eh = function () {
  return G;
};
th = function (t, e) {
  var n = G;
  try {
    return (G = t), e();
  } finally {
    G = n;
  }
};
Ol = function (t, e, n) {
  switch (e) {
    case "input":
      if ((bl(t, n), (e = n.name), n.type === "radio" && e != null)) {
        for (n = t; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + e) + '][type="radio"]'
          ),
            e = 0;
          e < n.length;
          e++
        ) {
          var i = n[e];
          if (i !== t && i.form === t.form) {
            var s = mo(i);
            if (!s) throw Error(P(90));
            Lf(i), bl(i, s);
          }
        }
      }
      break;
    case "textarea":
      Af(t, n);
      break;
    case "select":
      (e = n.value), e != null && oi(t, !!n.multiple, e, !1);
  }
};
$f = uc;
Wf = An;
var Ky = { usingClientEntryPoint: !1, Events: [As, Zn, mo, Ff, Bf, uc] },
  zi = {
    findFiberByHostInstance: Sn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Xy = {
    bundleType: zi.bundleType,
    version: zi.version,
    rendererPackageName: zi.rendererPackageName,
    rendererConfig: zi.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: $t.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (t) {
      return (t = Uf(t)), t === null ? null : t.stateNode;
    },
    findFiberByHostInstance: zi.findFiberByHostInstance || Uy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var er = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!er.isDisabled && er.supportsFiber)
    try {
      (fo = er.inject(Xy)), (kt = er);
    } catch {}
}
Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ky;
Xe.createPortal = function (t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!yc(e)) throw Error(P(200));
  return Vy(t, e, null, n);
};
Xe.createRoot = function (t, e) {
  if (!yc(t)) throw Error(P(299));
  var n = !1,
    i = "",
    s = kp;
  return (
    e != null &&
      (e.unstable_strictMode === !0 && (n = !0),
      e.identifierPrefix !== void 0 && (i = e.identifierPrefix),
      e.onRecoverableError !== void 0 && (s = e.onRecoverableError)),
    (e = pc(t, 1, !1, null, null, n, !1, i, s)),
    (t[zt] = e.current),
    ys(t.nodeType === 8 ? t.parentNode : t),
    new mc(e)
  );
};
Xe.findDOMNode = function (t) {
  if (t == null) return null;
  if (t.nodeType === 1) return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function"
      ? Error(P(188))
      : ((t = Object.keys(t).join(",")), Error(P(268, t)));
  return (t = Uf(e)), (t = t === null ? null : t.stateNode), t;
};
Xe.flushSync = function (t) {
  return An(t);
};
Xe.hydrate = function (t, e, n) {
  if (!Co(e)) throw Error(P(200));
  return Mo(null, t, e, !0, n);
};
Xe.hydrateRoot = function (t, e, n) {
  if (!yc(t)) throw Error(P(405));
  var i = (n != null && n.hydratedSources) || null,
    s = !1,
    r = "",
    o = kp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (s = !0),
      n.identifierPrefix !== void 0 && (r = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (e = Sp(e, null, t, 1, n ?? null, s, !1, r, o)),
    (t[zt] = e.current),
    ys(t),
    i)
  )
    for (t = 0; t < i.length; t++)
      (n = i[t]),
        (s = n._getVersion),
        (s = s(n._source)),
        e.mutableSourceEagerHydrationData == null
          ? (e.mutableSourceEagerHydrationData = [n, s])
          : e.mutableSourceEagerHydrationData.push(n, s);
  return new bo(e);
};
Xe.render = function (t, e, n) {
  if (!Co(e)) throw Error(P(200));
  return Mo(null, t, e, !1, n);
};
Xe.unmountComponentAtNode = function (t) {
  if (!Co(t)) throw Error(P(40));
  return t._reactRootContainer
    ? (An(function () {
        Mo(null, null, t, !1, function () {
          (t._reactRootContainer = null), (t[zt] = null);
        });
      }),
      !0)
    : !1;
};
Xe.unstable_batchedUpdates = uc;
Xe.unstable_renderSubtreeIntoContainer = function (t, e, n, i) {
  if (!Co(n)) throw Error(P(200));
  if (t == null || t._reactInternals === void 0) throw Error(P(38));
  return Mo(t, e, n, !1, i);
};
Xe.version = "18.3.1-next-f1338f8080-20240426";
function bp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bp);
    } catch (t) {
      console.error(t);
    }
}
bp(), (bf.exports = Xe);
var Gy = bf.exports,
  Cp,
  Vu = Gy;
(Cp = Vu.createRoot), Vu.hydrateRoot;
const ie =
    (t) =>
    (e, ...n) => {
      const i = e.replay_stats[0].stats;
      return t(i, ...n);
    },
  In = (t, e) => {
    const n = e.split(":")[1];
    return t ? t.find((i) => i.id.id === n) : null;
  },
  Qy = (t, e) => t.playlist_id === e,
  Zy = (t, e, n) => Mp(t, e) === n,
  Mp = (t, e) => {
    const { blueTeam: n, orangeTeam: i } = Bn(t),
      s = In(n, e) || In(i, e);
    if (s) return s.car_name ? s.car_name : null;
  },
  Bn = (t) => {
    const e = t.blue ? t.blue.players : [],
      n = t.orange ? t.orange.players : [];
    return { blueTeam: e, orangeTeam: n };
  },
  qy = (t) =>
    t.length === 0
      ? ""
      : t.length === 1
      ? `<a href="${t[0].profileLink}">${t[0].name}</a>`
      : t.length === 2
      ? t.map((e) => `<a href="${e.profileLink}">${e.name}</a>`).join(" and ")
      : t
          .slice(0, -1)
          .map((e) => `<a href="${e.profileLink}">${e.name}</a>`)
          .join(", ") +
        `, and <a href="${t[t.length - 1].profileLink}">${
          t[t.length - 1].name
        }</a>`,
  Jy = (t, e) => {
    const n = t0(t, e),
      i = n0(n);
    return qy(i);
  },
  e0 = (t, e) => `<a href="https://ballchasing.com/replay/${t.id}">${e}</a>`,
  t0 = (t, e) => {
    const { blueTeam: n, orangeTeam: i } = Bn(t);
    let s;
    return In(n, e) ? (s = i) : (s = n), s;
  },
  n0 = (t) => {
    let e = [];
    for (let n = 0; n < t.length; n++)
      e.push({
        id: n,
        name: t[n].name,
        profileLink: `https://ballchasing.com/player/${t[n].id.platform}/${t[n].id.id}`,
      });
    return e;
  },
  mt = (t, e) => {
    const { blueTeam: n, orangeTeam: i } = Bn(t),
      s = In(n, e) || In(i, e);
    return s ? s.stats : null;
  },
  i0 = (t, e) => {
    const { blueTeam: n, orangeTeam: i } = Bn(t),
      s = In(n, e) || In(i, e);
    return s ? s.name : "";
  },
  s0 = (t) => t.date.split("T")[0],
  r0 = (t) => (t.map_name ? t.map_name : t.map_code),
  o0 = (t, e) => {
    const n = e.split(":")[1],
      { blueTeam: i, orangeTeam: s } = Bn(t),
      r = g0(t);
    return (
      (i.some((o) => o.id.id === n) && r === "blue") ||
      (s.some((o) => o.id.id === n) && r === "orange")
    );
  },
  l0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.movement.percent_supersonic_speed : 0;
  },
  a0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.movement.percent_boost_speed : 0;
  },
  c0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.movement.percent_slow_speed : 0;
  },
  u0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.movement.avg_speed : 0;
  },
  d0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.boost.bpm : 0;
  },
  f0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.boost.bcpm : 0;
  },
  h0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.demo.inflicted : 0;
  },
  p0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.demo.taken : 0;
  },
  g0 = (t) => {
    const { blueTeam: e, orangeTeam: n } = Bn(t),
      i = n[0].stats.core.goals_against,
      s = e[0].stats.core.goals_against;
    return i > s ? "blue" : "orange";
  },
  m0 = (t, e) => (e === 5 ? ua(t) >= e : ua(t) === e),
  ua = (t) => {
    const { blueTeam: e, orangeTeam: n } = Bn(t),
      i = n[0].stats.core.goals_against,
      s = e[0].stats.core.goals_against;
    return Math.abs(i - s);
  },
  y0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.movement.total_distance : 0;
  },
  v0 = (t) => t.overtime_seconds,
  x0 = (t, e) => {
    const n = mt(t, e);
    if (!n || !n.core) return console.error("Invalid player stats"), {};
    const i = n.core,
      s = [
        "shots",
        "goals",
        "saves",
        "assists",
        "score",
        "shooting_percentage",
      ],
      r = {};
    return (
      s.forEach((o) => {
        r[o] = i[o] || 0;
      }),
      r
    );
  },
  _0 = (t, e) => {
    const n = mt(t, e);
    return n ? n.core.mvp : null;
  },
  B = {
    isPlayerWinner: ie(o0),
    isGoalDifference: ie(m0),
    getDemosInflicted: ie(h0),
    getDemosTaken: ie(p0),
    getTotalDistance: ie(y0),
    getPercentSupersonicSpeed: ie(l0),
    getPercentBoostSpeed: ie(a0),
    getPercentSlowSpeed: ie(c0),
    getMapName: ie(r0),
    getOvertimeSeconds: ie(v0),
    getGoalDifference: ie(ua),
    getOpposingPlayerNamesWithLinks: ie(Jy),
    getLinkToReplay: ie(e0),
    getAvgSpeed: ie(u0),
    getBPM: ie(d0),
    getBCPM: ie(f0),
    inPlaylist: ie(Qy),
    splitReplayDate: ie(s0),
    isPlayerMVP: ie(_0),
    getPlayerNameById: ie(i0),
    getUsedCar: ie(Mp),
    withUsedCar: ie(Zy),
    getMainCoreStats: ie(x0),
  },
  Pp = z.createContext(),
  Ct = () => z.useContext(Pp),
  w0 = ({ children: t }) => {
    const [e, n] = z.useState([]),
      [i, s] = z.useState(null),
      [r, o] = z.useState([]),
      [l, a] = z.useState(!0),
      [c, u] = z.useState(null),
      [d, f] = z.useState(null),
      [m, v] = z.useState(""),
      [g, x] = z.useState("");
    return (
      z.useEffect(() => {
        let p = r;
        i && (p = r.filter((h) => B.inPlaylist(h, i))), n(p);
      }, [r, i]),
      S.jsx(Pp.Provider, {
        value: {
          prefilteredReplays: r,
          setPrefilteredReplays: o,
          replays: e,
          playlist: i,
          setPlaylist: s,
          loading: l,
          setLoading: a,
          error: c,
          setError: u,
          playerName: d,
          setPlayerName: f,
          playerId: g,
          setPlayerId: x,
          unprocessedPlayerId: m,
          setUnprocessedPlayerId: v,
        },
        children: t,
      })
    );
  },
  S0 = () =>
    S.jsx("button", {
      onClick: () => (window.location.href = "http://localhost:3000/chip_time"),
      children: "Admin Login",
    }),
  k0 = ({ className: t }) =>
    S.jsxs("div", {
      className: t,
      children: [
        S.jsx("button", {
          onClick: () =>
            navigator.clipboard.writeText(
              "https://ballchasing.com/player/steam/76561198136291441"
            ),
          children: "Copy BijouBug's URL",
        }),
        S.jsx("button", {
          onClick: () =>
            navigator.clipboard.writeText(
              "https://ballchasing.com/player/steam/76561198835242233"
            ),
          children: "Copy Tofu's URL",
        }),
        S.jsx("button", {
          onClick: () =>
            navigator.clipboard.writeText(
              "https://ballchasing.com/player/epic/b843b77c31e74c6fa970db08f5796805"
            ),
          children: "Copy badwifibro's URL",
        }),
      ],
    }),
  b0 = "_mainPageContent_rvar6_1",
  C0 = "_topRow_rvar6_6",
  M0 = "_headerSection_rvar6_12",
  P0 = "_statsSection_rvar6_18",
  E0 = "_leftCol_rvar6_24",
  D0 = "_mainHeader_rvar6_35",
  T0 = "_welcomeSection_rvar6_43",
  O0 = "_playerSearchForm_rvar6_51",
  L0 = "_adminAuxBtns_rvar6_67",
  R0 = "_adminFormSection_rvar6_77",
  A0 = "_playerInputFormSection_rvar6_83",
  I0 = "_playerProfileInput_rvar6_89",
  j0 = "_formBtnsContainer_rvar6_93",
  z0 = "_sentinel_rvar6_100",
  N0 = "_playlistFilterSection_rvar6_106",
  F0 = "_sticky_rvar6_120",
  B0 = "_playlistBtnsContainer_rvar6_129",
  $0 = "_rightCol_rvar6_139",
  le = {
    mainPageContent: b0,
    topRow: C0,
    headerSection: M0,
    statsSection: P0,
    leftCol: E0,
    mainHeader: D0,
    welcomeSection: T0,
    playerSearchForm: O0,
    adminAuxBtns: L0,
    adminFormSection: R0,
    playerInputFormSection: A0,
    playerProfileInput: I0,
    formBtnsContainer: j0,
    sentinel: z0,
    playlistFilterSection: N0,
    sticky: F0,
    playlistBtnsContainer: B0,
    rightCol: $0,
  },
  W0 = () => {
    const { playlist: t, setPlaylist: e } = Ct();
    return S.jsxs(S.Fragment, {
      children: [
        S.jsxs("div", {
          className: le.filterMessage,
          children: [
            S.jsx("div", {}),
            S.jsx("h4", { children: "Filter by playlist:" }),
          ],
        }),
        S.jsxs("div", {
          className: le.playlistBtnsContainer,
          children: [
            S.jsx("button", {
              onClick: () => e(null),
              className: t === null ? "focused" : "",
              children: "All",
            }),
            S.jsx("button", {
              onClick: () => e("ranked-duels"),
              className: t === "ranked-duels" ? "focused" : "",
              children: "1v1",
            }),
            S.jsx("button", {
              onClick: () => e("ranked-doubles"),
              className: t === "ranked-doubles" ? "focused" : "",
              children: "2v2",
            }),
            S.jsx("button", {
              onClick: () => e("ranked-standard"),
              className: t === "ranked-standard" ? "focused" : "",
              children: "3v3",
            }),
          ],
        }),
      ],
    });
  },
  H0 = () => {
    const [t, e] = z.useState(null),
      n = z.useRef(!1);
    z.useEffect(() => {
      const r = () => {
        n.current || e(null), (n.current = !1);
      };
      return (
        window.addEventListener("scroll", r),
        () => {
          window.removeEventListener("scroll", r);
        }
      );
    }, []);
    const i = (r) => {
        e(r), (n.current = !0);
      },
      s = [
        { href: "#carSection", label: "Cars" },
        { href: "#winLossSection", label: "Win/Loss" },
        { href: "#movementSection", label: "Movement" },
        { href: "#overtimeSection", label: "Overtimes" },
        { href: "#demoSection", label: "Demolitions" },
        { href: "#mapSection", label: "Maps" },
        { href: "#dateSection", label: "Dates" },
      ];
    return S.jsx("div", {
      className: "sidebar",
      children: S.jsx("ul", {
        children: s.map((r, o) =>
          S.jsx(
            "li",
            {
              children: S.jsx("a", {
                href: r.href,
                className: t === o ? "sidebar-focused" : "",
                onClick: () => i(o),
                children: r.label,
              }),
            },
            o
          )
        ),
      }),
    });
  };
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */ function js(t) {
  return (t + 0.5) | 0;
}
const Qt = (t, e, n) => Math.max(Math.min(t, n), e);
function Ki(t) {
  return Qt(js(t * 2.55), 0, 255);
}
function ln(t) {
  return Qt(js(t * 255), 0, 255);
}
function Ot(t) {
  return Qt(js(t / 2.55) / 100, 0, 1);
}
function Uu(t) {
  return Qt(js(t * 100), 0, 100);
}
const Qe = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  },
  da = [..."0123456789ABCDEF"],
  V0 = (t) => da[t & 15],
  U0 = (t) => da[(t & 240) >> 4] + da[t & 15],
  tr = (t) => (t & 240) >> 4 === (t & 15),
  Y0 = (t) => tr(t.r) && tr(t.g) && tr(t.b) && tr(t.a);
function K0(t) {
  var e = t.length,
    n;
  return (
    t[0] === "#" &&
      (e === 4 || e === 5
        ? (n = {
            r: 255 & (Qe[t[1]] * 17),
            g: 255 & (Qe[t[2]] * 17),
            b: 255 & (Qe[t[3]] * 17),
            a: e === 5 ? Qe[t[4]] * 17 : 255,
          })
        : (e === 7 || e === 9) &&
          (n = {
            r: (Qe[t[1]] << 4) | Qe[t[2]],
            g: (Qe[t[3]] << 4) | Qe[t[4]],
            b: (Qe[t[5]] << 4) | Qe[t[6]],
            a: e === 9 ? (Qe[t[7]] << 4) | Qe[t[8]] : 255,
          })),
    n
  );
}
const X0 = (t, e) => (t < 255 ? e(t) : "");
function G0(t) {
  var e = Y0(t) ? V0 : U0;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + X0(t.a, e) : void 0;
}
const Q0 =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ep(t, e, n) {
  const i = e * Math.min(n, 1 - n),
    s = (r, o = (r + t / 30) % 12) =>
      n - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [s(0), s(8), s(4)];
}
function Z0(t, e, n) {
  const i = (s, r = (s + t / 60) % 6) =>
    n - n * e * Math.max(Math.min(r, 4 - r, 1), 0);
  return [i(5), i(3), i(1)];
}
function q0(t, e, n) {
  const i = Ep(t, 1, 0.5);
  let s;
  for (e + n > 1 && ((s = 1 / (e + n)), (e *= s), (n *= s)), s = 0; s < 3; s++)
    (i[s] *= 1 - e - n), (i[s] += e);
  return i;
}
function J0(t, e, n, i, s) {
  return t === s
    ? (e - n) / i + (e < n ? 6 : 0)
    : e === s
    ? (n - t) / i + 2
    : (t - e) / i + 4;
}
function vc(t) {
  const n = t.r / 255,
    i = t.g / 255,
    s = t.b / 255,
    r = Math.max(n, i, s),
    o = Math.min(n, i, s),
    l = (r + o) / 2;
  let a, c, u;
  return (
    r !== o &&
      ((u = r - o),
      (c = l > 0.5 ? u / (2 - r - o) : u / (r + o)),
      (a = J0(n, i, s, u, r)),
      (a = a * 60 + 0.5)),
    [a | 0, c || 0, l]
  );
}
function xc(t, e, n, i) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, n, i)).map(ln);
}
function _c(t, e, n) {
  return xc(Ep, t, e, n);
}
function ev(t, e, n) {
  return xc(q0, t, e, n);
}
function tv(t, e, n) {
  return xc(Z0, t, e, n);
}
function Dp(t) {
  return ((t % 360) + 360) % 360;
}
function nv(t) {
  const e = Q0.exec(t);
  let n = 255,
    i;
  if (!e) return;
  e[5] !== i && (n = e[6] ? Ki(+e[5]) : ln(+e[5]));
  const s = Dp(+e[2]),
    r = +e[3] / 100,
    o = +e[4] / 100;
  return (
    e[1] === "hwb"
      ? (i = ev(s, r, o))
      : e[1] === "hsv"
      ? (i = tv(s, r, o))
      : (i = _c(s, r, o)),
    { r: i[0], g: i[1], b: i[2], a: n }
  );
}
function iv(t, e) {
  var n = vc(t);
  (n[0] = Dp(n[0] + e)), (n = _c(n)), (t.r = n[0]), (t.g = n[1]), (t.b = n[2]);
}
function sv(t) {
  if (!t) return;
  const e = vc(t),
    n = e[0],
    i = Uu(e[1]),
    s = Uu(e[2]);
  return t.a < 255
    ? `hsla(${n}, ${i}%, ${s}%, ${Ot(t.a)})`
    : `hsl(${n}, ${i}%, ${s}%)`;
}
const Yu = {
    x: "dark",
    Z: "light",
    Y: "re",
    X: "blu",
    W: "gr",
    V: "medium",
    U: "slate",
    A: "ee",
    T: "ol",
    S: "or",
    B: "ra",
    C: "lateg",
    D: "ights",
    R: "in",
    Q: "turquois",
    E: "hi",
    P: "ro",
    O: "al",
    N: "le",
    M: "de",
    L: "yello",
    F: "en",
    K: "ch",
    G: "arks",
    H: "ea",
    I: "ightg",
    J: "wh",
  },
  Ku = {
    OiceXe: "f0f8ff",
    antiquewEte: "faebd7",
    aqua: "ffff",
    aquamarRe: "7fffd4",
    azuY: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "0",
    blanKedOmond: "ffebcd",
    Xe: "ff",
    XeviTet: "8a2be2",
    bPwn: "a52a2a",
    burlywood: "deb887",
    caMtXe: "5f9ea0",
    KartYuse: "7fff00",
    KocTate: "d2691e",
    cSO: "ff7f50",
    cSnflowerXe: "6495ed",
    cSnsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "ffff",
    xXe: "8b",
    xcyan: "8b8b",
    xgTMnPd: "b8860b",
    xWay: "a9a9a9",
    xgYF: "6400",
    xgYy: "a9a9a9",
    xkhaki: "bdb76b",
    xmagFta: "8b008b",
    xTivegYF: "556b2f",
    xSange: "ff8c00",
    xScEd: "9932cc",
    xYd: "8b0000",
    xsOmon: "e9967a",
    xsHgYF: "8fbc8f",
    xUXe: "483d8b",
    xUWay: "2f4f4f",
    xUgYy: "2f4f4f",
    xQe: "ced1",
    xviTet: "9400d3",
    dAppRk: "ff1493",
    dApskyXe: "bfff",
    dimWay: "696969",
    dimgYy: "696969",
    dodgerXe: "1e90ff",
    fiYbrick: "b22222",
    flSOwEte: "fffaf0",
    foYstWAn: "228b22",
    fuKsia: "ff00ff",
    gaRsbSo: "dcdcdc",
    ghostwEte: "f8f8ff",
    gTd: "ffd700",
    gTMnPd: "daa520",
    Way: "808080",
    gYF: "8000",
    gYFLw: "adff2f",
    gYy: "808080",
    honeyMw: "f0fff0",
    hotpRk: "ff69b4",
    RdianYd: "cd5c5c",
    Rdigo: "4b0082",
    ivSy: "fffff0",
    khaki: "f0e68c",
    lavFMr: "e6e6fa",
    lavFMrXsh: "fff0f5",
    lawngYF: "7cfc00",
    NmoncEffon: "fffacd",
    ZXe: "add8e6",
    ZcSO: "f08080",
    Zcyan: "e0ffff",
    ZgTMnPdLw: "fafad2",
    ZWay: "d3d3d3",
    ZgYF: "90ee90",
    ZgYy: "d3d3d3",
    ZpRk: "ffb6c1",
    ZsOmon: "ffa07a",
    ZsHgYF: "20b2aa",
    ZskyXe: "87cefa",
    ZUWay: "778899",
    ZUgYy: "778899",
    ZstAlXe: "b0c4de",
    ZLw: "ffffe0",
    lime: "ff00",
    limegYF: "32cd32",
    lRF: "faf0e6",
    magFta: "ff00ff",
    maPon: "800000",
    VaquamarRe: "66cdaa",
    VXe: "cd",
    VScEd: "ba55d3",
    VpurpN: "9370db",
    VsHgYF: "3cb371",
    VUXe: "7b68ee",
    VsprRggYF: "fa9a",
    VQe: "48d1cc",
    VviTetYd: "c71585",
    midnightXe: "191970",
    mRtcYam: "f5fffa",
    mistyPse: "ffe4e1",
    moccasR: "ffe4b5",
    navajowEte: "ffdead",
    navy: "80",
    Tdlace: "fdf5e6",
    Tive: "808000",
    TivedBb: "6b8e23",
    Sange: "ffa500",
    SangeYd: "ff4500",
    ScEd: "da70d6",
    pOegTMnPd: "eee8aa",
    pOegYF: "98fb98",
    pOeQe: "afeeee",
    pOeviTetYd: "db7093",
    papayawEp: "ffefd5",
    pHKpuff: "ffdab9",
    peru: "cd853f",
    pRk: "ffc0cb",
    plum: "dda0dd",
    powMrXe: "b0e0e6",
    purpN: "800080",
    YbeccapurpN: "663399",
    Yd: "ff0000",
    Psybrown: "bc8f8f",
    PyOXe: "4169e1",
    saddNbPwn: "8b4513",
    sOmon: "fa8072",
    sandybPwn: "f4a460",
    sHgYF: "2e8b57",
    sHshell: "fff5ee",
    siFna: "a0522d",
    silver: "c0c0c0",
    skyXe: "87ceeb",
    UXe: "6a5acd",
    UWay: "708090",
    UgYy: "708090",
    snow: "fffafa",
    sprRggYF: "ff7f",
    stAlXe: "4682b4",
    tan: "d2b48c",
    teO: "8080",
    tEstN: "d8bfd8",
    tomato: "ff6347",
    Qe: "40e0d0",
    viTet: "ee82ee",
    JHt: "f5deb3",
    wEte: "ffffff",
    wEtesmoke: "f5f5f5",
    Lw: "ffff00",
    LwgYF: "9acd32",
  };
function rv() {
  const t = {},
    e = Object.keys(Ku),
    n = Object.keys(Yu);
  let i, s, r, o, l;
  for (i = 0; i < e.length; i++) {
    for (o = l = e[i], s = 0; s < n.length; s++)
      (r = n[s]), (l = l.replace(r, Yu[r]));
    (r = parseInt(Ku[o], 16)),
      (t[l] = [(r >> 16) & 255, (r >> 8) & 255, r & 255]);
  }
  return t;
}
let nr;
function ov(t) {
  nr || ((nr = rv()), (nr.transparent = [0, 0, 0, 0]));
  const e = nr[t.toLowerCase()];
  return e && { r: e[0], g: e[1], b: e[2], a: e.length === 4 ? e[3] : 255 };
}
const lv =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function av(t) {
  const e = lv.exec(t);
  let n = 255,
    i,
    s,
    r;
  if (e) {
    if (e[7] !== i) {
      const o = +e[7];
      n = e[8] ? Ki(o) : Qt(o * 255, 0, 255);
    }
    return (
      (i = +e[1]),
      (s = +e[3]),
      (r = +e[5]),
      (i = 255 & (e[2] ? Ki(i) : Qt(i, 0, 255))),
      (s = 255 & (e[4] ? Ki(s) : Qt(s, 0, 255))),
      (r = 255 & (e[6] ? Ki(r) : Qt(r, 0, 255))),
      { r: i, g: s, b: r, a: n }
    );
  }
}
function cv(t) {
  return (
    t &&
    (t.a < 255
      ? `rgba(${t.r}, ${t.g}, ${t.b}, ${Ot(t.a)})`
      : `rgb(${t.r}, ${t.g}, ${t.b})`)
  );
}
const rl = (t) =>
    t <= 0.0031308 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055,
  Vn = (t) => (t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4));
function uv(t, e, n) {
  const i = Vn(Ot(t.r)),
    s = Vn(Ot(t.g)),
    r = Vn(Ot(t.b));
  return {
    r: ln(rl(i + n * (Vn(Ot(e.r)) - i))),
    g: ln(rl(s + n * (Vn(Ot(e.g)) - s))),
    b: ln(rl(r + n * (Vn(Ot(e.b)) - r))),
    a: t.a + n * (e.a - t.a),
  };
}
function ir(t, e, n) {
  if (t) {
    let i = vc(t);
    (i[e] = Math.max(0, Math.min(i[e] + i[e] * n, e === 0 ? 360 : 1))),
      (i = _c(i)),
      (t.r = i[0]),
      (t.g = i[1]),
      (t.b = i[2]);
  }
}
function Tp(t, e) {
  return t && Object.assign(e || {}, t);
}
function Xu(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return (
    Array.isArray(t)
      ? t.length >= 3 &&
        ((e = { r: t[0], g: t[1], b: t[2], a: 255 }),
        t.length > 3 && (e.a = ln(t[3])))
      : ((e = Tp(t, { r: 0, g: 0, b: 0, a: 1 })), (e.a = ln(e.a))),
    e
  );
}
function dv(t) {
  return t.charAt(0) === "r" ? av(t) : nv(t);
}
class Ms {
  constructor(e) {
    if (e instanceof Ms) return e;
    const n = typeof e;
    let i;
    n === "object"
      ? (i = Xu(e))
      : n === "string" && (i = K0(e) || ov(e) || dv(e)),
      (this._rgb = i),
      (this._valid = !!i);
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Tp(this._rgb);
    return e && (e.a = Ot(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Xu(e);
  }
  rgbString() {
    return this._valid ? cv(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? G0(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? sv(this._rgb) : void 0;
  }
  mix(e, n) {
    if (e) {
      const i = this.rgb,
        s = e.rgb;
      let r;
      const o = n === r ? 0.5 : n,
        l = 2 * o - 1,
        a = i.a - s.a,
        c = ((l * a === -1 ? l : (l + a) / (1 + l * a)) + 1) / 2;
      (r = 1 - c),
        (i.r = 255 & (c * i.r + r * s.r + 0.5)),
        (i.g = 255 & (c * i.g + r * s.g + 0.5)),
        (i.b = 255 & (c * i.b + r * s.b + 0.5)),
        (i.a = o * i.a + (1 - o) * s.a),
        (this.rgb = i);
    }
    return this;
  }
  interpolate(e, n) {
    return e && (this._rgb = uv(this._rgb, e._rgb, n)), this;
  }
  clone() {
    return new Ms(this.rgb);
  }
  alpha(e) {
    return (this._rgb.a = ln(e)), this;
  }
  clearer(e) {
    const n = this._rgb;
    return (n.a *= 1 - e), this;
  }
  greyscale() {
    const e = this._rgb,
      n = js(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return (e.r = e.g = e.b = n), this;
  }
  opaquer(e) {
    const n = this._rgb;
    return (n.a *= 1 + e), this;
  }
  negate() {
    const e = this._rgb;
    return (e.r = 255 - e.r), (e.g = 255 - e.g), (e.b = 255 - e.b), this;
  }
  lighten(e) {
    return ir(this._rgb, 2, e), this;
  }
  darken(e) {
    return ir(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return ir(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return ir(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return iv(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.4.4
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */ function Mt() {}
const fv = (() => {
  let t = 0;
  return () => t++;
})();
function ee(t) {
  return t === null || typeof t > "u";
}
function ge(t) {
  if (Array.isArray && Array.isArray(t)) return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function V(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function rt(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function vt(t, e) {
  return rt(t) ? t : e;
}
function K(t, e) {
  return typeof t > "u" ? e : t;
}
const hv = (t, e) =>
    typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e,
  Op = (t, e) =>
    typeof t == "string" && t.endsWith("%") ? (parseFloat(t) / 100) * e : +t;
function J(t, e, n) {
  if (t && typeof t.call == "function") return t.apply(n, e);
}
function X(t, e, n, i) {
  let s, r, o;
  if (ge(t)) for (r = t.length, s = 0; s < r; s++) e.call(n, t[s], s);
  else if (V(t))
    for (o = Object.keys(t), r = o.length, s = 0; s < r; s++)
      e.call(n, t[o[s]], o[s]);
}
function eo(t, e) {
  let n, i, s, r;
  if (!t || !e || t.length !== e.length) return !1;
  for (n = 0, i = t.length; n < i; ++n)
    if (
      ((s = t[n]),
      (r = e[n]),
      s.datasetIndex !== r.datasetIndex || s.index !== r.index)
    )
      return !1;
  return !0;
}
function to(t) {
  if (ge(t)) return t.map(to);
  if (V(t)) {
    const e = Object.create(null),
      n = Object.keys(t),
      i = n.length;
    let s = 0;
    for (; s < i; ++s) e[n[s]] = to(t[n[s]]);
    return e;
  }
  return t;
}
function Lp(t) {
  return ["__proto__", "prototype", "constructor"].indexOf(t) === -1;
}
function pv(t, e, n, i) {
  if (!Lp(t)) return;
  const s = e[t],
    r = n[t];
  V(s) && V(r) ? Ps(s, r, i) : (e[t] = to(r));
}
function Ps(t, e, n) {
  const i = ge(e) ? e : [e],
    s = i.length;
  if (!V(t)) return t;
  n = n || {};
  const r = n.merger || pv;
  let o;
  for (let l = 0; l < s; ++l) {
    if (((o = i[l]), !V(o))) continue;
    const a = Object.keys(o);
    for (let c = 0, u = a.length; c < u; ++c) r(a[c], t, o, n);
  }
  return t;
}
function rs(t, e) {
  return Ps(t, e, { merger: gv });
}
function gv(t, e, n) {
  if (!Lp(t)) return;
  const i = e[t],
    s = n[t];
  V(i) && V(s)
    ? rs(i, s)
    : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = to(s));
}
const Gu = { "": (t) => t, x: (t) => t.x, y: (t) => t.y };
function mv(t) {
  const e = t.split("."),
    n = [];
  let i = "";
  for (const s of e)
    (i += s),
      i.endsWith("\\") ? (i = i.slice(0, -1) + ".") : (n.push(i), (i = ""));
  return n;
}
function yv(t) {
  const e = mv(t);
  return (n) => {
    for (const i of e) {
      if (i === "") break;
      n = n && n[i];
    }
    return n;
  };
}
function jn(t, e) {
  return (Gu[e] || (Gu[e] = yv(e)))(t);
}
function wc(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Es = (t) => typeof t < "u",
  dn = (t) => typeof t == "function",
  Qu = (t, e) => {
    if (t.size !== e.size) return !1;
    for (const n of t) if (!e.has(n)) return !1;
    return !0;
  };
function vv(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const he = Math.PI,
  fe = 2 * he,
  no = Number.POSITIVE_INFINITY,
  xv = he / 180,
  ye = he / 2,
  gn = he / 4,
  Zu = (he * 2) / 3,
  fa = Math.log10,
  an = Math.sign;
function Mr(t, e, n) {
  return Math.abs(t - e) < n;
}
function qu(t) {
  const e = Math.round(t);
  t = Mr(t, e, t / 1e3) ? e : t;
  const n = Math.pow(10, Math.floor(fa(t))),
    i = t / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function _v(t) {
  const e = [],
    n = Math.sqrt(t);
  let i;
  for (i = 1; i < n; i++) t % i === 0 && (e.push(i), e.push(t / i));
  return n === (n | 0) && e.push(n), e.sort((s, r) => s - r).pop(), e;
}
function io(t) {
  return !isNaN(parseFloat(t)) && isFinite(t);
}
function wv(t, e) {
  const n = Math.round(t);
  return n - e <= t && n + e >= t;
}
function Sv(t, e, n) {
  let i, s, r;
  for (i = 0, s = t.length; i < s; i++)
    (r = t[i][n]),
      isNaN(r) || ((e.min = Math.min(e.min, r)), (e.max = Math.max(e.max, r)));
}
function At(t) {
  return t * (he / 180);
}
function kv(t) {
  return t * (180 / he);
}
function Ju(t) {
  if (!rt(t)) return;
  let e = 1,
    n = 0;
  for (; Math.round(t * e) / e !== t; ) (e *= 10), n++;
  return n;
}
function Rp(t, e) {
  const n = e.x - t.x,
    i = e.y - t.y,
    s = Math.sqrt(n * n + i * i);
  let r = Math.atan2(i, n);
  return r < -0.5 * he && (r += fe), { angle: r, distance: s };
}
function bv(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function mn(t) {
  return ((t % fe) + fe) % fe;
}
function so(t, e, n, i) {
  const s = mn(t),
    r = mn(e),
    o = mn(n),
    l = mn(r - s),
    a = mn(o - s),
    c = mn(s - r),
    u = mn(s - o);
  return s === r || s === o || (i && r === o) || (l > a && c < u);
}
function Be(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function Cv(t) {
  return Be(t, -32768, 32767);
}
function Cn(t, e, n, i = 1e-6) {
  return t >= Math.min(e, n) - i && t <= Math.max(e, n) + i;
}
function Sc(t, e, n) {
  n = n || ((o) => t[o] < e);
  let i = t.length - 1,
    s = 0,
    r;
  for (; i - s > 1; ) (r = (s + i) >> 1), n(r) ? (s = r) : (i = r);
  return { lo: s, hi: i };
}
const ha = (t, e, n, i) =>
    Sc(
      t,
      n,
      i
        ? (s) => {
            const r = t[s][e];
            return r < n || (r === n && t[s + 1][e] === n);
          }
        : (s) => t[s][e] < n
    ),
  Mv = (t, e, n) => Sc(t, n, (i) => t[i][e] >= n);
function Pv(t, e, n) {
  let i = 0,
    s = t.length;
  for (; i < s && t[i] < e; ) i++;
  for (; s > i && t[s - 1] > n; ) s--;
  return i > 0 || s < t.length ? t.slice(i, s) : t;
}
const Ap = ["push", "pop", "shift", "splice", "unshift"];
function Ev(t, e) {
  if (t._chartjs) {
    t._chartjs.listeners.push(e);
    return;
  }
  Object.defineProperty(t, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: { listeners: [e] },
  }),
    Ap.forEach((n) => {
      const i = "_onData" + wc(n),
        s = t[n];
      Object.defineProperty(t, n, {
        configurable: !0,
        enumerable: !1,
        value(...r) {
          const o = s.apply(this, r);
          return (
            t._chartjs.listeners.forEach((l) => {
              typeof l[i] == "function" && l[i](...r);
            }),
            o
          );
        },
      });
    });
}
function ed(t, e) {
  const n = t._chartjs;
  if (!n) return;
  const i = n.listeners,
    s = i.indexOf(e);
  s !== -1 && i.splice(s, 1),
    !(i.length > 0) &&
      (Ap.forEach((r) => {
        delete t[r];
      }),
      delete t._chartjs);
}
function Ip(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const jp = (function () {
  return typeof window > "u"
    ? function (t) {
        return t();
      }
    : window.requestAnimationFrame;
})();
function zp(t, e) {
  let n = [],
    i = !1;
  return function (...s) {
    (n = s),
      i ||
        ((i = !0),
        jp.call(window, () => {
          (i = !1), t.apply(e, n);
        }));
  };
}
function Dv(t, e) {
  let n;
  return function (...i) {
    return (
      e ? (clearTimeout(n), (n = setTimeout(t, e, i))) : t.apply(this, i), e
    );
  };
}
const kc = (t) => (t === "start" ? "left" : t === "end" ? "right" : "center"),
  Pe = (t, e, n) => (t === "start" ? e : t === "end" ? n : (e + n) / 2),
  Tv = (t, e, n, i) =>
    t === (i ? "left" : "right") ? n : t === "center" ? (e + n) / 2 : e,
  sr = (t) => t === 0 || t === 1,
  td = (t, e, n) =>
    -(Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * fe) / n)),
  nd = (t, e, n) => Math.pow(2, -10 * t) * Math.sin(((t - e) * fe) / n) + 1,
  os = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => -t * (t - 2),
    easeInOutQuad: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (t -= 1) * t * t + 1,
    easeInOutCubic: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
    easeInOutQuart: (t) =>
      (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
    easeInOutQuint: (t) =>
      (t /= 0.5) < 1
        ? 0.5 * t * t * t * t * t
        : 0.5 * ((t -= 2) * t * t * t * t + 2),
    easeInSine: (t) => -Math.cos(t * ye) + 1,
    easeOutSine: (t) => Math.sin(t * ye),
    easeInOutSine: (t) => -0.5 * (Math.cos(he * t) - 1),
    easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
    easeOutExpo: (t) => (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1),
    easeInOutExpo: (t) =>
      sr(t)
        ? t
        : t < 0.5
        ? 0.5 * Math.pow(2, 10 * (t * 2 - 1))
        : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
    easeInCirc: (t) => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
    easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
    easeInOutCirc: (t) =>
      (t /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - t * t) - 1)
        : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
    easeInElastic: (t) => (sr(t) ? t : td(t, 0.075, 0.3)),
    easeOutElastic: (t) => (sr(t) ? t : nd(t, 0.075, 0.3)),
    easeInOutElastic(t) {
      return sr(t)
        ? t
        : t < 0.5
        ? 0.5 * td(t * 2, 0.1125, 0.45)
        : 0.5 + 0.5 * nd(t * 2 - 1, 0.1125, 0.45);
    },
    easeInBack(t) {
      return t * t * ((1.70158 + 1) * t - 1.70158);
    },
    easeOutBack(t) {
      return (t -= 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
    },
    easeInOutBack(t) {
      let e = 1.70158;
      return (t /= 0.5) < 1
        ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e))
        : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
    },
    easeInBounce: (t) => 1 - os.easeOutBounce(1 - t),
    easeOutBounce(t) {
      return t < 1 / 2.75
        ? 7.5625 * t * t
        : t < 2 / 2.75
        ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        : t < 2.5 / 2.75
        ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
        : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    },
    easeInOutBounce: (t) =>
      t < 0.5
        ? os.easeInBounce(t * 2) * 0.5
        : os.easeOutBounce(t * 2 - 1) * 0.5 + 0.5,
  };
function Np(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function id(t) {
  return Np(t) ? t : new Ms(t);
}
function ol(t) {
  return Np(t) ? t : new Ms(t).saturate(0.5).darken(0.1).hexString();
}
const Ov = ["x", "y", "borderWidth", "radius", "tension"],
  Lv = ["color", "borderColor", "backgroundColor"];
function Rv(t) {
  t.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0,
  }),
    t.describe("animation", {
      _fallback: !1,
      _indexable: !1,
      _scriptable: (e) =>
        e !== "onProgress" && e !== "onComplete" && e !== "fn",
    }),
    t.set("animations", {
      colors: { type: "color", properties: Lv },
      numbers: { type: "number", properties: Ov },
    }),
    t.describe("animations", { _fallback: "animation" }),
    t.set("transitions", {
      active: { animation: { duration: 400 } },
      resize: { animation: { duration: 0 } },
      show: {
        animations: {
          colors: { from: "transparent" },
          visible: { type: "boolean", duration: 0 },
        },
      },
      hide: {
        animations: {
          colors: { to: "transparent" },
          visible: { type: "boolean", easing: "linear", fn: (e) => e | 0 },
        },
      },
    });
}
function Av(t) {
  t.set("layout", {
    autoPadding: !0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
}
const sd = new Map();
function Iv(t, e) {
  e = e || {};
  const n = t + JSON.stringify(e);
  let i = sd.get(n);
  return i || ((i = new Intl.NumberFormat(t, e)), sd.set(n, i)), i;
}
function bc(t, e, n) {
  return Iv(e, n).format(t);
}
const Fp = {
  values(t) {
    return ge(t) ? t : "" + t;
  },
  numeric(t, e, n) {
    if (t === 0) return "0";
    const i = this.chart.options.locale;
    let s,
      r = t;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), (r = jv(t, n));
    }
    const o = fa(Math.abs(r)),
      l = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0),
      a = { notation: s, minimumFractionDigits: l, maximumFractionDigits: l };
    return Object.assign(a, this.options.ticks.format), bc(t, i, a);
  },
  logarithmic(t, e, n) {
    if (t === 0) return "0";
    const i = n[e].significand || t / Math.pow(10, Math.floor(fa(t)));
    return [1, 2, 3, 5, 10, 15].includes(i) || e > 0.8 * n.length
      ? Fp.numeric.call(this, t, e, n)
      : "";
  },
};
function jv(t, e) {
  let n = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(n) >= 1 && t !== Math.floor(t) && (n = t - Math.floor(t)), n;
}
var Bp = { formatters: Fp };
function zv(t) {
  t.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (e, n) => n.lineWidth,
      tickColor: (e, n) => n.color,
      offset: !1,
    },
    border: { display: !0, dash: [], dashOffset: 0, width: 1 },
    title: { display: !1, text: "", padding: { top: 4, bottom: 4 } },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Bp.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2,
    },
  }),
    t.route("scale.ticks", "color", "", "color"),
    t.route("scale.grid", "color", "", "borderColor"),
    t.route("scale.border", "color", "", "borderColor"),
    t.route("scale.title", "color", "", "color"),
    t.describe("scale", {
      _fallback: !1,
      _scriptable: (e) =>
        !e.startsWith("before") &&
        !e.startsWith("after") &&
        e !== "callback" &&
        e !== "parser",
      _indexable: (e) =>
        e !== "borderDash" && e !== "tickBorderDash" && e !== "dash",
    }),
    t.describe("scales", { _fallback: "scale" }),
    t.describe("scale.ticks", {
      _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
      _indexable: (e) => e !== "backdropPadding",
    });
}
const zn = Object.create(null),
  pa = Object.create(null);
function ls(t, e) {
  if (!e) return t;
  const n = e.split(".");
  for (let i = 0, s = n.length; i < s; ++i) {
    const r = n[i];
    t = t[r] || (t[r] = Object.create(null));
  }
  return t;
}
function ll(t, e, n) {
  return typeof e == "string" ? Ps(ls(t, e), n) : Ps(ls(t, ""), e);
}
class Nv {
  constructor(e, n) {
    (this.animation = void 0),
      (this.backgroundColor = "rgba(0,0,0,0.1)"),
      (this.borderColor = "rgba(0,0,0,0.1)"),
      (this.color = "#666"),
      (this.datasets = {}),
      (this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio()),
      (this.elements = {}),
      (this.events = [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove",
      ]),
      (this.font = {
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        style: "normal",
        lineHeight: 1.2,
        weight: null,
      }),
      (this.hover = {}),
      (this.hoverBackgroundColor = (i, s) => ol(s.backgroundColor)),
      (this.hoverBorderColor = (i, s) => ol(s.borderColor)),
      (this.hoverColor = (i, s) => ol(s.color)),
      (this.indexAxis = "x"),
      (this.interaction = {
        mode: "nearest",
        intersect: !0,
        includeInvisible: !1,
      }),
      (this.maintainAspectRatio = !0),
      (this.onHover = null),
      (this.onClick = null),
      (this.parsing = !0),
      (this.plugins = {}),
      (this.responsive = !0),
      (this.scale = void 0),
      (this.scales = {}),
      (this.showLine = !0),
      (this.drawActiveElementsOnTop = !0),
      this.describe(e),
      this.apply(n);
  }
  set(e, n) {
    return ll(this, e, n);
  }
  get(e) {
    return ls(this, e);
  }
  describe(e, n) {
    return ll(pa, e, n);
  }
  override(e, n) {
    return ll(zn, e, n);
  }
  route(e, n, i, s) {
    const r = ls(this, e),
      o = ls(this, i),
      l = "_" + n;
    Object.defineProperties(r, {
      [l]: { value: r[n], writable: !0 },
      [n]: {
        enumerable: !0,
        get() {
          const a = this[l],
            c = o[s];
          return V(a) ? Object.assign({}, c, a) : K(a, c);
        },
        set(a) {
          this[l] = a;
        },
      },
    });
  }
  apply(e) {
    e.forEach((n) => n(this));
  }
}
var ue = new Nv(
  {
    _scriptable: (t) => !t.startsWith("on"),
    _indexable: (t) => t !== "events",
    hover: { _fallback: "interaction" },
    interaction: { _scriptable: !1, _indexable: !1 },
  },
  [Rv, Av, zv]
);
function Fv(t) {
  return !t || ee(t.size) || ee(t.family)
    ? null
    : (t.style ? t.style + " " : "") +
        (t.weight ? t.weight + " " : "") +
        t.size +
        "px " +
        t.family;
}
function rd(t, e, n, i, s) {
  let r = e[s];
  return (
    r || ((r = e[s] = t.measureText(s).width), n.push(s)), r > i && (i = r), i
  );
}
function yn(t, e, n) {
  const i = t.currentDevicePixelRatio,
    s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((e - s) * i) / i + s;
}
function od(t, e) {
  (!e && !t) ||
    ((e = e || t.getContext("2d")),
    e.save(),
    e.resetTransform(),
    e.clearRect(0, 0, t.width, t.height),
    e.restore());
}
function ld(t, e, n, i) {
  $p(t, e, n, i, null);
}
function $p(t, e, n, i, s) {
  let r, o, l, a, c, u, d, f;
  const m = e.pointStyle,
    v = e.rotation,
    g = e.radius;
  let x = (v || 0) * xv;
  if (
    m &&
    typeof m == "object" &&
    ((r = m.toString()),
    r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")
  ) {
    t.save(),
      t.translate(n, i),
      t.rotate(x),
      t.drawImage(m, -m.width / 2, -m.height / 2, m.width, m.height),
      t.restore();
    return;
  }
  if (!(isNaN(g) || g <= 0)) {
    switch ((t.beginPath(), m)) {
      default:
        s ? t.ellipse(n, i, s / 2, g, 0, 0, fe) : t.arc(n, i, g, 0, fe),
          t.closePath();
        break;
      case "triangle":
        (u = s ? s / 2 : g),
          t.moveTo(n + Math.sin(x) * u, i - Math.cos(x) * g),
          (x += Zu),
          t.lineTo(n + Math.sin(x) * u, i - Math.cos(x) * g),
          (x += Zu),
          t.lineTo(n + Math.sin(x) * u, i - Math.cos(x) * g),
          t.closePath();
        break;
      case "rectRounded":
        (c = g * 0.516),
          (a = g - c),
          (o = Math.cos(x + gn) * a),
          (d = Math.cos(x + gn) * (s ? s / 2 - c : a)),
          (l = Math.sin(x + gn) * a),
          (f = Math.sin(x + gn) * (s ? s / 2 - c : a)),
          t.arc(n - d, i - l, c, x - he, x - ye),
          t.arc(n + f, i - o, c, x - ye, x),
          t.arc(n + d, i + l, c, x, x + ye),
          t.arc(n - f, i + o, c, x + ye, x + he),
          t.closePath();
        break;
      case "rect":
        if (!v) {
          (a = Math.SQRT1_2 * g),
            (u = s ? s / 2 : a),
            t.rect(n - u, i - a, 2 * u, 2 * a);
          break;
        }
        x += gn;
      case "rectRot":
        (d = Math.cos(x) * (s ? s / 2 : g)),
          (o = Math.cos(x) * g),
          (l = Math.sin(x) * g),
          (f = Math.sin(x) * (s ? s / 2 : g)),
          t.moveTo(n - d, i - l),
          t.lineTo(n + f, i - o),
          t.lineTo(n + d, i + l),
          t.lineTo(n - f, i + o),
          t.closePath();
        break;
      case "crossRot":
        x += gn;
      case "cross":
        (d = Math.cos(x) * (s ? s / 2 : g)),
          (o = Math.cos(x) * g),
          (l = Math.sin(x) * g),
          (f = Math.sin(x) * (s ? s / 2 : g)),
          t.moveTo(n - d, i - l),
          t.lineTo(n + d, i + l),
          t.moveTo(n + f, i - o),
          t.lineTo(n - f, i + o);
        break;
      case "star":
        (d = Math.cos(x) * (s ? s / 2 : g)),
          (o = Math.cos(x) * g),
          (l = Math.sin(x) * g),
          (f = Math.sin(x) * (s ? s / 2 : g)),
          t.moveTo(n - d, i - l),
          t.lineTo(n + d, i + l),
          t.moveTo(n + f, i - o),
          t.lineTo(n - f, i + o),
          (x += gn),
          (d = Math.cos(x) * (s ? s / 2 : g)),
          (o = Math.cos(x) * g),
          (l = Math.sin(x) * g),
          (f = Math.sin(x) * (s ? s / 2 : g)),
          t.moveTo(n - d, i - l),
          t.lineTo(n + d, i + l),
          t.moveTo(n + f, i - o),
          t.lineTo(n - f, i + o);
        break;
      case "line":
        (o = s ? s / 2 : Math.cos(x) * g),
          (l = Math.sin(x) * g),
          t.moveTo(n - o, i - l),
          t.lineTo(n + o, i + l);
        break;
      case "dash":
        t.moveTo(n, i),
          t.lineTo(n + Math.cos(x) * (s ? s / 2 : g), i + Math.sin(x) * g);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function Wp(t, e, n) {
  return (
    (n = n || 0.5),
    !e ||
      (t &&
        t.x > e.left - n &&
        t.x < e.right + n &&
        t.y > e.top - n &&
        t.y < e.bottom + n)
  );
}
function Cc(t, e) {
  t.save(),
    t.beginPath(),
    t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
    t.clip();
}
function Mc(t) {
  t.restore();
}
function Bv(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]),
    ee(e.rotation) || t.rotate(e.rotation),
    e.color && (t.fillStyle = e.color),
    e.textAlign && (t.textAlign = e.textAlign),
    e.textBaseline && (t.textBaseline = e.textBaseline);
}
function $v(t, e, n, i, s) {
  if (s.strikethrough || s.underline) {
    const r = t.measureText(i),
      o = e - r.actualBoundingBoxLeft,
      l = e + r.actualBoundingBoxRight,
      a = n - r.actualBoundingBoxAscent,
      c = n + r.actualBoundingBoxDescent,
      u = s.strikethrough ? (a + c) / 2 : c;
    (t.strokeStyle = t.fillStyle),
      t.beginPath(),
      (t.lineWidth = s.decorationWidth || 2),
      t.moveTo(o, u),
      t.lineTo(l, u),
      t.stroke();
  }
}
function Wv(t, e) {
  const n = t.fillStyle;
  (t.fillStyle = e.color),
    t.fillRect(e.left, e.top, e.width, e.height),
    (t.fillStyle = n);
}
function Ds(t, e, n, i, s, r = {}) {
  const o = ge(e) ? e : [e],
    l = r.strokeWidth > 0 && r.strokeColor !== "";
  let a, c;
  for (t.save(), t.font = s.string, Bv(t, r), a = 0; a < o.length; ++a)
    (c = o[a]),
      r.backdrop && Wv(t, r.backdrop),
      l &&
        (r.strokeColor && (t.strokeStyle = r.strokeColor),
        ee(r.strokeWidth) || (t.lineWidth = r.strokeWidth),
        t.strokeText(c, n, i, r.maxWidth)),
      t.fillText(c, n, i, r.maxWidth),
      $v(t, n, i, c, r),
      (i += Number(s.lineHeight));
  t.restore();
}
function ro(t, e) {
  const { x: n, y: i, w: s, h: r, radius: o } = e;
  t.arc(n + o.topLeft, i + o.topLeft, o.topLeft, 1.5 * he, he, !0),
    t.lineTo(n, i + r - o.bottomLeft),
    t.arc(n + o.bottomLeft, i + r - o.bottomLeft, o.bottomLeft, he, ye, !0),
    t.lineTo(n + s - o.bottomRight, i + r),
    t.arc(
      n + s - o.bottomRight,
      i + r - o.bottomRight,
      o.bottomRight,
      ye,
      0,
      !0
    ),
    t.lineTo(n + s, i + o.topRight),
    t.arc(n + s - o.topRight, i + o.topRight, o.topRight, 0, -ye, !0),
    t.lineTo(n + o.topLeft, i);
}
const Hv = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
  Vv = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Uv(t, e) {
  const n = ("" + t).match(Hv);
  if (!n || n[1] === "normal") return e * 1.2;
  switch (((t = +n[2]), n[3])) {
    case "px":
      return t;
    case "%":
      t /= 100;
      break;
  }
  return e * t;
}
const Yv = (t) => +t || 0;
function Pc(t, e) {
  const n = {},
    i = V(e),
    s = i ? Object.keys(e) : e,
    r = V(t) ? (i ? (o) => K(t[o], t[e[o]]) : (o) => t[o]) : () => t;
  for (const o of s) n[o] = Yv(r(o));
  return n;
}
function Hp(t) {
  return Pc(t, { top: "y", right: "x", bottom: "y", left: "x" });
}
function fi(t) {
  return Pc(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function ot(t) {
  const e = Hp(t);
  return (e.width = e.left + e.right), (e.height = e.top + e.bottom), e;
}
function De(t, e) {
  (t = t || {}), (e = e || ue.font);
  let n = K(t.size, e.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = K(t.style, e.style);
  i &&
    !("" + i).match(Vv) &&
    (console.warn('Invalid font style specified: "' + i + '"'), (i = void 0));
  const s = {
    family: K(t.family, e.family),
    lineHeight: Uv(K(t.lineHeight, e.lineHeight), n),
    size: n,
    style: i,
    weight: K(t.weight, e.weight),
    string: "",
  };
  return (s.string = Fv(s)), s;
}
function rr(t, e, n, i) {
  let s, r, o;
  for (s = 0, r = t.length; s < r; ++s)
    if (((o = t[s]), o !== void 0 && o !== void 0)) return o;
}
function Kv(t, e, n) {
  const { min: i, max: s } = t,
    r = Op(e, (s - i) / 2),
    o = (l, a) => (n && l === 0 ? 0 : l + a);
  return { min: o(i, -Math.abs(r)), max: o(s, r) };
}
function Ei(t, e) {
  return Object.assign(Object.create(t), e);
}
function Ec(t, e = [""], n, i, s = () => t[0]) {
  const r = n || t;
  typeof i > "u" && (i = Kp("_fallback", t));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: r,
    _fallback: i,
    _getTarget: s,
    override: (l) => Ec([l, ...t], e, r, i),
  };
  return new Proxy(o, {
    deleteProperty(l, a) {
      return delete l[a], delete l._keys, delete t[0][a], !0;
    },
    get(l, a) {
      return Up(l, a, () => tx(a, e, t, l));
    },
    getOwnPropertyDescriptor(l, a) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], a);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t[0]);
    },
    has(l, a) {
      return cd(l).includes(a);
    },
    ownKeys(l) {
      return cd(l);
    },
    set(l, a, c) {
      const u = l._storage || (l._storage = s());
      return (l[a] = u[a] = c), delete l._keys, !0;
    },
  });
}
function Si(t, e, n, i) {
  const s = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: n,
    _stack: new Set(),
    _descriptors: Vp(t, i),
    setContext: (r) => Si(t, r, n, i),
    override: (r) => Si(t.override(r), e, n, i),
  };
  return new Proxy(s, {
    deleteProperty(r, o) {
      return delete r[o], delete t[o], !0;
    },
    get(r, o, l) {
      return Up(r, o, () => Gv(r, o, l));
    },
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys
        ? Reflect.has(t, o)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(t, o);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t);
    },
    has(r, o) {
      return Reflect.has(t, o);
    },
    ownKeys() {
      return Reflect.ownKeys(t);
    },
    set(r, o, l) {
      return (t[o] = l), delete r[o], !0;
    },
  });
}
function Vp(t, e = { scriptable: !0, indexable: !0 }) {
  const {
    _scriptable: n = e.scriptable,
    _indexable: i = e.indexable,
    _allKeys: s = e.allKeys,
  } = t;
  return {
    allKeys: s,
    scriptable: n,
    indexable: i,
    isScriptable: dn(n) ? n : () => n,
    isIndexable: dn(i) ? i : () => i,
  };
}
const Xv = (t, e) => (t ? t + wc(e) : e),
  Dc = (t, e) =>
    V(e) &&
    t !== "adapters" &&
    (Object.getPrototypeOf(e) === null || e.constructor === Object);
function Up(t, e, n) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const i = n();
  return (t[e] = i), i;
}
function Gv(t, e, n) {
  const { _proxy: i, _context: s, _subProxy: r, _descriptors: o } = t;
  let l = i[e];
  return (
    dn(l) && o.isScriptable(e) && (l = Qv(e, l, t, n)),
    ge(l) && l.length && (l = Zv(e, l, t, o.isIndexable)),
    Dc(e, l) && (l = Si(l, s, r && r[e], o)),
    l
  );
}
function Qv(t, e, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _stack: l } = n;
  if (l.has(t))
    throw new Error(
      "Recursion detected: " + Array.from(l).join("->") + "->" + t
    );
  l.add(t);
  let a = e(r, o || i);
  return l.delete(t), Dc(t, a) && (a = Tc(s._scopes, s, t, a)), a;
}
function Zv(t, e, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: l } = n;
  if (typeof r.index < "u" && i(t)) return e[r.index % e.length];
  if (V(e[0])) {
    const a = e,
      c = s._scopes.filter((u) => u !== a);
    e = [];
    for (const u of a) {
      const d = Tc(c, s, t, u);
      e.push(Si(d, r, o && o[t], l));
    }
  }
  return e;
}
function Yp(t, e, n) {
  return dn(t) ? t(e, n) : t;
}
const qv = (t, e) => (t === !0 ? e : typeof t == "string" ? jn(e, t) : void 0);
function Jv(t, e, n, i, s) {
  for (const r of e) {
    const o = qv(n, r);
    if (o) {
      t.add(o);
      const l = Yp(o._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== i) return l;
    } else if (o === !1 && typeof i < "u" && n !== i) return null;
  }
  return !1;
}
function Tc(t, e, n, i) {
  const s = e._rootScopes,
    r = Yp(e._fallback, n, i),
    o = [...t, ...s],
    l = new Set();
  l.add(i);
  let a = ad(l, o, n, r || n, i);
  return a === null ||
    (typeof r < "u" && r !== n && ((a = ad(l, o, r, a, i)), a === null))
    ? !1
    : Ec(Array.from(l), [""], s, r, () => ex(e, n, i));
}
function ad(t, e, n, i, s) {
  for (; n; ) n = Jv(t, e, n, i, s);
  return n;
}
function ex(t, e, n) {
  const i = t._getTarget();
  e in i || (i[e] = {});
  const s = i[e];
  return ge(s) && V(n) ? n : s || {};
}
function tx(t, e, n, i) {
  let s;
  for (const r of e)
    if (((s = Kp(Xv(r, t), n)), typeof s < "u"))
      return Dc(t, s) ? Tc(n, i, t, s) : s;
}
function Kp(t, e) {
  for (const n of e) {
    if (!n) continue;
    const i = n[t];
    if (typeof i < "u") return i;
  }
}
function cd(t) {
  let e = t._keys;
  return e || (e = t._keys = nx(t._scopes)), e;
}
function nx(t) {
  const e = new Set();
  for (const n of t)
    for (const i of Object.keys(n).filter((s) => !s.startsWith("_"))) e.add(i);
  return Array.from(e);
}
function Oc() {
  return typeof window < "u" && typeof document < "u";
}
function Lc(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function oo(t, e, n) {
  let i;
  return (
    typeof t == "string"
      ? ((i = parseInt(t, 10)),
        t.indexOf("%") !== -1 && (i = (i / 100) * e.parentNode[n]))
      : (i = t),
    i
  );
}
const Po = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function ix(t, e) {
  return Po(t).getPropertyValue(e);
}
const sx = ["top", "right", "bottom", "left"];
function En(t, e, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const r = sx[s];
    i[r] = parseFloat(t[e + "-" + r + n]) || 0;
  }
  return (i.width = i.left + i.right), (i.height = i.top + i.bottom), i;
}
const rx = (t, e, n) => (t > 0 || e > 0) && (!n || !n.shadowRoot);
function ox(t, e) {
  const n = t.touches,
    i = n && n.length ? n[0] : t,
    { offsetX: s, offsetY: r } = i;
  let o = !1,
    l,
    a;
  if (rx(s, r, t.target)) (l = s), (a = r);
  else {
    const c = e.getBoundingClientRect();
    (l = i.clientX - c.left), (a = i.clientY - c.top), (o = !0);
  }
  return { x: l, y: a, box: o };
}
function wn(t, e) {
  if ("native" in t) return t;
  const { canvas: n, currentDevicePixelRatio: i } = e,
    s = Po(n),
    r = s.boxSizing === "border-box",
    o = En(s, "padding"),
    l = En(s, "border", "width"),
    { x: a, y: c, box: u } = ox(t, n),
    d = o.left + (u && l.left),
    f = o.top + (u && l.top);
  let { width: m, height: v } = e;
  return (
    r && ((m -= o.width + l.width), (v -= o.height + l.height)),
    {
      x: Math.round((((a - d) / m) * n.width) / i),
      y: Math.round((((c - f) / v) * n.height) / i),
    }
  );
}
function lx(t, e, n) {
  let i, s;
  if (e === void 0 || n === void 0) {
    const r = t && Lc(t);
    if (!r) (e = t.clientWidth), (n = t.clientHeight);
    else {
      const o = r.getBoundingClientRect(),
        l = Po(r),
        a = En(l, "border", "width"),
        c = En(l, "padding");
      (e = o.width - c.width - a.width),
        (n = o.height - c.height - a.height),
        (i = oo(l.maxWidth, r, "clientWidth")),
        (s = oo(l.maxHeight, r, "clientHeight"));
    }
  }
  return { width: e, height: n, maxWidth: i || no, maxHeight: s || no };
}
const or = (t) => Math.round(t * 10) / 10;
function ax(t, e, n, i) {
  const s = Po(t),
    r = En(s, "margin"),
    o = oo(s.maxWidth, t, "clientWidth") || no,
    l = oo(s.maxHeight, t, "clientHeight") || no,
    a = lx(t, e, n);
  let { width: c, height: u } = a;
  if (s.boxSizing === "content-box") {
    const f = En(s, "border", "width"),
      m = En(s, "padding");
    (c -= m.width + f.width), (u -= m.height + f.height);
  }
  return (
    (c = Math.max(0, c - r.width)),
    (u = Math.max(0, i ? c / i : u - r.height)),
    (c = or(Math.min(c, o, a.maxWidth))),
    (u = or(Math.min(u, l, a.maxHeight))),
    c && !u && (u = or(c / 2)),
    (e !== void 0 || n !== void 0) &&
      i &&
      a.height &&
      u > a.height &&
      ((u = a.height), (c = or(Math.floor(u * i)))),
    { width: c, height: u }
  );
}
function ud(t, e, n) {
  const i = e || 1,
    s = Math.floor(t.height * i),
    r = Math.floor(t.width * i);
  (t.height = Math.floor(t.height)), (t.width = Math.floor(t.width));
  const o = t.canvas;
  return (
    o.style &&
      (n || (!o.style.height && !o.style.width)) &&
      ((o.style.height = `${t.height}px`), (o.style.width = `${t.width}px`)),
    t.currentDevicePixelRatio !== i || o.height !== s || o.width !== r
      ? ((t.currentDevicePixelRatio = i),
        (o.height = s),
        (o.width = r),
        t.ctx.setTransform(i, 0, 0, i, 0, 0),
        !0)
      : !1
  );
}
const cx = (function () {
  let t = !1;
  try {
    const e = {
      get passive() {
        return (t = !0), !1;
      },
    };
    Oc() &&
      (window.addEventListener("test", null, e),
      window.removeEventListener("test", null, e));
  } catch {}
  return t;
})();
function dd(t, e) {
  const n = ix(t, e),
    i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
const ux = function (t, e) {
    return {
      x(n) {
        return t + t + e - n;
      },
      setWidth(n) {
        e = n;
      },
      textAlign(n) {
        return n === "center" ? n : n === "right" ? "left" : "right";
      },
      xPlus(n, i) {
        return n - i;
      },
      leftForLtr(n, i) {
        return n - i;
      },
    };
  },
  dx = function () {
    return {
      x(t) {
        return t;
      },
      setWidth(t) {},
      textAlign(t) {
        return t;
      },
      xPlus(t, e) {
        return t + e;
      },
      leftForLtr(t, e) {
        return t;
      },
    };
  };
function hi(t, e, n) {
  return t ? ux(e, n) : dx();
}
function Xp(t, e) {
  let n, i;
  (e === "ltr" || e === "rtl") &&
    ((n = t.canvas.style),
    (i = [n.getPropertyValue("direction"), n.getPropertyPriority("direction")]),
    n.setProperty("direction", e, "important"),
    (t.prevTextDirection = i));
}
function Gp(t, e) {
  e !== void 0 &&
    (delete t.prevTextDirection,
    t.canvas.style.setProperty("direction", e[0], e[1]));
}
/*!
 * Chart.js v4.4.4
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */ class fx {
  constructor() {
    (this._request = null),
      (this._charts = new Map()),
      (this._running = !1),
      (this._lastDate = void 0);
  }
  _notify(e, n, i, s) {
    const r = n.listeners[s],
      o = n.duration;
    r.forEach((l) =>
      l({
        chart: e,
        initial: n.initial,
        numSteps: o,
        currentStep: Math.min(i - n.start, o),
      })
    );
  }
  _refresh() {
    this._request ||
      ((this._running = !0),
      (this._request = jp.call(window, () => {
        this._update(),
          (this._request = null),
          this._running && this._refresh();
      })));
  }
  _update(e = Date.now()) {
    let n = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length) return;
      const r = i.items;
      let o = r.length - 1,
        l = !1,
        a;
      for (; o >= 0; --o)
        (a = r[o]),
          a._active
            ? (a._total > i.duration && (i.duration = a._total),
              a.tick(e),
              (l = !0))
            : ((r[o] = r[r.length - 1]), r.pop());
      l && (s.draw(), this._notify(s, i, e, "progress")),
        r.length ||
          ((i.running = !1),
          this._notify(s, i, e, "complete"),
          (i.initial = !1)),
        (n += r.length);
    }),
      (this._lastDate = e),
      n === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const n = this._charts;
    let i = n.get(e);
    return (
      i ||
        ((i = {
          running: !1,
          initial: !0,
          items: [],
          listeners: { complete: [], progress: [] },
        }),
        n.set(e, i)),
      i
    );
  }
  listen(e, n, i) {
    this._getAnims(e).listeners[n].push(i);
  }
  add(e, n) {
    !n || !n.length || this._getAnims(e).items.push(...n);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const n = this._charts.get(e);
    n &&
      ((n.running = !0),
      (n.start = Date.now()),
      (n.duration = n.items.reduce((i, s) => Math.max(i, s._duration), 0)),
      this._refresh());
  }
  running(e) {
    if (!this._running) return !1;
    const n = this._charts.get(e);
    return !(!n || !n.running || !n.items.length);
  }
  stop(e) {
    const n = this._charts.get(e);
    if (!n || !n.items.length) return;
    const i = n.items;
    let s = i.length - 1;
    for (; s >= 0; --s) i[s].cancel();
    (n.items = []), this._notify(e, n, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var Pt = new fx();
const fd = "transparent",
  hx = {
    boolean(t, e, n) {
      return n > 0.5 ? e : t;
    },
    color(t, e, n) {
      const i = id(t || fd),
        s = i.valid && id(e || fd);
      return s && s.valid ? s.mix(i, n).hexString() : e;
    },
    number(t, e, n) {
      return t + (e - t) * n;
    },
  };
class px {
  constructor(e, n, i, s) {
    const r = n[i];
    s = rr([e.to, s, r, e.from]);
    const o = rr([e.from, r, s]);
    (this._active = !0),
      (this._fn = e.fn || hx[e.type || typeof o]),
      (this._easing = os[e.easing] || os.linear),
      (this._start = Math.floor(Date.now() + (e.delay || 0))),
      (this._duration = this._total = Math.floor(e.duration)),
      (this._loop = !!e.loop),
      (this._target = n),
      (this._prop = i),
      (this._from = o),
      (this._to = s),
      (this._promises = void 0);
  }
  active() {
    return this._active;
  }
  update(e, n, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop],
        r = i - this._start,
        o = this._duration - r;
      (this._start = i),
        (this._duration = Math.floor(Math.max(o, e.duration))),
        (this._total += r),
        (this._loop = !!e.loop),
        (this._to = rr([e.to, n, s, e.from])),
        (this._from = rr([e.from, s, n]));
    }
  }
  cancel() {
    this._active &&
      (this.tick(Date.now()), (this._active = !1), this._notify(!1));
  }
  tick(e) {
    const n = e - this._start,
      i = this._duration,
      s = this._prop,
      r = this._from,
      o = this._loop,
      l = this._to;
    let a;
    if (((this._active = r !== l && (o || n < i)), !this._active)) {
      (this._target[s] = l), this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = r;
      return;
    }
    (a = (n / i) % 2),
      (a = o && a > 1 ? 2 - a : a),
      (a = this._easing(Math.min(1, Math.max(0, a)))),
      (this._target[s] = this._fn(r, l, a));
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((n, i) => {
      e.push({ res: n, rej: i });
    });
  }
  _notify(e) {
    const n = e ? "res" : "rej",
      i = this._promises || [];
    for (let s = 0; s < i.length; s++) i[s][n]();
  }
}
class Qp {
  constructor(e, n) {
    (this._chart = e), (this._properties = new Map()), this.configure(n);
  }
  configure(e) {
    if (!V(e)) return;
    const n = Object.keys(ue.animation),
      i = this._properties;
    Object.getOwnPropertyNames(e).forEach((s) => {
      const r = e[s];
      if (!V(r)) return;
      const o = {};
      for (const l of n) o[l] = r[l];
      ((ge(r.properties) && r.properties) || [s]).forEach((l) => {
        (l === s || !i.has(l)) && i.set(l, o);
      });
    });
  }
  _animateOptions(e, n) {
    const i = n.options,
      s = mx(e, i);
    if (!s) return [];
    const r = this._createAnimations(s, i);
    return (
      i.$shared &&
        gx(e.options.$animations, i).then(
          () => {
            e.options = i;
          },
          () => {}
        ),
      r
    );
  }
  _createAnimations(e, n) {
    const i = this._properties,
      s = [],
      r = e.$animations || (e.$animations = {}),
      o = Object.keys(n),
      l = Date.now();
    let a;
    for (a = o.length - 1; a >= 0; --a) {
      const c = o[a];
      if (c.charAt(0) === "$") continue;
      if (c === "options") {
        s.push(...this._animateOptions(e, n));
        continue;
      }
      const u = n[c];
      let d = r[c];
      const f = i.get(c);
      if (d)
        if (f && d.active()) {
          d.update(f, u, l);
          continue;
        } else d.cancel();
      if (!f || !f.duration) {
        e[c] = u;
        continue;
      }
      (r[c] = d = new px(f, e, c, u)), s.push(d);
    }
    return s;
  }
  update(e, n) {
    if (this._properties.size === 0) {
      Object.assign(e, n);
      return;
    }
    const i = this._createAnimations(e, n);
    if (i.length) return Pt.add(this._chart, i), !0;
  }
}
function gx(t, e) {
  const n = [],
    i = Object.keys(e);
  for (let s = 0; s < i.length; s++) {
    const r = t[i[s]];
    r && r.active() && n.push(r.wait());
  }
  return Promise.all(n);
}
function mx(t, e) {
  if (!e) return;
  let n = t.options;
  if (!n) {
    t.options = e;
    return;
  }
  return (
    n.$shared &&
      (t.options = n = Object.assign({}, n, { $shared: !1, $animations: {} })),
    n
  );
}
function hd(t, e) {
  const n = (t && t.options) || {},
    i = n.reverse,
    s = n.min === void 0 ? e : 0,
    r = n.max === void 0 ? e : 0;
  return { start: i ? r : s, end: i ? s : r };
}
function yx(t, e, n) {
  if (n === !1) return !1;
  const i = hd(t, n),
    s = hd(e, n);
  return { top: s.end, right: i.end, bottom: s.start, left: i.start };
}
function vx(t) {
  let e, n, i, s;
  return (
    V(t)
      ? ((e = t.top), (n = t.right), (i = t.bottom), (s = t.left))
      : (e = n = i = s = t),
    { top: e, right: n, bottom: i, left: s, disabled: t === !1 }
  );
}
function Zp(t, e) {
  const n = [],
    i = t._getSortedDatasetMetas(e);
  let s, r;
  for (s = 0, r = i.length; s < r; ++s) n.push(i[s].index);
  return n;
}
function pd(t, e, n, i = {}) {
  const s = t.keys,
    r = i.mode === "single";
  let o, l, a, c;
  if (e !== null) {
    for (o = 0, l = s.length; o < l; ++o) {
      if (((a = +s[o]), a === n)) {
        if (i.all) continue;
        break;
      }
      (c = t.values[a]), rt(c) && (r || e === 0 || an(e) === an(c)) && (e += c);
    }
    return e;
  }
}
function xx(t, e) {
  const { iScale: n, vScale: i } = e,
    s = n.axis === "x" ? "x" : "y",
    r = i.axis === "x" ? "x" : "y",
    o = Object.keys(t),
    l = new Array(o.length);
  let a, c, u;
  for (a = 0, c = o.length; a < c; ++a)
    (u = o[a]), (l[a] = { [s]: u, [r]: t[u] });
  return l;
}
function gd(t, e) {
  const n = t && t.options.stacked;
  return n || (n === void 0 && e.stack !== void 0);
}
function _x(t, e, n) {
  return `${t.id}.${e.id}.${n.stack || n.type}`;
}
function wx(t) {
  const { min: e, max: n, minDefined: i, maxDefined: s } = t.getUserBounds();
  return {
    min: i ? e : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY,
  };
}
function Sx(t, e, n) {
  const i = t[e] || (t[e] = {});
  return i[n] || (i[n] = {});
}
function md(t, e, n, i) {
  for (const s of e.getMatchingVisibleMetas(i).reverse()) {
    const r = t[s.index];
    if ((n && r > 0) || (!n && r < 0)) return s.index;
  }
  return null;
}
function yd(t, e) {
  const { chart: n, _cachedMeta: i } = t,
    s = n._stacks || (n._stacks = {}),
    { iScale: r, vScale: o, index: l } = i,
    a = r.axis,
    c = o.axis,
    u = _x(r, o, i),
    d = e.length;
  let f;
  for (let m = 0; m < d; ++m) {
    const v = e[m],
      { [a]: g, [c]: x } = v,
      p = v._stacks || (v._stacks = {});
    (f = p[c] = Sx(s, u, g)),
      (f[l] = x),
      (f._top = md(f, o, !0, i.type)),
      (f._bottom = md(f, o, !1, i.type));
    const h = f._visualValues || (f._visualValues = {});
    h[l] = x;
  }
}
function al(t, e) {
  const n = t.scales;
  return Object.keys(n)
    .filter((i) => n[i].axis === e)
    .shift();
}
function kx(t, e) {
  return Ei(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset",
  });
}
function bx(t, e, n) {
  return Ei(t, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: e,
    mode: "default",
    type: "data",
  });
}
function Ni(t, e) {
  const n = t.controller.index,
    i = t.vScale && t.vScale.axis;
  if (i) {
    e = e || t._parsed;
    for (const s of e) {
      const r = s._stacks;
      if (!r || r[i] === void 0 || r[i][n] === void 0) return;
      delete r[i][n],
        r[i]._visualValues !== void 0 &&
          r[i]._visualValues[n] !== void 0 &&
          delete r[i]._visualValues[n];
    }
  }
}
const cl = (t) => t === "reset" || t === "none",
  vd = (t, e) => (e ? t : Object.assign({}, t)),
  Cx = (t, e, n) =>
    t && !e.hidden && e._stacked && { keys: Zp(n, !0), values: null };
class pi {
  constructor(e, n) {
    (this.chart = e),
      (this._ctx = e.ctx),
      (this.index = n),
      (this._cachedDataOpts = {}),
      (this._cachedMeta = this.getMeta()),
      (this._type = this._cachedMeta.type),
      (this.options = void 0),
      (this._parsing = !1),
      (this._data = void 0),
      (this._objectData = void 0),
      (this._sharedOptions = void 0),
      (this._drawStart = void 0),
      (this._drawCount = void 0),
      (this.enableOptionSharing = !1),
      (this.supportsDecimation = !1),
      (this.$context = void 0),
      (this._syncList = []),
      (this.datasetElementType = new.target.datasetElementType),
      (this.dataElementType = new.target.dataElementType),
      this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(),
      this.linkScales(),
      (e._stacked = gd(e.vScale, e)),
      this.addElements(),
      this.options.fill &&
        !this.chart.isPluginEnabled("filler") &&
        console.warn(
          "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options"
        );
  }
  updateIndex(e) {
    this.index !== e && Ni(this._cachedMeta), (this.index = e);
  }
  linkScales() {
    const e = this.chart,
      n = this._cachedMeta,
      i = this.getDataset(),
      s = (d, f, m, v) => (d === "x" ? f : d === "r" ? v : m),
      r = (n.xAxisID = K(i.xAxisID, al(e, "x"))),
      o = (n.yAxisID = K(i.yAxisID, al(e, "y"))),
      l = (n.rAxisID = K(i.rAxisID, al(e, "r"))),
      a = n.indexAxis,
      c = (n.iAxisID = s(a, r, o, l)),
      u = (n.vAxisID = s(a, o, r, l));
    (n.xScale = this.getScaleForId(r)),
      (n.yScale = this.getScaleForId(o)),
      (n.rScale = this.getScaleForId(l)),
      (n.iScale = this.getScaleForId(c)),
      (n.vScale = this.getScaleForId(u));
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(e) {
    return this.chart.scales[e];
  }
  _getOtherScale(e) {
    const n = this._cachedMeta;
    return e === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && ed(this._data, this), e._stacked && Ni(e);
  }
  _dataCheck() {
    const e = this.getDataset(),
      n = e.data || (e.data = []),
      i = this._data;
    if (V(n)) {
      const s = this._cachedMeta;
      this._data = xx(n, s);
    } else if (i !== n) {
      if (i) {
        ed(i, this);
        const s = this._cachedMeta;
        Ni(s), (s._parsed = []);
      }
      n && Object.isExtensible(n) && Ev(n, this),
        (this._syncList = []),
        (this._data = n);
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(),
      this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const n = this._cachedMeta,
      i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const r = n._stacked;
    (n._stacked = gd(n.vScale, n)),
      n.stack !== i.stack && ((s = !0), Ni(n), (n.stack = i.stack)),
      this._resyncElements(e),
      (s || r !== n._stacked) && yd(this, n._parsed);
  }
  configure() {
    const e = this.chart.config,
      n = e.datasetScopeKeys(this._type),
      i = e.getOptionScopes(this.getDataset(), n, !0);
    (this.options = e.createResolver(i, this.getContext())),
      (this._parsing = this.options.parsing),
      (this._cachedDataOpts = {});
  }
  parse(e, n) {
    const { _cachedMeta: i, _data: s } = this,
      { iScale: r, _stacked: o } = i,
      l = r.axis;
    let a = e === 0 && n === s.length ? !0 : i._sorted,
      c = e > 0 && i._parsed[e - 1],
      u,
      d,
      f;
    if (this._parsing === !1) (i._parsed = s), (i._sorted = !0), (f = s);
    else {
      ge(s[e])
        ? (f = this.parseArrayData(i, s, e, n))
        : V(s[e])
        ? (f = this.parseObjectData(i, s, e, n))
        : (f = this.parsePrimitiveData(i, s, e, n));
      const m = () => d[l] === null || (c && d[l] < c[l]);
      for (u = 0; u < n; ++u)
        (i._parsed[u + e] = d = f[u]), a && (m() && (a = !1), (c = d));
      i._sorted = a;
    }
    o && yd(this, f);
  }
  parsePrimitiveData(e, n, i, s) {
    const { iScale: r, vScale: o } = e,
      l = r.axis,
      a = o.axis,
      c = r.getLabels(),
      u = r === o,
      d = new Array(s);
    let f, m, v;
    for (f = 0, m = s; f < m; ++f)
      (v = f + i),
        (d[f] = { [l]: u || r.parse(c[v], v), [a]: o.parse(n[v], v) });
    return d;
  }
  parseArrayData(e, n, i, s) {
    const { xScale: r, yScale: o } = e,
      l = new Array(s);
    let a, c, u, d;
    for (a = 0, c = s; a < c; ++a)
      (u = a + i),
        (d = n[u]),
        (l[a] = { x: r.parse(d[0], u), y: o.parse(d[1], u) });
    return l;
  }
  parseObjectData(e, n, i, s) {
    const { xScale: r, yScale: o } = e,
      { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing,
      c = new Array(s);
    let u, d, f, m;
    for (u = 0, d = s; u < d; ++u)
      (f = u + i),
        (m = n[f]),
        (c[u] = { x: r.parse(jn(m, l), f), y: o.parse(jn(m, a), f) });
    return c;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, n, i) {
    const s = this.chart,
      r = this._cachedMeta,
      o = n[e.axis],
      l = { keys: Zp(s, !0), values: n._stacks[e.axis]._visualValues };
    return pd(l, o, r.index, { mode: i });
  }
  updateRangeFromParsed(e, n, i, s) {
    const r = i[n.axis];
    let o = r === null ? NaN : r;
    const l = s && i._stacks[n.axis];
    s && l && ((s.values = l), (o = pd(s, r, this._cachedMeta.index))),
      (e.min = Math.min(e.min, o)),
      (e.max = Math.max(e.max, o));
  }
  getMinMax(e, n) {
    const i = this._cachedMeta,
      s = i._parsed,
      r = i._sorted && e === i.iScale,
      o = s.length,
      l = this._getOtherScale(e),
      a = Cx(n, i, this.chart),
      c = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
      { min: u, max: d } = wx(l);
    let f, m;
    function v() {
      m = s[f];
      const g = m[l.axis];
      return !rt(m[e.axis]) || u > g || d < g;
    }
    for (
      f = 0;
      f < o && !(!v() && (this.updateRangeFromParsed(c, e, m, a), r));
      ++f
    );
    if (r) {
      for (f = o - 1; f >= 0; --f)
        if (!v()) {
          this.updateRangeFromParsed(c, e, m, a);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(e) {
    const n = this._cachedMeta._parsed,
      i = [];
    let s, r, o;
    for (s = 0, r = n.length; s < r; ++s)
      (o = n[s][e.axis]), rt(o) && i.push(o);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta,
      i = n.iScale,
      s = n.vScale,
      r = this.getParsed(e);
    return {
      label: i ? "" + i.getLabelForValue(r[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(r[s.axis]) : "",
    };
  }
  _update(e) {
    const n = this._cachedMeta;
    this.update(e || "default"),
      (n._clip = vx(
        K(this.options.clip, yx(n.xScale, n.yScale, this.getMaxOverflow()))
      ));
  }
  update(e) {}
  draw() {
    const e = this._ctx,
      n = this.chart,
      i = this._cachedMeta,
      s = i.data || [],
      r = n.chartArea,
      o = [],
      l = this._drawStart || 0,
      a = this._drawCount || s.length - l,
      c = this.options.drawActiveElementsOnTop;
    let u;
    for (i.dataset && i.dataset.draw(e, r, l, a), u = l; u < l + a; ++u) {
      const d = s[u];
      d.hidden || (d.active && c ? o.push(d) : d.draw(e, r));
    }
    for (u = 0; u < o.length; ++u) o[u].draw(e, r);
  }
  getStyle(e, n) {
    const i = n ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(i)
      : this.resolveDataElementOptions(e || 0, i);
  }
  getContext(e, n, i) {
    const s = this.getDataset();
    let r;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[e];
      (r = o.$context || (o.$context = bx(this.getContext(), e, o))),
        (r.parsed = this.getParsed(e)),
        (r.raw = s.data[e]),
        (r.index = r.dataIndex = e);
    } else
      (r =
        this.$context ||
        (this.$context = kx(this.chart.getContext(), this.index))),
        (r.dataset = s),
        (r.index = r.datasetIndex = this.index);
    return (r.active = !!n), (r.mode = i), r;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, e);
  }
  _resolveElementOptions(e, n = "default", i) {
    const s = n === "active",
      r = this._cachedDataOpts,
      o = e + "-" + n,
      l = r[o],
      a = this.enableOptionSharing && Es(i);
    if (l) return vd(l, a);
    const c = this.chart.config,
      u = c.datasetElementScopeKeys(this._type, e),
      d = s ? [`${e}Hover`, "hover", e, ""] : [e, ""],
      f = c.getOptionScopes(this.getDataset(), u),
      m = Object.keys(ue.elements[e]),
      v = () => this.getContext(i, s, n),
      g = c.resolveNamedOptions(f, m, v, d);
    return g.$shared && ((g.$shared = a), (r[o] = Object.freeze(vd(g, a)))), g;
  }
  _resolveAnimations(e, n, i) {
    const s = this.chart,
      r = this._cachedDataOpts,
      o = `animation-${n}`,
      l = r[o];
    if (l) return l;
    let a;
    if (s.options.animation !== !1) {
      const u = this.chart.config,
        d = u.datasetAnimationScopeKeys(this._type, n),
        f = u.getOptionScopes(this.getDataset(), d);
      a = u.createResolver(f, this.getContext(e, i, n));
    }
    const c = new Qp(s, a && a.animations);
    return a && a._cacheable && (r[o] = Object.freeze(c)), c;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return (
        this._sharedOptions || (this._sharedOptions = Object.assign({}, e))
      );
  }
  includeOptions(e, n) {
    return !n || cl(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, n) {
    const i = this.resolveDataElementOptions(e, n),
      s = this._sharedOptions,
      r = this.getSharedOptions(i),
      o = this.includeOptions(n, r) || r !== s;
    return (
      this.updateSharedOptions(r, n, i), { sharedOptions: r, includeOptions: o }
    );
  }
  updateElement(e, n, i, s) {
    cl(s) ? Object.assign(e, i) : this._resolveAnimations(n, s).update(e, i);
  }
  updateSharedOptions(e, n, i) {
    e && !cl(n) && this._resolveAnimations(void 0, n).update(e, i);
  }
  _setStyle(e, n, i, s) {
    e.active = s;
    const r = this.getStyle(n, s);
    this._resolveAnimations(n, i, s).update(e, {
      options: (!s && this.getSharedOptions(r)) || r,
    });
  }
  removeHoverStyle(e, n, i) {
    this._setStyle(e, i, "active", !1);
  }
  setHoverStyle(e, n, i) {
    this._setStyle(e, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !0);
  }
  _resyncElements(e) {
    const n = this._data,
      i = this._cachedMeta.data;
    for (const [l, a, c] of this._syncList) this[l](a, c);
    this._syncList = [];
    const s = i.length,
      r = n.length,
      o = Math.min(r, s);
    o && this.parse(0, o),
      r > s
        ? this._insertElements(s, r - s, e)
        : r < s && this._removeElements(r, s - r);
  }
  _insertElements(e, n, i = !0) {
    const s = this._cachedMeta,
      r = s.data,
      o = e + n;
    let l;
    const a = (c) => {
      for (c.length += n, l = c.length - 1; l >= o; l--) c[l] = c[l - n];
    };
    for (a(r), l = e; l < o; ++l) r[l] = new this.dataElementType();
    this._parsing && a(s._parsed),
      this.parse(e, n),
      i && this.updateElements(r, e, n, "reset");
  }
  updateElements(e, n, i, s) {}
  _removeElements(e, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(e, n);
      i._stacked && Ni(i, s);
    }
    i.data.splice(e, n);
  }
  _sync(e) {
    if (this._parsing) this._syncList.push(e);
    else {
      const [n, i, s] = e;
      this[n](i, s);
    }
    this.chart._dataChanges.push([this.index, ...e]);
  }
  _onDataPush() {
    const e = arguments.length;
    this._sync(["_insertElements", this.getDataset().data.length - e, e]);
  }
  _onDataPop() {
    this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
  }
  _onDataShift() {
    this._sync(["_removeElements", 0, 1]);
  }
  _onDataSplice(e, n) {
    n && this._sync(["_removeElements", e, n]);
    const i = arguments.length - 2;
    i && this._sync(["_insertElements", e, i]);
  }
  _onDataUnshift() {
    this._sync(["_insertElements", 0, arguments.length]);
  }
}
F(pi, "defaults", {}),
  F(pi, "datasetElementType", null),
  F(pi, "dataElementType", null);
function Mx(t, e) {
  if (!t._cache.$bar) {
    const n = t.getMatchingVisibleMetas(e);
    let i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i = i.concat(n[s].controller.getAllParsedValues(t));
    t._cache.$bar = Ip(i.sort((s, r) => s - r));
  }
  return t._cache.$bar;
}
function Px(t) {
  const e = t.iScale,
    n = Mx(e, t.type);
  let i = e._length,
    s,
    r,
    o,
    l;
  const a = () => {
    o === 32767 ||
      o === -32768 ||
      (Es(l) && (i = Math.min(i, Math.abs(o - l) || i)), (l = o));
  };
  for (s = 0, r = n.length; s < r; ++s) (o = e.getPixelForValue(n[s])), a();
  for (l = void 0, s = 0, r = e.ticks.length; s < r; ++s)
    (o = e.getPixelForTick(s)), a();
  return i;
}
function Ex(t, e, n, i) {
  const s = n.barThickness;
  let r, o;
  return (
    ee(s)
      ? ((r = e.min * n.categoryPercentage), (o = n.barPercentage))
      : ((r = s * i), (o = 1)),
    { chunk: r / i, ratio: o, start: e.pixels[t] - r / 2 }
  );
}
function Dx(t, e, n, i) {
  const s = e.pixels,
    r = s[t];
  let o = t > 0 ? s[t - 1] : null,
    l = t < s.length - 1 ? s[t + 1] : null;
  const a = n.categoryPercentage;
  o === null && (o = r - (l === null ? e.end - e.start : l - r)),
    l === null && (l = r + r - o);
  const c = r - ((r - Math.min(o, l)) / 2) * a;
  return {
    chunk: ((Math.abs(l - o) / 2) * a) / i,
    ratio: n.barPercentage,
    start: c,
  };
}
function Tx(t, e, n, i) {
  const s = n.parse(t[0], i),
    r = n.parse(t[1], i),
    o = Math.min(s, r),
    l = Math.max(s, r);
  let a = o,
    c = l;
  Math.abs(o) > Math.abs(l) && ((a = l), (c = o)),
    (e[n.axis] = c),
    (e._custom = { barStart: a, barEnd: c, start: s, end: r, min: o, max: l });
}
function qp(t, e, n, i) {
  return ge(t) ? Tx(t, e, n, i) : (e[n.axis] = n.parse(t, i)), e;
}
function xd(t, e, n, i) {
  const s = t.iScale,
    r = t.vScale,
    o = s.getLabels(),
    l = s === r,
    a = [];
  let c, u, d, f;
  for (c = n, u = n + i; c < u; ++c)
    (f = e[c]),
      (d = {}),
      (d[s.axis] = l || s.parse(o[c], c)),
      a.push(qp(f, d, r, c));
  return a;
}
function ul(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Ox(t, e, n) {
  return t !== 0 ? an(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= n ? 1 : -1);
}
function Lx(t) {
  let e, n, i, s, r;
  return (
    t.horizontal
      ? ((e = t.base > t.x), (n = "left"), (i = "right"))
      : ((e = t.base < t.y), (n = "bottom"), (i = "top")),
    e ? ((s = "end"), (r = "start")) : ((s = "start"), (r = "end")),
    { start: n, end: i, reverse: e, top: s, bottom: r }
  );
}
function Rx(t, e, n, i) {
  let s = e.borderSkipped;
  const r = {};
  if (!s) {
    t.borderSkipped = r;
    return;
  }
  if (s === !0) {
    t.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
    return;
  }
  const { start: o, end: l, reverse: a, top: c, bottom: u } = Lx(t);
  s === "middle" &&
    n &&
    ((t.enableBorderRadius = !0),
    (n._top || 0) === i
      ? (s = c)
      : (n._bottom || 0) === i
      ? (s = u)
      : ((r[_d(u, o, l, a)] = !0), (s = c))),
    (r[_d(s, o, l, a)] = !0),
    (t.borderSkipped = r);
}
function _d(t, e, n, i) {
  return i ? ((t = Ax(t, e, n)), (t = wd(t, n, e))) : (t = wd(t, e, n)), t;
}
function Ax(t, e, n) {
  return t === e ? n : t === n ? e : t;
}
function wd(t, e, n) {
  return t === "start" ? e : t === "end" ? n : t;
}
function Ix(t, { inflateAmount: e }, n) {
  t.inflateAmount = e === "auto" ? (n === 1 ? 0.33 : 0) : e;
}
class Pr extends pi {
  parsePrimitiveData(e, n, i, s) {
    return xd(e, n, i, s);
  }
  parseArrayData(e, n, i, s) {
    return xd(e, n, i, s);
  }
  parseObjectData(e, n, i, s) {
    const { iScale: r, vScale: o } = e,
      { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing,
      c = r.axis === "x" ? l : a,
      u = o.axis === "x" ? l : a,
      d = [];
    let f, m, v, g;
    for (f = i, m = i + s; f < m; ++f)
      (g = n[f]),
        (v = {}),
        (v[r.axis] = r.parse(jn(g, c), f)),
        d.push(qp(jn(g, u), v, o, f));
    return d;
  }
  updateRangeFromParsed(e, n, i, s) {
    super.updateRangeFromParsed(e, n, i, s);
    const r = i._custom;
    r &&
      n === this._cachedMeta.vScale &&
      ((e.min = Math.min(e.min, r.min)), (e.max = Math.max(e.max, r.max)));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta,
      { iScale: i, vScale: s } = n,
      r = this.getParsed(e),
      o = r._custom,
      l = ul(o)
        ? "[" + o.start + ", " + o.end + "]"
        : "" + s.getLabelForValue(r[s.axis]);
    return { label: "" + i.getLabelForValue(r[i.axis]), value: l };
  }
  initialize() {
    (this.enableOptionSharing = !0), super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, e);
  }
  updateElements(e, n, i, s) {
    const r = s === "reset",
      {
        index: o,
        _cachedMeta: { vScale: l },
      } = this,
      a = l.getBasePixel(),
      c = l.isHorizontal(),
      u = this._getRuler(),
      { sharedOptions: d, includeOptions: f } = this._getSharedOptions(n, s);
    for (let m = n; m < n + i; m++) {
      const v = this.getParsed(m),
        g =
          r || ee(v[l.axis])
            ? { base: a, head: a }
            : this._calculateBarValuePixels(m),
        x = this._calculateBarIndexPixels(m, u),
        p = (v._stacks || {})[l.axis],
        h = {
          horizontal: c,
          base: g.base,
          enableBorderRadius:
            !p || ul(v._custom) || o === p._top || o === p._bottom,
          x: c ? g.head : x.center,
          y: c ? x.center : g.head,
          height: c ? x.size : Math.abs(g.size),
          width: c ? Math.abs(g.size) : x.size,
        };
      f &&
        (h.options =
          d || this.resolveDataElementOptions(m, e[m].active ? "active" : s));
      const y = h.options || e[m].options;
      Rx(h, y, p, o), Ix(h, y, u.ratio), this.updateElement(e[m], m, h, s);
    }
  }
  _getStacks(e, n) {
    const { iScale: i } = this._cachedMeta,
      s = i
        .getMatchingVisibleMetas(this._type)
        .filter((u) => u.controller.options.grouped),
      r = i.options.stacked,
      o = [],
      l = this._cachedMeta.controller.getParsed(n),
      a = l && l[i.axis],
      c = (u) => {
        const d = u._parsed.find((m) => m[i.axis] === a),
          f = d && d[u.vScale.axis];
        if (ee(f) || isNaN(f)) return !0;
      };
    for (const u of s)
      if (
        !(n !== void 0 && c(u)) &&
        ((r === !1 ||
          o.indexOf(u.stack) === -1 ||
          (r === void 0 && u.stack === void 0)) &&
          o.push(u.stack),
        u.index === e)
      )
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getStackIndex(e, n, i) {
    const s = this._getStacks(e, i),
      r = n !== void 0 ? s.indexOf(n) : -1;
    return r === -1 ? s.length - 1 : r;
  }
  _getRuler() {
    const e = this.options,
      n = this._cachedMeta,
      i = n.iScale,
      s = [];
    let r, o;
    for (r = 0, o = n.data.length; r < o; ++r)
      s.push(i.getPixelForValue(this.getParsed(r)[i.axis], r));
    const l = e.barThickness;
    return {
      min: l || Px(n),
      pixels: s,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: e.grouped,
      ratio: l ? 1 : e.categoryPercentage * e.barPercentage,
    };
  }
  _calculateBarValuePixels(e) {
    const {
        _cachedMeta: { vScale: n, _stacked: i, index: s },
        options: { base: r, minBarLength: o },
      } = this,
      l = r || 0,
      a = this.getParsed(e),
      c = a._custom,
      u = ul(c);
    let d = a[n.axis],
      f = 0,
      m = i ? this.applyStack(n, a, i) : d,
      v,
      g;
    m !== d && ((f = m - d), (m = d)),
      u &&
        ((d = c.barStart),
        (m = c.barEnd - c.barStart),
        d !== 0 && an(d) !== an(c.barEnd) && (f = 0),
        (f += d));
    const x = !ee(r) && !u ? r : f;
    let p = n.getPixelForValue(x);
    if (
      (this.chart.getDataVisibility(e)
        ? (v = n.getPixelForValue(f + m))
        : (v = p),
      (g = v - p),
      Math.abs(g) < o)
    ) {
      (g = Ox(g, n, l) * o), d === l && (p -= g / 2);
      const h = n.getPixelForDecimal(0),
        y = n.getPixelForDecimal(1),
        _ = Math.min(h, y),
        w = Math.max(h, y);
      (p = Math.max(Math.min(p, w), _)),
        (v = p + g),
        i &&
          !u &&
          (a._stacks[n.axis]._visualValues[s] =
            n.getValueForPixel(v) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const h = (an(g) * n.getLineWidthForValue(l)) / 2;
      (p += h), (g -= h);
    }
    return { size: g, base: p, head: v, center: v + g / 2 };
  }
  _calculateBarIndexPixels(e, n) {
    const i = n.scale,
      s = this.options,
      r = s.skipNull,
      o = K(s.maxBarThickness, 1 / 0);
    let l, a;
    if (n.grouped) {
      const c = r ? this._getStackCount(e) : n.stackCount,
        u = s.barThickness === "flex" ? Dx(e, n, s, c) : Ex(e, n, s, c),
        d = this._getStackIndex(
          this.index,
          this._cachedMeta.stack,
          r ? e : void 0
        );
      (l = u.start + u.chunk * d + u.chunk / 2),
        (a = Math.min(o, u.chunk * u.ratio));
    } else
      (l = i.getPixelForValue(this.getParsed(e)[i.axis], e)),
        (a = Math.min(o, n.min * n.ratio));
    return { base: l - a / 2, head: l + a / 2, center: l, size: a };
  }
  draw() {
    const e = this._cachedMeta,
      n = e.vScale,
      i = e.data,
      s = i.length;
    let r = 0;
    for (; r < s; ++r)
      this.getParsed(r)[n.axis] !== null &&
        !i[r].hidden &&
        i[r].draw(this._ctx);
  }
}
F(Pr, "id", "bar"),
  F(Pr, "defaults", {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "base", "width", "height"],
      },
    },
  }),
  F(Pr, "overrides", {
    scales: {
      _index_: { type: "category", offset: !0, grid: { offset: !0 } },
      _value_: { type: "linear", beginAtZero: !0 },
    },
  });
function jx(t, e, n) {
  let i = 1,
    s = 1,
    r = 0,
    o = 0;
  if (e < fe) {
    const l = t,
      a = l + e,
      c = Math.cos(l),
      u = Math.sin(l),
      d = Math.cos(a),
      f = Math.sin(a),
      m = (y, _, w) => (so(y, l, a, !0) ? 1 : Math.max(_, _ * n, w, w * n)),
      v = (y, _, w) => (so(y, l, a, !0) ? -1 : Math.min(_, _ * n, w, w * n)),
      g = m(0, c, d),
      x = m(ye, u, f),
      p = v(he, c, d),
      h = v(he + ye, u, f);
    (i = (g - p) / 2),
      (s = (x - h) / 2),
      (r = -(g + p) / 2),
      (o = -(x + h) / 2);
  }
  return { ratioX: i, ratioY: s, offsetX: r, offsetY: o };
}
class si extends pi {
  constructor(e, n) {
    super(e, n),
      (this.enableOptionSharing = !0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.offsetX = void 0),
      (this.offsetY = void 0);
  }
  linkScales() {}
  parse(e, n) {
    const i = this.getDataset().data,
      s = this._cachedMeta;
    if (this._parsing === !1) s._parsed = i;
    else {
      let r = (a) => +i[a];
      if (V(i[e])) {
        const { key: a = "value" } = this._parsing;
        r = (c) => +jn(i[c], a);
      }
      let o, l;
      for (o = e, l = e + n; o < l; ++o) s._parsed[o] = r(o);
    }
  }
  _getRotation() {
    return At(this.options.rotation - 90);
  }
  _getCircumference() {
    return At(this.options.circumference);
  }
  _getRotationExtents() {
    let e = fe,
      n = -fe;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (
        this.chart.isDatasetVisible(i) &&
        this.chart.getDatasetMeta(i).type === this._type
      ) {
        const s = this.chart.getDatasetMeta(i).controller,
          r = s._getRotation(),
          o = s._getCircumference();
        (e = Math.min(e, r)), (n = Math.max(n, r + o));
      }
    return { rotation: e, circumference: n - e };
  }
  update(e) {
    const n = this.chart,
      { chartArea: i } = n,
      s = this._cachedMeta,
      r = s.data,
      o =
        this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing,
      l = Math.max((Math.min(i.width, i.height) - o) / 2, 0),
      a = Math.min(hv(this.options.cutout, l), 1),
      c = this._getRingWeight(this.index),
      { circumference: u, rotation: d } = this._getRotationExtents(),
      { ratioX: f, ratioY: m, offsetX: v, offsetY: g } = jx(d, u, a),
      x = (i.width - o) / f,
      p = (i.height - o) / m,
      h = Math.max(Math.min(x, p) / 2, 0),
      y = Op(this.options.radius, h),
      _ = Math.max(y * a, 0),
      w = (y - _) / this._getVisibleDatasetWeightTotal();
    (this.offsetX = v * y),
      (this.offsetY = g * y),
      (s.total = this.calculateTotal()),
      (this.outerRadius = y - w * this._getRingWeightOffset(this.index)),
      (this.innerRadius = Math.max(this.outerRadius - w * c, 0)),
      this.updateElements(r, 0, r.length, e);
  }
  _circumference(e, n) {
    const i = this.options,
      s = this._cachedMeta,
      r = this._getCircumference();
    return (n && i.animation.animateRotate) ||
      !this.chart.getDataVisibility(e) ||
      s._parsed[e] === null ||
      s.data[e].hidden
      ? 0
      : this.calculateCircumference((s._parsed[e] * r) / fe);
  }
  updateElements(e, n, i, s) {
    const r = s === "reset",
      o = this.chart,
      l = o.chartArea,
      c = o.options.animation,
      u = (l.left + l.right) / 2,
      d = (l.top + l.bottom) / 2,
      f = r && c.animateScale,
      m = f ? 0 : this.innerRadius,
      v = f ? 0 : this.outerRadius,
      { sharedOptions: g, includeOptions: x } = this._getSharedOptions(n, s);
    let p = this._getRotation(),
      h;
    for (h = 0; h < n; ++h) p += this._circumference(h, r);
    for (h = n; h < n + i; ++h) {
      const y = this._circumference(h, r),
        _ = e[h],
        w = {
          x: u + this.offsetX,
          y: d + this.offsetY,
          startAngle: p,
          endAngle: p + y,
          circumference: y,
          outerRadius: v,
          innerRadius: m,
        };
      x &&
        (w.options =
          g || this.resolveDataElementOptions(h, _.active ? "active" : s)),
        (p += y),
        this.updateElement(_, h, w, s);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta,
      n = e.data;
    let i = 0,
      s;
    for (s = 0; s < n.length; s++) {
      const r = e._parsed[s];
      r !== null &&
        !isNaN(r) &&
        this.chart.getDataVisibility(s) &&
        !n[s].hidden &&
        (i += Math.abs(r));
    }
    return i;
  }
  calculateCircumference(e) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(e) ? fe * (Math.abs(e) / n) : 0;
  }
  getLabelAndValue(e) {
    const n = this._cachedMeta,
      i = this.chart,
      s = i.data.labels || [],
      r = bc(n._parsed[e], i.options.locale);
    return { label: s[e] || "", value: r };
  }
  getMaxBorderWidth(e) {
    let n = 0;
    const i = this.chart;
    let s, r, o, l, a;
    if (!e) {
      for (s = 0, r = i.data.datasets.length; s < r; ++s)
        if (i.isDatasetVisible(s)) {
          (o = i.getDatasetMeta(s)), (e = o.data), (l = o.controller);
          break;
        }
    }
    if (!e) return 0;
    for (s = 0, r = e.length; s < r; ++s)
      (a = l.resolveDataElementOptions(s)),
        a.borderAlign !== "inner" &&
          (n = Math.max(n, a.borderWidth || 0, a.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(e) {
    let n = 0;
    for (let i = 0, s = e.length; i < s; ++i) {
      const r = this.resolveDataElementOptions(i);
      n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(e) {
    let n = 0;
    for (let i = 0; i < e; ++i)
      this.chart.isDatasetVisible(i) && (n += this._getRingWeight(i));
    return n;
  }
  _getRingWeight(e) {
    return Math.max(K(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
F(si, "id", "doughnut"),
  F(si, "defaults", {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: { animateRotate: !0, animateScale: !1 },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing",
        ],
      },
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r",
  }),
  F(si, "descriptors", {
    _scriptable: (e) => e !== "spacing",
    _indexable: (e) =>
      e !== "spacing" &&
      !e.startsWith("borderDash") &&
      !e.startsWith("hoverBorderDash"),
  }),
  F(si, "overrides", {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(e) {
            const n = e.data;
            if (n.labels.length && n.datasets.length) {
              const {
                labels: { pointStyle: i, color: s },
              } = e.legend.options;
              return n.labels.map((r, o) => {
                const a = e.getDatasetMeta(0).controller.getStyle(o);
                return {
                  text: r,
                  fillStyle: a.backgroundColor,
                  strokeStyle: a.borderColor,
                  fontColor: s,
                  lineWidth: a.borderWidth,
                  pointStyle: i,
                  hidden: !e.getDataVisibility(o),
                  index: o,
                };
              });
            }
            return [];
          },
        },
        onClick(e, n, i) {
          i.chart.toggleDataVisibility(n.index), i.chart.update();
        },
      },
    },
  });
class ga extends si {}
F(ga, "id", "pie"),
  F(ga, "defaults", {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%",
  });
function vn() {
  throw new Error(
    "This method is not implemented: Check that a complete date adapter is provided."
  );
}
class Rc {
  constructor(e) {
    F(this, "options");
    this.options = e || {};
  }
  static override(e) {
    Object.assign(Rc.prototype, e);
  }
  init() {}
  formats() {
    return vn();
  }
  parse() {
    return vn();
  }
  format() {
    return vn();
  }
  add() {
    return vn();
  }
  diff() {
    return vn();
  }
  startOf() {
    return vn();
  }
  endOf() {
    return vn();
  }
}
var zx = { _date: Rc };
function Nx(t, e, n, i) {
  const { controller: s, data: r, _sorted: o } = t,
    l = s._cachedMeta.iScale;
  if (l && e === l.axis && e !== "r" && o && r.length) {
    const a = l._reversePixels ? Mv : ha;
    if (i) {
      if (s._sharedOptions) {
        const c = r[0],
          u = typeof c.getRange == "function" && c.getRange(e);
        if (u) {
          const d = a(r, e, n - u),
            f = a(r, e, n + u);
          return { lo: d.lo, hi: f.hi };
        }
      }
    } else return a(r, e, n);
  }
  return { lo: 0, hi: r.length - 1 };
}
function zs(t, e, n, i, s) {
  const r = t.getSortedVisibleDatasetMetas(),
    o = n[e];
  for (let l = 0, a = r.length; l < a; ++l) {
    const { index: c, data: u } = r[l],
      { lo: d, hi: f } = Nx(r[l], e, o, s);
    for (let m = d; m <= f; ++m) {
      const v = u[m];
      v.skip || i(v, c, m);
    }
  }
}
function Fx(t) {
  const e = t.indexOf("x") !== -1,
    n = t.indexOf("y") !== -1;
  return function (i, s) {
    const r = e ? Math.abs(i.x - s.x) : 0,
      o = n ? Math.abs(i.y - s.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function dl(t, e, n, i, s) {
  const r = [];
  return (
    (!s && !t.isPointInArea(e)) ||
      zs(
        t,
        n,
        e,
        function (l, a, c) {
          (!s && !Wp(l, t.chartArea, 0)) ||
            (l.inRange(e.x, e.y, i) &&
              r.push({ element: l, datasetIndex: a, index: c }));
        },
        !0
      ),
    r
  );
}
function Bx(t, e, n, i) {
  let s = [];
  function r(o, l, a) {
    const { startAngle: c, endAngle: u } = o.getProps(
        ["startAngle", "endAngle"],
        i
      ),
      { angle: d } = Rp(o, { x: e.x, y: e.y });
    so(d, c, u) && s.push({ element: o, datasetIndex: l, index: a });
  }
  return zs(t, n, e, r), s;
}
function $x(t, e, n, i, s, r) {
  let o = [];
  const l = Fx(n);
  let a = Number.POSITIVE_INFINITY;
  function c(u, d, f) {
    const m = u.inRange(e.x, e.y, s);
    if (i && !m) return;
    const v = u.getCenterPoint(s);
    if (!(!!r || t.isPointInArea(v)) && !m) return;
    const x = l(e, v);
    x < a
      ? ((o = [{ element: u, datasetIndex: d, index: f }]), (a = x))
      : x === a && o.push({ element: u, datasetIndex: d, index: f });
  }
  return zs(t, n, e, c), o;
}
function fl(t, e, n, i, s, r) {
  return !r && !t.isPointInArea(e)
    ? []
    : n === "r" && !i
    ? Bx(t, e, n, s)
    : $x(t, e, n, i, s, r);
}
function Sd(t, e, n, i, s) {
  const r = [],
    o = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return (
    zs(t, n, e, (a, c, u) => {
      a[o] &&
        a[o](e[n], s) &&
        (r.push({ element: a, datasetIndex: c, index: u }),
        (l = l || a.inRange(e.x, e.y, s)));
    }),
    i && !l ? [] : r
  );
}
var Wx = {
  evaluateInteractionItems: zs,
  modes: {
    index(t, e, n, i) {
      const s = wn(e, t),
        r = n.axis || "x",
        o = n.includeInvisible || !1,
        l = n.intersect ? dl(t, s, r, i, o) : fl(t, s, r, !1, i, o),
        a = [];
      return l.length
        ? (t.getSortedVisibleDatasetMetas().forEach((c) => {
            const u = l[0].index,
              d = c.data[u];
            d &&
              !d.skip &&
              a.push({ element: d, datasetIndex: c.index, index: u });
          }),
          a)
        : [];
    },
    dataset(t, e, n, i) {
      const s = wn(e, t),
        r = n.axis || "xy",
        o = n.includeInvisible || !1;
      let l = n.intersect ? dl(t, s, r, i, o) : fl(t, s, r, !1, i, o);
      if (l.length > 0) {
        const a = l[0].datasetIndex,
          c = t.getDatasetMeta(a).data;
        l = [];
        for (let u = 0; u < c.length; ++u)
          l.push({ element: c[u], datasetIndex: a, index: u });
      }
      return l;
    },
    point(t, e, n, i) {
      const s = wn(e, t),
        r = n.axis || "xy",
        o = n.includeInvisible || !1;
      return dl(t, s, r, i, o);
    },
    nearest(t, e, n, i) {
      const s = wn(e, t),
        r = n.axis || "xy",
        o = n.includeInvisible || !1;
      return fl(t, s, r, n.intersect, i, o);
    },
    x(t, e, n, i) {
      const s = wn(e, t);
      return Sd(t, s, "x", n.intersect, i);
    },
    y(t, e, n, i) {
      const s = wn(e, t);
      return Sd(t, s, "y", n.intersect, i);
    },
  },
};
const Jp = ["left", "top", "right", "bottom"];
function Fi(t, e) {
  return t.filter((n) => n.pos === e);
}
function kd(t, e) {
  return t.filter((n) => Jp.indexOf(n.pos) === -1 && n.box.axis === e);
}
function Bi(t, e) {
  return t.sort((n, i) => {
    const s = e ? i : n,
      r = e ? n : i;
    return s.weight === r.weight ? s.index - r.index : s.weight - r.weight;
  });
}
function Hx(t) {
  const e = [];
  let n, i, s, r, o, l;
  for (n = 0, i = (t || []).length; n < i; ++n)
    (s = t[n]),
      ({
        position: r,
        options: { stack: o, stackWeight: l = 1 },
      } = s),
      e.push({
        index: n,
        box: s,
        pos: r,
        horizontal: s.isHorizontal(),
        weight: s.weight,
        stack: o && r + o,
        stackWeight: l,
      });
  return e;
}
function Vx(t) {
  const e = {};
  for (const n of t) {
    const { stack: i, pos: s, stackWeight: r } = n;
    if (!i || !Jp.includes(s)) continue;
    const o = e[i] || (e[i] = { count: 0, placed: 0, weight: 0, size: 0 });
    o.count++, (o.weight += r);
  }
  return e;
}
function Ux(t, e) {
  const n = Vx(t),
    { vBoxMaxWidth: i, hBoxMaxHeight: s } = e;
  let r, o, l;
  for (r = 0, o = t.length; r < o; ++r) {
    l = t[r];
    const { fullSize: a } = l.box,
      c = n[l.stack],
      u = c && l.stackWeight / c.weight;
    l.horizontal
      ? ((l.width = u ? u * i : a && e.availableWidth), (l.height = s))
      : ((l.width = i), (l.height = u ? u * s : a && e.availableHeight));
  }
  return n;
}
function Yx(t) {
  const e = Hx(t),
    n = Bi(
      e.filter((c) => c.box.fullSize),
      !0
    ),
    i = Bi(Fi(e, "left"), !0),
    s = Bi(Fi(e, "right")),
    r = Bi(Fi(e, "top"), !0),
    o = Bi(Fi(e, "bottom")),
    l = kd(e, "x"),
    a = kd(e, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(r),
    rightAndBottom: s.concat(a).concat(o).concat(l),
    chartArea: Fi(e, "chartArea"),
    vertical: i.concat(s).concat(a),
    horizontal: r.concat(o).concat(l),
  };
}
function bd(t, e, n, i) {
  return Math.max(t[n], e[n]) + Math.max(t[i], e[i]);
}
function eg(t, e) {
  (t.top = Math.max(t.top, e.top)),
    (t.left = Math.max(t.left, e.left)),
    (t.bottom = Math.max(t.bottom, e.bottom)),
    (t.right = Math.max(t.right, e.right));
}
function Kx(t, e, n, i) {
  const { pos: s, box: r } = n,
    o = t.maxPadding;
  if (!V(s)) {
    n.size && (t[s] -= n.size);
    const d = i[n.stack] || { size: 0, count: 1 };
    (d.size = Math.max(d.size, n.horizontal ? r.height : r.width)),
      (n.size = d.size / d.count),
      (t[s] += n.size);
  }
  r.getPadding && eg(o, r.getPadding());
  const l = Math.max(0, e.outerWidth - bd(o, t, "left", "right")),
    a = Math.max(0, e.outerHeight - bd(o, t, "top", "bottom")),
    c = l !== t.w,
    u = a !== t.h;
  return (
    (t.w = l),
    (t.h = a),
    n.horizontal ? { same: c, other: u } : { same: u, other: c }
  );
}
function Xx(t) {
  const e = t.maxPadding;
  function n(i) {
    const s = Math.max(e[i] - t[i], 0);
    return (t[i] += s), s;
  }
  (t.y += n("top")), (t.x += n("left")), n("right"), n("bottom");
}
function Gx(t, e) {
  const n = e.maxPadding;
  function i(s) {
    const r = { left: 0, top: 0, right: 0, bottom: 0 };
    return (
      s.forEach((o) => {
        r[o] = Math.max(e[o], n[o]);
      }),
      r
    );
  }
  return i(t ? ["left", "right"] : ["top", "bottom"]);
}
function Xi(t, e, n, i) {
  const s = [];
  let r, o, l, a, c, u;
  for (r = 0, o = t.length, c = 0; r < o; ++r) {
    (l = t[r]),
      (a = l.box),
      a.update(l.width || e.w, l.height || e.h, Gx(l.horizontal, e));
    const { same: d, other: f } = Kx(e, n, l, i);
    (c |= d && s.length), (u = u || f), a.fullSize || s.push(l);
  }
  return (c && Xi(s, e, n, i)) || u;
}
function lr(t, e, n, i, s) {
  (t.top = n),
    (t.left = e),
    (t.right = e + i),
    (t.bottom = n + s),
    (t.width = i),
    (t.height = s);
}
function Cd(t, e, n, i) {
  const s = n.padding;
  let { x: r, y: o } = e;
  for (const l of t) {
    const a = l.box,
      c = i[l.stack] || { count: 1, placed: 0, weight: 1 },
      u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const d = e.w * u,
        f = c.size || a.height;
      Es(c.start) && (o = c.start),
        a.fullSize
          ? lr(a, s.left, o, n.outerWidth - s.right - s.left, f)
          : lr(a, e.left + c.placed, o, d, f),
        (c.start = o),
        (c.placed += d),
        (o = a.bottom);
    } else {
      const d = e.h * u,
        f = c.size || a.width;
      Es(c.start) && (r = c.start),
        a.fullSize
          ? lr(a, r, s.top, f, n.outerHeight - s.bottom - s.top)
          : lr(a, r, e.top + c.placed, f, d),
        (c.start = r),
        (c.placed += d),
        (r = a.right);
    }
  }
  (e.x = r), (e.y = o);
}
var tt = {
  addBox(t, e) {
    t.boxes || (t.boxes = []),
      (e.fullSize = e.fullSize || !1),
      (e.position = e.position || "top"),
      (e.weight = e.weight || 0),
      (e._layers =
        e._layers ||
        function () {
          return [
            {
              z: 0,
              draw(n) {
                e.draw(n);
              },
            },
          ];
        }),
      t.boxes.push(e);
  },
  removeBox(t, e) {
    const n = t.boxes ? t.boxes.indexOf(e) : -1;
    n !== -1 && t.boxes.splice(n, 1);
  },
  configure(t, e, n) {
    (e.fullSize = n.fullSize), (e.position = n.position), (e.weight = n.weight);
  },
  update(t, e, n, i) {
    if (!t) return;
    const s = ot(t.options.layout.padding),
      r = Math.max(e - s.width, 0),
      o = Math.max(n - s.height, 0),
      l = Yx(t.boxes),
      a = l.vertical,
      c = l.horizontal;
    X(t.boxes, (g) => {
      typeof g.beforeLayout == "function" && g.beforeLayout();
    });
    const u =
        a.reduce(
          (g, x) => (x.box.options && x.box.options.display === !1 ? g : g + 1),
          0
        ) || 1,
      d = Object.freeze({
        outerWidth: e,
        outerHeight: n,
        padding: s,
        availableWidth: r,
        availableHeight: o,
        vBoxMaxWidth: r / 2 / u,
        hBoxMaxHeight: o / 2,
      }),
      f = Object.assign({}, s);
    eg(f, ot(i));
    const m = Object.assign(
        { maxPadding: f, w: r, h: o, x: s.left, y: s.top },
        s
      ),
      v = Ux(a.concat(c), d);
    Xi(l.fullSize, m, d, v),
      Xi(a, m, d, v),
      Xi(c, m, d, v) && Xi(a, m, d, v),
      Xx(m),
      Cd(l.leftAndTop, m, d, v),
      (m.x += m.w),
      (m.y += m.h),
      Cd(l.rightAndBottom, m, d, v),
      (t.chartArea = {
        left: m.left,
        top: m.top,
        right: m.left + m.w,
        bottom: m.top + m.h,
        height: m.h,
        width: m.w,
      }),
      X(l.chartArea, (g) => {
        const x = g.box;
        Object.assign(x, t.chartArea),
          x.update(m.w, m.h, { left: 0, top: 0, right: 0, bottom: 0 });
      });
  },
};
class tg {
  acquireContext(e, n) {}
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, n, i) {}
  removeEventListener(e, n, i) {}
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, n, i, s) {
    return (
      (n = Math.max(0, n || e.width)),
      (i = i || e.height),
      { width: n, height: Math.max(0, s ? Math.floor(n / s) : i) }
    );
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {}
}
class Qx extends tg {
  acquireContext(e) {
    return (e && e.getContext && e.getContext("2d")) || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Er = "$chartjs",
  Zx = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
    pointerenter: "mouseenter",
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointerleave: "mouseout",
    pointerout: "mouseout",
  },
  Md = (t) => t === null || t === "";
function qx(t, e) {
  const n = t.style,
    i = t.getAttribute("height"),
    s = t.getAttribute("width");
  if (
    ((t[Er] = {
      initial: {
        height: i,
        width: s,
        style: { display: n.display, height: n.height, width: n.width },
      },
    }),
    (n.display = n.display || "block"),
    (n.boxSizing = n.boxSizing || "border-box"),
    Md(s))
  ) {
    const r = dd(t, "width");
    r !== void 0 && (t.width = r);
  }
  if (Md(i))
    if (t.style.height === "") t.height = t.width / (e || 2);
    else {
      const r = dd(t, "height");
      r !== void 0 && (t.height = r);
    }
  return t;
}
const ng = cx ? { passive: !0 } : !1;
function Jx(t, e, n) {
  t && t.addEventListener(e, n, ng);
}
function e1(t, e, n) {
  t && t.canvas && t.canvas.removeEventListener(e, n, ng);
}
function t1(t, e) {
  const n = Zx[t.type] || t.type,
    { x: i, y: s } = wn(t, e);
  return {
    type: n,
    chart: e,
    native: t,
    x: i !== void 0 ? i : null,
    y: s !== void 0 ? s : null,
  };
}
function lo(t, e) {
  for (const n of t) if (n === e || n.contains(e)) return !0;
}
function n1(t, e, n) {
  const i = t.canvas,
    s = new MutationObserver((r) => {
      let o = !1;
      for (const l of r)
        (o = o || lo(l.addedNodes, i)), (o = o && !lo(l.removedNodes, i));
      o && n();
    });
  return s.observe(document, { childList: !0, subtree: !0 }), s;
}
function i1(t, e, n) {
  const i = t.canvas,
    s = new MutationObserver((r) => {
      let o = !1;
      for (const l of r)
        (o = o || lo(l.removedNodes, i)), (o = o && !lo(l.addedNodes, i));
      o && n();
    });
  return s.observe(document, { childList: !0, subtree: !0 }), s;
}
const Ts = new Map();
let Pd = 0;
function ig() {
  const t = window.devicePixelRatio;
  t !== Pd &&
    ((Pd = t),
    Ts.forEach((e, n) => {
      n.currentDevicePixelRatio !== t && e();
    }));
}
function s1(t, e) {
  Ts.size || window.addEventListener("resize", ig), Ts.set(t, e);
}
function r1(t) {
  Ts.delete(t), Ts.size || window.removeEventListener("resize", ig);
}
function o1(t, e, n) {
  const i = t.canvas,
    s = i && Lc(i);
  if (!s) return;
  const r = zp((l, a) => {
      const c = s.clientWidth;
      n(l, a), c < s.clientWidth && n();
    }, window),
    o = new ResizeObserver((l) => {
      const a = l[0],
        c = a.contentRect.width,
        u = a.contentRect.height;
      (c === 0 && u === 0) || r(c, u);
    });
  return o.observe(s), s1(t, r), o;
}
function hl(t, e, n) {
  n && n.disconnect(), e === "resize" && r1(t);
}
function l1(t, e, n) {
  const i = t.canvas,
    s = zp((r) => {
      t.ctx !== null && n(t1(r, t));
    }, t);
  return Jx(i, e, s), s;
}
class a1 extends tg {
  acquireContext(e, n) {
    const i = e && e.getContext && e.getContext("2d");
    return i && i.canvas === e ? (qx(e, n), i) : null;
  }
  releaseContext(e) {
    const n = e.canvas;
    if (!n[Er]) return !1;
    const i = n[Er].initial;
    ["height", "width"].forEach((r) => {
      const o = i[r];
      ee(o) ? n.removeAttribute(r) : n.setAttribute(r, o);
    });
    const s = i.style || {};
    return (
      Object.keys(s).forEach((r) => {
        n.style[r] = s[r];
      }),
      (n.width = n.width),
      delete n[Er],
      !0
    );
  }
  addEventListener(e, n, i) {
    this.removeEventListener(e, n);
    const s = e.$proxies || (e.$proxies = {}),
      o = { attach: n1, detach: i1, resize: o1 }[n] || l1;
    s[n] = o(e, n, i);
  }
  removeEventListener(e, n) {
    const i = e.$proxies || (e.$proxies = {}),
      s = i[n];
    if (!s) return;
    (({ attach: hl, detach: hl, resize: hl })[n] || e1)(e, n, s),
      (i[n] = void 0);
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, n, i, s) {
    return ax(e, n, i, s);
  }
  isAttached(e) {
    const n = e && Lc(e);
    return !!(n && n.isConnected);
  }
}
function c1(t) {
  return !Oc() || (typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas)
    ? Qx
    : a1;
}
class Bt {
  constructor() {
    F(this, "x");
    F(this, "y");
    F(this, "active", !1);
    F(this, "options");
    F(this, "$animations");
  }
  tooltipPosition(e) {
    const { x: n, y: i } = this.getProps(["x", "y"], e);
    return { x: n, y: i };
  }
  hasValue() {
    return io(this.x) && io(this.y);
  }
  getProps(e, n) {
    const i = this.$animations;
    if (!n || !i) return this;
    const s = {};
    return (
      e.forEach((r) => {
        s[r] = i[r] && i[r].active() ? i[r]._to : this[r];
      }),
      s
    );
  }
}
F(Bt, "defaults", {}), F(Bt, "defaultRoutes");
function u1(t, e) {
  const n = t.options.ticks,
    i = d1(t),
    s = Math.min(n.maxTicksLimit || i, i),
    r = n.major.enabled ? h1(e) : [],
    o = r.length,
    l = r[0],
    a = r[o - 1],
    c = [];
  if (o > s) return p1(e, c, r, o / s), c;
  const u = f1(r, e, s);
  if (o > 0) {
    let d, f;
    const m = o > 1 ? Math.round((a - l) / (o - 1)) : null;
    for (ar(e, c, u, ee(m) ? 0 : l - m, l), d = 0, f = o - 1; d < f; d++)
      ar(e, c, u, r[d], r[d + 1]);
    return ar(e, c, u, a, ee(m) ? e.length : a + m), c;
  }
  return ar(e, c, u), c;
}
function d1(t) {
  const e = t.options.offset,
    n = t._tickSize(),
    i = t._length / n + (e ? 0 : 1),
    s = t._maxLength / n;
  return Math.floor(Math.min(i, s));
}
function f1(t, e, n) {
  const i = g1(t),
    s = e.length / n;
  if (!i) return Math.max(s, 1);
  const r = _v(i);
  for (let o = 0, l = r.length - 1; o < l; o++) {
    const a = r[o];
    if (a > s) return a;
  }
  return Math.max(s, 1);
}
function h1(t) {
  const e = [];
  let n, i;
  for (n = 0, i = t.length; n < i; n++) t[n].major && e.push(n);
  return e;
}
function p1(t, e, n, i) {
  let s = 0,
    r = n[0],
    o;
  for (i = Math.ceil(i), o = 0; o < t.length; o++)
    o === r && (e.push(t[o]), s++, (r = n[s * i]));
}
function ar(t, e, n, i, s) {
  const r = K(i, 0),
    o = Math.min(K(s, t.length), t.length);
  let l = 0,
    a,
    c,
    u;
  for (
    n = Math.ceil(n), s && ((a = s - i), (n = a / Math.floor(a / n))), u = r;
    u < 0;

  )
    l++, (u = Math.round(r + l * n));
  for (c = Math.max(r, 0); c < o; c++)
    c === u && (e.push(t[c]), l++, (u = Math.round(r + l * n)));
}
function g1(t) {
  const e = t.length;
  let n, i;
  if (e < 2) return !1;
  for (i = t[0], n = 1; n < e; ++n) if (t[n] - t[n - 1] !== i) return !1;
  return i;
}
const m1 = (t) => (t === "left" ? "right" : t === "right" ? "left" : t),
  Ed = (t, e, n) => (e === "top" || e === "left" ? t[e] + n : t[e] - n),
  Dd = (t, e) => Math.min(e || t, t);
function Td(t, e) {
  const n = [],
    i = t.length / e,
    s = t.length;
  let r = 0;
  for (; r < s; r += i) n.push(t[Math.floor(r)]);
  return n;
}
function y1(t, e, n) {
  const i = t.ticks.length,
    s = Math.min(e, i - 1),
    r = t._startPixel,
    o = t._endPixel,
    l = 1e-6;
  let a = t.getPixelForTick(s),
    c;
  if (
    !(
      n &&
      (i === 1
        ? (c = Math.max(a - r, o - a))
        : e === 0
        ? (c = (t.getPixelForTick(1) - a) / 2)
        : (c = (a - t.getPixelForTick(s - 1)) / 2),
      (a += s < e ? c : -c),
      a < r - l || a > o + l)
    )
  )
    return a;
}
function v1(t, e) {
  X(t, (n) => {
    const i = n.gc,
      s = i.length / 2;
    let r;
    if (s > e) {
      for (r = 0; r < s; ++r) delete n.data[i[r]];
      i.splice(0, s);
    }
  });
}
function $i(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function Od(t, e) {
  if (!t.display) return 0;
  const n = De(t.font, e),
    i = ot(t.padding);
  return (ge(t.text) ? t.text.length : 1) * n.lineHeight + i.height;
}
function x1(t, e) {
  return Ei(t, { scale: e, type: "scale" });
}
function _1(t, e, n) {
  return Ei(t, { tick: n, index: e, type: "tick" });
}
function w1(t, e, n) {
  let i = kc(t);
  return ((n && e !== "right") || (!n && e === "right")) && (i = m1(i)), i;
}
function S1(t, e, n, i) {
  const { top: s, left: r, bottom: o, right: l, chart: a } = t,
    { chartArea: c, scales: u } = a;
  let d = 0,
    f,
    m,
    v;
  const g = o - s,
    x = l - r;
  if (t.isHorizontal()) {
    if (((m = Pe(i, r, l)), V(n))) {
      const p = Object.keys(n)[0],
        h = n[p];
      v = u[p].getPixelForValue(h) + g - e;
    } else
      n === "center" ? (v = (c.bottom + c.top) / 2 + g - e) : (v = Ed(t, n, e));
    f = l - r;
  } else {
    if (V(n)) {
      const p = Object.keys(n)[0],
        h = n[p];
      m = u[p].getPixelForValue(h) - x + e;
    } else
      n === "center" ? (m = (c.left + c.right) / 2 - x + e) : (m = Ed(t, n, e));
    (v = Pe(i, o, s)), (d = n === "left" ? -ye : ye);
  }
  return { titleX: m, titleY: v, maxWidth: f, rotation: d };
}
class Di extends Bt {
  constructor(e) {
    super(),
      (this.id = e.id),
      (this.type = e.type),
      (this.options = void 0),
      (this.ctx = e.ctx),
      (this.chart = e.chart),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
      (this.maxWidth = void 0),
      (this.maxHeight = void 0),
      (this.paddingTop = void 0),
      (this.paddingBottom = void 0),
      (this.paddingLeft = void 0),
      (this.paddingRight = void 0),
      (this.axis = void 0),
      (this.labelRotation = void 0),
      (this.min = void 0),
      (this.max = void 0),
      (this._range = void 0),
      (this.ticks = []),
      (this._gridLineItems = null),
      (this._labelItems = null),
      (this._labelSizes = null),
      (this._length = 0),
      (this._maxLength = 0),
      (this._longestTextCache = {}),
      (this._startPixel = void 0),
      (this._endPixel = void 0),
      (this._reversePixels = !1),
      (this._userMax = void 0),
      (this._userMin = void 0),
      (this._suggestedMax = void 0),
      (this._suggestedMin = void 0),
      (this._ticksLength = 0),
      (this._borderValue = 0),
      (this._cache = {}),
      (this._dataLimitsCached = !1),
      (this.$context = void 0);
  }
  init(e) {
    (this.options = e.setContext(this.getContext())),
      (this.axis = e.axis),
      (this._userMin = this.parse(e.min)),
      (this._userMax = this.parse(e.max)),
      (this._suggestedMin = this.parse(e.suggestedMin)),
      (this._suggestedMax = this.parse(e.suggestedMax));
  }
  parse(e, n) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: n, _suggestedMin: i, _suggestedMax: s } = this;
    return (
      (e = vt(e, Number.POSITIVE_INFINITY)),
      (n = vt(n, Number.NEGATIVE_INFINITY)),
      (i = vt(i, Number.POSITIVE_INFINITY)),
      (s = vt(s, Number.NEGATIVE_INFINITY)),
      { min: vt(e, i), max: vt(n, s), minDefined: rt(e), maxDefined: rt(n) }
    );
  }
  getMinMax(e) {
    let { min: n, max: i, minDefined: s, maxDefined: r } = this.getUserBounds(),
      o;
    if (s && r) return { min: n, max: i };
    const l = this.getMatchingVisibleMetas();
    for (let a = 0, c = l.length; a < c; ++a)
      (o = l[a].controller.getMinMax(this, e)),
        s || (n = Math.min(n, o.min)),
        r || (i = Math.max(i, o.max));
    return (
      (n = r && n > i ? i : n),
      (i = s && n > i ? n : i),
      { min: vt(n, vt(i, n)), max: vt(i, vt(n, i)) }
    );
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0,
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const e = this.chart.data;
    return (
      this.options.labels ||
      (this.isHorizontal() ? e.xLabels : e.yLabels) ||
      e.labels ||
      []
    );
  }
  getLabelItems(e = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(e));
  }
  beforeLayout() {
    (this._cache = {}), (this._dataLimitsCached = !1);
  }
  beforeUpdate() {
    J(this.options.beforeUpdate, [this]);
  }
  update(e, n, i) {
    const { beginAtZero: s, grace: r, ticks: o } = this.options,
      l = o.sampleSize;
    this.beforeUpdate(),
      (this.maxWidth = e),
      (this.maxHeight = n),
      (this._margins = i =
        Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
      (this.ticks = null),
      (this._labelSizes = null),
      (this._gridLineItems = null),
      (this._labelItems = null),
      this.beforeSetDimensions(),
      this.setDimensions(),
      this.afterSetDimensions(),
      (this._maxLength = this.isHorizontal()
        ? this.width + i.left + i.right
        : this.height + i.top + i.bottom),
      this._dataLimitsCached ||
        (this.beforeDataLimits(),
        this.determineDataLimits(),
        this.afterDataLimits(),
        (this._range = Kv(this, r, s)),
        (this._dataLimitsCached = !0)),
      this.beforeBuildTicks(),
      (this.ticks = this.buildTicks() || []),
      this.afterBuildTicks();
    const a = l < this.ticks.length;
    this._convertTicksToLabels(a ? Td(this.ticks, l) : this.ticks),
      this.configure(),
      this.beforeCalculateLabelRotation(),
      this.calculateLabelRotation(),
      this.afterCalculateLabelRotation(),
      o.display &&
        (o.autoSkip || o.source === "auto") &&
        ((this.ticks = u1(this, this.ticks)),
        (this._labelSizes = null),
        this.afterAutoSkip()),
      a && this._convertTicksToLabels(this.ticks),
      this.beforeFit(),
      this.fit(),
      this.afterFit(),
      this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse,
      n,
      i;
    this.isHorizontal()
      ? ((n = this.left), (i = this.right))
      : ((n = this.top), (i = this.bottom), (e = !e)),
      (this._startPixel = n),
      (this._endPixel = i),
      (this._reversePixels = e),
      (this._length = i - n),
      (this._alignToPixels = this.options.alignToPixels);
  }
  afterUpdate() {
    J(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    J(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = 0),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = 0),
        (this.bottom = this.height)),
      (this.paddingLeft = 0),
      (this.paddingTop = 0),
      (this.paddingRight = 0),
      (this.paddingBottom = 0);
  }
  afterSetDimensions() {
    J(this.options.afterSetDimensions, [this]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), J(this.options[e], [this]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {}
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    J(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(e) {
    const n = this.options.ticks;
    let i, s, r;
    for (i = 0, s = e.length; i < s; i++)
      (r = e[i]), (r.label = J(n.callback, [r.value, i, e], this));
  }
  afterTickToLabelConversion() {
    J(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    J(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    const e = this.options,
      n = e.ticks,
      i = Dd(this.ticks.length, e.ticks.maxTicksLimit),
      s = n.minRotation || 0,
      r = n.maxRotation;
    let o = s,
      l,
      a,
      c;
    if (
      !this._isVisible() ||
      !n.display ||
      s >= r ||
      i <= 1 ||
      !this.isHorizontal()
    ) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(),
      d = u.widest.width,
      f = u.highest.height,
      m = Be(this.chart.width - d, 0, this.maxWidth);
    (l = e.offset ? this.maxWidth / i : m / (i - 1)),
      d + 6 > l &&
        ((l = m / (i - (e.offset ? 0.5 : 1))),
        (a =
          this.maxHeight -
          $i(e.grid) -
          n.padding -
          Od(e.title, this.chart.options.font)),
        (c = Math.sqrt(d * d + f * f)),
        (o = kv(
          Math.min(
            Math.asin(Be((u.highest.height + 6) / l, -1, 1)),
            Math.asin(Be(a / c, -1, 1)) - Math.asin(Be(f / c, -1, 1))
          )
        )),
        (o = Math.max(s, Math.min(r, o)))),
      (this.labelRotation = o);
  }
  afterCalculateLabelRotation() {
    J(this.options.afterCalculateLabelRotation, [this]);
  }
  afterAutoSkip() {}
  beforeFit() {
    J(this.options.beforeFit, [this]);
  }
  fit() {
    const e = { width: 0, height: 0 },
      {
        chart: n,
        options: { ticks: i, title: s, grid: r },
      } = this,
      o = this._isVisible(),
      l = this.isHorizontal();
    if (o) {
      const a = Od(s, n.options.font);
      if (
        (l
          ? ((e.width = this.maxWidth), (e.height = $i(r) + a))
          : ((e.height = this.maxHeight), (e.width = $i(r) + a)),
        i.display && this.ticks.length)
      ) {
        const {
            first: c,
            last: u,
            widest: d,
            highest: f,
          } = this._getLabelSizes(),
          m = i.padding * 2,
          v = At(this.labelRotation),
          g = Math.cos(v),
          x = Math.sin(v);
        if (l) {
          const p = i.mirror ? 0 : x * d.width + g * f.height;
          e.height = Math.min(this.maxHeight, e.height + p + m);
        } else {
          const p = i.mirror ? 0 : g * d.width + x * f.height;
          e.width = Math.min(this.maxWidth, e.width + p + m);
        }
        this._calculatePadding(c, u, x, g);
      }
    }
    this._handleMargins(),
      l
        ? ((this.width = this._length =
            n.width - this._margins.left - this._margins.right),
          (this.height = e.height))
        : ((this.width = e.width),
          (this.height = this._length =
            n.height - this._margins.top - this._margins.bottom));
  }
  _calculatePadding(e, n, i, s) {
    const {
        ticks: { align: r, padding: o },
        position: l,
      } = this.options,
      a = this.labelRotation !== 0,
      c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left,
        d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0,
        m = 0;
      a
        ? c
          ? ((f = s * e.width), (m = i * n.height))
          : ((f = i * e.height), (m = s * n.width))
        : r === "start"
        ? (m = n.width)
        : r === "end"
        ? (f = e.width)
        : r !== "inner" && ((f = e.width / 2), (m = n.width / 2)),
        (this.paddingLeft = Math.max(
          ((f - u + o) * this.width) / (this.width - u),
          0
        )),
        (this.paddingRight = Math.max(
          ((m - d + o) * this.width) / (this.width - d),
          0
        ));
    } else {
      let u = n.height / 2,
        d = e.height / 2;
      r === "start"
        ? ((u = 0), (d = e.height))
        : r === "end" && ((u = n.height), (d = 0)),
        (this.paddingTop = u + o),
        (this.paddingBottom = d + o);
    }
  }
  _handleMargins() {
    this._margins &&
      ((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
      (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
      (this._margins.right = Math.max(this.paddingRight, this._margins.right)),
      (this._margins.bottom = Math.max(
        this.paddingBottom,
        this._margins.bottom
      )));
  }
  afterFit() {
    J(this.options.afterFit, [this]);
  }
  isHorizontal() {
    const { axis: e, position: n } = this.options;
    return n === "top" || n === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let n, i;
    for (n = 0, i = e.length; n < i; n++)
      ee(e[n].label) && (e.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = Td(i, n)),
        (this._labelSizes = e =
          this._computeLabelSizes(
            i,
            i.length,
            this.options.ticks.maxTicksLimit
          ));
    }
    return e;
  }
  _computeLabelSizes(e, n, i) {
    const { ctx: s, _longestTextCache: r } = this,
      o = [],
      l = [],
      a = Math.floor(n / Dd(n, i));
    let c = 0,
      u = 0,
      d,
      f,
      m,
      v,
      g,
      x,
      p,
      h,
      y,
      _,
      w;
    for (d = 0; d < n; d += a) {
      if (
        ((v = e[d].label),
        (g = this._resolveTickFontOptions(d)),
        (s.font = x = g.string),
        (p = r[x] = r[x] || { data: {}, gc: [] }),
        (h = g.lineHeight),
        (y = _ = 0),
        !ee(v) && !ge(v))
      )
        (y = rd(s, p.data, p.gc, y, v)), (_ = h);
      else if (ge(v))
        for (f = 0, m = v.length; f < m; ++f)
          (w = v[f]),
            !ee(w) && !ge(w) && ((y = rd(s, p.data, p.gc, y, w)), (_ += h));
      o.push(y), l.push(_), (c = Math.max(y, c)), (u = Math.max(_, u));
    }
    v1(r, n);
    const k = o.indexOf(c),
      b = l.indexOf(u),
      C = (E) => ({ width: o[E] || 0, height: l[E] || 0 });
    return {
      first: C(0),
      last: C(n - 1),
      widest: C(k),
      highest: C(b),
      widths: o,
      heights: l,
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, n) {
    return NaN;
  }
  getValueForPixel(e) {}
  getPixelForTick(e) {
    const n = this.ticks;
    return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const n = this._startPixel + e * this._length;
    return Cv(this._alignToPixels ? yn(this.chart, n, 0) : n);
  }
  getDecimalForPixel(e) {
    const n = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: n } = this;
    return e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0;
  }
  getContext(e) {
    const n = this.ticks || [];
    if (e >= 0 && e < n.length) {
      const i = n[e];
      return i.$context || (i.$context = _1(this.getContext(), e, i));
    }
    return this.$context || (this.$context = x1(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks,
      n = At(this.labelRotation),
      i = Math.abs(Math.cos(n)),
      s = Math.abs(Math.sin(n)),
      r = this._getLabelSizes(),
      o = e.autoSkipPadding || 0,
      l = r ? r.widest.width + o : 0,
      a = r ? r.highest.height + o : 0;
    return this.isHorizontal()
      ? a * i > l * s
        ? l / i
        : a / s
      : a * s < l * i
      ? a / i
      : l / s;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const n = this.axis,
      i = this.chart,
      s = this.options,
      { grid: r, position: o, border: l } = s,
      a = r.offset,
      c = this.isHorizontal(),
      d = this.ticks.length + (a ? 1 : 0),
      f = $i(r),
      m = [],
      v = l.setContext(this.getContext()),
      g = v.display ? v.width : 0,
      x = g / 2,
      p = function (I) {
        return yn(i, I, g);
      };
    let h, y, _, w, k, b, C, E, M, T, A, $;
    if (o === "top")
      (h = p(this.bottom)),
        (b = this.bottom - f),
        (E = h - x),
        (T = p(e.top) + x),
        ($ = e.bottom);
    else if (o === "bottom")
      (h = p(this.top)),
        (T = e.top),
        ($ = p(e.bottom) - x),
        (b = h + x),
        (E = this.top + f);
    else if (o === "left")
      (h = p(this.right)),
        (k = this.right - f),
        (C = h - x),
        (M = p(e.left) + x),
        (A = e.right);
    else if (o === "right")
      (h = p(this.left)),
        (M = e.left),
        (A = p(e.right) - x),
        (k = h + x),
        (C = this.left + f);
    else if (n === "x") {
      if (o === "center") h = p((e.top + e.bottom) / 2 + 0.5);
      else if (V(o)) {
        const I = Object.keys(o)[0],
          N = o[I];
        h = p(this.chart.scales[I].getPixelForValue(N));
      }
      (T = e.top), ($ = e.bottom), (b = h + x), (E = b + f);
    } else if (n === "y") {
      if (o === "center") h = p((e.left + e.right) / 2);
      else if (V(o)) {
        const I = Object.keys(o)[0],
          N = o[I];
        h = p(this.chart.scales[I].getPixelForValue(N));
      }
      (k = h - x), (C = k - f), (M = e.left), (A = e.right);
    }
    const Q = K(s.ticks.maxTicksLimit, d),
      O = Math.max(1, Math.ceil(d / Q));
    for (y = 0; y < d; y += O) {
      const I = this.getContext(y),
        N = r.setContext(I),
        D = l.setContext(I),
        L = N.lineWidth,
        j = N.color,
        U = D.dash || [],
        Y = D.dashOffset,
        lt = N.tickWidth,
        we = N.tickColor,
        at = N.tickBorderDash || [],
        ve = N.tickBorderDashOffset;
      (_ = y1(this, y, a)),
        _ !== void 0 &&
          ((w = yn(i, _, L)),
          c ? (k = C = M = A = w) : (b = E = T = $ = w),
          m.push({
            tx1: k,
            ty1: b,
            tx2: C,
            ty2: E,
            x1: M,
            y1: T,
            x2: A,
            y2: $,
            width: L,
            color: j,
            borderDash: U,
            borderDashOffset: Y,
            tickWidth: lt,
            tickColor: we,
            tickBorderDash: at,
            tickBorderDashOffset: ve,
          }));
    }
    return (this._ticksLength = d), (this._borderValue = h), m;
  }
  _computeLabelItems(e) {
    const n = this.axis,
      i = this.options,
      { position: s, ticks: r } = i,
      o = this.isHorizontal(),
      l = this.ticks,
      { align: a, crossAlign: c, padding: u, mirror: d } = r,
      f = $i(i.grid),
      m = f + u,
      v = d ? -u : m,
      g = -At(this.labelRotation),
      x = [];
    let p,
      h,
      y,
      _,
      w,
      k,
      b,
      C,
      E,
      M,
      T,
      A,
      $ = "middle";
    if (s === "top")
      (k = this.bottom - v), (b = this._getXAxisLabelAlignment());
    else if (s === "bottom")
      (k = this.top + v), (b = this._getXAxisLabelAlignment());
    else if (s === "left") {
      const O = this._getYAxisLabelAlignment(f);
      (b = O.textAlign), (w = O.x);
    } else if (s === "right") {
      const O = this._getYAxisLabelAlignment(f);
      (b = O.textAlign), (w = O.x);
    } else if (n === "x") {
      if (s === "center") k = (e.top + e.bottom) / 2 + m;
      else if (V(s)) {
        const O = Object.keys(s)[0],
          I = s[O];
        k = this.chart.scales[O].getPixelForValue(I) + m;
      }
      b = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center") w = (e.left + e.right) / 2 - m;
      else if (V(s)) {
        const O = Object.keys(s)[0],
          I = s[O];
        w = this.chart.scales[O].getPixelForValue(I);
      }
      b = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (a === "start" ? ($ = "top") : a === "end" && ($ = "bottom"));
    const Q = this._getLabelSizes();
    for (p = 0, h = l.length; p < h; ++p) {
      (y = l[p]), (_ = y.label);
      const O = r.setContext(this.getContext(p));
      (C = this.getPixelForTick(p) + r.labelOffset),
        (E = this._resolveTickFontOptions(p)),
        (M = E.lineHeight),
        (T = ge(_) ? _.length : 1);
      const I = T / 2,
        N = O.color,
        D = O.textStrokeColor,
        L = O.textStrokeWidth;
      let j = b;
      o
        ? ((w = C),
          b === "inner" &&
            (p === h - 1
              ? (j = this.options.reverse ? "left" : "right")
              : p === 0
              ? (j = this.options.reverse ? "right" : "left")
              : (j = "center")),
          s === "top"
            ? c === "near" || g !== 0
              ? (A = -T * M + M / 2)
              : c === "center"
              ? (A = -Q.highest.height / 2 - I * M + M)
              : (A = -Q.highest.height + M / 2)
            : c === "near" || g !== 0
            ? (A = M / 2)
            : c === "center"
            ? (A = Q.highest.height / 2 - I * M)
            : (A = Q.highest.height - T * M),
          d && (A *= -1),
          g !== 0 && !O.showLabelBackdrop && (w += (M / 2) * Math.sin(g)))
        : ((k = C), (A = ((1 - T) * M) / 2));
      let U;
      if (O.showLabelBackdrop) {
        const Y = ot(O.backdropPadding),
          lt = Q.heights[p],
          we = Q.widths[p];
        let at = A - Y.top,
          ve = 0 - Y.left;
        switch ($) {
          case "middle":
            at -= lt / 2;
            break;
          case "bottom":
            at -= lt;
            break;
        }
        switch (b) {
          case "center":
            ve -= we / 2;
            break;
          case "right":
            ve -= we;
            break;
          case "inner":
            p === h - 1 ? (ve -= we) : p > 0 && (ve -= we / 2);
            break;
        }
        U = {
          left: ve,
          top: at,
          width: we + Y.width,
          height: lt + Y.height,
          color: O.backdropColor,
        };
      }
      x.push({
        label: _,
        font: E,
        textOffset: A,
        options: {
          rotation: g,
          color: N,
          strokeColor: D,
          strokeWidth: L,
          textAlign: j,
          textBaseline: $,
          translation: [w, k],
          backdrop: U,
        },
      });
    }
    return x;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: n } = this.options;
    if (-At(this.labelRotation)) return e === "top" ? "left" : "right";
    let s = "center";
    return (
      n.align === "start"
        ? (s = "left")
        : n.align === "end"
        ? (s = "right")
        : n.align === "inner" && (s = "inner"),
      s
    );
  }
  _getYAxisLabelAlignment(e) {
    const {
        position: n,
        ticks: { crossAlign: i, mirror: s, padding: r },
      } = this.options,
      o = this._getLabelSizes(),
      l = e + r,
      a = o.widest.width;
    let c, u;
    return (
      n === "left"
        ? s
          ? ((u = this.right + r),
            i === "near"
              ? (c = "left")
              : i === "center"
              ? ((c = "center"), (u += a / 2))
              : ((c = "right"), (u += a)))
          : ((u = this.right - l),
            i === "near"
              ? (c = "right")
              : i === "center"
              ? ((c = "center"), (u -= a / 2))
              : ((c = "left"), (u = this.left)))
        : n === "right"
        ? s
          ? ((u = this.left + r),
            i === "near"
              ? (c = "right")
              : i === "center"
              ? ((c = "center"), (u -= a / 2))
              : ((c = "left"), (u -= a)))
          : ((u = this.left + l),
            i === "near"
              ? (c = "left")
              : i === "center"
              ? ((c = "center"), (u += a / 2))
              : ((c = "right"), (u = this.right)))
        : (c = "right"),
      { textAlign: c, x: u }
    );
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) return;
    const e = this.chart,
      n = this.options.position;
    if (n === "left" || n === "right")
      return { top: 0, left: this.left, bottom: e.height, right: this.right };
    if (n === "top" || n === "bottom")
      return { top: this.top, left: 0, bottom: this.bottom, right: e.width };
  }
  drawBackground() {
    const {
      ctx: e,
      options: { backgroundColor: n },
      left: i,
      top: s,
      width: r,
      height: o,
    } = this;
    n && (e.save(), (e.fillStyle = n), e.fillRect(i, s, r, o), e.restore());
  }
  getLineWidthForValue(e) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display) return 0;
    const s = this.ticks.findIndex((r) => r.value === e);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(e) {
    const n = this.options.grid,
      i = this.ctx,
      s =
        this._gridLineItems ||
        (this._gridLineItems = this._computeGridLineItems(e));
    let r, o;
    const l = (a, c, u) => {
      !u.width ||
        !u.color ||
        (i.save(),
        (i.lineWidth = u.width),
        (i.strokeStyle = u.color),
        i.setLineDash(u.borderDash || []),
        (i.lineDashOffset = u.borderDashOffset),
        i.beginPath(),
        i.moveTo(a.x, a.y),
        i.lineTo(c.x, c.y),
        i.stroke(),
        i.restore());
    };
    if (n.display)
      for (r = 0, o = s.length; r < o; ++r) {
        const a = s[r];
        n.drawOnChartArea && l({ x: a.x1, y: a.y1 }, { x: a.x2, y: a.y2 }, a),
          n.drawTicks &&
            l(
              { x: a.tx1, y: a.ty1 },
              { x: a.tx2, y: a.ty2 },
              {
                color: a.tickColor,
                width: a.tickWidth,
                borderDash: a.tickBorderDash,
                borderDashOffset: a.tickBorderDashOffset,
              }
            );
      }
  }
  drawBorder() {
    const {
        chart: e,
        ctx: n,
        options: { border: i, grid: s },
      } = this,
      r = i.setContext(this.getContext()),
      o = i.display ? r.width : 0;
    if (!o) return;
    const l = s.setContext(this.getContext(0)).lineWidth,
      a = this._borderValue;
    let c, u, d, f;
    this.isHorizontal()
      ? ((c = yn(e, this.left, o) - o / 2),
        (u = yn(e, this.right, l) + l / 2),
        (d = f = a))
      : ((d = yn(e, this.top, o) - o / 2),
        (f = yn(e, this.bottom, l) + l / 2),
        (c = u = a)),
      n.save(),
      (n.lineWidth = r.width),
      (n.strokeStyle = r.color),
      n.beginPath(),
      n.moveTo(c, d),
      n.lineTo(u, f),
      n.stroke(),
      n.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display) return;
    const i = this.ctx,
      s = this._computeLabelArea();
    s && Cc(i, s);
    const r = this.getLabelItems(e);
    for (const o of r) {
      const l = o.options,
        a = o.font,
        c = o.label,
        u = o.textOffset;
      Ds(i, c, 0, u, a, l);
    }
    s && Mc(i);
  }
  drawTitle() {
    const {
      ctx: e,
      options: { position: n, title: i, reverse: s },
    } = this;
    if (!i.display) return;
    const r = De(i.font),
      o = ot(i.padding),
      l = i.align;
    let a = r.lineHeight / 2;
    n === "bottom" || n === "center" || V(n)
      ? ((a += o.bottom),
        ge(i.text) && (a += r.lineHeight * (i.text.length - 1)))
      : (a += o.top);
    const {
      titleX: c,
      titleY: u,
      maxWidth: d,
      rotation: f,
    } = S1(this, a, n, l);
    Ds(e, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: d,
      rotation: f,
      textAlign: w1(l, n, s),
      textBaseline: "middle",
      translation: [c, u],
    });
  }
  draw(e) {
    this._isVisible() &&
      (this.drawBackground(),
      this.drawGrid(e),
      this.drawBorder(),
      this.drawTitle(),
      this.drawLabels(e));
  }
  _layers() {
    const e = this.options,
      n = (e.ticks && e.ticks.z) || 0,
      i = K(e.grid && e.grid.z, -1),
      s = K(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== Di.prototype.draw
      ? [
          {
            z: n,
            draw: (r) => {
              this.draw(r);
            },
          },
        ]
      : [
          {
            z: i,
            draw: (r) => {
              this.drawBackground(), this.drawGrid(r), this.drawTitle();
            },
          },
          {
            z: s,
            draw: () => {
              this.drawBorder();
            },
          },
          {
            z: n,
            draw: (r) => {
              this.drawLabels(r);
            },
          },
        ];
  }
  getMatchingVisibleMetas(e) {
    const n = this.chart.getSortedVisibleDatasetMetas(),
      i = this.axis + "AxisID",
      s = [];
    let r, o;
    for (r = 0, o = n.length; r < o; ++r) {
      const l = n[r];
      l[i] === this.id && (!e || l.type === e) && s.push(l);
    }
    return s;
  }
  _resolveTickFontOptions(e) {
    const n = this.options.ticks.setContext(this.getContext(e));
    return De(n.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class cr {
  constructor(e, n, i) {
    (this.type = e),
      (this.scope = n),
      (this.override = i),
      (this.items = Object.create(null));
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(
      this.type.prototype,
      e.prototype
    );
  }
  register(e) {
    const n = Object.getPrototypeOf(e);
    let i;
    C1(n) && (i = this.register(n));
    const s = this.items,
      r = e.id,
      o = this.scope + "." + r;
    if (!r) throw new Error("class does not have id: " + e);
    return (
      r in s ||
        ((s[r] = e),
        k1(e, o, i),
        this.override && ue.override(e.id, e.overrides)),
      o
    );
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const n = this.items,
      i = e.id,
      s = this.scope;
    i in n && delete n[i],
      s && i in ue[s] && (delete ue[s][i], this.override && delete zn[i]);
  }
}
function k1(t, e, n) {
  const i = Ps(Object.create(null), [
    n ? ue.get(n) : {},
    ue.get(e),
    t.defaults,
  ]);
  ue.set(e, i),
    t.defaultRoutes && b1(e, t.defaultRoutes),
    t.descriptors && ue.describe(e, t.descriptors);
}
function b1(t, e) {
  Object.keys(e).forEach((n) => {
    const i = n.split("."),
      s = i.pop(),
      r = [t].concat(i).join("."),
      o = e[n].split("."),
      l = o.pop(),
      a = o.join(".");
    ue.route(r, s, a, l);
  });
}
function C1(t) {
  return "id" in t && "defaults" in t;
}
class M1 {
  constructor() {
    (this.controllers = new cr(pi, "datasets", !0)),
      (this.elements = new cr(Bt, "elements")),
      (this.plugins = new cr(Object, "plugins")),
      (this.scales = new cr(Di, "scales")),
      (this._typedRegistries = [this.controllers, this.scales, this.elements]);
  }
  add(...e) {
    this._each("register", e);
  }
  remove(...e) {
    this._each("unregister", e);
  }
  addControllers(...e) {
    this._each("register", e, this.controllers);
  }
  addElements(...e) {
    this._each("register", e, this.elements);
  }
  addPlugins(...e) {
    this._each("register", e, this.plugins);
  }
  addScales(...e) {
    this._each("register", e, this.scales);
  }
  getController(e) {
    return this._get(e, this.controllers, "controller");
  }
  getElement(e) {
    return this._get(e, this.elements, "element");
  }
  getPlugin(e) {
    return this._get(e, this.plugins, "plugin");
  }
  getScale(e) {
    return this._get(e, this.scales, "scale");
  }
  removeControllers(...e) {
    this._each("unregister", e, this.controllers);
  }
  removeElements(...e) {
    this._each("unregister", e, this.elements);
  }
  removePlugins(...e) {
    this._each("unregister", e, this.plugins);
  }
  removeScales(...e) {
    this._each("unregister", e, this.scales);
  }
  _each(e, n, i) {
    [...n].forEach((s) => {
      const r = i || this._getRegistryForType(s);
      i || r.isForType(s) || (r === this.plugins && s.id)
        ? this._exec(e, r, s)
        : X(s, (o) => {
            const l = i || this._getRegistryForType(o);
            this._exec(e, l, o);
          });
    });
  }
  _exec(e, n, i) {
    const s = wc(e);
    J(i["before" + s], [], i), n[e](i), J(i["after" + s], [], i);
  }
  _getRegistryForType(e) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const i = this._typedRegistries[n];
      if (i.isForType(e)) return i;
    }
    return this.plugins;
  }
  _get(e, n, i) {
    const s = n.get(e);
    if (s === void 0)
      throw new Error('"' + e + '" is not a registered ' + i + ".");
    return s;
  }
}
var wt = new M1();
class P1 {
  constructor() {
    this._init = [];
  }
  notify(e, n, i, s) {
    n === "beforeInit" &&
      ((this._init = this._createDescriptors(e, !0)),
      this._notify(this._init, e, "install"));
    const r = s ? this._descriptors(e).filter(s) : this._descriptors(e),
      o = this._notify(r, e, n, i);
    return (
      n === "afterDestroy" &&
        (this._notify(r, e, "stop"), this._notify(this._init, e, "uninstall")),
      o
    );
  }
  _notify(e, n, i, s) {
    s = s || {};
    for (const r of e) {
      const o = r.plugin,
        l = o[i],
        a = [n, s, r.options];
      if (J(l, a, o) === !1 && s.cancelable) return !1;
    }
    return !0;
  }
  invalidate() {
    ee(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
  }
  _descriptors(e) {
    if (this._cache) return this._cache;
    const n = (this._cache = this._createDescriptors(e));
    return this._notifyStateChanges(e), n;
  }
  _createDescriptors(e, n) {
    const i = e && e.config,
      s = K(i.options && i.options.plugins, {}),
      r = E1(i);
    return s === !1 && !n ? [] : T1(e, r, s, n);
  }
  _notifyStateChanges(e) {
    const n = this._oldCache || [],
      i = this._cache,
      s = (r, o) =>
        r.filter((l) => !o.some((a) => l.plugin.id === a.plugin.id));
    this._notify(s(n, i), e, "stop"), this._notify(s(i, n), e, "start");
  }
}
function E1(t) {
  const e = {},
    n = [],
    i = Object.keys(wt.plugins.items);
  for (let r = 0; r < i.length; r++) n.push(wt.getPlugin(i[r]));
  const s = t.plugins || [];
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    n.indexOf(o) === -1 && (n.push(o), (e[o.id] = !0));
  }
  return { plugins: n, localIds: e };
}
function D1(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function T1(t, { plugins: e, localIds: n }, i, s) {
  const r = [],
    o = t.getContext();
  for (const l of e) {
    const a = l.id,
      c = D1(i[a], s);
    c !== null &&
      r.push({
        plugin: l,
        options: O1(t.config, { plugin: l, local: n[a] }, c, o),
      });
  }
  return r;
}
function O1(t, { plugin: e, local: n }, i, s) {
  const r = t.pluginScopeKeys(e),
    o = t.getOptionScopes(i, r);
  return (
    n && e.defaults && o.push(e.defaults),
    t.createResolver(o, s, [""], { scriptable: !1, indexable: !1, allKeys: !0 })
  );
}
function ma(t, e) {
  const n = ue.datasets[t] || {};
  return (
    ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || n.indexAxis || "x"
  );
}
function L1(t, e) {
  let n = t;
  return (
    t === "_index_" ? (n = e) : t === "_value_" && (n = e === "x" ? "y" : "x"),
    n
  );
}
function R1(t, e) {
  return t === e ? "_index_" : "_value_";
}
function Ld(t) {
  if (t === "x" || t === "y" || t === "r") return t;
}
function A1(t) {
  if (t === "top" || t === "bottom") return "x";
  if (t === "left" || t === "right") return "y";
}
function ya(t, ...e) {
  if (Ld(t)) return t;
  for (const n of e) {
    const i =
      n.axis || A1(n.position) || (t.length > 1 && Ld(t[0].toLowerCase()));
    if (i) return i;
  }
  throw new Error(
    `Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`
  );
}
function Rd(t, e, n) {
  if (n[e + "AxisID"] === t) return { axis: e };
}
function I1(t, e) {
  if (e.data && e.data.datasets) {
    const n = e.data.datasets.filter((i) => i.xAxisID === t || i.yAxisID === t);
    if (n.length) return Rd(t, "x", n[0]) || Rd(t, "y", n[0]);
  }
  return {};
}
function j1(t, e) {
  const n = zn[t.type] || { scales: {} },
    i = e.scales || {},
    s = ma(t.type, e),
    r = Object.create(null);
  return (
    Object.keys(i).forEach((o) => {
      const l = i[o];
      if (!V(l))
        return console.error(`Invalid scale configuration for scale: ${o}`);
      if (l._proxy)
        return console.warn(
          `Ignoring resolver passed as options for scale: ${o}`
        );
      const a = ya(o, l, I1(o, t), ue.scales[l.type]),
        c = R1(a, s),
        u = n.scales || {};
      r[o] = rs(Object.create(null), [{ axis: a }, l, u[a], u[c]]);
    }),
    t.data.datasets.forEach((o) => {
      const l = o.type || t.type,
        a = o.indexAxis || ma(l, e),
        u = (zn[l] || {}).scales || {};
      Object.keys(u).forEach((d) => {
        const f = L1(d, a),
          m = o[f + "AxisID"] || f;
        (r[m] = r[m] || Object.create(null)),
          rs(r[m], [{ axis: f }, i[m], u[d]]);
      });
    }),
    Object.keys(r).forEach((o) => {
      const l = r[o];
      rs(l, [ue.scales[l.type], ue.scale]);
    }),
    r
  );
}
function sg(t) {
  const e = t.options || (t.options = {});
  (e.plugins = K(e.plugins, {})), (e.scales = j1(t, e));
}
function rg(t) {
  return (
    (t = t || {}),
    (t.datasets = t.datasets || []),
    (t.labels = t.labels || []),
    t
  );
}
function z1(t) {
  return (t = t || {}), (t.data = rg(t.data)), sg(t), t;
}
const Ad = new Map(),
  og = new Set();
function ur(t, e) {
  let n = Ad.get(t);
  return n || ((n = e()), Ad.set(t, n), og.add(n)), n;
}
const Wi = (t, e, n) => {
  const i = jn(e, n);
  i !== void 0 && t.add(i);
};
class N1 {
  constructor(e) {
    (this._config = z1(e)),
      (this._scopeCache = new Map()),
      (this._resolverCache = new Map());
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(e) {
    this._config.type = e;
  }
  get data() {
    return this._config.data;
  }
  set data(e) {
    this._config.data = rg(e);
  }
  get options() {
    return this._config.options;
  }
  set options(e) {
    this._config.options = e;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const e = this._config;
    this.clearCache(), sg(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return ur(e, () => [[`datasets.${e}`, ""]]);
  }
  datasetAnimationScopeKeys(e, n) {
    return ur(`${e}.transition.${n}`, () => [
      [`datasets.${e}.transitions.${n}`, `transitions.${n}`],
      [`datasets.${e}`, ""],
    ]);
  }
  datasetElementScopeKeys(e, n) {
    return ur(`${e}-${n}`, () => [
      [`datasets.${e}.elements.${n}`, `datasets.${e}`, `elements.${n}`, ""],
    ]);
  }
  pluginScopeKeys(e) {
    const n = e.id,
      i = this.type;
    return ur(`${i}-plugin-${n}`, () => [
      [`plugins.${n}`, ...(e.additionalOptionScopes || [])],
    ]);
  }
  _cachedScopes(e, n) {
    const i = this._scopeCache;
    let s = i.get(e);
    return (!s || n) && ((s = new Map()), i.set(e, s)), s;
  }
  getOptionScopes(e, n, i) {
    const { options: s, type: r } = this,
      o = this._cachedScopes(e, i),
      l = o.get(n);
    if (l) return l;
    const a = new Set();
    n.forEach((u) => {
      e && (a.add(e), u.forEach((d) => Wi(a, e, d))),
        u.forEach((d) => Wi(a, s, d)),
        u.forEach((d) => Wi(a, zn[r] || {}, d)),
        u.forEach((d) => Wi(a, ue, d)),
        u.forEach((d) => Wi(a, pa, d));
    });
    const c = Array.from(a);
    return (
      c.length === 0 && c.push(Object.create(null)), og.has(n) && o.set(n, c), c
    );
  }
  chartOptionScopes() {
    const { options: e, type: n } = this;
    return [e, zn[n] || {}, ue.datasets[n] || {}, { type: n }, ue, pa];
  }
  resolveNamedOptions(e, n, i, s = [""]) {
    const r = { $shared: !0 },
      { resolver: o, subPrefixes: l } = Id(this._resolverCache, e, s);
    let a = o;
    if (B1(o, n)) {
      (r.$shared = !1), (i = dn(i) ? i() : i);
      const c = this.createResolver(e, i, l);
      a = Si(o, i, c);
    }
    for (const c of n) r[c] = a[c];
    return r;
  }
  createResolver(e, n, i = [""], s) {
    const { resolver: r } = Id(this._resolverCache, e, i);
    return V(n) ? Si(r, n, void 0, s) : r;
  }
}
function Id(t, e, n) {
  let i = t.get(e);
  i || ((i = new Map()), t.set(e, i));
  const s = n.join();
  let r = i.get(s);
  return (
    r ||
      ((r = {
        resolver: Ec(e, n),
        subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover")),
      }),
      i.set(s, r)),
    r
  );
}
const F1 = (t) => V(t) && Object.getOwnPropertyNames(t).some((e) => dn(t[e]));
function B1(t, e) {
  const { isScriptable: n, isIndexable: i } = Vp(t);
  for (const s of e) {
    const r = n(s),
      o = i(s),
      l = (o || r) && t[s];
    if ((r && (dn(l) || F1(l))) || (o && ge(l))) return !0;
  }
  return !1;
}
var $1 = "4.4.4";
const W1 = ["top", "bottom", "left", "right", "chartArea"];
function jd(t, e) {
  return t === "top" || t === "bottom" || (W1.indexOf(t) === -1 && e === "x");
}
function zd(t, e) {
  return function (n, i) {
    return n[t] === i[t] ? n[e] - i[e] : n[t] - i[t];
  };
}
function Nd(t) {
  const e = t.chart,
    n = e.options.animation;
  e.notifyPlugins("afterRender"), J(n && n.onComplete, [t], e);
}
function H1(t) {
  const e = t.chart,
    n = e.options.animation;
  J(n && n.onProgress, [t], e);
}
function lg(t) {
  return (
    Oc() && typeof t == "string"
      ? (t = document.getElementById(t))
      : t && t.length && (t = t[0]),
    t && t.canvas && (t = t.canvas),
    t
  );
}
const Dr = {},
  Fd = (t) => {
    const e = lg(t);
    return Object.values(Dr)
      .filter((n) => n.canvas === e)
      .pop();
  };
function V1(t, e, n) {
  const i = Object.keys(t);
  for (const s of i) {
    const r = +s;
    if (r >= e) {
      const o = t[s];
      delete t[s], (n > 0 || r > e) && (t[r + n] = o);
    }
  }
}
function U1(t, e, n, i) {
  return !n || t.type === "mouseout" ? null : i ? e : t;
}
function dr(t, e, n) {
  return t.options.clip ? t[n] : e[n];
}
function Y1(t, e) {
  const { xScale: n, yScale: i } = t;
  return n && i
    ? {
        left: dr(n, e, "left"),
        right: dr(n, e, "right"),
        top: dr(i, e, "top"),
        bottom: dr(i, e, "bottom"),
      }
    : e;
}
var Ht;
let $n =
  ((Ht = class {
    static register(...e) {
      wt.add(...e), Bd();
    }
    static unregister(...e) {
      wt.remove(...e), Bd();
    }
    constructor(e, n) {
      const i = (this.config = new N1(n)),
        s = lg(e),
        r = Fd(s);
      if (r)
        throw new Error(
          "Canvas is already in use. Chart with ID '" +
            r.id +
            "' must be destroyed before the canvas with ID '" +
            r.canvas.id +
            "' can be reused."
        );
      const o = i.createResolver(i.chartOptionScopes(), this.getContext());
      (this.platform = new (i.platform || c1(s))()),
        this.platform.updateConfig(i);
      const l = this.platform.acquireContext(s, o.aspectRatio),
        a = l && l.canvas,
        c = a && a.height,
        u = a && a.width;
      if (
        ((this.id = fv()),
        (this.ctx = l),
        (this.canvas = a),
        (this.width = u),
        (this.height = c),
        (this._options = o),
        (this._aspectRatio = this.aspectRatio),
        (this._layers = []),
        (this._metasets = []),
        (this._stacks = void 0),
        (this.boxes = []),
        (this.currentDevicePixelRatio = void 0),
        (this.chartArea = void 0),
        (this._active = []),
        (this._lastEvent = void 0),
        (this._listeners = {}),
        (this._responsiveListeners = void 0),
        (this._sortedMetasets = []),
        (this.scales = {}),
        (this._plugins = new P1()),
        (this.$proxies = {}),
        (this._hiddenIndices = {}),
        (this.attached = !1),
        (this._animationsDisabled = void 0),
        (this.$context = void 0),
        (this._doResize = Dv((d) => this.update(d), o.resizeDelay || 0)),
        (this._dataChanges = []),
        (Dr[this.id] = this),
        !l || !a)
      ) {
        console.error(
          "Failed to create chart: can't acquire context from the given item"
        );
        return;
      }
      Pt.listen(this, "complete", Nd),
        Pt.listen(this, "progress", H1),
        this._initialize(),
        this.attached && this.update();
    }
    get aspectRatio() {
      const {
        options: { aspectRatio: e, maintainAspectRatio: n },
        width: i,
        height: s,
        _aspectRatio: r,
      } = this;
      return ee(e) ? (n && r ? r : s ? i / s : null) : e;
    }
    get data() {
      return this.config.data;
    }
    set data(e) {
      this.config.data = e;
    }
    get options() {
      return this._options;
    }
    set options(e) {
      this.config.options = e;
    }
    get registry() {
      return wt;
    }
    _initialize() {
      return (
        this.notifyPlugins("beforeInit"),
        this.options.responsive
          ? this.resize()
          : ud(this, this.options.devicePixelRatio),
        this.bindEvents(),
        this.notifyPlugins("afterInit"),
        this
      );
    }
    clear() {
      return od(this.canvas, this.ctx), this;
    }
    stop() {
      return Pt.stop(this), this;
    }
    resize(e, n) {
      Pt.running(this)
        ? (this._resizeBeforeDraw = { width: e, height: n })
        : this._resize(e, n);
    }
    _resize(e, n) {
      const i = this.options,
        s = this.canvas,
        r = i.maintainAspectRatio && this.aspectRatio,
        o = this.platform.getMaximumSize(s, e, n, r),
        l = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
        a = this.width ? "resize" : "attach";
      (this.width = o.width),
        (this.height = o.height),
        (this._aspectRatio = this.aspectRatio),
        ud(this, l, !0) &&
          (this.notifyPlugins("resize", { size: o }),
          J(i.onResize, [this, o], this),
          this.attached && this._doResize(a) && this.render());
    }
    ensureScalesHaveIDs() {
      const n = this.options.scales || {};
      X(n, (i, s) => {
        i.id = s;
      });
    }
    buildOrUpdateScales() {
      const e = this.options,
        n = e.scales,
        i = this.scales,
        s = Object.keys(i).reduce((o, l) => ((o[l] = !1), o), {});
      let r = [];
      n &&
        (r = r.concat(
          Object.keys(n).map((o) => {
            const l = n[o],
              a = ya(o, l),
              c = a === "r",
              u = a === "x";
            return {
              options: l,
              dposition: c ? "chartArea" : u ? "bottom" : "left",
              dtype: c ? "radialLinear" : u ? "category" : "linear",
            };
          })
        )),
        X(r, (o) => {
          const l = o.options,
            a = l.id,
            c = ya(a, l),
            u = K(l.type, o.dtype);
          (l.position === void 0 || jd(l.position, c) !== jd(o.dposition)) &&
            (l.position = o.dposition),
            (s[a] = !0);
          let d = null;
          if (a in i && i[a].type === u) d = i[a];
          else {
            const f = wt.getScale(u);
            (d = new f({ id: a, type: u, ctx: this.ctx, chart: this })),
              (i[d.id] = d);
          }
          d.init(l, e);
        }),
        X(s, (o, l) => {
          o || delete i[l];
        }),
        X(i, (o) => {
          tt.configure(this, o, o.options), tt.addBox(this, o);
        });
    }
    _updateMetasets() {
      const e = this._metasets,
        n = this.data.datasets.length,
        i = e.length;
      if ((e.sort((s, r) => s.index - r.index), i > n)) {
        for (let s = n; s < i; ++s) this._destroyDatasetMeta(s);
        e.splice(n, i - n);
      }
      this._sortedMetasets = e.slice(0).sort(zd("order", "index"));
    }
    _removeUnreferencedMetasets() {
      const {
        _metasets: e,
        data: { datasets: n },
      } = this;
      e.length > n.length && delete this._stacks,
        e.forEach((i, s) => {
          n.filter((r) => r === i._dataset).length === 0 &&
            this._destroyDatasetMeta(s);
        });
    }
    buildOrUpdateControllers() {
      const e = [],
        n = this.data.datasets;
      let i, s;
      for (
        this._removeUnreferencedMetasets(), i = 0, s = n.length;
        i < s;
        i++
      ) {
        const r = n[i];
        let o = this.getDatasetMeta(i);
        const l = r.type || this.config.type;
        if (
          (o.type &&
            o.type !== l &&
            (this._destroyDatasetMeta(i), (o = this.getDatasetMeta(i))),
          (o.type = l),
          (o.indexAxis = r.indexAxis || ma(l, this.options)),
          (o.order = r.order || 0),
          (o.index = i),
          (o.label = "" + r.label),
          (o.visible = this.isDatasetVisible(i)),
          o.controller)
        )
          o.controller.updateIndex(i), o.controller.linkScales();
        else {
          const a = wt.getController(l),
            { datasetElementType: c, dataElementType: u } = ue.datasets[l];
          Object.assign(a, {
            dataElementType: wt.getElement(u),
            datasetElementType: c && wt.getElement(c),
          }),
            (o.controller = new a(this, i)),
            e.push(o.controller);
        }
      }
      return this._updateMetasets(), e;
    }
    _resetElements() {
      X(
        this.data.datasets,
        (e, n) => {
          this.getDatasetMeta(n).controller.reset();
        },
        this
      );
    }
    reset() {
      this._resetElements(), this.notifyPlugins("reset");
    }
    update(e) {
      const n = this.config;
      n.update();
      const i = (this._options = n.createResolver(
          n.chartOptionScopes(),
          this.getContext()
        )),
        s = (this._animationsDisabled = !i.animation);
      if (
        (this._updateScales(),
        this._checkEventBindings(),
        this._updateHiddenIndices(),
        this._plugins.invalidate(),
        this.notifyPlugins("beforeUpdate", { mode: e, cancelable: !0 }) === !1)
      )
        return;
      const r = this.buildOrUpdateControllers();
      this.notifyPlugins("beforeElementsUpdate");
      let o = 0;
      for (let c = 0, u = this.data.datasets.length; c < u; c++) {
        const { controller: d } = this.getDatasetMeta(c),
          f = !s && r.indexOf(d) === -1;
        d.buildOrUpdateElements(f), (o = Math.max(+d.getMaxOverflow(), o));
      }
      (o = this._minPadding = i.layout.autoPadding ? o : 0),
        this._updateLayout(o),
        s ||
          X(r, (c) => {
            c.reset();
          }),
        this._updateDatasets(e),
        this.notifyPlugins("afterUpdate", { mode: e }),
        this._layers.sort(zd("z", "_idx"));
      const { _active: l, _lastEvent: a } = this;
      a
        ? this._eventHandler(a, !0)
        : l.length && this._updateHoverStyles(l, l, !0),
        this.render();
    }
    _updateScales() {
      X(this.scales, (e) => {
        tt.removeBox(this, e);
      }),
        this.ensureScalesHaveIDs(),
        this.buildOrUpdateScales();
    }
    _checkEventBindings() {
      const e = this.options,
        n = new Set(Object.keys(this._listeners)),
        i = new Set(e.events);
      (!Qu(n, i) || !!this._responsiveListeners !== e.responsive) &&
        (this.unbindEvents(), this.bindEvents());
    }
    _updateHiddenIndices() {
      const { _hiddenIndices: e } = this,
        n = this._getUniformDataChanges() || [];
      for (const { method: i, start: s, count: r } of n) {
        const o = i === "_removeElements" ? -r : r;
        V1(e, s, o);
      }
    }
    _getUniformDataChanges() {
      const e = this._dataChanges;
      if (!e || !e.length) return;
      this._dataChanges = [];
      const n = this.data.datasets.length,
        i = (r) =>
          new Set(
            e
              .filter((o) => o[0] === r)
              .map((o, l) => l + "," + o.splice(1).join(","))
          ),
        s = i(0);
      for (let r = 1; r < n; r++) if (!Qu(s, i(r))) return;
      return Array.from(s)
        .map((r) => r.split(","))
        .map((r) => ({ method: r[1], start: +r[2], count: +r[3] }));
    }
    _updateLayout(e) {
      if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1) return;
      tt.update(this, this.width, this.height, e);
      const n = this.chartArea,
        i = n.width <= 0 || n.height <= 0;
      (this._layers = []),
        X(
          this.boxes,
          (s) => {
            (i && s.position === "chartArea") ||
              (s.configure && s.configure(), this._layers.push(...s._layers()));
          },
          this
        ),
        this._layers.forEach((s, r) => {
          s._idx = r;
        }),
        this.notifyPlugins("afterLayout");
    }
    _updateDatasets(e) {
      if (
        this.notifyPlugins("beforeDatasetsUpdate", {
          mode: e,
          cancelable: !0,
        }) !== !1
      ) {
        for (let n = 0, i = this.data.datasets.length; n < i; ++n)
          this.getDatasetMeta(n).controller.configure();
        for (let n = 0, i = this.data.datasets.length; n < i; ++n)
          this._updateDataset(n, dn(e) ? e({ datasetIndex: n }) : e);
        this.notifyPlugins("afterDatasetsUpdate", { mode: e });
      }
    }
    _updateDataset(e, n) {
      const i = this.getDatasetMeta(e),
        s = { meta: i, index: e, mode: n, cancelable: !0 };
      this.notifyPlugins("beforeDatasetUpdate", s) !== !1 &&
        (i.controller._update(n),
        (s.cancelable = !1),
        this.notifyPlugins("afterDatasetUpdate", s));
    }
    render() {
      this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 &&
        (Pt.has(this)
          ? this.attached && !Pt.running(this) && Pt.start(this)
          : (this.draw(), Nd({ chart: this })));
    }
    draw() {
      let e;
      if (this._resizeBeforeDraw) {
        const { width: i, height: s } = this._resizeBeforeDraw;
        (this._resizeBeforeDraw = null), this._resize(i, s);
      }
      if (
        (this.clear(),
        this.width <= 0 ||
          this.height <= 0 ||
          this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1)
      )
        return;
      const n = this._layers;
      for (e = 0; e < n.length && n[e].z <= 0; ++e) n[e].draw(this.chartArea);
      for (this._drawDatasets(); e < n.length; ++e) n[e].draw(this.chartArea);
      this.notifyPlugins("afterDraw");
    }
    _getSortedDatasetMetas(e) {
      const n = this._sortedMetasets,
        i = [];
      let s, r;
      for (s = 0, r = n.length; s < r; ++s) {
        const o = n[s];
        (!e || o.visible) && i.push(o);
      }
      return i;
    }
    getSortedVisibleDatasetMetas() {
      return this._getSortedDatasetMetas(!0);
    }
    _drawDatasets() {
      if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1)
        return;
      const e = this.getSortedVisibleDatasetMetas();
      for (let n = e.length - 1; n >= 0; --n) this._drawDataset(e[n]);
      this.notifyPlugins("afterDatasetsDraw");
    }
    _drawDataset(e) {
      const n = this.ctx,
        i = e._clip,
        s = !i.disabled,
        r = Y1(e, this.chartArea),
        o = { meta: e, index: e.index, cancelable: !0 };
      this.notifyPlugins("beforeDatasetDraw", o) !== !1 &&
        (s &&
          Cc(n, {
            left: i.left === !1 ? 0 : r.left - i.left,
            right: i.right === !1 ? this.width : r.right + i.right,
            top: i.top === !1 ? 0 : r.top - i.top,
            bottom: i.bottom === !1 ? this.height : r.bottom + i.bottom,
          }),
        e.controller.draw(),
        s && Mc(n),
        (o.cancelable = !1),
        this.notifyPlugins("afterDatasetDraw", o));
    }
    isPointInArea(e) {
      return Wp(e, this.chartArea, this._minPadding);
    }
    getElementsAtEventForMode(e, n, i, s) {
      const r = Wx.modes[n];
      return typeof r == "function" ? r(this, e, i, s) : [];
    }
    getDatasetMeta(e) {
      const n = this.data.datasets[e],
        i = this._metasets;
      let s = i.filter((r) => r && r._dataset === n).pop();
      return (
        s ||
          ((s = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: (n && n.order) || 0,
            index: e,
            _dataset: n,
            _parsed: [],
            _sorted: !1,
          }),
          i.push(s)),
        s
      );
    }
    getContext() {
      return (
        this.$context ||
        (this.$context = Ei(null, { chart: this, type: "chart" }))
      );
    }
    getVisibleDatasetCount() {
      return this.getSortedVisibleDatasetMetas().length;
    }
    isDatasetVisible(e) {
      const n = this.data.datasets[e];
      if (!n) return !1;
      const i = this.getDatasetMeta(e);
      return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
    }
    setDatasetVisibility(e, n) {
      const i = this.getDatasetMeta(e);
      i.hidden = !n;
    }
    toggleDataVisibility(e) {
      this._hiddenIndices[e] = !this._hiddenIndices[e];
    }
    getDataVisibility(e) {
      return !this._hiddenIndices[e];
    }
    _updateVisibility(e, n, i) {
      const s = i ? "show" : "hide",
        r = this.getDatasetMeta(e),
        o = r.controller._resolveAnimations(void 0, s);
      Es(n)
        ? ((r.data[n].hidden = !i), this.update())
        : (this.setDatasetVisibility(e, i),
          o.update(r, { visible: i }),
          this.update((l) => (l.datasetIndex === e ? s : void 0)));
    }
    hide(e, n) {
      this._updateVisibility(e, n, !1);
    }
    show(e, n) {
      this._updateVisibility(e, n, !0);
    }
    _destroyDatasetMeta(e) {
      const n = this._metasets[e];
      n && n.controller && n.controller._destroy(), delete this._metasets[e];
    }
    _stop() {
      let e, n;
      for (
        this.stop(), Pt.remove(this), e = 0, n = this.data.datasets.length;
        e < n;
        ++e
      )
        this._destroyDatasetMeta(e);
    }
    destroy() {
      this.notifyPlugins("beforeDestroy");
      const { canvas: e, ctx: n } = this;
      this._stop(),
        this.config.clearCache(),
        e &&
          (this.unbindEvents(),
          od(e, n),
          this.platform.releaseContext(n),
          (this.canvas = null),
          (this.ctx = null)),
        delete Dr[this.id],
        this.notifyPlugins("afterDestroy");
    }
    toBase64Image(...e) {
      return this.canvas.toDataURL(...e);
    }
    bindEvents() {
      this.bindUserEvents(),
        this.options.responsive
          ? this.bindResponsiveEvents()
          : (this.attached = !0);
    }
    bindUserEvents() {
      const e = this._listeners,
        n = this.platform,
        i = (r, o) => {
          n.addEventListener(this, r, o), (e[r] = o);
        },
        s = (r, o, l) => {
          (r.offsetX = o), (r.offsetY = l), this._eventHandler(r);
        };
      X(this.options.events, (r) => i(r, s));
    }
    bindResponsiveEvents() {
      this._responsiveListeners || (this._responsiveListeners = {});
      const e = this._responsiveListeners,
        n = this.platform,
        i = (a, c) => {
          n.addEventListener(this, a, c), (e[a] = c);
        },
        s = (a, c) => {
          e[a] && (n.removeEventListener(this, a, c), delete e[a]);
        },
        r = (a, c) => {
          this.canvas && this.resize(a, c);
        };
      let o;
      const l = () => {
        s("attach", l),
          (this.attached = !0),
          this.resize(),
          i("resize", r),
          i("detach", o);
      };
      (o = () => {
        (this.attached = !1),
          s("resize", r),
          this._stop(),
          this._resize(0, 0),
          i("attach", l);
      }),
        n.isAttached(this.canvas) ? l() : o();
    }
    unbindEvents() {
      X(this._listeners, (e, n) => {
        this.platform.removeEventListener(this, n, e);
      }),
        (this._listeners = {}),
        X(this._responsiveListeners, (e, n) => {
          this.platform.removeEventListener(this, n, e);
        }),
        (this._responsiveListeners = void 0);
    }
    updateHoverStyle(e, n, i) {
      const s = i ? "set" : "remove";
      let r, o, l, a;
      for (
        n === "dataset" &&
          ((r = this.getDatasetMeta(e[0].datasetIndex)),
          r.controller["_" + s + "DatasetHoverStyle"]()),
          l = 0,
          a = e.length;
        l < a;
        ++l
      ) {
        o = e[l];
        const c = o && this.getDatasetMeta(o.datasetIndex).controller;
        c && c[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
      }
    }
    getActiveElements() {
      return this._active || [];
    }
    setActiveElements(e) {
      const n = this._active || [],
        i = e.map(({ datasetIndex: r, index: o }) => {
          const l = this.getDatasetMeta(r);
          if (!l) throw new Error("No dataset found at index " + r);
          return { datasetIndex: r, element: l.data[o], index: o };
        });
      !eo(i, n) &&
        ((this._active = i),
        (this._lastEvent = null),
        this._updateHoverStyles(i, n));
    }
    notifyPlugins(e, n, i) {
      return this._plugins.notify(this, e, n, i);
    }
    isPluginEnabled(e) {
      return this._plugins._cache.filter((n) => n.plugin.id === e).length === 1;
    }
    _updateHoverStyles(e, n, i) {
      const s = this.options.hover,
        r = (a, c) =>
          a.filter(
            (u) =>
              !c.some(
                (d) => u.datasetIndex === d.datasetIndex && u.index === d.index
              )
          ),
        o = r(n, e),
        l = i ? e : r(e, n);
      o.length && this.updateHoverStyle(o, s.mode, !1),
        l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
    }
    _eventHandler(e, n) {
      const i = {
          event: e,
          replay: n,
          cancelable: !0,
          inChartArea: this.isPointInArea(e),
        },
        s = (o) =>
          (o.options.events || this.options.events).includes(e.native.type);
      if (this.notifyPlugins("beforeEvent", i, s) === !1) return;
      const r = this._handleEvent(e, n, i.inChartArea);
      return (
        (i.cancelable = !1),
        this.notifyPlugins("afterEvent", i, s),
        (r || i.changed) && this.render(),
        this
      );
    }
    _handleEvent(e, n, i) {
      const { _active: s = [], options: r } = this,
        o = n,
        l = this._getActiveElements(e, s, i, o),
        a = vv(e),
        c = U1(e, this._lastEvent, i, a);
      i &&
        ((this._lastEvent = null),
        J(r.onHover, [e, l, this], this),
        a && J(r.onClick, [e, l, this], this));
      const u = !eo(l, s);
      return (
        (u || n) && ((this._active = l), this._updateHoverStyles(l, s, n)),
        (this._lastEvent = c),
        u
      );
    }
    _getActiveElements(e, n, i, s) {
      if (e.type === "mouseout") return [];
      if (!i) return n;
      const r = this.options.hover;
      return this.getElementsAtEventForMode(e, r.mode, r, s);
    }
  }),
  F(Ht, "defaults", ue),
  F(Ht, "instances", Dr),
  F(Ht, "overrides", zn),
  F(Ht, "registry", wt),
  F(Ht, "version", $1),
  F(Ht, "getChart", Fd),
  Ht);
function Bd() {
  return X($n.instances, (t) => t._plugins.invalidate());
}
function K1(t, e, n) {
  const {
    startAngle: i,
    pixelMargin: s,
    x: r,
    y: o,
    outerRadius: l,
    innerRadius: a,
  } = e;
  let c = s / l;
  t.beginPath(),
    t.arc(r, o, l, i - c, n + c),
    a > s
      ? ((c = s / a), t.arc(r, o, a, n + c, i - c, !0))
      : t.arc(r, o, s, n + ye, i - ye),
    t.closePath(),
    t.clip();
}
function X1(t) {
  return Pc(t, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
}
function G1(t, e, n, i) {
  const s = X1(t.options.borderRadius),
    r = (n - e) / 2,
    o = Math.min(r, (i * e) / 2),
    l = (a) => {
      const c = ((n - Math.min(r, a)) * i) / 2;
      return Be(a, 0, Math.min(r, c));
    };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Be(s.innerStart, 0, o),
    innerEnd: Be(s.innerEnd, 0, o),
  };
}
function Un(t, e, n, i) {
  return { x: n + t * Math.cos(e), y: i + t * Math.sin(e) };
}
function ao(t, e, n, i, s, r) {
  const { x: o, y: l, startAngle: a, pixelMargin: c, innerRadius: u } = e,
    d = Math.max(e.outerRadius + i + n - c, 0),
    f = u > 0 ? u + i + n + c : 0;
  let m = 0;
  const v = s - a;
  if (i) {
    const O = u > 0 ? u - i : 0,
      I = d > 0 ? d - i : 0,
      N = (O + I) / 2,
      D = N !== 0 ? (v * N) / (N + i) : v;
    m = (v - D) / 2;
  }
  const g = Math.max(0.001, v * d - n / he) / d,
    x = (v - g) / 2,
    p = a + x + m,
    h = s - x - m,
    {
      outerStart: y,
      outerEnd: _,
      innerStart: w,
      innerEnd: k,
    } = G1(e, f, d, h - p),
    b = d - y,
    C = d - _,
    E = p + y / b,
    M = h - _ / C,
    T = f + w,
    A = f + k,
    $ = p + w / T,
    Q = h - k / A;
  if ((t.beginPath(), r)) {
    const O = (E + M) / 2;
    if ((t.arc(o, l, d, E, O), t.arc(o, l, d, O, M), _ > 0)) {
      const L = Un(C, M, o, l);
      t.arc(L.x, L.y, _, M, h + ye);
    }
    const I = Un(A, h, o, l);
    if ((t.lineTo(I.x, I.y), k > 0)) {
      const L = Un(A, Q, o, l);
      t.arc(L.x, L.y, k, h + ye, Q + Math.PI);
    }
    const N = (h - k / f + (p + w / f)) / 2;
    if (
      (t.arc(o, l, f, h - k / f, N, !0),
      t.arc(o, l, f, N, p + w / f, !0),
      w > 0)
    ) {
      const L = Un(T, $, o, l);
      t.arc(L.x, L.y, w, $ + Math.PI, p - ye);
    }
    const D = Un(b, p, o, l);
    if ((t.lineTo(D.x, D.y), y > 0)) {
      const L = Un(b, E, o, l);
      t.arc(L.x, L.y, y, p - ye, E);
    }
  } else {
    t.moveTo(o, l);
    const O = Math.cos(E) * d + o,
      I = Math.sin(E) * d + l;
    t.lineTo(O, I);
    const N = Math.cos(M) * d + o,
      D = Math.sin(M) * d + l;
    t.lineTo(N, D);
  }
  t.closePath();
}
function Q1(t, e, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l } = e;
  let a = e.endAngle;
  if (r) {
    ao(t, e, n, i, a, s);
    for (let c = 0; c < r; ++c) t.fill();
    isNaN(l) || (a = o + (l % fe || fe));
  }
  return ao(t, e, n, i, a, s), t.fill(), a;
}
function Z1(t, e, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l, options: a } = e,
    {
      borderWidth: c,
      borderJoinStyle: u,
      borderDash: d,
      borderDashOffset: f,
    } = a,
    m = a.borderAlign === "inner";
  if (!c) return;
  t.setLineDash(d || []),
    (t.lineDashOffset = f),
    m
      ? ((t.lineWidth = c * 2), (t.lineJoin = u || "round"))
      : ((t.lineWidth = c), (t.lineJoin = u || "bevel"));
  let v = e.endAngle;
  if (r) {
    ao(t, e, n, i, v, s);
    for (let g = 0; g < r; ++g) t.stroke();
    isNaN(l) || (v = o + (l % fe || fe));
  }
  m && K1(t, e, v), r || (ao(t, e, n, i, v, s), t.stroke());
}
class ri extends Bt {
  constructor(n) {
    super();
    F(this, "circumference");
    F(this, "endAngle");
    F(this, "fullCircles");
    F(this, "innerRadius");
    F(this, "outerRadius");
    F(this, "pixelMargin");
    F(this, "startAngle");
    (this.options = void 0),
      (this.circumference = void 0),
      (this.startAngle = void 0),
      (this.endAngle = void 0),
      (this.innerRadius = void 0),
      (this.outerRadius = void 0),
      (this.pixelMargin = 0),
      (this.fullCircles = 0),
      n && Object.assign(this, n);
  }
  inRange(n, i, s) {
    const r = this.getProps(["x", "y"], s),
      { angle: o, distance: l } = Rp(r, { x: n, y: i }),
      {
        startAngle: a,
        endAngle: c,
        innerRadius: u,
        outerRadius: d,
        circumference: f,
      } = this.getProps(
        [
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "circumference",
        ],
        s
      ),
      m = (this.options.spacing + this.options.borderWidth) / 2,
      v = K(f, c - a),
      g = so(o, a, c) && a !== c,
      x = v >= fe || g,
      p = Cn(l, u + m, d + m);
    return x && p;
  }
  getCenterPoint(n) {
    const {
        x: i,
        y: s,
        startAngle: r,
        endAngle: o,
        innerRadius: l,
        outerRadius: a,
      } = this.getProps(
        ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"],
        n
      ),
      { offset: c, spacing: u } = this.options,
      d = (r + o) / 2,
      f = (l + a + u + c) / 2;
    return { x: i + Math.cos(d) * f, y: s + Math.sin(d) * f };
  }
  tooltipPosition(n) {
    return this.getCenterPoint(n);
  }
  draw(n) {
    const { options: i, circumference: s } = this,
      r = (i.offset || 0) / 4,
      o = (i.spacing || 0) / 2,
      l = i.circular;
    if (
      ((this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0),
      (this.fullCircles = s > fe ? Math.floor(s / fe) : 0),
      s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
    )
      return;
    n.save();
    const a = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(a) * r, Math.sin(a) * r);
    const c = 1 - Math.sin(Math.min(he, s || 0)),
      u = r * c;
    (n.fillStyle = i.backgroundColor),
      (n.strokeStyle = i.borderColor),
      Q1(n, this, u, o, l),
      Z1(n, this, u, o, l),
      n.restore();
  }
}
F(ri, "id", "arc"),
  F(ri, "defaults", {
    borderAlign: "center",
    borderColor: "#fff",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
  }),
  F(ri, "defaultRoutes", { backgroundColor: "backgroundColor" }),
  F(ri, "descriptors", {
    _scriptable: !0,
    _indexable: (n) => n !== "borderDash",
  });
function ag(t, e) {
  const {
    x: n,
    y: i,
    base: s,
    width: r,
    height: o,
  } = t.getProps(["x", "y", "base", "width", "height"], e);
  let l, a, c, u, d;
  return (
    t.horizontal
      ? ((d = o / 2),
        (l = Math.min(n, s)),
        (a = Math.max(n, s)),
        (c = i - d),
        (u = i + d))
      : ((d = r / 2),
        (l = n - d),
        (a = n + d),
        (c = Math.min(i, s)),
        (u = Math.max(i, s))),
    { left: l, top: c, right: a, bottom: u }
  );
}
function Zt(t, e, n, i) {
  return t ? 0 : Be(e, n, i);
}
function q1(t, e, n) {
  const i = t.options.borderWidth,
    s = t.borderSkipped,
    r = Hp(i);
  return {
    t: Zt(s.top, r.top, 0, n),
    r: Zt(s.right, r.right, 0, e),
    b: Zt(s.bottom, r.bottom, 0, n),
    l: Zt(s.left, r.left, 0, e),
  };
}
function J1(t, e, n) {
  const { enableBorderRadius: i } = t.getProps(["enableBorderRadius"]),
    s = t.options.borderRadius,
    r = fi(s),
    o = Math.min(e, n),
    l = t.borderSkipped,
    a = i || V(s);
  return {
    topLeft: Zt(!a || l.top || l.left, r.topLeft, 0, o),
    topRight: Zt(!a || l.top || l.right, r.topRight, 0, o),
    bottomLeft: Zt(!a || l.bottom || l.left, r.bottomLeft, 0, o),
    bottomRight: Zt(!a || l.bottom || l.right, r.bottomRight, 0, o),
  };
}
function e_(t) {
  const e = ag(t),
    n = e.right - e.left,
    i = e.bottom - e.top,
    s = q1(t, n / 2, i / 2),
    r = J1(t, n / 2, i / 2);
  return {
    outer: { x: e.left, y: e.top, w: n, h: i, radius: r },
    inner: {
      x: e.left + s.l,
      y: e.top + s.t,
      w: n - s.l - s.r,
      h: i - s.t - s.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, r.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(s.b, s.r)),
      },
    },
  };
}
function pl(t, e, n, i) {
  const s = e === null,
    r = n === null,
    l = t && !(s && r) && ag(t, i);
  return l && (s || Cn(e, l.left, l.right)) && (r || Cn(n, l.top, l.bottom));
}
function t_(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function n_(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function gl(t, e, n = {}) {
  const i = t.x !== n.x ? -e : 0,
    s = t.y !== n.y ? -e : 0,
    r = (t.x + t.w !== n.x + n.w ? e : 0) - i,
    o = (t.y + t.h !== n.y + n.h ? e : 0) - s;
  return { x: t.x + i, y: t.y + s, w: t.w + r, h: t.h + o, radius: t.radius };
}
class as extends Bt {
  constructor(e) {
    super(),
      (this.options = void 0),
      (this.horizontal = void 0),
      (this.base = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.inflateAmount = void 0),
      e && Object.assign(this, e);
  }
  draw(e) {
    const {
        inflateAmount: n,
        options: { borderColor: i, backgroundColor: s },
      } = this,
      { inner: r, outer: o } = e_(this),
      l = t_(o.radius) ? ro : n_;
    e.save(),
      (o.w !== r.w || o.h !== r.h) &&
        (e.beginPath(),
        l(e, gl(o, n, r)),
        e.clip(),
        l(e, gl(r, -n, o)),
        (e.fillStyle = i),
        e.fill("evenodd")),
      e.beginPath(),
      l(e, gl(r, n)),
      (e.fillStyle = s),
      e.fill(),
      e.restore();
  }
  inRange(e, n, i) {
    return pl(this, e, n, i);
  }
  inXRange(e, n) {
    return pl(this, e, null, n);
  }
  inYRange(e, n) {
    return pl(this, null, e, n);
  }
  getCenterPoint(e) {
    const {
      x: n,
      y: i,
      base: s,
      horizontal: r,
    } = this.getProps(["x", "y", "base", "horizontal"], e);
    return { x: r ? (n + s) / 2 : n, y: r ? i : (i + s) / 2 };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
F(as, "id", "bar"),
  F(as, "defaults", {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0,
  }),
  F(as, "defaultRoutes", {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor",
  });
const $d = (t, e) => {
    let { boxHeight: n = e, boxWidth: i = e } = t;
    return (
      t.usePointStyle &&
        ((n = Math.min(n, e)), (i = t.pointStyleWidth || Math.min(i, e))),
      { boxWidth: i, boxHeight: n, itemHeight: Math.max(e, n) }
    );
  },
  i_ = (t, e) =>
    t !== null &&
    e !== null &&
    t.datasetIndex === e.datasetIndex &&
    t.index === e.index;
class Wd extends Bt {
  constructor(e) {
    super(),
      (this._added = !1),
      (this.legendHitBoxes = []),
      (this._hoveredItem = null),
      (this.doughnutMode = !1),
      (this.chart = e.chart),
      (this.options = e.options),
      (this.ctx = e.ctx),
      (this.legendItems = void 0),
      (this.columnSizes = void 0),
      (this.lineWidths = void 0),
      (this.maxHeight = void 0),
      (this.maxWidth = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this._margins = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(e, n, i) {
    (this.maxWidth = e),
      (this.maxHeight = n),
      (this._margins = i),
      this.setDimensions(),
      this.buildLabels(),
      this.fit();
  }
  setDimensions() {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = this._margins.left),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = this._margins.top),
        (this.bottom = this.height));
  }
  buildLabels() {
    const e = this.options.labels || {};
    let n = J(e.generateLabels, [this.chart], this) || [];
    e.filter && (n = n.filter((i) => e.filter(i, this.chart.data))),
      e.sort && (n = n.sort((i, s) => e.sort(i, s, this.chart.data))),
      this.options.reverse && n.reverse(),
      (this.legendItems = n);
  }
  fit() {
    const { options: e, ctx: n } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const i = e.labels,
      s = De(i.font),
      r = s.size,
      o = this._computeTitleHeight(),
      { boxWidth: l, itemHeight: a } = $d(i, r);
    let c, u;
    (n.font = s.string),
      this.isHorizontal()
        ? ((c = this.maxWidth), (u = this._fitRows(o, r, l, a) + 10))
        : ((u = this.maxHeight), (c = this._fitCols(o, s, l, a) + 10)),
      (this.width = Math.min(c, e.maxWidth || this.maxWidth)),
      (this.height = Math.min(u, e.maxHeight || this.maxHeight));
  }
  _fitRows(e, n, i, s) {
    const {
        ctx: r,
        maxWidth: o,
        options: {
          labels: { padding: l },
        },
      } = this,
      a = (this.legendHitBoxes = []),
      c = (this.lineWidths = [0]),
      u = s + l;
    let d = e;
    (r.textAlign = "left"), (r.textBaseline = "middle");
    let f = -1,
      m = -u;
    return (
      this.legendItems.forEach((v, g) => {
        const x = i + n / 2 + r.measureText(v.text).width;
        (g === 0 || c[c.length - 1] + x + 2 * l > o) &&
          ((d += u), (c[c.length - (g > 0 ? 0 : 1)] = 0), (m += u), f++),
          (a[g] = { left: 0, top: m, row: f, width: x, height: s }),
          (c[c.length - 1] += x + l);
      }),
      d
    );
  }
  _fitCols(e, n, i, s) {
    const {
        ctx: r,
        maxHeight: o,
        options: {
          labels: { padding: l },
        },
      } = this,
      a = (this.legendHitBoxes = []),
      c = (this.columnSizes = []),
      u = o - e;
    let d = l,
      f = 0,
      m = 0,
      v = 0,
      g = 0;
    return (
      this.legendItems.forEach((x, p) => {
        const { itemWidth: h, itemHeight: y } = s_(i, n, r, x, s);
        p > 0 &&
          m + y + 2 * l > u &&
          ((d += f + l),
          c.push({ width: f, height: m }),
          (v += f + l),
          g++,
          (f = m = 0)),
          (a[p] = { left: v, top: m, col: g, width: h, height: y }),
          (f = Math.max(f, h)),
          (m += y + l);
      }),
      (d += f),
      c.push({ width: f, height: m }),
      d
    );
  }
  adjustHitBoxes() {
    if (!this.options.display) return;
    const e = this._computeTitleHeight(),
      {
        legendHitBoxes: n,
        options: {
          align: i,
          labels: { padding: s },
          rtl: r,
        },
      } = this,
      o = hi(r, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0,
        a = Pe(i, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row &&
          ((l = c.row),
          (a = Pe(i, this.left + s, this.right - this.lineWidths[l]))),
          (c.top += this.top + e + s),
          (c.left = o.leftForLtr(o.x(a), c.width)),
          (a += c.width + s);
    } else {
      let l = 0,
        a = Pe(i, this.top + e + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l &&
          ((l = c.col),
          (a = Pe(
            i,
            this.top + e + s,
            this.bottom - this.columnSizes[l].height
          ))),
          (c.top = a),
          (c.left += this.left + s),
          (c.left = o.leftForLtr(o.x(c.left), c.width)),
          (a += c.height + s);
    }
  }
  isHorizontal() {
    return (
      this.options.position === "top" || this.options.position === "bottom"
    );
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      Cc(e, this), this._draw(), Mc(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: n, lineWidths: i, ctx: s } = this,
      { align: r, labels: o } = e,
      l = ue.color,
      a = hi(e.rtl, this.left, this.width),
      c = De(o.font),
      { padding: u } = o,
      d = c.size,
      f = d / 2;
    let m;
    this.drawTitle(),
      (s.textAlign = a.textAlign("left")),
      (s.textBaseline = "middle"),
      (s.lineWidth = 0.5),
      (s.font = c.string);
    const { boxWidth: v, boxHeight: g, itemHeight: x } = $d(o, d),
      p = function (k, b, C) {
        if (isNaN(v) || v <= 0 || isNaN(g) || g < 0) return;
        s.save();
        const E = K(C.lineWidth, 1);
        if (
          ((s.fillStyle = K(C.fillStyle, l)),
          (s.lineCap = K(C.lineCap, "butt")),
          (s.lineDashOffset = K(C.lineDashOffset, 0)),
          (s.lineJoin = K(C.lineJoin, "miter")),
          (s.lineWidth = E),
          (s.strokeStyle = K(C.strokeStyle, l)),
          s.setLineDash(K(C.lineDash, [])),
          o.usePointStyle)
        ) {
          const M = {
              radius: (g * Math.SQRT2) / 2,
              pointStyle: C.pointStyle,
              rotation: C.rotation,
              borderWidth: E,
            },
            T = a.xPlus(k, v / 2),
            A = b + f;
          $p(s, M, T, A, o.pointStyleWidth && v);
        } else {
          const M = b + Math.max((d - g) / 2, 0),
            T = a.leftForLtr(k, v),
            A = fi(C.borderRadius);
          s.beginPath(),
            Object.values(A).some(($) => $ !== 0)
              ? ro(s, { x: T, y: M, w: v, h: g, radius: A })
              : s.rect(T, M, v, g),
            s.fill(),
            E !== 0 && s.stroke();
        }
        s.restore();
      },
      h = function (k, b, C) {
        Ds(s, C.text, k, b + x / 2, c, {
          strikethrough: C.hidden,
          textAlign: a.textAlign(C.textAlign),
        });
      },
      y = this.isHorizontal(),
      _ = this._computeTitleHeight();
    y
      ? (m = {
          x: Pe(r, this.left + u, this.right - i[0]),
          y: this.top + u + _,
          line: 0,
        })
      : (m = {
          x: this.left + u,
          y: Pe(r, this.top + _ + u, this.bottom - n[0].height),
          line: 0,
        }),
      Xp(this.ctx, e.textDirection);
    const w = x + u;
    this.legendItems.forEach((k, b) => {
      (s.strokeStyle = k.fontColor), (s.fillStyle = k.fontColor);
      const C = s.measureText(k.text).width,
        E = a.textAlign(k.textAlign || (k.textAlign = o.textAlign)),
        M = v + f + C;
      let T = m.x,
        A = m.y;
      a.setWidth(this.width),
        y
          ? b > 0 &&
            T + M + u > this.right &&
            ((A = m.y += w),
            m.line++,
            (T = m.x = Pe(r, this.left + u, this.right - i[m.line])))
          : b > 0 &&
            A + w > this.bottom &&
            ((T = m.x = T + n[m.line].width + u),
            m.line++,
            (A = m.y =
              Pe(r, this.top + _ + u, this.bottom - n[m.line].height)));
      const $ = a.x(T);
      if (
        (p($, A, k),
        (T = Tv(E, T + v + f, y ? T + M : this.right, e.rtl)),
        h(a.x(T), A, k),
        y)
      )
        m.x += M + u;
      else if (typeof k.text != "string") {
        const Q = c.lineHeight;
        m.y += cg(k, Q) + u;
      } else m.y += w;
    }),
      Gp(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options,
      n = e.title,
      i = De(n.font),
      s = ot(n.padding);
    if (!n.display) return;
    const r = hi(e.rtl, this.left, this.width),
      o = this.ctx,
      l = n.position,
      a = i.size / 2,
      c = s.top + a;
    let u,
      d = this.left,
      f = this.width;
    if (this.isHorizontal())
      (f = Math.max(...this.lineWidths)),
        (u = this.top + c),
        (d = Pe(e.align, d, this.right - f));
    else {
      const v = this.columnSizes.reduce((g, x) => Math.max(g, x.height), 0);
      u =
        c +
        Pe(
          e.align,
          this.top,
          this.bottom - v - e.labels.padding - this._computeTitleHeight()
        );
    }
    const m = Pe(l, d, d + f);
    (o.textAlign = r.textAlign(kc(l))),
      (o.textBaseline = "middle"),
      (o.strokeStyle = n.color),
      (o.fillStyle = n.color),
      (o.font = i.string),
      Ds(o, n.text, m, u, i);
  }
  _computeTitleHeight() {
    const e = this.options.title,
      n = De(e.font),
      i = ot(e.padding);
    return e.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(e, n) {
    let i, s, r;
    if (Cn(e, this.left, this.right) && Cn(n, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, i = 0; i < r.length; ++i)
        if (
          ((s = r[i]),
          Cn(e, s.left, s.left + s.width) && Cn(n, s.top, s.top + s.height))
        )
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(e) {
    const n = this.options;
    if (!l_(e.type, n)) return;
    const i = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const s = this._hoveredItem,
        r = i_(s, i);
      s && !r && J(n.onLeave, [e, s, this], this),
        (this._hoveredItem = i),
        i && !r && J(n.onHover, [e, i, this], this);
    } else i && J(n.onClick, [e, i, this], this);
  }
}
function s_(t, e, n, i, s) {
  const r = r_(i, t, e, n),
    o = o_(s, i, e.lineHeight);
  return { itemWidth: r, itemHeight: o };
}
function r_(t, e, n, i) {
  let s = t.text;
  return (
    s &&
      typeof s != "string" &&
      (s = s.reduce((r, o) => (r.length > o.length ? r : o))),
    e + n.size / 2 + i.measureText(s).width
  );
}
function o_(t, e, n) {
  let i = t;
  return typeof e.text != "string" && (i = cg(e, n)), i;
}
function cg(t, e) {
  const n = t.text ? t.text.length : 0;
  return e * n;
}
function l_(t, e) {
  return !!(
    ((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave)) ||
    (e.onClick && (t === "click" || t === "mouseup"))
  );
}
var Eo = {
  id: "legend",
  _element: Wd,
  start(t, e, n) {
    const i = (t.legend = new Wd({ ctx: t.ctx, options: n, chart: t }));
    tt.configure(t, i, n), tt.addBox(t, i);
  },
  stop(t) {
    tt.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, n) {
    const i = t.legend;
    tt.configure(t, i, n), (i.options = n);
  },
  afterUpdate(t) {
    const e = t.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(t, e) {
    e.replay || t.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(t, e, n) {
      const i = e.datasetIndex,
        s = n.chart;
      s.isDatasetVisible(i)
        ? (s.hide(i), (e.hidden = !0))
        : (s.show(i), (e.hidden = !1));
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets,
          {
            labels: {
              usePointStyle: n,
              pointStyle: i,
              textAlign: s,
              color: r,
              useBorderRadius: o,
              borderRadius: l,
            },
          } = t.legend.options;
        return t._getSortedDatasetMetas().map((a) => {
          const c = a.controller.getStyle(n ? 0 : void 0),
            u = ot(c.borderWidth);
          return {
            text: e[a.index].label,
            fillStyle: c.backgroundColor,
            fontColor: r,
            hidden: !a.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: i || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
            borderRadius: o && (l || c.borderRadius),
            datasetIndex: a.index,
          };
        }, this);
      },
    },
    title: {
      color: (t) => t.chart.options.color,
      display: !1,
      position: "center",
      text: "",
    },
  },
  descriptors: {
    _scriptable: (t) => !t.startsWith("on"),
    labels: {
      _scriptable: (t) => !["generateLabels", "filter", "sort"].includes(t),
    },
  },
};
class ug extends Bt {
  constructor(e) {
    super(),
      (this.chart = e.chart),
      (this.options = e.options),
      (this.ctx = e.ctx),
      (this._padding = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.left = void 0),
      (this.right = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.position = void 0),
      (this.weight = void 0),
      (this.fullSize = void 0);
  }
  update(e, n) {
    const i = this.options;
    if (((this.left = 0), (this.top = 0), !i.display)) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    (this.width = this.right = e), (this.height = this.bottom = n);
    const s = ge(i.text) ? i.text.length : 1;
    this._padding = ot(i.padding);
    const r = s * De(i.font).lineHeight + this._padding.height;
    this.isHorizontal() ? (this.height = r) : (this.width = r);
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: n, left: i, bottom: s, right: r, options: o } = this,
      l = o.align;
    let a = 0,
      c,
      u,
      d;
    return (
      this.isHorizontal()
        ? ((u = Pe(l, i, r)), (d = n + e), (c = r - i))
        : (o.position === "left"
            ? ((u = i + e), (d = Pe(l, s, n)), (a = he * -0.5))
            : ((u = r - e), (d = Pe(l, n, s)), (a = he * 0.5)),
          (c = s - n)),
      { titleX: u, titleY: d, maxWidth: c, rotation: a }
    );
  }
  draw() {
    const e = this.ctx,
      n = this.options;
    if (!n.display) return;
    const i = De(n.font),
      r = i.lineHeight / 2 + this._padding.top,
      { titleX: o, titleY: l, maxWidth: a, rotation: c } = this._drawArgs(r);
    Ds(e, n.text, 0, 0, i, {
      color: n.color,
      maxWidth: a,
      rotation: c,
      textAlign: kc(n.align),
      textBaseline: "middle",
      translation: [o, l],
    });
  }
}
function a_(t, e) {
  const n = new ug({ ctx: t.ctx, options: e, chart: t });
  tt.configure(t, n, e), tt.addBox(t, n), (t.titleBlock = n);
}
var Do = {
  id: "title",
  _element: ug,
  start(t, e, n) {
    a_(t, n);
  },
  stop(t) {
    const e = t.titleBlock;
    tt.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, n) {
    const i = t.titleBlock;
    tt.configure(t, i, n), (i.options = n);
  },
  defaults: {
    align: "center",
    display: !1,
    font: { weight: "bold" },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3,
  },
  defaultRoutes: { color: "color" },
  descriptors: { _scriptable: !0, _indexable: !1 },
};
const Gi = {
  average(t) {
    if (!t.length) return !1;
    let e,
      n,
      i = new Set(),
      s = 0,
      r = 0;
    for (e = 0, n = t.length; e < n; ++e) {
      const l = t[e].element;
      if (l && l.hasValue()) {
        const a = l.tooltipPosition();
        i.add(a.x), (s += a.y), ++r;
      }
    }
    return r === 0 || i.size === 0
      ? !1
      : { x: [...i].reduce((l, a) => l + a) / i.size, y: s / r };
  },
  nearest(t, e) {
    if (!t.length) return !1;
    let n = e.x,
      i = e.y,
      s = Number.POSITIVE_INFINITY,
      r,
      o,
      l;
    for (r = 0, o = t.length; r < o; ++r) {
      const a = t[r].element;
      if (a && a.hasValue()) {
        const c = a.getCenterPoint(),
          u = bv(e, c);
        u < s && ((s = u), (l = a));
      }
    }
    if (l) {
      const a = l.tooltipPosition();
      (n = a.x), (i = a.y);
    }
    return { x: n, y: i };
  },
};
function xt(t, e) {
  return e && (ge(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function Et(t) {
  return (typeof t == "string" || t instanceof String) &&
    t.indexOf(`
`) > -1
    ? t.split(`
`)
    : t;
}
function c_(t, e) {
  const { element: n, datasetIndex: i, index: s } = e,
    r = t.getDatasetMeta(i).controller,
    { label: o, value: l } = r.getLabelAndValue(s);
  return {
    chart: t,
    label: o,
    parsed: r.getParsed(s),
    raw: t.data.datasets[i].data[s],
    formattedValue: l,
    dataset: r.getDataset(),
    dataIndex: s,
    datasetIndex: i,
    element: n,
  };
}
function Hd(t, e) {
  const n = t.chart.ctx,
    { body: i, footer: s, title: r } = t,
    { boxWidth: o, boxHeight: l } = e,
    a = De(e.bodyFont),
    c = De(e.titleFont),
    u = De(e.footerFont),
    d = r.length,
    f = s.length,
    m = i.length,
    v = ot(e.padding);
  let g = v.height,
    x = 0,
    p = i.reduce(
      (_, w) => _ + w.before.length + w.lines.length + w.after.length,
      0
    );
  if (
    ((p += t.beforeBody.length + t.afterBody.length),
    d &&
      (g += d * c.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom),
    p)
  ) {
    const _ = e.displayColors ? Math.max(l, a.lineHeight) : a.lineHeight;
    g += m * _ + (p - m) * a.lineHeight + (p - 1) * e.bodySpacing;
  }
  f && (g += e.footerMarginTop + f * u.lineHeight + (f - 1) * e.footerSpacing);
  let h = 0;
  const y = function (_) {
    x = Math.max(x, n.measureText(_).width + h);
  };
  return (
    n.save(),
    (n.font = c.string),
    X(t.title, y),
    (n.font = a.string),
    X(t.beforeBody.concat(t.afterBody), y),
    (h = e.displayColors ? o + 2 + e.boxPadding : 0),
    X(i, (_) => {
      X(_.before, y), X(_.lines, y), X(_.after, y);
    }),
    (h = 0),
    (n.font = u.string),
    X(t.footer, y),
    n.restore(),
    (x += v.width),
    { width: x, height: g }
  );
}
function u_(t, e) {
  const { y: n, height: i } = e;
  return n < i / 2 ? "top" : n > t.height - i / 2 ? "bottom" : "center";
}
function d_(t, e, n, i) {
  const { x: s, width: r } = i,
    o = n.caretSize + n.caretPadding;
  if ((t === "left" && s + r + o > e.width) || (t === "right" && s - r - o < 0))
    return !0;
}
function f_(t, e, n, i) {
  const { x: s, width: r } = n,
    {
      width: o,
      chartArea: { left: l, right: a },
    } = t;
  let c = "center";
  return (
    i === "center"
      ? (c = s <= (l + a) / 2 ? "left" : "right")
      : s <= r / 2
      ? (c = "left")
      : s >= o - r / 2 && (c = "right"),
    d_(c, t, e, n) && (c = "center"),
    c
  );
}
function Vd(t, e, n) {
  const i = n.yAlign || e.yAlign || u_(t, n);
  return { xAlign: n.xAlign || e.xAlign || f_(t, e, n, i), yAlign: i };
}
function h_(t, e) {
  let { x: n, width: i } = t;
  return e === "right" ? (n -= i) : e === "center" && (n -= i / 2), n;
}
function p_(t, e, n) {
  let { y: i, height: s } = t;
  return (
    e === "top" ? (i += n) : e === "bottom" ? (i -= s + n) : (i -= s / 2), i
  );
}
function Ud(t, e, n, i) {
  const { caretSize: s, caretPadding: r, cornerRadius: o } = t,
    { xAlign: l, yAlign: a } = n,
    c = s + r,
    { topLeft: u, topRight: d, bottomLeft: f, bottomRight: m } = fi(o);
  let v = h_(e, l);
  const g = p_(e, a, c);
  return (
    a === "center"
      ? l === "left"
        ? (v += c)
        : l === "right" && (v -= c)
      : l === "left"
      ? (v -= Math.max(u, f) + s)
      : l === "right" && (v += Math.max(d, m) + s),
    { x: Be(v, 0, i.width - e.width), y: Be(g, 0, i.height - e.height) }
  );
}
function fr(t, e, n) {
  const i = ot(n.padding);
  return e === "center"
    ? t.x + t.width / 2
    : e === "right"
    ? t.x + t.width - i.right
    : t.x + i.left;
}
function Yd(t) {
  return xt([], Et(t));
}
function g_(t, e, n) {
  return Ei(t, { tooltip: e, tooltipItems: n, type: "tooltip" });
}
function Kd(t, e) {
  const n = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return n ? t.override(n) : t;
}
const dg = {
  beforeTitle: Mt,
  title(t) {
    if (t.length > 0) {
      const e = t[0],
        n = e.chart.data.labels,
        i = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label) return e.label;
      if (i > 0 && e.dataIndex < i) return n[e.dataIndex];
    }
    return "";
  },
  afterTitle: Mt,
  beforeBody: Mt,
  beforeLabel: Mt,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const n = t.formattedValue;
    return ee(n) || (e += n), e;
  },
  labelColor(t) {
    const n = t.chart
      .getDatasetMeta(t.datasetIndex)
      .controller.getStyle(t.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0,
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(t) {
    const n = t.chart
      .getDatasetMeta(t.datasetIndex)
      .controller.getStyle(t.dataIndex);
    return { pointStyle: n.pointStyle, rotation: n.rotation };
  },
  afterLabel: Mt,
  afterBody: Mt,
  beforeFooter: Mt,
  footer: Mt,
  afterFooter: Mt,
};
function je(t, e, n, i) {
  const s = t[e].call(n, i);
  return typeof s > "u" ? dg[e].call(n, i) : s;
}
class va extends Bt {
  constructor(e) {
    super(),
      (this.opacity = 0),
      (this._active = []),
      (this._eventPosition = void 0),
      (this._size = void 0),
      (this._cachedAnimations = void 0),
      (this._tooltipItems = []),
      (this.$animations = void 0),
      (this.$context = void 0),
      (this.chart = e.chart),
      (this.options = e.options),
      (this.dataPoints = void 0),
      (this.title = void 0),
      (this.beforeBody = void 0),
      (this.body = void 0),
      (this.afterBody = void 0),
      (this.footer = void 0),
      (this.xAlign = void 0),
      (this.yAlign = void 0),
      (this.x = void 0),
      (this.y = void 0),
      (this.height = void 0),
      (this.width = void 0),
      (this.caretX = void 0),
      (this.caretY = void 0),
      (this.labelColors = void 0),
      (this.labelPointStyles = void 0),
      (this.labelTextColors = void 0);
  }
  initialize(e) {
    (this.options = e),
      (this._cachedAnimations = void 0),
      (this.$context = void 0);
  }
  _resolveAnimations() {
    const e = this._cachedAnimations;
    if (e) return e;
    const n = this.chart,
      i = this.options.setContext(this.getContext()),
      s = i.enabled && n.options.animation && i.animations,
      r = new Qp(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return (
      this.$context ||
      (this.$context = g_(this.chart.getContext(), this, this._tooltipItems))
    );
  }
  getTitle(e, n) {
    const { callbacks: i } = n,
      s = je(i, "beforeTitle", this, e),
      r = je(i, "title", this, e),
      o = je(i, "afterTitle", this, e);
    let l = [];
    return (l = xt(l, Et(s))), (l = xt(l, Et(r))), (l = xt(l, Et(o))), l;
  }
  getBeforeBody(e, n) {
    return Yd(je(n.callbacks, "beforeBody", this, e));
  }
  getBody(e, n) {
    const { callbacks: i } = n,
      s = [];
    return (
      X(e, (r) => {
        const o = { before: [], lines: [], after: [] },
          l = Kd(i, r);
        xt(o.before, Et(je(l, "beforeLabel", this, r))),
          xt(o.lines, je(l, "label", this, r)),
          xt(o.after, Et(je(l, "afterLabel", this, r))),
          s.push(o);
      }),
      s
    );
  }
  getAfterBody(e, n) {
    return Yd(je(n.callbacks, "afterBody", this, e));
  }
  getFooter(e, n) {
    const { callbacks: i } = n,
      s = je(i, "beforeFooter", this, e),
      r = je(i, "footer", this, e),
      o = je(i, "afterFooter", this, e);
    let l = [];
    return (l = xt(l, Et(s))), (l = xt(l, Et(r))), (l = xt(l, Et(o))), l;
  }
  _createItems(e) {
    const n = this._active,
      i = this.chart.data,
      s = [],
      r = [],
      o = [];
    let l = [],
      a,
      c;
    for (a = 0, c = n.length; a < c; ++a) l.push(c_(this.chart, n[a]));
    return (
      e.filter && (l = l.filter((u, d, f) => e.filter(u, d, f, i))),
      e.itemSort && (l = l.sort((u, d) => e.itemSort(u, d, i))),
      X(l, (u) => {
        const d = Kd(e.callbacks, u);
        s.push(je(d, "labelColor", this, u)),
          r.push(je(d, "labelPointStyle", this, u)),
          o.push(je(d, "labelTextColor", this, u));
      }),
      (this.labelColors = s),
      (this.labelPointStyles = r),
      (this.labelTextColors = o),
      (this.dataPoints = l),
      l
    );
  }
  update(e, n) {
    const i = this.options.setContext(this.getContext()),
      s = this._active;
    let r,
      o = [];
    if (!s.length) this.opacity !== 0 && (r = { opacity: 0 });
    else {
      const l = Gi[i.position].call(this, s, this._eventPosition);
      (o = this._createItems(i)),
        (this.title = this.getTitle(o, i)),
        (this.beforeBody = this.getBeforeBody(o, i)),
        (this.body = this.getBody(o, i)),
        (this.afterBody = this.getAfterBody(o, i)),
        (this.footer = this.getFooter(o, i));
      const a = (this._size = Hd(this, i)),
        c = Object.assign({}, l, a),
        u = Vd(this.chart, i, c),
        d = Ud(i, c, u, this.chart);
      (this.xAlign = u.xAlign),
        (this.yAlign = u.yAlign),
        (r = {
          opacity: 1,
          x: d.x,
          y: d.y,
          width: a.width,
          height: a.height,
          caretX: l.x,
          caretY: l.y,
        });
    }
    (this._tooltipItems = o),
      (this.$context = void 0),
      r && this._resolveAnimations().update(this, r),
      e &&
        i.external &&
        i.external.call(this, { chart: this.chart, tooltip: this, replay: n });
  }
  drawCaret(e, n, i, s) {
    const r = this.getCaretPosition(e, i, s);
    n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
  }
  getCaretPosition(e, n, i) {
    const { xAlign: s, yAlign: r } = this,
      { caretSize: o, cornerRadius: l } = i,
      { topLeft: a, topRight: c, bottomLeft: u, bottomRight: d } = fi(l),
      { x: f, y: m } = e,
      { width: v, height: g } = n;
    let x, p, h, y, _, w;
    return (
      r === "center"
        ? ((_ = m + g / 2),
          s === "left"
            ? ((x = f), (p = x - o), (y = _ + o), (w = _ - o))
            : ((x = f + v), (p = x + o), (y = _ - o), (w = _ + o)),
          (h = x))
        : (s === "left"
            ? (p = f + Math.max(a, u) + o)
            : s === "right"
            ? (p = f + v - Math.max(c, d) - o)
            : (p = this.caretX),
          r === "top"
            ? ((y = m), (_ = y - o), (x = p - o), (h = p + o))
            : ((y = m + g), (_ = y + o), (x = p + o), (h = p - o)),
          (w = y)),
      { x1: x, x2: p, x3: h, y1: y, y2: _, y3: w }
    );
  }
  drawTitle(e, n, i) {
    const s = this.title,
      r = s.length;
    let o, l, a;
    if (r) {
      const c = hi(i.rtl, this.x, this.width);
      for (
        e.x = fr(this, i.titleAlign, i),
          n.textAlign = c.textAlign(i.titleAlign),
          n.textBaseline = "middle",
          o = De(i.titleFont),
          l = i.titleSpacing,
          n.fillStyle = i.titleColor,
          n.font = o.string,
          a = 0;
        a < r;
        ++a
      )
        n.fillText(s[a], c.x(e.x), e.y + o.lineHeight / 2),
          (e.y += o.lineHeight + l),
          a + 1 === r && (e.y += i.titleMarginBottom - l);
    }
  }
  _drawColorBox(e, n, i, s, r) {
    const o = this.labelColors[i],
      l = this.labelPointStyles[i],
      { boxHeight: a, boxWidth: c } = r,
      u = De(r.bodyFont),
      d = fr(this, "left", r),
      f = s.x(d),
      m = a < u.lineHeight ? (u.lineHeight - a) / 2 : 0,
      v = n.y + m;
    if (r.usePointStyle) {
      const g = {
          radius: Math.min(c, a) / 2,
          pointStyle: l.pointStyle,
          rotation: l.rotation,
          borderWidth: 1,
        },
        x = s.leftForLtr(f, c) + c / 2,
        p = v + a / 2;
      (e.strokeStyle = r.multiKeyBackground),
        (e.fillStyle = r.multiKeyBackground),
        ld(e, g, x, p),
        (e.strokeStyle = o.borderColor),
        (e.fillStyle = o.backgroundColor),
        ld(e, g, x, p);
    } else {
      (e.lineWidth = V(o.borderWidth)
        ? Math.max(...Object.values(o.borderWidth))
        : o.borderWidth || 1),
        (e.strokeStyle = o.borderColor),
        e.setLineDash(o.borderDash || []),
        (e.lineDashOffset = o.borderDashOffset || 0);
      const g = s.leftForLtr(f, c),
        x = s.leftForLtr(s.xPlus(f, 1), c - 2),
        p = fi(o.borderRadius);
      Object.values(p).some((h) => h !== 0)
        ? (e.beginPath(),
          (e.fillStyle = r.multiKeyBackground),
          ro(e, { x: g, y: v, w: c, h: a, radius: p }),
          e.fill(),
          e.stroke(),
          (e.fillStyle = o.backgroundColor),
          e.beginPath(),
          ro(e, { x, y: v + 1, w: c - 2, h: a - 2, radius: p }),
          e.fill())
        : ((e.fillStyle = r.multiKeyBackground),
          e.fillRect(g, v, c, a),
          e.strokeRect(g, v, c, a),
          (e.fillStyle = o.backgroundColor),
          e.fillRect(x, v + 1, c - 2, a - 2));
    }
    e.fillStyle = this.labelTextColors[i];
  }
  drawBody(e, n, i) {
    const { body: s } = this,
      {
        bodySpacing: r,
        bodyAlign: o,
        displayColors: l,
        boxHeight: a,
        boxWidth: c,
        boxPadding: u,
      } = i,
      d = De(i.bodyFont);
    let f = d.lineHeight,
      m = 0;
    const v = hi(i.rtl, this.x, this.width),
      g = function (C) {
        n.fillText(C, v.x(e.x + m), e.y + f / 2), (e.y += f + r);
      },
      x = v.textAlign(o);
    let p, h, y, _, w, k, b;
    for (
      n.textAlign = o,
        n.textBaseline = "middle",
        n.font = d.string,
        e.x = fr(this, x, i),
        n.fillStyle = i.bodyColor,
        X(this.beforeBody, g),
        m = l && x !== "right" ? (o === "center" ? c / 2 + u : c + 2 + u) : 0,
        _ = 0,
        k = s.length;
      _ < k;
      ++_
    ) {
      for (
        p = s[_],
          h = this.labelTextColors[_],
          n.fillStyle = h,
          X(p.before, g),
          y = p.lines,
          l &&
            y.length &&
            (this._drawColorBox(n, e, _, v, i),
            (f = Math.max(d.lineHeight, a))),
          w = 0,
          b = y.length;
        w < b;
        ++w
      )
        g(y[w]), (f = d.lineHeight);
      X(p.after, g);
    }
    (m = 0), (f = d.lineHeight), X(this.afterBody, g), (e.y -= r);
  }
  drawFooter(e, n, i) {
    const s = this.footer,
      r = s.length;
    let o, l;
    if (r) {
      const a = hi(i.rtl, this.x, this.width);
      for (
        e.x = fr(this, i.footerAlign, i),
          e.y += i.footerMarginTop,
          n.textAlign = a.textAlign(i.footerAlign),
          n.textBaseline = "middle",
          o = De(i.footerFont),
          n.fillStyle = i.footerColor,
          n.font = o.string,
          l = 0;
        l < r;
        ++l
      )
        n.fillText(s[l], a.x(e.x), e.y + o.lineHeight / 2),
          (e.y += o.lineHeight + i.footerSpacing);
    }
  }
  drawBackground(e, n, i, s) {
    const { xAlign: r, yAlign: o } = this,
      { x: l, y: a } = e,
      { width: c, height: u } = i,
      {
        topLeft: d,
        topRight: f,
        bottomLeft: m,
        bottomRight: v,
      } = fi(s.cornerRadius);
    (n.fillStyle = s.backgroundColor),
      (n.strokeStyle = s.borderColor),
      (n.lineWidth = s.borderWidth),
      n.beginPath(),
      n.moveTo(l + d, a),
      o === "top" && this.drawCaret(e, n, i, s),
      n.lineTo(l + c - f, a),
      n.quadraticCurveTo(l + c, a, l + c, a + f),
      o === "center" && r === "right" && this.drawCaret(e, n, i, s),
      n.lineTo(l + c, a + u - v),
      n.quadraticCurveTo(l + c, a + u, l + c - v, a + u),
      o === "bottom" && this.drawCaret(e, n, i, s),
      n.lineTo(l + m, a + u),
      n.quadraticCurveTo(l, a + u, l, a + u - m),
      o === "center" && r === "left" && this.drawCaret(e, n, i, s),
      n.lineTo(l, a + d),
      n.quadraticCurveTo(l, a, l + d, a),
      n.closePath(),
      n.fill(),
      s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(e) {
    const n = this.chart,
      i = this.$animations,
      s = i && i.x,
      r = i && i.y;
    if (s || r) {
      const o = Gi[e.position].call(this, this._active, this._eventPosition);
      if (!o) return;
      const l = (this._size = Hd(this, e)),
        a = Object.assign({}, o, this._size),
        c = Vd(n, e, a),
        u = Ud(e, a, c, n);
      (s._to !== u.x || r._to !== u.y) &&
        ((this.xAlign = c.xAlign),
        (this.yAlign = c.yAlign),
        (this.width = l.width),
        (this.height = l.height),
        (this.caretX = o.x),
        (this.caretY = o.y),
        this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const n = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i) return;
    this._updateAnimationTarget(n);
    const s = { width: this.width, height: this.height },
      r = { x: this.x, y: this.y };
    i = Math.abs(i) < 0.001 ? 0 : i;
    const o = ot(n.padding),
      l =
        this.title.length ||
        this.beforeBody.length ||
        this.body.length ||
        this.afterBody.length ||
        this.footer.length;
    n.enabled &&
      l &&
      (e.save(),
      (e.globalAlpha = i),
      this.drawBackground(r, e, s, n),
      Xp(e, n.textDirection),
      (r.y += o.top),
      this.drawTitle(r, e, n),
      this.drawBody(r, e, n),
      this.drawFooter(r, e, n),
      Gp(e, n.textDirection),
      e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, n) {
    const i = this._active,
      s = e.map(({ datasetIndex: l, index: a }) => {
        const c = this.chart.getDatasetMeta(l);
        if (!c) throw new Error("Cannot find a dataset at index " + l);
        return { datasetIndex: l, element: c.data[a], index: a };
      }),
      r = !eo(i, s),
      o = this._positionChanged(s, n);
    (r || o) &&
      ((this._active = s),
      (this._eventPosition = n),
      (this._ignoreReplayEvents = !0),
      this.update(!0));
  }
  handleEvent(e, n, i = !0) {
    if (n && this._ignoreReplayEvents) return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options,
      r = this._active || [],
      o = this._getActiveElements(e, r, n, i),
      l = this._positionChanged(o, e),
      a = n || !eo(o, r) || l;
    return (
      a &&
        ((this._active = o),
        (s.enabled || s.external) &&
          ((this._eventPosition = { x: e.x, y: e.y }), this.update(!0, n))),
      a
    );
  }
  _getActiveElements(e, n, i, s) {
    const r = this.options;
    if (e.type === "mouseout") return [];
    if (!s)
      return n.filter(
        (l) =>
          this.chart.data.datasets[l.datasetIndex] &&
          this.chart
            .getDatasetMeta(l.datasetIndex)
            .controller.getParsed(l.index) !== void 0
      );
    const o = this.chart.getElementsAtEventForMode(e, r.mode, r, i);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(e, n) {
    const { caretX: i, caretY: s, options: r } = this,
      o = Gi[r.position].call(this, e, n);
    return o !== !1 && (i !== o.x || s !== o.y);
  }
}
F(va, "positioners", Gi);
var To = {
  id: "tooltip",
  _element: va,
  positioners: Gi,
  afterInit(t, e, n) {
    n && (t.tooltip = new va({ chart: t, options: n }));
  },
  beforeUpdate(t, e, n) {
    t.tooltip && t.tooltip.initialize(n);
  },
  reset(t, e, n) {
    t.tooltip && t.tooltip.initialize(n);
  },
  afterDraw(t) {
    const e = t.tooltip;
    if (e && e._willRender()) {
      const n = { tooltip: e };
      if (t.notifyPlugins("beforeTooltipDraw", { ...n, cancelable: !0 }) === !1)
        return;
      e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(t, e) {
    if (t.tooltip) {
      const n = e.replay;
      t.tooltip.handleEvent(e.event, n, e.inChartArea) && (e.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: { weight: "bold" },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: { weight: "bold" },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (t, e) => e.bodyFont.size,
    boxWidth: (t, e) => e.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: { duration: 400, easing: "easeOutQuart" },
    animations: {
      numbers: {
        type: "number",
        properties: ["x", "y", "width", "height", "caretX", "caretY"],
      },
      opacity: { easing: "linear", duration: 200 },
    },
    callbacks: dg,
  },
  defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" },
  descriptors: {
    _scriptable: (t) => t !== "filter" && t !== "itemSort" && t !== "external",
    _indexable: !1,
    callbacks: { _scriptable: !1, _indexable: !1 },
    animation: { _fallback: !1 },
    animations: { _fallback: "animation" },
  },
  additionalOptionScopes: ["interaction"],
};
const m_ = (t, e, n, i) => (
  typeof e == "string"
    ? ((n = t.push(e) - 1), i.unshift({ index: n, label: e }))
    : isNaN(e) && (n = null),
  n
);
function y_(t, e, n, i) {
  const s = t.indexOf(e);
  if (s === -1) return m_(t, e, n, i);
  const r = t.lastIndexOf(e);
  return s !== r ? n : s;
}
const v_ = (t, e) => (t === null ? null : Be(Math.round(t), 0, e));
function Xd(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class ki extends Di {
  constructor(e) {
    super(e),
      (this._startValue = void 0),
      (this._valueRange = 0),
      (this._addedLabels = []);
  }
  init(e) {
    const n = this._addedLabels;
    if (n.length) {
      const i = this.getLabels();
      for (const { index: s, label: r } of n) i[s] === r && i.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, n) {
    if (ee(e)) return null;
    const i = this.getLabels();
    return (
      (n =
        isFinite(n) && i[n] === e ? n : y_(i, e, K(n, e), this._addedLabels)),
      v_(n, i.length - 1)
    );
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: n } = this.getUserBounds();
    let { min: i, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" &&
      (e || (i = 0), n || (s = this.getLabels().length - 1)),
      (this.min = i),
      (this.max = s);
  }
  buildTicks() {
    const e = this.min,
      n = this.max,
      i = this.options.offset,
      s = [];
    let r = this.getLabels();
    (r = e === 0 && n === r.length - 1 ? r : r.slice(e, n + 1)),
      (this._valueRange = Math.max(r.length - (i ? 0 : 1), 1)),
      (this._startValue = this.min - (i ? 0.5 : 0));
    for (let o = e; o <= n; o++) s.push({ value: o });
    return s;
  }
  getLabelForValue(e) {
    return Xd.call(this, e);
  }
  configure() {
    super.configure(),
      this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return (
      typeof e != "number" && (e = this.parse(e)),
      e === null
        ? NaN
        : this.getPixelForDecimal((e - this._startValue) / this._valueRange)
    );
  }
  getPixelForTick(e) {
    const n = this.ticks;
    return e < 0 || e > n.length - 1 ? null : this.getPixelForValue(n[e].value);
  }
  getValueForPixel(e) {
    return Math.round(
      this._startValue + this.getDecimalForPixel(e) * this._valueRange
    );
  }
  getBasePixel() {
    return this.bottom;
  }
}
F(ki, "id", "category"), F(ki, "defaults", { ticks: { callback: Xd } });
function x_(t, e) {
  const n = [],
    {
      bounds: s,
      step: r,
      min: o,
      max: l,
      precision: a,
      count: c,
      maxTicks: u,
      maxDigits: d,
      includeBounds: f,
    } = t,
    m = r || 1,
    v = u - 1,
    { min: g, max: x } = e,
    p = !ee(o),
    h = !ee(l),
    y = !ee(c),
    _ = (x - g) / (d + 1);
  let w = qu((x - g) / v / m) * m,
    k,
    b,
    C,
    E;
  if (w < 1e-14 && !p && !h) return [{ value: g }, { value: x }];
  (E = Math.ceil(x / w) - Math.floor(g / w)),
    E > v && (w = qu((E * w) / v / m) * m),
    ee(a) || ((k = Math.pow(10, a)), (w = Math.ceil(w * k) / k)),
    s === "ticks"
      ? ((b = Math.floor(g / w) * w), (C = Math.ceil(x / w) * w))
      : ((b = g), (C = x)),
    p && h && r && wv((l - o) / r, w / 1e3)
      ? ((E = Math.round(Math.min((l - o) / w, u))),
        (w = (l - o) / E),
        (b = o),
        (C = l))
      : y
      ? ((b = p ? o : b), (C = h ? l : C), (E = c - 1), (w = (C - b) / E))
      : ((E = (C - b) / w),
        Mr(E, Math.round(E), w / 1e3)
          ? (E = Math.round(E))
          : (E = Math.ceil(E)));
  const M = Math.max(Ju(w), Ju(b));
  (k = Math.pow(10, ee(a) ? M : a)),
    (b = Math.round(b * k) / k),
    (C = Math.round(C * k) / k);
  let T = 0;
  for (
    p &&
    (f && b !== o
      ? (n.push({ value: o }),
        b < o && T++,
        Mr(Math.round((b + T * w) * k) / k, o, Gd(o, _, t)) && T++)
      : b < o && T++);
    T < E;
    ++T
  ) {
    const A = Math.round((b + T * w) * k) / k;
    if (h && A > l) break;
    n.push({ value: A });
  }
  return (
    h && f && C !== l
      ? n.length && Mr(n[n.length - 1].value, l, Gd(l, _, t))
        ? (n[n.length - 1].value = l)
        : n.push({ value: l })
      : (!h || C === l) && n.push({ value: C }),
    n
  );
}
function Gd(t, e, { horizontal: n, minRotation: i }) {
  const s = At(i),
    r = (n ? Math.sin(s) : Math.cos(s)) || 0.001,
    o = 0.75 * e * ("" + t).length;
  return Math.min(e / r, o);
}
class __ extends Di {
  constructor(e) {
    super(e),
      (this.start = void 0),
      (this.end = void 0),
      (this._startValue = void 0),
      (this._endValue = void 0),
      (this._valueRange = 0);
  }
  parse(e, n) {
    return ee(e) ||
      ((typeof e == "number" || e instanceof Number) && !isFinite(+e))
      ? null
      : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options,
      { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: s, max: r } = this;
    const o = (a) => (s = n ? s : a),
      l = (a) => (r = i ? r : a);
    if (e) {
      const a = an(s),
        c = an(r);
      a < 0 && c < 0 ? l(0) : a > 0 && c > 0 && o(0);
    }
    if (s === r) {
      let a = r === 0 ? 1 : Math.abs(r * 0.05);
      l(r + a), e || o(s - a);
    }
    (this.min = s), (this.max = r);
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: n, stepSize: i } = e,
      s;
    return (
      i
        ? ((s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1),
          s > 1e3 &&
            (console.warn(
              `scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`
            ),
            (s = 1e3)))
        : ((s = this.computeTickLimit()), (n = n || 11)),
      n && (s = Math.min(n, s)),
      s
    );
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options,
      n = e.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = {
        maxTicks: i,
        bounds: e.bounds,
        min: e.min,
        max: e.max,
        precision: n.precision,
        step: n.stepSize,
        count: n.count,
        maxDigits: this._maxDigits(),
        horizontal: this.isHorizontal(),
        minRotation: n.minRotation || 0,
        includeBounds: n.includeBounds !== !1,
      },
      r = this._range || this,
      o = x_(s, r);
    return (
      e.bounds === "ticks" && Sv(o, this, "value"),
      e.reverse
        ? (o.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      o
    );
  }
  configure() {
    const e = this.ticks;
    let n = this.min,
      i = this.max;
    if ((super.configure(), this.options.offset && e.length)) {
      const s = (i - n) / Math.max(e.length - 1, 1) / 2;
      (n -= s), (i += s);
    }
    (this._startValue = n), (this._endValue = i), (this._valueRange = i - n);
  }
  getLabelForValue(e) {
    return bc(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class bi extends __ {
  determineDataLimits() {
    const { min: e, max: n } = this.getMinMax(!0);
    (this.min = rt(e) ? e : 0),
      (this.max = rt(n) ? n : 1),
      this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(),
      n = e ? this.width : this.height,
      i = At(this.options.ticks.minRotation),
      s = (e ? Math.sin(i) : Math.cos(i)) || 0.001,
      r = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, r.lineHeight / s));
  }
  getPixelForValue(e) {
    return e === null
      ? NaN
      : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
F(bi, "id", "linear"),
  F(bi, "defaults", { ticks: { callback: Bp.formatters.numeric } });
const Oo = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 },
  },
  Ne = Object.keys(Oo);
function Qd(t, e) {
  return t - e;
}
function Zd(t, e) {
  if (ee(e)) return null;
  const n = t._adapter,
    { parser: i, round: s, isoWeekday: r } = t._parseOpts;
  let o = e;
  return (
    typeof i == "function" && (o = i(o)),
    rt(o) || (o = typeof i == "string" ? n.parse(o, i) : n.parse(o)),
    o === null
      ? null
      : (s &&
          (o =
            s === "week" && (io(r) || r === !0)
              ? n.startOf(o, "isoWeek", r)
              : n.startOf(o, s)),
        +o)
  );
}
function qd(t, e, n, i) {
  const s = Ne.length;
  for (let r = Ne.indexOf(t); r < s - 1; ++r) {
    const o = Oo[Ne[r]],
      l = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((n - e) / (l * o.size)) <= i) return Ne[r];
  }
  return Ne[s - 1];
}
function w_(t, e, n, i, s) {
  for (let r = Ne.length - 1; r >= Ne.indexOf(n); r--) {
    const o = Ne[r];
    if (Oo[o].common && t._adapter.diff(s, i, o) >= e - 1) return o;
  }
  return Ne[n ? Ne.indexOf(n) : 0];
}
function S_(t) {
  for (let e = Ne.indexOf(t) + 1, n = Ne.length; e < n; ++e)
    if (Oo[Ne[e]].common) return Ne[e];
}
function Jd(t, e, n) {
  if (!n) t[e] = !0;
  else if (n.length) {
    const { lo: i, hi: s } = Sc(n, e),
      r = n[i] >= e ? n[i] : n[s];
    t[r] = !0;
  }
}
function k_(t, e, n, i) {
  const s = t._adapter,
    r = +s.startOf(e[0].value, i),
    o = e[e.length - 1].value;
  let l, a;
  for (l = r; l <= o; l = +s.add(l, 1, i))
    (a = n[l]), a >= 0 && (e[a].major = !0);
  return e;
}
function ef(t, e, n) {
  const i = [],
    s = {},
    r = e.length;
  let o, l;
  for (o = 0; o < r; ++o)
    (l = e[o]), (s[l] = o), i.push({ value: l, major: !1 });
  return r === 0 || !n ? i : k_(t, i, s, n);
}
class co extends Di {
  constructor(e) {
    super(e),
      (this._cache = { data: [], labels: [], all: [] }),
      (this._unit = "day"),
      (this._majorUnit = void 0),
      (this._offsets = {}),
      (this._normalized = !1),
      (this._parseOpts = void 0);
  }
  init(e, n = {}) {
    const i = e.time || (e.time = {}),
      s = (this._adapter = new zx._date(e.adapters.date));
    s.init(n),
      rs(i.displayFormats, s.formats()),
      (this._parseOpts = {
        parser: i.parser,
        round: i.round,
        isoWeekday: i.isoWeekday,
      }),
      super.init(e),
      (this._normalized = n.normalized);
  }
  parse(e, n) {
    return e === void 0 ? null : Zd(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] });
  }
  determineDataLimits() {
    const e = this.options,
      n = this._adapter,
      i = e.time.unit || "day";
    let { min: s, max: r, minDefined: o, maxDefined: l } = this.getUserBounds();
    function a(c) {
      !o && !isNaN(c.min) && (s = Math.min(s, c.min)),
        !l && !isNaN(c.max) && (r = Math.max(r, c.max));
    }
    (!o || !l) &&
      (a(this._getLabelBounds()),
      (e.bounds !== "ticks" || e.ticks.source !== "labels") &&
        a(this.getMinMax(!1))),
      (s = rt(s) && !isNaN(s) ? s : +n.startOf(Date.now(), i)),
      (r = rt(r) && !isNaN(r) ? r : +n.endOf(Date.now(), i) + 1),
      (this.min = Math.min(s, r - 1)),
      (this.max = Math.max(s + 1, r));
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY,
      i = Number.NEGATIVE_INFINITY;
    return e.length && ((n = e[0]), (i = e[e.length - 1])), { min: n, max: i };
  }
  buildTicks() {
    const e = this.options,
      n = e.time,
      i = e.ticks,
      s = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" &&
      s.length &&
      ((this.min = this._userMin || s[0]),
      (this.max = this._userMax || s[s.length - 1]));
    const r = this.min,
      o = this.max,
      l = Pv(s, r, o);
    return (
      (this._unit =
        n.unit ||
        (i.autoSkip
          ? qd(n.minUnit, this.min, this.max, this._getLabelCapacity(r))
          : w_(this, l.length, n.minUnit, this.min, this.max))),
      (this._majorUnit =
        !i.major.enabled || this._unit === "year" ? void 0 : S_(this._unit)),
      this.initOffsets(s),
      e.reverse && l.reverse(),
      ef(this, l, this._majorUnit)
    );
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip &&
      this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let n = 0,
      i = 0,
      s,
      r;
    this.options.offset &&
      e.length &&
      ((s = this.getDecimalForValue(e[0])),
      e.length === 1
        ? (n = 1 - s)
        : (n = (this.getDecimalForValue(e[1]) - s) / 2),
      (r = this.getDecimalForValue(e[e.length - 1])),
      e.length === 1
        ? (i = r)
        : (i = (r - this.getDecimalForValue(e[e.length - 2])) / 2));
    const o = e.length < 3 ? 0.5 : 0.25;
    (n = Be(n, 0, o)),
      (i = Be(i, 0, o)),
      (this._offsets = { start: n, end: i, factor: 1 / (n + 1 + i) });
  }
  _generate() {
    const e = this._adapter,
      n = this.min,
      i = this.max,
      s = this.options,
      r = s.time,
      o = r.unit || qd(r.minUnit, n, i, this._getLabelCapacity(n)),
      l = K(s.ticks.stepSize, 1),
      a = o === "week" ? r.isoWeekday : !1,
      c = io(a) || a === !0,
      u = {};
    let d = n,
      f,
      m;
    if (
      (c && (d = +e.startOf(d, "isoWeek", a)),
      (d = +e.startOf(d, c ? "day" : o)),
      e.diff(i, n, o) > 1e5 * l)
    )
      throw new Error(
        n + " and " + i + " are too far apart with stepSize of " + l + " " + o
      );
    const v = s.ticks.source === "data" && this.getDataTimestamps();
    for (f = d, m = 0; f < i; f = +e.add(f, l, o), m++) Jd(u, f, v);
    return (
      (f === i || s.bounds === "ticks" || m === 1) && Jd(u, f, v),
      Object.keys(u)
        .sort(Qd)
        .map((g) => +g)
    );
  }
  getLabelForValue(e) {
    const n = this._adapter,
      i = this.options.time;
    return i.tooltipFormat
      ? n.format(e, i.tooltipFormat)
      : n.format(e, i.displayFormats.datetime);
  }
  format(e, n) {
    const s = this.options.time.displayFormats,
      r = this._unit,
      o = n || s[r];
    return this._adapter.format(e, o);
  }
  _tickFormatFunction(e, n, i, s) {
    const r = this.options,
      o = r.ticks.callback;
    if (o) return J(o, [e, n, i], this);
    const l = r.time.displayFormats,
      a = this._unit,
      c = this._majorUnit,
      u = a && l[a],
      d = c && l[c],
      f = i[n],
      m = c && d && f && f.major;
    return this._adapter.format(e, s || (m ? d : u));
  }
  generateTickLabels(e) {
    let n, i, s;
    for (n = 0, i = e.length; n < i; ++n)
      (s = e[n]), (s.label = this._tickFormatFunction(s.value, n, e));
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const n = this._offsets,
      i = this.getDecimalForValue(e);
    return this.getPixelForDecimal((n.start + i) * n.factor);
  }
  getValueForPixel(e) {
    const n = this._offsets,
      i = this.getDecimalForPixel(e) / n.factor - n.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(e) {
    const n = this.options.ticks,
      i = this.ctx.measureText(e).width,
      s = At(this.isHorizontal() ? n.maxRotation : n.minRotation),
      r = Math.cos(s),
      o = Math.sin(s),
      l = this._resolveTickFontOptions(0).size;
    return { w: i * r + l * o, h: i * o + l * r };
  }
  _getLabelCapacity(e) {
    const n = this.options.time,
      i = n.displayFormats,
      s = i[n.unit] || i.millisecond,
      r = this._tickFormatFunction(e, 0, ef(this, [e], this._majorUnit), s),
      o = this._getLabelSize(r),
      l =
        Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) -
        1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [],
      n,
      i;
    if (e.length) return e;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return (this._cache.data = s[0].controller.getAllParsedValues(this));
    for (n = 0, i = s.length; n < i; ++n)
      e = e.concat(s[n].controller.getAllParsedValues(this));
    return (this._cache.data = this.normalize(e));
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let n, i;
    if (e.length) return e;
    const s = this.getLabels();
    for (n = 0, i = s.length; n < i; ++n) e.push(Zd(this, s[n]));
    return (this._cache.labels = this._normalized ? e : this.normalize(e));
  }
  normalize(e) {
    return Ip(e.sort(Qd));
  }
}
F(co, "id", "time"),
  F(co, "defaults", {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {},
    },
    ticks: { source: "auto", callback: !1, major: { enabled: !1 } },
  });
function hr(t, e, n) {
  let i = 0,
    s = t.length - 1,
    r,
    o,
    l,
    a;
  n
    ? (e >= t[i].pos && e <= t[s].pos && ({ lo: i, hi: s } = ha(t, "pos", e)),
      ({ pos: r, time: l } = t[i]),
      ({ pos: o, time: a } = t[s]))
    : (e >= t[i].time &&
        e <= t[s].time &&
        ({ lo: i, hi: s } = ha(t, "time", e)),
      ({ time: r, pos: l } = t[i]),
      ({ time: o, pos: a } = t[s]));
  const c = o - r;
  return c ? l + ((a - l) * (e - r)) / c : l;
}
class tf extends co {
  constructor(e) {
    super(e),
      (this._table = []),
      (this._minPos = void 0),
      (this._tableRange = void 0);
  }
  initOffsets() {
    const e = this._getTimestampsForTable(),
      n = (this._table = this.buildLookupTable(e));
    (this._minPos = hr(n, this.min)),
      (this._tableRange = hr(n, this.max) - this._minPos),
      super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: n, max: i } = this,
      s = [],
      r = [];
    let o, l, a, c, u;
    for (o = 0, l = e.length; o < l; ++o)
      (c = e[o]), c >= n && c <= i && s.push(c);
    if (s.length < 2)
      return [
        { time: n, pos: 0 },
        { time: i, pos: 1 },
      ];
    for (o = 0, l = s.length; o < l; ++o)
      (u = s[o + 1]),
        (a = s[o - 1]),
        (c = s[o]),
        Math.round((u + a) / 2) !== c && r.push({ time: c, pos: o / (l - 1) });
    return r;
  }
  _generate() {
    const e = this.min,
      n = this.max;
    let i = super.getDataTimestamps();
    return (
      (!i.includes(e) || !i.length) && i.splice(0, 0, e),
      (!i.includes(n) || i.length === 1) && i.push(n),
      i.sort((s, r) => s - r)
    );
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length) return e;
    const n = this.getDataTimestamps(),
      i = this.getLabelTimestamps();
    return (
      n.length && i.length
        ? (e = this.normalize(n.concat(i)))
        : (e = n.length ? n : i),
      (e = this._cache.all = e),
      e
    );
  }
  getDecimalForValue(e) {
    return (hr(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const n = this._offsets,
      i = this.getDecimalForPixel(e) / n.factor - n.end;
    return hr(this._table, i * this._tableRange + this._minPos, !0);
  }
}
F(tf, "id", "timeseries"), F(tf, "defaults", co.defaults);
const fg = "label";
function nf(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
function b_(t, e) {
  const n = t.options;
  n && e && Object.assign(n, e);
}
function hg(t, e) {
  t.labels = e;
}
function pg(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fg;
  const i = [];
  t.datasets = e.map((s) => {
    const r = t.datasets.find((o) => o[n] === s[n]);
    return !r || !s.data || i.includes(r)
      ? { ...s }
      : (i.push(r), Object.assign(r, s), r);
  });
}
function C_(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fg;
  const n = { labels: [], datasets: [] };
  return hg(n, t.labels), pg(n, t.datasets, e), n;
}
function M_(t, e) {
  const {
      height: n = 150,
      width: i = 300,
      redraw: s = !1,
      datasetIdKey: r,
      type: o,
      data: l,
      options: a,
      plugins: c = [],
      fallbackContent: u,
      updateMode: d,
      ...f
    } = t,
    m = z.useRef(null),
    v = z.useRef(),
    g = () => {
      m.current &&
        ((v.current = new $n(m.current, {
          type: o,
          data: C_(l, r),
          options: a && { ...a },
          plugins: c,
        })),
        nf(e, v.current));
    },
    x = () => {
      nf(e, null), v.current && (v.current.destroy(), (v.current = null));
    };
  return (
    z.useEffect(() => {
      !s && v.current && a && b_(v.current, a);
    }, [s, a]),
    z.useEffect(() => {
      !s && v.current && hg(v.current.config.data, l.labels);
    }, [s, l.labels]),
    z.useEffect(() => {
      !s && v.current && l.datasets && pg(v.current.config.data, l.datasets, r);
    }, [s, l.datasets]),
    z.useEffect(() => {
      v.current && (s ? (x(), setTimeout(g)) : v.current.update(d));
    }, [s, a, l.labels, l.datasets, d]),
    z.useEffect(() => {
      v.current && (x(), setTimeout(g));
    }, [o]),
    z.useEffect(() => (g(), () => x()), []),
    Sf.createElement(
      "canvas",
      Object.assign({ ref: m, role: "img", height: n, width: i }, f),
      u
    )
  );
}
const P_ = z.forwardRef(M_);
function Ac(t, e) {
  return (
    $n.register(e),
    z.forwardRef((n, i) =>
      Sf.createElement(P_, Object.assign({}, n, { ref: i, type: t }))
    )
  );
}
const gg = Ac("bar", Pr),
  E_ = Ac("doughnut", si),
  D_ = Ac("pie", ga);
$n.register(ki, bi, ri, Do, To, Eo);
const Ic = ({ data: t, options: e, plugins: n, header: i }) =>
  S.jsxs("div", {
    className: "chart-container",
    children: [
      S.jsx("h3", { className: "chart-header", children: i }),
      S.jsx(D_, { data: t, options: e, plugins: n }),
    ],
  });
$n.register(ki, bi, as, Do, To, Eo);
function T_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct();
  function s() {
    const g = [];
    for (let x = 1; x <= 5; x++) {
      const p = n.filter((h) => {
        const y = B.isPlayerWinner(h, i),
          _ = B.isGoalDifference(h, x);
        return y && _;
      });
      g.push(p.length);
    }
    return g;
  }
  function r() {
    const g = [];
    for (let x = 1; x <= 5; x++) {
      const p = n.filter((h) => {
        const y = !B.isPlayerWinner(h, i),
          _ = B.isGoalDifference(h, x);
        return y && _;
      });
      g.push(p.length);
    }
    return g;
  }
  function o() {
    return (
      n.reduce((p, h) => (B.isPlayerMVP(h, i) ? p + 1 : p), 0) / n.length
    ).toFixed(2);
  }
  function l() {
    const g = n.filter((h) => B.isPlayerWinner(h, i));
    return (
      g.reduce((h, y) => (B.isPlayerMVP(y, i) ? h + 1 : h), 0) / g.length
    ).toFixed(2);
  }
  const a = () => {
      const g = [],
        x = n.filter((h) => B.isPlayerWinner(h, i)),
        p = n.filter((h) => !B.isPlayerWinner(h, i));
      return g.push(x.length, p.length), g;
    },
    c = {
      afterDraw: function (g) {
        const x = g.ctx,
          p = g.data.datasets[0].data,
          h = p.reduce((y, _) => y + parseFloat(_), 0);
        x.save(),
          p.forEach((y, _) => {
            const b = g
                .getDatasetMeta(0)
                .data[_].getProps(
                  ["x", "y", "startAngle", "endAngle", "outerRadius"],
                  !0
                ),
              { x: C, y: E, startAngle: M, endAngle: T, outerRadius: A } = b,
              $ = (M + T) / 2,
              Q = C + (A - 45) * Math.cos($),
              O = E + (A - 45) * Math.sin($),
              I = ((parseFloat(y) / h) * 100).toFixed(1);
            (x.fillStyle = "white"),
              (x.font = "bold 14px sans-serif"),
              (x.textBaseline = "middle"),
              (x.textAlign = "center"),
              x.fillText(`${I}%`, Q, O);
          }),
          x.restore();
      },
    },
    u = s().reverse().concat(r()),
    d = [
      "rgba(54, 162, 235, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 99, 132, 0.8)",
    ],
    f = [
      "rgba(75, 192, 192, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(255, 99, 132, 1)",
    ],
    m = {
      plugins: {
        legend: { labels: { color: "white" } },
        afterDatasetsDraw: c.afterDatasetsDraw,
      },
    },
    v = {
      labels: ["Games Won", "Games Lost"],
      datasets: [
        {
          label: "Games",
          data: a(),
          backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
          hoverOffset: 4,
        },
      ],
    };
  return S.jsxs("div", {
    id: t,
    className: e,
    children: [
      S.jsx("h3", { children: "Win/Loss Stats" }),
      S.jsxs("ul", {
        children: [
          S.jsxs("li", { children: ["Average MVPs out of all games: ", o()] }),
          S.jsxs("li", { children: ["Average MVPs out of only wins: ", l()] }),
        ],
      }),
      S.jsx(Ic, {
        data: v,
        options: m,
        plugins: [c],
        header: "Win/Loss ratio",
      }),
      S.jsxs("div", {
        className: "bar-chart",
        children: [
          S.jsxs("div", {
            children: [
              S.jsx("h3", {
                className: "chart-header",
                children: "Games by goal difference",
              }),
              S.jsxs("div", {
                className: "bar-chart-label",
                children: [
                  S.jsxs("div", {
                    children: [
                      S.jsx("span", {
                        className: "bar-chart-label-span",
                        style: { backgroundColor: "rgb(54, 162, 235)" },
                      }),
                      S.jsx("p", { children: "Wins" }),
                    ],
                  }),
                  S.jsxs("div", {
                    children: [
                      S.jsx("span", {
                        className: "bar-chart-label-span",
                        style: { backgroundColor: "rgb(255, 95, 132)" },
                      }),
                      S.jsx("p", { children: "Losses" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          S.jsx(gg, {
            data: {
              labels: ["5+", "4", "3", "2", "1", "1", "2", "3", "4", "5+"],
              datasets: [
                {
                  label: "",
                  data: u,
                  backgroundColor: d,
                  borderColor: f,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              maintainAspectRatio: !0,
              responsive: !0,
              scales: {
                y: {
                  title: {
                    display: !0,
                    text: "Number of Games",
                    color: "rgb(230, 232, 239)",
                  },
                  ticks: { stepSize: 1, color: "rgb(230, 232, 239)" },
                  grid: { color: "rgba(230, 232, 239, 0.2)" },
                },
                x: {
                  ticks: { color: "rgb(230, 232, 239)" },
                  grid: { color: "rgba(230, 232, 239, 0.2)" },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    generateLabels: (g) => {
                      const { datasets: x } = g.data;
                      return x.map((p) => ({
                        text: p.label,
                        fontColor: "white",
                        fillStyle: "transparent",
                        strokeStyle: "transparent",
                      }));
                    },
                  },
                },
              },
            },
          }),
        ],
      }),
    ],
  });
}
function O_(t) {
  throw new Error(
    'Could not dynamically require "' +
      t +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  );
}
var mg = { exports: {} };
(function (t, e) {
  (function (n, i) {
    typeof O_ == "function" ? (t.exports = i()) : (n.pluralize = i());
  })(kg, function () {
    var n = [],
      i = [],
      s = {},
      r = {},
      o = {};
    function l(g) {
      return typeof g == "string" ? new RegExp("^" + g + "$", "i") : g;
    }
    function a(g, x) {
      return g === x
        ? x
        : g === g.toLowerCase()
        ? x.toLowerCase()
        : g === g.toUpperCase()
        ? x.toUpperCase()
        : g[0] === g[0].toUpperCase()
        ? x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()
        : x.toLowerCase();
    }
    function c(g, x) {
      return g.replace(/\$(\d{1,2})/g, function (p, h) {
        return x[h] || "";
      });
    }
    function u(g, x) {
      return g.replace(x[0], function (p, h) {
        var y = c(x[1], arguments);
        return a(p === "" ? g[h - 1] : p, y);
      });
    }
    function d(g, x, p) {
      if (!g.length || s.hasOwnProperty(g)) return x;
      for (var h = p.length; h--; ) {
        var y = p[h];
        if (y[0].test(x)) return u(x, y);
      }
      return x;
    }
    function f(g, x, p) {
      return function (h) {
        var y = h.toLowerCase();
        return x.hasOwnProperty(y)
          ? a(h, y)
          : g.hasOwnProperty(y)
          ? a(h, g[y])
          : d(y, h, p);
      };
    }
    function m(g, x, p, h) {
      return function (y) {
        var _ = y.toLowerCase();
        return x.hasOwnProperty(_)
          ? !0
          : g.hasOwnProperty(_)
          ? !1
          : d(_, _, p) === _;
      };
    }
    function v(g, x, p) {
      var h = x === 1 ? v.singular(g) : v.plural(g);
      return (p ? x + " " : "") + h;
    }
    return (
      (v.plural = f(o, r, n)),
      (v.isPlural = m(o, r, n)),
      (v.singular = f(r, o, i)),
      (v.isSingular = m(r, o, i)),
      (v.addPluralRule = function (g, x) {
        n.push([l(g), x]);
      }),
      (v.addSingularRule = function (g, x) {
        i.push([l(g), x]);
      }),
      (v.addUncountableRule = function (g) {
        if (typeof g == "string") {
          s[g.toLowerCase()] = !0;
          return;
        }
        v.addPluralRule(g, "$0"), v.addSingularRule(g, "$0");
      }),
      (v.addIrregularRule = function (g, x) {
        (x = x.toLowerCase()), (g = g.toLowerCase()), (o[g] = x), (r[x] = g);
      }),
      [
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        ["genus", "genera"],
        ["viscus", "viscera"],
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"],
      ].forEach(function (g) {
        return v.addIrregularRule(g[0], g[1]);
      }),
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          "$1i",
        ],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
          "$1a",
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
          "$1a",
        ],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"],
      ].forEach(function (g) {
        return v.addPluralRule(g[0], g[1]);
      }),
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [
          /(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,
          "$1fe",
        ],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [
          /\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,
          "$1ie",
        ],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [
          /(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,
          "$1",
        ],
        [
          /(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,
          "$1sis",
        ],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          "$1us",
        ],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,
          "$1um",
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,
          "$1on",
        ],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"],
      ].forEach(function (g) {
        return v.addSingularRule(g[0], g[1]);
      }),
      [
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        /[^aeiou]ese$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /o[iu]s$/i,
        /pox$/i,
        /sheep$/i,
      ].forEach(v.addUncountableRule),
      v
    );
  });
})(mg);
var L_ = mg.exports;
const Je = df(L_);
function R_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct(),
    [s, r] = z.useState(null);
  z.useEffect(() => {
    n.length && r(o());
  }, [n]);
  function o() {
    const _ = n.filter((w) => B.isPlayerWinner(w, i));
    return _.length
      ? _.reduce((w, k) => {
          const b = B.getGoalDifference(w);
          return B.getGoalDifference(k) > b ? k : w;
        }, _[0])
      : null;
  }
  function l() {
    if (s) {
      const _ = B.getOpposingPlayerNamesWithLinks(s, i),
        w = new Date(s.replay_stats[0].stats.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        k = B.getLinkToReplay(s, w);
      return (
        "Biggest win: " +
        B.getGoalDifference(s) +
        " goal lead against " +
        _ +
        " on " +
        k +
        "."
      );
    } else return "Biggest win: No wins :( keep trying";
  }
  function a(_) {
    return _.sort((w, k) => new Date(w.data.date) - new Date(k.data.date));
  }
  function c() {
    const _ = {};
    return (
      n.forEach((w) => {
        const k = B.splitReplayDate(w);
        _[k] || (_[k] = []), _[k].push(w);
      }),
      _
    );
  }
  function u(_) {
    const w = {};
    for (const k in _)
      w[k] = _[k].reduce((b, C) => b + (B.isPlayerWinner(C, i) ? 1 : 0), 0);
    return w;
  }
  function d(_) {
    return Object.entries(_).reduce(
      (w, [k, b]) => (
        b > w.maxVal
          ? ((w.maxVal = b), (w.maxKeys = [k]))
          : b === w.maxVal && w.maxKeys.push(k),
        w
      ),
      { maxVal: 0, maxKeys: [] }
    );
  }
  const f = (_) =>
    Object.entries(_).reduce(
      (w, [k, b]) => {
        const C = b.length;
        return (
          C > w.maxVal
            ? ((w.maxVal = C), (w.maxKeys = [k]))
            : C === w.maxVal && w.maxKeys.push(k),
          w
        );
      },
      { maxVal: 0, maxKeys: [] }
    );
  function m() {
    const _ = c(),
      w = u(_),
      { maxVal: k, maxKeys: b } = d(w),
      C = b
        .map((E, M) => {
          const T = new Date(E + "T00:00:00").toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return M === b.length - 1 && b.length > 1 ? `and ${T}` : T;
        })
        .join(b.length > 2 ? ", " : " ");
    return `${Je("Date", b.length)} with most wins: ${C}, with ${k} ${Je(
      "win",
      k
    )}`;
  }
  function v() {
    let _ = 0;
    const w = {};
    let k = 0;
    return (
      a(n).forEach((C) => {
        const E = B.splitReplayDate(C);
        B.isPlayerWinner(C, i)
          ? (_ < 1 &&
              ((w[`${k}`] = {}),
              (w[`${k}`].startDate = E),
              "winStreak" in w[`${k}`] || (w[`${k}`].winStreak = 0)),
            _++)
          : (`${k}` in w
              ? ((w[`${k}`].endDate = E), (w[`${k}`].winStreak = _))
              : ((w[`${k}`] = {}),
                (w[`${k}`].endDate = E),
                (w[`${k}`].winStreak = _)),
            (_ = 0),
            k++);
      }),
      w
    );
  }
  function g(_) {
    let w = -1 / 0,
      k = [];
    for (const b in _)
      _[b].winStreak > w
        ? ((w = _[b].winStreak), (k = [_[b]]))
        : _[b].winStreak === w && k.push(_[b]);
    return { maxWinStreak: w, objectsWithMaxWinStreak: k };
  }
  function x() {
    const _ = v(),
      { maxWinStreak: w, objectsWithMaxWinStreak: k } = g(_);
    if (w < 1) return "Largest win streak: No win streak yet";
    const b = k
      .map((C, E) => {
        const M = new Date(C.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          T = new Date(C.endDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        return E === k.length - 1 && k.length > 1
          ? `and from ${M} to ${T}`
          : `from ${M} to ${T}`;
      })
      .join(k.length > 2 ? ", " : " ");
    return `Largest win ${Je("streak", k.length)}: ${w} ${Je("win", w)} ${b}.`;
  }
  function p() {
    const _ = c();
    let w = [];
    return (
      Object.entries(_).forEach((C) => {
        w.push(C[1].length);
      }),
      (w.reduce((C, E) => C + E, 0) / w.length).toFixed(2)
    );
  }
  function h() {
    const _ = c(),
      w = Object.keys(_).sort(),
      k = new Date(w[0]),
      b = new Date(w[w.length - 1]);
    let C = new Date(k),
      E = [];
    for (; C <= b; ) {
      const A = C.toISOString().split("T")[0];
      _[A] ? E.push(_[A].length) : E.push(0), C.setDate(C.getDate() + 1);
    }
    return (E.reduce((A, $) => A + $, 0) / E.length).toFixed(2);
  }
  function y() {
    const _ = c(),
      { maxVal: w, maxKeys: k } = f(_),
      b = k
        .map((C, E) => {
          const M = new Date(C + "T00:00:00").toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return E === k.length - 1 && k.length > 1 ? `and ${M}` : M;
        })
        .join(k.length > 2 ? ", " : " ");
    return `${Je(
      "Date",
      k.length
    )} with most played games: ${b}, with ${w} ${Je("game", w)}`;
  }
  return S.jsxs("div", {
    id: t,
    className: e,
    children: [
      S.jsx("h3", { children: "Date Stats" }),
      S.jsxs("ul", {
        children: [
          S.jsx("li", { dangerouslySetInnerHTML: { __html: l() } }),
          S.jsx("li", { children: x() }),
          S.jsxs("li", {
            children: ["Average ranked games played per session: ", p()],
          }),
          S.jsxs("li", {
            children: ["Average ranked games played per day: ", h()],
          }),
          S.jsx("li", { children: y() }),
          S.jsx("li", { children: m() }),
        ],
      }),
    ],
  });
}
function A_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct(),
    [s, r] = z.useState([]);
  z.useEffect(() => {
    if (n.length) {
      const x = n.filter((p) => B.getOvertimeSeconds(p));
      r(x);
    }
  }, [n]);
  function o(x) {
    const p = Math.floor(x / 60),
      h = x % 60;
    return `${p}m ${h}s`;
  }
  const l = () => n.filter((x) => B.getOvertimeSeconds(x));
  function a() {
    return ((l().length / n.length) * 100).toFixed(2);
  }
  function c() {
    const x = l().map((h) => parseInt(B.getOvertimeSeconds(h), 10)),
      p = Math.max(...x);
    return o(p);
  }
  function u() {
    const x = n
        .filter((h) => {
          const y = B.isPlayerWinner(h, i),
            _ = B.getOvertimeSeconds(h);
          return y && _ > 0;
        })
        .map((h) => {
          const y = B.getOvertimeSeconds(h);
          return parseInt(y, 10);
        }),
      p = Math.max(...x);
    return p === -1 / 0 ? "No Overtimes Won :(" : o(p);
  }
  function d() {
    const x = n
        .filter((h) => {
          const y = !B.isPlayerWinner(h, i),
            _ = B.getOvertimeSeconds(h);
          return y && _ > 0;
        })
        .map((h) => {
          const y = B.getOvertimeSeconds(h);
          return parseInt(y, 10);
        }),
      p = Math.max(...x);
    return p === -1 / 0 ? "No Overtimes lost :)" : o(p);
  }
  const f = () => {
      const x = [],
        p = n.filter((_) => B.getOvertimeSeconds(_) > 0),
        h = p.filter((_) => B.isPlayerWinner(_, i)),
        y = p.length - h.length;
      return x.push(h.length, y), x;
    },
    m = {
      afterDraw: function (x) {
        const p = x.ctx,
          h = x.data.datasets[0].data,
          y = h.reduce((_, w) => _ + parseFloat(w), 0);
        p.save(),
          h.forEach((_, w) => {
            const C = x
                .getDatasetMeta(0)
                .data[w].getProps(
                  ["x", "y", "startAngle", "endAngle", "outerRadius"],
                  !0
                ),
              { x: E, y: M, startAngle: T, endAngle: A, outerRadius: $ } = C,
              Q = (T + A) / 2,
              O = E + ($ - 45) * Math.cos(Q),
              I = M + ($ - 45) * Math.sin(Q),
              N = ((parseFloat(_) / y) * 100).toFixed(1);
            (p.fillStyle = "white"),
              (p.font = "bold 14px sans-serif"),
              (p.textBaseline = "middle"),
              (p.textAlign = "center"),
              p.fillText(`${N}%`, O, I);
          }),
          p.restore();
      },
    },
    v = {
      labels: ["Overtimes Won", "Overtimes Lost"],
      datasets: [
        {
          label: "overtimes",
          data: f(),
          backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
          hoverOffset: 4,
        },
      ],
    },
    g = {
      plugins: {
        legend: { labels: { color: "white" } },
        afterDatasetsDraw: m.afterDatasetsDraw,
      },
    };
  return s.length < 1
    ? S.jsxs("div", {
        id: t,
        className: e,
        children: [
          S.jsx("h3", { children: "Overtime Stats" }),
          S.jsx("p", { children: "No overtimes found." }),
        ],
      })
    : S.jsxs("div", {
        id: t,
        className: e,
        children: [
          S.jsx("h3", { children: "Overtime Stats" }),
          S.jsxs("ul", {
            children: [
              S.jsxs("li", {
                children: ["% games go to overtime: ", a(), "%"],
              }),
              S.jsxs("li", { children: ["Longest overtime: ", c()] }),
              S.jsxs("li", { children: ["Longest overtime win: ", u()] }),
              S.jsxs("li", { children: ["Longest overtime loss: ", d()] }),
            ],
          }),
          S.jsx(Ic, {
            data: v,
            options: g,
            plugins: [m],
            header: "Overtimes win/loss ratio",
          }),
        ],
      });
}
$n.register(ki, bi, as, Do, To, Eo);
function I_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct();
  function s(v = n) {
    return (
      v.reduce((p, h) => p + B.getDemosInflicted(h, i), 0) / v.length
    ).toFixed(2);
  }
  function r(v = n) {
    return (
      v.reduce((p, h) => p + B.getDemosTaken(h, i), 0) / v.length
    ).toFixed(2);
  }
  function o() {
    const v = n.map((g) => {
      const x = B.getDemosInflicted(g, i);
      return parseInt(x, 10);
    });
    return Math.max(...v);
  }
  function l() {
    return [s(), r()];
  }
  function a() {
    const v = n.filter((p) => !B.isPlayerWinner(p, i)),
      g = s(v),
      x = r(v);
    return [g, x];
  }
  function c() {
    const v = n.filter((p) => B.isPlayerWinner(p, i)),
      g = s(v),
      x = r(v);
    return [g, x];
  }
  const u = {
      labels: ["Wins", "Losses"],
      datasets: [
        {
          label: "Inflicted",
          data: [c()[0], a()[0]],
          backgroundColor: "rgb(54, 162, 235)",
        },
        {
          label: "Taken",
          data: [c()[1], a()[1]],
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    },
    d = {
      afterDraw: function (v) {
        const g = v.ctx,
          x = v.data.datasets[0].data;
        g.save(),
          x.forEach((p, h) => {
            const w = v
                .getDatasetMeta(0)
                .data[h].getProps(
                  [
                    "x",
                    "y",
                    "startAngle",
                    "endAngle",
                    "outerRadius",
                    "innerRadius",
                  ],
                  !0
                ),
              { x: k, y: b, startAngle: C, endAngle: E, outerRadius: M } = w,
              T = (C + E) / 2,
              A = k + (M - 45) * Math.cos(T),
              $ = b + (M - 45) * Math.sin(T);
            (g.fillStyle = "white"),
              (g.font = "bold 14px sans-serif"),
              (g.textBaseline = "middle"),
              (g.textAlign = "center"),
              g.fillText(p, A, $);
          }),
          g.restore();
      },
    },
    f = {
      labels: ["Demos Inflicted", "Demos Taken"],
      datasets: [
        {
          label: "Demos",
          data: l(),
          backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
          hoverOffset: 4,
        },
      ],
    },
    m = {
      plugins: {
        legend: { labels: { color: "white" } },
        afterDatasetsDraw: d.afterDatasetsDraw,
      },
    };
  return S.jsxs("div", {
    id: t,
    className: e,
    children: [
      S.jsx("h3", { children: "Demolition Stats" }),
      S.jsx("ul", {
        children: S.jsxs("li", {
          children: ["Most demos in a single game: ", o()],
        }),
      }),
      s() > 0 && r() > 0
        ? S.jsx(Ic, {
            data: f,
            options: m,
            plugins: [d],
            header: "Average demos inflicted/taken per game",
          })
        : null,
      S.jsxs("div", {
        className: "bar-chart",
        children: [
          S.jsx("h3", {
            className: "chart-header",
            children:
              "Average demos inflicted/taken per game in wins and losses",
          }),
          S.jsx(gg, {
            data: u,
            options: {
              plugins: { legend: { labels: { color: "white" } } },
              maintainAspectRatio: !0,
              responsive: !0,
              scales: {
                y: {
                  ticks: { stepSize: 0.5, color: "rgb(230, 232, 239)" },
                  grid: { color: "rgba(230, 232, 239, 0.2)" },
                },
                x: {
                  ticks: { color: "rgb(230, 232, 239)" },
                  grid: { color: "rgba(230, 232, 239, 0.2)" },
                },
              },
            },
          }),
        ],
      }),
    ],
  });
}
$n.register(ki, bi, ri, Do, To, Eo);
const j_ = ({ data: t, options: e, plugins: n, header: i }) =>
  S.jsxs("div", {
    className: "chart-container",
    children: [
      S.jsx("h3", { className: "chart-header", children: i }),
      S.jsx(E_, { data: t, options: e, plugins: n }),
    ],
  });
function z_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct();
  function s() {
    return (
      n.reduce((_, w) => _ + B.getPercentSupersonicSpeed(w, i), 0) / n.length
    ).toFixed(2);
  }
  function r() {
    return (
      n.reduce((_, w) => _ + B.getPercentBoostSpeed(w, i), 0) / n.length
    ).toFixed(2);
  }
  function o() {
    return (
      n.reduce((_, w) => _ + B.getPercentSlowSpeed(w, i), 0) / n.length
    ).toFixed(2);
  }
  function l() {
    return (n.reduce((_, w) => _ + B.getBPM(w, i), 0) / n.length).toFixed(2);
  }
  function a() {
    return (n.reduce((_, w) => _ + B.getBCPM(w, i), 0) / n.length).toFixed(2);
  }
  function c() {
    return n.reduce((y, _) => y + B.getAvgSpeed(_, i), 0) / n.length;
  }
  function u() {
    const h = c();
    return ((h / 2300) * 100).toFixed(2) + "% (" + Math.trunc(h) + "uu/s)";
  }
  function d(h = n) {
    return h.reduce((y, _) => y + B.getTotalDistance(_, i), 0);
  }
  function f() {
    return (d(n) / n.length).toFixed(2);
  }
  function m() {
    return [o(), r(), s()];
  }
  const v = {
      afterDraw: function (h) {
        const y = h.ctx,
          _ = h.data.datasets[0].data,
          w = _.reduce((k, b) => k + parseFloat(b), 0);
        y.save(),
          _.forEach((k, b) => {
            const M = h
                .getDatasetMeta(0)
                .data[b].getProps(
                  [
                    "x",
                    "y",
                    "startAngle",
                    "endAngle",
                    "outerRadius",
                    "innerRadius",
                  ],
                  !0
                ),
              {
                x: T,
                y: A,
                startAngle: $,
                endAngle: Q,
                outerRadius: O,
                innerRadius: I,
              } = M,
              N = ($ + Q) / 2,
              D = (O + I) / 2,
              L = T + D * Math.cos(N),
              j = A + D * Math.sin(N),
              U = ((parseFloat(k) / w) * 100).toFixed(1);
            (y.fillStyle = "white"),
              (y.font = "bold 14px sans-serif"),
              (y.textBaseline = "middle"),
              (y.textAlign = "center"),
              y.fillText(`${U}%`, L, j);
          }),
          y.restore();
      },
    },
    g = {
      beforeDraw: function (h) {
        const y = h.ctx,
          _ = h.width,
          w = h.height;
        y.restore();
        const k = (w / 550).toFixed(2);
        (y.font = `${k}em sans-serif`), (y.textBaseline = "middle");
        const b = "Average Speed:",
          C = `${u()}`,
          E = Math.round((_ - y.measureText(b).width) / 2),
          M = Math.round((_ - y.measureText(C).width) / 2),
          T = w / 2;
        (y.fillStyle = "white"),
          y.fillText(b, E, T + 15),
          y.fillText(C, M, T + 38),
          y.save();
      },
    },
    x = {
      labels: ["Slow Speed", "Boost Speed", "Supersonic Speed"],
      datasets: [
        {
          labels: ["Average Speed"],
          data: m(),
          backgroundColor: [
            "rgb(204, 50, 50)",
            "rgb(231, 180, 22",
            "rgb(45, 201, 55)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    p = {
      cutoutPercentage: 70,
      plugins: {
        legend: { labels: { color: "white" } },
        beforeDraw: g.beforeDraw,
        afterDatasetsDraw: v.afterDatasetsDraw,
      },
    };
  return S.jsxs("div", {
    id: t,
    className: e,
    children: [
      S.jsx("h3", { children: "Movement/Speed Stats" }),
      S.jsxs("ul", {
        children: [
          S.jsxs("li", { children: ["Average boost used per minute: ", l()] }),
          S.jsxs("li", {
            children: ["Average boost collected per minute: ", a()],
          }),
          S.jsxs("li", {
            children: ["Average distance driven per game: ", f()],
          }),
          S.jsxs("li", {
            children: [" Total distance driven across all games: ", d()],
          }),
        ],
      }),
      S.jsx(j_, {
        data: x,
        options: p,
        plugins: [g, v],
        header: "Percent of time spent at different speeds",
      }),
    ],
  });
}
const N_ = "_carBtnsContainer_ag96r_1",
  F_ = "_carsFilterSection_ag96r_10",
  sf = { carBtnsContainer: N_, carsFilterSection: F_ };
function B_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct(),
    [s, r] = z.useState(null),
    [o, l] = z.useState([]),
    [a, c] = z.useState(null);
  z.useEffect(() => {
    n.length && c(d());
  }, [n, s]),
    z.useEffect(() => {
      if (n.length) {
        let f = [];
        n.forEach((v) => {
          const g = B.getUsedCar(v, i);
          g && f.push(g);
        });
        let m = f.filter(function (v, g, x) {
          return g == x.indexOf(v) && v != null;
        });
        l(m);
      }
    }, [n]);
  function u() {
    let f = n;
    return s && (f = n.filter((m) => B.withUsedCar(m, i, s))), f || [];
  }
  function d() {
    let m = u().map((x) => B.getMainCoreStats(x, i));
    const v = { numberOfGames: m.length };
    return (
      [
        "goals",
        "shots",
        "saves",
        "assists",
        "score",
        "shooting_percentage",
      ].forEach((x) => {
        const p = m.reduce((h, y) => h + y[x], 0);
        v[x] = (p / m.length).toFixed(2);
      }),
      v
    );
  }
  return o.length <= 1
    ? S.jsxs("div", {
        id: t,
        className: e,
        children: [
          S.jsx("h3", { children: "Car Stats" }),
          S.jsx("p", {
            children: "Only one car used, nothing to compare against.",
          }),
        ],
      })
    : S.jsxs("div", {
        id: t,
        className: e,
        children: [
          S.jsx("h3", { children: "Car Stats" }),
          S.jsxs("div", {
            className: sf.carsFilterSection,
            children: [
              S.jsx("h4", { children: "Filter averages by used car:" }),
              S.jsxs("div", {
                className: sf.carBtnsContainer,
                children: [
                  S.jsx("button", {
                    onClick: () => r(null),
                    className: s === null ? "focused" : "",
                    children: "All",
                  }),
                  o.map((f) =>
                    S.jsx(
                      "button",
                      {
                        onClick: () => r(f),
                        className: s === f ? "focused" : "",
                        children: f,
                      },
                      f
                    )
                  ),
                ],
              }),
            ],
          }),
          S.jsxs("table", {
            children: [
              S.jsxs("caption", {
                children: [
                  "Averages (",
                  a.numberOfGames,
                  " ",
                  Je("game", a.numberOfGames),
                  ")",
                ],
              }),
              S.jsxs("tbody", {
                children: [
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Score" }),
                      S.jsx("td", { children: a.score }),
                    ],
                  }),
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Goals" }),
                      S.jsx("td", { children: a.goals }),
                    ],
                  }),
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Assists" }),
                      S.jsx("td", { children: a.assists }),
                    ],
                  }),
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Shots" }),
                      S.jsx("td", { children: a.shots }),
                    ],
                  }),
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Saves" }),
                      S.jsx("td", { children: a.saves }),
                    ],
                  }),
                  S.jsxs("tr", {
                    children: [
                      S.jsx("th", { children: "Shooting Percentage" }),
                      S.jsx("td", { children: a.shooting_percentage }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
}
function $_({ id: t, className: e }) {
  const { replays: n, playerId: i } = Ct();
  function s() {
    const u = {};
    return (
      n.forEach((d) => {
        const f = B.getMapName(d);
        u[f] || (u[f] = []), u[f].push(d);
      }),
      u
    );
  }
  function r(u) {
    const d = {};
    for (const f in u)
      d[f] = u[f].reduce((m, v) => m + (B.isPlayerWinner(v, i) ? 1 : 0), 0);
    return d;
  }
  function o(u) {
    return Object.entries(u).reduce(
      (d, [f, m]) => (
        m > d.maxVal
          ? ((d.maxVal = m), (d.maxKeys = [f]))
          : m === d.maxVal && d.maxKeys.push(f),
        d
      ),
      { maxVal: 0, maxKeys: [] }
    );
  }
  const l = (u) =>
    Object.entries(u).reduce(
      (d, [f, m]) => {
        const v = m.length;
        return (
          v > d.maxVal
            ? ((d.maxVal = v), (d.maxKeys = [f]))
            : v === d.maxVal && d.maxKeys.push(f),
          d
        );
      },
      { maxVal: 0, maxKeys: [] }
    );
  function a() {
    const u = s(),
      d = r(u),
      { maxVal: f, maxKeys: m } = o(d),
      v = m
        .map((g, x) => (x === m.length - 1 && m.length > 1 ? `and ${g}` : g))
        .join(m.length > 2 ? ", " : " ");
    return `${Je("Map", m.length)} with most wins: ${v}, with ${f} ${Je(
      "win",
      f
    )}`;
  }
  function c() {
    const u = s(),
      { maxVal: d, maxKeys: f } = l(u),
      m = f
        .map((v, g) => (g === f.length - 1 && f.length > 1 ? `and ${v}` : v))
        .join(f.length > 2 ? ", " : " ");
    return `${Je("Map", f.length)} with most played games: ${m}, with ${d} ${Je(
      "game",
      d
    )}`;
  }
  return S.jsxs("div", {
    id: t,
    className: e,
    children: [
      S.jsx("h3", { children: "Map Stats" }),
      S.jsxs("ul", {
        children: [
          S.jsx("li", { children: c() }),
          S.jsx("li", { children: a() }),
        ],
      }),
      S.jsx("br", {}),
    ],
  });
}
const W_ = "_statsContainer_1ydny_1",
  H_ = "_statsContainerHeader_1ydny_7",
  V_ = "_sentinel_1ydny_11",
  U_ = "_gameCount_1ydny_17",
  Y_ = "_sticky_1ydny_27",
  K_ = "_component_1ydny_34",
  X_ = "_componentNoChart_1ydny_46",
  Oe = {
    statsContainer: W_,
    statsContainerHeader: H_,
    sentinel: V_,
    gameCount: U_,
    sticky: Y_,
    component: K_,
    componentNoChart: X_,
  };
function G_() {
  const { replays: t, playerName: e } = Ct(),
    [n, i] = z.useState(!1),
    s = z.useRef(null);
  return (
    z.useEffect(() => {
      const r = () => {
        s.current &&
          (s.current.getBoundingClientRect().top <= -50 ? i(!0) : i(!1));
      };
      return (
        window.addEventListener("scroll", r),
        () => {
          window.removeEventListener("scroll", r);
        }
      );
    }, []),
    t.length
      ? S.jsxs("div", {
          children: [
            S.jsx("div", {
              className: Oe.statsContainerHeader,
              children: S.jsxs("h2", { children: [e, "'s Stats:"] }),
            }),
            S.jsx("div", { ref: s, className: Oe.sentinel }),
            S.jsxs("h3", {
              id: "sticky",
              className: `${Oe.gameCount} ${n ? Oe.sticky : ""}`,
              children: [
                "(based on ",
                t.length,
                " fetched ",
                Je("replay", t.length),
                ")",
              ],
            }),
            S.jsxs("div", {
              className: Oe.statsContainer,
              children: [
                S.jsx(B_, { id: "carSection", className: Oe.component }),
                S.jsx(T_, { id: "winLossSection", className: Oe.component }),
                S.jsx(z_, { id: "movementSection", className: Oe.component }),
                S.jsx(A_, { id: "overtimeSection", className: Oe.component }),
                S.jsx(I_, { id: "demoSection", className: Oe.component }),
                S.jsx($_, {
                  id: "mapSection",
                  className: `${Oe.component} ${Oe.componentNoChart}`,
                }),
                S.jsx(R_, {
                  id: "dateSection",
                  className: `${Oe.component} ${Oe.componentNoChart}`,
                }),
              ],
            }),
          ],
        })
      : S.jsx("div", {
          className: Oe.statsContainerHeader,
          children: S.jsxs("div", {
            children: [
              S.jsxs("h2", { children: [e, "'s Stats:"] }),
              S.jsx("h3", {
                children: "No replays found for the selected playlist",
              }),
            ],
          }),
        })
  );
}
const xa = (t, e) => e.some((n) => t instanceof n);
let rf, of;
function Q_() {
  return (
    rf ||
    (rf = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Z_() {
  return (
    of ||
    (of = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const _a = new WeakMap(),
  ml = new WeakMap(),
  Lo = new WeakMap();
function q_(t) {
  const e = new Promise((n, i) => {
    const s = () => {
        t.removeEventListener("success", r), t.removeEventListener("error", o);
      },
      r = () => {
        n(Dn(t.result)), s();
      },
      o = () => {
        i(t.error), s();
      };
    t.addEventListener("success", r), t.addEventListener("error", o);
  });
  return Lo.set(e, t), e;
}
function J_(t) {
  if (_a.has(t)) return;
  const e = new Promise((n, i) => {
    const s = () => {
        t.removeEventListener("complete", r),
          t.removeEventListener("error", o),
          t.removeEventListener("abort", o);
      },
      r = () => {
        n(), s();
      },
      o = () => {
        i(t.error || new DOMException("AbortError", "AbortError")), s();
      };
    t.addEventListener("complete", r),
      t.addEventListener("error", o),
      t.addEventListener("abort", o);
  });
  _a.set(t, e);
}
let wa = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done") return _a.get(t);
      if (e === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return Dn(t[e]);
  },
  set(t, e, n) {
    return (t[e] = n), !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store")
      ? !0
      : e in t;
  },
};
function yg(t) {
  wa = t(wa);
}
function ew(t) {
  return Z_().includes(t)
    ? function (...e) {
        return t.apply(Sa(this), e), Dn(this.request);
      }
    : function (...e) {
        return Dn(t.apply(Sa(this), e));
      };
}
function tw(t) {
  return typeof t == "function"
    ? ew(t)
    : (t instanceof IDBTransaction && J_(t),
      xa(t, Q_()) ? new Proxy(t, wa) : t);
}
function Dn(t) {
  if (t instanceof IDBRequest) return q_(t);
  if (ml.has(t)) return ml.get(t);
  const e = tw(t);
  return e !== t && (ml.set(t, e), Lo.set(e, t)), e;
}
const Sa = (t) => Lo.get(t);
function nw(t, e, { blocked: n, upgrade: i, blocking: s, terminated: r } = {}) {
  const o = indexedDB.open(t, e),
    l = Dn(o);
  return (
    i &&
      o.addEventListener("upgradeneeded", (a) => {
        i(Dn(o.result), a.oldVersion, a.newVersion, Dn(o.transaction), a);
      }),
    n && o.addEventListener("blocked", (a) => n(a.oldVersion, a.newVersion, a)),
    l
      .then((a) => {
        r && a.addEventListener("close", () => r()),
          s &&
            a.addEventListener("versionchange", (c) =>
              s(c.oldVersion, c.newVersion, c)
            );
      })
      .catch(() => {}),
    l
  );
}
const iw = ["get", "getKey", "getAll", "getAllKeys", "count"],
  sw = ["put", "add", "delete", "clear"],
  yl = new Map();
function lf(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string")) return;
  if (yl.get(e)) return yl.get(e);
  const n = e.replace(/FromIndex$/, ""),
    i = e !== n,
    s = sw.includes(n);
  if (
    !(n in (i ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || iw.includes(n))
  )
    return;
  const r = async function (o, ...l) {
    const a = this.transaction(o, s ? "readwrite" : "readonly");
    let c = a.store;
    return (
      i && (c = c.index(l.shift())),
      (await Promise.all([c[n](...l), s && a.done]))[0]
    );
  };
  return yl.set(e, r), r;
}
yg((t) => ({
  ...t,
  get: (e, n, i) => lf(e, n) || t.get(e, n, i),
  has: (e, n) => !!lf(e, n) || t.has(e, n),
}));
const rw = ["continue", "continuePrimaryKey", "advance"],
  af = {},
  ka = new WeakMap(),
  vg = new WeakMap(),
  ow = {
    get(t, e) {
      if (!rw.includes(e)) return t[e];
      let n = af[e];
      return (
        n ||
          (n = af[e] =
            function (...i) {
              ka.set(this, vg.get(this)[e](...i));
            }),
        n
      );
    },
  };
async function* lw(...t) {
  let e = this;
  if ((e instanceof IDBCursor || (e = await e.openCursor(...t)), !e)) return;
  e = e;
  const n = new Proxy(e, ow);
  for (vg.set(n, e), Lo.set(n, Sa(e)); e; )
    yield n, (e = await (ka.get(n) || e.continue())), ka.delete(n);
}
function cf(t, e) {
  return (
    (e === Symbol.asyncIterator &&
      xa(t, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (e === "iterate" && xa(t, [IDBIndex, IDBObjectStore]))
  );
}
yg((t) => ({
  ...t,
  get(e, n, i) {
    return cf(e, n) ? lw : t.get(e, n, i);
  },
  has(e, n) {
    return cf(e, n) || t.has(e, n);
  },
}));
const xg = async () =>
    nw("ReplayDB", 1, {
      upgrade(t) {
        t.objectStoreNames.contains("replays") ||
          t.createObjectStore("replays", { keyPath: "playerId" });
      },
    }),
  aw = async (t, e, n) => {
    await (await xg()).put("replays", { playerId: t, replays: e, name: n });
  },
  uf = async (t) => (await (await xg()).get("replays", t)) || "";
function cw() {
  const {
      setPrefilteredReplays: t,
      loading: e,
      setLoading: n,
      error: i,
      setError: s,
      playerName: r,
      setPlayerName: o,
      playerId: l,
      setPlayerId: a,
      unprocessedPlayerId: c,
      setUnprocessedPlayerId: u,
    } = Ct(),
    [d, f] = z.useState(null),
    [m, v] = z.useState(!1),
    [g, x] = z.useState(new Date()),
    [p, h] = z.useState(""),
    [y, _] = z.useState(!1),
    w = z.useRef(null),
    [k, b] = z.useState(!1);
  z.useEffect(() => {
    (async () => {
      const I = localStorage.getItem("cachedPlayerId");
      if ((console.log("fetch cached player, playerID:", I), I))
        try {
          const N = await uf(I);
          console.log("cached player ID exists, this is the cached player:", N),
            N != null &&
              N.replays &&
              (console.log(
                "cached player has replays, here they are:",
                N.replays
              ),
              T(I, N),
              a(I));
        } catch (N) {
          console.error("Error fetching cached player data from IndexedDB:", N);
        }
    })();
  }, [t]),
    z.useEffect(() => {
      const O = () => {
        w.current &&
          (w.current.getBoundingClientRect().top <= 10 ? _(!0) : _(!1));
      };
      return (
        window.addEventListener("scroll", O),
        () => {
          window.removeEventListener("scroll", O);
        }
      );
    }, []);
  const C = new Set(),
    E = z.useRef(!0),
    M = async () => {
      try {
        const O = await fetch("http://localhost:3000/api/v1/check_admin", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!O.ok) throw new Error(`Server error: ${O.status}`);
        const I = await O.json();
        v(I.is_admin);
      } catch (O) {
        console.error("Error checking admin status:", O);
      }
    };
  z.useEffect(() => {
    M();
  }, []);
  const T = (O, I) => {
      console.log(`found cached replays for playerId: ${O}`),
        console.log("here are the replays:", I.replays),
        t(I.replays),
        o(I.name),
        localStorage.setItem("cachedPlayerId", O),
        h(O),
        n(!1);
    },
    A = (O) =>
      O.filter((I) => {
        const N = I.replay_stats[0].stats.match_guid;
        return C.has(N) ? !1 : (C.add(N), !0);
      }),
    $ = async (O, I = null, N = !1, D) => {
      if (
        (console.log("playerId at start of fetchReplays:", O),
        console.log("fetchnewreplays:", D),
        !N && !D)
      ) {
        const L = localStorage.getItem("cachedPlayerId") || "";
        console.log(`looking for data from playerID: ${L}`);
        const j = await uf(L);
        if (j) return T(L, j);
      }
      try {
        const L = new Date().getTime();
        console.log("playerID value right before fetch:", O);
        const j = await fetch(
          `http://localhost:3000/${
            m ? "fetch_replays_admin" : "fetch_replays"
          }`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ player_id: O, after_date: I, sync: N }),
          }
        );
        if (j.status >= 400) throw new Error("server error");
        const U = await j.json();
        console.log("fetched replays:", U);
        const Y = A(U);
        if (Y.length) {
          const at = [...Y].sort(
            (Wn, _g) => new Date(Wn.data.date) - new Date(_g.data.date)
          );
          t(at);
          const ve = B.getPlayerNameById(Y[0], O);
          o(ve),
            await aw(O, Y, ve),
            localStorage.setItem("cachedPlayerId", O),
            O !== p && (t([...Y]), h(O));
        } else console.log("No replays found for this player.");
        const we = new Date().getTime() - L;
        console.log("result:", we, "ms");
      } catch (L) {
        s(L);
      } finally {
        n(!1);
      }
    },
    Q = (O, I = !1) => {
      var D;
      if ((O.preventDefault(), n(!0), !c))
        return f("Please enter a valid player URL");
      f(null);
      const N =
        (D = c.match(
          /^https:\/\/ballchasing\.com\/player\/([^/]+\/[a-zA-Z0-9_]+)$/
        )) == null
          ? void 0
          : D[1].replace("/", ":");
      if (!N)
        return f(
          "Invalid URL format. The URL should look like the one displayed above"
        );
      c !== p && h(c),
        a(N),
        localStorage.setItem("cachedPlayerId", N),
        $(N, m ? g.toISOString().split(".")[0] + "Z" : null, I, k);
    };
  return (
    z.useEffect(() => {
      E.current && ((E.current = !1), $(l));
    }, []),
    i
      ? S.jsx("div", {
          className: "error-container",
          children: S.jsxs("div", {
            className: "error",
            children: [
              S.jsx("p", {
                children:
                  "An error was encountered. Check your internet connection and try again.",
              }),
              S.jsxs("p", {
                children: [
                  "If the error persists, it is likely a bug. I would appreciate if you reported it as an issue on",
                  " ",
                  S.jsx("a", {
                    href: "https://github.com/maybethee/stat-chasing-rails/issues",
                    children: "Github",
                  }),
                  " ",
                  "with info about what happened right before seeing the error and I'll do my best to fix it 🫡.",
                ],
              }),
            ],
          }),
        })
      : S.jsxs("div", {
          className: le.mainPageContent,
          children: [
            S.jsxs("div", {
              className: le.topRow,
              children: [
                S.jsxs("div", {
                  className: le.headerSection,
                  children: [
                    S.jsxs("header", {
                      className: le.mainHeader,
                      children: [
                        S.jsx("h1", { children: "Statchasing" }),
                        S.jsx(S0, {}),
                      ],
                    }),
                    S.jsxs("section", {
                      className: le.welcomeSection,
                      children: [
                        S.jsx("h2", { children: "Welcome" }),
                        S.jsx("p", {
                          children:
                            "Find some interesting stats based on players' ballchasing.com profiles. Currently, this only fetches replays from the last 30 days.",
                        }),
                        S.jsx("p", {
                          children:
                            "Note: due to the API rate limitations set by ballchasing, this process can be *very* slow, especially if the searched for player has many replays associated with them from the last 30 days.",
                        }),
                        S.jsxs("p", {
                          children: [
                            "Consider supporting ballchasing.com by becoming a",
                            " ",
                            S.jsx("a", {
                              href: "https://www.patreon.com/ballchasing",
                              children: "Patreon patron",
                            }),
                            ".",
                          ],
                        }),
                        S.jsx("hr", {}),
                      ],
                    }),
                    S.jsxs("section", {
                      className: le.playerSearchSection,
                      children: [
                        m && S.jsx(k0, { className: le.adminAuxBtns }),
                        S.jsxs("form", {
                          className: le.playerSearchForm,
                          onSubmit: Q,
                          children: [
                            S.jsx("p", {
                              children:
                                "Start by copying a player's entire ballchasing profile URL, the one shown in the image below:",
                            }),
                            S.jsx("img", {
                              src: "../../assets/player-profile-url.png",
                              alt: "Paste the URL copied from the address bar on a player's profile on ballchasing.com. The URL should follow this pattern: https://ballchasing.com/player/platform/id, where 'platform' can be 'steam', 'epic', 'psn', 'xbox', or 'switch', and 'id' will be a numeric or alphanumeric string, or otherwise may be the player's in-game name, depending on the platform.",
                            }),
                            m &&
                              S.jsxs("div", {
                                className: le.adminFormSection,
                                children: [
                                  S.jsx("div", {
                                    children: S.jsxs("label", {
                                      children: [
                                        "Fetch new replays (if unchecked, chached data will be used):",
                                        S.jsx("input", {
                                          type: "checkbox",
                                          checked: k,
                                          onChange: (O) => b(O.target.checked),
                                        }),
                                      ],
                                    }),
                                  }),
                                  S.jsxs("div", {
                                    children: [
                                      S.jsx("label", {
                                        children:
                                          "Select date to fetch older replays (admins only):",
                                      }),
                                      S.jsx("input", {
                                        type: "date",
                                        value: g
                                          ? g.toISOString().split("T")[0]
                                          : "",
                                        onChange: (O) =>
                                          x(new Date(O.target.value)),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            S.jsxs("div", {
                              className: le.playerInputFormSection,
                              children: [
                                S.jsxs("label", {
                                  htmlFor: "playerURL",
                                  children: [
                                    "Paste player's profile URL here:",
                                    S.jsx("input", {
                                      className: d
                                        ? `${le.playerProfileInput} bad-input`
                                        : `${le.playerProfileInput}`,
                                      type: "text",
                                      id: "playerURL",
                                      value: c,
                                      onChange: (O) => u(O.target.value),
                                      placeholder:
                                        "Enter player's ballchasing URL",
                                    }),
                                  ],
                                }),
                                d &&
                                  S.jsx("p", {
                                    className: "input-error",
                                    children: d,
                                  }),
                              ],
                            }),
                            S.jsxs("div", {
                              className: le.formBtnsContainer,
                              children: [
                                S.jsx("button", {
                                  type: "submit",
                                  children: "Get Replays",
                                }),
                                m &&
                                  S.jsx("button", {
                                    onClick: (O) => Q(O, !0),
                                    children: "Sync Replays",
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e
                  ? S.jsx("div", { className: "loading" })
                  : d
                  ? null
                  : S.jsx("div", {
                      children:
                        r &&
                        S.jsxs("div", {
                          className: le.statsSection,
                          children: [
                            S.jsx("div", {
                              className: le.leftCol,
                              children: S.jsx("section", {
                                children: S.jsxs("div", {
                                  className: le.playerStatsContainer,
                                  children: [
                                    S.jsx("div", {
                                      ref: w,
                                      className: le.sentinel,
                                    }),
                                    S.jsx("div", {
                                      id: "sticky",
                                      className: `${le.playlistFilterSection} ${
                                        y ? le.sticky : ""
                                      }`,
                                      children: S.jsx(W0, {}),
                                    }),
                                    S.jsx(G_, {}),
                                  ],
                                }),
                              }),
                            }),
                            r &&
                              S.jsx("div", {
                                className: le.rightCol,
                                children: S.jsx(H0, {}),
                              }),
                          ],
                        }),
                    }),
              ],
            }),
            S.jsx("footer", {
              children: S.jsxs("p", {
                children: [
                  "Source code available on",
                  " ",
                  S.jsx("a", {
                    href: "https://github.com/maybethee/stat-chasing-rails",
                    children: "Github",
                  }),
                ],
              }),
            }),
          ],
        })
  );
}
Cp(document.getElementById("root")).render(
  S.jsx(z.StrictMode, { children: S.jsx(w0, { children: S.jsx(cw, {}) }) })
);
