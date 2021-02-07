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
import { Profile } from './profile/Profile';

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const [signedUserID, setSignedUserID] = useState<string>('');
    const [nameOfUserProfile, setNameOfUserProfile] = useState<string>('');
    const onSignUp =()=>{
        setSigned(true);
        let isExistent = data.users.byId.filter((user) => user.name === signedUser)
        if (isExistent.length > 0){
            setSignedUserID( isExistent[0].username)
        }
        else {
            // let users: Array<User> = [];
            // users.push(new User(signedUser));
            //
            //
            let newUser = new User(signedUser);
            data.users.byId.push (newUser);
            data.users.allIds.push(newUser.username);
            setSignedUserID( newUser.username )
        }
    }
    const onUserEnter = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSignedUser(event.target.value);
    }
    const showUserProfile = (name:string)=>{
        setNameOfUserProfile(name)
    }

    switch (signed) {
        case false:
            return (
                <Signup onSignUp={onSignUp} onUserEnter={onUserEnter} signedUser={signedUser}/>
            )
            break;
        case true:
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                <Posts signedUser={signedUser} signedUserID ={signedUserID} nameOfUserProfile ={nameOfUserProfile} showUserProfile = {showUserProfile}/>
                            </Route>
                            <Route path="/profile">
                                <Profile signedUser={signedUser} nameOfUserProfile2={nameOfUserProfile} showUserProfile = {showUserProfile}/>
                            </Route>

                        </Switch>
                    </div>

                </Router>

                )
            break;
    }

}

export default App;
