import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountDownlines, getAgentLevelInfo } from '../../Redux/action/Downline';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
const RelatedDownline = (props) => {
    let dispatch = useDispatch();
    let { user } = useSelector(state => state.auth);
    let { puserBlocked, pbetBlocked, account_downlines } = useSelector(state => state.downline);

    const { bankingResponse, setactiveRows, refreshDownline, items, setItems, agents, setAgents } = props;



    let [totalAvailableBalance, settotalAvailableBalance] = useState(0);
    let [totalBalance, settotalBalance] = useState(0);
    let [totalExposure, settotalExposure] = useState(0);
    let [totalcfBalance, settotalcfBalance] = useState(0);
    let [totalReference_PL, setReference_PL] = useState(0);

    const selectBanking = (index, type) => {
        if (agents[index].banking_type && agents[index].banking_type == type) {
            agents[index].banking_type = '';
            agents[index].banking_amount = 0;
        }
        else {
            agents[index].banking_type = type;
        }
        dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: agents });
        countActiveRow();
    }

    const setBankingAmount = (index, amount) => {
        if (!agents[index].banking_type) {
            toast.info('Please choose banking option first');
        }
        else if ((parseFloat(amount) > parseFloat(agents[index].Balance)) && agents[index].banking_type == "W") {
            toast.info('Amount can not be more than Available D/W');
        }
        else {
            agents[index].banking_amount = amount;
            dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: agents });
            countActiveRow();
        }
    }

    const setBankingRemark = (index, remark) => {
        agents[index].banking_remark = remark;
        dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: agents });
        countActiveRow();
    }

    const copyAvailableBalance = (index) => {
        if (agents[index].banking_type == "W") {
            agents[index].banking_amount = parseFloat(agents[index].Balance.toString()).toFixed(2);
            dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: agents });
            countActiveRow();
        }
    }

    const countActiveRow = () => {
        let count = agents.filter((item) => {
            if (item.banking_type && item.banking_type != '' && item.banking_amount > 0) {
                return item;
            }
        })
        setactiveRows(count.length);
    }

    const calculateTotal = () => {
        const showItem = items.filter((i)=>!i.hide);
        settotalAvailableBalance(showItem.reduce((a, v) => a = a + v.AvlBalance, 0));
        settotalBalance(showItem.reduce((a, v) => a = a + v.Balance, 0));
        settotalExposure(showItem.reduce((a, v) => a = a + v.Exposure, 0));
        settotalcfBalance(showItem.reduce((a, v) => a = a + v.cfBalance, 0));
        setReference_PL(showItem.reduce((a, v) => a = a + v.Reference_PL, 0));
    }


    const getAccountDownlineList = () => {
        let downlineParam = {
            "id": user.id,
            "puserBlocked": 0,
            "pbetBlocked": 0,
            "searchvalue": "",
        };
        props.setLoading(true);
        dispatch(getAccountDownlines(downlineParam)).then((response) => {
            props.setLoading(false);
            let output = [];
            if (bankingResponse.length > 0) {
                //output = response.filter(({ clientid: id1 }) => bankingResponse.some(({ agentId: id2 }) => id2 === id1));
                output = response.map((itm) => {
                    if (bankingResponse.some(({ agentId: id2 }) => id2 === itm?.clientid)) {
                        itm.hide = false;
                    } else itm.hide = true;
                    return itm;
                })
            }
            else {
                output = response;
            }
            setItems(output);
            setAgents(response);
        }, (err) => {
            props.setLoading(false);
        });
    }

    useEffect(() => {
        getAccountDownlineList();
    }, [refreshDownline]);
    useEffect(() => {
        calculateTotal();
    }, [items]);
    return (
        <>
            <table id="table_transfer" className="table01 tab-transfer tab-banking">
                <tbody>
                    <tr>
                        <th id="userIdTH" width="" className="align-L sort-this">UID</th>
                        <th width="9%">Balance</th>
                        <th width="9%">Available D/W</th>
                        <th width="9%">Exposure</th>
                        <th width="230" className="align-C border-l" style={{ borderRight: "1px solid #7E97A7", borderLeft: "1px solid #7E97A7" }}>Deposit / Withdraw</th>
                        <th className="border-l">Credit Reference</th>
                        <th className="">Reference P/L</th>
                        <th width="10%" className="border-l" style={{ border: "1px solid #7E97A7" }}>Remark</th>
                        <th width="47" className="full-amount">
                            <Link to="" onClick={() => props.setshowLogs(true)} id="allLog" className="btn-send">All Log</Link>
                        </th>
                    </tr>
                </tbody>
                <tbody id="content">
                    {
                        items.map((item, index) => {
                            let agnetLevelInfo = {};
                            agnetLevelInfo = getAgentLevelInfo(item.level);
                            let cfBalance = (parseFloat(item.cfBalance).toFixed(2) >= 0) ? parseFloat(item.cfBalance).toFixed(2) : `(${parseFloat(Math.abs(item.cfBalance)).toFixed(2)})`;
                            let AvlBalance = (parseFloat(item.AvlBalance).toFixed(2) >= 0) ? parseFloat(item.AvlBalance).toFixed(2) : `(${parseFloat(Math.abs(item.AvlBalance)).toFixed(2)})`;
                            let Exposure = (parseFloat(item.Exposure).toFixed(2) >= 0) ? parseFloat(item.Exposure).toFixed(2) : `(${parseFloat(Math.abs(item.Exposure)).toFixed(2)})`;
                            let Reference_PL = (parseFloat(item.Reference_PL).toFixed(2) >= 0) ? parseFloat(item.Reference_PL).toFixed(2) : `(${parseFloat(Math.abs(item.Reference_PL)).toFixed(2)})`;

                            return (
                                <tr key={index} id="akshayddl" main_userid="akshayddl" style={{ display: `${(item.hide) ? 'none' : ''}` }}>
                                    <td className="td-uid" style={{ backgroundColor: "rgb(239, 239, 239)" }} id="userId"><i title={item.statusDescription} className={`fa ${item.statusClass}`} aria-hidden="true"></i><span className="order">{index + 1}.</span><span style={{ marginTop: '4px' }} className={`lv_${(item.level < 6) ? item.level : 0}`}>{agnetLevelInfo.level_text}</span>{item.clientid}</td>
                                    <td id="availableBalance" style={{ backgroundColor: "rgb(239, 239, 239)" }}>{user.level=="5"? parseFloat(item.Balance).toFixed(2):AvlBalance}</td>

                                    <td id="balance" style={{ backgroundColor: "rgb(223, 223, 223)" }}>{user.level=="5"? parseFloat(AvlBalance).toFixed(2):parseFloat(item.Balance).toFixed(2)}</td>

                                    <td id="userExposure" className="red" style={{ backgroundColor: "rgb(223, 223, 223)" }} >{Exposure}</td>
                                    <td className="DW-amount" style={{ backgroundColor: "rgb(239, 239, 239)" }}>
                                        <ul className={`btn_list-DW select-${item.banking_type}`}>
                                            <li><Link to="" onClick={() => selectBanking(index, 'D')} id="dBtn" className="btn" >D</Link></li>
                                            <li><Link to="" onClick={() => selectBanking(index, 'W')} id="wBtn" className="btn" >W</Link></li>
                                        </ul>
                                        <input id={"amount" + index} onChange={(e) => setBankingAmount(index, e.target.value)} className={`type-${(item.banking_type == "W") ? 'w' : ''}`} name="amount" value={(item.banking_amount) ? item.banking_amount : ''} type="number" placeholder="0" maxLength="18" />
                                        <Link to="" id="fullBtn" onClick={() => copyAvailableBalance(index)} className={`btn float-L ${(item.banking_type == "W") ? '' : 'disable'}`} >Full</Link>
                                    </td>
                                    <td className="credit-amount" style={{ width: '170px', backgroundColor: "rgb(239, 239, 239)" }}>{cfBalance}</td>
                                    <td id="userReferencePL" style={{ backgroundColor: "rgb(223, 223, 223)" }} className={`${(item.Reference_PL < 0) ? 'red' : ''}`}>{Reference_PL}</td>
                                    <td className="border-l" style={{ backgroundColor: "rgb(239, 239, 239)", borderLeft: "1px solid #7E97A7" }} >
                                        <input onChange={(e) => setBankingRemark(index, e.target.value)} id={"remark" + index} value={(item.banking_remark) ? item.banking_remark : ''} className="" type="text" placeholder="Remark" />
                                    </td>
                                    <td className="full-amount" style={{ backgroundColor: "rgb(223, 223, 223)" }}  >
                                        <Link to="" onClick={() => { props.setselectedAgentId(item.clientid); props.setselectedAgentLevel(item.level); props.setshowDownlineLogs(true) }} id="log" className="btn">Log</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr id="totalTempTr" style={{ backgroundColor: "#e5e7e8" }} className="total">
                        <td className="align-L">Total</td>
                        <td id="totalBalance">{parseFloat(totalAvailableBalance).toFixed(2)}</td>
                        <td id="totalAvailableBalance">{parseFloat(totalBalance).toFixed(2)}</td>
                        <td id="totalExposure"><span className={`${(totalExposure < 0) ? 'red' : ''}`}>{(totalExposure > 0) ? parseFloat(Math.abs(totalExposure)).toFixed(2) : `(${parseFloat(Math.abs(totalExposure)).toFixed(2)})`}</span></td>
                        <td id="totalCreditReference" className={`${(totalcfBalance < 0) ? 'red' : ''}`} colSpan="2">{(totalcfBalance > 0) ? parseFloat(Math.abs(totalcfBalance)).toFixed(2) : `(${parseFloat(Math.abs(totalcfBalance)).toFixed(2)})`}</td>
                        <td id="totalReferencePL" className={`${(totalReference_PL < 0) ? 'red' : ''}`}>{(totalReference_PL > 0) ? parseFloat(Math.abs(totalReference_PL)).toFixed(2) : `(${parseFloat(Math.abs(totalReference_PL)).toFixed(2)})`}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default RelatedDownline