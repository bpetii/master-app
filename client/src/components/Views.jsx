import React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoutes from "./ProtectedRoutes";
import PreLogin from './PreLogin/PreLogin';

const Views = () => {
    const user = useSelector(state => state.user);
    return(
        <BrowserRouter >
         <Routes>
            <Route path='/' element={<PreLogin />} />
            <Route path='/login/:isSecretary' element={<Login />} />
            <Route path='/register/:isSecretary' element={<Register />} />
            <Route element={<ProtectedRoutes isAuthenticated={user?.access_token} />} >
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path='*' element={<PreLogin />} />
        </Routes> 
        </BrowserRouter>
    )
}

export default Views;
