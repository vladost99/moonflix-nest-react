import Cookies from 'js-cookie';

const themeModeVar = 'thememode';

export const getLocalTheme = () => {
  const local = localStorage.getItem(themeModeVar);
  return local;
};

export const setLocalTheme = (mode) => {
  localStorage.setItem(themeModeVar, mode);
};

export const getUserFromCookie = () => {
  let user = Cookies.get('user');
  const access_token = Cookies.get('access_token');

  if (!access_token) {
    return null;
  }

  if (!user) {
    return null;
  }

  let data = { token: access_token };

  if (user) {
    user = JSON.parse(user);
    data = { ...data, ...user };
  }

  return data;
};

export const removeUserInfoFromCookie = () => {
  Cookies.remove('user');
  Cookies.remove('access_token');
};

export const setUserInCookie = (userData) => {
  const { token, ...user } = userData;
  Cookies.set('user', JSON.stringify(user), { expires: 2 });
  Cookies.set('access_token', token, { expires: 1 });
};

export const setToken = (token) => {
  Cookies.set('access_token', token, { expires: 1 });
};
