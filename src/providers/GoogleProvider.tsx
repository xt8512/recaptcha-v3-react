import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type GoogleProvider = {
  children: React.ReactNode;
};

function GoogleProvider({ children }: GoogleProvider) {
  return (
    <GoogleReCaptchaProvider
      key={"formulario"}
      reCaptchaKey={import.meta.env.VITE_REACT_APP_RECAPTCHA_API_KEY}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

export default GoogleProvider;
