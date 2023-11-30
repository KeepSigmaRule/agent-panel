import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getFilterAgentList } from '../../Redux/action/Account';
const AgentPath = (props) => {
    let dispatch = useDispatch();
    let {user,agent_path,pl_agent_path} = useSelector(state=>state.auth);
    let {agentList,HandleAgentPath} = props;
    let agentArray = [];
    if(agentList){
        agentArray = getFilterAgentList(agentList);
        agentArray = agentArray.filter((agent)=>agent.level>=user.level);
    }
    else{
        agentArray = pl_agent_path;
    }

    const handleClick = async(user)=>{
        if(HandleAgentPath){
            user.action = 'reverse';
            HandleAgentPath(user);
        }
    }
  return (
    <>
        <div className="agent_path">
            <ul id="agentPath" className="agent_path-L">
                {
                    agentArray.length > 0 && agentArray.map((item,index)=>{
                        return (
                            <li id="path5" key={index} className={index===(agentArray.length-1)?'last_li':''}>
                            <NavLink to="#" onClick={(e)=>handleClick(item)}>
                            <span className={`lv_${(item.level<6)?item.level:0}`}>
                            {item.level_text}
                            </span>
                            <strong>{item.id}</strong>
                            </NavLink>
                            </li>
                        );
                    })
                }
                
            </ul>
        </div>
    </>
  )
}
export default AgentPath