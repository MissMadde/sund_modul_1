// ---- A Different Advice Slip ----

type AdviceSlipType = {
    slip: {
        id: number;
        advice: string;
    }
}

const fetchAdviceAndLog = (id: number): void => {
    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response: Response) => {

            if (!response.ok) {
                throw new Error("Fetch did not work");
            }
            return response.json();
        })


        .then((data: AdviceSlipType) => {
            console.log(`Advice ID: ${data.slip.id} Advice: ${data.slip.advice}`);
        })
        .catch((error) => {
            console.log("Error fetching advice:", error)
        })


};


fetchAdviceAndLog(1);
fetchAdviceAndLog(2);
fetchAdviceAndLog(3);