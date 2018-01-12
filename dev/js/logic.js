export function findDoctor(filterName, filterValue){
	const apiKey = require('./../../.env').apiKey;
	for (var i = 0; i < filterName.length; i++) {
		filterName[i];
	}
	const filterString = ``
	const xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523%2C-122.676%2C100&${filterString}&skip=0&limit=10&user_key=${apiKey}`);
	xhr.done(function(results){

	});
}
