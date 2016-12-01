//Globals
var WorkOutModal = $('#add-workout-modal')
var SportModal = $('#add-sport-modal');
var workoutSaveButton = $('#save-workout');

//workout modal inputs
var dateInput = $('#weight-datetime');
var exerciseInput = $('#w-input-exercise');
var weightInput = $('#w-input-weight');
var setsInput = $('#w-input-sets');
var repsInput = $('#w-input-reps');


$('#weight-datetime').datetimepicker({ 
    format: 'L'
});

$('#sport-datetime').datetimepicker({ 
    format: 'L'
});


/* Listeners for displaying the "add" modals */

$('#add-weight').on('click', function(event){
    WorkOutModal.modal('show');
    
    //removes previous event listener
    workoutSaveButton.unbind();
    //workoutSaveButton.off();

    workoutSaveButton.on('click',function(event){
        if(validateWorkOutModal() == true){
            //build row
            var builtRowObj = buildWorkoutRow(dateInput.val(),
                            exerciseInput.val(),
                            weightInput.val(),
                            setsInput.val(),
                            repsInput.val());

            //find correct row to insert
            var rowIdx = searchRowIndexBydate('table-weight',dateInput.val());
            //console.log(rowIdx);
            $('#table-weight > tbody > tr').eq(rowIdx).before(builtRowObj);
        }
    });
});

function validateWorkOutModal(){
    var valid = true;
    if (dateInput.val() == null || dateInput.val() == '') {
        valid = false;
    }
    if (exerciseInput.val() == null || exerciseInput.val() == '') {
        valid = false;
    }
    if (weightInput.val() == null || weightInput.val() == '') {
        valid = false;
    }
    if (setsInput.val() == null || setsInput.val() == '') {
        valid = false;
    }
    if (repsInput.val() == null || repsInput.val() == '') {
        valid = false;
    }

    if(valid == false){
        alert('All textboxes must be filled.');
        return valid;
    }
    else{
        return valid;
    }
}

function buildWorkoutRow(date,exercise,weight,sets,reps){
    var row = $(document.createElement('TR'));
    row.append($(document.createElement("td")).text(date));
    row.append($(document.createElement("td")).text(exercise));
    row.append($(document.createElement("td")).text(weight));
    row.append($(document.createElement("td")).text(sets));
    row.append($(document.createElement("td")).text(reps));

    //console.log(row);
    return row;
}

function searchRowIndexBydate(tableid,date){
	var dateFormatted = new Date(date);

	var totalRows = $('#' + tableid +' > tbody > tr').length;
	var i;

	for(i = 0; i < totalRows;i++){
		var rowIDate = new Date($('#' + tableid + ' > tbody > tr:eq('+ i +') > td:eq(0)').text());
		if (Date.parse(rowIDate) <= Date.parse(dateFormatted)) {
			break;
		}
	}
	return i;
}

$('#add-run').on('click', function(event){
    SportModal.modal('show');
    //add function to validate data on save here?
});

$('#add-cycle').on('click', function(event){
    SportModal.modal('show');
    //add function to validate data on save here?
});

$('#add-swim').on('click', function(event){
    SportModal.modal('show');
    //add function to validate data on save here?
});