$(function() {
  var MenuView = Parse.View.extend({
    events: {
      "click #inicio": "principal",
      "click #editar-evento": "editarEvento",
      "click #convidar": "convidar",
      "click #logout": "logOut",
    },

    el: "#side-menu",

    initialize: function() {
      this.render();
    },

    principal: function(e) {
      new MomsView();
      this.undelegateEvents();
    },

    editarEvento: function(e) {
      new EventView();
      this.undelegateEvents();
    },

    convidar: function(e) {
      new InviteView();
      this.undelegateEvents();
    },

    listaPresentes: function(e) {
      new GiftsView();
      this.undelegateEvents();
    },

    logOut: function(e) {
      $("#content").html("");
      this.$el.html("");
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
    },

    render: function() {
      this.$el.html(_.template($("#menu-template").html()));
      this.delegateEvents();
    }
  });
});