import version from "../version.json"
import baseURL from '../helpers/url';

export async function checkVersion(){
    const response = await fetch(`${baseURL}/Version?version=${encodeURIComponent(version)}`, {
        method: 'get',
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
        }
      })
    const res = await response.json();
   
    if(res === "good") return true;
    return false;
}

