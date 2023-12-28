import {Reducer} from 'redux';

const actionTypes = {
    loading: 'RELOADS_LOADING',
    success: 'RELOADS_SUCCESS',
    error: 'RELOADS_ERROR'
}

const stateDefault = {
    loading: false,
    payload: []
}
const reloadsReducer:Reducer = (state=stateDefault, action) =>{
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
export default reloadsReducer;