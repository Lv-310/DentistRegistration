import { login } from "./login";


export function checkToken() {

    var tokenDurating = localStorage.getItem("tokenDurating");

    if (Date.now() > tokenDurating) {
        //console.log("Token logOut")
        //this.login.logOut();
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        localStorage.removeItem("tokenDurating");

    } else {
        var timeOut = tokenDurating - Date.now();
        setTimeout(() => {
            checkToken()
        }, timeOut);
    }
}
