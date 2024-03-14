import { PrimaryButton, Spinner } from "@fluentui/react";

type ButtonPrimary = {
  loading: boolean;
  disabled?: boolean;
};

function ButtonPrimary({ loading = false, disabled = false }: ButtonPrimary) {
  return (
    <PrimaryButton disabled={disabled || loading} type="submit">
      {loading && (
        <Spinner label=" " ariaLive="assertive" labelPosition="right" />
      )}
      Enviar
    </PrimaryButton>
  );
}

export default ButtonPrimary;
