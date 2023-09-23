import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showpassword } from '../../Redux/action/Downline';
import { toast } from "react-toastify";

const DisplayPassword = (props) => {
  const dispatch = useDispatch();
  const {selectedRow} = props;
  let {token,agent_path} = useSelector(state=>state.auth);
  let params = {"sid": token,"agentId": selectedRow.clientid,"level1Id": agent_path[agent_path.length-1].id};
  let [password,setpassword] = useState('**********');
  useEffect(()=>{
    dispatch(showpassword(params)).then(async(response)=>{
      console.log("password", response);
      setpassword(response);
    },(err)=>{
      toast.error(err);
    });
  },[]);
  return (
    <div id="creditReferenceModel" className="pop_bg" style={{ top: '0', display: 'block' }}>
        <div className="pop_refer">
            <NavLink to="" className="close_pop" href="javascript: void(0)" onClick={() => { props.HandlePopup('display_password',false) }}>close_pop</NavLink>
            <h3>Check Password</h3>
            <div className="wrap-refer_edit">
            <dl>
                <dt><b>User:</b></dt>
                <dd>
                  <span id="changeCreditReferencePassword" type="text"  style={{padding:'20px'}}>{selectedRow.clientid}</span>
                </dd>
              </dl>
              <dl>
                <dt><b>Password:</b></dt>
                <dd>
                  <span id="changeCreditReferencePassword" type="text"  style={{padding:'20px'}}>{password}</span>
                </dd>
              </dl>
            </div>
        </div>
    </div>
  )
}

export default DisplayPassword