$(function() {

  Parse.$ = jQuery;

  Parse.initialize("iD91Kruwny1uP1UNRCspAGNHSLHINUkEGuhe2N6E",
   "jcCjFbysCwxymP6dfpBC4QE2ch75S3Y7xwevEvHo");

  function loadScript(url, callback){
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var mainCode = function() {

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
};

  loadScript("js/models/evento.js", mainCode);
  loadScript("js/models/convite.js", mainCode);
  loadScript("js/models/presente.js", mainCode);

  loadScript("js/views/moms_module/login_view.js", mainCode);
  loadScript("js/views/moms_module/menu_view.js", mainCode);
  loadScript("js/views/moms_module/moms_view.js", mainCode);
  loadScript("js/views/moms_module/invite_view.js", mainCode);
  loadScript("js/views/moms_module/present_view.js", mainCode);
  
});