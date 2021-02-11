import {IAddLike, IAddLikesIds, IDeleteLike} from "../actions/likeAction";


export interface ILike {
    id: string,
    likedPost: string,
    likedUser: string,
}
export interface ILikesState {
    likes: {
        byId: ILike[],
        allIds: string[]
    }
}

export const initialStateOfLikes = {
    likes: {
        byId: [
            {
                id: "like1",
                likedPost: "post1",
                likedUser: "user2",

            },
            {
                id: "like2",
                likedPost: "post1",
                likedUser: "user3",
            },
            {
                id: "like3",
                likedPost: "post2",
                likedUser: "user1",

            },
            {
                id: "like4",
                likedPost: "post2",
                likedUser: "user3",

            },
        ],
        allIds: ["like1", "like2", "like3", "like4"]
    }
}
export const likesReducer = (state: ILikesState = initialStateOfLikes, action: IAddLike | IAddLikesIds|IDeleteLike) => {
    switch (action.type) {
        case "ADD_LIKE": {
            return {...state, likes: {...state.likes, byId: [...state.likes.byId, action.payload]}}

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
        case "ADD_LIKES_IDS": {
            return {...state,
                likes: {...state.likes, allIds: [...state.likes.allIds, action.payload]},

            }
        }
        case "DELETE_LIKE":{
            // return {
            //     ...state,
            //     likes: state.likes.byId.filter((like) => like.likedPost !== action.payload.postId && like.likedUser !== action.payload.userId )
            // }

            const likeIdToRemove = state.likes.byId.find((like) => {
                return like.likedPost === action.payload.postId && like.likedUser === action.payload.userId
            })?.id;

            return {
                ...state,
                likes: {
                    ...state.likes,
                    byId: [ ...state.likes.byId.filter(like => like.id !== likeIdToRemove) ],
                    allIds: [ ...state.likes.allIds.filter(likeId => likeId !== likeIdToRemove) ],
                }
            }
        }


        default:
            return state
    }
}
