import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Homepage from '../components/Homepage/Homepage';
import PinPage from '../components/PinPage/PinPage';  // Import PinPage
import BoardPage from '../components/BoardPage/BoardPage';  // Import BoardPage

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,  // Homepage route
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "pins",  // PinPage route
        element: <PinPage />,
      },
      {
        path: "boards",  // BoardPage route
        element: <BoardPage />,  // BoardPage component
      },
    ],
  },
]);
