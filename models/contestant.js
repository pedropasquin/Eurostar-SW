'use strict'

//cargamos la libreria mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contestantSchema = Schema({
  FIRST_NAME: String,
  LAST_NAME: String,
  DATE_OF_BIRTH: String,
  MOBILE_PHONE: String,
  COUNTRY_OF_RESIDENCE: String,
  EMAIL: String,
  STAR_WARS_CHARACTER: String,
  IMAGE: String
});

module.exports = mongoose.model('Contestant', contestantSchema);
