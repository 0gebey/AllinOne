import axios from 'axios';
const create = (baseURL = 'https://api.twitter.com/1.1/users') => {

  const accessToken =
    'AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS';
  // const twitterUrl = 'https://api.twitter.com/1.1/users';

  const api1 = axios.create({
    baseURL,
    headers: {
      Authorization:
      `Bearer ${accessToken}`,
    },
    timeout: 10000
  });

  const twitterRequest = (userName) =>
    api1.get(`/show.json?screen_name=${userName}`);
    console.log(twitterRequest)
  return {
    twitterRequest,
  };
};

export default {
  create,
};