$(function() {
  var AppState = Parse.Object.extend("AppState");

  var AppView = Parse.View.extend({
    el: $("#meuchadebebe"),

    initialize: function() {
      this.render();
    },

    render: function() {
      new InviteView();
    }
  });

  var AppRouter = Parse.Router.extend({
    routes: {},

    initialize: function(options) {}
  });

  var state = new AppState;

  new AppRouter;
  new AppView;
  Parse.history.start();
});