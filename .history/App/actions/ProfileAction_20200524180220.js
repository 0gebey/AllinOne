import {FETCH_FAVOURITES, PROFILE_FETCH, FETCH_LIKES} from './types';


export const fetchProfile = () => {
    const { currentUser } = firebase.auth();
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


