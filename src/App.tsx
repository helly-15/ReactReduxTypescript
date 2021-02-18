import React, {useState} from 'react';
import './App.scss'
import {Signup} from "./components/signup/Signup";
import {Posts} from './components/posts/Posts';
import {UserModel} from "./model/UserModel";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Profile} from './components/profile/Profile';
import {useDispatch, useSelector} from "react-redux";
import {addUser, addUsersIds} from "./actions/userAction";
import {IStateInterface} from "./store/store";

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const [signedUserID, setSignedUserID] = useState<string>('');
    const [userOfProfile, setUserOfProfile] = useState<string>('');

    const users = useSelector<IStateInterface, IStateInterface['usersstate']["users"]["byId"]>(
        (state) => {
            return state.usersstate.users.byId
        }
    );
    const dispatch = useDispatch()
    const onSignUp = () => {
        setSigned(true);
        let isExistent = users.filter((user) => user.name === signedUser)
        if (isExistent.length > 0) {
            setSignedUserID(isExistent[0].userId)
        } else {
            let newUser = new UserModel(signedUser);
            dispatch(addUser(newUser))
            dispatch(addUsersIds(newUser.userId))
            setSignedUserID(newUser.userId)
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
                                       userOfProfile={userOfProfile} showUserProfile={showUserProfile}
                                       unsign={setSigned}/>
                            </Route>
                            <Route path="/profile">
                                <Profile signedUser={signedUser} userOfProfile={userOfProfile}
                                         showUserProfile={showUserProfile} unsign={setSigned}/>
                            </Route>
                        </Switch>
                    </div>

                </Router>
            )
    }
}

export default App;
