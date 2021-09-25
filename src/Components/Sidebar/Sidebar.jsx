import React,{useContext,useState} from 'react'
import './Sidebar.css';
import { useHistory, } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/User/UserContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import Group from '../Group/Group';

const allGroupsURL = 'https://backendblogger.herokuapp.com/api/groups/all'
const addGroupURL = 'https://backendblogger.herokuapp.com/api/groups/new/';

const postURL = 'https://backendblogger.herokuapp.com/api/posts/create/'

const Sidebar = () => {

    const history = useHistory();

    const [name,setName]= useState('');
    const [desc,setDesc]  = useState('');
    const [clickCreate,setclickCreate] = useState(false) ;

    const [user] = useContext(UserContext);
    
    const [groups,setGroups] = useContext(GroupContext);
    
    const token = user ? user.token : '';
    


    const loadGroups = (token) => {
        if(token=='' || token==undefined)
        {
            history.push('/login');
            return;
        }
    
        axios.get(allGroupsURL,{
            headers : {
                Authorization : 'token '+token,
            }
        }).then( res => {
            setGroups( prev => prev = res.data);
        })

    }
 // if(token == undefined || token=='')
        // {
        //     history.push("/login");
        // }

    const addGroupHandler = (event,token) => {

        event.preventDefault();
    
        
        if(token == undefined || token=='')
        {
            history.push('/login');
            return;
        }
       
        axios.post(addGroupURL,
            {
                name: name,
                description: desc,
            },
            {
                headers: {
                    Authorization: 'token '+token,
                   },
        }).then( res => {
            console.log(res.data);
            setName('');
            setDesc('');
        }).catch( err => {
            console.log(err);
            setName('');
            setDesc('');
        })


        loadGroups(token);
    }


    

    return (
        <div className="sidebar">
            {clickCreate ? <div>
                <form className="createGroup" id="newGroup">
                    <div className="createGroupForm">
                    <input type="text" className="groupInput" placeholder="Enter Group Name..." value={name} onChange={e => setName(e.target.value)}/>
                    <textarea type="text" className="groupInput"  placeholder="Enter Group Description..." value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <button type="submit" className="groupSubmit" onClick={(e) => addGroupHandler(e,token)}>create</button>
                </form>
            </div> : ""}
           <div className="groupControls">
            <i onClick={ () => setclickCreate(!clickCreate)} className="addGroup fas fa-plus-circle"  ></i>
            <i   onClick={ () => loadGroups(token) } className="reload fas fa-redo"></i>
           </div>
            
            { groups.map( g => {
               return <Group key={g.id} name={g.name} reload={(token) => loadGroups(token)} desc={g.description} members={g.members.length} posts={g.posts.length} slug={g.slug} isJoined={g.members.includes(user.id)} />
            })}
            

        </div>
    )
}

export default Sidebar
