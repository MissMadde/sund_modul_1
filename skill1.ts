// ---- Order Confirmation ----

type OrderCallback = () => void

const placeOrder = (item: string, callback: OrderCallback) => {
    console.log(`Order placed for ${item}`);
    callback();
}

placeOrder("Pizza", () => {
    console.log("Thanks for your order!");
})