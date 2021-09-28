import instance from '../../axios';
import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router';
import { UserContext } from '../../Context/User/UserContext';
import { PostsContext } from '../../Context/PostsContext/PostsContext';
import './Write.css';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import Loader from 'react-loader-spinner';
const Write = () => {


    
    
    const [user] = useContext(UserContext);
    const [posts,setPosts] = useContext(PostsContext);
    const [groups] = useContext(GroupContext);
    
    const groupOptions = groups.filter( g =>  g.members.includes(user.id));
    
    
    const [title,setTitle ]  = useState('');
    const [msg,setMsg ]  = useState('');
    const [groupSelect,setgroupSelect] = useState('');
    const [loading,setLoading] = useState(false);


    const token = user? user.token : '';
    
    const history = useHistory();
    const postHandler = (e) => {

        e.preventDefault();
        
        if(user===undefined)
        {
            history.push("/login");
            return;
        }
        setLoading(true);
        // console.log(groupSelect);
        
        (async () => {
                   await instance.post(`api/posts/create/`,
                    {
                        title: title,
                    message: msg,
                    group:groupSelect != null ? parseInt(groupSelect) :'',
                    },
                    {
                        headers: {
                            Authorization: 'token '+token,
                        },
                }).then(
                    res => {
                        const newPost = {...res.data};
                        setPosts( prevPosts => [...prevPosts,newPost]);
                        setLoading(false);
                        setTitle('');
                        setMsg('');

                    }
                ).catch ( err => {
                    setLoading(false);
                    setTitle('');
                    setMsg('');
                    alert(err);
                })

        })();


    }


    return (
        <div className="write">
            <form className="writeForm">
                <div className="writeFormGroup">
                    <input type="text" placeholder="Title" value={title} onChange={ (e) => setTitle(e.target.value)} className="writeInput" autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Write post..." type="text" value={msg} onChange={ (e) => setMsg(e.target.value)} className="writeInput writeText">
                    </textarea>
                </div>
                <div className="writeFormGroup">
                    <select className="writeInput" value={groupSelect} onChange = { (e) => setgroupSelect(e.target.value) }>
                        <option value={null} ></option>
                        { groupOptions.map ( g => <option key={g.id} value={g.id} >{g.name}</option>)}
                    </select>
                </div>

                <div className="writeFormGroup">
              { loading ? <Loader 
                    className="loader"
                    type="ThreeDots"
                    color="#00BFFF"
                    height={window.innerHeight/20}
                    width={window.innerWidth/20}
                        /> : <button type="submit" className="writeSubmit" onClick={postHandler}>Post</button>}

                </div>
            </form>
        </div>
    )
}

export default Write
