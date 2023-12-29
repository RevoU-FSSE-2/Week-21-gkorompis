
import "./index.css"
import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik';
import { Input, Form as AntdForm } from 'antd';

import { CustomizedFormProps } from '../../utils/types';

const FormItem = AntdForm.Item;

interface Props {
    fields: any[],
    customFormStyles: {
        label: any,
        button: any
    },
    formName: string,
    cb: any,
    isCancelButton:boolean,
    registerHandler: any,
}



const TemplateForm = ({fields, customFormStyles, formName, cb, isCancelButton, registerHandler }:Props) =>{
    return(
        <Form>
            {
                fields.map((x, key)=>{
                    return(
                        <div key={key}>
                            <FormItem className="app-form-antd-form-item" label={<label style={customFormStyles.label}>{x.label}</label>} labelCol={{ span: 24 }} wrapperCol={{ span: 24 } }>
                            <Field as={Input} name={x.name} placeholder={x.label} style={{margin: "0px"}} type={x.type}/>
                            <div className="form-field-error">
                                <ErrorMessage name={x.name}>
                                     {(msg) => (
                                        <span style={{color: "#C7BCA1"}}>{msg}</span>
                                    )}
                                </ErrorMessage>
                            </div>
                            </FormItem>  
                        </div>                                                         
                    )
                })
            }
            {
                registerHandler ? <p className="click-here-text" onClick={registerHandler}>or click here to register</p> : null
            }
            <div className="page-button-group">
                <div className="submit-button page-button">
                    <button style={customFormStyles.button} type="submit">{formName} </button>
                </div>
                {
                    isCancelButton ? 
                    <div className="cancel-button page-button">
                        <button style={customFormStyles.button} type="button" onClick={cb}>back</button>
                    </div> : null
                }
                
            </div>
            
        </Form>
    )
};
const CustomizedForm =<T extends FormikValues > ({
    fields,
    initialValues,
    onSubmitFormik,
    validationSchema,
    customFormStyles,
    formName,
    cb,
    isCancelButton,
    registerHandler
}:CustomizedFormProps<T>) =>{

    // const [isLoading, setIsLoading] = useState("");
    const yupValidationSchema = Yup.object(validationSchema);
    return (
        <>
            <div className="form">
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmitFormik}
                    validationSchema={yupValidationSchema}
                    onKeyDown={(e:any) => {
                        if (e.key === 'Enter') {
                        return onSubmitFormik;
                        }
                    }}>
                    {() => {return<TemplateForm fields={fields} customFormStyles={customFormStyles} formName={formName} cb={cb} isCancelButton={isCancelButton} registerHandler={registerHandler}/>}}
                </Formik>
            </div>
        </>
    )
}
export default CustomizedForm;