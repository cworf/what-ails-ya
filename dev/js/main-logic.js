export function findDoctor(filters, render, renderSearches, address){ //filters is an object of various filter objects
	const apiKey = require('./../../.env').apiKey;
	const filterArr = [];
	for (var key in filters) { //loop through filter object and concat its key-value into the filter array
		if (filters.hasOwnProperty(key)) {
			filterArr.push(key + "=" + filters[key]);
		}
	}
	console.log(filters);

	const queryString = filterArr.join('&'); //create query string from filter array separated by '&'
	console.log(queryString);
	$.get(`https://api.betterdoctor.com/2016-03-01/doctors?${queryString}&skip=0&limit=10&user_key=${apiKey}`)
	.done(function(results){
		console.log(results);
		render(filters, results, address);
		if (results.meta.count != 0) {
			renderSearches(filters, address, queryString);
		}
	})
	.fail(function(error){
		alert("If you are searching by practice, you must select any additional filter to narrow your results.");
	});
}
