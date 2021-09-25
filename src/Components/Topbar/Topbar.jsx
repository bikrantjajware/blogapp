import React,{useContext} from 'react'
import { UserContext } from '../../Context/User/UserContext';
import './Topbar.css';
import { Link } from 'react-router-dom';

 const Topbar = () => {
    //  const user = false;
     const [user,setUser] = useContext(UserContext);
    return (
        <div className="top">
            <div className="topleft"><i className="topIcon fab fa-blogger-b"></i></div>
            <div className="topcenter">
                <ul className="toplist">
                    <li className="toplistitem" > <Link className="link" to="/">HOME</Link></li>
                    <li className="toplistitem"> <Link className="link" to="/home">ABOUT</Link></li>
                    
                    
                </ul>

            </div>
            <div className="topright">
                
         
                {user ?
                    <ul className="toplist">
                         <li className="toplistitem"> <Link className="link" to="/logout" onClick={ ()=>{
                             setUser();
                         }} >Logout</Link></li>
                    </ul> :
                    <ul className="toplist">
                        <li className="toplistitem"> <Link className="link" to="/register">Register</Link></li>
                        <li className="toplistitem"> <Link className="link" to="/login">Login</Link></li>
                    </ul>
                    
                    
                    }

                    {user ? <h1>{user.username}</h1>:""} 
                   
                
            </div>
        </div>
    )
}

export default Topbar;