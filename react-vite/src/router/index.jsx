import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Homepage from '../components/Homepage/Homepage';
import PinPage from '../components/PinPage/PinPage';  // Import PinPage
import BoardPage from '../components/BoardPage/BoardPage';  // Import BoardPage
import CommentComponent from '../components/Comment/Comment';  

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
    ],
  },
]);
