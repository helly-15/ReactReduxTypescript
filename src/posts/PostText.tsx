import {data} from '../data/data'
import {IPostTextInterface} from "./postsInterface";
import {useState} from "react";

export const PostText: React.FC<IPostTextInterface> = (props) => {
    const {post, signedUserID} = props;
    const [liked, setLiked] = useState<boolean>(false);
    return (
        <div className='posts-post card'>
            <h3 className='card-title text-left'> {data.users.byId.find(user=>user.username===post.author)?.name}</h3>
            <h4 className='card-text text-left'> {post.body}</h4>
            <span> Liked by:
                {
                    post.likes.map(userLike => {
                        return <a href='#'> {data.users.byId.find(user => user.username === userLike)?.name} </a>
                    })
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
    if (!liked){
        if (!post.likes.includes(signedUserID)) {
            post.likes.push(signedUserID)
        }
    }
    else {
        let index = post.likes.indexOf(signedUserID);
        if (index > -1) {
            post.likes.splice(index, 1);
        }

    }
}
