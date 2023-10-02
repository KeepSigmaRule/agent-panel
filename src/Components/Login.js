import React,{ useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Logo from '../images/508.fe3d6487.png';
import betfair from '../images/powered_by_betfair_light.svg';
import background from '../images/bg-login.jpg';
import bottombrowswe from '../images/icon-browser-W.png';
import transprnt from '../images/transparent.gif';
import { useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { login,getAccountDetail } from '../Redux/action/Auth';
import { toast } from "react-toastify";
export function detectMobile() {
  var check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
var isMobile = detectMobile();
const Login = (prop) => {
   const [loginParams,setloginParams] = useState({id:'',password:''});
   let {token,user,agent_path} = useSelector(state=>state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const submitLogin = async()=>{
    let user_captcha_value = document.getElementById('user_captcha_input').value;
      if (validateCaptcha(user_captcha_value)==false) {
        toast.error('Captcha Does Not Match');
      }
      else{
        await dispatch(login(loginParams)).then(async(response)=>{
    
        },(err)=>{
          toast.error(err);
        });
      }
   }

   useEffect(()=>{
    console.log("loginParams",loginParams);
    dispatch(getAccountDetail({sid:token})).then((response)=>{
      if(agent_path.length==0){
        dispatch({ type: "AGENT_PATH_PUSH", payload: response });
        dispatch({ type: "PL_AGENT_PATH_PUSH", payload: response });
      }
      navigate("/downline");
    },(err)=>{
      toast.error(err);
    });
  },[token]);
  useEffect(()=>{
    loadCaptchaEnginge(4,"white","black","numbers");
  }, []);
  return (
    <>
      {isMobile == false &&
        <div  className="login_blk" style={{ background: `url(${background})`, backgroundSize: 'cover' }}>
          <div className="login-wrap">
            <div className="kv"></div>
            <dl className='login-panel'>
              <dt>Agent login</dt>
              <div  className="login-container ng-dirty ng-touched ng-valid" noValidate>
                <div  className="form-group">
                  <input  formcontrolname="email" onChange={(e) => { setloginParams({...loginParams, id:e.target.value}) }} value={loginParams.id} placeholder="User ID" type="text" className="ng-dirty ng-valid ng-touched" /></div>
                  <div  className="form-group">
                    <input  formcontrolname="password" onChange={(e) => { setloginParams({...loginParams, password:e.target.value}) }} value={loginParams.password} placeholder="Password" type="password"  className="ng-dirty ng-valid ng-touched" /></div>
                    <div  className="form-group mb-5">
                      <input  formcontrolname="text" placeholder="Validation Code" maxLength="4" id="user_captcha_input" type="text"  className="ng-dirty ng-valid ng-touched" />
                      <span className="authenticateImage"><LoadCanvasTemplateNoReload /></span>
                    </div>
                  <div  className="form-group mgn_b20"><input  type="submit" onClick={async()=>{submitLogin()}} defaultValue="Login" value="Login" className="btn-send-login"/></div>
              </div>
            </dl>
          </div>
          <div className="moreinfo-wrap">
            <div className="support-wrap extend-support">
              <div className="extend-wrap">
                <div className="extend-btn">
                  <img src={transprnt} title="customer" className="support-customer"/>
                    <a href="https://wa.me/+393509477575" target="_blank">Customer support1</a>
                    <a href="https://wa.me/+393509477575" target="_blank" className="split-line">support2</a>
                </div>
                <div className="extend-btn">
                  <img src={transprnt} title="WhatsApp" className="support-whatsapp"/>
                    <a href="https://wa.me/+393509477575" target="_blank">WhatsApp 3</a>
                    <a href="https://wa.me/+393509477575" target="_blank" className="split-line">WhatsApp 4</a>
                </div>
              </div>
              <div className="extend-btn">
                <img src={transprnt} title="Telegram" className="support-telegram"/>
                <a href="https://wa.me/+393509477575" target="_blank">+393509477575</a>
                <a href="https://wa.me/+393509477575" target="_blank" className="split-line">+393509477575</a>
              </div>
              <div className="extend-wrap">
                <div className="support-social">
                  <img src={transprnt} title="Skype" className="support-skype"/>
                  <a href="skype:skyexchangeofficial?chat" target="_blank">skyexchangeofficial</a>
                </div>
                <div className="support-social">
                  <img src={transprnt} title="Email" className="support-mail"/>
                  <a href="mailto:info@skyexchange.com" target="_blank">info@skyexchange.com</a>
                </div>
                <div className="support-social">
                  <img src={transprnt} title="Instagram" className="support-ig"/>
                    <a href="https://www.instagram.com/officialskyfair/" target="_blank">officialskyexchange</a>
                </div>
              </div>
            </div>
            <div className="browser-wrap">
              <img src={bottombrowswe}/><br/>
              Our website works best in the newest and last prior version of these browsers: <br/>Google Chrome. Firefox
            </div>
          </div>
        </div>
      }
      {isMobile == true &&
      <div className="loginformmb">
        <header className="login-head">
          <h1>SKYFAIR</h1>
        </header>
        <dl className='form-login'>
            <div  className="form-group">
            <input  formcontrolname="email" onChange={(e) => { setloginParams({...loginParams, id:e.target.value}) }} value={loginParams.id} placeholder="Username" type="text" className="ng-dirty ng-valid ng-touched" /></div>
            <div  className="form-group">
              <input  formcontrolname="password" onChange={(e) => { setloginParams({...loginParams, password:e.target.value}) }} value={loginParams.password} placeholder="Password" type="password"  className="ng-dirty ng-valid ng-touched" /></div>
            <dd className="valid-code">
							<input type="text" placeholder="Validation Code" maxLength="4" id="user_captcha_input"/>
							<div id="popupcaptcha" style={{ position: 'relative', right: '-57.13333vw', width: '16.6666vw', top: '-9.31vw' }}><LoadCanvasTemplateNoReload /></div>
						</dd>
            <div  className="form-group mgn_b20"><input  type="submit" onClick={async()=>{submitLogin()}} defaultValue="Login" value="Login" className="btn-send-login"/></div>
        </dl>
        <div className="support-wrap extend-support">
          <div className="extend-btn">
            <img src={transprnt} title="customer" className="support-customer"/>
              <a href="https://wa.me/+393509477575" target="_blank">Customer support1</a>
              <a href="https://wa.me/+393509477575" target="_blank" className="split-line">support2</a>
          </div>
          <div className="extend-btn">
            <img src={transprnt} title="WhatsApp" className="support-whatsapp"/>
              <a href="https://wa.me/+393509477575" target="_blank">WhatsApp 3</a>
              <a href="https://wa.me/+393509477575" target="_blank" className="split-line">WhatsApp 4</a>
          </div>
          <div className="extend-btn">
            <img src={transprnt} title="Telegram" className="support-telegram"/>
            <a href="https://wa.me/+393509477575" target="_blank">+393509477575</a>
            <a href="https://wa.me/+393509477575" target="_blank" className="split-line">+393509477575</a>
          </div>
          <div className="support-social">
            <div className="social-btn">
              <img src={transprnt} title="Skype" className="support-skype"/>
              <a href="skype:skyexchangeofficial?chat" target="_blank">Skype</a>
            </div>
            <div className="social-btn">
              <img src={transprnt} title="Email" className="support-mail"/>
              <a href="mailto:info@skyexchange.com" target="_blank">Email</a>
            </div>
            <div className="social-btn">
              <img src={transprnt} title="Instagram" className="support-ig"/>
                <a href="https://www.instagram.com/officialskyfair/" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Login
