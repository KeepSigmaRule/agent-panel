import React,{useState,useEffect} from 'react';
import {useSearchParams } from 'react-router-dom';
import AgentPath from "../RiskManagement/AgentPath";
import BettingProfitLoss from "../RiskManagement/BettingProfitLoss";
import BettingHistory from "../RiskManagement/BettingHistory";
import IsLoadingHOC from '../IsLoadingHOC';
import Header from '../Header';
import "react-datepicker/dist/react-datepicker.css";
const AgentAccountOpen = (props) => {
    let [searchParams, setSearchParams] = useSearchParams()
    let selectedItem = searchParams.get('event');
    selectedItem = atob(selectedItem);
    selectedItem = JSON.parse(selectedItem);
    let { isLoading, setLoading } = props;
    let [agentList,setagentList] = useState(selectedItem);
    let [select,setselect] = useState(1); 

    return (
        <>
        <Header/>
        <div id="mainWrap" className="main_wrap risk-responsive">
            <table id="matchTable" className="table-s" style={{display:'table'}}>
            <AgentPath agentList={agentList}/>
            <>
              <ul className="tab col2">
              <li className="bet-histo"><a onClick={() => { setselect(1) }} className={`${(select === 1) ? "select" : ""}`}>Bets History </a> </li>
              <li className="bet-histo"><a onClick={() => { setselect(2) }} className={`${(select === 2) ? "select" : ""}`}>Profit & Loss </a></li>
              </ul>
              {select === 1 && <BettingHistory setLoading={setLoading} selectedItem={selectedItem}/>}
              {select === 2 && <BettingProfitLoss setLoading={setLoading} selectedItem={selectedItem}/>}
            </>
            </table>
    </div>
        </>
    );
}
export default IsLoadingHOC(AgentAccountOpen)