
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from './Reducers/reducer'

const rootReducer = combineReducers({
    reducer
})


const middleware = [thunk];

const store =createStore (rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;