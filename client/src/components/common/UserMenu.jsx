import { LogoutOutlined } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from 'redux/features/user.slice';
import menuConfigs from 'configs/menu.configs';
import { Link } from 'react-router-dom';
import TextAvatar from './TextAvatar';

const UserMenu = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography display="flex" alignItems="center" variant="h6" sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={toggleMenu}>
            <TextAvatar text={user.displayName} />
            <span style={{ marginLeft: '10px' }}> {user.displayName}</span>
          </Typography>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { padding: 0 } }}>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton component={Link} to={item.path} key={index} onClick={() => setAnchorEl(null)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={<Typography textTransform="uppercase">{item.display}</Typography>} />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{
                borderRadius: '10px',
              }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>

              <ListItemText disableTypography primary={<Typography textTransform="uppercase">Sign out</Typography>} />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
