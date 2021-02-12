
export interface IPostsInterface {
    signedUser: string,
    signedUserID: string,
    userOfProfile: string,

    unsign(value: boolean): void,

    showUserProfile(name: string): void,

}


