;(function () {

  // fake backbone-amd dep
  define("jquery", [], function () { return undefined; });

  // requirejs configs
  requirejs.config({
    baseUrl: "components",
    paths: {
      "underscore": "underscore-amd/underscore",
      "backbone": "backbone-amd/backbone",
      "conversation": "../js/conversation",
      "bigint": "otr/build/dep/bigint",
      "crypto": "otr/build/dep/crypto",
      "eventemitter": "otr/build/dep/eventemitter",
      "salsa20": "otr/build/dep/salsa20",
      "otr": "otr/build/otr"
    }
  });

  // load deps
  requirejs([
    "otr",
    "backbone",
    "conversation"
  ], function (otr, Backbone, Conversations) {

    // some setup

    Backbone.sync = function () {
      console.log(arguments)
      return false;
    };

    var myKey = new otr.DSA();

    // service model

    var Service = Backbone.Model.extend({
      initialize: function () {
        this.conversations = new Conversations()
      },
      addConversation: function (serviceId, otrKey) {
        this.conversations.create({
          serviceId: serviceId,
          otrKey: otrKey
        });
      }
    });

    // events handlers

    function gmailHandler(msg) {
      switch (msg.type) {
        case "conversation": {
          service.addConversation(msg.id, myKey);
          break;
        }
        default: {
          // throw it on the floor
        }
      }
    }

    function msgHandler(msg) {
      switch (msg.type) {
        case "conversation": {
          service.addConversation(msg.id, myKey);
          break;
        }
        default: {
          // throw it on the floor
        }
      }
    }

    // run

    // chrome.runtime.onConnect.addListener(function (port) {
    //   switch (port.name) {
    //     case "gmail": {
    //       window.service = new Service({ name: port.name });
    //       port.onMessage.addListener(gmailHandler.bind(port));
    //       break;
    //     }
    //     case "msg": {
    //       port.onMessage.addListener(msgHandler.bind(port));
    //       break;
    //     }
    //     default: {
    //       console.error("Saw a connection from: " + port.name);
    //     }
    //   }
    // });

  });

}());