import debounce from "lodash/debounce";
import { addStyle } from "./addStyle";
import { findHref, getProductInfo, getProductInfoIndividual } from "./scrap";
import { initMessage, showMessage, showConfirm, hideMessage, hideConfirm } from "./info";

const API_URL = 'https://ollacart.herokuapp.com/api/'
// const API_URL2 = 'http://localhost:5000/api/'
const API_URL2 = 'https://ollacart-dev.herokuapp.com/api/'

const clearEl = el => el && el.classList.remove("gs_hover");
const clearClass = (cl) => {
  const itms = document.getElementsByClassName(cl);
  for (let i = itms.length - 1 ; i >= 0; i --) itms[i].classList.remove(cl);
}
const addClass = (obj, cl) => {
  const itms = Object.keys(obj).map(key => obj[key]);
  for (let i = 0 ; i < itms.length; i ++) {
    if (!itms[i]) continue;
    itms[i].classList.add(cl);
  }
}

const copyToTemp = (global) => {
  global.tempInfo = {
    ...global.productInfo,
    elements: {...(global.productInfo.elements || {})},
    photos: [...(global.productInfo.photos || [])]
  }
}
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
  }
  showMessage(global);
}

export const toggle = global => {
  const state = !global.state;
  global.state = state;
  global.selectMode = null;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElDebounce);
  document[action]("mousedown", global.domPick);
  if (state) global.disableLinks()

  if (!state) {
    clearEl(global.selectedEl);
    clearClass('gs_copied');
    hideMessage(global);
    hideConfirm(global);
  }
};

export const init = global => {
  global.init = true;
  global.state = false;
  global.selectedEl = null;
  global.selectMode = null;
  global.productInfo = {};
  global.tempInfo = {};
  global.items = ['img', 'name', 'price', 'description', 'photos'];
  
  global.clearElDebounce = debounce(() => clearEl(global.selectedEl) && hideMessage(global), 200);

  global.sendAPI = () => {
    const productInfo = global.productInfo;
    if (!productInfo.img || !productInfo.name) return;

    const { name, price, description, photos } = productInfo;
    const photo = productInfo.img;
    const url = productInfo.url || findHref(productInfo.elements.e_img) || findHref(productInfo.elements.e_name) || location.href;
    console.log('url', url);
    
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
  }

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
      }, 6000);
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
        global.productInfo.photos[i] = global.productInfo.photos[i + 1]
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
  }
  
  global.selectElement = debounce(e => {
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
      const attr = e.target.getAttribute('tag')
      const target = e.target.getAttribute('target') || ''
      if (attr)
        global.popupBtnClicked(attr, target);
      return ;
    }
    
    const { selectedEl } = global;
    if (!selectedEl) return;
    
    clearClass('gs_copied');
    if (!global.selectMode) global.productInfo = getProductInfo(selectedEl, e);
    addClass(global.productInfo.elements, 'gs_copied')
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
  }

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
  }

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
