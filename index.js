var config = require('config')
var express = require('express')
var setupRoutes = require('./app/routes')
var app = express()

setupRoutes(app)
app.listen(config.get('port'))