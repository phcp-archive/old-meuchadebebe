var PresenteView = Parse.View.extend({
  events: {
    "submit form.presente-form": "save",
  },

  el: "#content",

  initialize: function() {
    _.bindAll(this, "save");

    this.render();
  },

  save: function() {
    var nomedopresente = this.$("#event-nomedopresente").val();
    var quantidade = this.$("#event-quantidadedopresente").val();

    var evt = new Presente();
    evt.set("nome", nomedopresente);
    evt.set("quantidade", parseInt(quantidade));
    

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
    this.$el.html(_.template($("#presente-template").html()));
    this.delegateEvents();
  }
});