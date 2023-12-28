import './index.css'
import React, { useEffect, useState } from 'react';

import { RegisterForm, ProfileBoard } from '../../containers';
import { SlidingNavbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../utils/global';



const ProfilePage = ()=>{
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;


    useEffect(()=>{
        if(accessToken){
            setIsLogin(true)
        } else {
            setIsLogin(false)
            navigate('/')
        }
    }, [])
    return (
        <>
        <div className="app-background-profile">
            <div className="profile-page">
                <SlidingNavbar isLogin={isLogin} setIsLogin={setIsLogin}/>
                <div className="profile-app-body">
                    <div className="profile-grid-col-logo">
                        <div className="profile-logo-page-placeholder">
                            <h1 className="profile-logo-page-title">manage todos, share todos.</h1>
                            {/* <p className="logo-page-slur">manage your todos, share your todos.</p> */}
                        </div>
                    </div>
                    <div className="profile-grid-col-form">
                        {
                            isLogin ?
                                <ProfileBoard/> : <p>restricted access</p>
                                
                        }
                    </div>
                </div> 
            </div>
        </div>
        </>
    )
};

export default ProfilePage

