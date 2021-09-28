import React from 'react'
import SinglePost from '../../Components/SinglePosts/SinglePost';
import './Single.css';
import {useParams} from "react-router-dom";




const Single = (p) => {

    const params = useParams();
    const slug = params['slug']
    return (
        <div className="single">
            <SinglePost slug={slug} />
        </div>
    )
}

export default Single;
