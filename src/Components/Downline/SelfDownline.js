import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAccountSelfDownline } from '../../Redux/action/Downline';

const SelfDownline = () => {
    let dispatch = useDispatch();
    let {token,user,agent_path} = useSelector(state=>state.auth);
    let [totalBalance,setTotalBalance] = useState(0);
    let [totalExposure,setTotalExposure] = useState(0);
    let [totalAvailBalance,setTotalAvailBalance] = useState(0);
    let [balance,setBalance] = useState(0);
    let [availableBalance,setAvailableBalance] = useState(0);
    let [transferablePL,settransferablePL] = useState(0);
    let [userCount,setuserCount] = useState(0);
    useEffect(()=>{
        dispatch(getAccountSelfDownline({sid:token,agentid:agent_path[agent_path.length-1].id})).then((item)=>{
            let totalAvlBal = item.AvlBalance;
            let Exposure =item.Exposure;
            let totalBalance = item.Balance;
            let totalAVB = totalAvlBal + Exposure;
            var TotalAllBalance =  totalAVB + totalBalance;
            setTotalBalance(totalAvlBal);
            setTotalExposure(Math.abs(Exposure));
            setTotalAvailBalance(totalAVB);
            setBalance(totalBalance);
            setAvailableBalance(TotalAllBalance);
            settransferablePL(item.Transferable_Balance);
            setuserCount(item.UserCount);
            console.log("getAccountSelfDownlines",item);
          },(err)=>{
            console.log("getAccountDownlines err",err);
          });
      },[agent_path]);
  return (
    <>
        <div id="totalBox" className="total_box">
        <dl id="totalBalanceDL" className="total_dl">
        <dt>Total Balance</dt>
        <dd id="totalBalance">PTH {parseFloat(totalBalance).toFixed(2)}</dd>
        </dl>
        <dl id="totalExposureDL" className="total_dl">
        <dt>Total Exposure</dt>
        <dd id="totalExposure">PTH {parseFloat(totalExposure).toFixed(2)}</dd>
        </dl>
        <dl id="availableBalanceDL" className="total_dl">
        <dt>Total Avail. bal.</dt>
        <dd id="totalAvailBal">PTH {parseFloat(totalAvailBalance).toFixed(2)}</dd>
        </dl>
        <dl id="masterBalanceDL" className="total_dl">
        <dt>Balance</dt>
        <dd id="mastersBalance">PTH <span>{parseFloat(balance).toFixed(2)}</span>
        </dd>
        </dl>
        <dl id="masterAvailableBalanceDL" className="total_dl">
        <dt>Available Balance</dt>
        <dd id="mastersAvailBal">PTH <span>{parseFloat(availableBalance).toFixed(2)}</span>
        </dd>
        </dl>
        {agent_path[agent_path.length-1].id==user.id && <dl id="transferablePLWithUplineDL" className="total_dl">
        <dt>Transferable P/L with Upline</dt>
        <dd id="transferablePLWithUpline">PTH <span className={`${(transferablePL>0)?'':'red'}`}>{(transferablePL>0)?parseFloat(transferablePL).toFixed(2):`(${parseFloat(transferablePL).toFixed(2)})`}</span>
        </dd>
        </dl>}
        <dl id="transferablePLWithUplineDL" className="total_dl">
        <dt>Total Users</dt>
        <dd id="transferablePLWithUpline"><span>{userCount}</span>
        </dd>
        </dl>
        </div>
    </>
  )
}

export default SelfDownline