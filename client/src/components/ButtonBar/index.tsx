import React from 'react';
import './index.css';

type ButtonBarProps = {
    cb: any;
}
const ButtonBar = ({cb}:ButtonBarProps) =>{

    const toggleCardHandler = () =>{
        cb(true);
    }
    const toggleTableHandler = () =>{
        cb(false);
    }
    return (
        <>
            <div className="button-bar-div">
                <button className="bar-button bar-button-left" onClick={toggleCardHandler}>cards</button>
                <button className="bar-button bar-button-right" onClick={toggleTableHandler}>table</button>
            </div>
        </>
    )
};

export default ButtonBar;