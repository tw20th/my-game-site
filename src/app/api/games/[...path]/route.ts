import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const baseUrl = "https://api.rawg.io/api";

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const apiPath = params.path.join("/");
  const url = `${baseUrl}/${apiPath}?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
