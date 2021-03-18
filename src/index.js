import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {getFirestore, reduxFirestore} from 'redux-firestore'
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase'
import { applyMiddleware, createStore ,compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import firebaseConfig from './Components/config/firebaseConfig'
import thunk from 'redux-thunk'
//import firebase from 'firebase/app'


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(firebaseConfig,{attachAuthIsReady:true}), 
    reduxFirestore(firebaseConfig) 
  )
);


store.firebaseAuthIsReady.then(()=>{
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

