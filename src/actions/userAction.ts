import {IUser} from "../reducers/usersReducer";

export interface IAddUser {
    type: 'ADD_USER',
    payload: IUser
}

export interface IAddUsersIds {
    type: 'ADD_USERS_IDS',
    payload: string
}


export const addUser = (user: IUser): IAddUser => ({
    type: "ADD_USER",
    payload: user,
});

export const addUsersIds = (userId: string): IAddUsersIds => ({
    type: "ADD_USERS_IDS",
    payload: userId,
});
