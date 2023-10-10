import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRiskEventList } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
import RowCricketMatchOdds from './RowCricketMatchOdds';
import RowSoccerMatchOdds from './RowSoccerMatchOdds';
import RowTennisMatchOdds from './RowTennisMatchOdds';
const MatchOdds = (props) => {
    const dispatch = useDispatch();
    let {token,user,setshowLogs,setlogType,setselectedItem,setLoading}  = props;
    let [cricketData,setcricketData] = useState([]);
    let [cricketDataRunner3,setcricketDataRunner3] = useState([]);
    let [tennisData,settennisData] = useState([]);
    let [tennisDataRunner3,settennisDataRunner3] = useState([]);
    let [soccerData,setsoccerData] = useState([]);
    let [soccerDataRunner3,setsoccerDataRunner3] = useState([]);
    useEffect(() => {
        getMatchOdds();
    },[]);

    const getMatchOdds = () => {
        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:4,marketName:'Match Odds',is_runnerId3_exist:0})).then((response)=>{
            if(response.items.length>0){
                let cricketData = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setcricketData(cricketData);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });

        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:4,marketName:'Match Odds',is_runnerId3_exist:1})).then((response)=>{
            if(response.items.length>0){
                let cricketData = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setcricketDataRunner3(cricketData);
                console.log("setcricketDataRunner3",cricketData);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });

        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:2,marketName:'Match Odds',is_runnerId3_exist:0})).then((response)=>{
            if(response.items.length>0){
                let tennisData = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                tennisData = Object.entries(tennisData);
                settennisData(tennisData);
            }
            setLoading(false);
        },(err)=>{
            setLoading(false);
            toast.error(err);
        });

        setLoading(true);
        dispatch(getRiskEventList({sid:token,sportId:1,marketName:'Match Odds',is_runnerId3_exist:1})).then((response)=>{
            if(response.items.length>0){
                let tennisData = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                tennisData = Object.entries(tennisData);
                setsoccerDataRunner3(tennisData);
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
            <h2>Match Odds </h2>
            <Link to="" onClick={(e)=>{getMatchOdds()}}  className="btn_replay"><img src="images/refresh2.png" /></Link></div>
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
                {cricketDataRunner3.length > 0 && cricketDataRunner3.map((items,index)=>{
                    return(
                        <tbody key={index}>
                            {items[1].map((subItem,subIndex)=>{
                                let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                                let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                                let draw_total= (parseFloat(subItem.draw_total).toFixed(2) >= 0)?parseFloat(subItem.draw_total).toFixed(2):`(${parseFloat(Math.abs(subItem.draw_total)).toFixed(2)})`;
                                return(
                                    <RowCricketMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} draw_total={draw_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                                );
                            })}
                        </tbody>
                    );
                })}
                
                {soccerDataRunner3.length > 0 && soccerDataRunner3.map((items,index)=>{
                    return(
                        <tbody key={index}>
                            {items[1].map((subItem,subIndex)=>{
                                let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                                let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                                let draw_total= (parseFloat(subItem.draw_total).toFixed(2) >= 0)?parseFloat(subItem.draw_total).toFixed(2):`(${parseFloat(Math.abs(subItem.draw_total)).toFixed(2)})`;
                                return(
                                    <RowSoccerMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} draw_total={draw_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                                );
                            })}
                        </tbody>
                    );
                })}
                {cricketDataRunner3.length===0 && <tbody><tr><td className="no-data" colSpan={7}>Sorry, there is no data to display</td></tr></tbody>}
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
                
                 {cricketData.length > 0 && cricketData.map((items,index)=>{
                    return (
                        <tbody key={index}>
                        {items[1].map((subItem,subIndex)=>{
                            let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                            let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                            return(
                                <RowCricketMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                            );
                        })}
                        </tbody>
                    );
                 })}
                 {tennisData.length > 0 && tennisData.map((items,index)=>{
                    return (
                        <tbody key={index}>
                        {items[1].map((subItem,subIndex)=>{
                            let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                            let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                            return(
                                <RowTennisMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                            );
                        })}
                        </tbody>
                    );
                 })}
                 {cricketData.length===0 && <tbody><tr><td className="no-data" colSpan={6}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default MatchOdds