import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null,
        access_token: null,
    },
    reducers: {
        logIn: (state, action) => {
            return {
                ...state,
                ...action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true, // we set this as true on login
              };
        },
        logOut: (state) => {
            state.user = null;
            state.access_token = null;
            state.isLoggedIn = false;
        }
    }
})

export const {logIn, logOut} = userSlice.actions;

const API_URL = "http://localhost:4000/api/";

export const authLogin = (email, password, isSecretary) => async dispatch => {
    try {
    const response = await await fetch(API_URL + 'auth', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password, isSecretary})
      });
      const parsedRes = await response.json();
      console.log(parsedRes);
      if (parsedRes.access_token) {
        dispatch(logIn(parsedRes))
        return Promise.resolve();
      } else {
        return Promise.reject(parsedRes);
      }
    } catch (err){
        return Promise.reject(err);
    }
  }

  export const authRegister = (name, email, password, isSecretary) => async dispatch => {
    try {

        console.log(name, email, password);
        const response = await fetch(API_URL + 'users', {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password, isSecretary})
          });
      
          const parsedRes = await response.json();
          console.log(parsedRes);
          if (parsedRes.access_token) {
            dispatch(logIn(parsedRes))
            return Promise.resolve();
          } else {
            return Promise.reject(parsedRes);
          }
    } catch (err) {
        return Promise.reject(err);
    }
}

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.token;