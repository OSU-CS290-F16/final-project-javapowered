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
        return connection.query("SELECT * FROM weights");
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
  console.log(req.body)
  if(req.body.type === "weights"){
    var tableName = "weights";  
    var workoutDate = req.body.date; //Date
    var exercise = req.body.exercise; //exercise
    var weight = req.body.weight;   //Weight 
    var sets = req.body.sets;   //Sets
    var reps = req.body.reps;   //Reps 
  }else{
    var tableName = req.body.type;  //Table name == type
    var workoutDate = req.body.date; //Date
    var distance = req.body.distance;   //Weight
    var time = req.body.time;   //Time
    var intensity = req.body.intensity;   //Sets
  }

  var section;
  if(req.body.type === 'weights'){
      section = 'Weight Lifting';
  }else if(req.body.type == 'run'){
      section = 'Running';
  }else if(req.body.type == 'swim'){
      section = 'Swimming';
  }else {
      section = 'Cycling';
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
          connection.query("INSERT INTO weights VALUES " +
                          "(1,NULL,\x22"+ section +"\x22,\x22weight\x22,\x22" +
                          workoutDate + "\x22,\x22"+ exercise + "\x22," + weight + "," +
                          sets + "," + reps + ");"
                          );
        }else{
          connection.query("INSERT INTO " + tableName + " VALUES " +
                          "(1,NULL,\x22" + section + "\x22,\x22" + tableName + "\x22,\x22" +
                          workoutDate + "\x22," + distance + "," + time + "," +
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
      console.log(req.body);
      var tableName;
      if(req.body.type === 'weight'){
          tableName = 'weights';
      }else{
          tableName = req.body.type;
      }
        
      console.log(req.body)
      var workoutId = req.body.workoutId;

      mySQL.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDB,
      }).then(function(conn) {
          connection = conn;
          var query = "DELETE FROM "+tableName+" WHERE workoutId = "+workoutId+";";
          console.log(query);
          connection.query(query);
      });
      console.log('Deleted workout with ID' + workoutId + ' from table ' + tableName);
      res.sendStatus(200);
});

module.exports = router;
