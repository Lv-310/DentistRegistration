import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function DoctorSignUp(signupParams){
  return fetchFrom('Doctors','post',signupParams);
}