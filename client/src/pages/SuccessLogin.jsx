import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from 'redux/features/user.slice';

const SuccessLogin = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    dispatch(setUser({ token }));
  }, [token]);

  return <Navigate replace to="/" />;
};

export default SuccessLogin;
