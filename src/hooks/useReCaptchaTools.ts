import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useState } from "react";
import axios from "axios";

type ResponseReCaptcha = {
  mensaje: string;
  score: number;
};

export const useReCaptchaTools = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [refreshCaptcha, setRefreshCaptcha] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [reCaptcha, setRecaptcha] = useState<ResponseReCaptcha | null>(null);

  const ResetRecaptchaResponse = () => {
    setRecaptcha(null);
  };

  const onReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    // Do whatever you want with the token

    try {
      setLoading(true);

      const token: string = await executeRecaptcha("register");

      console.log(token);
      

      setToken(token);

      const { data } = await axios.post<ResponseReCaptcha>(
        import.meta.env.VITE_API_RECAPTCHA + "/send",
        {
          token,
        }
      )

      setRefreshCaptcha(() => (data.score <= 0.5 ? true : false));

      setRecaptcha(data);

      return { ...data, token };
    } catch (error) {
      console.log(error);
      
      setRefreshCaptcha(true);
    } finally {
      setLoading(false);
    }
  }, [executeRecaptcha]);

  return {
    token,
    refreshCaptcha,
    reCaptcha,
    loading,
    setToken,
    ResetRecaptchaResponse,
    onReCaptchaVerify,
  };
};
