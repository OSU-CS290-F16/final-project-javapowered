//Globals
var WorkOutModal = $('#add-workout-modal')
var SportModal = $('#add-sport-modal');
var workoutSaveButton = $('#save-workout');
var SportSaveButton = $('#save-workout-sport');

//workout modal inputs
var dateInput = $('#weight-datetime');
var exerciseInput = $('#w-input-exercise');
var weightInput = $('#w-input-weight');
var setsInput = $('#w-input-sets');
var repsInput = $('#w-input-reps');

//Sports modal inputs
var dateInputS = $('#sport-datetime');
var distanceInputS = $('#s-input-distance');
var timeInputS = $('#s-input-time');
var IntensityInputS = $('#s-input-intensity');

//CHANGE IN FINAL
var PostDataDestination = "./add";
var DeleteDatadestination = "./delete";


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

			PostToServer(buildWorkoutJSON());

            //build row
            var builtRowObj = buildWorkoutRow(dateInput.val(),
                            exerciseInput.val(),
                            weightInput.val(),
                            setsInput.val(),
                            repsInput.val());

            //find correct row to insert
            var rowIdx = searchRowIndexBydate('table-weight',dateInput.val());

            if ((rowIdx + 1)  == ($('#table-weight > tbody > tr').length)) {
            	$('#table-weight > tbody > tr').eq(rowIdx).after(builtRowObj);
            }
            else{
            	$('#table-weight > tbody > tr').eq(rowIdx).before(builtRowObj);
            }


            WorkOutModal.modal('hide');
        }
    });
});

function PostToServer(JSONDATA){
	$.ajax({
		method:"POST",
		data:JSONDATA,
		url: PostDataDestination,
		success:function(data){
			//append row or nothing.
		},
		error:function(jqXHR,textStatus,errorThrown){
			alert("ERROR: row data not sent!");
		}
	});
}

function validateWorkOutModal(){
    var valid = true;
    if (dateInput.val() == null || dateInput.val() == '') {
        valid = false;
    }
    if (exerciseInput.val() == null || exerciseInput.val() == '' || !isNaN(exerciseInput.val())) {
        valid = false;
    }
    if (weightInput.val() == null || weightInput.val() == '' || isNaN(weightInput.val())) {
        valid = false;
    }
    if (setsInput.val() == null || setsInput.val() == '' || isNaN(setsInput.val())) {
        valid = false;
    }
    if (repsInput.val() == null || repsInput.val() == '' || isNaN(repsInput.val())) {
        valid = false;
    }

    if(valid == false){
        alert('All textboxes must be filled. And Only Numbers');
        return valid;
    }
    else{
        return valid;
    }
}

function validateSportsModal(){
	var valid = true;

	if (dateInputS.val() == null || dateInputS.val() == '') {
		valid = false;
	}
	if(distanceInputS.val() == null || distanceInputS.val() == '' || isNaN(distanceInputS.val())){
		valid = false;
	}
	if(timeInputS.val() == null || timeInputS.val() == '' || isNaN(timeInputS.val())){
		valid = false;
	}
	if (IntensityInputS.val() == null || IntensityInputS.val() == '' || isNaN(IntensityInputS.val())) {
		valid = false;
	}

	//console.log(valid);

	if(valid == false){
		alert('All textboxes must be filled. And Only Numbers');
		return valid;
	}
	else{
		return valid;
	}
}

function buildWorkoutJSON(){
	return {
		"type":"weights",
		"date":dateInput.val(),
		"exercise":exerciseInput.val(),
		"weight":weightInput.val(),
		"sets":setsInput.val(),
		"reps":repsInput.val()
	};
}

function buildSportSectionJSON(SectionType){
	return {
		"type":SectionType,
		"date":dateInputS.val(),
		"distance":distanceInputS.val(),
		"time":timeInputS.val(),
		"intensity":IntensityInputS.val()
	};
}

function buildWorkoutRow(date,exercise,weight,sets,reps){
    var row = $(document.createElement('TR'));
    row.append($(document.createElement("td")).text(date));
    row.append($(document.createElement("td")).text(exercise));
    row.append($(document.createElement("td")).text(weight));
    row.append($(document.createElement("td")).text(sets));
    row.append($(document.createElement("td")).text(reps));

	var dataCell = $(document.createElement('td'));
	var deletebtn = $(document.createElement('button')).text("Delete Exercise");

	deletebtn.on('click', function(event){
		var Row = $(this).parent().parent();
		//preping JSON for searching purposes
		var JSON =  {
			"type":"weight",
			"date":$($(Row)[0].children[0]).text() ,
			"exercise":$($(Row)[0].children[1]).text() ,
			"weight":$($(Row)[0].children[2]).text() ,
			"sets":$($(Row)[0].children[3]).text() ,
			"reps":$($(Row)[0].children[4]).text() 
		};
		//creating request
		$.ajax({
			method:"POST",
			data:JSON,
			url: DeleteDatadestination,
			success:function(data){
				Row.remove();
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert("ERROR: row data not sent! Row not deleted.");
			}
		});
	});

	deletebtn.addClass('btn btn-danger btn-xs pull-right Delete-Row-Weight');
	dataCell.append(deletebtn);

	row.append(dataCell);

    //console.log(row);
    return row;
}

function buildSportRow(date,distance,time,intensity){
	var row = $(document.createElement('tr'));
	row.append($(document.createElement('td')).text(date));
	row.append($(document.createElement('td')).text(distance + ' mi'));
	row.append($(document.createElement('td')).text(time + ' hr'));
	row.append($(document.createElement('td')).text(intensity));


	var dataCell = $(document.createElement('td'));
	var deletebtn = $(document.createElement('button')).text("Delete Exercise");
	
	deletebtn.on('click', function(event){
		var Row = $(this).parent().parent();
		//preping JSON for searching purposes
		//console.log($(Row.parent().parent()).attr('id').split('-')[1]);

		var JSON = {
			"type":$(Row.parent().parent()).attr('id').split('-')[1],
			"date":$($(Row)[0].children[0]).text(),
			"distance":$($(Row)[0].children[1]).text(),
			"time":$($(Row)[0].children[2]).text(),
			"intensity":$($(Row)[0].children[3]).text()
		};
		//console.log(JSON);
		//creating request
		$.ajax({
			method:"POST",
			data:JSON,
			url: DeleteDatadestination,
			success:function(data){
				Row.remove();
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert("ERROR: row data not sent! Row not deleted.");
			}
		});
	});
	deletebtn.addClass('btn btn-danger btn-xs pull-right Delete-Row-Sport');
	dataCell.append(deletebtn);

	row.append(dataCell);

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

	if (i >= totalRows){
		i = totalRows-1;
	}

	return i;
}

$('#add-run').on('click', function(event){
    SportModal.modal('show');

	//removes previous event listener
	SportSaveButton.unbind();

	SportSaveButton.on('click',function(event){
		if(validateSportsModal() == true){

			PostToServer(buildSportSectionJSON("run"));

			//build row
			var builtRowObj = buildSportRow(dateInputS.val(),
											distanceInputS.val(),
											timeInputS.val(),
											IntensityInputS.val());

			//find correct row to insert
			var rowIdx = searchRowIndexBydate('table-run',dateInputS.val());
			
            if ((rowIdx + 1)  == ($('#table-run > tbody > tr').length)) {
            	$('#table-run > tbody > tr').eq(rowIdx).after(builtRowObj);
            }
            else{
            	$('#table-run > tbody > tr').eq(rowIdx).before(builtRowObj);
            }

			SportModal.modal('hide');
		}
	});
});

$('#add-cycle').on('click', function(event){
    SportModal.modal('show');
    

    //removes previous event listener
	SportSaveButton.unbind();

	SportSaveButton.on('click',function(event){
		if(validateSportsModal() == true){

			PostToServer(buildSportSectionJSON("cycle"));

			//build row
			var builtRowObj = buildSportRow(dateInputS.val(),
											distanceInputS.val(),
											timeInputS.val(),
											IntensityInputS.val());

			//find correct row to insert
			var rowIdx = searchRowIndexBydate('table-cycle',dateInputS.val());
			
			if ((rowIdx + 1)  == ($('#table-cycle > tbody > tr').length)) {
            	$('#table-cycle > tbody > tr').eq(rowIdx).after(builtRowObj);
            }
            else{
            	$('#table-cycle > tbody > tr').eq(rowIdx).before(builtRowObj);
            }

			SportModal.modal('hide');
		}
	});
});

$('#add-swim').on('click', function(event){
    SportModal.modal('show');
    

    //removes previous event listener
	SportSaveButton.unbind();

	SportSaveButton.on('click',function(event){
		if(validateSportsModal() == true){

			PostToServer(buildSportSectionJSON("swim"));

			//build row
			var builtRowObj = buildSportRow(dateInputS.val(),
											distanceInputS.val(),
											timeInputS.val(),
											IntensityInputS.val());

			//find correct row to insert
			var rowIdx = searchRowIndexBydate('table-swim',dateInputS.val());
			
			if ((rowIdx + 1)  == ($('#table-swim > tbody > tr').length)) {
            	$('#table-swim > tbody > tr').eq(rowIdx).after(builtRowObj);
            }
            else{
            	$('#table-swim > tbody > tr').eq(rowIdx).before(builtRowObj);
            }

			SportModal.modal('hide');
		}
	});
});




$('.Delete-Row-Weight').on('click', function(event){
	var Row = $(this).parent().parent();
	//preping JSON for searching purposes
	var JSON =  {
		"type":"weight",
		"date":$($(Row)[0].children[0]).text() ,
		"exercise":$($(Row)[0].children[1]).text() ,
		"weight":$($(Row)[0].children[2]).text() ,
		"sets":$($(Row)[0].children[3]).text() ,
		"reps":$($(Row)[0].children[4]).text() 
	};
	//creating request
	$.ajax({
		method:"POST",
		data:JSON,
		url: DeleteDatadestination,
		success:function(data){
			Row.remove();
		},
		error:function(jqXHR,textStatus,errorThrown){
			alert("ERROR: row data not sent! Row not deleted.");
		}
	});
});

$('.Delete-Row-Sport').on('click', function(event){
	var Row = $(this).parent().parent();
	//preping JSON for searching purposes
	//console.log($(Row.parent().parent()).attr('id').split('-')[1]);

	var JSON = {
		"type":$(Row.parent().parent()).attr('id').split('-')[1],
		"date":$($(Row)[0].children[0]).text(),
		"distance":$($(Row)[0].children[1]).text(),
		"time":$($(Row)[0].children[2]).text(),
		"intensity":$($(Row)[0].children[3]).text()
	};
	//console.log(JSON);
	//creating request
	$.ajax({
		method:"POST",
		data:JSON,
		url: DeleteDatadestination,
		success:function(data){
			Row.remove();
		},
		error:function(jqXHR,textStatus,errorThrown){
			alert("ERROR: row data not sent! Row not deleted.");
		}
	});
});

