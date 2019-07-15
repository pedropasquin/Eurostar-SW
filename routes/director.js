'use strict'

var express = require('express');
var directorController = require('../controllers/director');

var api = express.Router();

api.get('/probando-controlador', directorController.pruebas);
api.post('/register', directorController.saveDirector);
api.post('/login', directorController.loginDirector);

module.exports = api;
