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
`;

export const showMessage = (global, info) => {
  let html = '';
  console.log(info);
  if(info.img && info.name) {
    html = `<div class="gs_ollacart_img"><img src="${info.img}" /></div><div>${info.name}</div>`
  }
  html += `<p>Go to <a href="https://www.ollacart.com" target="_blank">OllaCart</a></p>`;
  console.log(html);
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
