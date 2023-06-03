import { withoutAuthAxios } from "../../Config/axios"
export const getLiveBetList = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post('/api/agent/agentLiveBetList', data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(Object.entries(response.data));
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

export const getBetList = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post('/api/agent/getBetList', data)
            .then(
                response => {
                    if (response.status === 200) {
                       resolve(response.data.items);
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

export const getMatchName = eventType => {
    let matchName = '';
    switch(eventType){
        case '1':{
            matchName = 'SOCCER';
        } break;
        case '2':{
            matchName = 'TENNIS';
        } break;
        case '4':{
            matchName = 'CRICKET';
        } break;
        default:{
            matchName='';
        }
    }

    return matchName;
}

export const getRunnerOddsLiability = item => {
    let result = {};
    switch(item.betType){
        case 'fancy':{
            result['runner'] = item.runnerName;
            result['odds'] = item.rate+'/'+ parseFloat(item.teamName*100).toFixed(0);
            result['liability'] = (item.type === 'NO')?parseFloat(parseFloat(item.teamName)*parseFloat(item.amount)).toFixed(2):'-';
        } break;
        case 'match':{
            result['runner'] = (item.teamName == 'A')?item.runnerName1:(item.teamName == 'B')?item.runnerName2:'The Draw';
            result['odds'] = parseFloat(parseFloat(item.rate) + 1).toFixed(2);
            result['liability'] = (item.type === 'KHAI')?parseFloat(parseFloat(item.rate)*parseFloat(item.amount)).toFixed(2):'-';
        } break;
    }
    result['matchtype'] = (item.type === 'LAGAI')?'BACK':(item.type === 'KHAI')?'LAY':item.type;

    return result;
}