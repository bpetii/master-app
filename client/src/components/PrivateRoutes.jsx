import { Outlet, Navigate} from "react-router";

const useAuth =  () => {
    const user = {loggedIn: false};
    return user?.loggedIn;
}

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to='/' /> 
}

export default PrivateRoutes;