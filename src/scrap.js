
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
  if (el.style.opacity === '0') return false;
  if (el.style.visibility == 'hidden') return false;
  return true;
}

const checkIfBetterImg = (a, b) => {
  if (!isVisible(b)) return false;
  if (!isVisible(a)) return true;
  if (!b.src) return false;
  if (!a.src) return true;

  const offset = 2;
  const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
  const area1 = r1.width * r1.height, area2 = r2.width * r2.height;
  if (Math.abs(area1 - area2) < offset * offset) {
    if (Math.abs(r1.x - r2.x) < offset && Math.abs(r1.y - r2.y) < offset) return true;
  }
  if (area1 > area2) return false;
  return true;
}

const getText = el => {
  if (!el) return '';
  if (['noscript', 'img'].indexOf(el.nodeName.toLocaleLowerCase()) > -1) return '';
  try {
    const childNodes = el.childNodes;
    var hasText = false;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeType === Node.TEXT_NODE) {
        hasText = true;
        break;
      }
    }
    if (hasText) return el.innerText || e.textContent;
    return ''
  } catch (e) {
    return '';
  }
}

const checkIfBetterTitle = (a, b) => {
  const txt1 = getText(a), txt2 = getText(b);
  if (txt1 && !txt2) return true;
  if (!txt1) return false;

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
    if (checkIfBetterImg(ret, imgs[i])) ret = imgs[i];
  }
  return ret.src;
}

const getName = (el) => {
  const itms = el.getElementsByTagName("*");
  var ret = itms[0];
  for (let i = 1; i < itms.length; i ++) {
    if (checkIfBetterTitle(itms[i], ret)) ret = itms[i];
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