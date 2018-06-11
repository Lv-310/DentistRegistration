import baseURL from '../../helpers/url';
import { fetchFrom } from '../../helpers/fetcher';

export function InsertAvatar(AvatarParams){
  return fetchFrom('Avatar','post',AvatarParams);
}