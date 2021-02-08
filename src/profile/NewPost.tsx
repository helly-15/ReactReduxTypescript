import React, {useState} from "react";
import {INewPostInterface} from "./profileInterface";
import {Post} from "../postClass/PostClass";
import {data} from "../data/data";

export const NewPost: React.FC<INewPostInterface> = (props) => {
    const {signedUserID, setOpenTestEditor} = props;
    const [textAreatext, setTextAreaText] = useState<string>('');
    const addPost = () => {
        let newPost = new Post(signedUserID, textAreatext)
        data.posts.byId.push(newPost);
        data.posts.allIds.push(newPost.id)
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
                addPost();
                setTextAreaText('');
                setOpenTestEditor(false)
            }}>
                Publish
            </button>
        </div>
    )
}
