import React from 'react';
import './index.css';

type ButtonBarProps = {
    cb: any;
    states?:any;
    handlers?: any;
}
const ButtonBar = ({cb, handlers}:ButtonBarProps) =>{
    const {
        setIsNewJobForm
    } = handlers
    const toggleCardHandler = () =>{
        cb(true);
    }
    const toggleTableHandler = () =>{
        cb(false);
    }
    const handleNewJob=()=>{
        setIsNewJobForm(true)
    }
    return (
        <>
            <button className="bar-button bar-button-far-right" onClick={handleNewJob}>new job</button>
            <div className="button-bar-div">
                <button className="bar-button bar-button-left" onClick={toggleCardHandler}>cards</button>
                <button className="bar-button bar-button-right" onClick={toggleTableHandler}>table</button>
                
            </div>
            
        </>
    )
};

export default ButtonBar;