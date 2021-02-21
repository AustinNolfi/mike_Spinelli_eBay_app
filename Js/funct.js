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
        console.log(responseJson);
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
        console.log(responseJson);
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
        console.log(responseJson);
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






//EXAMPLE RETURN for ............lookUpListings.............lookUpListings("q=phone", "category_ids=9355", "SANDBOX");
// {
//     href: 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=phone&limit=50&category_ids=9355&offset=0',
//     total: 69,
//     next: 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=phone&limit=50&category_ids=9355&offset=50',
//     limit: 50,
//     offset: 0,
//     itemSummaries: [
//       {
//         itemId: 'v1|110530785093|0',
//         title: 'XX Phone',
//         price: [Object],
//         itemHref: 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110530785093|0',
//         seller: [Object],
//         condition: 'New',
//         conditionId: '1000',
//         shippingOptions: [Array],
//         buyingOptions: [Array],
//         itemWebUrl: 'http://www.sandbox.ebay.com/itm/XX-Phone-/110530785093?hash=item19bc25ef45:i:110530785093',
//         itemLocation: [Object],
//         categories: [Array],
//         adultOnly: false,
//         legacyItemId: '110530785093',
//         availableCoupons: false
//       },
  
// price = {value: <string>, currency: <string>}





//EXAMPLE RETURN for ............getMerchandisedProducts.............getMerchandisedProducts("category_id=9355", "limit=100", "SANDBOX");
// {
//     merchandisedProducts: [
//       {
//         epid: '210746054',
//         title: 'Samsung Galaxy S6 SM-G920V - 32GB - Black Sapphire (Verizon) Smartphone ',
//         image: [Object],
//         marketPriceDetails: [Array],
//         reviewCount: 122,
//         averageRating: '4.57',
//         ratingCount: 254,
//         ratingAspects: [Array]
//       },
//       {
//         epid: '182474459',
//         title: 'Samsung Galaxy S5 SM-G900V - 16GB - Shimmery White (Verizon) Smartphone ',
//         image: [Object],
//         marketPriceDetails: [Array],
//         reviewCount: 224,
//         averageRating: '4.55',
//         ratingCount: 500,
//         ratingAspects: [Array]
//       },

// marketPriceDetails: [
//   {
//     conditionGroup: 'NEW_OTHER',
//     conditionIds: [ '1500', '1750' ],
//     estimatedStartPrice: { value: '134.99', currency: 'USD' }
//   },
//   {
//     conditionGroup: 'USED',
//     conditionIds: [ '2750', '3000', '4000', '5000', '6000' ],
//     estimatedStartPrice: { value: '69.99', currency: 'USD' }
//   },
//   {
//     conditionGroup: 'REFURBISHED',
//     conditionIds: [ '2000', '2500' ],
//     estimatedStartPrice: { value: '99.99', currency: 'USD' }
//   },
//   {
//     conditionGroup: 'NEW',
//     conditionIds: [ '1000' ],
//     estimatedStartPrice: { value: '160.0', currency: 'USD' }
//   }
// ]






// EXAMPLE RETURN for............marketplaceInsights.............marketplaceInsights("q=phone", "category_id=9355", "SANDBOX");
// {
//     href: 'http://api.sandbox.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search?q=phone&category_id=9355&offset=0&limit=50',
//     total: 4,
//     limit: 50,
//     offset: 0,
//     itemSales: [
//       {
//         itemId: 'v1|110530006655|0',
//         title: '6 Pcs Crewmate Plush Toy with BB Sound- 4in Vote Imposter Game Squeeze Plushie D',
//         condition: 'New',
//         conditionId: '1000',
//         itemHref: 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110530006655|0',
//         itemWebUrl: 'http://www.sandbox.ebay.com/itm/6-Pcs-Crewmate-Plush-Toy-with-BB-Sound-4in-Vote-Imposter-Game-Squeeze-Plushie-D-/110530006655?hash=item19bc1a0e7f:g:ewYAAOSwGKBgDBej',
//         image: [Object],
//         additionalImages: [Array],
//         categories: [Array],
//         adultOnly: false,
//         buyingOptions: [Array],
//         lastSoldDate: '2021-01-26T12:36:54.000Z',
//         totalSoldQuantity: 1,
//         lastSoldPrice: [Object],
//         seller: [Object],
//         itemLocation: [Object],
//         thumbnailImages: [Array]
//       },





//+++++++USEFUL NUMBERS AND INFORMATION for making calls++++++//
//Music catId: 11233
//Shirt catId: 137084
//DVDs n Movies catId: 11232
//Instruction Books,CDs,Videos catId: 182150
//Cell Phones n Accessories catId: 15032
//SANDBOX cell-phones catId: 9355
//BTS Upcd: 8804775077494