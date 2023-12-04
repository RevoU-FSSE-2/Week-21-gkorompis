//CustomizedButtonProps

export interface CustomizedButtonProps {
  componentColor: {
    bgColorHover: string,
    borderColorHover: string,
    bgColorActive: string,
    borderColor: string
  },
  buttonName: string,
  onClick: ()=>void
};

//CutomizedFormProps
export interface CustomizedFormProps <T> {
    fields: {name:string, label:string, type: string}[]
    initialValues: T,
    onSubmitFormik: any,
    validationSchema: any,
    customFormStyles: {
      label: any,
      button: any
    },
    formName: string,
    cb?: any,
    isCancelButton: boolean,
    registerHandler?: any
}