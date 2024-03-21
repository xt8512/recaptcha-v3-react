import { type AuthState } from '@/auth';
import {Auth} from 'aws-amplify'

import SHA384 from 'crypto-js/sha384';

type ObjectEmpty = {
  [key:string] : string
}

type ClientMetaData = {
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

export async function signIn(username:string, password:string, ValidationData: AuthState ) {
  const passwordSHA = SHA384(password).toString();

  const ValidationDataTemp = { 
    ...ValidationData,
  } as ClientMetaData

  try {
    const signIn: PromiseSignIn = await Auth.signIn(username, passwordSHA, ValidationDataTemp);

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