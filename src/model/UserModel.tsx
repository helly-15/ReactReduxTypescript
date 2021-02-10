export class UserModel {
    static counter = 4;
    username: string;
    subscriptions: string[];
    name: string;

    constructor(name: string) {
        this.username = 'user' + UserModel.counter;
        this.name = name;
        this.subscriptions = [];
        UserModel.counter++;
    }
}
