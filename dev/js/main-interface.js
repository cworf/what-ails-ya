import { initApi } from '../dev/js/init-logic.js';
import Doctor from '../dev/js/doctor-class.js';
import {locApi} from '../dev/js/location-logic.js';
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
});

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
			currentList[i].id = i;
			$('#results').append(currentList[i].createTemplate());
		}
		currentList.forEach(function(listing){

		});
	} else {
		alert("hmm, you gotta use better search terms. This search came up empty...");
	}
}
