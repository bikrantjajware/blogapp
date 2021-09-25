import React from 'react'
import SinglePost from '../../Components/SinglePosts/SinglePost';
import './Single.css';
import {useParams} from "react-router-dom";




const Single = (p) => {

    const params = useParams();
    const id = params['postID']
    return (
        <div className="single">
            <SinglePost id={id} />
        </div>
    )
}

export default Single;
