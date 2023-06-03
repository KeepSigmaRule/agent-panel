import React,{useState,useEffect} from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import Loading from '../../images/loading40.gif'
import Transparent from '../../images/transparent.gif'
// import '../../css/Login.css';
// import '../../css/Indibet.css';
// import '../../css/Fullmarket.css';
// import '../../css/Style.css';
import Header from '../Header';
import AgentPath from './AgentPath';
import AccountSummary from './AccountSummary';
import TransactionHistory from './TransactionHistory';
import ActivityLog from './ActivityLog';
import ChangePassword from './ChangePassword';
import BettingProfitLoss from './BettingProfitLoss';
import BettingHistory from './BettingHistory';
import IsLoadingHOC from '../IsLoadingHOC';
import { useSelector,useDispatch } from 'react-redux';

const AgentAccount = (props) => {
    let {token,user,agent_path} = useSelector(state=>state.auth);
    let location = useLocation();
    let location_state = location.state;
    let { isLoading, setLoading } = props;
    let [selectedMenu,setselectedMenu] = useState((location_state)?location_state.selectedMenu:1);
    let [changePassword,setchangePassword] = useState(false);
    let [agentBreadcrumbs,setagentBreadcrumbs] = useState(location_state);
    let [agent,setAgent] = useState(agent_path[agent_path.length-1]);
    const HandlePopup = (modalType,action,params) => {
        switch(modalType){
          case 'change_password':{
            setchangePassword(action);
          } break;
        }
    }
    
  return (
    <>
    {changePassword && <ChangePassword agent={agent} HandlePopup={HandlePopup}/>}
    <Header/>
    <div id="mainWrap" className="main_wrap">
        <AgentPath setLoading={setLoading} agentBreadcrumbs={agentBreadcrumbs} setagentBreadcrumbs={setagentBreadcrumbs} setAgent={setAgent}/>
        <div className="col-left">
            <div className="sub_path">
                <ul className="menu-list">
                    <li className="class">Position</li>
                    <li><NavLink className={selectedMenu===1 && 'select'} onClick={()=>{setselectedMenu(1)}} to="" id="accountSummary">Account Summary</NavLink></li>
                    <li className="class">Performance</li>
                    {agent.level===6 && <li><NavLink className={selectedMenu===4 && 'select'} onClick={()=>{setselectedMenu(4)}} to="" id="transactionHistory">Betting History</NavLink></li>}
                    {agent.level===6 && <li><NavLink className={selectedMenu===5 && 'select'} onClick={()=>{setselectedMenu(5)}} to="" id="transactionHistory">Betting Profit & Loss</NavLink></li>}
                    <li><NavLink className={selectedMenu===2 && 'select'} onClick={()=>{setselectedMenu(2)}} to="" id="transactionHistory">Transaction History</NavLink></li>
                    <li><NavLink className={selectedMenu===3 && 'select'} onClick={()=>{setselectedMenu(3)}} to="" id="activityLog" >Activity Log</NavLink></li>
                </ul>
            </div>
        </div>
        <div className="col-center report">
            {selectedMenu===1 && <AccountSummary  setLoading={setLoading} agent={agent} HandlePopup={HandlePopup}/>}
            {selectedMenu===2 && <TransactionHistory setLoading={setLoading} agent={agent}/>}
            {selectedMenu===3 && <ActivityLog setLoading={setLoading}/>}
            {selectedMenu===5 && <BettingProfitLoss setLoading={setLoading} agent={agent} />}
            {selectedMenu===4 && <BettingHistory setLoading={setLoading} agent={agent} />}
            <div></div>
        </div>
    </div>
    </>
  )
}

export default IsLoadingHOC(AgentAccount)