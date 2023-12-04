import {Reducer} from 'redux';

const actionTypes = {
    loading: 'PROFILE_LOADING',
    success: 'PROFILE_SUCCESS',
    error: 'PROFILE_ERROR'
}

const stateDefault = {
    loading: true,
    payload: []
}
const profileReducer:Reducer = (state=stateDefault, action) =>{
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
export default profileReducer;