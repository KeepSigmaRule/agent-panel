import React,{useState,useEffect} from 'react';
import {useSearchParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getRiskFancyEventList } from '../../Redux/action/Risk';
import IsLoadingHOC from '../IsLoadingHOC';
import Header from '../Header';
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
const FancyBookingOpen = (props) => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams()
    let requestPayload = searchParams.get('event');
    requestPayload = atob(requestPayload);
    requestPayload = JSON.parse(requestPayload);
    let { isLoading, setLoading } = props;
    let [winAmmount,setwinAmmount] = useState([]);
    useEffect(() => {
        setLoading(true);
        dispatch(getRiskFancyEventList(requestPayload)).then((response)=>{
            if(response.items.length>0){
                let runs = response.items[0].run;
                let item = [];
                for (let run in runs){
                    item[run] = runs[run];
                }
                setwinAmmount(item);
                setLoading(false);
            }
          },(err)=>{
            setLoading(false);
            toast.error(err);
          });
       },[]);
    return (
        <>
        <Header/>
        <div id="mainWrap" className="main_wrap risk-responsive">
        <table id="matchTable" className="table-s" style={{display:'table'}}>
        <caption id="matchedTitle">{requestPayload.selectedItem.event_name}<span> | {requestPayload.selectedItem.selection_name}</span></caption>
            <table className="table01 tab-depth">
            <thead>
            <tr>
                <th className="align-L" style={{width:'50%'}}>Run</th>
                <th className="border-l" style={{width:'50%'}}>Amount</th>
            </tr>
            </thead>
            <tbody >
            {winAmmount.length > 0 && winAmmount.map((item,index)=>{
                let amount = (parseFloat(item).toFixed(2) >= 0)?parseFloat(item).toFixed(2):`(${parseFloat(Math.abs(item)).toFixed(2)})`;
                return(
                    <tr>
                        <td className={`${(parseFloat(item).toFixed(2) < 0)?'align-L lay':'align-L back'}`}>{index}</td>
                        <td className={`${(parseFloat(item).toFixed(2) < 0)?'lay':'back'}`} ><span className={`${(parseFloat(item).toFixed(2) < 0)?'red':''}`}>{amount}</span></td>
                    </tr>
                );
            })}
            </tbody>
            </table>
            </table>
    </div>
        </>
    );
}
export default IsLoadingHOC(FancyBookingOpen)