import { initApi } from '../dev/js/init-logic.js';
import { findDoctor } from '../dev/js/main-logic.js';

$(function(){
	initApi(renderForm);
	$('#filters').submit(function(event){
		event.preventDefault();
		const filters = {};
		$('#results').text("");
		$('*[name=filter]').each(function(){ //put each filter pair into the filters object if its filled out
			let key = $(this).attr('id');
			let value = $(this).val();
			if (value) {
				filters[key] = value;
			}
		}); //end loop
		console.log(filters);
		if ($.isEmptyObject(filters)) {
			alert("ya ain't can't search for nothin'!")
		} else {
			findDoctor(filters, render);
		}
	}); //end submit
});

function renderForm(results){
	results.data.forEach(function(option){
		let value = option.uid;
		let display = option.name;
		let category = option.category;
		$("select optgroup[label=" + category + "]").append(`<option value="${value}">${display}</option>`);
	});
}

function render(results){
	if (results.meta.count != 0) {
		$('#count').text(results.meta.total);
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

	if (doctor.practices[0].visit_address.street2) {
		address2 = doctor.practices[0].visit_address.street2 + '<br>';
	};
	doctor.practices[0].phones.forEach(function(phone){
		let formattedNum = `${phone.number.substr(0, 3)}-${phone.number.substr(3, 3)}-${phone.number.substr(6, 4)}`
		console.log(formattedNum);
		phoneStr += `<div><span class="sub-meta-title">${phone.type}:</span> ${formattedNum}</div>`
	});
	if (!doctor.practices[0].accepts_new_patients) {
		accepting = `Not currently `
	}
	// if ()

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
				<span class="meta-title">Website:</span> <a href="#">n/a</a>
			</div>
			<div class="meta">
				<span class="meta-title">${accepting}accepting patients</span>
			</div>
		</div>
	</div>`
}
