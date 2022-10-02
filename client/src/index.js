import React from 'react';
import {store} from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
