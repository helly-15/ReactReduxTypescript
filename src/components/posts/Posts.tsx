import React, {useState} from "react";
import {IPostsInterface} from './postsInterface';
import {Post} from './Post';
import {Link} from "react-router-dom";
import {Profile} from "../profile/Profile";
import {useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";

export const Posts: React.FC<IPostsInterface> = (props) => {
    const {signedUser, signedUserID, userOfProfile, showUserProfile, unsign} = props;
    const [showAllPosts, setShowAllPosts] = useState<boolean>(true);

    const posts = useSelector<IStateInterface, IStateInterface['postsstate']["posts"]["byId"]>(
        (state) => {
            return state.postsstate.posts.byId
        }
    );
    const users = useSelector<IStateInterface, IStateInterface['usersstate']["users"]["byId"]>(
        (state) => {
            return state.usersstate.users.byId
        }
    );
    const subscriptions = useSelector<IStateInterface, IStateInterface['subscriptionsstate']["subscriptions"]["byId"]>(
        (state) => {
            return state.subscriptionsstate.subscriptions.byId
        }
    );
    const postElements = posts.map((post) => {
        let userSubscriptions = subscriptions.filter(subscription => subscription.subscribedPerson === signedUser).map(subscription=>subscription.subscribedTo);
        if (showAllPosts) {
            return <Post post={post} signedUserID={signedUserID} showUserProfile={showUserProfile} key={Math.random()}/>
        } else if (userSubscriptions.includes(post.author)) {
            return <Post post={post} signedUserID={signedUserID} showUserProfile={showUserProfile} key={Math.random()}/>
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
