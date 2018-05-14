import baseURL from '../../helpers/url';

//#region Login/Registration
export function loginUser(loginParams){
  const body = JSON.stringify(loginParams)
  return fetch(`${baseURL}/Login`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
    }).then((res) => {
        return res.json()
      } 
     )
}

export function signupUser(signupParams){
  const body = JSON.stringify(signupParams)
  return fetch(`${baseURL}/Users`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
      }
    })
    .then((res) => {
      alert(res.status);
    })
      .then((res) => {
        return res.json()
      }
     )
}
//#endregion
