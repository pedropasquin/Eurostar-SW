'use strict'

var express = require('express');
var contestantController = require('../controllers/contestant');

var api = express.Router();

var multipart = require('connect-multiparty');
var upload = multipart({ uploadDir: './uploads/contestants'});

api.get('/probando-controlador', contestantController.pruebas);
api.get('/list-contestant', contestantController.getContestants);
api.post('/register-contestant', contestantController.saveContestant);
api.put('/update-contestant/:id', contestantController.updateContestant);
api.post('/upload-image-contestant/:id', upload, contestantController.uploadImage);
api.delete('/delete-contestant/:id', upload, contestantController.deleteContestant);
module.exports = api;
