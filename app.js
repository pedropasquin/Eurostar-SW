'use strict'

//cargamos la libreria mongoose
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var contestant_routes  = require('./routes/contestant');
var director_routes  = require('./routes/director');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

// rutas base
//cualquier solicitud dttp tenemos que poner delante un /api
app.use('/api', contestant_routes);
app.use('/api', director_routes);


module.exports = app;
