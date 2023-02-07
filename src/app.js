import debounce from "lodash/debounce";
import { ElementPicker } from "./dom-pick";
import { addStyle } from "./addStyle";
import { findHref, getProductInfo, getProductInfoIndividual } from "./scrap";
import { initMessage, showMessage, showConfirm, showTooltip, hideMessage, hideConfirm, hideTooltip } from "./info";

const API_URL = 'https://ollacart.herokuapp.com/api/'
// const API_URL2 = 'http://localhost:5000/api/'
const API_URL2 = 'https://ollacart-dev.herokuapp.com/api/'

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
  }
  showMessage(global);
}

export const toggle = global => {
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

export const init = global => {
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
    // console.log('url', url);
    
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
  
  global.selectElement = el => {
    if (!el) return;
    if (el.tagName.toLocaleLowerCase() === 'html') return;
    if (global.finish || !global.popup || global.confirm.contains(el)) return;
    if (global.popup.contains(el)) {
      copyFromTemp(global);
      return;
    }
    
    if (!global.selectMode) {
      global.productInfo = getProductInfo(el, global.picker);
    } else {
      getProductInfoIndividual(el, global.picker, global);
    }
    showMessage(global);
  }
  
  global.domPick = (el) => {
    if (!el) return ;
    if (el.tagName.toLocaleLowerCase() === 'html') return;
    if (!global.popup) return;
    if (global.popup.contains(el) || global.confirm.contains(el)) {
      const attr = el.getAttribute('tag')
      const target = el.getAttribute('target') || '';
      if (attr && attr !== 'gs__text')
        global.popupBtnClicked(attr, target);
      return ;
    }
    
    clearClass('gs_copied');
    if (!global.selectMode) global.productInfo = getProductInfo(el, global.picker);
    addClass(global.productInfo.elements, 'gs_copied')
    copyToTemp(global);
    
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

  global.inputValueChanged = (e) => {
    const tag = e.target.getAttribute("tag");
    const target = e.target.getAttribute("target");
    if (tag === 'gs__text' || !target) {
      global.productInfo[target] = e.target.value;
      global.tempInfo[target] = e.target.value;
    }
  }

  global.onMouseMove = (e) => {
    if(global.selectMode || global.showConfirm) {
      hideTooltip(global);
      return ;
    }
    global.tooltip.style.left = e.clientX + 'px';
    global.tooltip.style.top = e.clientY + 'px';
    showTooltip(global);
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
