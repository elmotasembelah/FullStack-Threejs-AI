import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// setting up the config for open ai
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

export default generateImage;
