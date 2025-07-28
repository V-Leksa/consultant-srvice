import OpenAI from "openai";
import dotenv from "dotenv";
import { HttpsProxyAgent } from "https-proxy-agent";

dotenv.config();

const proxyAgent = new HttpsProxyAgent(process.env.HTTP_PROXY);

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseOptions: {
    httpAgent: proxyAgent,
    httpsAgent: proxyAgent,
  },
});

async function askAI(question) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: question }],
  });
  console.log(completion.choices[0].message.content);
}

askAI("Привет! Как дела?");


