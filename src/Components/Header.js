import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink,useNavigate } from 'react-router-dom';
import { logOut } from '../Redux/action/Auth';
import Transparent from '../images/transparent.gif';
import { getAccountDetail,checkToken } from '../Redux/action/Auth';
import { toast } from "react-toastify";
import '../css/Indibet.css';
import '../css/Fullmarket.css';
import '../css/Login.css';
import '../css/Style.css';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {user,token} = useSelector(state=>state.auth);
  const refreshAccountDetail = ()=>{
    dispatch(getAccountDetail({sid:token})).then((response)=>{
        console.log("getAccountDetail",response);
      },(err)=>{
        toast.error(err);
      });
  }

    useEffect(() => {
    const interval = setInterval(() => {
        dispatch(checkToken({id:user.id,token:user.token})).then((response)=>{
            if(response==="invalid"){
                
            }
          },(err)=>{
            toast.error(err);
            let logoutObj = document.getElementById('logout');
            logoutObj.click();
          });
    }, 5000);
    return () => clearInterval(interval);
    }, []);
  
  return (
    <>
    <div className='top'>
            <div className="header">
                <h1>
                    <NavLink to="/" style={{ width: '180px', marginTop: '13px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>BETBUZZ365</NavLink>
                </h1>
                <ul className="account-wrap" style={{marginTop:'12px'}}>
                    <li>
                        <span>{user.level_text}</span>
                        <strong>{user.id}</strong>
                    </li>
                    <li className="main-wallet no-multi">
                        <NavLink id="multiWallet" to="#multiBalancePop" className="a-wallet" style={{color:'white'}}>
                        <ul>
                            <li>
                                <span>Main</span>
                                <strong id="mainBalance">PTH {parseFloat(user.balance).toFixed(2)}</strong>
                            </li>
                        </ul>
                        </NavLink>
                        <NavLink onClick={(e)=>{refreshAccountDetail()}} id="topRefresh" to="" className="a-refresh" style={{cursor:'pointer'}}>
                            <img src={Transparent} style={{filter:'grayscale(1)'}} />
                        </NavLink>
                    </li>
                    <li></li>
                </ul>
            </div>
            <div className="menu-wrap">
                <div className="main_wrap">
                    <ul className="menu">
                        <li>
                            <NavLink id="menu_downline_list" reloadDocument className={({ isActive }) => (isActive ? 'select' : 'null')} to="/downline">Downline List</NavLink>
                        </li>
                        <li>
                            <NavLink id="menu_my_account" className={({ isActive }) => (isActive ? 'select' : 'null')} to="/my-account">My Account</NavLink>
                        </li>
                        <li>
                            <NavLink id="menu_my_report" className={({ isActive }) => (isActive ? 'menu-drop select' : 'menu-drop')} to="/my-report" onClick={event => event.preventDefault()}>My Report<i className="ion-ios-arrow-down" /></NavLink>
                            <ul>
                                <li>
                                    <NavLink className={({ isActive }) => (isActive ? 'select' : 'dropcolor')} to="/my-report/profit-loss-downline">Profit/Loss Report by Downline</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => (isActive ? 'select' : 'dropcolor')} to="/my-report/profit-loss-market">Profit/Loss Report by Market</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink id="menu_bet_list" className={({ isActive }) => (isActive ? 'select' : 'null')} to="/bets">BetList</NavLink>
                        </li>
                        <li>
                            <NavLink id="menu_bet_list_live" className={({ isActive }) => (isActive ? 'select' : 'null')} to="/live-bets">BetListLive</NavLink>
                        </li>
                        <li>
                            <NavLink id="menu_risk_management" className={({ isActive }) => (isActive ? 'select' : 'null')} to="/risk-management">Risk Management</NavLink>
                        </li>
                        <li>
                            <NavLink id="menu_banking" className={({ isActive }) => (isActive ? 'select' : 'null')}  to="/banking">Banking</NavLink>
                        </li>
                        <li className="logout">
                            <NavLink id="logout" to="/" onClick={()=>{dispatch(logOut())}}>Logout <img src={Transparent} /></NavLink>
                        </li>
                        <li className="time_zone">
                            <span>Time Zone :</span> GMT+5:30
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header