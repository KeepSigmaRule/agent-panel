import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import SearchIconImage from '../../images/search-icon.svg';
import { getAgentLevelInfo, getAccountDownlines, getStatusSearchParams, searchUpline, searchDowlineByStatusV2, searchDowlineByValue } from '../../Redux/action/Downline';
import { toast } from "react-toastify";
const SearchBar = (props) => {
  let dispatch = useDispatch();
  let { token, user, agent_path } = useSelector(state => state.auth);
  let { puserBlocked, pbetBlocked, account_downlines } = useSelector(state => state.downline);
  let [selectedStatus, setSelectedStatus] = useState({ puserBlocked: 0, pbetBlocked: 0 });
  let [searchValue, setSearchValue] = useState("");
  let [agentPath, setAgentPath] = useState([]);


  const handelSearch = async (e) => {
    let searchParams = {};
    searchParams = getStatusSearchParams(e.target.value);
    setSelectedStatus(searchParams);
    searchParams['sid'] = token;
    searchParams['id'] = agent_path[agent_path.length - 1].id;
    props.setLoading(true);
    await dispatch(searchDowlineByStatusV2(searchParams)).then(async (response) => {
      props.setLoading(false);
    }, (err) => {
      toast.error(err);
    });
  }


  function searchData(searchValue, array) {
    let data = array?.filter(item => item.clientid.toLowerCase().includes(searchValue.toLowerCase()));
    dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: data ?? [] });
  }


  const searchWithValue = async () => {
    await dispatch(searchDowlineByValue({ puserBlocked: selectedStatus.puserBlocked, pbetBlocked: selectedStatus.pbetBlocked, searchvalue: searchValue, id: user.id })).then(async (response) => {
      let downlines = [];
      downlines = account_downlines.filter((downline) => downline.clientid == searchValue);
      if (downlines.length > 0 && response.length > 0 && downlines[0].clientid != response[0].clientid) {
        downlines = downlines.concat(response);
      }
      else {
        downlines = response;
      }
      if (response.length > 0) {
        dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: response ? Object.values(downlines) : [] });
        // toast.success("Search result found!");
      }
      else {
        searchData(searchValue, account_downlines)
        // toast.error("No results are available.");
      }
    }, (err) => {
      toast.error(err);
    }
    );

    dispatch(searchUpline({ sid: token, searchId: searchValue })).then((response) => {
      if (response.data !== null) {
        let new_agent_path = [];
        let data = response.data;
        let keys = Object.keys(data);
        let values = Object.values(data);
        keys.map((key, index) => {
          if (key.includes('level')) {
            let first = {};
            let second = {};
            if (values[index]) {
              first['id'] = values[index];
              first['level'] = parseInt(key.split('level')[1]);
              if (first['level'] >= data.startLevel) {
                console.log(first['level']);
                second = getAgentLevelInfo(first['level']);
                let row = { ...first, ...second };
                new_agent_path.push(row);
              }
            }
          }
        });
        setAgentPath(new_agent_path);
      }
    }, (err) => {
      console.log("searchUpline err", err);
    });
  }
  const getAgentDownlineById = async (user) => {
    let downlineParam = {
      "id": user.id,
      "puserBlocked": puserBlocked,
      "pbetBlocked": pbetBlocked,
      "searchvalue": ""
    }
    let update_agent_path = agentPath.filter((item, index) => {
      if (item.level <= user.level) {
        return item;
      }
    });
    props.setLoading(true);
    dispatch(getAccountDownlines(downlineParam)).then((response) => {
      props.setLoading(false);
      dispatch({ type: "AGENT_PATH_POP", payload: update_agent_path });
    }, (err) => {
      console.log("getAccountDownlines err", err);
    });
  }
  useEffect(() => {
    setAgentPath(agent_path);
  }, [agent_path]);

 const handleHardRefresh = () => {
    window.location.reload(true);
  };


  return (
    <div className="total_all">
      <div className="biab_body biab_fluid" id="biab_body" style={{ position: 'absolute' }}>
        <div className="js-search-region biab_search biab_hidden-xs" style={{ width: '280px', position: 'relative' }}>
          <div className="biab_search-container">
            <div className="biab_seach-field-wrapper">
              <input onChange={(e) => setSearchValue(e.target.value)} className="biab_search-input" type="text" name="search" maxLength="127" placeholder="Enter your search" />
              <img src={SearchIconImage} />
            </div>
            <button onClick={async () => { searchWithValue() }} className="search-but" id="searchUserId" style={{ height: '28px' }}>Search</button>
            <div className="js-scroll-start"></div>
          </div>
        </div>
        
        <div style={{ position: 'absolute', left:290,top:4 }}>

          <button onClick={async () => { handleHardRefresh() }} className="refresh-but" style={{ height: '28px' }}>Refresh</button>
        </div>
      </div>
      <div className="agent_path" style={{ position: 'relative', left: '27%' }}>
        <div className="statuboxsetting">
          <ul className="input-list boxsetting" id="accountStatusUl">
            <li>
              <strong>Status</strong>
            </li>
            <li>
              <select name="accountStatus" id="accountStatus" onChange={handelSearch} style={{ height: '34px' }}>
                <option value="1">ACTIVE</option>
                <option value="2">SUSPENDED</option>
                <option value="3">LOCKED</option>
                <option value="0">ALL</option>
              </select>
            </li>
          </ul>
        </div>

        <ul id="agentPath" className="agent_path-L">
          {
            agentPath.length > 1 && agentPath.map((user, index) => {
              return (
                <li key={index} id="path5" className={index === (agentPath.length - 1) ? 'last_li' : ''}>
                  <NavLink to="" onClick={() => getAgentDownlineById(user)}>
                    <span className={`lv_${user.level}`}>
                      {user.level_text}
                    </span>
                    <strong>{user.id}</strong>
                  </NavLink>
                </li>
              )
            })
          }
          <ul className="account_pop" id="accountPop">
            <li id="popTmp"><a></a></li>
          </ul>
        </ul>
      </div>
      <div className="user_status" style={{ display: 'flex', float: 'right' }}>
        <NavLink to="" onClick={() => { props.HandlePopup('agent_modal', true) }} className="add_member" style={{ marginRight: '2px', padding: '0px 6px', marginBottom: '12px' }}>
          <img src={Transparent} />Add {user.agent_level_text}
        </NavLink>
        <NavLink onClick={(e) => { }} id="topRefresh" to="" className="a-refresh" style={{ cursor: 'pointer' }}>
          <img src={Transparent} style={{ filter: 'grayscale(1)' }} />
        </NavLink>
      </div>
    </div>
  )
}

export default SearchBar