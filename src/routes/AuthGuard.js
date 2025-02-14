import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// import { loginSuccess } from 'container/LoginContainer/slice';

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isAuthenticated = localStorage.getItem(import.meta.env.VITE_APP_TOKEN);
    try {
    } catch (error) {
      console.error("Error parsing authentication token:", error);
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthGuard;
