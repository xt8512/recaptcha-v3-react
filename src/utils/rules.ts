export const getErrorByLength = (value: string): string => {
  return value.length > 6? "": `La contraseña debe ser mayor a 6 caracteres, actualmente ${value.length}.`;
};

export const getErrorByEmail = (value: string): string => {
  if(!value) return ""

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(value)) {
    return "Ingrese un correo valido.";
  }

  return "";
};
