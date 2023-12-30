import React, { useEffect, useState } from 'react'
import "./index.css"

import {useDispatch, useSelector} from 'react-redux';
import { followersAction, followingAction, tweetsAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';

import { ButtonBar, Card, Infographics, ChunkTable, TweetCard, ProfileCard, LoadingLinear, TweetSection, FollowingSection, FollowersSection } from '../../components';
import { BASE_URL, cookies } from '../../utils/global';
import {NewTweetForm} from '..'
import axios from 'axios';

const TweetsBoard = () =>{
    const cookiesAll = cookies.getAll();
    const {sessionId, profileId, accessToken} = cookiesAll;
    const dispatch = useDispatch();

    const [isCardDeck, setIsCardDeck] = useState(true);
    const [switched, setSwitched] = useState("");
    const [isNewTweetForm, setIsNewTweetForm] = useState(false);
    const [tweetCount, setTweetCount] = useState(0);
    const [selfCount, setSelfCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    
    const reloadSelector = useSelector((state:any)=>state.reloads);
    const tweetState = useSelector((state:any)=>state.tweets);
    const tweetsLoad = tweetState && tweetState.payload || [];
    const tweetsSelf = tweetsLoad.filter((x:any)=>{return x.createdBy == sessionId})
    const followingState = useSelector((state:any)=>state.following);
    const followingLoad = followingState && followingState.payload || [];
    
    const followersState = useSelector((state:any)=>state.followers);
    const followersLoad = followersState && followersState.payload || [];

    // setTweetCount(tweetsLoad.length)
    // setSelfCount(tweetsSelf.length)
    
    const handleSwitch = (keyword:string)=>{
        setSwitched(keyword);
        if(keyword=="following"){
            dispatch(followingAction("") as unknown as AnyAction);
        }
        else if(keyword=="followers"){
            dispatch(followersAction("") as unknown as AnyAction);
        } 
        else if(keyword =="self"){
            const query = `/?createdBy=${sessionId}`;
            const reduxState = {query}
            dispatch(tweetsAction("") as unknown as AnyAction)
        } else {
            dispatch(tweetsAction("") as unknown as AnyAction)
        }
    }

    const handleNewTweet = () =>{
        // console.log(">>>handle new tweet", isNewTweetForm)
        setIsNewTweetForm(true)
        // console.log(">>>handle new tweet", isNewTweetForm)
    }

    const checkProfileId = async ()=>{
        const config = {
          headers: {Authorization: `Bearer ${accessToken}`},
          params: {username: sessionId}
        }
        if(profileId=="undefined" || !profileId[0]){
            const fetchedProfile = await axios.get(`${BASE_URL}/profiles/`, config);
            const data = fetchedProfile && fetchedProfile.data;
            let keys = [] as any
            if(data){
                keys = Object.keys(data);
            }
            const profile = keys[0] ? data[0] : {};
            const newProfileId = profile["_id"];
            const following = profile["following"] || [];
            const followers = profile["followers"] || [];
            const followingCount = following.length;
            const followersCount = followers.length;
            setFollowingCount(followingCount)
            setFollowersCount(followersCount)

            cookies.set('profileId', newProfileId, {path: '/'})
        } else {
            const fetchedProfile = await axios.get(`${BASE_URL}/profiles/`, config);
            const data = fetchedProfile && fetchedProfile.data;
            let keys = [] as any
            if(data){
                keys = Object.keys(data);
            }
            const profile = keys[0] ? data[0] : {};
            const newProfileId = profile["_id"];
            const following = profile["following"] || [];
            const followers = profile["followers"] || [];
            // console.log(">>> fetchedProfiled", {profile})
            const followingCount = following.length;
            const followersCount = followers.length;
            setFollowingCount(followingCount)
            setFollowersCount(followersCount)
        }
    }
    useEffect( ()=>{
        dispatch(tweetsAction("") as unknown as AnyAction)
        checkProfileId();
        dispatch(followingAction("") as unknown as AnyAction)
        dispatch(followersAction("") as unknown as AnyAction)
        // console.log(">>> useEffect #", {tweetsLoad, tweetsSelf, tweetState})
        
        
        // setFollowersCount(followersLoad.length)
        // setFollowingCount(followingLoad.length)
        // setFollowersCount(followersLoad.length)
    }, [dispatch, reloadSelector])
    return (
        <>
            <div className="tweets-board">
                
                {/* <div className='button-bar'>
                    <ButtonBar cb={setIsCardDeck}/>
                </div> */}
                <h3 className="tweets-title-text">tweets</h3>
                <div className='tweets-placeholder'>
                    <div className="tweets-section section-profile">
                        <div className="profile-box box-global" onClick={()=>handleSwitch("global")}>
                            <p className="box-text-big">{tweetCount}</p>
                            <p className="box-text-small">global</p>
                        </div>
                        <div className="profile-box box-self" onClick={()=>handleSwitch("self")}>
                            <p className="box-text-big">{selfCount}</p>
                            <p className="box-text-small">self</p>
                        </div>
                        <div className="profile-box box-followers" onClick={()=>handleSwitch("following")}>
                            <p className="box-text-big">{followingCount}</p>
                            <p className="box-text-small">following</p>
                        </div>
                        <div className="profile-box box-following" onClick={()=>handleSwitch("followers")}>
                            <p className="box-text-big">{followersCount}</p>
                            <p className="box-text-small">followers</p>
                        </div>
                    </div>
                    <p className="add-new-tweet" onClick={()=>handleNewTweet()}>
                            new tweet
                    </p>
                    <div className="tweets-section section-tweets">
                        
                        {
                            switched ==  "global" ?
                            <TweetSection states ={tweetState} handlers={{setTweetCount, setSelfCount}} data={{sessionId}}/> : 
                            switched == "self" ?
                            <TweetSection states ={tweetState} handlers={{setTweetCount, setSelfCount}} data={{sessionId}}/> :
                            switched == "following" ?
                            <FollowingSection states ={followingState} handlers={{setFollowingCount}} /> :
                            switched == "followers" ?
                            <FollowersSection states ={followersState} handlers={{setFollowersCount}} /> :
                            <TweetSection states ={tweetState} handlers={{setTweetCount, setSelfCount}} data={{sessionId}}/> 

                        }
                    </div>
                </div>
            </div>
            {
                isNewTweetForm ? <div className="bg-blur tweet-modal-center">
                    <NewTweetForm 
                        cb={()=>setIsNewTweetForm(false)}
                    />
                    </div> : null
            }
            
        </>
    )
};

export default TweetsBoard;

// const FollowingSection =({states, handlers}:any)=>{
//     const followingPayload = states && states.payload || [];
//     const followingLoading = states && states.loading;
//     const followingError = states && states.error;
//     const followingErrMessage = states && states.message;
//     const {setFollowingCount} = handlers;
//     setFollowingCount(followingPayload.length)
//     // console.log(">>>> TweetSection", states);
//     return (
//         <>
//             {
//                 followingLoading ? <LoadingLinear message={"fetching"}/> : 
//                 followingError ? <h1>error</h1> :
//                 followingPayload[0] ? 
//                 followingPayload.map((x:any, key:any)=>{
//                     return <ProfileCard data={x}/>
//                 }) : <p className='box-text-small'>0 following</p>
//             }

//         </>
//     )
// }

// const FollowersSection =({states, handlers}:any)=>{
//     const followersPayload = states && states.payload || [];
//     const followersLoading = states && states.loading;
//     const followersError = states && states.error;
//     const followersErrMessage = states && states.message;
//     const {setFollowersCount} = handlers;
//     setFollowersCount(followersPayload.length)
//     // console.log(">>>> TweetSection", states);
//     return (
//         <>
//             {
//                 followersLoading ? <LoadingLinear message={"fetching"}/> : 
//                 followersError ? <h1>error</h1> :
//                 !followersPayload[0] ? <p className='box-text-small'>0 followers</p> :
//                 followersPayload.map((x:any, key:any)=>{
//                     return <ProfileCard data={x}/>
//                 })
//             }

//         </>
//     )
// }

