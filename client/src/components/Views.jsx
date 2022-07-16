import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {

    return(
        <BrowserRouter >
         <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoutes />} >
                <Route path='/home' element={<Home />} />
            </Route>
            <Route path='*' element={<Login />} />
        </Routes>   
        </BrowserRouter>
    )
}

export default Views;