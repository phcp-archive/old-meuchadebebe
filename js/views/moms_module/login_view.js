$(function() {
  var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
    },

    el: "#full-content",
    
    initialize: function() {
      _.bindAll(this, "logIn");
      this.render();
    },

    logIn: function(e) {
      var self = this;

      Parse.FacebookUtils.logIn("email", {
        success: function(user) {
          FB.api(
            "/me?fields=name,picture",
            function (response) {
              if (response && !response.error) {
                Parse.User.current().save({"name": response.name});
                Parse.User.current().save({"picture": response.picture.data.url});

                self.$(".login-form button").attr("disabled", "disabled");
                self.$el.html("");
                new MenuView();
                new MomsView();
                self.undelegateEvents();
                delete self;
              }
            }
          );
        },
        error: function(user, error) {
          self.$("#error").html("Problemas ao logar com o Facebook, tente novamente.").show();
          self.$(".login-form button").removeAttr("disabled");
        }
      });

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#login-template").html()));
      this.delegateEvents();
    }
  });
});