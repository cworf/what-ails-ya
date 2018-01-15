export default class Doctor{
	constructor(doctor) {
		this.id;
		this.name = doctor.profile.first_name + " " + doctor.profile.last_name;
		this.address = doctor.practices[0] ? doctor.practices[0].visit_address.street : "not available";
		this.address2 = doctor.practices[0] ? (doctor.practices[0].visit_address.street2 ? `${doctor.practices[0].visit_address.street2} <br>` : "") : "";
		this.city = doctor.practices[0] ? doctor.practices[0].visit_address.city  : "";
		this.state = doctor.practices[0] ? doctor.practices[0].visit_address.state  : "";
		this.zip = doctor.practices[0] ? doctor.practices[0].visit_address.zip  : "";
		this.phones = doctor.practices[0] ? this.formatNum(doctor.practices[0].phones)  : "not available"; //outputs preformatted string with html
		this.website = doctor.practices[0] ? (doctor.practices[0].website ? doctor.practices[0].website : "not available") : "not available";
		this.currentlyAccepting = doctor.practices[0] ? doctor.practices[0].accepts_new_patients ? "Currently" : "Not currently"  : "Not currently";
		this.picture = doctor.profile.image_url;
	}

	formatNum(phones){
		let phoneStr = "";
		phones.forEach(function(phone){
			let formattedNum = `${phone.number.substr(0, 3)}-${phone.number.substr(3, 3)}-${phone.number.substr(6, 4)}`; //format number into string
			phoneStr += `<div><span class="sub-meta-title">${phone.type}:</span> ${formattedNum}</div>`;
		});
		return phoneStr;
	}

	createTemplate() {
		return `<div class="doctor" listing-data="${this.id}">
			<div class="picture">
				<img src="${this.picture}" alt="">
			</div>
			<h3>${this.name}</h3>
			<div class="meta-box">
				<div class="meta">
					<span class="meta-title">Address:</span>
					<div>
						${this.address}<br>
						${this.address2}
						${this.city}, ${this.state} ${this.zip}
					</div>
				</div>
				<div class="meta">
					<span class="meta-title">Phones:</span> ${this.phones}
				</div>
				<div class="meta">
					<span class="meta-title">Website:</span> <a href="${this.website}">${this.website}</a>
				</div>
				<div class="meta">
					<span class="meta-title">${this.currentlyAccepting} accepting patients</span>
				</div>
			</div>
		</div>`;
	}
}