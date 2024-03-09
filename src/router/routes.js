import Home from '@/pages/app/Home';
import HotelSearch from '@/pages/app/HotelSearch';
import GoogleAuthCallback from '@/pages/full/GoogleAuthCallback';
import Login from '@/pages/full/Login';

const routes = [
  {
    path: '/',
    element: Home,
    requireAuth: false,
    layout: 'app'
  },
  {
    path: '/hotel-search',
    element: HotelSearch,
    requireAuth: false,
    layout: 'app'
  },
  {
    path: '/login',
    element: Login,
    requireAuth: false,
    layout: 'app',
    redirectIfLoggedIn: true
  },
  {
    path: '/auth/google/callback',
    element: GoogleAuthCallback,
    requireAuth: false,
    layout: 'full'
  }
];

export default routes;
