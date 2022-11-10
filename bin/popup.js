console.log('few');
// document.onready(() => {
  chrome.storage.local.get(["ce_id"], function(result){
    console.log(result.ce_id);
  });
  chrome.storage.local.set({ce_id: "ce_id11"}, function(result){
    console.log("success", result);
  });
// })