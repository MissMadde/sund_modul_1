//  ---- Math Callback ----

type numberFunction = (result: number) => void;

const calculateNumber = (a: number, b: number, displayNumber: numberFunction) => {
    const result = a + b;
    console.log("The result is...");
    setTimeout(() => {
        displayNumber(result);
    }, 2000);
}

const displayNumber = (result: number) => {
    console.log(result);
}
calculateNumber(10, 20, displayNumber);





