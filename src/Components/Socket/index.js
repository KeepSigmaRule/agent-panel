import React,{useState,useEffect} from 'react';
import { decrypteData } from '../../Redux/action/Auth';
const Socket = (props) => {
    const io = require('socket.io-client');
    let ENDPOINT = "https://nginx9.com:2096";
    let socket;
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on('connect', function (data) {
            console.log('socket connected');
        });
        let eventid = '32562500';
        socket.on(eventid, (val) => {
            console.log(val);
        });
        let str = decrypteData("U2FsdGVkX189WCkQXPiP3cw2qTz6qnYpJLtDlotPGTsNSOrZBU4+JdeprCxtKedFfOlh64B1AMwlwyDyNyVlZA==");
        console.log("stringItem: ",str.messageST);
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