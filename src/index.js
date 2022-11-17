import { init, toggle } from "./app";

!(() => {
  const global = window.__gs = window.__gs || {};
  console.log('[Ollacart] Init', global);
  if (!global.init) {
    console.log("[Ollacart Selector]: Started");
    init(global);

    global.sendClose = () => {
      chrome.runtime.sendMessage({type: "close"}, function(response) {
        console.log(response);
      });  
    }

    chrome.runtime.sendMessage({type: "init"}, function(response) {
      console.log(response);
    });
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(request);
        switch(request.type) {
          case 'get_state':
            sendResponse(global.state);
            break;
          case 'toggle_state':
            toggle(global);
            sendResponse(global.state);
          case 'ce_id':
            if (request.ce_id)
              localStorage.setItem('ce_id', request.ce_id);
        }
      }
    );
  }
})();