import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changePassword } from '../../Redux/action/Account';
import { toast } from "react-toastify";


const ChangePassword = (props) => {
    const dispatch = useDispatch();
    let {token} = useSelector(state=>state.auth);
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    let [params,setParams] = useState({sid:token,newPass:'',confirmPass:'',currPass:''});
    
    const handlePasswordValidation = (evnt) =>{
      let passwordInputValue = evnt.target.value.trim();
      let passwordInputFieldName = evnt.target.name;
      if(passwordInputFieldName==='newPassword'){
        let uppercaseRegExp   = /(?=.*?[A-Z])/;
        let lowercaseRegExp   = /(?=.*?[a-z])/;
        let digitsRegExp      = /(?=.*?[0-9])/;
        let specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        let minLengthRegExp   = /.{6,}/;
        let passwordLength =      passwordInputValue.length;
        let uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
        let lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
        let digitsPassword =      digitsRegExp.test(passwordInputValue);
        let specialCharPassword = specialCharRegExp.test(passwordInputValue);
        let minLengthPassword =   minLengthRegExp.test(passwordInputValue);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Password is empty";
        }else if(!uppercasePassword){
                errMsg="At least one Uppercase";
        }else if(!lowercasePassword){
                errMsg="At least one Lowercase";
        }else if(!digitsPassword){
                errMsg="At least one digit";
        }else if(!specialCharPassword){
                errMsg="At least one Special Characters";
        }else if(!minLengthPassword){
                errMsg="At least minumum 8 characters";
        }else{
            errMsg="";
        }
        setPasswordErr(errMsg);
      }
      if(passwordInputFieldName=== "newPasswordConfirm" || (passwordInputFieldName==="newPassword" && params.confirmPass.length>0) ){
        if(params.newPass != params.confirmPass)
        {
          setConfirmPasswordError("Confirm password is not matched");
        }else{
          setConfirmPasswordError("");
        }
      }
    }
    
    const handelSubmit = async()=>{
        if (params.newPass === "" || params.confirmPass === "" || params.currPass === "") {
            toast.info("Password can not be Blank!");
        } else if (params.newPass != params.confirmPass) {
            toast.info("password is not matched!");
        } else if (params.newPass === params.currPass) {
            toast.info("Old password and new password are same!");
        }
        else{
            await dispatch(changePassword(params)).then(async(response)=>{
                toast.success("Password Changed Successfully!");
                setParams({...params,newValue:'',password:''});
            props.HandlePopup('change_password',false);
            },(err)=>{
                toast.error(err);
            });
        }
     }
  return (
    <>
        <div id="changePasswordModal" className="pop_bg" style={{ display: "block" }}>
        <div className="pop_box">
          <NavLink onClick={()=>props.HandlePopup('change_password',false)} to="" className="close_pop">
            close_pop
          </NavLink>
          <h3>Change Password</h3>
          <dl className="form_list">
            <dt>New Password</dt>
            <dd>
              <input onKeyUp={(e)=>{handlePasswordValidation(e)}} onChange={(e) => { setParams({...params, newPass:e.target.value}) }} value={params.newPass} name="newPassword" id="newPassword" type="password" placeholder="Enter"/>
              <span className="must">＊</span>
              <span id="newPasswordErrorText" className="error-text">{passwordError}</span>
            </dd>
            <dt>New Password Confirm</dt>
            <dd>
              <input onKeyUp={(e)=>{handlePasswordValidation(e)}} onChange={(e) => { setParams({...params, confirmPass:e.target.value}) }} value={params.confirmPass} name="newPasswordConfirm" id="newPasswordConfirm" type="password" placeholder="Enter"/>
              <span className="must">＊</span>
              <span id="newPasswordConfirmErrorText" className="error-text">{confirmPasswordError}</span>
            </dd>
            <dt>Your Password</dt>
            <dd>
              <input onChange={(e) => { setParams({...params, currPass:e.target.value}) }} value={params.currPass} id="changePassword" type="password" placeholder="Enter"/>
              <span className="must">＊</span>
            </dd>
            <dd>
              <NavLink to="" onClick={async()=>{handelSubmit()}} id="changePasswordBtn" className="btn-send">Change</NavLink>
            </dd>
          </dl>
        </div>
      </div>
    </>
  )
}

export default ChangePassword