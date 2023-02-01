import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { DarkModeOutlined } from '@mui/icons-material';
import { WbSunnyOutlined } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material';
import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { themeModes } from 'configs/theme.configs';
import menuConfigs from 'configs/menu.configs';
import { setAuthModalOpen } from 'redux/features/auth-modal.slice';
import { setThemeMode, themeModeSelector } from 'redux/features/theme-mode.slice';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';
import { userSelector } from 'redux/features/user.slice';
import { appStateSelector } from 'redux/features/app-state.slice';

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector(themeModeSelector);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger ? 'text.primary' : themeMode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
      backgroundColor: trigger ? 'background.paper' : themeMode === themeModes.dark ? 'transparent' : 'background.paper',
    },
  });
};

const Topbar = () => {
  const { user } = useSelector(userSelector);
  const { appState } = useSelector(appStateSelector);
  const { themeMode } = useSelector(themeModeSelector);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  const toggleSideBar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSideBar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItem: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={toggleSideBar} color="inherit" sx={{ mr: 2, display: { md: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'inline', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>

            <Box flexGrow={1} alignItems="center" display={{ xs: 'none', md: 'flex' }}>
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? 'contained' : 'text'}
                  sx={{
                    color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
                  }}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: 'inherit' }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlined />}
                {themeMode === themeModes.light && <WbSunnyOutlined />}
              </IconButton>
            </Box>

            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button variant="contained" onClick={() => dispatch(setAuthModalOpen(true))}>
                  Sign In
                </Button>
              )}
            </Stack>

            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
