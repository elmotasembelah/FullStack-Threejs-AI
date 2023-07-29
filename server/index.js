import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import express from "express";
const app = express();

import dalleRouter from "./routes/dalle.routes.js";

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", dalleRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "hello from Dall E" });
});

// const port = process.env.PORT || 3000;

app.listen(8080, () => console.log(`server is listening`));
