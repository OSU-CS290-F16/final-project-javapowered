//Globals
var WorkOutModal = $('#add-workout-modal')
var SportModal = $('#add-sport-modal');
var workoutSaveButton = $('#save-workout');


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
            
        }
    });

    


    //add function to validate data on save here?
});

function validateWorkOutModal(){
    var valid = true;
    var dateInput = $('#weight-datetime');
    var exerciseInput = $('#w-input-exercise');
    var weightInput = $('#w-input-weight');
    var setsInput = $('#w-input-sets');
    var repsInput = $('#w-input-reps');

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

