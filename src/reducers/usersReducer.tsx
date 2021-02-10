import {IAddUser, IAddUsersIds} from "../actions/userAction";

export interface IUsersState {
    users: {
        byId:
            {
                username: string,
                name: string,
                subscriptions: string[]
            }[],
        allIds: string[]
    }
}

export const initialStateOfUsers = {
    users: {
        byId: [
            {
                username: "user1",
                name: "Masha",
                subscriptions: ["user2"]
            },
            {
                username: "user2",
                name: "Misha",
                subscriptions: ["user1", "user3"]
            },
            {
                username: "user3",
                name: "Arisha",
                subscriptions: ["user1"]
            }
        ],
        allIds: ["user1", "user2", "user3"]
    }
}

export const usersReducer = (state: IUsersState = initialStateOfUsers, action: IAddUser | IAddUsersIds) => {

    switch (action.type) {
        case "ADD_USER": {
            return {...state, users: {...state.users, byId: [...state.users.byId, action.payload]}}
        }
        case "ADD_USERS_IDS": {
            return {...state, users: {...state.users, allIds: [...state.users.allIds, action.payload]}}
        }

        default:
            return state
    }
}
