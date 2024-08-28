import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext'

interface PrivateRouteProps {
    
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
