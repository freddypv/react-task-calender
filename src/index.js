import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/store';
import Root from './containers/Root/Root';
import './index.css';
//import { apiInterceptor } from './utility/apiInterceptor';
import * as serviceWorker from './serviceWorker';

// import {
//   saveLanguage,
//   saveUserDetails,
//   removeUserDetails
// } from './utility/localStorage';

const store = configureStore();

store.subscribe(() => {
 // saveLanguage(store.getState().language.language);
 // saveUserDetails(store.getState().login);
  //removeUserDetails(store.getState().login);
});
//apiInterceptor(store);

render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
