import { FormEvent, useState } from "react";

type Credentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  success: boolean;
} & Credentials;

interface Error {
  name: string;
  message: string;
  stack?: string;
}

type ErrorResponse = {
  message: string;
  success: boolean;
};

const initState: Credentials = {
  email: "jhonatan.valenzuela.19@outlook.com",
  password: "jU5m8Yc4W6bjr3m",
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
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
    setError(null);
  }

  async function AuthSignIn() {
    setLoading(true);

    try {
      return await new Promise<LoginResponse>((resolve, reject) => {
        setTimeout(() => {
          try {
            if (credentials.password === initState.password) {
              const login = {
                ...credentials,
                success: true,
                message: "Ingreso correctamente",
              };
              setLoginResponse(login);
              resolve(login);
            } else {
              throw new Error("Contraseña incorrecta");
            }
          } catch (error) {
            const ErrorPromise = error as Error;

            reject({ success: false, message: ErrorPromise.message });
          }
        }, 1000);
      });
    } catch (error) {
      const ErrorPromise = error as ErrorResponse;

      setError(ErrorPromise);
      
      throw ErrorPromise
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    credentials,
    loginResponse,
    onChange,
    ResetLoginResponse,
    AuthSignIn,
  };
};
