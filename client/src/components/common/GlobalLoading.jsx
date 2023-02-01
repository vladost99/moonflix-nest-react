import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { globalLoadingSelector } from 'redux/features/global-loading.slice';

const GlobalLoading = () => {
  const { globalLoading } = useSelector(globalLoadingSelector);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: 'none',
          transition: 'all .3s ease',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
