import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loaders/Loader';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    return (
        <Loader/>
    );
};

export default Logout;
