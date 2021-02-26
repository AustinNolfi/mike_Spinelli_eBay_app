const express = require('express');
const router = express.Router();
const funct = require('../../src/js/funct');

async function call_lookUpListings(req, res, next){
    let searchParam = queries.searchParam;
    let category_ids = req.query.category_ids;
    let environment = req.query.environment;
    
    let listing_search = await funct.lookUpListings(searchParam, category_ids, environment);
    res.send(listing_search);
}

async function call_marketplaceInsights(req, res, next){
    let searchParam = req.query.searchParam;
    let categoryId = req.query.categoryId;
    let environment = req.query.environment;

    let insights = await funct.marketplaceInsights(searchParam, categoryId, environment);
    res.send(insights);
}

async function call_merchandisedProducts(req, res, next){
    let category_ids = req.query.category_ids;
    let limit = req.query.limit;
    let environment = req.query.environment;

    let products = await funct.getMerchandisedProducts(category_ids, limit, environment);
    res.send(products);
}

//Make calls
router.get("/listing_search/call", call_lookUpListings); //I believe these should take query string params in the path that will be used to call the eBay functions
router.get("/insights/call", call_marketplaceInsights); //These paths/endpoints will be GET called by React form fields
router.get("/best_selling/call", call_merchandisedProducts); //The paths without query params should load the page for the forms themselves

//Load React Components
router.get("/listing_search", (req, res) =>{
    res.send("SEARCH LISTINGS");
});
router.get("/insights", (req, res) =>{
    res.send("INSIGHTS");
});
router.get("/best_selling", (req, res) =>{
    res.send("BEST SELLING");
});

module.exports = router;