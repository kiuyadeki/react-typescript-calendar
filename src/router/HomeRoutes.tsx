import { Home } from '../components/pages/Home';
import { Page404 } from '../components/pages/Page404';
import { Setting } from '../components/pages/Setting';
import { UserManagement } from '../components/pages/UserManagement';

export const homeRoutes = [
  {
    path: '',
    index: true,
    element: <Home />,
  },
  {
    path: 'user_management',
    index: false,
    element: <UserManagement />,
  },
  {
    path: 'setting',
    index: false,
    element: <Setting />,
  },
  {
    path: '*',
    index: false,
    element: <Page404 />,
  },
];
