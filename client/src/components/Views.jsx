import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientPage from './PatientPage/patient-page';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoutes from "./ProtectedRoutes";
import PreLogin from './PreLogin/PreLogin';
import SecretaryPage from './secretary-page/secretary-page';

const Views = () => {
    return(
        <BrowserRouter >
         <Routes>
            <Route path='/' element={<PreLogin />} />
            <Route path='/login/:isSecretary' element={<Login />} />
            <Route path='/register/:isSecretary' element={<Register />} />
            <Route element={<ProtectedRoutes />} >
                <Route path="patient" element={<PatientPage />} />
                <Route path="secretary" element={<SecretaryPage />} />
            </Route>
            <Route path='*' element={<PreLogin />} />
        </Routes> 
        </BrowserRouter>
    )
}

export default Views;
