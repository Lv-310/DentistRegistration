import version from "../version.json"
import baseURL from '../helpers/url';
import {fetchFrom} from "./fetcher"

export async function checkVersion(){

    var res = await fetchFrom(`Version?version=${encodeURIComponent(version)}`, 'get', null);
    
    if(res.data === "good") return true;
    return true;
}

