import React,{ useState,createContext } from "react";


export const GroupContext = createContext();

export const GroupProvider = (props) => {

    const [groups,setGroups] = useState([]);
    return (
        <GroupContext.Provider value={[groups,setGroups]}>
            {props.children}
        </GroupContext.Provider>
    )
}

