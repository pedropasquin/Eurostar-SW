'use strict'

var bcrypt = require('bcrypt-nodejs');
var Director = require('../models/director');


function pruebas(req, res) {
  res.status(200).send({
    message: 'Probando una accion dl controlador para directores'
  });

}

function saveDirector(req, res) {
  var director = new Director();
  var params = req.body;


  director.FIRST_NAME = params.FIRST_NAME,
  director.LAST_NAME = params.LAST_NAME,
  director.EMAIL = params.EMAIL

      if (params.PASS){
          // // Encriptar contraseña
           bcrypt.hash(params.PASS, null, null, function(err, hash) {
             director.PASS = hash;
             if (director.FIRST_NAME != '' && director.LAST_NAME != '' && director.EMAIL != '') {
               //guardar el usuario
                 director.save((err, directorStored) => {
                    if(err){
                      res.status(500).send({message: 'Error al guardar el Director'})
                    } else {
                      if(!directorStored){
                        res.status(404).send({message: 'No  se ha registrado el Director'})
                      }else {
                        res.status(200).send({director: directorStored});
                      }
                    }
                  })
             } else {
               res.status(200).send({message: 'Introduce todos los campos'})
             }
           });
      }else{
        res.status(200).send({message: 'Introduce la contraseña'});
      }

}

function loginDirector(req, res) {
  var params = req.body;

  var email = params.EMAIL;
  var password = params.PASS;

  Director.findOne({EMAIL: email}, (err, director) => {
    if (err){
      res.status(500).send({message: 'Error en la petición'})
    }else{
      if (!director){
        res.status(400).send({message: 'El usuario no existe'});
      }else{
        bcrypt.compare(password, director.PASS, function(err, check){
          if (check){
            // // devolver todos los datos del usuario logueado
            res.status(200).send({director});
            //res.status(200).send({director});
            // if(params.gethash) {
            //   // devolver un token de jwt
            // }else {
            //   res.status(200).send({director});
            // }
            }else{
              res.status(404).send({message: 'El usuario no ha podido loguearse'});
            }
          });
        }
      }
    });
  }

module.exports = {
  pruebas,
  saveDirector,
  loginDirector
};


