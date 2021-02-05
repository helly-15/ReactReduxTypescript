import React, {useState} from "react";
import {data} from '../data/data';
import {IProfileInterface} from './profileInterface';

import {Link} from "react-router-dom";
import {PostText} from "../posts/PostText";
import {SubscriptionList} from "../subscriptions/SubscriptionList";

export const Profile: React.FC<IProfileInterface> = (props) => {
    const {name, signedUserID, signedUser} = props;
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const userPosts = data.posts.byId.filter(post => post.author === signedUserID);
    const postElements = userPosts.map(post =>
        <PostText post={post} signedUserID={signedUserID}/>
    )
    const subscribe =()=>{
        return data.users.byId.find( user=>user.name===signedUserID)?.subscriptions.push(name)
    }
const subscribers =(subscTo:string):string[]=>{
        let subscribedPeople:string[] =[];
         data.users.byId.map(user=>{ if(user.subscriptions.includes(subscTo)) subscribedPeople.push(user.name)
        })
    return subscribedPeople
}
 const onShowSubscriptions =(array:string[]|undefined)=>{
       if (array) setSubscriptions(array)
     else return
 }
    const onClose =()=>{
        setSubscriptions([])
    }
if (subscriptions.length>0){
    return <SubscriptionList subscriptions={subscriptions} onClose = {onClose}/>
} else
    return (
        <div className='posts card-body text-center col-sm-3'>
            <p className="card-text card-header"> {name}</p>
            <p className="card-text card-header" onClick={()=>onShowSubscriptions(subscribers(signedUserID))}>  Subscribers:  {subscribers(signedUserID).length}</p>
            <p className="card-text card-header" onClick={()=>onShowSubscriptions(data.users.byId.find(user=>user.name===signedUser)?.subscriptions)}> Subscribed to: {data.users.byId.find(user=>user.name===signedUser)?.subscriptions.length}</p>
            { name !== signedUser &&
            <button className="btn btn-outline-primary" onClick={subscribe}>
                Subscribe
            </button>
            }
            <p className="card-text card-header"> Posts </p>
            {postElements}
            <Link to="/">
                To posts
            </Link>

        </div>

    );

}
