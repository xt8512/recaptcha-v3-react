import React from "react";
import ReactDOM from "react-dom/client";
// ui icons
import { initializeIcons } from "@fluentui/react/lib/Icons";
// react-router-dom
import { RouterProvider } from "react-router-dom";
// route
import router from "./router";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
