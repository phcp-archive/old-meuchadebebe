$(function() {

  Parse.$ = jQuery;

  Parse.initialize("iD91Kruwny1uP1UNRCspAGNHSLHINUkEGuhe2N6E",
   "jcCjFbysCwxymP6dfpBC4QE2ch75S3Y7xwevEvHo");

  function include(file_path){
    var j = document.createElement("script"); /* criando um elemento script: </script><script></script> */
    j.type = "text/javascript"; /* informando o type como text/javacript: <script type="text/javascript"></script>*/
    j.src = file_path; /* Inserindo um src com o valor do parâmetro file_path: <script type="javascript" src="+file_path+"></script>*/
    document.body.appendChild(j); /* Inserindo o seu elemento(no caso o j) como filho(child) do  BODY: <html><body><script type="javascript" src="+file_path+"></script></body></html> */
  }

  //incluindo um arquivo com a função include()
  include("js/models/evento.js");
  include("js/models/convite.js");
  include("js/models/presente.js");

  include("js/views/moms_module/login_view.js");
  include("js/views/moms_module/menu_view.js");
  include("js/views/moms_module/moms_view.js");
  include("js/views/moms_module/invite_view.js");


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