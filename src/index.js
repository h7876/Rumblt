import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import store from './store/index';
import { loadState, saveState } from './localStorage';
import rootReducer from './reducers';
import { createStore } from 'redux';

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
)

store.subscribe(()=> {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
<App/>
    </Provider>
, document.getElementById('root'));
