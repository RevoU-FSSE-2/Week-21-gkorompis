import {Reducer} from 'redux';

const actionTypes = {
    loading: 'FOLLOWING_LOADING',
    success: 'FOLLOWING_SUCCESS',
    error: 'FOLLOWING_ERROR'
}

const stateDefault = {
    loading: true,
    payload: []
}

const followingReducer:Reducer = (state=stateDefault, action) =>{
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

export default followingReducer;