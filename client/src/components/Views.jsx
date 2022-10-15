import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoutes from "./ProtectedRoutes";
import PreLogin from './PreLogin/PreLogin';

const Views = () => {
    return(
        <BrowserRouter >
         <Routes>
            <Route path='/' element={<PreLogin />} />
            <Route path='/login/:isSecretary' element={<Login />} />
            <Route path='/register/:isSecretary' element={<Register />} />
            <Route element={<ProtectedRoutes />} >
                <Route path="patient" element={<Dashboard />} />
            </Route>
            <Route path='*' element={<PreLogin />} />
        </Routes> 
        </BrowserRouter>
    )
}

export default Views;
