// ---- Checking the response ----


const fetchAdviceById = async (id: number): Promise<void> => {

    try {
        const response = await fetch(`https://api.adviceslip.com/advice/${id}`)
        if (!response.ok) {
            throw new Error("Fetch did not work");
        }
        const data = await response.json();
        console.log(`Advice ID: ${data.slip.id}: ${data.slip.advice}`);

    } catch (error: any) {
        console.log("Error fetching advice:", error)

    }



};


fetchAdviceById(5);
