module.exports = function (app) {

    var replaceAcentos = function(str) {
        str = str.replace(/[âáàã]/gi,"a");
        str = str.replace(/[éèê]/gi,"e");
        str = str.replace(/[íìî]/gi,"i");
        str = str.replace(/[ôõóò]/gi,"o");
        str = str.replace(/[úùû]/gi,"u");
        str = str.replace("ç","c");

        return str;
    }
 
    var CONFIRMA = /[sim|existe|tem]/gi;
    var NEGATIVA = /[nao|não]/gi;

    var buscarMensagemAtendimentoPorId = function(id) {
        var fluxos = atendimentoFluxo.filter(function(fluxo) { return fluxo.id === id});
        return fluxos.length > 0 ? fluxos[0].resposta : ``;
    }

    var buscarFluxoIdPorMensagem = function(mensagem) {
        var fluxos = atendimentoFluxo.filter(function(fluxo) { 
            return replaceAcentos(fluxo.resposta).toUpperCase() === replaceAcentos(mensagem).toUpperCase()
        });
        return fluxos.length > 0 ? fluxos[0].id : null;
    }

    var atendimentoFluxo = [{ 
            anterior: null,
            id: 1,
            matcher: /^(?=.*\blançamentos\b)(?=.*\bcartão\b)(?=.*\b[não conferem|diferentes|divergentes]\b)(?=.*\boperadora\b).*/gi,
            resposta: `No sistema de monitoramento, verifique se existe algum PDV com semáforo em vermelho (offline) e me avise.`
        }, {
            anterior: 1,
            id: 2,
            matcher: CONFIRMA,
            resposta: `Então reinicie o PDV e Aguarde. Caso o PDV não sincronize após a reinicialização, toque aqui para abrir um chamado com suporte local para verificar conectividade do PDV. Posso ajudar em algo mais?`
        }, {
            anterior: 1,
            id: 3,
            matcher: NEGATIVA,
            resposta: `Vamos tentar forçar atualização dos lançamentos na operadora. Abra a tela de "Prestação de contas" e clique no botão "Importar dados TEF". Após a sincronização, verifique novamente a conciliação. Caso apresente algum erro de sincronização, toque aqui para abrir um chamado para o suporte da aplicação. Me avise quando a sincronização finalizar.`
        }, {
            anterior: 3,
            id: 4,
            matcher: /[terminou|finalizou]/gi,
            resposta: `O problema foi resolvido?`
        }, {
            anterior: 4,
            id: 5,
            matcher: CONFIRMA,
            resposta: `Excelente! Tenha um bom(a) dia / tarde / noite.`
        }, {
            anterior: 4,
            id: 6,
            matcher: NEGATIVA,
            resposta: `Verifique no sistema de retaguarda se existem lançamentos manuais através da tela "Lançamentos TEF". Não esqueça de filtrar pela data de conciliação em questão. Caso existam lançamentos manuais, verifique se eles estão autorizados pela operadora. Para isso, acesse o "Sistema de TEF" e busque pela data do lançamento, VAN, código de rede, e código de bandeira. Caso exista algum lançamento manual não autorizado, procure pelo comprovante da transação no Caixa Central. Você encontrou o comprovante`
        }, {
            anterior: 6,
            id: 7,
            matcher: CONFIRMA,
            resposta: `Ótimo. Toque aqui para abrir chamado com a autorizadora para avaliar a pendência de autorização.`
        }, {
            anterior: 6,
            id: 8,
            matcher: NEGATIVA,
            resposta: `Neste caso é preciso excluir o lançamento manual. Posso ajudar em algo mais?`
        }];

    var fluxosPadroes = [{
            id: 1,
            matcher: /(oi|olá|ola)/gi,
            resposta: `Olá, em que posso ajudá-lo?`
        }];

	return {
		talk(req, res) {
            var respostaBot = !req.body.bot ? '' : req.body.bot;
            var mensagem = req.body.mensagem;
            var resposta = `Infelizmente não posso ajudá-lo(a). Toque aqui para abrir um chamado para o serviço compartilhado.`;
            var atendimentoFluxoId = buscarFluxoIdPorMensagem(respostaBot);
            var respostas = [];
            atendimentoFluxo.filter(function(fluxo) { return fluxo.anterior === atendimentoFluxoId }).forEach(function(fluxo) {
                if (fluxo.matcher.test(mensagem)) {
                    respostas.push({mensagem : fluxo.resposta});
                }
            });
            if (respostas.length === 0) {
                fluxosPadroes.forEach(function(fluxo) {
                    if (fluxo.matcher.test(mensagem)) {
                        respostas.push({mensagem : fluxo.resposta});
                    }
                });
            } 
            if (respostas.length > 0) {
                resposta = respostas[0].mensagem;
            }
            res.set({ 'content-type': 'application/json; charset=utf-8' })
			res.json({ resposta })
		}
	}
}
