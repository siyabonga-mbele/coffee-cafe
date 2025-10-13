import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import brewRoutes from "./routes/brewRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("☕ Coffee Brew Log API Running...");
});

app.use("/api/brews", brewRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
