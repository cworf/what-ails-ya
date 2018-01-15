import { initApi } from '../dev/js/init-logic.js';
import Doctor from '../dev/js/doctor-class.js';
import { locApi } from '../dev/js/location-logic.js';
import { findDoctor } from '../dev/js/main-logic.js';

let currentList = [];
const favorites = [];

$(function(){
	initApi(renderForm);
	$('#filters').submit(function(event){
		event.preventDefault();
		const filters = {},
			location = $('#address').val(),
			distance = $('#distance').val();

		currentList = [];
		$('#results').text("");//clear the board
		$('*[name=filter]').each(function(){ //put each filter pair into the filters object if its filled out
			let key = $(this).attr('id');
			let value = $(this).val();
			if (value) {
				filters[key] = value;
			}
		}); //end loop

		if ($.isEmptyObject(filters) && !location) {
			alert("ya ain't can't search for nothin'!");
		} else if (location) {
			if (distance) {
				locApi(location, distance, filters, render, findDoctor);
			} else {
				alert("I need to know how far out to look");
			}
		} else {
			findDoctor(filters, render);
		}
	}); //end submit
});//end document ready

//function renders grouped select box
function renderForm(specialties){
	specialties.data.forEach(function(option){
		let value = option.uid;
		let display = option.name;
		let category = option.category;
		$("select optgroup[label=" + category + "]").append(`<option value="${value}">${display}</option>`);
	});
}

//function renders final results
function render(results, clientAddress){
	if (clientAddress) {
		$('#results-meta').text(`Found ${results.meta.total} wizards within ${clientAddress.distance} miles of ${clientAddress.address}`);
	} else {
		$('#results-meta').text(`Found ${results.meta.total} wizards`);
	}
	if (results.meta.count != 0) {
		results.data.forEach(function(doctor){
			currentList.push(new Doctor(doctor)); //create doctor object and push to global array
		}); //end loop

		for (var i = 0; i < currentList.length; i++) {
			$('#results').append(currentList[i].createTemplate(i));
		}
		$('.favorite-btn').click(function(){
			const i = $(this).parent().attr('id-data');
			saveDr(i);
		});
	} else {
		alert("hmm, you gotta use better search terms. This search came up empty...");
	}
}

//saves doctor to favorites list
function saveDr(index){
	favorites.push(currentList[index])
	refreshFavs();
}

function removeDr(index){
	favorites.splice(index, 1);
	refreshFavs()
}

function refreshFavs(){
	$('#favorites').text('');
	for (var i = 0; i < favorites.length; i++) {
		$('#favorites').append(favorites[i].createTemplate(i, true))
	}
	$('.remove-btn').click(function(){
		const whichOne = $(this).parent().attr('id-data');
		removeDr(whichOne);
	});
}
