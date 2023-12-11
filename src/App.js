import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Downline from './Components/Downline';
import MyAccount from './Components/MyAccount';
import Banking from './Components/Banking';
import AgentAccount from './Components/AgentAccount';
import ProfitLossDownline from './Components/ProfitLossDownline';
import ProfitLossMarket from './Components/ProfitLossMarket';
import BetList from './Components/BetList';
import BettingListOpen from './Components/RiskManagement/BettingListOpen';
import AgentAccountOpen from './Components/RiskManagement/AgentAccountOpen';
import BetListLive from './Components/BetListLive';
import RiskManagement from './Components/RiskManagement';
import Login from './Components/Login';
// import './css/Indibet.css';
// import './css/Fullmarket.css';
// import './css/Login.css';
// import './css/Style.css';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/downline' element={<Downline/>}></Route>
        <Route path='/my-account' element={<MyAccount/>}></Route>
        <Route path='/banking' element={<Banking/>}></Route>
        <Route path='/bets' element={<BetList/>}></Route>
        <Route path='/live-bets' element={<BetListLive/>}></Route>
        <Route path='/agent-account' element={<AgentAccount/>}></Route>
        <Route path='/my-report/profit-loss-downline' element={<ProfitLossDownline/>}></Route>
        <Route path='/my-report/profit-loss-market' element={<ProfitLossMarket/>}></Route>
        <Route path='/risk-management' element={<RiskManagement/>}></Route>
        <Route path='/BettingListOpen' element={<BettingListOpen/>}></Route>
        <Route path='/AgentAccountOpen' element={<AgentAccountOpen/>}></Route>
      </Routes>
      <ToastContainer autoClose={5000} position="top-center"/>
    </>
  );
}

export default App;
