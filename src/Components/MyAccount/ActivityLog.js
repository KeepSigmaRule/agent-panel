import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getActivityLog } from '../../Redux/action/Account';
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

    useEffect(()=>{
        props.setLoading(true);
        dispatch(getActivityLog({sid:token})).then((response)=>{
          props.setLoading(false);
            setitemsBucket(response);
            settotelCount(response.length);
        },(err)=>{
          props.setLoading(false);
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
    <>
    <h2>Activity Log</h2>
    <table className="table01">
    <tbody>
    <tr>
    <th width="15%" className="align-L">Login Date & Time</th>
    <th width="15%" className="align-L">Login Status</th>
    <th width="12%">IP Address</th>
    <th width="15%">remark</th>
    <th width="15%">ISP</th>
    <th width="15%">City/State/Country</th>
    <th width>User Agent Type</th>
    </tr>
    </tbody>
    <tbody id="content">
        {items.map(function(item,index){
        return(
            <tr id="tempTr" key={index}>
            <td className="align-L" id="loginDate">{item.loginDateTime}</td>
            <td className={`align-L ${item.status==='failed'?'red':'green'}`} id="loginMessage">Login {item.status}</td>
            <td id="ipAddress">{item.ipAdress}</td>
            <td id="userAgentType">{item.remark}</td>
            <td id="userAgentType">{item.platform}</td>
            <td id="userAgentType">{item.city}, {item.regionName}, {item.countryName}</td>
            <td id="userdevice">{item.device}, {item.browser}</td>
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
    </>
  )
}

export default ActivityLog