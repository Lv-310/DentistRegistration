import baseURL from './url';

export async function fetchFrom(path, method, params) {
    if (method == 'post') {
        const body = JSON.stringify(params)
        const response = await fetch(`${baseURL}/${path}`, {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                
            }
        })
        const json = await response.json();
        let status = response.status;
        return {
            statusCode: status,
            data: json
        };
    }

    if (method == 'get') {
        const response = await fetch(`${baseURL}/${path}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        const json = await response.json();
        let status = response.status;
        return {
            statusCode: status,
            data: json
        };
    }
    if (method == 'delete') {
        const response = await fetch(`${baseURL}/${path}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        const json = await response.json();
        let status = response.status;
        return {
            statusCode: status,
            data: json
        };
    }
}
