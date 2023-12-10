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
    let [marketId,setmarketId] = useState(selectedItem.market_id);
    let [select,setselect] = useState(1);
    let [section,setsection] = useState(0);
    let [selectedPlayer,setselectedPlayer] = useState('');
    const detectMobile = () => {
      var check = false;
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    useEffect(() => {
      var isMobile = detectMobile();
      dispatch({ type: "PL_AGENT_PATH_POP", payload:[user]});
      let requestPayload = {};
      requestPayload['sid'] = token;
      requestPayload['sportId'] = sportId;
      requestPayload['eventId'] = event;
      requestPayload['marketId'] = marketId;
      requestPayload['userId'] = user.id;
      requestPayload['runnerId3'] = selectedItem.runnerId3.trim();
      console.log("requestPayload", requestPayload);
      // if(isMobile){
         window.open(`http://192.168.1.6:3000/socket?event=${btoa(JSON.stringify(requestPayload))}`, '_blank', 'noreferrer');
      // }
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
        toast.error(err);
      });
      
    },[]);

    const HandleAgentPath = (agentBasicInfo)=>{
      let requestPayload = {};
      requestPayload['sid'] = token;
      requestPayload['sportId'] = sportId;
      requestPayload['eventId'] = event;
      requestPayload['marketId'] = marketId;
      requestPayload['userId'] = agentBasicInfo.id;
      requestPayload['runnerId3'] = selectedItem.runnerId3.trim();
      
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
        toast.error(err);
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
        <div className="log-wrap" style={{margin:'auto', marginTop:'5%', width: "1280px"}}>
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
                    <th className="border-l bgcolor-sub" width="7%" >X</th>
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
                          <td ><span className={`${(parseFloat(agent.draw_total).toFixed(2) < 0)?'red':''}`}>{draw_total}</span></td>
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