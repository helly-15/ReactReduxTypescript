import {IAddSubscription, IDeleteSubscription} from "../actions/subscriptionAction";


export interface ISubsciribe {
    id: string,
    subscribedPerson: string,
    subscribedTo: string,
}
export interface ISubscribeState {
    subscriptions: {
        byId: ISubsciribe[],
    }
}

export const initialStateOfSubscriptions = {
    subscriptions: {
        byId: [
            {
                id: "subscription1",
                subscribedPerson: "user1",
                subscribedTo: "user2",

            },
            {
                id: "subscription2",
                subscribedPerson: "user2",
                subscribedTo: "user3",
            },
            {
                id: "subscription3",
                subscribedPerson: "user1",
                subscribedTo: "user3",

            },

        ],
    }
}
export const subscriptionsReducer = (state: ISubscribeState = initialStateOfSubscriptions, action: IAddSubscription | IDeleteSubscription) => {
    switch (action.type) {
        case "ADD_SUBSCRIPTION": {
            return {...state, subscriptions: {...state.subscriptions, byId: [...state.subscriptions.byId, action.payload]}}

            /*
            return {
                ...state,
                likes: {
                    ...state.likes,
                    byId: [ ...state.likes.byId, action.payload ],
                    allIds: [ ...state.likes.allIds, action.payload.id ],
                }
            }
             */
        }
        case "DELETE_SUBSCRIPTION":{
            const subscriptionIdToRemove = state.subscriptions.byId.find((subscription) => {
                return subscription.subscribedPerson === action.payload.subscribedPerson && subscription.subscribedTo === action.payload.subscribedTo
            })?.id;

            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    byId: [ ...state.subscriptions.byId.filter(subscription => subscription.id !== subscriptionIdToRemove) ]
                }
            }
        }


        default:
            return state
    }
}
