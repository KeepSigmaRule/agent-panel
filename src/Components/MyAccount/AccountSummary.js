import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Transparent from '../../images/transparent.gif';

const AccountSummary = () => {
  let {user} = useSelector(state=>state.auth);
  return (
    <>
        <h2>Account Summary</h2>
        <div className="white-wrap">
			<dl className="head-balance">
				<dt>Your Balances</dt>
				<dd id="yourBalance">{user.balance} <span>PHK</span></dd>
			</dl>
		</div>
    </>
  )
}

export default AccountSummary