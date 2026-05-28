import { NextResponse } from "next/server";
import { getQuotes, updateQuoteStatus } from "@/lib/db";

export async function GET() {
  try {
    const quotes = await getQuotes();
    return NextResponse.json(quotes);
  } catch (err) {
    console.error("GET quotes admin API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing required parameters: id and status." }, { status: 400 });
    }

    if (status !== "Pending" && status !== "Under Review" && status !== "Answered") {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    await updateQuoteStatus(id, status);
    return NextResponse.json({ success: true, message: "Quotation status updated." });
  } catch (err) {
    console.error("PUT quotes admin API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
