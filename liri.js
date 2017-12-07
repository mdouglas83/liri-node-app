if (process.argv.length === 2) {
	console.log("2 arg default action");
} else {
	var pFour = process.argv[3];
	for (i = 4; i < process.argv.length; i++) {
		pFour += " " + process.argv[i];
	}
	switch (process.argv[2]) {
		case "my-tweets":
			goTweet();
			break;
		case "spotify-this-song":
			goSpotify();
			break;
		case "movie-this":
			goMovie();
			break;
		case "do-what-it-says":
			var fs = require("fs");
			fs.readFile("random.txt", "utf8", function(error, data) {
			  if (error) {
			    return console.log(error);
			  }
			  var dataArr = data.split(",");
			  pFour = dataArr[1];
			  switch (dataArr[0]) {
				case "my-tweets":
					goTweet();
					break;
				case "spotify-this-song":
					goSpotify();
					break;
				case "movie-this":
			  		goMovie();
			  		break;
			  	default:
			  		console.log("invalid request");
			  }
			});
			break;
		default:
			console.log("3 arg default action");
	}
}

function goTweet() {
	var Twitter = require('twitter');
	var twitterKeys = require('./keys.js').twitterKeys;
	var twitterParams = require('./keys.js').twitterParams;
	var client = new Twitter(twitterKeys);
	client.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
	  if (!error) {
	  	for (i = 0; i < tweets.length && i < 20; i++) {
	  		console.log(tweets[i].created_at, tweets[i].text);
	  	}
	  }
	});
}

function goSpotify() {
if (pFour == undefined) pFour = "Ace of Base The Sign";
	var Spotify = require('node-spotify-api');
	var spotifyKeys = require('./keys.js').spotifyKeys;
	var spotify = new Spotify(spotifyKeys);
	spotify.search({type: 'track', query: pFour}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		// console.log(data.tracks.items[1]);
		for (i = 0; i < data.tracks.items.length; i++) {
			for (j = 0; j < data.tracks.items[i].artists.length; j++) {
				console.log("Artist: " + data.tracks.items[i].artists[j].name);
			}
			console.log("Track: " + data.tracks.items[i].name);
			console.log("Preview: " + data.tracks.items[i].external_urls.spotify);
			console.log("Album: " + data.tracks.items[i].album.name);
			console.log("");
		}
	});
}

function goMovie() {
	var omdb = require('omdb');
	omdb.get({title: pFour}, function(err, movie) {
		if(err) {
			return console.error(err);
		}
	    if(movies.length < 1) {
	        return console.log('No movies were found!');
	    }
	    movies.forEach(function(movie) {
	        console.log('Title: ' + movie.title);
	        console.log('Year: ' + movie.year);
	        console.log('IMDB Rating: ' + movie.ratings[0].value);
	        console.log('Rotten Tomatoes Rating: ' + movie.ratings[1].value);
	        console.log('Country: ' + movie.country);
	        console.log('Language: ' + movie.language);
	        console.log('Plot: ' + movie.plot);
	        console.log('Actors: ' + movie.actors);
	        console.log('');
	    });
	});
}