import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../images/loading40.gif'
import Transparent from '../../images/transparent.gif'
// import '../../css/Login.css';
// import '../../css/Indibet.css';
// import '../../css/Fullmarket.css';
// import '../../css/Style.css';
import Header from '../Header';
import AgentPath from './AgentPath';
import AccountStatement from './AccountStatement';
import AccountSummary from './AccountSummary';
import TransferredLog from './TransferredLog';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import ActivityLog from './ActivityLog';
import IsLoadingHOC from '../IsLoadingHOC';

const MyAccount = (props) => {
    let { isLoading, setLoading } = props;
    let [selectedMenu,setselectedMenu] = useState(1);
    let [changePassword,setchangePassword] = useState(false);
    const HandlePopup = (modalType,action,params) => {
        switch(modalType){
          case 'change_password':{
            setchangePassword(action);
          } break;
        }
      }
  return (
    <>  
        {changePassword && <ChangePassword HandlePopup={HandlePopup}/>}
        <Header/>
        <div id="mainWrap" className="main_wrap">
        <AgentPath/>
        <div className="col-left">
            <div className="sub_path">
                <ul className="menu-list">
                    <li className="class">Position</li>
                    <li><NavLink className={selectedMenu===1 && 'select'} onClick={()=>{setselectedMenu(1)}} to="" id="accountStatement" >Account Statement</NavLink></li>
                    <li><NavLink className={selectedMenu===2 && 'select'} onClick={()=>{setselectedMenu(2)}} to="" id="accountSummary">Account Summary</NavLink></li>
                    <li><NavLink className={selectedMenu===3 && 'select'} onClick={()=>{setselectedMenu(3)}} to="" id="transferredLog" >Transferred Log</NavLink></li>
                    <li className="class">Account Details</li>
                    <li><NavLink className={selectedMenu===4 && 'select'} onClick={()=>{setselectedMenu(4)}} to="" id="profile" >Profile</NavLink></li>
                    <li><NavLink className={selectedMenu===5 && 'select'} onClick={()=>{setselectedMenu(5)}} to="" id="activityLog" >Activity Log</NavLink></li>
                </ul>
            </div>
        </div>
        <div className="col-center report">
            <div id="loading" className="loading-wrap" style={{display:'none'}}>
                <ul className="loading">
                    <li><img src={Loading}/></li>
                    <li>Loading...</li>
                </ul>
            </div>
            <div id="message" className="message-wrap success">
            <a className="btn-close">Close</a>
            <p></p>
            </div>
            {selectedMenu===1 && <AccountStatement setLoading={setLoading} />}
            {selectedMenu===2 && <AccountSummary/>}
            {selectedMenu===3 && <TransferredLog/>}
            {selectedMenu===4 && <Profile setLoading={setLoading} HandlePopup={HandlePopup}/>}
            {selectedMenu===5 && <ActivityLog setLoading={setLoading} HandlePopup={HandlePopup}/>}
            <div>
            </div>
            </div>
        </div>
    </>
  )
}

export default IsLoadingHOC(MyAccount)