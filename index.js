var Twit = require("twit");
// var config = require("./config");
require('dotenv').config();
// var T = new Twit(config);

var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
  })

console.log("Welcome to Umang's Bot");

function retweet() 
{
    let params = { q:'#100daysofcodewithGFG', count:200 }

    T.get('search/tweets', params, gotData);

    function gotData(err, data, response) 
    {
        if(err)
            console.log("Some Error occurred!");
        else 
        {
            // console.log(data);
            var tweets = data.statuses;
            console.log("GOT THESE TWEETS");
            for (var i = 0; i < tweets.length; i++) 
                console.log(tweets[i].text);
    
            for(let dat of tweets) 
            {
                console.log("Trying to retweet!");
                let retweetId = dat.id_str;
                T.post('statuses/retweet/:id', {id: retweetId}, (err, response)=>
                {
                    if(response)
                        console.log('Post retweeted successfully!!!');    
                    else
                        console.log("Some error occurred!");    
                })
            }
        }
    }
}

retweet();
setInterval(retweet, 1000*10);