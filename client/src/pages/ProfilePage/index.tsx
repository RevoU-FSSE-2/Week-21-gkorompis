import './index.css'
import React, { useState } from 'react';

import { RegisterForm, ProfileBoard } from '../../containers';
import { SlidingNavbar } from '../../components';



const LandingPage = ()=>{
const [isLogin, setIsLogin] = useState(true);

    return (
        <>
        <div className="app-background">
            <div className="landing-page">
                <SlidingNavbar isLogin={isLogin} setIsLogin={setIsLogin}/>
                <div className="app-body">
                    <div className="grid-col-logo">
                        <div className="logo-page-placeholder">
                            <h1 className="logo-page-title">manage todos, share todos.</h1>
                            {/* <p className="logo-page-slur">manage your todos, share your todos.</p> */}
                        </div>
                    </div>
                    <div className="grid-col-form">
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

export default LandingPage

