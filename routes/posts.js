var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//Modelos
var Post = require('../models/Post.js');
var User = require('../models/User.js');
var db = mongoose.connection;

//midleware que es especifico de este router
router.use(function timeLog(req, res, next){
    console.log('Fecha actual: ', Date.now());
    next();
});

// GET del listado de posts ordenado por fecha de publicacion
router.get('/', function(req, res, next) {
    Post.find().sort('-publicationdate').populate('user').exec(function(err,posts){
      if(err) res.status(500).send(err);
      else res.status(200).json(posts);
    });
  });

// GET de todos los posts de un usuario dado
router.get('/all/:id', function(req, res, next){
    Post.find({'user': req.params.id}).sort('-publicationDate').populate('user').exec(function(err, 
    posts){
      if(err) res.status(500).send(err);
      else res.status(200).json(posts);
    });
  });

// POST de un nuevo post 
router.post('/',function(req, res, next){
    User.findById(req.body.iduser, function(err, userInfo){
      if(err) res.status(500).send(err)
      else{
        //crear la instacia post
        var postInstance = new Post ({
            user: req.body.iduser,
            title: req.body.title,
            description: req.body.description
        });
        //añadir postInstace al array de post del usuario
        userInfo.posts.push(postInstance);
        //sañvar el post en las colecciones users y posts
        userInfo.save(function(err){
            if(err) res.status(500).send(err);
            else{
                postInstance.save(function(err){
                    if(err) res.status(500).send(err);
                    res.sendStatus(200);
                });
            };
        });
      };
    });
  });

// PUT de un usuario existente identificado por su Id
router.put('/:id', function(req, res, next){
    Post.findByIdAndUpdate(req.params.id, req.body, function(err,postInfo){
      if(err) res.status(500).send(err);
      else res.sendStatus(200);
    })
  
  });

//DELETE de un post existente
router.delete('/:id', function(req, res, next ){
  
    Post.findByIdAndDelete(req.params.id, function(err, postInfo){
        if(err) res.status(500).send(err);
        else{
            User.findByIdAndDelete(postInfo.user, {$pull: {post: postInfo._id}}, function(err,userInfo){
                if(err) res.status(500).send(err);
                else{
                    res.sendStatus(200);
                };
            });
        };
    });
});

//define la ruta de la página about
router.get('/about', function(req, res){
    res.send('Acerca de los post');
});
module.exports= router;