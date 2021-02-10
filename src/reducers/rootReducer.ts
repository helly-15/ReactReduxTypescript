import {combineReducers} from 'redux';
import {usersReducer} from "./usersReducer";
import {postsReducer} from "./postsReducer";


export const rootReducer = combineReducers({
    postsstate: postsReducer,
    usersstate: usersReducer,
})

