import { combineReducers } from 'redux';
import auth from './Auth';
import downline from './Downline';

const appReducer = combineReducers({
    auth,
    downline
});

const initialState = appReducer({}, {} , {} ,{})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = initialState
    }
    return appReducer(state, action)
}

export default rootReducer;