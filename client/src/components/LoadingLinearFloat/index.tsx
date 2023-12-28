import { LinearProgress } from "@mui/material";
import "./index.css";

const LoadingLinear = () =>{

    return(
        <>
            <div className="loading-linear-float-div bg-blur">
                <LinearProgress/>
            </div>
        </>
    )
};

export default LoadingLinear;