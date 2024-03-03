import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAgentLevelInfo, getAgentStatusInfo, updateAgentStatus, getAccountDownlines } from '../../Redux/action/Downline';
import Transparent from '../../images/transparent.gif';
import { toast } from "react-toastify";
import { createLogger } from 'redux-logger';
import axios from 'axios';
const ChangeStatusSuperAdmin = (props) => {
  const dispatch = useDispatch();
  let { token, user } = useSelector(state => state.auth);
  let { puserBlocked, pbetBlocked } = useSelector(state => state.downline);
  let currentStatus = getAgentStatusInfo(props.selectedRow);
  let agnetLevelInfo = getAgentLevelInfo(props.selectedRow.level);
  let [params, setParams] = useState({ sid: token, agentId: props.selectedRow.clientid, level: props.selectedRow.level, status: 0, password: '' });

  const handleAPIRequest = async () => {
    props.setLoading(true);

    let userBlockedBySuper = 0;
    let betBlockedBySuper = 0;

    if (params.status === 1) {
      userBlockedBySuper = 0;
      betBlockedBySuper = 0;
    } else if (params.status === 2) {
      betBlockedBySuper = 1;
    } else if (params.status === 3) {
      userBlockedBySuper = 1;
    }
    const downlineParam = {
      "ClientId": props.selectedRow.clientid,
      "sid": token,
      "password": params.password,
      "UserBlockedBySuper":userBlockedBySuper,
      "BetBlockedBySuper":betBlockedBySuper,
    };

    await axios.post(
      'https://nginx9.com/api/agent/ChangeClientStatusbySuper',
      downlineParam
    ).then((data) => {
      props.setLoading(false);
      if(data.status === 200){
        toast.success('Client status updated successfully!');
        props.HandlePopup('change_status_modal_1', false);
      }else{
        toast.error(data.data);
      }
    }).catch((err) => {
      props.setLoading(false);
      toast.error(err)
    });
  }




  return (
    <div id="changeStatusModal" className="pop_bg" style={{ top: '0', display: 'block' }}>
      <div className="pop_box">
        <NavLink to="" onClick={() => { props.HandlePopup('change_status_modal_1', false) }} className="close_pop">close_pop</NavLink>
        <h3>Change Status By Super Admin</h3>
        <div className="status_id">
          <p id="changeAccount"><span className="lv_2">{agnetLevelInfo.level_text}</span>{props.selectedRow.clientid}</p>
          {currentStatus == 1 && <p className="status-active" id="originalStatus"><img src={Transparent} />Active</p>}
          {currentStatus == 2 && <p className="status-suspend" id="originalStatus"><img src={Transparent} />Suspended</p>}
          {currentStatus == 3 && <p className="status-lock" id="originalStatus"><img src={Transparent} />Locked</p>}
        </div>

        <div className="white-wrap">
          <ul id="statusBtn" className="status_but">
            <li>
              <NavLink to="" id="activeBtn" onClick={() => { if (currentStatus != 1) { if (params.status === 1) { setParams({ ...params, status: 0 }) } else { setParams({ ...params, status: 1 }) } } }} className={`but_active ${(params.status == 1) ? "open" : ""} ${(currentStatus == 1) ? "disable" : ""}`} data-status="active">
                <img className="" src={Transparent} />
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="" id="suspendBtn" onClick={() => { if (currentStatus == 1) { if (params.status === 2) { setParams({ ...params, status: 0 }) } else { setParams({ ...params, status: 2 }) } } }} className={`but_suspend ${(params.status == 2) ? "open" : ""} ${(currentStatus == 2 || currentStatus == 3) ? "disable" : ""}`} data-status="suspend">
                <img className="" src={Transparent} />
                Suspend
              </NavLink>
            </li>
            <li>
              <NavLink to="" id="lockedBtn" onClick={() => { if (currentStatus != 3) { if (params.status === 3) { setParams({ ...params, status: 0 }) } else { setParams({ ...params, status: 3 }) } } }} className={`but_locked ${(params.status == 3) ? "open" : ""} ${(currentStatus == 3) ? "disable" : ""}`} data-status="locked">
                <img className="" src={Transparent} />
                Locked
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="btn_box inline-form">
          <dl className="form_list">
            <dt>Password</dt>
            <dd style={{ width: '225px' }}>
              <input id="changeStatusPassword" type="password" onChange={(e) => { setParams({ ...params, password: e.target.value }) }} value={params.password} placeholder="Enter" />
            </dd>
          </dl>
          <div className="btn_box">
            <NavLink to="" onClick={async () => { handleAPIRequest(); }} id="changeStatusBtn" className="btn-send" style={{ width: '115px' }}>Change</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeStatusSuperAdmin;
