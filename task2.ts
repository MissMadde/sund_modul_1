// ---- Resolve or Reject ----

const myPromise = new Promise ((resolve, reject) => {
    const success = true;

    if(success) {
        resolve ("Resolved operation successfully");
    } else {
        reject("Rejected operation");
    }
});

const result2 = async () => {
    try {
        const message = await myPromise;
        console.log(message);

    } catch (error: any) {
        console.log("rejected:", error);

    }
};
result2();
