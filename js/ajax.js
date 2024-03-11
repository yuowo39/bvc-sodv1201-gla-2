// Using Asynchronous JavaScript And XML(AJAX)

function goAjax(url, callback) {
    let data
    sendHTTPRequest('GET', url).then((jsonResponse) => {
        callback(jsonResponse);
    }, (err) => {
        console.log(err);
        callback([]);
    });
}

const sendHTTPRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (!(xhr.status >= 200 || xhr.status < 300)) {
                reject(`${xhr.status}: ${xhr.statusText}`);
            } else {
                let jsonResponse = JSON.parse(xhr.response);
                resolve(jsonResponse);
            }
        }
        xhr.open(method, url);
        xhr.send();
    });
}

export {goAjax}