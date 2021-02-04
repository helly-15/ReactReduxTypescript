import React, {useState} from "react";
import {data} from '../data/data';
import {IPostsInterface} from './postsInterface';
import {PostText} from './PostText';
export const Posts:React.FC<IPostsInterface> = (props)=> {
    const {signedUser, signedUserID} = props;
    const [showAllPosts, setShowAllPosts] = useState<boolean>(true);


    const postElements = data.posts.byId.map((post)=>{
        let userSubscriptions = data.users.byId.filter(user=>user.name === signedUser)[0].subscriptions;
        if (showAllPosts){
            return <PostText post ={post} signedUserID={signedUserID}/>
        }
        else if (userSubscriptions.includes(post.author)){
            return <PostText post ={post} signedUserID={signedUserID}/>
        }

    })

    return (
        <div className='posts card-body text-center col-sm-3'>
            <p className="card-text card-header"> Hello {signedUser}!</p>
            <button className="btn btn-outline-primary" onClick={()=>setShowAllPosts(true)}>
                All posts
            </button>
            <button className="btn btn-outline-primary" onClick={()=>setShowAllPosts(false)}>
                Subscriptions
            </button>
            {postElements}
            <button className="btn btn-outline-info">
                To profile
            </button>
        </div>
    );
}
