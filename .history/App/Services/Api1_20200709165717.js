var Twit = require('twit')


const apiKey = 'rN3yE25KaJVuc5i8sb0LHT73U'
const apiSecretKey = 'tcseaTFomXIgSUWiIozQFqpDrUGXzX5rtE3YjW0ALn0RjdUE5m'
const accessToken = '1551283322-WWEtu6aqqwfZ7sOO7nCBb8UQdwGtExb99ifZi6F'
const accessTokenSecret ='TbvcaBGE3VUW1N6Q4CpS5GveJakwfr2zLD7OOwWeY1MdY'

var T = new Twit({
  consumer_key:         apiKey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

(async () => {
  T.get('users/show', {screen_name: 'OgedayOztoprak'} , await function(err,data,response) {
    const userInfos = data
  } )
})