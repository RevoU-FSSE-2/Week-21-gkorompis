import { useEffect } from "react";
import LoadingLinear from "../LoadingLinear";
import ProfileCard from "../ProfileCard";

const FollowersSection =({states, handlers}:any)=>{
    const followersPayload = states && states.payload || [];
    const followersLoading = states && states.loading;
    const followersError = states && states.error;
    const followersErrMessage = states && states.message;
    // const {setFollowersCount} = handlers;
    // setFollowersCount(followersPayload.length)
    // console.log(">>>> TweetSection", states);
    useEffect(()=>{
        const {setFollowersCount} = handlers;
        setFollowersCount(followersPayload.length)
    }, [followersPayload])
    return (
        <>
            {
                followersLoading ? <LoadingLinear message={"fetching"}/> : 
                followersError ? <h1>error</h1> :
                !followersPayload[0] ? <p className='box-text-small'>0 followers</p> :
                followersPayload.map((x:any, key:any)=>{
                    const uniqueId= x && x._id
                    return <ProfileCard data={x} key={uniqueId}/>
                })
            }

        </>
    )
}

export default FollowersSection