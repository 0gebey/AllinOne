import apisauce from 'apisauce'


const create = (baseURL = 'https://api.twitter.com/1.1/users/show.json/') => {

  const api1 = apisauce.create({
    baseURL,
    headers: {
      Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS',
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const userRequest1 = (userName) => api.get("?screen_name="+ userName)

  return {
    userRequest1,
  }
}
 

export default {
  create
}
