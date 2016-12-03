var mysql = require('mysql');

module.exports = {
    getWeights: function(conn){
        conn.query("SELECT * FROM weights", function(err, rows){
            if(err){
                console.log(err);
            }else{
                var weights = {
                    section: rows[0].section,
                    sectionId: rows[0].sectionId,
                    isWeightLifting: true,
                    workouts: []
                }
                rows.forEach(function(row){
                    var workout = {
                        date: row.date,
                        exercise: row.exercise,
                        weight: rows.weight,
                        sets: row.sets,
                        reps: row.reps
                    }
                    weights.workouts.push(workout);
                })
                return weights;
            }
        })
    }


}