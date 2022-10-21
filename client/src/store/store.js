import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import user from './slices/userSlice';
import doctors from './slices/doctorsSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import api from './middlewares/api';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducer = combineReducers({
  user: user,
  doctors: doctors
})

const persistedReducer = persistReducer(persistConfig, reducer) 

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: [
    ...getDefaultMiddleware({
    serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
  }),
  api
]
})