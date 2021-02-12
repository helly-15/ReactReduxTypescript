export class SubscriptionModel {
    static counter = 4;
    id: string;
    subscribedPerson: string;
    subscribedTo: string;

    constructor(userId: string, subscribedTo: string) {
        this.id = 'subscription' + SubscriptionModel.counter;
        this.subscribedPerson = userId;
        this.subscribedTo = subscribedTo

        SubscriptionModel.counter++;
    }
}
