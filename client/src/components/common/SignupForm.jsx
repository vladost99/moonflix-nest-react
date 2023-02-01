import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { userAPI } from 'api/modules/user.api';
import { useState } from 'react';
import { setAuthModalOpen } from 'redux/features/auth-modal.slice';
import { setUser } from 'redux/features/user.slice';

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
      confirmPassword: '',
      displayName: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, `username minimum 8 characters`).required('username is required'),
      password: Yup.string().min(8, `password minimum 8 characters`).required('password is required'),
      displayName: Yup.string().min(8, `displayName minimum 8 characters`).required('displayName is required'),
      confirmPassword: Yup.string().min(8, `displayName minimum 8 characters`).required('displayName is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userAPI.signup(values);
      setIsLoginRequest(false);
      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Sign up success');
      }

      if (err) {
        setErrorMessage(err.message);
      }
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          color="success"
          error={signinForm.touched.username && signinForm.errors.username !== undefined}
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.username && signinForm.errors.username}
        />

        <TextField
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />

        <TextField
          color="success"
          error={signinForm.touched.displayName && signinForm.errors.displayName !== undefined}
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.displayName && signinForm.errors.displayName}
        />

        <TextField
          color="success"
          error={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword !== undefined}
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword}
        />
      </Stack>
      <LoadingButton fullWidth size="large" variant="contained" sx={{ marginTop: 4 }} loading={isLoginRequest} type="submit">
        Sign up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: '1rem' }} onClick={() => switchAuthState()}>
        Sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
