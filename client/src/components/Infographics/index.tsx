import React from 'react'
import './index.css'

type InfographicsProps = {
    data: any;
}

const Infographics = ({data}: InfographicsProps) =>{
    const filteredDone = data.filter((document:any)=>{
        const status = document && document.status || "";
        return status.toLowerCase() == 'done';
    })

    const totalCount = data && data.length || 1;
    const doneCount = filteredDone && filteredDone.length || 0;
    const percentageDone =  ((+doneCount / +totalCount) * 100).toFixed(1);
    // const percentageDone = 0 


    const barStyleSmall = {
        width: `${percentageDone}%`,
        fontSize: '10px',
        marginLeft: '0px'
    }
    const barStyleUsual = {
        width: `${percentageDone}%`,
        fontSize: `16px`,
    }
    
    
    const isSmall = +percentageDone <= 45 ? true:false;
    const isTooSmall =  +percentageDone <= 10 ? true:false;
    console.log(50||percentageDone, isSmall, {percentageDone})
    console.log(isSmall ? barStyleSmall : barStyleUsual)
    return (
        <>
            <div className="infographics-div">
                <div className="info-count">
                    <p className="info-job-count-text">{totalCount}</p>
                    <p className="info-job-count-label-text">jobs on board </p>
                </div>
                <div className="info-bar">
                    <div className="bar">
                    
                        <div className="bar-thumb" style={isSmall ? barStyleSmall : barStyleUsual}>
                            {isTooSmall?
                                "" :
                                <p className="bar-thumb-text" > {percentageDone}% {isSmall ? "" : "done"}</p> 
                            }
                            
                        </div>
                    </div>
                </div>
             </div>
        </>
    )
};

export default Infographics;