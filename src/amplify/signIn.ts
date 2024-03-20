import {Auth, Amplify} from 'aws-amplify'

import SHA384 from 'crypto-js/sha384';
import { v4 as uuidv4 } from 'uuid';

type ObjectEmpty = {
  [key:string] : string
}

type AttributesSignIn = {
  sub:string;
}

type ClientSignIn = {
  endpoint: string;
  fetchOptions: ObjectEmpty;
}

type CognitoUserPool2SignIn = {
  userPoolId: string; 
  clientId: string, 
  client: ClientSignIn, 
  advancedSecurityDataCollectionFlag: boolean;
  storage: Storage
}

type CognitoIdToken2SignIn = {
  jwtToken:string;
  payload: ObjectEmpty;
}

type CognitoRefreshToken2SignIn = {
  token:string;
}

type CognitoAccessToken2SignIn = {
  jwtToken:string;
  payload: ObjectEmpty;
}

type CognitoUserSession2SignIn = {
  idToken: CognitoIdToken2SignIn,
  refreshToken: CognitoRefreshToken2SignIn,
  accessToken: CognitoAccessToken2SignIn,
  clockDrift: number;
}

export type PromiseSignIn = {
  Session: null | string;
  attributes: AttributesSignIn;
  authenticationFlowType: string;
  client: ClientSignIn;
  keyPrefix: string;
  pool: CognitoUserPool2SignIn 
  preferredMFA: string;
  signInUserSession: CognitoUserSession2SignIn | null;
  storage: Storage;
  userDataKey: string;
  username: string;
}

export type ErrorResponse = {
  message: string;
  __type: string;
};

export async function signIn(username:string, password:string) {
  const idClient = uuidv4();
  const passwordSHA = SHA384(password).toString();
  const validationData = {
    idClient: idClient,
    userAgent: window.navigator.userAgent,
    channelCode: 'BRK',
  }

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

  try {
    const signIn: PromiseSignIn = await Auth.signIn(username, passwordSHA, validationData);

    return signIn;
    // console.log(signIn);    
    
    // amplifyConfig.authenticationFlowType = "CUSTOM_AUTH";
    // Amplify.configure(amplifyConfig);
    // Auth.configure();

    // const user: PromiseSignIn = await Auth.signIn(username); // enviar email : lambda create auth challenge

    // console.log(user);

    // return user;
  } catch (e) {
    const ResponseError = e as ErrorResponse;

    throw ResponseError
  }
}