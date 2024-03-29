import React, { useEffect, useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { getAgentLevelInfo,getDownlineProfitLoss } from '../../Redux/action/Downline';

const AgentPath = (props) => {
  let {enable,selectedItem} = props;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {token,user,pl_agent_path,agent_path} = useSelector(state=>state.auth);
  let [showListing,setshowListing] = useState(false);
  let [agents,setagents] = useState(pl_agent_path);
  useEffect(()=>{
    if(selectedItem){
    let agnetLevelInfo = getAgentLevelInfo(selectedItem.level);
    let agentBasicInfo ={id:selectedItem.agentId,level:agnetLevelInfo.level_no,balance:selectedItem.Balance,level_text:agnetLevelInfo.level_text,agent_level:agnetLevelInfo.agent_level};
    setagents([...agents,agentBasicInfo]);
   }
  },[]);

  const handleClick = async(user)=>{
    if(enable===false){
        return false;
    }
    let start='';
        let end='';
        switch(props.option){
            case 'today':{
                let now = moment();
                start = now.format("YYYY-MM-DD 09:00:00");
                end = now.add(1, 'days').format("YYYY-MM-DD 08:59:00");
            } break;
            case 'yesterday':{
                let now = moment();
                start = now.subtract(1, 'days').format("YYYY-MM-DD 09:00:00");
                end = now.add(2, 'days').format("YYYY-MM-DD 08:59:00");
            } break;
            default: {
                start = props.sDate + ' '+ '09:00:00';
                end = props.eDate + ' '+ '08:59:00';       
            }
        }
        let update_agent_path = pl_agent_path.filter((item,index)=>{
            if(item.level<=user.level){
              return item;
            }
          });
          props.setLoading(true);
        dispatch(getDownlineProfitLoss({sid:token,agentId:user.id,startDate:start,endDate:end,type:props.sportType})).then((response)=>{
            props.setLoading(false);
            props.setagentList(response);
            dispatch({ type: "PL_AGENT_PATH_POP", payload: update_agent_path });
        },(err)=>{
            console.log("getAccountDownlines err",err);
        });
  }

  return (
    <>
        <div className="agent_path">
            <ul id="agentPath" className="agent_path-L">
                {enable===false && agents.map((item,index)=>{
                        return (
                                <li key={index} id="path5" className={index===(agents.length-1)?'last_li':''}>
                                    <NavLink to="/my-report/profit-loss-downline" onClick={(e)=>handleClick(item)}>
                                        <span className={`lv_${(item.level<6)?item.level:0}`}>
                                            {item.level_text}
                                        </span>
                                    <strong>{item.id}</strong>
                                    </NavLink>
                                </li>
                        )
                    })
                }
                {enable===true && pl_agent_path.map((item,index)=>{
                        return (
                                <li key={index} id="path5" className={index===(pl_agent_path.length-1)?'last_li':''}>
                                    <NavLink to="/my-report/profit-loss-downline" onClick={(e)=>handleClick(item)}>
                                        <span className={`lv_${(item.level<6)?item.level:0}`}>
                                            {item.level_text}
                                        </span>
                                    <strong>{item.id}</strong>
                                    </NavLink>
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