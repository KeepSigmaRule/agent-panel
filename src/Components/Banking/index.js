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
            clearAllRows();
            setLoading(true);
            bankingRequestPayload.map((item,index)=>{
                let requestPayload = {};
                requestPayload['sid'] = token;
                requestPayload['agentId'] = item.agentId;
                requestPayload['bankingType'] = item.bankingType;
                requestPayload['amount'] = item.amount;
                requestPayload['myPass']  = agentPassword;
                requestPayload['agentLevel']  = user.level;
                console.log("requestPayload",requestPayload);
                dispatch(makeBankingPayment(requestPayload)).then((response)=>{
                    if(bankingRequestPayload.length===(index+1)){
                        console.log("finish");
                        let downlineParam = {"id": user.id,"puserBlocked": puserBlocked,"pbetBlocked": pbetBlocked,"searchvalue": ""}
                        dispatch(getAccountDownlines(downlineParam)).then((response)=>{
                            setLoading(false);
                            console.log("getAccountDownlines",response);
                        },(err)=>{
                          console.log("getAccountDownlines err",err);
                        });

                        dispatch(getAccountDetail({sid:token})).then((response)=>{
                            console.log("getAccountDetail",response);
                          },(err)=>{
                            toast.error(err);
                          });
                    }
                },(err)=>{
                  console.log("getAccountDownlines err",err);
                });
            })
        }
    }

  return (
    <>
    <Header/>
    {showLogs && <Logs setLoading={setLoading} setshowLogs={setshowLogs}/>}
    {showDownlineLogs && <DownlineLogs setLoading={setLoading} setshowDownlineLogs={setshowDownlineLogs} selectedAgentId={selectedAgentId} selectedAgentLevel={selectedAgentLevel}/>}
    <div id="mainWrap" className="main_wrap risk-responsive">
        <h2>Banking</h2>
        <SearchBar setLoading={setLoading}/>
        <div class="over-wrap white-wrap" style={{ maxHeight:'460px',overflow:'auto'}}>
        <div class="function-wrap clearfix">
            <dl class="banking-head float-L">
                <dt>Your Balance</dt>
                <dd id="yourBalance"><span>PTH</span>{parseFloat(user.balance).toFixed(2)}</dd>
            </dl>
        </div>
        <RelatedDownline setLoading={setLoading} setshowLogs={setshowLogs} setshowDownlineLogs={setshowDownlineLogs}  setselectedAgentId={setselectedAgentId} setselectedAgentLevel={setselectedAgentLevel} setactiveRows={setactiveRows}/>
        </div>
        <div class="submit-wrap" id="settlementBar">
        <ul>
        <li><Link to="" onClick={()=>{clearAllRows()}} id="clearAllBtn" class="btn">Clear All</Link></li>
        <li class="submit-payment">
        <input  id="paymentPassword" type="password" onChange={(e)=>setagentPassword(e.target.value)} value={agentPassword} placeholder="Password" />
        <Link to="" onClick={()=>{submitBankingPayment()}} id="submit" class="btn-send">Submit <span id="submitCount">{activeRows}</span> Payment</Link>
        </li>
        </ul>
        </div>
    </div>
    </>
  )
}

export default IsLoadingHOC(Banking)