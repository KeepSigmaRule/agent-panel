import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { useSelector,useDispatch } from 'react-redux';
import { getAccountStatement } from '../../Redux/action/Account';
import Pagination from '../Pagination';
const Logs = (props) => {
let {token,user,account} = useSelector(state=>state.auth);
const dispatch = useDispatch();

let [itemsBucket,setitemsBucket] = useState([]);
let [items,setItems] = useState([]);
let [totelCount,settotelCount] = useState(0);
const [currentPage, setcurrentPage] = useState(1);
const [itemsPerPage] = useState(20);
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
    setItems(visibleItems);
},[currentPage,itemsBucket]);

  return (
    <div id="agentlog" className="pop_bg" style={{top:'0',display: 'block'}}>  
        <div className="log-wrap" style={{marginTop:'9vh', width: "1280px"}}>
            <table className="game-team">
            <tbody>
                <tr>
                    <td className="game-name">
                        Banking Logs
                        <Link to="" style={{top:'-1px'}} onClick={()=>props.setshowLogs(false)} className="pop-close" ><img className="icon-back" src={Transparent}/>Close</Link>
                    </td>
                </tr>
            </tbody>
            </table>
        <div className="over-wrap" style={{height: "513px"}}>
            <table id="table_log" className="table01">
                <tbody>
                    <tr>
                        <th width="11%" className="align-L">Date/Time</th>
                        <th width="13%">Deposit</th>
                        <th width="13%">Withdraw</th>
                        <th width="13%">Balance</th>
                        <th width="15%">Remark</th>
                        <th width="">From/To</th>
                    </tr>
                </tbody>
                <tbody id="content">
                    {items.map((item,index)=>{
                        let deposit;
                        let withdraw;
                        // if(item.amount >= 0){
                        //     deposit = '-';
                        //     withdraw = `(${parseFloat(Math.abs(item.amount)).toFixed(2)})`;
                        // }
                        // if(item.amount < 0){
                        //     deposit = `${parseFloat(Math.abs(item.amount)).toFixed(2)}`;
                        //     withdraw = '-';
                        // }
                        if (item.amount >= 0) {
                            deposit = parseFloat(item.amount).toFixed(2);
                            withdraw = '-';
                        } else {
                            deposit = '-';
                            withdraw = `(${parseFloat(Math.abs(item.amount)).toFixed(2)})`;
                        }
                    return(
                    <tr id="tempTr" key = {index}>
                        <td id="createDate" className="align-L">{item.time}</td>
                        <td id="deposit" className="">{deposit}</td>
                        <td id="withdraw" className="red">{withdraw}</td>
                        <td id="balance">{parseFloat(item.balance).toFixed(2)}</td>
                        <td id="remark">{item.remark}</td>
                        <td>
                        <span id="from">{item.fromAgent}</span>
                            <img className="fromto" src={Transparent}/>
                        <span id="to">{item.toAgent}</span>
                        </td>
                    </tr>
                    )})}
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
        </div>
        </div>
    </div>
  )
}

export default Logs