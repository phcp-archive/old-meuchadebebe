var Convite = Parse.Object.extend("Convite", {
  defaults: {
	mensagem: "",
	request_id: "",
	user: Parse.User.current()
  }
});