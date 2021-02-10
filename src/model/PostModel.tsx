export class PostModel {
    static counter = 3;
    id: string;
    author: string;
    body: string;
    likes: string[];

    constructor(userId: string, body: string) {
        this.id = 'post' + PostModel.counter;
        this.author = userId;
        this.body = body
        this.likes = [];
        PostModel.counter++;
    }
}
