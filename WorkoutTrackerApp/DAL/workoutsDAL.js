
//This module translates collections of RowDataPackets into objects for ours views

module.exports = {
    
    getWeightWorkouts: function(rows){
        var weights = {
            section: rows[0].section,
            sectionId: rows[0].sectionId,
            isWeightLifting: true,
            workouts: []
        }
        rows.forEach(function(row){
            var workout = {
                workoutId: row.workoutId,
                date: row.date,
                exercise: row.exercise,
                weight: row.weight,
                sets: row.sets,
                reps: row.reps
            }
            weights.workouts.push(workout);
        })
        return weights;
    },

    getRunWorkouts: function(rows){
        var run = {
            section: rows[0].section,
            sectionId: rows[0].sectionId,
            workouts: []
        }
        rows.forEach(function(row){
            var workout = {
                workoutId: row.workoutId,
                date: row.date,
                distance: row.distance,
                time: row.time,
                intensity: row.intensity
            }
            run.workouts.push(workout);
        })
        return run;
    },

    getSwimWorkouts: function(rows){
        var swim = {
            section: rows[0].section,
            sectionId: rows[0].sectionId,
            workouts: []
        }
        rows.forEach(function(row){
            var workout = {
                workoutId: row.workoutId,
                date: row.date,
                distance: row.distance,
                time: row.time,
                intensity: row.intensity
            }
            swim.workouts.push(workout);
        })
        return swim;
    },

    getCycleWorkouts: function(rows){
        var cycle = {
            section: rows[0].section,
            sectionId: rows[0].sectionId,
            workouts: []
        }
        rows.forEach(function(row){
            var workout = {
                workoutId: row.workoutId,
                date: row.date,
                distance: row.distance,
                time: row.time,
                intensity: row.intensity
            }
            cycle.workouts.push(workout);
        })
        return cycle;
    }


}