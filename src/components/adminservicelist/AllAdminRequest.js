import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function addServiceRequest(addedService) {
  return fetchFrom('Service', 'post', addedService);
}

export function editPriceRequest(editedPriceData) {
  return fetchFrom('Price/edit', 'post', editedPriceData);
}

export function addPriceRequest(addedPrice) {
  return fetchFrom('Price/add', 'post', addedPrice);
}

export function deletePriceRequest(id) {
  return fetchFrom('Price/delete', 'post', id);
}

// export function getServicesRequest() {
//   fetchFrom('Service', 'get', null);
// }
