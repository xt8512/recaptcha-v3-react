import { MessageBar, MessageBarType, TextField } from "@fluentui/react";
import { useLogin } from "@/hooks/useLogin";
import { getErrorByEmail, getErrorByLength } from "@/utils/rules";
import { FormEvent } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import LoginLayout from "@/layout/LoginLayout";
import ButtonPrimary from "@/packages/ButtonPrimary";

const LoginV3AndV2 = () => {
  const {
    loading,
    error,
    credentials,
    loginResponse,
    onChange,
    AuthSignIn,
    ResetLoginResponse,
  } = useLogin();

  const {isDisabledButton, RecaptchaResponse, RecaptchaError, RecaptchaValidationV3Context} = useRecaptcha()

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    ResetLoginResponse()
    
    await RecaptchaValidationV3Context()
    await AuthSignIn()
  };

  return (
    <LoginLayout onSubmit={handleSubmit} title="SignIn Both v3 & v2">
      {/* INPUTS  */}

      <div>{JSON.stringify(isDisabledButton)}</div>

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

      {RecaptchaResponse && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              Verificado correctamente
            </MessageBar>
          </div>
        )}

      {RecaptchaError && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              No es correcto de Recaptcha
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

      <ButtonPrimary loading={loading} disabled={isDisabledButton} />
    </LoginLayout>
  );
};

export default LoginV3AndV2;
