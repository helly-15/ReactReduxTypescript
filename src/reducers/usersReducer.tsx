import {IAddUser, IAddUsersIds} from "../actions/userAction";

export interface IUser {
    userId: string,
    name: string,
}

export interface IUsersState {
    users: {
        byId: IUser[],
        allIds: string[]
    }
}

export const initialStateOfUsers = {
    users: {
        byId: [
            {
                userId: "user1",
                name: "Masha",
            },
            {
                userId: "user2",
                name: "Misha",
            },
            {
                userId: "user3",
                name: "Arisha",
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
