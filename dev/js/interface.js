
$(function(){
	$('#filters').submit(function(event){
		event.preventDefault();
		const filters = {};
		$('*[name=filter]').each(function(){ //put each filter pair into the filters object if its filled out
			let key = $(this).attr('id');
			let value = $(this).val();
			if (value) {
				filters[key] = value;
			}
		}); //end loop
		if (filters) {
			findDoctor(filters, render);
		} else {
			alert("ya ain't can't search for nothin'!")
		}
	}); //end submit

	function render(results){
		if (results.meta.count != 0) {

			$('#count').text(results.meta.total);
			results.data.forEach(function(doctor){
				$('#results').append(template(doctor))
			}); //end loop
		}
	}
});

function template(doctor){
	let address2 = '';
	let phoneStr = "";
	let accepting = `Currently `;

	if (doctor.practices[0].visit_address.street2) {
		address2 = doctor.practices[0].visit_address.street2 + '<br>';
	};
	doctor.practices[0].phones.forEach(function(phone){
		phoneStr += `<div><span class="sub-meta-title">${phone.type}:</span> ${phone.number}</div>`
	});
	if (!doctor.practices[0].accepts_new_patients) {
		accepting = `Not currently `
	}

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
