// import apisauce from 'apisauce'


// const create = (baseURL = 'https://api.twitter.com/1.1/users') => {

//   const api1 = apisauce.create({
//     baseURL,
//     headers: {
//       Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS',
//     },
//     timeout: 10000
//   })

//   const twitterRequest = (userName) => api1.get(`/userNameshow.json?screen_name=${userName}`)

//   return {
//     twitterRequest,
//   }
// }
 

// export default {
//   create
// }

import axios from 'axios'

const accessToken =
  'AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS';
const twitterUrl = 'https://api.twitter.com/1.1/users';

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const create = (baseURL = 'https://api.twitter.com/1.1/users') => {

const api1 = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    // 'Access-Control-Allow-Origin' : '*',
  },
  timeout: 10000,
});

  const twitterRequest = (userName) => api1.get(`/show.json?screen_name=${userName}`)

  return {
    twitterRequest,
  }
}

export default {
  create
}
