import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DB_USER: z.string(),
  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  PORT: z.coerce.number().default(3000),
});

const validatedEnv = envSchema.safeParse(process.env);

if (!validatedEnv.success) {
  console.error(
    "Invalid environment variables:",
    z.treeifyError(validatedEnv.error)
  );
  process.exit(1);
}

export const env = validatedEnv.data;