import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Homepage from '../components/Homepage/Homepage';
import PinPage from '../components/PinPage/PinPage';  
import BoardPage from '../components/BoardPage/BoardPage';  
import CommentComponent from '../components/Comment/Comment';  
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
        element: <PinPage />,
      },
      {
        path: "pins/:pinId/comments",  // Route for comments of a specific pin
        element: <CommentComponent />,
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
