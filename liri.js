var request = require('request');
var fs = require('fs');

var Twitter = require('twitter');
var keys = require('./keys.js')
var tweetKeys = keys.twitterKeys;
var client = new Twitter(tweetKeys);

var spotify = require('spotify');

var command = process.argv[2];
var argument = process.argv[3];

switch (command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}


// Twitter

function myTweets() {
   
    var params = { screen_name: 'Ornella_Hdz', "count": 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < tweets.length; i++) {
                output = ('\n' + '@' + params.screen_name + ' said ' + tweets[i].text + ' at ' + tweets[i].created_at + '\n');
                console.log(output);
            }
        } else {
            console.log('twitter error');
        }
    });
}

//spotify 

function spotifyThisSong(userSpotInput){
	spotify.search({type: 'track',query: userSpotInput}, function(err, userSpotInput,response) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;	       
	    
	    }else{

	    	  for (i=0; i<data.tracks.items.length; i++){
		    console.log('');
		    console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
		    console.log("Track Name: " + data.tracks.items[i].name);
		    console.log("Album Name: " + data.tracks.items[i].album.name);
		    console.log("Preview Link: " + data.tracks.items[i].preview_url);
		    }
	    }

	});

};



	    	
// 	    	var userSI = userSpotInput.tracks.items[0];
// 	  		var spotifyOutput = "Artist: " + userSI.artists[0].name + "\n" +
// 	  			"Song Name: " + userSI.name + "\n" +
// 	  			"Spot Link: " + userSI.external_urls.spotify + "\n" +
// 	  			"Album: " + userSI.album.name + "\n";
// 	  		console.log(spotifyOutput);
// 	  		// logText(spotifyOutput);			
// 	    }
	  
	    
// 	});
// }


// OMBD
function movieThis(){
var nodeArgs = process.argv;
var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  } else {

    movieName += nodeArgs[i];

  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    console.log(
    				"Movie Title: " + JSON.parse(body).Title,
					"Release Year: " + JSON.parse(body).Year,
					"IMBD Rating: " + JSON.parse(body).imdbRating,
					"Country Produced: " + JSON.parse(body).Country,
					"Plot: " + JSON.parse(body).Plot,
					"Actors: " + JSON.parse(body).Actors,
					"Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating,
					"Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL
    	);
  }
});
}

// random.txt file 
function doWhatItSays(){
	fs.readFile("random.txt", 'utf8', function(error, data) {		    
		
	     var output = data.split(",");

    for (var i = 0; i < output.length; i++) {

    console.log(output[i]);
  }

 });

 }
	    
 		
