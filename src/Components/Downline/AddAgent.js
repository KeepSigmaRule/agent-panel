import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addNewAgent,getAccountDownlines } from '../../Redux/action/Downline';
import { toast } from "react-toastify";
const AddAgent = (props) => {
  const dispatch = useDispatch();
  let {token,user} = useSelector(state=>state.auth);
  let {puserBlocked,pbetBlocked} = useSelector(state=>state.downline);
  let [agentParams,setAgentParams] = useState({sid:token,level:user.agent_level,email:'',username:'',agentpass:'',confirmpass:'',firstname:'',lastname:'',phone:''});
  let downlineParam = {"id": user.id,"puserBlocked": puserBlocked,"pbetBlocked": pbetBlocked,"searchvalue": ""}
  const handelSubmit = async()=>{
    await dispatch(addNewAgent(agentParams)).then(async(response)=>{
        toast.success("Agent Created Successfully!");
        setAgentParams({...agentParams,username:'',agentpass:'',confirmpass:'',firstname:'',lastname:''});
        props.HandlePopup('agent_modal',false);
        props.setLoading(true);
        dispatch(getAccountDownlines(downlineParam)).then((response)=>{
          props.setLoading(false);
          },(err)=>{
            console.log("getAccountDownlines err",err);
          });
      },(err)=>{
        props.setLoading(false);
        toast.error(err);
      });
    }

  return (
        <div id="createModal" className="pop_bg" style={{ top: '0', display: 'block' }}>
        <div className="pop_box">
          <NavLink to="" onClick={() => { props.HandlePopup('agent_modal',false) }} className="close_pop">close_pop</NavLink>
          <h3>Add Agent</h3>
          <ul className="half_box add-member-box">
            <li className="add_account_box">
              <dl className="border_b">
                <dt>E-mail*{" :-"}</dt>
                <dd>
                  <input id="email" onChange={(e) => { setAgentParams({...agentParams, email:e.target.value}) }} value={agentParams.email} type="text" placeholder="Enter" maxLength="30" />
                  <span id="userNameErrorText" className="error-text"></span>
                </dd>
                <dt>Username*{" :-"}</dt>
                <dd>
                  <input id="userName" onChange={(e) => { setAgentParams({...agentParams, username:e.target.value}) }} value={agentParams.username} type="text" placeholder="Enter" maxLength="16" />
                  <span id="userNameErrorText" className="error-text"></span>
                </dd>
                <dt>Password* {" :-"}</dt>
                <dd>
                  <input id="userPassword" onChange={(e) => { setAgentParams({...agentParams, agentpass:e.target.value}) }} value={agentParams.agentpass} type="password" placeholder="Enter" />

                  <span id="passwordErrorText" className="error-text"></span>
                </dd>
                <dt>Confirm Password* {" :-"}</dt>
                <dd>
                  <input id="repeatPassword" onChange={(e) => { setAgentParams({...agentParams, confirmpass:e.target.value}) }} value={agentParams.confirmpass} type="password" placeholder="Enter" />
                  <span id="repeatPasswordErrorText" className="error-text"></span>
                </dd>
              </dl>
              <dl className="">
                <dt>First Name* {" :-"}</dt>
                <dd>
                  <input id="firstName" onChange={(e) => { setAgentParams({...agentParams, firstname:e.target.value}) }} value={agentParams.firstname} type="text" placeholder="Enter" maxLength="16" />
                  <span id="firstErrorText" className="error-text"></span>
                </dd>
                <dt>Last Name* {" :-"}</dt>
                <dd>
                  <input id="lastName" onChange={(e) => { setAgentParams({...agentParams, lastname:e.target.value}) }} value={agentParams.lastname} type="text" placeholder="Enter" maxLength="16" />
                </dd>
                <dt>Phone {" :-"}</dt>
                <dd>
                  <input id="phone" onChange={(e) => { setAgentParams({...agentParams, phone:e.target.value}) }} value={agentParams.phone} type="text" placeholder="Enter" maxLength="20" />
                </dd>
                <dd className="logic"></dd>
                <dt>Commission(%) {" :-"}</dt>
                <dd>
                  <input id="commission" onChange={(e)=>{}} value="" type="text" placeholder="Enter" readOnly="readonly" />
                </dd>
              </dl>
            </li>
          </ul>
          <div className="btn_box">
            <NavLink to="" onClick={async()=>{handelSubmit()}} id="createBtn" className="btn-send">Done</NavLink>
          </div>
        </div>
      </div>
  )
}

export default AddAgent