import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getBalanceOverview } from '../../Redux/action/Account';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from '../Pagination';

const BalanceOverview = (props) => {
  const dispatch = useDispatch();
    let [itemsBucket,setitemsBucket] = useState([]);
    let [items,setItems] = useState([]);
    let [totelCount,settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    let [sDate, setsDate] = useState(moment().subtract(7, 'days').format("YYYY-MM-DD"));
    let [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
    let [startDate, setStartDate] = useState(moment().subtract(7, 'days').toDate());
    let [endDate, setendDate] = useState(moment().add(1, 'days').toDate());
  let agent = props.agent;
  const getLedugerReport = ()=>{
    // let start = sDate + ' '+ '09:00:00';
    // let end = eDate + ' '+ '08:59:00'; 
    let start = sDate;
    let end = eDate; 
    console.log({id:agent.id,fromdate:start,todate:end});
    props.setLoading(true);
    dispatch(getBalanceOverview({id:agent.id,fromdate:start,todate:end})).then((response)=>{
        props.setLoading(false);
        let responseData = Object.entries(response);
        let output = responseData.map((data)=>data[1]);
        console.log("getBalanceOverview",output);
        setitemsBucket(output);
        settotelCount(output.length);
    },(err)=>{
        console.log("getAccountDownlines err",err);
    });
  }

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

    useEffect(()=>{
        getLedugerReport();
    },[]);
  return (
    <>
    <h2>Balance Overview</h2> 
    <div className="white-wrap">
    <div className="function-wrap">
      <ul className="input-list boxsetting">
      <li style={{ lineHeight: '48px' }}><label>Period</label></li>
      <li>
      <ul className="input-list" style={{ display: 'inline-flex', borderBottom: 'none', padding: '0px', marginLeft:'0px'}}>
      <DatePicker
        selectsStart
        showYearDropdown
        showMonthDropdown
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        placeholderText="YYYY-MM-DD"
        className="cal-input"
        onChange={(date) => { setStartDate(date); setsDate(moment(date).format("YYYY-MM-DD")); }}
      />
      <input id="startTime" disabled="true" className="time-input disable" type="text" placeholder="09:00" maxLength="5" />
      <DatePicker
          selectsEnd
          showYearDropdown
          showMonthDropdown
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          placeholderText="YYYY-MM-DD"
          onChange={(date) => { setendDate(date); seteDate(moment(date).format("YYYY-MM-DD")); }}
          className="cal-input"
      />
      <input id="endTime" disabled="true" className="time-input disable" type="text" placeholder="08:59" maxLength="5" />
      </ul>
      </li>
      <li><Link to="" id="getPL"  className="btn-send margnsetbox" onClick = {()=>{getLedugerReport()}}>Get Data</Link></li>
      </ul>
      {/* <ul className="input-list ud-line">
      
      </ul> */}
      </div>
      </div>
    <table id="table_log" class="table01">
            <tbody>
                <tr>
                    <th width="15%" class="align-L">Date/Time</th>
                    <th width="18%">Description</th>
                    <th width="18%">Debits</th>
                    <th width="18%">Credits</th>
                    <th width="16%">Balance</th>
                    <th width="">Remarks</th>
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
                 let val = item.amount*(-1);   
                return(
                    <tr id="tempTr" key = {index}>
                    <td id="createDate" class="align-L">{item.date}</td>
                    <td id="remark">{item.eventName}</td>
                    <td id="deposit">
                    <span class="green">{item.Credit>0?Math.abs(item.Credit).toFixed(2):'-'}</span></td>
                    <td id="withdraw">
                    <span class="red">{item.Debit<0?'('+Math.abs(item.Debit).toFixed(2)+')':'-'}</span>
                    </td>
                    <td id="balance"> {parseFloat(item.balance).toFixed(2) }</td>
                    <td id="remark">{item.comment}</td>
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

export default BalanceOverview