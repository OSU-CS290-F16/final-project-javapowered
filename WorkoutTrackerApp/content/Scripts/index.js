
$('#weight-datetime').datetimepicker({ 
    format: 'L'
});

$('#sport-datetime').datetimepicker({ 
    format: 'L'
});


/* Listeners for displaying the "add" modals */

$('#add-weight').on('click', function(event){
    $('#add-workout-modal').modal('show');
    //add function to validate data on save here?
});

$('#add-run').on('click', function(event){
    $('#add-sport-modal').modal('show');
    //add function to validate data on save here?
});

$('#add-cycle').on('click', function(event){
    $('#add-sport-modal').modal('show');
    //add function to validate data on save here?
});

$('#add-swim').on('click', function(event){
    $('#add-sport-modal').modal('show');
    //add function to validate data on save here?
});

