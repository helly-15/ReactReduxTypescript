import React, {useState} from 'react';
import './App.css';
import {Signup} from "./signup/Signup";
import {Posts} from './posts/Posts';
import {data} from './data/data'
import {User} from "./user/User";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import {Profile} from './profile/Profile';
import {useDispatch, useSelector} from "react-redux";
import {IUsersState} from "./reducers/usersReducer";
import {Post} from "./postClass/PostClass";
import {addPost, addPostsIds} from "./actions/postAction";
import {addUser, addUsersIds} from "./actions/userAction";
import {IStateInterface} from "./store/store";

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const [signedUserID, setSignedUserID] = useState<string>('');
    const [userOfProfile, setUserOfProfile] = useState<string>('');

    const users = useSelector<IStateInterface, IStateInterface['usersstate']["users"]["byId"]>(
        (state) => {
            console.log(state.usersstate.users +"state")
            return state.usersstate.users.byId}
    );
    const dispatch = useDispatch()
    const onSignUp = () => {
        setSigned(true);
        let isExistent = users.filter((user) => user.name === signedUser)
        if (isExistent.length > 0) {
            setSignedUserID(isExistent[0].username)
        } else {
            // let users: Array<User> = [];
            // users.push(new User(signedUser));
            //
            //
            let newUser = new User(signedUser);

            dispatch(addUser(newUser))
            dispatch(addUsersIds(newUser.username))
            setSignedUserID(newUser.username)
        }
    }
    const onUserEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignedUser(event.target.value);
    }
    const showUserProfile = (name: string) => {
        setUserOfProfile(name)
    }

    switch (signed) {
        case false:
            return (
                <Signup onSignUp={onSignUp} onUserEnter={onUserEnter} signedUser={signedUser}/>
            )
        case true:
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                <Posts signedUser={signedUser} signedUserID={signedUserID}
                                       userOfProfile={userOfProfile} showUserProfile={showUserProfile} unsign = {setSigned} />
                            </Route>
                            <Route path="/profile">
                                <Profile signedUser={signedUser} userOfProfile={userOfProfile}
                                         showUserProfile={showUserProfile} unsign = {setSigned}/>
                            </Route>

                        </Switch>
                    </div>

                </Router>

            )
    }
}

export default App;
