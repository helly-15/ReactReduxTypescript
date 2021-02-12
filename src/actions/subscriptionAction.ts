import {ISubsciribe} from "../reducers/subscriptionsReducer";


export interface IAddSubscription {
    type: "ADD_SUBSCRIPTION",
    payload: ISubsciribe
}

export interface IDeleteSubscription {
    type: "DELETE_SUBSCRIPTION",
    payload: { subscribedPerson: string, subscribedTo: string }
}

export const addSubscription = (subscription: ISubsciribe): IAddSubscription => ({
    type: "ADD_SUBSCRIPTION",
    payload: subscription,
});


export const deleteSubscription = (subscribedPerson: string, subscribedTo: string): IDeleteSubscription => ({
    type: "DELETE_SUBSCRIPTION",
    payload: {subscribedPerson, subscribedTo}
});
