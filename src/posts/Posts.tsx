import React from "react";
import {data} from '../data'
import {IPostsInterface} from './postsInterface'
export const Posts:React.FC<IPostsInterface> = (props)=> {
    const {signedUser} = props;
    const posts = data.map((post) =>
        <div className='posts-post'>
            <h3> {post.user}</h3>
            <h4> {post.post}</h4>
        </div>);
    return (
        <div className='posts'>
            <p> Hello {signedUser}!</p>
            <button >
                All posts
            </button>
            <button>
                Subscriptions
            </button>
            {posts}
            <button>
                To profile
            </button>
        </div>
    );
}
