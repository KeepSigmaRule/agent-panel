import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';
import SearchIconImage from '../../images/search-icon.svg';
import { getAccountDownlines, getStatusSearchParams, searchDowlineByStatus, searchDowlineByStatusV2, searchDowlineByValue } from '../../Redux/action/Downline';
import { toast } from "react-toastify";
const SearchBar = (props) => {
  let dispatch = useDispatch();
  let { token, user, agent_path } = useSelector(state => state.auth);
  let { puserBlocked, pbetBlocked } = useSelector(state => state.downline);
  let [selectedStatus, setSelectedStatus] = useState({ puserBlocked: 0, pbetBlocked: 0 });
  let [searchValue, setSearchValue] = useState("");
  const {
    items,
    setItems,
    bankingResponse,
    setAgents
  } = props;
  const handelSearch = async (e) => {
    let searchParams = {};
    searchParams = getStatusSearchParams(e.target.value);
    setSelectedStatus(searchParams);
    searchParams['sid'] = token;
    props.setLoading(true);
    await dispatch(searchDowlineByStatusV2(searchParams)).then(async (response) => {
      props.setLoading(false);
    }, (err) => {
      toast.error(err);
    });
  }

  const searchWithValue = async () => {
    props.setLoading(true);
    let downlines = [];
    downlines = items.map((item, index) => {
      if (item.clientid.includes(searchValue.toUpperCase())) {
        item.hide = false;
      }
      else {
        item.hide = true;
      }
      return item;
    });
    if (downlines.length > 0) {
      setItems(downlines);
    } else {
      getAccountDownlineList();
    }
    props.setLoading(false);
  }

  const handleHardRefresh = () => {
    setSearchValue("");
    getAccountDownlineList();
  };
  const getAccountDownlineList = () => {
    let downlineParam = {
      "id": user.id,
      "puserBlocked": puserBlocked,
      "pbetBlocked": pbetBlocked,
      "searchvalue": "",
    };
    props.setLoading(true);
    dispatch(getAccountDownlines(downlineParam)).then((response) => {
      props.setLoading(false);
      setItems(response);
      setAgents(response);
    }, (err) => {
      props.setLoading(false);
    });
  }
  return (
    <div className="total_all">
      <div className="biab_body biab_fluid serchboxsetting" id="biab_body" style={{ position: 'absolute' }}>
        <div className="js-search-region biab_search biab_hidden-xs" style={{ width: '280px', position: 'relative' }}>
          <div className="biab_search-container">
            <div className="biab_seach-field-wrapper">
              <input onChange={(e) => { setSearchValue(e.target.value); }} className="biab_search-input" type="text" name="" maxLength="127" placeholder="Enter your search" />
              <img src={SearchIconImage} />
            </div>
            <button onClick={async () => { searchWithValue() }} className="search-but" id="searchUserId" style={{ height: '24px' }}>Search</button>

            <div className="js-scroll-start"></div>

          </div>
        </div>

        <div style={{ position: 'absolute', left:290,top:2 }}>

          <button onClick={async () => { handleHardRefresh() }} className="refresh-but" style={{ height: '26px' }}>Refresh</button>
        </div>
      </div>

      <div className="agent_path" style={{ position: 'relative', left: '26%' }}>

        {/* <button onClick={async () => { handleHardRefresh() }} className="refresh-but" style={{ height: '26px' }}>Refresh</button> */}
        <ul id="agentPath" className="agent_path-L">

          <ul className="account_pop" id="accountPop">
            <li id="popTmp"><a></a></li>
          </ul>
        </ul>
      </div>

      <div className="user_status" style={{ display: 'flex', float: 'right' }}>
        <ul className="input-list" id="accountStatusUl" style={{ marginTop: '-9px', background: 'transparent', borderBottom: 'navajowhite' }}>
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