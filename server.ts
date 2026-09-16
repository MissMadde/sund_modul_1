import express from "express";
import type { Request, Response } from "express";

const app = express();


app.use(express.json());

const PORT = 3000;


type Party = {
    id: number;
    name: string;
    leader: string;
    seats: number;
};

type PartyParams = {
    id: string;
};

let parties: Party[] = [
    { id: 1, name: "Socialdemokraterna", leader: "Magdalena Andersson", seats: 107 },
    { id: 2, name: "Sverigedemokraterna", leader: "Jimmie Åkesson", seats: 73 },
    { id: 3, name: "Moderaterna", leader: "Ulf Kristersson", seats: 68 },
    { id: 4, name: "Miljöpartiet", leader: "Amanda Lind & Daniel Helldén", seats: 18 },
];


let newId = parties.length;


app.get('/parties', (req: Request, res: Response): void => {
    res.json(parties);
});


app.post('/parties', (req: Request, res: Response) => {
    const { name, leader } = req.body;

    if (!name || !leader) {
        return res.status(400).json({ error: "Both name and leader are required." });
    }

    
    newId++;

    const newParty: Party = {
        id: newId,
        name: req.body.name,
        leader: req.body.leader,
        seats: req.body.seats ?? 0
    };
    parties.push(newParty);
    res.status(201).json({ message: "Party added successfully!", party: newParty });

});


app.put('/parties/:id', (req: Request<PartyParams>, res: Response) => {
    const partyId: number = parseInt(req.params.id);
    const party = parties.find((p) => p.id === partyId);
    if (!party) {
        return res.status(404).json({ message: "Party not found" });
    }
    party.name = req.body.name || party.name;
    party.leader = req.body.leader || party.leader;

    res.json({ message: "Party updated successfully", party });
});



app.delete("/parties/:id", (req: Request<PartyParams>, res: Response) => {
    const partyId: number = parseInt(req.params.id);
    const partyToDelete = parties.find((party) => party.id === partyId);
    if (!partyToDelete) {
        return res.status(404).json({ message: "Party not found" });
    }
    parties = parties.filter((party) => party.id !== partyId);
    res.json({ message: `Party ${partyToDelete.name} was successfully deleted` });
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});