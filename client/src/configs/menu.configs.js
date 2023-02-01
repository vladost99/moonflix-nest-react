import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavouriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const main = [
  {
    display: 'home',
    path: '/',
    icon: <HomeOutlinedIcon />,
    state: 'home',
  },
  {
    display: 'movies',
    path: 'media/movie',
    icon: <SlideshowOutlinedIcon />,
    state: 'movie',
  },
  {
    display: 'tv series',
    path: 'media/tv',
    icon: <LiveTvOutlinedIcon />,
    state: 'tv',
  },
  {
    display: 'search',
    path: '/search',
    icon: <SearchOutlinedIcon />,
    state: 'search',
  },
];

const user = [
  {
    display: 'favourites',
    path: '/favourites',
    icon: <FavouriteBorderOutlinedIcon />,
    state: 'favourite',
  },
  {
    display: 'reviews',
    path: '/reviews',
    icon: <RateReviewOutlinedIcon />,
    state: 'reviews',
  },
  {
    display: 'password update',
    path: '/password-update',
    icon: <LockResetOutlinedIcon />,
    state: 'password.update',
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
