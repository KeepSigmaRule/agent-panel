import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import { Link } from 'react-router-dom';
import { getClientBetHistory } from '../../Redux/action/Account';
import { getMatchName } from '../../Redux/action/BetList';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const BettingHistory = (props) => {
    const dispatch = useDispatch();
    let {token,user,agent_path} = useSelector(state=>state.auth);
    let [select,setselect] = useState(0);
    let [betStatus,setbetStatus] = useState("1");
    let [bethistory, setbethistory] = useState([]);
    let [dataExist, setdataExist] = useState(false);
    let [option, setOption] = useState('default');
    let [sDate, setsDate] = useState(moment().format("YYYY-MM-DD"));
    let [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
    let [startDate, setStartDate] = useState(moment().toDate());
    let [endDate, setendDate] = useState(moment().add(1, 'days').toDate());
    let {agent,setLoading} = props;
    const getBetHistory = (option)=>{
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
            } break;
            default: {
                start = sDate + ' '+ '09:00:00';
                end = eDate + ' '+ '08:59:00';       
            }
        }
        setLoading(true);
        dispatch(getClientBetHistory({sid:token,clientId:agent.id,betStatus:betStatus,startDate:start,endDate:end,view:1})).then((response)=>{
            setLoading(false);
            setbethistory(response);
            if(response.length==0){
                toast.info("Sorry, there is no data to display.");
            }
            else{
                setdataExist(true);
            }
        },(err)=>{
            setLoading(false);
            toast.danger(err);
        }); 
    }

    return (
        <>
        <h2>Betting History</h2>
        <div className="white-wrap">
            <ul className="report-tab-wrap" >
                <li  onClick ={()=>{setselect(0)}} className={`report-tab ${(select=== 0 )? "select": "null"}`}  id="reportType_exchange" data-reporttabtype="0">
                    Exchange
                </li>
                <li onClick ={()=>{setselect(1)}} className={`report-tab ${(select=== 1 )? "select": "null"}`} id="reportType_sportsBook" data-reporttabtype="2">
                    Sportsbook
                </li>
                <li onClick ={()=>{setselect(2)}} className={`report-tab ${(select=== 2 )? "select": "null"}`} id="reportType_bookMaker" data-reporttabtype="3">
                    BookMaker
                </li>
                <li onClick ={()=>{setselect(3)}} className={`report-tab ${(select=== 3 )? "select": "null"}`} id="reportType_binary" data-reporttabtype="5">
                    Binary
                </li>
            </ul>
            <div className="function-wrap">
                <ul className="input-list">
                <div id="statusCondition">
                <li><label>Bet Status:</label></li>
                <li>
                <select name="betStatus" id="betStatus" onChange={(e)=>{setbetStatus(e.target.value)}}>
                    <option value="0" selected={betStatus === "0"}>Unmatched</option>
                    <option value="1" selected={betStatus === "1"}>Matched</option>
                    <option value="2" selected={betStatus === "2"}>Settled</option>
                    <option value="3" selected={betStatus === "3"}>Cancelled</option>
                    <option value="4" selected={betStatus === "4"}>Voided</option>
                </select>
                </li>
                </div> 
                <li><label>Period</label></li>
                <ul className="input-list" style={{ display: 'inline-flex', borderBottom: 'none', padding: '0px' }}>
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
                <li style={{display:'none'}}>(TimeZone:IST)</li>
                </ul>

                <ul className="input-list">
                <li><Link to="" id="today"  onClick = {()=>{getBetHistory('today')}} className="btn">Just For Today</Link></li>
                <li><Link to="" id="yesterday" onClick = {()=>{getBetHistory('yesterday')}} className="btn">From Yesterday</Link></li>
                <li><Link to="" id="getPL"  className="btn-send" onClick = {()=>{getBetHistory('default')}}>Get History</Link></li>
                </ul>
            </div>
            {!dataExist && <div id="noReportMessage">
                <p>Betting History enables you to review the bets you have placed. <br/>Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
                <p>Betting History is available online for the past 30 days.</p>
            </div>}
            {dataExist && <div id="report">
                <table id="matchTable" className="table-s" style={{display:'table'}}>
                <tbody><tr>
                    <th width="9%" className="align-L">Bet ID</th>
                    <th width="9%" className="align-L">PL ID</th>
                    <th width="" className="align-L">Market</th>
                    <th width="12%">Selection</th>
                    <th width="4%">Type</th>
                    <th width="8%">Bet placed</th>
                    <th width="8%">Stake</th>
                    <th width="8%">Avg. odds matched</th>
                    <th width="10%">Profit/Loss</th>
                </tr>
                {bethistory.length > 0 &&  bethistory.map((item,index)=>{
                let matchName = getMatchName(item.sportId);
                let runner;
                let odds;
                let profit='';
                let matchtype; 
                if(item.betType == 'fancy'){
                    runner = item.runnerName;
                    odds = item.rate+'/'+ parseFloat(item.teamName*100).toFixed(0);
                }
                else if(item.betType == 'match'){
                    odds = parseFloat(parseFloat(item.rate) + 1).toFixed(2);
                    if(item.teamName == 'A'){
                        runner = item.runnerName1;
                    }
                    else if(item.teamName == 'B'){
                        runner = item.runnerName2;
                    }
                    else if(item.teamName == 'T'){
                        runner = 'The Draw';
                    }
                }

                if(item.betType == 'fancy' && item.result){
                    if(item.type=="YES"){
                        if(parseFloat(item.rate) <= parseFloat(item.result)){
                            profit=parseFloat(item.amount*item.teamName).toFixed(2);
                        }
                        else profit=item.amount*(-1);
                    }
                    else{
                        if(parseFloat(item.rate)>parseFloat(item.result)){
                            profit=item.amount;
                        }
                        else profit=parseFloat((item.amount*item.teamName)*(-1)).toFixed(2);
                    }
                }
                else if(item.betType=='match' && item.winner){
                    if(item.type=="LAGAI"){
                        if(item.teamName=='A'){
                            if(item.winner=="A") profit=parseFloat(item.rate*item.amount).toFixed(2);
                            else profit=item.amount*(-1);
                        }
                        else if(item.teamName=="B"){
                            if(item.winner=="B") profit=parseFloat(item.rate*item.amount).toFixed(2);
                            else profit=item.amount*(-1);
                        }
                        else if(item.teamName=="T"){
                            if(item.winner=="T") profit=parseFloat(item.rate*item.amount).toFixed(2);
                            else profit=item.amount*(-1);
                        }
                    }
                    else if(item.type=="KHAI"){
                        if(item.teamName=='A'){
                            if(item.winner!="A") profit=item.amount;
                            else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
                        }
                        else if(item.teamName=="B"){
                            if(item.winner!="B") profit=item.amount;
                            else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
                        }
                        else if(item.teamName=="T"){
                            if(item.winner!="T") profit=item.amount;
                            else profit=parseFloat(item.rate*item.amount*-1).toFixed(2);
                        }
                    }

                    if((item.runnerId3== null  || item.runnerId3=='' || item.runnerId3==' ') && item.winner=="T"){
                        profit=0;
                    } 
                }

                if(item.type === 'LAGAI'){
                    matchtype = 'BACK';
                }
                else if(item.type === 'KHAI'){
                    matchtype = 'LAY';
                }
                else{
                    matchtype = item.type;
                }

                return(
                <tr key ={index} id="matchRow0" style={{display:'table-row'}}>
                <td className="align-L"><Link to="" id="betID" href="javascript: void(0);" className="expand-close" >{item.id}</Link></td>
                <td className="align-L" id="playerID">{item.clientId}</td>
                <td id="matchTitle" className="align-L">{matchName}<img className="fromto" src={Transparent}/><strong>{item.eventName}</strong><img className="fromto" src={Transparent}/>{item.betType == 'match' ? item.marketName : 'FANCY_BET'}</td>
                <td id="matchSelection">{runner}</td>
                <td><span id="matchType" className={`${item.type === 'LAGAI' || item.type === 'YES'? "back":"lay"}`}>{matchtype}</span></td>
                <td><span id="betPlaced" className="small-date">{item.betTime}</span></td>

                <td id="matchStake">{item.amount}</td>
                <td id="matchAvgOdds">{odds}</td>
                <td><span id="pol" className="small-date"><span className={`${profit >= 0 ? "green":"red"}`}>{profit >= 0 ? profit : '('+ Math.abs(profit) +')'}</span></span></td>
                <td id="userCancel" style={{display:'none'}}></td>
                </tr>
                )})}
                {bethistory.length===0 && <td colSpan={10} className="align-L">Sorry, there is no data to display.</td>}
                </tbody>
                </table>
            </div>}
        </div>
        </>
    )
}

export default BettingHistory