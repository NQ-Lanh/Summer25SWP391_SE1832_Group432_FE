import React from "react";
import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./login-page/LoginPage";
import RegisterPage from "./register-page/RegisterPage";
import MedicationForm from "./medicationForm/MedicationForm";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/medication",
      element: <MedicationForm />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
