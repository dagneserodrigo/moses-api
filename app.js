var express = require('express')
var load = require('express-load')
var path = require('path')
var bodyParser = require('body-parser')
var http = require('http')
var config = require('./config/config')

var app = express()

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
//   next()
// })

app.use(express.static('public'))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

load('models')
  .then('controllers')
  .then('routes')
  .into(app)

const server = http.createServer(app)

var port = process.env.PORT || config.PORT

server.listen(port, function(){
    console.log('Listening in port ' + port)
});
