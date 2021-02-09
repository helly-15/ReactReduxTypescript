import { createStore } from 'redux';
import {postsReducer, initialState} from "../reducers/postsReducer";

export const store = createStore(postsReducer )
