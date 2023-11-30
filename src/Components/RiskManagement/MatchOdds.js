import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import RowCricketMatchOdds from './RowCricketMatchOdds';
import RowSoccerMatchOdds from './RowSoccerMatchOdds';
import RowTennisMatchOdds from './RowTennisMatchOdds';
const MatchOdds = (props) => {
    let {setshowLogs,setlogType,setselectedItem,eventResponse,getEventResponse,refreshEventBtn}  = props;
    let [MatchOdd,setMatchOdd] = useState([]);
    let [MatchOddR3,setMatchOddR3] = useState([]);
    useEffect(() => {
        if(eventResponse.MatchOddR3.length > 0){
            let cricketData = eventResponse.MatchOddR3.reduce(function (r, item) {
                r[item.market_start_time] = r[item.market_start_time] || [];
                r[item.market_start_time].push(item);
                return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setMatchOddR3(cricketData);
        }
        if(eventResponse.MatchOdd.length > 0){
            let cricketData = eventResponse.MatchOdd.reduce(function (r, item) {
                r[item.market_start_time] = r[item.market_start_time] || [];
                r[item.market_start_time].push(item);
                return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                setMatchOdd(cricketData);
        }
    },[]);

  return (
    <>
        <div className="match-wrap">
        <div className="total_all">
            <h2>Match Odds </h2>
            {refreshEventBtn && <Link to="" onClick={(e)=>{getEventResponse()}}   className="btn_replay"><img src="images/refresh2.png" /></Link>}</div>
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
                {MatchOddR3.length > 0 && MatchOddR3.map((items,index)=>{
                    return(
                        <tbody key={index}>
                            {items[1].map((subItem,subIndex)=>{
                                let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                                let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                                let draw_total= (parseFloat(subItem.draw_total).toFixed(2) >= 0)?parseFloat(subItem.draw_total).toFixed(2):`(${parseFloat(Math.abs(subItem.draw_total)).toFixed(2)})`;
                                return(
                                    <>
                                        {subItem.sport_id==1 && <RowSoccerMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} draw_total={draw_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}
                                        {subItem.sport_id==2 && <RowTennisMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} draw_total={draw_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}
                                        {subItem.sport_id==4 && <RowCricketMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} draw_total={draw_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}  
                                    </>
                                );
                            })}
                        </tbody>
                    );
                })}
                {MatchOddR3.length===0 && <tbody><tr><td className="no-data" colSpan={7}>Sorry, there is no data to display</td></tr></tbody>}
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
                
                 {MatchOdd.length > 0 && MatchOdd.map((items,index)=>{
                    return (
                        <tbody key={index}>
                        {items[1].map((subItem,subIndex)=>{
                            let teamA_total = (parseFloat(subItem.teamA_total).toFixed(2) >= 0)?parseFloat(subItem.teamA_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamA_total)).toFixed(2)})`;
                            let teamB_total = (parseFloat(subItem.teamB_total).toFixed(2) >= 0)?parseFloat(subItem.teamB_total).toFixed(2):`(${parseFloat(Math.abs(subItem.teamB_total)).toFixed(2)})`;
                            return(
                                <>
                                    {subItem.sport_id==1 && <RowSoccerMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}
                                    {subItem.sport_id==2 && <RowTennisMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}
                                    {subItem.sport_id==4 && <RowCricketMatchOdds  key={subIndex} eventDate={items[0]} teamA_total={teamA_total} teamB_total={teamB_total} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>}
                                </>
                            );
                        })}
                        </tbody>
                    );
                 })}
                 {MatchOdd.length===0 && <tbody><tr><td className="no-data" colSpan={6}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default MatchOdds