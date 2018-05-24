import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';


export function AddService(insertParams) {
  return fetchFrom('Service', 'post', insertParams);
}