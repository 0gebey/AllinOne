import apisauce from 'apisauce'


const create = (baseURL = 'https://api.twitter.com/1.1/users') => {

  const api1 = apisauce.create({
    baseURL,
    headers: {
      Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS',
    },
    timeout: 10000
  })

  const twitterRequest = (userName) => api1.get(`/userNameshow.json?screen_name=${userName}`)

  return {
    twitterRequest,
  }
}
 

export default {
  create
}
