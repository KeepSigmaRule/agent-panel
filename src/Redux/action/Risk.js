import { withoutAuthAxios } from "../../Config/axios";

export const getRiskEventListV2 = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getRiskEventListV2", data)
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

export const getRiskEventList = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getRiskEventList", data)
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

export const getRiskEventListDownline = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getRiskEventListDownline", data)
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

export const getRiskFancyEventList = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/getRiskFancyEventList", data)
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

export const getMinMaxFromObject =  (obj) =>{
    let min = 0;
    let max = 0;
    if(Object.keys(obj).length > 0){
        let arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
        min = Math.min.apply( null, arr );
        max = Math.max.apply( null, arr );   
    }
    return {min:min,max:max};
}