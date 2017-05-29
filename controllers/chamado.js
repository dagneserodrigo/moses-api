module.exports = function (app) {

	var chamados = [
		{ id: 1, descricao: 'Primeiro chamado'},
		{ id: 2, descricao: 'Segundo chamado'},
		{ id: 3, descricao: 'Terceiro chamado'},
		{ id: 4, descricao: 'Quarto chamado'},
		{ id: 5, descricao: 'Quinto chamado'}
	]

	return {
		getAll(req, res) {
			res.json({})
		}
	}
}
