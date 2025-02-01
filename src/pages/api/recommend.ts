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

  // 🔹 OpenAI API Key が存在するかチェック
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ OpenAI API Key is missing!");
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  try {
    console.log("Received userPreferences:", userPreferences);
    console.log("OpenAI API Key exists:", !!apiKey);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // 🔹 最新のモデルに変更
        messages: [
          { role: "system", content: "あなたはゲームの専門家です。" },
          {
            role: "user",
            content: `ユーザーの好みに基づいておすすめのゲームを選んでください。好み: ${userPreferences}`,
          },
        ],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error(
        "❌ OpenAI API error:",
        response.status,
        response.statusText
      );
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No valid response from OpenAI");
    }

    console.log("✅ OpenAI API response:", data);

    return res
      .status(200)
      .json({ recommendation: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("❌ Error generating recommendation:", error);
    return res.status(500).json({ error: "Failed to generate recommendation" });
  }
}
