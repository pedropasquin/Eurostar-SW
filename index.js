'use strict'

//cargamos la libreria mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
var url = 'mongodb://localhost:27017/star-war-eurostar';

//Para eliminar el aviso de mongoose que devuelve por la consola donde hemos lanzado el npm start
mongoose.Promise = global.Promise;

// Nos conectamos a la BBDD
// mongoose.connect('mongodb://localhost:27017/star-war-eurostar', (err, res) => {
//   if (err) {
//     throw err;
//   }else{
//     console.log('La conexion a la BBDD funciona correctamente...');
//
//     app.listen(port, function(){
//       console.log("Servidor del API REST escuchando en http://localhost:"+ port)
//     })
//   }
// });
mongoose.connect(url, {useNewUrlParser: true });
app.listen(port, function(){
  console.log("Servidor del API REST escuchando en http://localhost:"+ port)
});
