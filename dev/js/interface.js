
$(function(){
	$('#filters').submit(function(event){
		event.preventDefault();
		const filters = {};
		$('*[name=filter]').each(function(){ //put each filter pair into the filters object if its filled out
			let key = $(this).attr('id');
			let value = $(this).val();
			console.log(key);
			console.log(value);
			if (value) {
				filters[key] = value;
			}
		}); //end loop
		if (filters) {
			findDoctor(filters, render);
		} else {
			alert("ya ain't can't search for nothin'!")
		}
	}); //end submit

	function render(results){

	}
});
