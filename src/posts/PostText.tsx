
import {IPostTextInterface} from "./postsInterface";
import {useState} from "react";
import {useSelector} from "react-redux";
import {IUsersState} from "../reducers/postsReducer";

export const PostText: React.FC<IPostTextInterface> = (props) => {
    const {post, signedUserID, showUserProfile} = props;
    const [liked, setLiked] = useState<boolean>(false);
    const users = useSelector<IUsersState, IUsersState["users"]["byId"]>(
        (state) => state.users.byId
    );
    const authorName = users.find(user => user.username === post.author)!.name
    return (
        <div className='posts-post card'>
            <h3 className='card-title text-left' onClick={() => showUserProfile(authorName)}> {authorName}</h3>
            <h4 className='card-text text-left'> {post.body}</h4>
            <span> Liked by:
                {
                    post.likes.map(userLike => {
                        let userLikeName = users.find(user => user.username === userLike)!.name
                        return <a href='#' onClick={() => showUserProfile(userLikeName)}> {userLikeName} </a>
                    }).reverse()
                }
            </span>
            <a href='#' onClick={() => {
                onLike(post, signedUserID, liked);
                setLiked(!liked)
            }}>❤ </a>
        </div>
    )
};

function onLike(post: {
    id: string,
    author: string,
    body: string,
    likes: string[]
}, signedUserID: string, liked: boolean) {
    if (!liked) {
        if (!post.likes.includes(signedUserID)) {
            post.likes.push(signedUserID)
        }
    } else {
        let index = post.likes.indexOf(signedUserID);
        if (index > -1) {
            post.likes.splice(index, 1);
        }

    }
}
