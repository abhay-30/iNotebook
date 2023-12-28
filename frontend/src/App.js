import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (msg, type) => {
    let obj = {
      msg: msg,
      type: type,
    };
    setalert(obj);
    setTimeout(() => {
      setalert(null);
    }, 3000);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home showAlert={showAlert} />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },

    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login showAlert={showAlert} />
        </>
      ),
    },

    {
      path: "/signup",
      element: (
        <>
          <Navbar /> <SignUp showAlert={showAlert} />
        </>
      ),
    },
  ]);

  return (
    <NoteState>
      <React.StrictMode>
        <Alert alert={alert} />
        <RouterProvider router={router} />
      </React.StrictMode>
    </NoteState>
  );
}

export default App;
