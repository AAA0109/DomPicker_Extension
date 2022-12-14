const Constant = {
  title: ['title', 'name']
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
  console.log('checkList', check_list);
  if (check_list) return check_list;
  if (checkIfSimilarProductContainer(el, [Constant.title])) return el;
  let p = el.parentNode;
  while (p && p.tagName !== 'body') {
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
  const x = e.clientX, y = e.clientY;
  if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) return true;
  return false;
}

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
}

const containsAnyLetters = str => {
  return /[a-zA-Z]/.test(str);
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
    if (hasText) return (el.innerText || e.textContent).replace(/\n/g, '');
    return ''
  } catch (e) {
    return '';
  }
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
  
  if (fontSize1 > fontSize2) return true;
  return false;
}

const findHref = el => {
  var p = el;
  while(p && p.tagName !== 'body') {
    if ((p.tagName === 'a' || p.tagName === 'button') && p.href) return p.href;
    p = p.parentNode;
  }
  return location.href;
}

const getImgUrl = (el, e) => {
  if (!el) return '';
  if (el.tagName === 'img') return el;
  const imgs = el.getElementsByTagName('img')
  if (!imgs.length) return '';

  var ret = imgs[0];
  for (let i = 1; i < imgs.length; i ++) {
    if (checkIfBetterImg(imgs[i], ret, e)) ret = imgs[i];
  }
  return ret;
}

const getName = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterTitle(itms[i], ret, el)) ret = itms[i];
  }
  return ret;
}

const getUrl = (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el) return '';
  return findHref(el);
}

export const getProductInfo = (el, e) => {
  const p = getProductRootElement(el);

  const e_name = getName(p);
  const e_img = getImgUrl(p, e);
  const name = getText(e_name);
  const img = (e_img.currentSrc || e_img.src || '').split(' ')[0];
  const url = getUrl(e);
  return {
    name,
    img,
    url,
    description: '',
    price: '',
    elements: { e_name, e_img }
  }
}

export const getProductInfoIndividual = (el, e, global) => {
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
      const e_img = getImgUrl(el, e);
      const img = (e_img.currentSrc || e_img.src || '').split(' ')[0];
      productInfo.elements.e_img = e_img;
      productInfo.img = img;
      break;
    case 'name':
      productInfo.elements.e_name = el;
      productInfo.name = getText(el);
      break;
    case 'description':
      productInfo.elements.e_description = el;
      productInfo.description = getText(el);
      break;
    case 'price':
      productInfo.elements.e_price = el;
      productInfo.price = getText(el);
      break;
    case 'photos':
      const idx = productInfo.photos.length - 1;
      const e_photo = getImgUrl(el, e);
      const photo = (e_photo.currentSrc || e_photo.src || '').split(' ')[0];
      productInfo.elements['photo' + idx] = e_photo
      productInfo.photos[idx] = photo;
      break;
  }
}