import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

const AgentPath = (props) => {
  let dispatch = useDispatch();
  let {user,agent_path} = useSelector(state=>state.auth);
  const handleClick = (user_level)=>{
    let update_agent_breadcrums = agent_path.filter((item,index)=>{
        if(item.level<=user_level){
            return item;
        }
    })
    dispatch({ type: "AGENT_PATH_POP", payload: update_agent_breadcrums });
  }
  return (
    <>
        <div className="agent_path">
            <ul id="agentPath" className="agent_path-L">
                <li id="path5" className="last_li">
                    <NavLink to="/downline"  onClick={()=>handleClick(user.level)}>
                        <span className="lv_1">
                            {user.level_text}
                        </span>
                        <strong>{user.id}</strong>
                    </NavLink>
                </li>
            </ul>
        </div>
    </>
  )
}

export default AgentPath