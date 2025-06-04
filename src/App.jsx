import React from "react";
import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./login-page/LoginPage";
import RegisterPage from "./register-page/RegisterPage";
import HomePage from "./pages/HomePage";
import Blog1Detail from "./pages/Blog1Detail";
import Blog2Detail from "./pages/Blog2Detail";
import Blog3Detail from "./pages/Blog3Detail";
import BlogDetail from "./pages/Detail1";
import Detail2 from "./pages/Detail2";
import Detail3 from "./pages/Detail3";
import Header from "./components/Header";
import ScrollToTop from "./ScrollToTop";

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
  ]);
  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}

export default App;
