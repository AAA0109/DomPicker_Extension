const Constant = {
  title: ['title', 'name']
}

const checkIfSimilarProductContainer = el => {
  const area_limit = 80 * 80, txt_limit_ct = 2;
  var txt_ct = 0;
  const itms = el.getElementsByTagName('*');
  for (let i = 0; i < itms.length; i ++) {
    if (getText(itms[i])) txt_ct ++;
    if (txt_ct > txt_limit_ct) break;
  }
  if (txt_ct < txt_limit_ct) return false;

  const imgs = el.getElementsByTagName('img');
  for (let i = 0; i < imgs.length; i ++) {
    const img = imgs[i];
    const area = img.width * img.height;
    if (area < area_limit) continue;
    return true;
  }
  return false;  
}

const getProductRootElement = el => {
  if (checkIfSimilarProductContainer(el)) return el;
  let p = el.parentNode;
  while (p && p.tagName !== 'body') {
    if (checkIfSimilarProductContainer(p)) return p;
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

const checkIfBetterImg = (a, b) => {
  if (!isVisible(a)) return false;
  if (!isVisible(b)) return true;
  if (!a.src) return false;
  if (!b.src) return true;

  const offset = 2;
  const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
  const area1 = r1.width * r1.height, area2 = r2.width * r2.height;
  if (Math.abs(area1 - area2) < offset * offset) {
    if (Math.abs(r1.x - r2.x) < offset && Math.abs(r1.y - r2.y) < offset) return true;
  }
  if (area1 > area2) return true;
  return false;
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
        var txt = childNodes[i].textContent.replace(/\n/g, '');
        if (!txt) continue;
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

const getImgUrl = (el) => {
  if (!el) return '';
  if (el.tagName === 'img') return el.src;
  const imgs = el.getElementsByTagName('img')
  if (!imgs.length) return '';

  var ret = imgs[0];
  for (let i = 1; i < imgs.length; i ++) {
    if (checkIfBetterImg(imgs[i], ret)) ret = imgs[i];
  }
  return ret.src;
}

const getName = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterTitle(itms[i], ret, el)) ret = itms[i];
  }
  return getText(ret);
}

const getUrl = (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el) return '';
  return findHref(el);
}

export const getProductInfo = (el, e) => {
  const p = getProductRootElement(el);
  return {
    name: getName(p),
    img: getImgUrl(p),
    url: getUrl(e)
  }
}