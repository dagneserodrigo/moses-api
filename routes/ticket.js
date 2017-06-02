module.exports = function(app){
    const controller = app.controllers.ticket
    app.get('/ticket', controller.getAll)
    app.post('/ticket', controller.changeStatus)
}