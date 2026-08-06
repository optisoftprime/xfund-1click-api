// export async function GET() {
//   try {
//     const response = await fetch(
//       "https://gateway.useyala.com/v1/payout-api/payouts/pairs",
//            {
//         headers: {
//           "x-api-key": "BAaJxIxIb62LfQDVluWtu7YcAhkqooVV5bW1ekAg",
//       },
//       cache: "no-store",
//       }
//     );

//     const data = await response.json();

//     return Response.json({
//       success: true,
//       data,
//     });
//   } catch (error: any) {
//     return Response.json({
//       success: false,
//       error: error.message,
//     });
//   }
// }



export async function GET() {
  try {
    const response = await fetch(
      "https://gateway.useyala.com/v1/payout-api/payouts/pairs",
      {
        method: "GET",
        headers: {
          "x-api-key": "BAaJxIxIb62LfQDVluWtu7YcAhkqooVV5bW1ekAg",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();

      return Response.json(
        {
          success: false,
          error,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Yala API Error:", error);

    return Response.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}