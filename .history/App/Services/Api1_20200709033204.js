import apisauce from 'apisauce'

const twitterApiKey = "rN3yE25KaJVuc5i8sb0LHT73U"
const twitterApiSecretKey = "tcseaTFomXIgSUWiIozQFqpDrUGXzX5rtE3YjW0ALn0RjdUE5m"

const create = (baseURL = 'https://api.twitter.com/1.1/users/show.json') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const twitterRequest = (twitterUserName,) => api.get('users/' + userName)

  return {
    twitterRequest,
  }
}
 

export default {
  create
}
