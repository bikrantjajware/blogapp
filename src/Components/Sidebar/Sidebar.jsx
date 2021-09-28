import React,{useContext,useEffect,useState} from 'react'
import './Sidebar.css';
import { useHistory, } from 'react-router-dom';
import instance from '../../axios';
import { UserContext } from '../../Context/User/UserContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import Group from '../Group/Group';
import Loader from 'react-loader-spinner';



const Sidebar = () => {

    const history = useHistory();

    const [name,setName]= useState('');
    const [desc,setDesc]  = useState('');
    const [clickCreate,setclickCreate] = useState(false) ;
    const [loading,setLoading] = useState(false) ;

    const [user] = useContext(UserContext);
    
    const [groups,setGroups] = useContext(GroupContext);
    
    const token = user ? user.token : '';
    


    const loadGroups = (token) => {
        if(token==='' || token===undefined)
        {
            history.push('/login');
            return;
        }
    
        instance.get(`api/groups/all`,{
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

        useEffect( ()=> {},[groups])

    const addGroupHandler = (event,token) => {

        event.preventDefault();
        setLoading(true);
        
        if(token === undefined || token === '')
        {
            history.push('/login');
            return;
        }

        
       
        (async () => {
               await instance.post(`api/groups/new/`,
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
                setLoading(false);
                loadGroups(token);
            }).catch( err => {
                setLoading(false);
                console.log(err);
            })
        })();

        setName('');
        setDesc('');
        
        
    }


    

    return (
        <div className="sidebar">
            {clickCreate ? <div>
                <form className="createGroup" id="newGroup">
                    <div className="createGroupForm">
                    <input type="text" className="groupInput" placeholder="Enter Group Name..." value={name} onChange={e => setName(e.target.value)}/>
                    <textarea type="text" className="groupInput"  placeholder="Enter Group Description..." value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                  { loading ? "" : <button type="submit" className="groupSubmit" onClick={(e) => addGroupHandler(e,token)}>create</button> }
                </form>
            </div> : ""}
           <div className="groupControls">
            { loading ? <Loader 
                    className="loader"
                    type="ThreeDots"
                    color="#00BFFF"
                    height={window.innerHeight/15}
                    width={window.innerWidth/15}
          /> :   <><i onClick={ () => setclickCreate(!clickCreate)} className="addGroup fas fa-plus-circle"  ></i>
            <i   onClick={ () => loadGroups(token) } className="reload fas fa-redo"></i> </>}
           </div>
            
            { groups.map( g => {
               return <Group key={g.id} name={g.name} reload={(token) => loadGroups(token)} desc={g.description} members={g.members.length} posts={g.posts.length} slug={g.slug} isJoined={g.members.includes(user.id)} />
            })}
            

        </div>
    )
}

export default Sidebar
