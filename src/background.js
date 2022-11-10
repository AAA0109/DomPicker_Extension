const getState = tabId =>
  new Promise(resolve => {
    chrome.tabs.executeScript(
      tabId,
      {
        code: "window.__gs && window.__gs.state"
      },
      result => resolve(result && result[0])
    );
  });
const setCeID = (tabId, id) =>
  new Promise(resolve => {
    chrome.tabs.executeScript(
      tabId, { code: `window.__gs && window.__gs.setCeID("${id}")` },
      () => resolve()
    )
  })

const domPicker = tabId =>
  chrome.tabs.executeScript(tabId, {
    code: "window.__gs && window.__gs.domPick()"
  });

const updateIcon = isPressed =>
  chrome.browserAction.setIcon({
    path: `icon_128${isPressed ? "_pressed" : ""}.png`
  });

!(() => {
  // const MENU_ID = "DOMPICKER";

  // let isMenuAdded = false;
  let selectedTabId = null;

  const toggle = async () => {
    const state = await getState(selectedTabId);
    updateIcon(state);

    chrome.storage.local.get(["ce_id"], async function(result){
      if (checkCeID(result.ce_id)) return saveCeID(result.ce_id);
      
      chrome.storage.local.set({ce_id: "ce_id11"}, async function(result){
        await setCeID(selectedTabId, "set_ce_id" + result);
      });
    });
  
    // if (state) {
    //   chrome.contextMenus.create({
    //     id: MENU_ID,
    //     title: "DOM Picker",
    //     contexts: ["all"],
    //     documentUrlPatterns: ["*://*/*"],
    //     onclick: e => {
    //       if (e.menuItemId !== MENU_ID) {
    //         return;
    //       }
    //       domPicker(selectedTabId);
    //     }
    //   }); 
    //   isMenuAdded = true; 
    // } else if (isMenuAdded) {
    //   chrome.contextMenus.remove(MENU_ID);
    // }
  }  

  chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.executeScript(
      tab.ib,
      {
        file: "inject.js"
      },
      async () => {
        selectedTabId = tab.id;
        toggle();
      }
    );
  });

  chrome.tabs.onActivated.addListener(async tab => {
    selectedTabId = tab.id;
    toggle();
  });

  chrome.tabs.onUpdated.addListener(async tab => {
    selectedTabId = tab.id;
    toggle();
  });

})();
