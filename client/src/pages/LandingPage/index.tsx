import './index.css'
import React, { useEffect, useState } from 'react';

import { LoginForm, TodosBoard } from '../../containers';
import { LoadingLinear, SlidingNavbar } from '../../components';
import { cookies } from '../../utils/global';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LandingPage = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reloadsSelector = useSelector((state:any)=>state.reloads);
    const reloadsLoading = reloadsSelector && reloadsSelector.loading;
    const reloadsError = reloadsSelector && reloadsSelector.error;
    
    const [isLogin, setIsLogin] = useState(false);
    const cookiesAll = cookies.getAll();
    const {accessToken} = cookiesAll;
    useEffect(()=>{
        if(accessToken){
            setIsLogin(true)
        } else {
            setIsLogin(false)
            navigate('/')
        }
        // dispatch({type: "JOBS_LOADING"})
    }, [accessToken])
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
                                reloadsLoading ? <LoadingLinear message={"logging in"}/>:
                                isLogin ?
                                    <TodosBoard/>    :
                                        <div className="form-placeholder">
                                            <LoginForm cb={setIsLogin}/>    
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

