import { withoutAuthAxios } from "../../Config/axios";

export const getAgentLevelInfo = (account_level) => {
    let level_info_array = [
        {level_text:'SADM',agent_level:1,level_no:0},
        {level_text:'ADM',agent_level:2,level_no:1},
        {level_text:'SA',agent_level:3,level_no:2},
        {level_text:'SS',agent_level:4,level_no:3},
        {level_text:'SUP',agent_level:5,level_no:4},
        {level_text:'MA',agent_level:6,level_no:5},
        {level_text:'PL',agent_level:6,level_no:6},
        {level_text:'PL',agent_level:6,level_no:6},
    ];
    return level_info_array[account_level];
}

export const getAgentStatusInfo = (item) => {
    let status = 0;
    if(item.userBlocked == 0 && item.betBlocked == 0){
        status = 1;
    }
    else if(item.userBlocked == 0 && item.betBlocked == 1){
        status = 2;
    }
    else{
        status = 3;
    }
    return status;
}

export const getStatusSearchParams = status => {
    let params = {};
    switch(status){
        case '1':{
            params['puserBlocked'] = 0;
            params['pbetBlocked'] = 0;
        } break;
        case '2':{
            params['puserBlocked'] = 0;
            params['pbetBlocked'] = 1;
        } break;
        case '3':{
            params['puserBlocked'] = 1;
            params['pbetBlocked'] = 1;
        } break;
        default:{
            params['puserBlocked'] = -1;
            params['pbetBlocked'] = -1;
        }
    }

    return params;
}

export const getAccountDownlines = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/NewOnegetDownlineBelowDetaliInfo", data)
            .then(
                response => {
                    if (response.status === 200) {
                       _dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: response.data ? Object.values(response.data) : [] });
                       resolve(Object.values(response.data));
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const getAccountSelfDownline = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getDownlineselfDetaliInfo", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(Object.values(response.data)[0]);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const addNewAgent = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        let url = (data.level===6)?'/api/agent/NewaddClient':'/api/agent/NewaddAgent';
        await withoutAuthAxios().post(url, data)
            .then(async (response) => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const updateCreditAgent = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/updateCreditAgent", data)
            .then(async (response) => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const updateAgentStatus = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        let url = (data.level>5)?'/api/agent/NewupdateStatusClient':'/api/agent/NewupdateStatusAgent';
        await withoutAuthAxios().post(url, data)
            .then(async (response) => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const searchDowlineByStatus = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newOneEgetDownlineDetaliInfo", data)
            .then(async (response) => {
                    if (response.status === 200) {
                        _dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: response.data ? Object.values(response.data) : [] });
                        _dispatch({ type: "PUSERBLOCKED_UPDATE", payload: data.puserBlocked });
                        _dispatch({ type: "PBETBLOCKED_UPDATE", payload: data.pbetBlocked });
                       resolve(Object.values(response.data));
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const searchDowlineByStatusV2 = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/NewOnegetDownlineBelowDetaliInfo", data)
            .then(async (response) => {
                    if (response.status === 200) {
                        _dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: response.data ? Object.values(response.data) : [] });
                        _dispatch({ type: "PUSERBLOCKED_UPDATE", payload: data.puserBlocked });
                        _dispatch({ type: "PBETBLOCKED_UPDATE", payload: data.pbetBlocked });
                       resolve(Object.values(response.data));
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const searchDowlineByValue = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        console.log(data);
        await withoutAuthAxios().post("/api/agent/searchvalueDownlineList", data)
            .then(async (response) => {
                    if (response.status === 200) {
                       // _dispatch({ type: "ACCOUNT_DOWNLINE_UPDATE", payload: response.data ? Object.values(response.data) : [] });
                       resolve(Object.values(response.data));
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const searchUpline = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        console.log(data);
        await withoutAuthAxios().post("/api/agent/searchUpline", data)
            .then(async (response) => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const getDownlineProfitLoss = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newagentDownlinePl", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const getMarketProfitLoss = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/marketPl", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(Object.values(response.data));
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}

export const showpassword = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/showpassword", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        reject(response.data);
                    }
                },
                error => {
                    reject(error);
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                    reject(error.message);
                }
            )
    })
}