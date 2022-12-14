import { addStyle } from "./addStyle";

const STYLES = `
  .gs_message {
      position: fixed;
      left: 10px;
      bottom: 10px;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
      padding: 8px 10px;
      display: none;
      background-color: #fff !important;
      border: 4px solid #eee;
      z-index: 999999;
      width: 300px;
  }

  .gs_message.gs_show {
      display: inline-block;
  }
  .gs_ollacart_img img {
    width: 100%;
    max-height: 300px;
  }
  .gs_name_price {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 16px;
    color: black;
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
    left: 0;
    top: 0;
    top: 0;
    bottom: 0;
    background-color: orangered;
    opacity: 0.4;
  }
  .gs_message_finish {
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
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .gs_btn {
    padding: 4px 10px;
    background-color: orangered;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
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
  let html = `<div class="gs_ollacart_img"><img src="${info.img}" /></div>`;
  html += `<div class="gs_name_price"><span>${info.name}</span><span>${info.price || ''}</span></div>`;
  if (info.description) html += `<div class="gs_description">${info.description}</div>`
  for (let i = 0; info.photos && (i < info.photos.length); i ++ ) {
    if (i === 0) html += `<div class="gs_addtional_photos">`
    if (info.photos[i])
    html += `<div><img src="${info.photos[i]}"/></div>`;
    if (i === info.photos.length - 1) html += `</div>`
  }
  
  html += `<p>Go to <a href="https://www.ollacart.com" target="_blank">OllaCart</a></p>`;

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

  if (global.finish) html += `<div class="gs_message_mask"></div>`;
  if (global.finish) html += `<div class="gs_message_finish">Added to OllaCart</div>`;
  
  global.popup.innerHTML = html;
  global.popup.classList.toggle("gs_show", true);
};

export const hideMessage = global => {
  global.popup.classList.toggle("gs_show", false);
};

export const initMessage = global => {
  addStyle(STYLES);
  global.popup = document.createElement("div");
  global.popup.className = "gs_message";
  document.body.appendChild(global.popup);
};
