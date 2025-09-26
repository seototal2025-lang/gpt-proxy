export async function POST(req) {
  const body = await req.json();

  // Kiểm tra token
  if (req.headers.get("x-proxy-token") !== process.env.PROXY_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: response.status });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Proxy error", details: err.message }),
      { status: 500 }
    );
  }
}
