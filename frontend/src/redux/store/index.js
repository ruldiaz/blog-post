import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../reducer';
import postReducer from '../reducer/postReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   posts: postReducer,
 });

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));