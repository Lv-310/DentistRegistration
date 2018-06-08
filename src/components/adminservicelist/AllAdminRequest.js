import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function editPriceRequest(EditedPriceData) {
  return fetchFrom('Price/edit', 'post', EditedPriceData);
}

export function addPriceRequest(addedPrice){
  return fetchFrom('Price/add', 'post', addedPrice);
}

export function deletePriceRequest(id){
  return fetchFrom('Price/delete', 'post', id);
}
