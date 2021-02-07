export interface IPostsInterface {
    signedUser: string,
    signedUserID: string,
    nameOfUserProfile: string,

    showUserProfile(name: string): void,

}

export interface IPostTextInterface {
    post:
        {
            id: string,
            author: string,
            body: string,
            likes: string[]
        },

    signedUserID: string,

    showUserProfile(name: string): void,
}

