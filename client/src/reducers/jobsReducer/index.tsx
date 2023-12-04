import {Reducer} from 'redux';

const actionTypes = {
    loading: 'JOBS_LOADING',
    success: 'JOBS_SUCCESS',
    error: 'JOBS_ERROR'
}
const stateDefault = {
    loading: false,
    payload: false
}
const jobsReducer:Reducer = (state=stateDefault, action) =>{
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
export default jobsReducer;