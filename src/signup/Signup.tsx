
import React from "react";
import {ISignupInterface} from "./signupInterface";

export const Signup:React.FC<ISignupInterface> =(props)=> {
    const {onSignUp, onUserEnter} =props;
    return (
        <form className='signup'>
            <p>
                Sign up
            </p>
            <input type='text' onChange ={onUserEnter}/>
            <input type='submit' onClick={onSignUp}/>
        </form>
    );
}
