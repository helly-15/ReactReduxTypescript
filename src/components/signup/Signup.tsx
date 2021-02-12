import React from "react";
import {ISignupInterface} from "./ISignupInterface";
import './Signup.css'

export const Signup: React.FC<ISignupInterface> = (props) => {
    const {onSignUp, onUserEnter, signedUser} = props;
    return (
        <form className='signup'>
            <p>
                Welcome!
            </p>
            <input type='text' maxLength={12} onChange={onUserEnter}/>
            <button type='submit' onClick={onSignUp} disabled={signedUser.length <= 3}>Sign up</button>
        </form>
    );
}
