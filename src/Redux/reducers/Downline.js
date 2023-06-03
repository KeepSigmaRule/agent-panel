
let initialState = {
    account_downlines: [],
    search_params:"",
    puserBlocked:0,
    pbetBlocked:0
    
}


export default function downline(state = initialState, action) {
    switch (action.type) {
        case "ACCOUNT_DOWNLINE_UPDATE":{
            return { ...state, account_downlines: action.payload }
        } break;
        case "PUSERBLOCKED_UPDATE":{
            return { ...state, puserBlocked: action.payload }   
        } break;
        case "PBETBLOCKED_UPDATE":{
            return { ...state, pbetBlocked: action.payload }   
        } break;
        default:
            return state
    }
}