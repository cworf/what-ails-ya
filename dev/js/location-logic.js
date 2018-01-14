//this file converts city data to coordinates
export function locApi(location, filters, render, findDoctor) {
  const locApi = require('./../../.env').locApiKey;

  const xhr = $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${locApi}`);
  xhr.done(function(data){
	  //extraploate coordinates from json
	  console.log(data);
	  let geo = data.results[0].geometry.location.lat + "%2C" + data.results[0].geometry.location.lng;

	  filters.location = geo;
	  console.log(filters);
	  findDoctor(filters, render)
  });
}
