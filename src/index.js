import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

const globalStore = createStore(reducer)
ReactDOM.render(
//   <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
//   </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();