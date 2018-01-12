(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "72fdfcf8a79b5bc7179ed1b512815336"

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findDoctor = findDoctor;

$(function () {
	$('#filters').submit(function (event) {
		event.preventDefault();
		var filters = {};
		$('#results').text("");
		$('*[name=filter]').each(function () {
			//put each filter pair into the filters object if its filled out
			var key = $(this).attr('id');
			var value = $(this).val();
			if (value) {
				filters[key] = value;
			}
		}); //end loop
		if (filters) {
			findDoctor(filters, render);
		} else {
			alert("ya ain't can't search for nothin'!");
		}
	}); //end submit

	function render(results) {
		if (results.meta.count != 0) {

			$('#count').text(results.meta.total);
			results.data.forEach(function (doctor) {
				$('#results').append(template(doctor));
			}); //end loop
		}
	}
});

function template(doctor) {
	var address2 = '';
	var phoneStr = "";
	var accepting = 'Currently ';
	var title = void 0;

	if (doctor.practices[0].visit_address.street2) {
		address2 = doctor.practices[0].visit_address.street2 + '<br>';
	};
	doctor.practices[0].phones.forEach(function (phone) {
		var formattedNum = phone.number.substr(0, 3) + '-' + phone.number.substr(3, 3) + '-' + phone.number.substr(6, 4);
		console.log(formattedNum);
		phoneStr += '<div><span class="sub-meta-title">' + phone.type + ':</span> ' + formattedNum + '</div>';
	});
	if (!doctor.practices[0].accepts_new_patients) {
		accepting = 'Not currently ';
	}
	// if ()

	return '<div class="doctor">\n\t\t<div class="picture">\n\t\t\t<img src="' + doctor.profile.image_url + '" alt="">\n\t\t</div>\n\t\t<h3>' + doctor.profile.first_name + ' ' + doctor.profile.last_name + '</h3>\n\t\t<div class="meta-box">\n\t\t\t<div class="meta">\n\t\t\t\t<span class="meta-title">Address:</span>\n\t\t\t\t<div>\n\t\t\t\t\t' + doctor.practices[0].visit_address.street + '<br>' + address2 + '\n\t\t\t\t\t' + doctor.practices[0].visit_address.city + ', ' + doctor.practices[0].visit_address.state + '<br>\n\t\t\t\t\t' + doctor.practices[0].visit_address.zip + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="meta">\n\t\t\t\t<span class="meta-title">Phones:</span> ' + phoneStr + '\n\t\t\t</div>\n\t\t\t<div class="meta">\n\t\t\t\t<span class="meta-title">Website:</span> <a href="#">n/a</a>\n\t\t\t</div>\n\t\t\t<div class="meta">\n\t\t\t\t<span class="meta-title">' + accepting + 'accepting patients</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>';
}

function findDoctor(filters, render) {
	//filters is an object of various filter objects
	var apiKey = require('./../.env').apiKey;
	var filterArr = [];
	for (var key in filters) {
		//loop through filter object and concat its key-value into the filter array
		if (filters.hasOwnProperty(key)) {
			filterArr.push(key + "=" + filters[key]);
		}
	}
	var queryString = filterArr.join('&'); //create query string from filter array separated by '&'
	var xhr = $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=45.523%2C-122.676%2C100&' + queryString + '&skip=0&limit=10&user_key=' + apiKey);

	xhr.done(function (results) {

		render(results);
	});
}

},{"./../.env":1}]},{},[2]);
