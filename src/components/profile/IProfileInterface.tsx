export interface IProfileInterface {
    signedUser: string,
    userOfProfile: string,

    showUserProfile(name: string): void,

    unsign(value: boolean): void
}
