import { withoutAuthAxios } from "../../Config/axios";

export const getAccountStatement = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newmyAccountStatement", data)
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

export const getProfile = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/myProfile", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data[0]);
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

export const changePassword = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newchangeOwnPassword", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data[0]);
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

export const getActivityLog = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/myactivitylog", data)
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

export const getAgentAccountSummary = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        let url = (data.agentLevel<6)?'/api/agent/newagentAccountSummary':'/api/agent/newclientAccountSummary';
        await withoutAuthAxios().post(url, data)
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

export const changeAgentPassword = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newchangeAgentPassword", data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data[0]);
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

export const getAgentAccountStatement = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        let url = (data.agentLevel<6)?'/api/agent/newagentAccountStatement':'/api/agent/newclientTransHistory';
        await withoutAuthAxios().post(url, data)
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

export const getClientProfitLoss = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newprofitLossClient", data)
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

export const getClientCasinoProfitLoss = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/clientcasinoProfitLoss", data)
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

export const getClientBetHistory = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/betHistoryClient", data)
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


export const getTopTenMatchAmount = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getTopTenMatchAmount", data)
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

export const getTopTenExposure = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getTopTenExposure", data)
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
    
export const getAgentLevelText = level =>{
    let level_text = '';
    switch(level){
        case 0:{
            level_text = 'SADM';
        } break;
        case 1:{
            level_text = 'ADM';
        } break;
        case 2:{
            level_text = 'SA';
        } break;
        case 3:{
            level_text = 'SS';
        } break;
        case 4:{
            level_text = 'SUP';
        } break;
        case 5:{
            level_text = 'MA';
        } break;
        case 6:{
            level_text = 'PL';
        } break;
    }
    return level_text;
}

export const getFilterAgentList = agentList => {
    let agentArray = [];
    for (var key in agentList) {
        let level = key.split("level");
        level = level[1];
        let agent = {};
        agent['level'] = (level)?parseInt(level):6;
        agent['level_text'] = getAgentLevelText(agent['level']);
        agent['id'] = agentList[key];
        agentArray.push(agent);
    }
    agentArray.reverse();
    return agentArray;
}