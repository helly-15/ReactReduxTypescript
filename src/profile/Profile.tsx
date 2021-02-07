import React, {useState} from "react";
import {data} from '../data/data';
import {IProfileInterface} from './profileInterface';
import {getNameById} from '../utils/getNameById';
import {Link} from "react-router-dom";
import {PostText} from "../posts/PostText";
import {SubscriptionList} from "../subscriptions/SubscriptionList";
import {getIdByName} from "../utils/getIdByName";

export const Profile: React.FC<IProfileInterface> = (props) => {
    let { signedUser, nameOfUserProfile2,showUserProfile} = props;
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const signedUserID:string = getIdByName(signedUser,data);
    const userPosts = data.posts.byId.filter(post => post.author === signedUserID);
if (nameOfUserProfile2===''){
    nameOfUserProfile2 = signedUser
}
    const postElements = userPosts.map(post =>
        <PostText post={post} signedUserID={signedUserID} showUserProfile={showUserProfile}/>
    )
    const subscribe = (nameToSubscribe:string) => {
        return data.users.byId.find(user => user.name === signedUser)?.subscriptions.push(getIdByName(nameToSubscribe,data))
    }
    const unSubscribe = (nameToUnSubscribe:string) => {
        const index :number = data.users.byId.find(user => user.name === signedUser)!.subscriptions.indexOf(getIdByName(nameToUnSubscribe,data));
        if (index > -1) {
            data.users.byId.find(user => user.name === signedUser)!.subscriptions.splice(index, 1);
        }
    }
    const subscribers = (subsc: string): string[] => {
        let subscribedPeople: string[] = [];
        data.users.byId.map(user => {
            if (user.subscriptions.includes(getIdByName(subsc, data))){
                subscribedPeople.push(user.name)
            }
        })
        return subscribedPeople
    };
    const subscribedTo = (userName:string):string[] => {
        let subscribedToArray:string[] = [];
        data.users.byId.find(user => user.name === userName)?.subscriptions.map(person => subscribedToArray.push(getNameById(person, data)))
    return subscribedToArray
    }

    const onShowSubscriptions = (array: string[] | undefined) => {
        if (array) setSubscriptions(array)
        else return
    }
    const onClose = () => {
        setSubscriptions([])
    }

    if (subscriptions.length > 0) {
        return <SubscriptionList subscriptions={subscriptions} onClose={onClose}/>
    } else
        return (
            <div className='posts card-body text-center col-sm-3'>
                <p className="card-text card-header"> {nameOfUserProfile2}</p>
                <p className="card-text card-header"
                   onClick={() => onShowSubscriptions(subscribers(nameOfUserProfile2))}> Subscribers: {subscribers(nameOfUserProfile2).length}</p>
                <p className="card-text card-header"
                   onClick={() => onShowSubscriptions(subscribedTo(nameOfUserProfile2))}> Subscribed
                    to: {data.users.byId.find(user => user.name === nameOfUserProfile2)?.subscriptions.length}</p>
                {console.log (data.users.byId.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(nameOfUserProfile2,data)))}
                {signedUser !== nameOfUserProfile2 && !data.users.byId.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(nameOfUserProfile2,data)) &&
                <button className="btn btn-outline-primary" onClick={()=>subscribe(nameOfUserProfile2)}>
                    Subscribe
                </button>
                }
                {signedUser !== nameOfUserProfile2 && data.users.byId.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(nameOfUserProfile2,data)) &&
                <button className="btn btn-outline-primary" onClick={()=>unSubscribe(nameOfUserProfile2)}>
                    Unsubscribe
                </button>
                }
                {console.log (data.users.byId.find(user => user.name === signedUser)?.subscriptions)}
                <p className="card-text card-header"> Posts </p>
                {postElements}
                <Link to="/" onClick ={()=>showUserProfile('')}>
                    To posts
                </Link>

            </div>

        );

}
