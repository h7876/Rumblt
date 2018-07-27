import axios from 'axios';

const initial_state = {
    userFollowers: []
}

const INIT_FOLLOW = 'INIT_FOLLOW';
const GET_FOLLOWERS = 'GET_FOLLOWERS';

export function getUserFollowers(userid) {
    let followedUsers = axios.get(`/api/followers/${userid}`).then(res=> {
        return res.data
    })
    return {
        type: GET_FOLLOWERS,
        payload: followedUsers
    }
}

export default function followingReducer(state = initial_state, action){
    switch(action.type){
        case GET_FOLLOWERS:
        return Object.assign({}, state, {userFollowers: action.payload})
        default:
    return state;
    }
}
