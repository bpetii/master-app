import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null,
        access_token: null,
        isDarkMode: false,
        doctorid: null,
    },
    reducers: {
        logIn: (user, action) => {
            return {
                ...user,
                ...action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true, // we set this as true on login
              };
        },
        logOut: (user) => {
          user.user = null;
          user.access_token = null;
          user.isLoggedIn = false;
        },
        toggleDarkMode: (user) => {
          user.isDarkMode = !user.isDarkMode;
        }
    }
})

export const {logIn, logOut, toggleDarkMode} = userSlice.actions;

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

  export const authRegister = ({firstName, lastName, city, zip, address, email, password, isSecretary}) => async dispatch => {
    try {

        const response = await fetch(API_URL + 'users', {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({firstName, lastName, city, zip, address, email, password, isSecretary})
          });
      
          const parsedRes = await response.json();
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