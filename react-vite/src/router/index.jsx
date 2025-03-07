import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Homepage from '../components/Homepage/Homepage';
import PinPage from '../components/PinPage/PinPage';  
import BoardPage from '../components/BoardPage/BoardPage';  
import Favorite from '../components/Favorite/Favorite'; 

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
        path: "pins/:pinId",  // PinPage route with pinId in the URL
        element: <PinPage />,  // PinPage component, now handles comments inside it
      },
      {
        path: "boards",  // BoardPage route
        element: <BoardPage />,  // BoardPage component
      },
      {
        path: "favorites",  // New route for Favorites page
        element: <Favorite />,  // Favorite component
      },
    ],
  },
]);
