import {combineReducers} from 'redux';
import {usersReducer} from "./usersReducer";
import {postsReducer} from "./postsReducer";
import {likesReducer} from "./likesReducer";


export const rootReducer = combineReducers({
    postsstate: postsReducer,
    usersstate: usersReducer,
    likesstate: likesReducer,
})

