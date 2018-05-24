import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

//#region Login/Registration  
export function loginUser(loginParams){
  return fetchFrom('Login','post',loginParams);
}

export function signupUser(signupParams){
  return fetchFrom('Users','post',signupParams);
}

export function signupUser1(signupParams){
  return fetchFrom('Doctors','post',signupParams);
}
//#endregion
