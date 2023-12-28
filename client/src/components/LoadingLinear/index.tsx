import { LinearProgress } from "@mui/material";
import "./index.css";

const LoadingLinear = ({message}:any) =>{
    const loadingText = message || "wait a moment"
    return(
        <>
            <div className="loading-linear-div">
                <p className="loading-text">{loadingText}</p>
                <div className="loading-component">
                    <LinearProgress/>
                </div>
                
            </div>
        </>
    )
};

export default LoadingLinear;