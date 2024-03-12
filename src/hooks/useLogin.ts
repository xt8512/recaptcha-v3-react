import { FormEvent, useState } from "react";

type Credentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
} & Credentials;

type ErrorResponse = {
  message: string;
};

const initState: Credentials = {
  email: "jhonatan.valenzuela.19@outlook.com",
  password: "jU5m8Yc4W6bjr3m",
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(
    null
  );
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
          if (credentials.password === initState.password) {
            const login = { ...credentials, message: "Ingreso correctamente" };

            setLoginResponse(login);
            resolve(login);
          } else {
            reject({ message: "Contraseña incorrecta" });
          }
        }, 2000);
      });
    } catch (error) {
      setError(error as ErrorResponse);
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
