import { addStyle } from "./addStyle";

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
}

export const showMessage = (global) => {
  const info = global.productInfo;
  let html = '<div class="gs_message_content">';
  if (!global.selectMode || global.selectMode === 'img') html += `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  if (!global.selectMode) {
    html += `<div class="gs_name_price"><span>${info.name}</span><span>${info.price || ''}</span></div>`;
  }
  if (!global.selectMode) html += `<div class="gs_description">${info.description}</div>`
  if (global.selectMode === 'name' || global.selectMode === 'price' || global.selectMode === 'description') {
    html += `<textarea class="gs_textarea" tag="gs__text" target="${global.selectMode}">${info[global.selectMode]}</textarea>`
  }
  if (!global.selectMode || global.selectMode === 'photos') {
    html += `<div class="gs_addtional_photos">`
    for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
      if (info.photos[i])
      html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
    }
    html += `</div>`
  }
  if (global.selectMode === 'photos' && info.temp_photo) {
    html += `<div class="gs_ollacart_img"><img src="${info.temp_photo}"/></div>`;
  }

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <div class="gs_btn gs_direct" tag="gs__prev"><</div>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <div class="gs_btn gs_direct" tag="gs__next">></div>
      </div>`
  }
  html += `</div>`;
  
  if (global.selectMode) {
    html += `<div class="gs_message_over">Select ${manualSelect[global.selectMode]}</div>`
  } else {
    html += `<div class="gs_message_over">Auto Select</div>`;
  }
  
  global.popup.innerHTML = html;
  global.popup.classList.toggle("gs_show", true);
};

export const showColorModal = (global) => {
  const info = global.productInfo;
  let html = '<div class="gs_message_content">';
  html += `<div class="gs_ollacart_img"><img src="${info.color}" /></div>`;

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <span></span>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <span></span>
      </div>`
  }
  html += `</div>`;
  
  html += `<div class="gs_message_over">Specify Color</div>`
  
  global.colormodal.innerHTML = html;
  global.colormodal.classList.toggle("gs_show", true);
};

export const showConfirm = global => {
  hideMessage(global);
  hideColorModal(global);
  hideTooltip(global);

  const info = global.productInfo;
  let html = `<div class="gs_confirm"><div class="gs_close"><img tag="gs__close" src="https://i.postimg.cc/Wb3vQQxW/close-icon.png" alt="close"/></div><div class="gs_confirm_content">`
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
  if (info.description) html += `<div class="gs_description">${info.description}</div>`
  for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
    if (i === 0) html += `<div class="gs_addtional_photos">`
    if (info.photos[i])
    html += `<div><img src="${info.photos[i]}"/><div class="gs_remove_photo"><div class="gs_remove_btn" tag="gs__remove" target="${i}">-</div></div></div>`;
    if (i === info.photos.length - 1) html += `</div>`
  }
  
  html += `<div class="gs_confirm_tools">
            <div class="gs_btn" tag="gs__confirm">Looks Correct</div>
            <div class="gs_btn" tag="gs__manual">Manual Select</div>
          </div>`

  html += '</div></div>';
  // html += `<div class="gs_message_over">You selected item</div>`;
  html += `</div>`

  if (global.finish) html += `<div class="gs_message_finish" tag="gs__goollacart">Added to OllaCart</div>`;

  global.confirm.innerHTML = html;
  global.confirm.classList.toggle("gs_show", true);
  global.showConfirm = true;

  if (global.finish) global.confirm.classList.toggle("gs_hide", true);
  else global.confirm.classList.toggle("gs_hide", false);
}

export const showTooltip = global => {
  global.tooltip.classList.toggle("gs_show", true);
}

export const hideTooltip = global => {
  global.tooltip.classList.toggle("gs_show", false);
};

export const hideMessage = global => {
  global.popup.classList.toggle("gs_show", false);
};

export const hideColorModal = global => {
  global.colormodal.classList.toggle("gs_show", false);
}

export const hideConfirm = global => {
  global.confirm.classList.toggle("gs_show", false);
  global.showConfirm = false;
}

export const initMessage = global => {
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
