import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import Logo from "./components/Logo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostProvider>
      <BrowserRouter>
        <Logo />
        <App />
      </BrowserRouter>
    </PostProvider>
  </React.StrictMode>
);
