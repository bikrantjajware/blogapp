import React, { useState,useContext,useEffect } from 'react'
import Post from '../Post/Post';
import './Posts.css';
import { PostsProivder,PostsContext } from '../../Context/PostsContext/PostsContext';

import axios from 'axios';
import { UserContext } from '../../Context/User/UserContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';

const allPostURL = 'https://backendblogger.herokuapp.com/api/posts/all/';

const Posts = () => {


   
    const [posts,setPosts] = useContext(PostsContext);
    const [groups] = useContext(GroupContext);

    const [p,setP] = useState(posts);
    // [user,setUser] = useContext(UserContext);

    useEffect ( () => {
        setP(posts);
    })


    return (
        <div className="posts">
           { p.map( p => {
               var name = '';
                groups.forEach(g => {
                   if( g.id == p.group)
                    {
                        return name = g.name;
                    }
               });
               return <Post key={p.id} id={p.id} title={p.title} message={p.message} group={name}  updated_at={p.updated_at}  username={p.username} />
           })}
        </div>
    )
}

export default Posts
