import { Outlet, Navigate} from "react-router";
import {useSelector} from 'react-redux';

    const ProtectedRoute = () => {
      const user = useSelector(state => state.user);
        if (!user) {
          return <Navigate to="/" replace />;
        }
      
        return <Outlet />;
      };

export default ProtectedRoute;