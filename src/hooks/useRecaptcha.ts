import { decryptAmiAES, encryptAmiAES } from "@/utils/crypto";
import axios from "axios";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type ResponseReCaptcha = {
  mensaje: string;
  score: number;
};

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isActiveV2, setIsActiveV2] = useState(false);
  const [token, setToken] = useState<string>("");

  const [RecaptchaResponse, setRecaptchaResponse] =
    useState<ResponseReCaptcha | null>(null);

  // v3

  function ResetRecaptchaResponse() {
    setRecaptchaResponse(null);
  }

  async function RecaptchaValidationV3Provider(token: string) {
    try {
      const request = encryptAmiAES(JSON.stringify({ token }));

      console.log("request encriptado", request);

      const { data } = await axios.post<ResponseReCaptcha>(
        import.meta.env.VITE_API_RECAPTCHA + "/send",
        {
          token,
          payload: {
            request,
          },
        }
      );

      setRecaptchaResponse(data);
      setIsDisabledButton(false);

      const decryptRequest = JSON.parse(decryptAmiAES(request));

      console.log("request desincriptado", decryptRequest);

      return data;
    } catch (error) {
      setIsDisabledButton(true);
      setIsActiveV2(true);

      return error;
    }
  }

  async function RecaptchaValidationV3Google() {
    try {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return null;
      }

      const token: string = await executeRecaptcha("register");
      setToken(token);
      setIsDisabledButton(false);

      return token;
    } catch (error) {
      setIsDisabledButton(true);

      return error;
    }
  }

  async function RecaptchaValidationV3Context() {
    try {
      ResetRecaptchaResponse();

      const token = (await RecaptchaValidationV3Google()) as string;
      await RecaptchaValidationV3Provider(token);
    } catch (error) {
      return error;
    }
  }

  return {
    // state
    isDisabledButton,
    isActiveV2,
    token,
    // response
    RecaptchaResponse,
    // methods
    ResetRecaptchaResponse,
    RecaptchaValidationV3Google,
    RecaptchaValidationV3Provider,
    RecaptchaValidationV3Context,
  };
};
