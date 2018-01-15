import { initApi } from '../dev/js/init-logic.js';
import Doctor from '../dev/js/doctor-class.js';
import { locApi } from '../dev/js/location-logic.js';
import { findDoctor } from '../dev/js/main-logic.js';

const favorites = [];
let currentList = [];
let practiceName = "";

$(function(){
	initApi(renderForm);
	$('#filters').submit(function(event){
		event.preventDefault();
		practiceName = $('#specialty_uid').val() ? $('#specialty_uid option[value=' + $('#specialty_uid').val() + ']').text() : "";
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
				locApi(location, distance, filters, render, findDoctor, renderSearches);
			} else {
				alert("I need to know how far out to look");
			}
		} else {
			findDoctor(filters, render, renderSearches);
		}
	}); //end submit
});//end document ready
