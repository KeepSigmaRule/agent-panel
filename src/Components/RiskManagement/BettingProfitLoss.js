import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { useSelector,useDispatch } from 'react-redux';
import { getClientProfitLoss,getClientCasinoProfitLoss } from '../../Redux/action/Account';
import { getMatchName } from '../../Redux/action/BetList';
import Pagination from '../Pagination';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const BettingProfitLoss = (props) => {
    const dispatch = useDispatch();
    let {token} = useSelector(state=>state.auth);
    let [select,setselect] = useState(0);  
    let [profitLoss,setprofitLoss] = useState([]);  
    let [casinoPL, setcasinoPL] = useState([])
    let [netpl, setnetpl] = useState(0);
    let [casinonetpl, setcasinonetpl] = useState(0);
    let [eventType,seteventType] = useState("0");
    let [option, setOption] = useState('default');
    let [sDate, setsDate] = useState(moment().format("YYYY-MM-DD"));
    let [eDate, seteDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));
    let [startDate, setStartDate] = useState(moment().toDate());
    let [endDate, setendDate] = useState(moment().add(1, 'days').toDate());
    let {selectedItem,setLoading} = props;

    const getProfitLoss = (option)=>{
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
        //(setLoading)?setLoading(true):'';
        switch(select){
          case 0:{
              dispatch(getClientProfitLoss({sid:token,clientId:selectedItem.clientId,startDate:start,endDate:end,view:1,eventType:eventType})).then((response)=>{
                //(setLoading)?setLoading(false):'';
                setprofitLoss(response);
                if(response.length>0){
                  setnetpl(response.reduce((a,v) =>  a = parseFloat(a) + parseFloat(v.pl), 0));
                }
              },(err)=>{
                //(setLoading)?setLoading(false):'';
                  toast.danger(err);
              });
          } break;
          case 1:{
              dispatch(getClientCasinoProfitLoss({id:selectedItem.clientId,startDate:sDate,endDate:eDate})).then((response)=>{
                //setLoading(false);
                setcasinoPL(response);
                if(response.length>0){
                  setcasinonetpl(response.reduce((a,v) =>  a = a + parseFloat(v.netPL), 0));
                }
            },(err)=>{
                //setLoading(false);
                toast.danger(err);
            });
          } break;
        }
    }

  return (
  <>
    <ul className="report-tab-wrap" >
                <li onClick={() => { setselect(0) }} className={`report-tab ${(select === 0) ? "select" : "null"}`} id="reportType_exchange">
                    Exchange
                </li>
                <li onClick={() => { setselect(1) }} className={`report-tab ${(select === 1) ? "select" : "null"}`} id="reportType_casino">
                    Casino
                </li>
                <li onClick={() => { setselect(2) }} className={`report-tab ${(select === 2) ? "select" : "null"}`} id="reportType_sportsBook">
                    Sportsbook
                </li>
                <li onClick={() => { setselect(3) }} className={`report-tab ${(select === 3) ? "select" : "null"}`} id="reportType_bookMaker">
                    BookMaker
                </li>
                <li onClick={() => { setselect(4) }} className={`report-tab ${(select === 4) ? "select" : "null"}`} id="reportType_bPoker" >
                    BPoker
                </li>
                <li onClick={() => { setselect(5) }} className={`report-tab ${(select === 5) ? "select" : "null"}`} id="reportType_binary" >
                    Binary
                </li>
            </ul>
            <div className="function-wrap">
      <ul className="input-list">
      <li style={{ lineHeight: '48px' }}><label>Period</label></li>
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
      </ul>
      <ul className="input-list ud-line">
      <li><Link to="" id="today"  onClick = {()=>{getProfitLoss('today')}} className="btn">Just For Today</Link></li>
      <li><Link to="" id="yesterday" onClick = {()=>{getProfitLoss('yesterday')}} className="btn">From Yesterday</Link></li>
      <li><Link to="" id="getPL"  className="btn-send" onClick = {()=>{getProfitLoss('default')}}>Get P & L</Link></li>
      </ul>
      </div>
        <div id="noReportMessage"><p>Betting Profit & Loss enables you to review the bets you have placed. <br />
        Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
        <p>Betting Profit &amp; Loss is available online for the past 2 months.</p></div>
        {select === 0 && <div id="report" data-report="profitAndLossReport">
      <ul id="spotsUl" className="total-show">
      <li id="totalPL">Total P/L: PBU {netpl}</li>
      <li id="sumOfQuery" className="sports-switch">PBU {netpl}</li>
      <li className="sports-switch">
      <select name="sports" id="sportsevent" onChange={(e)=>{seteventType(e.target.value);}}>
      <option value="0" selected="selected">ALL</option>
      <option value="1">SOCCER</option>
      <option value="2">TENNIS</option>
      <option value="4">CRICKET</option>
      </select>
      </li>
      </ul>
      <table id="reportTable" className="table01 table-pnl" style={{ display: 'table' }}>
      <tbody>
      <tr>
      <th width="" className="align-L">Market</th>
      <th width="15%">Start Time</th>
      <th width="15%">Settled date</th>
      <th width="18%">Profit/Loss</th>
      </tr>
      {profitLoss.length > 0 && profitLoss.map((item, index) => {
      let matchName = getMatchName(item.eventType);
      return (
        <tr key={index} id="summary0" style={{ display: 'table-row' }} >
        <td id="title" className="align-L">{matchName}<img className="fromto" src={Transparent} /><strong>{item.eventName}</strong></td>
        <td id="startTime">{item.startTime}</td>
        <td id="settledDate">{item.settledDate}</td>
        <td>
        {parseFloat(item.pl).toFixed(2)}
        </td>
        </tr>
      )
      })}
      {profitLoss.length===0 && <tr><td colSpan={3} className="align-L">Sorry, there is no data to display.</td></tr>}
      </tbody>
    </table>
    <p className="table-other">Profit and Loss is shown net of commission.</p>
    </div>}

  {select === 1 && <div id="report" data-report="profitAndLossReport">
  <ul id="spotsUl" class="total-show">
  <li id="totalPL">Total P/L: USD <span className={`${casinonetpl >= 0 ? "":"red"}`}>{casinonetpl >= 0 ? parseFloat(casinonetpl).toFixed(2) : '('+ Math.abs(casinonetpl).toFixed(2) +')'}</span></li>
  <li id="sumOfQuery" class="sports-switch">USD  <span className={`${casinonetpl >= 0 ? "":"red"}`}>{casinonetpl >= 0 ? parseFloat(casinonetpl).toFixed(2) : '('+ Math.abs(casinonetpl).toFixed(2) +')'}</span></li>
  </ul>
    <table id="reportTable" class="table01 table-pnl" style={{display:'table'}}>
      <tbody>
        <tr>
          <th width="" class="align-L">Date</th>
          <th width="18%">Profit/Loss</th>
        </tr>	
        {casinoPL.length > 0 &&  casinoPL.map((item,index) =>{
          return( 	
            <tr key = {index} id="summary0" style={{display: 'table-row'}} >
              <td class="align-L">
                Casino<img className="fromto" src={Transparent} /><strong>LIVE</strong><img className="fromto" src={Transparent} />{item.currTime}
              </td>	
              <td>
              <span className={`${item.netPL >= 0 ? "":"red"}`}>{item.netPL >= 0 ? parseFloat(item.netPL).toFixed(2) : '('+ Math.abs(item.netPL).toFixed(2) +')'}</span>
              </td>
            </tr>
        )})}
        {casinoPL.length===0 && <tr><td colSpan={2} className="align-L">Sorry, there is no data to display.</td></tr>}
      </tbody>
    </table>
  </div>}
  </>
  )
}

export default BettingProfitLoss