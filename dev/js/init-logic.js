export function initApi(renderForm) {
  const apiKey = require('./../../.env').apiKey;

  const xhr = $.get(`https://api.betterdoctor.com/2016-03-01/practices?location=45.523%2C-122.676%2C100&user_key=${apiKey}`);
  xhr.done(function(specialties){
    console.log(specialties);
    renderForm(specialties);
  });
}
