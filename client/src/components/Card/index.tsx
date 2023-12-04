import './index.css'
import React from 'react'

type CardProps = {
    document: any,
    key: any
}

const Card = ({document}:CardProps)=>{

    const jobName = document && document.job;
    const createdBy = document && document.createdBy;
    const status = document && document.status;

    return (
        <>
            <div className="card-div">
                <div className="card">
                    <p className="card-text-title">{jobName}</p>
                    <p className="card-text-footer">by {createdBy}</p>
                    <div className="card-status-bar">
                        <div className="status-bar">
                            <p className="card-status-text">{status}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
};

export default Card;