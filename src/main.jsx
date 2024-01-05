import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Instruction, About, Login, Signup } from "./pages/index.js";
import ProtectedLayout from "./components/Layout/ProtectedLayout.jsx";

//authentication={true} --> set the page required login first
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedLayout authentication={true}>
            <Home />
          </ProtectedLayout>
        ),
      },
      {
        path: "/instruction",
        element: (
          <ProtectedLayout authentication={true}>
            <Instruction />
          </ProtectedLayout>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: (
          <ProtectedLayout authentication={false}>
            <Login />
          </ProtectedLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedLayout authentication={false}>
            <Signup />
          </ProtectedLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
