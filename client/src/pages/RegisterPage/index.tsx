import './index.css'
import React, { useState } from 'react';

import { RegisterForm, TodosBoard } from '../../containers';
import { SlidingNavbar } from '../../components';
import { useNavigate } from 'react-router-dom';



const LandingPage = ()=>{
const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
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
                                <TodosBoard/>    :
                                    <div className="form-placeholder-register">
                                        <RegisterForm cb={()=>navigate('/')}/>   
                                    </div>
                                
                        }
                    </div>
                </div> 
            </div>
        </div>
        </>
    )
};

export default LandingPage

