import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRiskEventList } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
import RowGoal from './RowGoal';
const Goal = (props) => {
    const dispatch = useDispatch();
    let {token,user,setshowLogs,setlogType,setselectedItem,setLoading}  = props;
    let [under05,setunder05] = useState([]);
    let [under15,setunder15] = useState([]);
    let [under25,setunder25] = useState([]);
    useEffect(() => {
        getGoals();
    },[]);

    const getGoals = () => {
        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:1,marketName:'Over/Under 0.5 Goals',is_runnerId3_exist:0})).then((response)=>{
            if(response.items.length>0){
                let under05Data = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                under05Data = Object.entries(under05Data);
                setunder05(under05Data);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });

        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:1,marketName:'Over/Under 1.5 Goals',is_runnerId3_exist:0})).then((response)=>{
            if(response.items.length>0){
                let under15Data = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                under15Data = Object.entries(under15Data);
                setunder15(under15Data);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });

        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:1,marketName:'Over/Under 2.5 Goals',is_runnerId3_exist:0})).then((response)=>{
            if(response.items.length>0){
                let under25Data = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                under25Data = Object.entries(under25Data);
                setunder25(under25Data);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });
    }

  return (
    <>
        <div className="match-wrap">
        <div className="total_all">
            <h2>Goals </h2>
            <Link to="" onClick={(e)=>{getGoals()}}  className="btn_replay"><img src="images/refresh2.png" /></Link></div>
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
                
                 {under05.length > 0 && under05.map((items,index)=>{
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
                 {under15.length > 0 && under15.map((items,index)=>{
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
                 {under25.length > 0 && under25.map((items,index)=>{
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
                 {(under05.length===0 && under15.length===0 && under25.length===0) && <tbody><tr><td className="no-data" colSpan={6}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default Goal