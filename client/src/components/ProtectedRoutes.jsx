import { Outlet, Navigate} from "react-router";
import {selectCurrentUser} from '../store/slices/userSlice'
import {useSelector} from 'react-redux';

    const ProtectedRoute = () => {
      const user = useSelector(selectCurrentUser);
        if (!user) {
          return <Navigate to="/" replace />;
        }
      
        return <Outlet />;
      };

export default ProtectedRoute;