import privateClient from 'api/client/private.client';
import publicClient from 'api/client/public.client';

const userEndpoints = {
  signin: 'auth/signin',
  signup: 'auth/signup',
  getInfo: 'auth/profile',
  passwordUpdate: 'auth/update-password',
  googleLogin: 'auth/google',
};

export const userAPI = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  googleSignin: async () => {
    try {
      const response = await publicClient.get(userEndpoints.googleLogin);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ newPassword, confirmPassword }) => {
    try {
      const response = await privateClient.post(userEndpoints.passwordUpdate, {
        newPassword,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};
