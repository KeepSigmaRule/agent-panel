import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { useSelector,useDispatch } from 'react-redux';
import { getClientProfitLoss,getClientCasinoProfitLoss } from '../../Redux/action/Account';
import Pagination from '../Pagination';
import AgentPath from "./AgentPath";
import BettingProfitLoss from "./BettingProfitLoss";
import BettingHistory from "./BettingHistory";
import "react-datepicker/dist/react-datepicker.css";

const AgentAccount = (props) => {
    const dispatch = useDispatch();
    let {pl_agent_path} = useSelector(state=>state.auth);
    let [select,setselect] = useState(1);  
    let {selectedItem,setLoading,setshowLogs} = props;
    const closeModal = ()=>{
      let update_pl_agent_path = pl_agent_path.filter((item,index)=>{
        if(index<pl_agent_path.length-1){
            return item;
        }
      });
      dispatch({ type: "PL_AGENT_PATH_POP", payload: update_pl_agent_path });
      setshowLogs(false);
    }
    

  return (
    <div id="agentlog" className="pop_bg" style={{top:'0',display: 'block'}}>  
        <div className="log-wrap" style={{margin:'9vh', width: "1280px"}}>
            <table className="game-team">
            <tbody>
                <tr>
                    <td className="game-name risk-popup-modal">
                        <Link to="" style={{top:'-1px'}} onClick={()=>closeModal()} className="pop-close" ><img className="icon-back" src={Transparent}/>Close</Link>
                    </td>
                </tr>
            </tbody>
            </table>
        <div className="over-wrap" style={{height: "513px",padding:"10px"}}>
          <div className="pop-content"> 
            <AgentPath />
            <ul className="tab col2">
              <li className="bet-histo"><a onClick={() => { setselect(1) }} className={`${(select === 1) ? "select" : ""}`}>Bets History </a> </li>
              <li className="bet-histo"><a onClick={() => { setselect(2) }} className={`${(select === 2) ? "select" : ""}`}>Profit & Loss </a></li>
            </ul>
            {select === 1 && <BettingHistory setLoading={setLoading} selectedItem={selectedItem}/>}
            {select === 2 && <BettingProfitLoss setLoading={setLoading} selectedItem={selectedItem}/>}
        </div>
        </div>
        </div>
    </div>
  )
}

export default AgentAccount