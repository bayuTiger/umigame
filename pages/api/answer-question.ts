import { NextApiRequest, NextApiResponse } from "next";
import { answerQuestion } from "../../lib/perplexity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { answer } = req.body;
    try {
      const aiResponse = await answerQuestion(answer);
      res.status(200).json({ response: aiResponse });
    } catch (error) {
      console.error("Error processing answer:", error);
      res.status(500).json({ error: "Failed to process answer" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
