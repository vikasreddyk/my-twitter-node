const http = require('http');
const axios = require('axios');
const url = require('url');
const querystring = require('querystring');
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 3000));

//For avoidong Heroku $PORT error
app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const twitterUrl = `https://api.twitter.com/2/tweets/search/recent?max_results=30&query=${req.query.search}&tweet.fields=author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source&expansions=author_id,attachments.media_keys&user.fields=profile_image_url&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width,alt_text`;
    axios.get(twitterUrl, {
        headers: {
            Authorization:
                "Bearer AAAAAAAAAAAAAAAAAAAAAAkXSgEAAAAAQ%2B7CHvY%2FvZ7WmR2oPhespzsHi6s%3DRJhMfHjvRxa7t9BGm5Nzd0hmSExs8zPUXnxPQ4zHWNrHyJcaF3",
        },
    }).then((resp) => {
        res.send(resp.data);
    });
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
