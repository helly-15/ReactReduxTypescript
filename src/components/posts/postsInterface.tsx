import {IPost} from "../../reducers/postsReducer";

export interface IPostsInterface {
    signedUser: string,
    signedUserID: string,
    userOfProfile: string,

    unsign(value: boolean): void,

    showUserProfile(name: string): void,

}

export interface IPostTextInterface {
    post: IPost,
    signedUserID: string,

    showUserProfile(name: string): void,
}

