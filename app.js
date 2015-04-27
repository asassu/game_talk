var express = require("express");

//Creating Web Server 
var http = require('http');
var path = require('path');

//Creating the Web Server:
var app = express();
var server = http.createServer(app);


//Alchemy API Shenanigans:
var consolidate = require('consolidate');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var request = require("request");

//Twitter Module:
var Twitter = require('twitter');

//Will Regenerate New API Keys:
var client = new Twitter({
    consumer_key: 'HUd2dbIQJNF0E29QeTvP4ZOST',
    consumer_secret: 'VW8DDSz7AoF2zKAAGxuDgN4gMeAGMZZptyGr3OjYRDTl7gm4mf',
    access_token_key: '931174363-IkBnF7yUBODRoLu82jxio8iQnKCDbKJZEh6OBYpT',
    access_token_secret: 'JTW6LS7zKs3sq8Li2eEmFgCV4PeFuc037Xpis0lkHtwZo'
});

app.use(express.static(__dirname + "/build"));

//Available for Ajax call on front end, then conducts Twitter RESTful API Call
//which then uses AlchemyAPI for Sentiment Analysis and Returns JSON:
app.get('/tweet_search', function(req, res){
 
    var query = req.query['q'] || "";
   
    client.get('search/tweets', {q: query, count:50}, function(error, tweets, response){
   
        if(error) {
            console.log("Error Getting Tweets");
            //return an object with statuses with blank / error values:
        }
         
         //Successful Call to Twitter:
        else { 
             
             //Combines Text from All Tweets, Uses AlchemyAPI for Sentiment Analysis and Returns Pos/Neg:
            var tweet_text= "";
            for(index in tweets['statuses']){ tweet_text += tweets["statuses"][index].text + " ";}

            tweets["sentiment"] = "None";
        
            alchemyapi.sentiment("text", tweet_text, {}, function(response) {
                
                console.log("");
                
                if(response.hasOwnProperty("sentiment")) { 
                    if(response["docSentiment"].hasOwnProperty("type")) {
                        tweets["sentiment"] = response["docSentiment"]["type"];
                    }
                }
                   
                res.send(tweets);
                
            });
        
             
             //Fix scoping issue with tweets['sentiment'] not being permanent in alchemyapi method
             //res.send(tweets) 
        }
    });
});

app.get('/giantbomb_request', function(req, res){

    //Variables Required to Construct URL to GiantBomb:
    var api_key = "&api_key=" + req.query['api_key'];
    var query = "&query="+ req.query['query'];
    var format = "&format=json";
    var resources = "&resources=" + req.query['resources'];
    
    var search_url = "https://api.giantbomb.com/search?" + api_key + query + format + resources;
    
    //Makes a Request to the API for GiantBomb and Saves into :
    request({
        url: search_url,
        json: true
    }, function (error, response, body) {

       var output = body;
        if (!error && response.statusCode === 200) {
            res.send(output);
        }
        
        if (error) { 
            console.log("Error Retrieving Giant Bomb Search");
            console.log(error); 
        }
    });
});

app.get('/giantbomb_details', function(req, res){

    //Variables Required to Construct URL to GiantBomb:
    var api_key = "&api_key=" + req.query['api_key'];  //API Key Moved to Backend?
    var game_id = req.query['id'];
    var format = "&format=json";
    
    var search_url = "https://api.giantbomb.com/game/"+game_id+"/?"+ api_key + format;
    
    request({
        url: search_url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            res.send(body);
        }
        
        else if (error) { 
            console.log("Error in Retrieving Details from GiantBomb"); 
            console.log(error);
        }
    });
});

app.listen(process.env.PORT || 8000);