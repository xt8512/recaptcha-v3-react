interface Window {
  grecaptcha: ReCaptchaV2.ReCaptcha;
  // solo se asigna cuando estas en la version 2
  onRecaptchaLoad?: () => void | null;
}
