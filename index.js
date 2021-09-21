var Twit = require("twit");
// var config = require("./config");
require('dotenv').config();
// var T = new Twit(config);

var T = new Twit({
    consumer_key:         process.env.consumer_key,
    consumer_secret:      process.env.consumer_secret,
    access_token:         process.env.access_token,
    access_token_secret:  process.env.access_token_secret
  })

console.log("Welcome to Umang's Bot");

function retweet() 
{
    let params = { q:'#100daysofcodewithGFG', count:100}

    T.get('search/tweets', params, gotData);

    function gotData(err, data, response) 
    {
        if(err)
            console.log("Some Error occurred!");
        else 
        {
            // console.log(data);
            var tweets = data.statuses;
            // console.log("GOT THESE TWEETS");
            // for (var i = 0; i < tweets.length; i++) 
            //     console.log(tweets[i].text);
    
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