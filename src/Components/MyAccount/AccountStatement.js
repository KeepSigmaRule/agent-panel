import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import { getAccountStatement } from '../../Redux/action/Account';
import Pagination from '../Pagination';

const AccountStatement = (props) => { 
  const dispatch = useDispatch();
  let {token,user} = useSelector(state=>state.auth);
  let [itemsBucket,setitemsBucket] = useState([]);  
  let [statements,setStatements] = useState([]);
  let [totelCount,settotelCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  useEffect(()=>{
    props.setLoading(true); 
    dispatch(getAccountStatement({sid:token})).then((response)=>{
        props.setLoading(false);
        setitemsBucket(response);
        settotelCount(response.length);
    },(err)=>{
      console.log("getAccountDownlines err",err);
    });
  },[]);

  useEffect(()=>{
    let start = (currentPage-1)*itemsPerPage;
    let end = (currentPage)*(itemsPerPage);
    let visibleItems = [];
    visibleItems = itemsBucket.filter((item,index)=>{
      if(index>=start && index<end){
        return item;
      }
    });
    setStatements(visibleItems);
  },[currentPage,itemsBucket]);
  return (
    <>
        <h2>Account Statement</h2>
        <table id="table_log" className="table01">
            <tbody>
                <tr>
                    <th width="15%" className="align-L">Date/Time</th>
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
                    <td id="createDate" className="align-L">{item.time}</td>
                    {user.level<5 && <>
                      <td id="deposit">
                      <span className="green">{val>=0?Math.abs(val).toFixed(2):'-'}</span></td>
                      <td id="withdraw">
                      <span className="red">{val<0?'('+Math.abs(val).toFixed(2)+')':'-'}</span>
                      </td>
                    </>}
                    {user.level==5 && <>
                      <td id="withdraw">
                      <span className="red">{val<0?'('+Math.abs(val).toFixed(2)+')':'-'}</span>
                      </td>
                      <td id="deposit">
                      <span className="green">{val>=0?Math.abs(val).toFixed(2):'-'}</span>
                      </td>
                    </>}
                    
                    <td id="balance"> {parseFloat(item.balance).toFixed(2) }</td>
                    <td id="remark">{item.remark}</td>
                    <td>
                    <span id="from">{item.fromAgent}</span>
                    <img className="fromto" src={Transparent}/>
                    <span id="to">{item.toAgent}</span>
                    </td>
                    </tr>
                )})} 
                {statements.length === 0 && <tr><td colSpan={6} className="align-L">Sorry, there is no data to display.</td></tr>}
            </tbody>
        </table>
        <Pagination
    itemsPerPage={itemsPerPage}
    totelCount={totelCount}
    currentPage={currentPage}
    maxPageNumberLimit={maxPageNumberLimit}
    minPageNumberLimit={minPageNumberLimit}
    setcurrentPage={setcurrentPage}
    setmaxPageNumberLimit={setmaxPageNumberLimit}
    setminPageNumberLimit={setminPageNumberLimit}
    />
    </>
  )
}

export default AccountStatement