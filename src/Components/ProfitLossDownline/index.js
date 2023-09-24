import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link,NavLink } from 'react-router-dom';
// import '../../css/Login.css';
// import '../../css/Indibet.css';
// import '../../css/Fullmarket.css';
// import '../../css/Style.css';
import Header from '../Header';
import AgentPath from './AgentPath';
import { getAgentLevelInfo,getDownlineProfitLoss } from '../../Redux/action/Downline';
import IsLoadingHOC from '../IsLoadingHOC';
import AgentAccount from './AgentAccount';
import { toast } from "react-toastify";

const ProfitLossDownline = (props) => {
    const dispatch = useDispatch();
    let { isLoading, setLoading } = props;
    let {token,user,pl_agent_path} = useSelector(state=>state.auth);
    let [showLogs, setshowLogs] = useState(false);
    let [logType, setlogType] = useState('');
    let [selectedItem, setselectedItem] = useState({});
    const [agentList, setagentList] = useState([]);
    const [sportType, setsportType] = useState('ALL');
    const [option, setOption] = useState('default');
	const [sDate, setsDate] = useState(moment().format("YYYY-MM-DD"));
	const [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
	const [startDate, setStartDate] = useState(moment().toDate());
	const [endDate, setendDate] = useState(moment().add(1, 'days').toDate());
    var sum1 = 0, sum2 = 0, sum3 = 0;
    
    const dateConverter = (startDate, timeEnd) => {
        const newStartDate= new Date(startDate);
        const newEndDate=new Date(timeEnd);
        console.log("start", newStartDate);
        console.log("end", newEndDate);
        let result=moment(newStartDate).diff(newEndDate,'days')
        return result   }

    const getReport = (option)=>{
        dispatch({ type: "PL_AGENT_PATH_POP", payload:[user]});
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
        let dateDiff = dateConverter(end, start);
        if(dateDiff > 40){
            toast.info("You can only view previous 40 days data");
            return false;
        }
        setLoading(true);
        dispatch(getDownlineProfitLoss({sid:token,agentId:user.id,startDate:start,endDate:end,type:sportType})).then((response)=>{
            setLoading(false);
            setagentList(response);
        },(err)=>{
            console.log("getAccountDownlines err",err);
        });
    }

    const ShowRow = (position)=>{
        const newAgentList = agentList.map((agent,index) => {
            if (index === position) {
                return {...agent,show: (agent.show)?false:true};
            }
            else {
                return agent;
            }
        });
        setagentList(newAgentList);
    }

    const HandleAgentPath = (agentBasicInfo)=>{
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
        dispatch({ type: "PL_AGENT_PATH_PUSH", payload: agentBasicInfo });
        setLoading(true);
        dispatch(getDownlineProfitLoss({sid:token,agentId:agentBasicInfo.id,startDate:start,endDate:end,type:sportType})).then((response)=>{
            setLoading(false);
            setagentList(response);
        },(err)=>{
            console.log("getAccountDownlines err",err);
        });
    }
    var futureDate = new Date();
  return (
    <>
    <Header/>
    <div id="mainWrap" className="main_wrap">
        <h2>Profit/Loss Report by Downline</h2>
        <div className="function-wrap">
        <ul className="input-list">
        {user.level<2 && <li><label>Sports</label></li>}
        {user.level<2 && <li>
            <select id="func_sports"  onChange={(e)=>{setsportType(e.target.value)}}>
                <option value="ALL">All</option>
                <option value="sport">sports</option>
                <option value="casino">Casino</option>
                <option value="premium">Premium</option>
            </select>
        </li>}
        <li>
        <label>Time Zone</label>
        </li>
        <li>
        <select name="timezone" id="timezone">
            <option value="IST" selected="selected">IST(Bangalore / Bombay / New Delhi) (GMT+5:30)</option>
        </select>
        </li>
        <li></li>
        <li>
        <label>Period</label>
        </li>
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
            minDate={futureDate.setDate(futureDate.getDate() - 40)}
            maxDate={moment().toDate()}
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
        </ul>
        <ul className="input-list">
        <li><Link to="" id="today"  onClick = {()=>{getReport('today')}}  className="btn">Just For Today</Link>
        </li>
        <li><Link to="" id="yesterday"  onClick = {()=>{getReport('yesterday')}} className="btn">From Yesterday</Link>
        </li>
        <li><Link to="" id="getPL"  onClick = {()=>{getReport('default')}} className="btn-send">Get P & L</Link>
        </li>
        </ul>
        </div>
        {agentList.length>0 && <AgentPath setLoading={setLoading} sportType={sportType} sDate={sDate} eDate={eDate} option={option} setagentList={setagentList}/>}
        <div id="reportDiv" className="over-wrap" style={{ maxHeight: 'calc(100% - 32px - 93px - 55px)' }}>
            <table id="table_DL" className="table01 table-pt">
                <tbody>
                    <tr id="head">
                    <th id="header_userName" width="" className="align-L">UID</th>
                    <th width="10%" className="">Stake</th>
                    <th width="10%" className="">Player P/L</th>
                    <th id="header_profitLoss_downLine" width="10%" className="">Downline P/L</th>
                    <th id="header_payout_agent_1" width="10%" className="">Agent PT</th>
                    <th id="header_tax_agent_1" width="10%" className="">Agent Comm.</th>
                    <th id="header_rebate_agent_1" width="10%" className="">Agent Rebate</th>
                    <th id="header_profitLoss_agent_1" width="10%" className="">Agent Total</th>
                    <th width="10%" className="">Upline P/L</th>
                    </tr>
                </tbody>
                <tbody id="content">
                {agentList.length > 0 && agentList.map((item, index) => {
                    let agnetLevelInfo = {};
                    agnetLevelInfo = getAgentLevelInfo(item.level);
                    let agentBasicInfo ={id:item.agentId,level:agnetLevelInfo.level_no,balance:item.Balance,level_text:agnetLevelInfo.level_text,agent_level:agnetLevelInfo.agent_level};
                    let netPnl = item.netPL;
                    let dll = (item.dll)?parseFloat(item.dll):0;
                    netPnl = parseFloat(netPnl) * (-1);
                    sum1 = sum1 + parseFloat(netPnl);
                    sum3 = sum3 + dll;
                    return (
                    <>
                    <tr key={index} id="main_ptt2020_1">
                    <td className="align-L" >
                        {item.sports && <Link to="" onClick={()=>{ShowRow(index)}} id="_bySport" className="expand-close">{item.show?'-':'+'}</Link>}
                        {item.level<6 && <Link to="" onClick={()=>(item.level<6)?HandleAgentPath(agentBasicInfo):''} id="_userName" className="ico_account"><span className={`lv_${(item.level<6)?item.level:0}`}>{agnetLevelInfo.level_text}</span>{item.agentId}</Link>}
                        {item.level==6 && <Link to="" onClick={()=>{setlogType('AgentAccount');setshowLogs(true);setselectedItem(item);dispatch({ type: "PL_AGENT_PATH_PUSH", payload: agentBasicInfo });}} id="_userName" className="ico_account"><span className={`lv_${(item.level<6)?item.level:0}`}>{agnetLevelInfo.level_text}</span>{item.agentId}</Link>}
                    </td>
                    <td id="_stake">0.00</td>
                    <td id="_profitLoss" ><span style={(netPnl >= 0) ? { color: 'green' } : { color: 'red' }}>{(netPnl >= 0) ? parseFloat(Math.abs(netPnl)).toFixed(2) : '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')'}</span></td>
                    <td id="_profitLossDownLine"><span style={(netPnl >= 0) ? { color: 'green' } : { color: 'red' }}>{(netPnl >= 0) ? parseFloat(Math.abs(netPnl)).toFixed(2) : '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')'}</span></td>
                    <td id="_payout1"> 0.00</td>
                    <td id="_tax1">{(dll).toFixed(2)}</td>
                    <td id="_rebate1"> 0.00</td>
                    <td id="_profitLoss1"> 0.00</td>
                    <td id="_profitLossUpLine" style={(netPnl >= 0) ? { color: 'red' } : { color: 'green' }}>{(netPnl >= 0) ? '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')' : parseFloat(Math.abs(netPnl)).toFixed(2)}</td>
                    </tr>
                    {item.sports && item.sports.map((item_1,index_1)=>{
                        let netPnl = item_1.netPL;
                        let dll = parseFloat(item_1.dll);
                        netPnl = parseFloat(netPnl) * (-1);
                        return(
                            <tr style={{display:`${item.show?'':'none'}`}} key={index_1} className="sports-list">
                            <td>{item_1.title}</td>
                            <td id="_stake">0.00</td>
                            <td id="_profitLoss" ><span style={(netPnl >= 0) ? { color: 'green' } : { color: 'red' }}>{(netPnl >= 0) ? parseFloat(Math.abs(netPnl)).toFixed(2) : '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')'}</span></td>
                            <td id="_profitLossDownLine"><span style={(netPnl >= 0) ? { color: 'green' } : { color: 'red' }}>{(netPnl >= 0) ? parseFloat(Math.abs(netPnl)).toFixed(2) : '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')'}</span></td>
                            <td id="_payout1"> 0.00</td>
                            <td id="_tax1">{(dll).toFixed(2)}</td>
                            <td id="_rebate1"> 0.00</td>
                            <td id="_profitLoss1"> 0.00</td>
                            <td id="_profitLossUpLine" style={(netPnl >= 0) ? { color: 'red' } : { color: 'green' }}>{(netPnl >= 0) ? '(' + parseFloat(Math.abs(netPnl)).toFixed(2) + ')' : parseFloat(Math.abs(netPnl)).toFixed(2)}</td>
                            </tr>
                        )
                    })}
                    </>
                    )
                })}
                {agentList.length > 0 && <tr id="tempTotalTr" className="total">
                    <td className="align-L">Total</td>
                    <td id="_totalStake"> 0.00</td>
                    <td id="_totalProfitLoss" style={{ backgroundColor: "rgb(223, 223, 223)" }}><span style={(sum1 >= 0) ? { color: 'green' } : { color: 'red' }}>{sum1 >= 0 ? parseFloat(Math.abs(sum1)).toFixed(2) : '(' + parseFloat(Math.abs(sum1)).toFixed(2) + ')'}</span></td>
                    <td id="_totalProfitLossDownLine"><span style={(sum1 >= 0) ? { color: 'green' } : { color: 'red' }}>{sum1 >= 0 ? parseFloat(Math.abs(sum1)).toFixed(2) : '(' + parseFloat(Math.abs(sum1)).toFixed(2) + ')'}</span></td>
                    <td id="_totalPayout1" style={{ backgroundColor: "rgb(223, 223, 223)" }}> 0.00</td>
                    <td id="_totalTax1">{sum3.toFixed(2)}</td>
                    <td id="_totalRebate1" style={{ backgroundColor: "rgb(223, 223, 223)" }}> 0.00</td>
                    <td id="_totalProfitLoss1"> 0.00</td>
                    <td id="_totalProfitLossUpLine" className="odd" style={(sum1 >= 0) ? { color: 'red' } : { color: 'green' }}>{sum1 >= 0 ? '(' + parseFloat(Math.abs(sum1)).toFixed(2) + ')' : parseFloat(Math.abs(sum1)).toFixed(2)}</td>
                </tr>}
                {agentList.length===0 && <tr className="total"><td colSpan={9}  className="align-L">Sorry, there is no data to display.</td></tr>}
                </tbody>
            </table>
        </div>
    </div>
    {(logType==='AgentAccount' && showLogs)  && <AgentAccount setLoading={setLoading} selectedItem={selectedItem} setshowLogs={setshowLogs}/>}
    </>
  )
}

export default IsLoadingHOC(ProfitLossDownline)