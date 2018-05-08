import { login } from "./login";


export function checkToken() {
    let thirtySeconds = 3000;
    let tokenTimer = localStorage.getItem("tokenDurating");

    if (Date.now() > tokenTimer) {
        alert("Token logOut") //this.login.logOut();

    } else {
        let timeOut = tokenTimer - Date.now() - thirtySeconds;
        setInterval(() => { this.checkToken(); }, timeOut);
    }
}
