import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './Store';
import * as serviceWorker from './serviceWorker';
import './index.css';

const renderTree = () => {
  ReactDOM.render(
      <Provider store={ store }>
        <App />
      </Provider>,
      document.getElementById('root')
  )
}

renderTree();

if(module.hot) {
  module.hot.accept('./App', () => {
      renderTree()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
