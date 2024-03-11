// Using jQuery

function gojQuery(url, callback) {
    $.getJSON(url).done((jsonResponse) => {
        callback(jsonResponse);
    }).fail((err) => {
        console.log(`${err.status}: ${err.statusText}`);
        callback([]);
    });
}

export {gojQuery}