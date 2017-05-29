module.exports = function(app){
    var controller = app.controllers.chamado

    app.get('/chamado', controller.getAll)
}