import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from 'redux/features/auth-modal.slice';
import { Navigate } from 'react-router-dom';
import { userSelector } from 'redux/features/user.slice';

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedPage;
