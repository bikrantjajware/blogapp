import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/User/UserContext';
import './Post.css';

const Post = (props) => {

    const [user] = useContext(UserContext);
    
    const [isAuthor,setIsAuthor] = useState(user==undefined ? false : user.username == props.username ? true : false  )


    return (
        <div>
            <div className="post">
                <span className="postTitle">
                
                   <Link className="link" to={isAuthor ? `/post/${props.slug}` : '/'}  > {props.title} </Link>
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
