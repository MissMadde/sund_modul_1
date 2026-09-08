// ---- Your Own Promise ----

const checkStock = new Promise((resolve, reject) => {
console.log("first log");

const inStock = true;

if (inStock) {

    resolve("Success. The item is in stock!");
} else {
    reject("Sorry, the item is out of stock.");
}

});

console.log("second log");

checkStock.then((message) => {
console.log(message);
}).catch((error) => {
    console.log(error);

});

// the first console.log comes first, then comes the second log, 
// because the executor-function that are sent to the Promise 
// is synchronous and executes directly when the Promise is created. 
// Second log comes after that.