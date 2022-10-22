import {createSlice } from '@reduxjs/toolkit';
import {apiCallBegan } from '../api';
import {doctorSelected } from './doctorsSlice'

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [],
        loading: false,
        done: false,
        error: '',
    },
    reducers: {
        appointmentsRequested: (appointments) => {
          appointments.loading = true;
        },
        appointmentsReceived: (appointments, action) => {
          appointments.appointments=action.payload;
        },
        appointmentsCreated: (appointments, action) => {
          console.log(action);
          appointments.appointments.push(action.payload);
          appointments.loading = false;
          appointments.done = true;
        },
        appointmentsRequestFailed: (appointments, action) => {
          appointments.loading = false;
          appointments.error=action.payload.message;
        },
    },
    extraReducers: {
      [doctorSelected.type]: (appointments, action) => {
        appointments.loading = false;
          appointments.done = false;
          appointments.error= '';
      },
    }
})

export const {
    appointmentsRequested, 
    appointmentsReceived, 
    appointmentsRequestFailed,
    appointmentsCreated
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

//Actions Creators
export const loadAppointments = (userid) => {
    return apiCallBegan({
      url: 'appointments',
      params: {userid},
      method: 'GET',
      onSuccess: appointmentsReceived.type,
    });
  };

export const createAppointments = (data) => {
  return apiCallBegan({
    url: 'appointments',
    method: 'POST',
    data,
    onStart: appointmentsRequested.type,
    onSuccess: appointmentsCreated.type,
    onError: appointmentsRequestFailed.type,
  });
  };
  