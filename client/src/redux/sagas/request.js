export function requestWithXHR({url, method, body}) { // need to work on it
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

export function requestWithFetch({url, method, body, headers}) {
    const options = {
        method: method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(response => {
        const status = response.status;
        const totalCount = response.headers.get('x-total-count');
        if (!response.ok) {
            const error = new Error();
            error.status = status;
            return response.json()
                .catch(() => {
                    throw error;
                })
                .then(({message, title}) => {
                    error.message = message;
                    error.title = title;
                    throw error;
                });
        }

        const result = {
            status,
            totalCount: totalCount ? totalCount : undefined
        }

        return response.text().then(data => data ? {...result, body: JSON.parse(data)} : {...result});
    });
}

export function request(options, func) {
    return func(options);
}

export function authorizedRequest(options, func, accessToken) {
    try {
        return request({...options,
            headers: {...options?.headers,
                'Authorization' : `Bearer ${accessToken}`}
        }, func);
    }
    catch (e) {
        console.log(e)
    }
}