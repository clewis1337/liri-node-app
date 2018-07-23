
// require("dotenv").config();
var fs = require('fs');
var Twitter = require("twitter");
var client = new Twitter({  //HARD CODED-ENV wasnt working!
    consumer_key: 'rHLR97YXBPEIgAPOVAU340Vls',
    consumer_secret: 'hnVGm3wAwLgNNJb3Z87snxpBcyB7ZtxE4i59PGTmf1rE8FHX7b',
    access_token_key: '563146661-GkwLJqgz4iWxG06fSq4tG2OmyxosIwXPWjQvUDCu',
    access_token_secret: '4td893rnojnPo1tyNdzr7Ahah5XwduOi3E6Aqpyg3ajKu'
  });
var request = require("request");

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: 'd3bbb9965b4e421ab9108ba88a69ae6a',
    secret: '6495cc7c846d4b88b3de6b39e26b3034'});
// var spotify = new spotify(keys.spotify);


let command = process.argv[2];
let title = process.argv.splice(3).join(' ');
// var fs = require("fs");							//NPM package for reading and writing files

// var keys = require("./keys.js");				//Twitter keys and access tokens
// var Twitter = require("twitter");				//NPM package for twitter
// var client = new Twitter(keys.twitterKeys);		//New instance of a twitter client

// var request = require("request");				//NPM package for making ajax-like calls

// var spotify = require("spotify");				//NPM package for spotify


switch(command){
    case 'my-tweets': myTweets();
        break;
    case 'spotify-this-song': spotifyThis();
        break;
    case 'movie-this': movieThis();
        break;
    case 'do-what-it-says': doWhatItSays();
        break;
    default: console.log('User Error Input');
}

function myTweets(){
    client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error)  consol
    e.log(tweets)
    let maxTweets = 20;
    if(tweets.length < 20){
        maxTweets = tweets.length;
    }
    for (var i = 0; i < tweets.length; i++) {
        console.log("\nCreated at: " + tweets[i].created_at);
        console.log(tweets[i].text);

    }
});
}

function spotifyThis(){

    spotify.search({ type: 'track', query: title })
  .then(function(response) {
    console.log('Artist: ' + response.tracks.items[0].artists[0].name);
    console.log('Song: ' + response.tracks.items[0].name);
    console.log('Preview Link: ' + response.tracks.items[0].href);
    console.log('Album: ' + response.tracks.items[0].album.name)
    // console.log(response.tracks.items[0].artists[0].name);

    
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movieThis(){
    if(title === null) title = 'Mr. Nobody.';
    var URL = "http://www.omdbapi.com/?t=" + title + "&tomatoes=true&y=&plot=short&r=json&apikey=trilogy";
    request(URL, function (error, response, data){
        if (error) console.log(error)
        let newData = JSON.parse(data);
        console.log("Searching for movie");
        console.log(`Title: ${newData.Title}\nYear: ${newData.Year}\nIMDB Rating: ${newData.Ratings[0].Value}\nRotten Tomatoes Rating: ${newData.Ratings[1].Value}\nCountry: ${newData.Country}\nLanuage: ${newData.Language}\nPlot: ${newData.plot}\nActors: ${newData.Actors}`);
		});
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        data = data.split(','); //split commands by comma

        let command = data[0];
        title = data[1];

        switch (command) {
            case 'my-tweets':
                myTweets();
                break;

            case 'spotify-this-song':
                spotifyThis();
                break;

            case 'movie-this':
                movieThis();
                break;
        }

    });

}