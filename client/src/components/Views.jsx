import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoutes from "./ProtectedRoutes";

const Views = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthorized(boolean)
    }
  /*   const checkAuth = async () => {
        try {
            const res = await fetch("http://localhost:4000/auth/is-verify", {
                method: "GET",
                headers: {token: localStorage.getItem("token")}
            }) 
            const parsedRes = await res.json()
            console.log(parsedRes);
            setIsAuthorized(parsedRes);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        console.log('here');
        checkAuth()
    })
 */
    return(
        <BrowserRouter >
         <Routes>
            <Route path='/' element={<Login setAuth={setAuth}/>} />
            <Route path='/register' element={<Register setAuth={setAuth}/>} />
            <Route element={<ProtectedRoutes isAuthorized={isAuthorized}/>} >
                <Route path="dashboard" element={<Dashboard setAuth={setAuth}/>} />
            </Route>
            <Route path='*' element={<Login setAuth={setAuth}/>} />
        </Routes>   
        </BrowserRouter>
    )
}

export default Views;
