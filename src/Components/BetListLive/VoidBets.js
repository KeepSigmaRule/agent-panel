import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";

const VoidBets = (props) => {
  const dispatch = useDispatch();
  let {token,user} = useSelector(state=>state.auth);
  let {isCheck,matchBets,fancyBets,setmatchBets,setfancyBets,setIsCheck,handleVoidBets,updateLiveBetsStatus,refresh} = props;
  let [params,setParams] = useState({sid:token,agentId:user.id,status:"3",password:'',betIds:isCheck,matchBets:matchBets,fancyBets:fancyBets});
  const handelSubmit = async()=>{
    await dispatch(updateLiveBetsStatus(params)).then(async(response)=>{
        toast.success(response);
        setmatchBets([]);
        setfancyBets([]);
        setIsCheck([]);
        handleVoidBets();
        refresh();
      },(err)=>{
        toast.error(err);
      });
    }
  return (
    <div id="creditReferenceModel" className="pop_bg" style={{ top: '0', display: 'block' }}>
        <div className="pop_refer">
            <NavLink to="" className="close_pop" onClick={() => { handleVoidBets() }}>close_pop</NavLink>
            <h3>Please Confirm</h3>
            <div className="wrap-refer_edit">
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

export default VoidBets