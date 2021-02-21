//Personal Ref: Js Template strings are `${<stringGoesHere>}`

//Ref createOffer: https://tinyurl.com/y5osot7f
function createJsonOffer(availableQuantity,
                        categoryId,
                        hideBuyerDetails,
                        includeCatalogProductDetails,
                        listingDescription,
                        ){
    let jsonOffer = {
        "availableQuantity": availableQuantity,
        "categoryId": categoryId, //175718: ConsumerElectronics > TV,Video & Home Audio > TV,Video&Home Audio Accessories > Blank Audio/Video Media > CD,DVD & Blu-Ray discs
        "format": [FIXED_PRICE],
        "hideBuyerDetails": hideBuyerDetails,
        "includeCatalogProductDetails": includeCatalogProductDetails,
        "listingDescription": listingDescription,
        "listingDuration": [GTC],
        "listingPolicies": {
          "bestOfferTerms": {
            "autoAcceptPrice": {
              "currency": "string",
              "value": "string"
            },
            "autoDeclinePrice": {
              "currency": "string",
              "value": "string"
            },
            "bestOfferEnabled": "boolean"
          },
          "eBayPlusIfEligible": "boolean",
          "fulfillmentPolicyId": "string",
          "paymentPolicyId": "string",
          "returnPolicyId": "string",
          "shippingCostOverrides": [
            {
              "additionalShippingCost": {
                "currency": "string",
                "value": "string"
              },
              "priority": "integer",
              "shippingCost": {
                "currency": "string",
                "value": "string"
              },
              "shippingServiceType": "ShippingServiceTypeEnum : [DOMESTIC,INTERNATIONAL]",
              "surcharge": {
                "currency": "string",
                "value": "string"
              }
            }
          ]
        },
        "listingStartDate": "string",
        "lotSize": "integer",
        "marketplaceId": "MarketplaceEnum : [EBAY_US,EBAY_MOTORS,EBAY_CA,EBAY_GB,EBAY_AU,EBAY_AT,EBAY_BE,EBAY_FR,EBAY_DE,EBAY_IT,EBAY_NL,EBAY_ES,EBAY_CH,EBAY_TW,EBAY_CZ,EBAY_DK,EBAY_FI,EBAY_GR,EBAY_HK,EBAY_HU,EBAY_IN,EBAY_ID,EBAY_IE,EBAY_IL,EBAY_MY,EBAY_NZ,EBAY_NO,EBAY_PH,EBAY_PL,EBAY_PT,EBAY_PR,EBAY_RU,EBAY_SG,EBAY_ZA,EBAY_SE,EBAY_TH,EBAY_VN,EBAY_CN,EBAY_PE,EBAY_JP]",
        "merchantLocationKey": "string",
        "pricingSummary": {
          "minimumAdvertisedPrice": {
            "currency": "string",
            "value": "string"
          },
          "originallySoldForRetailPriceOn": "SoldOnEnum : [ON_EBAY,OFF_EBAY,ON_AND_OFF_EBAY]",
          "originalRetailPrice": {
            "currency": "string",
            "value": "string"
          },
          "price": {
            "currency": "string",
            "value": "string"
          },
          "pricingVisibility": "MinimumAdvertisedPriceHandlingEnum : [NONE,PRE_CHECKOUT,DURING_CHECKOUT]"
        },
        "quantityLimitPerBuyer": "integer",
        "secondaryCategoryId": "string",
        "storeCategoryNames": [
          "string"
        ],
        "sku": "string",
        "tax": {
          "applyTax": "boolean",
          "thirdPartyTaxCategory": "string",
          "vatPercentage": "number"
        }
      }
}