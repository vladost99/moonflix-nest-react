import ProtectedPage from 'components/common/ProtectedPage';
import FavoritesList from 'pages/FavoritesList';
import HomePage from 'pages/HomePage';
import MediaDetail from 'pages/MediaDetail';
import MediaList from 'pages/MediaList';
import MediaSearch from 'pages/MediaSearch';
import PasswordUpdate from 'pages/PasswordUpdate';
import PersonDetail from 'pages/PersonDetail';
import ReviewList from 'pages/ReviewList';
import SuccessLogin from 'pages/SuccessLogin';
import { Navigate } from 'react-router-dom';

export const routesGen = {
  home: '/',
  mediaList: (type) => `/media/${type}`,
  mediaDetail: (type, id) => `/media/${type}/${id}`,
  mediaSearch: '/search',
  person: (id) => `/person/${id}`,
  FavoritesList: `/favourites`,
  reviewList: `/reviews`,
  passwordUpdate: '/password-update',
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home',
  },
  {
    path: '/person/:personId',
    element: <PersonDetail />,
    state: 'person.detail',
  },
  { path: '/search', element: <MediaSearch />, state: 'search' },
  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password.update',
  },
  {
    path: '/favourites',
    element: (
      <ProtectedPage>
        <FavoritesList />
      </ProtectedPage>
    ),
    state: 'favourites',
  },

  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews',
  },
  {
    path: '/media/:mediaType',
    element: <MediaList />,
  },
  {
    path: '/media/:mediaType/:mediaId',
    element: <MediaDetail />,
  },
  {
    path: '/auth/success/:token',
    element: <SuccessLogin />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
