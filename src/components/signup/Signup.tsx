import React from "react";
import {ISignupInterface} from "./ISignupInterface";
import './Signup.scss'

export const Signup: React.FC<ISignupInterface> = (props) => {
    const {onSignUp, onUserEnter, signedUser} = props;
    return (
        <form className='signup'>
            <p className='signup-welcome'>
                Welcome!
            </p>
            <input className='signup-text' type='text' maxLength={12} onChange={onUserEnter} placeholder={"What's your name?"}/>
            <button className='signup-submit' type='submit' onClick={onSignUp} disabled={signedUser.length <= 3}>Sign up</button>
        </form>
    );
}
