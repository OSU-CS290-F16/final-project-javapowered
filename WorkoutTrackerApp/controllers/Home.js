var express = require('express');
var fs = require('fs');
var path = require('path');
var workoutsData = require('../models/workouts');

var router = express.Router();

var staticDir = path.join(__dirname, '..', 'views');
var index = fs.readFileSync(path.join(staticDir, 'index.handlebars'), 'utf8');

var weightsWorkouts = [];
var sportsWorkouts = [];

Object.keys(workoutsData).forEach(function (type) {
    if (workoutsData[type].section === 'Weight Lifting') {
        workoutsData[type].isWeightLifting = true;
    } else {
        workoutsData[type].isWeightLifting = false;
    }
});



router.get('/', function(req, res){
    res.status(200).render(path.join(staticDir, 'index'), {
        exercises: workoutsData
    });
});

module.exports = router;
