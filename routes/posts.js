var express = require('express');
var router = express.Router();
//midleware que es especifico de este router
router.use(function timeLog(req, res, next){
    console.log('Fecha actual: ', Date.now());
    next();
});

//define la ruta de la pagina del home
router.get('/', function(req, res){
    res.send('Pagina inicial de los posts');
});
//define la ruta de la página about
router.get('/about', function(req, res){
    res.send('Acerca de los post');
});
module.exports= router;