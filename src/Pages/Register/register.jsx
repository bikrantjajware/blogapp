import React,{useState,useContext} from 'react'
import './register.css';
import { Link,useHistory } from 'react-router-dom';
import instance  from '../../axios';
import { UserContext } from '../../Context/User/UserContext';
import Loader from 'react-loader-spinner';




const Register = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)


    const history = useHistory();


    const [user,setUser] = useContext(UserContext);
    const registerUser = (e) => {
        
       e.preventDefault();
       if(password==="" || username==="" || email==="")
       {
           alert("Input fields cannot be empty")
           return;
       }
       if( password !==password2)
        {
            alert("password do not match")
            return;
        }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(validRegex))
        {
            alert("invalid email")
            return;
        }
        
        
        setLoading(true);
        async function registerUser () {
           await instance.post(`api/accounts/register`,{
                username:username,
                email : email,
                password:password,
                password2:password2,
                
            }).then(
                res => {
                    
                    if(res.data.response && res.data.response.includes("successfully"))
                    {
                        setUser({
                            username:res.data.username,
                            email:res.data.email,
                            password:res.data.password,
                            token : res.data.token,
                            message : res.data.response,
                        })
                        setLoading(false);
                        history.push("/");
                    }
                    else{
                        setLoading(false);
                        var msg = "";
                        msg += res.data.username? res.data.username + '\n':"";
                        msg += res.data.email ? res.data.email + '\n' : "";
                        msg += res.data.password ? res.data.password + '\n' : "";
                        alert(msg);
                    }
                   
                    
                }
            ).catch ( err => {
                setLoading(false);
                alert(err);
            })
        }// end async function registerUser(), now call registerUser();
        registerUser();

    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
           {loading ? <Loader 
                    className="loader"
                    type="ThreeDots"
                    color="#00BFFF"
                    height={window.innerHeight/5}
                    width={window.innerWidth/5}
                     /> :
                      <form action="" className="registerForm">
                <label>
                    Username
                </label>
                <input type="text" value={username} onChange= { (e)=> setUsername(e.target.value)} placeholder="Enter your username..." />
                <label>
                    Email
                </label>
                <input type="email" value={email} onChange= { (e)=> setEmail(e.target.value)} placeholder="Enter your email..." />
                <label>
                    Password
                </label>
                <input type="password" value={password} onChange= { (e)=> setPassword(e.target.value)} placeholder="Enter password" />
                <label>
                    Confirm Password
                </label>
                <input type="password" value={password2} onChange= { (e)=> setPassword2(e.target.value)}  placeholder="Confirm password" />
                <button className="registerButton" onClick={registerUser} > Register</button>
                <button className="registerLoginButton"> <Link className="link" to="/login">Login</Link></button>

            </form>}
        </div>
    )
}

export default Register;
