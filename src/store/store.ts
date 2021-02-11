import {createStore} from 'redux';
import {rootReducer} from "../reducers/rootReducer";
import {IPostsState} from "../reducers/postsReducer";
import {IUsersState} from "../reducers/usersReducer";
import {ILikesState} from "../reducers/likesReducer";

export const store = createStore(rootReducer)

export interface IStateInterface {
    postsstate: IPostsState,
    usersstate: IUsersState,
    likesstate: ILikesState,
}
