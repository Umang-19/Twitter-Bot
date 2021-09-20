var Twit = require("twit");
var config = require("./config");
var T = new Twit(config);

console.log("Welcome to Umang's Bot");

function retweet() 
{
    let params = { q:'#100daysofcodewithGFG', result_type:'recent', count:100 }

    T.get('search/tweets', params, gotData);

    function gotData(err, data, response) 
    {
        if(err)
            console.log("Some Error occurred!");
        else 
        {
            console.log(data);
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
                    if(err)
                    console.log("Some error occurred!");
                })
            }
        }
    }
}

retweet();
setInterval(retweet, 1000*10);