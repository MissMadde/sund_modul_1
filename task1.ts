// ----Hello Callback ----

type helloFunction = (message: string) => void;

const message = (displayMessage: helloFunction) => {
    console.log("Hello world");
    setTimeout(() => {
        const data = "Hello from callback!";
        displayMessage(data)
    }, 2000);
}
const displayMessage = (data: string) => {
    console.log(data);
}

message(displayMessage);