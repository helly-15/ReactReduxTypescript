import {IPostInterface} from "./IPostInterface";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";
import {IPost} from "../../reducers/postsReducer";
import {getNameById} from "../../utils/getNameById";
import {LikeModel} from "../../model/LikeModel";
import {addLike, addLikesIds, deleteLike} from "../../actions/likeAction";
import './Post.scss'

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
        <div className='post'>
            <h3 className='post-authorname' onClick={() => showUserProfile(authorName)}> {authorName}</h3>
            <h4 className='post-body'> {post.body}</h4>
            <span className='post-liketext'> Liked by:
                {
                    likes.map(likeObject => {
                        if (likeObject.likedPost === post.id) {
                            let userLikeName = getNameById(likeObject.likedUser, users)
                            return <a className='post-likename' href='#' onClick={() => showUserProfile(userLikeName)}
                                      key={userLikeName}> {userLikeName} </a>
                        }
                    })
                }
            </span>
            <button className='post-likebutton' onClick={() => {
                onLike(post, signedUserID, liked);
                setLiked(!liked)
            }}>
                ❤
            </button>
        </div>
    )
};


