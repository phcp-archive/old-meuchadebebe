$(function() {
  Parse.$ = jQuery;

  Parse.initialize("iD91Kruwny1uP1UNRCspAGNHSLHINUkEGuhe2N6E",
   "jcCjFbysCwxymP6dfpBC4QE2ch75S3Y7xwevEvHo");

  var AppState = Parse.Object.extend("AppState");

  var AppView = Parse.View.extend({
    el: $("#meuchadebebe"),

    initialize: function() {
      this.render();
    },

    render: function() {
      console.log($.getUrlVar("notif_t"));
      if ($.getUrlVar("notif_t")) {
        window.location.replace("convite.html");
      }
      else if (Parse.User.current()) {
        new MenuView();
        new MomsView();
      }
      else {
        new LogInView();
      }
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