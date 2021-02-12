import {ILike} from "../reducers/likesReducer";


export interface IAddLike {
    type: 'ADD_LIKE',
    payload: ILike
}

export interface IAddLikesIds {
    type: 'ADD_LIKES_IDS',
    payload: string
}

export interface IDeleteLike {
    type: "DELETE_LIKE",
    payload: { userId: string, postId: string }
}

export const addLike = (like: ILike): IAddLike => ({
    type: "ADD_LIKE",
    payload: like,
});

export const addLikesIds = (likeId: string): IAddLikesIds => ({
    type: "ADD_LIKES_IDS",
    payload: likeId,
});
export const deleteLike = (userId: string, postId: string): IDeleteLike => ({
    type: "DELETE_LIKE",
    payload: {userId, postId}
});
