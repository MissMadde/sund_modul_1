// ---- Delayed Greeting ----

type greetingFunction = (greeting: string) => void;

const sayHelloLater = (displayGreeting: greetingFunction) => {
    console.log("Hello?...");
    setTimeout(() => {
        const greeting = "Hi, I am late!";
        displayGreeting(greeting);
    }, 2000);
}

const displayGreeting = (greeting: string) => {
    console.log(greeting);
}
sayHelloLater(displayGreeting);