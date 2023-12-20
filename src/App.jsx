import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NavLink, Routes, Route, RouterProvider } from "react-router-dom";
//import { router } from './data/Routes';
import Login from "./routes/LoginAndSignup/Login";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import Layout from "./routes/Layout";
import About from "./routes/About";
import { router } from "./data/DataRoutes";
import { createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
