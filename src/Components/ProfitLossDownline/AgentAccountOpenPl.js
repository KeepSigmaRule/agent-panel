import React,{useState,useEffect} from 'react';
import {useSearchParams } from 'react-router-dom';
import AgentPath from "./AgentPath";
import { useSelector,useDispatch } from 'react-redux';
import BettingProfitLoss from "../ProfitLossDownline/BettingProfitLoss";
import BettingHistory from "../ProfitLossDownline/BettingHistory";
import IsLoadingHOC from '../IsLoadingHOC';
import Header from '../Header';
import "react-datepicker/dist/react-datepicker.css";
const AgentAccountOpenPl = (props) => {
    const dispatch = useDispatch();
    let { isLoading, setLoading } = props;
    let [searchParams, setSearchParams] = useSearchParams()
    let {pl_agent_path} = useSelector(state=>state.auth);
    let [select,setselect] = useState(1);
    let selectedItem = searchParams.get('event');
    selectedItem = atob(selectedItem);
    selectedItem = JSON.parse(selectedItem);

    return (
        <>
        <Header/>
        <div id="mainWrap" className="main_wrap risk-responsive">
            <table id="matchTable" className="table-s" style={{display:'table'}}>
            <AgentPath enable={false} selectedItem={selectedItem}/>
            <div className='nextTabOpen'>
            <>
              <ul className="tab col2">
              <li className="bet-histo"><a onClick={() => { setselect(1) }} className={`${(select === 1) ? "select" : ""}`}>Bets History </a> </li>
              <li className="bet-histo"><a onClick={() => { setselect(2) }} className={`${(select === 2) ? "select" : ""}`}>Profit & Loss </a></li>
              </ul>
              {select === 1 && <BettingHistory setLoading={setLoading} selectedItem={selectedItem}/>}
              {select === 2 && <BettingProfitLoss setLoading={setLoading} selectedItem={selectedItem}/>}
            </>
            </div>
            </table>
    </div>
        </>
    );
}
export default IsLoadingHOC(AgentAccountOpenPl)