import React, { useState,useContext,useEffect } from 'react'
import Post from '../Post/Post';
import './Posts.css';
import instance from '../../axios';
import Loader from "react-loader-spinner";

import { PostsProivder,PostsContext } from '../../Context/PostsContext/PostsContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import { useHistory } from 'react-router';


const Posts = () => {


   
    const [posts,setPosts] = useContext(PostsContext);
    const [groups] = useContext(GroupContext);
    const [Loading,setLoading] = useState(true);

    const [p,setP] = useState(posts);
    const history = useHistory();
    

    useEffect ( () => {
        (async () => {
            await instance.get(`api/posts/all/`).then(
                res => {
                    setP(prev => prev = res.data);
                    setLoading(false );
                }
            ).catch( err => {
                setLoading(false );
                history.push("/error")
            })
        })();
        
    },[posts])


    var posts_to_view = [];

    return (
        <div className="posts">
           {
            Loading ?  <Loader
            className="loader"
            type="ThreeDots"
            color="#00BFFF"
            height={window.innerHeight/8}
            width={window.innerWidth/8}
            
            
          /> : 
            p.map( p => {
            var name = '';
             groups.forEach(g => {
                if( g.id == p.group)
                 {
                     return name = g.name;
                 }
            });
            return <Post key={p.id} id={p.id} slug={p.slug} title={p.title} message={p.message} group={name}  updated_at={p.updated_at}  username={p.username} />
        })
            }
        </div>
    )
}

export default Posts



