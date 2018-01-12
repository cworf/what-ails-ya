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
		$('*[name=filter]').each(function () {
			//put each filter pair into the filters object if its filled out
			var key = $(this).attr('id');
			var value = $(this).val();
			console.log(key);
			console.log(value);
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

	function render(results) {}
});

function findDoctor(filters) {
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
		console.log(results);
	});
}

},{"./../.env":1}]},{},[2]);
