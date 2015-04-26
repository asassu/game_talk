var express = require("express");

//Creating Web Server 
var http = require('https');
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
            //return an object with statuses with blank / error values:
        }
         
         //Successful Call to Twitter:
        else { 
             
             //Combines Text from All Tweets, Uses AlchemyAPI for Sentiment Analysis and Returns Pos/Neg:
            var tweet_text= "";
            for(index in tweets['statuses']){ tweet_text += tweets["statuses"][index].text + " ";}

            tweets["sentiment"] = "None";
        
            alchemyapi.sentiment("text", tweet_text, {}, function(response) {
                
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

app.get('/test_request', function(req, res){

    //var query = req.query['query'] || "";
    //console.log(query);

    var data = req;
    //var api_key = "api_key=" + data['api_key'];
    //var api_key = "api_key=" + "325993269748578bf14aa503ce7b2613a6cdfb78"; //"293337dc0d93e1319cbcf7c424bf48e5b4c88347";
    var api_key = "&api_key=" + data.query['api_key'];//"325993269748578bf14aa503ce7b2613a6cdfb78"; //"293337dc0d93e1319cbcf7c424bf48e5b4c88347";
    
    var query = "&query="+ data.query['query'];
    var format = "&format="+data.query['format']; //might need to be json
    var resources = "&resources=" + data.query['resources'];
    
    var search_url = "https://api.giantbomb.com/search?json_callback=?" + api_key + query + format + resources;
    
    console.log(search_url);
    
    //https://api.giantbomb.com/search/?json_callback=?
    //data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game"},
    
    

    ////Search API Text:
    //var api_key = "325993269748578bf14aa503ce7b2613a6cdfb78";
    //var query = "&query=metroid";
    //var resources = "&resources=game";
    //var search_url = "http://www.giantbomb.com/api/search?api_key=" + api_key + "&field_list=name&format=json"+ query + resources;

    //var data;
    var output;

    console.log("test!");

//Makes a Request to the API for GiantBomb and Saves into :
    request({
        url: search_url,
        json: true
    }, function (error, response, body) {

        //data = response;
       // data = body;
       var output = body;
        if (!error && response.statusCode === 200) {
        
            res.jsonp(JSON.parse(output));
            console.log(body) // Print the json response
        }
    });

    res.jsonp(JSON.parse(body));

});

app.get('/test_details', function(req, res){

    //var query = req.query['query'] || "";
    //console.log(query);

    var data = req;
    var api_key = "&api_key=" + data.query['api_key'];
    
    //var query = "&query="+ data.query['query'];
    var game_id = data.query['id'];
    var format = "&format="+data.query['format']; //might need to be json
    
    var search_url = "https://api.giantbomb.com/game/"+game_id+"/?json_callback=?"+ api_key + format;
    
    console.log(search_url);
    
    //var data;
    var output;

    console.log("test!");

    request({
        url: search_url,
        json: true
    }, function (error, response, body) {

       var output = body;
        if (!error && response.statusCode === 200) {
            
            res.jsonp(JSON.parse(body));
            console.log(body) // Print the json response
        }
    });

    res.jsonp(JSON.parse(output));

});



app.listen(process.env.PORT || 8000);