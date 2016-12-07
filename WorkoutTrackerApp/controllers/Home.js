var express = require('express');
var fs = require('fs');
var path = require('path');
//var workoutsData = require('../models/workouts');
var mySQL = require('promise-mysql');
var DAL = require('../DAL/workoutsDAL')

var router = express.Router();

var staticDir = path.join(__dirname, '..', 'views');
var index = fs.readFileSync(path.join(staticDir, 'index.handlebars'), 'utf8');

var mysqlHost = process.env.MYSQL_HOST;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPassword = process.env.MYSQL_PASSWORD;
var mysqlDB = process.env.MYSQL_DB;
var connection;
var workouts = {};


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

//ToDo: add POST goes here
/*
router.post('/add', function(req, res){
  mySQL.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDB,
  }).then(function(conn) {
      connection = conn;
      connection.query("INSERT INTO " + tablename + " VALUES (NULL," +
                        ));
  }
  console.log('Added workout to table ' + tableName );
});
*/

//Delete row Post
//The delete button needs to pass the necessary table and ID to the url.
//This routing will pull it's parameters from the url
//I think this will work, but I can't test it due to database connection issues (12/7/16, 3:59am)
router.post('/delete/:table/:Id', function(req, res) {
      //Passing Params to routing via url
      var tableName = request.params.tableName;
      var workoutId = request.params.Id;

      mySQL.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDB,
      }).then(function(conn) {
          connection = conn;
          connection.query('SELECT * FROM ' + tableName + '; '
                         + 'DELETE FROM ' + tableName + ' WHERE workoutId=' + workoutId + ';');
      }
      console.log('Deleted workout with ID' + workoutId + ' from table ' + tableName);
});

module.exports = router;
