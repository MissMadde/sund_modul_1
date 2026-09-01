// ---- ID Card ---- 

type IDType = number | string;

const showID = (code: IDType) => {
    return `Your ID is: ${code}`;
}
console.log(showID(123));
console.log(showID("123"));





// ---- Fruit Basket----

type Fruit = "apple" | "banana" | "orange";

const eatFruit = (fruit: Fruit) : string => {
    return `You ate an ${fruit}`
}

console.log(eatFruit("apple"));
console.log(eatFruit("orange"));





// ---- Challenge ----

type Result = true | false;

const printResult = (result: Result) => {
    if (result)
        return "PASS";
    else
        return "FAIL";
}

console.log(printResult(true));
console.log(printResult(false));