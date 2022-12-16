(function () {
'use strict';

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

const addStyle = style => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
};

const Constant = {
  title: ['title', 'name'],
  price: ['price'],
  description: ['description', 'detail', 'info']
};

const checkIfSimilarProductContainer = (el, attrs = []) => {
  const area_limit = 80 * 80, txt_limit_ct = 2;
  var txt_ct = 0;
  const itms = el.getElementsByTagName('*');
  for (let i = 0; i < itms.length; i ++) {
    if (getText(itms[i])) txt_ct ++;
    if (txt_ct > txt_limit_ct) break;
  }
  if (txt_ct < txt_limit_ct) return false;

  const imgs = el.getElementsByTagName('img');
  let i = 0;
  for (i = 0; i < imgs.length; i ++) {
    const img = imgs[i];
    const area = img.width * img.height;
    if (area < area_limit) continue;
    break;
  }
  if (i === imgs.length) return false;
  if (!attrs.length) return true;

  const htmlStr = (el.innerHTML || '').toLocaleLowerCase();
  i = 0;
  for (i = 0; i < attrs.length; i ++) {
    let j = 0;
    for (j = 0; j < attrs[i].length; j ++)
      if(htmlStr.includes(attrs[i][j]))
        break;
    if (j === attrs[i].length) break;
  }

  if (i && i === attrs.length) return true;
  return false;
};

const checkIfSimilarItem = (a, b) => {
  if (!checkIfSimilarProductContainer(a) || !checkIfSimilarProductContainer(b)) return 0;
  const tag1 = a.tagName, tag2 = b.tagName;
  if (tag1.toLocaleLowerCase() !== tag2.toLocaleLowerCase()) return 0;
  const attr1 = a.attributes, attr2 = b.attributes;
  let ct = 0;
  for (let i = 0; i < attr1.length; i ++) {
    const attr = attr1[i].name || '';
    if (!attr) continue;
    let j = 0;
    for (j = 0; j < attr2.length; j ++) {
      if (attr2[j].name == attr) break;
    }
    if (j === attr2.length) {
      continue;
    }
    ct ++;
  }
  let rate = Math.min(((ct * 2) / (attr1.length + attr2.length)) * 1.5, 1);
  if (attr1.length + attr2.length === 0) rate = 1;
  return rate;
};

const checkIfListContainer = el => {
  const t = 0.9;
  let p = el.parentNode;
  while (p && p.parentNode) {
    const pp = p.parentNode;
    const chs = pp.children;
    let ct = 0;
    for (let i = 0; i < chs.length; i ++) {
      let max = 0;
      for (let j = 0; j < chs.length; j ++) {
        if (i === j) continue;
        const a = chs[i], b = chs[j];
        const ret = checkIfSimilarItem(a, b);
        max = Math.max(max, ret);
        if (max >= t) break;
      }
      if (max < t) ct ++;
      if (ct > 1) break;
    }
    if (ct < 2 && chs.length > 2) return p;
    p = p.parentNode;
  }
  return null;
};

const getProductRootElement = el => {
  const check_list = checkIfListContainer(el);
  console.log('checkList', check_list);
  if (check_list) return check_list;
  if (checkIfSimilarProductContainer(el, [Constant.title])) return el;
  let p = el.parentNode;
  while (p && p.tagName.toLocaleLowerCase() !== 'body') {
    if (checkIfSimilarProductContainer(p, [Constant.title])) return p;
    p = p.parentNode;
  }
  return el;
};

const isVisible = el => {
  const style = window.getComputedStyle(el);
  if (style.opacity === '0') return false;
  if (style.visibility == 'hidden') return false;
  const r = el.getBoundingClientRect();
  if (r.width < 10 || r.height < 10) return false;
  return true;
};

const checkIfHasAttribute = (el, attr) => {
  const keys = el.attributes;
  for (let i = 0; i < keys.length; i ++) {
    const key = keys[i].name || '';
    const value = el.getAttribute(key) || '';
    if (key.toLocaleLowerCase().includes(attr) || value.toLocaleLowerCase().includes(attr)) return true;
  }
  return false;
};

const checkIfDescendOf = (ch, p, signs) => {
  while(ch && ch !== p) {
    for (let i = 0; i < signs.length; i ++)
      if (checkIfHasAttribute(ch, signs[i]))
        return true;
    ch = ch.parentNode;
  }
  return false;
};

const isHovered = (r, e) => {
  const x = e.clientX, y = e.clientY;
  if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) return true;
  return false;
};

const checkIfBetterImg = (a, b, e) => {
  if (!isVisible(a)) return false;
  if (!isVisible(b)) return true;
  if (!a.currentSrc && !a.src) return false;
  if (!b.currentSrc && !b.srt) return true;

  const offset = 2;
  const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
  const h1 = isHovered(r1, e), h2 = isHovered(r2, e);
  if (h1 && !h2) return true;
  if (!h1 && h2) return false;

  const area1 = r1.width * r1.height, area2 = r2.width * r2.height;
  if (Math.abs(area1 - area2) < offset * offset) {
    if (Math.abs(r1.x - r2.x) < offset && Math.abs(r1.y - r2.y) < offset) return true;
  }
  if (area1 > area2) return true;
  return false;
};

const containsAnyLetters = str => {
  return /[a-zA-Z0-9]/.test(str);
};

const getText = el => {
  if (!el) return '';
  if (['noscript', 'img'].indexOf(el.nodeName.toLocaleLowerCase()) > -1) return '';
  if (!isVisible(el)) return false;
  try {
    const childNodes = el.childNodes;
    var hasText = false;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType === Node.TEXT_NODE) {
        var txt = childNodes[i].textContent;
        if (!containsAnyLetters(txt)) continue;
        hasText = true;
        break;
      }
    }
    if (hasText) return (el.innerText || el.textContent || '').replace(/\n/g, '');
    return ''
  } catch (e) {
    return '';
  }
};

const getFText = el => {
  if (!el) return '';
  return (el.innerText || el.textContent || '').replace(/\n\n/g, '\n');
};

const checkIfBetterTitle = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  if (txt1 && !txt2) return true;
  if (!txt1) return false;

  const des1 = checkIfDescendOf(a, p, Constant.title), des2 = checkIfDescendOf(b, p, Constant.title);
  if (des1 && !des2) return true;
  if (!des1 && des2) return false;

  const fontSize1 = parseFloat(window.getComputedStyle(a).fontSize) || 0,
    fontSize2 = parseFloat(window.getComputedStyle(b).fontSize) || 0;
  
  if (fontSize1 > fontSize2 * 1.1) return true;
  return false;
};

const checkIfBetterPrice = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  const isPrice1 = checkIfPrice(txt1), isPrice2 = checkIfPrice(txt2);
  if (isPrice1 && !isPrice2) return true;
  if (!isPrice1) return false;
  
  const des1 = checkIfDescendOf(a, p, Constant.price), des2 = checkIfDescendOf(b, p, Constant.price);
  if (des1 && !des2) return true;
  if (!des1 && des2) return false;

  return false;
};

const checkIfBetterDescription = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  if (txt1 && !txt2) return true;
  if (!txt1) return false;

  // const des1 = checkIfDescendOf(a, p, Constant.description), des2 = checkIfDescendOf(b, p, Constant.description)
  // if (des1 && !des2) return true;
  // if (!des1 && des2) return false;
  
  if (txt1.length > txt2.length) return true;
  return false;
};

const findHref = el => {
  var p = el;
  while(p && p.tagName.toLocaleLowerCase() !== 'body') {
    if ((p.tagName.toLocaleLowerCase() === 'a' || p.tagName.toLocaleLowerCase === 'button') && p.href) return p.href;
    p = p.parentNode;
  }
  return location.href;
};

const getImgUrl = (el, e) => {
  if (!el) return '';
  if (el.tagName.toLocaleLowerCase() === 'img') return el;
  const imgs = el.getElementsByTagName('img');
  if (!imgs.length) return '';

  var ret = imgs[0];
  for (let i = 1; i < imgs.length; i ++) {
    if (checkIfBetterImg(imgs[i], ret, e)) ret = imgs[i];
  }
  return ret;
};

const getManualImgUrl = (el, e) => {
  while(el.tagName !== 'body') {
    const img = getImgUrl(el, e);
    if (img) return img;
    el = el.parentNode;
  }
  return null;
};

const getName = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterTitle(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
};

const checkIfPrice = (p) => {
  if (!p) return false;
  let d = p.replace(/ |\n|,/g, '');
  d = d.replace('$', '');
  if (!d) return false;
  for (let i = 0; i < d.length; i ++) if (d[i] !== '.' && !(d[i] >= '0' && d[i] <= '9')) return false;
  return true;
};

const getPrice = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterPrice(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
};

const getDescriptin = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterDescription(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
};

const getPhotos = (el) => {
  const ret = [];
  const itms = el.getElementsByTagName("img");
  for (let i = 0; i < itms.length; i ++) {
    const r = itms[i].getBoundingClientRect();
    if (r.width * r.height >= 6400) {
      ret.push(itms[i]);
    }
  }
  return ret;
};

const getUrl = (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el) return '';
  return findHref(el);
};

const getProductInfo = (el, e) => {
  const p = getProductRootElement(el);

  const e_img = getImgUrl(p, e);
  const e_name = getName(p);
  const e_price = getPrice(p);
  const e_description = getDescriptin(p);
  const e_photos = getPhotos(p);
  const name = getText(e_name);
  const img = (e_img.currentSrc || e_img.src || '').split(' ')[0];
  const url = getUrl(e);
  const price = getText(e_price);
  const description = getText(e_description);
  const r_photos = {};
  const photos = e_photos.map((p, idx) => {
    r_photos['photo' + idx] = p;
    return (p.currentSrc || p.src || '').split(' ')[0]
  });
  return {
    name,
    img,
    url,
    description,
    price,
    photos,
    elements: { e_name, e_img, e_price, e_description, ...r_photos }
  }
};

const getProductInfoIndividual = (el, e, global) => {
  if (!global.productInfo) global.productInfo = {};
  const productInfo = global.productInfo;
  if (!productInfo.elements) productInfo.elements = {};
  if (!productInfo.photos) productInfo.photos = [];
  if (!productInfo.photos.length) {
    productInfo.photos.push('');
    productInfo.elements.photo0 = null;
  }

  switch(global.selectMode) {
    case 'img':
      console.log(el);
      const e_img = getManualImgUrl(el, e);
      const img = (e_img.currentSrc || e_img.src || '').split(' ')[0];
      productInfo.elements.e_img = e_img;
      productInfo.img = img;
      break;
    case 'name':
      productInfo.elements.e_name = el;
      productInfo.name = getFText(el);
      break;
    case 'description':
      productInfo.elements.e_description = el;
      productInfo.description = getFText(el);
      break;
    case 'price':
      productInfo.elements.e_price = el;
      productInfo.price = getFText(el);
      break;
    case 'photos':
      const idx = productInfo.photos.length - 1;
      const e_photo = getManualImgUrl(el, e);
      const photo = (e_photo.currentSrc || e_photo.src || '').split(' ')[0];
      productInfo.elements['photo' + idx] = e_photo;
      productInfo.photos[idx] = photo;
      break;
  }
};

const STYLES = `
  .gs_confirm_container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #ff450040;
    z-index: 99999999;
    display: none;
  }
  .gs_confirm_container.gs_hide {
    opacity: 0;
    transition: opacity 3s;
    transition-delay: 1s;
  }
  .gs_message, .gs_confirm {
    position: fixed;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    padding: 30px 10px 8px;
    background-color: #fff !important;
    border: 4px solid #eee;
  }
  .gs_confirm {
    left: calc(50vw - 350px);
    top: 100px;
    width: 700px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 768px) {
    .gs_confirm {
      width: 290px;
      left: calc(50vw - 150px);
    }
  }
  .gs_message {
    display: none;
    left: 10px;
    bottom: 10px;
    z-index: 9999999;
    width: 300px;
    min-height: 250px;
    flex-direction: column;
  }

  .gs_message.gs_show { display: flex; }
  .gs_confirm_container.gs_show {
    display: inline-block;
  }
  .gs_ollacart_img img {
    width: 100%;
    max-height: 300px;
  }
  .gs_confirm .gs_ollacart_img {
    width: 300px;
  }
  .gs_name_price {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 16px;
    color: black;
  }
  .gs_confirm .gs_name_price {
    font-size: 20px;
    font-weight: bold;
    color: #303030;
  }
  .gs_description {
    font-size: 14px;
    margin-top: 10px;
  }
  .gs_message_over, .gs_message_finish {
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    background-color: orangered;
    color: white;
    text-align: center;
    padding: 8px 0;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
  }
  .gs_message_mask {
    position: absolute;
    left: -4px;
    right: -4px;
    top: -4px;
    bottom: -4px;
    background-color: #ff450040;
  }
  .gs_message_finish {
    font-size: 30px;
    top: 35%;
    padding: 20px 0;
  }
  .gs_addtional_photos {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gs_addtional_photos>div {
    position: relative;
    width: 46px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
  }
  .gs_addtional_photos .gs_remove_photo {
    transform: translateY(100%);
    opacity: 0;
    transition: all .3s;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000A0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gs_addtional_photos>div:hover .gs_remove_photo {
    transform: translateY(0);
    opacity: 1;
  }
  .gs_addtional_photos .gs_remove_photo .gs_remove_btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    background-color: rgb(200, 200, 200);
    color: black;
  }
  .gs_addtional_photos img {
    width: 100%;
  }

  .gs_manual_select_tools {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 10px;
  }
  .gs_confirm_tools {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
    margin-top: 10px;
  }
  .gs_btn {
    padding: 4px 10px;
    background-color: orangered;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 7px;
  }
  .gs_btn:hover {
    opacity: 0.8;
  }
  .gs_btn:active {
    opacity: 0.7;
  }
  .gs_btn.gs_direct {
    padding: 4px 14px;
  }

  .gs_confirm_right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 1px;
  }
  .gs_text_center {
    text-align: center;
  }
`;

const manualSelect = {
  img: 'Main Logo',
  name: 'Title',
  price: 'Price',
  description: 'Description',
  photos: 'Images'
};

const showMessage = (global) => {
  const info = global.productInfo;
  console.log(info);
  let html = '';
  if (!global.selectMode || global.selectMode === 'img') html += `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  if (!global.selectMode || global.selectMode === 'name' || global.selectMode === 'price') {
    html += `<div class="gs_name_price">`;
    if (!global.selectMode || global.selectMode === 'name') html += `<span>${info.name}</span>`;
    if (!global.selectMode || global.selectMode === 'price') html += `<span>${info.price || ''}</span>`;
    html += `</div>`;
  }
  if (!global.selectMode || global.selectMode === 'description') html += `<div class="gs_description">${info.description}</div>`;
  if (!global.selectMode || global.selectMode === 'photos') {
    for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
      if (i === 0) html += `<div class="gs_addtional_photos">`;
      if (info.photos[i])
      html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
      if (i === info.photos.length - 1) html += `</div>`;
    }
  }

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <div class="gs_btn gs_direct" tag="gs__prev"><</div>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <div class="gs_btn gs_direct" tag="gs__next">></div>
      </div>`;
  }
  
  if (global.selectMode) {
    html += `<div class="gs_message_over">Select ${manualSelect[global.selectMode]}</div>`;
  } else {
    html += `<div class="gs_message_over">Auto Select</div>`;
  }
  
  global.popup.innerHTML = html;
  global.popup.classList.toggle("gs_show", true);
};

const showConfirm = global => {
  hideMessage(global);

  const info = global.productInfo;
  console.log(info);
  let html = `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  html += `<div class="gs_confirm_right"><div class="gs_name_price"><span>${info.name}</span><span>${info.price || ''}</span></div>`;
  if (info.description) html += `<div class="gs_description">${info.description}</div>`;
  for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
    if (i === 0) html += `<div class="gs_addtional_photos">`;
    if (info.photos[i])
    html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
    if (i === info.photos.length - 1) html += `</div>`;
  }
  
  html += `<p class="gs_text_center">Go to <a href="https://www.ollacart.com" target="_blank">OllaCart</a></p>`;
  html += `<div class="gs_confirm_tools">
            <div class="gs_btn" tag="gs__confirm">Looks Correct</div>
            <div class="gs_btn" tag="gs__manual">Manual Select</div>
          </div>`;

  html += '</div>';
  html += `<div class="gs_message_over">You selected item</div>`;

  if (global.finish) html += `<div class="gs_message_mask"><div class="gs_message_finish">Added to OllaCart</div></div>`;

  global.confirm.innerHTML = `<div class="gs_confirm">${html}</div>`;
  global.confirm.classList.toggle("gs_show", true);
  global.showConfirm = true;

  if (global.finish) global.confirm.classList.toggle("gs_hide", true);
  else global.confirm.classList.toggle("gs_hide", false);
};

const hideMessage = global => {
  global.popup.classList.toggle("gs_show", false);
};

const hideConfirm = global => {
  global.confirm.classList.toggle("gs_show", false);
  global.showConfirm = false;
};

const initMessage = global => {
  addStyle(STYLES);
  global.popup = document.createElement("div");
  global.popup.className = "gs_message";
  document.body.appendChild(global.popup);

  global.confirm = document.createElement("div");
  global.confirm.className = "gs_confirm_container";
  document.body.appendChild(global.confirm);
};

// const API_URL2 = 'http://localhost:5000/api/'
const API_URL2 = 'https://ollacart-dev.herokuapp.com/api/';

const clearEl = el => el && el.classList.remove("gs_hover");
const clearClass = (cl) => {
  const itms = document.getElementsByClassName(cl);
  for (let i = itms.length - 1 ; i >= 0; i --) itms[i].classList.remove(cl);
};
const addClass = (obj, cl) => {
  const itms = Object.keys(obj).map(key => obj[key]);
  for (let i = 0 ; i < itms.length; i ++) {
    if (!itms[i]) continue;
    itms[i].classList.add(cl);
  }
};

const copyToTemp = (global) => {
  global.tempInfo = {
    ...global.productInfo,
    elements: {...(global.productInfo.elements || {})},
    photos: [...(global.productInfo.photos || [])]
  };
};
const copyFromTemp = (global) => {
  const keys = Object.keys(global.productInfo);
  let i = 0;
  for (i = 0; i < keys.length; i ++)
    if (global.productInfo[keys[i]] !== global.tempInfo[keys[i]])
      break;
  if (i === keys.length) return;
  global.productInfo = {
    ...global.tempInfo,
    // elements: {...(global.tempInfo.elements || {})},
    // photos: [...(global.tempInfo.photos || [])]
  };
  showMessage(global);
};

const toggle = global => {
  const state = !global.state;
  global.state = state;
  global.selectMode = null;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElDebounce);
  document[action]("mousedown", global.domPick);
  if (state) global.disableLinks();

  if (!state) {
    clearEl(global.selectedEl);
    clearClass('gs_copied');
    hideMessage(global);
    hideConfirm(global);
  }
};

const init = global => {
  global.init = true;
  global.state = false;
  global.selectedEl = null;
  global.selectMode = null;
  global.productInfo = {};
  global.tempInfo = {};
  global.items = ['img', 'name', 'price', 'description', 'photos'];
  
  global.clearElDebounce = debounce_1(() => clearEl(global.selectedEl) && hideMessage(global), 200);

  global.sendAPI = () => {
    const productInfo = global.productInfo;
    if (!productInfo.img || !productInfo.name) return;

    const { name, url, price, description, photos } = productInfo;
    const photo = productInfo.img;
    
    // fetch(API_URL + 'extension/create', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ photo, url, name })
    // });
    
    fetch(API_URL2 + 'product/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo, url, name, price, description, photos, ce_id: localStorage.getItem('ce_id') || '' })
    });
  };

  global.popupBtnClicked = (attr, target) => {
    copyFromTemp(global);
    if (attr === 'gs__confirm') {
      global.sendAPI();
      global.finish = true;
      showConfirm(global);
      setTimeout(() => { 
        global.finish = false;
        toggle(global);
        global.sendClose();
      }, 5000);
      return;
    }
    if (attr === 'gs__manual') {
      hideConfirm(global);
      global.selectMode = 'img';
      showMessage(global);
      return;
    }
    if (attr === 'gs__finish') {
      global.selectMode = '';
      showConfirm(global);
      return;
    }
    if (attr === 'gs__remove') {
      const t = parseInt(target) || 0;
      for (let i = t; i < global.productInfo.photos.length - 1; i ++) {
        global.productInfo.photos[i] = global.productInfo.photos[i + 1];
        global.productInfo.elements['photo' + i] = global.productInfo.elements['photo' + (i + 1)];
      }
      if (global.productInfo.photos.length) {
        global.productInfo.photos.pop();
        delete global.productInfo.elements['photo' + global.productInfo.photos.length];
      }
      copyToTemp(global);
      if (global.showConfirm) showConfirm(global);
      else showMessage(global);
      return;
    }
    let idx = global.items.indexOf(global.selectMode);
    if (attr === 'gs__prev') idx --;
    if (attr === 'gs__next') idx ++;
    if (idx < 0) idx = 0;
    if (idx >= global.items.length) idx = global.items.length - 1;
    global.selectMode = global.items[idx];
    showMessage(global);
  };
  
  global.selectElement = debounce_1(e => {
    if (e.target.tagName.toLocaleLowerCase() === 'html') return;
    if (global.finish || !global.popup || global.confirm.contains(e.target)) return;
    if (global.popup.contains(e.target)) {
      copyFromTemp(global);
      return;
    }
    if (global.selectedEl !== e.target) {
      clearEl(global.selectedEl);
    }
    global.selectedEl = e.target;
    const selectedEl = global.selectedEl;
    selectedEl.classList.add("gs_hover");
    
    if (!global.selectMode) {
      global.productInfo = getProductInfo(selectedEl, e);
    } else {
      getProductInfoIndividual(selectedEl, e, global);
    }
    showMessage(global);
  }, 200);
  
  global.domPick = (e) => {
    if (e.target.tagName.toLocaleLowerCase() === 'html') return;
    if (global.finish || !global.popup) return;
    if (global.popup.contains(e.target) || global.confirm.contains(e.target)) {
      const attr = e.target.getAttribute('tag');
      const target = e.target.getAttribute('target') || '';
      if (attr)
        global.popupBtnClicked(attr, target);
      return ;
    }
    
    const { selectedEl } = global;
    if (!selectedEl) return;
    
    clearClass('gs_copied');
    if (!global.selectMode) global.productInfo = getProductInfo(selectedEl, e);
    addClass(global.productInfo.elements, 'gs_copied');
    clearEl(selectedEl);
    copyToTemp(global);
    console.log(global.productInfo);
    
    if (global.selectMode) {
      let idx = global.items.indexOf(global.selectMode) + 1;
      if (global.selectMode === 'photos') {
        global.productInfo.elements['photo' + global.productInfo.photos.length] = null;
        global.productInfo.photos.push('');
        idx --;
      }
      global.selectMode = global.items[idx];
      showMessage(global);
      return ;
    }
    showConfirm(global);
  };

  global.disableClick = (e) => {
    if(global.state) {
      e.preventDefault();
      return false;
    }
  };

  global.disableLinks = () => {
    var links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i ++) {
      const link = links[i];
      if (link.getAttribute('link_to_disabled')) continue;
      link.onclick = global.disableClick;
      link.setAttribute('link_to_disabled', 'true');
    }
    links = document.getElementsByTagName('button');
    for (let i = 0; i < links.length; i ++) {
      const link = links[i];
      if (link.getAttribute('link_to_disabled')) continue;
      link.onclick = global.disableClick;
      link.setAttribute('link_to_disabled', 'true');
    }
  };

  addStyle(`
    .gs_hover {
      border: 2px solid #cdcdcd !important;
      background: repeating-linear-gradient( 135deg, rgba(225, 225, 226, 0.3), rgba(229, 229, 229, 0.3) 10px, rgba(173, 173, 173, 0.3) 10px, rgba(172, 172, 172, 0.3) 20px ) !important;
      box-shadow: inset 0px 0px 0px 1px #d7d7d7;
    }

    .gs_copied {
      border: 3px solid #ff0a00 !important;
      background: repeating-linear-gradient( 135deg, rgba(183, 240, 200, 0.3), rgba(192, 231, 194, 0.3) 10px, rgba(124, 189, 126, 0.3) 10px, rgba(137, 180, 129, 0.3) 20px ) !important;
      box-shadow: inset 0px 0px 0px 1px #c4d9c2 !important;      
    }
  `);
  initMessage(global); 
};

!(() => {
  const global = window.__gs = window.__gs || {};
  console.log('[Ollacart] Init', global);
  if (!global.init) {
    console.log("[Ollacart Selector]: Started");
    init(global);

    global.sendClose = () => {
      chrome.runtime.sendMessage({type: "close"}, function(response) {
        console.log(response);
      });  
    };

    chrome.runtime.sendMessage({type: "init"}, function(response) {
      console.log(response);
    });
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(request);
        switch(request.type) {
          case 'get_state':
            sendResponse(global.state);
            break;
          case 'toggle_state':
            toggle(global);
            sendResponse(global.state);
          case 'ce_id':
            if (request.ce_id)
              localStorage.setItem('ce_id', request.ce_id);
        }
      }
    );
  }
})();

}());
