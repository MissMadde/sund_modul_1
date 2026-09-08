// ---- Countdown Timer ----

// Output order
// 1, Start
// 2, Finish
// 3, Time's up / Countdown finished

// This happens because the setTimeout function is 
// asyncron which make the remaining code continuing to execute 
// directly while the timer awaits in the background not blocking the remaining code.

const countdown = (seconds: number, callback: () => void) => {

    setTimeout(() => {
        console.log("Time's up!");
        callback();
    }, seconds * 1000);
    
}
console.log("Start");
countdown(3, () => console.log("Countdown finished."));
console.log("Finish");