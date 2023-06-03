import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import { getAccountStatement } from '../../Redux/action/Account';

const AccountStatement = (props) => { 
  const dispatch = useDispatch();
  let {token} = useSelector(state=>state.auth);  
  let [statements,setStatements] = useState([]);
  useEffect(()=>{
    props.setLoading(true); 
    dispatch(getAccountStatement({sid:token})).then((response)=>{
        props.setLoading(false);
        setStatements(response);
    },(err)=>{
      console.log("getAccountDownlines err",err);
    });
  },[]);
  return (
    <>
        <h2>Account Statement</h2>
        <table id="table_log" class="table01">
            <tbody>
                <tr>
                    <th width="15%" class="align-L">Date/Time</th>
                    <th width="18%">Deposit</th>
                    <th width="18%">Withdraw</th>
                    <th width="18%">Balance</th>
                    <th width="16%">Remark</th>
                    <th width="">From/To</th>
                </tr>
            </tbody>
            <tbody id="content">
                {statements.length > 0 && statements.map(function(item,index){
                 let val = item.amount*(-1);   
                return(
                    <tr id="tempTr" key = {index}>
                    <td id="createDate" class="align-L">{item.time}</td>
                    <td id="deposit">
                    <span class="green">{val>=0?Math.abs(val).toFixed(2):'-'}</span></td>
                    <td id="withdraw">
                    <span class="red">{val<0?'('+Math.abs(val).toFixed(2)+')':'-'}</span>
                    </td>
                    <td id="balance"> {parseFloat(item.balance).toFixed(2) }</td>
                    <td id="remark">{item.remark}</td>
                    <td>
                    <spen id="from">{item.fromAgent}</spen>
                    <img class="fromto" src={Transparent}/>
                    <spen id="to">{item.toAgent}</spen>
                    </td>
                    </tr>
                )})} 
                {statements.length === 0 && <tr><td colSpan={6} className="align-L">Sorry, there is no data to display.</td></tr>}
            </tbody>
        </table>
    </>
  )
}

export default AccountStatement