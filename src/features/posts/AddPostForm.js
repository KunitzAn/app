import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';

import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                /*
                postAdded({
                    id: nanoid(),
                    title,
                    content,
                })
                */
               // after we added calback in postAdded func we can write so instead:
               postAdded(title, content, userId) // we can just send the raw date
            )
            setTitle('') // state local state for title and contant back to empty
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) // check if all of them are true

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content}
                    onChange={onContentChanged}
                />
                <button type="button"  onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;