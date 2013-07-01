;(function () {

  var port = chrome.runtime.connect({ name: "gmail" });
  
  port.postMessage({
    type: "conversation",
    id: "123"
  });

}());