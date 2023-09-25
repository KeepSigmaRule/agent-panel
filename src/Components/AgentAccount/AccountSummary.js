import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAgentAccountSummary } from '../../Redux/action/Account';
import { NavLink,useLocation } from 'react-router-dom';

const AccountSummary = (props) => {
  const dispatch = useDispatch(); 
  let [profile,setProfile] = useState({});
  let {token,user} = useSelector(state=>state.auth); 
  let agent = props.agent;
  useEffect(()=>{
    props.setLoading(true);
    dispatch(getAgentAccountSummary({sid:token,agentId:agent.id,agentLevel:agent.level})).then((response)=>{
        props.setLoading(false);
        setProfile(response);
    },(err)=>{
      console.log("getAccountDownlines err",err);
    });
  },[props.agent]);
  return (
    <>
        <h2>Account Summary</h2>
          <ul className="acc-info">
            <li className="user">{agent.id}</li>
            <li className="status_all">
              <strong id="status"></strong>
            </li>
          </ul>
          <table className="table01">
            <tbody>
            <tr>
              <th width="20%" className="align-L">Wallet</th>     
              <th width="25%">Available to Bet</th>
              <th width="">Funds available to withdraw</th>
              <th width="25%">Current exposure</th>
            </tr>
            <tr>
              <td className="align-L">Main wallet</td>
              <td id="availableToBet">{parseFloat(profile.balance).toFixed(2)}</td>
              <td id="availableToWithDraw">{parseFloat(profile.balance).toFixed(2)}</td>
              <td id="currentExposure">0.00</td>
            </tr>
            </tbody>
          </table>
          <h2>Profile</h2>
          <div className="event-left">
            <div className="profile-wrap">
              <h3>About You</h3>
              <dl>
              <dt>First Name</dt>
              <dd>{profile.firstname}</dd>
              <dt>Last Name</dt>
              <dd>{profile.lastname}</dd>
              <dt>Birthday</dt>
              <dd></dd>
              <dt>E-mail</dt>
              <dd>-</dd>
              <dt>Password</dt>
              <dd>********************************
                {user.level+1==agent.level && <a onClick={()=>props.HandlePopup('change_password',true)} href="#"  className="favor-set" >Edit</a>}
              </dd>
              <dt>Time Zone</dt>
              <dd>IST</dd>
              </dl>
            </div>
            <div className="profile-wrap">
              <h3>Contact Details</h3>
              <dl>
              <dt>Primary number</dt>
              <dd></dd>
              </dl>
            </div>
          </div>
          <div className="event-right">
          <div className="profile-wrap">
            <h3>Limits &amp; Commission</h3>
            <dl>
              <dt>Exposure Limit</dt>
              <dd id="mainwalletExposureLimit">0 </dd>
              <dt>Commission</dt>
              <dd>
                <span id="commission">{profile.comm}.0%</span>
              </dd>
            </dl>
          </div>
        </div>
    </>
  )
}

export default AccountSummary