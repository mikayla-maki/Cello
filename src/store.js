import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import cardReducer from './Components/card/cardSlice'
import listReducer from './Components/list/listSlice'
import boardReducer from './Components/board/boardSlice'
import { loadState, saveState, blankState, loadReducer } from './storage'
import { iterateReducers } from './redux-utils.js'

const store = createStore(
  iterateReducers([loadReducer, cardReducer, listReducer, boardReducer]),
  blankState(),
  composeWithDevTools(
    applyMiddleware(thunk)
));

loadState(store.dispatch);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
