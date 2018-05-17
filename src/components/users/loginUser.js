import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

//#region Login/Registration  
export function loginUser(loginParams){
  return fetchFrom('Login','post',loginParams);
}

export function signupUser(signupParams){
  return fetchFrom('Users','post',signupParams);
}
//#endregion
