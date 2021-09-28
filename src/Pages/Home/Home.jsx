import React, { useContext } from 'react'
import Header from '../../Components/Header/Header';
import Posts from '../../Components/Posts/Posts';
// import { PostsProivder } from '../../Context/PostsContext/PostsContext';
import Write from '../Write/Write';
// import Single from '../Single/Single';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css';
import { UserContext } from '../../Context/User/UserContext';


const Home = () => {

    use [user,setUser] = useContext(UserContext);
    return (
        <>
                <Header/>
            <div className="home">
               <Write />
               <div className="linebreak">
               </div>
               <div className="row">
               <Posts className="posts" />
             
               { user? <Sidebar className="sidebar" />:""}
               </div>
            </div>
            
        </>

       
    )
}

export default Home
