define(["backbone"], function (Backbone) {

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

  var Conversations = Backbone.Collection.extend({
    model: Conversation
  });

  return Conversations;

});