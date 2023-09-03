import React,{useState,useEffect} from 'react';
import { decrypteData } from '../../Redux/action/Auth';
import { useSelector,useDispatch } from 'react-redux';
import { getRiskEventListDownline } from '../../Redux/action/Risk';
const Socket = (props) => {
    // const io = require('socket.io-client');
    // let ENDPOINT = "https://nginx9.com:2096";
    // let socket;
    const dispatch = useDispatch();
    useEffect(() => {
        // socket = io(ENDPOINT);
        // socket.on('connect', function (data) {
        //     console.log('socket connected');
        // });
        // let eventid = '32562500';
        // socket.on(eventid, (val) => {
        //     console.log(val);
        // });
        // let str = decrypteData("U2FsdGVkX1/4XoIO617xAu/Sr9B4z3f3B1KgKdysjq+pSrEJKhE6Ks9cLu9rLuZvWHETCgZniy2yNAdWHs7DJA==");
        // console.log("stringItem: ",str);
        // console.log("stringItem: ",str.messageST);
        let requestPayload = {
            "sid": "U2FsdGVkX1+sKKFVmTET3Xa2BdZKLxYpyTKV4SS/AZfQZpRHfJoUDndgfKdpDl2CNiHfXChMv/40MJJlBHji+Q==",
            "sportId": 4,
            "marketName": "Match Odds",
            "is_runnerId3_exist": 0,
            "userId": "URMILA1",
            "eventId": "32549923"
        };
        dispatch(getRiskEventListDownline(requestPayload)).then((response)=>{
            console.log(response);
          },(err)=>{
            console.log(err);
          });
    },[]);
    return (
        <>
        <h1>
            Hello Socket
        </h1>
        </>
    );
}
export default Socket