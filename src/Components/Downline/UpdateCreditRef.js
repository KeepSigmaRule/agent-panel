import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateCreditAgent,getAccountDownlines } from '../../Redux/action/Downline';
import { toast } from "react-toastify";

const UpdateCreditRef = (props) => {
  const dispatch = useDispatch();
  let {token,user} = useSelector(state=>state.auth);
  let {puserBlocked,pbetBlocked} = useSelector(state=>state.downline);
  let [params,setParams] = useState({sid:token,agentId:props.selectedRow.clientid,newValue:'',password:''});
  let downlineParam = {"id": user.id,"puserBlocked": puserBlocked,"pbetBlocked": pbetBlocked,"searchvalue": ""}
  const handelSubmit = async()=>{
    await dispatch(updateCreditAgent(params)).then(async(response)=>{
        toast.success("Credit referenace updated successfully!");
        setParams({...params,newValue:'',password:''});
        props.HandlePopup('credit_ref_modal',false);
        dispatch(getAccountDownlines(downlineParam)).then((response)=>{
            
          },(err)=>{
            console.log("getAccountDownlines err",err);
          });
      },(err)=>{
        toast.error(err);
      });
    }
  return (
    <div id="creditReferenceModel" className="pop_bg" style={{ top: '0', display: 'block' }}>
        <div className="pop_refer">
            <NavLink to="" className="close_pop" href="javascript: void(0)" onClick={() => { props.HandlePopup('credit_ref_modal',false) }}>close_pop</NavLink>
            <h3>Credit Reference Edit</h3>
            <div className="wrap-refer_edit">
                <dl>
                <dt>Current</dt>
                <dd>
                <strong id="creditReference">{props.selectedRow.cfBalance}</strong>
                </dd>
                </dl>
                <dl>
                <dt>New</dt>
                <dd><input type="text" onChange={(e) => { setParams({...params, newValue:e.target.value}) }} value={params.newValue}  id="newCreditReference"  placeholder="Enter" /></dd>
                </dl>

                <dl>
                <dt>Password</dt>
                <dd><input type="password"  onChange={(e) => { setParams({...params, password:e.target.value}) }} value={params.password} id="changeCreditReferencePassword" placeholder="Enter" /></dd>
                </dl>
            </div>
            <ul className="btn-wrap" style={{ marginLeft: '145px' }}>
                <li><NavLink to="" onClick={async()=>{handelSubmit()}} id="changeCreditReferenceBtn" className="btn-send">Submit</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default UpdateCreditRef