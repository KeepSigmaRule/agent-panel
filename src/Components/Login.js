import React,{ useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Logo from '../images/508.fe3d6487.png';
import betfair from '../images/powered_by_betfair_light.svg';
import background from '../images/bg.jpg';
import { useNavigate } from 'react-router-dom';
import { login,getAccountDetail } from '../Redux/action/Auth';
import { toast } from "react-toastify";

const Login = (prop) => {
   const [loginParams,setloginParams] = useState({id:'BRANDGAMEX247',password:'Play@1983'});
   let {token,user,agent_path} = useSelector(state=>state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const submitLogin = async()=>{
    await dispatch(login(loginParams)).then(async(response)=>{
      
    },(err)=>{
      toast.error(err);
    });
   }

   useEffect(()=>{
    console.log("loginParams",loginParams);
    dispatch(getAccountDetail({sid:token})).then((response)=>{
      if(agent_path.length==0){
        dispatch({ type: "AGENT_PATH_PUSH", payload: response });
        dispatch({ type: "PL_AGENT_PATH_PUSH", payload: response });
      }
      
      toast.success("You have logged in successfully");
      navigate("/downline");
    },(err)=>{
      toast.error(err);
    });
  },[token]);

  return (
    <>
      <div  className="login_blk" style={{ background: `url(${background})`, backgroundSize: 'cover' }}>
      <div  className="form_blk">
              <div  className="logo_img"><img  alt="img" src={Logo} style={{ width: '-webkit-fill-available' }} /></div>
              <div  className="login-container ng-dirty ng-touched ng-valid" noValidate>
                <div  className="form-group"><i  className="fa fa-envelope" />
                  <input  formcontrolname="email" onChange={(e) => { setloginParams({...loginParams, id:e.target.value}) }} value={loginParams.id} placeholder="User ID" type="text" className="ng-dirty ng-valid ng-touched" /></div>
                <div  className="form-group"><i  className="fa fa-lock" />
                  <input  formcontrolname="password" onChange={(e) => { setloginParams({...loginParams, password:e.target.value}) }} value={loginParams.password} placeholder="Password" type="password"  className="ng-dirty ng-valid ng-touched" /></div>
                <div  className="form-group mgn_b20"><input  type="submit" onClick={async()=>{submitLogin()}} defaultValue="Login" /></div>
                <div  className="bottom_logo"><img  alt="img" src={betfair} /></div>
              </div>
            </div>
      </div>
    </>
  )
}

export default Login
