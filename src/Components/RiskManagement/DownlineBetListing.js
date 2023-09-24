import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { useSelector,useDispatch } from 'react-redux';
import { getRiskEventListDownline } from '../../Redux/action/Risk';
import { getAgentLevelInfo } from '../../Redux/action/Downline';
import { getClientProfitLoss,getClientCasinoProfitLoss } from '../../Redux/action/Account';
import Pagination from '../Pagination';
import AgentPath from "./AgentPath";
import BettingProfitLoss from "./BettingProfitLoss";
import BettingHistory from "./BettingHistory";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const DownlineBetListing = (props) => {
    const dispatch = useDispatch();
    let {token,user,pl_agent_path} = useSelector(state=>state.auth);
    let {selectedItem,setshowLogs,setLoading} = props;
    let [agents,setagents] = useState([]);
    let [teamA_total_sum,set_teamA_total_sum] = useState(0);
    let [teamB_total_sum,set_teamB_total_sum] = useState(0);
    let [draw_total_sum,set_draw_total_sum] = useState(0);
    let [event,setevent] = useState(selectedItem.event_id);
    let [sportId,setsportId] = useState(selectedItem.sport_id);
    let [marketName,setmarketName] = useState(selectedItem.market_name);
    let [select,setselect] = useState(1);
    let [section,setsection] = useState(0);
    let [selectedPlayer,setselectedPlayer] = useState('');
    useEffect(() => {
      let requestPayload = {};
      requestPayload['sid'] = token;
      requestPayload['sportId'] = sportId;
      requestPayload['marketName'] = marketName;
      requestPayload['is_runnerId3_exist'] = (selectedItem.runnerId3.trim()!=="")?1:0;
      requestPayload['userId'] = pl_agent_path[pl_agent_path.length-1].id;
      requestPayload['eventId'] = event;
      console.log("requestPayload", requestPayload);
      setLoading(true);
      dispatch(getRiskEventListDownline(requestPayload)).then((response)=>{
        if(response.items.length>0){
          let items = response.items;
          setagents(items);
          set_teamA_total_sum(items.reduce((a,v) =>  a = a + v.teamA_total, 0));
          set_teamB_total_sum(items.reduce((a,v) =>  a = a + v.teamB_total, 0));
          set_draw_total_sum(items.reduce((a,v) =>  a = a + v.draw_total, 0));
          setLoading(false);
        }
      },(err)=>{
        setLoading(false);
        toast.danger(err);
      });
      
    },[]);

    const HandleAgentPath = (agentBasicInfo)=>{
      console.log("agentBasicInfo cost", agentBasicInfo);
      let requestPayload = {};
      requestPayload['sid'] = token;
      requestPayload['sportId'] = sportId;
      requestPayload['marketName'] = marketName;
      requestPayload['is_runnerId3_exist'] = (selectedItem.runnerId3.trim()!=="")?1:0;
      requestPayload['userId'] = agentBasicInfo.id;
      requestPayload['eventId'] = event;
      console.log("requestPayload",requestPayload);
      if(agentBasicInfo.level>5){
        setsection(1);
        setselectedPlayer(agentBasicInfo);
      }
      else{
        setsection(0);
        setLoading(true);
      dispatch(getRiskEventListDownline(requestPayload)).then((response)=>{
        if(response.items.length>0){
          let items = response.items;
          setagents(items);
          set_teamA_total_sum(items.reduce((a,v) =>  a = a + v.teamA_total, 0));
          set_teamB_total_sum(items.reduce((a,v) =>  a = a + v.teamB_total, 0));
          set_draw_total_sum(items.reduce((a,v) =>  a = a + v.draw_total, 0));
          if(!agentBasicInfo.action){
            dispatch({ type: "PL_AGENT_PATH_PUSH", payload: agentBasicInfo });
          }
          else{
            let update_agent_path = pl_agent_path.filter((item,index)=>{
              if(item.level<=agentBasicInfo.level){
                return item;
              }
            });
            dispatch({ type: "PL_AGENT_PATH_POP", payload: update_agent_path });
          }
          setLoading(false);
        }
      },(err)=>{
        setLoading(false);
        toast.danger(err);
      });
      }
  }

  const HandelCloseModal = ()=>{
    setshowLogs(false);
    dispatch({ type: "PL_AGENT_PATH_POP", payload: [] });
    dispatch({ type: "PL_AGENT_PATH_PUSH", payload: user });
  }

  return (
    <div id="agentlog" className="pop_bg" style={{top:'0',display: 'block'}}>  
        <div className="log-wrap" style={{margin:'9vh', width: "1280px"}}>
            <table className="game-team">
              <tbody>
                  <tr>
                      <td className="game-name risk-popup-modal">{selectedItem.event_name}<span>{selectedItem.market_name}</span>
                          <Link to="" style={{top:'-1px'}} onClick={()=>{HandelCloseModal()}} className="pop-close" >
                            <img className="icon-back" src={Transparent}/>Close
                          </Link>
                      </td>
                  </tr>
              </tbody>
            </table>
            <div className="pop-content">
            <AgentPath HandleAgentPath={HandleAgentPath}/>
            {section === 0 && <div className="pop-title"> 
              <table className="table01">
                <tbody>
                  <tr>
                    <th className="align-L" rowSpan="2">Downline </th>
                    <th className="align-C border-l bgcolor-sub" width="" colSpan="3">Player P/L </th>
                  </tr>
                  <tr>
                    <th className="border-l bgcolor-sub" width="7%">1</th>
                    {selectedItem.runnerId3!=="" && <th className="border-l bgcolor-sub" width="7%" >X</th>}
                    <th className="border-l bgcolor-sub" width="7%">2</th>
                  </tr>
                </tbody>
                <tbody >
                  {agents.length>0 && agents.map((agent,index)=>{
                    let agnetLevelInfo = {};
                    agnetLevelInfo = getAgentLevelInfo(agent.level);
                    let agentBasicInfo ={id:agent.clientId,clientId:agent.clientId,level:agent.level,level_text:agnetLevelInfo.level_text,agent_level:agnetLevelInfo.agent_level};

                    let teamA_total = (parseFloat(agent.teamA_total).toFixed(2) >= 0)?parseFloat(agent.teamA_total).toFixed(2):`(${parseFloat(Math.abs(agent.teamA_total)).toFixed(2)})`;
                    let teamB_total = (parseFloat(agent.teamB_total).toFixed(2) >= 0)?parseFloat(agent.teamB_total).toFixed(2):`(${parseFloat(Math.abs(agent.teamB_total)).toFixed(2)})`;
                    let draw_total= (parseFloat(agent.draw_total).toFixed(2) >= 0)?parseFloat(agent.draw_total).toFixed(2):`(${parseFloat(Math.abs(agent.draw_total)).toFixed(2)})`;
                     
                    return (
                        <tr key={index}>
                          <td className="td-UID">
                              <span className="order" >{index+1}.</span>
                              <Link to="" onClick={()=>{HandleAgentPath(agentBasicInfo)}} ><strong>{agent.clientId}</strong> </Link>
                            </td>
                          <td><span className={`${(parseFloat(agent.teamA_total).toFixed(2) < 0)?'red':''}`}>{teamA_total}</span></td>
                          {selectedItem.runnerId3!=="" && <td ><span className={`${(parseFloat(agent.draw_total).toFixed(2) < 0)?'red':''}`}>{draw_total}</span></td>}
                          <td><span className={`${(parseFloat(agent.teamB_total).toFixed(2) < 0)?'red':''}`}>{teamB_total}</span></td>
                        </tr>
                      );
                  })}
                  <tr className="total" id="tempTotalTr">
                  <td className="align-L">Total
                  </td>
                  <td id="total_selection_exposure_1"><span className={`${(teamA_total_sum>=0)?'':'red'}`}>{(teamA_total_sum>=0)?parseFloat(teamA_total_sum).toFixed(2):`(${parseFloat(Math.abs(teamA_total_sum)).toFixed(2)})`}</span></td>
                  <td id="total_selection_exposure_3"><span className={`${(draw_total_sum>=0)?'':'red'}`}>{(draw_total_sum>=0)?parseFloat(draw_total_sum).toFixed(2):`(${parseFloat(Math.abs(draw_total_sum)).toFixed(2)})`}</span></td>
                  <td id="total_selection_exposure_2"><span className={`${(teamB_total_sum>=0)?'':'red'}`}>{(teamB_total_sum>=0)?parseFloat(teamB_total_sum).toFixed(2):`(${parseFloat(Math.abs(teamB_total_sum)).toFixed(2)})`}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>}

            {section===1 && <>
              <ul className="tab col2">
              <li className="bet-histo"><a onClick={() => { setselect(1) }} className={`${(select === 1) ? "select" : ""}`}>Bets History </a> </li>
              <li className="bet-histo"><a onClick={() => { setselect(2) }} className={`${(select === 2) ? "select" : ""}`}>Profit & Loss </a></li>
              </ul>
              {select === 1 && <BettingHistory  setLoading={setLoading} selectedItem={selectedPlayer}/>}
              {select === 2 && <BettingProfitLoss  setLoading={setLoading} selectedItem={selectedPlayer}/>}
            </>}
          </div>
        </div>
    </div>
  )
}

export default DownlineBetListing