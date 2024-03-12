import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Spinner,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";

import { getErrorByEmail, getErrorByLength } from "./utils/rules";
import { useLogin } from "./hooks/useLogin";
import { FormEvent } from "react";
import { useReCaptchaTools } from "./hooks/useReCaptchaTools";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

function App() {
  const { loading, loginResponse, error, credentials, onChange, AuthSignIn, ResetLoginResponse } = useLogin();
  const { reCaptcha, onReCaptchaVerify, setToken, loading:loadingRecaptcha, refreshCaptcha, ResetRecaptchaResponse} = useReCaptchaTools();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    ResetRecaptchaResponse()
    ResetLoginResponse()

    await onReCaptchaVerify();
    await AuthSignIn();
  };

  return (
    <>
      <Stack
        verticalAlign="center"
        horizontalAlign="center"
        style={{ height: "100vh" }}
      >
        <Stack.Item
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 10,
            width: 400,
          }}
        >
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack verticalAlign="space-between" style={{ gap: 10 }}>
              {/* TITLE */}
              <Stack.Item style={{ textAlign: "center" }}>
                <Text variant="large" block>
                  SignIn
                </Text>
              </Stack.Item>

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
                <GoogleReCaptcha 
                    action="formulario"
                    onVerify={setToken}
                    refreshReCaptcha={refreshCaptcha}
                />
              </div>

              {/* LOADING BUTTON */}
              <PrimaryButton disabled={loading || loadingRecaptcha} type="submit">
                {(loading || loadingRecaptcha) && (
                  <Spinner
                    label=" "
                    ariaLive="assertive"
                    labelPosition="right"
                  />
                )}
                Enviar
              </PrimaryButton>
            </Stack>
          </form>
        </Stack.Item>
      </Stack>
    </>
  );
}

export default App;
