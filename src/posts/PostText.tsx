import {data} from '../data/data'
import {IPostTextInterface} from "./postsInterface";
import {useState} from "react";

export const PostText: React.FC<IPostTextInterface> = (props) => {
    const {post, signedUserID, showUserProfile} = props;
    const [liked, setLiked] = useState<boolean>(false);
    const authorName = data.users.byId.find(user => user.username === post.author)!.name
    return (
        <div className='posts-post card'>
            <h3 className='card-title text-left' onClick={() => showUserProfile(authorName)}> {authorName}</h3>
            <h4 className='card-text text-left'> {post.body}</h4>
            <span> Liked by:
                {
                    post.likes.map(userLike => {
                        let userLikeName = data.users.byId.find(user => user.username === userLike)!.name
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
