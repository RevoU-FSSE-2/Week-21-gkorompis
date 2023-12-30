import React, { useEffect, useState } from 'react'
import "./index.css"

import {useDispatch, useSelector} from 'react-redux';
import { profileAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';

import { ButtonBar, Card, Infographics, ChunkTable, LoadingLinear } from '../../components';

const TodosBoard = () =>{
    const dispatch = useDispatch();

    const [isCardDeck, setIsCardDeck] = useState(true);

    const profileState = useSelector((state:any)=>state.profile);
    const profilePayload = profileState && profileState.payload || [];
    const profileLoading = profileState && profileState.loading;
    const profileError = profileState && profileState.error;
    const profileErrMessage = profileState && profileState.message;
    // console.log(">>>profileboard", {profilePayload});
    // console.log({profileLoading})


    useEffect(()=>{
        // console.log("profileactin", {profileAction})
        dispatch(profileAction("") as unknown as AnyAction)
    }, [dispatch])
    return (
        <>
            <div className="profile-board">
                
                {/* <div className='button-bar'>
                    <ButtonBar cb={setIsCardDeck}/>
                </div> */}
                <h3 className="profile-title-text">Profile</h3>
                <div className='profile-placeholder'>
                    {
                        <div className="table-decks-profile">
                            {
                                profileLoading ? <LoadingLinear message={"fetching"}/> :
                                profileError ? <p>error - {profileErrMessage}</p> : 
                                // <p>profile</p>
                                <ChunkTable data={profilePayload}/> 
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
};

export default TodosBoard;