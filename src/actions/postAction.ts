import {IPost} from "../reducers/postsReducer";

export interface IAddPost {
    type: 'ADD_POST',
    payload: IPost
}

export interface IAddPostsIds {
    type: 'ADD_POSTS_IDS',
    payload: string
}


export const addPost = (post: IPost): IAddPost => ({
    type: "ADD_POST",
    payload: post,
});

export const addPostsIds = (postId: string): IAddPostsIds => ({
    type: "ADD_POSTS_IDS",
    payload: postId,
});
