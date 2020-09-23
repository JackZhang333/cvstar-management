import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
function reducer(state = {isLogin:false},action){
    switch(action.type){
        case 'LOGIN':
            return {
                isLogin:true
            }
        case 'LOGOUT':
            return {
                isLogin:false
            }
        default:
            return state
    }
}
export default createStore(reducer,applyMiddleware(reduxThunk,reduxLogger))