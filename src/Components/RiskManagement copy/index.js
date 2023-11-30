import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { getTopTenMatchAmount,getTopTenExposure } from '../../Redux/action/Account';
import Header from '../Header';
import IsLoadingHOC from '../IsLoadingHOC';
import AgentAccount from './AgentAccount';
import MatchOdds from './MatchOdds';
import Goal from './Goal';
import BookMaker from './BookMaker';
import FancyBet from './FancyBet';
import DownlineBetListing from './DownlineBetListing';
import FancyBooking from './FancyBooking';
import { getRiskEventListDownline } from '../../Redux/action/Risk';
import { toast } from "react-toastify";
import './RiskManagement.css';
const RiskManagement = (props) => {
    const dispatch = useDispatch();
    let {token,user} = useSelector(state=>state.auth);
    let { isLoading, setLoading } = props;
    let [selectedMenu,setselectedMenu] = useState(1);
    let [matchAmountData,setmatchAmountData] = useState([]);
    let [exposureData,setexposureData] = useState([]);
    let [showLogs, setshowLogs] = useState(false);
    let [logType, setlogType] = useState('');
    let [selectedItem, setselectedItem] = useState({});
    let [riskAgentPath,setRiskAgentPath] = useState([]);
    let [refreshBtn,setrefreshBtn] = useState(true);
    let [displaySports,setdisplaySports] = useState(false);
 
    const getTop10Listings = () => {
      setrefreshBtn(false);
      setLoading(true);
      dispatch(getTopTenMatchAmount({sid:token})).then((response)=>{
        if(response.items.length>0){
          setrefreshBtn(true);
          setLoading(false);
          setmatchAmountData(response.items);
        }
      },(err)=>{
          setrefreshBtn(true);
          setLoading(false);
          toast.error(err);
      });
      setrefreshBtn(false);
      setLoading(true);
      dispatch(getTopTenExposure({sid:token})).then((response)=>{
        if(response.items.length>0){
          setrefreshBtn(true);
          setLoading(false);
          setexposureData(response.items);
        }
      },(err)=>{
          setrefreshBtn(true);
          setLoading(false);
          toast.error(err);
      });
    }

    useEffect(() => {
     getTop10Listings();
   },[]);

   useEffect(() => {
    if(matchAmountData.length>0 && exposureData.length>0){
      setdisplaySports(true);
    }
  },[matchAmountData,exposureData]);
   
    return (
      <>
      <Header/>
      <div className="main_wrap"> 
      <div className="total_all">
        <h2>Risk Management Summary </h2>
        {refreshBtn && <Link to="" onClick={(e)=>{getTop10Listings()}} className="btn_replay"><img src="images/refresh2.png" /></Link>}
      </div>
			<div className="play_race-wrap">
				<div className="top_player-wrap">
				<h3>
					<ul className="tab-topplay">
					<li className={`tab-topplay-li ${(selectedMenu===1)?'select':''}`} onClick={()=>{setselectedMenu(1)}}><Link to="" >Top 10 Matched Amount Player </Link></li>
					<li className={`tab-topplay-li ${(selectedMenu===2)?'select':''}`} onClick={()=>{setselectedMenu(2)}}><Link to="" >Top 10 Exposure Player </Link></li>
					</ul>
				</h3>
        {selectedMenu===1 && <div className="col-2">
					<ul className="slip-head">
					<li className="col-playID">UID </li>
          <li className="col-amount sort-this">Matched Amount </li>
					<li className="col-exp">Exposure </li>
					</ul>
					<table className="table01">
					<tbody >
            {matchAmountData.length > 0 && matchAmountData.map((item,index)=>{
                return (
                  <tr key={index} style={{display:`${(index>4)?'none':''}`}}>
                  <td className="align-L">
                  <span className="order" >{index+1}.</span>
                  <span data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{outline:'none'}}>
                  <Link to="" onClick={()=>{setlogType('AgentAccount');setshowLogs(true);setselectedItem(item);}}>{item.clientId}</Link>
                  </span>
                  </td>
                  <td  width="110">{item.match_amount >= 0 ? parseFloat(item.match_amount).toFixed(2) : '('+ Math.abs(item.match_amount).toFixed(2) +')'}</td>
                  <td  width="80"><span className={`${item.exposure >= 0 ? "":"red"}`}>{item.exposure >= 0 ? parseFloat(item.exposure).toFixed(2) : '('+ Math.abs(item.exposure).toFixed(2) +')'}</span></td>
                  </tr>
                );
              })
            }
					</tbody>
					</table>
				</div>}
				
        {selectedMenu===1 && <div className="col-2">
					<ul className="slip-head">
					<li className="col-playID">UID </li>
          <li className="col-amount sort-this">Matched Amount </li>
					<li className="col-exp">Exposure </li>
					</ul>
					<table className="table01">
					<tbody >
            {matchAmountData.length > 0 && matchAmountData.map((item,index)=>{
                return (
                  <tr key={index} style={{display:`${(index>4)?'':'none'}`}}>
                  <td className="align-L">
                  <span className="order" >{index+1}.</span>
                  <span data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{outline:'none'}}>
                  <Link to="" onClick={()=>{setlogType('AgentAccount');setshowLogs(true);setselectedItem(item);}}>{item.clientId}</Link>
                  </span>
                  </td>
                  <td  width="110">{item.match_amount >= 0 ? parseFloat(item.match_amount).toFixed(2) : '('+ Math.abs(item.match_amount).toFixed(2) +')'}</td>
                  <td  width="80"><span className={`${item.exposure >= 0 ? "":"red"}`}>{item.exposure >= 0 ? parseFloat(item.exposure).toFixed(2) : '('+ Math.abs(item.exposure).toFixed(2) +')'}</span></td>
                  </tr>
                );
              })
            }
					</tbody>
					</table>
				</div>}

        {selectedMenu===2 && <div className="col-2">
					<ul className="slip-head">
					<li className="col-playID">UID </li>
					<li className="col-exp">Exposure </li>
					<li className="col-amount sort-this">Matched Amount </li>
					</ul>
					<table className="table01">
					<tbody >
          {exposureData.length > 0 && exposureData.map((item,index)=>{
                return (
                  <tr key={index} style={{display:`${(index>4)?'none':''}`}}>
                  <td className="align-L">
                  <span className="order" >{index+1}.</span>
                  <span data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{outline:'none'}}>
                  <Link to="" onClick={()=>{setlogType('AgentAccount');setshowLogs(true);setselectedItem(item);}}>{item.clientId}</Link>
                  </span>
                  </td>
                  <td  width="80"><span className={`${item.exposure >= 0 ? "":"red"}`}>{item.exposure >= 0 ? parseFloat(item.exposure).toFixed(2) : '('+ Math.abs(item.exposure).toFixed(2) +')'}</span></td>
                  <td  width="110">{item.match_amount >= 0 ? parseFloat(item.match_amount).toFixed(2) : '('+ Math.abs(item.match_amount).toFixed(2) +')'}</td>
                  </tr>
                );
              })
            }
					</tbody>
					</table>
				</div>}
				
        {selectedMenu===2 && <div className="col-2">
					<ul className="slip-head">
					<li className="col-playID">UID </li>
					<li className="col-exp">Exposure </li>
					<li className="col-amount sort-this">Matched Amount </li>
					</ul>
					<table className="table01">
            <tbody>
            {exposureData.length > 0 && exposureData.map((item,index)=>{
                return (
                  <tr key={index} style={{display:`${(index>4)?'':'none'}`}}>
                  <td className="align-L">
                  <span className="order" >{index+1}.</span>
                  <span data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{outline:'none'}}>
                  <Link to="" onClick={()=>{setlogType('AgentAccount');setshowLogs(true);setselectedItem(item);}}>{item.clientId}</Link>
                  </span>
                  </td>
                  <td  width="80"><span className={`${item.exposure >= 0 ? "":"red"}`}>{item.exposure >= 0 ? parseFloat(item.exposure).toFixed(2) : '('+ Math.abs(item.exposure).toFixed(2) +')'}</span></td>
                  <td  width="110">{item.match_amount >= 0 ? parseFloat(item.match_amount).toFixed(2) : '('+ Math.abs(item.match_amount).toFixed(2) +')'}</td>
                  </tr>
                );
              })
            }
            </tbody>
					</table>
				</div>}

				</div>
				<div className="racing-wrap">
				<h3>Horse Racing & Greyhound Racing </h3>
				<ul className="slip-head">
					<li className="col-type">Type </li>
					<li className="col-country">Country </li>
					<li className="col-local">Events </li>
					<li className="col-amount">Matched Amount </li>
				</ul>
				<div className="over-wrap" >
					<table className="table01">
					<tbody id="content_racing">
						<tr id="tempTr_noData_racing">
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						</tr>
					</tbody>
					</table>
				</div>
				</div>
			</div>
  {displaySports && <MatchOdds token={token} user={user} setshowLogs={setshowLogs} setselectedItem={setselectedItem} setlogType={setlogType} setLoading={setLoading}/>}
  {displaySports && <Goal token={token} user={user} setshowLogs={setshowLogs} setselectedItem={setselectedItem} setlogType={setlogType} setLoading={setLoading}/>}
  {displaySports && <BookMaker token={token} user={user} setshowLogs={setshowLogs} setselectedItem={setselectedItem} setlogType={setlogType} setLoading={setLoading}/>}
  {displaySports && <FancyBet token={token} user={user} setshowLogs={setshowLogs} setselectedItem={setselectedItem} setlogType={setlogType} setLoading={setLoading}/>}
</div>
{(logType==='AgentAccount' && showLogs)  && <AgentAccount setLoading={setLoading} selectedItem={selectedItem} setshowLogs={setshowLogs}/>}
{(logType==='DownlineBetListing' && showLogs) && <DownlineBetListing  setLoading={setLoading} selectedItem={selectedItem} setshowLogs={setshowLogs} setRiskAgentPath={setRiskAgentPath}/>}
{(logType==='FancyBooking' && showLogs)  && <FancyBooking setLoading={setLoading} selectedItem={selectedItem} setshowLogs={setshowLogs} setRiskAgentPath={setRiskAgentPath}/>}
</>
    )
}

export default IsLoadingHOC(RiskManagement)