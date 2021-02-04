import React, {useState} from 'react';
import './App.css';
import {Signup} from "./signup/Signup";
import {Posts} from './posts/Posts';
import {data} from './data/data'
import {User} from "./user/User";

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const [signedUserID, setSignedUserID] = useState<string>('');
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

    switch (signed) {
        case false:
            return (
                <Signup onSignUp={onSignUp} onUserEnter={onUserEnter} signedUser={signedUser}/>
            )
            break;
        case true:
            return (
                <Posts signedUser={signedUser}/>
                )
            break;
    }

}

export default App;
