var express = require('express');
var fs = require('fs');
var path = require('path');
var workoutsData = require('../models/workouts');
var mySQL = require('mysql');
var DAL = require('../DAL/workoutsDAL')

var router = express.Router();

var staticDir = path.join(__dirname, '..', 'views');
var index = fs.readFileSync(path.join(staticDir, 'index.handlebars'), 'utf8');

var mysqlHost = process.env.MYSQL_HOST;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPassword = process.env.MYSQL_PASSWORD;
var mysqlDB = process.env.MYSQL_DB;
var conn = mySQL.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDB
});

conn.connect(function(err) {
  if (err) {
    console.log("== Unable to make connection to MySQL Database.")
    throw err;
  }
});

var workoutsData = {
    weight: DAL.getWeights(conn)
}

//since weight lifting has slightly different data
//we do some pre-processing to add an isWeightLifting property
/*Object.keys(workoutsData).forEach(function (type) {
    if (workoutsData[type].section === 'Weight Lifting') {
        workoutsData[type].isWeightLifting = true;
    } else {
        workoutsData[type].isWeightLifting = false;
    }
});
*/


router.get('/', function(req, res, next){
    setTimeout(function(){
        res.status(200).render(path.join(staticDir, 'index'), {
            exercises: workoutsData
        })
    },2000);
    


});

module.exports = router;