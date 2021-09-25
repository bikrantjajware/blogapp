import React,{useContext} from 'react';
import { PostsContext } from '../../Context/PostsContext/PostsContext';
import './SinglePost.css';
import { Link,useHistory } from 'react-router-dom';

import axios from 'axios';
import { UserContext } from '../../Context/User/UserContext';

const getDeleteURL = (id) => (`https://backendblogger.herokuapp.com/api/posts/delete/${id}/`);
const allPostURL = 'https://backendblogger.herokuapp.com/api/posts/all/';




const SinglePost = (props) => {
    
    const history = useHistory();
    const deleteHandler = (post,token,e)=> {
        
        e.preventDefault();
    
        const url = getDeleteURL(post.id);
        axios.delete(url,{
            
            headers: {
             Authorization : 'token '+token,
            }
        }).then( res => {
            // console.log(res.data);

            
        })

        axios.get(allPostURL,{
            headers : {
                Authorization: 'token '+token,
            }
        }).then(
            res => {
                setPosts(prev => prev = res.data);
                history.push("/");
                alert("data deleted");
            }
        )

    }
   
    const [posts,setPosts] = useContext(PostsContext);
    const [user,setUser] = useContext(UserContext);

    const token = user ? user.token : '';
    var index=-1;
    const post = posts.filter(
        (p,idx) => {
                if( p.id == props.id)
                {
                    return true;
                }
            return false;
        })[0];





    return (
        post ? <div className="singlePost">
            <div className="singlePostWrapper">
                <h1 className="singlePostTitle"> {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                       <Link to="/" className="link" > <i  onClick = { (e) =>deleteHandler(post,token,e)} className="singlePostIcon fas fa-trash-alt"></i> </Link>
                        
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <b>{post.username}</b></span>
                    <span className="singlePostDate">Date: <b>{new Date(post.updated_at).toLocaleDateString()}</b></span>
                </div>
                <p className="singlePostDesc">
                    {post.message}
                </p>
            </div>
        </div> :  <h3 className="singlePost singlePostTitle" >No post selected</h3>
    )
}

export default SinglePost
