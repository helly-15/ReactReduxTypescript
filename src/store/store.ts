import {createStore} from 'redux';
import {rootReducer} from "../reducers/rootReducer";
import {IPostsState} from "../reducers/postsReducer";
import {IUsersState} from "../reducers/usersReducer";
import {ILikesState} from "../reducers/likesReducer";
import {ISubscribeState} from "../reducers/subscriptionsReducer";

export const store = createStore(rootReducer)

export interface IStateInterface {
    postsstate: IPostsState,
    usersstate: IUsersState,
    likesstate: ILikesState,
    subscriptionsstate:ISubscribeState
}
