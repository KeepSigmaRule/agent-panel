import React,{useState,useEffect} from 'react';
import { NavLink,Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBetList,getMatchName,getRunnerOddsLiability } from '../../Redux/action/BetList';
import Header from '../Header';
import IsLoadingHOC from '../IsLoadingHOC';
import Pagination from '../Pagination';
import { useSelector,useDispatch } from 'react-redux';

const BetList = (props) => {
    const dispatch = useDispatch(); 
    let {token,user} = useSelector(state=>state.auth);
    let { isLoading, setLoading } = props;
    //let [betList,setbetList] = useState([]);
    let [eventType,seteventType] = useState('4|match');
    let [betStatus,setbetStatus] = useState('1');
    let [searchLevel,setsearchLevel] = useState(user.level);
    let [searchUserId,setsearchUserId] = useState('');
    let [itemsBucket,setitemsBucket] = useState([]);
    let [items,setItems] = useState([]);
    let [totelCount,settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    let [itemsPerPage,setitemsPerPage] = useState(50);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const [sDate, setsDate] = useState(moment().format("YYYY-MM-DD"));
	const [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
	const [startDate, setStartDate] = useState(moment().toDate());
	const [endDate, setendDate] = useState(moment().add(1, 'days').toDate());

    const [option, setOption] = useState('default');
    const getHistory = (option)=>{
        setOption(option);
        let start='';
        let end='';
        switch(option){
            case 'today':{
                let now = moment();
                start = now.format("YYYY-MM-DD 09:00:00");
                end = now.add(1, 'days').format("YYYY-MM-DD 08:59:00");
            } break;
            case 'yesterday':{
                let now = moment();
                start = now.subtract(1, 'days').format("YYYY-MM-DD 09:00:00");
                end = now.add(2, 'days').format("YYYY-MM-DD 08:59:00");
                setStartDate(moment().subtract(1, 'days').toDate());
                setendDate(moment().add(1, 'days').toDate());
            } break;
            default: {
                start = sDate + ' '+ '09:00:00';
                end = eDate + ' '+ '08:59:00';       
            }
        }
       
        let params = {
            sid: token,
            eventType: eventType,
            betStatus: betStatus,
            startDate: start,
            endDate: end,
            searchLevel:searchLevel,
            searchUserId:searchUserId
        }
       
        setLoading(true);
        dispatch(getBetList(params)).then((response)=>{
            setLoading(false);
            setitemsBucket(response);
            settotelCount(response.length);
        },(err)=>{
           setLoading(false);  
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
        getHistory();
    },[]);

  return (
    <>
    <Header/>
    <div id="mainWrap" className="main_wrap risk-responsive">
        <h2>Bet List Live</h2>
            <div className="function-wrap clearfix">
                <ul className="input-list">
                    <li id="eventRadioBtnList">
                        <label for="events_0" onClick={(e)=>{seteventType(e.target.value)}}>
                        <input  type="checkbox" name="events" id="events_0"  checked={eventType === '100'} value="100"/>All
                        </label>
                        <label for="events_4" onClick={(e)=>{seteventType(e.target.value)}}>
                        <input  type="checkbox" name="events" id="events_4" checked={eventType === '4|match'} value="4|match"/>
                            Cricket
                        </label>
                        <label for="events_4|fancy" onClick={(e)=>{seteventType(e.target.value)}}>
                        <input  type="checkbox" name="events" id="events_4|fancy" checked={eventType === '4|fancy'} value="4|fancy"/>
                            Cricket / Fancy Bet
                        </label>
                        <label for="events_1" onClick={(e)=>{seteventType(e.target.value)}}>
                        <input  type="checkbox" name="events" id="events_1" checked={eventType === '1|match'} value="1|match"/>
                            Soccer
                        </label>
                        <label for="events_2" onClick={(e)=>{seteventType(e.target.value)}}>
                        <input  type="checkbox" name="events" id="events_2" checked={eventType === '2|match'} value="2|match"/>
                            Tennis
                        </label>
                    </li>
                </ul>
                <ul className="input-list">
                    <li>
                        <label>Bet Status:</label>
                        <select name="sortCondition" id="sortCondition" onChange={(e)=>{setbetStatus(e.target.value)}}>
                            {/* <option value="0" selected={betStatus === '0'}>Unmatched</option> */}
                            <option value="1" selected={betStatus === '1'}>Matched</option>
                            <option value="2" selected={betStatus === '2'}>Settled</option>
                            {/* <option value="3" selected={betStatus === '3'}>Cancelled</option>
                            <option value="4" selected={betStatus === '4'}>Voided</option> */}
                        </select>
                    </li>
                    <li>
                        <label>User Level:</label>
                        <select name="sortCondition" id="sortCondition" onChange={(e)=>{setsearchLevel(e.target.value)}}>
                        <option value={user.level} selected={betStatus === user.level}>Default</option>
                        {user.level < 5 && <option value={5} selected={betStatus === 5}>Master Agent</option>}
                        <option value={6} selected={betStatus === 6}>Player</option>
                        </select>
                    </li>
                    {searchLevel > 0 && <li>
                        <label>UserId:</label>
                        <input type="text" value={searchUserId} onChange={(e)=>{setsearchUserId(e.target.value)}} />
                    </li>}
                    <li>
                        <label>Last:</label>
                        <select  name="limit" id="limit" onChange={(e)=>{setitemsPerPage(e.target.value)}}>
                            <option value={25} selected={itemsPerPage === 25}>25 Txn</option>
                            <option value={50} selected={itemsPerPage === 50}>50 Txn</option>
                            <option value={100} selected={itemsPerPage === 100}>100 Txn</option>
                            <option value={250} selected={itemsPerPage === 250}>250 Txn</option>
                            <option value={500} selected={itemsPerPage === 500}>500 Txn</option>
                        </select>
                    </li>
                    <li><label>Period</label></li>
                    <li>
                    <ul className="input-list" style={{ display: 'inline-flex',marginTop:'-10px'}}>
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
                </ul>
                <ul className="input-list">
                    <li><Link to="" id="today"  onClick = {()=>{getHistory('today')}}  className="btn">Just For Today</Link></li>
                    <li><Link to="" id="yesterday"  onClick = {()=>{getHistory('yesterday')}} className="btn">From Yesterday</Link></li>
                    <li><Link to="" id="getPL"  onClick = {()=>{getHistory('defaut')}} className="btn-send">Get History</Link></li>
                </ul>
            </div>

            <table id="matchTable" className="table-s" style={{display:'table'}}><caption id="matchedTitle">Matched</caption>
                <table id="matchTable" className="table-s" style={{display:'table'}}>
                    <tbody>
                        <tr>
                            {[0,1].includes(user.level) && <th width="8%" className="align-L">SA ID</th>}
                            {[0,1,2].includes(user.level) && <th width="8%" className="align-L">SS ID</th>}
                            {[0,1,2,3].includes(user.level) && <th width="8%" className="align-L">SUP ID</th>}
                            {[0,1,2,3,4].includes(user.level) && <th width="8%" className="align-L">MA ID</th>}
                            <th width="8%" className="align-L">PL ID</th>
                            <th width="5%" className="align-L">Bet ID</th>
                            <th id="betTime" width="6%" className="align-L">Bet taken</th>
                            <th width="7%" className="align-L">IP Address</th>
                            <th width="7%" className="align-L">ISP</th>
                            <th width="" className="align-L">Market</th>
                            <th width="7%" className="align-L">Selection</th>
                            <th width="4%" className="align-C">Type</th>
                            <th width="4%">Odds req.</th>
                            <th width="8%">Stake</th>
                            <th width="5%">Liability</th>
                            {/* <th width="5%" id="unMatchedLastPrice_title" className="text-right">UnMatchedLastPrice</th>
                            <th width="5%" id="matchedLastPrice_title" className="text-right">MatchedLastPrice</th>
                            <th width="5%" id="oddsDifferential_title" className="text-right">OddsDifferential</th> */}
                        </tr>
                        {items.length > 0 ? items.map((item,index)=>{
                            let matchName = getMatchName(item.sportId);
                            let itemInfo = getRunnerOddsLiability(item);
                            return (
                                <tr key={index} id="matchRow0" style={{display: 'table-row'}}>
                                {[0,1].includes(user.level) && <td id="agentUserId1" className="align-L" >{item.agentList.level2}</td>}   
                                {[0,1,2].includes(user.level)  && <td id="agentUserId2" className="align-L" >{item.agentList.level3}</td>}
                                {[0,1,2,3].includes(user.level) && <td id="agentUserId3" className="align-L" >{item.agentList.level4}</td>}
                                {[0,1,2,3,4].includes(user.level) && <td id="agentUserId3" className="align-L" >{item.agentList.level5}</td>}
                                <td id="playerId" className="align-L">{item.clientId}</td>
                                <td className="align-L"><Link to="" id="betID" href="javascript: void(0);">{item.id}</Link></td>
                                <td className="align-L"><span id="betPlaced" className="small-date">{item.betTime}</span></td>
                                <td id="agentUserId1" className="align-L" >==</td> 
                                <td id="agentUserId1" className="align-L" >==</td> 
                                <td id="matchTitle" className="align-L">{matchName}<img className="fromto" src={Transparent}/><strong>{item.eventName}</strong><img className="fromto" src={Transparent}/>{item.betType == 'match' ? item.marketName : 'FANCY_BET'}</td>
                                <td id="matchSelection" className="align-L"><Link to="">{itemInfo.runner}</Link></td>
                                <td className="align-C"><span id="matchType" className={`${item.type === 'LAGAI' || item.type === 'YES'? "back":"lay"}`}>{itemInfo.matchtype}</span></td>
                                <td id="matchOddsReq">{itemInfo.odds}</td>
                                <td id="matchStake">{parseFloat(item.amount).toFixed(2)}</td>
                                <td id="liability"><span className="red">{itemInfo.liability === '-' ? itemInfo.liability : `(${itemInfo.liability})`}</span></td> 
                                {/* <td id="agentUserId1" className="align-L" >UnMatchedLastPrice</td> 
                                <td id="agentUserId1" className="align-L" >MatchedLastPrice</td> 
                                <td id="agentUserId1" className="align-L" >OddsDifferential</td>  */}
                                </tr>
                            )
                        }):<tr className="total">
                        <td colSpan={11} className="align-L">Sorry, there is no data to display.</td>
                    </tr>}
                    </tbody>
                </table>
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
    </>
  )
}

export default IsLoadingHOC(BetList)