// ---- fetching Advice ----

const fetchAdvice = async () => {

    try {
        const response = await fetch(`https://api.adviceslip.com/advice`)
        if (!response.ok) {
            throw new Error("Fetch did not work");
        }
        const data = await response.json();
        console.log(data.slip.advice);

    } catch (error: any) {
        console.log("Error fetching advice:", error)
    }
};


fetchAdvice();