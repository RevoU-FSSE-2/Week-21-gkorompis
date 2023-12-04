import { Dispatch } from "redux"

const actionTypes = {
    loading: 'PROFILE_LOADING',
    success: 'PROFILE_SUCCESS',
    error: 'PROFILE_ERROR'
}

const dummyProfile= [
    {
        name: "lorem",
        username: "task 10",
        email: "done",
        role: "member"
    },
    {
        name: "lorem",
        username: "task 10",
        email: "done",
        role: "member"
    },
    {
        name: "lorem",
        username: "task 10",
        email: "done",
        role: "member"
    },
    {
        name: "lorem",
        username: "task 10",
        email: "done",
        role: "member"
    },
    {
        name: "lorem",
        username: "task 10",
        email: "done",
        role: "member"
    }
]


const profileAction = (reduxState:any)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>profileaction")
        dispatch({type: actionTypes.loading});
        const payload = dummyProfile;
        dispatch({type: actionTypes.success, payload})
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default profileAction; 