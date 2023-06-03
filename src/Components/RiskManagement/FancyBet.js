import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMinMaxFromObject,getRiskFancyEventList } from '../../Redux/action/Risk';
import RowCricketMatchFancyBet from './RowCricketMatchFancyBet';
import { toast } from "react-toastify";
const FancyBet = (props) => {
    const dispatch = useDispatch();
    let {token,user,setshowLogs,setlogType,setselectedItem,setLoading}  = props;
    let [cricketData,setcricketData] = useState([]);
    useEffect(() => {
        getFancyBet();
     },[]);

     const getFancyBet = () => {
        //setLoading(true);
        dispatch(getRiskFancyEventList({sid:token})).then((response)=>{
            if(response.items.length>0){
                //setLoading(false);
                let cricketData = response.items.reduce(function (r, item) {
                    r[item.market_start_time] = r[item.market_start_time] || [];
                    r[item.market_start_time].push(item);
                    return r;
                }, Object.create(null));
                cricketData = Object.entries(cricketData);
                console.log("getRiskFancyEventList",cricketData);
                setcricketData(cricketData);
            }
        },(err)=>{
            //setLoading(false);
            toast.danger(err);
        });
     }

  return (
    <>
        <div className="match-wrap">
            <div className="total_all">
            <h2>Fancy Bet</h2>
            <Link to="" onClick={(e)=>{getFancyBet()}}  className="btn_replay" ><img src="images/refresh2.png"/></Link></div>
            <table className="table01 risk_matchodd">
                <tbody>
                    <tr>
                        <th width="10%" className="align-L" rowSpan="2">Sports </th>
                        <th width="8%" className="align-L" rowSpan="2">Market Date </th>
                        <th className="align-L" rowSpan="2">Event/Market Name </th>
                        <th width="18%" className="align-C border-l bg-yellow" colSpan="2">Player P/L </th>
                        <th width="6%" className="align-C border-l" rowSpan="2">Books</th>
                    </tr>
                    <tr>
                        <th width="9%" className="border-l bg-yellow">MIN</th>
                        <th width="9%" className="bg-yellow">MAX</th>
                    </tr>
                    </tbody>
                    
                    {cricketData.length > 0 && cricketData.map((items,index)=>{
                        return(
                            <tbody key={index}>
                                {items[1].map((subItem,subIndex)=>{
                                    let winnAmount = getMinMaxFromObject(subItem.run);
                                    let minAmount = (parseFloat(winnAmount.min).toFixed(2) >= 0)?parseFloat(winnAmount.min).toFixed(2):`(${parseFloat(Math.abs(winnAmount.min)).toFixed(2)})`;
                                    let maxAmount = (parseFloat(winnAmount.max).toFixed(2) >= 0)?parseFloat(winnAmount.max).toFixed(2):`(${parseFloat(Math.abs(winnAmount.max)).toFixed(2)})`;
                                    return(
                                        <RowCricketMatchFancyBet  key={subIndex} eventDate={items[0]} winnAmount={winnAmount} minAmount={minAmount} maxAmount={maxAmount} subItem={subItem} setshowLogs={setshowLogs} setlogType={setlogType} setselectedItem={setselectedItem}/>
                                    );
                                })}
                            </tbody>
                        );
                    })}
                    {cricketData.length===0 && <tbody><tr><td className="no-data" colSpan={7}>Sorry, there is no data to display</td></tr></tbody>}
            </table>
        </div>
    </>
  )
}

export default FancyBet