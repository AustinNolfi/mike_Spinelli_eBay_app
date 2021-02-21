function getAverage(jsonListings){
    total = jsonListings.total;
    sum = 0;
    
    itemSummariesArray = jsonListings.itemSummaries;

    prices = new Array;
    for (i=0; i<itemSummariesArray.length; i++){
        item = itemSummariesArray[i]
        prices.push(item.price)
        sum += parseFloat(item.price.value);
    }

    average = sum/total;
    console.log("PRICES HERE", prices);
    console.log("SUM=",sum);
    console.log("AVERAGE VALUE", average);
}

module.exports = {getAverage};