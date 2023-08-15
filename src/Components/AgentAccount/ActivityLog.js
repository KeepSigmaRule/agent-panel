import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getOtherActivityLog } from '../../Redux/action/Account';
import Pagination from '../Pagination';

const ActivityLog = (props) => {
    const dispatch = useDispatch();
    let {token} = useSelector(state=>state.auth);
    let [itemsBucket,setitemsBucket] = useState([]);
    let [items,setItems] = useState([]);
    let [totelCount,settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    let agent = props.agent;

    useEffect(()=>{
        props.setLoading(true);
        dispatch(getOtherActivityLog({id:agent.id,level:agent.level})).then((response)=>{
            props.setLoading(false);
            setitemsBucket(response);
            settotelCount(response.length);
        },(err)=>{
          props.setLoading(false);
          console.log("getAccountDownlines err",err);
        });
      },[props.agent]);
      
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
    <>
    <h2>Activity Log</h2>
    <table className="table01">
    <tbody>
    <tr>
    <th width="15%" className="align-L">Login Date &amp; Time</th>
    <th width="15%" className="align-L">Login Status</th>
    <th width="12%">IP Address</th>
    <th width="15%">remark</th>
    <th width>Device Type</th>
    </tr>
    </tbody>
    <tbody id="content">
        {items.length===0 && 
          <tr id="noDataTempTr">
            <td class="no-data" colspan="5">
              <p>No Data</p>
            </td>
          </tr>
        }
        {items.length>0 && items.map(function(item,index){
        return(
            <tr id="tempTr" key={index}>
            <td className="align-L" id="loginDate">{item.loginDateTime}</td>
            <td className={`align-L ${item.status==='success'?'green':'red'}`} id="loginMessage">Login {item.status}</td>
            <td id="ipAddress">{item.ipAdress}</td>
            <td id="userAgentType">{item.remark}</td>
            <td id="userdevice">{item.deviceInfo}</td>
            </tr>
        )})}
    </tbody>
    </table>
    {items.length>0 && <Pagination
    itemsPerPage={itemsPerPage}
    totelCount={totelCount}
    currentPage={currentPage}
    maxPageNumberLimit={maxPageNumberLimit}
    minPageNumberLimit={minPageNumberLimit}
    setcurrentPage={setcurrentPage}
    setmaxPageNumberLimit={setmaxPageNumberLimit}
    setminPageNumberLimit={setminPageNumberLimit}
    />}
    </>
  )
}

export default ActivityLog