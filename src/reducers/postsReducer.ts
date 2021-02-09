import {IAddPost, IAddPostsIds} from "../actions/postAction";

export interface IPostsState {
    posts: {
        byId:
            {
                id: string,
                author: string,
                body: string,
                likes: string[]
            }[],
        allIds: string[]
    }
}
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

export const initialState = {
    posts: {
        byId: [
            {
                id: "post1",
                author: "user1",
                body: "To be or not to be",
                likes: ["user2", "user3"]
            },
            {
                id: "post2",
                author: "user2",
                body: "Little mouse little mouse where is your house",
                likes: ["user1", "user3"]
            }
        ],
        allIds: ["post1", "post2"]
    },
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


export const postsReducer = (state: IPostsState = initialState, action: IAddPost | IAddPostsIds) => {
    switch (action.type) {
        case "ADD_POST": {
            console.log("ADD_POST event")
            return {...state, posts: { ...state.posts, byId: [...state.posts.byId, action.payload] }}
        }
        case "ADD_POSTS_IDS": {
            console.log("ADD_POSTS_IDS event")
            return {...state, posts: { ...state.posts, allIds: [...state.posts.allIds, action.payload] }}
        }
        default:
            return state
    }
}
