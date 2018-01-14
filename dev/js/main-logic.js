export function findDoctor(filters, render, address){ //filters is an object of various filter objects
	const apiKey = require('./../../.env').apiKey;
	const filterArr = [];
	for (var key in filters) { //loop through filter object and concat its key-value into the filter array
		if (filters.hasOwnProperty(key)) {
			filterArr.push(key + "=" + filters[key]);
		}
	}
	const queryString = filterArr.join('&'); //create query string from filter array separated by '&'
	console.log(queryString);
	const xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?${queryString}&skip=0&limit=10&user_key=${apiKey}`);

	xhr.done(function(results){
		render(results, address)
	});
}
