$(function() {
  Parse.$ = jQuery;

  // Inicia a aplicacao do parse
  Parse.initialize("8ERiNA4fFRBvD37pKmdhG6KcuZvtmCYHwZNN85uW",
   "o53eGShke5E92usJ1tfS6uV2XJ61LdvLKkUCD7x2");

  // Model de Evento Cha de Bebe
  var Evento = Parse.Object.extend("Evento", {
  	defaults: {
  		nomedobebe: "",
      descricao: "",
      data: $.now(),
      user: Parse.User.current()
    }
  });

  // Model de Presente
  var Presente = Parse.Object.extend("Presente", {
  	defaults: {
  		nome: "",
  		user: null
  	}
  });

  // Model de Convite
  var Convite = Parse.Object.extend("Convite", {
    defaults: {
      mensagem: "",
      req_facebook: "",
      convidados: [],
      user: Parse.User.current()
    }
  });

  var AppState = Parse.Object.extend("AppState");

  // Colecao de Presentes
  var ListaPresentes = Parse.Collection.extend({
  	model: Presente,
  });

  // Tela principal do convite
  var InviteView = Parse.View.extend({
    events: {
      "click #btn-sim": "aceitar",
      "click #btn-nao": "rejeitar"
    },

    inviteTemplate: _.template($("#invite-template").html()),

    el: "#content",

    initialize: function() {
      var self = this;

      var reqId = $.getUrlVar("request_ids").toString();

      var query = new Parse.Query(Convite);
      query.equalTo("req_facebook", reqId);
      query.find({
        success: function(cvResults) {
          var innerSelf = self;

          if(!cvResults || cvResults.length == 0) {
            this.$("#error").html("Você não tem convites aguardando resposta.").show();
          }
          else {
            var convite = cvResults[0].attributes;
            var innerQuery = new Parse.Query(Evento);
            innerQuery.equalTo("user", convite.user);
            innerQuery.find({
              success: function(evResults) {
                if(!evResults || evResults.length == 0) {
                  this.$("#error").html("Você não tem convites aguardando resposta.").show();
                }
                else {
                  var evento = evResults[0].attributes;
                  innerSelf.render(evento, convite.mensagem);
                }
              },
              error: function(error) {
                this.$("#error").html("Problemas ao requisitar dados do servidor, aguarde e tente novamente.").show();
              }
            });
          }
        },
        error: function(error) {
          this.$("#error").html("Problemas ao requisitar dados do servidor, aguarde e tente novamente.").show();
        }
      });
    },

    aceitar: function() {
      var self = this;
      var reqId = $.getUrlVar("request_ids").toString();

      var query = new Parse.Query(Convite);
      query.equalTo("req_facebook", reqId);
      query.find({
        success: function(cvResults) {
          var innerSelf = self;
          var convite = cvResults[0];

          convite.set("aceitos", convite.attributes.aceitos + 1);
          convite.save(null, {
            success: function(conviteResp) {
              new GiftsListView();
            },
            error: function(error) {
              console.log("error");
              innerSelf.$("#error").html("Problemas ao salvar dados no servidor, aguarde e tente novamente.").show();
            }
          });
        },
        error: function(error) {
          this.$("#error").html("Problemas ao requisitar dados do servidor, aguarde e tente novamente.").show();
        }
      });
    },

    rejeitar: function() {
      new RejectView();
      this.undelegateEvents();
    },

    render: function(evento, msg) {
      var dataEvento = new Date(evento.data);
      var dataAgora = new Date($.now());
      var diasCont = Math.floor((dataEvento - dataAgora) / (1000*60*60*24));

      var dataStr = $.format.date(evento.data, "dd/MM/yyyy") + " às " + $.format.date(evento.data, "hh:mm");;

      this.$el.html(this.inviteTemplate({
        nomedobebe: evento.nomedobebe,
        descricao: evento.descricao,
        data: dataStr,
        diasCont: diasCont,
        mensagem: msg
      }));
      this.delegateEvents();
    }
  });

  // Tela de rejeicao convite
  var RejectView = Parse.View.extend({
    el: "#content",

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(_.template($("#reject-template").html()));
    }
  });

  // Tela de presentes do convite
  var GiftsListView = Parse.View.extend({
    el: "#content",

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(_.template($("#giftslist-template").html()));
    }
  });

  // View principal do app
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
    routes: {
      "all": "all",
      "active": "active",
      "completed": "completed"
    },

    initialize: function(options) {
    },

    all: function() {
      state.set({ filter: "all" });
    },

    active: function() {
      state.set({ filter: "active" });
    },

    completed: function() {
      state.set({ filter: "completed" });
    }
  });

  var state = new AppState;

  new AppRouter;
  new AppView;
  Parse.history.start();
});