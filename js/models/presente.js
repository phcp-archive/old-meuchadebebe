var Presente = Parse.Object.extend("Presente", {
  defaults: {
	nome: "",
	user: null
  }
});

var ListaPresentes = Parse.Collection.extend({
  model: Presente
});