// Using Fetch API

function goFetchApi(url, callback) {
    fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    }).then((jsonResponse) => {
        callback(jsonResponse);
    }).catch((err) => {
        console.log(err);
        callback([]);
    });
}

export {goFetchApi}