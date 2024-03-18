import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";

// props
export type ReCaptchaProps = {
  callback: (token: string) => void;
};

// ref
export interface ReCaptchaRef {
  reset: () => void;
}

const ReCaptcha = forwardRef(function (
  { callback }: ReCaptchaProps,
  forwardedRef: ForwardedRef<ReCaptchaRef>
) {
  const recaptchaRef = useRef(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Define the component function to be called when reCAPTCHA loads
  const onRecaptchaLoad = () => {
    setIsRecaptchaLoaded(true);
  };

  useEffect(() => {
    // Assign the component function to the window callback
    window.onRecaptchaLoad = onRecaptchaLoad;

    if (!window.grecaptcha) {
      // Load the script only if it's not already available
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha && window.grecaptcha.render) {
      // If reCAPTCHA is already loaded, call the function directly
      onRecaptchaLoad();
    }

    // Clean up the global callback on component unmount
    return () => {
      if (window.onRecaptchaLoad === onRecaptchaLoad) {
        window.onRecaptchaLoad = undefined; // Opcionalmente, puedes usar undefined en lugar de null
      }
    };
  }, []);

  useEffect(() => {
    if (isRecaptchaLoaded) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: import.meta.env.VITE_RECAPTCHA_API_KEY_2_FRONTEND,
        callback: callback, // Callback function to handle the token
      });
    }
  }, [isRecaptchaLoaded]);

  const reset = () => {
    window.grecaptcha.reset(recaptchaRef);
  };

  // Expose the reset function via useImperativeHandle
  useImperativeHandle(forwardedRef, () => ({
    reset,
  }));

  return <div ref={recaptchaRef}></div>;
});

export default ReCaptcha;
