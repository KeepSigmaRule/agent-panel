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
import ChangeStatus from './ChangeStatus';
import IsLoadingHOC from '../IsLoadingHOC';
import { useSelector,useDispatch } from 'react-redux';

//import { store } from '../Redux/store';

const Downline = (props) => {
  let {token,user,agent_path} = useSelector(state=>state.auth);
  let { isLoading, setLoading } = props;
  let [addAgent,setaddAgent] = useState(false);
  let [updateCrediRef,setupdateCrediRef] = useState(false);
  let [changeStatus,setchangeStatus] = useState(false);
  let [selectedRow,setselectedRow] = useState({});
  let [agentPath, setagentPath] = useState(agent_path);
  console.log("agent_path",agent_path);
  // const HandleAgentPath=(agent_path)=>{
  //   setagentPath(agent_path);
  // } 
 // let downline = store.getState('state').downline;
  
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
    }
  }


  
  return (
    <>
        <Header/>
        {addAgent && <AddAgent setLoading={setLoading} HandlePopup={HandlePopup}/>}
        {updateCrediRef && <UpdateCreditRef HandlePopup={HandlePopup} selectedRow={selectedRow}/>}
        {changeStatus && <ChangeStatus  setLoading={setLoading} HandlePopup={HandlePopup} selectedRow={selectedRow}/>}
        <div id="mainWrap" className="main_wrap risk-responsive">
        <SearchBar setLoading={setLoading} HandlePopup={HandlePopup} agentPath={agentPath} setagentPath={setagentPath}/>
        <SelfDownline />
        <div className="biab_body biab_fluid biab_account-page" id="biab_body">
        <RelatedDownline setLoading={setLoading} HandlePopup={HandlePopup} agentPath={agentPath} setagentPath={setagentPath}/>
        <div style={{marginTop:'15px',color:'transparent'}}>.</div>
        </div>
        </div>
    </>
  )
}

export default IsLoadingHOC(Downline)