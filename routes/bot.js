module.exports = function(app){
    var controller = app.controllers.bot

    app.post('/bot', controller.talk)
}