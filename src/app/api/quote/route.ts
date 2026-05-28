import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { QuoteItem } from "@/types";
import { saveQuote, SavedQuote } from "@/lib/db";

// In-memory rate limiting map: IP -> timestamp arrays
const ipInquiries = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (!ipInquiries.has(ip)) {
    ipInquiries.set(ip, [now]);
    return false;
  }

  const timestamps = ipInquiries.get(ip)!.filter((time) => now - time < RATE_LIMIT_WINDOW);
  
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  timestamps.push(now);
  ipInquiries.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // 1. IP-Based spam mitigation / rate limiting
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "127.0.0.1";
    
    if (checkRateLimit(ip)) {
      console.warn(`Spam detection: Rate limit breached by IP ${ip}`);
      return NextResponse.json(
        { error: "Too many quote requests. Please try again in a minute or contact our showroom directly." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { contactDetails, items } = body;

    // 2. Server-side validations
    if (!contactDetails || !contactDetails.name || !contactDetails.phone) {
      return NextResponse.json(
        { error: "Required fields (Name and Phone) are missing." },
        { status: 400 }
      );
    }

    console.log("=========================================");
    console.log("SRIHANS OFFICE FURNITURE - NEW B2B LEAD");
    console.log("=========================================");
    console.log(`Requester IP: ${ip}`);
    console.log("Requester Details:", contactDetails);
    console.log("Inquired Items:", JSON.stringify(items, null, 2));
    console.log("=========================================");

    const leadId = `SRI-${Date.now().toString().slice(-6)}`;

    // Persist the quote request in database
    const savedQuote: SavedQuote = {
      id: leadId,
      date: new Date().toISOString(),
      contactDetails: {
        name: contactDetails.name,
        company: contactDetails.company || "",
        phone: contactDetails.phone,
        email: contactDetails.email || "",
        message: contactDetails.message || "",
      },
      items,
      status: "Pending",
    };
    await saveQuote(savedQuote);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Check if SMTP is configured. If not, log receipt and return successful fallback response
    if (!smtpUser || !smtpPass || smtpPass.includes("mock_")) {
      console.log("SMTP Credentials not fully configured. Falling back to local console mock logging.");
      return NextResponse.json({
        success: true,
        message: "Inquiry received and logged locally. Falling back to mock state because SMTP parameters are not set.",
        leadId,
      });
    }

    // Configure live Nodemailer SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const itemsHtml = items
      .map(
        (item: QuoteItem) => `
        <tr style="border-bottom: 1px solid #E4E2DC;">
          <td style="padding: 12px; font-family: sans-serif; font-size: 14px; color: #1A1A1A;"><strong>${item.product.name}</strong></td>
          <td style="padding: 12px; font-family: monospace; font-size: 14px; color: #C8A96E; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; font-family: monospace; font-size: 14px; color: #3D3D3D; text-align: right;">₹${item.product.price.toLocaleString("en-IN")}</td>
        </tr>
      `
      )
      .join("");

    const mailOptions = {
      from: `"${contactDetails.name}" <${smtpUser}>`,
      to: smtpUser,
      replyTo: contactDetails.email || undefined,
      subject: `[SRIHANS INQUIRY] - New Lead from ${contactDetails.name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E4E2DC; font-family: sans-serif; background-color: #FFFFFF;">
          <h2 style="font-family: serif; color: #1A1A1A; border-bottom: 2px solid #C8A96E; padding-bottom: 8px;">Srihans Office Furniture</h2>
          <p style="font-size: 16px; color: #3D3D3D;">A new B2B quote request has been submitted with the following parameters:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; background-color: #F7F6F2; border-radius: 6px;">
            <tr>
              <td style="padding: 12px; font-weight: bold; width: 35%;">Name:</td>
              <td style="padding: 12px;">${contactDetails.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Company:</td>
              <td style="padding: 12px;">${contactDetails.company || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Phone:</td>
              <td style="padding: 12px;">${contactDetails.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Email:</td>
              <td style="padding: 12px;">${contactDetails.email || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Custom specs:</td>
              <td style="padding: 12px;">${contactDetails.message || "None"}</td>
            </tr>
          </table>

          <h3 style="margin-top: 24px; border-bottom: 1px solid #E4E2DC; padding-bottom: 6px; color: #1A1A1A;">Inquired Catalog Items</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            <thead>
              <tr style="background-color: #1A1A1A; color: #FFFFFF;">
                <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase;">Product Model</th>
                <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase;">Quantity</th>
                <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase;">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <p style="margin-top: 32px; font-size: 11px; color: #6B6B6B; text-align: center; border-t: 1px solid #E4E2DC; padding-top: 12px;">
            Srihans Office Furniture - Bangalore's Leading Ergonomic Brand. Since 2005.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Quote inquiry email dispatched successfully.",
      leadId,
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error occurred during dispatching." },
      { status: 500 }
    );
  }
}
