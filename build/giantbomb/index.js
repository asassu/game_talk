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
                url: "https://game-talk.herokuapp.com/tweet_search", // our heroku address will go here until more clever way of referencing self is found ;) ;D
                type: "get",
                data: {
                    q: game_name
                },
                dataType: "json", //was jsonp
                success: function(data) { GameData.details(data, genData) }, 
                error: function(){ console.log("Error in Ajax Call (oh noes!)"); }
            });
        });
    },

    gameDetails: function(game_id, game_name) {
        $(document).ready(function(){    
                $.ajax({
                    url: "https://api.giantbomb.com/game/"+game_id+"/?json_callback=?",
                    type: "get",
                    data: {api_key : apikey.apikey_bomb, format: "jsonp"},
                    dataType: "jsonp",
                    success: function(data){
                        GameData.tweets(data, game_name);
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
                url: "https://api.giantbomb.com/search/?json_callback=?",
                type: "get",
                data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game"},
                dataType: "jsonp",
                success: function(data) { 
                    GameData.gamer(data);
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
