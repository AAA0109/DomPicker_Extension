import { addStyle } from "./addStyle";

const STYLES = `
  .gs_confirm_container, .gs_message, .gs_tooltip {
    box-sizing: border-box !important;
  }
  .gs_confirm_container *, .gs_message *, .gs_tooltip * {
    color: black;
    box-sizing: border-box !important;
    font-size: 16px;
    appearance: unset;
    position: unset;
    margin: unset;
    width: unset;
    height: unset;
    opacity: unset;
    visibility: unset;
  }
  .gs_confirm_container input, .gs_message input {
    border: 1px solid black !important;
  }
  .gs_hidden { visibility: hidden; }
  .gs_d-none { display: none !important; }
  .gs_tooltip {
    position: fixed;
    z-index: 99999999999999;
    max-width: 500px;
    width: 80%;
    pointer-events: none;
    display: none;
    
    background-color: #ffa778;
    padding: 5px 10px;
    box-shadow: 1px 1px 5px 2px #260101;
    line-height: 16px;
    font-size: 16px;
    color: black;
  }
  .gs_tooltip.gs_show {
    display: block;
  }
  .gs_confirm_container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #ff450040;
    z-index: 9999999999999;
    display: none;
  }
  .gs_confirm_container.gs_hide {
    opacity: 0;
    transition: opacity 2s;
    transition-delay: 4s;
  }
  .gs_message, .gs_confirm {
    position: fixed;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    padding: 30px 10px 8px;
    background-color: #fff !important;
    border: 4px solid #eee;
  }
  .gs_confirm {
    left: calc(50vw - 350px);
    top: 80px;
  }
  .gs_hide .gs_confirm {
    display: none;
  }
  .gs_confirm_content {
    width: 730px;
    max-width: 100%;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  @media screen and (max-width: 768px) {
    .gs_confirm {
      width: 290px;
      left: calc(50vw - 150px);
    }
  }
  .gs_message {
    display: none;
    left: 10px;
    bottom: 10px;
    z-index: 999999999999;
    width: 300px;
  }
  .gs_message_content {
    display: flex;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    min-height: 250px;
    flex-direction: column;
  }

  .gs_confirm_container.gs_show, .gs_message.gs_show {
    display: inline-block;
  }
  .gs_ollacart_img img {
    width: 100%;
  }
  .gs_confirm .gs_ollacart_img {
    width: 350px;
    /* position: sticky; */
    /* top: 0; */
  }
  .gs_name_price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: black;
    gap: 10px;
  }
  .gs_confirm .gs_name_price {
    font-size: 20px;
    font-weight: bold;
    color: #303030;
  }
  .gs_confirm .gs_price {
    color: #004400;
  }
  .gs_description {
    font-size: 14px;
    margin-top: 10px;
    white-space: break-spaces;
  }
  .gs_message_over, .gs_message_finish {
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    background-color: orangered;
    color: white;
    text-align: center;
    padding: 8px 0;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
  }
  .gs_message_mask {
    position: absolute;
    left: -4px;
    right: -4px;
    top: -4px;
    bottom: -4px;
    background-color: #ff450040;
  }
  .gs_message_finish {
    font-size: 30px;
    top: calc(50% - 100px);
    padding: 50px 0;
  }
  .gs_addtional_photos {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gs_addtional_photos>div {
    position: relative;
    width: 46px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
  }
  .gs_addtional_photos .gs_remove_photo {
    transform: translateY(100%);
    opacity: 0;
    transition: all .3s;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000A0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gs_addtional_photos>div:hover .gs_remove_photo {
    transform: translateY(0);
    opacity: 1;
  }
  .gs_addtional_photos .gs_remove_photo .gs_remove_btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    background-color: rgb(200, 200, 200);
    color: black;
  }
  .gs_addtional_photos img {
    width: 100%;
  }

  .gs_manual_select_tools {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 10px;
  }
  .gs_confirm_tools {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
    margin-top: 10px;
  }
  .gs_btn {
    padding: 4px 10px;
    background-color: orangered;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 7px;
  }
  .gs_btn:hover {
    opacity: 0.8;
  }
  .gs_btn:active {
    opacity: 0.7;
  }
  .gs_btn.gs_direct {
    padding: 4px 14px;
  }

  .gs_confirm_right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 1px;
  }
  .gs_text_center {
    text-align: center;
  }
  .gs_go_ollacart {
    margin-top: 20px;
    font-size: 20px;
    line-height: 25px;
    cursor: pointer;
    color: lightseagreen;
  }
  .gs_textarea {
    width: 100%;
    height: 300px;
    min-height: 300px;
    max-height: 300px;
    font-size: 16px;
  }

  .gs_close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  .gs_close:hover {
    opacity: 0.8;
  }
  .gs_close img {
    width: 20px;
  }

  .gs_addtional_picker {
    margin-top: 15px;
    margin-left: auto;
  }
  .gs_addtional_picker>div {
    width: 200px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gs_addtional_picker>div>*:nth-child(2) {
    width: 70px;
  }
  .gs_addtional_picker .gs_color-img {
    aspect-ratio: 1;
    text-align: center;
    border: 1px solid orangered;
    object-fit: contain;
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
  }
  .gs_addtional_picker .gs_color-img:hover {
    opacity: 0.8;
  }

  .gs_confirm_content::-webkit-scrollbar, .gs_message_content::-webkit-scrollbar {
    width: 7px;
  }
  .gs_confirm_content::-webkit-scrollbar-track, .gs_message_content::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  .gs_confirm_content::-webkit-scrollbar-thumb, .gs_message_content::-webkit-scrollbar-thumb {
    background: #e19b9b; 
  }
  .gs_confirm_content::-webkit-scrollbar-thumb:hover, .gs_message_content::-webkit-scrollbar-thumb:hover {
    background: #e19b9bd0; 
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
              <div><input type="checkbox" ${info.chooseSize ? 'checked' : ''} tag="gs__togglesize" /> Size notes</div>
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
