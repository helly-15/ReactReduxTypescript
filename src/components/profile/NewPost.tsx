import React, {useState} from "react";
import {INewPostInterface} from "./INewPostInterface";
import {PostModel} from "../../model/PostModel";
import {useDispatch} from "react-redux";
import {addPost, addPostsIds} from "../../actions/postAction";

export const NewPost: React.FC<INewPostInterface> = (props) => {
    const {signedUserID, setOpenTestEditor} = props;
    const [textAreatext, setTextAreaText] = useState<string>('');
    const dispatch = useDispatch()

    const createPost = () => {
        let newPost = new PostModel(signedUserID, textAreatext)
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
