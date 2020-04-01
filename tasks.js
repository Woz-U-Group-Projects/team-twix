var express = require("express");
var router = express.Router();
var models = require("../models");
var mysql = require('mysql');


var connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'Password1!',
database:'blogdb'

});

connection.connect(function(err){
    if(err){
        console.log(err);
    }else 
    console.log("You are connected to the db");
});

router.get('/', function(req, res,next){
  res.render('tasks',{title:'Express'});
});

router.get("/", function(req, res, next) {
  models.Task.findAll().then(tasks => res.json(tasks));
});

router.post("/", function(req, res, next) {
  let newTask = new models.Task();
  newTask.name = req.body.name;
  newTask.complete = req.body.complete;
  newTask.save().then(task => res.json(task));
});

router.delete("/:id", function(req, res, next) {
  let taskId = parseInt(req.params.id);
  models.Task.findByPk(taskId)
    .then(task => task.destroy())
    .then(() => res.send({ taskId }))
    .catch(err => res.status(400).send(err));
});

router.put("/:id", function(req, res, next) {
  models.Task.update(
    {
      name: req.body.name,
      complete: req.body.complete
    },
    {
      where: { id: parseInt(req.params.id) }
    }
  ).then(task => res.json(task));
});

module.exports = router;
