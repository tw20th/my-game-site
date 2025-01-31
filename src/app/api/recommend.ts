import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userPreferences } = req.body;

  if (!userPreferences || typeof userPreferences !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid request: userPreferences is required" });
  }

  try {
    const prompt = `ユーザーの好みに基づいておすすめのゲームを選んでください。好み: ${userPreferences}`;
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No valid response from OpenAI");
    }

    return res
      .status(200)
      .json({ recommendation: data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return res.status(500).json({ error: "Failed to generate recommendation" });
  }
}
