;(function () {

  var conversations = document.getElementById("conversations");

  // connect to anywhere.js

  var port = chrome.runtime.connect({ name: "popup" });
  
  port.postMessage({
    type: "conversation",
    id: "123"
  });

}());