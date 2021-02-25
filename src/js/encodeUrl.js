function encodeUrls(urls){
    let encoded = "";
    for (i=0; i<urls.length; i++){
        if (urls[i] === '/'){
            encoded += "%2F";
        }
        else if (urls[i] === ':'){
            encoded += "%3A";
        }
        else if (urls[i] === ' '){
            encoded += "%20";
        }
        else{
            encoded += urls[i];
        }
    }
    console.log("Encoded! ",encoded);
    return encoded;
};

encodeUrls("https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.marketplace.insights https://api.ebay.com/oauth/api_scope/buy.marketing");
