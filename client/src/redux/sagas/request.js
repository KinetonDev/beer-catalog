export function requestWithXHR({url, method, body}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', '\'application/json\'');
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

        xhr.send(JSON.stringify(body));
    });
}

export function requestWithFetch({url, method, body}) {
    console.log(body)
    console.log(JSON.stringify(body))

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(response => {
        if (!response.ok) {
            return response.json()
                .catch(() => {
                    throw new Error(response.status);
                })
                .then(({message, title}) => {
                    throw new Error(message || title || response.status);
                });
        }

        return response.json();
    });
}

export function request(options, func) {
    return func(options);
}