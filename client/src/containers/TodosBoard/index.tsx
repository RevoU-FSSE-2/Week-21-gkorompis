import React, { useEffect, useState } from 'react'
import "./index.css"

import {useDispatch, useSelector} from 'react-redux';
import { jobsAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';

import { ButtonBar, Card, Infographics, ChunkTable, LoadingLinear } from '../../components';
import {NewJobForm} from '..'

const TodosBoard = () =>{
    const dispatch = useDispatch();

    const [isCardDeck, setIsCardDeck] = useState(true);
    const [isNewJobForm, setIsNewJobForm] = useState(false);

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
                    <ButtonBar cb={setIsCardDeck} handlers={{setIsNewJobForm}}/>
                </div>
                <div className='jobs-placeholder'>
                    {
                        isCardDeck ?
                            <div className="card-decks">
                                {
                                    jobsLoading ? <LoadingLinear message={"fetching"}/>:
                                    jobsError ? <p>error - {jobsErrMessage}</p> : 
                                    jobsPayload.map((doc:any, key:any)=>{
                                        return <Card document={doc} key={key}/>
                                    })
                                }
                            </div> :
                            <div className="table-decks">
                                {
                                    jobsLoading ? <LoadingLinear message={"fetching"}/> :
                                    jobsError ? <p>error - {jobsErrMessage}</p> : 
                                    <ChunkTable data={jobsPayload}/>
                                }
                            </div>


                    }
                    
                </div>
            </div>
            {
                isNewJobForm ? <div className="bg-blur modal-center">
                    <NewJobForm 
                        cb={()=>setIsNewJobForm(false)}
                    />
                    </div> : null
            }
        </>
    )
};



export default TodosBoard;