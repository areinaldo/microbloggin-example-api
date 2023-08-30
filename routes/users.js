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

router.delete('/:id', function(req, res, next ){
  
  User.findByIdAndDelete(req.params.id, function(err, userInfo){
    if(err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

//Comprueba si el usuario existe

router.post('/signin', function(req, res, next){
  User.findOne({username: req.body.username}, function(err,user){
    if(err) res.status(500).send('Error Comprobando el Usuario');
    //Si el usuario existe...
    if(user != null){
      user.comparePassword(req.body.password, function(err, isMatch){
        if(err) return next(err);
        //Si el pasword es correcto...
        if(isMatch)
          res.status(200).send({message: 'ok', role: user.role, id: user.id});
        else
          res.status(200).send({message: 'ko'});
      });
    }else res.status(401).send({message: 'ko'});
  });
});


module.exports = router;

