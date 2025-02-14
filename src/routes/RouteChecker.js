import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialRouteChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN);
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default InitialRouteChecker;
