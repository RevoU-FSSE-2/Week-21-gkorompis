import { Dispatch } from "redux"
import { BASE_URL, cookies } from "../../utils/global"
import axios from "axios"

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
        const allCookies = cookies.getAll();
        const {accessToken} = allCookies;
        const config = {
          headers: {Authorization: `Bearer ${accessToken}`}
        }
        const responseFetch = await axios.get(`${BASE_URL}/users/`, config)
        console.log({responseFetch});
        const data = responseFetch && responseFetch.data;

        const payload = data || []
        dispatch({type: actionTypes.success, payload})
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default profileAction; 