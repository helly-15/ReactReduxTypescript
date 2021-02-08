import React, {useState} from "react";
import {data} from '../data/data';
import {IPostsInterface} from './postsInterface';
import {PostText} from './PostText';
import {Link} from "react-router-dom";
import {Profile} from "../profile/Profile";

export const Posts: React.FC<IPostsInterface> = (props) => {
    const {signedUser, signedUserID, userOfProfile, showUserProfile, unsign} = props;
    const [showAllPosts, setShowAllPosts] = useState<boolean>(true);
    const postElements = data.posts.byId.map((post) => {
        let userSubscriptions = data.users.byId.filter(user => user.name === signedUser)[0].subscriptions;
        if (showAllPosts) {
            return <PostText post={post} signedUserID={signedUserID} showUserProfile={showUserProfile}/>
        } else if (userSubscriptions.includes(post.author)) {
            return <PostText post={post} signedUserID={signedUserID} showUserProfile={showUserProfile}/>
        }
    })
    switch (userOfProfile === '') {
        case true:
            return (
                <div className='posts card-body text-center col-sm-3'>
                    <p className="card-text card-header"
                       onClick={() => showUserProfile(signedUser)}> Hello {signedUser}!</p>
                    <button className="btn btn-outline-primary" onClick={() => setShowAllPosts(true)}>
                        All posts
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => setShowAllPosts(false)}>
                        Subscriptions
                    </button>
                    {postElements}
                    <Link to="/profile">
                        To profile
                    </Link>
                </div>
            );
        case false:
            return (
                <Profile signedUser={signedUser} userOfProfile={userOfProfile}
                         showUserProfile={showUserProfile} unsign={unsign}/>
            )
    }
}
