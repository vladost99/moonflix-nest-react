import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import menuConfigs from 'configs/menu.configs';
import Logo from './Logo';
import uiConfigs from 'configs/ui.configs';
import { DarkModeOutlined } from '@mui/icons-material';
import { WbSunnyOutlined } from '@mui/icons-material';
import { themeModes } from 'configs/theme.configs';
import { setThemeMode, themeModeSelector } from 'redux/features/theme-mode.slice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'redux/features/user.slice';
import { appStateSelector } from 'redux/features/app-state.slice';

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const { appState } = useSelector(appStateSelector);
  const { themeMode } = useSelector(themeModeSelector);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
            sx={{ borderRadius: '10px', marginY: 1, backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography textTransform="uppercase">{item.display}</Typography>} />
          </ListItemButton>
        ))}
        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
                sx={{ borderRadius: '10px', marginY: 1, backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={<Typography textTransform="uppercase">{item.display}</Typography>} />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>

        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlined />}
            {themeMode === themeModes.light && <WbSunnyOutlined />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography textTransform="uppercase">{themeMode === themeModes.dark ? 'dark mode' : 'ligth mode'}</Typography>}
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        '& . MuiDrawer-Paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          borderRight: '0px',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
