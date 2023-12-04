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

interface ModalFormInitialValues {
    username: string,
    password: string
}
interface ModalRegisterFormProps {
    cb?:any;
    sessionProfile?: any;
    documents?: any;
}

const RegisterForm = ({cb}:ModalRegisterFormProps) =>{

    const navigate = useNavigate()

    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    
    const loginFormFields = [
        {name: "name", label: "name", type: "text"},
        {name: "email", label: "email", type: "email"},
        {name: "username", label: "username", type: "text"},
        {name: "password", label: "password", type: "password"}
    ]

    const loginFormInitialValues = {
        name: "",
        email: "",
        username: "",
        password: "",
        role: "member"

    }

    const onSubmitFormik = async (values:any) => {
        try {
            console.log("form submitted ", {values});
            cb(true)
        } catch (error:any ){ 
            const {message} = error;
            console.log("form error", {error, message});
        }

    }

    const validationSchema = {
        name: Yup.string().required("this field is required"),
        email: Yup.string().email().required("this field is required"),
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


    const navigateBack = ()=>{
        navigate("/")
    }

    

    return (    
        <>
            <div className="app-modal-form div-center-xy-column bg-blur">
                <h5 className="logo-page-title-small">todos</h5>
                <CustomizedForm<ModalFormInitialValues> 
                    fields={loginFormFields} 
                    initialValues={loginFormInitialValues} 
                    onSubmitFormik={onSubmitFormik} 
                    validationSchema={validationSchema}
                    customFormStyles={customFormStyles}
                    formName={"register"} 
                    isCancelButton={true}   
                    cb={navigateBack}
                />
            </div>
            <div>
                <SnackBarMui openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={errorMessage} isCancelButton={true} />
            </div>
        </>
        
    )
};

export default RegisterForm;