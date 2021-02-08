export class Post{
    static counter = 3;
    id: string;
    author: string;
    body: string;
    likes: string[];

    constructor(userId:string, body:string) {
        this.id = 'post'+ Post.counter;
        this.author = userId;
        this.body = body
        this.likes = [];
        Post.counter++;
    }
}
