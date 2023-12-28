import { CustomizedForm, SnackBarMui } from "../../components";
import { BASE_URL } from "../../utils/global";
import * as Yup from 'yup'
import axios from 'axios';

import { useDispatch } from 'react-redux';
// import { actionItemsAction, cacheAction, jobsAction, navigationAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';


import "./index.css"
import { useState } from "react";
// import { APP_TITLE } from "../../utils/global";
import React from "react";
import { useNavigate } from "react-router-dom";
import { tokensAction } from "../../actions";

interface ModalFormInitialValues {
    username: string,
    password: string
}
interface ModalLoginFormProps {
    cb?:any;
    sessionProfile?: any;
    documents?: any;
}

const LoginForm = ({cb}:ModalLoginFormProps) =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    
    const loginFormFields = [
        {name: "username", label: "username", type: "text"},
        {name: "password", label: "password", type: "password"},
    ]

    const loginFormInitialValues = {
        username: "",
        password: ""
    }

    const onSubmitFormik = async (values:any) => {
        try {
            console.log("form submitted #2 ", {values});
            dispatch({type: "RELOADS_LOADING"})
            const responseLogin = await axios.post(`${BASE_URL}/auth/login/`, values);
            console.log({responseLogin})
            const data = responseLogin && responseLogin.data || "";
            const tokens = {
                access: {
                    token: data
                },
                refresh: {
                    token: data
                }
            }
            console.log({tokens})
            dispatch({type: "RELOADS_SUCCESS"})
            dispatch(tokensAction({reduxState: {tokens}}) as any)
            cb(true)
        } catch (error:any ){ 
            dispatch({type: "RELOADS_SUCCESS"})
            cb(false)
            const {message} = error;
            console.log("form error", {error, message});
        }
    }

    const validationSchema = {
        username: Yup.string().required("this field is required"),
        password: Yup.string().required("this field is required")
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must be alphanumeric')
    }

    const customFormStyles = {
        label: {
            color: "#F1F0E8",
            // margin: "0px"
        }, 
        button: {
            backgroundColor: "#C7BCA1",
            fontSize: "15px",
            border: "0px",
            cursor: "pointer",
            borderWidth: "0px",
            color: "#65647C",
            height: "37px",
            width: "70px",
            borderRadius: "5px"
        }
    }


    const registerHandler = () =>{
        navigate("/register")
    }

    

    return (    
        <>
            <div className="app-modal-form div-center-xy-column">
                <h5 className="logo-page-title-small">todos</h5>
                <CustomizedForm<ModalFormInitialValues> 
                    fields={loginFormFields} 
                    initialValues={loginFormInitialValues} 
                    onSubmitFormik={onSubmitFormik} 
                    validationSchema={validationSchema}
                    customFormStyles={customFormStyles}
                    formName={"log in"} 
                    isCancelButton={false}   
                    registerHandler={registerHandler}
                />
            </div>
            <div>
                <SnackBarMui openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={errorMessage}/>
            </div>
        </>
        
    )
};

export default LoginForm;