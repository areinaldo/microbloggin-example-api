var express = require('express');
const { route } = require('.');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort('-creationdate').exec(function(err,users){
    if(err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// GET de un único usuario por su Id
router.get('/:id', function(req, res, next){
  User.findById(req.params.id, function(err, userinfo){
    if(err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

// POST de un nuevo usuario 
router.post('/',function(req, res, next){
  User.create(req.body, function(err, userInfo){
    if(err) res.status(500).send(err)
    else res.sendStatus(200);
  })
});
// PUT de un usuario existente identificado por su Id
router.put('/:id', function(req, res, next){
  
  User.findByIdAndUpdate(req.params.id, req.body, function(err,userInfo){
    if(err) res.status(500).send(err);
    else res.sendStatus(200);
  })

});

router.delete('/:id', function(req, res){
  //Todo
  res.status(200).send('Usuario' + req.body.name + ' ha sido borradp con exito');
})


module.exports = router;

