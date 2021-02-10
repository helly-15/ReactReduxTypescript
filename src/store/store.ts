import {createStore} from 'redux';
import {rootReducer} from "../reducers/rootReducer";

export const store = createStore(rootReducer)

export interface IStateInterface {
    postsstate: {
        posts: {
            byId:
                {
                    id: string,
                    author: string,
                    body: string,
                    likes: string[]
                }[],
            allIds: string[]
        },
    },
    usersstate: {
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

}
