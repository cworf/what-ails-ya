export function findDoctor(filters, render, renderSearches, address){ //filters is an object of various filter objects
	const apiKey = require('./../../.env').apiKey;
	const filterArr = [];
	for (var key in filters) { //loop through filter object and concat its key-value into the filter array
		if (filters.hasOwnProperty(key)) {
			filterArr.push(key + "=" + filters[key]);
		}
	}
	const queryString = filterArr.join('&'); //create query string from filter array separated by '&'
	console.log(queryString);
	$.get(`https://api.betterdoctor.com/2016-03-01/doctors?${queryString}&skip=0&limit=10&user_key=${apiKey}`)
	.done(function(results){
		console.log(renderSearches);
		render(filters, results, address);
		const meta = results.meta
		renderSearches(filters, address);
		console.log(filters);
	})
	.fail(function(error){
		console.log(error);
		alert("If you are searching by practice, you must select any additional filter to narrow your results.");
	});
}
