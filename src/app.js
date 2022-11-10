import debounce from "lodash/debounce";
import { addStyle } from "./addStyle";
import { initMessage, showMessage, hideMessage } from "./info";

const API_URL = 'https://ollacart.herokuapp.com/api/'
// const API_URL2 = 'https://ollacart-website.herokuapp.com/api/'
const API_URL2 = 'http://localhost:5000/api/'
const clearEl = el => el && el.classList.remove("gs_hover");

export const toggle = global => {
  const state = !global.state;
  global.state = state;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElDebounce);
  document[action]("mousedown", global.domPick);

  if (!state) {
    clearEl(global.selectedEl);
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    hideMessage(global);
  }
};

export const init = global => {
  global.isInit = true;
  global.selectedEl = null;
  global.ce_id = '';
  
  global.clearElDebounce = debounce(
    () => clearEl(global.selectedEl) && hideMessage(global),
    200
    );
    
    global.selectElement = debounce(e => {
      if (global.selectedEl !== e.target) {
        clearEl(global.selectedEl);
      }
      global.selectedEl = e.target;
    const selectedEl = global.selectedEl;
    selectedEl.classList.add("gs_hover");
    
    const name = selectedEl.nodeName.toLowerCase();
    const id = selectedEl.id ? "#" + selectedEl.id : "";
    const className = selectedEl.className.replace
    ? selectedEl.className
    .replace("gs_hover", "")
    .trim()
    .replace(/ /gi, ".")
    : "";
    const message = name + id + (className.length > 0 ? "." + className : "");
    showMessage(global, message);
  }, 200);

  global.setCeID = id => {
    console.log('setCeID')
    global.ce_id = id;
    localStorage.setItem('CeID', id);
    console.log(id);
  }
  
  global.domPick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return;
    
    const { selectedEl } = global;
    if (!selectedEl) {
      return;
    }
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    clearEl(selectedEl);
    
    const imgTag = global.getImageTag(selectedEl);
    if (!imgTag) return ;
    // const imgData = global.getBase64Image(imgTag);
    // console.log("[DOM Picker]", imgData);
    
    
    fetch(API_URL + 'extension/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo: imgTag.src, url: location.href })
    });
    
    fetch(API_URL2 + 'product/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo: imgTag.src, url: location.href, name: 'Product' })
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

  global.getBase64Image = (img) => {
    debugger
    // Create an empty canvas element
    img.setAttribute('crossorigin', 'annoymous');
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL('image/png');

    img.removeAttribute('crossorigin');

    return dataURL;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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

  // addStyle(`
  //   .gs_hover {
  //     background: repeating-linear-gradient( 135deg, rgba(225, 225, 226, 0.3), rgba(229, 229, 229, 0.3) 10px, rgba(173, 173, 173, 0.3) 10px, rgba(172, 172, 172, 0.3) 20px );
  //     box-shadow: inset 0px 0px 0px 1px #d7d7d7;
  //   }

  //   .gs_copied {
  //     background: repeating-linear-gradient( 135deg, rgba(183, 240, 200, 0.3), rgba(192, 231, 194, 0.3) 10px, rgba(124, 189, 126, 0.3) 10px, rgba(137, 180, 129, 0.3) 20px ) !important;
  //     box-shadow: inset 0px 0px 0px 1px #c4d9c2 !important;      
  //   }
  // `);
  initMessage(global); 
};
