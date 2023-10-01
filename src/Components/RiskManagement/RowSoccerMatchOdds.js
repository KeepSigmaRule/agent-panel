import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { decrypteData } from '../../Redux/action/Auth';
import $ from 'jquery';
// import './RiskManagement.css';
const RowCricketMatchOdds = (props) => {
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
  let {eventDate,subItem,teamA_total,teamB_total,draw_total,setshowLogs,setlogType,setselectedItem} = props;
  let eventid = subItem.event_id;
  let runners = subItem.event_name.split(' v ');
  let socket;
  //console.log("subItem",subItem);
  let c1 = 0,c2 =0,c3 = 0, c4 = 0, c5 = 0, c6 = 0,c7 = 0, c8 = 0, c9 = 0, c10 = 0, c11 = 0, c12 = 0,c13 = 0,c14 = 0,c15 = 0,c16 = 0,c17 = 0,c18 = 0;
  let s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27,s28,s29,s30,s31,s32,s33,s34,s35,s36;
  let [marketBetStatus,setmarketBetStatus] = useState(0);
  let [runner1BackRate3,setrunner1BackRate3] = useState(' ');
  let [runner1BackRate2,setrunner1BackRate2] = useState(' ');
  let [runner1BackRate1,setrunner1BackRate1] = useState(' ');
  let [runner1LayRate1,setrunner1LayRate1] = useState(' ');
  let [runner1LayRate2,setrunner1LayRate2] = useState(' ');
  let [runner1LayRate3,setrunner1LayRate3] = useState(' ');
  let [runner1BackSize3,setrunner1BackSize3] = useState(' ');
  let [runner1BackSize2,setrunner1BackSize2] = useState(' ');
  let [runner1BackSize1,setrunner1BackSize1] = useState(' ');
  let [runner1LaySize1,setrunner1LaySize1] = useState(' ');
  let [runner1LaySize2,setrunner1LaySize2] = useState(' ');
  let [runner1LaySize3,setrunner1LaySize3] = useState(' ');

  let [runner2BackRate1,setrunner2BackRate1] = useState(' ');
  let [runner2BackRate2,setrunner2BackRate2] = useState(' ');
  let [runner2BackRate3,setrunner2BackRate3] = useState(' ');
  let [runner2BackSize1,setrunner2BackSize1] = useState(' ');
  let [runner2BackSize2,setrunner2BackSize2] = useState(' ');
  let [runner2BackSize3,setrunner2BackSize3] = useState(' ');
  let [runner2LayRate1,setrunner2LayRate1] = useState(' ');
  let [runner2LayRate2,setrunner2LayRate2] = useState(' ');
  let [runner2LayRate3,setrunner2LayRate3] = useState(' ');
  let [runner2LaySize1,setrunner2LaySize1] = useState(' ');
  let [runner2LaySize2,setrunner2LaySize2] = useState(' ');
  let [runner2LaySize3,setrunner2LaySize3] = useState(' ');

  let [tieBackRate1,settieBackRate1] = useState(' ');
  let [tieBackRate2,settieBackRate2] = useState(' ');
  let [tieBackRate3,settieBackRate3] = useState(' ');
  let [tieBackSize1,settieBackSize1] = useState(' ');
  let [tieBackSize2,settieBackSize2] = useState(' ');
  let [tieBackSize3,settieBackSize3] = useState(' ');
  let [tieLayRate1,settieLayRate1] = useState(' ');
  let [tieLayRate2,settieLayRate2] = useState(' ');
  let [tieLayRate3,settieLayRate3] = useState(' ');
  let [tieLaySize1,settieLaySize1] = useState(' ');
  let [tieLaySize2,settieLaySize2] = useState(' ');
  let [tieLaySize3,settieLaySize3] = useState(' ');
       
  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("ENDPOINT",ENDPOINT);
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
      if(value.messageType === 'betfair_match_rate'){
        let timestamp = decrypteData(value.TimeST);
        if(moment(timestamp.messageST).format('YYYYMMDDHms') > moment().subtract(5, 'seconds').format("YYYYMMDDHms")){
          if(s1 !== value.runner1BackRate1  ){
            setrunner1BackRate1(value.runner1BackRate1);
            s1 = value.runner1BackRate1;
            c1 = 1;
            setTimeout(()=>{c1 = 0;},  700);
          }
          if(s2 !== value.runner1BackRate2  ){
            setrunner1BackRate2(value.runner1BackRate2);
            s2 = value.runner1BackRate2;
            c2 = 1;
            setTimeout(()=>{c2 = 0;},  700);
          }
          if(s3 !== value.runner1BackRate3  ){
            setrunner1BackRate3(value.runner1BackRate3);
            c3 = 1;
            s3 = value.runner1BackRate3;
            setTimeout(()=>{c3 = 0;},  700);
          }
          if(s4 !== value.runner1BackSize1  ){
            setrunner1BackSize1(value.runner1BackSize1);
            s4 = value.runner1BackSize1;
          }
          if(s5 !== value.runner1BackSize2  ){    
            setrunner1BackSize2(value.runner1BackSize2);
            s5 = value.runner1BackSize2;
          }
          if(s6 !== value.runner1BackSize3  ){ 
            setrunner1BackSize3(value.runner1BackSize3);
            s6 = value.runner1BackSize3;
          }
          if(s7 !== value.runner1LayRate1  ){      
            setrunner1LayRate1(value.runner1LayRate1);
            s7 = value.runner1LayRate1;
            c4 = 1;
            setTimeout(()=>{c4 = 0;},  700);
          }
          if(s8 !== value.runner1LayRate2  ){ 
            setrunner1LayRate2(value.runner1LayRate2);
            s8 = value.runner1LayRate2;
            c5 = 1;
            setTimeout(()=>{c5 = 0;},  700);
          }
          if(s9 !== value.runner1LayRate3  ){     
            setrunner1LayRate3(value.runner1LayRate3);
            s9 = value.runner1LayRate3;
            c6 = 1;
            setTimeout(()=>{c6 = 0;},  700);
          }
          if(s10 !== value.runner1LaySize1  ){        
            setrunner1LaySize1(value.runner1LaySize1);
            s10 = value.runner1LaySize1;
          }
          if(s11 !== value.runner1LaySize2  ){           
            setrunner1LaySize2(value.runner1LaySize2);
            s11 = value.runner1LaySize2;
          }
          if(s12 !== value.runner1LaySize3  ){      
            setrunner1LaySize3(value.runner1LaySize3);
            s12 = value.runner1LaySize3;
          }
          if(s13 !== value.runner2BackRate1  ){ 
            setrunner2BackRate1(value.runner2BackRate1);
            s13 = value.runner2BackRate1;
            c7 = 1;
            setTimeout(()=>{c7 = 0;},  700);
          }
          if(s14 !== value.runner2BackRate2  ){ 
            setrunner2BackRate2(value.runner2BackRate2);
            s14 = value.runner2BackRate2;
            c8 = 1;
            setTimeout(()=>{c8 = 0;},  700);
          }
          if(s15 !== value.runner2BackRate3  ){ 
            setrunner2BackRate3(value.runner2BackRate3);
            s15 = value.runner2BackRate3;
            c9 = 1;
            setTimeout(()=>{c9 = 0;},  700);
          }
          if(s16 !== value.runner2BackSize1  ){  
            setrunner2BackSize1(value.runner2BackSize1);
            s16 = value.runner2BackSize1;
          }
          if(s17 !== value.runner2BackSize2  ){ 
            setrunner2BackSize2(value.runner2BackSize2);
            s17 = value.runner2BackSize2;
          }
          if(s18 !== value.runner2BackSize3  ){     
            setrunner2BackSize3(value.runner2BackSize3);
            s18 = value.runner2BackSize3;
          }
          if(s19 !== value.runner2LayRate1  ){          
            setrunner2LayRate1(value.runner2LayRate1);
            s19 = value.runner2LayRate1;
            c10 = 1;
            setTimeout(()=>{c10 = 0;},  700);
          }
          if(s20 !== value.runner2LayRate2  ){ 
            setrunner2LayRate2(value.runner2LayRate2);
            s20 = value.runner2LayRate2;
            c11 = 1;
            setTimeout(()=>{c11 = 0;},  700);
          }
          if(s21 !== value.runner2LayRate3  ){ 
            setrunner2LayRate3(value.runner2LayRate3);
            s21 = value.runner2LayRate3;
            c12 = 1;
            setTimeout(()=>{c12 = 0;},  700);
          }
          if(s22 !== value.runner2LaySize1  ){ 
            setrunner2LaySize1(value.runner2LaySize1);
            s22 = value.runner2LaySize1;
          }
          if(s23 !== value.runner2LaySize2  ){ 
            setrunner2LaySize2(value.runner2LaySize2);
            s23 = value.runner2LaySize2;
          }
          if(s24 !== value.runner2LaySize3  ){ 
            setrunner2LaySize3(value.runner2LaySize3);
            s24 = value.runner2LaySize3;
          }
  
          settieBackRate1(value.tieBackRate1);
          settieBackRate2(value.tieBackRate2);
          settieBackRate3(value.tieBackRate3);
          settieLayRate1(value.tieLayRate1);
          settieLayRate2(value.tieLayRate2);
          settieLayRate3(value.tieLayRate3);
  
          settieBackSize1(value.tieBackSize1);
          settieBackSize2(value.tieBackSize2);
          settieBackSize3(value.tieBackSize3);
          settieLaySize1(value.tieLaySize1);
          settieLaySize2(value.tieLaySize2);
          settieLaySize3(value.tieLaySize3);
        }
      }
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
          <td className="align-L" rowSpan="1"><Link to="">Soccer</Link></td>
          <td className="align-L border-l" rowSpan="1">{eventDate}</td>
          <td className="align-L border-l">
          <Link to="" onClick={(e)=>{displayNextRow(e,subItem.event_id)}} className="btn open-odds" id="showOddsBtn">Open</Link>
          <Link to="">
              <strong id="eventName">{subItem.event_name}</strong>
              <img className="fromto" src="images/refresh2.png" />
              <span id="marketName">{subItem.market_name}</span>
          </Link>
          </td>
          <td className="border-l"><Link to="" className={`${(parseFloat(subItem.teamA_total).toFixed(2) < 0)?'red':''}`}><span className="">{teamA_total}</span></Link></td>
          
          {draw_total && <td>
          <Link to=""  className="" ><span className={`${(parseFloat(subItem.draw_total).toFixed(2) < 0)?'red':''}`}>{draw_total}</span></Link>
          </td>}
          <td><Link to=""  className={`${(parseFloat(subItem.teamB_total).toFixed(2) < 0)?'red':''}`}>{teamB_total}</Link></td>
          <td className="border-l">
              <Link to="" onClick={(e)=>{ e.preventDefault();setlogType('DownlineBetListing');setshowLogs(true);setselectedItem(subItem);}} className="btn">View </Link>
          </td>
      </tr>
        <tr id={`expand-showOddsBtn-${subItem.event_id}`}  className="expand iframe-table-design"  style={{display:'none'}}>
        <td className="border-l align-L" colSpan={`${(draw_total)?'7':'6'}`}><img className="expand-arrow" src="images/transparent.gif" />
        <div className="for-agent">
        <div className="head-bets-agent">
        <dl className="game-matched">
        <dt>Total Stakes </dt>
        <dd >PHK 0.00</dd>
        </dl>
        <dl className="game-matched">
        <dt>Matched </dt>
        <dd >PHK 0.00</dd>
        </dl>
        <ul className="game-info">
        <li className="green"><img className="icon-irun" src="images/transparent.gif" />In-Play </li>
        </ul>
        </div>
        <div className="bets-wrap"> <span className="refer_only"><span>2</span> Selections</span>
        <table className="bets">
        <tbody>
        <tr className="bet-all">
        <td></td>
        <td className="refer-bet left-lt" colSpan="2">100.8%</td>
        <td><a  className="back-all"><img src="images/transparent.gif" /><span>Back all</span></a></td>
        <td><a className="lay-all"><img src="images/transparent.gif" /><span>Lay all</span></a></td>
        <td className="refer-book" colSpan="2">99.8%</td>
        </tr>
        <tr>
        <th> <p><a><img className="icon-predict" src="images/transparent.gif" /></a>{runners[0]}</p>
        </th>
        <td className="back-3"><a>{runner1BackRate3}<span>{runner1BackSize3}</span></a></td>
        <td className="back-2"><a>{runner1BackRate2}<span>{runner1BackSize2}</span></a></td>
        <td className="back-1"><a>{runner1BackRate1}<span>{runner1BackSize1}</span></a></td>
        <td className="lay-1"><a>{runner1LayRate1}<span>{runner1LaySize1}</span></a></td>
        <td className="lay-2"><a>{runner1LayRate2}<span>{runner1LaySize2}</span></a></td>
        <td className="lay-3"><a>{runner1LayRate3}<span>{runner1LaySize3}</span></a></td>
        </tr>
        <tr>
        <th> <p><a><img className="icon-predict" src="images/transparent.gif" /></a>{runners[1]}</p>
        </th>
        <td className="back-3"><a>{runner2BackRate3}<span>{runner2BackSize3}</span></a></td>
        <td className="back-2"><a>{runner2BackRate2}<span>{runner2BackSize2}</span></a></td>
        <td className="back-1"><a>{runner2BackRate1}<span>{runner2BackSize1}</span></a></td>
        <td className="lay-1"><a>{runner2LayRate1}<span>{runner2LaySize1}</span></a></td>
        <td className="lay-2"><a>{runner2LayRate2}<span>{runner2LaySize2}</span></a></td>
        <td className="lay-3"><a>{runner2LayRate3}<span>{runner2LaySize3}</span></a></td>
        </tr>
        {subItem.runnerId3 !== " " && 
        <tr>
        <th> <p><a><img className="icon-predict" src="images/transparent.gif" /></a>The Draw</p>
        </th>
        <td className="back-3"><a>{tieBackRate3}<span>{tieBackSize3}</span></a></td>
        <td className="back-2"><a>{tieBackRate2}<span>{tieBackSize2}</span></a></td>
        <td className="back-1"><a>{tieBackRate1}<span>{tieBackSize1}</span></a></td>
        <td className="lay-1"><a>{tieLayRate1}<span>{tieLaySize1}</span></a></td>
        <td className="lay-2"><a>{tieLayRate2}<span>{tieLaySize2}</span></a></td>
        <td className="lay-3"><a>{tieLayRate3}<span>{tieLaySize3}</span></a></td>
        </tr>}
        </tbody>
        </table>
        </div>
        </div>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default RowCricketMatchOdds