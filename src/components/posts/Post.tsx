import {IPostInterface} from "./IPostInterface";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";
import {IPost} from "../../reducers/postsReducer";
import {getNameById} from "../../utils/getNameById";
import {LikeModel} from "../../model/LikeModel";
import {addLike, addLikesIds, deleteLike} from "../../actions/likeAction";


export const Post: React.FC<IPostInterface> = (props) => {
    const dispatch = useDispatch();
    const {post, signedUserID, showUserProfile} = props;
    const [liked, setLiked] = useState<boolean>(false);

    const users = useSelector<IStateInterface, IStateInterface['usersstate']["users"]["byId"]>(
        (state) => {
            return state.usersstate.users.byId
        }
    );
    const likes = useSelector<IStateInterface, IStateInterface['likesstate']["likes"]["byId"]>(
        (state) => {

            return state.likesstate.likes.byId
        }
    );

    const authorName = users.find(user => user.userId === post.author)!.name;

    const onLike = (post: IPost, signedUserID: string, liked: boolean) => {
        if (!liked) {
            let newLike = new LikeModel(signedUserID, post.id)
            dispatch(addLike(newLike))
            dispatch(addLikesIds(newLike.id))
        } else {
            dispatch(deleteLike(signedUserID, post.id))
        }
    }

    return (
        <div className='posts-post card'>
            <h3 className='card-title text-left' onClick={() => showUserProfile(authorName)}> {authorName}</h3>
            <h4 className='card-text text-left'> {post.body}</h4>
            <span> Liked by:
                {
                    likes.map(likeObject => {
                        if (likeObject.likedPost === post.id) {
                            let userLikeName = getNameById(likeObject.likedUser, users)
                            return <a href='#' onClick={() => showUserProfile(userLikeName)}
                                      key={userLikeName}> {userLikeName} </a>
                        }
                    })
                }
            </span>
            <button onClick={() => {
                onLike(post, signedUserID, liked);
                setLiked(!liked)
            }}>❤ </button>
        </div>
    )
};


