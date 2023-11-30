import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRiskEventList } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
import RowGoal from './RowGoal';
const Goal = (props) => {
    let {setshowLogs,setlogType,setselectedItem,eventResponse,getEventResponse,refreshEventBtn}  = props;
    let [under,setunder] = useState([]);
    useEffect(() => {
       if(eventResponse.Goals.length > 0){
        let under05Data = eventResponse.Goals.reduce(function (r, item) {
            r[item.market_start_time] = r[item.market_start_time] || [];
            r[item.market_start_time].push(item);
            return r;
        }, Object.create(null));
        under05Data = Object.entries(under05Data);
        setunder(under05Data);
       }
    },[]);

  return (
    <>
        <div className="match-wrap">
        <div className="total_all">
            <h2>Goals </h2>
            {refreshEventBtn && <Link to="" onClick={(e)=>{getEventResponse()}} className="btn_replay"><img src="images/refresh2.png" /></Link>}</div>
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
                
                 {under.length > 0 && under.map((items,index)=>{
                    return (
                        <tbody key={index}>
                        {items[1].map((subItem,subIndex)=>{
                            let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                            let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                            return(
                                <RowGoal  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                            );
                        })}
                        </tbody>
                    );
                 })}
                 {(under.length===0) && <tbody><tr><td className="no-data" colSpan={6}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default Goal