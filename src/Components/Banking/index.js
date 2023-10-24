import React,{useState,useEffect} from 'react';
import { NavLink,Link } from 'react-router-dom';
import { getAccountDownlines } from '../../Redux/action/Downline';
import { makeBankingPayment } from '../../Redux/action/Banking';
import Header from '../Header';
import SearchBar from './SearchBar';
import RelatedDownline from './RelatedDownline';
import Logs from './Logs';
import DownlineLogs from './DownlineLogs';
import { useSelector,useDispatch } from 'react-redux';
import { getAccountDetail } from '../../Redux/action/Auth';
import { toast } from "react-toastify";
import IsLoadingHOC from '../IsLoadingHOC';
const Banking = (props) => {
    let dispatch = useDispatch();
    let { isLoading, setLoading } = props;
    let {token,user,account} = useSelector(state=>state.auth);
    let {puserBlocked,pbetBlocked,account_downlines} = useSelector(state=>state.downline);
    let [showLogs, setshowLogs] = useState(false);
    let [showDownlineLogs, setshowDownlineLogs] = useState(false);
    let [selectedAgentId,setselectedAgentId] = useState();
    let [selectedAgentLevel,setselectedAgentLevel] = useState();
    let [activeRows, setactiveRows] = useState(0);
    let [agentPassword, setagentPassword] = useState();
    let [refreshDownline, setrefreshDownline] = useState(false);
    let [items,setItems] = useState([]);
    let [bankingResponse,setbankingResponse] = useState([]);
    const [agents,setAgents] = useState([]);

    const clearAllRows = ()=>{
        account_downlines.map((item)=>{
            if(item.banking_type){
                delete item.banking_type;
            }
            if(item.banking_amount){
                delete item.banking_amount;
            }
        });
        setactiveRows(0);
        dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: account_downlines});
    }

    const submitBankingPayment = ()=>{
        let bankingRequestPayload = [];
        account_downlines.map((item)=>{
            if(item.banking_amount>0 && item.banking_type!=''){
                let payload = {};
                payload['agentId'] = item.clientid;
                payload['bankingType'] = item.banking_type;
                payload['amount'] = item.banking_amount;
                payload['remark'] = (item.banking_remark)?item.banking_remark:'';
                bankingRequestPayload.push(payload);
            }
        });

        if(activeRows > 0 && bankingRequestPayload.length > 0){
            let requestPayload = {};
            requestPayload['sid'] = token;
            requestPayload['myPass']  = agentPassword;
            requestPayload['players']  = bankingRequestPayload;
            requestPayload['agentLevel']  = user.level;
            clearAllRows();
            setLoading(true);
            dispatch(makeBankingPayment(requestPayload)).then((response)=>{
                toast.success("Updated successfully.");
                setbankingResponse(response.data);
                setrefreshDownline(!refreshDownline);
                dispatch(getAccountDetail({sid:token})).then((response)=>{},(err)=>{
                    toast.error(err);
                });
                setLoading(false);
            },(err)=>{
                setLoading(false);
                toast.error(err.message);
            });
        }
    }

  return (
    <>
    <Header/>
    {showLogs && <Logs setLoading={setLoading} setshowLogs={setshowLogs}/>}
    {showDownlineLogs && <DownlineLogs setLoading={setLoading} setshowDownlineLogs={setshowDownlineLogs} selectedAgentId={selectedAgentId} selectedAgentLevel={selectedAgentLevel}/>}
    <div id="mainWrap" className="main_wrap risk-responsive">
        <h2>Banking</h2>
        <SearchBar items={items} setItems={setItems} setLoading={setLoading}/>
        <div className="over-wrap white-wrap" style={{ maxHeight:'460px',overflow:'auto'}}>
        <div className="function-wrap clearfix">
            <dl className="banking-head float-L">
                <dt>Your Balance</dt>
                <dd id="yourBalance"><span>PTH</span>{parseFloat(user.balance).toFixed(2)}</dd>
            </dl>
        </div>
        <RelatedDownline agents={agents} setAgents={setAgents} bankingResponse={bankingResponse} items={items} setItems={setItems} refreshDownline={refreshDownline} setLoading={setLoading} setshowLogs={setshowLogs} setshowDownlineLogs={setshowDownlineLogs}  setselectedAgentId={setselectedAgentId} setselectedAgentLevel={setselectedAgentLevel} setactiveRows={setactiveRows}/>
        </div>
        <div className="submit-wrap" id="settlementBar">
        <ul>
        <li><Link to="" onClick={()=>{clearAllRows()}} id="clearAllBtn" className="btn">Clear All</Link></li>
        <li className="submit-payment">
        <input  id="paymentPassword" type="password" onChange={(e)=>setagentPassword(e.target.value)} value={agentPassword} placeholder="Password" />
        <Link to="" onClick={()=>{submitBankingPayment()}} id="submit" className="btn-send">Submit <span id="submitCount">{activeRows}</span> Payment</Link>
        </li>
        </ul>
        </div>
    </div>
    </>
  )
}

export default IsLoadingHOC(Banking)