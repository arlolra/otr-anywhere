;(function () {

  // fake backbone-amd dep
  define("jquery", [], function () { return undefined; });

  // requirejs configs
  requirejs.config({
    baseUrl: "components",
    paths: {
      "underscore": "underscore-amd/underscore"
    }
  });

  // load deps
  requirejs([
    "otr/build/otr",
    "backbone-amd/backbone"
  ], function (otr, Backbone) {

    // some setup

    Backbone.sync = function () {
      return false;
    }
    
    var myKey = new otr.DSA();

    // models

    var Conversation = Backbone.Model.extend({
      defaults: {
        otrOptions: {
          debug: false,
          fragment_size: 140,
          send_interval: 200
        }
      },
      initialize: function () {
        if (this.has("otrKey")) {
          this.get("otrOptions").priv = this.get("otrKey");
          this.unset("otrKey");
        }
        this.set("otr", new otr.OTR(this.get("otrOptions")));
        this.get("otr").REQUIRE_ENCRYPTION = true;
        this.unset("otrOptions");
      },
      clear: function () {
        this.destroy();
      }
    });

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

    // collections

    var Conversations = Backbone.Collection.extend({
      model: Conversation
    });

    // run

    chrome.runtime.onConnect.addListener(function (port) {

      console.assert(port.name == "gmail");
      window.service = new Service({ name: port.name });
      
      port.onMessage.addListener(function (msg) {
        switch (msg.type) {
          
          case "conversation": {
            service.addConversation(msg.id, myKey);
          }
          
          default: {
            // throw it on the floor
          }

        }
      });

    });

  });

}());