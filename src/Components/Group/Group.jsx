import React,{useContext, useState} from 'react'
import { Link,useHistory } from 'react-router-dom';
import { UserContext } from '../../Context/User/UserContext';

import './Group.css';
import Loader from 'react-loader-spinner';


import instance from '../../axios';

// return <Group key={g.id} name={g.name} desc={g.description} members={g.members.count} posts={g.posts.length} />



const Group = (props) => {

    const [loading,setLoading] = useState(false);

    const [user] = useContext(UserContext);
    const token = user ? user.token : '';
    

   

   
    const exitHandlder = (slug) => {
        
        setLoading(true);
        (async () => {
            await instance.get(`api/groups/leave/${slug}`,{
                headers : {
                    Authorization : 'token '+token,
                }
            }).then( res => {
                setLoading(false);
                props.reload(token);
                
            }).catch ( err => {
                alert(err);
                setLoading(false);
                
            });

        })();
        

    }

    const joinHandler = (slug) => {
       
        setLoading(true);
        (async () => {
            await instance.get(`api/groups/join/${slug}`,{
                headers : {
                    Authorization : 'token '+token,
                }
            }).then( res => {
                setLoading(false);
                props.reload(token);
            }).catch(
                err => {
                    alert(err);
                    setLoading(false);
                }
            ) ;

        })();
        
    }
    
    return (
        <div>
            <div className="group">
                <div className="groupHead">
                    <span className="groupTitle">
                        <Link className="link" to={`/group/${props.id}`} > {props.name} </Link>
                    </span>
                 { props.isJoined ? 
                 <span className="groupExit"> 
                 {loading ? <Loader type="TailSpin" color="#00BFFF" height={window.innerHeight/40} width={window.innerWidth/40} /> :
                            <i onClick={() => exitHandlder(props.slug) } className="fas fa-sign-out-alt"></i>}
                  </span>
                    : 
                    <span className="groupJoin"> 
                      { loading ?   <Loader type="TailSpin" color="#00BFFF" height={window.innerHeight/40} width={window.innerWidth/40} /> :
                                <i onClick={() => joinHandler(props.slug) } className="fas fa-user-plus"></i> }
                    </span>}
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
