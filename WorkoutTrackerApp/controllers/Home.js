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
})
console.log(workouts);


router.get('/', function(req, res, next){

    res.render(path.join(staticDir, 'index'), {
        exercises: workouts
    });
});

module.exports = router;