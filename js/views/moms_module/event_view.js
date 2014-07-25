var EventView = Parse.View.extend({
  events: {
    "submit form.event-form": "save",
  },

  el: "#content",

  initialize: function() {
    _.bindAll(this, "save");

    new MenuView();
    $("#menu li.active").removeClass("active");
    $("#menu #editar-evento").parent().toggleClass("active");

    this.render();
  },

  save: function() {
    var nomedobebe = this.$("#event-nomedobebe").val();
    var descricao = this.$("#event-descricao").val();
    var data = this.$("#event-data").val();

    var evt = new Evento();
    evt.set("nomedobebe", nomedobebe);
    evt.set("descricao", descricao);
    evt.set("data", data);

    evt.save(null, {
      success: function(evento) {
        new MomsView();
        self.undelegateEvents();
        delete self;
      },
      error: function(error) {
        this.$("#error").html("Problemas ao salvar dados no servidor, aguarde e tente novamente.").show();
      }
    });
  },

  render: function() {
    this.$el.html(_.template($("#event-template").html()));
    this.delegateEvents();
  }
});