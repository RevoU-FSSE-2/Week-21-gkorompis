import { Dispatch } from "redux"
import axios from "axios";
import { BASE_URL, cookies } from "../../utils/global";
import { jwtDecode } from "jwt-decode";

const actionTypes = {
    loading: 'TOKEN_LOADING',
    success: 'TOKEN_SUCCESS',
    error: 'TOKEN_ERROR'
}

const tokenAction = ({reduxState}:any)=> async(dispatch:Dispatch) =>{
    try {
        // console.log(">>>tokenAction")
        dispatch({type: actionTypes.loading});
        // console.log({reduxState})
        const {tokens} = reduxState;
        
        const {access, refresh} = tokens || {};
        const accessToken = access && access.token;
        const refreshToken = refresh && refresh.token;
        const decoded = jwtDecode(accessToken);
        // console.log({decoded});
        const sessionId = decoded && decoded.sub || ""
        
        cookies.set('accessToken', accessToken, {path: '/'})
        cookies.set('refreshToken', refreshToken, {path: '/'})
        cookies.set('sessionId', sessionId, {path: '/'})

        // axios.defaults.headers.common = {'Authorization': `bearer ${accessToken}`}
        const config = {
          headers: {Authorization: `Bearer ${accessToken}`},
          params: {username: sessionId}
        }

        const fetchedProfile = await axios.get(`${BASE_URL}/profiles/`, config);
        const data = fetchedProfile && fetchedProfile.data;
        let keys = [] as any
        if(data){
            keys = Object.keys(data);
        }
        const profile = keys[0] ? data[0] : {};
        const profileId = profile["_id"];
        // console.log(">>>fetchedProfile",{profile});
        if(!profileId){
            console.log(">>registering profile")
            const profile = {username: sessionId}
            const configProfile = {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
            const fetchedProfile = await axios.post(`${BASE_URL}/profiles/`, profile, configProfile);
            // console.log(">>>profile is registered", {fetchedProfile});
            cookies.set('profileId', profileId, {path: '/'})
        }
        cookies.set('profileId', profileId, {path: '/'})
      

        const payload = {tokens}
        dispatch({type: actionTypes.success, payload})
        // console.log(">>>tokenAction",actionTypes.success)
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default tokenAction; 