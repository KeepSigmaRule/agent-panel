import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAccountDownlines,getAgentLevelInfo } from '../../Redux/action/Downline';
import { NavLink } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import Pagination from '../Pagination';

const RelatedDownline = (props) => {
    let dispatch = useDispatch();
    let {agent_path,user} = useSelector(state=>state.auth);
    let {puserBlocked,pbetBlocked,account_downlines} = useSelector(state=>state.downline);
    let downlineParam = {
        "id": agent_path[0].id,
        "puserBlocked": 0,
        "pbetBlocked": 0,
        "searchvalue": ""
    }
    
    let [items,setItems] = useState([]);
    let [totelCount,settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(2000);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    
    const HandleAgentPath = (agentBasicInfo)=>{
        dispatch({ type: "AGENT_PATH_PUSH", payload: agentBasicInfo });
        downlineParam.id = agentBasicInfo.id;
        props.setLoading(true);
        dispatch(getAccountDownlines(downlineParam)).then((response)=>{
            props.setLoading(false);
            setcurrentPage(1);
        },(err)=>{
            console.log("getAccountDownlines err",err);
            props.setLoading(false);
        });
    }
    
    useEffect(()=>{
        props.setLoading(true);
        dispatch({ type: "AGENT_PATH_POP", payload:[user]});
        dispatch(getAccountDownlines(downlineParam)).then((response)=>{
            props.setLoading(false);
        },(err)=>{
          console.log("getAccountDownlines err",err);
          props.setLoading(false);
        });
    },[]);

    useEffect(()=>{
        let start = (currentPage-1)*itemsPerPage;
        let end = (currentPage)*(itemsPerPage);
        let visibleItems = [];
        visibleItems = account_downlines.filter((item,index)=>{
        if(index>=start && index<end){
            return item;
        }
        });
        setItems(visibleItems);
        settotelCount(account_downlines.length);
        
    },[currentPage,account_downlines]);

    useEffect(()=>{
        setcurrentPage(1);
    },[account_downlines]);
    
  return (
        <>
        <table id="resultTable" className="table01 margin-table" style={{display:'table'}}>
        <tbody>
        <tr>
        <th id="accountTh" width="12%" className="align-L">Account</th>
        <th id="creditRefTh" width="10%">Credit Ref. </th>
        <th id="balanceTh" width="10%"> Balance </th>
        <th id="playerBalanceTh" width="10%">Exposure </th>
        <th id="refPLTh2" width="10%">Avail. bal. </th>
        <th id="refPLTh" width="10%">Player Balance </th>
        <th id="statusTh" width="10%">Ref. P/L </th>
        <th id="statusTh" width="10%">Status</th>
        <th id="actionTh" width="8.9%">Action</th>
        </tr>
        {
        items?.filter(itm=>!itm.hide).map((item, index)=>{
        let agnetLevelInfo = {};
        agnetLevelInfo = getAgentLevelInfo(item.level);
        let agentBasicInfo ={id:item.clientid,level:agnetLevelInfo.level_no,balance:item.Balance,level_text:agnetLevelInfo.level_text,agent_level:agnetLevelInfo.agent_level};
        
        let cfBalance= (parseFloat(item.cfBalance).toFixed(2) >= 0)?parseFloat(item.cfBalance).toFixed(2):`(${parseFloat(Math.abs(item.cfBalance)).toFixed(2)})`;
        let Balance = (parseFloat(item.Balance).toFixed(2) >= 0)?parseFloat(item.Balance).toFixed(2):`(${parseFloat(Math.abs(item.Balance)).toFixed(2)})`;
        let AvlBalance = (parseFloat(item.AvlBalance).toFixed(2) >= 0)?parseFloat(item.AvlBalance).toFixed(2):`(${parseFloat(Math.abs(item.AvlBalance)).toFixed(2)})`;
        let Exposure = (parseFloat(item.Exposure).toFixed(2) >= 0)?parseFloat(item.Exposure).toFixed(2):`(${parseFloat(Math.abs(item.Exposure)).toFixed(2)})`;
        let Reference_PL = (parseFloat(item.Reference_PL).toFixed(2) >= 0)?parseFloat(item.Reference_PL).toFixed(2):`(${parseFloat(Math.abs(item.Reference_PL)).toFixed(2)})`;
        return (
            <tr id="14" key={index} main_userid="wb77" style={{display:'table-row',borderBottom:"1px solid #7E97A7"}}>
            <td id="accountCol" className="align-L" style={{pointerEvents:item.level<6?'':'none'}}>
                <NavLink to="" onClick={()=>(item.level<6)?HandleAgentPath(agentBasicInfo):''} id="account14" className="ico_account" style={{textDecoration:'none'}}>
                <span className="order">{(currentPage-1)*itemsPerPage+index+1}.</span>
                <span className={`lv_${(item.level<6)?item.level:0}`} style={{marginRight:'3px'}}>{agnetLevelInfo.level_text}</span>{item.clientid}</NavLink>
            </td>
            <td id="creditRef14" className="credit-amount-member">
                {user.level+1==item.level && <NavLink to="" onClick={()=>{props.HandlePopup('credit_ref_modal',true,item)}} id="creditRefBtn" className="favor-set">
                    {cfBalance}
                </NavLink>}
                {user.level+1<item.level && `${cfBalance}`}
            </td>
            <td id="balance14">
                {Balance}
            </td>
            <td id="playerBalance14" className={`${(item.Exposure<0)?'red':''}`} style={{display:'table-cell'}}>
                {Exposure}
            </td>
            <td id="refPL2" className="">
                {AvlBalance}
            </td>
            <td id="refPL14" className="">
                {parseFloat(item.PlayerBalance).toFixed(2)}
            </td>
            <td id="refPL14" className={`${(item.Reference_PL<0)?'red':''}`}>
                {Reference_PL}
            </td>
            <td id="statusCol">
                <ul id="tipsPopup" className="status-popup" style={{display:'none'}}></ul>
                {item.userBlocked == 0 && item.betBlocked == 0 && <span id="status14"  className="status-active"><img src={Transparent}/>Active</span>}
                {item.userBlocked == 0 && item.betBlocked == 1 && <span id="status14"  className="status-suspend"><img src={Transparent}/>Suspended</span>}
                {item.userBlocked == 1 && <span id="status14"  className="status-lock"><img src={Transparent}/>Locked</span>}
            </td>
            <td id="actionCol">
                <ul className="action">
                {[0,1].includes(user.level) && <li>
                        <NavLink to="" onClick={()=>{props.HandlePopup('display_password',true,item)}}  id="profile14" className="password">password</NavLink>
                    </li>}
                    <li>
                        <NavLink to="" onClick={()=>{props.HandlePopup('change_status_modal',true,item)}}  id="change14" className="status">Change Status</NavLink>
                    </li>
                    {item.level===6 && <li>
                        <NavLink to="/agent-account" state={{ selectedMenu: 5}} onClick={()=>{dispatch({ type: "AGENT_PATH_PUSH", payload: agentBasicInfo });}} id="p_l0" className="p_l">Betting Profit & Loss</NavLink>
                    </li>}
                    {item.level===6 && <li>
                        <NavLink to="/agent-account" state={{ selectedMenu: 4}} onClick={()=>{dispatch({ type: "AGENT_PATH_PUSH", payload: agentBasicInfo });}} id="betting_history0" className="betting_history">Betting History</NavLink>
                    </li>}
                    <li>
                        <NavLink to="/agent-account" state={{ selectedMenu: 1}} onClick={()=>{dispatch({ type: "AGENT_PATH_PUSH", payload: agentBasicInfo });}}  id="profile14" className="profile">Profile</NavLink>
                    </li>
                </ul>
            </td>
        </tr>
            );
        })
        }
    </tbody>
    </table>
    <Pagination
        itemsPerPage={itemsPerPage}
        totelCount={totelCount}
        currentPage={currentPage}
        maxPageNumberLimit={maxPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        setcurrentPage={setcurrentPage}
        setmaxPageNumberLimit={setmaxPageNumberLimit}
        setminPageNumberLimit={setminPageNumberLimit}
        />
    </>
  )
}

export default RelatedDownline