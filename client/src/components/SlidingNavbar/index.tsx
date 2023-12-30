import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../utils/global';

const SlidingNavBar = ({isLogin, setIsLogin}:any) =>{
    const navigate = useNavigate()
    const logoutHandler = () =>{
        // console.log(">>>logingout")
        cookies.remove("refreshToken", {path: "/"});
        cookies.remove("accessToken", {path: "/"});
        cookies.remove("sessionId", {path: "/"});
        cookies.remove("profileId", {path: "/"});
        navigate("/")
        setIsLogin(false)
    };
    const navigateBoardHandler =() =>{
        navigate("/")
    }
    const navigateProfileHandler =() =>{
        navigate("/profile")
    }

    const navigateTweetsHandler =() =>{
        navigate("/tweets")
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
                        <a href='#' className='app-navbar-anchors-text' onClick={navigateProfileHandler}>accounts</a>
                         <a href='#' className='app-navbar-anchors-text' onClick={navigateTweetsHandler}>tweets</a>
                        <a href='#' className='app-navbar-anchors-text' onClick={logoutHandler}>logout</a>
                    </div>
             </div>

        </>
    )
};

export default SlidingNavBar