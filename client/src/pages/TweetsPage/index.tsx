import './index.css'
import React, { useEffect, useState } from 'react';

import { RegisterForm, ProfileBoard, TweetsBoard} from '../../containers';
import { SlidingNavbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../utils/global';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';



const LandingPage = ()=>{
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reloadsSelector = useSelector((state:any)=>state.reloads);
    const reloadsLoading = reloadsSelector && reloadsSelector.loading;
    const reloadsError = reloadsSelector && reloadsSelector.error;

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
                                <TweetsBoard/> : <p>restricted access</p>
                                
                        }
                    </div>
                </div> 
            </div>
        </div>
        </>
    )
};

export default LandingPage

