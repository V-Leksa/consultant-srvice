import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseOptions: {
    httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
    httpsAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });
    const answer = completion.choices[0].message.content;
    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
