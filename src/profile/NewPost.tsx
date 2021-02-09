import React, {useState} from "react";
import {INewPostInterface} from "./profileInterface";
import {Post} from "../postClass/PostClass";
import {useDispatch, useSelector} from "react-redux";
import {IPostsState} from "../reducers/postsReducer";
import {addPost, addPostsIds} from "../actions/postAction";

export const NewPost: React.FC<INewPostInterface> = (props) => {
    const {signedUserID, setOpenTestEditor} = props;
    const [textAreatext, setTextAreaText] = useState<string>('');
    const dispatch = useDispatch()

    const createPost = () => {
        let newPost = new Post(signedUserID, textAreatext)
        dispatch(addPost(newPost))
        dispatch(addPostsIds(newPost.id))
    }
    return (
        <div className="mb-3">
            <label htmlFor="postTextarea" className="form-label">What would you like to share?</label>
            <textarea className="form-control" id="postTextarea" onChange={(e) => setTextAreaText(e.target.value)}
                      rows={3}/>
            <button className="btn btn-outline-success" onClick={() => setOpenTestEditor(false)}>
                Back
            </button>
            <button className="btn btn-outline-success" onClick={() => {
                createPost();
                setTextAreaText('');
                setOpenTestEditor(false)
            }}>
                Publish
            </button>
        </div>
    )
}
