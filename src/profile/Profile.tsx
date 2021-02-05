import React, {useState} from "react";
import {data} from '../data/data';
import {IProfileInterface} from './profileInterface';

import {Link} from "react-router-dom";
import {PostText} from "../posts/PostText";

export const Profile: React.FC<IProfileInterface> = (props) => {
    const {name, signedUserID, signedUser} = props;
    const userPosts = data.posts.byId.filter(post => post.author === signedUserID);
    const postElements = userPosts.map(post =>
        <PostText post={post} signedUserID={signedUserID}/>
    )
    const subscribe =()=>{
        return data.users.byId.find( user=>user.name===signedUserID)?.subscriptions.push(name)
    }

    return (
        <div className='posts card-body text-center col-sm-3'>
            <p className="card-text card-header"> {name}</p>
            { name !== signedUser &&
            <button className="btn btn-outline-primary" onClick={subscribe}>
                Subscribe
            </button>
            }

            {postElements}
            <Link to="/">
                To posts
            </Link>

        </div>

    );

}
