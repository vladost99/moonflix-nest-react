import { Box, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authModalSelector, setAuthModalOpen } from 'redux/features/auth-modal.slice';
import Logo from './Logo';
import SignInForm from './SignInForm';
import SignupForm from './SignupForm';
import { LoadingButton } from '@mui/lab';
import { baseURL } from 'api/client/url';
import { Google } from '@mui/icons-material';

const actionState = {
  signin: 'signin',
  signup: 'signup',
};

const AuthModal = () => {
  const dispatch = useDispatch();
  const { authModalOpen } = useSelector(authModalSelector);

  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  const googleLogin = () => {
    window.open(`${baseURL}auth/google`, '_self');
  };

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}
      >
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>

          {action === actionState.signin && <SignInForm switchAuthState={() => switchAuthState(actionState.signup)} />}
          {action === actionState.signup && <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />}
          <LoadingButton onClick={googleLogin} fullWidth size="large" variant="contained" sx={{ marginTop: 4, display: 'flex', alignItems: 'center' }}>
            <Google sx={{ marginRight: 2 }} />
            Sign in google
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
