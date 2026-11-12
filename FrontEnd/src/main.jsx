import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import AllProvider from "./contexProvider/allProvider";
import "./index.css";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AllProvider>
      <RouterProvider router={router} />
    </AllProvider>
  </StrictMode>,
);
