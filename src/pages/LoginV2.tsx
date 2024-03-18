import {
  MessageBar,
  MessageBarType,
  TextField,
} from "@fluentui/react";

import { getErrorByEmail, getErrorByLength } from "../utils/rules";
import { useLogin } from "@/hooks/useLogin";
import { FormEvent, useEffect, useRef, useState } from "react";
import LoginLayout from "@/layout/LoginLayout";
import ButtonPrimary from "@/packages/ButtonPrimary";
import ReCaptcha, {ReCaptchaRef} from "@/components/ReCaptcha";

function LoginV2() {
  const [token, setToken] = useState("")
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const recaptchaRef = useRef<ReCaptchaRef>(null)
  
  const { loading, error, credentials, loginResponse, onChange, AuthSignIn, ResetLoginResponse } = useLogin();

  useEffect(() => {
      if (token.length) {
          setSubmitEnabled(true)
      }
  }, [token])

  const handleToken = (token:string) => {
      setToken(token)
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    ResetLoginResponse()

    try {
      await AuthSignIn()
    } catch (error) {
      setSubmitEnabled(false)
      recaptchaRef.current?.reset()
    }

  };

  return (
    <LoginLayout onSubmit={handleSubmit} title="SignIn V2">
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
        <ReCaptcha ref={recaptchaRef} callback={handleToken} />
      </div>

      <div>
        <pre>{JSON.stringify(credentials, null, 2)}</pre>
      </div>

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

      <ButtonPrimary loading={loading} disabled={!submitEnabled} />
    </LoginLayout>
  );
}

export default LoginV2;
