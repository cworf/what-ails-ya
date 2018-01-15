### JS Week 2 Code Review - Epicodus

# What Ails Ya?

### Author: Colin Worf

## Description

This is a project which uses ajax API calls to display a list of doctors anywhere in the united states.
The user can do the following:

- search for name, ailment, practice, and x distance from any location
- add and remove from favorites list
- view and re-search previous searches
- search any number of times without clearing the Favorites

Every way to break this program is stopped with an error message, and as far as I am aware it is bug free at the time of writing this.

in the back end, the program makes an API call upon page load to gather and display an updated list of practices in a drop down, sorted out into their own 5 categories.

if the user selects a location, the program routes the filter data through the google geolocator API first, converts the location into coordinates, and adds it to the filter object to be then run through the Better Doctor API.

a set of filters which yeilds results is saved as an object in an array and displayed in the recent searches section with its unique index number saved in a custom html attribute, so it can be sent back through the Better Doctor API upon click.

saving a favorite adds the object to a separate array which functions similar to the saved searches except clicking the button removes the item from the array and refreshes the output as well as the html attribute's numbers.

If I had more time for this one I would have attempted a pagination list.

## Instructions

1. Clone project ```$ git clone https://github.com/cworf/what-ails-ya.git ```
2. you must have Node.js, Bower, and Gulp installed to build the Program
3. from the projects root, run ```$ npm i``` and ```$ bower i```
4. from the root, run ```$ gulp build```, then if no errors, run ```$ gulp serve``` to start the program
5. create a file named .env in the project root and add this to it: ```exports.apiKey = "[YOUR BETTER DOCTOR API HERE]";
exports.locApiKey = "YOUR GOOGLE MAPS API HERE"```
6. be sure you activate the google maps geocoding api on your google dev project or the api key you create will not be able to access it. it does not happen automatically.

## Thoughts and Feedback

API's are so much fun!! It feels like all of a sudden the world of data is now available to me to play with.

## Copyright

Creative Commons
