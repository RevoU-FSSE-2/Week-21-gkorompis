import { useEffect } from "react";
import LoadingLinear from "../LoadingLinear";
import TweetCard from "../TweetCard";

const TweetSection =({states, handlers, data}:any)=>{
    const tweetsPayload = states && states.payload || [];
    const tweetsLoading = states && states.loading;
    const tweetsError = states && states.error;
    const tweetsErrMessage = states && states.message;
    const {sessionId} = data;
    const tweetsSelf = tweetsPayload.filter((x:any)=>{return x.createdBy == sessionId})
    const {setTweetCount, setSelfCount} = handlers;
    
    
    useEffect(()=>{
        setTweetCount(tweetsPayload.length)
        setSelfCount(tweetsSelf.length)
    }, [tweetsPayload])
    // console.log(">>>> TweetSection #", states);
    return (
        <>
            {
                tweetsLoading ? <LoadingLinear message={"fetching"}/>  : 
                tweetsError ? <h1>error</h1> :
                tweetsPayload[0] ?
                tweetsPayload.reverse().map((x:any, item:any)=>{
                    const uid = x && x._id
                    const uniqueKey = item + uid
                    // console.log(uniqueKey)
                    return <TweetCard data={x} key={uniqueKey} />
                }) : <p className='box-text-small'>0 tweets</p>
            }
        </>
    )
};

export default TweetSection;