import * as Tools from "./tools.js";

// 1, Init
let url = 'https://fakestoreapi.com/products';
let rawData = [];
let categories = [];
let api = document.querySelector('input[name="api"]:checked').value;
let order = document.querySelector('input[name="order"]:checked').value;
let selectedCategoryIndex = 0;
applyConfigs();

// 2, Add an event for each radio, the category selector and the apply button
let apiRadios = document.getElementsByName("api");
for(let i = 0; i < apiRadios.length; i++) {
    apiRadios[i].onclick = applyConfigs;
}

let orderRadios = document.getElementsByName("order");
for(let i = 0; i < orderRadios.length; i++) {
    orderRadios[i].onclick = applyConfigs;
}

document.getElementById("category").onchange = fillInData;

document.getElementById("apply-api").onclick = applyApi;

function applyConfigs() {
    api = document.querySelector('input[name="api"]:checked').value;
    order = document.querySelector('input[name="order"]:checked').value;

    // 3, Get the raw data only once time
    if (rawData.length === 0) {
        Tools.GetRawData(api, url, catchRawData);
        setTimeout(() => {
            // 4, New a category list
            categories = Tools.GenerateACategoryList(rawData);
            Tools.GenerateACategoryListHTML(categories);

            // 5, Fill in data
            fillInData();
        }, 2000);
    } else {
        fillInData();
    }
}

function catchRawData(r) {
    rawData = r.slice(0);
}

function fillInData() {
    // 4, Update the category which the user selected
    selectedCategoryIndex = document.querySelector('#category').value;

    // 5, Fill in data
    let data = Tools.SortData(rawData, order, categories, selectedCategoryIndex);
    Tools.GenerateDataCards(data);
}

function applyApi() {
    rawData = [];
    selectedCategoryIndex = 0;
    applyConfigs();
}