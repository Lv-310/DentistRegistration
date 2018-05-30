import { login } from "./login";


export function checkToken() {

    var tokenDurating = localStorage.getItem("tokenDurating");

    if (Date.now() > tokenDurating) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenDurating");
        window.location.href = "/";
    } else {
        var timeOut = tokenDurating - Date.now();
        setTimeout(() => {
            checkToken()
        }, timeOut);
    }
}
