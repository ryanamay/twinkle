
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProfile } from "../../utils/sparkle";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  if (!symbol || typeof symbol !== "string") {
    res.status(400).json({ error: "Invalid symbol" });
    return;
  }

  try {
    const quote = await fetchProfile(symbol as string);
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quote" });
  }
}