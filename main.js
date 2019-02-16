let templateString = document.getElementById('result-template').innerHTML;
let renderTemplate = Handlebars.compile(templateString);

Handlebars.registerHelper('commas', function (subs) {
  return subs.toLocaleString(); //adding the commas helper function
});



$('#form').on('submit', function(event) {

	$('#loader').html('Loading...');

	$('#loader').addClass("loader");

	console.log(templateString);



	var input = $('#input').val().trim();

		let promise = $.ajax({
			type: 'get',
			url: `https://www.reddit.com/r/${input}.json`
		});

		promise.then(function(post){
			$('#loader').html('').removeClass("loader");	

			let renderedPost = renderTemplate({
				subredditPost: post.data.children });
			$('#form').append(renderedPost);
		}, function(){
			$('#loader').html('').removeClass("loader");
			$('#loader').html('Oops, something went wrong!').addClass('error');
		});

	return false;

});



