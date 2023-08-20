import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { reducer } from './auth/Reducer';
const combinedReducers =  combineReducers({
   reducer:reducer,
})
// NOTE: use this store variable to create a store.
const store = createStore(combinedReducers,applyMiddleware(thunk));


export { store };