import {goAjax} from "./ajax.js";
import {goFetchApi} from "./fetch-api.js";
import {gojQuery} from "./jquery.js";


export function GetRawData(api, url, callback) {
    switch (api) {
        case 'ajax':
            goAjax(url, callback);
            break;
        case 'fetch-api':
            goFetchApi(url, callback);
            break;
        case 'jquery':
            gojQuery(url, callback);
            break;
    }
}

export function GenerateACategoryList(rawData) {
    let categories = ["all"];
    for(let i = 0; i < rawData.length; i++) {
        if (!categories.includes(rawData[i]["category"])) {
            categories.push(rawData[i]["category"]);
        }
    }
    return categories;
}

export function GenerateACategoryListHTML(categories) {
    document.querySelector('#category').innerHTML = ``;
    for (let i = 0; i < categories.length; i++) {
        document.querySelector('#category').innerHTML += `
        <option value="${i}">${categories[i]}</option>
        `;
    }
}

export function SortData(rawData, order, categories, selectedCategoryIndex) {
    let orderedData = [];

    if (selectedCategoryIndex == 0) {
        orderedData = rawData;
    } else {
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i]["category"] === categories[selectedCategoryIndex]) {
                orderedData.push(rawData[i]);
            }
        }
    }
    if (order === "asc") {
        orderedData.sort((a, b) => a.price < b.price ? -1 : 1);
    } else {
        orderedData.sort((a, b) => a.price > b.price ? -1 : 1);
    }

    return orderedData;
}

export function GenerateDataCards(data) {
    document.querySelector('#data').innerHTML = ``;
    for (let i = 0; i < data.length; i++) {
        document.querySelector('#data').innerHTML += `
        <div class="data-card">
        <div class="card-body">
        <p class="card-title">${data[i]["title"]}</p>
        <p class="card-price">$${data[i]["price"]}</p>
        <p class="card-description">${data[i]["description"]}</p>
        <p class="card-category">${data[i]["category"]}</p>
        <p class="card-rating">${data[i]["rating"]["rate"]}/5.0 (${data[i]["rating"]["count"]} reviews)</p>
        </div>
        <div class="card-image">
        <img class="card-img" src="${data[i]["image"]}" alt="${data[i]["title"]}">
        </div>
        </div>
        `;
    }
}
