import React, {useState} from 'react';
import './App.css';
import {Signup} from "./signup/Signup";
import {Posts} from './posts/Posts';
import {data} from './data';

function App() {
    const [signed, setSigned] = useState<boolean>(false);
    const [signedUser, setSignedUser] = useState<string>('');
    const onSignUp =()=>{
        setSigned(true);

    }
    const onUserEnter = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSignedUser(event.target.value)
    }

    const posts = data.map((post) =>
        <div className='posts-post'>
            <h3> {post.user}</h3>
            <h4> {post.post}</h4>
        </div>);

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
