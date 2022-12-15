import { addStyle } from "./addStyle";

const STYLES = `
  .gs_confirm_container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #ff450040;
    z-index: 99999999;
    display: none;
  }
  .gs_confirm_container.gs_hide {
    opacity: 0;
    transition: opacity 3s;
    transition-delay: 1s;
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
    top: 100px;
    width: 700px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
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
    z-index: 9999999;
    width: 300px;
    min-height: 250px;
    flex-direction: column;
  }

  .gs_message.gs_show { display: flex; }
  .gs_confirm_container.gs_show {
    display: inline-block;
  }
  .gs_ollacart_img img {
    width: 100%;
    max-height: 300px;
  }
  .gs_confirm .gs_ollacart_img {
    width: 300px;
  }
  .gs_name_price {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 16px;
    color: black;
  }
  .gs_confirm .gs_name_price {
    font-size: 20px;
    font-weight: bold;
    color: #303030;
  }
  .gs_description {
    font-size: 14px;
    margin-top: 10px;
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
    top: 35%;
    padding: 20px 0;
  }
  .gs_addtional_photos {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .gs_addtional_photos div {
    width: 46px;
    height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
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
`;

const manualSelect = {
  img: 'Logo Image',
  name: 'Title',
  price: 'Price',
  description: 'Description',
  photos: 'Images'
}

export const showMessage = (global) => {
  const info = global.productInfo;
  console.log(info);
  let html = '';
  if (!global.selectMode || global.selectMode === 'img') html += `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  if (!global.selectMode || global.selectMode === 'name' || global.selectMode === 'price') {
    html += `<div class="gs_name_price">`;
    if (!global.selectMode || global.selectMode === 'name') html += `<span>${info.name}</span>`;
    if (!global.selectMode || global.selectMode === 'price') html += `<span>${info.price || ''}</span>`
    html += `</div>`;
  }
  if (!global.selectMode || global.selectMode === 'description') html += `<div class="gs_description">${info.description}</div>`
  if (!global.selectMode || global.selectMode === 'photos') {
    for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
      if (i === 0) html += `<div class="gs_addtional_photos">`
      if (info.photos[i])
      html += `<div><img src="${info.photos[i]}"/></div>`;
      if (i === info.photos.length - 1) html += `</div>`
    }
  }

  if (global.selectMode) {
    html += `<div class="gs_manual_select_tools">
        <div class="gs_btn gs_direct" tag="gs__prev"><</div>
        <div class="gs_btn" tag="gs__finish">Finish</div>
        <div class="gs_btn gs_direct" tag="gs__next">></div>
      </div>`
  }
  
  if (global.selectMode) {
    html += `<div class="gs_message_over">Select Manual ${manualSelect[global.selectMode]}</div>`
  } else {
    html += `<div class="gs_message_over">Auto Select</div>`;
  }
  
  global.popup.innerHTML = html;
  global.popup.classList.toggle("gs_show", true);
};

export const showConfirm = global => {
  hideMessage(global);

  const info = global.productInfo;
  console.log(info);
  let html = `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  html += `<div class="gs_confirm_right"><div class="gs_name_price"><span>${info.name}</span><span>${info.price || ''}</span></div>`;
  if (info.description) html += `<div class="gs_description">${info.description}</div>`
  for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
    if (i === 0) html += `<div class="gs_addtional_photos">`
    if (info.photos[i])
    html += `<div><img src="${info.photos[i]}"/></div>`;
    if (i === info.photos.length - 1) html += `</div>`
  }
  
  html += `<p class="gs_text_center">Go to <a href="https://www.ollacart.com" target="_blank">OllaCart</a></p>`;
  html += `<div class="gs_confirm_tools">
            <div class="gs_btn" tag="gs__confirm">Looks Correct</div>
            <div class="gs_btn" tag="gs__manual">Manual Select</div>
          </div>`

  html += '</div>';
  html += `<div class="gs_message_over">You selected item</div>`;

  if (global.finish) html += `<div class="gs_message_mask"><div class="gs_message_finish">Added to OllaCart</div></div>`;

  global.confirm.innerHTML = `<div class="gs_confirm">${html}</div>`;
  global.confirm.classList.toggle("gs_show", true);

  if (global.finish) global.confirm.classList.toggle("gs_hide", true);
  else global.confirm.classList.toggle("gs_hide", false);
}

export const hideMessage = global => {
  global.popup.classList.toggle("gs_show", false);
};

export const hideConfirm = global => {
  global.confirm.classList.toggle("gs_show", false);
}

export const initMessage = global => {
  addStyle(STYLES);
  global.popup = document.createElement("div");
  global.popup.className = "gs_message";
  document.body.appendChild(global.popup);

  global.confirm = document.createElement("div");
  global.confirm.className = "gs_confirm_container";
  document.body.appendChild(global.confirm);
};
