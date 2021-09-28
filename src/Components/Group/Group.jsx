import React,{useContext} from 'react'
import { Link,useHistory } from 'react-router-dom';
import { UserContext } from '../../Context/User/UserContext';
import { GroupContext } from '../../Context/GroupContext/GroupContext';
import './Group.css';


import instance from '../../axios';

// return <Group key={g.id} name={g.name} desc={g.description} members={g.members.count} posts={g.posts.length} />



const Group = (props) => {

    const [user] = useContext(UserContext);
    const [groups,setGroups] = useContext(UserContext);
    const token = user ? user.token : '';
    const history = useHistory();
   

   
    const exitHandlder = (slug) => {
        
        instance.get(`api/groups/leave/${slug}`,{
            headers : {
                Authorization : 'token '+token,
            }
        });
        props.reload(token);

    }

    const joinHandler = (slug) => {
       
       
        instance.get(`api/groups/join/${slug}`,{
            headers : {
                Authorization : 'token '+token,
            }
        });

        props.reload(token);
    }
    
    return (
        <div>
            <div className="group">
                <div className="groupHead">
                    <span className="groupTitle">
                        <Link className="link" to={`/group/${props.id}`} > {props.name} </Link>
                    </span>
                 { props.isJoined ? <span className="groupExit"> <i onClick={() => exitHandlder(props.slug) } className="fas fa-sign-out-alt"></i> </span>
                    : <span className="groupJoin"> <i onClick={() => joinHandler(props.slug) } className="fas fa-user-plus"></i> </span>}
                </div>
                <hr />
                <div className="groupMeta">
                    <span className="groupdate"> members: {props.members}</span>
                    <span className="groupdate">  posts:{props.posts}</span>
                </div>

            <p className="groupdesc">
                {props.desc}
            </p>

            </div>
        </div>
    )
}

export default Group
