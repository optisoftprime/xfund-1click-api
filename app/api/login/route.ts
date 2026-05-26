import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://xfund.stlassetmgt.com:10443/api/v1";

async function handler(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");

    const url = `${BASE_URL}/${path}`;

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
      body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error("Proxy Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Proxy server error",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function PUT(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function DELETE(req: NextRequest, context: any) {
  return handler(req, context);
}

export async function PATCH(req: NextRequest, context: any) {
  return handler(req, context);
}