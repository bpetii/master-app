import {createSlice } from '@reduxjs/toolkit';
import {apiCallBegan } from '../api';

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        doctors: [],
        selectedDoctor: null,
        loading: false,
        error: ''
    },
    reducers: {
        doctorsRequested: (doctors) => {
          doctors.loading = true;
        },
        doctorsReceived: (doctors, action) => {
          doctors.doctors=action.payload;
          doctors.loading = false;
          doctors.error=''
        },
        doctorsRequestFailed: (doctors, action) => {
          doctors.loading = false;
          doctors.error=action.payload.message;
        },
    }
})

export const {
  doctorsRequested, 
  doctorsReceived, 
  doctorsRequestFailed, 
} = doctorsSlice.actions;
export default doctorsSlice.reducer;

//Actions Creators
export const loadDoctors = () => {
    return apiCallBegan({
      url: 'doctors',
      method: 'GET',
      onStart: doctorsRequested.type,
      onSuccess: doctorsReceived.type,
      onError: doctorsRequestFailed.type,
    });
  };
  