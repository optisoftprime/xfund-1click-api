// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import https from "https";

// export const runtime = "nodejs";

// const BASE_URL =
//   "https://xfund.stlassetmgt.com:10443/api/v1";

// async function handler(
//   req: NextRequest,
//   context: any
// ) {
//   try {
//     const path =
//       context?.params?.path?.join("/") || "";

//     const url = `${BASE_URL}/${path}`;

//     const body =
//       req.method !== "GET" &&
//       req.method !== "HEAD"
//         ? await req.json()
//         : undefined;

//     const response = await axios({
//       method: req.method,
//       url,
//       data: body,

//       headers: {
//         "Content-Type": "application/json",
//       },

//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false,
//       }),
//     });

//     return NextResponse.json(response.data, {
//       status: response.status,
//     });
//   } catch (error: any) {
//     console.log(
//       "Proxy Error:",
//       error?.response?.data || error.message
//     );

//     return NextResponse.json(
//       {
//         success: false,
//         error:
//           error?.response?.data ||
//           error.message,
//       },
//       {
//         status:
//           error?.response?.status || 500,
//       }
//     );
//   }
// }

// export async function GET(
//   req: NextRequest,
//   context: any
// ) {
//   return handler(req, context);
// }

// export async function POST(
//   req: NextRequest,
//   context: any
// ) {
//   return handler(req, context);
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export const runtime = "nodejs";

const BASE_URL = "https://xfund.stlassetmgt.com:10443/api/v1";

async function handler(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  try {
    const params = await context.params; // ← await it
    const path = params?.path?.join("/") || "";
    const url = `${BASE_URL}/${path}`;

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.json()
        : undefined;

    const response = await axios({
      method: req.method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.log("Proxy Error:", error?.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: error?.response?.data || error.message },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return handler(req, context);
}