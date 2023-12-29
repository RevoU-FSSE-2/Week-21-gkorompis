import { CustomizedForm, SnackBarMui } from "../../components";
import { BASE_URL, cookies } from "../../utils/global";
import * as Yup from 'yup'
import axios from 'axios';

import { useDispatch } from 'react-redux';
// import { actionItemsAction, cacheAction, jobAction, navigationAction } from '../../actions';
import { AnyAction } from '@reduxjs/toolkit';


import "./index.css"
import { useState } from "react";
// import { APP_TITLE } from "../../utils/global";
import React from "react";
import { useNavigate } from "react-router-dom";
import { jobsAction, tokensAction } from "../../actions";

interface ModalFormInitialValues {
    job: string,
    jobProgress: string,
    createdBy: string
}
interface ModalNewJobFormProps {
    cb?:any;
    sessionProfile?: any;
    documents?: any;
}

const NewJobForm = ({cb}:ModalNewJobFormProps) =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [openSnackBar,setOpenSnackBar] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    
    const loginFormFields = [
        {name: "job", label: "job", type: "text"}
        // {name: "jobProgress", label: "progress", type: "text"},
    ]

    const loginFormInitialValues = {
        job: "",
        jobProgress: "todo",
        createdBy: "admin"
    }

    const onSubmitFormik = async (values:any) => {
        try {
            dispatch({type: "JOBS_LOADING"});
            console.log("form submitted #2 ", {values});
            
            const allCookies = cookies.getAll();
            const {accessToken} = allCookies;
            const config = {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
            const responsePost = await axios.post(`${BASE_URL}/jobs/`, values, config);
            console.log({responsePost})
            const data = responsePost && responsePost.data || "";
            dispatch(jobsAction("") as any);
            //  dispatch({type: "RELOADS_SUCCESS"});
            cb()
        } catch (error:any ){ 
            dispatch({type: "RELOADS_SUCCESS"})
            cb()
            const {message} = error;
            console.log("form error", {error, message});
        }
    }

    const validationSchema = {
        job: Yup.string().required("this field is required")
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
        <><div className="new-job-form-div">
            <div className="app-modal-form div-center-xy-column">
                <h5 className="logo-page-title-small">todos</h5>
                <CustomizedForm<ModalFormInitialValues> 
                    fields={loginFormFields} 
                    initialValues={loginFormInitialValues} 
                    onSubmitFormik={onSubmitFormik} 
                    validationSchema={validationSchema}
                    customFormStyles={customFormStyles}
                    formName={"new job"} 
                    isCancelButton={true}   
                    cb={cb}
                />
            </div>
            <div>
                <SnackBarMui openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={errorMessage}/>
            </div>
            </div>
        </>
        
    )
};

export default NewJobForm;