import { Dispatch } from "redux"
import { BASE_URL, cookies } from "../../utils/global"
import axios from "axios"

const actionTypes = {
    loading: 'FOLLOWERS_LOADING',
    success: 'FOLLOWERS_SUCCESS',
    error: 'FOLLOWERS_ERROR'
}

const dummyProfile= [
        {
                _id: "658b9ded9e560ed41cb6ce34",
                followers: [
                    "658bae0d348b2cdfaff3b509",
                    "658c2218e6260a0cfbe3a981"
                ],
                following: [
                "658b944509ed2f54ac5f38ba"
            ],
                tweets: [],
                username: "member4"
        },
        {
                _id: "658bae0d348b2cdfaff3b509",
                    followers: [
                    "658c2218e6260a0cfbe3a981"
                ],
                    following: [
                    "658b944509ed2f54ac5f38ba",
                    "658b9ded9e560ed41cb6ce34"
                ],
                tweets: [],
                username: "member5"
        },
        {
                _id: "658c21b6e6260a0cfbe3a980",
                followers: [
                    "658c2218e6260a0cfbe3a981",
                    "658c2218e6260a0cfbe3a981"
                ],
                following: [],
                tweets: [],
                username: "member7"
        },
        {
                _id: "658c27ad40127ab061e919bf",
                followers: [
                    "658c2218e6260a0cfbe3a981"
                ],
                following: [],
                tweets: [],
                username: "member8"
        },
        {
                _id: "658c2990bfa8e0aafc3c494f",
                followers: [
                    "658c2218e6260a0cfbe3a981"
                ],
                following: [],
                tweets: [],
                username: "member9"
        }
]

const followingAction = (reduxState:any)=> async(dispatch:Dispatch) =>{
    try {
        // console.log(">>>followingaction")
        dispatch({type: actionTypes.loading});
        const allCookies = cookies.getAll();
        const {accessToken, sessionId} = allCookies;
        const config = {
          headers: {Authorization: `Bearer ${accessToken}`},
          params: {username: sessionId}
        }
        const responseFetchSelfProfile = await axios.get(`${BASE_URL}/profiles/`, config)
     
        const dataSelfProfile = responseFetchSelfProfile && responseFetchSelfProfile.data;
        let selfId = ""
        if(dataSelfProfile[0]){
            const selfProfile = dataSelfProfile[0];
            selfId = selfProfile && selfProfile["_id"]
        }
        const responseFetch = await axios.get(`${BASE_URL}/profile/pull-items/followers/${selfId}`, config)
        // console.log({responseFetch, selfId});
        const data = responseFetch && responseFetch.data;
        const pulledItems = data && data.pulledItems;
        const payload = pulledItems || []
        dispatch({type: actionTypes.success, payload})
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}
export default followingAction; 