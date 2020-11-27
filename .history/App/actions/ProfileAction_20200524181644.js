import {PROFILE_FETCH} from './types';
import apisauce from 'apisauce'

const create = (baseURL = 'https://api.github.com/') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })
}
 

export default {
  create
}

export const fetchProfile = () => {
    const { profileRequest } = ;
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .on('value', snapshot => {
                dispatch({
                    type: PROFILE_FETCH,
                    payload: snapshot.val()
                });
            })
    };
};


