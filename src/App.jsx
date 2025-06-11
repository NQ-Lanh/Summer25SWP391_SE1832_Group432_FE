import React, { Profiler } from "react";
import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import LoginPage from "./pages/Authen_page/LoginForm";
import RegisterPage from "./pages/Authen_page/RegisterForm";
import HomePage from "./pages/home-pages/HomePage";

import Header from "./pages/home-pages/Header/Header";

import Dashboard from "./dashboard/dashboard";

import Export_pdf from "./dashboard/dashboad_element/export_pdf";
import Manage_account from "./dashboard/dashboad_element/Manager_Account/Manage_account";
import Report from "./dashboard/dashboad_element/report";
import Blog1Detail from "./pages/home-pages/blog/Blog1Detail";
import Blog2Detail from "./pages/home-pages/blog/Blog2Detail";
import Blog3Detail from "./pages/home-pages/blog/Blog3Detail";
import BlogDetail from "./pages/home-pages/Detail/Detail1";
import Detail3 from "./pages/home-pages/Detail/Detail3";
import Detail2 from "./pages/home-pages/Detail/Detail2";

import Vaccine_event from "./dashboard/dashboad_element/Create_event/Vaccine_event";
import Profile from "./pages/home-pages/ParentForm/profile";
import HealthProfileCreate from "./pages/home-pages/ParentForm/HealthProfileCreate";
import Event from "./pages/home-pages/ParentForm/Event";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <HomePage />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <Header />
          <HomePage />
        </>
      ),
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
      path: "/blog/hoat-dong-ngoai-khoa",
      element: (
        <>
          <Header />
          <Blog1Detail />
        </>
      ),
    },
    {
      path: "/blog/ky-nang-song",
      element: (
        <>
          <Header />
          <Blog2Detail />
        </>
      ),
    },
    {
      path: "/blog/cong-nghe-giao-duc",
      element: (
        <>
          <Header />
          <Blog3Detail />
        </>
      ),
    },
    {
      path: "/blog/phong-ngua-benh",
      element: (
        <>
          <Header />
          <BlogDetail />
        </>
      ),
    },
    {
      path: "/blog/dinh-duong-hoc-duong",
      element: (
        <>
          <Header />
          <Detail2 />
        </>
      ),
    },
    {
      path: "/blog/suc-khoe-tam-than",
      element: (
        <>
          <Header />
          <Detail3 />
        </>
      ),
    },

    {
      path: "/create-health-profile",
      element: <HealthProfileCreate />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "vaccine_event",
          element: <Vaccine_event />,
        },
        {
          path: "manage_account",
          element: <Manage_account />,
        },
        {
          path: "export_pdf",
          element: <Export_pdf />,
        },
        {
          path: "report",
          element: <Report />,
        },
      ],
    },
    {
      path: "/event",
      element: (
        <>
          <Header />
          <Event />
        </>
      ),
    },
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
