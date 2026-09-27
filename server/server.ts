import { z } from "zod";
import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());
const PORT = 3000;



const userSchema = z.object({
    name: z.string().min(3).max(12),
    age: z.number()
        .min(18, { message: "You must be at least 18 years old" })
        .max(100, { message: "You must be at most 100 years old" })
        .optional()
        .default(28),
    email: z.string().email().toLowerCase(),
});


const randomUserResponseSchema = z.object({
    results: z.array(
        z.object({
            name: z.object({
                first: z.string(),
                last: z.string(),
            }),
            location: z.object({
                country: z.string(),
            })
        })
    ),
});

const randomLoginResponseSchema = z.object({
    results: z.array(
        z.object({
            login: z.object({
                username: z.string(),
            }),
            registered: z.object({
                date: z.string(),
            }),
        })
    ),
});

app.get("/ping", (req: Request, res: Response) => {
  res.json({message: "pong"});
});


app.get("/random-person", async (req: Request, res: Response) => {

    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        const validatedRandomUser = randomUserResponseSchema.safeParse(data);

        if (!validatedRandomUser.success) {
            return res.status(500).json({
                error: "Invalid data from randomuser API",
                details: validatedRandomUser.error,
            });
        }
        const randomUser = validatedRandomUser.data.results[0];
        res.json({
            name: `${randomUser?.name.first} ${randomUser?.name.last}`,
            country: randomUser?.location.country,
        })
    } catch (error) {
        res.status(500).json({
            error: "Failded to fetch random user",

        });
    }

});


app.post("/users", (req: Request, res: Response) => {
    const validatedNewUser = userSchema.safeParse(req.body);
    if (!validatedNewUser.success) {
        console.error(validatedNewUser.error);
        return res.status(400).json({ error: "Bad request", details: validatedNewUser.error, })
        
    } else {
        res.status(201).json({ user: validatedNewUser.data });
    }

});

app.get("/random-login", async (req: Request, res: Response) => {
    try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        const validatedRandomLogin = randomLoginResponseSchema.safeParse(data);

        if (!validatedRandomLogin.success) {
            return res.status(500).json({
                error: "Invalid data from randomuser API",
                details: validatedRandomLogin.error,
            });
        }

        const randomLoginUser = validatedRandomLogin.data.results[0];

        res.json({
            summary: `${randomLoginUser?.login.username} (registserd on ${randomLoginUser?.registered.date.split("T")[0]})`,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch random login",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running om port: ${PORT}`);
});