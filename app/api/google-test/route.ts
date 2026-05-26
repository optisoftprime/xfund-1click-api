export async function GET() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    const data = await response.json();

    return Response.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}