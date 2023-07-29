import express from "express";
const dalleRouter = express.Router();

import generateImage from "../controllers/image.generation.js";

dalleRouter.route("/").get((req, res) => {
    res.status(200).json({ message: "hello from Dall.E ROUTES" });
});

// creating the image
dalleRouter.route("/").post(generateImage);

export default dalleRouter;
