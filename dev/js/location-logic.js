//this file converts city data to coordinates
export function locApi(location, distance, filters, render, findDoctor, renderSearches) {
  const locApi = require('./../../.env').locApiKey;

  const xhr = $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${locApi}`) //AIzaSyA2NK6Edn1Xjqqu5_KgchS6_vvJ1H1oqxA
  .done(function(data){
	  //extraploate coordinates from json
	  const geo = data.results[0].geometry.location.lat + "%2C" + data.results[0].geometry.location.lng + "%2C" + distance; //build string
	  filters.location = geo; //add this to the filter
	  const searchFor = {};
	  searchFor.address = data.results[0].formatted_address;
	  searchFor.distance = distance;

	  findDoctor(filters, render, renderSearches, searchFor);
  })
  .fail(function(error){
	  alert(error.responseJSON.error_message);
  });
}
