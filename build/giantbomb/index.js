var GameData = {

    details: function(tweetData, genData) {
        console.log(genData.results.images)
        $.get("/giantbomb/details.jade", function(template) {
            var html = jade.render(template, {
                gen: genData.results,
                data: tweetData
            })
            $("#list").html(html);
        })
    },

    tweets: function(genData, game_name) {
        $(document).ready(function(){    
            var test = $.ajax({
                url: "https://morning-peak-6716.herokuapp.com/tweet_search",
                //url: "https://web-design-erikkierstead.c9.io/tweet_search",
                type: "get",
                data: {
                    q: game_name
                },
                dataType: "json",
                success: function(data) { GameData.details(data, genData) }, 
                error: function(){ console.log("Error in Ajax Call to Twitter Interface /tweet_search (oh noes!)"); }
            });
        });
    },

    gameDetails: function(game_id, game_name) {
        
        $(document).ready(function(){    
                $.ajax({
                    //url: "https://web-design-erikkierstead.c9.io/giantbomb_details",//
                    url: "https://morning-peak-6716.herokuapp.com/giantbomb_details",
                    type: "get",
                    data: {api_key : apikey.apikey_bomb, format: "jsonp", id: game_id},
                    dataType: "json",
                    success: function(data){
                        GameData.tweets(data, game_name);
                    },
                    error: function(data){
                        console.log("Error in Ajax Call to GiantBomb Game Details API Interface /giantbomb_details (dizang!)");
                    }
                });
            });
    },

    gamer: function(data) {
        $.get("/giantbomb/list.jade", function(template) {
            var html = jade.render(template, {
                data: data
            })
            $("#list").html(html);
        })
    },
    
    searchByName: function(name) {
 
        $(document).ready(function(){
            $.ajax({
               url: "https://morning-peak-6716.herokuapp.com/giantbomb_request",
               //url: "https://web-design-erikkierstead.c9.io/giantbomb_request",
               type: "get",
               data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game"},
               dataType: "json",
               success: function(data){
                   GameData.gamer(data);
               },
               error: function(data){
                   console.log("Error in Ajax Call to GiantBomb Search API Interface /giantbomb_request");
               }
            });
        });
    },

    load: function() {

        $.get("/giantbomb/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })
    }

}
