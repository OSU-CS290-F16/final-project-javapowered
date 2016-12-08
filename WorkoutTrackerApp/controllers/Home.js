var express = require('express');
var fs = require('fs');
var path = require('path');
//var workoutsData = require('../models/workouts');
var mySQL = require('promise-mysql');
var DAL = require('../DAL/workoutsDAL');
var bodyParser = require('body-parser')


var router = express.Router();

var staticDir = path.join(__dirname, '..', 'views');
var index = fs.readFileSync(path.join(staticDir, 'index.handlebars'), 'utf8');

var mysqlHost = process.env.MYSQL_HOST;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPassword = process.env.MYSQL_PASSWORD;
var mysqlDB = process.env.MYSQL_DB;
var connection;
var workouts = {};

router.use(bodyParser.urlencoded({extended: false}));


router.get('/', function(req, res, next){
    mySQL.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDB,
    }).then(function(conn) {
        connection = conn;
        return connection.query("SELECT * FROM weights_test2");
    }).then(function (rows){
        workouts.weight = DAL.getWeightWorkouts(rows);
    }).then(function () {
        return connection.query("SELECT * FROM run");
    }).then(function(rows){
        workouts.run = DAL.getRunWorkouts(rows);
    }).then(function () {
        return connection.query("SELECT * FROM cycle");
    }).then(function(rows){
        workouts.cycle = DAL.getCycleWorkouts(rows);
    }).then(function () {
        return connection.query("SELECT * FROM swim");
    }).then(function (rows) {
        workouts.swim = DAL.getSwimWorkouts(rows);
    }).then(function(){
        res.render(path.join(staticDir, 'index'), {
            exercises: workouts
        });
    })


});

//Add row Post
//The add button on the modal needs to pass the necessary table and varialbes to the url.
//This routing will pull it's parameters from the url
//I think this will work, but I can't test it due to database connection issues (12/7/16, 5:13am)
router.post('/add', function(req, res){
  
  //if the type is "weights" then the db table has different columns than 
  // the other db tables
  if(req.body.type === "weight"){
    var tableName = "weights";  
    var workoutDate = req.body.date; //Date
    var exercise = req.body.exercise; //exercise
    var weight = req.body.weight;   //Weight 
    var sets = req.body.sets;   //Sets
    var reps = req.params.reps;   //Reps 
  }else{
    var tableName = req.body.type;  //Table name == type
    var workoutDate = req.body.date; //Date
    var distance = req.body.distance;   //Weight 
    var intensity = req.body.intensity;   //Sets
  }


  var connection;

  console.log(req.body);
  
  mySQL.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDB,
  }).then(function(conn) {
      connection = conn;
  }).then(function(){
                if(tableName === 'weights'){
          connection.query("INSERT INTO weights_test2 VALUES " +
                          "(1,NULL,\x22Weight Lifting\x22,\x22weights\x22," +
                          workoutDate + "," + exercise + "," + weight + "," +
                          sets + "," + reps + ");"
                          );
        }else{
          connection.query("INSERT INTO " + tableName + " VALUES " +
                          "(1,NULL," + section + "," + tableName + "," +
                          workoutDate + "," + distance + "," + time + "," +
                          intensity + ");"
                          );
        }
  });
  res.sendStatus(200);
});



//Delete row Post
//The delete button needs to pass the necessary table and ID to the url.
//This routing will pull it's parameters from the url
//I think this will work, but I can't test it due to database connection issues (12/7/16, 3:59am)
router.post('/delete', function(req, res) {
      if(req.body.type = 'weight'){
          var tableName = 'weights_test2';
      }else{
          var tableName = req.body.type;
      }
        

      var workoutId = req.body.workoutId;

      mySQL.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDB,
      }).then(function(conn) {
          connection = conn;
          connection.query('DELETE FROM ' + tableName + ' WHERE workoutId=' + workoutId + ';');
      });
      console.log('Deleted workout with ID' + workoutId + ' from table ' + tableName);
      res.sendStatus(200);
});

module.exports = router;
