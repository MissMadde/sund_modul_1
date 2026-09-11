// ---- Two fetches in a row ----


const fetchAdviceByIds = async (id1: number, id2: number): Promise<void> => {

    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${id1}`)
        if (!response.ok) {
            throw new Error("Fetch did not work");
        }
        const data = await response.json();
        console.log(`Advice ID: ${data.slip.id}: ${data.slip.advice}`);

        const response2 = await fetch(`https://api.adviceslip.com/advice/${id2}`)
        if (!response2.ok) {
            throw new Error("Fetch did not work");
        }
        const data2 = await response2.json();
        console.log(`Advice ID: ${data2.slip.id}: ${data2.slip.advice}`);


    } catch (error: any) {
        console.log("Error fetching advice:", error)

    }



};


fetchAdviceByIds(5, 7);
