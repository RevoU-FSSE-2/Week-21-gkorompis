import React, { useEffect, useState } from 'react'
import "./index.css"

import {useDispatch, useSelector} from 'react-redux';
import { jobsAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';

import { ButtonBar, Card, Infographics, ChunkTable } from '../../components';

const TodosBoard = () =>{
    const dispatch = useDispatch();

    const [isCardDeck, setIsCardDeck] = useState(true);

    const jobsState = useSelector((state:any)=>state.jobs);
    const jobsPayload = jobsState && jobsState.payload || [];
    const jobsLoading = jobsState && jobsState.loading;
    const jobsError = jobsState && jobsState.error;
    const jobsErrMessage = jobsState && jobsState.message;
    console.log(">>>jobsboard", {jobsPayload});


    useEffect(()=>{
        dispatch(jobsAction("") as unknown as AnyAction)
    }, [dispatch])
    return (
        <>
            <div className="todos-board">
                <div className='infographics'>
                    <Infographics data={jobsPayload}/>
                </div>
                <div className='button-bar'>
                    <ButtonBar cb={setIsCardDeck}/>
                </div>
                <div className='jobs-placeholder'>
                    {
                        isCardDeck ?
                            <div className="card-decks">
                                {
                                    jobsLoading ? <p>loading...</p> :
                                    jobsError ? <p>error - {jobsErrMessage}</p> : 
                                    jobsPayload.map((doc:any, key:any)=>{
                                        return <Card document={doc} key={key}/>
                                    })
                                }
                            </div> :
                            <div className="table-decks">
                                {
                                    jobsLoading ? <p>loading...</p> :
                                    jobsError ? <p>error - {jobsErrMessage}</p> : 
                                    <ChunkTable data={jobsPayload}/>
                                }
                            </div>


                    }
                    
                </div>
            </div>
        </>
    )
};

export default TodosBoard;