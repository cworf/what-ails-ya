export function findDoctor(filters){ //filters is an object of various filter objects
	const apiKey = require('./../.env').apiKey;
	const filterArr = [];
	for (var key in filters) { //loop through filter object and concat its key-value into the filter array
		if (filters.hasOwnProperty(key)) {
			filterArr.push(key + "=" + filters[key]);
		}
	}
	const queryString = filterArr.join('&'); //create query string from filter array separated by '&'
	const xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=45.523%2C-122.676%2C100&${queryString}&skip=0&limit=10&user_key=${apiKey}`);

	xhr.done(function(results){
		console.log(results);
	});
}
