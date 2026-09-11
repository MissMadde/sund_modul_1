// ---- Delayed Message ----

const delayedMessage = (message: string, delay: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, delay);
    });
};

const result3 = async () => {
    try {
        const message = await delayedMessage("Hej hej", 2000);
        console.log(message);

    } catch (error: any) {
        console.log("rejected:", error);

    }
};
result3();