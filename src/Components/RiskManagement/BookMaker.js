import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRiskEventList } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
const BookMaker = (props) => {
    const dispatch = useDispatch();
    let {setshowLogs,setlogType,setselectedItem,eventResponse,getEventResponse,refreshEventBtn}  = props;
    let [BookMaker,setBookMaker] = useState([]);
    let [BookMakerR3,setBookMakerR3] = useState([]);
    useEffect(() => {
        if(eventResponse.BookMakerR3.length > 0){
            let cricketData = eventResponse.BookMakerR3.reduce(function (r, item) {
                r[item.market_start_time] = r[item.market_start_time] || [];
                r[item.market_start_time].push(item);
                return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setBookMakerR3(cricketData);
        }
        if(eventResponse.BookMaker.length > 0){
            let cricketData = eventResponse.BookMaker.reduce(function (r, item) {
                r[item.market_start_time] = r[item.market_start_time] || [];
                r[item.market_start_time].push(item);
                return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setBookMaker(cricketData);
        }
    },[]);

  return (
    <>
        <div className="match-wrap">
        <div className="total_all">
            <h2>Book Maker </h2>
            {refreshEventBtn && <Link to="" onClick={(e)=>{getEventResponse()}} className="btn_replay"><img src="images/refresh2.png" /></Link>}</div>
            <table className="table01 withRunnerID3 risk_matchodd">
                <tbody>
                <tr>
                    <th width="10%" className="align-L" rowSpan="2">Sports </th>
                    <th width="7%" className="align-L" rowSpan="2">Market Date </th>
                    <th className="align-L" rowSpan="2">Event/Market Name </th>
                    <th width="21%" className="align-C border-l bg-yellow" colSpan="3">Player P/L </th>
                    <th width="6%" className="align-C border-l" rowSpan="2">Downline P/L </th>
                </tr>
                <tr>
                    <th width="7%" className="border-l bg-yellow">1</th>
                    <th width="7%" className="bg-yellow">X</th>
                    <th width="7%" className="bg-yellow">2</th>
                </tr>
                </tbody>
                {BookMakerR3.length > 0 && BookMakerR3.map((items,index)=>{
                    return(
                        <tbody key={index}>
                            {items[1].map((subItem,subIndex)=>{
                                let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                                let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                                let draw_total= (parseFloat(subItem.draw_total).toFixed(2) >= 0)?parseFloat(subItem.draw_total).toFixed(2):`(${parseFloat(Math.abs(subItem.draw_total)).toFixed(2)})`;
                                return(
                                    <tr  key={subIndex} className="border-t">
                                    {subItem.sport_id==1 && <td className="align-L" rowSpan="3" ><Link to="">Soccer</Link></td>}
                                    {subItem.sport_id==2 && <td className="align-L" rowSpan="3" ><Link to="">Tennis</Link></td>}
                                    {subItem.sport_id==4 && <td className="align-L" rowSpan="3" ><Link to="">Cricket</Link></td>}
                                    <td className="align-L border-l" rowSpan="2">{items[0]}</td>
                                    <td className="align-L border-l">
                                        {/* <Link to=""  className="btn open-odds" id="showOddsBtn">Open</Link> */}
                                        <span data-bs-toggle="modal" data-bs-target="#exampleModal4" style={{outline:'none'}}>
                                        <Link to="">
                                            <strong >{subItem.event_name}</strong>
                                            <img className="fromto" src="images/refresh2.png" />
                                            <span id="marketName">{subItem.market_name}</span> 
                                        </Link>
                                        </span>
                                    </td>
                                    <td className="border-l">
                                        <Link to=""  className="" ><span className={`${(parseFloat(subItem.teamA_total).toFixed(2) < 0)?'red':''}`}>{teamA_total}</span></Link>
                                    </td>
                                    <td>
                                        <Link to=""  className="" ><span className={`${(parseFloat(subItem.draw_total).toFixed(2) < 0)?'red':''}`}>{draw_total}</span></Link>
                                    </td>
                                    <td>
                                        <Link to=""  className="" ><span className={`${(parseFloat(subItem.teamB_total).toFixed(2) < 0)?'red':''}`}>{teamB_total}</span></Link>
                                    </td>
                                    <td className="border-l">
                                        <div data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{outline:'none'}}>
                                            <Link to="" onClick={(e)=>{e.preventDefault(); setlogType('DownlineBetListing');setshowLogs(true);setselectedItem(subItem);}}  className="btn" >View_1 </Link>
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    );
                })}
                {BookMakerR3.length===0 && <tbody><tr><td className="no-data" colSpan={7}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
            <table className="table01 withOutRunnerID3 risk_matchodd">
                <tbody>
                <tr>
                    <th width="10%" className="align-L" rowSpan="2">Sports </th>
                    <th width="8%" className="align-L" rowSpan="2">Market Date </th>
                    <th className="align-L" rowSpan="2">Event/Market Name </th>
                    <th width="18%" className="align-C border-l bg-yellow" colSpan="2">Player P/L </th>
                    <th width="6%" className="align-C border-l" rowSpan="2">Downline P/L </th>
                </tr>
                <tr>
                    <th width="9%" className="border-l bg-yellow">1</th>
                    <th width="9%" className="bg-yellow">2</th>
                </tr>
                </tbody>
                
                 {BookMaker.length > 0 && BookMaker.map((items,index)=>{
                    return (
                        <tbody key={index}>
                        {items[1].map((subItem,subIndex)=>{
                            let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                            let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                            return(
                                <tr key={subIndex} className="border-t">
                                    {subItem.sport_id==1 && <td className="align-L" rowSpan="1" ><Link to="">Soccer</Link></td>}
                                    {subItem.sport_id==2 && <td className="align-L" rowSpan="1" ><Link to="">Tennis</Link></td>}
                                    {subItem.sport_id==4 && <td className="align-L" rowSpan="1" ><Link to="">Cricket</Link></td>}
                                    <td className="align-L border-l" rowSpan="1">{items[0]}</td>
                                    <td className="align-L border-l">
                                    {/* <Link to="" className="btn open-odds">Open</Link> */}
                                    <Link to="" className="riskboxtp">
                                        <strong id="eventName">{subItem.event_name}</strong>
                                        <img className="fromto" src="images/refresh2.png" />
                                        <span id="marketName">{subItem.market_name}</span>
                                    </Link>
                                    </td>
                                    <td className="border-l"><Link to="" className={`${(parseFloat(subItem.teamA_total).toFixed(2) < 0)?'red':''}`}><span className="">{teamA_total}</span></Link></td>
                                    <td><Link to=""  className={`${(parseFloat(subItem.teamB_total).toFixed(2) < 0)?'red':''}`}>{teamB_total}</Link></td>
                                    <td className="border-l">
                                        <Link to="" onClick={(e)=>{e.preventDefault(); setlogType('DownlineBetListing');setshowLogs(true);setselectedItem(subItem);}} className="btn">View </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    );
                 })}
                 {BookMaker.length===0 && <tbody><tr><td className="no-data" colSpan={6}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default BookMaker