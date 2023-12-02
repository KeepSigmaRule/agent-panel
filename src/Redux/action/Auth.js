import { withoutAuthAxios } from "../../Config/axios"
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

export const login = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/newagentLogin", data)
            .then(async (response) => {
                    if (response.status === 200) {
                       _dispatch({ type: "SAVE_TOKEN", payload: response.data ? response.data : null });
                       resolve(response.data);
                    }
                    else{
                        console.log(response.data);
                        reject(response.data);
                    }
                },
                error => {
                    reject(error.message);
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

export const checkToken = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/CheckToken", data)
            .then(async (response) => {
                    if (response.status === 200) {
                       resolve(response.data);
                    }
                    else{
                        console.log(response.data);
                        reject(response.data);
                    }
                },
                error => {
                    reject(error.message);
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

export const getAccountDetail = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/agent/NewagentInfo", data)
            .then(
                response => {
                    if (response.status === 200) {
                        let id = '';
                        let level_text = '';
                        let agent_level_text = '';
                        let agent_level = 0;
                        let level_no = 0;
                        switch(response.data.level){
                            case 0:{
                                level_text = 'SADM';
                                agent_level = 1;
                                agent_level_text = 'Admin';
                                level_no = 0;
                            } break;
                            case 1:{
                                level_text = 'ADM';
                                agent_level = 2;
                                agent_level_text = 'Sub Admin';
                                level_no = 1;
                            } break;
                            case 2:{
                                level_text = 'SA';
                                agent_level = 3;
                                agent_level_text = 'Senior Super';
                                level_no = 2;
                            } break;
                            case 3:{
                                level_text = 'SS';
                                agent_level = 4;
                                agent_level_text = 'Super';
                                level_no = 3;
                            } break;
                            case 4:{
                                level_text = 'SUP';
                                agent_level = 5;
                                agent_level_text = 'Master';
                                level_no = 4;
                            } break;
                            case 5:{
                                level_text = 'MA';
                                agent_level = 6;
                                agent_level_text = 'Player';
                                level_no = 5;
                            } break;
                            case 6:{
                                level_text = 'PL';
                                agent_level = 7;
                                level_no = 6;
                            } break;
                        }
                        response.data.level_text = level_text;
                        response.data.agent_level = agent_level;
                        response.data.agent_level_text = agent_level_text;
                        response.data.level_no = level_no;
                       _dispatch({ type: "USER_DATA_UPDATE", payload: response.data ? response.data : null });
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

export const forgotPassword = data => async _dispatch => {
    return new Promise(async (resolve, reject) => {
        await withoutAuthAxios().post("/api/users/forgot_password", data)
            .then(
                response => {
                    resolve(response.data)
                },
                error => {
                    reject(error)
                }
            )
            .catch(
                error => {
                    console.log("errorrrr", error);
                }
            )
    })
}

export const logOut = () => _dispatch => {
    return (
        _dispatch({ type: "LOGOUT" })
    )
}


export const decrypteData = (data) => {
    const secretKey = '2T26zVMP8pckeWY5';
    var bytes = CryptoJS.AES.decrypt(data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}