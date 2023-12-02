
let initialState = {
    user: "",
    token: "",
    agent_path: [],
    pl_agent_path: []
}


export default function auth(state = initialState, action) {
    switch (action.type) {
        case "AGENT_PATH_PUSH":{
            return { ...state, agent_path: [...state.agent_path,action.payload] }
        } break;
        case "AGENT_PATH_POP":{
            return { ...state, agent_path: action.payload }
        } break;
        case "PL_AGENT_PATH_PUSH":{
            return { ...state, pl_agent_path: [...state.pl_agent_path,action.payload] }
        } break;
        case "PL_AGENT_PATH_POP":{
            return { ...state, pl_agent_path: action.payload }
        } break;
        case "USER_DATA_UPDATE":
            return { ...state, user: action.payload }
        case "SAVE_TOKEN":
            return { ...state, token: action.payload }  
        case "LOGOUT":
            return { ...state, user: "", token: "" }
        default:
            return state
    }
}