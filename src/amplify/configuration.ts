import { Auth, Amplify } from "aws-amplify";

export function setupConfiguration() {
  const amplifyConfig = {
    Auth: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_AWS_POOLS_ID,
      userPoolWebClientId: import.meta.env.VITE_AWS_POOLS_WEB_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_IDENTITY_ID,
      mandatorySignIn: true,
    },
    authenticationFlowType: "USER_SRP_AUTH",
  };

  Amplify.configure(amplifyConfig);
  
  Auth.configure();
}
