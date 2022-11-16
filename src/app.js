import debounce from "lodash/debounce";
import { addStyle } from "./addStyle";
import { getProductInfo } from "./scrap";
import { initMessage, showMessage, hideMessage } from "./info";

const API_URL = 'https://ollacart.herokuapp.com/api/'
const API_URL2 = 'https://ollacart-website.herokuapp.com/api/'
// const API_URL2 = 'http://localhost:5000/api/'

const clearEl = el => el && el.classList.remove("gs_hover");

export const toggle = global => {
  const state = !global.state;
  global.state = state;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElDebounce);
  document[action]("mousedown", global.domPick);
  if (state) global.disableLinks()

  if (!state) {
    clearEl(global.selectedEl);
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    hideMessage(global);
  }
};

export const init = global => {
  global.init = true;
  global.state = false;
  global.selectedEl = null;
  
  global.clearElDebounce = debounce(() => clearEl(global.selectedEl) && hideMessage(global), 200);
  
  global.selectElement = debounce(e => {
    if (global.selectedEl !== e.target) {
      clearEl(global.selectedEl);
    }
    global.selectedEl = e.target;
    const selectedEl = global.selectedEl;
    selectedEl.classList.add("gs_hover");
    
    const message = "message";
    showMessage(global, message);
  }, 200);
  
  global.domPick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const { selectedEl } = global;
    if (!selectedEl) return;
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    clearEl(selectedEl);

    const productInfo = getProductInfo(selectedEl, e);
    console.log(productInfo);
    
    // const imgTag = global.getImageTag(selectedEl);
    // if (!imgTag) return ;    
    if (!productInfo.img || !productInfo.name) return;
    
    fetch(API_URL + 'extension/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo: productInfo.img, url: productInfo.url })
    });
    
    fetch(API_URL2 + 'product/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo: productInfo.img, url: productInfo.url, name: productInfo.name, ce_id: localStorage.getItem('ce_id') || '' })
    });
    
    global.copiedEl = selectedEl;
    global.copiedEl.classList.add("gs_copied");
  };

  global.getImageTag = (tag) => {
    if (!tag) return ;
    if (tag.tagName === 'img') return tag;
    const imgs = tag.getElementsByTagName('img')
    if (!imgs.length) return;
    return imgs[0];
  }

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
      border: 2px solid #cdcdcd !important;
      background: repeating-linear-gradient( 135deg, rgba(183, 240, 200, 0.3), rgba(192, 231, 194, 0.3) 10px, rgba(124, 189, 126, 0.3) 10px, rgba(137, 180, 129, 0.3) 20px ) !important;
      box-shadow: inset 0px 0px 0px 1px #c4d9c2 !important;      
    }
  `);
  initMessage(global); 
};
