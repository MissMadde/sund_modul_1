// ---- Coin Flip ----

const flipCoin = () => {
    return new Promise ((resolve, reject) => {
        const outcome = Math.random() > 0.5;
        outcome ? resolve("You win!") : reject("You lose!");
    });
};


const outCome = async () => {
    try {
        const message = await flipCoin();
        console.log(message);

    } catch (error: any) {
        console.log("rejected:", error);

    }
};
outCome();

