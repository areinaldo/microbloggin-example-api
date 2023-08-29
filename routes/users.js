var express = require('express');
const { route } = require('.');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    "users": [
      {"id": 123,
        "name": "Eladio Guardiola",
        "phones": {
          "home": "800-123-4567",
          "mobile": "877-13-1234"
        },
        "email": [
          "jd@example.com",
          "jd@example.org"],
          "dateOfBirth": "1980-01-02T00:00:00.000Z",
          "registered": true 
      },
      {"id": 456,
        "name": "Nemesio Guardiola",
        "phones": {
          "home": "800-123-5165",
          "mobile": "817-13-1234"
        },
        "email": [
          "pt@example.com",
          "pt@example.org"],
          "dateOfBirth": "1983-03-08T00:00:00.000Z",
          "registered": false 
      }
    ]
  });
});
router.get('/:id', function(req, res){
  if(req.params.id == '123'){
    res.json(
    {
      "id": 123,
      "name": "Eladio Guardiola",
      "phones": {
        "home": "800-123-4567",
        "mobile": "877-13-1234"
      },
      "email": [
      "jd@example.com",
      "jd@example.org"],
      "dateOfBirth": "1980-01-02T00:00:00.000Z",
      "registered": true 
  });
  }else
    res.status(400).send("Lo siento, el item no se ha encontrado");
});

router.post('/',function(req, res){
  var new_user = req.body;
  //ToDo
  res.status(200).send('Usuario' + req.body.name + 'ha sido añadido satisfactoriamente')
});

router.put('/id', function(req, res){
  var update_user = req.body;
  //ToDo
  res.status(200).send('Usuario' + req.body.name + ' ha sido actualizado con exito');
});

router.delete('/:id', function(req, res){
  //Todo
  res.status(200).send('Usuario' + req.body.name + ' ha sido borradp con exito');
})

module.exports = router;
