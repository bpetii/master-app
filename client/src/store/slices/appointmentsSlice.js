import {createSlice } from '@reduxjs/toolkit';
import {apiCallBegan } from '../api';

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
          appointments.done = false;
          appointments.loading = true;
        },
        appointmentsReceived: (appointments, action) => {
          appointments.appointments=action.payload;
        },
        appointmentsCreated: (appointments, action) => {
          appointments.appointments.push(action.payload);
          appointments.loading = false;
          appointments.done = true;
        },
        appointmentsRequestFailed: (appointments, action) => {
          appointments.loading = false;
          appointments.error=action.payload.message;
        },
        appointmentRestart: (appointments) => {
          appointments.done = false;
          appointments.loading = false;
          appointments.error = false;
        }
    }
})

export const {
    appointmentsRequested, 
    appointmentsReceived, 
    appointmentsRequestFailed,
    appointmentsCreated,
    appointmentRestart
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
  