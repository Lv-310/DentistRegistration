import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function InsertXRay(XRayParams){
  return fetchFrom('XRay','post',XRayParams);
}