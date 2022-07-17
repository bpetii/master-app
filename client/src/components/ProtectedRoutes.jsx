import { Outlet, Navigate} from "react-router";

    const ProtectedRoute = ({ isAuthenticated }) => {
        if (!isAuthenticated) {
          return <Navigate to="/" replace />;
        }
      
        return <Outlet />;
      };

export default ProtectedRoute;