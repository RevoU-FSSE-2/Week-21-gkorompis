import "./index.css"


const TweetCard = ({data}:any) =>{
    const {_id, createdBy, tweet} = data;
    return(
        <>
            <div className="tweet-card">
               <p className="tweet-texts tweet-text-user">@{createdBy}</p>
               <p className="tweet-texts tweet-text-tweets">"{tweet}"</p>
               <div className="tweet-card-footers">
                    <p className="tweet-texts tweet-text-footers">comments</p>
                    <p className="tweet-texts tweet-text-footers">follow</p>
               </div>
            </div>
        </>
    )
}

export default TweetCard;