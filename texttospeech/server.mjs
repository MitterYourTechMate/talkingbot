import express from "express"
import OpenAI from "openai";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()
const openai = new OpenAI({apiKey:process.env.apiKey});

async function main(text, res) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: text }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0].message.content);
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: completion.choices[0].message.content,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
    res.send(buffer)
  }

app.post("/", (req,res) => {
    // let text = "Tell me something about New Zealand in 160 characters"
    let text = req.body.text
    main(text, res)
})


app.listen(3000, () => {
    console.log("Server is running")
})