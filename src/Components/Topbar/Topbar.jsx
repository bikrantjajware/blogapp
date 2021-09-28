import React,{useContext} from 'react'
import { UserContext } from '../../Context/User/UserContext';
import './Topbar.css';
import { Link } from 'react-router-dom';

 const Topbar = () => {
    //  const user = false;
     const [user,setUser] = useContext(UserContext);
    return (
        <div className="top">
            <div className="topleft"><Link className="link" to="/"><i className="topIcon fab fa-blogger-b" /></Link></div>
                
         
            <div className="topright">
                {user ?
                    <ul className="toplist">
                        <li className="toplistitem name" > {user.username} </li>
                         <li className="toplistitem"> <Link className="link" to="/logout" onClick={ ()=>{
                             setUser();
                         }} >Logout</Link></li>

                    </ul> :
                    <ul className="toplist">
                        <li className="toplistitem"> <Link className="link" to="/register">Register</Link></li>
                        <li className="toplistitem"> <Link className="link" to="/login">Login</Link></li>
                    </ul>
                    
                    
                    }

                 
                   
                
            </div>
        </div>
    )
}

export default Topbar;