const Constant = {
  title: ['title', 'name'],
  price: ['price'],
  description: ['description', 'detail', 'info']
}

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
}

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
}

const checkIfListContainer = el => {
  const t = 0.9;
  let p = el.parentNode;
  while (p && p.parentNode) {
    const pp = p.parentNode;
    const chs = pp.children;
    const rets = [];
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
}

const getProductRootElement = el => {
  const check_list = checkIfListContainer(el);
  if (check_list) return check_list;
  if (checkIfSimilarProductContainer(el, [Constant.title])) return el;
  let p = el.parentNode;
  while (p && p.tagName.toLocaleLowerCase() !== 'body') {
    if (checkIfSimilarProductContainer(p, [Constant.title])) return p;
    p = p.parentNode;
  }
  return el;
}

const isVisible = el => {
  const style = window.getComputedStyle(el);
  if (style.opacity === '0') return false;
  if (style.visibility == 'hidden') return false;
  const r = el.getBoundingClientRect();
  if (r.width < 10 || r.height < 10) return false;
  return true;
}

const checkIfHasAttribute = (el, attr) => {
  const keys = el.attributes;
  for (let i = 0; i < keys.length; i ++) {
    const key = keys[i].name || '';
    const value = el.getAttribute(key) || '';
    if (key.toLocaleLowerCase().includes(attr) || value.toLocaleLowerCase().includes(attr)) return true;
  }
  return false;
}

const checkIfDescendOf = (ch, p, signs) => {
  while(ch && ch !== p) {
    for (let i = 0; i < signs.length; i ++)
      if (checkIfHasAttribute(ch, signs[i]))
        return true;
    ch = ch.parentNode;
  }
  return false;
}

const isHovered = (r, e) => {
  const x = e.x, y = e.y;
  if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) return true;
  return false;
}

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
}

const containsAnyLetters = str => {
  return /[a-zA-Z0-9]/.test(str);
}

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
}

const getFText = el => {
  if (!el) return '';
  return (el.innerText || el.textContent || '').replace(/\n\n/g, '\n');
}

const getEnteredText = el => {
  if (!el) return '';
  return (el.innerText || el.textContent || '').replace(/\n\n/g, '\n').replace(/\n/g, '\n• ');
}

const checkIfBetterTitle = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  if (txt1 && !txt2) return true;
  if (!txt1) return false;

  const des1 = checkIfDescendOf(a, p, Constant.title), des2 = checkIfDescendOf(b, p, Constant.title)
  if (des1 && !des2) return true;
  if (!des1 && des2) return false;

  const fontSize1 = parseFloat(window.getComputedStyle(a).fontSize) || 0,
    fontSize2 = parseFloat(window.getComputedStyle(b).fontSize) || 0;
  
  if (fontSize1 > fontSize2 * 1.2) return true;
  return false;
}

const getCurrencyNumber = (str) => {
  try {
    return parseFloat(str.replace(/[^0-9.]+/g,"")) || 0;
  } catch (ex) {
    return 0;
  }
}

const checkIfBetterPrice = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  const isPrice1 = checkIfPrice(txt1), isPrice2 = checkIfPrice(txt2);
  if (isPrice1 && !isPrice2) return true;
  if (!isPrice1) return false;
  
  const des1 = checkIfDescendOf(a, p, Constant.price), des2 = checkIfDescendOf(b, p, Constant.price)
  if (des1 && !des2) return true;
  if (!des1 && des2) return false;

  return false;
}

const checkIfBetterDescription = (a, b, p) => {
  const txt1 = getText(a), txt2 = getText(b);
  if (txt1 && !txt2) return true;
  if (!txt1) return false;

  // const des1 = checkIfDescendOf(a, p, Constant.description), des2 = checkIfDescendOf(b, p, Constant.description)
  // if (des1 && !des2) return true;
  // if (!des1 && des2) return false;
  
  if (txt1.length > txt2.length) return true;
  return false;
}

export const findHref = el => {
  var p = el;
  while(p && p.tagName.toLocaleLowerCase() !== 'body') {
    if ((p.tagName.toLocaleLowerCase() === 'a' || p.tagName.toLocaleLowerCase === 'button') && p.href) return p.href;
    p = p.parentNode;
  }
  return '';
}

const getImgUrl = (el, mouse, excepts = []) => {
  if (!el) return '';
  if (el.tagName.toLocaleLowerCase() === 'img') return el;
  const imgs = el.getElementsByTagName('img')
  if (!imgs.length) return '';

  var ret = imgs[0];
  for (let i = 1; i < imgs.length; i ++) {
    if (checkIfBetterImg(imgs[i], ret, mouse, excepts)) ret = imgs[i];
  }
  return ret;
}

const getManualImgUrl = (el, mouse) => {
  while(el.tagName !== 'body') {
    const img = getImgUrl(el, mouse);
    if (img) return img;
    el = el.parentNode;
  }
  return null;
}

const getName = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterTitle(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
}

const checkIfPrice = (p) => {
  if (!p) return false;
  let d = p.replace(/ |\n|,/g, '');
  d = d.replace('$', '');
  if (!d) return false;
  for (let i = 0; i < d.length; i ++) if (d[i] !== '.' && !(d[i] >= '0' && d[i] <= '9')) return false;
  return true;
}

const getPrice = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterPrice(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
}

const getDescriptin = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterDescription(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
}

const getPhotos = (el, mouse, photo) => {
  const ret = [photo];
  for (let i = 0; i < 4; i ++) {
    const img = getImgUrl(el, mouse, ret);
    if (ret.findIndex(itm => getSrcFromImgTag(itm).split('?')[0] === getSrcFromImgTag(img).split('?')[0]) > -1) break;
    ret.push(img);
  }
  ret.shift();
  return ret;
}

const getUrl = (el) => {
  if (!el) return '';
  return findHref(el);
}

const getSrcFromImgTag = (el) => {
  if (!el) return '';
  return (el.currentSrc || el.src || '').split(' ')[0]
}

export const getProductInfo = (el, picker) => {
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
  })
  return {
    name,
    img,
    url,
    description,
    price,
    photos,
    elements: { e_name, e_img, e_price, e_description, ...r_photos }
  }
}

export const getProductInfoIndividual = (el, picker, global) => {
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
      const e_img = getManualImgUrl(el, { x: picker.mouseX, y: picker.mouseY });
      const img = getSrcFromImgTag(e_img);
      productInfo.elements.e_img = e_img;
      productInfo.img = img;
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
      const idx = productInfo.photos.length - 1;
      const e_photo = getManualImgUrl(el, { x: picker.mouseX, y: picker.mouseY });
      const photo = (e_photo.currentSrc || e_photo.src || '').split(' ')[0];
      productInfo.elements['photo' + idx] = e_photo
      productInfo.photos[idx] = photo;
      break;
  }
}