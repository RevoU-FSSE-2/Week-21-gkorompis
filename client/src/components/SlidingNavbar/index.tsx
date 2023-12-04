import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';

const SlidingNavBar = ({isLogin, setIsLogin}:any) =>{
    const navigate = useNavigate()
    const logoutHandler = () =>{
        setIsLogin(false)
    };
    const navigateBoardHandler =() =>{
        navigate("/")
    }
    const navigateProfileHandler =() =>{
        navigate("/profile")
    }

    return (
        <>
            <div className={
                    "app-navbar app-navbar-slide-up"
                    + " " +
                    `
                    ${isLogin? 'app-navbar-slide-down' : 'app-navbar-slide-up'}
                    `
                    }>
                    <div className="app-navbar-logo">
                        <p className='app-navbar-text'>todos</p>
                    </div>
                    <div className="app-navbar-anchors">
                        <a href='#' className='app-navbar-anchors-text' onClick={navigateBoardHandler}>board</a>
                        <a href='#' className='app-navbar-anchors-text' onClick={navigateProfileHandler}>profile</a>
                        <a href='#' className='app-navbar-anchors-text' onClick={logoutHandler}>logout</a>
                    </div>
             </div>

        </>
    )
};

export default SlidingNavBar