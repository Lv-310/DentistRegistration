import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function savePrice(EditedPriceData) {
  return fetchFrom('Price/edit', 'post', EditedPriceData);
}

export function addPrice(EditedPriceData)
{return fetchFrom('Price/add', 'post', EditedPriceData);}

