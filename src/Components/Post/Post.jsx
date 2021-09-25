import React from 'react'
import { Link } from 'react-router-dom';
import './Post.css';

const Post = (props) => {
    return (
        <div>
            <div className="post">
                <span className="postTitle">
                
                   <Link className="link" to={`/post/${props.id}`} > {props.title} </Link>
                   <span className="postDesc">:  {props.group}</span>
                </span>
                <hr />
                <div className="postMeta">
                    <span className="postDate">  {new Date(props.updated_at).toDateString()}</span>
                    <span className="postDate">  ~{props.username}</span>
                </div>

            <p className="postDesc">
                {props.message}
            </p>
            
            </div>
        </div>
    )
}

export default Post
