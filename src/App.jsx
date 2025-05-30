import React from "react";
import "antd/dist/reset.css";
import LoginPage from "./LoginPage/Loginpage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./register/registerPage";
function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },{
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },

]);
  return <RouterProvider router={router} />;
}

export default App;
