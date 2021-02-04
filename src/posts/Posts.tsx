import React from "react";
import {data} from '../data/data';
import {IPostsInterface} from './postsInterface';
export const Posts:React.FC<IPostsInterface> = (props)=> {
    const {signedUser} = props;

    const postElements = data.posts.byId.map((post)=>{
        return <div className='posts-post'>
            <h3> {post.author}</h3>
            <h4> {post.body}</h4>
        </div>
    })

    return (
        <div className='posts'>
            <p> Hello {signedUser}!</p>
            <button>
                All posts
            </button>
            <button>
                Subscriptions
            </button>
            {postElements}
            <button>
                To profile
            </button>
        </div>
    );
}
