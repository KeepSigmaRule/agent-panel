import React, { useEffect, useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getAgentLevelInfo } from '../../Redux/action/Downline';

const AgentPath = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {user,agent_path} = useSelector(state=>state.auth);
  let {account_downlines} = useSelector(state=>state.downline);
  let [showListing,setshowListing] = useState(false);
  let agentBreadcrumbs = props.agentBreadcrumbs;
  
  const handleClick = (e,index)=>{
    if(index===agent_path.length-1){
        e.preventDefault();
        setshowListing(!showListing);
    }
    else{
        let update_agent_path = agent_path.filter((item,agent_path_index)=>{
            if(agent_path_index<=index){
                return item;
            }
        });
        dispatch({ type: "AGENT_PATH_POP", payload: update_agent_path });
    }
  }
  
  const handleSelectAgent = (agentBasicInfo)=>{
    props.setAgent(agentBasicInfo);
    setshowListing(!showListing);
    let update_agent_breadcrums = agent_path.filter((item,index)=>{
        if(index<agent_path.length-1){
            return item;
        }
    })
    update_agent_breadcrums.push(agentBasicInfo);
    //props.setagentBreadcrumbs(update_agent_breadcrums)
    dispatch({ type: "AGENT_PATH_POP", payload: update_agent_breadcrums });
  }

  return (
    <>
        <div className="agent_path">
            <ul id="agentPath" className="agent_path-L">
                {
                    agent_path.map((item,index)=>{
                        return (
                                <li key={index} id="path5" className={index===(agent_path.length-1)?'last_li drop_down_li':''}>
                                    <NavLink to="/downline" onClick={(e)=>handleClick(e,index)}>
                                        <span className={`lv_${(item.level<6)?item.level:0}`}>
                                            {item.level_text}
                                        </span>
                                    <strong>{item.id}</strong>
                                    </NavLink>
                                    {showListing && <ul className="account_pop" id="accountPop" style={{display:'block'}}>
                                        <li id="popTmp" style={{display:'none'}}>
                                        <NavLink to="#"></NavLink>
                                        </li>
                                        {index===(agent_path.length-1) && account_downlines.length>0 &&
                                            account_downlines.map((item,index)=>{
                                                let agnetLevelInfo = {};
                                                agnetLevelInfo = getAgentLevelInfo(item.level);
                                                let agentBasicInfo ={id:item.clientid,level:agnetLevelInfo.level_no,balance:item.Balance,level_text:agnetLevelInfo.level_text,agent_level:agnetLevelInfo.agent_level};
                                                return (
                                                    <li key={index} id="" style={{display:'list-item'}}>
                                                        <NavLink onClick={()=>handleSelectAgent(agentBasicInfo)} to="#">{item.clientid}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }    
                                    </ul>}
                                </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
  )
}

export default AgentPath