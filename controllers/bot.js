module.exports = function (app) {

	var listaFluxos = [
		{ frase: "Oi", resposta: 'Olá! Em que posso leh ajudar?' },
		{ frase: "Como está?", resposta: 'Estou bem, obrigado por perguntar! E você, como está?' },
		{ frase: "Moses", resposta: 'Não consegue né Moisés!' },
        { frase: "!rede", resposta: 'sobpressao | android2017' },
        { frase: "activity", resposta: 'actigori' },
        { frase: "sono", resposta: 'Tome um café' }
	]

	return {
		talk(req, res) {
            var mensagem = req.body.mensagem;
            var resposta = "Desculpe, não consegui identificar uma situação de auxílio para o seu problema. Por favor, registre um ticket para que possa ser avaliado seu problema."
            for (var i = 0; i < listaFluxos.length; i++) {
                if (listaFluxos[i].frase.toUpperCase() === mensagem.toUpperCase()) {
                    resposta = listaFluxos[i].resposta;
                    break;
                }
            }
			res.json({ resposta })
		}
	}
}
