import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// import '../../css/Login.css';
// import '../../css/Indibet.css';
// import '../../css/Fullmarket.css';
// import '../../css/Style.css';
import Header from '../Header';
import SelfDownline from './SelfDownline';
import SearchBar from './SearchBar';
import AddAgent from './AddAgent';
import RelatedDownline from './RelatedDownline'
import UpdateCreditRef from './UpdateCreditRef';
import DisplayPassword from './DisplayPassword';
import ChangeStatus from './ChangeStatus';
import IsLoadingHOC from '../IsLoadingHOC';
import { useSelector,useDispatch } from 'react-redux';

//import { store } from '../Redux/store';

const Downline = (props) => {
  let dispatch = useDispatch();
  let {token,user,agent_path} = useSelector(state=>state.auth);
  let { isLoading, setLoading } = props;
  let [addAgent,setaddAgent] = useState(false);
  let [updateCrediRef,setupdateCrediRef] = useState(false);
  let [changeStatus,setchangeStatus] = useState(false);
  let [displayPassword,setdisplayPassword] = useState(false);
  let [selectedRow,setselectedRow] = useState({});
  let [agentPath, setagentPath] = useState(agent_path);
  
  const HandlePopup = (modalType,action,params) => {
    switch(modalType){
      case 'agent_modal':{
        setaddAgent(action);
      } break;
      case 'credit_ref_modal':{
        setselectedRow(params);
        setupdateCrediRef(action);
      } break;
      case 'change_status_modal':{
        setselectedRow(params);
        setchangeStatus(action);
      } break;
      case 'display_password':{
        setselectedRow(params);
        setdisplayPassword(action);
      } break;
    }
  }


  
  return (
    <>
        <Header/>
        {addAgent && <AddAgent setLoading={setLoading} HandlePopup={HandlePopup}/>}
        {updateCrediRef && <UpdateCreditRef HandlePopup={HandlePopup} selectedRow={selectedRow}/>}
        {changeStatus && <ChangeStatus  setLoading={setLoading} HandlePopup={HandlePopup} selectedRow={selectedRow}/>}
        {displayPassword && <DisplayPassword HandlePopup={HandlePopup} selectedRow={selectedRow}/>}
        <div id="mainWrap" className="main_wrap risk-responsive">
        {token && <SearchBar setLoading={setLoading} HandlePopup={HandlePopup} agentPath={agentPath} setagentPath={setagentPath}/>}
        {token && <SelfDownline />}
        <div className="biab_body biab_fluid biab_account-page" id="biab_body">
        {token && <RelatedDownline setLoading={setLoading} HandlePopup={HandlePopup} agentPath={agentPath} setagentPath={setagentPath}/>}
        <div style={{marginTop:'15px',color:'transparent'}}>.</div>
        </div>
        </div>
    </>
  )
}

export default IsLoadingHOC(Downline)