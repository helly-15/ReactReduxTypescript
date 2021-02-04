export class User{
    static counter = 4;
     username: string;
     subscriptions: string[];
     name: string;
    constructor(name:string) {
        this.username = 'user'+ User.counter;
        this.name = name;
        this.subscriptions = [];
        User.counter++;
    }
}
