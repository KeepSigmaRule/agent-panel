import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import SearchIconImage from '../../images/search-icon.svg';
import {getAccountDownlines,getStatusSearchParams,searchDowlineByStatus,searchDowlineByStatusV2,searchDowlineByValue}  from '../../Redux/action/Downline';
import { toast } from "react-toastify";
const SearchBar = (props) => {
    let dispatch = useDispatch();
    let {token,user,agent_path} = useSelector(state=>state.auth);
    let {puserBlocked,pbetBlocked} = useSelector(state=>state.downline);
    let [selectedStatus,setSelectedStatus] = useState({puserBlocked:0,pbetBlocked:0});
    let [searchValue,setSearchValue] = useState("");
    const {
      agentPath,
      setagentPath,
      itemsBucket,
      setitemsBucket,
      agents
    } = props;
    const handelSearch = async(e)=>{
        let searchParams = {};
        searchParams = getStatusSearchParams(e.target.value);
        setSelectedStatus(searchParams);
        searchParams['sid']=token;
        props.setLoading(true);
       await dispatch(searchDowlineByStatusV2(searchParams)).then(async(response)=>{
        props.setLoading(false);
      },(err)=>{
        toast.error(err);
      });
    }
    
    const searchWithValue =async()=>{
      props.setLoading(true);
      let downlines = [];
      if(searchValue!=""){
        downlines = itemsBucket.filter((item)=>item.clientid.includes(searchValue.toUpperCase()));
      }
      else{
        downlines = agents;
      }
      setitemsBucket(downlines);
      props.setLoading(false);
    }
    const getAgentDownlineById = async(user)=>{
      let downlineParam = {
        "id": user.id,
        "puserBlocked": puserBlocked,
        "pbetBlocked": pbetBlocked,
        "searchvalue": ""
      }
      let update_agent_path = agent_path.filter((item,index)=>{
        if(item.level<=user.level){
          return item;
        }
      });
      
      dispatch(getAccountDownlines(downlineParam)).then((response)=>{
       //setagentPath(update_agent_path);
       dispatch({ type: "AGENT_PATH_POP", payload: update_agent_path });
      },(err)=>{
        console.log("getAccountDownlines err",err);
      });
    }

  return (
    <div className="total_all">
        <div className="biab_body biab_fluid serchboxsetting" id="biab_body" style={{position:'absolute'}}>
        <div className="js-search-region biab_search biab_hidden-xs" style={{width:'280px',position:'relative'}}>
        <div className="biab_search-container">
        <div className="biab_seach-field-wrapper">
        <input onChange={(e)=>setSearchValue(e.target.value)} className="biab_search-input" type="text" name="search" maxLength="127" placeholder="Enter your search" />
        <img src={SearchIconImage} />
        </div>
        <button onClick={async()=>{searchWithValue()}} className="search-but" id="searchUserId" style={{height:'24px'}}>Search</button>
        <div className="js-scroll-start"></div>
        </div>
        </div>
        </div>

        <div className="agent_path"  style={{position:'relative',left:'26%'}}>
        <ul id="agentPath" className="agent_path-L">
        
        <ul className="account_pop" id="accountPop">
        <li id="popTmp"><a></a></li>
        </ul>
        </ul>
        </div>

        <div className="user_status" style={{display:'flex',float:'right'}}>
        <ul className="input-list" id="accountStatusUl" style={{marginTop:'-9px', background:'transparent', borderBottom:'navajowhite'}}>
        <li>
        <strong>Status</strong>
        </li>
        <li>
        <select name="accountStatus" id="accountStatus" onChange={handelSearch}>
        <option value="1">ACTIVE</option>
        </select>
        </li>
        </ul>
        </div>
        </div>
  )
}

export default SearchBar