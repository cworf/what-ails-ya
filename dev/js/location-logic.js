//this file converts city data to coordinates
export function locApi(location, distance, filters, render, findDoctor) {
  const locApi = require('./../../.env').locApiKey;

  const xhr = $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${locApi}`);
  xhr.done(function(data){
	  //extraploate coordinates from json
	  let geo = data.results[0].geometry.location.lat + "%2C" + data.results[0].geometry.location.lng + "%2C" + distance; //build string

	  filters.location = geo; //add this to the filter

	  findDoctor(filters, render)
  });
}
