import React,{useContext,useState, useEffect} from 'react';
import { PostsContext } from '../../Context/PostsContext/PostsContext';
import './SinglePost.css';
import { Link,useHistory } from 'react-router-dom';

import instance from '../../axios';
import { UserContext } from '../../Context/User/UserContext';
import Loader from 'react-loader-spinner';





const SinglePost = (props) => {
    
    const [post,setPost] = useState();
    const history = useHistory();
    const [editing,setEditing] = useState(false);
    
    const [title,setTitle] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);

    const [user] = useContext(UserContext);
    const [posts,setPosts] = useContext(PostsContext);
    const token = user ? user.token : '';

    useEffect( () => {
        (async () =>{
           await  instance.get(`api/posts/detail/${props.slug}/`, { 
                headers: {
                 Authorization: 'token '+token,
                }
            }  ).then(
                res => {

                    setPost({...res.data})
                    setTitle(res.data.title)
                    setMessage(res.data.message)
                }
            )

        })();
    },[])
    
    const updateHandler = (event) => {
        setLoading(true);
        event.preventDefault();
        

        if(token == undefined)
        {
            history.push("/error",{message:"please login again"})
        }
        (async () => {
            await instance.put(`api/posts/update/${post.slug}/`,{
                title:title,
                message:message,
            },{
                headers: {
                    Authorization : 'token '+token,
                   }
            }).then( res => {
                // console.log(res.data);
                // alert(res.data)
                setLoading(false)
                setEditing(false);

            })
        })();



        
        
    }
    
 
    
    const deleteHandler = (post,token,e)=> {
        
        e.preventDefault();
    
        
        instance.delete(`api/posts/delete/${post.id}/`,{
            
            headers: {
             Authorization : 'token '+token,
            }
        }).then( res => {
            // console.log(res.data);

            
        })

        instance.get(`api/posts/all/`,{
            headers : {
                Authorization: 'token '+token,
            }
        }).then(
            res => {
                setPosts(prev => prev = res.data);
                
                history.push("/");
            }
        )

    }



    return (
        post ? <div className="singlePost">
            <div className="singlePostWrapper">
                <input type="text" className="singlePostTitle" onChange={ (e) => { setTitle(e.target.value)}} value={title} readOnly={!editing}  />

                    <div className="singlePostEdit">
                        <i onClick={ e => setEditing(!editing)} className="singlePostIcon far fa-edit"></i>
                       <Link to="/" className="link" > <i  onClick = { (e) =>deleteHandler(post,token,e)} className="singlePostIcon fas fa-trash-alt"></i> </Link>
                        
                    </div>
                
                <div className="singlePostInfo">
                    <div className="post-author-group">
                        <span className="singlePostAuthor">Author: <b>{post.username}</b></span>
                        <span className="singlePostGroup">Group: <b>{post.groupname}</b></span>
                    </div>
                    
                    <span className="singlePostDate">Date: <b>{new Date(post.updated_at).toLocaleDateString()}</b></span>
                </div>
                <textarea value={message} onChange={ e => setMessage(e.target.value)} className="singlePostDesc" readOnly={!editing}>
                    
                </textarea>
                { editing ? (loading ? <Loader 
                    className="loader"
                    type="ThreeDots"
                    color="#00BFFF"
                    height={window.innerHeight/5}
                    width={window.innerWidth/5}
                     /> : <button type="submit" className="updateButton"  onClick={updateHandler}> Update</button>) : ""}
            </div>
        </div> :  <h3 className="singlePost singlePostTitle" >No post selected</h3>
    )
}

export default SinglePost
