$(function() {
  var MomsView = Parse.View.extend({
    momsTemplate: _.template($("#moms-template").html()),

    el: "#content",

    initialize: function() {
      new MenuView();
      $("#menu li.active").removeClass("active");
      $("#menu #inicio").parent().toggleClass("active");

      var self = this;

      var query = new Parse.Query(Evento);
      query.equalTo("user", Parse.User.current());
      query.find({
        success: function(results) {
          if(!results || results.length == 0) {
            new EventView();
            self.undelegateEvents();
            delete self;
          }
          else {
            var meuEvento = results[0].attributes;
            self.render(meuEvento);
          }
        },
        error: function(error) {
          this.$("#error").html("Problemas ao requisitar dados do servidor, aguarde e tente novamente.").show();
        }
      });
    },

    render: function(meuEvento) {
      var dataEvento = new Date(meuEvento.data);
      var dataAgora = new Date($.now());
      var diasCont = Math.floor((dataEvento - dataAgora) / (1000*60*60*24));

      var dataStr = $.format.date(meuEvento.data, "dd/MM/yyyy") + " às " + $.format.date(meuEvento.data, "hh:mm");;

      this.$el.html(this.momsTemplate({
        nomedobebe: meuEvento.nomedobebe,
        descricao: meuEvento.descricao,
        data: dataStr,
        diasCont: diasCont,
        convidadosCont: 15,
        presentesCont: 20
      }));
      this.delegateEvents();
    }
  });
});