import React, {useState} from "react";
import {IProfileInterface} from './profileInterface';
import {getNameById} from '../../utils/getNameById';
import {Link} from "react-router-dom";
import {Post} from "../posts/Post";
import {SubscriptionList} from "../subscriptions/SubscriptionList";
import {getIdByName} from "../../utils/getIdByName";
import {NewPost} from "./NewPost";
import {useDispatch, useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";
import {PostModel} from "../../model/PostModel";
import {addPost, addPostsIds} from "../../actions/postAction";
import {SubscriptionModel} from "../../model/SubscriptionModel";
import {addSubscription, deleteSubscription} from "../../actions/subscriptionAction";

export const Profile: React.FC<IProfileInterface> = (props) => {
    let {signedUser, userOfProfile, showUserProfile, unsign} = props;
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [openPostEditor, setOpenTestEditor] = useState<boolean>(false);
    const dispatch = useDispatch();
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
    const subscriptionsFromStore = useSelector<IStateInterface, IStateInterface['subscriptionsstate']["subscriptions"]["byId"]>(
        (state) => {
            return state.subscriptionsstate.subscriptions.byId
        }
    );
    const signedUserID: string = getIdByName(signedUser, users);
    const userPosts = posts.filter(post => post.author === signedUserID);

    if (userOfProfile === '') {
        userOfProfile = signedUser
    }
    const postElements = userPosts.map(post =>
        <Post post={post} signedUserID={signedUserID} showUserProfile={showUserProfile} key={Math.random()}/>
    )
    const subscribe = (nameToSubscribe: string) => {
        let newSubscription = new SubscriptionModel(signedUserID, getIdByName(nameToSubscribe, users))
        dispatch(addSubscription(newSubscription))
       // return users.find(user => user.name === signedUser)?.subscriptions.push(getIdByName(nameToSubscribe, users))
    }
    const unSubscribe = (nameToUnSubscribe: string) => {
        dispatch(deleteSubscription(signedUserID, getIdByName(nameToUnSubscribe, users)))
        // const index: number = users.find(user => user.name === signedUser)!.subscriptions.indexOf(getIdByName(nameToUnSubscribe, users));
        // if (index > -1) {
        //     users.find(user => user.name === signedUser)!.subscriptions.splice(index, 1);
        // }
    }
    const subscribers = (profUser: string): string[] => {
        let subscribedPeople: string[] = [];
        subscriptionsFromStore.forEach(subs=>{
            if (subs.subscribedTo ===profUser){
                subscribedPeople.push(getNameById(subs.subscribedPerson, users))
            }
        })
        // users.map(user => {
        //     if (user.subscriptions.includes(getIdByName(subsc, users))) {
        //         subscribedPeople.push(user.name)
        //     }
        // })
        return subscribedPeople
    };
    const subscribedTo = (profUser: string): string[] => {
        let subscribedToArray: string[] = [];
        subscriptionsFromStore.forEach(subs=>{
            if (subs.subscribedPerson ===profUser){
                subscribedToArray.push(getNameById(subs.subscribedTo, users))
            }
        })
        // users.find(user => user.name === userName)?.subscriptions.map(person => subscribedToArray.push(getNameById(person, users)))
        return subscribedToArray
    }
    const onShowSubscriptions = (array: string[] | undefined) => {
        if (array) setSubscriptions(array)
        else return
    }
    const onClose = () => {
        setSubscriptions([])
    }
    const isSubscribed = subscribedTo(signedUserID).includes(getIdByName(userOfProfile, users))
    //const isSubscribed = users.find(user => user.name === signedUser)?.subscriptions.includes(getIdByName(userOfProfile, users))

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
                   onClick={() => onShowSubscriptions(subscribers(getIdByName(userOfProfile, users)))}> Subscribers: {subscribers(getIdByName(userOfProfile, users)).length}</p>
                <p className="card-text card-header"
                   onClick={() => onShowSubscriptions(subscribedTo(getIdByName(userOfProfile, users)))}> Subscribed
                    to: {subscribedTo(getIdByName(userOfProfile, users)).length}</p>
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
