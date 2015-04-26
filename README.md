UCDD2 Final Project: Game Talk
==============================
##Team Infamous Blue Kittens##
**Members:**

* Olivia Abrant
* Erik Eakins
* Andrea Sassu

##About##

**URL:** https://game-talk.herokuapp.com/

**Overview:** Create a website that, given the name of a recent video game, pulls news, reviews, and tweets about the game for market feedback purposes.

**APIs:**

* [GamesRadar API](http://api-portal.anypoint.mulesoft.com/future/api/gamesradar-developer-api/docs/reference): To grab reviews and news on specific games
* [Twitter API](https://dev.twitter.com/overview/api): To figure out what social media is saying about specific games
* STRETCH GOAL: [Alchemy API](http://www.alchemyapi.com/): To be used with the Twitter api to do a sentiment analysis to determine a positive or negative view about a game

**Learning Goals:** 

We want to learn how to get information from multiple APIs and display it in an easily readble fashion, even though the type of information varies. Overall, our focus is on rendering 15 pieces of information regarding the searched game on the website: 5 articles/news sources, 5 reviews, and 5 tweets. Pulling this information and laying it out in a easily readable and understandable manner for the user is our primary focus.

Additionally, we are planning for this to be a one-page website: it will look a bit like the google home page to start with just a search box, and when a game name is typed in, it will render all of the information on the same page.

**Stretch Goals:** Filter more relevent articles/reviews, sentiment analysis, having multiple/extra pages of information that we feel is relevent regarding the game.

**Responsibilities:**

* Olivia Abrant - Working with OAuth and Twitter
* Erik Eakins - Working with OAuth and GiantBomb after GamesRadar dropped that damn ball
* Andrea Sassu - Building the front end (layout, CSS)

##Milestones##

**Stage One:**

* Very basic website layout with searching functionality
* Implement GamesRadar api to pull reviews for specific games from the search
* (Possible use: node.js or jquery)

**Stage Two:**

* Implement GamesRadar api to pull news for upcoming games
* Figure out what we want to render on the page with reviews and news results 
  (probably: top 5 results of each)

**Stage Three:**

* Implement Twitter information gathering, figure out what information we want to render 
  (probably: top 5 results - rank by number of retweets?)
* Display Twitter information alongside GamesRadar information

**Stage Four:**

* Make website more sophisticated looking: update graphics, polish interface
* STRETCH GOAL: use sentiment analysis (Alchemy API) on Twitter resultsHow are 

Q&A
===

mtgdeckbuilder
--------------
**Questions**

1. What do people search by? (Partial game names?)
2. How are you going to combine the APIs to show the relevent data?
3. Will you be using a database to keep all of this data?

**Must-Have Features**

1. Search by name of game OR publisher OR genre would be ideal
2. Implementation of API based on keyword or exact phrases
3. Nice UI. Potentially bootstrap?

**Good Demo to Show?**

* The website itself.


The Sky Team
--------------
**Questions**

1. Getting the articles written about games - how to extract information from the articles to know what is being said.
2. Currently it's up to the user to determine the sentiment analysis aspect?
3. Is there a way to view the top 10 most popular games?

**Must-Have Features**

1. Lots of images/graphics/screenshots - preview from article?
2. Search by genre
2. Stretch goal: include demo/trailer on the page
3. Stretch goal: scrape the articles for sentiment analysis

**Good Demo to Show?**

* The website itself

