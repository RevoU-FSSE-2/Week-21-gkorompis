import { useState } from "react";
import "./index.css"
import { BASE_URL, cookies } from "../../utils/global";
import axios from "axios";


const TweetCard = ({data, handlers}:any) =>{
    const {_id, createdBy, tweet} = data;
    const [isFollowingModal, setIsFollowingModal] = useState(false);
    return(
        <>
            <div className="tweet-card">
               <p className="tweet-texts tweet-text-user">@{createdBy}</p>
               <p className="tweet-texts tweet-text-tweets">"{tweet}"</p>
               <div className="tweet-card-footers">
                    <p className="tweet-texts tweet-text-footers">comments</p>
                    <p className="tweet-texts tweet-text-footers" onClick={()=>setIsFollowingModal(true)}>follow</p>
               </div>
            </div>
            {
                isFollowingModal ? <FollowingModal states={{_id, createdBy}} handlers={{setIsFollowingModal}}/> : null
            }
        </>
    )
}

const FollowingModal=({states, handlers}:any)=>{
    const {_id, createdBy}  = states;
    const {setIsFollowingModal} = handlers;
    const cookiesAll = cookies.getAll();
    const {profileId} = cookiesAll || "";
    const handleFollowUser = async ()=>{
        try{
            const allCookies = cookies.getAll();
            const {accessToken} = allCookies;
            const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
            const configParams = {
                headers: {Authorization: `Bearer ${accessToken}`},
                params: {username: createdBy}
            }
            const responseFetched = await axios.get(`${BASE_URL}/profiles/`, configParams);
            const data = responseFetched && responseFetched.data || [];
            const fetchedProfile = data[0] ? data[0] : {};
            const fetchedProfileId = fetchedProfile && fetchedProfile._id || "";
            console.log(">>>fetched profile id", {fetchedProfileId, fetchedProfile, responseFetched, createdBy})
            console.log(">>>put append item following", {profileId, fetchedProfileId})
            const responsePost = await axios.put(`${BASE_URL}/profile/append-item/following/${profileId}`,{profileId: fetchedProfileId}, config);
            console.log(">>> followingModal", {responsePost});

            setIsFollowingModal(false);
        } catch(err:any){
            console.log(">>>error handleFollowUser", err);
            let customMessage = "";
            const response = err && err.response;
            const data = response && response.data;
            customMessage= data && data.message;

            alert(customMessage || err && err.message || "unknown")
            setIsFollowingModal(false);
        }
    }

    return (
        <>
            <div className="following-modal-center bg-blur">
                <p className='box-text-big'>follow {createdBy} {`(${_id})`}? </p>
                <div className="following-modal-button-bar">
                    <button className="following-modal-button" onClick={()=>setIsFollowingModal(false)}>back</button>
                    <button className="following-modal-button" onClick={()=> handleFollowUser()}>follow</button>
                </div>
            </div>
        </>
    )
}


export default TweetCard;