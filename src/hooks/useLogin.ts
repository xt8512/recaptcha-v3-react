import { signIn, type ErrorResponse } from "@/amplify/signIn";
import { FormEvent, useState } from "react";

type Credentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  success: boolean;
} & Credentials;

const initState: Credentials = {
  email: "jhonatan.valenzuela.19@outlook.com",
  password: "jU5m8Yc4W6bjr3m",
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState<ErrorResponse | null>(null);
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);
  const [credentials, setCredentials] = useState<Credentials>(initState);

  function onChange(
    ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) {
    const input = ev.target as HTMLInputElement;

    setCredentials((credential) => ({ ...credential, [input.name]: newValue }));
  }

  function ResetLoginResponse() {
    setLoginResponse(null);
    setErrorResponse(null);
  }

  async function AuthSignIn() {
    setLoading(true);

    try {
      const amplify = await signIn(credentials.email, credentials.password)

      const login = {
        ...credentials,
        success: true,
        message: "Ingreso correctamente",
      };
      setLoginResponse(login);
      
      return amplify
    } catch (error) {
      const ErrorPromise = error as ErrorResponse;

      setErrorResponse(ErrorPromise);
      
      throw ErrorPromise
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    errorResponse,
    credentials,
    loginResponse,
    onChange,
    ResetLoginResponse,
    AuthSignIn,
  };
};
