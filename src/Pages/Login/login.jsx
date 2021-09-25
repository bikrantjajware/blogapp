import React,{useState,useContext} from 'react'
import './login.css';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/User/UserContext';
import { PostsContext } from '../../Context/PostsContext/PostsContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';


const allPostURL = 'https://backendblogger.herokuapp.com/api/posts/all/';
const allGroupsURL = 'https://backendblogger.herokuapp.com/api/groups/all';

const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const history = useHistory();

    const [user,setUser] = useContext(UserContext);
    const [posts,setPosts] = useContext(PostsContext);
    const [groups,setGroups] = useContext(GroupContext);

    const loginHandler = (e) => {
        
        e.preventDefault();
     
       
        axios.post('https://backendblogger.herokuapp.com/api/accounts/token',{
        username:username,
        password:password,
        }).then( res => {
            
            if(res.data)
            {
                const token = res.data.token;
                
                axios.get('https://backendblogger.herokuapp.com/api/accounts/login',
                       { 
                           headers: {
                            Authorization: 'token '+token,
                           }
                    }).then( res => {
                        if( res.data)
                        {
                            setUser({
                                username: res.data.user.username,
                                password:password,
                                email: res.data.user.password,
                                id: res.data.user.pk,
                                bio: res.data.bio,
                                phone: res.data.phone,
                                token:token,
                            })
                            
                            history.push("/");
                        }
                        
                    })


                    axios.get(allPostURL,{
                        headers : {
                            Authorization: 'token '+token,
                        }
                    }).then(
                        res => {
                            setPosts(res.data);
                        }
                    )


                    axios.get(allGroupsURL,{
                        headers : {
                            Authorization: 'token '+token,
                        }
                    }).then(
                        res => {
                            setGroups(res.data);
                        }
                    )

            }
        }).catch( error =>{
            history.push('/logout');
            
        })


       

    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form action="" className="loginForm">
                <label>
                    Username
                </label>
                <input type="text"  value={username} onChange={ (e) => { setUsername(e.target.value)}} placeholder="enter your username..." />
                <label>
                    Password
                </label>
                <input type="password"  value={password} onChange={ (e) => { setPassword(e.target.value)}} placeholder="enter password" />
                <button className="loginButton" onClick={loginHandler} > Login</button>
                <button className="loginRegisterButton"> <Link className="link" to="/register">Register</Link></button>
               

            </form>
        </div>
    )
}

export default Login;