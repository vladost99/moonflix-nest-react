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

const SignInForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, `username minimum 8 characters`).required('username is required'),
      password: Yup.string().min(8, `password minimum 8 characters`).required('password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userAPI.signin(values);
      setIsLoginRequest(false);
      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Sign in success');
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
      </Stack>
      <LoadingButton fullWidth size="large" variant="contained" sx={{ marginTop: 4 }} loading={isLoginRequest} type="submit">
        Sign in
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: '1rem' }} onClick={() => switchAuthState()}>
        Sign up
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

export default SignInForm;
