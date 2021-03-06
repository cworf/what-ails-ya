//this file imports a list of practices for selection
export function initApi(renderForm) {
  const apiKey = require('./../../.env').apiKey;

	$.get(`https://api.betterdoctor.com/2016-03-01/specialties?location=45.523%2C-122.676%2C100&user_key=${apiKey}`)
		.done(function(specialties){
    		renderForm(specialties);
  		});
}
