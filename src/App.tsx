import React, {useState} from 'react';
import './App.css';
import {Signup} from "./signup/Signup";
import {Posts} from './posts/Posts';
import {data} from './data/data';

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const onSignUp =()=>{
        setSigned(true);

    }
    const onUserEnter = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSignedUser(event.target.value)
    }

    switch (signed) {
        case false:
            return (
                <Signup onSignUp={onSignUp} onUserEnter={onUserEnter}/>

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
