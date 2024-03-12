import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// google
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// ui
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleReCaptchaProvider key={'formulario'} reCaptchaKey={import.meta.env.VITE_REACT_APP_RECAPTCHA_API_KEY}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleReCaptchaProvider>
);
