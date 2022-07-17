import {store} from './store/store'
import { Provider } from 'react-redux'
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from 'react';
const App = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Provider store={store}>
       <BrowserRouter >
       <Routes>
          <Route path='/' element={<Login setAuth={setAuth}/>} />
          <Route path='/register' element={<Register setAuth={setAuth}/>} />
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>} >
              <Route path="dashboard" element={<Dashboard setAuth={setAuth}/>} />
          </Route>
      </Routes>   
      </BrowserRouter>
    </Provider>

  );
}

export default App;
