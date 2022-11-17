const updateIcon = async isPressed => {
  await chrome.action.setIcon({ path: `icon_128${isPressed ? "_pressed" : ""}.png` });
}

const sendMessage = data => {
  return new Promise(resolve => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length === 0) resolve();
      chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
        resolve(response);
      });
    });
  });
}

const generateCeID = () => {
  return Date.now() + '_' + parseInt(Math.random() * 10000) + '_' + parseInt(Math.random() * 10000);
}

const getCeID = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(["ce_id"], async function(result){
      if (result.ce_id && result.ce_id.length > 10) return resolve(result.ce_id);      
      const ce_id = generateCeID();
      chrome.storage.local.set({ ce_id }, async function(result){
        resolve(ce_id)
      });
    });
  });
}

const getCurrentState = async () => {
  return await sendMessage({ type: 'get_state' });
}

const toggleState = async () => {
  return await sendMessage({ type: 'toggle_state' });
}

const currentTabChanged = async () => {
  await updateIcon(await getCurrentState());
  const ce_id = await getCeID();
  await sendMessage({ type: 'ce_id', ce_id });
}

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    await currentTabChanged();
  }
});

chrome.tabs.onActivated.addListener(async tab => {
  await currentTabChanged();
});

chrome.runtime.onInstalled.addListener(async ({ reason, version }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const state = await toggleState();
  await updateIcon(state);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) { //sender.tab
    switch(request.type) {
      case 'init':
        sendResponse({ init: "great" });
        break;
    }
  }
);

