import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/action/Account';
const Profile = (props) => {
    const dispatch = useDispatch();
    let {token} = useSelector(state=>state.auth);  
    let [profile,setProfile] = useState([]);
    useEffect(()=>{
        props.setLoading(true);
        dispatch(getProfile({sid:token})).then((response)=>{
            props.setLoading(false);
            setProfile(response);
        },(err)=>{
        console.log("getAccountDownlines err",err);
        });
    },[]);
  return (
    <>
    <h2>Profile</h2>
    <div className="event-left">
            <div className="profile-wrap">
                <h3>About You</h3>
                <dl>
                    <dt>First Name</dt>
                    <dd>{profile.firstname}</dd>
                    <dt>Last Name</dt>
                    <dd>{profile.lastname}</dd>
                    <dt>Birthday</dt>
                    <dd>{profile.birthday}</dd>
                    <dt>E-mail</dt>
                    <dd>{profile.email}</dd>
                    <dt>Password</dt>
                    <dd>********************************
                        <a onClick={()=>props.HandlePopup('change_password',true)} href="#"  className="favor-set" >Edit</a>
                    </dd>
                    <dt>Time Zone</dt>
                    <dd>IST</dd>
                    <dt>Languages</dt>
                    <dd>
                        <select id="lang">       
                            <option value="en" selected="">English</option> 
                            <option value="cn">中文</option>
                        </select>
                    </dd>
                </dl>
            </div>
        </div>
        <div className="event-right">
            <div className="profile-wrap">
                <h3>Contact Details</h3>
                <dl>
                    <dt>Primary number</dt>
                    <dd></dd>
                </dl>
            </div>
            <div className="profile-wrap" style={{display:'none'}}>
                <h3>PT</h3>
                <dl>
                    <dt>My PT Allowed</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>My Fancy Bet PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Sportsbook PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Sportsbook Premium PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>My Book Maker PT</dt>
                    <dd>0%</dd>
                </dl>
                <dl>
                    <dt>Casino PT Allowed</dt>
                    <dd>LIVE: 0%, RNG: 0%, SLOT: 0%, VIRTUAL: 0%</dd>
                </dl>
            </div>
        </div>
    </>
  )
}

export default Profile