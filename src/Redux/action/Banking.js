import { withoutAuthAxios } from "../../Config/axios"
export const makeBankingPayment = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        let url = (data.agentLevel<5)?'/api/agent/agentBanking':'/api/agent/playerBankingV2';
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