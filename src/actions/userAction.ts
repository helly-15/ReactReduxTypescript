
export interface IAddUser {
    type: 'ADD_USER', payload: {
        username: string,
        name: string,
        subscriptions: string[]
    }
}
export interface IAddUsersIds {
    type: 'ADD_USERS_IDS', payload: string
}


export const addUser = (user: {
    username: string,
    name: string,
    subscriptions: string[]
}): IAddUser => ({
    type: "ADD_USER",
    payload: user,
});

export const addUsersIds = (userId: string): IAddUsersIds => ({
    type: "ADD_USERS_IDS",
    payload: userId,
});