var InviteView = Parse.View.extend({
  events: {
    "submit form.invite-form": "escolherAmigos",
  },

  el: "#content",

  initialize: function() {
    new MenuView();
    $("#menu li.active").removeClass("active");
    $("#menu #convidar").parent().toggleClass("active");

    this.render();
  },

  escolherAmigos: function() {
    var msg = this.$("#invite-message").val();

    if(msg != "") {
      FB.ui({
          method: 'apprequests',
          message: msg
        }, 
        function(response){
          console.log(response);
      });
    }
    else {
      this.$("#error").html("Insira uma mensagem antes de escolher seus amigos a convidar.").show();
    }
  },

  render: function() {
    this.$el.html(_.template($("#invite-template").html()));
    this.delegateEvents();
  }
});