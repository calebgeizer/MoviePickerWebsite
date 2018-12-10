window.onload = function() {
	var id = 'root';
	var instance = movieInst("2", "Drama|Crime","4140","Ariel");
	var template = movieTemplate(instance);

	console.log(template);
	inject(template, id);


	//finder

	document.getElementById('file').addEventListener('change', function(){
		var file = this.files[0];

		var reader = new FileReader();
		reader.onload = function(progressEvent){

		  var lines = this.result.split('\n');
		  for(var line = 1; line < lines.length; line++){
		    //console.log(lines[line]);
		    // Starts at 16
		    var items = lines[line].split(',');
		    var genre = "";
		    var genres = ['action', 'adult', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'film noir', 'game show', 'history', 'horror', 'music', 'musical', 'mystery', 'news', 'reality tv', 'romance', 'scifi', 'short', 'sport', 'talkshow', 'thriller', 'war', 'western'];
		    for (var i = items.length - 1; i >= 0; i--) {
		    	if (i >= 16 && items[i] == 1) {
		    		genre = genre + " " + genres[i-16];
		    	}
		    }
		    var instance = movieInst(items[1],genre, items[7], items[2]);
		    var template = movieTemplate(instance);
		    inject(template, id);
		  }
		};
		reader.readAsText(file);
	});
}

	function search() {
		var items = document.getElementById('root').getElementsByTagName('div');
		for (var i = items.length - 1; i >= 0; i--) {
			var search = document.forms["searchForm"]["searchInput"].value;
			if (items[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
				items[i].setAttribute('style', 'display:block;');
				console.log('true');
			}else{
				items[i].setAttribute('style', 'display:none;');
				console.log('false');
			}
		}
	}

	// injector
	function inject(code, id) {
		var placement = document.getElementById(id);
		placement.appendChild(code);
	}


	//item object
	function movieInst(id_inst, genres_inst, runtime_inst, title_inst ) {
		var movieInst = {
			id:id_inst,
			genres:genres_inst,
			title:title_inst,
			runtime:runtime_inst
		};

		return movieInst;
	}

	//template
	function movieTemplate(movieInst) {
		var movieItem = document.createElement('div');
		movieItem.innerHTML = "<input type=\"checkbox\" name=\"movie\"> " + movieInst.title + ", " + movieInst.genres + ", " + (movieInst.runtime/60) + "mins";

		return movieItem;
	}

	//generate ID
	function makeid() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 5; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	}


/*

	Create as a JSON file using http://www.json2html.com/ ????

	Create a backend that keeps track of all the generated urls.

	1. Attach NodeJS backend
	2. Append JSON file to add in new urls
	3. Check URL and paste in the data from the JSON file.
		- Rank by score.


	- Auto-delete based on age.

*/
