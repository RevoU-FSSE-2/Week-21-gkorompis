import { Dispatch } from "redux"
import { BASE_URL, cookies } from "../../utils/global"
import axios from "axios"

const actionTypes = {
    loading: 'TWEETS_LOADING',
    success: 'TWEETS_SUCCESS',
    error: 'TWEETS_ERROR'
}

const dummyProfile= [
    {
        _id:"65701bdb377b21b05b47582e",
        createdBy:"user12",
        tweet: "my first tweet user12",
        comments:[],
        permission: [],
        createdAt: "2023-12-06T06:59:39Z"
    },
    {
        _id:"65701bdb377b21b05b47582e",
        createdBy:"member5",
        tweet: "my first tweet member5",
        comments:[],
        permission: [],
        createdAt: "2023-12-06T06:59:39Z"
    },
    {
        _id:"6589b87d71df6855c346c3fb",
        createdBy:"user13",
        tweet: "hello user13",
        comments:[],
        permission: [],
        createdAt: "2023-12-06T06:59:39Z"
    },
    {
        _id:"6572bd39c3c88d23a2756fe9",
        createdBy:"member6",
        tweet: "i'm just member6",
        comments:[],
        permission: [],
        createdAt: "2023-12-06T06:59:39Z"
    },
    {
        _id:"65701bdb377b21b05b47582e",
        createdBy:"user14",
        tweet: "my last tweet user14",
        comments:[],
        permission: [],
        createdAt: "2023-12-06T06:59:39Z"
    }
]


const tweetsAction = (reduxState:any)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>tweetsaction")
        dispatch({type: actionTypes.loading});
        const {query} = reduxState;
        const queryTag = query || "/"

        const allCookies = cookies.getAll();
        const {accessToken} = allCookies;
        const config = {
          headers: {Authorization: `Bearer ${accessToken}`}
        }
        const responseFetch = await axios.get(`${BASE_URL}/tweets${queryTag}`, config)
        console.log({responseFetch});
        const data = responseFetch && responseFetch.data;
        const keys = Object.keys(data);
    console.log('>>>payload tweets', keys)
        const payload = keys[0] ? data : [];
        console.log('>>>payload tweets', payload)
        dispatch({type: actionTypes.success, payload})
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default tweetsAction; 