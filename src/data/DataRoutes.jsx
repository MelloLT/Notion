import { createBrowserRouter } from 'react-router-dom';
import Layout from '../routes/Layout';
import Login from '../routes/LoginAndSignup/Login';
import ErrorPage from '../routes/ErrorPage/ErrorPage';
import About from '../routes/About';
import Notes from '../routes/Notes/Notes';
import EditNote, { loader as noteLoader } from '../routes/Notes/EditNote';
import RequireAuth from '../components/RequireAuth';
import NewNote from '../routes/Notes/NewNote';
import LayoutLogginng from '../routes/LayoutLogginng';
import Signup from '../routes/LoginAndSignup/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutLogginng />,
    children: [
      {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/home',
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home/notes',
        element: <Notes />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home/notes/:id',
        element: <EditNote />,
        loader: noteLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home/newNote',
        element: <NewNote />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
