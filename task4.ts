// ---- Uppercase Callback ----

type convertingLetterFunction = (message: string) => void;

const displayText = (text: string, lettersComplete: convertingLetterFunction) => {

    const message: string = text.toUpperCase();
    lettersComplete(message);
}

const lettersComplete = (message: string): void => {
console.log(message);
}
displayText("This is an amazing message...", lettersComplete);