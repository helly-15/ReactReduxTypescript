export class UserModel {
    static counter = 4;
    userId: string;
    subscriptions: string[];
    name: string;

    constructor(name: string) {
        this.userId = 'user' + UserModel.counter;
        this.name = name;
        this.subscriptions = [];
        UserModel.counter++;
    }
}
