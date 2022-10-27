import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import user from './slices/userSlice';
import doctors from './slices/doctorsSlice';
import appointments from './slices/appointmentsSlice'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import api from './middlewares/api';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'doctors']
}

const reducer = combineReducers({
  user: user,
  doctors: doctors,
  appointments: appointments
})

const persistedReducer = persistReducer(persistConfig, reducer) 

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: [
    ...getDefaultMiddleware({
    serializableCheck: false
  }),
  api
]
})