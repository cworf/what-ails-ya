
//function renders grouped select box
function renderForm(specialties){
	specialties.data.forEach(function(option){
		let value = option.uid;
		let display = option.name;
		let category = option.category;
		$("select optgroup[label=" + category + "]").append(`<option value="${value}">${display}</option>`);
	});
}

//function renders final results
function render(filter, results, clientAddress){
	console.log(filter);
	if (clientAddress) {
		$('#results-meta').text(`Found ${results.meta.total} wizards within ${clientAddress.distance} miles of ${clientAddress.address}`);
	} else {
		$('#results-meta').text(`Found ${results.meta.total} wizards`);
	}
	if (results.meta.count != 0) {
		results.data.forEach(function(doctor){
			currentList.push(new Doctor(doctor)); //create doctor object and push to global array
		}); //end loop

		for (var i = 0; i < currentList.length; i++) {
			$('#results').append(currentList[i].createTemplate(i));
		}
		$('.favorite-btn').click(function(){
			const i = $(this).parent().attr('id-data');
			saveDr(i);
		});
	} else {
		alert("hmm, you gotta use better search terms. This search came up empty...");
	}
}

//render's last search
function renderSearches(filter, address, queryString){
	console.log(filter);
	let name = filter.name ? `with a name kinda like <strong>${filter.name}</strong>` : ``,
		practice = filter.specialty_uid ? `who practice <strong>${practiceName}</strong>` : ``,
		location = filter.location ? `somewhere near <strong>${address.address}</strong>,` : ``,
		ailment = filter.query ? `so they can fix your <strong>${filter.query}</strong>` : ``;
	const result = `<div class="search">
		Searched for all doctors ${name} ${practice} ${location} ${ailment}.
		<button class="search-again" query-data="${favorites.length}">Search again</button>
	</div>`;
	favorites.push(filter);
	$('#searches').append(result);
	$('.search').last().children('button').click(function(){
		currentList = [];
		$('#results').text("");//clear the board
		const queryData = $(this).attr('query-data');
		const newFilter = favorites[queryData];
		findDoctor(newFilter, render);
	});

}

//saves doctor to favorites list
function saveDr(index){
	favorites.push(currentList[index]);
	refreshFavs();
}
//remove doctor from favorites list
function removeDr(index){
	favorites.splice(index, 1);
	refreshFavs();
}
//refresh favs list after add or remove
function refreshFavs(){
	$('#favorites').text('');
	for (var i = 0; i < favorites.length; i++) {
		$('#favorites').append(favorites[i].createTemplate(i, true));
	}
	$('.remove-btn').click(function(){
		const whichOne = $(this).parent().attr('id-data');
		removeDr(whichOne);
	});
}
