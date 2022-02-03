export function requestWithXHR(url, method) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => {
           if (xhr.status >= 200 && xhr.status < 300) {
               resolve(JSON.parse(xhr.response));
           } else {
               reject(xhr.response);
           }
        };

        xhr.onerror = () => {
           reject(xhr.response);
        };

        xhr.send();
    });
}

export function requestWithFetch(url, method) {
    return fetch(url, {
        method: method
    }).then(response => response.json());
}

export function request(url, httpMethod, func) {
    return func(url, httpMethod);
}