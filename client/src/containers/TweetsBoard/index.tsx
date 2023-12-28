import React, { useEffect, useState } from 'react'
import "./index.css"

import {useDispatch, useSelector} from 'react-redux';
import { followersAction, followingAction, tweetsAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';

import { ButtonBar, Card, Infographics, ChunkTable, TweetCard, ProfileCard, LoadingLinear } from '../../components';
import { cookies } from '../../utils/global';

const TodosBoard = () =>{
    const cookiesAll = cookies.getAll();
    const {sessionId} = cookiesAll;
    const dispatch = useDispatch();

    const [isCardDeck, setIsCardDeck] = useState(true);
    const [switched, setSwitched] = useState("");
    

    const tweetState = useSelector((state:any)=>state.tweets);

    const followingState = useSelector((state:any)=>state.following);
    const followersState = useSelector((state:any)=>state.followers);
    
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
            dispatch(tweetsAction(reduxState) as unknown as AnyAction)
        } else {
            dispatch(tweetsAction("") as unknown as AnyAction)
        }
        


    }
    useEffect(()=>{
        dispatch(tweetsAction("") as unknown as AnyAction)
        dispatch(followingAction("") as unknown as AnyAction)
        dispatch(followersAction("") as unknown as AnyAction)
    }, [dispatch])
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
                            <p className="box-text-big">100</p>
                            <p className="box-text-small">global</p>
                        </div>
                        <div className="profile-box box-self" onClick={()=>handleSwitch("self")}>
                            <p className="box-text-big">100</p>
                            <p className="box-text-small">self</p>
                        </div>
                        <div className="profile-box box-followers" onClick={()=>handleSwitch("following")}>
                            <p className="box-text-big">19</p>
                            <p className="box-text-small">following</p>
                        </div>
                        <div className="profile-box box-following" onClick={()=>handleSwitch("followers")}>
                            <p className="box-text-big">13</p>
                            <p className="box-text-small">followers</p>
                        </div>
                    </div>
                    <div className="tweets-section section-tweets">
                        {
                            switched ==  "global" ?
                            <TweetSection states ={tweetState} /> : 
                            switched == "self" ?
                            <TweetSection states ={tweetState} /> :
                            switched == "following" ?
                            <FollowingSection states ={followingState} /> :
                            switched == "followers" ?
                            <FollowersSection states ={followersState} /> :
                            <TweetSection states={tweetState} /> 

                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default TodosBoard;

const TweetSection =({states}:any)=>{
    const tweetsPayload = states && states.payload || [];
    const tweetsLoading = states && states.loading;
    const tweetsError = states && states.error;
    const tweetsErrMessage = states && states.message;
    console.log(">>>> TweetSection", states);
    return (
        <>
            {
                tweetsLoading ? <LoadingLinear message={"fetching"}/>  : 
                tweetsError ? <h1>error</h1> :
                tweetsPayload[0] ?
                tweetsPayload.map((x:any, key:any)=>{
                    return <TweetCard data={x}/>
                }) : <p className='box-text-small'>0 tweets</p>
            }
        </>
    )
};

const FollowingSection =({states}:any)=>{
    const followingPayload = states && states.payload || [];
    const followingLoading = states && states.loading;
    const followingError = states && states.error;
    const followingErrMessage = states && states.message;
    console.log(">>>> TweetSection", states);
    return (
        <>
            {
                followingLoading ? <LoadingLinear message={"fetching"}/> : 
                followingError ? <h1>error</h1> :
                followingPayload.map((x:any, key:any)=>{
                    return <ProfileCard data={x}/>
                })
            }

        </>
    )
}

const FollowersSection =({states}:any)=>{
    const followersPayload = states && states.payload || [];
    const followersLoading = states && states.loading;
    const followersError = states && states.error;
    const followersErrMessage = states && states.message;
    console.log(">>>> TweetSection", states);
    return (
        <>
            {
                followersLoading ? <LoadingLinear message={"fetching"}/> : 
                followersError ? <h1>error</h1> :
                !followersPayload[0] ? <p className='box-text-small'>0 followers</p> :
                followersPayload.map((x:any, key:any)=>{
                    return <ProfileCard data={x}/>
                })
            }

        </>
    )
}
