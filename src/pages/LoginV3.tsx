import {
  MessageBar,
  MessageBarType,
  TextField,
} from "@fluentui/react";

import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { getErrorByEmail, getErrorByLength } from "../utils/rules";
import { useLogin } from "../hooks/useLogin";
import { FormEvent, useState } from "react";
import { useReCaptchaTools } from "../hooks/useReCaptchaTools";
import LoginLayout from "@/layout/LoginLayout";
import ButtonPrimary from "@/packages/ButtonPrimary";

function LoginV3() {
  const { loading, loginResponse, error, credentials, onChange, AuthSignIn, ResetLoginResponse } = useLogin();
  const { reCaptcha, onReCaptchaVerify, loading:loadingRecaptcha, ResetRecaptchaResponse} = useReCaptchaTools();

  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const handleRecaptchaSubmit = async () => {
    // Lógica para verificar el reCAPTCHA y continuar con el inicio de sesión
    const recaptchaToken = await window.grecaptcha.execute();
    console.log('Token de reCAPTCHA:', recaptchaToken);

    // Continuar con el inicio de sesión después de verificar el reCAPTCHA
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    ResetRecaptchaResponse()
    ResetLoginResponse()
    
    await onReCaptchaVerify();
    await AuthSignIn().then(()=>{
      setShowRecaptcha(false)
    }).catch(()=>{
      setShowRecaptcha(true)
    });

    // console.log(window.grecaptcha);
    
  };

  return (
      <LoginLayout onSubmit={handleSubmit} title="SignIn V3">

        {/* INPUTS  */}
        <TextField
          label="Username"
          name="email"
          value={credentials.email}
          onGetErrorMessage={getErrorByEmail}
          onChange={onChange}
          validateOnFocusIn
          validateOnFocusOut
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onGetErrorMessage={getErrorByLength}
          onChange={onChange}
          canRevealPassword
          revealPasswordAriaLabel="Show password"
        />

        <div>
          <pre>{JSON.stringify(credentials, null, 2)}</pre>
        </div>

        {reCaptcha && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              {reCaptcha.mensaje}
            </MessageBar>
          </div>
        )}

        {loginResponse && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              {loginResponse.message}
            </MessageBar>
          </div>
        )}

        {error && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              {error.message}
            </MessageBar>
          </div>
        )}

        <div>
          {showRecaptcha && (
            <GoogleReCaptcha
              onVerify={handleRecaptchaSubmit}
              // Agregar otras props según sea necesario
            />
          )}
        </div>

        <ButtonPrimary loading={loading || loadingRecaptcha} />
      </LoginLayout>
  );
}

export default LoginV3;
