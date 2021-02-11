export class LikeModel {
    static counter = 5;
    id: string;
    likedPost: string;
    likedUser: string;

    constructor(userId: string, post: string) {
        this.id = 'like' + LikeModel.counter;
        this.likedUser = userId;
        this.likedPost = post

        LikeModel.counter++;
    }
}
