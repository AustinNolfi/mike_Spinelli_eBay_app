//provides JS Fetch HTTP methods for eBay selling API! funct = functionality
const Authent = require('./authent.js');
const fetch = require('node-fetch');
const Computation = require('./computation.js');

function validateUpc(upc) {
    comp = new Set("0123456789");
    for (i=0; i < upc.length; i++) {
        if (comp.has(upc[i])){
            continue;
        }
        else{
            throw "Invalid UPC input. Please try again."
        };
    }
};

//Ref Search API > https://tinyurl.com/y6nv6tgl
async function lookUpListings(searchParam="", category_ids="", environment){
    const clientTokenBody = await Authent.getClientToken(environment);
    let endpoint = new String;
    if (environment === "SANDBOX"){
        endpoint = "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?"
    }
    else if(environment === "PRODUCTION"){
        endpoint = "https://api.ebay.com/buy/browse/v1/item_summary/search?"
    }

    try {
        const response = await fetch(endpoint + searchParam + "&" + category_ids,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${clientTokenBody.access_token}`,
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8",
                    "Accept-Encoding": "application/gzip"
                }
            }
        );
        const responseJson = await response.json();
        console.log(`Request complete with status code ${response.status}`);
        // console.log(responseJson);
        return responseJson;
    } catch(err){
        console.log(err);
        return null;
    }
}

async function marketplaceInsights(searchParam, categoryId, environment){
    const clientTokenBody = await Authent.getClientToken(environment);
    let endpoint = new String;
    if (environment === "SANDBOX"){
        endpoint = "https://api.sandbox.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search?"
    }
    else if (environment === "PRODUCTION"){
        endpoint = "https://api.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search?"
    }

    try {
        const response = await fetch(endpoint + searchParam + "&" + categoryId,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${clientTokenBody.access_token}`,
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8",
                    "Accept-Encoding":  "application/gzip",
                    "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
                }
            }
        );
        const responseJson = await response.json();
        console.log(`Request complete with status code ${response.status}`);
        // console.log(responseJson);
        return responseJson;
    } catch(err){
        console.log(err);
        return null;
    }
}

async function getMerchandisedProducts(categoryId, limit, environment){
    const clientTokenBody = await Authent.getClientToken(environment);
    let endpoint = new String;
    if (environment === "SANDBOX"){
        endpoint = "https://api.sandbox.ebay.com/buy/marketing/v1_beta/merchandised_product?";
    }
    else if (environment === "PRODUCTION"){
        endpoint = "https://api.ebay.com/buy/marketing/v1_beta/merchandised_product?";
    }
    try{
        const response = await fetch(endpoint + "metric_name=BEST_SELLING" + "&" + categoryId + "&" + limit,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${clientTokenBody.access_token}`,
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8",
                    "Accept-Encoding":  "application/gzip",
                    "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
                }
            });
        const responseJson = await response.json();
        console.log(`Request complete with status code ${response.status}`);
        // console.log(responseJson);
        return responseJson;
    } catch(err){
        console.log(err);
    }
};

function processInsights(insightsJson){

    let soldListings = new Array;
    let sumOfPrices = 0;


    for (i=0; i<insightsJson.total; i++){
        let itemSale = insightsJson.itemSales[i];
        sumOfPrices += parseFloat(itemSale.lastSoldPrice.value);

        let entry = {
            title: itemSale.title,
            condition: itemSale.condition
        };

        soldListings.push(entry);
    }

    let averagePrice = sumOfPrices/insightsJson.total;
    soldListings.push(averagePrice);
    console.log("LISTINGS w/ Price @ End:", soldListings);
    return soldListings;
};


//+++++++TESTING CALLS++++++//







module.exports = {lookUpListings, getMerchandisedProducts, marketplaceInsights};