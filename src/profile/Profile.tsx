import React, {useState} from "react";
import {data} from '../data/data';
import {IProfileInterface} from './profileInterface';
import {getNameById} from '../utils/getNameById';
import {Link} from "react-router-dom";
import {PostText} from "../posts/PostText";
import {SubscriptionList} from "../subscriptions/SubscriptionList";
import {getIdByName} from "../utils/getIdByName";
import {NewPost} from "./NewPost";

export const Profile: React.FC<IProfileInterface> = (props) => {
    let {signedUser, userOfProfile, showUserProfile, unsign} = props;
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [openPostEditor, setOpenTestEditor] = useState<boolean>(false);
    const signedUserID: string = getIdByName(signedUser, data);
    const userPosts = data.posts.byId.filter(post => post.author === signedUserID);
    if (userOfProfile === '') {
        userOfProfile = signedUser
    }
    const postElements = userPosts.map(post =>
        <PostText post={post} signedUserID={signedUserID} showUserProfile={showUserProfile}/>
    )
    const subscribe = (nameToSubscribe: string) => {
        return data.users.byId.find(user => user.name === signedUser)?.subscriptions.push(getIdByName(nameToSubscribe, data))
    }
    const unSubscribe = (nameToUnSubscribe: string) => {
        const index: number = data.users.byId.find(user => user.name === signedUser)!.subscriptions.indexOf(getIdByName(nameToUnSubscribe, data));
        if (index > -1) {
            data.users.byId.find(user => user.name === signedUser)!.subscriptions.splice(index, 1);
        }
    }
    const subscribers = (subsc: string): string[] => {
        let subscribedPeople: string[] = [];
        data.users.byId.map(user => {
            if (user.subscriptions.includes(getIdByName(subsc, data))) {
                subscribedPeople.push(user.name)
            }
        })
        return subscribedPeople
    };
    const subscribedTo = (userName: string): string[] => {
        let subscribedToArray: string[] = [];
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
    const isSubscribed = data.users.byId.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(userOfProfile, data))

    if (subscriptions.length > 0) {
        return <SubscriptionList subscriptions={subscriptions} onClose={onClose}/>
    } else if (openPostEditor) {
        return (
            <NewPost signedUserID={signedUserID} setOpenTestEditor={setOpenTestEditor}/>
        )
    } else
        return (
            <div className='posts card-body text-center col-sm-3'>
                {signedUser === userOfProfile &&
                <button className="btn btn-outline-danger" onClick={() => unsign(false)}>
                    Sign out
                </button>
                }
                <p className="card-text card-header"> {userOfProfile}</p>
                <p className="card-text card-header"
                   onClick={() => onShowSubscriptions(subscribers(userOfProfile))}> Subscribers: {subscribers(userOfProfile).length}</p>
                <p className="card-text card-header"
                   onClick={() => onShowSubscriptions(subscribedTo(userOfProfile))}> Subscribed
                    to: {data.users.byId.find(user => user.name === userOfProfile)?.subscriptions.length}</p>
                {signedUser !== userOfProfile && !isSubscribed &&
                <button className="btn btn-outline-success" onClick={() => subscribe(userOfProfile)}>
                    Subscribe
                </button>
                }
                {signedUser !== userOfProfile && isSubscribed &&
                <button className="btn btn-outline-primary" onClick={() => unSubscribe(userOfProfile)}>
                    Unsubscribe
                </button>
                }
                <p className="card-text card-header"> Your posts </p>
                {postElements}
                {signedUser === userOfProfile &&
                <button className="btn btn-outline-success" onClick={() => setOpenTestEditor(true)}>
                    +
                </button>
                }
                <Link to="/" onClick={() => showUserProfile('')}>
                    To posts
                </Link>
            </div>
        );

}
