'use strict'

//cargamos la libreria mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var directorSchema = Schema({
  FIRST_NAME: String,
  LAST_NAME: String,
  EMAIL: String,
  PASS: String
});

module.exports = mongoose.model('Director', directorSchema);
