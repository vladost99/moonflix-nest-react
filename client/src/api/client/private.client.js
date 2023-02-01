import axios from 'axios';
import queryString from 'query-string';
import store from '../../redux/store';
import { baseURL } from './url';
import { getUserFromCookie } from 'utils/user.utils';

const setToken = () => {
  const cookieUserData = getUserFromCookie();
  let token = store.getState().user.user?.token || cookieUserData?.token;

  return `Bearer ${token}`;
};

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: setToken(),
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  (err) => {
    throw err.response.data;
  },
);

export default privateClient;
