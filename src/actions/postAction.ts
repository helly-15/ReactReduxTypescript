export interface IAddPost {
    type: 'ADD_POST', payload: {
        id: string,
        author: string,
        body: string,
        likes: string[]
    }
}
export interface IAddPostsIds {
    type: 'ADD_POSTS_IDS', payload: string
}


export const addPost = (post: {
    id: string,
    author: string,
    body: string,
    likes: string[]
}): IAddPost => ({
    type: "ADD_POST",
    payload: post,
});

export const addPostsIds = (postId: string): IAddPostsIds => ({
    type: "ADD_POSTS_IDS",
    payload: postId,
});
