// ---- Combining a Promise and a Fetch ----

const flippingCoin = () => {
    return new Promise ((resolve, reject) => {
        const outcome = Math.random() > 0.5;
        outcome ? resolve("You win, here is your advice:") : reject("You lose, no advice for you!");
    });
};


const coinResult = async () => {
    try {
        const message = await flippingCoin();
        console.log(message);

        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        
        console.log(data.slip.advice);

    } catch (error: any) {
        console.log("rejected:", error);

    }
};
coinResult();