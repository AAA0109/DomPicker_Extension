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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Used to match a single whitespace character. */

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/** Used for built-in method references. */

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

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

class ElementOverlay {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.overlay = document.createElement("div");
        this.overlay.className = options.className || "_ext-element-overlay";
        this.overlay.style.background = ((_a = options.style) === null || _a === void 0 ? void 0 : _a.background) || "rgba(250, 240, 202, 0.2)";
        this.overlay.style.borderColor = ((_b = options.style) === null || _b === void 0 ? void 0 : _b.borderColor) || "#F95738";
        this.overlay.style.borderStyle = ((_c = options.style) === null || _c === void 0 ? void 0 : _c.borderStyle) || "solid";
        this.overlay.style.borderRadius = ((_d = options.style) === null || _d === void 0 ? void 0 : _d.borderRadius) || "1px";
        this.overlay.style.borderWidth = ((_e = options.style) === null || _e === void 0 ? void 0 : _e.borderWidth) || "1px";
        this.overlay.style.boxSizing = ((_f = options.style) === null || _f === void 0 ? void 0 : _f.boxSizing) || "border-box";
        this.overlay.style.cursor = ((_g = options.style) === null || _g === void 0 ? void 0 : _g.cursor) || "crosshair";
        this.overlay.style.position = ((_h = options.style) === null || _h === void 0 ? void 0 : _h.position) || "absolute";
        this.overlay.style.zIndex = ((_j = options.style) === null || _j === void 0 ? void 0 : _j.zIndex) || "2147483647";
        // this.overlay.style.transition = "all .2s linear";
        this.shadowContainer = document.createElement("div");
        this.shadowContainer.className = "_ext-element-overlay-container";
        this.shadowContainer.style.position = "absolute";
        this.shadowContainer.style.top = "0px";
        this.shadowContainer.style.left = "0px";
        this.shadowRoot = this.shadowContainer.attachShadow({ mode: "open" });
    }
    addToDOM(parent, useShadowDOM) {
        this.usingShadowDOM = useShadowDOM;
        if (useShadowDOM) {
            parent.insertBefore(this.shadowContainer, parent.firstChild);
            this.shadowRoot.appendChild(this.overlay);
        }
        else {
            parent.appendChild(this.overlay);
        }
    }
    removeFromDOM() {
        this.setBounds({ x: 0, y: 0, width: 0, height: 0 });
        this.overlay.remove();
        if (this.usingShadowDOM) {
            this.shadowContainer.remove();
        }
    }
    captureCursor() {
        this.overlay.style.pointerEvents = "auto";
    }
    ignoreCursor() {
        this.overlay.style.pointerEvents = "none";
    }
    setBounds({ x, y, width, height }) {
        this.overlay.style.left = x + "px";
        this.overlay.style.top = y + "px";
        this.overlay.style.width = width + "px";
        this.overlay.style.height = height + "px";
    }
    getBounds() {
        return {
            x: parseFloat(this.overlay.style.left),
            y: parseFloat(this.overlay.style.top),
            width: parseFloat(this.overlay.style.width),
            height: parseFloat(this.overlay.style.height),
        }
    }
}

const getElementBounds = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        x: window.pageXOffset + rect.left,
        y: window.pageYOffset + rect.top,
        width: el.offsetWidth,
        height: el.offsetHeight,
    };
};

const checkSimilarBounds = (b1, b2) => {
    const keys = ['x', 'y', 'width', 'height'];
    for (let i = 0 ; i < keys.length; i ++) {
        if (Math.abs(b1[keys[i]] - b2[keys[i]]) > 0.1 )
            return false;
    }
    return true;
};

class ElementPicker {
    constructor(overlayOptions) {
        this.handleMouseMove = (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        };
        this.handleClick = (event) => {
            var _a;
            if (this.target && this.target.getAttribute('gsallow')) return;
            if (this.target && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onClick)) {
                this.options.onClick(this.target);
            }
            event.preventDefault();
        };
        this.tick = () => {
            this.updateTarget();
            this.tickReq = window.requestAnimationFrame(this.tick);
        };
        this.active = false;
        this.overlay = new ElementOverlay(overlayOptions !== null && overlayOptions !== void 0 ? overlayOptions : {});
    }
    start(options) {
        var _a, _b;
        if (this.active) {
            return false;
        }
        this.active = true;
        this.options = options;
        document.addEventListener("mousemove", this.handleMouseMove, true);
        document.addEventListener("click", this.handleClick, true);
        this.overlay.addToDOM((_a = options.parentElement) !== null && _a !== void 0 ? _a : document.body, (_b = options.useShadowDOM) !== null && _b !== void 0 ? _b : true);
        this.tick();
        return true;
    }
    stop() {
        this.active = false;
        this.options = undefined;
        document.removeEventListener("mousemove", this.handleMouseMove, true);
        document.removeEventListener("click", this.handleClick, true);
        this.overlay.removeFromDOM();
        this.target = undefined;
        this.mouseX = undefined;
        this.mouseY = undefined;
        if (this.tickReq) {
            window.cancelAnimationFrame(this.tickReq);
        }
    }
    updateTarget() {
        var _a, _b;
        if (this.mouseX === undefined || this.mouseY === undefined) {
            return;
        }
        // Peek through the overlay to find the new target
        this.overlay.ignoreCursor();
        const elAtCursor = document.elementFromPoint(this.mouseX, this.mouseY);
        const newTarget = elAtCursor;
        this.overlay.captureCursor();
        // If the target hasn't changed, there's nothing to do
        if (!newTarget) return;
        // If we have an element filter and the new target doesn't match,
        // clear out the target
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.elementFilter) {
            if (!this.options.elementFilter(newTarget)) {
                this.target = undefined;
                this.overlay.setBounds({ x: 0, y: 0, width: 0, height: 0 });
                return;
            }
        }

        const bounds = getElementBounds(newTarget);
        if (newTarget === this.target) {
            const ori_bounds = this.overlay.getBounds();
            if (checkSimilarBounds(bounds, ori_bounds))
                return ;
        }

        this.target = newTarget;
        this.overlay.setBounds(bounds);
        if ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onHover) {
            this.options.onHover(newTarget);
        }
    }
}

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
  if (check_list) return check_list;
  if (checkIfSimilarProductContainer(el, [Constant.title])) return el;
  let p = el.parentNode;
  while (p && p.tagName.toLocaleLowerCase() !== 'html') {
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
  const x = e.x, y = e.y;
  if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) return true;
  return false;
};

const checkIfBetterImg = (a, b, mouse, excepts = []) => {
  if (!isVisible(a)) return false;
  if (!isVisible(b)) return true;
  const a_src = getSrcFromImgTag(a), b_src = getSrcFromImgTag(b);
  if (!a_src) return false;
  if (!b_src) return true;
  const excepts_src = excepts.map(itm => getSrcFromImgTag(itm));
  if (excepts_src.includes(a_src)) return false;
  if (excepts_src.includes(b_src)) return true;

  const offset = 2;
  const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
  const h1 = isHovered(r1, mouse), h2 = isHovered(r2, mouse);
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

const getEnteredText = el => {
  if (!el) return '';
  return (el.innerText || el.textContent || '').replace(/\n\n/g, '\n').replace(/\n/g, '\n'); //•
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
  
  if (fontSize1 > fontSize2 * 1.2) return true;
  return false;
};

const getCurrencyNumber = (str) => {
  try {
    return parseFloat(str.replace(/[^0-9.]+/g,"")) || 0;
  } catch (ex) {
    return 0;
  }
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
  while(p && p.tagName.toLocaleLowerCase() !== 'html') {
    if ((p.tagName.toLocaleLowerCase() === 'a' || p.tagName.toLocaleLowerCase === 'button') && p.href) return p.href;
    p = p.parentNode;
  }
  return '';
};

const getImgUrl = (el, mouse, excepts = []) => {
  if (!el) return '';
  if (el.tagName.toLocaleLowerCase() === 'img') return el;
  const imgs = el.getElementsByTagName('img');
  if (!imgs.length) return '';

  var ret = imgs[0];
  for (let i = 1; i < imgs.length; i ++) {
    if (checkIfBetterImg(imgs[i], ret, mouse, excepts)) ret = imgs[i];
  }
  return ret;
};

const getManualImgUrl = (el, mouse) => {
  while(el.tagName !== 'html') {
    const img = getImgUrl(el, mouse);
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

const getPhotos = (el, mouse, photo) => {
  const ret = [photo];
  for (let i = 0; i < 4; i ++) {
    const img = getImgUrl(el, mouse, ret);
    if (ret.findIndex(itm => getSrcFromImgTag(itm).split('?')[0] === getSrcFromImgTag(img).split('?')[0]) > -1) break;
    ret.push(img);
  }
  ret.shift();
  return ret;
};

const getUrl = (el) => {
  if (!el) return '';
  return findHref(el);
};

const getSrcFromImgTag = (el) => {
  if (!el) return '';
  return (el.currentSrc || el.src || '').split(' ')[0]
};

const getProductInfo = (el, picker) => {
  const p = getProductRootElement(el);

  const e_img = getImgUrl(p, { x: picker.mouseX, y: picker.mouseY });
  const e_name = getName(p);
  const e_price = getPrice(p);
  const e_description = getDescriptin(p);
  const e_photos = getPhotos(p, { x: picker.mouseX, y: picker.mouseY }, e_img);
  const name = getText(e_name);
  const img = getSrcFromImgTag(e_img);
  const url = getUrl(el);
  const price = getCurrencyNumber(getText(e_price));
  const description = getEnteredText(e_description);
  const r_photos = {};
  const photos = e_photos.map((p, idx) => {
    r_photos['photo' + idx] = p;
    return getSrcFromImgTag(p);
  });
  return {
    name,
    img,
    color: img,
    url,
    description,
    price,
    photos,
    elements: { e_name, e_img, e_price, e_description, ...r_photos }
  }
};

const getProductInfoIndividual = (el, picker, global) => {
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
      productInfo.elements.e_img = getManualImgUrl(el, { x: picker.mouseX, y: picker.mouseY });
      productInfo.img = getSrcFromImgTag(productInfo.elements.e_img);
      break;
    case 'color':
      productInfo.elements.e_color = getManualImgUrl(el, { x: picker.mouseX, y: picker.mouseY });
      productInfo.color = getSrcFromImgTag(productInfo.elements.e_color);
      break;
    case 'name':
      productInfo.elements.e_name = el;
      productInfo.name = getFText(el);
      break;
    case 'description':
      productInfo.elements.e_description = el;
      productInfo.description = getEnteredText(el);
      break;
    case 'price':
      productInfo.elements.e_price = el;
      productInfo.price = getCurrencyNumber(getFText(el));
      break;
    case 'photos':
      const e_photo = getManualImgUrl(el, { x: picker.mouseX, y: picker.mouseY });
      const photo = (e_photo.currentSrc || e_photo.src || '').split(' ')[0];
      productInfo.elements['temp_photo'] = e_photo;
      productInfo.temp_photo = photo;
      break;
  }
};

const STYLES = `
  .gs_confirm_container, .gs_message, .gs_tooltip {
    box-sizing: border-box !important;
  }
  .gs_confirm_container *, .gs_message *, .gs_tooltip * {
    color: black !important;
    box-sizing: border-box !important;
    font-size: 16px !important;
    appearance: unset !important;
    position: unset !important;
    margin: unset !important;
    opacity: unset !important;
    visibility: unset !important;
  }
  .gs_confirm_container input[type=checkbox] {
    width: 13px !important;
    height: 13px !important;
  }
  .gs_confirm_container input, .gs_message input {
    border: 1px solid black !important;
  }
  .gs_hidden { visibility: hidden; }
  .gs_d-none { display: none !important; }
  .gs_tooltip {
    position: fixed !important;
    z-index: 99999999999999 !important;
    max-width: 500px !important;
    width: 80% !important;
    pointer-events: none !important;
    display: none !important;
    
    background-color: #ffa778 !important;
    padding: 5px 10px !important;
    box-shadow: 1px 1px 5px 2px #260101 !important;
    line-height: 16px !important;
    font-size: 16px !important;
    color: black !important;
  }
  .gs_checkbox {
    width: 18px !important;
    height: 18px !important;
    cursor: pointer !important;
  }
  .gs_tooltip.gs_show {
    display: block !important;
  }
  .gs_confirm_container {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-color: #ff450040 !important;
    z-index: 9999999999999 !important;
    display: none !important;
  }
  .gs_confirm_container.gs_hide {
    opacity: 0 !important;
    transition: opacity 2s !important;
    transition-delay: 4s !important;
  }
  .gs_message, .gs_confirm {
    position: fixed !important;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25) !important;
    padding: 30px 10px 8px !important;
    background-color: #fff !important;
    border: 4px solid #eee !important;
  }
  .gs_confirm {
    left: calc(50vw - 350px) !important;
    top: 80px !important;
  }
  .gs_hide .gs_confirm {
    display: none !important;
  }
  .gs_confirm_content {
    width: 730px !important;
    max-width: 100% !important;
    max-height: calc(100vh - 150px) !important;
    overflow-y: auto !important;
    display: flex !important;
    gap: 20px !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
  }
  @media screen and (max-width: 768px) {
    .gs_confirm {
      width: 290px !important;
      left: calc(50vw - 150px) !important;
    }
  }
  .gs_message {
    display: none !important;
    left: 10px !important;
    bottom: 10px !important;
    z-index: 999999999999 !important;
    width: 300px !important;
  }
  .gs_message_content {
    display: flex !important;
    max-height: calc(100vh - 100px) !important;
    overflow-y: auto !important;
    min-height: 250px !important;
    flex-direction: column !important;
  }

  .gs_confirm_container.gs_show, .gs_message.gs_show {
    display: inline-block !important;
  }
  .gs_ollacart_img img {
    width: 100% !important;
  }
  .gs_confirm .gs_ollacart_img {
    width: 350px !important;
    /* position: sticky; */
    /* top: 0; */
  }
  .gs_name_price {
    display: flex !important;
    justify-content: space-between !important;
    font-size: 16px !important;
    color: black !important;
    gap: 10px !important;
  }
  .gs_confirm .gs_name_price {
    font-size: 20px !important;
    font-weight: bold !important;
    color: #303030 !important;
  }
  .gs_confirm .gs_price {
    color: #004400 !important;
  }
  .gs_description {
    font-size: 14px !important;
    margin-top: 10px !important;
    white-space: break-spaces !important;
  }
  .gs_message_over, .gs_message_finish {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    top: -20px !important;
    background-color: orangered !important;
    color: white !important;
    text-align: center !important;
    padding: 8px 0 !important;
    font-size: 20px !important;
    font-weight: bold !important;
    white-space: nowrap !important;
    cursor: pointer !important;
  }
  .gs_message_mask {
    position: absolute !important;
    left: -4px !important;
    right: -4px !important;
    top: -4px !important;
    bottom: -4px !important;
    background-color: #ff450040 !important;
  }
  .gs_message_finish {
    font-size: 30px !important;
    top: calc(50% - 100px) !important;
    padding: 50px 0 !important;
  }
  .gs_addtional_photos {
    margin-top: 5px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
  }
  .gs_addtional_photos>div {
    position: relative !important;
    width: 46px !important;
    height: 60px !important;
    overflow: hidden !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border: 1px solid blue !important;
  }
  .gs_addtional_photos .gs_remove_photo {
    transform: translateY(100%) !important;
    opacity: 0 !important;
    transition: all .3s !important;
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    background-color: #000000A0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .gs_addtional_photos>div:hover .gs_remove_photo {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }
  .gs_addtional_photos .gs_remove_photo .gs_remove_btn {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 30px !important;
    font-weight: bold !important;
    background-color: rgb(200, 200, 200) !important;
    color: black !important;
  }
  .gs_addtional_photos img {
    width: 100% !important;
  }

  .gs_manual_select_tools {
    flex-grow: 1 !important;
    display: flex !important;
    align-items: flex-end !important;
    justify-content: space-between !important;
    margin-top: 10px !important;
  }
  .gs_confirm_tools {
    display: flex !important;
    gap: 15px !important;
    justify-content: flex-end !important;
    align-items: flex-end !important;
    flex-grow: 1 !important;
    margin-top: 10px !important;
  }
  .gs_btn {
    padding: 4px 10px !important;
    background-color: orangered !important;
    color: white !important;
    font-size: 16px !important;
    font-weight: bold !important;
    cursor: pointer !important;
    border-radius: 7px !important;
  }
  .gs_btn:hover {
    opacity: 0.8 !important;
  }
  .gs_btn:active {
    opacity: 0.7 !important;
  }
  .gs_btn.gs_direct {
    padding: 4px 14px !important;
  }

  .gs_confirm_right {
    display: flex !important;
    flex-direction: column !important;
    flex-grow: 1 !important;
    width: 1px !important;
  }
  .gs_text_center {
    text-align: center !important;
  }
  .gs_go_ollacart {
    margin-top: 20px !important;
    font-size: 20px !important;
    line-height: 25px !important;
    cursor: pointer !important;
    color: lightseagreen !important;
  }
  .gs_textarea {
    width: 100% !important;
    height: 300px !important;
    min-height: 300px !important;
    max-height: 300px !important;
    font-size: 16px !important;
  }

  .gs_close {
    position: absolute !important;
    top: 5px !important;
    right: 5px !important;
    cursor: pointer !important;
  }
  .gs_close:hover {
    opacity: 0.8 !important;
  }
  .gs_close img {
    width: 20px !important;
  }

  .gs_addtional_picker {
    margin-top: 15px !important;
    margin-left: auto !important;
  }
  .gs_addtional_picker>div {
    width: 200px !important;
    margin-top: 5px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .gs_addtional_picker>div>div {
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
  }
  .gs_addtional_picker>div>*:nth-child(2) {
    width: 70px !important;
  }
  .gs_addtional_picker .gs_color-img {
    aspect-ratio: 1 !important;
    text-align: center !important;
    border: 1px solid orangered !important;
    object-fit: contain !important;
    padding: 4px !important;
    border-radius: 8px !important;
    cursor: pointer !important;
  }
  .gs_addtional_picker .gs_color-img:hover {
    opacity: 0.8 !important;
  }

  .gs_confirm_content::-webkit-scrollbar, .gs_message_content::-webkit-scrollbar {
    width: 7px !important;
  }
  .gs_confirm_content::-webkit-scrollbar-track, .gs_message_content::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
  }
  .gs_confirm_content::-webkit-scrollbar-thumb, .gs_message_content::-webkit-scrollbar-thumb {
    background: #e19b9b !important;
  }
  .gs_confirm_content::-webkit-scrollbar-thumb:hover, .gs_message_content::-webkit-scrollbar-thumb:hover {
    background: #e19b9bd0 !important;
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
  let html = '<div class="gs_message_content">';
  if (!global.selectMode || global.selectMode === 'img') html += `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  if (!global.selectMode) {
    html += `<div class="gs_name_price"><span>${info.name}</span><span>${info.price || ''}</span></div>`;
  }
  if (!global.selectMode) html += `<div class="gs_description">${info.description}</div>`;
  if (global.selectMode === 'name' || global.selectMode === 'price' || global.selectMode === 'description') {
    html += `<textarea class="gs_textarea" tag="gs__text" target="${global.selectMode}">${info[global.selectMode]}</textarea>`;
  }
  if (!global.selectMode || global.selectMode === 'photos') {
    html += `<div class="gs_addtional_photos">`;
    for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
      if (info.photos[i])
      html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
    }
    html += `</div>`;
  }
  if (global.selectMode === 'photos' && info.temp_photo) {
    html += `<div class="gs_ollacart_img"><img src="${info.temp_photo}"/></div>`;
  }

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <div class="gs_btn gs_direct" tag="gs__prev"><</div>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <div class="gs_btn gs_direct" tag="gs__next">></div>
      </div>`;
  }
  html += `</div>`;
  
  if (global.selectMode) {
    html += `<div class="gs_message_over">Select ${manualSelect[global.selectMode]}</div>`;
  } else {
    html += `<div class="gs_message_over">Auto Select</div>`;
  }
  
  global.popup.innerHTML = html;
  global.popup.classList.toggle("gs_show", true);
};

const showColorModal = (global) => {
  const info = global.productInfo;
  let html = '<div class="gs_message_content">';
  html += `<div class="gs_ollacart_img"><img src="${info.color}" /></div>`;

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <span></span>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <span></span>
      </div>`;
  }
  html += `</div>`;
  
  html += `<div class="gs_message_over">Specify Color</div>`;
  
  global.colormodal.innerHTML = html;
  global.colormodal.classList.toggle("gs_show", true);
};

const showConfirm = global => {
  hideMessage(global);
  hideColorModal(global);
  hideTooltip(global);

  const info = global.productInfo;
  let html = `<div class="gs_confirm"><div class="gs_close"><img tag="gs__close" src="https://i.postimg.cc/Wb3vQQxW/close-icon.png" alt="close"/></div><div class="gs_confirm_content">`;
  html += `<div class="gs_ollacart_img"><img src="${info.img}" /><p class="gs_text_center gs_go_ollacart" tag="gs__goollacart">Go to  OllaCart</p></div>`;
  html += `<div class="gs_confirm_right"><div class="gs_name_price"><span>${info.name}</span><span class="gs_price">$${info.price || '0'}</span></div>`;
  html += `<div class="gs_addtional_picker">
            <div>
              <div><img class="gs_checkbox" src="${info.chooseSize ? 'https://i.postimg.cc/25cTL5v5/checkbox-checked.png' : 'https://i.postimg.cc/sDkc58vp/checkbox-blank.png'}" alt="c" tag="gs__togglesize" /> Size notes</div>
              <input class="${info.chooseSize ? '' : 'gs_d-none'}" type="text" value="${info.size || ''}" tag="gs__text" target="size" />
            </div>
            <!-- <div>
              <div><input type="checkbox" ${info.chooseColor ? 'checked' : ''} tag="gs__togglecolor" /> Color</div>
              <img class="gs_color-img ${info.chooseColor ? '' : 'gs_d-none'}" src="${info.color}" alt="Specify Color" tag="gs__color" />
            </div> -->
          </div>`;
  if (info.description) html += `<div class="gs_description">${info.description}</div>`;
  for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
    if (i === 0) html += `<div class="gs_addtional_photos">`;
    if (info.photos[i])
    html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
    if (i === info.photos.length - 1) html += `</div>`;
  }
  
  html += `<div class="gs_confirm_tools">
            <div class="gs_btn" tag="gs__confirm">Looks Correct</div>
            <div class="gs_btn" tag="gs__manual">Manual Select</div>
          </div>`;

  html += '</div></div>';
  // html += `<div class="gs_message_over">You selected item</div>`;
  html += `</div>`;

  if (global.finish) html += `<div class="gs_message_finish" tag="gs__goollacart">Added to OllaCart</div>`;

  global.confirm.innerHTML = html;
  global.confirm.classList.toggle("gs_show", true);
  global.showConfirm = true;

  if (global.finish) global.confirm.classList.toggle("gs_hide", true);
  else global.confirm.classList.toggle("gs_hide", false);
};

const showTooltip = global => {
  global.tooltip.classList.toggle("gs_show", true);
};

const hideTooltip = global => {
  global.tooltip.classList.toggle("gs_show", false);
};

const hideMessage = global => {
  global.popup.classList.toggle("gs_show", false);
};

const hideColorModal = global => {
  global.colormodal.classList.toggle("gs_show", false);
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

  global.colormodal = document.createElement("div");
  global.colormodal.className = "gs_message";
  document.body.appendChild(global.colormodal);

  global.confirm = document.createElement("div");
  global.confirm.className = "gs_confirm_container";
  document.body.appendChild(global.confirm);
  
  global.tooltip = document.createElement("div");
  global.tooltip.innerHTML = 'Click whenever OllaCart shows appropriate product information. You can manually select and edit information after.';
  global.tooltip.className = "gs_tooltip";
  document.body.appendChild(global.tooltip);
};

// const API_URL = 'https://www.ollacart.com/api/'
const API_URL = 'https://ollacart-dev.herokuapp.com/api/';
// const API_URL2 = 'http://localhost:5000/api/'

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
  global.productInfo.temp_photo = '';
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
    temp_photo: ''
  };
  if (global.selectMode === 'color') showColorModal(global);
  else showMessage(global);
};

const toggle = global => {
  const state = !global.state;
  global.state = state;
  global.selectMode = null;

  if (state) {
    global.picker.start({
      onHover: global.selectElement,
      onClick: global.domPick
    });
    document.addEventListener('input', global.inputValueChanged);
    document.addEventListener('mousemove', global.onMouseMove);
  } else {
    global.picker.stop();
    document.removeEventListener('input', global.inputValueChanged);
    document.removeEventListener('mousemove', global.onMouseMove);
  }

  if (!state) {
    clearClass('gs_copied');
    hideMessage(global);
    hideConfirm(global);
    hideTooltip(global);
  }
};

const init = global => {
  global.init = true;
  global.state = false;
  global.selectMode = null;
  global.productInfo = {};
  global.tempInfo = {};
  global.picker = new ElementPicker({
    style: {
      background: "rgba(153, 235, 255, 0.5)",
      borderColor: "yellow"
    },
  });
  global.items = ['img', 'name', 'price', 'description', 'photos'];

  global.sendAPI = () => {
    const productInfo = global.productInfo;
    if (!productInfo.img || !productInfo.name) return;

    const { name, price, description, photos } = productInfo;
    const photo = productInfo.img;
    const url = productInfo.url || findHref(productInfo.elements.e_img) || findHref(productInfo.elements.e_name) || location.href;
    const original_url = location.href;
    const size = productInfo.chooseSize ? productInfo.size : '';
    // console.log('url', url);
    
    fetch(API_URL + 'product/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo, original_url, url, name, price, description, photos, size, ce_id: localStorage.getItem('ce_id') || '' })
    });
  };

  global.popupBtnClicked = (attr, target) => {
    if(!global.showConfirm) copyFromTemp(global);
    if (attr === 'gs__close') {
      toggle(global);
      global.sendClose();
      return;
    }
    if (attr === 'gs__goollacart') {
      window.open('https://www.ollacart.com', '_blank');
      return;
    }
    if (attr === 'gs__confirm') {
      global.sendAPI();
      global.finish = true;
      global.picker.stop();
      showConfirm(global);
      setTimeout(() => { 
        global.finish = false;
        toggle(global);
        global.sendClose();
      }, 5000);
      return;
    }
    if (attr === 'gs__color') {
      copyToTemp(global);
      hideConfirm(global);
      global.selectMode = 'color';
      showColorModal(global);
      return;
    }
    if (attr === 'gs__togglecolor') {
      global.productInfo.chooseColor = !global.productInfo.chooseColor;
      showConfirm(global);
      return;
    }
    if (attr === 'gs__togglesize') {
      global.productInfo.chooseSize = !global.productInfo.chooseSize;
      showConfirm(global);
      return;
    }
    if (attr === 'gs__manual') {
      copyToTemp(global);
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
    if (idx >= global.items.length) return idx = global.items.length - 1;
    
    global.selectMode = global.items[idx];

    if (global.selectMode === 'photos') {
      global.productInfo.elements['temp_photo'] = null;
      global.productInfo.temp_photo = '';
    }
    showMessage(global);
  };
  
  global.selectElement = el => {
    if (!el) return;
    if (el.tagName.toLocaleLowerCase() === 'html') return;
    if (global.finish || !global.popup || global.confirm.contains(el)) return;
    if (global.popup.contains(el) || global.colormodal.contains(el)) {
      if(global.selectMode !== 'photos') copyFromTemp(global);
      return;
    }
    
    if (!global.selectMode) {
      global.productInfo = getProductInfo(el, global.picker);
    } else {
      getProductInfoIndividual(el, global.picker, global);
    }
    if (global.selectMode === 'color') showColorModal(global);
    else showMessage(global);
  };
  
  global.domPick = (el) => {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', el);
    if (!el) return ;
    if (el.tagName.toLocaleLowerCase() === 'html') return;
    if (!global.popup) return;
    if (global.popup.contains(el) || global.confirm.contains(el) || global.colormodal.contains(el)) {
      const attr = el.getAttribute('tag');
      const target = el.getAttribute('target') || '';
      if (attr && attr !== 'gs__text')
        global.popupBtnClicked(attr, target);
      return ;
    }
    
    clearClass('gs_copied');
    if (!global.selectMode) global.productInfo = getProductInfo(el, global.picker);
    addClass(global.productInfo.elements, 'gs_copied');
    
    if (global.selectMode) {
      if (global.selectMode === 'color') {
        copyToTemp(global);
        showColorModal(global);
        return;
      }
      let idx = global.items.indexOf(global.selectMode) + 1;
      if (global.selectMode === 'photos') {
        global.productInfo.elements['photo' + global.productInfo.photos.length] = global.productInfo.elements['temp_photo'];
        global.productInfo.photos.push(global.productInfo.temp_photo);
        idx --;
      }
      global.selectMode = global.items[idx];
      copyToTemp(global);

      showMessage(global);
      return ;
    }
    copyToTemp(global);
    showConfirm(global);
  };

  global.inputValueChanged = (e) => {
    const tag = e.target.getAttribute("tag");
    const target = e.target.getAttribute("target");
    if (tag === 'gs__text' || !target) {
      global.productInfo[target] = e.target.value;
      global.tempInfo[target] = e.target.value;
      console.log(global.productInfo);
    }
  };

  global.onMouseMove = (e) => {
    if(global.selectMode || global.showConfirm) {
      hideTooltip(global);
      return ;
    }
    global.tooltip.style.left = e.clientX + 'px';
    global.tooltip.style.top = e.clientY + 'px';
    showTooltip(global);
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
  // console.log('[Ollacart] Init', global);
  if (!global.init) {
    // console.log("[Ollacart Selector]: Started");
    init(global);

    global.sendClose = () => {
      chrome.runtime.sendMessage({type: "close"}, function(response) {
        // console.log(response);
      });  
    };

    chrome.runtime.sendMessage({type: "init"}, function(response) {
      // console.log(response);
    });
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        // console.log(request);
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
