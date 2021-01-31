import React from "react";

export interface ISignupInterface{
    onSignUp():void,
    onUserEnter(event: React.ChangeEvent<HTMLInputElement>):void,
}
