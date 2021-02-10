import React, {useState} from "react";
import {IProfileInterface} from './profileInterface';
import {getNameById} from '../utils/getNameById';
import {Link} from "react-router-dom";
import {PostText} from "../posts/PostText";
import {SubscriptionList} from "../subscriptions/SubscriptionList";
import {getIdByName} from "../utils/getIdByName";
import {NewPost} from "./NewPost";
import {useSelector} from "react-redux";
import {IStateInterface} from "../store/store";

export const Profile: React.FC<IProfileInterface> = (props) => {
    let {signedUser, userOfProfile, showUserProfile, unsign} = props;
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [openPostEditor, setOpenTestEditor] = useState<boolean>(false);

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
    const signedUserID: string = getIdByName(signedUser, users);
    const userPosts = posts.filter(post => post.author === signedUserID);

    if (userOfProfile === '') {
        userOfProfile = signedUser
    }
    const postElements = userPosts.map(post =>
        <PostText post={post} signedUserID={signedUserID} showUserProfile={showUserProfile}/>
    )
    const subscribe = (nameToSubscribe: string) => {
        return users.find(user => user.name === signedUser)?.subscriptions.push(getIdByName(nameToSubscribe, users))
    }
    const unSubscribe = (nameToUnSubscribe: string) => {
        const index: number = users.find(user => user.name === signedUser)!.subscriptions.indexOf(getIdByName(nameToUnSubscribe, users));
        if (index > -1) {
            users.find(user => user.name === signedUser)!.subscriptions.splice(index, 1);
        }
    }
    const subscribers = (subsc: string): string[] => {
        let subscribedPeople: string[] = [];
        users.map(user => {
            if (user.subscriptions.includes(getIdByName(subsc, users))) {
                subscribedPeople.push(user.name)
            }
        })
        return subscribedPeople
    };
    const subscribedTo = (userName: string): string[] => {
        let subscribedToArray: string[] = [];
        users.find(user => user.name === userName)?.subscriptions.map(person => subscribedToArray.push(getNameById(person, users)))
        return subscribedToArray
    }
    const onShowSubscriptions = (array: string[] | undefined) => {
        if (array) setSubscriptions(array)
        else return
    }
    const onClose = () => {
        setSubscriptions([])
    }
    const isSubscribed = users.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(userOfProfile, users))

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
                    to: {users.find(user => user.name === userOfProfile)?.subscriptions.length}</p>
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
