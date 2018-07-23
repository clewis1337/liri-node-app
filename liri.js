
// require("dotenv").config();
// var keys = require("./keys");
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
    case 'do-what-it-says':
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
    
    var URL = "http://www.omdbapi.com/?t=" + title + "&tomatoes=true&y=&plot=short&r=json&apikey=trilogy";
    request(URL, function (error, response, data){
        if (error) console.log(error)
        let newData = JSON.parse(data);
        console.log("Searching for movie");
        console.log(`Title: ${newData.Title}\nYear: ${newData.Year}\nIMDB Rating: ${newData.Ratings[0].Value}\nRotten Tomatoes Rating: ${newData.Ratings[1].Value}\nCountry: ${newData.Country}\nLanuage: ${newData.Language}\nPlot: ${newData.plot}\nActors: ${newData.Actors}`);
		});
}

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:



//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
//      * It's on Netflix!
   
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
//      * Feel free to change the text in that document to test out the feature for other commands.