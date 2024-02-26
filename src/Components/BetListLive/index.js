import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Transparent from '../../images/transparent.gif';
import { getLiveBetList, getMatchName, getRunnerOddsLiability, updateLiveBetsStatus } from '../../Redux/action/BetList';
import Header from '../Header';
import VoidBets from './VoidBets';
import IsLoadingHOC from '../IsLoadingHOC';
import Pagination from '../Pagination';
import { useSelector, useDispatch } from 'react-redux';

const BetListLive = (props) => {
    const dispatch = useDispatch();
    let { token, user } = useSelector(state => state.auth);
    let { isLoading, setLoading } = props;
    let [nTran, setnTran] = useState(100);
    let [sortValue, setsortValue] = useState('betTime');
    let [sortType, setsortType] = useState('desc');
    let [eventType, seteventType] = useState('Cricket');
    let [betStatus, setbetStatus] = useState('1');
    let [betStatusResult, setbetStatusResult] = useState('1');
    let [searchUserId, setsearchUserId] = useState('');
    let [refreshInterval, setrefreshInterval] = useState(60);
    let [refreshStatus, setrefreshStatus] = useState(false);

    let [itemsBucket, setitemsBucket] = useState([]);
    let [items, setItems] = useState([]);
    let [totelCount, settotelCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(nTran);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [matchBets, setmatchBets] = useState([]);
    const [fancyBets, setfancyBets] = useState([]);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setSelectedItem(items.map(li => li.id));
        let fancyBetsArray = [];
        let matchBetsArray = [];
        items.map(li => {
            if (li.betType == "match") {
                matchBetsArray.push(li.id);
            }
            else {
                fancyBetsArray.push(li.id);
            }
        });
        setmatchBets(matchBetsArray);
        setfancyBets(fancyBetsArray);
        if (isCheckAll) {
            setSelectedItem([]);
            setmatchBets([]);
            setfancyBets([]);
        }

    };

    const handleSelectItem = (e, item) => {
        let checked = e.target.checked;
        if (checked) {
            setSelectedItem([...selectedItem, item.id]);
            if (item.betType == "match") {
                setmatchBets([...matchBets, item.id]);
            }
            else {
                setfancyBets([...fancyBets, item.id]);
            }
        }
        else {
            setSelectedItem(selectedItem.filter(id => id !== item.id));
            if (item.betType == "match") {
                setmatchBets(matchBets.filter(id => id !== item.id));
            }
            else {
                setfancyBets(fancyBets.filter(id => id !== item.id));
            }
        }
    };

    const handleVoidBets = () => {
        setvoidBet(!voidBet);
    }

    let [voidBet, setvoidBet] = useState(false);
    let params = {
        sid: token,
        sortValue: sortValue,
        sortType: sortType,
        nTran: nTran,
        eventType: eventType,
        betStatus: betStatus,
        searchUserId: searchUserId.trim()
    }

    const refresh = () => {
        setLoading(true);
        dispatch(getLiveBetList(params)).then((response) => {
            console.log(response);
            setLoading(false);
            setbetStatusResult(betStatus);
            setitemsBucket(response);
            settotelCount(response.length);
            setSelectedItem([]);
            setmatchBets([]);
            setfancyBets([]);
            setcurrentPage(1);
        }, (err) => {
            setLoading(false);
            console.log("getAccountDownlines err", err);
        });
    }

    useEffect(() => {
        if (refreshStatus) {
            if (refreshInterval > 0) {
                const interval = setInterval(() => {
                    refresh();
                }, refreshInterval * 1000);
                return () => clearInterval(interval);
            }
        }
        else {
            refresh();
            setrefreshStatus(true);
        }
    }, [refreshInterval, refreshStatus, eventType, sortValue, sortType, nTran, betStatus]);

    useEffect(() => {
        let start = (currentPage - 1) * itemsPerPage;
        let end = (currentPage) * (itemsPerPage);
        let visibleItems = [];
        visibleItems = itemsBucket.filter((item, index) => {
            if (index >= start && index < end) {
                return item;
            }
        });
        setItems(visibleItems);
    }, [currentPage, itemsBucket]);


    return (
        <>
            <Header />
            {voidBet && <VoidBets refresh={refresh} handleVoidBets={handleVoidBets} isCheck={selectedItem} setIsCheck={setSelectedItem} matchBets={matchBets} fancyBets={fancyBets} setmatchBets={setmatchBets} setfancyBets={setfancyBets} updateLiveBetsStatus={updateLiveBetsStatus} />}
            <div id="mainWrap" className="main_wrap risk-responsive">
                <h2>Bet List Live</h2>
                <div className="function-wrap clearfix">
                    <ul className="input-list boxsetting">
                        <li id="eventRadioBtnList">
                            <label for="events_4" onClick={(e) => { seteventType(e.target.value) }}>
                                <input type="checkbox" name="events" id="events_4" checked={eventType === 'Cricket'} value="Cricket" />
                                Cricket
                            </label>
                            <label for="events_1" onClick={(e) => { seteventType(e.target.value) }}>
                                <input type="checkbox" name="events" id="events_1" checked={eventType === 'Soccer'} value="Soccer" />
                                Soccer
                            </label>
                            <label for="events_2" onClick={(e) => { seteventType(e.target.value) }}>
                                <input type="checkbox" name="events" id="events_2" checked={eventType === 'Tennis'} value="Tennis" />
                                Tennis
                            </label>
                            <label for="events_2" onClick={(e) => { seteventType(e.target.value) }}>
                                <input type="checkbox" name="events" id="events_2" checked={eventType === 'Fancy'} value="Fancy" />
                                Fancy
                            </label>

                            <label for="events_2" onClick={(e) => { seteventType(e.target.value) }}>
                                <input type="checkbox" name="events" id="events_2" checked={eventType === 'sportbook'} value="sportbook" />
                                Sportbook
                            </label>
                        </li>
                    </ul>
                    <ul className="input-list boxsetting" style={{ float: 'left' }}>
                        <li>
                            <label>PL Id:</label>
                            <input type="text" value={searchUserId} onChange={(e) => { setsearchUserId(e.target.value) }} />
                        </li>
                        <li>
                            <label>Order of display:</label>
                            <select name="sortCondition" id="sortCondition" onChange={(e) => { setsortValue(e.target.value) }} defaultValue={sortValue}>
                                <option value="amount">Stake</option>
                                <option value="betTime">Time</option>
                            </select>
                            <label> of </label>
                            <select name="orderByClause" id="orderByClause" onChange={(e) => { setsortType(e.target.value) }} defaultValue={sortType}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </li>
                        <li>
                            <label>Last:</label>
                            <select name="limit" id="limit" onChange={(e) => { setnTran(e.target.value) }} defaultValue={nTran}>
                                <option value={100}>100 Txn</option>
                                <option value={250}>250 Txn</option>
                                <option value={500}>500 Txn</option>
                                <option value={750}>750 Txn</option>
                                <option value={1000}>1000 Txn</option>
                            </select>
                        </li>
                        <li>
                            <label>Auto Refresh (Seconds)</label>
                            <select name="refreshTime" id="refreshTime" defaultValue={refreshInterval} onChange={(e) => { setrefreshInterval(e.target.value) }}>
                                <option value={0}>Stop</option>
                                <option value={60}>60</option>
                                <option value={30}>30</option>
                            </select>
                        </li>
                        <li>
                            <label>Bet Status:</label>
                            <select name="betStatus" id="betStatus" onChange={(e) => { setbetStatus(e.target.value) }}>
                                <option value="1" selected={betStatus === '1'}>Matched</option>
                                <option value="3" selected={betStatus === '3'}>Void</option>
                            </select>
                        </li>
                        <li><Link to="#" onClick={() => { refresh() }} style={{ width: '60px' }} className="btn-send" id="betListLiveRefresh">Refresh</Link></li>
                    </ul>
                    <div class="rightcontbtndelt">
                        {selectedItem.length > 0 && <Link to="#" style={{ width: '60px' }} onClick={() => { handleVoidBets() }} className="btn-send" id="betListLiveRefresh">Delete</Link>}
                    </div>
                </div>
                {/* <table id="unMatchTable" className="table-s" style={{ display: 'table' }}><caption id="unMatchedTitle">UnMatched</caption><p className="no-data">You have no bets in this time period.</p></table>
            <table id="pendingTable" className="table-s" style={{ display: 'table' }}><caption id="pendingTitle">Pending</caption><p className="no-data">You have no bets in this time period.</p></table> */}
                <table id="matchTable" className="table-s" style={{ display: 'table' }}><caption id="matchedTitle">Matched</caption>
                    <table id="matchTable" className="table-s" style={{ display: 'table' }}>
                        <tbody>
                            <tr>
                                {betStatusResult != 3 && <th width="2%" className="align-L"><input type="checkbox" id="betlivevalcheck" onChange={() => { handleSelectAll() }} checked={isCheckAll} /></th>}
                                {[0, 1].includes(user.level) && <th width="8%" className="align-L">SA ID</th>}
                                {[0, 1, 2].includes(user.level) && <th width="8%" className="align-L">SS ID</th>}
                                {[0, 1, 2, 3].includes(user.level) && <th width="8%" className="align-L">SUP ID</th>}
                                {[0, 1, 2, 3, 4].includes(user.level) && <th width="8%" className="align-L">MA ID</th>}
                                <th width="8%" className="align-L">PL ID</th>
                                <th width="5%" className="align-L">Bet ID</th>
                                <th id="betTime" width="6%" className="align-L">Bet taken</th>
                                <th width="7%" className="align-L">IP Address</th>
                                <th width="7%" className="align-L">ISP</th>
                                <th width="" className="align-L">Market</th>
                                <th width="7%" className="align-L">Selection</th>
                                <th width="4%" className="align-C">Type</th>
                                <th width="4%">Odds req.</th>
                                <th width="8%">Stake</th>
                                <th width="5%">Liability</th>
                                {/* <th width="5%" id="unMatchedLastPrice_title" className="text-right">UnMatchedLastPrice</th>
                            <th width="5%" id="matchedLastPrice_title" className="text-right">MatchedLastPrice</th>
                            <th width="5%" id="oddsDifferential_title" className="text-right">OddsDifferential</th> */}
                            </tr>
                            {items.length > 0 && items.map((item, index) => {

                                let matchName = getMatchName(item.eventType);
                                let itemInfo = getRunnerOddsLiability(item);
                                return (
                                    <tr key={index} id="matchRow0" style={{ display: 'table-row' }}>
                                        {betStatusResult != 3 && <th width="2%" className="align-L" ><input type="checkbox" onChange={(event) => { handleSelectItem(event, item) }} checked={selectedItem.includes(item.id)} /></th>}
                                        {[0, 1].includes(user.level) && <td id="agentUserId1" className="align-L" >{item.agentList.agentList.level2}</td>}
                                        {[0, 1, 2].includes(user.level) && <td id="agentUserId2" className="align-L" >{item.agentList.agentList.level3}</td>}
                                        {[0, 1, 2, 3].includes(user.level) && <td id="agentUserId3" className="align-L" >{item.agentList.agentList.level4}</td>}
                                        {[0, 1, 2, 3, 4].includes(user.level) && <td id="agentUserId3" className="align-L" >{item.agentList.agentList.level5}</td>}
                                        <td id="playerId" className="align-L">{item.clientId}</td>
                                        <td className="align-L"><Link to="" id="betID" href="javascript: void(0);">{item.id}</Link></td>
                                        <td className="align-L"><span id="betPlaced" className="small-date">{item.betTime}</span></td>
                                        <td id="agentUserId1" className="align-L" >{(item.IPAddress) ? item.IPAddress : 'NA'}</td>
                                        <td id="agentUserId1" className="align-L" >{(item.ISP) ? item.ISP : 'NA'}</td>
                                        <td id="matchTitle" className="align-L">{matchName}<img className="fromto" src={Transparent} /><strong>{item.eventName}</strong><img className="fromto" src={Transparent} />{item.betType == 'match' ? item.marketName : 'FANCY_BET'}</td>
                                        <td id="matchSelection" className="align-L"><Link to="">{itemInfo.runner}</Link></td>
                                        <td className="align-C"><span id="matchType" className={`${item.type === 'LAGAI' || item.type === 'YES' ? "back" : "lay"}`}>{itemInfo.matchtype}</span></td>
                                        <td id="matchOddsReq">{itemInfo.odds} </td>
                                        <td id="matchStake">{parseFloat(item.amount).toFixed(2)}</td>
                                        <td id="liability">
                                            {
                                                itemInfo.liability ?
                                            betStatusResult != 3 ? <span className="red">{itemInfo.liability === '-' ? itemInfo.liability : `(${itemInfo.liability})`}</span> : 'Void'
                                            :null}
                                        </td>
                                        {/* <td id="agentUserId1" className="align-L" >UnMatchedLastPrice</td> 
                                <td id="agentUserId1" className="align-L" >MatchedLastPrice</td> 
                                <td id="agentUserId1" className="align-L" >OddsDifferential</td>  */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totelCount={totelCount}
                    currentPage={currentPage}
                    maxPageNumberLimit={maxPageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                    setcurrentPage={setcurrentPage}
                    setmaxPageNumberLimit={setmaxPageNumberLimit}
                    setminPageNumberLimit={setminPageNumberLimit}
                />
            </div>
        </>
    )
}

export default IsLoadingHOC(BetListLive)