import {combineReducers} from 'redux';
import {usersReducer} from "./usersReducer";
import {postsReducer} from "./postsReducer";
import {likesReducer} from "./likesReducer";
import {subscriptionsReducer} from "./subscriptionsReducer";


export const rootReducer = combineReducers({
    postsstate: postsReducer,
    usersstate: usersReducer,
    likesstate: likesReducer,
    subscriptionsstate: subscriptionsReducer,
})

