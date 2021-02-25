const fetch = require('node-fetch');
const Keys = require('./appkeys.json');
const Enc64 = require('./base64encode');
const enc64 = Enc64.enc64;

async function getClientToken (environment){
    let oAuthCredentials64 = getCredsForEnvironment(environment);
    let endpoint = new String;
    if (environment === "SANDBOX"){
        endpoint = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'
    }
    else if (environment === "PRODUCTION"){
        endpoint = 'https://api.ebay.com/identity/v1/oauth2/token'
    }

    try{
        let response = await fetch(endpoint, 
            {
                method: "POST",    
                headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Basic ${oAuthCredentials64}`
                    },
                body: 
                    "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.marketplace.insights%20https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fbuy.marketing"
            }

        );
        let responseJson = await response.json();
        console.log("CLIENT ACCESS TOKEN", responseJson);
        return responseJson

    } catch(err){
        console.log(err);
    };

    
};

function getCredsForEnvironment(environment){
    if (environment === "SANDBOX"){
        let  base64 = enc64(Keys.SANDBOX.clientId + ":" + Keys.SANDBOX.clientSecret);
        return base64;
    }
    else if (environment === "PRODUCTION"){
        let  base64 = enc64(Keys.PRODUCTION.clientId + ":" + Keys.PRODUCTION.clientSecret);
        return base64;
    }
    else{
        console.log(`INVALID ENVIRONMENT INPUT: ${environment}`);
    }
};

//getClientToken("SANDBOX");
module.exports = {getClientToken};