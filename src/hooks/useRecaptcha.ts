import axios from "axios";
import { encryptAmiAES } from "@/utils/crypto";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type ResponseReCaptchaPayload = {
    response: string;
}

type ResponseReCaptchaStatus = {
    success: boolean;
}

type ResponseReCaptcha = {
  payload: ResponseReCaptchaPayload;
  status: ResponseReCaptchaStatus;
};

type ResponseReCaptchaErrorBody = {
    code:string;
    httpCode:number;
    message:string;
}

type ResponseReCaptchaErrorStatus = {
    success:boolean;
    error: ResponseReCaptchaErrorBody;
}

type ResponseReCaptchaError = {
    payload: null;
    status: ResponseReCaptchaErrorStatus;
}

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isActiveV2, setIsActiveV2] = useState(false);
  const [token, setToken] = useState<string>("");
  const [tokenV2, setTokenV2] = useState<string>("");

  const [RecaptchaResponse, setRecaptchaResponse] = useState<ResponseReCaptcha | null>(null);
  const [RecaptchaError, setRecaptchaError] = useState<ResponseReCaptchaError | null>(null);

  useEffect(() => {
    if (tokenV2.length) {
      setIsDisabledButton(false)
    }
}, [tokenV2])

  function ResetRecaptchaResponse() {
    setRecaptchaResponse(null);
  }

  async function RecaptchaValidationV3Provider(token: string) {
    try {
      const request = encryptAmiAES(JSON.stringify({ token }));

      const { data } = await axios.post<ResponseReCaptcha>(
        import.meta.env.VITE_API_RECAPTCHA + "/recaptcha",
        {
          payload: {
            request,
          },
        }
      );

      setRecaptchaResponse(data);
      setIsDisabledButton(false);

      return data;
    } catch (error) {
      const ResponseError = error as ResponseReCaptchaError;

      setRecaptchaError(ResponseError)
      setIsDisabledButton(true);
      setIsActiveV2(true);

      return ResponseError;
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

      return error as string;
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

  function handleToken(token:string){
    setTokenV2(token)
  }

  return {
    // state
    isDisabledButton,
    isActiveV2,
    token,
    tokenV2,
    // response
    RecaptchaResponse,
    RecaptchaError,
    // methods
    ResetRecaptchaResponse,
    RecaptchaValidationV3Google,
    RecaptchaValidationV3Provider,
    RecaptchaValidationV3Context,
    //
    handleToken,
    setIsActiveV2,
    setIsDisabledButton
  };
};
