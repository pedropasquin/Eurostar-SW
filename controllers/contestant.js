'use strict'

var Contestant = require('../models/contestant');


function pruebas(req, res) {
  res.status(200).send({
    message: 'Probando una accion dl controlador'
  });

}

function getContestants(req, res){
  // var contestantId = req.params.FIRST_NAME;
  // if(!contestantId){
  //   var find = Contestant.find({}).sort('FIRST_NAME');
  // } else {
  //     var find = Contestant.find({FIRST_NAME: contestantId}).sort('FIRST_NAME');
  //   res.status(200).send({contestants})
  // }

  var contestant = new Contestant();
  var params = req.body;

  // res.json(contestant);
  // console.log(contestant);

  Contestant.find((err, contestantStored) => {

    res.json(contestantStored)

  });

}

function saveContestant(req, res) {
  var contestant = new Contestant();
  var params = req.body;

  contestant.FIRST_NAME = params.FIRST_NAME,
  contestant.LAST_NAME = params.LAST_NAME,
  contestant.DATE_OF_BIRTH = params.DATE_OF_BIRTH,
  contestant.MOBILE_PHONE = params.MOBILE_PHONE,
  contestant.COUNTRY_OF_RESIDENCE = params.COUNTRY_OF_RESIDENCE,
  contestant.EMAIL = params.EMAIL,
  contestant.STAR_WARS_CHARACTER = params.STAR_WARS_CHARACTER,
  contestant.IMAGE = params.IMAGE

      if (contestant.FIRST_NAME != '' && contestant.LAST_NAME != '' && contestant.EMAIL != '' && contestant.DATE_OF_BIRTH != '' && contestant.MOBILE_PHONE != '' && contestant.COUNTRY_OF_RESIDENCE != '') {
        //guardar el usuario
        contestant.save((err, contestantStored) => {
          if(err){
            res.status(500).send({message: 'Error al guardar el Contestant'})
          } else {
            if(!contestantStored){
              res.status(404).send({message: 'No  se ha registrado el Contestant'})
            }else {
              res.status(200).send({contestant: contestantStored});
            }
          }
        })
      } else {
        res.status(200).send({message: 'Introduce todos los campos'})
      }

}
function updateContestant(req, res) {
  var contestantId = req.params.id;
  var update = req.body;
  Contestant.findByIdAndUpdate(contestantId, update, (err, contestantUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el concursante'})
    }else{
      if(!contestantUpdated){
        res.status(404).send({message: 'No de ha podido actualizar el concursante'})
      }else{
        res.status(200).send({contestant: contestantUpdated});
      }
    }
  });
}

function uploadImage(req, res){
  var contestantId = req.params.id;
  var file_name = "No subido..."

  if(req.files){
    var file_path = req.files.image.path;
    var file_splith = file_path.split('\\');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
      Contestant.findByIdAndUpdate(contestantId, {image: file_name}, (err, contestantUpdated) => {
        if(!contestantUpdated){
          res.status(404).send({message: 'No de ha podido actualizar el concursante'})
        }else{
          res.status(200).send({image: file_name,  contestant: contestantUpdated});
        }
      })
    } else {
      res.status(200).send({message: 'Extensión del archivo no valido...'})
    }
    console.log(file_name);
    console.log('prueba');
  }else{
    res.status(200).send({message: 'No has subido ninguna imagen...'})
  }
}

function deleteContestant(req, res){
  var contestantId = req.params.id;

  Contestant.findByIdAndRemove(contestantId, (err, contestantRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar el concursante'})
    } else {
      if (!contestantRemove) {
        res.status(404).send({message: 'No de ha podido borrar el concursante'})
      } else {
        res.status(200).send({contestant: contestantRemove});
      }
    }
  });
}
  module.exports = {
    pruebas,
    saveContestant,
    updateContestant,
    uploadImage,
    deleteContestant,
    getContestants
  };


