import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientPage from './PatientPage/patient-page';
import ProtectedRoutes from "./ProtectedRoutes";
import PreLogin from './PreLogin/PreLogin';
import SecretaryBook from './secretary-page/secretary-book';
import Profile from './secretary-page/profile';

const Views = () => {
    return(
        <BrowserRouter >
         <Routes>
            <Route exact path='/' element={<PreLogin />} />
            <Route exact element={<ProtectedRoutes />} >
                <Route exact path="/patient" element={<PatientPage />} />
                <Route exact path="/secretary/book" element={<SecretaryBook />} />
                <Route exact path="/secretary/profile" element={<Profile />} />
            </Route>
            <Route path='*' element={<PreLogin />} />
        </Routes> 
        </BrowserRouter>
    )
}

export default Views;
