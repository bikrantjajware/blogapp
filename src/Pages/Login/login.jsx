import React,{useState,useContext} from 'react'
import './login.css';
import { Link,useHistory } from 'react-router-dom';
import instance from '../../axios';
import { UserContext } from '../../Context/User/UserContext';
import { PostsContext } from '../../Context/PostsContext/PostsContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import Loader from 'react-loader-spinner';


const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false);

    const history = useHistory();

    const [user,setUser] = useContext(UserContext);
    const [posts,setPosts] = useContext(PostsContext);
    const [groups,setGroups] = useContext(GroupContext);

    const loginHandler =  (e)  => {
        
        e.preventDefault();
        setLoading(true);

        (async () => {
            instance.post(`api/accounts/token`,{
                username:username,
                password:password,
                }).then( res => {
                    
                    if(res.data)
                    {
                        const token = res.data.token;
                        (async () =>{
                            await instance.get(`api/accounts/login`,
                               { 
                                   headers: {
                                    Authorization: 'token '+token,
                                   }
                            }).then( res => {
                                if( res.data)
                                {
                                    const logged_in_user = {
                                        username: res.data.username,
                                        password:password,
                                        email: res.data.email,
                                        id: res.data.pk,
                                        token:token,
                                    };

                                    setUser(prev => logged_in_user);
                                }
                                
                            }).catch( err => {
                                history.push("/error");
                            })
                        } )();
        
                            
                             (async () => {
                               await instance.get(`api/groups/all`,{
                                    headers : {
                                        Authorization: 'token '+token,
                                    }
                                }).then(
                                    res => {
                                        setGroups(res.data);
                                    }
                                ).catch( err => {
                                    history.push("/error");
                                })
                             } )();
        
                            
        
                    }
                    setLoading(false)
                    history.push("/");
                }).catch( error =>{
                    history.push("/error",{
                        message:error.response.data.non_field_errors
                    });
                })
        

        })();
       
        
    

    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            { loading ? <Loader 
                    className="loader"
                    type="ThreeDots"
                    color="#00BFFF"
                    height={window.innerHeight/5}
                    width={window.innerWidth/5}
          />:
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
               

            </form>}
        </div>
    )
}

export default Login;