const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001" ,
  "https://1clickweb-preview.vercel.app",
  "https://app.stlassetmgt.com"
];

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin");

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
  };
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(request),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}


export async function GET(request: Request) {
  const apiKey = process.env.YALA_API_KEY;
  const pairsUrl = process.env.YALA_PAIRS_URL;

  if (!apiKey || !pairsUrl) {
    console.error(
      "Yala API Error: YALA_API_KEY and YALA_PAIRS_URL must both be set"
    );

    // return Response.json(
    //   {
    //     success: false,
    //     error: "Server misconfiguration",
    //   },
    //   { status: 500 }
    // );


    return Response.json(
    {
      success: false,
      error: "Server misconfiguration",
    },
    {
      status: 500,
      headers: corsHeaders(request),
    }
   );
  }

  try {
    const response = await fetch(pairsUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    // if (!response.ok) {
    //   const error = await response.text();

    //   return Response.json(
    //     {
    //       success: false,
    //       error,
    //     },
    //     { status: response.status, headers: corsHeaders(request) }
    //   );
    // }

    if (!response.ok) {
      const error = await response.text();

      return Response.json(
        {
          success: false,
          error,
        },
        {
          status: response.status,
          headers: corsHeaders(request),
        }
      );
    }

    const data = await response.json();

    return Response.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: corsHeaders(request),
      }
    );
  } catch (error: unknown) {
  console.error("Yala API Error:", error);

  const message =
    error instanceof Error
      ? error.message
      : "Internal Server Error";

  return Response.json(
    {
      success: false,
      error: message,
    },
    {
      status: 500,
      headers: corsHeaders(request),
    }
  );
}
  
  // catch (error: any) {
  //   console.error("Yala API Error:", error);

  //   return Response.json(
  //     {
  //       success: false,
  //       error: error.message || "Internal Server Error",
  //     },
  //     { status: 500 }
  //   );
  // }
}