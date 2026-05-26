export async function GET() {
  try {
    const response = await fetch(
      "https://xfund.stlassetmgt.com:10443/api/v1",
      {
        method: "GET",
      }
    );

    return Response.json({
      success: true,
      status: response.status,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
      cause: error.cause || null,
    });
  }
}