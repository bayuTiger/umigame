import { NextApiRequest, NextApiResponse } from "next";
import { generateQuestion } from "../../lib/perplexity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const question = await generateQuestion();
      res.status(200).json({ question });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate question" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
