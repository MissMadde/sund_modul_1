// ---- Pizza ORder ----


type orderStatusFunction = (orderStatus: string) => void;

const orderingPizza = (orderComplete: orderStatusFunction) => {
    console.log("Hello i would like to order a pizza...");
    setTimeout(() => {
        const orderStatus = "...Pizza is ready!";
        orderComplete(orderStatus);
    }, 3000);
}

const orderComplete = (orderStatus: string) => {
    console.log(orderStatus);
}
orderingPizza(orderComplete);