import { initApi } from '../dev/js/init-logic.js';
import {locApi} from '../dev/js/location-logic.js';
import { findDoctor } from '../dev/js/main-logic.js';

$(function(){
	initApi(renderForm);
	$('#filters').submit(function(event){
		event.preventDefault();
		const filters = {};
		const location = $('#address').val();
		const distance = $('#distance').val();

		$('#results').text("");//clear the board
		$('*[name=filter]').each(function(){ //put each filter pair into the filters object if its filled out
			let key = $(this).attr('id');
			let value = $(this).val();
			if (value) {
				filters[key] = value;
			}
		}); //end loop

		if ($.isEmptyObject(filters) && !address) {
			alert("ya ain't can't search for nothin'!");
		} else if (location) {
			if (distance) {
				locApi(location, distance, filters, render, findDoctor);
			} else {
				alert("I need to know where how far out to look")
			}
		} else {
			findDoctor(filters, render);
		}
	}); //end submit
});

//function renders grouped select box
function renderForm(results){
	results.data.forEach(function(option){
		let value = option.uid;
		let display = option.name;
		let category = option.category;
		$("select optgroup[label=" + category + "]").append(`<option value="${value}">${display}</option>`);
	});
}

//function renders final results
function render(results, address){
	if (address) {
		$('#results-meta').text(`Found ${results.meta.total} wizards within ${address.distance} miles from ${address.address}`)
	} else {
		$('#results-meta').text(`Found ${results.meta.total} wizards`);
	}
	if (results.meta.count != 0) {
		results.data.forEach(function(doctor){
			$('#results').append(template(doctor))
		}); //end loop
	} else {
		alert("hmm, you gotta use better search terms. This search came up empty...");
	}
}

function template(doctor){
	let address2 = '';
	let phoneStr = "";
	let accepting = `Currently `;
	let title;
	let website = ``;

	if (doctor.practices[0].visit_address.street2) {
		address2 = doctor.practices[0].visit_address.street2 + '<br>';
	};
	doctor.practices[0].phones.forEach(function(phone){
		let formattedNum = `${phone.number.substr(0, 3)}-${phone.number.substr(3, 3)}-${phone.number.substr(6, 4)}` //format number into string
		console.log(formattedNum);
		phoneStr += `<div><span class="sub-meta-title">${phone.type}:</span> ${formattedNum}</div>`
	});
	if (!doctor.practices[0].accepts_new_patients) {
		accepting = `Not currently `
	}
	if (doctor.practices[0].website) {
		website = doctor.practices[0].website;
	}

	//this is the output template
	return `<div class="doctor">
		<div class="picture">
			<img src="${doctor.profile.image_url}" alt="">
		</div>
		<h3>${doctor.profile.first_name} ${doctor.profile.last_name}</h3>
		<div class="meta-box">
			<div class="meta">
				<span class="meta-title">Address:</span>
				<div>
					${doctor.practices[0].visit_address.street}<br>${address2}
					${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}<br>
					${doctor.practices[0].visit_address.zip}
				</div>
			</div>
			<div class="meta">
				<span class="meta-title">Phones:</span> ${phoneStr}
			</div>
			<div class="meta">
				<span class="meta-title">Website:</span> <a href="${website}">${website}</a>
			</div>
			<div class="meta">
				<span class="meta-title">${accepting}accepting patients</span>
			</div>
		</div>
	</div>`
}
