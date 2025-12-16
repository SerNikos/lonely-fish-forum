import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from './components/LogIn/LogIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Feed from './components/Feed/Feed.jsx';
import NotFound from './components/NotFound/NotFound.jsx';


const router = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/Feed", element: <Feed /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

