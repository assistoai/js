function e(e) {
  return Object.keys(e).reduce((t, n) => {
    const o = e[n];
    var i;
    return (
      (t[n] = Object.assign({}, o)),
      r(o.value) &&
        ((i = o.value),
        "[object Function]" !== Object.prototype.toString.call(i)) &&
        !Array.isArray(o.value) &&
        (t[n].value = Object.assign({}, o.value)),
      Array.isArray(o.value) && (t[n].value = o.value.slice(0)),
      t
    );
  }, {});
}
function t(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch (t) {
      return e;
    }
}
function n(e, t, n) {
  if (null == n || !1 === n) return e.removeAttribute(t);
  let r = JSON.stringify(n);
  (e.__updating[t] = !0),
    "true" === r && (r = ""),
    e.setAttribute(t, r),
    Promise.resolve().then(() => delete e.__updating[t]);
}
function r(e) {
  return null != e && ("object" == typeof e || "function" == typeof e);
}
let o;
function i(r, i) {
  const a = Object.keys(i);
  return class extends r {
    static get observedAttributes() {
      return a.map((e) => i[e].attribute);
    }
    constructor() {
      super(),
        (this.__initialized = !1),
        (this.__released = !1),
        (this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = {});
    }
    connectedCallback() {
      if (this.__initialized) return;
      (this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = (function (r, o) {
          const i = e(o);
          return (
            Object.keys(o).forEach((e) => {
              const o = i[e],
                a = r.getAttribute(o.attribute),
                s = r[e];
              a && (o.value = o.parse ? t(a) : a),
                null != s && (o.value = Array.isArray(s) ? s.slice(0) : s),
                o.reflect && n(r, o.attribute, o.value),
                Object.defineProperty(r, e, {
                  get: () => o.value,
                  set(t) {
                    const r = o.value;
                    (o.value = t), o.reflect && n(this, o.attribute, o.value);
                    for (
                      let n = 0, o = this.__propertyChangedCallbacks.length;
                      n < o;
                      n++
                    )
                      this.__propertyChangedCallbacks[n](e, t, r);
                  },
                  enumerable: !0,
                  configurable: !0,
                });
            }),
            i
          );
        })(this, i));
      const r = (function (e) {
          return Object.keys(e).reduce((t, n) => ((t[n] = e[n].value), t), {});
        })(this.props),
        a = this.Component,
        s = o;
      try {
        (o = this),
          (this.__initialized = !0),
          "function" == typeof (l = a) && 0 === l.toString().indexOf("class")
            ? new a(r, { element: this })
            : a(r, { element: this });
      } finally {
        o = s;
      }
      var l;
    }
    async disconnectedCallback() {
      if ((await Promise.resolve(), this.isConnected)) return;
      this.__propertyChangedCallbacks.length = 0;
      let e = null;
      for (; (e = this.__releaseCallbacks.pop()); ) e(this);
      delete this.__initialized, (this.__released = !0);
    }
    attributeChangedCallback(e, n, r) {
      if (
        this.__initialized &&
        !this.__updating[e] &&
        (e = this.lookupProp(e)) in i
      ) {
        if (null == r && !this[e]) return;
        this[e] = i[e].parse ? t(r) : r;
      }
    }
    lookupProp(e) {
      if (i) return a.find((t) => e === t || e === i[t].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({ mode: "open" });
    }
    addReleaseCallback(e) {
      this.__releaseCallbacks.push(e);
    }
    addPropertyChangedCallback(e) {
      this.__propertyChangedCallbacks.push(e);
    }
  };
}
function a(e, t = {}, n = {}) {
  const { BaseElement: o = HTMLElement, extension: a } = n;
  return (n) => {
    if (!e) throw new Error("tag is required to register a Component");
    let s = customElements.get(e);
    return s
      ? ((s.prototype.Component = n), s)
      : ((s = i(
          o,
          (function (e) {
            return e
              ? Object.keys(e).reduce((t, n) => {
                  const o = e[n];
                  return (
                    (t[n] = r(o) && "value" in o ? o : { value: o }),
                    t[n].attribute ||
                      (t[n].attribute = n
                        .replace(
                          /\.?([A-Z]+)/g,
                          (e, t) => "-" + t.toLowerCase()
                        )
                        .replace("_", "-")
                        .replace(/^-/, "")),
                    (t[n].parse =
                      "parse" in t[n]
                        ? t[n].parse
                        : "string" != typeof t[n].value),
                    t
                  );
                }, {})
              : {};
          })(t)
        )),
        (s.prototype.Component = n),
        (s.prototype.registeredTag = e),
        customElements.define(e, s, a),
        s);
  };
}
const s = { context: void 0, registry: void 0 },
  l = Symbol("solid-proxy"),
  c = Symbol("solid-track"),
  d = { equals: (e, t) => e === t };
let u = M;
const p = 1,
  h = 2,
  f = { owned: null, cleanups: null, context: null, owner: null };
var g = null;
let m = null,
  b = null,
  y = null,
  v = null,
  w = 0;
function x(e, t) {
  const n = b,
    r = g,
    o = 0 === e.length,
    i = o
      ? f
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: void 0 === t ? r : t,
        },
    a = o ? e : () => e(() => C(() => B(i)));
  (g = i), (b = null);
  try {
    return L(a, !0);
  } finally {
    (b = n), (g = r);
  }
}
function _(e, t) {
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: (t = t ? Object.assign({}, d, t) : d).equals || void 0,
  };
  return [
    A.bind(n),
    (e) => ("function" == typeof e && (e = e(n.value)), P(n, e)),
  ];
}
function k(e, t, n) {
  N(O(e, t, !1, p));
}
function T(e, t, n) {
  u = j;
  const r = O(e, t, !1, p);
  (n && n.render) || (r.user = !0), v ? v.push(r) : N(r);
}
function S(e, t, n) {
  n = n ? Object.assign({}, d, n) : d;
  const r = O(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    N(r),
    A.bind(r)
  );
}
function C(e) {
  if (null === b) return e();
  const t = b;
  b = null;
  try {
    return e();
  } finally {
    b = t;
  }
}
function E(e) {
  T(() => C(e));
}
function I(e) {
  return (
    null === g ||
      (null === g.cleanups ? (g.cleanups = [e]) : g.cleanups.push(e)),
    e
  );
}
function $(e) {
  const t = S(e),
    n = S(() => U(t()));
  return (
    (n.toArray = () => {
      const e = n();
      return Array.isArray(e) ? e : null != e ? [e] : [];
    }),
    n
  );
}
function A() {
  if (this.sources && this.state)
    if (this.state === p) N(this);
    else {
      const e = y;
      (y = null), L(() => z(this), !1), (y = e);
    }
  if (b) {
    const e = this.observers ? this.observers.length : 0;
    b.sources
      ? (b.sources.push(this), b.sourceSlots.push(e))
      : ((b.sources = [this]), (b.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(b),
          this.observerSlots.push(b.sources.length - 1))
        : ((this.observers = [b]),
          (this.observerSlots = [b.sources.length - 1]));
  }
  return this.value;
}
function P(e, t, n) {
  let r = e.value;
  return (
    (e.comparator && e.comparator(r, t)) ||
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        L(() => {
          for (let t = 0; t < e.observers.length; t += 1) {
            const n = e.observers[t],
              r = m && m.running;
            r && m.disposed.has(n),
              (r ? n.tState : n.state) ||
                (n.pure ? y.push(n) : v.push(n), n.observers && D(n)),
              r || (n.state = p);
          }
          if (y.length > 1e6) throw ((y = []), new Error());
        }, !1)),
    t
  );
}
function N(e) {
  if (!e.fn) return;
  B(e);
  const t = g,
    n = b,
    r = w;
  (b = g = e),
    (function (e, t, n) {
      let r;
      try {
        r = e.fn(t);
      } catch (t) {
        return (
          e.pure &&
            ((e.state = p), e.owned && e.owned.forEach(B), (e.owned = null)),
          (e.updatedAt = n + 1),
          Z(t)
        );
      }
      (!e.updatedAt || e.updatedAt <= n) &&
        (null != e.updatedAt && "observers" in e ? P(e, r) : (e.value = r),
        (e.updatedAt = n));
    })(e, e.value, r),
    (b = n),
    (g = t);
}
function O(e, t, n, r = p, o) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: g,
    context: null,
    pure: n,
  };
  return (
    null === g || (g !== f && (g.owned ? g.owned.push(i) : (g.owned = [i]))), i
  );
}
function R(e) {
  if (0 === e.state) return;
  if (e.state === h) return z(e);
  if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < w); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if ((e = t[n]).state === p) N(e);
    else if (e.state === h) {
      const n = y;
      (y = null), L(() => z(e, t[0]), !1), (y = n);
    }
}
function L(e, t) {
  if (y) return e();
  let n = !1;
  t || (y = []), v ? (n = !0) : (v = []), w++;
  try {
    const t = e();
    return (
      (function (e) {
        y && (M(y), (y = null));
        if (e) return;
        const t = v;
        (v = null), t.length && L(() => u(t), !1);
      })(n),
      t
    );
  } catch (e) {
    n || (v = null), (y = null), Z(e);
  }
}
function M(e) {
  for (let t = 0; t < e.length; t++) R(e[t]);
}
function j(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : R(r);
  }
  for (t = 0; t < n; t++) R(e[t]);
}
function z(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const e = r.state;
      e === p
        ? r !== t && (!r.updatedAt || r.updatedAt < w) && R(r)
        : e === h && z(r, t);
    }
  }
}
function D(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = h), n.pure ? y.push(n) : v.push(n), n.observers && D(n));
  }
}
function B(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(),
        n = e.sourceSlots.pop(),
        r = t.observers;
      if (r && r.length) {
        const e = r.pop(),
          o = t.observerSlots.pop();
        n < r.length &&
          ((e.sourceSlots[o] = n), (r[n] = e), (t.observerSlots[n] = o));
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) B(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  (e.state = 0), (e.context = null);
}
function Z(e, t = g) {
  const n = (function (e) {
    return e instanceof Error
      ? e
      : new Error("string" == typeof e ? e : "Unknown error", { cause: e });
  })(e);
  throw n;
}
function U(e) {
  if ("function" == typeof e && !e.length) return U(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = U(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
const F = Symbol("fallback");
function H(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function V(e, t) {
  return C(() => e(t || {}));
}
function G() {
  return !0;
}
const q = {
  get: (e, t, n) => (t === l ? n : e.get(t)),
  has: (e, t) => t === l || e.has(t),
  set: G,
  deleteProperty: G,
  getOwnPropertyDescriptor: (e, t) => ({
    configurable: !0,
    enumerable: !0,
    get: () => e.get(t),
    set: G,
    deleteProperty: G,
  }),
  ownKeys: (e) => e.keys(),
};
function W(e) {
  return (e = "function" == typeof e ? e() : e) ? e : {};
}
function K() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const t = this[e]();
    if (void 0 !== t) return t;
  }
}
function Y(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    (t = t || (!!r && l in r)),
      (e[n] = "function" == typeof r ? ((t = !0), S(r)) : r);
  }
  if (t)
    return new Proxy(
      {
        get(t) {
          for (let n = e.length - 1; n >= 0; n--) {
            const r = W(e[n])[t];
            if (void 0 !== r) return r;
          }
        },
        has(t) {
          for (let n = e.length - 1; n >= 0; n--) if (t in W(e[n])) return !0;
          return !1;
        },
        keys() {
          const t = [];
          for (let n = 0; n < e.length; n++) t.push(...Object.keys(W(e[n])));
          return [...new Set(t)];
        },
      },
      q
    );
  const n = {},
    r = {},
    o = new Set();
  for (let t = e.length - 1; t >= 0; t--) {
    const i = e[t];
    if (!i) continue;
    const a = Object.getOwnPropertyNames(i);
    for (let e = 0, t = a.length; e < t; e++) {
      const t = a[e];
      if ("__proto__" === t || "constructor" === t) continue;
      const s = Object.getOwnPropertyDescriptor(i, t);
      if (o.has(t)) {
        const e = r[t];
        e
          ? s.get
            ? e.push(s.get.bind(i))
            : void 0 !== s.value && e.push(() => s.value)
          : void 0 === n[t] && (n[t] = s.value);
      } else
        s.get
          ? (o.add(t),
            Object.defineProperty(n, t, {
              enumerable: !0,
              configurable: !0,
              get: K.bind((r[t] = [s.get.bind(i)])),
            }))
          : (void 0 !== s.value && o.add(t), (n[t] = s.value));
    }
  }
  return n;
}
function X(e, ...t) {
  if (l in e) {
    const n = new Set(t.length > 1 ? t.flat() : t[0]),
      r = t.map(
        (t) =>
          new Proxy(
            {
              get: (n) => (t.includes(n) ? e[n] : void 0),
              has: (n) => t.includes(n) && n in e,
              keys: () => t.filter((t) => t in e),
            },
            q
          )
      );
    return (
      r.push(
        new Proxy(
          {
            get: (t) => (n.has(t) ? void 0 : e[t]),
            has: (t) => !n.has(t) && t in e,
            keys: () => Object.keys(e).filter((e) => !n.has(e)),
          },
          q
        )
      ),
      r
    );
  }
  const n = {},
    r = t.map(() => ({}));
  for (const o of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, o),
      a = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let s = !1,
      l = 0;
    for (const e of t)
      e.includes(o) &&
        ((s = !0), a ? (r[l][o] = i.value) : Object.defineProperty(r[l], o, i)),
        ++l;
    s || (a ? (n[o] = i.value) : Object.defineProperty(n, o, i));
  }
  return [...r, n];
}
let J = 0;
const Q = (e) => `Stale read from <${e}>.`;
function ee(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return S(
    (function (e, t, n = {}) {
      let r = [],
        o = [],
        i = [],
        a = 0,
        s = t.length > 1 ? [] : null;
      return (
        I(() => H(i)),
        () => {
          let l,
            d,
            u = e() || [];
          return (
            u[c],
            C(() => {
              let e,
                t,
                c,
                h,
                f,
                g,
                m,
                b,
                y,
                v = u.length;
              if (0 === v)
                0 !== a &&
                  (H(i), (i = []), (r = []), (o = []), (a = 0), s && (s = [])),
                  n.fallback &&
                    ((r = [F]),
                    (o[0] = x((e) => ((i[0] = e), n.fallback()))),
                    (a = 1));
              else if (0 === a) {
                for (o = new Array(v), d = 0; d < v; d++)
                  (r[d] = u[d]), (o[d] = x(p));
                a = v;
              } else {
                for (
                  c = new Array(v),
                    h = new Array(v),
                    s && (f = new Array(v)),
                    g = 0,
                    m = Math.min(a, v);
                  g < m && r[g] === u[g];
                  g++
                );
                for (
                  m = a - 1, b = v - 1;
                  m >= g && b >= g && r[m] === u[b];
                  m--, b--
                )
                  (c[b] = o[m]), (h[b] = i[m]), s && (f[b] = s[m]);
                for (e = new Map(), t = new Array(b + 1), d = b; d >= g; d--)
                  (y = u[d]),
                    (l = e.get(y)),
                    (t[d] = void 0 === l ? -1 : l),
                    e.set(y, d);
                for (l = g; l <= m; l++)
                  (y = r[l]),
                    (d = e.get(y)),
                    void 0 !== d && -1 !== d
                      ? ((c[d] = o[l]),
                        (h[d] = i[l]),
                        s && (f[d] = s[l]),
                        (d = t[d]),
                        e.set(y, d))
                      : i[l]();
                for (d = g; d < v; d++)
                  d in c
                    ? ((o[d] = c[d]),
                      (i[d] = h[d]),
                      s && ((s[d] = f[d]), s[d](d)))
                    : (o[d] = x(p));
                (o = o.slice(0, (a = v))), (r = u.slice(0));
              }
              return o;
            })
          );
          function p(e) {
            if (((i[d] = e), s)) {
              const [e, n] = _(d);
              return (s[d] = n), t(u[d], e);
            }
            return t(u[d]);
          }
        }
      );
    })(() => e.each, e.children, t || void 0)
  );
}
function te(e) {
  const t = e.keyed,
    n = S(() => e.when, void 0, { equals: (e, n) => (t ? e === n : !e == !n) });
  return S(
    () => {
      const r = n();
      if (r) {
        const o = e.children;
        return "function" == typeof o && o.length > 0
          ? C(() =>
              o(
                t
                  ? r
                  : () => {
                      if (!C(n)) throw Q("Show");
                      return e.when;
                    }
              )
            )
          : o;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function ne(e) {
  let t = !1;
  const n = $(() => e.children),
    r = S(
      () => {
        let e = n();
        Array.isArray(e) || (e = [e]);
        for (let n = 0; n < e.length; n++) {
          const r = e[n].when;
          if (r) return (t = !!e[n].keyed), [n, r, e[n]];
        }
        return [-1];
      },
      void 0,
      {
        equals: (e, n) =>
          e[0] === n[0] &&
          (t ? e[1] === n[1] : !e[1] == !n[1]) &&
          e[2] === n[2],
      }
    );
  return S(
    () => {
      const [n, o, i] = r();
      if (n < 0) return e.fallback;
      const a = i.children;
      return "function" == typeof a && a.length > 0
        ? C(() =>
            a(
              t
                ? o
                : () => {
                    if (C(r)[0] !== n) throw Q("Match");
                    return i.when;
                  }
            )
          )
        : a;
    },
    void 0,
    void 0
  );
}
function re(e) {
  return e;
}
const oe = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ]),
  ie = new Set(["innerHTML", "textContent", "innerText", "children"]),
  ae = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  se = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
const le = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  ce = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
const de = "_$DX_DELEGATE";
function ue(e, t, n) {
  let r;
  const o = () => {
      const t = document.createElement("template");
      return (
        (t.innerHTML = e),
        n ? t.content.firstChild.firstChild : t.content.firstChild
      );
    },
    i = t
      ? () => C(() => document.importNode(r || (r = o()), !0))
      : () => (r || (r = o())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function pe(e, t = window.document) {
  const n = t[de] || (t[de] = new Set());
  for (let r = 0, o = e.length; r < o; r++) {
    const o = e[r];
    n.has(o) || (n.add(o), t.addEventListener(o, we));
  }
}
function he(e, t, n) {
  null == n ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function fe(e, t) {
  null == t ? e.removeAttribute("class") : (e.className = t);
}
function ge(e, t = {}, n, r) {
  const o = {};
  return (
    r || k(() => (o.children = xe(e, t.children, o.children))),
    k(() => t.ref && t.ref(e)),
    k(() =>
      (function (e, t, n, r, o = {}, i = !1) {
        t || (t = {});
        for (const r in o)
          if (!(r in t)) {
            if ("children" === r) continue;
            o[r] = ve(e, r, null, o[r], n, i);
          }
        for (const a in t) {
          if ("children" === a) {
            r || xe(e, t.children);
            continue;
          }
          const s = t[a];
          o[a] = ve(e, a, s, o[a], n, i);
        }
      })(e, t, n, !0, o, !0)
    ),
    o
  );
}
function me(e, t, n) {
  return C(() => e(t, n));
}
function be(e, t, n, r) {
  if ((void 0 === n || r || (r = []), "function" != typeof t))
    return xe(e, t, r, n);
  k((r) => xe(e, t(), r, n), r);
}
function ye(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let t = 0, o = r.length; t < o; t++) e.classList.toggle(r[t], n);
}
function ve(e, t, n, r, o, i) {
  let a, s, l, c, d;
  if ("style" === t)
    return (function (e, t, n) {
      if (!t) return n ? he(e, "style") : t;
      const r = e.style;
      if ("string" == typeof t) return (r.cssText = t);
      let o, i;
      for (i in ("string" == typeof n && (r.cssText = n = void 0),
      n || (n = {}),
      t || (t = {}),
      n))
        null == t[i] && r.removeProperty(i), delete n[i];
      for (i in t) (o = t[i]), o !== n[i] && (r.setProperty(i, o), (n[i] = o));
      return n;
    })(e, n, r);
  if ("classList" === t)
    return (function (e, t, n = {}) {
      const r = Object.keys(t || {}),
        o = Object.keys(n);
      let i, a;
      for (i = 0, a = o.length; i < a; i++) {
        const r = o[i];
        r && "undefined" !== r && !t[r] && (ye(e, r, !1), delete n[r]);
      }
      for (i = 0, a = r.length; i < a; i++) {
        const o = r[i],
          a = !!t[o];
        o && "undefined" !== o && n[o] !== a && a && (ye(e, o, !0), (n[o] = a));
      }
      return n;
    })(e, n, r);
  if (n === r) return r;
  if ("ref" === t) i || n(e);
  else if ("on:" === t.slice(0, 3)) {
    const o = t.slice(3);
    r && e.removeEventListener(o, r), n && e.addEventListener(o, n);
  } else if ("oncapture:" === t.slice(0, 10)) {
    const o = t.slice(10);
    r && e.removeEventListener(o, r, !0), n && e.addEventListener(o, n, !0);
  } else if ("on" === t.slice(0, 2)) {
    const o = t.slice(2).toLowerCase(),
      i = le.has(o);
    if (!i && r) {
      const t = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(o, t);
    }
    (i || n) &&
      (!(function (e, t, n, r) {
        if (r)
          Array.isArray(n)
            ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
            : (e[`$$${t}`] = n);
        else if (Array.isArray(n)) {
          const r = n[0];
          e.addEventListener(t, (n[0] = (t) => r.call(e, n[1], t)));
        } else e.addEventListener(t, n);
      })(e, o, n, i),
      i && pe([o]));
  } else if ("attr:" === t.slice(0, 5)) he(e, t.slice(5), n);
  else if (
    (d = "prop:" === t.slice(0, 5)) ||
    (l = ie.has(t)) ||
    (!o &&
      ((c = (function (e, t) {
        const n = se[e];
        return "object" == typeof n ? (n[t] ? n.$ : void 0) : n;
      })(t, e.tagName)) ||
        (s = oe.has(t)))) ||
    (a = e.nodeName.includes("-"))
  )
    d && ((t = t.slice(5)), (s = !0)),
      "class" === t || "className" === t
        ? fe(e, n)
        : !a || s || l
        ? (e[c || t] = n)
        : (e[
            ((u = t),
            u.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase()))
          ] = n);
  else {
    const r = o && t.indexOf(":") > -1 && ce[t.split(":")[0]];
    r
      ? (function (e, t, n, r) {
          null == r ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
        })(e, r, t, n)
      : he(e, ae[t] || t, n);
  }
  var u;
  return n;
}
function we(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get: () => n || document,
      });
    n;

  ) {
    const r = n[t];
    if (r && !n.disabled) {
      const o = n[`${t}Data`];
      if ((void 0 !== o ? r.call(n, o, e) : r.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function xe(e, t, n, r, o) {
  for (; "function" == typeof n; ) n = n();
  if (t === n) return n;
  const i = typeof t,
    a = void 0 !== r;
  if (
    ((e = (a && n[0] && n[0].parentNode) || e),
    "string" === i || "number" === i)
  )
    if (("number" === i && (t = t.toString()), a)) {
      let o = n[0];
      o && 3 === o.nodeType ? (o.data = t) : (o = document.createTextNode(t)),
        (n = Te(e, n, r, o));
    } else
      n =
        "" !== n && "string" == typeof n
          ? (e.firstChild.data = t)
          : (e.textContent = t);
  else if (null == t || "boolean" === i) n = Te(e, n, r);
  else {
    if ("function" === i)
      return (
        k(() => {
          let o = t();
          for (; "function" == typeof o; ) o = o();
          n = xe(e, o, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const i = [],
        s = n && Array.isArray(n);
      if (_e(i, t, n, o)) return k(() => (n = xe(e, i, n, r, !0))), () => n;
      if (0 === i.length) {
        if (((n = Te(e, n, r)), a)) return n;
      } else
        s
          ? 0 === n.length
            ? ke(e, i, r)
            : (function (e, t, n) {
                let r = n.length,
                  o = t.length,
                  i = r,
                  a = 0,
                  s = 0,
                  l = t[o - 1].nextSibling,
                  c = null;
                for (; a < o || s < i; )
                  if (t[a] !== n[s]) {
                    for (; t[o - 1] === n[i - 1]; ) o--, i--;
                    if (o === a) {
                      const t =
                        i < r ? (s ? n[s - 1].nextSibling : n[i - s]) : l;
                      for (; s < i; ) e.insertBefore(n[s++], t);
                    } else if (i === s)
                      for (; a < o; ) (c && c.has(t[a])) || t[a].remove(), a++;
                    else if (t[a] === n[i - 1] && n[s] === t[o - 1]) {
                      const r = t[--o].nextSibling;
                      e.insertBefore(n[s++], t[a++].nextSibling),
                        e.insertBefore(n[--i], r),
                        (t[o] = n[i]);
                    } else {
                      if (!c) {
                        c = new Map();
                        let e = s;
                        for (; e < i; ) c.set(n[e], e++);
                      }
                      const r = c.get(t[a]);
                      if (null != r)
                        if (s < r && r < i) {
                          let l,
                            d = a,
                            u = 1;
                          for (
                            ;
                            ++d < o &&
                            d < i &&
                            null != (l = c.get(t[d])) &&
                            l === r + u;

                          )
                            u++;
                          if (u > r - s) {
                            const o = t[a];
                            for (; s < r; ) e.insertBefore(n[s++], o);
                          } else e.replaceChild(n[s++], t[a++]);
                        } else a++;
                      else t[a++].remove();
                    }
                  } else a++, s++;
              })(e, n, i)
          : (n && Te(e), ke(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (a) return (n = Te(e, n, r, t));
        Te(e, n, null, t);
      } else
        null != n && "" !== n && e.firstChild
          ? e.replaceChild(t, e.firstChild)
          : e.appendChild(t);
      n = t;
    } else console.warn("Unrecognized value. Skipped inserting", t);
  }
  return n;
}
function _e(e, t, n, r) {
  let o = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let a,
      s = t[i],
      l = n && n[i];
    if (null == s || !0 === s || !1 === s);
    else if ("object" == (a = typeof s) && s.nodeType) e.push(s);
    else if (Array.isArray(s)) o = _e(e, s, l) || o;
    else if ("function" === a)
      if (r) {
        for (; "function" == typeof s; ) s = s();
        o = _e(e, Array.isArray(s) ? s : [s], Array.isArray(l) ? l : [l]) || o;
      } else e.push(s), (o = !0);
    else {
      const t = String(s);
      l && 3 === l.nodeType && l.data === t
        ? e.push(l)
        : e.push(document.createTextNode(t));
    }
  }
  return o;
}
function ke(e, t, n = null) {
  for (let r = 0, o = t.length; r < o; r++) e.insertBefore(t[r], n);
}
function Te(e, t, n, r) {
  if (void 0 === n) return (e.textContent = "");
  const o = r || document.createTextNode("");
  if (t.length) {
    let r = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const a = t[i];
      if (o !== a) {
        const t = a.parentNode === e;
        r || i
          ? t && a.remove()
          : t
          ? e.replaceChild(o, a)
          : e.insertBefore(o, n);
      } else r = !0;
    }
  } else e.insertBefore(o, n);
  return [o];
}
function Se(e) {
  return (t, n) => {
    const { element: r } = n;
    return x(
      (o) => {
        const i = (function (e) {
          const t = Object.keys(e),
            n = {};
          for (let r = 0; r < t.length; r++) {
            const [o, i] = _(e[t[r]]);
            Object.defineProperty(n, t[r], {
              get: o,
              set(e) {
                i(() => e);
              },
            });
          }
          return n;
        })(t);
        r.addPropertyChangedCallback((e, t) => (i[e] = t)),
          r.addReleaseCallback(() => {
            (r.renderRoot.textContent = ""), o();
          });
        const a = e(i, n);
        return be(r.renderRoot, a);
      },
      (function (e) {
        if (e.assignedSlot && e.assignedSlot._$owner)
          return e.assignedSlot._$owner;
        let t = e.parentNode;
        for (
          ;
          t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner);

        )
          t = t.parentNode;
        return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
      })(r)
    );
  };
}
function Ce(e, t, n) {
  return 2 === arguments.length && ((n = t), (t = {})), a(e, t)(Se(n));
}
const Ee = {
    typebot: void 0,
    onNewInputBlock: void 0,
    onAnswer: void 0,
    onEnd: void 0,
    onInit: void 0,
    onNewLogs: void 0,
    isPreview: void 0,
    startGroupId: void 0,
    prefilledVariables: void 0,
    apiHost: void 0,
    resultId: void 0,
  },
  Ie = {
    ...Ee,
    onClose: void 0,
    onOpen: void 0,
    theme: void 0,
    autoShowDelay: void 0,
    isOpen: void 0,
    defaultOpen: void 0,
  },
  $e = {
    ...Ee,
    onClose: void 0,
    onOpen: void 0,
    theme: void 0,
    previewMessage: void 0,
    onPreviewMessageClick: void 0,
    autoShowDelay: void 0,
  };
var Ae =
  '/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-right-1{right:-4px}.-right-2{right:-8px}.-top-2{top:-8px}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.bottom-5{bottom:20px}.left-0{left:0}.left-5{left:20px}.right-0{right:0}.right-5{right:20px}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.m-2{margin:8px}.m-auto{margin:auto}.mx-4{margin-left:16px;margin-right:16px}.my-2{margin-bottom:8px;margin-top:8px}.-mr-1{margin-right:-4px}.-mt-1{margin-top:-4px}.mb-3{margin-bottom:12px}.ml-2{margin-left:8px}.mt-1{margin-top:4px}.mt-4{margin-top:16px}.\\!block{display:block!important}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-2\\.5{height:10px}.h-3{height:12px}.h-32{height:128px}.h-4{height:16px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-8{height:32px}.h-9{height:36px}.h-\\[80vh\\]{height:80vh}.h-\\[90\\%\\]{height:90%}.h-full{height:100%}.max-h-80{max-height:320px}.max-h-\\[464px\\]{max-height:464px}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-3{width:12px}.w-4{width:16px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-8{width:32px}.w-9{width:36px}.w-\\[90\\%\\]{width:90%}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\\[256px\\]{max-width:256px}.max-w-full{max-width:100%}.max-w-lg{max-width:512px}.max-w-xs{max-width:320px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.gap-6{gap:24px}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.text-ellipsis{text-overflow:ellipsis}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.rounded-md{border-radius:6px}.border{border-width:1px}.border-2{border-width:2px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:4px}.p-4{padding:16px}.px-1{padding-left:4px;padding-right:4px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-8{padding-left:32px;padding-right:32px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.py-6{padding-bottom:24px;padding-top:24px}.pb-0{padding-bottom:0}.pl-2{padding-left:8px}.pl-4{padding-left:16px}.pr-1{padding-right:4px}.pr-2{padding-right:8px}.pr-4{padding-right:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:24px;line-height:32px}.text-4xl{font-size:36px;line-height:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.brightness-150{--tw-brightness:brightness(1.5)}.brightness-150,.brightness-200{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.brightness-200{--tw-brightness:brightness(2)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--typebot-container-bg-image:none;--typebot-container-bg-color:transparent;--typebot-container-font-family:"Open Sans";--typebot-container-color:#303235;--typebot-button-bg-color:#0042da;--typebot-button-bg-color-rgb:0,66,218;--typebot-button-color:#fff;--typebot-checkbox-bg-color:#fff;--typebot-host-bubble-bg-color:#f7f8ff;--typebot-host-bubble-color:#303235;--typebot-guest-bubble-bg-color:#ff8e21;--typebot-guest-bubble-color:#fff;--typebot-input-bg-color:#fff;--typebot-input-color:#303235;--typebot-input-placeholder-color:#9095a0;--typebot-header-bg-color:#fff;--typebot-header-color:#303235;--selectable-base-alpha:0;--typebot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--typebot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(2.5)}50%{transform:translateY(-2.5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}a{text-decoration:underline}ol,ul{margin-inline-end:0;margin-inline-start:0;padding-inline-start:40px}ol{list-style-type:decimal}ul{list-style-type:disc}li:not(:last-child){margin-bottom:8px}pre{word-wrap:break-word;max-height:100%;max-width:100%;overflow:auto;overflow-wrap:break-word;white-space:pre-wrap}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.typebot-container{background-color:var(--typebot-container-bg-color);background-image:var(--typebot-container-bg-image);font-family:var(--typebot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.typebot-button{background-color:var(--typebot-button-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease}.typebot-button.selectable{background-color:var(--typebot-host-bubble-bg-color);border:1px solid var(--typebot-button-bg-color);color:var(--typebot-host-bubble-color)}.typebot-selectable{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease}.typebot-selectable:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}.typebot-checkbox{background-color:var(--typebot-checkbox-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);border-radius:2px;color:var(--typebot-button-color);padding:1px;transition:all .3s ease}.typebot-checkbox.checked{background-color:var(--typebot-button-bg-color)}.typebot-host-bubble{color:var(--typebot-host-bubble-color)}.typebot-host-bubble>.bubble-typing{background-color:var(--typebot-host-bubble-bg-color);border:var(--typebot-host-bubble-border);border-radius:6px}.typebot-host-bubble iframe,.typebot-host-bubble img,.typebot-host-bubble video{border-radius:var(--typebot-border-radius)}.typebot-guest-bubble{background-color:var(--typebot-guest-bubble-bg-color);border-radius:6px;color:var(--typebot-guest-bubble-color)}.typebot-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.typebot-input,.typebot-input-error-message{color:var(--typebot-input-color)}.typebot-button>.send-icon{fill:var(--typebot-button-color)}.typebot-chat-view{max-width:800px}.ping span{background-color:var(--typebot-button-bg-color)}.rating-icon-container svg{stroke:var(--typebot-button-bg-color);fill:var(--typebot-host-bubble-bg-color);height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:var(--typebot-button-bg-color)}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{border-radius:var(--typebot-border-radius)}.total-files-indicator,.upload-progress-bar{background-color:var(--typebot-button-bg-color)}.total-files-indicator{color:var(--typebot-button-color);font-size:10px}.typebot-upload-input{border-radius:var(--typebot-border-radius);transition:border-color .1s ease-out}.typebot-upload-input.dragging-over{border-color:var(--typebot-button-bg-color)}.secondary-button{background-color:var(--typebot-host-bubble-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-host-bubble-color)}.typebot-country-select{color:var(--typebot-input-color)}.typebot-country-select,.typebot-date-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius)}.typebot-date-input{color:var(--typebot-input-color);color-scheme:light}.typebot-popup-blocked-toast{border-radius:var(--typebot-border-radius)}.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.typebot-picture-button{background-color:var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease;width:236px}.typebot-picture-button>img,.typebot-selectable-picture>img{border-radius:var(--typebot-border-radius) var(--typebot-border-radius) 0 0;height:100%;max-height:200px;min-width:200px;-o-object-fit:cover;object-fit:cover;width:100%}.typebot-picture-button.has-svg>img,.typebot-selectable-picture.has-svg>img{max-height:128px;-o-object-fit:contain;object-fit:contain;padding:1rem}.typebot-selectable-picture{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease;width:236px}.typebot-selectable-picture:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable-picture.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}select option{background-color:var(--typebot-input-bg-color);color:var(--typebot-input-color)}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9)}.hover\\:brightness-90:hover,.hover\\:brightness-95:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:brightness-95:hover{--tw-brightness:brightness(.95)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75)}.active\\:brightness-75:active,.active\\:brightness-90:active{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:left-5{left:20px}.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}';
let Pe = (function (e) {
    return (
      (e.TEXT = "text input"),
      (e.NUMBER = "number input"),
      (e.EMAIL = "email input"),
      (e.URL = "url input"),
      (e.DATE = "date input"),
      (e.PHONE = "phone number input"),
      (e.CHOICE = "choice input"),
      (e.PICTURE_CHOICE = "picture choice input"),
      (e.PAYMENT = "payment input"),
      (e.RATING = "rating input"),
      (e.FILE = "file input"),
      e
    );
  })({}),
  Ne = (function (e) {
    return (
      (e.TEXT = "text"),
      (e.IMAGE = "image"),
      (e.VIDEO = "video"),
      (e.EMBED = "embed"),
      (e.AUDIO = "audio"),
      e
    );
  })({}),
  Oe = (function (e) {
    return (
      (e.SET_VARIABLE = "Set variable"),
      (e.CONDITION = "Condition"),
      (e.REDIRECT = "Redirect"),
      (e.SCRIPT = "Code"),
      (e.TYPEBOT_LINK = "Typebot link"),
      (e.WAIT = "Wait"),
      (e.JUMP = "Jump"),
      (e.AB_TEST = "AB test"),
      e
    );
  })({});
const Re = async (e) => {
    try {
      const t = "string" == typeof e ? e : e.url,
        n = await fetch(t, {
          method: "string" == typeof e ? "GET" : e.method,
          mode: "cors",
          headers:
            "string" != typeof e && Le(e.body)
              ? { "Content-Type": "application/json" }
              : void 0,
          body:
            "string" != typeof e && Le(e.body)
              ? JSON.stringify(e.body)
              : void 0,
        }),
        r = await n.json();
      if (!n.ok) throw "error" in r ? r.error : r;
      return { data: r };
    } catch (e) {
      return console.error(e), { error: e };
    }
  },
  Le = (e) => null != e,
  Me = (e) => null == e,
  je = (e) => null == e || "" === e,
  ze = (e) => null != e && "" !== e,
  De = (e) => e?.startsWith("data:image/svg") || e?.endsWith(".svg"),
  Be = (e) => {
    e = e.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (e, t, n, r) => t + t + n + n + r + r
    );
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t
      ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
      : [0, 0, 0];
  },
  Ze = (e) => (([e, t, n]) => (299 * e + 587 * t + 114 * n) / 1e3 > 155)(Be(e));
function Ue(e) {
  var t,
    n,
    r = "";
  if ("string" == typeof e || "number" == typeof e) r += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Ue(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function Fe() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Ue(e)) && (r && (r += " "), (r += t));
  return r;
}
const He = ue(
    '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'
  ),
  Ve = ue('<img part="button-icon" alt="Bubble button icon">'),
  Ge = ue("<span>"),
  qe = ue(
    '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'
  ),
  We = ue('<img part="button-icon" alt="Bubble button close icon">'),
  Ke = ue('<button part="button" aria-label="Open chatbot">'),
  Ye = "#0042DA",
  Xe = "#27272A",
  Je = "#fff",
  Qe = (e) => e.startsWith("http") || e.startsWith("data:image/svg+xml"),
  et = (e) =>
    (() => {
      const t = Ke();
      return (
        (t.$$click = () => e.toggleBot()),
        t.style.setProperty("z-index", "42424242"),
        be(
          t,
          V(te, {
            get when() {
              return Me(e.customIconSrc);
            },
            keyed: !0,
            get children() {
              const t = He();
              return (
                k(
                  (n) => {
                    const r =
                        e.iconColor ?? (Ze(e.backgroundColor ?? Ye) ? Xe : Je),
                      o = Fe(
                        "stroke-2 fill-transparent absolute duration-200 transition",
                        e.isBotOpened
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100",
                        "large" === e.size ? "w-9" : "w-7"
                      );
                    return (
                      r !== n._v$ &&
                        (null != (n._v$ = r)
                          ? t.style.setProperty("stroke", r)
                          : t.style.removeProperty("stroke")),
                      o !== n._v$2 && he(t, "class", (n._v$2 = o)),
                      n
                    );
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          t,
          V(te, {
            get when() {
              return S(() => !!e.customIconSrc)() && Qe(e.customIconSrc);
            },
            get children() {
              const t = Ve();
              return (
                k(
                  (n) => {
                    const r = e.customIconSrc,
                      o = Fe(
                        "duration-200 transition",
                        e.isBotOpened
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100",
                        De(e.customIconSrc)
                          ? "large" === e.size
                            ? "w-9 h-9"
                            : "w-7 h-7"
                          : "w-[90%] h-[90%]",
                        De(e.customIconSrc) ? "" : "object-cover rounded-full"
                      );
                    return (
                      r !== n._v$3 && he(t, "src", (n._v$3 = r)),
                      o !== n._v$4 && fe(t, (n._v$4 = o)),
                      n
                    );
                  },
                  { _v$3: void 0, _v$4: void 0 }
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          t,
          V(te, {
            get when() {
              return S(() => !!e.customIconSrc)() && !Qe(e.customIconSrc);
            },
            get children() {
              const t = Ge();
              return (
                t.style.setProperty(
                  "font-family",
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                ),
                be(t, () => e.customIconSrc),
                k(() =>
                  fe(
                    t,
                    Fe(
                      "text-4xl duration-200 transition",
                      e.isBotOpened
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-100"
                    )
                  )
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          t,
          V(te, {
            get when() {
              return Me(e.customCloseIconSrc);
            },
            get children() {
              const t = qe();
              return (
                k(
                  (n) => {
                    const r =
                        e.iconColor ?? (Ze(e.backgroundColor ?? Ye) ? Xe : Je),
                      o = Fe(
                        "absolute duration-200 transition",
                        e.isBotOpened
                          ? "scale-100 rotate-0 opacity-100"
                          : "scale-0 -rotate-180 opacity-0",
                        "large" === e.size ? " w-9" : " w-7"
                      );
                    return (
                      r !== n._v$5 &&
                        (null != (n._v$5 = r)
                          ? t.style.setProperty("fill", r)
                          : t.style.removeProperty("fill")),
                      o !== n._v$6 && he(t, "class", (n._v$6 = o)),
                      n
                    );
                  },
                  { _v$5: void 0, _v$6: void 0 }
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          t,
          V(te, {
            get when() {
              return (
                S(() => !!e.customCloseIconSrc)() && Qe(e.customCloseIconSrc)
              );
            },
            get children() {
              const t = We();
              return (
                k(
                  (n) => {
                    const r = e.customCloseIconSrc,
                      o = Fe(
                        "absolute duration-200 transition",
                        e.isBotOpened
                          ? "scale-100 rotate-0 opacity-100"
                          : "scale-0 -rotate-180 opacity-0",
                        De(e.customCloseIconSrc)
                          ? "large" === e.size
                            ? "w-9 h-9"
                            : "w-7 h-7"
                          : "w-[90%] h-[90%]",
                        De(e.customCloseIconSrc)
                          ? ""
                          : "object-cover rounded-full"
                      );
                    return (
                      r !== n._v$7 && he(t, "src", (n._v$7 = r)),
                      o !== n._v$8 && fe(t, (n._v$8 = o)),
                      n
                    );
                  },
                  { _v$7: void 0, _v$8: void 0 }
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          t,
          V(te, {
            get when() {
              return (
                S(() => !!e.customCloseIconSrc)() && !Qe(e.customCloseIconSrc)
              );
            },
            get children() {
              const t = Ge();
              return (
                t.style.setProperty(
                  "font-family",
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                ),
                be(t, () => e.customCloseIconSrc),
                k(() =>
                  fe(
                    t,
                    Fe(
                      "absolute text-4xl duration-200 transition",
                      e.isBotOpened
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-180 opacity-0"
                    )
                  )
                ),
                t
              );
            },
          }),
          null
        ),
        k(
          (n) => {
            const r = Fe(
                "fixed bottom-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in",
                "large" === e.size ? " w-16 h-16" : " w-12 h-12",
                "left" === e.placement ? " left-5" : " right-5"
              ),
              o = e.backgroundColor ?? Ye;
            return (
              r !== n._v$9 && fe(t, (n._v$9 = r)),
              o !== n._v$10 &&
                (null != (n._v$10 = o)
                  ? t.style.setProperty("background-color", o)
                  : t.style.removeProperty("background-color")),
              n
            );
          },
          { _v$9: void 0, _v$10: void 0 }
        ),
        t
      );
    })();
pe(["click"]);
const tt = ue('<div part="preview-message"><p>'),
  nt = ue(
    '<img class="rounded-full w-8 h-8 object-cover" alt="Bot avatar" elementtiming="Bot avatar" fetchpriority="high">'
  ),
  rt = ue(
    '<button part="preview-message-close-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'
  ),
  ot = "#F7F8FF",
  it = "#303235",
  at = (e) => {
    const [t, n] = _(!1);
    return (() => {
      const r = tt(),
        o = r.firstChild;
      return (
        r.addEventListener("mouseleave", () => n(!1)),
        r.addEventListener("mouseenter", () => n(!0)),
        (r.$$click = () => e.onClick()),
        r.style.setProperty("z-index", "42424242"),
        be(
          r,
          V(st, {
            get isHovered() {
              return t();
            },
            get previewMessageTheme() {
              return e.previewMessageTheme;
            },
            get onClick() {
              return e.onCloseClick;
            },
          }),
          o
        ),
        be(
          r,
          V(te, {
            get when() {
              return e.avatarUrl;
            },
            keyed: !0,
            children: (e) =>
              (() => {
                const t = nt();
                return he(t, "src", e), t;
              })(),
          }),
          o
        ),
        be(o, () => e.message),
        k(
          (t) => {
            const n =
                "fixed max-w-[256px] rounded-md duration-200 flex items-center gap-4 shadow-md animate-fade-in cursor-pointer hover:shadow-lg p-4" +
                ("large" === e.buttonSize ? " bottom-24" : " bottom-20") +
                ("left" === e.placement ? " left-5" : " right-5"),
              o = e.previewMessageTheme?.backgroundColor ?? ot,
              i = e.previewMessageTheme?.textColor ?? it;
            return (
              n !== t._v$ && fe(r, (t._v$ = n)),
              o !== t._v$2 &&
                (null != (t._v$2 = o)
                  ? r.style.setProperty("background-color", o)
                  : r.style.removeProperty("background-color")),
              i !== t._v$3 &&
                (null != (t._v$3 = i)
                  ? r.style.setProperty("color", i)
                  : r.style.removeProperty("color")),
              t
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0 }
        ),
        r
      );
    })();
  },
  st = (e) =>
    (() => {
      const t = rt();
      return (
        (t.$$click = (t) => (t.stopPropagation(), e.onClick())),
        k(
          (n) => {
            const r =
                "absolute -top-2 -right-2 rounded-full w-6 h-6 p-1 hover:brightness-95 active:brightness-90 transition-all border " +
                (e.isHovered ? "opacity-100" : "opacity-0"),
              o = e.previewMessageTheme?.closeButtonBackgroundColor ?? ot,
              i = e.previewMessageTheme?.closeButtonIconColor ?? it;
            return (
              r !== n._v$4 && fe(t, (n._v$4 = r)),
              o !== n._v$5 &&
                (null != (n._v$5 = o)
                  ? t.style.setProperty("background-color", o)
                  : t.style.removeProperty("background-color")),
              i !== n._v$6 &&
                (null != (n._v$6 = i)
                  ? t.style.setProperty("color", i)
                  : t.style.removeProperty("color")),
              n
            );
          },
          { _v$4: void 0, _v$5: void 0, _v$6: void 0 }
        ),
        t
      );
    })();
pe(["click"]);
const lt = ue(
    '<svg viewBox="0 0 800 800" width="16"><rect width="800" height="800" rx="80" fill="#0042DA"></rect><rect x="650" y="293" width="85.4704" height="384.617" rx="20" transform="rotate(90 650 293)" fill="#FF8E20"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M192.735 378.47C216.337 378.47 235.47 359.337 235.47 335.735C235.47 312.133 216.337 293 192.735 293C169.133 293 150 312.133 150 335.735C150 359.337 169.133 378.47 192.735 378.47Z" fill="#FF8E20"></path><rect x="150" y="506.677" width="85.4704" height="384.617" rx="20" transform="rotate(-90 150 506.677)" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M607.265 421.206C583.663 421.206 564.53 440.34 564.53 463.942C564.53 487.544 583.663 506.677 607.265 506.677C630.867 506.677 650 487.544 650 463.942C650 440.34 630.867 421.206 607.265 421.206Z" fill="white">'
  ),
  ct = () => lt(),
  dt = ue(
    '<a href="https://www.assistoai.com" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span>Made with Assisto AI'
  ),
  ut = (e) => {
    let t, n;
    const r = (n) => {
      n.forEach((n) => {
        n.removedNodes.forEach((n) => {
          "id" in n &&
            t &&
            "lite-badge" == n.id &&
            (console.log("Sorry, you can't remove the brand 😅"),
            e.botContainer?.append(t));
        });
      });
    };
    return (
      E(() => {
        document &&
          e.botContainer &&
          ((n = new MutationObserver(r)),
          n.observe(e.botContainer, { subtree: !1, childList: !0 }));
      }),
      I(() => {
        n && n.disconnect();
      }),
      (() => {
        const e = dt(),
          n = e.firstChild;
        return (
          "function" == typeof t ? me(t, e) : (t = e), be(e, V(ct, {}), n), e
        );
      })()
    );
  },
  pt = (e) =>
    "undefined" != typeof window
      ? window.__ENV
        ? window.__ENV[e]
        : void 0
      : "undefined" != typeof process
      ? process.env[e]
      : void 0,
  ht = () =>
    pt("NEXT_PUBLIC_VIEWER_INTERNAL_URL") ??
    pt("NEXT_PUBLIC_VIEWER_URL")?.split(",")[0] ??
    "https://localhost:3001",
  ft = () => sessionStorage.getItem("typebotPaymentInProgress"),
  gt = () => {
    sessionStorage.removeItem("typebotPaymentInProgress");
  };
const [mt, bt] = _(),
  yt = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'
  ),
  vt = (e) =>
    (() => {
      const t = yt();
      return ge(t, e, !0, !0), t;
    })(),
  wt = ue(
    '<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'
  ),
  xt = (e) =>
    (() => {
      const t = wt();
      return (
        ge(
          t,
          Y(e, {
            get class() {
              return "animate-spin h-6 w-6 " + e.class;
            },
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "data-testid": "loading-spinner",
          }),
          !0,
          !0
        ),
        t
      );
    })(),
  _t = ue("<button>"),
  kt = (e) => {
    const t = $(() => e.children),
      [n, r] = X(e, ["disabled", "class"]);
    return (() => {
      const o = _t();
      return (
        ge(
          o,
          Y(r, {
            get disabled() {
              return e.isDisabled || e.isLoading;
            },
            get class() {
              return (
                "py-2 px-4 font-semibold focus:outline-none filter hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 flex justify-center" +
                ("secondary" === e.variant
                  ? " secondary-button"
                  : " typebot-button") +
                " " +
                n.class
              );
            },
          }),
          !1,
          !0
        ),
        be(
          o,
          V(te, {
            get when() {
              return !e.isLoading;
            },
            get fallback() {
              return V(xt, {});
            },
            get children() {
              return t();
            },
          })
        ),
        o
      );
    })();
  },
  Tt = (e) => {
    const [t, n] = X(e, ["disableIcon"]);
    return V(
      kt,
      Y({ type: "submit" }, n, {
        get children() {
          return S(
            () =>
              !!(
                (mt() && !t.disableIcon) ||
                ("string" == typeof e.children && je(e.children))
              )
          )()
            ? V(vt, {
                get class() {
                  return "send-icon flex " + (t.disableIcon ? "hidden" : "");
                },
              })
            : e.children;
        },
      })
    );
  },
  St = ue(
    '<div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bubble1"></div><div class="w-2 h-2 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'
  ),
  Ct = () => St(),
  Et = ue(
    '<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'
  ),
  It = (e) => {
    const [t, n] = X(e, ["ref", "onInput"]);
    return (() => {
      const r = Et();
      r.$$input = (e) => t.onInput(e.currentTarget.value);
      const o = e.ref;
      return (
        "function" == typeof o ? me(o, r) : (e.ref = r),
        r.style.setProperty("font-size", "16px"),
        ge(r, n, !1, !1),
        r
      );
    })();
  };
pe(["input"]);
const $t = ue(
    '<textarea class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" rows="6" data-testid="textarea" required>'
  ),
  At = (e) => {
    const [t, n] = X(e, ["ref", "onInput"]);
    return (() => {
      const e = $t();
      e.$$input = (e) => t.onInput(e.currentTarget.value);
      const r = t.ref;
      return (
        "function" == typeof r ? me(r, e) : (t.ref = e),
        e.style.setProperty("font-size", "16px"),
        ge(
          e,
          Y(
            {
              get autofocus() {
                return !mt();
              },
            },
            n
          ),
          !1,
          !1
        ),
        e
      );
    })();
  };
pe(["input"]);
const Pt = ue(
  '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><audio controls>'
);
let Nt;
const Ot = (e) => {
    let t,
      n,
      r = !1;
    const [o, i] = _(!0);
    return (
      E(() => {
        Nt = setTimeout(() => {
          r ||
            ((r = !0),
            i(!1),
            setTimeout(() => e.onTransitionEnd(t?.offsetTop), 400));
        }, 100);
      }),
      I(() => {
        Nt && clearTimeout(Nt);
      }),
      (() => {
        const r = Pt(),
          i = r.firstChild.firstChild.firstChild,
          a = i.nextSibling;
        "function" == typeof t ? me(t, r) : (t = r),
          be(
            i,
            (() => {
              const e = S(() => !!o());
              return () => e() && V(Ct, {});
            })()
          );
        return (
          "function" == typeof n ? me(n, a) : (n = a),
          k(
            (t) => {
              const n = o() ? "64px" : "100%",
                r = o() ? "32px" : "100%",
                s = e.content.url,
                l = e.content.isAutoplayEnabled ?? !0,
                c =
                  "z-10 text-fade-in " +
                  (o() ? "opacity-0" : "opacity-100 m-2"),
                d = o() ? (mt() ? "32px" : "36px") : "revert";
              return (
                n !== t._v$ &&
                  (null != (t._v$ = n)
                    ? i.style.setProperty("width", n)
                    : i.style.removeProperty("width")),
                r !== t._v$2 &&
                  (null != (t._v$2 = r)
                    ? i.style.setProperty("height", r)
                    : i.style.removeProperty("height")),
                s !== t._v$3 && he(a, "src", (t._v$3 = s)),
                l !== t._v$4 && (a.autoplay = t._v$4 = l),
                c !== t._v$5 && fe(a, (t._v$5 = c)),
                d !== t._v$6 &&
                  (null != (t._v$6 = d)
                    ? a.style.setProperty("height", d)
                    : a.style.removeProperty("height")),
                t
              );
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0,
            }
          ),
          r
        );
      })()
    );
  },
  Rt = ue(
    '<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><iframe id="embed-bubble-content" class="w-full h-full ">'
  );
let Lt;
const Mt = (e) => {
    let t;
    const [n, r] = _(!0);
    return (
      E(() => {
        Lt = setTimeout(() => {
          r(!1),
            setTimeout(() => {
              e.onTransitionEnd(t?.offsetTop);
            }, 400);
        }, 2e3);
      }),
      I(() => {
        Lt && clearTimeout(Lt);
      }),
      (() => {
        const r = Rt(),
          o = r.firstChild.firstChild.firstChild,
          i = o.nextSibling,
          a = i.firstChild;
        return (
          "function" == typeof t ? me(t, r) : (t = r),
          be(
            o,
            (() => {
              const e = S(() => !!n());
              return () => e() && V(Ct, {});
            })()
          ),
          k(
            (t) => {
              const r = n() ? "64px" : "100%",
                s = n() ? "32px" : "100%",
                l = Fe(
                  "p-4 z-20 text-fade-in w-full",
                  n() ? "opacity-0" : "opacity-100 p-4"
                ),
                c = n() ? (mt() ? "32px" : "36px") : `${e.content.height}px`,
                d = e.content.url;
              return (
                r !== t._v$ &&
                  (null != (t._v$ = r)
                    ? o.style.setProperty("width", r)
                    : o.style.removeProperty("width")),
                s !== t._v$2 &&
                  (null != (t._v$2 = s)
                    ? o.style.setProperty("height", s)
                    : o.style.removeProperty("height")),
                l !== t._v$3 && fe(i, (t._v$3 = l)),
                c !== t._v$4 &&
                  (null != (t._v$4 = c)
                    ? i.style.setProperty("height", c)
                    : i.style.removeProperty("height")),
                d !== t._v$5 && he(a, "src", (t._v$5 = d)),
                t
              );
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
            }
          ),
          r
        );
      })()
    );
  },
  jt = ue('<img elementtiming="Bubble image" fetchpriority="high">'),
  zt = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">'
  ),
  Dt = ue('<a target="_blank">'),
  Bt = ue("<figure>");
let Zt;
const Ut = (e) => {
    let t, n;
    const [r, o] = _(!0),
      i = () => {
        r() &&
          (o(!1),
          setTimeout(() => {
            e.onTransitionEnd(t?.offsetTop);
          }, 400));
      };
    E(() => {
      n &&
        ((Zt = setTimeout(i, 5e3)),
        (n.onload = () => {
          clearTimeout(Zt), i();
        }));
    }),
      I(() => {
        Zt && clearTimeout(Zt);
      });
    const a = (() => {
      const t = jt();
      return (
        "function" == typeof n ? me(n, t) : (n = t),
        t.style.setProperty("max-height", "512px"),
        k(
          (n) => {
            const o = e.content.url,
              i = e.content.clickLink?.alt ?? "Bubble image",
              a = "text-fade-in w-full " + (r() ? "opacity-0" : "opacity-100"),
              s = r() ? "32px" : "auto";
            return (
              o !== n._v$ && he(t, "src", (n._v$ = o)),
              i !== n._v$2 && he(t, "alt", (n._v$2 = i)),
              a !== n._v$3 && fe(t, (n._v$3 = a)),
              s !== n._v$4 &&
                (null != (n._v$4 = s)
                  ? t.style.setProperty("height", s)
                  : t.style.removeProperty("height")),
              n
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        t
      );
    })();
    return (() => {
      const n = zt(),
        o = n.firstChild.firstChild,
        i = o.firstChild;
      return (
        "function" == typeof t ? me(t, n) : (t = n),
        be(
          i,
          (() => {
            const e = S(() => !!r());
            return () => (e() ? V(Ct, {}) : null);
          })()
        ),
        be(
          o,
          (() => {
            const t = S(() => !!e.content.clickLink);
            return () =>
              t()
                ? (() => {
                    const t = Dt();
                    return (
                      be(t, a),
                      k(
                        (n) => {
                          const o = e.content.clickLink.url,
                            i = Fe("z-10", r() ? "h-8" : "p-4");
                          return (
                            o !== n._v$7 && he(t, "href", (n._v$7 = o)),
                            i !== n._v$8 && fe(t, (n._v$8 = i)),
                            n
                          );
                        },
                        { _v$7: void 0, _v$8: void 0 }
                      ),
                      t
                    );
                  })()
                : (() => {
                    const e = Bt();
                    return (
                      be(e, a),
                      k(() =>
                        fe(
                          e,
                          Fe(
                            "z-10",
                            !r() && "p-4",
                            r() ? (mt() ? "h-8" : "h-9") : ""
                          )
                        )
                      ),
                      e
                    );
                  })();
          })(),
          null
        ),
        k(
          (e) => {
            const t = r() ? "64px" : "100%",
              n = r() ? "32px" : "100%";
            return (
              t !== e._v$5 &&
                (null != (e._v$5 = t)
                  ? i.style.setProperty("width", t)
                  : i.style.removeProperty("width")),
              n !== e._v$6 &&
                (null != (e._v$6 = n)
                  ? i.style.setProperty("height", n)
                  : i.style.removeProperty("height")),
              e
            );
          },
          { _v$5: void 0, _v$6: void 0 }
        ),
        n
      );
    })();
  },
  Ft = ue("<br>"),
  Ht = ue("<span>"),
  Vt = (e) =>
    (() => {
      const t = Ht();
      return (
        be(t, () => e.text, null),
        be(
          t,
          V(te, {
            get when() {
              return S(() => !!e.isUniqueChild)() && je(e.text);
            },
            get children() {
              return Ft();
            },
          }),
          null
        ),
        k(() =>
          fe(
            t,
            ((e, t, n) => {
              let r = "";
              return (
                e && (r += "slate-bold"),
                t && (r += " slate-italic"),
                n && (r += " slate-underline"),
                r
              );
            })(e.bold, e.italic, e.underline)
          )
        ),
        t
      );
    })(),
  Gt = ue('<a target="_blank" rel="noopener noreferrer">'),
  qt = ue("<ol>"),
  Wt = ue("<ul>"),
  Kt = ue("<li>"),
  Yt = ue("<span>"),
  Xt = ue("<div>"),
  Jt = (e) =>
    V(ne, {
      get children() {
        return [
          V(re, {
            get when() {
              return Le(e.element.text);
            },
            get children() {
              return V(
                Vt,
                Y(() => e.element, {
                  get isUniqueChild() {
                    return e.isUniqueChild ?? !1;
                  },
                })
              );
            },
          }),
          V(re, {
            when: !0,
            get children() {
              return V(ne, {
                get children() {
                  return [
                    V(re, {
                      get when() {
                        return "a" === e.element.type;
                      },
                      get children() {
                        const t = Gt();
                        return (
                          be(
                            t,
                            V(ee, {
                              get each() {
                                return e.element.children;
                              },
                              children: (t) =>
                                V(Jt, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length;
                                  },
                                  inElement: !0,
                                }),
                            })
                          ),
                          k(() => he(t, "href", e.element.url)),
                          t
                        );
                      },
                    }),
                    V(re, {
                      get when() {
                        return "ol" === e.element.type;
                      },
                      get children() {
                        const t = qt();
                        return (
                          be(
                            t,
                            V(ee, {
                              get each() {
                                return e.element.children;
                              },
                              children: (t) =>
                                V(Jt, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length;
                                  },
                                  inElement: !0,
                                }),
                            })
                          ),
                          t
                        );
                      },
                    }),
                    V(re, {
                      get when() {
                        return "ul" === e.element.type;
                      },
                      get children() {
                        const t = Wt();
                        return (
                          be(
                            t,
                            V(ee, {
                              get each() {
                                return e.element.children;
                              },
                              children: (t) =>
                                V(Jt, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length;
                                  },
                                  inElement: !0,
                                }),
                            })
                          ),
                          t
                        );
                      },
                    }),
                    V(re, {
                      get when() {
                        return "li" === e.element.type;
                      },
                      get children() {
                        const t = Kt();
                        return (
                          be(
                            t,
                            V(ee, {
                              get each() {
                                return e.element.children;
                              },
                              children: (t) =>
                                V(Jt, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length;
                                  },
                                  inElement: !0,
                                }),
                            })
                          ),
                          t
                        );
                      },
                    }),
                    V(re, {
                      when: !0,
                      get children() {
                        return V(Qt, {
                          get element() {
                            return e.element;
                          },
                          get inElement() {
                            return e.inElement ?? !1;
                          },
                          get children() {
                            return V(ee, {
                              get each() {
                                return e.element.children;
                              },
                              children: (t) =>
                                V(Jt, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length;
                                  },
                                  inElement: !0,
                                }),
                            });
                          },
                        });
                      },
                    }),
                  ];
                },
              });
            },
          }),
        ];
      },
    }),
  Qt = (e) =>
    V(ne, {
      get children() {
        return [
          V(re, {
            get when() {
              return e.inElement;
            },
            get children() {
              const t = Yt();
              return (
                be(t, () => e.children),
                k(() => he(t, "data-element-type", e.element.type)),
                t
              );
            },
          }),
          V(re, {
            get when() {
              return !e.inElement;
            },
            get children() {
              const t = Xt();
              return (
                be(t, () => e.children),
                k(
                  (n) => {
                    const r = e.element.type,
                      o = Fe(
                        "variable" === e.element.type && "flex flex-col gap-6"
                      );
                    return (
                      r !== n._v$ && he(t, "data-element-type", (n._v$ = r)),
                      o !== n._v$2 && fe(t, (n._v$2 = o)),
                      n
                    );
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              );
            },
          }),
        ];
      },
    }),
  en = (e) => e.map((e) => e.text ?? en(e.children)).join("");
var tn, nn;
!(function (e) {
  (e.assertEqual = (e) => e),
    (e.assertIs = function (e) {}),
    (e.assertNever = function (e) {
      throw new Error();
    }),
    (e.arrayToEnum = (e) => {
      const t = {};
      for (const n of e) t[n] = n;
      return t;
    }),
    (e.getValidEnumValues = (t) => {
      const n = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
        r = {};
      for (const e of n) r[e] = t[e];
      return e.objectValues(r);
    }),
    (e.objectValues = (t) =>
      e.objectKeys(t).map(function (e) {
        return t[e];
      })),
    (e.objectKeys =
      "function" == typeof Object.keys
        ? (e) => Object.keys(e)
        : (e) => {
            const t = [];
            for (const n in e)
              Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return t;
          }),
    (e.find = (e, t) => {
      for (const n of e) if (t(n)) return n;
    }),
    (e.isInteger =
      "function" == typeof Number.isInteger
        ? (e) => Number.isInteger(e)
        : (e) => "number" == typeof e && isFinite(e) && Math.floor(e) === e),
    (e.joinValues = function (e, t = " | ") {
      return e.map((e) => ("string" == typeof e ? `'${e}'` : e)).join(t);
    }),
    (e.jsonStringifyReplacer = (e, t) =>
      "bigint" == typeof t ? t.toString() : t);
})(tn || (tn = {})),
  (function (e) {
    e.mergeShapes = (e, t) => ({ ...e, ...t });
  })(nn || (nn = {}));
const rn = tn.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  on = (e) => {
    switch (typeof e) {
      case "undefined":
        return rn.undefined;
      case "string":
        return rn.string;
      case "number":
        return isNaN(e) ? rn.nan : rn.number;
      case "boolean":
        return rn.boolean;
      case "function":
        return rn.function;
      case "bigint":
        return rn.bigint;
      case "symbol":
        return rn.symbol;
      case "object":
        return Array.isArray(e)
          ? rn.array
          : null === e
          ? rn.null
          : e.then &&
            "function" == typeof e.then &&
            e.catch &&
            "function" == typeof e.catch
          ? rn.promise
          : "undefined" != typeof Map && e instanceof Map
          ? rn.map
          : "undefined" != typeof Set && e instanceof Set
          ? rn.set
          : "undefined" != typeof Date && e instanceof Date
          ? rn.date
          : rn.object;
      default:
        return rn.unknown;
    }
  },
  an = tn.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]);
class sn extends Error {
  constructor(e) {
    super(),
      (this.issues = []),
      (this.addIssue = (e) => {
        this.issues = [...this.issues, e];
      }),
      (this.addIssues = (e = []) => {
        this.issues = [...this.issues, ...e];
      });
    const t = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, t)
      : (this.__proto__ = t),
      (this.name = "ZodError"),
      (this.issues = e);
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t =
        e ||
        function (e) {
          return e.message;
        },
      n = { _errors: [] },
      r = (e) => {
        for (const o of e.issues)
          if ("invalid_union" === o.code) o.unionErrors.map(r);
          else if ("invalid_return_type" === o.code) r(o.returnTypeError);
          else if ("invalid_arguments" === o.code) r(o.argumentsError);
          else if (0 === o.path.length) n._errors.push(t(o));
          else {
            let e = n,
              r = 0;
            for (; r < o.path.length; ) {
              const n = o.path[r];
              r === o.path.length - 1
                ? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(o)))
                : (e[n] = e[n] || { _errors: [] }),
                (e = e[n]),
                r++;
            }
          }
      };
    return r(this), n;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, tn.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return 0 === this.issues.length;
  }
  flatten(e = (e) => e.message) {
    const t = {},
      n = [];
    for (const r of this.issues)
      r.path.length > 0
        ? ((t[r.path[0]] = t[r.path[0]] || []), t[r.path[0]].push(e(r)))
        : n.push(e(r));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
sn.create = (e) => new sn(e);
const ln = (e, t) => {
  let n;
  switch (e.code) {
    case an.invalid_type:
      n =
        e.received === rn.undefined
          ? "Required"
          : `Expected ${e.expected}, received ${e.received}`;
      break;
    case an.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(
        e.expected,
        tn.jsonStringifyReplacer
      )}`;
      break;
    case an.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${tn.joinValues(e.keys, ", ")}`;
      break;
    case an.invalid_union:
      n = "Invalid input";
      break;
    case an.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${tn.joinValues(e.options)}`;
      break;
    case an.invalid_enum_value:
      n = `Invalid enum value. Expected ${tn.joinValues(
        e.options
      )}, received '${e.received}'`;
      break;
    case an.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case an.invalid_return_type:
      n = "Invalid function return type";
      break;
    case an.invalid_date:
      n = "Invalid date";
      break;
    case an.invalid_string:
      "object" == typeof e.validation
        ? "includes" in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            "number" == typeof e.validation.position &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : "startsWith" in e.validation
          ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
          : "endsWith" in e.validation
          ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
          : tn.assertNever(e.validation)
        : (n =
            "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid");
      break;
    case an.too_small:
      n =
        "array" === e.type
          ? `Array must contain ${
              e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
            } ${e.minimum} element(s)`
          : "string" === e.type
          ? `String must contain ${
              e.exact ? "exactly" : e.inclusive ? "at least" : "over"
            } ${e.minimum} character(s)`
          : "number" === e.type
          ? `Number must be ${
              e.exact
                ? "exactly equal to "
                : e.inclusive
                ? "greater than or equal to "
                : "greater than "
            }${e.minimum}`
          : "date" === e.type
          ? `Date must be ${
              e.exact
                ? "exactly equal to "
                : e.inclusive
                ? "greater than or equal to "
                : "greater than "
            }${new Date(Number(e.minimum))}`
          : "Invalid input";
      break;
    case an.too_big:
      n =
        "array" === e.type
          ? `Array must contain ${
              e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
            } ${e.maximum} element(s)`
          : "string" === e.type
          ? `String must contain ${
              e.exact ? "exactly" : e.inclusive ? "at most" : "under"
            } ${e.maximum} character(s)`
          : "number" === e.type
          ? `Number must be ${
              e.exact
                ? "exactly"
                : e.inclusive
                ? "less than or equal to"
                : "less than"
            } ${e.maximum}`
          : "bigint" === e.type
          ? `BigInt must be ${
              e.exact
                ? "exactly"
                : e.inclusive
                ? "less than or equal to"
                : "less than"
            } ${e.maximum}`
          : "date" === e.type
          ? `Date must be ${
              e.exact
                ? "exactly"
                : e.inclusive
                ? "smaller than or equal to"
                : "smaller than"
            } ${new Date(Number(e.maximum))}`
          : "Invalid input";
      break;
    case an.custom:
      n = "Invalid input";
      break;
    case an.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case an.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case an.not_finite:
      n = "Number must be finite";
      break;
    default:
      (n = t.defaultError), tn.assertNever(e);
  }
  return { message: n };
};
let cn = ln;
function dn() {
  return cn;
}
const un = (e) => {
  const { data: t, path: n, errorMaps: r, issueData: o } = e,
    i = [...n, ...(o.path || [])],
    a = { ...o, path: i };
  let s = "";
  const l = r
    .filter((e) => !!e)
    .slice()
    .reverse();
  for (const e of l) s = e(a, { data: t, defaultError: s }).message;
  return { ...o, path: i, message: o.message || s };
};
function pn(e, t) {
  const n = un({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, dn(), ln].filter(
      (e) => !!e
    ),
  });
  e.common.issues.push(n);
}
class hn {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    "valid" === this.value && (this.value = "dirty");
  }
  abort() {
    "aborted" !== this.value && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const n = [];
    for (const r of t) {
      if ("aborted" === r.status) return fn;
      "dirty" === r.status && e.dirty(), n.push(r.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, t) {
    const n = [];
    for (const e of t) n.push({ key: await e.key, value: await e.value });
    return hn.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, t) {
    const n = {};
    for (const r of t) {
      const { key: t, value: o } = r;
      if ("aborted" === t.status) return fn;
      if ("aborted" === o.status) return fn;
      "dirty" === t.status && e.dirty(),
        "dirty" === o.status && e.dirty(),
        (void 0 !== o.value || r.alwaysSet) && (n[t.value] = o.value);
    }
    return { status: e.value, value: n };
  }
}
const fn = Object.freeze({ status: "aborted" }),
  gn = (e) => ({ status: "dirty", value: e }),
  mn = (e) => ({ status: "valid", value: e }),
  bn = (e) => "aborted" === e.status,
  yn = (e) => "dirty" === e.status,
  vn = (e) => "valid" === e.status,
  wn = (e) => "undefined" != typeof Promise && e instanceof Promise;
var xn;
!(function (e) {
  (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
    (e.toString = (e) =>
      "string" == typeof e ? e : null == e ? void 0 : e.message);
})(xn || (xn = {}));
class _n {
  constructor(e, t, n, r) {
    (this._cachedPath = []),
      (this.parent = e),
      (this.data = t),
      (this._path = n),
      (this._key = r);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const kn = (e, t) => {
  if (vn(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new sn(e.common.issues);
      return (this._error = t), this._error;
    },
  };
};
function Tn(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: o,
  } = e;
  if (t && (n || r))
    throw new Error(
      'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
    );
  if (t) return { errorMap: t, description: o };
  return {
    errorMap: (e, t) =>
      "invalid_type" !== e.code
        ? { message: t.defaultError }
        : void 0 === t.data
        ? { message: null != r ? r : t.defaultError }
        : { message: null != n ? n : t.defaultError },
    description: o,
  };
}
class Sn {
  constructor(e) {
    (this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return on(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: on(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new hn(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: on(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (wn(t)) throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const n = this.safeParse(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    var n;
    const r = {
        common: {
          issues: [],
          async:
            null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
          contextualErrorMap: null == t ? void 0 : t.errorMap,
        },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: on(e),
      },
      o = this._parseSync({ data: e, path: r.path, parent: r });
    return kn(r, o);
  }
  async parseAsync(e, t) {
    const n = await this.safeParseAsync(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    const n = {
        common: {
          issues: [],
          contextualErrorMap: null == t ? void 0 : t.errorMap,
          async: !0,
        },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: on(e),
      },
      r = this._parse({ data: e, path: n.path, parent: n }),
      o = await (wn(r) ? r : Promise.resolve(r));
    return kn(n, o);
  }
  refine(e, t) {
    const n = (e) =>
      "string" == typeof t || void 0 === t
        ? { message: t }
        : "function" == typeof t
        ? t(e)
        : t;
    return this._refinement((t, r) => {
      const o = e(t),
        i = () => r.addIssue({ code: an.custom, ...n(t) });
      return "undefined" != typeof Promise && o instanceof Promise
        ? o.then((e) => !!e || (i(), !1))
        : !!o || (i(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement(
      (n, r) => !!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t), !1)
    );
  }
  _refinement(e) {
    return new pr({
      schema: this,
      typeName: kr.ZodEffects,
      effect: { type: "refinement", refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return hr.create(this, this._def);
  }
  nullable() {
    return fr.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return qn.create(this, this._def);
  }
  promise() {
    return ur.create(this, this._def);
  }
  or(e) {
    return Yn.create([this, e], this._def);
  }
  and(e) {
    return er.create(this, e, this._def);
  }
  transform(e) {
    return new pr({
      ...Tn(this._def),
      schema: this,
      typeName: kr.ZodEffects,
      effect: { type: "transform", transform: e },
    });
  }
  default(e) {
    const t = "function" == typeof e ? e : () => e;
    return new gr({
      ...Tn(this._def),
      innerType: this,
      defaultValue: t,
      typeName: kr.ZodDefault,
    });
  }
  brand() {
    return new vr({ typeName: kr.ZodBranded, type: this, ...Tn(this._def) });
  }
  catch(e) {
    const t = "function" == typeof e ? e : () => e;
    return new mr({
      ...Tn(this._def),
      innerType: this,
      catchValue: t,
      typeName: kr.ZodCatch,
    });
  }
  describe(e) {
    return new (0, this.constructor)({ ...this._def, description: e });
  }
  pipe(e) {
    return wr.create(this, e);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Cn = /^c[^\s-]{8,}$/i,
  En = /^[a-z][a-z0-9]*$/,
  In = /[0-9A-HJKMNP-TV-Z]{26}/,
  $n =
    /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i,
  An =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/,
  Pn = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u,
  Nn =
    /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
  On =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
class Rn extends Sn {
  constructor() {
    super(...arguments),
      (this._regex = (e, t, n) =>
        this.refinement((t) => e.test(t), {
          validation: t,
          code: an.invalid_string,
          ...xn.errToObj(n),
        })),
      (this.nonempty = (e) => this.min(1, xn.errToObj(e))),
      (this.trim = () =>
        new Rn({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }],
        })),
      (this.toLowerCase = () =>
        new Rn({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }],
        })),
      (this.toUpperCase = () =>
        new Rn({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }],
        }));
  }
  _parse(e) {
    this._def.coerce && (e.data = String(e.data));
    if (this._getType(e) !== rn.string) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.string,
          received: t.parsedType,
        }),
        fn
      );
    }
    const t = new hn();
    let n;
    for (const a of this._def.checks)
      if ("min" === a.kind)
        e.data.length < a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.too_small,
            minimum: a.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          t.dirty());
      else if ("max" === a.kind)
        e.data.length > a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.too_big,
            maximum: a.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          t.dirty());
      else if ("length" === a.kind) {
        const r = e.data.length > a.value,
          o = e.data.length < a.value;
        (r || o) &&
          ((n = this._getOrReturnCtx(e, n)),
          r
            ? pn(n, {
                code: an.too_big,
                maximum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              })
            : o &&
              pn(n, {
                code: an.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          t.dirty());
      } else if ("email" === a.kind)
        An.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "email",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("emoji" === a.kind)
        Pn.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "emoji",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("uuid" === a.kind)
        $n.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "uuid",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("cuid" === a.kind)
        Cn.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "cuid",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("cuid2" === a.kind)
        En.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "cuid2",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("ulid" === a.kind)
        In.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "ulid",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      else if ("url" === a.kind)
        try {
          new URL(e.data);
        } catch (r) {
          (n = this._getOrReturnCtx(e, n)),
            pn(n, {
              validation: "url",
              code: an.invalid_string,
              message: a.message,
            }),
            t.dirty();
        }
      else if ("regex" === a.kind) {
        a.regex.lastIndex = 0;
        a.regex.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            validation: "regex",
            code: an.invalid_string,
            message: a.message,
          }),
          t.dirty());
      } else if ("trim" === a.kind) e.data = e.data.trim();
      else if ("includes" === a.kind)
        e.data.includes(a.value, a.position) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.invalid_string,
            validation: { includes: a.value, position: a.position },
            message: a.message,
          }),
          t.dirty());
      else if ("toLowerCase" === a.kind) e.data = e.data.toLowerCase();
      else if ("toUpperCase" === a.kind) e.data = e.data.toUpperCase();
      else if ("startsWith" === a.kind)
        e.data.startsWith(a.value) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.invalid_string,
            validation: { startsWith: a.value },
            message: a.message,
          }),
          t.dirty());
      else if ("endsWith" === a.kind)
        e.data.endsWith(a.value) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.invalid_string,
            validation: { endsWith: a.value },
            message: a.message,
          }),
          t.dirty());
      else if ("datetime" === a.kind) {
        ((i = a).precision
          ? i.offset
            ? new RegExp(
                `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`
              )
            : new RegExp(
                `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}Z$`
              )
          : 0 === i.precision
          ? i.offset
            ? new RegExp(
                "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"
              )
            : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
          : i.offset
          ? new RegExp(
              "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"
            )
          : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")
        ).test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.invalid_string,
            validation: "datetime",
            message: a.message,
          }),
          t.dirty());
      } else
        "ip" === a.kind
          ? ((r = e.data),
            (("v4" !== (o = a.version) && o) || !Nn.test(r)) &&
              (("v6" !== o && o) || !On.test(r)) &&
              ((n = this._getOrReturnCtx(e, n)),
              pn(n, {
                validation: "ip",
                code: an.invalid_string,
                message: a.message,
              }),
              t.dirty()))
          : tn.assertNever(a);
    var r, o, i;
    return { status: t.value, value: e.data };
  }
  _addCheck(e) {
    return new Rn({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...xn.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...xn.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...xn.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...xn.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...xn.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...xn.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...xn.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...xn.errToObj(e) });
  }
  datetime(e) {
    var t;
    return "string" == typeof e
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: e,
        })
      : this._addCheck({
          kind: "datetime",
          precision:
            void 0 === (null == e ? void 0 : e.precision)
              ? null
              : null == e
              ? void 0
              : e.precision,
          offset:
            null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
          ...xn.errToObj(null == e ? void 0 : e.message),
        });
  }
  regex(e, t) {
    return this._addCheck({ kind: "regex", regex: e, ...xn.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: null == t ? void 0 : t.position,
      ...xn.errToObj(null == t ? void 0 : t.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: "startsWith", value: e, ...xn.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: "endsWith", value: e, ...xn.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: "min", value: e, ...xn.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: "max", value: e, ...xn.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: "length", value: e, ...xn.errToObj(t) });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => "datetime" === e.kind);
  }
  get isEmail() {
    return !!this._def.checks.find((e) => "email" === e.kind);
  }
  get isURL() {
    return !!this._def.checks.find((e) => "url" === e.kind);
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => "emoji" === e.kind);
  }
  get isUUID() {
    return !!this._def.checks.find((e) => "uuid" === e.kind);
  }
  get isCUID() {
    return !!this._def.checks.find((e) => "cuid" === e.kind);
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => "cuid2" === e.kind);
  }
  get isULID() {
    return !!this._def.checks.find((e) => "ulid" === e.kind);
  }
  get isIP() {
    return !!this._def.checks.find((e) => "ip" === e.kind);
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}
function Ln(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = (t.toString().split(".")[1] || "").length,
    o = n > r ? n : r;
  return (
    (parseInt(e.toFixed(o).replace(".", "")) %
      parseInt(t.toFixed(o).replace(".", ""))) /
    Math.pow(10, o)
  );
}
Rn.create = (e) => {
  var t;
  return new Rn({
    checks: [],
    typeName: kr.ZodString,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...Tn(e),
  });
};
class Mn extends Sn {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    this._def.coerce && (e.data = Number(e.data));
    if (this._getType(e) !== rn.number) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.number,
          received: t.parsedType,
        }),
        fn
      );
    }
    let t;
    const n = new hn();
    for (const r of this._def.checks)
      if ("int" === r.kind)
        tn.isInteger(e.data) ||
          ((t = this._getOrReturnCtx(e, t)),
          pn(t, {
            code: an.invalid_type,
            expected: "integer",
            received: "float",
            message: r.message,
          }),
          n.dirty());
      else if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          pn(t, {
            code: an.too_small,
            minimum: r.value,
            type: "number",
            inclusive: r.inclusive,
            exact: !1,
            message: r.message,
          }),
          n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          pn(t, {
            code: an.too_big,
            maximum: r.value,
            type: "number",
            inclusive: r.inclusive,
            exact: !1,
            message: r.message,
          }),
          n.dirty());
      } else
        "multipleOf" === r.kind
          ? 0 !== Ln(e.data, r.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            pn(t, {
              code: an.not_multiple_of,
              multipleOf: r.value,
              message: r.message,
            }),
            n.dirty())
          : "finite" === r.kind
          ? Number.isFinite(e.data) ||
            ((t = this._getOrReturnCtx(e, t)),
            pn(t, { code: an.not_finite, message: r.message }),
            n.dirty())
          : tn.assertNever(r);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, xn.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, xn.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, xn.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, xn.toString(t));
  }
  setLimit(e, t, n, r) {
    return new Mn({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: n, message: xn.toString(r) },
      ],
    });
  }
  _addCheck(e) {
    return new Mn({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: "int", message: xn.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: xn.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: xn.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: xn.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: xn.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: xn.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: xn.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: xn.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: xn.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        "int" === e.kind || ("multipleOf" === e.kind && tn.isInteger(e.value))
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const n of this._def.checks) {
      if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind)
        return !0;
      "min" === n.kind
        ? (null === t || n.value > t) && (t = n.value)
        : "max" === n.kind && (null === e || n.value < e) && (e = n.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Mn.create = (e) =>
  new Mn({
    checks: [],
    typeName: kr.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...Tn(e),
  });
class jn extends Sn {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    this._def.coerce && (e.data = BigInt(e.data));
    if (this._getType(e) !== rn.bigint) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.bigint,
          received: t.parsedType,
        }),
        fn
      );
    }
    let t;
    const n = new hn();
    for (const r of this._def.checks)
      if ("min" === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          pn(t, {
            code: an.too_small,
            type: "bigint",
            minimum: r.value,
            inclusive: r.inclusive,
            message: r.message,
          }),
          n.dirty());
      } else if ("max" === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          pn(t, {
            code: an.too_big,
            type: "bigint",
            maximum: r.value,
            inclusive: r.inclusive,
            message: r.message,
          }),
          n.dirty());
      } else
        "multipleOf" === r.kind
          ? e.data % r.value !== BigInt(0) &&
            ((t = this._getOrReturnCtx(e, t)),
            pn(t, {
              code: an.not_multiple_of,
              multipleOf: r.value,
              message: r.message,
            }),
            n.dirty())
          : tn.assertNever(r);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, xn.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, xn.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, xn.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, xn.toString(t));
  }
  setLimit(e, t, n, r) {
    return new jn({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: n, message: xn.toString(r) },
      ],
    });
  }
  _addCheck(e) {
    return new jn({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: xn.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: xn.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: xn.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: xn.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: xn.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}
jn.create = (e) => {
  var t;
  return new jn({
    checks: [],
    typeName: kr.ZodBigInt,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...Tn(e),
  });
};
class zn extends Sn {
  _parse(e) {
    this._def.coerce && (e.data = Boolean(e.data));
    if (this._getType(e) !== rn.boolean) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.boolean,
          received: t.parsedType,
        }),
        fn
      );
    }
    return mn(e.data);
  }
}
zn.create = (e) =>
  new zn({
    typeName: kr.ZodBoolean,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...Tn(e),
  });
class Dn extends Sn {
  _parse(e) {
    this._def.coerce && (e.data = new Date(e.data));
    if (this._getType(e) !== rn.date) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.date,
          received: t.parsedType,
        }),
        fn
      );
    }
    if (isNaN(e.data.getTime())) {
      return pn(this._getOrReturnCtx(e), { code: an.invalid_date }), fn;
    }
    const t = new hn();
    let n;
    for (const r of this._def.checks)
      "min" === r.kind
        ? e.data.getTime() < r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.too_small,
            message: r.message,
            inclusive: !0,
            exact: !1,
            minimum: r.value,
            type: "date",
          }),
          t.dirty())
        : "max" === r.kind
        ? e.data.getTime() > r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          pn(n, {
            code: an.too_big,
            message: r.message,
            inclusive: !0,
            exact: !1,
            maximum: r.value,
            type: "date",
          }),
          t.dirty())
        : tn.assertNever(r);
    return { status: t.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new Dn({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: xn.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: xn.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
}
Dn.create = (e) =>
  new Dn({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: kr.ZodDate,
    ...Tn(e),
  });
class Bn extends Sn {
  _parse(e) {
    if (this._getType(e) !== rn.symbol) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.symbol,
          received: t.parsedType,
        }),
        fn
      );
    }
    return mn(e.data);
  }
}
Bn.create = (e) => new Bn({ typeName: kr.ZodSymbol, ...Tn(e) });
class Zn extends Sn {
  _parse(e) {
    if (this._getType(e) !== rn.undefined) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.undefined,
          received: t.parsedType,
        }),
        fn
      );
    }
    return mn(e.data);
  }
}
Zn.create = (e) => new Zn({ typeName: kr.ZodUndefined, ...Tn(e) });
class Un extends Sn {
  _parse(e) {
    if (this._getType(e) !== rn.null) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.null,
          received: t.parsedType,
        }),
        fn
      );
    }
    return mn(e.data);
  }
}
Un.create = (e) => new Un({ typeName: kr.ZodNull, ...Tn(e) });
class Fn extends Sn {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return mn(e.data);
  }
}
Fn.create = (e) => new Fn({ typeName: kr.ZodAny, ...Tn(e) });
class Hn extends Sn {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return mn(e.data);
  }
}
Hn.create = (e) => new Hn({ typeName: kr.ZodUnknown, ...Tn(e) });
class Vn extends Sn {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return (
      pn(t, {
        code: an.invalid_type,
        expected: rn.never,
        received: t.parsedType,
      }),
      fn
    );
  }
}
Vn.create = (e) => new Vn({ typeName: kr.ZodNever, ...Tn(e) });
class Gn extends Sn {
  _parse(e) {
    if (this._getType(e) !== rn.undefined) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.void,
          received: t.parsedType,
        }),
        fn
      );
    }
    return mn(e.data);
  }
}
Gn.create = (e) => new Gn({ typeName: kr.ZodVoid, ...Tn(e) });
class qn extends Sn {
  _parse(e) {
    const { ctx: t, status: n } = this._processInputParams(e),
      r = this._def;
    if (t.parsedType !== rn.array)
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.array,
          received: t.parsedType,
        }),
        fn
      );
    if (null !== r.exactLength) {
      const e = t.data.length > r.exactLength.value,
        o = t.data.length < r.exactLength.value;
      (e || o) &&
        (pn(t, {
          code: e ? an.too_big : an.too_small,
          minimum: o ? r.exactLength.value : void 0,
          maximum: e ? r.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: r.exactLength.message,
        }),
        n.dirty());
    }
    if (
      (null !== r.minLength &&
        t.data.length < r.minLength.value &&
        (pn(t, {
          code: an.too_small,
          minimum: r.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.minLength.message,
        }),
        n.dirty()),
      null !== r.maxLength &&
        t.data.length > r.maxLength.value &&
        (pn(t, {
          code: an.too_big,
          maximum: r.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: r.maxLength.message,
        }),
        n.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((e, n) => r.type._parseAsync(new _n(t, e, t.path, n)))
      ).then((e) => hn.mergeArray(n, e));
    const o = [...t.data].map((e, n) =>
      r.type._parseSync(new _n(t, e, t.path, n))
    );
    return hn.mergeArray(n, o);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new qn({
      ...this._def,
      minLength: { value: e, message: xn.toString(t) },
    });
  }
  max(e, t) {
    return new qn({
      ...this._def,
      maxLength: { value: e, message: xn.toString(t) },
    });
  }
  length(e, t) {
    return new qn({
      ...this._def,
      exactLength: { value: e, message: xn.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
function Wn(e) {
  if (e instanceof Kn) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = hr.create(Wn(r));
    }
    return new Kn({ ...e._def, shape: () => t });
  }
  return e instanceof qn
    ? new qn({ ...e._def, type: Wn(e.element) })
    : e instanceof hr
    ? hr.create(Wn(e.unwrap()))
    : e instanceof fr
    ? fr.create(Wn(e.unwrap()))
    : e instanceof tr
    ? tr.create(e.items.map((e) => Wn(e)))
    : e;
}
qn.create = (e, t) =>
  new qn({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: kr.ZodArray,
    ...Tn(t),
  });
class Kn extends Sn {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (null !== this._cached) return this._cached;
    const e = this._def.shape(),
      t = tn.objectKeys(e);
    return (this._cached = { shape: e, keys: t });
  }
  _parse(e) {
    if (this._getType(e) !== rn.object) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.object,
          received: t.parsedType,
        }),
        fn
      );
    }
    const { status: t, ctx: n } = this._processInputParams(e),
      { shape: r, keys: o } = this._getCached(),
      i = [];
    if (
      !(this._def.catchall instanceof Vn && "strip" === this._def.unknownKeys)
    )
      for (const e in n.data) o.includes(e) || i.push(e);
    const a = [];
    for (const e of o) {
      const t = r[e],
        o = n.data[e];
      a.push({
        key: { status: "valid", value: e },
        value: t._parse(new _n(n, o, n.path, e)),
        alwaysSet: e in n.data,
      });
    }
    if (this._def.catchall instanceof Vn) {
      const e = this._def.unknownKeys;
      if ("passthrough" === e)
        for (const e of i)
          a.push({
            key: { status: "valid", value: e },
            value: { status: "valid", value: n.data[e] },
          });
      else if ("strict" === e)
        i.length > 0 &&
          (pn(n, { code: an.unrecognized_keys, keys: i }), t.dirty());
      else if ("strip" !== e)
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const e = this._def.catchall;
      for (const t of i) {
        const r = n.data[t];
        a.push({
          key: { status: "valid", value: t },
          value: e._parse(new _n(n, r, n.path, t)),
          alwaysSet: t in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve()
          .then(async () => {
            const e = [];
            for (const t of a) {
              const n = await t.key;
              e.push({ key: n, value: await t.value, alwaysSet: t.alwaysSet });
            }
            return e;
          })
          .then((e) => hn.mergeObjectSync(t, e))
      : hn.mergeObjectSync(t, a);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      xn.errToObj,
      new Kn({
        ...this._def,
        unknownKeys: "strict",
        ...(void 0 !== e
          ? {
              errorMap: (t, n) => {
                var r, o, i, a;
                const s =
                  null !==
                    (i =
                      null === (o = (r = this._def).errorMap) || void 0 === o
                        ? void 0
                        : o.call(r, t, n).message) && void 0 !== i
                    ? i
                    : n.defaultError;
                return "unrecognized_keys" === t.code
                  ? {
                      message:
                        null !== (a = xn.errToObj(e).message) && void 0 !== a
                          ? a
                          : s,
                    }
                  : { message: s };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new Kn({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new Kn({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(e) {
    return new Kn({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new Kn({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: kr.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new Kn({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    return (
      tn.objectKeys(e).forEach((n) => {
        e[n] && this.shape[n] && (t[n] = this.shape[n]);
      }),
      new Kn({ ...this._def, shape: () => t })
    );
  }
  omit(e) {
    const t = {};
    return (
      tn.objectKeys(this.shape).forEach((n) => {
        e[n] || (t[n] = this.shape[n]);
      }),
      new Kn({ ...this._def, shape: () => t })
    );
  }
  deepPartial() {
    return Wn(this);
  }
  partial(e) {
    const t = {};
    return (
      tn.objectKeys(this.shape).forEach((n) => {
        const r = this.shape[n];
        e && !e[n] ? (t[n] = r) : (t[n] = r.optional());
      }),
      new Kn({ ...this._def, shape: () => t })
    );
  }
  required(e) {
    const t = {};
    return (
      tn.objectKeys(this.shape).forEach((n) => {
        if (e && !e[n]) t[n] = this.shape[n];
        else {
          let e = this.shape[n];
          for (; e instanceof hr; ) e = e._def.innerType;
          t[n] = e;
        }
      }),
      new Kn({ ...this._def, shape: () => t })
    );
  }
  keyof() {
    return lr(tn.objectKeys(this.shape));
  }
}
(Kn.create = (e, t) =>
  new Kn({
    shape: () => e,
    unknownKeys: "strip",
    catchall: Vn.create(),
    typeName: kr.ZodObject,
    ...Tn(t),
  })),
  (Kn.strictCreate = (e, t) =>
    new Kn({
      shape: () => e,
      unknownKeys: "strict",
      catchall: Vn.create(),
      typeName: kr.ZodObject,
      ...Tn(t),
    })),
  (Kn.lazycreate = (e, t) =>
    new Kn({
      shape: e,
      unknownKeys: "strip",
      catchall: Vn.create(),
      typeName: kr.ZodObject,
      ...Tn(t),
    }));
class Yn extends Sn {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = this._def.options;
    if (t.common.async)
      return Promise.all(
        n.map(async (e) => {
          const n = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return {
            result: await e._parseAsync({
              data: t.data,
              path: t.path,
              parent: n,
            }),
            ctx: n,
          };
        })
      ).then(function (e) {
        for (const t of e) if ("valid" === t.result.status) return t.result;
        for (const n of e)
          if ("dirty" === n.result.status)
            return t.common.issues.push(...n.ctx.common.issues), n.result;
        const n = e.map((e) => new sn(e.ctx.common.issues));
        return pn(t, { code: an.invalid_union, unionErrors: n }), fn;
      });
    {
      let e;
      const r = [];
      for (const o of n) {
        const n = { ...t, common: { ...t.common, issues: [] }, parent: null },
          i = o._parseSync({ data: t.data, path: t.path, parent: n });
        if ("valid" === i.status) return i;
        "dirty" !== i.status || e || (e = { result: i, ctx: n }),
          n.common.issues.length && r.push(n.common.issues);
      }
      if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
      const o = r.map((e) => new sn(e));
      return pn(t, { code: an.invalid_union, unionErrors: o }), fn;
    }
  }
  get options() {
    return this._def.options;
  }
}
Yn.create = (e, t) => new Yn({ options: e, typeName: kr.ZodUnion, ...Tn(t) });
const Xn = (e) =>
  e instanceof ar
    ? Xn(e.schema)
    : e instanceof pr
    ? Xn(e.innerType())
    : e instanceof sr
    ? [e.value]
    : e instanceof cr
    ? e.options
    : e instanceof dr
    ? Object.keys(e.enum)
    : e instanceof gr
    ? Xn(e._def.innerType)
    : e instanceof Zn
    ? [void 0]
    : e instanceof Un
    ? [null]
    : null;
class Jn extends Sn {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== rn.object)
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.object,
          received: t.parsedType,
        }),
        fn
      );
    const n = this.discriminator,
      r = t.data[n],
      o = this.optionsMap.get(r);
    return o
      ? t.common.async
        ? o._parseAsync({ data: t.data, path: t.path, parent: t })
        : o._parseSync({ data: t.data, path: t.path, parent: t })
      : (pn(t, {
          code: an.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n],
        }),
        fn);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, t, n) {
    const r = new Map();
    for (const n of t) {
      const t = Xn(n.shape[e]);
      if (!t)
        throw new Error(
          `A discriminator value for key \`${e}\` could not be extracted from all schema options`
        );
      for (const o of t) {
        if (r.has(o))
          throw new Error(
            `Discriminator property ${String(e)} has duplicate value ${String(
              o
            )}`
          );
        r.set(o, n);
      }
    }
    return new Jn({
      typeName: kr.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...Tn(n),
    });
  }
}
function Qn(e, t) {
  const n = on(e),
    r = on(t);
  if (e === t) return { valid: !0, data: e };
  if (n === rn.object && r === rn.object) {
    const n = tn.objectKeys(t),
      r = tn.objectKeys(e).filter((e) => -1 !== n.indexOf(e)),
      o = { ...e, ...t };
    for (const n of r) {
      const r = Qn(e[n], t[n]);
      if (!r.valid) return { valid: !1 };
      o[n] = r.data;
    }
    return { valid: !0, data: o };
  }
  if (n === rn.array && r === rn.array) {
    if (e.length !== t.length) return { valid: !1 };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = Qn(e[r], t[r]);
      if (!o.valid) return { valid: !1 };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return n === rn.date && r === rn.date && +e == +t
    ? { valid: !0, data: e }
    : { valid: !1 };
}
class er extends Sn {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e),
      r = (e, r) => {
        if (bn(e) || bn(r)) return fn;
        const o = Qn(e.value, r.value);
        return o.valid
          ? ((yn(e) || yn(r)) && t.dirty(), { status: t.value, value: o.data })
          : (pn(n, { code: an.invalid_intersection_types }), fn);
      };
    return n.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          }),
        ]).then(([e, t]) => r(e, t))
      : r(
          this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseSync({ data: n.data, path: n.path, parent: n })
        );
  }
}
er.create = (e, t, n) =>
  new er({ left: e, right: t, typeName: kr.ZodIntersection, ...Tn(n) });
class tr extends Sn {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== rn.array)
      return (
        pn(n, {
          code: an.invalid_type,
          expected: rn.array,
          received: n.parsedType,
        }),
        fn
      );
    if (n.data.length < this._def.items.length)
      return (
        pn(n, {
          code: an.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        fn
      );
    !this._def.rest &&
      n.data.length > this._def.items.length &&
      (pn(n, {
        code: an.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      t.dirty());
    const r = [...n.data]
      .map((e, t) => {
        const r = this._def.items[t] || this._def.rest;
        return r ? r._parse(new _n(n, e, n.path, t)) : null;
      })
      .filter((e) => !!e);
    return n.common.async
      ? Promise.all(r).then((e) => hn.mergeArray(t, e))
      : hn.mergeArray(t, r);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new tr({ ...this._def, rest: e });
  }
}
tr.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new tr({ items: e, typeName: kr.ZodTuple, rest: null, ...Tn(t) });
};
class nr extends Sn {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== rn.object)
      return (
        pn(n, {
          code: an.invalid_type,
          expected: rn.object,
          received: n.parsedType,
        }),
        fn
      );
    const r = [],
      o = this._def.keyType,
      i = this._def.valueType;
    for (const e in n.data)
      r.push({
        key: o._parse(new _n(n, e, n.path, e)),
        value: i._parse(new _n(n, n.data[e], n.path, e)),
      });
    return n.common.async
      ? hn.mergeObjectAsync(t, r)
      : hn.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, n) {
    return new nr(
      t instanceof Sn
        ? { keyType: e, valueType: t, typeName: kr.ZodRecord, ...Tn(n) }
        : {
            keyType: Rn.create(),
            valueType: e,
            typeName: kr.ZodRecord,
            ...Tn(t),
          }
    );
  }
}
class rr extends Sn {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== rn.map)
      return (
        pn(n, {
          code: an.invalid_type,
          expected: rn.map,
          received: n.parsedType,
        }),
        fn
      );
    const r = this._def.keyType,
      o = this._def.valueType,
      i = [...n.data.entries()].map(([e, t], i) => ({
        key: r._parse(new _n(n, e, n.path, [i, "key"])),
        value: o._parse(new _n(n, t, n.path, [i, "value"])),
      }));
    if (n.common.async) {
      const e = new Map();
      return Promise.resolve().then(async () => {
        for (const n of i) {
          const r = await n.key,
            o = await n.value;
          if ("aborted" === r.status || "aborted" === o.status) return fn;
          ("dirty" !== r.status && "dirty" !== o.status) || t.dirty(),
            e.set(r.value, o.value);
        }
        return { status: t.value, value: e };
      });
    }
    {
      const e = new Map();
      for (const n of i) {
        const r = n.key,
          o = n.value;
        if ("aborted" === r.status || "aborted" === o.status) return fn;
        ("dirty" !== r.status && "dirty" !== o.status) || t.dirty(),
          e.set(r.value, o.value);
      }
      return { status: t.value, value: e };
    }
  }
}
rr.create = (e, t, n) =>
  new rr({ valueType: t, keyType: e, typeName: kr.ZodMap, ...Tn(n) });
class or extends Sn {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== rn.set)
      return (
        pn(n, {
          code: an.invalid_type,
          expected: rn.set,
          received: n.parsedType,
        }),
        fn
      );
    const r = this._def;
    null !== r.minSize &&
      n.data.size < r.minSize.value &&
      (pn(n, {
        code: an.too_small,
        minimum: r.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: r.minSize.message,
      }),
      t.dirty()),
      null !== r.maxSize &&
        n.data.size > r.maxSize.value &&
        (pn(n, {
          code: an.too_big,
          maximum: r.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: r.maxSize.message,
        }),
        t.dirty());
    const o = this._def.valueType;
    function i(e) {
      const n = new Set();
      for (const r of e) {
        if ("aborted" === r.status) return fn;
        "dirty" === r.status && t.dirty(), n.add(r.value);
      }
      return { status: t.value, value: n };
    }
    const a = [...n.data.values()].map((e, t) =>
      o._parse(new _n(n, e, n.path, t))
    );
    return n.common.async ? Promise.all(a).then((e) => i(e)) : i(a);
  }
  min(e, t) {
    return new or({
      ...this._def,
      minSize: { value: e, message: xn.toString(t) },
    });
  }
  max(e, t) {
    return new or({
      ...this._def,
      maxSize: { value: e, message: xn.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
or.create = (e, t) =>
  new or({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: kr.ZodSet,
    ...Tn(t),
  });
class ir extends Sn {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== rn.function)
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.function,
          received: t.parsedType,
        }),
        fn
      );
    function n(e, n) {
      return un({
        data: e,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          dn(),
          ln,
        ].filter((e) => !!e),
        issueData: { code: an.invalid_arguments, argumentsError: n },
      });
    }
    function r(e, n) {
      return un({
        data: e,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          dn(),
          ln,
        ].filter((e) => !!e),
        issueData: { code: an.invalid_return_type, returnTypeError: n },
      });
    }
    const o = { errorMap: t.common.contextualErrorMap },
      i = t.data;
    return this._def.returns instanceof ur
      ? mn(async (...e) => {
          const t = new sn([]),
            a = await this._def.args.parseAsync(e, o).catch((r) => {
              throw (t.addIssue(n(e, r)), t);
            }),
            s = await i(...a);
          return await this._def.returns._def.type
            .parseAsync(s, o)
            .catch((e) => {
              throw (t.addIssue(r(s, e)), t);
            });
        })
      : mn((...e) => {
          const t = this._def.args.safeParse(e, o);
          if (!t.success) throw new sn([n(e, t.error)]);
          const a = i(...t.data),
            s = this._def.returns.safeParse(a, o);
          if (!s.success) throw new sn([r(a, s.error)]);
          return s.data;
        });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new ir({ ...this._def, args: tr.create(e).rest(Hn.create()) });
  }
  returns(e) {
    return new ir({ ...this._def, returns: e });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, n) {
    return new ir({
      args: e || tr.create([]).rest(Hn.create()),
      returns: t || Hn.create(),
      typeName: kr.ZodFunction,
      ...Tn(n),
    });
  }
}
class ar extends Sn {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
ar.create = (e, t) => new ar({ getter: e, typeName: kr.ZodLazy, ...Tn(t) });
class sr extends Sn {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          received: t.data,
          code: an.invalid_literal,
          expected: this._def.value,
        }),
        fn
      );
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
function lr(e, t) {
  return new cr({ values: e, typeName: kr.ZodEnum, ...Tn(t) });
}
sr.create = (e, t) => new sr({ value: e, typeName: kr.ZodLiteral, ...Tn(t) });
class cr extends Sn {
  _parse(e) {
    if ("string" != typeof e.data) {
      const t = this._getOrReturnCtx(e),
        n = this._def.values;
      return (
        pn(t, {
          expected: tn.joinValues(n),
          received: t.parsedType,
          code: an.invalid_type,
        }),
        fn
      );
    }
    if (-1 === this._def.values.indexOf(e.data)) {
      const t = this._getOrReturnCtx(e),
        n = this._def.values;
      return (
        pn(t, { received: t.data, code: an.invalid_enum_value, options: n }), fn
      );
    }
    return mn(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e) {
    return cr.create(e);
  }
  exclude(e) {
    return cr.create(this.options.filter((t) => !e.includes(t)));
  }
}
cr.create = lr;
class dr extends Sn {
  _parse(e) {
    const t = tn.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== rn.string && n.parsedType !== rn.number) {
      const e = tn.objectValues(t);
      return (
        pn(n, {
          expected: tn.joinValues(e),
          received: n.parsedType,
          code: an.invalid_type,
        }),
        fn
      );
    }
    if (-1 === t.indexOf(e.data)) {
      const e = tn.objectValues(t);
      return (
        pn(n, { received: n.data, code: an.invalid_enum_value, options: e }), fn
      );
    }
    return mn(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
dr.create = (e, t) =>
  new dr({ values: e, typeName: kr.ZodNativeEnum, ...Tn(t) });
class ur extends Sn {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== rn.promise && !1 === t.common.async)
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.promise,
          received: t.parsedType,
        }),
        fn
      );
    const n = t.parsedType === rn.promise ? t.data : Promise.resolve(t.data);
    return mn(
      n.then((e) =>
        this._def.type.parseAsync(e, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        })
      )
    );
  }
}
ur.create = (e, t) => new ur({ type: e, typeName: kr.ZodPromise, ...Tn(t) });
class pr extends Sn {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === kr.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e),
      r = this._def.effect || null;
    if ("preprocess" === r.type) {
      const e = r.transform(n.data);
      return n.common.async
        ? Promise.resolve(e).then((e) =>
            this._def.schema._parseAsync({ data: e, path: n.path, parent: n })
          )
        : this._def.schema._parseSync({ data: e, path: n.path, parent: n });
    }
    const o = {
      addIssue: (e) => {
        pn(n, e), e.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return n.path;
      },
    };
    if (((o.addIssue = o.addIssue.bind(o)), "refinement" === r.type)) {
      const e = (e) => {
        const t = r.refinement(e, o);
        if (n.common.async) return Promise.resolve(t);
        if (t instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return e;
      };
      if (!1 === n.common.async) {
        const r = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return "aborted" === r.status
          ? fn
          : ("dirty" === r.status && t.dirty(),
            e(r.value),
            { status: t.value, value: r.value });
      }
      return this._def.schema
        ._parseAsync({ data: n.data, path: n.path, parent: n })
        .then((n) =>
          "aborted" === n.status
            ? fn
            : ("dirty" === n.status && t.dirty(),
              e(n.value).then(() => ({ status: t.value, value: n.value })))
        );
    }
    if ("transform" === r.type) {
      if (!1 === n.common.async) {
        const e = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        if (!vn(e)) return e;
        const i = r.transform(e.value, o);
        if (i instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return { status: t.value, value: i };
      }
      return this._def.schema
        ._parseAsync({ data: n.data, path: n.path, parent: n })
        .then((e) =>
          vn(e)
            ? Promise.resolve(r.transform(e.value, o)).then((e) => ({
                status: t.value,
                value: e,
              }))
            : e
        );
    }
    tn.assertNever(r);
  }
}
(pr.create = (e, t, n) =>
  new pr({ schema: e, typeName: kr.ZodEffects, effect: t, ...Tn(n) })),
  (pr.createWithPreprocess = (e, t, n) =>
    new pr({
      schema: t,
      effect: { type: "preprocess", transform: e },
      typeName: kr.ZodEffects,
      ...Tn(n),
    }));
class hr extends Sn {
  _parse(e) {
    return this._getType(e) === rn.undefined
      ? mn(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
hr.create = (e, t) =>
  new hr({ innerType: e, typeName: kr.ZodOptional, ...Tn(t) });
class fr extends Sn {
  _parse(e) {
    return this._getType(e) === rn.null
      ? mn(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
fr.create = (e, t) =>
  new fr({ innerType: e, typeName: kr.ZodNullable, ...Tn(t) });
class gr extends Sn {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let n = t.data;
    return (
      t.parsedType === rn.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({ data: n, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
gr.create = (e, t) =>
  new gr({
    innerType: e,
    typeName: kr.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...Tn(t),
  });
class mr extends Sn {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = { ...t, common: { ...t.common, issues: [] } },
      r = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: { ...n },
      });
    return wn(r)
      ? r.then((e) => ({
          status: "valid",
          value:
            "valid" === e.status
              ? e.value
              : this._def.catchValue({
                  get error() {
                    return new sn(n.common.issues);
                  },
                  input: n.data,
                }),
        }))
      : {
          status: "valid",
          value:
            "valid" === r.status
              ? r.value
              : this._def.catchValue({
                  get error() {
                    return new sn(n.common.issues);
                  },
                  input: n.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
mr.create = (e, t) =>
  new mr({
    innerType: e,
    typeName: kr.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...Tn(t),
  });
class br extends Sn {
  _parse(e) {
    if (this._getType(e) !== rn.nan) {
      const t = this._getOrReturnCtx(e);
      return (
        pn(t, {
          code: an.invalid_type,
          expected: rn.nan,
          received: t.parsedType,
        }),
        fn
      );
    }
    return { status: "valid", value: e.data };
  }
}
br.create = (e) => new br({ typeName: kr.ZodNaN, ...Tn(e) });
const yr = Symbol("zod_brand");
class vr extends Sn {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = t.data;
    return this._def.type._parse({ data: n, path: t.path, parent: t });
  }
  unwrap() {
    return this._def.type;
  }
}
class wr extends Sn {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.common.async) {
      return (async () => {
        const e = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return "aborted" === e.status
          ? fn
          : "dirty" === e.status
          ? (t.dirty(), gn(e.value))
          : this._def.out._parseAsync({
              data: e.value,
              path: n.path,
              parent: n,
            });
      })();
    }
    {
      const e = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n,
      });
      return "aborted" === e.status
        ? fn
        : "dirty" === e.status
        ? (t.dirty(), { status: "dirty", value: e.value })
        : this._def.out._parseSync({ data: e.value, path: n.path, parent: n });
    }
  }
  static create(e, t) {
    return new wr({ in: e, out: t, typeName: kr.ZodPipeline });
  }
}
const xr = (e, t = {}, n) =>
    e
      ? Fn.create().superRefine((r, o) => {
          var i, a;
          if (!e(r)) {
            const e =
                "function" == typeof t
                  ? t(r)
                  : "string" == typeof t
                  ? { message: t }
                  : t,
              s =
                null === (a = null !== (i = e.fatal) && void 0 !== i ? i : n) ||
                void 0 === a ||
                a,
              l = "string" == typeof e ? { message: e } : e;
            o.addIssue({ code: "custom", ...l, fatal: s });
          }
        })
      : Fn.create(),
  _r = { object: Kn.lazycreate };
var kr;
!(function (e) {
  (e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodSymbol = "ZodSymbol"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodCatch = "ZodCatch"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded"),
    (e.ZodPipeline = "ZodPipeline");
})(kr || (kr = {}));
const Tr = Rn.create,
  Sr = Mn.create,
  Cr = br.create,
  Er = jn.create,
  Ir = zn.create,
  $r = Dn.create,
  Ar = Bn.create,
  Pr = Zn.create,
  Nr = Un.create,
  Or = Fn.create,
  Rr = Hn.create,
  Lr = Vn.create,
  Mr = Gn.create,
  jr = qn.create,
  zr = Kn.create,
  Dr = Kn.strictCreate,
  Br = Yn.create,
  Zr = Jn.create,
  Ur = er.create,
  Fr = tr.create,
  Hr = nr.create,
  Vr = rr.create,
  Gr = or.create,
  qr = ir.create,
  Wr = ar.create,
  Kr = sr.create,
  Yr = cr.create,
  Xr = dr.create,
  Jr = ur.create,
  Qr = pr.create,
  eo = hr.create,
  to = fr.create,
  no = pr.createWithPreprocess,
  ro = wr.create,
  oo = {
    string: (e) => Rn.create({ ...e, coerce: !0 }),
    number: (e) => Mn.create({ ...e, coerce: !0 }),
    boolean: (e) => zn.create({ ...e, coerce: !0 }),
    bigint: (e) => jn.create({ ...e, coerce: !0 }),
    date: (e) => Dn.create({ ...e, coerce: !0 }),
  },
  io = fn;
var ao = Object.freeze({
  __proto__: null,
  defaultErrorMap: ln,
  setErrorMap: function (e) {
    cn = e;
  },
  getErrorMap: dn,
  makeIssue: un,
  EMPTY_PATH: [],
  addIssueToContext: pn,
  ParseStatus: hn,
  INVALID: fn,
  DIRTY: gn,
  OK: mn,
  isAborted: bn,
  isDirty: yn,
  isValid: vn,
  isAsync: wn,
  get util() {
    return tn;
  },
  get objectUtil() {
    return nn;
  },
  ZodParsedType: rn,
  getParsedType: on,
  ZodType: Sn,
  ZodString: Rn,
  ZodNumber: Mn,
  ZodBigInt: jn,
  ZodBoolean: zn,
  ZodDate: Dn,
  ZodSymbol: Bn,
  ZodUndefined: Zn,
  ZodNull: Un,
  ZodAny: Fn,
  ZodUnknown: Hn,
  ZodNever: Vn,
  ZodVoid: Gn,
  ZodArray: qn,
  ZodObject: Kn,
  ZodUnion: Yn,
  ZodDiscriminatedUnion: Jn,
  ZodIntersection: er,
  ZodTuple: tr,
  ZodRecord: nr,
  ZodMap: rr,
  ZodSet: or,
  ZodFunction: ir,
  ZodLazy: ar,
  ZodLiteral: sr,
  ZodEnum: cr,
  ZodNativeEnum: dr,
  ZodPromise: ur,
  ZodEffects: pr,
  ZodTransformer: pr,
  ZodOptional: hr,
  ZodNullable: fr,
  ZodDefault: gr,
  ZodCatch: mr,
  ZodNaN: br,
  BRAND: yr,
  ZodBranded: vr,
  ZodPipeline: wr,
  custom: xr,
  Schema: Sn,
  ZodSchema: Sn,
  late: _r,
  get ZodFirstPartyTypeKind() {
    return kr;
  },
  coerce: oo,
  any: Or,
  array: jr,
  bigint: Er,
  boolean: Ir,
  date: $r,
  discriminatedUnion: Zr,
  effect: Qr,
  enum: Yr,
  function: qr,
  instanceof: (e, t = { message: `Input not instance of ${e.name}` }) =>
    xr((t) => t instanceof e, t),
  intersection: Ur,
  lazy: Wr,
  literal: Kr,
  map: Vr,
  nan: Cr,
  nativeEnum: Xr,
  never: Lr,
  null: Nr,
  nullable: to,
  number: Sr,
  object: zr,
  oboolean: () => Ir().optional(),
  onumber: () => Sr().optional(),
  optional: eo,
  ostring: () => Tr().optional(),
  pipeline: ro,
  preprocess: no,
  promise: Jr,
  record: Hr,
  set: Gr,
  strictObject: Dr,
  string: Tr,
  symbol: Ar,
  transformer: Qr,
  tuple: Fr,
  undefined: Pr,
  union: Br,
  unknown: Rr,
  void: Mr,
  NEVER: io,
  ZodIssueCode: an,
  quotelessJson: (e) =>
    JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  ZodError: sn,
});
const so = ao.object({
    id: ao.string(),
    groupId: ao.string(),
    outgoingEdgeId: ao.string().optional(),
  }),
  lo = ao.object({ variableId: ao.string().optional() }),
  co = ao.object({
    id: ao.string(),
    createdAt: ao.date(),
    workspaceId: ao.string(),
    name: ao.string(),
    iv: ao.string(),
  });
let uo = (function (e) {
  return (
    (e[(e.BUTTON = 0)] = "BUTTON"),
    (e[(e.CONDITION = 1)] = "CONDITION"),
    (e[(e.AB_TEST = 2)] = "AB_TEST"),
    (e[(e.PICTURE_CHOICE = 3)] = "PICTURE_CHOICE"),
    e
  );
})({});
const po = ao.object({
  id: ao.string(),
  blockId: ao.string().optional().describe("Deprecated"),
  outgoingEdgeId: ao.string().optional(),
});
let ho = (function (e) {
    return (e.OR = "OR"), (e.AND = "AND"), e;
  })({}),
  fo = (function (e) {
    return (
      (e.EQUAL = "Equal to"),
      (e.NOT_EQUAL = "Not equal"),
      (e.CONTAINS = "Contains"),
      (e.NOT_CONTAINS = "Does not contain"),
      (e.GREATER = "Greater than"),
      (e.LESS = "Less than"),
      (e.IS_SET = "Is set"),
      (e.IS_EMPTY = "Is empty"),
      (e.STARTS_WITH = "Starts with"),
      (e.ENDS_WITH = "Ends with"),
      (e.MATCHES_REGEX = "Matches regex"),
      (e.NOT_MATCH_REGEX = "Does not match regex"),
      e
    );
  })({});
const go = ao.object({
    id: ao.string(),
    variableId: ao.string().optional(),
    comparisonOperator: ao.nativeEnum(fo).optional(),
    value: ao.string().optional(),
  }),
  mo = ao.object({
    logicalOperator: ao.nativeEnum(ho),
    comparisons: ao.array(go),
  }),
  bo = po.merge(ao.object({ type: ao.literal(uo.CONDITION), content: mo }));
so.merge(ao.object({ type: ao.enum([Oe.CONDITION]), items: ao.array(bo) })),
  ho.AND;
const yo = ao.object({ link: ao.string() }),
  vo = ao
    .object({ type: ao.literal("image"), image: yo })
    .or(ao.object({ type: ao.literal("video"), video: yo }))
    .or(ao.object({ type: ao.literal("text"), text: ao.string() })),
  wo = ao.object({ text: ao.string() }),
  xo = ao.object({
    buttons: ao.array(
      ao.object({
        type: ao.literal("reply"),
        reply: ao.object({ id: ao.string(), title: ao.string() }),
      })
    ),
  }),
  _o = ao.object({
    name: ao.string(),
    language: ao.object({ code: ao.string() }),
  }),
  ko = ao.object({
    type: ao.literal("button"),
    header: vo.optional(),
    body: wo.optional(),
    action: xo,
  });
ao.discriminatedUnion("type", [
  ao.object({
    type: ao.literal("text"),
    text: ao.object({
      body: ao.string(),
      preview_url: ao.boolean().optional(),
    }),
    preview_url: ao.boolean().optional(),
  }),
  ao.object({ type: ao.literal("image"), image: yo }),
  ao.object({ type: ao.literal("audio"), audio: yo }),
  ao.object({ type: ao.literal("video"), video: yo }),
  ao.object({ type: ao.literal("interactive"), interactive: ko }),
  ao.object({ type: ao.literal("template"), template: _o }),
]);
const To = ao.discriminatedUnion("type", [
  ao.object({
    from: ao.string(),
    type: ao.literal("text"),
    text: ao.object({ body: ao.string() }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("button"),
    button: ao.object({ text: ao.string(), payload: ao.string() }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("interactive"),
    interactive: ao.object({
      button_reply: ao.object({ id: ao.string(), title: ao.string() }),
    }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("image"),
    image: ao.object({ id: ao.string() }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("video"),
    video: ao.object({ id: ao.string() }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("audio"),
    audio: ao.object({ id: ao.string() }),
    timestamp: ao.string(),
  }),
  ao.object({
    from: ao.string(),
    type: ao.literal("document"),
    document: ao.object({ id: ao.string() }),
    timestamp: ao.string(),
  }),
]);
ao.object({
  entry: ao.array(
    ao.object({
      changes: ao.array(
        ao.object({
          value: ao.object({
            metadata: ao.object({ phone_number_id: ao.string() }),
            contacts: ao
              .array(ao.object({ profile: ao.object({ name: ao.string() }) }))
              .optional(),
            messages: ao.array(To).optional(),
          }),
        })
      ),
    })
  ),
}),
  ao
    .object({
      type: ao.literal("whatsApp"),
      data: ao.object({
        systemUserAccessToken: ao.string(),
        phoneNumberId: ao.string(),
      }),
    })
    .merge(co),
  ao.object({
    id: ao.string(),
    comparisonOperator: ao.nativeEnum(fo).optional(),
    value: ao.string().optional(),
  });
const So = ao.object({
    logicalOperator: ao.nativeEnum(ho),
    comparisons: ao.array(
      ao.object({
        id: ao.string(),
        comparisonOperator: ao.nativeEnum(fo).optional(),
        value: ao.string().optional(),
      })
    ),
  }),
  Co = ao.object({
    isEnabled: ao.boolean().optional(),
    startCondition: So.optional(),
    sessionExpiryTimeout: ao
      .number()
      .max(48)
      .min(0.01)
      .optional()
      .describe("Expiration delay in hours after latest interaction"),
  }),
  Eo = ao.object({
    isBrandingEnabled: ao.boolean(),
    isTypingEmulationEnabled: ao.boolean().optional(),
    isInputPrefillEnabled: ao.boolean().optional(),
    isHideQueryParamsEnabled: ao.boolean().optional(),
    isNewResultOnRefreshEnabled: ao.boolean().optional(),
    rememberUser: ao
      .object({
        isEnabled: ao.boolean().optional(),
        storage: ao.enum(["session", "local"]).optional(),
      })
      .optional(),
  }),
  Io = ao.object({
    enabled: ao.boolean(),
    speed: ao.number(),
    maxDelay: ao.number(),
  }),
  $o = ao.object({
    title: ao.string().optional(),
    description: ao.string().optional(),
    imageUrl: ao.string().optional(),
    favIconUrl: ao.string().optional(),
    customHeadCode: ao.string().optional(),
    googleTagManagerId: ao.string().optional(),
  });
ao.object({
  general: Eo,
  typingEmulation: Io,
  metadata: $o,
  whatsApp: Co.optional(),
});
const Ao = ({ isBrandingEnabled: e }) => ({
    general: {
      isBrandingEnabled: e,
      rememberUser: { isEnabled: !1 },
      isInputPrefillEnabled: !0,
      isHideQueryParamsEnabled: !0,
    },
    typingEmulation: { enabled: !0, speed: 300, maxDelay: 1.5 },
    metadata: {
      description:
        "Build beautiful conversational forms and embed them directly in your applications without a line of code. Triple your response rate and collect answers that has more value compared to a traditional form.",
    },
  }),
  Po = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div>'
  );
let No;
const Oo = (e) => {
  let t;
  const [n, r] = _(!0),
    o = () => {
      n() &&
        (r(!1),
        setTimeout(() => {
          e.onTransitionEnd(t?.offsetTop);
        }, 400));
    };
  return (
    E(() => {
      if (!n) return;
      const t = en(e.content.richText),
        r =
          !1 === e.typingEmulation?.enabled
            ? 0
            : (({
                bubbleContent: e,
                typingSettings: t = Ao({ isBrandingEnabled: !1 })
                  .typingEmulation,
              }) => {
                let n = e.match(/(\w+)/g)?.length ?? 0;
                0 === n && (n = e.length);
                const r = t.speed;
                let o = t.enabled ? (n / r) * 6e4 : 0;
                return o > 1e3 * t.maxDelay && (o = 1e3 * t.maxDelay), o;
              })({ bubbleContent: t, typingSettings: e.typingEmulation });
      No = setTimeout(o, r);
    }),
    I(() => {
      No && clearTimeout(No);
    }),
    (() => {
      const r = Po(),
        o = r.firstChild.firstChild.firstChild,
        i = o.nextSibling;
      return (
        "function" == typeof t ? me(t, r) : (t = r),
        be(
          o,
          (() => {
            const e = S(() => !!n());
            return () => e() && V(Ct, {});
          })()
        ),
        be(
          i,
          V(ee, {
            get each() {
              return e.content.richText;
            },
            children: (e) => V(Jt, { element: e }),
          })
        ),
        k(
          (e) => {
            const t = n() ? "64px" : "100%",
              r = n() ? "32px" : "100%",
              a = Fe(
                "overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis",
                n() ? "opacity-0" : "opacity-100"
              ),
              s = n() ? (mt() ? "16px" : "20px") : "100%";
            return (
              t !== e._v$ &&
                (null != (e._v$ = t)
                  ? o.style.setProperty("width", t)
                  : o.style.removeProperty("width")),
              r !== e._v$2 &&
                (null != (e._v$2 = r)
                  ? o.style.setProperty("height", r)
                  : o.style.removeProperty("height")),
              a !== e._v$3 && fe(i, (e._v$3 = a)),
              s !== e._v$4 &&
                (null != (e._v$4 = s)
                  ? i.style.setProperty("height", s)
                  : i.style.removeProperty("height")),
              e
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        r
      );
    })()
  );
};
let Ro = (function (e) {
  return (e.URL = "url"), (e.YOUTUBE = "youtube"), (e.VIMEO = "vimeo"), e;
})({});
const Lo = ue("<video autoplay controls>"),
  Mo = ue(
    '<div><iframe class="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'
  ),
  jo = ue(
    '<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble overflow-hidden w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">'
  );
let zo;
const Do = (e) => {
    let t;
    const [n, r] = _(!0);
    return (
      E(() => {
        const o =
          e.content?.type && [Ro.VIMEO, Ro.YOUTUBE].includes(e.content?.type)
            ? 2e3
            : 100;
        zo = setTimeout(() => {
          n() &&
            (r(!1),
            setTimeout(() => {
              e.onTransitionEnd(t?.offsetTop);
            }, 400));
        }, o);
      }),
      I(() => {
        zo && clearTimeout(zo);
      }),
      (() => {
        const r = jo(),
          o = r.firstChild.firstChild,
          i = o.firstChild;
        return (
          "function" == typeof t ? me(t, r) : (t = r),
          be(
            i,
            (() => {
              const e = S(() => !!n());
              return () => e() && V(Ct, {});
            })()
          ),
          be(
            o,
            V(ne, {
              get children() {
                return [
                  V(re, {
                    get when() {
                      return e.content?.type && e.content.type === Ro.URL;
                    },
                    get children() {
                      const t = Lo();
                      return (
                        k(
                          (r) => {
                            const o = e.content.url,
                              i =
                                "p-4 focus:outline-none w-full z-10 text-fade-in rounded-md " +
                                (n() ? "opacity-0" : "opacity-100"),
                              a = n() ? (mt() ? "32px" : "36px") : "auto";
                            return (
                              o !== r._v$ && he(t, "src", (r._v$ = o)),
                              i !== r._v$2 && fe(t, (r._v$2 = i)),
                              a !== r._v$3 &&
                                (null != (r._v$3 = a)
                                  ? t.style.setProperty("height", a)
                                  : t.style.removeProperty("height")),
                              r
                            );
                          },
                          { _v$: void 0, _v$2: void 0, _v$3: void 0 }
                        ),
                        t
                      );
                    },
                  }),
                  V(re, {
                    get when() {
                      return (
                        S(() => !!e.content?.type)() &&
                        [Ro.VIMEO, Ro.YOUTUBE].includes(e.content.type)
                      );
                    },
                    get children() {
                      const t = Mo(),
                        r = t.firstChild;
                      return (
                        k(
                          (o) => {
                            const i = Fe(
                                "p-4 z-10 text-fade-in w-full",
                                n() ? "opacity-0" : "opacity-100 p-4"
                              ),
                              a = n()
                                ? mt()
                                  ? "32px"
                                  : "36px"
                                : `${e.content.height ?? "400"}px`,
                              s = `${
                                e.content.type === Ro.VIMEO
                                  ? "https://player.vimeo.com/video"
                                  : "https://www.youtube.com/embed"
                              }/${e.content.id}`;
                            return (
                              i !== o._v$4 && fe(t, (o._v$4 = i)),
                              a !== o._v$5 &&
                                (null != (o._v$5 = a)
                                  ? t.style.setProperty("height", a)
                                  : t.style.removeProperty("height")),
                              s !== o._v$6 && he(r, "src", (o._v$6 = s)),
                              o
                            );
                          },
                          { _v$4: void 0, _v$5: void 0, _v$6: void 0 }
                        ),
                        t
                      );
                    },
                  }),
                ];
              },
            }),
            null
          ),
          k(
            (e) => {
              const t = n() ? "64px" : "100%",
                r = n() ? "32px" : "100%";
              return (
                t !== e._v$7 &&
                  (null != (e._v$7 = t)
                    ? i.style.setProperty("width", t)
                    : i.style.removeProperty("width")),
                r !== e._v$8 &&
                  (null != (e._v$8 = r)
                    ? i.style.setProperty("height", r)
                    : i.style.removeProperty("height")),
                e
              );
            },
            { _v$7: void 0, _v$8: void 0 }
          ),
          r
        );
      })()
    );
  },
  Bo = (e) => {
    const t = (t) => {
      e.onTransitionEnd(t);
    };
    return V(ne, {
      get children() {
        return [
          V(re, {
            get when() {
              return e.message.type === Ne.TEXT;
            },
            get children() {
              return V(Oo, {
                get content() {
                  return e.message.content;
                },
                get typingEmulation() {
                  return e.typingEmulation;
                },
                onTransitionEnd: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.message.type === Ne.IMAGE;
            },
            get children() {
              return V(Ut, {
                get content() {
                  return e.message.content;
                },
                onTransitionEnd: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.message.type === Ne.VIDEO;
            },
            get children() {
              return V(Do, {
                get content() {
                  return e.message.content;
                },
                onTransitionEnd: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.message.type === Ne.EMBED;
            },
            get children() {
              return V(Mt, {
                get content() {
                  return e.message.content;
                },
                onTransitionEnd: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.message.type === Ne.AUDIO;
            },
            get children() {
              return V(Ot, {
                get content() {
                  return e.message.content;
                },
                onTransitionEnd: t,
              });
            },
          }),
        ];
      },
    });
  },
  Zo = ue(
    '<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'
  ),
  Uo = () =>
    (() => {
      const e = Zo(),
        t = e.firstChild;
      return (
        k(
          (n) => {
            const r =
                "flex justify-center items-center rounded-full text-white relative " +
                (mt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
              o =
                "absolute top-0 left-0 " +
                (mt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
            return (
              r !== n._v$ && fe(e, (n._v$ = r)),
              o !== n._v$2 && he(t, "class", (n._v$2 = o)),
              n
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        e
      );
    })(),
  Fo = ue(
    '<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full" elementtiming="Bot avatar" fetchpriority="high">'
  ),
  Ho = (e) => {
    const [t, n] = _(e.initialAvatarSrc);
    return (
      T(() => {
        t()?.startsWith("{{") &&
          e.initialAvatarSrc?.startsWith("http") &&
          n(e.initialAvatarSrc);
      }),
      V(te, {
        get when() {
          return ze(t());
        },
        keyed: !0,
        get fallback() {
          return V(Uo, {});
        },
        get children() {
          const e = Fo(),
            n = e.firstChild;
          return (
            k(
              (r) => {
                const o =
                    "flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 " +
                    (mt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                  i = t();
                return (
                  o !== r._v$ && fe(e, (r._v$ = o)),
                  i !== r._v$2 && he(n, "src", (r._v$2 = i)),
                  r
                );
              },
              { _v$: void 0, _v$2: void 0 }
            ),
            e
          );
        },
      })
    );
  },
  Vo = ue(
    '<div class="flex justify-end items-end animate-fade-in gap-2 guest-container"><span class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble" data-testid="guest-bubble">'
  ),
  Go = (e) =>
    (() => {
      const t = Vo(),
        n = t.firstChild;
      return (
        t.style.setProperty("margin-left", "50px"),
        be(n, () => e.message),
        be(
          t,
          V(te, {
            get when() {
              return e.showAvatar;
            },
            get children() {
              return V(Ho, {
                get initialAvatarSrc() {
                  return e.avatarSrc;
                },
              });
            },
          }),
          null
        ),
        t
      );
    })(),
  qo = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  Wo = (e) => {
    const [t, n] = _(e.defaultValue ?? "");
    let r;
    const o = (e) => n(e),
      i = () => {
        "" !== t() && r?.reportValidity() && e.onSubmit({ value: t() });
      },
      a = (t) => {
        e.block.options.isLong || ("Enter" === t.key && i());
      },
      s = (t) => {
        e.block.options.isLong &&
          "Enter" === t.key &&
          (t.metaKey || t.ctrlKey) &&
          i();
      };
    E(() => {
      !mt() && r && r.focus(), window.addEventListener("message", l);
    }),
      I(() => {
        window.removeEventListener("message", l);
      });
    const l = (e) => {
      const { data: t } = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value);
    };
    return (() => {
      const n = qo();
      return (
        (n.$$keydown = a),
        be(
          n,
          (() => {
            const n = S(() => !!e.block.options.isLong);
            return () =>
              n()
                ? V(At, {
                    ref(e) {
                      "function" == typeof r ? r(e) : (r = e);
                    },
                    onInput: o,
                    onKeyDown: s,
                    get value() {
                      return t();
                    },
                    get placeholder() {
                      return (
                        e.block.options?.labels?.placeholder ??
                        "Type your answer..."
                      );
                    },
                  })
                : V(It, {
                    ref(e) {
                      "function" == typeof r ? r(e) : (r = e);
                    },
                    onInput: o,
                    get value() {
                      return t();
                    },
                    get placeholder() {
                      return (
                        e.block.options?.labels?.placeholder ??
                        "Type your answer..."
                      );
                    },
                  });
          })(),
          null
        ),
        be(
          n,
          V(Tt, {
            type: "button",
            get isDisabled() {
              return "" === t();
            },
            class: "my-2 ml-2",
            "on:click": i,
            get children() {
              return e.block.options?.labels?.button ?? "Send";
            },
          }),
          null
        ),
        k(() =>
          null != (e.block.options.isLong ? void 0 : "350px")
            ? n.style.setProperty(
                "max-width",
                e.block.options.isLong ? void 0 : "350px"
              )
            : n.style.removeProperty("max-width")
        ),
        n
      );
    })();
  };
pe(["keydown"]);
const Ko = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="number">'
  ),
  Yo = (e) => {
    const [t, n] = _(e.defaultValue ?? ""),
      [r, o, i] = [
        C((a = () => t())),
        function (e) {
          T(function () {
            const t = a();
            if (null == t) return void (e.value = t);
            const n = e.value;
            ((0 === t && "" === n) || t != n) && (e.value = t + "");
          });
        },
        function (e) {
          return e.validity.badInput
            ? a()
            : "" != e.value
            ? e.valueAsNumber
            : void 0;
        },
      ];
    var a;
    let s;
    const l = () => {
        "" !== t() &&
          s?.reportValidity() &&
          e.onSubmit({ value: t().toString() });
      },
      c = (e) => {
        "Enter" === e.key && l();
      };
    E(() => {
      !mt() && s && s.focus(), window.addEventListener("message", d);
    }),
      I(() => {
        window.removeEventListener("message", d);
      });
    const d = (e) => {
      const { data: t } = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value);
    };
    return (() => {
      const a = Ko(),
        d = a.firstChild;
      (a.$$keydown = c),
        a.style.setProperty("max-width", "350px"),
        (d.$$input = (e) => {
          n(i(e.currentTarget));
        }),
        me(o, d, () => !0);
      return (
        "function" == typeof s ? me(s, d) : (s = d),
        d.style.setProperty("font-size", "16px"),
        d.style.setProperty("appearance", "auto"),
        (d.value = r),
        be(
          a,
          V(Tt, {
            type: "button",
            get isDisabled() {
              return "" === t();
            },
            class: "my-2 ml-2",
            "on:click": l,
            get children() {
              return e.block.options?.labels?.button ?? "Send";
            },
          }),
          null
        ),
        k(
          (t) => {
            const n =
                e.block.options?.labels?.placeholder ?? "Type your answer...",
              r = e.block.options?.min,
              o = e.block.options?.max,
              i = e.block.options?.step ?? "any";
            return (
              n !== t._v$ && he(d, "placeholder", (t._v$ = n)),
              r !== t._v$2 && he(d, "min", (t._v$2 = r)),
              o !== t._v$3 && he(d, "max", (t._v$3 = o)),
              i !== t._v$4 && he(d, "step", (t._v$4 = i)),
              t
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        a
      );
    })();
  };
pe(["keydown", "input"]);
const Xo = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  Jo = (e) => {
    const [t, n] = _(e.defaultValue ?? "");
    let r;
    const o = (e) => n(e),
      i = () => {
        "" !== t() && r?.reportValidity() && e.onSubmit({ value: t() });
      },
      a = (e) => {
        "Enter" === e.key && i();
      };
    E(() => {
      !mt() && r && r.focus(), window.addEventListener("message", s);
    }),
      I(() => {
        window.removeEventListener("message", s);
      });
    const s = (e) => {
      const { data: t } = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value);
    };
    return (() => {
      const n = Xo();
      return (
        (n.$$keydown = a),
        n.style.setProperty("max-width", "350px"),
        be(
          n,
          V(It, {
            ref(e) {
              "function" == typeof r ? r(e) : (r = e);
            },
            get value() {
              return t();
            },
            get placeholder() {
              return (
                e.block.options?.labels?.placeholder ?? "Type your email..."
              );
            },
            onInput: o,
            type: "email",
            autocomplete: "email",
          }),
          null
        ),
        be(
          n,
          V(Tt, {
            type: "button",
            get isDisabled() {
              return "" === t();
            },
            class: "my-2 ml-2",
            "on:click": i,
            get children() {
              return e.block.options?.labels?.button ?? "Send";
            },
          }),
          null
        ),
        n
      );
    })();
  };
pe(["keydown"]);
const Qo = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  ei = (e) => {
    const [t, n] = _(e.defaultValue ?? "");
    let r;
    const o = (e) => {
        if (!e.startsWith("https://"))
          return "https:/" === e ? void 0 : n(`https://${e}`);
        n(e);
      },
      i = () => {
        "" !== t() && r?.reportValidity() && e.onSubmit({ value: t() });
      },
      a = (e) => {
        "Enter" === e.key && i();
      };
    E(() => {
      !mt() && r && r.focus(), window.addEventListener("message", s);
    }),
      I(() => {
        window.removeEventListener("message", s);
      });
    const s = (e) => {
      const { data: t } = e;
      t.isFromTypebot && "setInputValue" === t.command && n(t.value);
    };
    return (() => {
      const n = Qo();
      return (
        (n.$$keydown = a),
        n.style.setProperty("max-width", "350px"),
        be(
          n,
          V(It, {
            ref(e) {
              "function" == typeof r ? r(e) : (r = e);
            },
            get value() {
              return t();
            },
            get placeholder() {
              return e.block.options?.labels?.placeholder ?? "Type your URL...";
            },
            onInput: o,
            type: "url",
            autocomplete: "url",
          }),
          null
        ),
        be(
          n,
          V(Tt, {
            type: "button",
            get isDisabled() {
              return "" === t();
            },
            class: "my-2 ml-2",
            "on:click": i,
            get children() {
              return e.block.options?.labels?.button ?? "Send";
            },
          }),
          null
        ),
        n
      );
    })();
  };
pe(["keydown"]);
const ti = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9">'
  ),
  ni = (e) =>
    (() => {
      const t = ti();
      return ge(t, e, !0, !0), t;
    })(),
  ri = [
    { name: "International", flag: "🌐", code: "INT", dial_code: null },
    { name: "Afghanistan", flag: "🇦🇫", code: "AF", dial_code: "+93" },
    { name: "Åland Islands", flag: "🇦🇽", code: "AX", dial_code: "+358" },
    { name: "Albania", flag: "🇦🇱", code: "AL", dial_code: "+355" },
    { name: "Algeria", flag: "🇩🇿", code: "DZ", dial_code: "+213" },
    { name: "American Samoa", flag: "🇦🇸", code: "AS", dial_code: "+1684" },
    { name: "Andorra", flag: "🇦🇩", code: "AD", dial_code: "+376" },
    { name: "Angola", flag: "🇦🇴", code: "AO", dial_code: "+244" },
    { name: "Anguilla", flag: "🇦🇮", code: "AI", dial_code: "+1264" },
    { name: "Antarctica", flag: "🇦🇶", code: "AQ", dial_code: "+672" },
    { name: "Antigua and Barbuda", flag: "🇦🇬", code: "AG", dial_code: "+1268" },
    { name: "Argentina", flag: "🇦🇷", code: "AR", dial_code: "+54" },
    { name: "Armenia", flag: "🇦🇲", code: "AM", dial_code: "+374" },
    { name: "Aruba", flag: "🇦🇼", code: "AW", dial_code: "+297" },
    { name: "Australia", flag: "🇦🇺", code: "AU", dial_code: "+61" },
    { name: "Austria", flag: "🇦🇹", code: "AT", dial_code: "+43" },
    { name: "Azerbaijan", flag: "🇦🇿", code: "AZ", dial_code: "+994" },
    { name: "Bahamas", flag: "🇧🇸", code: "BS", dial_code: "+1242" },
    { name: "Bahrain", flag: "🇧🇭", code: "BH", dial_code: "+973" },
    { name: "Bangladesh", flag: "🇧🇩", code: "BD", dial_code: "+880" },
    { name: "Barbados", flag: "🇧🇧", code: "BB", dial_code: "+1246" },
    { name: "Belarus", flag: "🇧🇾", code: "BY", dial_code: "+375" },
    { name: "Belgium", flag: "🇧🇪", code: "BE", dial_code: "+32" },
    { name: "Belize", flag: "🇧🇿", code: "BZ", dial_code: "+501" },
    { name: "Benin", flag: "🇧🇯", code: "BJ", dial_code: "+229" },
    { name: "Bermuda", flag: "🇧🇲", code: "BM", dial_code: "+1441" },
    { name: "Bhutan", flag: "🇧🇹", code: "BT", dial_code: "+975" },
    {
      name: "Bolivia, Plurinational State of bolivia",
      flag: "🇧🇴",
      code: "BO",
      dial_code: "+591",
    },
    {
      name: "Bosnia and Herzegovina",
      flag: "🇧🇦",
      code: "BA",
      dial_code: "+387",
    },
    { name: "Botswana", flag: "🇧🇼", code: "BW", dial_code: "+267" },
    { name: "Bouvet Island", flag: "🇧🇻", code: "BV", dial_code: "+47" },
    { name: "Brazil", flag: "🇧🇷", code: "BR", dial_code: "+55" },
    {
      name: "British Indian Ocean Territory",
      flag: "🇮🇴",
      code: "IO",
      dial_code: "+246",
    },
    { name: "Brunei Darussalam", flag: "🇧🇳", code: "BN", dial_code: "+673" },
    { name: "Bulgaria", flag: "🇧🇬", code: "BG", dial_code: "+359" },
    { name: "Burkina Faso", flag: "🇧🇫", code: "BF", dial_code: "+226" },
    { name: "Burundi", flag: "🇧🇮", code: "BI", dial_code: "+257" },
    { name: "Cambodia", flag: "🇰🇭", code: "KH", dial_code: "+855" },
    { name: "Cameroon", flag: "🇨🇲", code: "CM", dial_code: "+237" },
    { name: "Canada", flag: "🇨🇦", code: "CA", dial_code: "+1" },
    { name: "Cape Verde", flag: "🇨🇻", code: "CV", dial_code: "+238" },
    { name: "Cayman Islands", flag: "🇰🇾", code: "KY", dial_code: "+345" },
    {
      name: "Central African Republic",
      flag: "🇨🇫",
      code: "CF",
      dial_code: "+236",
    },
    { name: "Chad", flag: "🇹🇩", code: "TD", dial_code: "+235" },
    { name: "Chile", flag: "🇨🇱", code: "CL", dial_code: "+56" },
    { name: "China", flag: "🇨🇳", code: "CN", dial_code: "+86" },
    { name: "Christmas Island", flag: "🇨🇽", code: "CX", dial_code: "+61" },
    {
      name: "Cocos (Keeling) Islands",
      flag: "🇨🇨",
      code: "CC",
      dial_code: "+61",
    },
    { name: "Colombia", flag: "🇨🇴", code: "CO", dial_code: "+57" },
    { name: "Comoros", flag: "🇰🇲", code: "KM", dial_code: "+269" },
    { name: "Congo", flag: "🇨🇬", code: "CG", dial_code: "+242" },
    {
      name: "Congo, The Democratic Republic of the Congo",
      flag: "🇨🇩",
      code: "CD",
      dial_code: "+243",
    },
    { name: "Cook Islands", flag: "🇨🇰", code: "CK", dial_code: "+682" },
    { name: "Costa Rica", flag: "🇨🇷", code: "CR", dial_code: "+506" },
    { name: "Cote d'Ivoire", flag: "🇨🇮", code: "CI", dial_code: "+225" },
    { name: "Croatia", flag: "🇭🇷", code: "HR", dial_code: "+385" },
    { name: "Cuba", flag: "🇨🇺", code: "CU", dial_code: "+53" },
    { name: "Cyprus", flag: "🇨🇾", code: "CY", dial_code: "+357" },
    { name: "Czech Republic", flag: "🇨🇿", code: "CZ", dial_code: "+420" },
    { name: "Denmark", flag: "🇩🇰", code: "DK", dial_code: "+45" },
    { name: "Djibouti", flag: "🇩🇯", code: "DJ", dial_code: "+253" },
    { name: "Dominica", flag: "🇩🇲", code: "DM", dial_code: "+1767" },
    { name: "Dominican Republic", flag: "🇩🇴", code: "DO", dial_code: "+1849" },
    { name: "Ecuador", flag: "🇪🇨", code: "EC", dial_code: "+593" },
    { name: "Egypt", flag: "🇪🇬", code: "EG", dial_code: "+20" },
    { name: "El Salvador", flag: "🇸🇻", code: "SV", dial_code: "+503" },
    { name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ", dial_code: "+240" },
    { name: "Eritrea", flag: "🇪🇷", code: "ER", dial_code: "+291" },
    { name: "Estonia", flag: "🇪🇪", code: "EE", dial_code: "+372" },
    { name: "Ethiopia", flag: "🇪🇹", code: "ET", dial_code: "+251" },
    {
      name: "Falkland Islands (Malvinas)",
      flag: "🇫🇰",
      code: "FK",
      dial_code: "+500",
    },
    { name: "Faroe Islands", flag: "🇫🇴", code: "FO", dial_code: "+298" },
    { name: "Fiji", flag: "🇫🇯", code: "FJ", dial_code: "+679" },
    { name: "Finland", flag: "🇫🇮", code: "FI", dial_code: "+358" },
    { name: "France", flag: "🇫🇷", code: "FR", dial_code: "+33" },
    { name: "French Guiana", flag: "🇬🇫", code: "GF", dial_code: "+594" },
    { name: "French Polynesia", flag: "🇵🇫", code: "PF", dial_code: "+689" },
    {
      name: "French Southern Territories",
      flag: "🇹🇫",
      code: "TF",
      dial_code: "+262",
    },
    { name: "Gabon", flag: "🇬🇦", code: "GA", dial_code: "+241" },
    { name: "Gambia", flag: "🇬🇲", code: "GM", dial_code: "+220" },
    { name: "Georgia", flag: "🇬🇪", code: "GE", dial_code: "+995" },
    { name: "Germany", flag: "🇩🇪", code: "DE", dial_code: "+49" },
    { name: "Ghana", flag: "🇬🇭", code: "GH", dial_code: "+233" },
    { name: "Gibraltar", flag: "🇬🇮", code: "GI", dial_code: "+350" },
    { name: "Greece", flag: "🇬🇷", code: "GR", dial_code: "+30" },
    { name: "Greenland", flag: "🇬🇱", code: "GL", dial_code: "+299" },
    { name: "Grenada", flag: "🇬🇩", code: "GD", dial_code: "+1473" },
    { name: "Guadeloupe", flag: "🇬🇵", code: "GP", dial_code: "+590" },
    { name: "Guam", flag: "🇬🇺", code: "GU", dial_code: "+1671" },
    { name: "Guatemala", flag: "🇬🇹", code: "GT", dial_code: "+502" },
    { name: "Guernsey", flag: "🇬🇬", code: "GG", dial_code: "+44" },
    { name: "Guinea", flag: "🇬🇳", code: "GN", dial_code: "+224" },
    { name: "Guinea-Bissau", flag: "🇬🇼", code: "GW", dial_code: "+245" },
    { name: "Guyana", flag: "🇬🇾", code: "GY", dial_code: "+592" },
    { name: "Haiti", flag: "🇭🇹", code: "HT", dial_code: "+509" },
    {
      name: "Heard Island and Mcdonald Islands",
      flag: "🇭🇲",
      code: "HM",
      dial_code: "+672",
    },
    {
      name: "Holy See (Vatican City State)",
      flag: "🇻🇦",
      code: "VA",
      dial_code: "+379",
    },
    { name: "Honduras", flag: "🇭🇳", code: "HN", dial_code: "+504" },
    { name: "Hong Kong", flag: "🇭🇰", code: "HK", dial_code: "+852" },
    { name: "Hungary", flag: "🇭🇺", code: "HU", dial_code: "+36" },
    { name: "Iceland", flag: "🇮🇸", code: "IS", dial_code: "+354" },
    { name: "India", flag: "🇮🇳", code: "IN", dial_code: "+91" },
    { name: "Indonesia", flag: "🇮🇩", code: "ID", dial_code: "+62" },
    {
      name: "Iran, Islamic Republic of Persian Gulf",
      flag: "🇮🇷",
      code: "IR",
      dial_code: "+98",
    },
    { name: "Iraq", flag: "🇮🇶", code: "IQ", dial_code: "+964" },
    { name: "Ireland", flag: "🇮🇪", code: "IE", dial_code: "+353" },
    { name: "Isle of Man", flag: "🇮🇲", code: "IM", dial_code: "+44" },
    { name: "Israel", flag: "🇮🇱", code: "IL", dial_code: "+972" },
    { name: "Italy", flag: "🇮🇹", code: "IT", dial_code: "+39" },
    { name: "Jamaica", flag: "🇯🇲", code: "JM", dial_code: "+1876" },
    { name: "Japan", flag: "🇯🇵", code: "JP", dial_code: "+81" },
    { name: "Jersey", flag: "🇯🇪", code: "JE", dial_code: "+44" },
    { name: "Jordan", flag: "🇯🇴", code: "JO", dial_code: "+962" },
    { name: "Kazakhstan", flag: "🇰🇿", code: "KZ", dial_code: "+7" },
    { name: "Kenya", flag: "🇰🇪", code: "KE", dial_code: "+254" },
    { name: "Kiribati", flag: "🇰🇮", code: "KI", dial_code: "+686" },
    {
      name: "Korea, Democratic People's Republic of Korea",
      flag: "🇰🇵",
      code: "KP",
      dial_code: "+850",
    },
    {
      name: "Korea, Republic of South Korea",
      flag: "🇰🇷",
      code: "KR",
      dial_code: "+82",
    },
    { name: "Kosovo", flag: "🇽🇰", code: "XK", dial_code: "+383" },
    { name: "Kuwait", flag: "🇰🇼", code: "KW", dial_code: "+965" },
    { name: "Kyrgyzstan", flag: "🇰🇬", code: "KG", dial_code: "+996" },
    { name: "Laos", flag: "🇱🇦", code: "LA", dial_code: "+856" },
    { name: "Latvia", flag: "🇱🇻", code: "LV", dial_code: "+371" },
    { name: "Lebanon", flag: "🇱🇧", code: "LB", dial_code: "+961" },
    { name: "Lesotho", flag: "🇱🇸", code: "LS", dial_code: "+266" },
    { name: "Liberia", flag: "🇱🇷", code: "LR", dial_code: "+231" },
    {
      name: "Libyan Arab Jamahiriya",
      flag: "🇱🇾",
      code: "LY",
      dial_code: "+218",
    },
    { name: "Liechtenstein", flag: "🇱🇮", code: "LI", dial_code: "+423" },
    { name: "Lithuania", flag: "🇱🇹", code: "LT", dial_code: "+370" },
    { name: "Luxembourg", flag: "🇱🇺", code: "LU", dial_code: "+352" },
    { name: "Macao", flag: "🇲🇴", code: "MO", dial_code: "+853" },
    { name: "Macedonia", flag: "🇲🇰", code: "MK", dial_code: "+389" },
    { name: "Madagascar", flag: "🇲🇬", code: "MG", dial_code: "+261" },
    { name: "Malawi", flag: "🇲🇼", code: "MW", dial_code: "+265" },
    { name: "Malaysia", flag: "🇲🇾", code: "MY", dial_code: "+60" },
    { name: "Maldives", flag: "🇲🇻", code: "MV", dial_code: "+960" },
    { name: "Mali", flag: "🇲🇱", code: "ML", dial_code: "+223" },
    { name: "Malta", flag: "🇲🇹", code: "MT", dial_code: "+356" },
    { name: "Marshall Islands", flag: "🇲🇭", code: "MH", dial_code: "+692" },
    { name: "Martinique", flag: "🇲🇶", code: "MQ", dial_code: "+596" },
    { name: "Mauritania", flag: "🇲🇷", code: "MR", dial_code: "+222" },
    { name: "Mauritius", flag: "🇲🇺", code: "MU", dial_code: "+230" },
    { name: "Mayotte", flag: "🇾🇹", code: "YT", dial_code: "+262" },
    { name: "Mexico", flag: "🇲🇽", code: "MX", dial_code: "+52" },
    {
      name: "Micronesia, Federated States of Micronesia",
      flag: "🇫🇲",
      code: "FM",
      dial_code: "+691",
    },
    { name: "Moldova", flag: "🇲🇩", code: "MD", dial_code: "+373" },
    { name: "Monaco", flag: "🇲🇨", code: "MC", dial_code: "+377" },
    { name: "Mongolia", flag: "🇲🇳", code: "MN", dial_code: "+976" },
    { name: "Montenegro", flag: "🇲🇪", code: "ME", dial_code: "+382" },
    { name: "Montserrat", flag: "🇲🇸", code: "MS", dial_code: "+1664" },
    { name: "Morocco", flag: "🇲🇦", code: "MA", dial_code: "+212" },
    { name: "Mozambique", flag: "🇲🇿", code: "MZ", dial_code: "+258" },
    { name: "Myanmar", flag: "🇲🇲", code: "MM", dial_code: "+95" },
    { name: "Namibia", flag: "🇳🇦", code: "NA", dial_code: "+264" },
    { name: "Nauru", flag: "🇳🇷", code: "NR", dial_code: "+674" },
    { name: "Nepal", flag: "🇳🇵", code: "NP", dial_code: "+977" },
    { name: "Netherlands", flag: "🇳🇱", code: "NL", dial_code: "+31" },
    { name: "Netherlands Antilles", flag: "", code: "AN", dial_code: "+599" },
    { name: "New Caledonia", flag: "🇳🇨", code: "NC", dial_code: "+687" },
    { name: "New Zealand", flag: "🇳🇿", code: "NZ", dial_code: "+64" },
    { name: "Nicaragua", flag: "🇳🇮", code: "NI", dial_code: "+505" },
    { name: "Niger", flag: "🇳🇪", code: "NE", dial_code: "+227" },
    { name: "Nigeria", flag: "🇳🇬", code: "NG", dial_code: "+234" },
    { name: "Niue", flag: "🇳🇺", code: "NU", dial_code: "+683" },
    { name: "Norfolk Island", flag: "🇳🇫", code: "NF", dial_code: "+672" },
    {
      name: "Northern Mariana Islands",
      flag: "🇲🇵",
      code: "MP",
      dial_code: "+1670",
    },
    { name: "Norway", flag: "🇳🇴", code: "NO", dial_code: "+47" },
    { name: "Oman", flag: "🇴🇲", code: "OM", dial_code: "+968" },
    { name: "Pakistan", flag: "🇵🇰", code: "PK", dial_code: "+92" },
    { name: "Palau", flag: "🇵🇼", code: "PW", dial_code: "+680" },
    {
      name: "Palestinian Territory, Occupied",
      flag: "🇵🇸",
      code: "PS",
      dial_code: "+970",
    },
    { name: "Panama", flag: "🇵🇦", code: "PA", dial_code: "+507" },
    { name: "Papua New Guinea", flag: "🇵🇬", code: "PG", dial_code: "+675" },
    { name: "Paraguay", flag: "🇵🇾", code: "PY", dial_code: "+595" },
    { name: "Peru", flag: "🇵🇪", code: "PE", dial_code: "+51" },
    { name: "Philippines", flag: "🇵🇭", code: "PH", dial_code: "+63" },
    { name: "Pitcairn", flag: "🇵🇳", code: "PN", dial_code: "+64" },
    { name: "Poland", flag: "🇵🇱", code: "PL", dial_code: "+48" },
    { name: "Portugal", flag: "🇵🇹", code: "PT", dial_code: "+351" },
    { name: "Puerto Rico", flag: "🇵🇷", code: "PR", dial_code: "+1939" },
    { name: "Qatar", flag: "🇶🇦", code: "QA", dial_code: "+974" },
    { name: "Romania", flag: "🇷🇴", code: "RO", dial_code: "+40" },
    { name: "Russia", flag: "🇷🇺", code: "RU", dial_code: "+7" },
    { name: "Rwanda", flag: "🇷🇼", code: "RW", dial_code: "+250" },
    { name: "Reunion", flag: "🇷🇪", code: "RE", dial_code: "+262" },
    { name: "Saint Barthelemy", flag: "🇧🇱", code: "BL", dial_code: "+590" },
    {
      name: "Saint Helena, Ascension and Tristan Da Cunha",
      flag: "🇸🇭",
      code: "SH",
      dial_code: "+290",
    },
    {
      name: "Saint Kitts and Nevis",
      flag: "🇰🇳",
      code: "KN",
      dial_code: "+1869",
    },
    { name: "Saint Lucia", flag: "🇱🇨", code: "LC", dial_code: "+1758" },
    { name: "Saint Martin", flag: "🇲🇫", code: "MF", dial_code: "+590" },
    {
      name: "Saint Pierre and Miquelon",
      flag: "🇵🇲",
      code: "PM",
      dial_code: "+508",
    },
    {
      name: "Saint Vincent and the Grenadines",
      flag: "🇻🇨",
      code: "VC",
      dial_code: "+1784",
    },
    { name: "Samoa", flag: "🇼🇸", code: "WS", dial_code: "+685" },
    { name: "San Marino", flag: "🇸🇲", code: "SM", dial_code: "+378" },
    {
      name: "Sao Tome and Principe",
      flag: "🇸🇹",
      code: "ST",
      dial_code: "+239",
    },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", dial_code: "+966" },
    { name: "Senegal", flag: "🇸🇳", code: "SN", dial_code: "+221" },
    { name: "Serbia", flag: "🇷🇸", code: "RS", dial_code: "+381" },
    { name: "Seychelles", flag: "🇸🇨", code: "SC", dial_code: "+248" },
    { name: "Sierra Leone", flag: "🇸🇱", code: "SL", dial_code: "+232" },
    { name: "Singapore", flag: "🇸🇬", code: "SG", dial_code: "+65" },
    { name: "Slovakia", flag: "🇸🇰", code: "SK", dial_code: "+421" },
    { name: "Slovenia", flag: "🇸🇮", code: "SI", dial_code: "+386" },
    { name: "Solomon Islands", flag: "🇸🇧", code: "SB", dial_code: "+677" },
    { name: "Somalia", flag: "🇸🇴", code: "SO", dial_code: "+252" },
    { name: "South Africa", flag: "🇿🇦", code: "ZA", dial_code: "+27" },
    { name: "South Sudan", flag: "🇸🇸", code: "SS", dial_code: "+211" },
    {
      name: "South Georgia and the South Sandwich Islands",
      flag: "🇬🇸",
      code: "GS",
      dial_code: "+500",
    },
    { name: "Spain", flag: "🇪🇸", code: "ES", dial_code: "+34" },
    { name: "Sri Lanka", flag: "🇱🇰", code: "LK", dial_code: "+94" },
    { name: "Sudan", flag: "🇸🇩", code: "SD", dial_code: "+249" },
    { name: "Suriname", flag: "🇸🇷", code: "SR", dial_code: "+597" },
    {
      name: "Svalbard and Jan Mayen",
      flag: "🇸🇯",
      code: "SJ",
      dial_code: "+47",
    },
    { name: "Swaziland", flag: "🇸🇿", code: "SZ", dial_code: "+268" },
    { name: "Sweden", flag: "🇸🇪", code: "SE", dial_code: "+46" },
    { name: "Switzerland", flag: "🇨🇭", code: "CH", dial_code: "+41" },
    { name: "Syrian Arab Republic", flag: "🇸🇾", code: "SY", dial_code: "+963" },
    { name: "Taiwan", flag: "🇹🇼", code: "TW", dial_code: "+886" },
    { name: "Tajikistan", flag: "🇹🇯", code: "TJ", dial_code: "+992" },
    {
      name: "Tanzania, United Republic of Tanzania",
      flag: "🇹🇿",
      code: "TZ",
      dial_code: "+255",
    },
    { name: "Thailand", flag: "🇹🇭", code: "TH", dial_code: "+66" },
    { name: "Timor-Leste", flag: "🇹🇱", code: "TL", dial_code: "+670" },
    { name: "Togo", flag: "🇹🇬", code: "TG", dial_code: "+228" },
    { name: "Tokelau", flag: "🇹🇰", code: "TK", dial_code: "+690" },
    { name: "Tonga", flag: "🇹🇴", code: "TO", dial_code: "+676" },
    { name: "Trinidad and Tobago", flag: "🇹🇹", code: "TT", dial_code: "+1868" },
    { name: "Tunisia", flag: "🇹🇳", code: "TN", dial_code: "+216" },
    { name: "Turkey", flag: "🇹🇷", code: "TR", dial_code: "+90" },
    { name: "Turkmenistan", flag: "🇹🇲", code: "TM", dial_code: "+993" },
    {
      name: "Turks and Caicos Islands",
      flag: "🇹🇨",
      code: "TC",
      dial_code: "+1649",
    },
    { name: "Tuvalu", flag: "🇹🇻", code: "TV", dial_code: "+688" },
    { name: "Uganda", flag: "🇺🇬", code: "UG", dial_code: "+256" },
    { name: "Ukraine", flag: "🇺🇦", code: "UA", dial_code: "+380" },
    { name: "United Arab Emirates", flag: "🇦🇪", code: "AE", dial_code: "+971" },
    { name: "United Kingdom", flag: "🇬🇧", code: "GB", dial_code: "+44" },
    { name: "United States", flag: "🇺🇸", code: "US", dial_code: "+1" },
    { name: "Uruguay", flag: "🇺🇾", code: "UY", dial_code: "+598" },
    { name: "Uzbekistan", flag: "🇺🇿", code: "UZ", dial_code: "+998" },
    { name: "Vanuatu", flag: "🇻🇺", code: "VU", dial_code: "+678" },
    {
      name: "Venezuela, Bolivarian Republic of Venezuela",
      flag: "🇻🇪",
      code: "VE",
      dial_code: "+58",
    },
    { name: "Vietnam", flag: "🇻🇳", code: "VN", dial_code: "+84" },
    {
      name: "Virgin Islands, British",
      flag: "🇻🇬",
      code: "VG",
      dial_code: "+1284",
    },
    {
      name: "Virgin Islands, U.S.",
      flag: "🇻🇮",
      code: "VI",
      dial_code: "+1340",
    },
    { name: "Wallis and Futuna", flag: "🇼🇫", code: "WF", dial_code: "+681" },
    { name: "Yemen", flag: "🇾🇪", code: "YE", dial_code: "+967" },
    { name: "Zambia", flag: "🇿🇲", code: "ZM", dial_code: "+260" },
    { name: "Zimbabwe", flag: "🇿🇼", code: "ZW", dial_code: "+263" },
  ],
  oi = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input" data-testid="input"><div class="flex"><div class="relative typebot-country-select flex justify-center items-center"><div class="pl-2 pr-1 flex items-center gap-2"><span></span></div><select class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0">'
  ),
  ii = ue("<option> "),
  ai = (e) => {
    const [t, n] = _(je(e.defaultCountryCode) ? "INT" : e.defaultCountryCode),
      [r, o] = _(e.defaultValue ?? "");
    let i;
    const a = (e) => {
        o(e), ("" !== e && "+" !== e) || "INT" === t() || n("INT");
        const r =
          e?.startsWith("+") &&
          e.length > 2 &&
          ri.reduce(
            (t, n) =>
              !n?.dial_code || (null !== t && !t.dial_code)
                ? t
                : e?.startsWith(n.dial_code) &&
                  n.dial_code.length > (t?.dial_code.length ?? 0)
                ? n
                : t,
            null
          );
        r && n(r.code);
      },
      s = () => {
        const n = ri.find((e) => e.code === t())?.dial_code;
        "" !== r() &&
          i?.reportValidity() &&
          e.onSubmit({ value: r().startsWith("+") ? r() : `${n ?? ""}${r()}` });
      },
      l = (e) => {
        "Enter" === e.key && s();
      },
      c = (e) => {
        const t = e.currentTarget.value;
        n(t);
        const a = ri.find((e) => e.code === t)?.dial_code;
        "" === r() && a && o(a), i?.focus();
      };
    E(() => {
      !mt() && i && i.focus(), window.addEventListener("message", d);
    }),
      I(() => {
        window.removeEventListener("message", d);
      });
    const d = (e) => {
      const { data: t } = e;
      t.isFromTypebot && "setInputValue" === t.command && o(t.value);
    };
    return (() => {
      const n = oi(),
        o = n.firstChild,
        d = o.firstChild.firstChild,
        u = d.firstChild,
        p = d.nextSibling;
      return (
        (n.$$keydown = l),
        n.style.setProperty("max-width", "400px"),
        be(u, () => ri.find((e) => t() === e.code)?.flag),
        be(d, V(ni, { class: "w-3" }), null),
        p.addEventListener("change", c),
        be(
          p,
          V(ee, {
            each: ri,
            children: (e) =>
              (() => {
                const n = ii(),
                  r = n.firstChild;
                return (
                  be(n, () => e.name, r),
                  be(n, () => (e.dial_code ? `(${e.dial_code})` : ""), null),
                  k(() => (n.selected = e.code === t())),
                  k(() => (n.value = e.code)),
                  n
                );
              })(),
          })
        ),
        be(
          o,
          V(It, {
            type: "tel",
            ref(e) {
              "function" == typeof i ? i(e) : (i = e);
            },
            get value() {
              return r();
            },
            onInput: a,
            get placeholder() {
              return e.labels.placeholder ?? "Your phone number...";
            },
            get autofocus() {
              return !mt();
            },
          }),
          null
        ),
        be(
          n,
          V(Tt, {
            type: "button",
            get isDisabled() {
              return "" === r();
            },
            class: "my-2 ml-2",
            "on:click": s,
            get children() {
              return e.labels?.button ?? "Send";
            },
          }),
          null
        ),
        n
      );
    })();
  };
pe(["keydown"]);
const si = ue(
    '<div class="flex flex-col"><div class="flex items-center"><form class="flex justify-between typebot-input pr-2 items-end"><div class="flex flex-col"><div><input class="focus:outline-none flex-1 w-full text-input typebot-date-input" data-testid="from-date">'
  ),
  li = ue('<p class="font-semibold">'),
  ci = ue(
    '<div class="flex items-center p-4"><input class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input" data-testid="to-date">'
  ),
  di = (e) => {
    const [t, n] = _(ui(e.defaultValue ?? ""));
    return (() => {
      const r = si(),
        o = r.firstChild.firstChild,
        i = o.firstChild,
        a = i.firstChild,
        s = a.firstChild;
      return (
        o.addEventListener("submit", (n) => {
          ("" === t().from && "" === t().to) ||
            (n.preventDefault(),
            e.onSubmit({
              value: `${t().from}${e.options?.isRange ? ` to ${t().to}` : ""}`,
            }));
        }),
        be(
          a,
          (() => {
            const t = S(() => !!e.options?.isRange);
            return () =>
              t() &&
              (() => {
                const t = li();
                return be(t, () => e.options.labels?.from ?? "From:"), t;
              })();
          })(),
          s
        ),
        s.addEventListener("change", (e) =>
          n({ ...t(), from: e.currentTarget.value })
        ),
        s.style.setProperty("min-height", "32px"),
        s.style.setProperty("min-width", "100px"),
        s.style.setProperty("font-size", "16px"),
        be(
          i,
          (() => {
            const r = S(() => !!e.options?.isRange);
            return () =>
              r() &&
              (() => {
                const r = ci(),
                  o = r.firstChild;
                return (
                  be(
                    r,
                    (() => {
                      const t = S(() => !!e.options.isRange);
                      return () =>
                        t() &&
                        (() => {
                          const t = li();
                          return be(t, () => e.options.labels?.to ?? "To:"), t;
                        })();
                    })(),
                    o
                  ),
                  o.addEventListener("change", (e) =>
                    n({ ...t(), to: e.currentTarget.value })
                  ),
                  o.style.setProperty("min-height", "32px"),
                  o.style.setProperty("min-width", "100px"),
                  o.style.setProperty("font-size", "16px"),
                  k(
                    (t) => {
                      const n = e.options.hasTime ? "datetime-local" : "date",
                        r = e.options?.min,
                        i = e.options?.max;
                      return (
                        n !== t._v$5 && he(o, "type", (t._v$5 = n)),
                        r !== t._v$6 && he(o, "min", (t._v$6 = r)),
                        i !== t._v$7 && he(o, "max", (t._v$7 = i)),
                        t
                      );
                    },
                    { _v$5: void 0, _v$6: void 0, _v$7: void 0 }
                  ),
                  k(() => (o.value = t().to)),
                  r
                );
              })();
          })(),
          null
        ),
        be(
          o,
          V(Tt, {
            get isDisabled() {
              return S(() => "" === t().to)() && "" === t().from;
            },
            class: "my-2 ml-2",
            get children() {
              return e.options?.labels?.button ?? "Send";
            },
          }),
          null
        ),
        k(
          (t) => {
            const n =
                "flex items-center p-4 " +
                (e.options?.isRange ? "pb-0 gap-2" : ""),
              r = e.options?.hasTime ? "datetime-local" : "date",
              o = e.options?.min,
              i = e.options?.max;
            return (
              n !== t._v$ && fe(a, (t._v$ = n)),
              r !== t._v$2 && he(s, "type", (t._v$2 = r)),
              o !== t._v$3 && he(s, "min", (t._v$3 = o)),
              i !== t._v$4 && he(s, "max", (t._v$4 = i)),
              t
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        k(() => (s.value = t().from)),
        r
      );
    })();
  },
  ui = (e) => {
    if (!e.includes("to")) return { from: e, to: "" };
    const [t, n] = e.split(" to ");
    return { from: t, to: n };
  },
  pi = ue(
    '<form class="flex flex-col gap-2"><div class="flex flex-wrap justify-center gap-2"></div><div class="flex justify-end">'
  ),
  hi = ue('<span class="text-sm w-full rating-label">'),
  fi = ue('<span class="text-sm w-full text-right pr-2 rating-label">'),
  gi = ue("<div>"),
  mi = (e) => {
    const [t, n] = _(e.defaultValue ? Number(e.defaultValue) : void 0),
      r = (n) => {
        n.preventDefault();
        const r = t();
        Me(r) || e.onSubmit({ value: r.toString() });
      },
      o = (t) => {
        e.block.options.isOneClickSubmitEnabled &&
          e.onSubmit({ value: t.toString() }),
          n(t);
      };
    return (() => {
      const n = pi(),
        i = n.firstChild,
        a = i.nextSibling;
      return (
        n.addEventListener("submit", r),
        be(
          n,
          (() => {
            const t = S(() => !!e.block.options.labels.left);
            return () =>
              t() &&
              (() => {
                const t = hi();
                return be(t, () => e.block.options.labels.left), t;
              })();
          })(),
          i
        ),
        be(
          i,
          V(ee, {
            get each() {
              return Array.from(
                Array(
                  e.block.options.length +
                    ("Numbers" === e.block.options.buttonType ? 1 : 0)
                )
              );
            },
            children: (n, r) =>
              V(
                bi,
                Y(() => e.block.options, {
                  get rating() {
                    return t();
                  },
                  get idx() {
                    return (
                      r() + ("Numbers" === e.block.options.buttonType ? 0 : 1)
                    );
                  },
                  onClick: o,
                })
              ),
          })
        ),
        be(
          n,
          (() => {
            const t = S(() => !!e.block.options.labels.right);
            return () =>
              t() &&
              (() => {
                const t = fi();
                return be(t, () => e.block.options.labels.right), t;
              })();
          })(),
          a
        ),
        be(
          a,
          (() => {
            const n = S(() => !!Le(t()));
            return () =>
              n() &&
              V(Tt, {
                disableIcon: !0,
                get children() {
                  return e.block.options?.labels?.button ?? "Send";
                },
              });
          })()
        ),
        n
      );
    })();
  },
  bi = (e) => {
    const t = (t) => {
      t.preventDefault(), e.onClick(e.idx);
    };
    return V(ne, {
      get children() {
        return [
          V(re, {
            get when() {
              return "Numbers" === e.buttonType;
            },
            get children() {
              return V(kt, {
                "on:click": t,
                get class() {
                  return e.isOneClickSubmitEnabled ||
                    (Le(e.rating) && e.idx <= e.rating)
                    ? ""
                    : "selectable";
                },
                get children() {
                  return e.idx;
                },
              });
            },
          }),
          V(re, {
            get when() {
              return "Numbers" !== e.buttonType;
            },
            get children() {
              const t = gi();
              return (
                t.addEventListener("click", () => e.onClick(e.idx)),
                k(
                  (n) => {
                    const r =
                        "flex justify-center items-center rating-icon-container cursor-pointer " +
                        (Le(e.rating) && e.idx <= e.rating ? "selected" : ""),
                      o =
                        e.customIcon.isEnabled && !je(e.customIcon.svg)
                          ? e.customIcon.svg
                          : yi;
                    return (
                      r !== n._v$ && fe(t, (n._v$ = r)),
                      o !== n._v$2 && (t.innerHTML = n._v$2 = o),
                      n
                    );
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              );
            },
          }),
        ];
      },
    });
  },
  yi =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  vi = lo.merge(
    ao.object({
      isRequired: ao.boolean().optional(),
      isMultipleAllowed: ao.boolean(),
      labels: ao.object({
        placeholder: ao.string(),
        button: ao.string(),
        clear: ao.string().optional(),
        skip: ao.string().optional(),
      }),
      sizeLimit: ao.number().optional().describe("Deprecated"),
    })
  );
so.merge(ao.object({ type: ao.literal(Pe.FILE), options: vi }));
const wi = {
    placeholder:
      "<strong>\n      Click to upload\n    </strong> or drag and drop<br>\n    (size limit: 10MB)",
    button: "Upload",
    clear: "Clear",
    skip: "Skip",
  },
  xi = async ({ apiHost: e, files: t, onUploadProgress: n }) => {
    const r = [];
    let o = 0;
    for (const { input: i, file: a } of t) {
      n && n((o / t.length) * 100), (o += 1);
      const { data: s } = await Re({
        method: "POST",
        url: `${e}/api/v1/generate-upload-url`,
        body: { filePathProps: i, fileType: a.type },
      });
      if (s?.presignedUrl) {
        const e = new FormData();
        Object.entries(s.formData).forEach(([t, n]) => {
          e.append(t, n);
        }),
          e.append("file", a);
        if (!(await fetch(s.presignedUrl, { method: "POST", body: e })).ok)
          continue;
        r.push(s.fileUrl);
      }
    }
    return r;
  },
  _i = ue(
    '<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="upload-progress-bar h-2.5 rounded-full">'
  ),
  ki = ue(
    '<span class="relative"><div class="total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 w-4 h-4">'
  ),
  Ti = ue(
    '<div class="flex flex-col justify-center items-center"><p class="text-sm text-gray-500 text-center">'
  ),
  Si = ue('<input id="dropzone-file" type="file" class="hidden">'),
  Ci = ue('<div class="flex justify-end">'),
  Ei = ue('<div class="flex justify-end"><div class="flex gap-2">'),
  Ii = ue('<p class="text-red-500 text-sm">'),
  $i = ue(
    '<form class="flex flex-col w-full gap-2"><label for="dropzone-file">'
  ),
  Ai = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16">'
  ),
  Pi = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9">'
  ),
  Ni = (e) => {
    const [t, n] = _([]),
      [r, o] = _(!1),
      [i, a] = _(0),
      [s, l] = _(!1),
      [c, d] = _(),
      u = (r) => {
        d(void 0);
        const o = Array.from(r),
          i =
            e.block.options.sizeLimit ??
            pt("NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE");
        return i && o.some((e) => e.size > 1024 * i * 1024)
          ? d(`A file is larger than ${i}MB`)
          : !e.block.options.isMultipleAllowed && r
          ? h(o[0])
          : void n([...t(), ...o]);
      },
      p = async (e) => {
        e.preventDefault(), 0 !== t().length && f(t());
      },
      h = async (t) => {
        if (e.context.isPreview || !e.context.resultId)
          return e.onSubmit({
            label: "File uploaded",
            value: "http://fake-upload-url.com",
          });
        o(!0);
        const n = await xi({
          apiHost: e.context.apiHost ?? ht(),
          files: [
            {
              file: t,
              input: { sessionId: e.context.sessionId, fileName: t.name },
            },
          ],
        });
        if ((o(!1), n.length))
          return e.onSubmit({ label: "File uploaded", value: n[0] ?? "" });
        d("An error occured while uploading the file");
      },
      f = async (t) => {
        const n = e.context.resultId;
        if (e.context.isPreview || !n)
          return e.onSubmit({
            label: `${t.length} file${t.length > 1 ? "s" : ""} uploaded`,
            value: t
              .map((e, t) => `http://fake-upload-url.com/${t}`)
              .join(", "),
          });
        o(!0);
        const r = await xi({
          apiHost: e.context.apiHost ?? ht(),
          files: t.map((t) => ({
            file: t,
            input: { sessionId: e.context.sessionId, fileName: t.name },
          })),
          onUploadProgress: a,
        });
        if ((o(!1), a(0), r.length !== t.length))
          return d("An error occured while uploading the files");
        e.onSubmit({
          label: `${r.length} file${r.length > 1 ? "s" : ""} uploaded`,
          value: r.join(", "),
        });
      },
      g = (e) => {
        e.preventDefault(), l(!0);
      },
      m = () => l(!1),
      b = (e) => {
        e.preventDefault(),
          e.stopPropagation(),
          e.dataTransfer?.files && u(e.dataTransfer.files);
      },
      y = () => n([]),
      v = () => e.onSkip(e.block.options.labels.skip ?? wi.skip);
    return (() => {
      const n = $i(),
        o = n.firstChild;
      return (
        n.addEventListener("submit", p),
        o.addEventListener("drop", b),
        o.addEventListener("dragleave", m),
        o.addEventListener("dragover", g),
        be(
          o,
          V(ne, {
            get children() {
              return [
                V(re, {
                  get when() {
                    return r();
                  },
                  get children() {
                    return V(te, {
                      get when() {
                        return t().length > 1;
                      },
                      get fallback() {
                        return V(xt, {});
                      },
                      get children() {
                        const e = _i(),
                          t = e.firstChild;
                        return (
                          t.style.setProperty(
                            "transition",
                            "width 150ms cubic-bezier(0.4, 0, 0.2, 1)"
                          ),
                          k(() =>
                            null != `${i() > 0 ? i : 10}%`
                              ? t.style.setProperty(
                                  "width",
                                  `${i() > 0 ? i : 10}%`
                                )
                              : t.style.removeProperty("width")
                          ),
                          e
                        );
                      },
                    });
                  },
                }),
                V(re, {
                  get when() {
                    return !r();
                  },
                  get children() {
                    return [
                      (() => {
                        const n = Ti(),
                          r = n.firstChild;
                        return (
                          be(
                            n,
                            V(te, {
                              get when() {
                                return t().length;
                              },
                              get fallback() {
                                return V(Oi, {});
                              },
                              get children() {
                                const e = ki(),
                                  n = e.firstChild;
                                return (
                                  be(e, V(Ri, {}), n),
                                  n.style.setProperty("bottom", "5px"),
                                  be(n, () => t().length),
                                  e
                                );
                              },
                            }),
                            r
                          ),
                          k(
                            () =>
                              (r.innerHTML = e.block.options.labels.placeholder)
                          ),
                          n
                        );
                      })(),
                      (() => {
                        const t = Si();
                        return (
                          t.addEventListener("change", (e) => {
                            e.currentTarget.files && u(e.currentTarget.files);
                          }),
                          k(
                            () =>
                              (t.multiple = e.block.options.isMultipleAllowed)
                          ),
                          t
                        );
                      })(),
                    ];
                  },
                }),
              ];
            },
          })
        ),
        be(
          n,
          V(te, {
            get when() {
              return 0 === t().length && !1 === e.block.options.isRequired;
            },
            get children() {
              const t = Ci();
              return (
                be(
                  t,
                  V(kt, {
                    "on:click": v,
                    get children() {
                      return e.block.options.labels.skip ?? wi.skip;
                    },
                  })
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          n,
          V(te, {
            get when() {
              return (
                S(
                  () => !!(e.block.options.isMultipleAllowed && t().length > 0)
                )() && !r()
              );
            },
            get children() {
              const n = Ei(),
                r = n.firstChild;
              return (
                be(
                  r,
                  V(te, {
                    get when() {
                      return t().length;
                    },
                    get children() {
                      return V(kt, {
                        variant: "secondary",
                        "on:click": y,
                        get children() {
                          return e.block.options.labels.clear ?? wi.clear;
                        },
                      });
                    },
                  }),
                  null
                ),
                be(
                  r,
                  V(Tt, {
                    type: "submit",
                    disableIcon: !0,
                    get children() {
                      return S(
                        () => e.block.options.labels.button === wi.button
                      )()
                        ? `Upload ${t().length} file${
                            t().length > 1 ? "s" : ""
                          }`
                        : e.block.options.labels.button;
                    },
                  }),
                  null
                ),
                n
              );
            },
          }),
          null
        ),
        be(
          n,
          V(te, {
            get when() {
              return c();
            },
            get children() {
              const e = Ii();
              return be(e, c), e;
            },
          }),
          null
        ),
        k(() =>
          fe(
            o,
            "typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 " +
              (s() ? "dragging-over" : "")
          )
        ),
        n
      );
    })();
  },
  Oi = () => Ai(),
  Ri = () => Pi();
let Li = (function (e) {
  return (e.STRIPE = "Stripe"), e;
})({});
const Mi = ue(
    '<div class="typebot-input-error-message mt-4 text-center animate-fade-in">'
  ),
  ji = ue(
    '<form id="payment-form" class="flex flex-col p-4 typebot-input w-full items-center"><slot name="stripe-payment-form">'
  );
let zi,
  Di = null,
  Bi = null;
const Zi = (e) => {
    const [t, n] = _(),
      [r, o] = _(!1),
      [i, a] = _(!1);
    E(async () => {
      var t;
      if (
        (Ui(zi),
        (Di = await ((t = e.options.publicKey),
        new Promise((e) => {
          if (window.Stripe) return e(window.Stripe(t));
          const n = document.createElement("script");
          (n.src = "https://js.stripe.com/v3"),
            document.body.appendChild(n),
            (n.onload = () => {
              if (!window.Stripe) throw new Error("Stripe.js failed to load.");
              e(window.Stripe(t));
            });
        }))),
        !Di)
      )
        return;
      Bi = Di.elements({
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: getComputedStyle(zi).getPropertyValue(
              "--typebot-button-bg-color"
            ),
          },
        },
        clientSecret: e.options.paymentIntentSecret,
      });
      Bi.create("payment", { layout: "tabs" }).mount("#payment-element"),
        setTimeout(() => o(!0), 1e3);
    });
    const s = async (t) => {
      if ((t.preventDefault(), !Di || !Bi)) return;
      var r;
      a(!0),
        (r = { sessionId: e.context.sessionId, typebot: e.context.typebot }),
        sessionStorage.setItem("typebotPaymentInProgress", JSON.stringify(r));
      const { postalCode: o, ...i } =
          e.options.additionalInformation?.address ?? {},
        { error: s, paymentIntent: l } = await Di.confirmPayment({
          elements: Bi,
          confirmParams: {
            return_url: window.location.href,
            payment_method_data: {
              billing_details: {
                name: e.options.additionalInformation?.name,
                email: e.options.additionalInformation?.email,
                phone: e.options.additionalInformation?.phoneNumber,
                address: { ...i, postal_code: o },
              },
            },
          },
          redirect: "if_required",
        });
      return (
        gt(),
        a(!1),
        "validation_error" !== s?.type
          ? "card_error" === s?.type
            ? n(s.message)
            : s || "succeeded" !== l.status
            ? void 0
            : e.onSuccess()
          : void 0
      );
    };
    return (() => {
      const n = ji(),
        o = n.firstChild;
      n.addEventListener("submit", s);
      return (
        "function" == typeof zi ? me(zi, o) : (zi = o),
        (o._$owner = g),
        be(
          n,
          V(te, {
            get when() {
              return r();
            },
            get children() {
              return V(Tt, {
                get isLoading() {
                  return i();
                },
                class: "mt-4 w-full max-w-lg animate-fade-in",
                disableIcon: !0,
                get children() {
                  return [
                    S(() => e.options.labels.button),
                    " ",
                    S(() => e.options.amountLabel),
                  ];
                },
              });
            },
          }),
          null
        ),
        be(
          n,
          V(te, {
            get when() {
              return t();
            },
            get children() {
              const e = Mi();
              return be(e, t), e;
            },
          }),
          null
        ),
        n
      );
    })();
  },
  Ui = (e) => {
    const t = e.getRootNode().host,
      n = document.createElement("div");
    (n.style.width = "100%"),
      (n.slot = "stripe-payment-form"),
      t.appendChild(n);
    const r = document.createElement("div");
    (r.id = "payment-element"), n.appendChild(r);
  },
  Fi = (e) =>
    V(ne, {
      get children() {
        return V(re, {
          get when() {
            return e.options.provider === Li.STRIPE;
          },
          get children() {
            return V(Zi, {
              get onSuccess() {
                return e.onSuccess;
              },
              get options() {
                return e.options;
              },
              get context() {
                return e.context;
              },
            });
          },
        });
      },
    }),
  Hi = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12">'
  ),
  Vi = (e) =>
    (() => {
      const t = Hi();
      return ge(t, e, !0, !0), t;
    })(),
  Gi = ue("<div>"),
  qi = (e) =>
    (() => {
      const t = Gi();
      return (
        be(
          t,
          V(te, {
            get when() {
              return e.isChecked;
            },
            get children() {
              return V(Vi, {});
            },
          })
        ),
        k(() =>
          fe(
            t,
            "w-4 h-4 typebot-checkbox" +
              (e.isChecked ? " checked" : "") +
              (e.class ? ` ${e.class}` : "")
          )
        ),
        t
      );
    })(),
  Wi = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'
  ),
  Ki = (e) =>
    (() => {
      const t = Wi();
      return ge(t, e, !0, !0), t;
    })(),
  Yi = ue('<button class="w-5 h-5">'),
  Xi = ue(
    '<div class="flex justify-between items-center gap-2 w-full pr-4"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'
  ),
  Ji = (e) => {
    const [t, n] = _(""),
      [r, o] = X(e, ["onInput", "ref"]),
      i = () => {
        n(""), e.onClear();
      };
    return (() => {
      const a = Xi(),
        s = a.firstChild;
      s.$$input = (e) =>
        ((e) => {
          n(e), r.onInput(e);
        })(e.currentTarget.value);
      const l = e.ref;
      return (
        "function" == typeof l ? me(l, s) : (e.ref = s),
        s.style.setProperty("font-size", "16px"),
        ge(
          s,
          Y(
            {
              get value() {
                return t();
              },
            },
            o
          ),
          !1,
          !1
        ),
        be(
          a,
          V(te, {
            get when() {
              return t().length > 0;
            },
            get children() {
              const e = Yi();
              return e.addEventListener("click", i), be(e, V(Ki, {})), e;
            },
          }),
          null
        ),
        a
      );
    })();
  };
pe(["input"]);
const Qi = "Send",
  ea = lo.merge(
    ao.object({
      isMultipleChoice: ao.boolean(),
      buttonLabel: ao.string(),
      dynamicVariableId: ao.string().optional(),
      isSearchable: ao.boolean().optional(),
      searchInputPlaceholder: ao.string().optional(),
    })
  ),
  ta = "Filter the options...",
  na = po.merge(
    ao.object({
      type: ao.literal(uo.BUTTON),
      content: ao.string().optional(),
      displayCondition: ao
        .object({
          isEnabled: ao.boolean().optional(),
          condition: mo.optional(),
        })
        .optional(),
    })
  );
so.merge(
  ao.object({ type: ao.enum([Pe.CHOICE]), items: ao.array(na), options: ea })
);
const ra = ue('<div class="flex items-end typebot-input w-full">'),
  oa = ue('<form class="flex flex-col items-end gap-2 w-full"><div>'),
  ia = ue(
    '<span><div role="checkbox"><div class="flex items-center gap-2"><span>'
  ),
  aa = ue(
    '<span><div role="checkbox" aria-checked class="w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable selected"><div class="flex items-center gap-2"><span>'
  ),
  sa = (e) => {
    let t;
    const [n, r] = _(e.defaultItems),
      [o, i] = _([]);
    E(() => {
      !mt() && t && t.focus();
    });
    const a = (e) => {
        s(e);
      },
      s = (e) => {
        const t = o().indexOf(e);
        i(-1 !== t ? (t) => t.filter((t) => t !== e) : (t) => [...t, e]);
      },
      l = () =>
        e.onSubmit({
          value: o()
            .map((t) => e.defaultItems.find((e) => e.id === t)?.content)
            .join(", "),
        }),
      c = (t) => {
        r(
          e.defaultItems.filter((e) =>
            e.content?.toLowerCase().includes((t ?? "").toLowerCase())
          )
        );
      };
    return (() => {
      const i = oa(),
        s = i.firstChild;
      return (
        i.addEventListener("submit", l),
        be(
          i,
          V(te, {
            get when() {
              return e.options.isSearchable;
            },
            get children() {
              const n = ra();
              return (
                be(
                  n,
                  V(Ji, {
                    ref(e) {
                      "function" == typeof t ? t(e) : (t = e);
                    },
                    onInput: c,
                    get placeholder() {
                      return e.options.searchInputPlaceholder ?? ta;
                    },
                    onClear: () => r(e.defaultItems),
                  })
                ),
                n
              );
            },
          }),
          s
        ),
        be(
          s,
          V(ee, {
            get each() {
              return n();
            },
            children: (e) =>
              (() => {
                const t = ia(),
                  n = t.firstChild,
                  r = n.firstChild,
                  i = r.firstChild;
                return (
                  n.addEventListener("click", () => a(e.id)),
                  be(
                    r,
                    V(qi, {
                      get isChecked() {
                        return o().some((t) => t === e.id);
                      },
                    }),
                    i
                  ),
                  be(i, () => e.content),
                  k(
                    (r) => {
                      const i = "relative" + (mt() ? " w-full" : ""),
                        a = o().some((t) => t === e.id),
                        s =
                          "w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable" +
                          (o().some((t) => t === e.id) ? " selected" : ""),
                        l = e.id;
                      return (
                        i !== r._v$ && fe(t, (r._v$ = i)),
                        a !== r._v$2 && he(n, "aria-checked", (r._v$2 = a)),
                        s !== r._v$3 && fe(n, (r._v$3 = s)),
                        l !== r._v$4 && he(n, "data-itemid", (r._v$4 = l)),
                        r
                      );
                    },
                    { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
                  ),
                  t
                );
              })(),
          }),
          null
        ),
        be(
          s,
          V(ee, {
            get each() {
              return o().filter((e) => n().every((t) => t.id !== e));
            },
            children: (t) =>
              (() => {
                const n = aa(),
                  r = n.firstChild,
                  o = r.firstChild,
                  i = o.firstChild;
                return (
                  r.addEventListener("click", () => a(t)),
                  he(r, "data-itemid", t),
                  be(o, V(qi, { isChecked: !0 }), i),
                  be(i, () => e.defaultItems.find((e) => e.id === t)?.content),
                  k(() => fe(n, "relative" + (mt() ? " w-full" : ""))),
                  n
                );
              })(),
          }),
          null
        ),
        be(
          i,
          (() => {
            const t = S(() => o().length > 0);
            return () =>
              t() &&
              V(Tt, {
                disableIcon: !0,
                get children() {
                  return e.options?.buttonLabel ?? "Send";
                },
              });
          })(),
          null
        ),
        k(() =>
          fe(
            s,
            "flex flex-wrap justify-end gap-2" +
              (e.options.isSearchable
                ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar"
                : "")
          )
        ),
        i
      );
    })();
  },
  la = ue('<div class="flex items-end typebot-input w-full">'),
  ca = ue('<div class="flex flex-col gap-2 w-full"><div>'),
  da = ue("<span>"),
  ua = ue(
    '<span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"><span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 brightness-150">'
  ),
  pa = (e) => {
    let t;
    const [n, r] = _(e.defaultItems);
    E(() => {
      !mt() && t && t.focus();
    });
    const o = (t) => {
      r(
        e.defaultItems.filter((e) =>
          e.content?.toLowerCase().includes((t ?? "").toLowerCase())
        )
      );
    };
    return (() => {
      const i = ca(),
        a = i.firstChild;
      return (
        be(
          i,
          V(te, {
            get when() {
              return e.options.isSearchable;
            },
            get children() {
              const n = la();
              return (
                be(
                  n,
                  V(Ji, {
                    ref(e) {
                      "function" == typeof t ? t(e) : (t = e);
                    },
                    onInput: o,
                    get placeholder() {
                      return e.options.searchInputPlaceholder ?? ta;
                    },
                    onClear: () => r(e.defaultItems),
                  })
                ),
                n
              );
            },
          }),
          a
        ),
        be(
          a,
          V(ee, {
            get each() {
              return n();
            },
            children: (t, r) =>
              (() => {
                const o = da();
                return (
                  be(
                    o,
                    V(kt, {
                      "on:click": () => {
                        return (
                          (t = r()), e.onSubmit({ value: n()[t].content ?? "" })
                        );
                        var t;
                      },
                      get "data-itemid"() {
                        return t.id;
                      },
                      class: "w-full",
                      get children() {
                        return t.content;
                      },
                    }),
                    null
                  ),
                  be(
                    o,
                    (() => {
                      const t = S(
                        () =>
                          !(0 !== e.inputIndex || 1 !== e.defaultItems.length)
                      );
                      return () => t() && ua();
                    })(),
                    null
                  ),
                  k(() => fe(o, "relative" + (mt() ? " w-full" : ""))),
                  o
                );
              })(),
          })
        ),
        k(() =>
          fe(
            a,
            "flex flex-wrap justify-end gap-2" +
              (e.options.isSearchable
                ? " overflow-y-scroll max-h-80 rounded-md hide-scrollbar"
                : "")
          )
        ),
        i
      );
    })();
  },
  ha = ue('<div class="flex items-end typebot-input w-full">'),
  fa = ue('<div class="flex flex-col gap-2 w-full"><div>'),
  ga = ue(
    '<button><img fetchpriority="high" class="m-auto"><div><span class="font-semibold"></span><span class="text-sm whitespace-pre-wrap text-left">'
  ),
  ma = (e) => {
    let t;
    const [n, r] = _(e.defaultItems);
    E(() => {
      !mt() && t && t.focus();
    });
    const o = (t) => {
      r(
        e.defaultItems.filter(
          (e) =>
            e.title?.toLowerCase().includes((t ?? "").toLowerCase()) ||
            e.description?.toLowerCase().includes((t ?? "").toLowerCase())
        )
      );
    };
    return (() => {
      const i = fa(),
        a = i.firstChild;
      return (
        be(
          i,
          V(te, {
            get when() {
              return e.options.isSearchable;
            },
            get children() {
              const n = ha();
              return (
                be(
                  n,
                  V(Ji, {
                    ref(e) {
                      "function" == typeof t ? t(e) : (t = e);
                    },
                    onInput: o,
                    get placeholder() {
                      return e.options.searchInputPlaceholder ?? "";
                    },
                    onClear: () => r(e.defaultItems),
                  })
                ),
                n
              );
            },
          }),
          a
        ),
        be(
          a,
          V(ee, {
            get each() {
              return n();
            },
            children: (t, r) =>
              (() => {
                const o = ga(),
                  i = o.firstChild,
                  a = i.nextSibling,
                  s = a.firstChild,
                  l = s.nextSibling;
                return (
                  o.addEventListener("click", () =>
                    ((t) => {
                      const r = n()[t];
                      return e.onSubmit({
                        label: r.title ?? r.pictureSrc ?? r.id,
                        value: r.id,
                      });
                    })(r())
                  ),
                  be(s, () => t.title),
                  be(l, () => t.description),
                  k(
                    (e) => {
                      const n = t.id,
                        s =
                          "flex flex-col typebot-picture-button focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  " +
                          (De(t.pictureSrc) ? "has-svg" : ""),
                        l = t.pictureSrc,
                        c = t.title ?? `Picture ${r() + 1}`,
                        d = `Picture choice ${r() + 1}`,
                        u =
                          "flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full" +
                          (t.description ? " items-start" : "");
                      return (
                        n !== e._v$ && he(o, "data-itemid", (e._v$ = n)),
                        s !== e._v$2 && fe(o, (e._v$2 = s)),
                        l !== e._v$3 && he(i, "src", (e._v$3 = l)),
                        c !== e._v$4 && he(i, "alt", (e._v$4 = c)),
                        d !== e._v$5 && he(i, "elementtiming", (e._v$5 = d)),
                        u !== e._v$6 && fe(a, (e._v$6 = u)),
                        e
                      );
                    },
                    {
                      _v$: void 0,
                      _v$2: void 0,
                      _v$3: void 0,
                      _v$4: void 0,
                      _v$5: void 0,
                      _v$6: void 0,
                    }
                  ),
                  o
                );
              })(),
          })
        ),
        k(() =>
          fe(
            a,
            "gap-2 flex flex-wrap justify-end" +
              (e.options.isSearchable
                ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar"
                : "")
          )
        ),
        i
      );
    })();
  },
  ba = lo.merge(
    ao.object({
      isMultipleChoice: ao.boolean().optional(),
      isSearchable: ao.boolean().optional(),
      buttonLabel: ao.string(),
      searchInputPlaceholder: ao.string(),
      dynamicItems: ao
        .object({
          isEnabled: ao.boolean().optional(),
          titlesVariableId: ao.string().optional(),
          descriptionsVariableId: ao.string().optional(),
          pictureSrcsVariableId: ao.string().optional(),
        })
        .optional(),
    })
  ),
  ya = po.merge(
    ao.object({
      type: ao.literal(uo.PICTURE_CHOICE),
      pictureSrc: ao.string().optional(),
      title: ao.string().optional(),
      description: ao.string().optional(),
      displayCondition: ao
        .object({
          isEnabled: ao.boolean().optional(),
          condition: mo.optional(),
        })
        .optional(),
    })
  );
so.merge(
  ao.object({
    type: ao.enum([Pe.PICTURE_CHOICE]),
    items: ao.array(ya),
    options: ba,
  })
);
const va = Qi,
  wa = "Filter the options...",
  xa = ue('<div class="flex items-end typebot-input w-full">'),
  _a = ue('<form class="flex flex-col gap-2 w-full items-end"><div>'),
  ka = ue('<span class="font-semibold">'),
  Ta = ue('<span class="text-sm whitespace-pre-wrap text-left">'),
  Sa = ue('<div class="flex flex-col gap-1 ">'),
  Ca = ue(
    '<div role="checkbox"><img fetchpriority="high" class="m-auto"><div>'
  ),
  Ea = ue(
    '<div role="checkbox" aria-checked class="flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture selected"><img fetchpriority="high"><div>'
  ),
  Ia = (e) => {
    let t;
    const [n, r] = _(e.defaultItems),
      [o, i] = _([]);
    E(() => {
      !mt() && t && t.focus();
    });
    const a = (e) => {
        s(e);
      },
      s = (e) => {
        const t = o().indexOf(e);
        i(-1 !== t ? (t) => t.filter((t) => t !== e) : (t) => [...t, e]);
      },
      l = () =>
        e.onSubmit({
          value: o()
            .map((t) => {
              const n = e.defaultItems.find((e) => e.id === t);
              return n?.title ?? n?.pictureSrc;
            })
            .join(", "),
        }),
      c = (t) => {
        r(
          e.defaultItems.filter(
            (e) =>
              e.title?.toLowerCase().includes((t ?? "").toLowerCase()) ||
              e.description?.toLowerCase().includes((t ?? "").toLowerCase())
          )
        );
      };
    return (() => {
      const i = _a(),
        s = i.firstChild;
      return (
        i.addEventListener("submit", l),
        be(
          i,
          V(te, {
            get when() {
              return e.options.isSearchable;
            },
            get children() {
              const n = xa();
              return (
                be(
                  n,
                  V(Ji, {
                    ref(e) {
                      "function" == typeof t ? t(e) : (t = e);
                    },
                    onInput: c,
                    get placeholder() {
                      return e.options.searchInputPlaceholder ?? wa;
                    },
                    onClear: () => r(e.defaultItems),
                  })
                ),
                n
              );
            },
          }),
          s
        ),
        be(
          s,
          V(ee, {
            get each() {
              return n();
            },
            children: (e, t) =>
              (() => {
                const n = Ca(),
                  r = n.firstChild,
                  i = r.nextSibling;
                return (
                  n.addEventListener("click", () => a(e.id)),
                  be(
                    i,
                    V(qi, {
                      get isChecked() {
                        return o().some((t) => t === e.id);
                      },
                      get class() {
                        return (
                          "flex-shrink-0" +
                          (e.title || e.description ? " mt-1" : void 0)
                        );
                      },
                    }),
                    null
                  ),
                  be(
                    i,
                    V(te, {
                      get when() {
                        return e.title || e.description;
                      },
                      get children() {
                        const t = Sa();
                        return (
                          be(
                            t,
                            V(te, {
                              get when() {
                                return e.title;
                              },
                              get children() {
                                const t = ka();
                                return be(t, () => e.title), t;
                              },
                            }),
                            null
                          ),
                          be(
                            t,
                            V(te, {
                              get when() {
                                return e.description;
                              },
                              get children() {
                                const t = Ta();
                                return be(t, () => e.description), t;
                              },
                            }),
                            null
                          ),
                          t
                        );
                      },
                    }),
                    null
                  ),
                  k(
                    (a) => {
                      const s = o().some((t) => t === e.id),
                        l =
                          "flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture" +
                          (o().some((t) => t === e.id) ? " selected" : "") +
                          (De(e.pictureSrc) ? " has-svg" : ""),
                        c = e.id,
                        d = e.pictureSrc,
                        u = e.title ?? `Picture ${t() + 1}`,
                        p = `Picture choice ${t() + 1}`,
                        h =
                          "flex gap-3 py-2 flex-shrink-0" +
                          (je(e.title) && je(e.description)
                            ? " justify-center"
                            : " px-3");
                      return (
                        s !== a._v$ && he(n, "aria-checked", (a._v$ = s)),
                        l !== a._v$2 && fe(n, (a._v$2 = l)),
                        c !== a._v$3 && he(n, "data-itemid", (a._v$3 = c)),
                        d !== a._v$4 && he(r, "src", (a._v$4 = d)),
                        u !== a._v$5 && he(r, "alt", (a._v$5 = u)),
                        p !== a._v$6 && he(r, "elementtiming", (a._v$6 = p)),
                        h !== a._v$7 && fe(i, (a._v$7 = h)),
                        a
                      );
                    },
                    {
                      _v$: void 0,
                      _v$2: void 0,
                      _v$3: void 0,
                      _v$4: void 0,
                      _v$5: void 0,
                      _v$6: void 0,
                      _v$7: void 0,
                    }
                  ),
                  n
                );
              })(),
          }),
          null
        ),
        be(
          s,
          V(ee, {
            get each() {
              return o()
                .filter((e) => n().every((t) => t.id !== e))
                .map((t) => e.defaultItems.find((e) => e.id === t))
                .filter(Le);
            },
            children: (t, n) =>
              (() => {
                const r = Ea(),
                  i = r.firstChild,
                  s = i.nextSibling;
                return (
                  r.addEventListener("click", () => a(t.id)),
                  be(
                    s,
                    V(qi, {
                      get isChecked() {
                        return o().some((e) => e === t.id);
                      },
                      get class() {
                        return (
                          "flex-shrink-0" +
                          (t.title || t.description ? " mt-1" : void 0)
                        );
                      },
                    }),
                    null
                  ),
                  be(
                    s,
                    V(te, {
                      get when() {
                        return t.title || t.description;
                      },
                      get children() {
                        const e = Sa();
                        return (
                          be(
                            e,
                            V(te, {
                              get when() {
                                return t.title;
                              },
                              get children() {
                                const e = ka();
                                return be(e, () => t.title), e;
                              },
                            }),
                            null
                          ),
                          be(
                            e,
                            V(te, {
                              get when() {
                                return t.description;
                              },
                              get children() {
                                const e = Ta();
                                return be(e, () => t.description), e;
                              },
                            }),
                            null
                          ),
                          e
                        );
                      },
                    }),
                    null
                  ),
                  k(
                    (o) => {
                      const a = t.id,
                        l = e.defaultItems.find(
                          (e) => e.id === t.id
                        )?.pictureSrc,
                        c = t.title ?? `Selected picture ${n() + 1}`,
                        d = `Selected picture choice ${n() + 1}`,
                        u =
                          "flex gap-3 py-2 flex-shrink-0" +
                          (je(t.title) && je(t.description)
                            ? " justify-center"
                            : " pl-4");
                      return (
                        a !== o._v$8 && he(r, "data-itemid", (o._v$8 = a)),
                        l !== o._v$9 && he(i, "src", (o._v$9 = l)),
                        c !== o._v$10 && he(i, "alt", (o._v$10 = c)),
                        d !== o._v$11 && he(i, "elementtiming", (o._v$11 = d)),
                        u !== o._v$12 && fe(s, (o._v$12 = u)),
                        o
                      );
                    },
                    {
                      _v$8: void 0,
                      _v$9: void 0,
                      _v$10: void 0,
                      _v$11: void 0,
                      _v$12: void 0,
                    }
                  ),
                  r
                );
              })(),
          }),
          null
        ),
        be(
          i,
          (() => {
            const t = S(() => o().length > 0);
            return () =>
              t() &&
              V(Tt, {
                disableIcon: !0,
                get children() {
                  return e.options?.buttonLabel ?? va;
                },
              });
          })(),
          null
        ),
        k(() =>
          fe(
            s,
            "flex flex-wrap justify-end gap-2" +
              (e.options.isSearchable
                ? " overflow-y-scroll max-h-[464px] rounded-md hide-scrollbar"
                : "")
          )
        ),
        i
      );
    })();
  },
  [$a, Aa] = _([]),
  Pa = ue('<div class="flex justify-end animate-fade-in gap-2">'),
  Na = ue("<div>"),
  Oa = (e) => {
    const [t, n] = _(),
      [r, o] = _(),
      i = async ({ label: t, value: r }) => {
        n(t ?? r), e.onSubmit(r ?? t);
      },
      a = (t) => {
        n(t), e.onSkip();
      };
    return (
      T(() => {
        const t = $a().find((t) => t.inputId === e.block.id)?.formattedMessage;
        t && o(t);
      }),
      V(ne, {
        get children() {
          return [
            V(re, {
              get when() {
                return t() && !e.hasError;
              },
              get children() {
                return V(Go, {
                  get message() {
                    return r() ?? t();
                  },
                  get showAvatar() {
                    return e.guestAvatar?.isEnabled ?? !1;
                  },
                  get avatarSrc() {
                    return e.guestAvatar?.url && e.guestAvatar.url;
                  },
                });
              },
            }),
            V(re, {
              get when() {
                return Me(t()) || e.hasError;
              },
              get children() {
                const t = Pa(),
                  n = e.ref;
                return (
                  "function" == typeof n ? me(n, t) : (e.ref = t),
                  be(
                    t,
                    (() => {
                      const t = S(() => !!e.hasHostAvatar);
                      return () =>
                        t() &&
                        (() => {
                          const e = Na();
                          return (
                            k(() =>
                              fe(
                                e,
                                "flex flex-shrink-0 items-center " +
                                  (mt() ? "w-6 h-6" : "w-10 h-10")
                              )
                            ),
                            e
                          );
                        })();
                    })(),
                    null
                  ),
                  be(
                    t,
                    V(Ra, {
                      get context() {
                        return e.context;
                      },
                      get block() {
                        return e.block;
                      },
                      get inputIndex() {
                        return e.inputIndex;
                      },
                      get isInputPrefillEnabled() {
                        return e.isInputPrefillEnabled;
                      },
                      onSubmit: i,
                      onSkip: a,
                    }),
                    null
                  ),
                  k(() => he(t, "data-blockid", e.block.id)),
                  t
                );
              },
            }),
          ];
        },
      })
    );
  },
  Ra = (e) => {
    const t = (t) => e.onSubmit(t),
      n = () => (e.isInputPrefillEnabled ? e.block.prefilledValue : void 0),
      r = () =>
        e.onSubmit({ value: e.block.options.labels.success ?? "Success" });
    return V(ne, {
      get children() {
        return [
          V(re, {
            get when() {
              return e.block.type === Pe.TEXT;
            },
            get children() {
              return V(Wo, {
                get block() {
                  return e.block;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.NUMBER;
            },
            get children() {
              return V(Yo, {
                get block() {
                  return e.block;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.EMAIL;
            },
            get children() {
              return V(Jo, {
                get block() {
                  return e.block;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.URL;
            },
            get children() {
              return V(ei, {
                get block() {
                  return e.block;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.PHONE;
            },
            get children() {
              return V(ai, {
                get labels() {
                  return e.block.options.labels;
                },
                get defaultCountryCode() {
                  return e.block.options.defaultCountryCode;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.DATE;
            },
            get children() {
              return V(di, {
                get options() {
                  return e.block.options;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return La(e.block);
            },
            keyed: !0,
            children: (n) =>
              V(ne, {
                get children() {
                  return [
                    V(re, {
                      get when() {
                        return !n.options.isMultipleChoice;
                      },
                      get children() {
                        return V(pa, {
                          get inputIndex() {
                            return e.inputIndex;
                          },
                          get defaultItems() {
                            return n.items;
                          },
                          get options() {
                            return n.options;
                          },
                          onSubmit: t,
                        });
                      },
                    }),
                    V(re, {
                      get when() {
                        return n.options.isMultipleChoice;
                      },
                      get children() {
                        return V(sa, {
                          get inputIndex() {
                            return e.inputIndex;
                          },
                          get defaultItems() {
                            return n.items;
                          },
                          get options() {
                            return n.options;
                          },
                          onSubmit: t,
                        });
                      },
                    }),
                  ];
                },
              }),
          }),
          V(re, {
            get when() {
              return Ma(e.block);
            },
            keyed: !0,
            children: (e) =>
              V(ne, {
                get children() {
                  return [
                    V(re, {
                      get when() {
                        return !e.options.isMultipleChoice;
                      },
                      get children() {
                        return V(ma, {
                          get defaultItems() {
                            return e.items;
                          },
                          get options() {
                            return e.options;
                          },
                          onSubmit: t,
                        });
                      },
                    }),
                    V(re, {
                      get when() {
                        return e.options.isMultipleChoice;
                      },
                      get children() {
                        return V(Ia, {
                          get defaultItems() {
                            return e.items;
                          },
                          get options() {
                            return e.options;
                          },
                          onSubmit: t,
                        });
                      },
                    }),
                  ];
                },
              }),
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.RATING;
            },
            get children() {
              return V(mi, {
                get block() {
                  return e.block;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: t,
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.FILE;
            },
            get children() {
              return V(Ni, {
                get context() {
                  return e.context;
                },
                get block() {
                  return e.block;
                },
                onSubmit: t,
                get onSkip() {
                  return e.onSkip;
                },
              });
            },
          }),
          V(re, {
            get when() {
              return e.block.type === Pe.PAYMENT;
            },
            get children() {
              return V(Fi, {
                get context() {
                  return e.context;
                },
                get options() {
                  return { ...e.block.options, ...e.block.runtimeOptions };
                },
                onSuccess: r,
              });
            },
          }),
        ];
      },
    });
  },
  La = (e) => (e?.type === Pe.CHOICE ? e : void 0),
  Ma = (e) => (e?.type === Pe.PICTURE_CHOICE ? e : void 0),
  ja = ue("<div><div>"),
  za = (e) => {
    let t;
    const [n, r] = _(0),
      o = new ResizeObserver((e) =>
        r(e[0].target.clientHeight - (mt() ? 24 : 40))
      );
    return (
      E(() => {
        t && o.observe(t);
      }),
      I(() => {
        t && o.unobserve(t);
      }),
      (() => {
        const r = ja(),
          o = r.firstChild;
        return (
          "function" == typeof t ? me(t, r) : (t = r),
          o.style.setProperty(
            "transition",
            "top 350ms ease-out, opacity 250ms ease-out"
          ),
          be(
            o,
            V(Ho, {
              get initialAvatarSrc() {
                return e.hostAvatarSrc;
              },
            })
          ),
          k(
            (t) => {
              const i =
                  "flex flex-shrink-0 items-center relative typebot-avatar-container " +
                  (mt() ? "w-6" : "w-10"),
                a =
                  "absolute flex items-center top-0" +
                  (mt() ? " w-6 h-6" : " w-10 h-10") +
                  (e.hideAvatar ? " opacity-0" : " opacity-100"),
                s = `${n()}px`;
              return (
                i !== t._v$ && fe(r, (t._v$ = i)),
                a !== t._v$2 && fe(o, (t._v$2 = a)),
                s !== t._v$3 &&
                  (null != (t._v$3 = s)
                    ? o.style.setProperty("top", s)
                    : o.style.removeProperty("top")),
                t
              );
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0 }
          ),
          r
        );
      })()
    );
  },
  [Da, Ba] = _();
function Za() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
let Ua = {
  async: !1,
  breaks: !1,
  extensions: null,
  gfm: !0,
  hooks: null,
  pedantic: !1,
  renderer: null,
  silent: !1,
  tokenizer: null,
  walkTokens: null,
};
function Fa(e) {
  Ua = e;
}
const Ha = /[&<>"']/,
  Va = new RegExp(Ha.source, "g"),
  Ga = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  qa = new RegExp(Ga.source, "g"),
  Wa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  Ka = (e) => Wa[e];
function Ya(e, t) {
  if (t) {
    if (Ha.test(e)) return e.replace(Va, Ka);
  } else if (Ga.test(e)) return e.replace(qa, Ka);
  return e;
}
const Xa = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function Ja(e) {
  return e.replace(Xa, (e, t) =>
    "colon" === (t = t.toLowerCase())
      ? ":"
      : "#" === t.charAt(0)
      ? "x" === t.charAt(1)
        ? String.fromCharCode(parseInt(t.substring(2), 16))
        : String.fromCharCode(+t.substring(1))
      : ""
  );
}
const Qa = /(^|[^\[])\^/g;
function es(e, t) {
  (e = "string" == typeof e ? e : e.source), (t = t || "");
  const n = {
    replace: (t, r) => (
      (r = (r = "object" == typeof r && "source" in r ? r.source : r).replace(
        Qa,
        "$1"
      )),
      (e = e.replace(t, r)),
      n
    ),
    getRegex: () => new RegExp(e, t),
  };
  return n;
}
function ts(e) {
  try {
    e = encodeURI(e).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return e;
}
const ns = { exec: () => null };
function rs(e, t) {
  const n = e
    .replace(/\|/g, (e, t, n) => {
      let r = !1,
        o = t;
      for (; --o >= 0 && "\\" === n[o]; ) r = !r;
      return r ? "|" : " |";
    })
    .split(/ \|/);
  let r = 0;
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    t)
  )
    if (n.length > t) n.splice(t);
    else for (; n.length < t; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
  return n;
}
function os(e, t, n) {
  const r = e.length;
  if (0 === r) return "";
  let o = 0;
  for (; o < r; ) {
    const i = e.charAt(r - o - 1);
    if (i !== t || n) {
      if (i === t || !n) break;
      o++;
    } else o++;
  }
  return e.slice(0, r - o);
}
function is(e, t, n, r) {
  const o = t.href,
    i = t.title ? Ya(t.title) : null,
    a = e[1].replace(/\\([\[\]])/g, "$1");
  if ("!" !== e[0].charAt(0)) {
    r.state.inLink = !0;
    const e = {
      type: "link",
      raw: n,
      href: o,
      title: i,
      text: a,
      tokens: r.inlineTokens(a),
    };
    return (r.state.inLink = !1), e;
  }
  return { type: "image", raw: n, href: o, title: i, text: Ya(a) };
}
class as {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || Ua;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const e = t[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? e : os(e, "\n"),
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const e = t[0],
        n = (function (e, t) {
          const n = e.match(/^(\s+)(?:```)/);
          if (null === n) return t;
          const r = n[1];
          return t
            .split("\n")
            .map((e) => {
              const t = e.match(/^\s+/);
              if (null === t) return e;
              const [n] = t;
              return n.length >= r.length ? e.slice(r.length) : e;
            })
            .join("\n");
        })(e, t[3] || "");
      return {
        type: "code",
        raw: e,
        lang: t[2]
          ? t[2].trim().replace(this.rules.inline._escapes, "$1")
          : t[2],
        text: n,
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let e = t[2].trim();
      if (/#$/.test(e)) {
        const t = os(e, "#");
        this.options.pedantic
          ? (e = t.trim())
          : (t && !/ $/.test(t)) || (e = t.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: e,
        tokens: this.lexer.inline(e),
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: t[0] };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      const e = t[0].replace(/^ *>[ \t]?/gm, ""),
        n = this.lexer.state.top;
      this.lexer.state.top = !0;
      const r = this.lexer.blockTokens(e);
      return (
        (this.lexer.state.top = n),
        { type: "blockquote", raw: t[0], tokens: r, text: e }
      );
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const r = n.length > 1,
        o = {
          type: "list",
          raw: "",
          ordered: r,
          start: r ? +n.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
        this.options.pedantic && (n = r ? n : "[*+-]");
      const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
      let a = "",
        s = "",
        l = !1;
      for (; e; ) {
        let n = !1;
        if (!(t = i.exec(e))) break;
        if (this.rules.block.hr.test(e)) break;
        (a = t[0]), (e = e.substring(a.length));
        let r = t[2]
            .split("\n", 1)[0]
            .replace(/^\t+/, (e) => " ".repeat(3 * e.length)),
          c = e.split("\n", 1)[0],
          d = 0;
        this.options.pedantic
          ? ((d = 2), (s = r.trimStart()))
          : ((d = t[2].search(/[^ ]/)),
            (d = d > 4 ? 1 : d),
            (s = r.slice(d)),
            (d += t[1].length));
        let u = !1;
        if (
          (!r &&
            /^ *$/.test(c) &&
            ((a += c + "\n"), (e = e.substring(c.length + 1)), (n = !0)),
          !n)
        ) {
          const t = new RegExp(
              `^ {0,${Math.min(
                3,
                d - 1
              )}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`
            ),
            n = new RegExp(
              `^ {0,${Math.min(
                3,
                d - 1
              )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            ),
            o = new RegExp(`^ {0,${Math.min(3, d - 1)}}(?:\`\`\`|~~~)`),
            i = new RegExp(`^ {0,${Math.min(3, d - 1)}}#`);
          for (; e; ) {
            const l = e.split("\n", 1)[0];
            if (
              ((c = l),
              this.options.pedantic &&
                (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
              o.test(c))
            )
              break;
            if (i.test(c)) break;
            if (t.test(c)) break;
            if (n.test(e)) break;
            if (c.search(/[^ ]/) >= d || !c.trim()) s += "\n" + c.slice(d);
            else {
              if (u) break;
              if (r.search(/[^ ]/) >= 4) break;
              if (o.test(r)) break;
              if (i.test(r)) break;
              if (n.test(r)) break;
              s += "\n" + c;
            }
            u || c.trim() || (u = !0),
              (a += l + "\n"),
              (e = e.substring(l.length + 1)),
              (r = c.slice(d));
          }
        }
        o.loose || (l ? (o.loose = !0) : /\n *\n *$/.test(a) && (l = !0));
        let p,
          h = null;
        this.options.gfm &&
          ((h = /^\[[ xX]\] /.exec(s)),
          h && ((p = "[ ] " !== h[0]), (s = s.replace(/^\[[ xX]\] +/, "")))),
          o.items.push({
            type: "list_item",
            raw: a,
            task: !!h,
            checked: p,
            loose: !1,
            text: s,
            tokens: [],
          }),
          (o.raw += a);
      }
      (o.items[o.items.length - 1].raw = a.trimEnd()),
        (o.items[o.items.length - 1].text = s.trimEnd()),
        (o.raw = o.raw.trimEnd());
      for (let e = 0; e < o.items.length; e++)
        if (
          ((this.lexer.state.top = !1),
          (o.items[e].tokens = this.lexer.blockTokens(o.items[e].text, [])),
          !o.loose)
        ) {
          const t = o.items[e].tokens.filter((e) => "space" === e.type),
            n = t.length > 0 && t.some((e) => /\n.*\n/.test(e.raw));
          o.loose = n;
        }
      if (o.loose)
        for (let e = 0; e < o.items.length; e++) o.items[e].loose = !0;
      return o;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t) {
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
        text: t[0],
      };
    }
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const e = t[1].toLowerCase().replace(/\s+/g, " "),
        n = t[2]
          ? t[2]
              .replace(/^<(.*)>$/, "$1")
              .replace(this.rules.inline._escapes, "$1")
          : "",
        r = t[3]
          ? t[3]
              .substring(1, t[3].length - 1)
              .replace(this.rules.inline._escapes, "$1")
          : t[3];
      return { type: "def", tag: e, raw: t[0], href: n, title: r };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (t) {
      if (!/[:|]/.test(t[2])) return;
      const e = {
        type: "table",
        raw: t[0],
        header: rs(t[1]).map((e) => ({ text: e, tokens: [] })),
        align: t[2].replace(/^\||\| *$/g, "").split("|"),
        rows:
          t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
      };
      if (e.header.length === e.align.length) {
        let t,
          n,
          r,
          o,
          i = e.align.length;
        for (t = 0; t < i; t++) {
          const n = e.align[t];
          n &&
            (/^ *-+: *$/.test(n)
              ? (e.align[t] = "right")
              : /^ *:-+: *$/.test(n)
              ? (e.align[t] = "center")
              : /^ *:-+ *$/.test(n)
              ? (e.align[t] = "left")
              : (e.align[t] = null));
        }
        for (i = e.rows.length, t = 0; t < i; t++)
          e.rows[t] = rs(e.rows[t], e.header.length).map((e) => ({
            text: e,
            tokens: [],
          }));
        for (i = e.header.length, n = 0; n < i; n++)
          e.header[n].tokens = this.lexer.inline(e.header[n].text);
        for (i = e.rows.length, n = 0; n < i; n++)
          for (o = e.rows[n], r = 0; r < o.length; r++)
            o[r].tokens = this.lexer.inline(o[r].text);
        return e;
      }
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: "=" === t[2].charAt(0) ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1]),
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const e =
        "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: e,
        tokens: this.lexer.inline(e),
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0]),
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: Ya(t[1]) };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return (
        !this.lexer.state.inLink && /^<a /i.test(t[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(t[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: "html",
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: t[0],
        }
      );
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const e = t[2].trim();
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e)) return;
        const t = os(e.slice(0, -1), "\\");
        if ((e.length - t.length) % 2 == 0) return;
      } else {
        const e = (function (e, t) {
          if (-1 === e.indexOf(t[1])) return -1;
          let n = 0;
          for (let r = 0; r < e.length; r++)
            if ("\\" === e[r]) r++;
            else if (e[r] === t[0]) n++;
            else if (e[r] === t[1] && (n--, n < 0)) return r;
          return -1;
        })(t[2], "()");
        if (e > -1) {
          const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
          (t[2] = t[2].substring(0, e)),
            (t[0] = t[0].substring(0, n).trim()),
            (t[3] = "");
        }
      }
      let n = t[2],
        r = "";
      if (this.options.pedantic) {
        const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
        e && ((n = e[1]), (r = e[3]));
      } else r = t[3] ? t[3].slice(1, -1) : "";
      return (
        (n = n.trim()),
        /^</.test(n) &&
          (n =
            this.options.pedantic && !/>$/.test(e)
              ? n.slice(1)
              : n.slice(1, -1)),
        is(
          t,
          {
            href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
            title: r ? r.replace(this.rules.inline._escapes, "$1") : r,
          },
          t[0],
          this.lexer
        )
      );
    }
  }
  reflink(e, t) {
    let n;
    if (
      (n = this.rules.inline.reflink.exec(e)) ||
      (n = this.rules.inline.nolink.exec(e))
    ) {
      let e = (n[2] || n[1]).replace(/\s+/g, " ");
      if (((e = t[e.toLowerCase()]), !e)) {
        const e = n[0].charAt(0);
        return { type: "text", raw: e, text: e };
      }
      return is(n, e, n[0], this.lexer);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrong.lDelim.exec(e);
    if (!r) return;
    if (r[3] && n.match(/[\p{L}\p{N}]/u)) return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const n = [...r[0]].length - 1;
      let o,
        i,
        a = n,
        s = 0;
      const l =
        "*" === r[0][0]
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd;
      for (
        l.lastIndex = 0, t = t.slice(-1 * e.length + r[0].length - 1);
        null != (r = l.exec(t));

      ) {
        if (((o = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !o)) continue;
        if (((i = [...o].length), r[3] || r[4])) {
          a += i;
          continue;
        }
        if ((r[5] || r[6]) && n % 3 && !((n + i) % 3)) {
          s += i;
          continue;
        }
        if (((a -= i), a > 0)) continue;
        i = Math.min(i, i + a + s);
        const t = [...e].slice(0, n + r.index + i + 1).join("");
        if (Math.min(n, i) % 2) {
          const e = t.slice(1, -1);
          return {
            type: "em",
            raw: t,
            text: e,
            tokens: this.lexer.inlineTokens(e),
          };
        }
        const l = t.slice(2, -2);
        return {
          type: "strong",
          raw: t,
          text: l,
          tokens: this.lexer.inlineTokens(l),
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let e = t[2].replace(/\n/g, " ");
      const n = /[^ ]/.test(e),
        r = /^ /.test(e) && / $/.test(e);
      return (
        n && r && (e = e.substring(1, e.length - 1)),
        (e = Ya(e, !0)),
        { type: "codespan", raw: t[0], text: e }
      );
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2]),
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let e, n;
      return (
        "@" === t[2]
          ? ((e = Ya(t[1])), (n = "mailto:" + e))
          : ((e = Ya(t[1])), (n = e)),
        {
          type: "link",
          raw: t[0],
          text: e,
          href: n,
          tokens: [{ type: "text", raw: e, text: e }],
        }
      );
    }
  }
  url(e) {
    let t;
    if ((t = this.rules.inline.url.exec(e))) {
      let e, n;
      if ("@" === t[2]) (e = Ya(t[0])), (n = "mailto:" + e);
      else {
        let r;
        do {
          (r = t[0]), (t[0] = this.rules.inline._backpedal.exec(t[0])[0]);
        } while (r !== t[0]);
        (e = Ya(t[0])), (n = "www." === t[1] ? "http://" + t[0] : t[0]);
      }
      return {
        type: "link",
        raw: t[0],
        text: e,
        href: n,
        tokens: [{ type: "text", raw: e, text: e }],
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let e;
      return (
        (e = this.lexer.state.inRawBlock ? t[0] : Ya(t[0])),
        { type: "text", raw: t[0], text: e }
      );
    }
  }
}
const ss = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: ns,
  lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
  _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
};
(ss.def = es(ss.def)
  .replace("label", ss._label)
  .replace("title", ss._title)
  .getRegex()),
  (ss.bullet = /(?:[*+-]|\d{1,9}[.)])/),
  (ss.listItemStart = es(/^( *)(bull) */)
    .replace("bull", ss.bullet)
    .getRegex()),
  (ss.list = es(ss.list)
    .replace(/bull/g, ss.bullet)
    .replace(
      "hr",
      "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
    )
    .replace("def", "\\n+(?=" + ss.def.source + ")")
    .getRegex()),
  (ss._tag =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
  (ss._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
  (ss.html = es(ss.html, "i")
    .replace("comment", ss._comment)
    .replace("tag", ss._tag)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex()),
  (ss.lheading = es(ss.lheading).replace(/bull/g, ss.bullet).getRegex()),
  (ss.paragraph = es(ss._paragraph)
    .replace("hr", ss.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ss._tag)
    .getRegex()),
  (ss.blockquote = es(ss.blockquote)
    .replace("paragraph", ss.paragraph)
    .getRegex()),
  (ss.normal = { ...ss }),
  (ss.gfm = {
    ...ss.normal,
    table:
      "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  }),
  (ss.gfm.table = es(ss.gfm.table)
    .replace("hr", ss.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ss._tag)
    .getRegex()),
  (ss.gfm.paragraph = es(ss._paragraph)
    .replace("hr", ss.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("table", ss.gfm.table)
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ss._tag)
    .getRegex()),
  (ss.pedantic = {
    ...ss.normal,
    html: es(
      "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))"
    )
      .replace("comment", ss._comment)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: ns,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: es(ss.normal._paragraph)
      .replace("hr", ss.hr)
      .replace("heading", " *#{1,6} *[^\n]")
      .replace("lheading", ss.lheading)
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .getRegex(),
  });
const ls = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: ns,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    rDelimAst:
      /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd:
      /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: ns,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/,
  _punctuation: "\\p{P}$+<=>`^|~",
};
(ls.punctuation = es(ls.punctuation, "u")
  .replace(/punctuation/g, ls._punctuation)
  .getRegex()),
  (ls.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g),
  (ls.anyPunctuation = /\\[punct]/g),
  (ls._escapes = /\\([punct])/g),
  (ls._comment = es(ss._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
  (ls.emStrong.lDelim = es(ls.emStrong.lDelim, "u")
    .replace(/punct/g, ls._punctuation)
    .getRegex()),
  (ls.emStrong.rDelimAst = es(ls.emStrong.rDelimAst, "gu")
    .replace(/punct/g, ls._punctuation)
    .getRegex()),
  (ls.emStrong.rDelimUnd = es(ls.emStrong.rDelimUnd, "gu")
    .replace(/punct/g, ls._punctuation)
    .getRegex()),
  (ls.anyPunctuation = es(ls.anyPunctuation, "gu")
    .replace(/punct/g, ls._punctuation)
    .getRegex()),
  (ls._escapes = es(ls._escapes, "gu")
    .replace(/punct/g, ls._punctuation)
    .getRegex()),
  (ls._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  (ls._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  (ls.autolink = es(ls.autolink)
    .replace("scheme", ls._scheme)
    .replace("email", ls._email)
    .getRegex()),
  (ls._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
  (ls.tag = es(ls.tag)
    .replace("comment", ls._comment)
    .replace("attribute", ls._attribute)
    .getRegex()),
  (ls._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
  (ls._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
  (ls._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
  (ls.link = es(ls.link)
    .replace("label", ls._label)
    .replace("href", ls._href)
    .replace("title", ls._title)
    .getRegex()),
  (ls.reflink = es(ls.reflink)
    .replace("label", ls._label)
    .replace("ref", ss._label)
    .getRegex()),
  (ls.nolink = es(ls.nolink).replace("ref", ss._label).getRegex()),
  (ls.reflinkSearch = es(ls.reflinkSearch, "g")
    .replace("reflink", ls.reflink)
    .replace("nolink", ls.nolink)
    .getRegex()),
  (ls.normal = { ...ls }),
  (ls.pedantic = {
    ...ls.normal,
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: es(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", ls._label)
      .getRegex(),
    reflink: es(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", ls._label)
      .getRegex(),
  }),
  (ls.gfm = {
    ...ls.normal,
    escape: es(ls.escape).replace("])", "~|])").getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  }),
  (ls.gfm.url = es(ls.gfm.url, "i")
    .replace("email", ls.gfm._extended_email)
    .getRegex()),
  (ls.breaks = {
    ...ls.gfm,
    br: es(ls.br).replace("{2,}", "*").getRegex(),
    text: es(ls.gfm.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  });
class cs {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || Ua),
      (this.options.tokenizer = this.options.tokenizer || new as()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const t = { block: ss.normal, inline: ls.normal };
    this.options.pedantic
      ? ((t.block = ss.pedantic), (t.inline = ls.pedantic))
      : this.options.gfm &&
        ((t.block = ss.gfm),
        this.options.breaks ? (t.inline = ls.breaks) : (t.inline = ls.gfm)),
      (this.tokenizer.rules = t);
  }
  static get rules() {
    return { block: ss, inline: ls };
  }
  static lex(e, t) {
    return new cs(t).lex(e);
  }
  static lexInline(e, t) {
    return new cs(t).inlineTokens(e);
  }
  lex(e) {
    let t;
    for (
      e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
      (t = this.inlineQueue.shift());

    )
      this.inlineTokens(t.src, t.tokens);
    return this.tokens;
  }
  blockTokens(e, t = []) {
    let n, r, o, i;
    for (
      e = this.options.pedantic
        ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "")
        : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + "    ".repeat(n.length));
      e;

    )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some(
            (r) =>
              !!(n = r.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        )
      )
        if ((n = this.tokenizer.space(e)))
          (e = e.substring(n.raw.length)),
            1 === n.raw.length && t.length > 0
              ? (t[t.length - 1].raw += "\n")
              : t.push(n);
        else if ((n = this.tokenizer.code(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            !r || ("paragraph" !== r.type && "text" !== r.type)
              ? t.push(n)
              : ((r.raw += "\n" + n.raw),
                (r.text += "\n" + n.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = r.text));
        else if ((n = this.tokenizer.fences(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.heading(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.hr(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.blockquote(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.list(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.html(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.def(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            !r || ("paragraph" !== r.type && "text" !== r.type)
              ? this.tokens.links[n.tag] ||
                (this.tokens.links[n.tag] = { href: n.href, title: n.title })
              : ((r.raw += "\n" + n.raw),
                (r.text += "\n" + n.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = r.text));
        else if ((n = this.tokenizer.table(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.lheading(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else {
          if (
            ((o = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let t = 1 / 0;
            const n = e.slice(1);
            let r;
            this.options.extensions.startBlock.forEach((e) => {
              (r = e.call({ lexer: this }, n)),
                "number" == typeof r && r >= 0 && (t = Math.min(t, r));
            }),
              t < 1 / 0 && t >= 0 && (o = e.substring(0, t + 1));
          }
          if (this.state.top && (n = this.tokenizer.paragraph(o)))
            (r = t[t.length - 1]),
              i && "paragraph" === r.type
                ? ((r.raw += "\n" + n.raw),
                  (r.text += "\n" + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : t.push(n),
              (i = o.length !== e.length),
              (e = e.substring(n.raw.length));
          else if ((n = this.tokenizer.text(e)))
            (e = e.substring(n.raw.length)),
              (r = t[t.length - 1]),
              r && "text" === r.type
                ? ((r.raw += "\n" + n.raw),
                  (r.text += "\n" + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : t.push(n);
          else if (e) {
            const t = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(t);
              break;
            }
            throw new Error(t);
          }
        }
    return (this.state.top = !0), t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    let n,
      r,
      o,
      i,
      a,
      s,
      l = e;
    if (this.tokens.links) {
      const e = Object.keys(this.tokens.links);
      if (e.length > 0)
        for (
          ;
          null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(l));

        )
          e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) &&
            (l =
              l.slice(0, i.index) +
              "[" +
              "a".repeat(i[0].length - 2) +
              "]" +
              l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(l)); )
      l =
        l.slice(0, i.index) +
        "[" +
        "a".repeat(i[0].length - 2) +
        "]" +
        l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(l)); )
      l =
        l.slice(0, i.index) +
        "++" +
        l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (
        (a || (s = ""),
        (a = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some(
            (r) =>
              !!(n = r.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        ))
      )
        if ((n = this.tokenizer.escape(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.tag(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            r && "text" === n.type && "text" === r.type
              ? ((r.raw += n.raw), (r.text += n.text))
              : t.push(n);
        else if ((n = this.tokenizer.link(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            r && "text" === n.type && "text" === r.type
              ? ((r.raw += n.raw), (r.text += n.text))
              : t.push(n);
        else if ((n = this.tokenizer.emStrong(e, l, s)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.codespan(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.br(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.del(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.autolink(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
          if (
            ((o = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let t = 1 / 0;
            const n = e.slice(1);
            let r;
            this.options.extensions.startInline.forEach((e) => {
              (r = e.call({ lexer: this }, n)),
                "number" == typeof r && r >= 0 && (t = Math.min(t, r));
            }),
              t < 1 / 0 && t >= 0 && (o = e.substring(0, t + 1));
          }
          if ((n = this.tokenizer.inlineText(o)))
            (e = e.substring(n.raw.length)),
              "_" !== n.raw.slice(-1) && (s = n.raw.slice(-1)),
              (a = !0),
              (r = t[t.length - 1]),
              r && "text" === r.type
                ? ((r.raw += n.raw), (r.text += n.text))
                : t.push(n);
          else if (e) {
            const t = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(t);
              break;
            }
            throw new Error(t);
          }
        } else (e = e.substring(n.raw.length)), t.push(n);
    return t;
  }
}
class ds {
  options;
  constructor(e) {
    this.options = e || Ua;
  }
  code(e, t, n) {
    const r = (t || "").match(/^\S*/)?.[0];
    return (
      (e = e.replace(/\n$/, "") + "\n"),
      r
        ? '<pre><code class="language-' +
          Ya(r) +
          '">' +
          (n ? e : Ya(e, !0)) +
          "</code></pre>\n"
        : "<pre><code>" + (n ? e : Ya(e, !0)) + "</code></pre>\n"
    );
  }
  blockquote(e) {
    return `<blockquote>\n${e}</blockquote>\n`;
  }
  html(e, t) {
    return e;
  }
  heading(e, t, n) {
    return `<h${t}>${e}</h${t}>\n`;
  }
  hr() {
    return "<hr>\n";
  }
  list(e, t, n) {
    const r = t ? "ol" : "ul";
    return (
      "<" +
      r +
      (t && 1 !== n ? ' start="' + n + '"' : "") +
      ">\n" +
      e +
      "</" +
      r +
      ">\n"
    );
  }
  listitem(e, t, n) {
    return `<li>${e}</li>\n`;
  }
  checkbox(e) {
    return (
      "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    );
  }
  paragraph(e) {
    return `<p>${e}</p>\n`;
  }
  table(e, t) {
    return (
      t && (t = `<tbody>${t}</tbody>`),
      "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
    );
  }
  tablerow(e) {
    return `<tr>\n${e}</tr>\n`;
  }
  tablecell(e, t) {
    const n = t.header ? "th" : "td";
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`;
  }
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, t, n) {
    const r = ts(e);
    if (null === r) return n;
    let o = '<a href="' + (e = r) + '"';
    return t && (o += ' title="' + t + '"'), (o += ">" + n + "</a>"), o;
  }
  image(e, t, n) {
    const r = ts(e);
    if (null === r) return n;
    let o = `<img src="${(e = r)}" alt="${n}"`;
    return t && (o += ` title="${t}"`), (o += ">"), o;
  }
  text(e) {
    return e;
  }
}
class us {
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, t, n) {
    return "" + n;
  }
  image(e, t, n) {
    return "" + n;
  }
  br() {
    return "";
  }
}
class ps {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    (this.options = e || Ua),
      (this.options.renderer = this.options.renderer || new ds()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new us());
  }
  static parse(e, t) {
    return new ps(t).parse(e);
  }
  static parseInline(e, t) {
    return new ps(t).parseInline(e);
  }
  parse(e, t = !0) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const o = e[r];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[o.type]
      ) {
        const e = o,
          t = this.options.extensions.renderers[e.type].call(
            { parser: this },
            e
          );
        if (
          !1 !== t ||
          ![
            "space",
            "hr",
            "heading",
            "code",
            "table",
            "blockquote",
            "list",
            "html",
            "paragraph",
            "text",
          ].includes(e.type)
        ) {
          n += t || "";
          continue;
        }
      }
      switch (o.type) {
        case "space":
          continue;
        case "hr":
          n += this.renderer.hr();
          continue;
        case "heading": {
          const e = o;
          n += this.renderer.heading(
            this.parseInline(e.tokens),
            e.depth,
            Ja(this.parseInline(e.tokens, this.textRenderer))
          );
          continue;
        }
        case "code": {
          const e = o;
          n += this.renderer.code(e.text, e.lang, !!e.escaped);
          continue;
        }
        case "table": {
          const e = o;
          let t = "",
            r = "";
          for (let t = 0; t < e.header.length; t++)
            r += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
              header: !0,
              align: e.align[t],
            });
          t += this.renderer.tablerow(r);
          let i = "";
          for (let t = 0; t < e.rows.length; t++) {
            const n = e.rows[t];
            r = "";
            for (let t = 0; t < n.length; t++)
              r += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                header: !1,
                align: e.align[t],
              });
            i += this.renderer.tablerow(r);
          }
          n += this.renderer.table(t, i);
          continue;
        }
        case "blockquote": {
          const e = o,
            t = this.parse(e.tokens);
          n += this.renderer.blockquote(t);
          continue;
        }
        case "list": {
          const e = o,
            t = e.ordered,
            r = e.start,
            i = e.loose;
          let a = "";
          for (let t = 0; t < e.items.length; t++) {
            const n = e.items[t],
              r = n.checked,
              o = n.task;
            let s = "";
            if (n.task) {
              const e = this.renderer.checkbox(!!r);
              i
                ? n.tokens.length > 0 && "paragraph" === n.tokens[0].type
                  ? ((n.tokens[0].text = e + " " + n.tokens[0].text),
                    n.tokens[0].tokens &&
                      n.tokens[0].tokens.length > 0 &&
                      "text" === n.tokens[0].tokens[0].type &&
                      (n.tokens[0].tokens[0].text =
                        e + " " + n.tokens[0].tokens[0].text))
                  : n.tokens.unshift({ type: "text", text: e + " " })
                : (s += e + " ");
            }
            (s += this.parse(n.tokens, i)),
              (a += this.renderer.listitem(s, o, !!r));
          }
          n += this.renderer.list(a, t, r);
          continue;
        }
        case "html": {
          const e = o;
          n += this.renderer.html(e.text, e.block);
          continue;
        }
        case "paragraph": {
          const e = o;
          n += this.renderer.paragraph(this.parseInline(e.tokens));
          continue;
        }
        case "text": {
          let i = o,
            a = i.tokens ? this.parseInline(i.tokens) : i.text;
          for (; r + 1 < e.length && "text" === e[r + 1].type; )
            (i = e[++r]),
              (a += "\n" + (i.tokens ? this.parseInline(i.tokens) : i.text));
          n += t ? this.renderer.paragraph(a) : a;
          continue;
        }
        default: {
          const e = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent) return console.error(e), "";
          throw new Error(e);
        }
      }
    }
    return n;
  }
  parseInline(e, t) {
    t = t || this.renderer;
    let n = "";
    for (let r = 0; r < e.length; r++) {
      const o = e[r];
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[o.type]
      ) {
        const e = this.options.extensions.renderers[o.type].call(
          { parser: this },
          o
        );
        if (
          !1 !== e ||
          ![
            "escape",
            "html",
            "link",
            "image",
            "strong",
            "em",
            "codespan",
            "br",
            "del",
            "text",
          ].includes(o.type)
        ) {
          n += e || "";
          continue;
        }
      }
      switch (o.type) {
        case "escape": {
          const e = o;
          n += t.text(e.text);
          break;
        }
        case "html": {
          const e = o;
          n += t.html(e.text);
          break;
        }
        case "link": {
          const e = o;
          n += t.link(e.href, e.title, this.parseInline(e.tokens, t));
          break;
        }
        case "image": {
          const e = o;
          n += t.image(e.href, e.title, e.text);
          break;
        }
        case "strong": {
          const e = o;
          n += t.strong(this.parseInline(e.tokens, t));
          break;
        }
        case "em": {
          const e = o;
          n += t.em(this.parseInline(e.tokens, t));
          break;
        }
        case "codespan": {
          const e = o;
          n += t.codespan(e.text);
          break;
        }
        case "br":
          n += t.br();
          break;
        case "del": {
          const e = o;
          n += t.del(this.parseInline(e.tokens, t));
          break;
        }
        case "text": {
          const e = o;
          n += t.text(e.text);
          break;
        }
        default: {
          const e = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent) return console.error(e), "";
          throw new Error(e);
        }
      }
    }
    return n;
  }
}
class hs {
  options;
  constructor(e) {
    this.options = e || Ua;
  }
  static passThroughHooks = new Set(["preprocess", "postprocess"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
}
const fs = new (class {
  defaults = {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
  options = this.setOptions;
  parse = this.#e(cs.lex, ps.parse);
  parseInline = this.#e(cs.lexInline, ps.parseInline);
  Parser = ps;
  parser = ps.parse;
  Renderer = ds;
  TextRenderer = us;
  Lexer = cs;
  lexer = cs.lex;
  Tokenizer = as;
  Hooks = hs;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (const r of e)
      switch (((n = n.concat(t.call(this, r))), r.type)) {
        case "table": {
          const e = r;
          for (const r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
          for (const r of e.rows)
            for (const e of r) n = n.concat(this.walkTokens(e.tokens, t));
          break;
        }
        case "list": {
          const e = r;
          n = n.concat(this.walkTokens(e.items, t));
          break;
        }
        default: {
          const e = r;
          this.defaults.extensions?.childTokens?.[e.type]
            ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
                n = n.concat(this.walkTokens(e[r], t));
              })
            : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return (
      e.forEach((e) => {
        const n = { ...e };
        if (
          ((n.async = this.defaults.async || n.async || !1),
          e.extensions &&
            (e.extensions.forEach((e) => {
              if (!e.name) throw new Error("extension name required");
              if ("renderer" in e) {
                const n = t.renderers[e.name];
                t.renderers[e.name] = n
                  ? function (...t) {
                      let r = e.renderer.apply(this, t);
                      return !1 === r && (r = n.apply(this, t)), r;
                    }
                  : e.renderer;
              }
              if ("tokenizer" in e) {
                if (!e.level || ("block" !== e.level && "inline" !== e.level))
                  throw new Error(
                    "extension level must be 'block' or 'inline'"
                  );
                const n = t[e.level];
                n ? n.unshift(e.tokenizer) : (t[e.level] = [e.tokenizer]),
                  e.start &&
                    ("block" === e.level
                      ? t.startBlock
                        ? t.startBlock.push(e.start)
                        : (t.startBlock = [e.start])
                      : "inline" === e.level &&
                        (t.startInline
                          ? t.startInline.push(e.start)
                          : (t.startInline = [e.start])));
              }
              "childTokens" in e &&
                e.childTokens &&
                (t.childTokens[e.name] = e.childTokens);
            }),
            (n.extensions = t)),
          e.renderer)
        ) {
          const t = this.defaults.renderer || new ds(this.defaults);
          for (const n in e.renderer) {
            const r = e.renderer[n],
              o = n,
              i = t[o];
            t[o] = (...e) => {
              let n = r.apply(t, e);
              return !1 === n && (n = i.apply(t, e)), n || "";
            };
          }
          n.renderer = t;
        }
        if (e.tokenizer) {
          const t = this.defaults.tokenizer || new as(this.defaults);
          for (const n in e.tokenizer) {
            const r = e.tokenizer[n],
              o = n,
              i = t[o];
            t[o] = (...e) => {
              let n = r.apply(t, e);
              return !1 === n && (n = i.apply(t, e)), n;
            };
          }
          n.tokenizer = t;
        }
        if (e.hooks) {
          const t = this.defaults.hooks || new hs();
          for (const n in e.hooks) {
            const r = e.hooks[n],
              o = n,
              i = t[o];
            hs.passThroughHooks.has(n)
              ? (t[o] = (e) => {
                  if (this.defaults.async)
                    return Promise.resolve(r.call(t, e)).then((e) =>
                      i.call(t, e)
                    );
                  const n = r.call(t, e);
                  return i.call(t, n);
                })
              : (t[o] = (...e) => {
                  let n = r.apply(t, e);
                  return !1 === n && (n = i.apply(t, e)), n;
                });
          }
          n.hooks = t;
        }
        if (e.walkTokens) {
          const t = this.defaults.walkTokens,
            r = e.walkTokens;
          n.walkTokens = function (e) {
            let n = [];
            return (
              n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n
            );
          };
        }
        this.defaults = { ...this.defaults, ...n };
      }),
      this
    );
  }
  setOptions(e) {
    return (this.defaults = { ...this.defaults, ...e }), this;
  }
  #e(e, t) {
    return (n, r) => {
      const o = { ...r },
        i = { ...this.defaults, ...o };
      !0 === this.defaults.async &&
        !1 === o.async &&
        (i.silent ||
          console.warn(
            "marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."
          ),
        (i.async = !0));
      const a = this.#t(!!i.silent, !!i.async);
      if (null == n)
        return a(new Error("marked(): input parameter is undefined or null"));
      if ("string" != typeof n)
        return a(
          new Error(
            "marked(): input parameter is of type " +
              Object.prototype.toString.call(n) +
              ", string expected"
          )
        );
      if ((i.hooks && (i.hooks.options = i), i.async))
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n)
          .then((t) => e(t, i))
          .then((e) =>
            i.walkTokens
              ? Promise.all(this.walkTokens(e, i.walkTokens)).then(() => e)
              : e
          )
          .then((e) => t(e, i))
          .then((e) => (i.hooks ? i.hooks.postprocess(e) : e))
          .catch(a);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        const r = e(n, i);
        i.walkTokens && this.walkTokens(r, i.walkTokens);
        let o = t(r, i);
        return i.hooks && (o = i.hooks.postprocess(o)), o;
      } catch (e) {
        return a(e);
      }
    };
  }
  #t(e, t) {
    return (n) => {
      if (
        ((n.message +=
          "\nPlease report this to https://github.com/markedjs/marked."),
        e)
      ) {
        const e =
          "<p>An error occurred:</p><pre>" + Ya(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(e) : e;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
})();
function gs(e, t) {
  return fs.parse(e, t);
}
(gs.options = gs.setOptions =
  function (e) {
    return fs.setOptions(e), (gs.defaults = fs.defaults), Fa(gs.defaults), gs;
  }),
  (gs.getDefaults = Za),
  (gs.defaults = Ua),
  (gs.use = function (...e) {
    return fs.use(...e), (gs.defaults = fs.defaults), Fa(gs.defaults), gs;
  }),
  (gs.walkTokens = function (e, t) {
    return fs.walkTokens(e, t);
  }),
  (gs.parseInline = fs.parseInline),
  (gs.Parser = ps),
  (gs.parser = ps.parse),
  (gs.Renderer = ds),
  (gs.TextRenderer = us),
  (gs.Lexer = cs),
  (gs.lexer = cs.lex),
  (gs.Tokenizer = as),
  (gs.Hooks = hs),
  (gs.parse = gs),
  gs.options,
  gs.setOptions,
  gs.use,
  gs.walkTokens,
  gs.parseInline;
const {
  entries: ms,
  setPrototypeOf: bs,
  isFrozen: ys,
  getPrototypeOf: vs,
  getOwnPropertyDescriptor: ws,
} = Object;
let { freeze: xs, seal: _s, create: ks } = Object,
  { apply: Ts, construct: Ss } = "undefined" != typeof Reflect && Reflect;
xs ||
  (xs = function (e) {
    return e;
  }),
  _s ||
    (_s = function (e) {
      return e;
    }),
  Ts ||
    (Ts = function (e, t, n) {
      return e.apply(t, n);
    }),
  Ss ||
    (Ss = function (e, t) {
      return new e(...t);
    });
const Cs = zs(Array.prototype.forEach),
  Es = zs(Array.prototype.pop),
  Is = zs(Array.prototype.push),
  $s = zs(String.prototype.toLowerCase),
  As = zs(String.prototype.toString),
  Ps = zs(String.prototype.match),
  Ns = zs(String.prototype.replace),
  Os = zs(String.prototype.indexOf),
  Rs = zs(String.prototype.trim),
  Ls = zs(RegExp.prototype.test),
  Ms =
    ((js = TypeError),
    function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return Ss(js, t);
    });
var js;
function zs(e) {
  return function (t) {
    for (
      var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      r[o - 1] = arguments[o];
    return Ts(e, t, r);
  };
}
function Ds(e, t) {
  let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : $s;
  bs && bs(e, null);
  let r = t.length;
  for (; r--; ) {
    let o = t[r];
    if ("string" == typeof o) {
      const e = n(o);
      e !== o && (ys(t) || (t[r] = e), (o = e));
    }
    e[o] = !0;
  }
  return e;
}
function Bs(e) {
  const t = ks(null);
  for (const [n, r] of ms(e)) void 0 !== ws(e, n) && (t[n] = r);
  return t;
}
function Zs(e, t) {
  for (; null !== e; ) {
    const n = ws(e, t);
    if (n) {
      if (n.get) return zs(n.get);
      if ("function" == typeof n.value) return zs(n.value);
    }
    e = vs(e);
  }
  return function (e) {
    return console.warn("fallback value for", e), null;
  };
}
const Us = xs([
    "a",
    "abbr",
    "acronym",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "blink",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "content",
    "data",
    "datalist",
    "dd",
    "decorator",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "element",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meter",
    "nav",
    "nobr",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "select",
    "shadow",
    "small",
    "source",
    "spacer",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
  ]),
  Fs = xs([
    "svg",
    "a",
    "altglyph",
    "altglyphdef",
    "altglyphitem",
    "animatecolor",
    "animatemotion",
    "animatetransform",
    "circle",
    "clippath",
    "defs",
    "desc",
    "ellipse",
    "filter",
    "font",
    "g",
    "glyph",
    "glyphref",
    "hkern",
    "image",
    "line",
    "lineargradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialgradient",
    "rect",
    "stop",
    "style",
    "switch",
    "symbol",
    "text",
    "textpath",
    "title",
    "tref",
    "tspan",
    "view",
    "vkern",
  ]),
  Hs = xs([
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
  ]),
  Vs = xs([
    "animate",
    "color-profile",
    "cursor",
    "discard",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignobject",
    "hatch",
    "hatchpath",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "missing-glyph",
    "script",
    "set",
    "solidcolor",
    "unknown",
    "use",
  ]),
  Gs = xs([
    "math",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mglyph",
    "mi",
    "mlabeledtr",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "mprescripts",
  ]),
  qs = xs([
    "maction",
    "maligngroup",
    "malignmark",
    "mlongdiv",
    "mscarries",
    "mscarry",
    "msgroup",
    "mstack",
    "msline",
    "msrow",
    "semantics",
    "annotation",
    "annotation-xml",
    "mprescripts",
    "none",
  ]),
  Ws = xs(["#text"]),
  Ks = xs([
    "accept",
    "action",
    "align",
    "alt",
    "autocapitalize",
    "autocomplete",
    "autopictureinpicture",
    "autoplay",
    "background",
    "bgcolor",
    "border",
    "capture",
    "cellpadding",
    "cellspacing",
    "checked",
    "cite",
    "class",
    "clear",
    "color",
    "cols",
    "colspan",
    "controls",
    "controlslist",
    "coords",
    "crossorigin",
    "datetime",
    "decoding",
    "default",
    "dir",
    "disabled",
    "disablepictureinpicture",
    "disableremoteplayback",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "face",
    "for",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "id",
    "inputmode",
    "integrity",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "multiple",
    "muted",
    "name",
    "nonce",
    "noshade",
    "novalidate",
    "nowrap",
    "open",
    "optimum",
    "pattern",
    "placeholder",
    "playsinline",
    "poster",
    "preload",
    "pubdate",
    "radiogroup",
    "readonly",
    "rel",
    "required",
    "rev",
    "reversed",
    "role",
    "rows",
    "rowspan",
    "spellcheck",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "span",
    "srclang",
    "start",
    "src",
    "srcset",
    "step",
    "style",
    "summary",
    "tabindex",
    "title",
    "translate",
    "type",
    "usemap",
    "valign",
    "value",
    "width",
    "xmlns",
    "slot",
  ]),
  Ys = xs([
    "accent-height",
    "accumulate",
    "additive",
    "alignment-baseline",
    "ascent",
    "attributename",
    "attributetype",
    "azimuth",
    "basefrequency",
    "baseline-shift",
    "begin",
    "bias",
    "by",
    "class",
    "clip",
    "clippathunits",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cx",
    "cy",
    "d",
    "dx",
    "dy",
    "diffuseconstant",
    "direction",
    "display",
    "divisor",
    "dur",
    "edgemode",
    "elevation",
    "end",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "filterunits",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyph-name",
    "glyphref",
    "gradientunits",
    "gradienttransform",
    "height",
    "href",
    "id",
    "image-rendering",
    "in",
    "in2",
    "k",
    "k1",
    "k2",
    "k3",
    "k4",
    "kerning",
    "keypoints",
    "keysplines",
    "keytimes",
    "lang",
    "lengthadjust",
    "letter-spacing",
    "kernelmatrix",
    "kernelunitlength",
    "lighting-color",
    "local",
    "marker-end",
    "marker-mid",
    "marker-start",
    "markerheight",
    "markerunits",
    "markerwidth",
    "maskcontentunits",
    "maskunits",
    "max",
    "mask",
    "media",
    "method",
    "mode",
    "min",
    "name",
    "numoctaves",
    "offset",
    "operator",
    "opacity",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "paint-order",
    "path",
    "pathlength",
    "patterncontentunits",
    "patterntransform",
    "patternunits",
    "points",
    "preservealpha",
    "preserveaspectratio",
    "primitiveunits",
    "r",
    "rx",
    "ry",
    "radius",
    "refx",
    "refy",
    "repeatcount",
    "repeatdur",
    "restart",
    "result",
    "rotate",
    "scale",
    "seed",
    "shape-rendering",
    "specularconstant",
    "specularexponent",
    "spreadmethod",
    "startoffset",
    "stddeviation",
    "stitchtiles",
    "stop-color",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke",
    "stroke-width",
    "style",
    "surfacescale",
    "systemlanguage",
    "tabindex",
    "targetx",
    "targety",
    "transform",
    "transform-origin",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "textlength",
    "type",
    "u1",
    "u2",
    "unicode",
    "values",
    "viewbox",
    "visibility",
    "version",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "width",
    "word-spacing",
    "wrap",
    "writing-mode",
    "xchannelselector",
    "ychannelselector",
    "x",
    "x1",
    "x2",
    "xmlns",
    "y",
    "y1",
    "y2",
    "z",
    "zoomandpan",
  ]),
  Xs = xs([
    "accent",
    "accentunder",
    "align",
    "bevelled",
    "close",
    "columnsalign",
    "columnlines",
    "columnspan",
    "denomalign",
    "depth",
    "dir",
    "display",
    "displaystyle",
    "encoding",
    "fence",
    "frame",
    "height",
    "href",
    "id",
    "largeop",
    "length",
    "linethickness",
    "lspace",
    "lquote",
    "mathbackground",
    "mathcolor",
    "mathsize",
    "mathvariant",
    "maxsize",
    "minsize",
    "movablelimits",
    "notation",
    "numalign",
    "open",
    "rowalign",
    "rowlines",
    "rowspacing",
    "rowspan",
    "rspace",
    "rquote",
    "scriptlevel",
    "scriptminsize",
    "scriptsizemultiplier",
    "selection",
    "separator",
    "separators",
    "stretchy",
    "subscriptshift",
    "supscriptshift",
    "symmetric",
    "voffset",
    "width",
    "xmlns",
  ]),
  Js = xs(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
  Qs = _s(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
  el = _s(/<%[\w\W]*|[\w\W]*%>/gm),
  tl = _s(/\${[\w\W]*}/gm),
  nl = _s(/^data-[\-\w.\u00B7-\uFFFF]/),
  rl = _s(/^aria-[\-\w]+$/),
  ol = _s(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  ),
  il = _s(/^(?:\w+script|data):/i),
  al = _s(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  sl = _s(/^html$/i);
var ll = Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Qs,
  ERB_EXPR: el,
  TMPLIT_EXPR: tl,
  DATA_ATTR: nl,
  ARIA_ATTR: rl,
  IS_ALLOWED_URI: ol,
  IS_SCRIPT_OR_DATA: il,
  ATTR_WHITESPACE: al,
  DOCTYPE_NAME: sl,
});
const cl = function () {
  return "undefined" == typeof window ? null : window;
};
var dl = (function e() {
  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : cl();
  const n = (t) => e(t);
  if (
    ((n.version = "3.0.6"),
    (n.removed = []),
    !t || !t.document || 9 !== t.document.nodeType)
  )
    return (n.isSupported = !1), n;
  let { document: r } = t;
  const o = r,
    i = o.currentScript,
    {
      DocumentFragment: a,
      HTMLTemplateElement: s,
      Node: l,
      Element: c,
      NodeFilter: d,
      NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
      HTMLFormElement: p,
      DOMParser: h,
      trustedTypes: f,
    } = t,
    g = c.prototype,
    m = Zs(g, "cloneNode"),
    b = Zs(g, "nextSibling"),
    y = Zs(g, "childNodes"),
    v = Zs(g, "parentNode");
  if ("function" == typeof s) {
    const e = r.createElement("template");
    e.content && e.content.ownerDocument && (r = e.content.ownerDocument);
  }
  let w,
    x = "";
  const {
      implementation: _,
      createNodeIterator: k,
      createDocumentFragment: T,
      getElementsByTagName: S,
    } = r,
    { importNode: C } = o;
  let E = {};
  n.isSupported =
    "function" == typeof ms &&
    "function" == typeof v &&
    _ &&
    void 0 !== _.createHTMLDocument;
  const {
    MUSTACHE_EXPR: I,
    ERB_EXPR: $,
    TMPLIT_EXPR: A,
    DATA_ATTR: P,
    ARIA_ATTR: N,
    IS_SCRIPT_OR_DATA: O,
    ATTR_WHITESPACE: R,
  } = ll;
  let { IS_ALLOWED_URI: L } = ll,
    M = null;
  const j = Ds({}, [...Us, ...Fs, ...Hs, ...Gs, ...Ws]);
  let z = null;
  const D = Ds({}, [...Ks, ...Ys, ...Xs, ...Js]);
  let B = Object.seal(
      ks(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      })
    ),
    Z = null,
    U = null,
    F = !0,
    H = !0,
    V = !1,
    G = !0,
    q = !1,
    W = !1,
    K = !1,
    Y = !1,
    X = !1,
    J = !1,
    Q = !1,
    ee = !0,
    te = !1,
    ne = !0,
    re = !1,
    oe = {},
    ie = null;
  const ae = Ds({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp",
  ]);
  let se = null;
  const le = Ds({}, ["audio", "video", "img", "source", "image", "track"]);
  let ce = null;
  const de = Ds({}, [
      "alt",
      "class",
      "for",
      "id",
      "label",
      "name",
      "pattern",
      "placeholder",
      "role",
      "summary",
      "title",
      "value",
      "style",
      "xmlns",
    ]),
    ue = "http://www.w3.org/1998/Math/MathML",
    pe = "http://www.w3.org/2000/svg",
    he = "http://www.w3.org/1999/xhtml";
  let fe = he,
    ge = !1,
    me = null;
  const be = Ds({}, [ue, pe, he], As);
  let ye = null;
  const ve = ["application/xhtml+xml", "text/html"];
  let we = null,
    xe = null;
  const _e = r.createElement("form"),
    ke = function (e) {
      return e instanceof RegExp || e instanceof Function;
    },
    Te = function () {
      let e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      if (!xe || xe !== e) {
        if (
          ((e && "object" == typeof e) || (e = {}),
          (e = Bs(e)),
          (ye = ye =
            -1 === ve.indexOf(e.PARSER_MEDIA_TYPE)
              ? "text/html"
              : e.PARSER_MEDIA_TYPE),
          (we = "application/xhtml+xml" === ye ? As : $s),
          (M = "ALLOWED_TAGS" in e ? Ds({}, e.ALLOWED_TAGS, we) : j),
          (z = "ALLOWED_ATTR" in e ? Ds({}, e.ALLOWED_ATTR, we) : D),
          (me =
            "ALLOWED_NAMESPACES" in e ? Ds({}, e.ALLOWED_NAMESPACES, As) : be),
          (ce =
            "ADD_URI_SAFE_ATTR" in e
              ? Ds(Bs(de), e.ADD_URI_SAFE_ATTR, we)
              : de),
          (se =
            "ADD_DATA_URI_TAGS" in e
              ? Ds(Bs(le), e.ADD_DATA_URI_TAGS, we)
              : le),
          (ie = "FORBID_CONTENTS" in e ? Ds({}, e.FORBID_CONTENTS, we) : ae),
          (Z = "FORBID_TAGS" in e ? Ds({}, e.FORBID_TAGS, we) : {}),
          (U = "FORBID_ATTR" in e ? Ds({}, e.FORBID_ATTR, we) : {}),
          (oe = "USE_PROFILES" in e && e.USE_PROFILES),
          (F = !1 !== e.ALLOW_ARIA_ATTR),
          (H = !1 !== e.ALLOW_DATA_ATTR),
          (V = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
          (G = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR),
          (q = e.SAFE_FOR_TEMPLATES || !1),
          (W = e.WHOLE_DOCUMENT || !1),
          (X = e.RETURN_DOM || !1),
          (J = e.RETURN_DOM_FRAGMENT || !1),
          (Q = e.RETURN_TRUSTED_TYPE || !1),
          (Y = e.FORCE_BODY || !1),
          (ee = !1 !== e.SANITIZE_DOM),
          (te = e.SANITIZE_NAMED_PROPS || !1),
          (ne = !1 !== e.KEEP_CONTENT),
          (re = e.IN_PLACE || !1),
          (L = e.ALLOWED_URI_REGEXP || ol),
          (fe = e.NAMESPACE || he),
          (B = e.CUSTOM_ELEMENT_HANDLING || {}),
          e.CUSTOM_ELEMENT_HANDLING &&
            ke(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
            (B.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
          e.CUSTOM_ELEMENT_HANDLING &&
            ke(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
            (B.attributeNameCheck =
              e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
          e.CUSTOM_ELEMENT_HANDLING &&
            "boolean" ==
              typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements &&
            (B.allowCustomizedBuiltInElements =
              e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
          q && (H = !1),
          J && (X = !0),
          oe &&
            ((M = Ds({}, [...Ws])),
            (z = []),
            !0 === oe.html && (Ds(M, Us), Ds(z, Ks)),
            !0 === oe.svg && (Ds(M, Fs), Ds(z, Ys), Ds(z, Js)),
            !0 === oe.svgFilters && (Ds(M, Hs), Ds(z, Ys), Ds(z, Js)),
            !0 === oe.mathMl && (Ds(M, Gs), Ds(z, Xs), Ds(z, Js))),
          e.ADD_TAGS && (M === j && (M = Bs(M)), Ds(M, e.ADD_TAGS, we)),
          e.ADD_ATTR && (z === D && (z = Bs(z)), Ds(z, e.ADD_ATTR, we)),
          e.ADD_URI_SAFE_ATTR && Ds(ce, e.ADD_URI_SAFE_ATTR, we),
          e.FORBID_CONTENTS &&
            (ie === ae && (ie = Bs(ie)), Ds(ie, e.FORBID_CONTENTS, we)),
          ne && (M["#text"] = !0),
          W && Ds(M, ["html", "head", "body"]),
          M.table && (Ds(M, ["tbody"]), delete Z.tbody),
          e.TRUSTED_TYPES_POLICY)
        ) {
          if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
            throw Ms(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
            );
          if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
            throw Ms(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
            );
          (w = e.TRUSTED_TYPES_POLICY), (x = w.createHTML(""));
        } else
          void 0 === w &&
            (w = (function (e, t) {
              if ("object" != typeof e || "function" != typeof e.createPolicy)
                return null;
              let n = null;
              const r = "data-tt-policy-suffix";
              t && t.hasAttribute(r) && (n = t.getAttribute(r));
              const o = "dompurify" + (n ? "#" + n : "");
              try {
                return e.createPolicy(o, {
                  createHTML: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch (e) {
                return (
                  console.warn(
                    "TrustedTypes policy " + o + " could not be created."
                  ),
                  null
                );
              }
            })(f, i)),
            null !== w && "string" == typeof x && (x = w.createHTML(""));
        xs && xs(e), (xe = e);
      }
    },
    Se = Ds({}, ["mi", "mo", "mn", "ms", "mtext"]),
    Ce = Ds({}, ["foreignobject", "desc", "title", "annotation-xml"]),
    Ee = Ds({}, ["title", "style", "font", "a", "script"]),
    Ie = Ds({}, Fs);
  Ds(Ie, Hs), Ds(Ie, Vs);
  const $e = Ds({}, Gs);
  Ds($e, qs);
  const Ae = function (e) {
      Is(n.removed, { element: e });
      try {
        e.parentNode.removeChild(e);
      } catch (t) {
        e.remove();
      }
    },
    Pe = function (e, t) {
      try {
        Is(n.removed, { attribute: t.getAttributeNode(e), from: t });
      } catch (e) {
        Is(n.removed, { attribute: null, from: t });
      }
      if ((t.removeAttribute(e), "is" === e && !z[e]))
        if (X || J)
          try {
            Ae(t);
          } catch (e) {}
        else
          try {
            t.setAttribute(e, "");
          } catch (e) {}
    },
    Ne = function (e) {
      let t = null,
        n = null;
      if (Y) e = "<remove></remove>" + e;
      else {
        const t = Ps(e, /^[\r\n\t ]+/);
        n = t && t[0];
      }
      "application/xhtml+xml" === ye &&
        fe === he &&
        (e =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          e +
          "</body></html>");
      const o = w ? w.createHTML(e) : e;
      if (fe === he)
        try {
          t = new h().parseFromString(o, ye);
        } catch (e) {}
      if (!t || !t.documentElement) {
        t = _.createDocument(fe, "template", null);
        try {
          t.documentElement.innerHTML = ge ? x : o;
        } catch (e) {}
      }
      const i = t.body || t.documentElement;
      return (
        e && n && i.insertBefore(r.createTextNode(n), i.childNodes[0] || null),
        fe === he
          ? S.call(t, W ? "html" : "body")[0]
          : W
          ? t.documentElement
          : i
      );
    },
    Oe = function (e) {
      return k.call(
        e.ownerDocument || e,
        e,
        d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT,
        null
      );
    },
    Re = function (e) {
      return "function" == typeof l && e instanceof l;
    },
    Le = function (e, t, r) {
      E[e] &&
        Cs(E[e], (e) => {
          e.call(n, t, r, xe);
        });
    },
    Me = function (e) {
      let t = null;
      if (
        (Le("beforeSanitizeElements", e, null),
        (r = e) instanceof p &&
          ("string" != typeof r.nodeName ||
            "string" != typeof r.textContent ||
            "function" != typeof r.removeChild ||
            !(r.attributes instanceof u) ||
            "function" != typeof r.removeAttribute ||
            "function" != typeof r.setAttribute ||
            "string" != typeof r.namespaceURI ||
            "function" != typeof r.insertBefore ||
            "function" != typeof r.hasChildNodes))
      )
        return Ae(e), !0;
      var r;
      const o = we(e.nodeName);
      if (
        (Le("uponSanitizeElement", e, { tagName: o, allowedTags: M }),
        e.hasChildNodes() &&
          !Re(e.firstElementChild) &&
          Ls(/<[/\w]/g, e.innerHTML) &&
          Ls(/<[/\w]/g, e.textContent))
      )
        return Ae(e), !0;
      if (!M[o] || Z[o]) {
        if (!Z[o] && ze(o)) {
          if (B.tagNameCheck instanceof RegExp && Ls(B.tagNameCheck, o))
            return !1;
          if (B.tagNameCheck instanceof Function && B.tagNameCheck(o))
            return !1;
        }
        if (ne && !ie[o]) {
          const t = v(e) || e.parentNode,
            n = y(e) || e.childNodes;
          if (n && t) {
            for (let r = n.length - 1; r >= 0; --r)
              t.insertBefore(m(n[r], !0), b(e));
          }
        }
        return Ae(e), !0;
      }
      return e instanceof c &&
        !(function (e) {
          let t = v(e);
          (t && t.tagName) || (t = { namespaceURI: fe, tagName: "template" });
          const n = $s(e.tagName),
            r = $s(t.tagName);
          return (
            !!me[e.namespaceURI] &&
            (e.namespaceURI === pe
              ? t.namespaceURI === he
                ? "svg" === n
                : t.namespaceURI === ue
                ? "svg" === n && ("annotation-xml" === r || Se[r])
                : Boolean(Ie[n])
              : e.namespaceURI === ue
              ? t.namespaceURI === he
                ? "math" === n
                : t.namespaceURI === pe
                ? "math" === n && Ce[r]
                : Boolean($e[n])
              : e.namespaceURI === he
              ? !(t.namespaceURI === pe && !Ce[r]) &&
                !(t.namespaceURI === ue && !Se[r]) &&
                !$e[n] &&
                (Ee[n] || !Ie[n])
              : !("application/xhtml+xml" !== ye || !me[e.namespaceURI]))
          );
        })(e)
        ? (Ae(e), !0)
        : ("noscript" !== o && "noembed" !== o && "noframes" !== o) ||
          !Ls(/<\/no(script|embed|frames)/i, e.innerHTML)
        ? (q &&
            3 === e.nodeType &&
            ((t = e.textContent),
            Cs([I, $, A], (e) => {
              t = Ns(t, e, " ");
            }),
            e.textContent !== t &&
              (Is(n.removed, { element: e.cloneNode() }), (e.textContent = t))),
          Le("afterSanitizeElements", e, null),
          !1)
        : (Ae(e), !0);
    },
    je = function (e, t, n) {
      if (ee && ("id" === t || "name" === t) && (n in r || n in _e)) return !1;
      if (H && !U[t] && Ls(P, t));
      else if (F && Ls(N, t));
      else if (!z[t] || U[t]) {
        if (
          !(
            (ze(e) &&
              ((B.tagNameCheck instanceof RegExp && Ls(B.tagNameCheck, e)) ||
                (B.tagNameCheck instanceof Function && B.tagNameCheck(e))) &&
              ((B.attributeNameCheck instanceof RegExp &&
                Ls(B.attributeNameCheck, t)) ||
                (B.attributeNameCheck instanceof Function &&
                  B.attributeNameCheck(t)))) ||
            ("is" === t &&
              B.allowCustomizedBuiltInElements &&
              ((B.tagNameCheck instanceof RegExp && Ls(B.tagNameCheck, n)) ||
                (B.tagNameCheck instanceof Function && B.tagNameCheck(n))))
          )
        )
          return !1;
      } else if (ce[t]);
      else if (Ls(L, Ns(n, R, "")));
      else if (
        ("src" !== t && "xlink:href" !== t && "href" !== t) ||
        "script" === e ||
        0 !== Os(n, "data:") ||
        !se[e]
      ) {
        if (V && !Ls(O, Ns(n, R, "")));
        else if (n) return !1;
      } else;
      return !0;
    },
    ze = function (e) {
      return e.indexOf("-") > 0;
    },
    De = function (e) {
      Le("beforeSanitizeAttributes", e, null);
      const { attributes: t } = e;
      if (!t) return;
      const r = {
        attrName: "",
        attrValue: "",
        keepAttr: !0,
        allowedAttributes: z,
      };
      let o = t.length;
      for (; o--; ) {
        const i = t[o],
          { name: a, namespaceURI: s, value: l } = i,
          c = we(a);
        let d = "value" === a ? l : Rs(l);
        if (
          ((r.attrName = c),
          (r.attrValue = d),
          (r.keepAttr = !0),
          (r.forceKeepAttr = void 0),
          Le("uponSanitizeAttribute", e, r),
          (d = r.attrValue),
          r.forceKeepAttr)
        )
          continue;
        if ((Pe(a, e), !r.keepAttr)) continue;
        if (!G && Ls(/\/>/i, d)) {
          Pe(a, e);
          continue;
        }
        q &&
          Cs([I, $, A], (e) => {
            d = Ns(d, e, " ");
          });
        const u = we(e.nodeName);
        if (je(u, c, d)) {
          if (
            (!te ||
              ("id" !== c && "name" !== c) ||
              (Pe(a, e), (d = "user-content-" + d)),
            w &&
              "object" == typeof f &&
              "function" == typeof f.getAttributeType)
          )
            if (s);
            else
              switch (f.getAttributeType(u, c)) {
                case "TrustedHTML":
                  d = w.createHTML(d);
                  break;
                case "TrustedScriptURL":
                  d = w.createScriptURL(d);
              }
          try {
            s ? e.setAttributeNS(s, a, d) : e.setAttribute(a, d), Es(n.removed);
          } catch (e) {}
        }
      }
      Le("afterSanitizeAttributes", e, null);
    },
    Be = function e(t) {
      let n = null;
      const r = Oe(t);
      for (Le("beforeSanitizeShadowDOM", t, null); (n = r.nextNode()); )
        Le("uponSanitizeShadowNode", n, null),
          Me(n) || (n.content instanceof a && e(n.content), De(n));
      Le("afterSanitizeShadowDOM", t, null);
    };
  return (
    (n.sanitize = function (e) {
      let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = null,
        i = null,
        s = null,
        c = null;
      if (
        ((ge = !e), ge && (e = "\x3c!--\x3e"), "string" != typeof e && !Re(e))
      ) {
        if ("function" != typeof e.toString)
          throw Ms("toString is not a function");
        if ("string" != typeof (e = e.toString()))
          throw Ms("dirty is not a string, aborting");
      }
      if (!n.isSupported) return e;
      if (
        (K || Te(t), (n.removed = []), "string" == typeof e && (re = !1), re)
      ) {
        if (e.nodeName) {
          const t = we(e.nodeName);
          if (!M[t] || Z[t])
            throw Ms("root node is forbidden and cannot be sanitized in-place");
        }
      } else if (e instanceof l)
        (r = Ne("\x3c!----\x3e")),
          (i = r.ownerDocument.importNode(e, !0)),
          (1 === i.nodeType && "BODY" === i.nodeName) || "HTML" === i.nodeName
            ? (r = i)
            : r.appendChild(i);
      else {
        if (!X && !q && !W && -1 === e.indexOf("<"))
          return w && Q ? w.createHTML(e) : e;
        if (((r = Ne(e)), !r)) return X ? null : Q ? x : "";
      }
      r && Y && Ae(r.firstChild);
      const d = Oe(re ? e : r);
      for (; (s = d.nextNode()); )
        Me(s) || (s.content instanceof a && Be(s.content), De(s));
      if (re) return e;
      if (X) {
        if (J)
          for (c = T.call(r.ownerDocument); r.firstChild; )
            c.appendChild(r.firstChild);
        else c = r;
        return (z.shadowroot || z.shadowrootmode) && (c = C.call(o, c, !0)), c;
      }
      let u = W ? r.outerHTML : r.innerHTML;
      return (
        W &&
          M["!doctype"] &&
          r.ownerDocument &&
          r.ownerDocument.doctype &&
          r.ownerDocument.doctype.name &&
          Ls(sl, r.ownerDocument.doctype.name) &&
          (u = "<!DOCTYPE " + r.ownerDocument.doctype.name + ">\n" + u),
        q &&
          Cs([I, $, A], (e) => {
            u = Ns(u, e, " ");
          }),
        w && Q ? w.createHTML(u) : u
      );
    }),
    (n.setConfig = function () {
      Te(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}),
        (K = !0);
    }),
    (n.clearConfig = function () {
      (xe = null), (K = !1);
    }),
    (n.isValidAttribute = function (e, t, n) {
      xe || Te({});
      const r = we(e),
        o = we(t);
      return je(r, o, n);
    }),
    (n.addHook = function (e, t) {
      "function" == typeof t && ((E[e] = E[e] || []), Is(E[e], t));
    }),
    (n.removeHook = function (e) {
      if (E[e]) return Es(E[e]);
    }),
    (n.removeHooks = function (e) {
      E[e] && (E[e] = []);
    }),
    (n.removeAllHooks = function () {
      E = {};
    }),
    n
  );
})();
const ul = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div class="flex flex-col overflow-hidden text-fade-in mx-4 my-2 relative text-ellipsis h-full gap-6">'
  ),
  pl = (e) => {
    const [t, n] = _("");
    return (
      gs.use({
        renderer: {
          link: (e, t, n) =>
            `<a href="${e}" target="_blank" rel="noopener noreferrer">${n}</a>`,
        },
      }),
      T(() => {
        Da()?.id === e.streamingMessageId &&
          n(dl.sanitize(gs.parse(Da()?.content ?? "")));
      }),
      (() => {
        const e = ul(),
          n = e.firstChild.firstChild.firstChild,
          r = n.nextSibling;
        return (
          n.style.setProperty("width", "100%"),
          n.style.setProperty("height", "100%"),
          k(() => (r.innerHTML = t())),
          e
        );
      })()
    );
  },
  hl = ue('<div><div class="flex flex-col flex-1 gap-2">'),
  fl = ue('<div class="flex flex-col w-full min-w-0 gap-2">'),
  gl = (e) => {
    let t;
    const [n, r] = _(0);
    E(() => {
      e.streamingMessageId ||
        (0 === e.messages.length && e.onAllBubblesDisplayed(),
        e.onScrollToBottom(t?.offsetTop ? t?.offsetTop - 50 : void 0));
    });
    const o = async (t) => {
      const o = e.messages[n()].id;
      await e.onNewBubbleDisplayed(o),
        r(n() === e.messages.length ? n() : n() + 1),
        e.onScrollToBottom(t),
        n() === e.messages.length && e.onAllBubblesDisplayed();
    };
    return (() => {
      const r = fl();
      return (
        be(
          r,
          V(te, {
            get when() {
              return e.messages.length > 0;
            },
            get children() {
              const t = hl(),
                r = t.firstChild;
              return (
                be(
                  t,
                  V(te, {
                    get when() {
                      return (
                        e.theme.chat.hostAvatar?.isEnabled &&
                        e.messages.length > 0
                      );
                    },
                    get children() {
                      return V(za, {
                        get hostAvatarSrc() {
                          return e.theme.chat.hostAvatar?.url;
                        },
                        get hideAvatar() {
                          return e.hideAvatar;
                        },
                      });
                    },
                  }),
                  r
                ),
                be(
                  r,
                  V(ee, {
                    get each() {
                      return e.messages.slice(0, n() + 1);
                    },
                    children: (t) =>
                      V(Bo, {
                        message: t,
                        get typingEmulation() {
                          return e.settings.typingEmulation;
                        },
                        onTransitionEnd: o,
                      }),
                  })
                ),
                k(
                  (n) => {
                    const o = "flex" + (mt() ? " gap-1" : " gap-2"),
                      i = e.theme.chat.guestAvatar?.isEnabled
                        ? mt()
                          ? "calc(100% - 32px - 32px)"
                          : "calc(100% - 48px - 48px)"
                        : mt()
                        ? "calc(100% - 32px)"
                        : "calc(100% - 48px)";
                    return (
                      o !== n._v$ && fe(t, (n._v$ = o)),
                      i !== n._v$2 &&
                        (null != (n._v$2 = i)
                          ? r.style.setProperty("max-width", i)
                          : r.style.removeProperty("max-width")),
                      n
                    );
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              );
            },
          }),
          null
        ),
        be(
          r,
          (() => {
            const r = S(() => !(!e.input || n() !== e.messages.length));
            return () =>
              r() &&
              V(Oa, {
                ref(e) {
                  "function" == typeof t ? t(e) : (t = e);
                },
                get block() {
                  return e.input;
                },
                get inputIndex() {
                  return e.inputIndex;
                },
                get hasHostAvatar() {
                  return e.theme.chat.hostAvatar?.isEnabled ?? !1;
                },
                get guestAvatar() {
                  return e.theme.chat.guestAvatar;
                },
                get context() {
                  return e.context;
                },
                get isInputPrefillEnabled() {
                  return e.settings.general.isInputPrefillEnabled ?? !0;
                },
                get hasError() {
                  return e.hasError;
                },
                get onSubmit() {
                  return e.onSubmit;
                },
                get onSkip() {
                  return e.onSkip;
                },
              });
          })(),
          null
        ),
        be(
          r,
          V(te, {
            get when() {
              return e.streamingMessageId;
            },
            keyed: !0,
            children: (t) =>
              (() => {
                const n = hl(),
                  r = n.firstChild;
                return (
                  be(
                    n,
                    V(te, {
                      get when() {
                        return e.theme.chat.hostAvatar?.isEnabled;
                      },
                      get children() {
                        return V(za, {
                          get hostAvatarSrc() {
                            return e.theme.chat.hostAvatar?.url;
                          },
                          get hideAvatar() {
                            return e.hideAvatar;
                          },
                        });
                      },
                    }),
                    r
                  ),
                  be(r, V(pl, { streamingMessageId: t })),
                  k(
                    (t) => {
                      const o = "flex" + (mt() ? " gap-1" : " gap-2"),
                        i = e.theme.chat.guestAvatar?.isEnabled
                          ? mt()
                            ? "calc(100% - 32px - 32px)"
                            : "calc(100% - 48px - 48px)"
                          : mt()
                          ? "calc(100% - 32px)"
                          : "calc(100% - 48px)";
                      return (
                        o !== t._v$3 && fe(n, (t._v$3 = o)),
                        i !== t._v$4 &&
                          (null != (t._v$4 = i)
                            ? r.style.setProperty("max-width", i)
                            : r.style.removeProperty("max-width")),
                        t
                      );
                    },
                    { _v$3: void 0, _v$4: void 0 }
                  ),
                  n
                );
              })(),
          }),
          null
        ),
        r
      );
    })();
  },
  ml = Object.getPrototypeOf(async function () {}).constructor,
  bl = async ({ content: e, args: t }) => {
    try {
      const n = ml(...t.map((e) => e.id), yl(e));
      await n(...t.map((e) => e.value));
    } catch (e) {
      console.warn("Script threw an error:", e);
    }
  },
  yl = (e) => e.replace(/<script>/g, "").replace(/<\/script>/g, ""),
  vl = async (e) => {
    e?.trackingId &&
      ((e) => {
        e &&
          (window.gtag
            ? window.gtag("event", e.action, {
                event_category: je(e.category) ? void 0 : e.category,
                event_label: je(e.label) ? void 0 : e.label,
                value: e.value,
                send_to: je(e.sendTo) ? void 0 : e.sendTo,
              })
            : console.error("Google Analytics was not properly initialized"));
      })(e);
  };
let wl = null;
const xl =
    (e) =>
    async (t, { onMessageStream: n }) => {
      try {
        wl = new AbortController();
        const r = e.apiHost,
          o = await fetch(
            `${ze(r) ? r : ht()}/api/integrations/openai/streamer`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: e.sessionId, messages: t }),
              signal: wl.signal,
            }
          );
        if (!o.ok)
          return (e.retryAttempt ?? 0) < 3 &&
            (403 === o.status || 500 === o.status || 503 === o.status)
            ? (await new Promise((e) => setTimeout(e, 3e3)),
              xl({ ...e, retryAttempt: (e.retryAttempt ?? 0) + 1 })(t, {
                onMessageStream: n,
              }))
            : {
                error: (await o.json()) || "Failed to fetch the chat response.",
              };
        if (!o.body) throw new Error("The response body is empty.");
        let i = "";
        const a = o.body.getReader(),
          l = new TextDecoder(),
          c = (function () {
            const e = s.context;
            return e ? `${e.id}${e.count++}` : "cl-" + J++;
          })();
        for (;;) {
          const { done: e, value: t } = await a.read();
          if (e) break;
          if (
            ((i += l.decode(t)), n && n({ id: c, message: i }), null === wl)
          ) {
            a.cancel();
            break;
          }
        }
        return (wl = null), { message: i };
      } catch (e) {
        return (
          console.error(e),
          "AbortError" === e.name
            ? ((wl = null), { error: { message: "Request aborted" } })
            : e instanceof Error
            ? { error: { message: e.message } }
            : { error: { message: "Failed to fetch the chat response." } }
        );
      }
    },
  _l = (e) => {
    if (Me(e)) return null;
    if ("string" == typeof e) return e;
    try {
      return JSON.stringify(e);
    } catch {
      return console.warn("Failed to safely stringify variable value", e), null;
    }
  },
  kl = Object.getPrototypeOf(async function () {}).constructor,
  Tl = async (e) => {
    je(e?.pixelId) ||
      ((e) => {
        if (!e.eventType || !e.pixelId) return;
        if (!window.fbq)
          return void console.error(
            "Facebook Pixel was not properly initialized"
          );
        const t = e.params?.length
          ? e.params.reduce(
              (e, t) => (t.key && t.value ? { ...e, [t.key]: t.value } : e),
              {}
            )
          : void 0;
        if ("Custom" === e.eventType) {
          if (!e.name) return;
          window.fbq("trackSingleCustom", e.pixelId, e.name, t);
        }
        window.fbq("trackSingle", e.pixelId, e.eventType, t);
      })(e);
  },
  Sl = async (e) => {
    const t = e.customHeadCode;
    ze(t) &&
      ((e) => {
        e.split("</noscript>").forEach((e) => {
          const [t, n] = e.split("<noscript>"),
            r = document.createRange().createContextualFragment(t);
          if ((document.head.append(r), Me(n))) return;
          const o = document.createElement("noscript"),
            i = document.createRange().createContextualFragment(n);
          o.append(i), document.head.append(o);
        });
      })(t);
    const n = e.gtmId;
    ze(n) &&
      document.body.prepend(
        ((e) => {
          if (document.getElementById("gtm-noscript")) return "";
          const t = document.createElement("noscript");
          t.id = "gtm-noscript";
          const n = document.createElement("iframe");
          return (
            (n.src = `https://www.googletagmanager.com/ns.html?id=${e}`),
            (n.height = "0"),
            (n.width = "0"),
            (n.style.display = "none"),
            (n.style.visibility = "hidden"),
            t.appendChild(n),
            t
          );
        })(n)
      );
    const r = e.googleAnalyticsId;
    var o;
    ze(r) &&
      (await ((o = r),
      Le(window.gtag)
        ? Promise.resolve()
        : new Promise((e) => {
            const t = document.getElementById("gtag");
            if (!t) {
              const t = document.createElement("script");
              (t.src = `https://www.googletagmanager.com/gtag/js?id=${o}`),
                (t.id = "gtag");
              const n = document.createElement("script");
              (n.innerHTML = `window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', '${o}');\n      `),
                document.body.appendChild(t),
                document.body.appendChild(n),
                (t.onload = () => {
                  e();
                });
            }
            t && e();
          })));
    const i = e.pixelId ? [e.pixelId] : e.pixelIds;
    Le(i) &&
      ((e) => {
        const t = document.createElement("script");
        (t.innerHTML = `!function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  ${e
          .map((e) => `fbq('init', '${e}');`)
          .join("\n")}\n  fbq('track', 'PageView');`),
          document.head.appendChild(t);
      })(i);
  },
  Cl = async ({ clientSideAction: e, context: t, onMessageStream: n }) => {
    if ("chatwoot" in e) return (r = e.chatwoot), void bl(r.scriptToExecute);
    var r;
    if ("googleAnalytics" in e) return vl(e.googleAnalytics);
    if ("scriptToExecute" in e) return bl(e.scriptToExecute);
    if ("redirect" in e)
      return (({ url: e, isNewTab: t }) => {
        if (!e) return;
        return window.open(e, t ? "_blank" : "_self")
          ? void 0
          : { blockedPopupUrl: e };
      })(e.redirect);
    if ("wait" in e)
      return (
        await (async ({ secondsToWaitFor: e }) => {
          await new Promise((t) => setTimeout(t, 1e3 * e));
        })(e.wait),
        e.expectsDedicatedReply ? { replyToSend: void 0 } : void 0
      );
    if ("setVariable" in e)
      return (async ({ content: e, args: t }) => {
        try {
          const n = kl(
              ...t.map((e) => e.id),
              e.includes("return ") ? e : `return ${e}`
            ),
            r = await n(...t.map((e) => e.value));
          return { replyToSend: _l(r) ?? void 0 };
        } catch (t) {
          return console.error(t), { replyToSend: _l(e) ?? void 0 };
        }
      })(e.setVariable.scriptToExecute);
    if ("streamOpenAiChatCompletion" in e) {
      const { error: r, message: o } = await xl(t)(
        e.streamOpenAiChatCompletion.messages,
        { onMessageStream: n }
      );
      return r
        ? {
            replyToSend: void 0,
            logs: [
              {
                status: "error",
                description: "OpenAI returned an error",
                details: JSON.stringify(r, null, 2),
              },
            ],
          }
        : { replyToSend: o };
    }
    if ("webhookToExecute" in e) {
      return {
        replyToSend: await (async (e) => {
          const { url: t, method: n, body: r, headers: o } = e;
          try {
            const e = await fetch(t, {
                method: n,
                body: "GET" !== n && r ? JSON.stringify(r) : void 0,
                headers: o,
              }),
              i = e.status,
              a = await e.json();
            return JSON.stringify({ statusCode: i, data: a });
          } catch (e) {
            return (
              console.error(e),
              JSON.stringify({
                statusCode: 500,
                data: "An error occured while executing the webhook on the client",
              })
            );
          }
        })(e.webhookToExecute),
      };
    }
    return "startPropsToInject" in e
      ? Sl(e.startPropsToInject)
      : "pixel" in e
      ? Tl(e.pixel)
      : void 0;
  },
  El = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><p class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative opacity-0 h-6 text-ellipsis">'
  ),
  Il = () =>
    (() => {
      const e = El(),
        t = e.firstChild.firstChild.firstChild;
      return (
        t.style.setProperty("width", "64px"),
        t.style.setProperty("height", "32px"),
        be(t, V(Ct, {})),
        e
      );
    })(),
  $l = ue(
    '<div class="flex w-full"><div class="flex flex-col w-full min-w-0"><div class="flex gap-2">'
  ),
  Al = (e) =>
    (() => {
      const t = $l(),
        n = t.firstChild.firstChild;
      return (
        be(
          n,
          V(te, {
            get when() {
              return e.theme.chat.hostAvatar?.isEnabled;
            },
            get children() {
              return V(za, {
                get hostAvatarSrc() {
                  return e.theme.chat.hostAvatar?.url;
                },
              });
            },
          }),
          null
        ),
        be(n, V(Il, {}), null),
        t
      );
    })(),
  Pl = ue(
    '<div class="w-full max-w-xs p-4 text-gray-500 bg-white shadow flex flex-col gap-2 typebot-popup-blocked-toast" role="alert"><div class="flex flex-col gap-1"><span class=" text-sm font-semibold text-gray-900">Popup blocked</span><div class="text-sm font-normal">The bot wants to open a new tab but it was blocked by your browser. It needs a manual approval.</div></div><a target="_blank" class="py-1 px-4 justify-center text-sm font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 filter hover:brightness-90 active:brightness-75 typebot-button" rel="noreferrer">Continue in new tab'
  ),
  Nl = (e) =>
    (() => {
      const t = Pl(),
        n = t.firstChild.nextSibling;
      return (
        (n.$$click = () => e.onLinkClick()), k(() => he(n, "href", e.url)), t
      );
    })();
pe(["click"]);
const Ol = ue(
    '<div class="flex flex-col overflow-y-scroll w-full min-h-full px-3 pt-10 relative scrollable-container typebot-chat-view scroll-smooth gap-2">'
  ),
  Rl = ue('<div class="flex justify-end">'),
  Ll = ue('<div class="w-full h-32 flex-shrink-0">'),
  Ml = (e) => {
    let t;
    const [n, r] = _([
        {
          input: e.initialChatReply.input,
          messages: e.initialChatReply.messages,
          clientSideActions: e.initialChatReply.clientSideActions,
        },
      ]),
      [o, i] = _(e.initialChatReply.dynamicTheme),
      [a, s] = _(e.initialChatReply.typebot.theme),
      [l, c] = _(!1),
      [d, u] = _(),
      [p, h] = _(!1);
    E(() => {
      (async () => {
        const t = n()[0];
        if (t.clientSideActions) {
          const n = t.clientSideActions.filter((e) => Me(e.lastBubbleBlockId));
          for (const t of n) {
            ("streamOpenAiChatCompletion" in t || "webhookToExecute" in t) &&
              c(!0);
            const n = await Cl({
              clientSideAction: t,
              context: {
                apiHost: e.context.apiHost,
                sessionId: e.initialChatReply.sessionId,
              },
              onMessageStream: f,
            });
            if (n && "replyToSend" in n) return void g(n.replyToSend, n.logs);
            n && "blockedPopupUrl" in n && u(n.blockedPopupUrl);
          }
        }
      })();
    });
    const f = ({ id: e, message: t }) => {
      c(!1);
      const o = [...n()].pop();
      o &&
        (o.streamingMessageId !== e &&
          r((t) => [...t, { messages: [], streamingMessageId: e }]),
        Ba({ id: e, content: t }));
    };
    T(() => {
      s(
        ((e, t) => ({
          ...e,
          chat: {
            ...e.chat,
            hostAvatar:
              e.chat.hostAvatar && t?.hostAvatarUrl
                ? { ...e.chat.hostAvatar, url: t.hostAvatarUrl }
                : e.chat.hostAvatar,
            guestAvatar:
              e.chat.guestAvatar && t?.guestAvatarUrl
                ? { ...e.chat.guestAvatar, url: t?.guestAvatarUrl }
                : e.chat.guestAvatar,
          },
        }))(e.initialChatReply.typebot.theme, o())
      );
    });
    const g = async (t, o) => {
        o && e.onNewLogs?.(o), h(!1);
        const a = [...n()].pop()?.input;
        a?.id && e.onAnswer && t && e.onAnswer({ message: t, blockId: a.id }),
          a?.type === Pe.FILE &&
            e.onNewLogs?.([
              {
                description: "Files are not uploaded in preview mode",
                status: "info",
              },
            ]);
        const s = setTimeout(() => {
            c(!0);
          }, 1e3),
          { data: l, error: d } = await (({ apiHost: e, ...t }) =>
            Re({
              method: "POST",
              url: `${ze(e) ? e : ht()}/api/v2/sendMessage`,
              body: t,
            }))({
            apiHost: e.context.apiHost,
            sessionId: e.initialChatReply.sessionId,
            message: t,
            clientLogs: o,
          });
        if (
          (clearTimeout(s),
          c(!1),
          d &&
            (h(!0),
            e.onNewLogs?.([
              {
                description: "Failed to send the reply",
                details: d,
                status: "error",
              },
            ])),
          l)
        ) {
          if (
            (l.lastMessageNewFormat &&
              Aa([
                ...$a(),
                {
                  inputId: [...n()].pop()?.input?.id ?? "",
                  formattedMessage: l.lastMessageNewFormat,
                },
              ]),
            l.logs && e.onNewLogs?.(l.logs),
            l.dynamicTheme && i(l.dynamicTheme),
            l.input?.id &&
              e.onNewInputBlock &&
              e.onNewInputBlock({ id: l.input.id, groupId: l.input.groupId }),
            l.clientSideActions)
          ) {
            const t = l.clientSideActions.filter((e) =>
              Me(e.lastBubbleBlockId)
            );
            for (const n of t) {
              ("streamOpenAiChatCompletion" in n || "webhookToExecute" in n) &&
                c(!0);
              const t = await Cl({
                clientSideAction: n,
                context: {
                  apiHost: e.context.apiHost,
                  sessionId: e.initialChatReply.sessionId,
                },
                onMessageStream: f,
              });
              if (t && "replyToSend" in t) return void g(t.replyToSend, t.logs);
              t && "blockedPopupUrl" in t && u(t.blockedPopupUrl);
            }
          }
          r((e) => [
            ...e,
            {
              input: l.input,
              messages: l.messages,
              clientSideActions: l.clientSideActions,
            },
          ]);
        }
      },
      m = (e) => {
        const r = n();
        (r.length >= 2 && r[r.length - 2].streamingMessageId) ||
          setTimeout(() => {
            t?.scrollTo(0, e ?? t.scrollHeight);
          }, 50);
      },
      b = async () => {
        const t = [...n()].pop();
        t && Me(t.input) && e.onEnd?.();
      },
      y = async (t) => {
        const r = [...n()].pop();
        if (r && r.clientSideActions) {
          const n = r.clientSideActions.filter(
            (e) => e.lastBubbleBlockId === t
          );
          for (const t of n) {
            ("streamOpenAiChatCompletion" in t || "webhookToExecute" in t) &&
              c(!0);
            const n = await Cl({
              clientSideAction: t,
              context: {
                apiHost: e.context.apiHost,
                sessionId: e.initialChatReply.sessionId,
              },
              onMessageStream: f,
            });
            if (n && "replyToSend" in n) return void g(n.replyToSend, n.logs);
            n && "blockedPopupUrl" in n && u(n.blockedPopupUrl);
          }
        }
      };
    I(() => {
      Ba(void 0), Aa([]);
    });
    const v = () => g(void 0);
    return (() => {
      const r = Ol();
      return (
        "function" == typeof t ? me(t, r) : (t = r),
        be(
          r,
          V(ee, {
            get each() {
              return n();
            },
            children: (t, r) =>
              V(gl, {
                get inputIndex() {
                  return r();
                },
                get messages() {
                  return t.messages;
                },
                get input() {
                  return t.input;
                },
                get theme() {
                  return a();
                },
                get settings() {
                  return e.initialChatReply.typebot.settings;
                },
                get streamingMessageId() {
                  return t.streamingMessageId;
                },
                get context() {
                  return e.context;
                },
                get hideAvatar() {
                  return (
                    S(() => !t.input)() &&
                    ((n()[r() + 1]?.messages ?? 0).length > 0 ||
                      void 0 !== n()[r() + 1]?.streamingMessageId ||
                      l())
                  );
                },
                get hasError() {
                  return S(() => !!p())() && r() === n().length - 1;
                },
                onNewBubbleDisplayed: y,
                onAllBubblesDisplayed: b,
                onSubmit: g,
                onScrollToBottom: m,
                onSkip: v,
              }),
          }),
          null
        ),
        be(
          r,
          V(te, {
            get when() {
              return l();
            },
            get children() {
              return V(Al, {
                get theme() {
                  return a();
                },
              });
            },
          }),
          null
        ),
        be(
          r,
          V(te, {
            get when() {
              return d();
            },
            keyed: !0,
            children: (e) =>
              (() => {
                const t = Rl();
                return (
                  be(t, V(Nl, { url: e, onLinkClick: () => u(void 0) })), t
                );
              })(),
          }),
          null
        ),
        be(r, V(jl, {}), null),
        r
      );
    })();
  },
  jl = () => Ll(),
  zl = ue(
    '<div class="h-full flex justify-center items-center flex-col"><p class="text-2xl text-center"></p><p class="text-center">'
  ),
  Dl = (e) =>
    (() => {
      const t = zl(),
        n = t.firstChild,
        r = n.nextSibling;
      return be(n, () => e.error.message), be(r, () => e.error.cause), t;
    })(),
  Bl = "resultId",
  Zl = (e) => {
    if (e)
      try {
        return (
          sessionStorage.getItem(`${Bl}-${e}`) ??
          localStorage.getItem(`${Bl}-${e}`) ??
          void 0
        );
      } catch {}
  };
let Ul = (function (e) {
  return (e.COLOR = "Color"), (e.IMAGE = "Image"), (e.NONE = "None"), e;
})({});
const Fl = {
    bgImage: "--typebot-container-bg-image",
    bgColor: "--typebot-container-bg-color",
    fontFamily: "--typebot-container-font-family",
    color: "--typebot-container-color",
  },
  Hl = {
    hostBubbles: {
      bgColor: "--typebot-host-bubble-bg-color",
      color: "--typebot-host-bubble-color",
    },
    guestBubbles: {
      bgColor: "--typebot-guest-bubble-bg-color",
      color: "--typebot-guest-bubble-color",
    },
    inputs: {
      bgColor: "--typebot-input-bg-color",
      color: "--typebot-input-color",
      placeholderColor: "--typebot-input-placeholder-color",
    },
    buttons: {
      bgColor: "--typebot-button-bg-color",
      bgColorRgb: "--typebot-button-bg-color-rgb",
      color: "--typebot-button-color",
    },
    checkbox: {
      bgColor: "--typebot-checkbox-bg-color",
      color: "--typebot-checkbox-color",
      baseAlpha: "--selectable-base-alpha",
    },
  },
  Vl = (e, t) => {
    const { background: n, font: r } = e;
    n && Xl(n, t), r && t.setProperty(Fl.fontFamily, r);
  },
  Gl = (e, t) => {
    const {
      hostBubbles: n,
      guestBubbles: r,
      buttons: o,
      inputs: i,
      roundness: a,
    } = e;
    n && ql(n, t), r && Wl(r, t), o && Kl(o, t), i && Yl(i, t), a && Ql(a, t);
  },
  ql = (e, t) => {
    e.backgroundColor &&
      t.setProperty(Hl.hostBubbles.bgColor, e.backgroundColor),
      e.color && t.setProperty(Hl.hostBubbles.color, e.color);
  },
  Wl = (e, t) => {
    e.backgroundColor &&
      t.setProperty(Hl.guestBubbles.bgColor, e.backgroundColor),
      e.color && t.setProperty(Hl.guestBubbles.color, e.color);
  },
  Kl = (e, t) => {
    e.backgroundColor &&
      (t.setProperty(Hl.buttons.bgColor, e.backgroundColor),
      t.setProperty(Hl.buttons.bgColorRgb, Be(e.backgroundColor).join(", "))),
      e.color && t.setProperty(Hl.buttons.color, e.color);
  },
  Yl = (e, t) => {
    e.backgroundColor && t.setProperty(Hl.inputs.bgColor, e.backgroundColor),
      e.color && t.setProperty(Hl.inputs.color, e.color),
      e.placeholderColor &&
        t.setProperty(Hl.inputs.placeholderColor, e.placeholderColor);
  },
  Xl = (e, t) => {
    t.setProperty(Fl.bgImage, null),
      t.setProperty(Fl.bgColor, null),
      t.setProperty(e?.type === Ul.IMAGE ? Fl.bgImage : Fl.bgColor, Jl(e)),
      t.setProperty(
        Hl.checkbox.bgColor,
        e?.type === Ul.IMAGE
          ? "rgba(255, 255, 255, 0.75)"
          : (e?.type === Ul.COLOR ? e.content : "#ffffff") ?? "#ffffff"
      );
    const n =
      e.type === Ul.IMAGE
        ? "#000000"
        : e?.type === Ul.COLOR && ze(e.content)
        ? e.content
        : "#ffffff";
    t.setProperty(Fl.color, Ze(n) ? "#303235" : "#ffffff"),
      e.type === Ul.IMAGE
        ? t.setProperty(Hl.checkbox.baseAlpha, "0.40")
        : t.setProperty(Hl.checkbox.baseAlpha, "0");
  },
  Jl = ({ type: e, content: t }) => {
    switch (e) {
      case Ul.NONE:
        return "transparent";
      case Ul.COLOR:
        return t ?? "#ffffff";
      case Ul.IMAGE:
        return `url(${t})`;
    }
  },
  Ql = (e, t) => {
    switch (e) {
      case "none":
        t.setProperty("--typebot-border-radius", "0");
        break;
      case "medium":
        t.setProperty("--typebot-border-radius", "6px");
        break;
      case "large":
        t.setProperty("--typebot-border-radius", "20px");
    }
  };
const ec = ue("<style>"),
  tc = ue('<div><div class="flex w-full h-full justify-center">'),
  nc = (e) => {
    const [t, n] = _(),
      [r, o] = _(""),
      [i, a] = _(!1),
      [s, l] = _(),
      c = async () => {
        a(!0);
        const t = new URLSearchParams(location.search);
        e.onInit?.();
        const r = {};
        t.forEach((e, t) => {
          r[t] = e;
        });
        const i = "string" == typeof e.typebot ? e.typebot : void 0,
          { data: s, error: c } = await (async function ({
            typebot: e,
            isPreview: t,
            apiHost: n,
            prefilledVariables: r,
            startGroupId: o,
            resultId: i,
            stripeRedirectStatus: a,
          }) {
            if (Me(e))
              throw new Error("Typebot ID is required to get initial messages");
            const s = ft() ?? void 0,
              l = s ? JSON.parse(s) : void 0;
            l && gt();
            const { data: c, error: d } = await Re({
              method: "POST",
              url: `${ze(n) ? n : ht()}/api/v2/sendMessage`,
              body: {
                startParams: l
                  ? void 0
                  : {
                      isPreview: t,
                      typebot: e,
                      prefilledVariables: r,
                      startGroupId: o,
                      resultId: i,
                      isStreamEnabled: !0,
                    },
                sessionId: l?.sessionId,
                message: l ? ("failed" === a ? "fail" : "Success") : void 0,
              },
            });
            return {
              data: c ? { ...c, ...(l ? { typebot: l.typebot } : {}) } : void 0,
              error: d,
            };
          })({
            stripeRedirectStatus: t.get("redirect_status") ?? void 0,
            typebot: e.typebot,
            apiHost: e.apiHost,
            isPreview: e.isPreview ?? !1,
            resultId: ze(e.resultId) ? e.resultId : Zl(i),
            startGroupId: e.startGroupId,
            prefilledVariables: { ...r, ...e.prefilledVariables },
          });
        if (c && "code" in c && "string" == typeof c.code) {
          if ("string" != typeof e.typebot || e.isPreview)
            return l(
              new Error("An error occurred while loading the bot.", {
                cause: c.message,
              })
            );
          if (["BAD_REQUEST", "FORBIDDEN"].includes(c.code))
            return l(new Error("This bot is now closed."));
          if ("NOT_FOUND" === c.code)
              console.log(c.code);
            return l(new Error("The bot you're looking for doesn't exist."));
        }
        if (!s)
          return (
            c && console.error(c),
            l(new Error("Error! Couldn't initiate the chat."))
          );
        s.resultId &&
          i &&
          (
            (e = "session") =>
            (t, n) => {
              try {
                return (
                  ("session" === e ? localStorage : sessionStorage).removeItem(
                    `${Bl}-${t}`
                  ),
                  ("session" === e ? sessionStorage : localStorage).setItem(
                    `${Bl}-${t}`,
                    n
                  )
                );
              } catch {}
            }
          )(s.typebot.settings.general.rememberUser?.storage)(i, s.resultId),
          n(s),
          o(s.typebot.theme.customCss ?? ""),
          s.input?.id &&
            e.onNewInputBlock &&
            e.onNewInputBlock({ id: s.input.id, groupId: s.input.groupId }),
          s.logs && e.onNewLogs?.(s.logs);
      };
    return (
      T(() => {
        Me(e.typebot) || i() || c().then();
      }),
      T(() => {
        Me(e.typebot) ||
          "string" == typeof e.typebot ||
          o(e.typebot.theme.customCss ?? "");
      }),
      I(() => {
        a(!1);
      }),
      [
        (() => {
          const e = ec();
          return be(e, r), e;
        })(),
        (() => {
          const e = ec();
          return (
            be(
              e,
              "#lite-badge{background-color:#fff!important;border-radius:4px!important;border-width:1px!important;bottom:20px!important;color:#111827!important;display:flex!important;font-size:14px!important;font-weight:600!important;gap:8px!important;left:auto!important;line-height:20px!important;opacity:1!important;padding:4px 8px!important;position:absolute!important;right:auto!important;text-decoration:none!important;top:auto!important;transition:background-color .2s ease-in-out!important;visibility:visible!important;z-index:50!important}#lite-badge:hover{background-color:#f7f8ff!important}"
            ),
            e
          );
        })(),
        V(te, {
          get when() {
            return s();
          },
          keyed: !0,
          children: (e) => V(Dl, { error: e }),
        }),
        V(te, {
          get when() {
            return t();
          },
          keyed: !0,
          children: (t) =>
            V(rc, {
              get class() {
                return e.class;
              },
              get initialChatReply() {
                return {
                  ...t,
                  typebot: {
                    ...t.typebot,
                    settings:
                      "string" == typeof e.typebot
                        ? t.typebot?.settings
                        : e.typebot?.settings,
                    theme:
                      "string" == typeof e.typebot
                        ? t.typebot?.theme
                        : e.typebot?.theme,
                  },
                };
              },
              get context() {
                return {
                  apiHost: e.apiHost,
                  isPreview:
                    "string" != typeof e.typebot || (e.isPreview ?? !1),
                  resultId: t.resultId,
                  sessionId: t.sessionId,
                  typebot: t.typebot,
                };
              },
              get onNewInputBlock() {
                return e.onNewInputBlock;
              },
              get onNewLogs() {
                return e.onNewLogs;
              },
              get onAnswer() {
                return e.onAnswer;
              },
              get onEnd() {
                return e.onEnd;
              },
            }),
        }),
      ]
    );
  },
  rc = (e) => {
    let t;
    const n = new ResizeObserver((e) => bt(e[0].target.clientWidth < 400));
    return (
      E(() => {
        t && n.observe(t);
      }),
      T(() => {
        (() => {
          const t = document.getElementById("bot-font");
          if (
            t
              ?.getAttribute("href")
              ?.includes(
                e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"
              )
          )
            return;
          const n = document.createElement("link");
          (n.href = `https://fonts.bunny.net/css2?family=${
            e.initialChatReply.typebot?.theme?.general?.font ?? "Open Sans"
          }:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');')`),
            (n.rel = "stylesheet"),
            (n.id = "bot-font"),
            document.head.appendChild(n);
        })(),
          t &&
            ((e, t) => {
              if (!e) return;
              const n = t?.style;
              n && (e.general && Vl(e.general, n), e.chat && Gl(e.chat, n));
            })(e.initialChatReply.typebot.theme, t);
      }),
      I(() => {
        t && n.unobserve(t);
      }),
      (() => {
        const n = tc(),
          r = n.firstChild;
        return (
          "function" == typeof t ? me(t, n) : (t = n),
          be(
            r,
            V(Ml, {
              get context() {
                return e.context;
              },
              get initialChatReply() {
                return e.initialChatReply;
              },
              get onNewInputBlock() {
                return e.onNewInputBlock;
              },
              get onAnswer() {
                return e.onAnswer;
              },
              get onEnd() {
                return e.onEnd;
              },
              get onNewLogs() {
                return e.onNewLogs;
              },
            })
          ),
          be(
            n,
            V(te, {
              get when() {
                return e.initialChatReply.typebot.settings.general
                  .isBrandingEnabled;
              },
              get children() {
                return V(ut, { botContainer: t });
              },
            }),
            null
          ),
          k(() =>
            fe(
              n,
              "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center typebot-container " +
                e.class
            )
          ),
          n
        );
      })()
    );
  },
  oc = ue("<style>"),
  ic = ue('<div part="bot">'),
  ac = (e) => {
    const [t, n] = X(e, [
        "onOpen",
        "onClose",
        "previewMessage",
        "onPreviewMessageClick",
        "theme",
        "autoShowDelay",
      ]),
      [r, o] = _(n.prefilledVariables),
      [i, a] = _(!1),
      [s, l] = _({
        message: t.previewMessage?.message ?? "",
        avatarUrl: t.previewMessage?.avatarUrl,
      }),
      [c, d] = _(!1),
      [u, p] = _(!1);
    E(() => {
      window.addEventListener("message", h);
      const e = t.autoShowDelay,
        n = t.previewMessage?.autoShowDelay;
      ft() && f(),
        Le(e) &&
          setTimeout(() => {
            f();
          }, e),
        Le(n) &&
          setTimeout(() => {
            y();
          }, n);
    }),
      I(() => {
        window.removeEventListener("message", h);
      }),
      T(() => {
        e.prefilledVariables && o((t) => ({ ...t, ...e.prefilledVariables }));
      });
    const h = (e) => {
        const { data: t } = e;
        t.isFromTypebot &&
          ("open" === t.command && f(),
          "close" === t.command && g(),
          "toggle" === t.command && m(),
          "showPreviewMessage" === t.command && y(t.message),
          "hidePreviewMessage" === t.command && v(),
          "setPrefilledVariables" === t.command &&
            o((e) => ({ ...e, ...t.variables })));
      },
      f = () => {
        u() || p(!0), v(), d(!0), c() && t.onOpen?.();
      },
      g = () => {
        d(!1), c() && t.onClose?.();
      },
      m = () => {
        c() ? g() : f();
      },
      b = () => {
        t.onPreviewMessageClick?.(), f();
      },
      y = (e) => {
        e && l(e), c() || a(!0);
      },
      v = () => {
        a(!1);
      };
    return [
      (() => {
        const e = oc();
        return be(e, Ae), e;
      })(),
      V(te, {
        get when() {
          return i();
        },
        get children() {
          return V(
            at,
            Y(s, {
              get placement() {
                return t.theme?.placement;
              },
              get previewMessageTheme() {
                return t.theme?.previewMessage;
              },
              get buttonSize() {
                return t.theme?.button?.size;
              },
              onClick: b,
              onCloseClick: v,
            })
          );
        },
      }),
      V(
        et,
        Y(() => t.theme?.button, {
          get placement() {
            return t.theme?.placement;
          },
          toggleBot: m,
          get isBotOpened() {
            return c();
          },
        })
      ),
      (() => {
        const o = ic();
        return (
          o.style.setProperty("height", "calc(100% - 80px)"),
          o.style.setProperty(
            "transition",
            "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"
          ),
          o.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"),
          o.style.setProperty("z-index", "42424242"),
          be(
            o,
            V(te, {
              get when() {
                return u();
              },
              get children() {
                return V(
                  nc,
                  Y(n, {
                    get prefilledVariables() {
                      return r();
                    },
                    class: "rounded-lg",
                  })
                );
              },
            })
          ),
          k(
            (n) => {
              const r =
                  "left" === e.theme?.placement
                    ? "bottom left"
                    : "bottom right",
                i = c() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                a = t.theme?.chatWindow?.backgroundColor,
                s =
                  "fixed rounded-lg w-full sm:w-[400px] max-h-[704px]" +
                  (c() ? " opacity-1" : " opacity-0 pointer-events-none") +
                  ("large" === e.theme?.button?.size
                    ? " bottom-24"
                    : " bottom-20") +
                  ("left" === e.theme?.placement
                    ? " sm:left-5"
                    : " sm:right-5");
              return (
                r !== n._v$ &&
                  (null != (n._v$ = r)
                    ? o.style.setProperty("transform-origin", r)
                    : o.style.removeProperty("transform-origin")),
                i !== n._v$2 &&
                  (null != (n._v$2 = i)
                    ? o.style.setProperty("transform", i)
                    : o.style.removeProperty("transform")),
                a !== n._v$3 &&
                  (null != (n._v$3 = a)
                    ? o.style.setProperty("background-color", a)
                    : o.style.removeProperty("background-color")),
                s !== n._v$4 && fe(o, (n._v$4 = s)),
                n
              );
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
          ),
          o
        );
      })(),
    ];
  },
  sc = ue("<style>"),
  lc = ue(
    '<div class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in" part="overlay"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div>'
  ),
  cc = (e) => {
    const [t, n] = X(e, [
        "onOpen",
        "onClose",
        "autoShowDelay",
        "theme",
        "isOpen",
        "defaultOpen",
      ]),
      [r, o] = _(n.prefilledVariables),
      [i, a] = _(t.isOpen ?? !1);
    E(() => {
      const e = ft();
      (t.defaultOpen || e) && c(), window.addEventListener("message", l);
      const n = t.autoShowDelay;
      Le(n) &&
        setTimeout(() => {
          c();
        }, n);
    }),
      I(() => {
        window.removeEventListener("message", l);
      }),
      T(() => {
        Me(e.isOpen) || e.isOpen === i() || u();
      }),
      T(() => {
        e.prefilledVariables && o((t) => ({ ...t, ...e.prefilledVariables }));
      });
    const s = (e) => {
        e.stopPropagation();
      },
      l = (e) => {
        const { data: t } = e;
        t.isFromTypebot &&
          ("open" === t.command && c(),
          "close" === t.command && d(),
          "toggle" === t.command && u(),
          "setPrefilledVariables" === t.command &&
            o((e) => ({ ...e, ...t.variables })));
      },
      c = () => {
        a(!0),
          t.onOpen?.(),
          document.body.style.setProperty("overflow", "hidden", "important"),
          document.addEventListener("pointerdown", d);
      },
      d = () => {
        a(!1),
          t.onClose?.(),
          (document.body.style.overflow = "auto"),
          document.removeEventListener("pointerdown", d);
      },
      u = () => {
        i() ? d() : c();
      };
    return V(te, {
      get when() {
        return i();
      },
      get children() {
        return [
          (() => {
            const e = sc();
            return be(e, Ae), e;
          })(),
          (() => {
            const t = lc(),
              o = t.firstChild,
              i = o.nextSibling.nextSibling.firstChild.firstChild;
            return (
              be(o, Ae),
              i.addEventListener("pointerdown", s),
              be(
                i,
                V(
                  nc,
                  Y(n, {
                    get prefilledVariables() {
                      return r();
                    },
                  })
                )
              ),
              k(
                (n) => {
                  const r = e.theme?.zIndex ?? 42424242,
                    o =
                      "relative h-[80vh] transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg" +
                      (e.theme?.backgroundColor ? " shadow-xl" : ""),
                    a = e.theme?.backgroundColor ?? "transparent";
                  return (
                    r !== n._v$ &&
                      (null != (n._v$ = r)
                        ? t.style.setProperty("z-index", r)
                        : t.style.removeProperty("z-index")),
                    o !== n._v$2 && fe(i, (n._v$2 = o)),
                    a !== n._v$3 &&
                      (null != (n._v$3 = a)
                        ? i.style.setProperty("background-color", a)
                        : i.style.removeProperty("background-color")),
                    n
                  );
                },
                { _v$: void 0, _v$2: void 0, _v$3: void 0 }
              ),
              t
            );
          })(),
        ];
      },
    });
  },
  dc = ue(
    "<style>\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: hidden;\n}\n"
  ),
  uc = () => {
    window.postMessage({ isFromTypebot: !0, command: "close" });
  },
  pc = () => {
    window.postMessage({ isFromTypebot: !0, command: "hidePreviewMessage" });
  },
  hc = () => {
    window.postMessage({ isFromTypebot: !0, command: "open" });
  },
  fc = (e) => {
    const t = {
      isFromTypebot: !0,
      command: "setPrefilledVariables",
      variables: e,
    };
    window.postMessage(t);
  },
  gc = (e) => {
    const t = { isFromTypebot: !0, command: "showPreviewMessage", message: e };
    window.postMessage(t);
  },
  mc = () => {
    window.postMessage({ isFromTypebot: !0, command: "toggle" });
  },
  bc = (e) => {
    const t = { isFromTypebot: !0, command: "setInputValue", value: e };
    window.postMessage(t);
  },
  yc = (e) => {
    const t = e.id
      ? document.getElementById(e.id)
      : document.querySelector("typebot-standard");
    if (!t) throw new Error("<typebot-standard> element not found.");
    Object.assign(t, e);
  },
  vc = (e) => {
    const t = document.createElement("typebot-popup");
    Object.assign(t, e), document.body.appendChild(t);
  },
  wc = (e) => {
    const t = document.createElement("typebot-bubble");
    Object.assign(t, e), document.body.appendChild(t);
  };
"undefined" != typeof window &&
  (Ce("typebot-standard", Ee, (e, { element: t }) => {
    const [n, r] = _(!1),
      o = new IntersectionObserver((e) => {
        e.some((e) => e.isIntersecting) && r(!0);
      });
    return (
      E(() => {
        o.observe(t);
      }),
      I(() => {
        o.disconnect();
      }),
      [
        (() => {
          const e = dc(),
            t = e.firstChild;
          return be(e, Ae, t), e;
        })(),
        V(te, {
          get when() {
            return n();
          },
          get children() {
            return V(nc, e);
          },
        }),
      ]
    );
  }),
  Ce("typebot-bubble", $e, ac),
  Ce("typebot-popup", Ie, cc));
const xc = {
  initStandard: yc,
  initPopup: vc,
  initBubble: wc,
  close: uc,
  hidePreviewMessage: pc,
  open: hc,
  setPrefilledVariables: fc,
  showPreviewMessage: gc,
  toggle: mc,
  setInputValue: bc,
};
((e) => {
  "undefined" != typeof window && (window.Typebot = { ...e });
})(xc);
export { xc as default };
