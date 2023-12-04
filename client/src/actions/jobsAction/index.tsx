import { Dispatch } from "redux"

const actionTypes = {
    loading: 'JOBS_LOADING',
    success: 'JOBS_SUCCESS',
    error: 'JOBS_ERROR'
}

const dummyJobs= [
    {
        createdBy: "lorem",
        job: "task 10",
        status: "done"
    },
    {
        createdBy: "lorem",
        job: "task 1",
        status: "done"
    },
     {
        createdBy: "lorem",
        job: "task 1",
        status: "working"
    },
    {
        createdBy: "lorem",
        job: "task 13",
        status: "working",
    },
    {
        createdBy: "lorem",
        job: "task 18",
        status: "todo"
    },
    {
        createdBy: "lorem",
        job: "task 10",
        status: "done"
    },
    {
        createdBy: "lorem",
        job: "task 1",
        status: "todo"
    },
    {
        createdBy: "lorem",
        job: "task 3",
        status: "working"
    }
]


const jobsAction = (reduxState:any)=> async(dispatch:Dispatch) =>{
    try {
        console.log(">>>jobsactions")
        dispatch({type: actionTypes.loading});
        const payload = dummyJobs;
        dispatch({type: actionTypes.success, payload})
    } catch(error:any) {
        const {message} = error;
        console.log({error})
        dispatch({type: actionTypes.error, message})
    }
}

export default jobsAction; 