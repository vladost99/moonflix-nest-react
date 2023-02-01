import { Box } from '@mui/material';
import AuthModal from 'components/common/AuthModal';
import Footer from 'components/common/Footer';
import GlobalLoading from 'components/common/GlobalLoading';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userAPI } from 'api/modules/user.api';
import { setListFavorites, setUser, userSelector } from 'redux/features/user.slice';
import { favouriteAPI } from 'api/modules/favourite.api';
import { toast } from 'react-toastify';

const MainLayout = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userAPI.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favouriteAPI.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();

    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  return (
    <>
      <GlobalLoading />

      <AuthModal />
      <Box display="flex" minHeight="100vh">
        <Topbar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default MainLayout;
