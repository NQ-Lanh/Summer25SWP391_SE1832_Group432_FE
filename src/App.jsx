import React from "react";
import "antd/dist/reset.css";
import LoginPage from "./LoginPage/Loginpage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },{
    path: "/login",
    element: <LoginPage/>
  }
]);
  return <RouterProvider router={router} />;
}

export default App;
