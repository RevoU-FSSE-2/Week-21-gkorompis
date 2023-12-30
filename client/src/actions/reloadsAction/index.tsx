import { Dispatch } from "redux"

const actionTypes = {
    loading: 'RELOADS_LOADING',
    success: 'RELOADS_SUCCESS',
    error: 'RELOADS_ERROR'
}

const reloadsAction = (reduxState:any)=> async(dispatch:Dispatch) =>{
    try {
        // console.log(">>>reloadsaction")
        dispatch({type: actionTypes.loading});
        const payload = reduxState || [];
        dispatch({type: actionTypes.success, payload});

    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default reloadsAction; 