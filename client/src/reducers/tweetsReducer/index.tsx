import {Reducer} from 'redux';

const actionTypes = {
    loading: 'TWEETS_LOADING',
    success: 'TWEETS_SUCCESS',
    error: 'TWEETS_ERROR'
}

const stateDefault = {
    loading: true,
    payload: []
}
const tweetsReducer:Reducer = (state=stateDefault, action) =>{
    switch (action.type){
        case actionTypes.loading:
            return {loading: true}
        case actionTypes.success:
            return {loading: false, payload: action.payload}
        case actionTypes.error:
            return {error: true, message: action.message}
        default:
            return state
    }
};
export default tweetsReducer;