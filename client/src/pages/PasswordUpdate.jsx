import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from 'components/common/Container';
import uiConfigs from 'configs/ui.configs';
import { useState } from 'react';
import { userAPI } from 'api/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/features/user.slice';
import { setAuthModalOpen } from 'redux/features/auth-modal.slice';

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8, 'password minimum 8 characters').required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Confirm new password not match')
        .min(8, 'password minimum 8 characters')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      if (onRequest) return;
      setOnRequest(true);

      const { response, err } = await userAPI.passwordUpdate(values);
      setOnRequest(false);

      if (err) toast.error(err.message);
      if (response) {
        form.resetForm();
        navigate('/');
        dispatch(setUser(null));
        dispatch(setAuthModalOpen(true));
        toast.success('Update password success! Please re-login');
      }
    },
  });

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              color="success"
              error={form.touched.newPassword && form.errors.newPassword !== undefined}
              type="password"
              placeholder="New password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              helperText={form.touched.newPassword && form.errors.newPassword}
            />

            <TextField
              color="success"
              error={form.touched.confirmPassword && form.errors.confirmPassword !== undefined}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              fullWidth
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              helperText={form.touched.confirmPassword && form.errors.confirmPassword}
            />

            <LoadingButton type="submit" variant="contained" fullWidth sx={{ marginTop: 4 }} loading={onRequest}>
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;
