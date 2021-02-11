import {IAddPost, IAddPostsIds} from "../actions/postAction";

export interface IPost {
    id: string,
    author: string,
    body: string
}

export interface IPostsState {
    posts: {
        byId: IPost[],
        allIds: string[]
    }
}


export const initialStateOfPosts = {
    posts: {
        byId: [
            {
                id: "post1",
                author: "user1",
                body: "To be or not to be",
            },
            {
                id: "post2",
                author: "user2",
                body: "Little mouse little mouse where is your house",
            }
        ],
        allIds: ["post1", "post2"]
    }
}




export const postsReducer = (state: IPostsState = initialStateOfPosts, action: IAddPost | IAddPostsIds) => {
    switch (action.type) {
        case "ADD_POST": {
            return {...state, posts: {...state.posts, byId: [...state.posts.byId, action.payload]}}
        }
        case "ADD_POSTS_IDS": {
            return {...state, posts: {...state.posts, allIds: [...state.posts.allIds, action.payload]}}
        }

        default:
            return state
    }
}
