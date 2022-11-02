import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientPage from './PatientPage/patient-page';
import ProtectedRoutes from "./ProtectedRoutes";
import PreLogin from './PreLogin/PreLogin';
import SecretaryViews from './secretary-page/secretary-views';
import SecretaryBook from './secretary-page/secretary-book';
import SecretaryProfile from './secretary-page/profile';
import Workplan from './secretary-page/workplan';
import FinancialReport from './secretary-page/financial-report';

const Views = () => {
    return(
        <BrowserRouter >
         <Routes>
            <Route exact path='/' element={<PreLogin />} />
            <Route exact element={<ProtectedRoutes />} >
                <Route exact path="/patient" element={<PatientPage />} />
                <Route exact path="/secretary" element={<SecretaryViews />}>
                    <Route exact path="/secretary/book" element={<SecretaryBook />} />
                    <Route exact path="/secretary/profile" element={<SecretaryProfile/>} />
                    <Route exact path="/secretary/workplan" element={<Workplan/>} />
                    <Route exact path="/secretary/financial-report" element={<FinancialReport/>} />
                </Route>
            </Route>
            <Route path='*' element={<PreLogin />} />
        </Routes> 
        </BrowserRouter>
    )
}

export default Views;
