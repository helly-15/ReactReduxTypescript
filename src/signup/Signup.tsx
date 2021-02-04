
import React from "react";
import {ISignupInterface} from "./signupInterface";

export const Signup:React.FC<ISignupInterface> =(props)=> {
    const {onSignUp, onUserEnter, signedUser} =props;
    return (
        <form className='signup'>
            <p>
                Sign up
            </p>
            <input type='text' maxLength={12} onChange ={onUserEnter}/>
            <input type='submit' onClick={onSignUp} disabled={signedUser.length <=3}/>
        </form>
    );
}
