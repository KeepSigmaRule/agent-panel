import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
// import '../../css/Login.css';
// import '../../css/Indibet.css';
// import '../../css/Fullmarket.css';
// import '../../css/Style.css';
import Header from '../Header';
import IsLoadingHOC from '../IsLoadingHOC';
import { getAgentLevelInfo,getMarketProfitLoss } from '../../Redux/action/Downline';
import { getMatchName } from '../../Redux/action/BetList';
import Pagination from '../Pagination';
import { toast } from "react-toastify";

const ProfitLossMarket = (props) => {
    const dispatch = useDispatch();
    let {token,user} = useSelector(state=>state.auth);
    let { isLoading, setLoading } = props;
    const [agentList, setagentList] = useState([]);
    const [sport, setSport] = useState('100');
    const [option, setOption] = useState('default');
	const [sDate, setsDate] = useState(moment().format("YYYY-MM-DD"));
	const [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
	const [startDate, setStartDate] = useState(moment().toDate());
	const [endDate, setendDate] = useState(moment().add(1, 'days').toDate());
    
    let [totalStake, settotalStake] = useState(0);
    let [totalSessiom_PL, settotalSessiom_PL] = useState(0);
    let [totalSS_Comm, settotalSS_Comm] = useState(0);
    let [totalSS_Rebate, settotalSS_Rebate] = useState(0);
    let [totalSS_Total, settotalSS_Total] = useState(0);
    let [totalPlayer_PL, settotalPlayer_PL] = useState(0);
    let [totalDownline_PL, settotalDownline_PL] = useState(0);
    let [totalUpline_PL, settotalUpline_PL] = useState(0);
    
    let [itemsBucket,setitemsBucket] = useState([]);
    let [items,setItems] = useState([]);
    let [totelCount,settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const calculateTotal=(items)=>{
        settotalStake(items.reduce((a,v) =>  a = a + v.comm, 0));
        settotalPlayer_PL(items.reduce((a,v) =>  a = a + v.netPL , 0 ));
        settotalDownline_PL(items.reduce((a,v) =>  a = a + v.netPL , 0 ));

        settotalSessiom_PL(items.reduce((a,v) =>  a = a + v.sessionPL , 0 ));
        settotalSS_Comm(items.reduce((a,v) =>  a = a + v.comm , 0 ));
        settotalSS_Rebate(items.reduce((a,v) =>  a = a + v.comm , 0 ));
        settotalSS_Total(items.reduce((a,v) =>  a = a + v.comm , 0 ));
        
        settotalUpline_PL(items.reduce((a,v) =>  a = a + v.netPL*-1 , 0 ));
    }
    
    const dateConverter = (startDate, timeEnd) => {
        const newStartDate= new Date(startDate);
        const newEndDate=new Date(timeEnd);
        console.log("start", newStartDate);
        console.log("end", newEndDate);
        let result=moment(newStartDate).diff(newEndDate,'days')
        return result   }

    const getReport = (option)=>{
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
            toast.info("You can only view previous 40 day data");
            return false;
        }
        setLoading(true);
        dispatch(getMarketProfitLoss({sid:token,agentId:user.id,startDate:start,endDate:end,sportType:sport})).then((response)=>{
            setLoading(false);
            setagentList(response);
            calculateTotal(response);
            setitemsBucket(response);
            settotelCount(response.length);
            console.log("response.length",response.length);
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
    var futureDate = new Date();
  return (
    <>
    <Header/>
    <div id="mainWrap" className="main_wrap">
        <h2>Profit/Loss Report by Market</h2>
        <div className="function-wrap">
        <ul className="input-list boxsetting">
        {user.level<2 && <li><label>Sports</label></li>}
        {user.level<2 && <li>
        <select id="func_sports" onChange={(e)=>{setSport(e.target.value)}}>
            <option value="100">All</option>   
            <option value="4">CRICKET</option>     
            <option value="1">SOCCER</option>      
            <option value="2">TENNIS</option>
            <option value="5">BINARY</option>
            <option value="6">POLITICS</option>           
        </select>
        </li>}
        <li>
        <label>Time Zone</label>
        </li>
        <li>
        <select name="timezone" id="timezone" defaultValue='IST'>
            <option value="IST" >IST(Bangalore / Bombay / New Delhi) (GMT+5:30)</option>
        </select>
        </li>
        <li></li>
        <li>
        <label>Period</label>
        </li>
        <ul className="input-list boxsetting" style={{ display: 'inline-flex',marginTop:'-10px'}}>
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
        <input id="startTime" disabled={true} className="time-input disable" type="text" placeholder="09:00" maxLength="5" />
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
        <input id="endTime" disabled={true} className="time-input disable" type="text" placeholder="08:59" maxLength="5" />
        </ul>
        </ul>
        <ul className="input-list boxsetting">
        <li><Link to="" id="today"  onClick = {()=>{getReport('today')}}  className="btn">Just For Today</Link>
        </li>
        <li><Link to="" id="yesterday"  onClick = {()=>{getReport('yesterday')}} className="btn">From Yesterday</Link>
        </li>
        <li><Link to="" id="getPL"  onClick = {()=>{getReport('defaut')}} className="btn-send">Get P & L</Link>
        </li>
        </ul>
        </div>
        
        <div id="reportDiv" className="over-wrap" style={{ maxHeight: 'calc(100% - 32px - 93px - 55px)' }}>
            <table id="table_DL" className="table01 table-pt">
                <tbody>
                    <tr id="head">
                    <th id="header_userName" width="" className="align-L">UID</th>
                    <th width="10%" className="">Stake</th>
                    <th width="10%" className="">Player P/L</th>
                    <th id="header_profitLoss_downLine" width="10%" className="">Downline P/L</th>
                    <th id="header_payout_agent_1" width="10%" className="">SS PT</th>
                    <th id="header_tax_agent_1" width="10%" className="">SS Comm.</th>
                    <th id="header_rebate_agent_1" width="10%" className="">SS Rebate</th>
                    <th id="header_profitLoss_agent_1" width="10%" className="">SS Total</th>
                    <th width="10%" className="">Upline P/L</th>
                    </tr>
                </tbody>
                <tbody id="content">
                {items.length > 0 && items.map((item, index) => {
                    let matchName = getMatchName(item.eventType);
                    let stake = item.comm;
                    let player_pl = item.netPL;
                    let downline_pl = item.netPL;
                    let ss_pl = item.sessionPL;
                    let ss_comm = item.comm;
                    let ss_rebate = item.comm;
                    let ss_total = item.comm;
                    let upline_pl = (item.netPL*-1);
                    return (
                    <tr key={index} id="main_ptt2020_1">
                    <td className="align-L" >
                        <Link to="" id="_byMarket" className="expand-close"></Link>
                        <Link to=""><span id="_eventType">{matchName}</span>
                        <img className="fromto" src={Transparent}/>
                        <strong id="_eventName">{item.eventName}</strong>
                        </Link>
                    </td>
                    <td id="_stake" className={`${(stake>=0)?'':'red'}`}>{(stake>=0)?parseFloat(stake).toFixed(2):`(${parseFloat(Math.abs(stake)).toFixed(2)})`}</td>
                    <td id="_player_pl" className={`${(player_pl>=0)?'':'red'}`}><span>{(player_pl>=0)?parseFloat(player_pl).toFixed(2):`(${parseFloat(Math.abs(player_pl)).toFixed(2)})`}</span></td>
                    <td id="_downline_pl" className={`${(downline_pl>=0)?'':'red'}`}><span>{(downline_pl>=0)?parseFloat(downline_pl).toFixed(2):`(${parseFloat(Math.abs(downline_pl)).toFixed(2)})`}</span></td>
                    <td id="_sessionPL" className={`${(ss_pl>=0)?'':'red'}`}>{(ss_pl>=0)?parseFloat(ss_pl).toFixed(2):`(${parseFloat(Math.abs(ss_pl)).toFixed(2)})`}</td>
                    <td id="_ss_comm" className={`${(ss_comm>=0)?'':'red'}`}>{(ss_comm>=0)?parseFloat(ss_comm).toFixed(2):`(${parseFloat(Math.abs(ss_comm)).toFixed(2)})`}</td>
                    <td id="_ss_rebate" className={`${(ss_rebate>=0)?'':'red'}`}>{(ss_rebate>=0)?parseFloat(ss_rebate).toFixed(2):`(${parseFloat(Math.abs(ss_rebate)).toFixed(2)})`}</td>
                    <td id="_ss_total"className={`${(ss_total>=0)?'':'red'}`}>{(ss_total>=0)?parseFloat(ss_total).toFixed(2):`(${parseFloat(Math.abs(ss_total)).toFixed(2)})`}</td>
                    <td id="_upline_pl" className={`${(upline_pl>=0)?'':'red'}`}>{(upline_pl>=0)?parseFloat(upline_pl).toFixed(2):`(${parseFloat(Math.abs(upline_pl)).toFixed(2)})`}</td>
                    </tr>
                    )
                })}
                {items.length > 0 && <tr id="tempTotalTr" className="total">
                    <td className="align-L">Total</td>
                    <td id="_totalStake">{(totalStake>=0)?parseFloat(totalStake).toFixed(2):`(${parseFloat(Math.abs(totalStake)).toFixed(2)})`}</td>
                    <td id="_totalProfitLoss"><span>{(totalPlayer_PL>=0)?parseFloat(totalPlayer_PL).toFixed(2):`(${parseFloat(Math.abs(totalPlayer_PL)).toFixed(2)})`}</span></td>
                    <td id="_totalProfitLossDownLine"><span>{(totalDownline_PL>=0)?parseFloat(totalDownline_PL).toFixed(2):`(${parseFloat(Math.abs(totalDownline_PL)).toFixed(2)})`}</span></td>
                    <td id="_totalPayout1">{(totalSessiom_PL>=0)?parseFloat(totalSessiom_PL).toFixed(2):`(${parseFloat(Math.abs(totalSessiom_PL)).toFixed(2)})`}</td>
                    <td id="_totalTax1">{(totalSS_Comm>=0)?parseFloat(totalSS_Comm).toFixed(2):`(${parseFloat(Math.abs(totalSS_Comm)).toFixed(2)})`}</td>
                    <td id="_totalRebate1">{(totalSS_Rebate>=0)?parseFloat(totalSS_Rebate).toFixed(2):`(${parseFloat(Math.abs(totalSS_Rebate)).toFixed(2)})`}</td>
                    <td id="_totalProfitLoss1">{(totalSS_Total>=0)?parseFloat(totalSS_Total).toFixed(2):`(${parseFloat(Math.abs(totalSS_Total)).toFixed(2)})`}</td>
                    <td id="_totalProfitLossUpLine">{(totalUpline_PL>=0)?parseFloat(totalUpline_PL).toFixed(2):`(${parseFloat(Math.abs(totalUpline_PL)).toFixed(2)})`}</td>
                </tr>}
                {items.length === 0 && <tr className="total">
                    <td colSpan={9} className="align-L">Sorry, there is no data to display.</td>
                </tr>}
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
        </div>
    </div>
    </>
  )
}

export default IsLoadingHOC(ProfitLossMarket)