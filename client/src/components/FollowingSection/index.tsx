import { useEffect } from "react";
import LoadingLinear from "../LoadingLinear";
import ProfileCard from "../ProfileCard";

const FollowingSection =({states, handlers}:any)=>{
    const followingPayload = states && states.payload || [];
    const followingLoading = states && states.loading;
    const followingError = states && states.error;
    const followingErrMessage = states && states.message;
    // console.log(">>>> TweetSection", states);
    useEffect(()=>{
        const {setFollowingCount} = handlers;
        setFollowingCount(followingPayload.length)
    }, [followingPayload])
    return (
        <>
            {
                followingLoading ? <LoadingLinear message={"fetching"}/> : 
                followingError ? <h1>error</h1> :
                followingPayload[0] ? 
                followingPayload.map((x:any, key:any)=>{
                    const uniqueId= x && x._id
                    return <ProfileCard data={x} key={uniqueId}/>
                }) : <p className='box-text-small'>0 following</p>
            }

        </>
    )
}

export default FollowingSection;