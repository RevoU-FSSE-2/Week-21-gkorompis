import { BASE_URL, cookies } from "../../utils/global";
import axios from "axios";
import './index.css'
import React from 'react'
import { useDispatch } from "react-redux";
import { jobsAction } from "../../actions";

type CardProps = {
    document: any,
    key: any
}

const Card = ({document}:CardProps)=>{

    const jobId = document && document._id;
    const jobName = document && document.job;
    const createdBy = document && document.createdBy;
    const jobProgress = document && document.jobProgress;

    const dispatch = useDispatch();
    const handleUpdateProgress = async () =>{
        try {
            const allCookies = cookies.getAll();
            const {accessToken} = allCookies;
            const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
            dispatch({type: "JOBS_LOADING"})
            const responsePost = await axios.put(`${BASE_URL}/jobs/${jobId}/`,{jobProgress:"done"}, config);
            dispatch(jobsAction("") as any)
            // console.log({responsePost})
        }catch (err:any){
            // console.log(">>>error handleFollowUser", err);
            let customMessage = "";
            const response = err && err.response;
            const data = response && response.data;
            customMessage= data && data.message;
            alert(customMessage || err && err.message || "unknown")
            dispatch(jobsAction("") as any)
        }
        
    }
    const handleDelete = async () =>{
        try {
            const allCookies = cookies.getAll();
            const {accessToken} = allCookies;
            const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
            dispatch({type: "JOBS_LOADING"})
            const responsePost = await axios.delete(`${BASE_URL}/jobs/${jobId}/`, config);
            dispatch(jobsAction("") as any)
            // console.log({responsePost})
        }catch (err:any){
            
            // console.log(">>>error handleFollowUser", err);
            let customMessage = "";
            const response = err && err.response;
            const data = response && response.data;
            customMessage= data && data.message;
            alert(customMessage || err && err.message || "unknown")
            dispatch(jobsAction("") as any)
        }
        
    }

    return (
        <>
            <div className="card-div">
                <div className="card">
                    <p className="card-text-title">{jobName}</p>
                    <p className="card-text-footer">by {createdBy}</p>
                    <div className="card-status-bar">
                        <div className="status-bar" onClick={handleUpdateProgress}>
                            <p className="card-status-text">{jobProgress}</p>
                        </div>
                    </div>
                    <p className="card-text-delete" onClick={handleDelete}>delete</p>
                </div>
                
            </div>
        </>
    )
};

export default Card;