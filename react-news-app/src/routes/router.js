import { createBrowserRouter, Navigate } from 'react-router-dom';

// import layouts
import { AppLayout, GuestLayout } from '../components/Layouts';
import Articles from '../pages/Articles/Articles';

//  import pages
import { Login, Register } from '../pages/Auth';
import News from '../pages/News/News';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/articles' />
      },
      {
        path: '/articles',
        element: <Articles />,
      },
      {
        path: '/news',
        element: <News />
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <h1>404 - Page Not Found.</h1>,
  },
]);

export default router;
