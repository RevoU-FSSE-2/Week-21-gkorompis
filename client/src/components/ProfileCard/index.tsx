import "./index.css"


const ProfileCard = ({data}:any) =>{
    const {_id, following, followers, tweets, username} = data;
    return(
        <>
            <div className="profile-card">
               <div className="profile-card-header">
                    <p className="profile-card-header-text">{username}</p>
               </div>
               <div className="profile-card-body">
                    <div className="profile-card-box card-box-following">
                        <p className="card-box-big-text">{following && following.length}</p>
                        <p className="card-box-small-text">following</p>
                    </div>
                    <div className="profile-card-box card-box-followers">
                        <p className="card-box-big-text">{followers && followers.length}</p>
                        <p className="card-box-small-text">followers</p>
                    </div>
               </div>
            </div>
        </>
    )
}

export default ProfileCard;