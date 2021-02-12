import {IPost} from "../../reducers/postsReducer";

export interface IPostInterface {
    post: IPost,
    signedUserID: string,

    showUserProfile(name: string): void,
}
