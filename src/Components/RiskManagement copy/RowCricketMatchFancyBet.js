import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { decrypteData } from '../../Redux/action/Auth';
import $ from 'jquery';

const RowCricketMatchFancyBet = (props) => {
  const io = require('socket.io-client');
  const ranNum = Math.floor(Math.random() * 4) + 1;
  var ENDPOINT = "https://millionbet247.com:2096";
  // if(ranNum == 1){
  //   ENDPOINT = "https://betplace247.com:2053";
  // }
  // else if(ranNum == 2){
  //   ENDPOINT = "https://betplace247.com:2083"; 
  // }
  // else if(ranNum == 3){
  //   ENDPOINT = "https://betplace247.com:2087";
  // }
  // else{
  //   ENDPOINT = "https://betplace247.com:2096";
  // }
  let {eventDate,subItem,winnAmount,minAmount,maxAmount,setshowLogs,setlogType,setselectedItem} = props;
  let eventid = subItem.event_id;
  let selectionid = subItem.selection_id;
  let messageType = "session_rate";
  let selection_name = "17.1 Ball Run LSG";
  let runners = subItem.event_name.split(' v ');
  let socket;
  //console.log("subItem",subItem);
  let [gameStatus,setgameStatus] = useState('');
  let [runnerName,setrunnerName] = useState('');
  let [layPrice,setlayPrice] = useState(0);
  let [backPrice,setbackPrice] = useState(0);
  let [laySize,setlaySize] = useState(0);
  let [backSize,setbackSize] = useState(0);   
  let [minStack ,setminStack] = useState(0); 
  let [maxStack ,setmaxStack ] = useState(0);    
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect', function (data) {
        console.log('socket connected');
        socket.emit('room1', eventid);
    });
    return () => {
        socket.close();
        console.log('socket disconnected');
    }
  }, [])

  useEffect(() => {
    socket.on(eventid, (val) => {
      var value = JSON.parse(val);
      // 
      if(Array.isArray(value)){
          for(const item of value) {
            if(item.messageType==="session_rate"){
              let timestamp = decrypteData(item.TimeST);
              if(moment(timestamp.messageST).format('YYYYMMDDHms') > moment().subtract(5, 'seconds').format("YYYYMMDDHms")){
                if(item.eventId==eventid && item.selectionId==selectionid){
                  setgameStatus(item.gameStatus);
                  setrunnerName(item.runnerName);
                  setlayPrice(item.layPrice);
                  setbackPrice(item.backPrice);
                  setlaySize(item.laySize);
                  setbackSize(item.backSize);   
                  setminStack(item.minStack); 
                  setmaxStack(item.maxStack);  
                }
              }
            }
          }
      }
      else{
        //console.log("not");
      }
      // if(value.messageType === "session_rate"){
        
        
      // }
    });
    return () => {
      socket.close();
      console.log(`socket eventid:${eventid} disconnected`);
  }
}, [])
  
  const displayNextRow = (e,random) => {
    e.preventDefault();
    $(".iframe-table-design").slideUp();
    $("#expand-showOddsBtn-"+random).toggle();
    console.log("#expand-showOddsBtn-"+random);
  }
  let random = 1;
  return (
    <React.Fragment>
      <tr className="border-t">
          <td className="align-L" rowSpan="1" ><Link to=""  >Cricket</Link></td>
          <td className="align-L border-l" rowSpan="1" >{eventDate}</td>
          <td className="align-L border-l">
              <Link to=""  onClick={(e)=>{displayNextRow(e,subItem.selection_id)}} className="btn open-odds" >Open</Link> 
              <Link to=""  > 
                  <strong id="eventName">{subItem.event_name}</strong> 
                  <img className="fromto" src="images/refresh2.png" /> 
                  <span id="marketName">{subItem.selection_name}</span> 
              </Link>
          </td>
          <td className="border-l">
              <Link to="" className={`${(parseFloat(winnAmount.min).toFixed(2) < 0)?'red':''}`}>
                  <span>{minAmount}</span>
              </Link>
          </td>
          <td className="border-l">
              <Link to="" className={`${(parseFloat(winnAmount.max).toFixed(2) < 0)?'red':''}`}>
                  <span>{maxAmount}</span>
              </Link>
          </td>
          <td className="border-l">
              <span data-bs-toggle="modal" data-bs-target="#exampleModal5" style={{outline:'none'}}>
                  <Link to=""  onClick={(e)=>{e.preventDefault(); setlogType('FancyBooking');setshowLogs(true);setselectedItem(subItem);}} className="btn-book">Books</Link>
              </span>
          </td>
      </tr>
      <tr id={`expand-showOddsBtn-${subItem.selection_id}`}  className="expand iframe-table-design iframe-fance-bet" style={{display:'none'}}>
          <td className="border-l align-L" colSpan="5">
            <img className="expand-arrow" src="images/transparent.gif" />
            <div className="for-agent">
              <div className="bets-wrap fancy_bet">
                <div className="fancy-head">
                  <h4><span>Fancy Bet</span></h4>
                </div>
                <table  className="bets">
                  {/* <colgroup>
                  <col span="1" width="280">
                  <col span="1" width="70">
                  <col span="1" width="70">
                  <col span="1" width="70">
                  <col span="1" width="70">
                  <col span="1" width="70">
                  <col span="1" width="70">
                  </colgroup> */}
                  <tbody>
                    <tr className="bet-all">
                      <th></th>
                      <td colSpan="2"></td>
                      <td>No</td>
                      <td>Yes</td>
                      <td className="refer-book" colSpan="2"></td>
                    </tr>
                  </tbody>
                  <tbody >
                    <tr >
                      <th colSpan="3"> <dl className="fancy-th-layout">
                          <dt>
                            <p >{runnerName}</p>
                          </dt>
                        </dl>
                      </th>
                      <td colSpan="2" className="multi_select" ><ul>
                          <li className="lay-1 spark" > <a >{layPrice}<span>{laySize}</span></a> </li>
                          <li className="back-1 spark" > <a >{backPrice}<span>{backSize}</span></a> </li>
                        </ul></td>
                      <td className="td-fancy_merge" colSpan="2"><dl className="fancy-info">
                          <dt>Min/Max</dt>
                          <dd > {minStack} /  {maxStack}</dd>
                        </dl></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div> </div>
            </div>
            </td>
            <td width="80" className="border-l"></td>
        </tr>
    </React.Fragment>
  )
}

export default RowCricketMatchFancyBet